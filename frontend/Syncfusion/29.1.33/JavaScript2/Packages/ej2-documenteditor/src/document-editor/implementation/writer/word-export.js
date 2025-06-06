import { ZipArchive, ZipArchiveItem } from '@syncfusion/ej2-compression';
import { XmlWriter } from '@syncfusion/ej2-file-utils';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { HelperMethods } from '../index';
import { Dictionary, LocaleId } from '../../index';
import { nsidProperty } from '../../base/index';
import { sectionsProperty, hiddenProperty, paraStyleNameProperty, isLegalStyleNumberingProperty, breakClearTypeProperty, characterFormatProperty, paragraphFormatProperty, listsProperty, abstractListsProperty, backgroundProperty, stylesProperty, defaultTabWidthProperty, formattingProperty, trackChangesProperty, protectionTypeProperty, enforcementProperty, hashValueProperty, saltValueProperty, doNotUseHTMLParagraphAutoSpacingProperty, formFieldShadingProperty, footnotesProperty, endnotesProperty, compatibilityModeProperty, themeFontLanguagesProperty, themesProperty, nameProperty, basedOnProperty, nextProperty, linkProperty, localeIdProperty, localeIdFarEastProperty, localeIdBidiProperty, boldProperty, italicProperty, underlineProperty, fontHintTypeProperty, baselineAlignmentProperty, strikethroughProperty, highlightColorProperty, fontSizeProperty, fontColorProperty, fontFamilyProperty, styleNameProperty, bidiProperty, bdoProperty, fontSizeBidiProperty, fontFamilyBidiProperty, boldBidiProperty, italicBidiProperty, allCapsProperty, complexScriptProperty, fontFamilyAsciiProperty, fontFamilyFarEastProperty, fontFamilyNonFarEastProperty, revisionIdsProperty, listIdProperty, listLevelNumberProperty, leftIndentProperty, rightIndentProperty, firstLineIndentProperty, textAlignmentProperty, afterSpacingProperty, beforeSpacingProperty, spaceAfterAutoProperty, spaceBeforeAutoProperty, lineSpacingProperty, lineSpacingTypeProperty, listFormatProperty, keepWithNextProperty, widowControlProperty, keepLinesTogetherProperty, outlineLevelProperty, contextualSpacingProperty, bordersProperty, tabsProperty, headerDistanceProperty, footerDistanceProperty, differentFirstPageProperty, differentOddAndEvenPagesProperty, pageWidthProperty, pageHeightProperty, leftMarginProperty, rightMarginProperty, topMarginProperty, bottomMarginProperty, restartPageNumberingProperty, pageStartingNumberProperty, endnoteNumberFormatProperty, footNoteNumberFormatProperty, restartIndexForFootnotesProperty, restartIndexForEndnotesProperty, initialFootNoteNumberProperty, initialEndNoteNumberProperty, pageNumberStyleProperty, columnsProperty, numberOfColumnsProperty, equalWidthProperty, lineBetweenColumnsProperty, breakCodeProperty, columnSpanProperty, rowSpanProperty, verticalAlignmentProperty, allowBreakAcrossPagesProperty, isHeaderProperty, heightTypeProperty, gridBeforeProperty, gridBeforeWidthProperty, gridBeforeWidthTypeProperty, gridAfterProperty, gridAfterWidthProperty, gridAfterWidthTypeProperty, allowAutoFitProperty, cellSpacingProperty, shadingProperty, tableAlignmentProperty, preferredWidthProperty, preferredWidthTypeProperty, textureProperty, backgroundColorProperty, foregroundColorProperty, shadowProperty, hasNoneStyleProperty, verticalProperty, horizontalProperty, diagonalUpProperty, diagonalDownProperty, lineStyleProperty, lineWidthProperty, dataFormatProperty, yValueProperty, chartDataProperty, categoryXNameProperty, lineProperty, foreColorProperty, directionProperty, endStyleProperty, numberValueProperty, markerStyleProperty, markerSizeProperty, forwardProperty, backwardProperty, interceptProperty, isDisplayRSquaredProperty, isDisplayEquationProperty, seriesNameProperty, dataLabelProperty, errorBarProperty, seriesFormatProperty, trendLinesProperty, dataPointsProperty, firstSliceAngleProperty, holeSizeProperty, isLegendKeyProperty, isBubbleSizeProperty, isCategoryNameProperty, isSeriesNameProperty, isValueProperty, isPercentageProperty, isLeaderLinesProperty, showSeriesKeysProperty, hasHorizontalBorderProperty, hasVerticalBorderProperty, hasBordersProperty, categoryTypeProperty, chartCategoryProperty, chartSeriesProperty, chartTitleAreaProperty, chartLegendProperty, chartPrimaryCategoryAxisProperty, chartPrimaryValueAxisProperty, chartTitleProperty, chartTypeProperty, gapWidthProperty, overlapProperty, chartDataTableProperty, textProperty, shapeIdProperty, alternativeTextProperty, widthProperty, heightProperty, lineFormatProperty, fillFormatProperty, textWrappingStyleProperty, textWrappingTypeProperty, zOrderPositionProperty, layoutInCellProperty, lockAnchorProperty, autoShapeTypeProperty, textFrameProperty, colorProperty, fillProperty, textVerticalAlignmentProperty, imageStringProperty, metaFileImageStringProperty, isMetaFileProperty, topProperty, bottomProperty, rightProperty, leftProperty, formFieldDataProperty, fieldTypeProperty, textInputProperty, checkBoxProperty, dropDownListProperty, defaultValueProperty, formatProperty, sizeTypeProperty, sizeProperty, checkedProperty, dropDownItemsProperty, selectedIndexProperty, commentIdProperty, commentCharacterTypeProperty, footnoteTypeProperty, inlinesProperty, contentControlPropertiesProperty, lockContentControlProperty, lockContentsProperty, tagProperty, titleProperty, hasPlaceHolderTextProperty, multiLineProperty, isTemporaryProperty, dateCalendarTypeProperty, dateStorageFormatProperty, dateDisplayLocaleProperty, dateDisplayFormatProperty, isCheckedProperty, uncheckedStateProperty, checkedStateProperty, contentControlListItemsProperty, xmlMappingProperty, fontProperty, valueProperty, displayTextProperty, isMappedProperty, prefixMappingProperty, xPathProperty, storeItemIdProperty, cellFormatProperty, rowFormatProperty, cellsProperty, rowsProperty, descriptionProperty, wrapTextAroundProperty, positioningProperty, tableFormatProperty, allowOverlapProperty, distanceTopProperty, distanceRightProperty, distanceLeftProperty, distanceBottomProperty, verticalOriginProperty, verticalPositionProperty, horizontalOriginProperty, horizontalAlignmentProperty, horizontalPositionProperty, blocksProperty, headerProperty, footerProperty, evenHeaderProperty, evenFooterProperty, firstPageHeaderProperty, firstPageFooterProperty, headersFootersProperty, sectionFormatProperty, listLevelPatternProperty, followCharacterProperty, startAtProperty, levelNumberProperty, numberFormatProperty, abstractListIdProperty, levelsProperty, overrideListLevelProperty, levelOverridesProperty, separatorProperty, continuationSeparatorProperty, continuationNoticeProperty, bookmarkTypeProperty, propertiesProperty, tabJustificationProperty, positionProperty, deletePositionProperty, tabLeaderProperty, editRangeIdProperty, columnFirstProperty, columnLastProperty, userProperty, groupProperty, editableRangeStartProperty, spaceProperty, fontSchemeProperty, fontSchemeNameProperty, majorFontSchemeProperty, minorFontSchemeProperty, fontSchemeListProperty, fontTypefaceProperty, typefaceProperty, panoseProperty, typeProperty, majorUnitProperty, maximumValueProperty, minimumValueProperty, hasMajorGridLinesProperty, hasMinorGridLinesProperty, rgbProperty, appearanceProperty, lineFormatTypeProperty, allowSpaceOfSameStyleInTableProperty, weightProperty, fontNameProperty, columnIndexProperty, isAfterRowMarkProperty, isAfterParagraphMarkProperty, columnCountProperty, gridProperty, characterSpacingProperty, scalingProperty, horizontalRuleProperty, underlineColorProperty, isAutoMajorProperty } from '../../index';
/**
 * Exports the document to Word format.
 */
var WordExport = /** @class */ (function () {
    function WordExport() {
        //Part path
        this.customXMLItemsPath = 'customXml/item';
        this.customXMLItemsPropspath = 'customXml/itemProps';
        this.itemPropsPath = 'itemProps';
        this.documentPath = 'word/document.xml';
        this.stylePath = 'word/styles.xml';
        this.chartPath = 'word/charts';
        this.numberingPath = 'word/numbering.xml';
        this.settingsPath = 'word/settings.xml';
        this.headerPath = 'word/header';
        this.footerPath = 'word/footer';
        //private commentsPath: string = 'word/comments.xml';
        this.imagePath = 'word/media/image';
        this.footnotesPath = 'word/footnotes.xml';
        this.endnotesPath = 'word/endnotes.xml';
        this.appPath = 'docProps/app.xml';
        this.corePath = 'docProps/core.xml';
        // private CustomPath: string = 'docProps/custom.xml';
        // private FontTablePath: string = 'word/fontTable.xml';
        this.contentTypesPath = '[Content_Types].xml';
        // private ChartsPath: string = 'word/charts/';
        this.defaultEmbeddingPath = 'word/embeddings/';
        this.commentsPath = 'word/comments.xml';
        this.commentsExtendedPath = 'word/commentsExtended.xml';
        // private EmbeddingPath:string = 'word\embeddings\';
        // private DrawingPath:string = 'word\drawings\';
        this.themePath = 'word/theme/theme1.xml';
        // private FontsPath:string = 'word\fonts\';
        // private DiagramPath:string = "word/diagrams/';
        // private ControlPath:string = "word/activeX/';
        // private VbaProject: string = 'vbaProject.bin';
        // private VbaData: string = 'vbaData.xml';
        // private VbaProjectPath: string = 'word/vbaProject.bin';
        // private VbaDataPath: string = 'word/vbaData.xml';
        // private CustomXMLPath:string = 'customXml\';
        //Relationship path
        this.generalRelationPath = '_rels/.rels';
        this.wordRelationPath = 'word/_rels/document.xml.rels';
        this.customXMLRelPath = 'customXml/_rels/item';
        this.excelRelationPath = 'xl/_rels/workbook.xml.rels';
        // private FontRelationPath: string = 'word/_rels/fontTable.xml.rels';
        // private CommentsRelationPath: string = 'word/_rels/comments.xml.rels';
        this.footnotesRelationPath = 'word/_rels/footnotes.xml.rels';
        this.endnotesRelationPath = 'word/_rels/endnotes.xml.rels';
        // private NumberingRelationPath: string = 'word/_rels/numbering.xml.rels';
        this.headerRelationPath = 'word/_rels/header';
        this.footerRelationPath = 'word/_rels/footer';
        // private SettingsRelationpath: string = 'word/_rels/settings.xml.rels';
        // private VbaProjectRelsPath: string = 'word/_rels/vbaProject.bin.rels';
        //Content type of the parts
        this.xmlContentType = 'application/xml';
        this.fontContentType = 'application/vnd.openxmlformats-officedocument.obfuscatedFont';
        this.documentContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml';
        this.TemplateContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml';
        // private CommentsContentType: string = 'application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml';
        this.settingsContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml';
        this.commentsContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml';
        this.commentsExContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.commentsExtended+xml';
        this.endnoteContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml';
        // private FontTableContentType: string = 'application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml';
        this.footerContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml';
        this.footnoteContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml';
        // private GlossaryDocumentContentType: string = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml';
        this.headerContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml';
        this.numberingContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml';
        this.stylesContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml';
        this.webSettingsContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml';
        this.appContentType = 'application/vnd.openxmlformats-officedocument.extended-properties+xml';
        this.coreContentType = 'application/vnd.openxmlformats-package.core-properties+xml';
        this.customContentType = 'application/vnd.openxmlformats-officedocument.custom-properties+xml';
        this.customXmlContentType = 'application/vnd.openxmlformats-officedocument.customXmlProperties+xml';
        this.relationContentType = 'application/vnd.openxmlformats-package.relationships+xml';
        // private DiagramColor: string = 'application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml';
        // private DiagramData: string = 'application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml';
        // private DiagramLayout: string = 'application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml';
        // private DiagramStyle: string = 'application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml';
        this.chartsContentType = 'application/vnd.openxmlformats-officedocument.drawingml.chart+xml';
        this.themeContentType = 'application/vnd.openxmlformats-officedocument.theme+xml';
        // private ChartDrawingContentType: string = 'application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml';
        // private ActiveXContentType: string = 'application/vnd.ms-office.activeX+xml';
        // private ActiveXBinContentType: string = 'application/vnd.ms-office.activeX';
        this.tableStyleContentType = 'application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml';
        // private ChartStyleContentType: string = 'application/vnd.ms-office.chartstyle+xml';
        this.chartColorStyleContentType = 'application/vnd.ms-office.chartcolorstyle+xml';
        // private VbaProjectContentType: string = 'application/vnd.ms-office.vbaProject';
        // private VbaDataContentType: string = 'application/vnd.ms-word.vbaData+xml';
        // private MacroDocumentContentType: string = 'application/vnd.ms-word.document.macroEnabled.main+xml';
        // private MacroTemplateContentType: string = 'application/vnd.ms-word.template.macroEnabledTemplate.main+xml';
        // private OleObjectContentType: string = 'application/vnd.openxmlformats-officedocument.oleObject';
        // Relationship types of document parts
        // private AltChunkRelType: string = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/aFChunk';
        this.commentsRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments';
        this.commentsExRelType = 'http://schemas.microsoft.com/office/2011/relationships/commentsExtended';
        this.settingsRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings';
        this.endnoteRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes';
        // private FontTableRelType: string = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable';
        this.footerRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer';
        this.footnoteRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes';
        this.headerRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/header';
        this.documentRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument';
        this.numberingRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering';
        this.stylesRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles';
        // private OleObjectRelType: string = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/oleObject';
        this.chartRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart';
        this.ThemeRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme';
        this.fontRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/font';
        this.tableStyleRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles';
        this.coreRelType = 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties';
        this.appRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties';
        this.customRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties';
        this.imageRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image';
        this.hyperlinkRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink';
        this.controlRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/control';
        this.packageRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/package';
        // private VbaProjectRelType: string = 'http://schemas.microsoft.com/office/2006/relationships/vbaProject';
        // private VbaDataRelType: string = 'http://schemas.microsoft.com/office/2006/relationships/wordVbaData';
        this.customXmlRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml';
        this.customUIRelType = 'http://schemas.microsoft.com/office/2006/relationships/ui/extensibility';
        this.attachedTemplateRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/attachedTemplate';
        this.chartColorStyleRelType = 'http://schemas.microsoft.com/office/2011/relationships/chartColorStyle';
        // private ChartStyleRelType: string = 'http://schemas.microsoft.com/office/2011/relationships/chartStyle';
        // private ChartUserShapesRelType: string = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartUserShapes';
        // private ChartContentType: string = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/package';
        // Namespaces
        // private PKG_namespace: string = 'http://schemas.microsoft.com/office/2006/xmlPackage';
        this.wNamespace = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
        this.wpNamespace = 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing';
        this.pictureNamespace = 'http://schemas.openxmlformats.org/drawingml/2006/picture';
        this.aNamespace = 'http://schemas.openxmlformats.org/drawingml/2006/main';
        this.a14Namespace = 'http://schemas.microsoft.com/office/drawing/2010/main';
        this.svgNamespace = 'http://schemas.microsoft.com/office/drawing/2016/SVG/main';
        this.rNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
        this.rpNamespace = 'http://schemas.openxmlformats.org/package/2006/relationships';
        this.vNamespace = 'urn:schemas-microsoft-com:vml';
        this.oNamespace = 'urn:schemas-microsoft-com:office:office';
        this.xmlNamespace = 'http://www.w3.org/XML/1998/namespace';
        this.w10Namespace = 'urn:schemas-microsoft-com:office:word';
        this.cpNamespace = 'http://schemas.openxmlformats.org/package/2006/metadata/core-properties';
        this.dcNamespace = 'http://purl.org/dc/elements/1.1/';
        // private DCTERMS_namespace: string = 'http://purl.org/dc/terms/';
        // private XSI_namespace: string = 'http://www.w3.org/2001/XMLSchema-instance';
        this.docPropsNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/extended-properties';
        this.veNamespace = 'http://schemas.openxmlformats.org/markup-compatibility/2006';
        this.mNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/math';
        this.wneNamespace = 'http://schemas.microsoft.com/office/word/2006/wordml';
        // private DCMI_namespace: string = 'http://purl.org/dc/dcmitype/';
        this.customPropsNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/custom-properties';
        this.vtNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes';
        this.chartNamespace = 'http://schemas.openxmlformats.org/drawingml/2006/chart';
        this.slNamespace = 'http://schemas.openxmlformats.org/schemaLibrary/2006/main';
        //2003WML namespace
        // private amlNamespace: string = 'http://schemas.microsoft.com/aml/2001/core';
        this.dtNamespace = 'uuid:C2F41010-65B3-11d1-A29F-00AA00C14882';
        this.wmlNamespace = 'http://schemas.microsoft.com/office/word/2003/wordml';
        //2010 namespaces
        this.w14Namespace = 'http://schemas.microsoft.com/office/word/2010/wordml';
        this.wpCanvasNamespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas';
        this.wpDrawingNamespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing';
        this.wpGroupNamespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingGroup';
        this.wpInkNamespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingInk';
        this.wpShapeNamespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingShape';
        //2013 namespaces
        this.w15Namespace = 'http://schemas.microsoft.com/office/word/2012/wordml';
        this.diagramNamespace = 'http://schemas.openxmlformats.org/drawingml/2006/diagram';
        //Encryption namespaces
        this.eNamespace = 'http://schemas.microsoft.com/office/2006/encryption';
        this.pNamespace = 'http://schemas.microsoft.com/office/2006/keyEncryptor/password';
        this.certNamespace = 'http://schemas.microsoft.com/office/2006/keyEncryptor/certificate';
        this.cxNamespace = 'http://schemas.microsoft.com/office/drawing/2014/chartex';
        // chart
        this.c15Namespace = 'http://schemas.microsoft.com/office/drawing/2015/06/chart';
        this.c7Namespace = 'http://schemas.microsoft.com/office/drawing/2007/8/2/chart';
        this.csNamespace = 'http://schemas.microsoft.com/office/drawing/2012/chartStyle';
        // worksheet
        this.spreadSheetNamespace = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
        this.spreadSheet9 = 'http://schemas.microsoft.com/office/spreadsheetml/2009/9/main';
        // Dls xml tags
        this.cRelationshipsTag = 'Relationships';
        this.cRelationshipTag = 'Relationship';
        this.cIdTag = 'Id';
        this.cTypeTag = 'Type';
        this.cTargetTag = 'Target';
        this.cUserShapesTag = 'userShapes';
        this.cExternalData = 'externalData';
        this.twipsInOnePoint = 20;
        this.twentiethOfPoint = 20;
        this.borderMultiplier = 8;
        this.percentageFactor = 50;
        this.emusPerPoint = 12700;
        // private const TOC_SYMBOL:string = (char)0x01;
        // private const FOOTNOTE_SYMBOL:string = (char)0x02;
        // private const PAGENUMBER_SYMBOL:string = (char)0xB;
        // private DEF_FIT_TEXT_TO_SHAPE: string = 'mso-fit-shape-to-text:t';
        // Document tags
        this.cConditionalTableStyleTag = 'tblStylePr';
        this.cTableFormatTag = 'tblPr';
        this.cTowFormatTag = 'trPr';
        this.cCellFormatTag = 'tcPr';
        this.cParagraphFormatTag = 'pPr';
        this.cCharacterFormatTag = 'rPr';
        this.packageType = 'http://schemas.microsoft.com/office/2006/xmlPackage';
        this.relsPartPath = '/_rels/.rels';
        this.documentRelsPartPath = '/word/_rels/document.xml.rels';
        this.webSettingsPath = '/word/webSettings.xml';
        this.wordMLDocumentPath = '/word/document.xml';
        this.wordMLStylePath = '/word/styles.xml';
        this.wordMLNumberingPath = '/word/numbering.xml';
        this.wordMLSettingsPath = '/word/settings.xml';
        this.wordMLHeaderPath = '/word/header';
        this.wordMLFooterPath = '/word/footer';
        this.wordMLCommentsPath = '/word/comments.xml';
        this.wordMLImagePath = '/word/media/image';
        this.wordMLFootnotesPath = '/word/footnotes.xml';
        this.wordMLEndnotesPath = '/word/endnotes.xml';
        this.wordMLAppPath = '/docProps/app.xml';
        this.wordMLCorePath = '/docProps/core.xml';
        this.wordMLCustomPath = '/docProps/custom.xml';
        this.wordMLFontTablePath = '/word/fontTable.xml';
        this.wordMLChartsPath = '/word/charts/';
        this.wordMLDefaultEmbeddingPath = '/word/embeddings/';
        this.wordMLEmbeddingPath = '/word/embeddings/';
        this.wordMLDrawingPath = '/word/drawings/';
        this.wordMLThemePath = '/word/theme/theme1.xml';
        this.wordMLFontsPath = '/word/fonts/';
        this.wordMLDiagramPath = '/word/diagrams/';
        this.wordMLControlPath = '/word/activeX/';
        this.wordMLVbaProject = '/vbaProject.bin';
        this.wordMLVbaData = '/vbaData.xml';
        this.wordMLVbaProjectPath = '/word/vbaProject.bin';
        this.wordMLVbaDataPath = '/word/vbaData.xml';
        // private WordMLCustomXMLPath: string = '/customXml/';
        this.wordMLWebSettingsPath = '/word/webSettings.xml';
        this.wordMLCustomItemProp1Path = '/customXml/itemProps1.xml';
        // private WordMLCustomXMLRelPath: string = '/customXml/_rels/item1.xml.rels';
        this.wordMLFootnoteRelPath = '/word/_rels/footnotes.xml.rels';
        this.wordMLEndnoteRelPath = '/word/_rels/endnotes.xml.rels';
        this.wordMLSettingsRelPath = '/word/_rels/settings.xml.rels';
        this.wordMLNumberingRelPath = '/word/_rels/numbering.xml.rels';
        this.wordMLFontTableRelPath = '/word/_rels/fontTable.xml.rels';
        this.wordMLCustomXmlPropsRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps';
        this.wordMLControlRelType = 'http://schemas.microsoft.com/office/2006/relationships/activeXControlBinary';
        this.wordMLDiagramContentType = 'application/vnd.ms-office.drawingml.diagramDrawing+xml';
        this.dsNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/customXml';
        this.excelFiles = undefined;
        this.lastSection = false;
        this.mRelationShipID = 0;
        this.cRelationShipId = 0;
        this.eRelationShipId = 0;
        this.efRelationShipId = 0;
        this.mDocPrID = 1;
        this.chartCount = 0;
        this.seriesCount = 0;
        this.chartStringCount = 0;
        this.mDifferentFirstPage = false;
        this.mBookmarks = undefined;
        this.mComments = [];
        this.revisions = [];
        this.customXMLProps = [];
        this.paraID = 0;
        this.commentParaID = 0;
        this.commentParaIDInfo = {};
        this.isInsideComment = false;
        this.commentId = {};
        this.currentCommentId = 0;
        this.trackChangesId = 0;
        this.prevRevisionIds = [];
        this.isRevisionContinuous = false;
        this.isBookmarkAtEnd = false;
        this.isBookmarkAtRowEnd = false;
        this.isVerticalMergeCell = false;
        this.keywordIndex = undefined;
        this.isHeaderFooter = false;
        this.isSerializeFootEndNote = undefined;
        this.containerWidth = 0;
    }
    WordExport.prototype.getModuleName = function () {
        return 'WordExport';
    };
    Object.defineProperty(WordExport.prototype, "bookmarks", {
        // Gets the bookmark name
        get: function () {
            if (isNullOrUndefined(this.mBookmarks)) {
                this.mBookmarks = [];
            }
            return this.mBookmarks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WordExport.prototype, "documentImages", {
        // Gets the collection of images present in the document body
        get: function () {
            if (this.mDocumentImages === undefined) {
                this.mDocumentImages = new Dictionary();
            }
            return this.mDocumentImages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WordExport.prototype, "svgImages", {
        // Gets the collection of images present in the document body
        get: function () {
            if (this.mSvgImages === undefined) {
                this.mSvgImages = new Dictionary();
            }
            return this.mSvgImages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WordExport.prototype, "externalImages", {
        // Gets the collection of images present in the document body
        get: function () {
            if (this.mExternalLinkImages === undefined) {
                this.mExternalLinkImages = new Dictionary();
            }
            return this.mExternalLinkImages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WordExport.prototype, "headerFooterImages", {
        // Gets the collections of images present in the HeaderFooters
        get: function () {
            if (this.mHeaderFooterImages === undefined) {
                this.mHeaderFooterImages = new Dictionary();
            }
            return this.mHeaderFooterImages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WordExport.prototype, "headerFooterSvgImages", {
        // Gets the collections of images present in the HeaderFooters
        get: function () {
            if (this.mHeaderFooterSvgImages === undefined) {
                this.mHeaderFooterSvgImages = new Dictionary();
            }
            return this.mHeaderFooterSvgImages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WordExport.prototype, "documentCharts", {
        // Gets the collection of charts present in the document body
        get: function () {
            if (this.mDocumentCharts === undefined) {
                this.mDocumentCharts = new Dictionary();
            }
            return this.mDocumentCharts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WordExport.prototype, "headersFooters", {
        /// Gets the HeaderFooter Collection
        get: function () {
            if (this.mHeaderFooterColl === undefined) {
                this.mHeaderFooterColl = new Dictionary();
            }
            return this.mHeaderFooterColl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WordExport.prototype, "endnotesFootnotes", {
        /// Gets the Endnote and Footnote Collection
        get: function () {
            if (this.mFootEndnotesColl === undefined) {
                this.mFootEndnotesColl = new Dictionary();
            }
            return this.mFootEndnotesColl;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {DocumentHelper} documentHelper - Document helper
     * @param {string} fileName - file name
     * @param {string} formatType - format type
     * @returns {void}
     */
    WordExport.prototype.save = function (documentHelper, fileName, formatType) {
        var _this = this;
        this.fileName = fileName;
        this.serialize(documentHelper, formatType);
        var excelFiles = this.serializeExcelFiles();
        if (excelFiles && excelFiles.length > 0) {
            Promise.all(excelFiles).then(function () {
                _this.saveInternal(fileName, formatType);
            });
        }
        else {
            this.saveInternal(fileName, formatType);
        }
        this.close();
    };
    WordExport.prototype.saveInternal = function (fileName, formatType) {
        if (formatType === 'Docx') {
            this.mArchive.save(fileName + '.docx').then(function (mArchive) {
                mArchive.destroy();
            });
        }
        else if (formatType === 'Dotx') {
            this.mArchive.save(fileName + '.dotx').then(function (mArchive) {
                mArchive.destroy();
            });
        }
    };
    /**
     * @private
     * @param {DocumentHelper} documentHelper - Document helper
     * @param {string} formatType - format type
     * @returns {Promise<Blob>} - Return Promise
     */
    WordExport.prototype.saveAsBlob = function (documentHelper, formatType) {
        var _this = this;
        this.serialize(documentHelper, formatType);
        var excelFiles = this.serializeExcelFiles();
        /* eslint-disable */
        return new Promise(function (resolve, reject) {
            if (excelFiles.length > 0) {
                Promise.all(excelFiles).then(function () {
                    _this.mArchive.saveAsBlob().then(function (blob) {
                        _this.mArchive.destroy();
                        blob = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                        resolve(blob);
                    });
                });
            }
            else {
                _this.mArchive.saveAsBlob().then(function (blob) {
                    _this.mArchive.destroy();
                    blob = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                    resolve(blob);
                });
            }
        });
        /* eslint-enable */
    };
    WordExport.prototype.serializeExcelFiles = function () {
        var _this = this;
        var excelFiles = this.excelFiles;
        var files = [];
        if (excelFiles && excelFiles.length > 0) {
            var _loop_1 = function (i) {
                var fileName = excelFiles.keys[parseInt(i.toString(), 10)];
                var excelFile = excelFiles.get(fileName);
                var excelPromise = excelFile.saveAsBlob();
                files.push(excelPromise);
                excelPromise.then(function (blob) {
                    var zipArchiveItem = new ZipArchiveItem(blob, fileName);
                    _this.mArchive.addItem(zipArchiveItem);
                });
            };
            for (var i = 0; i < excelFiles.length; i++) {
                _loop_1(i);
            }
            this.excelFiles.clear();
        }
        return files;
    };
    /**
     * @private
     * @returns {void}
     */
    WordExport.prototype.saveExcel = function () {
        var xlsxPath = this.defaultEmbeddingPath + 'Microsoft_Excel_Worksheet' + this.chartCount + '.xlsx';
        this.excelFiles.add(xlsxPath, this.mArchiveExcel);
        this.mArchiveExcel = undefined;
    };
    /**
     * @private
     * @returns {void}
     */
    WordExport.prototype.destroy = function () {
        this.clearDocument();
        this.mRelationShipID = undefined;
        this.mDocPrID = undefined;
        this.mDifferentFirstPage = undefined;
        this.fileName = undefined;
        this.imageRelationIds = undefined;
        this.svgImageRelationIds = undefined;
        if (this.mArchive) {
            this.mArchive.destroy();
            this.mArchive = undefined;
        }
        if (this.mArchiveExcel) {
            this.mArchiveExcel.destroy();
            this.mArchiveExcel = undefined;
        }
    };
    // Saves the word document in the stream
    WordExport.prototype.serialize = function (documentHelper, formatType) {
        this.keywordIndex = documentHelper.owner.documentEditorSettings.optimizeSfdt ? 1 : 0;
        /* eslint-disable @typescript-eslint/no-explicit-any */
        var document = documentHelper.owner.sfdtExportModule.write(this.keywordIndex);
        this.setDocument(document);
        this.mComments = documentHelper.comments;
        this.mCustomXML = documentHelper.customXmlData;
        this.mImages = documentHelper.images;
        this.revisions = documentHelper.owner.revisions.changes;
        this.mArchive = new ZipArchive();
        this.mArchive.compressionLevel = 'Normal';
        this.commentParaIDInfo = {};
        this.commentParaID = 0;
        this.currentCommentId = 0;
        this.commentId = {};
        this.mVerticalMerge = new Dictionary();
        this.mGridSpans = new Dictionary();
        this.imageRelationIds = new Dictionary();
        this.svgImageRelationIds = new Dictionary();
        var contenttype;
        //document.xml
        this.serializeDocument();
        //Styles.xml
        this.serializeStyles();
        //numbering.xml
        this.serializeNumberings();
        //comments.xml
        this.serializeComments();
        //commentsExtended.xml
        this.serializeCommentsExtended();
        //theme.xml
        // if (m_document.DocHasThemes && !isNullOrUndefined(m_document.Themes))
        this.serializeThemes();
        // else
        // this.serializeDefaultThemes();
        //settings.xml
        this.serializeSettings();
        //core.xml
        this.serializeCoreProperties();
        //app.xml
        this.serializeAppProperties();
        //fontTable.xml
        this.serializeFontTable(contenttype);
        //custom.xml
        // if (!isNullOrUndefined(this.wordDocument.CustomDocumentProperties) && m_document.CustomDocumentProperties.length > 0) {
        //     SerializeCustomProperties();
        // }
        //Settings Relations
        this.serializeSettingsRelation();
        //Numbering relation if the document has picture bullet
        // if (PictureBullets.length > 0) {
        //     SerializeNumberingsRelation();
        // }
        this.serializeHeaderFooters();
        this.serializeFootnotes();
        this.serializeEndnotes();
        //document relations
        this.serializeDocumentRelations();
        // Add controls to archieve.
        // if (ControlsPathNames.length > 0) {
        //     AddControlsToZip(m_document.DocxPackage);
        // }
        // if (!isNullOrUndefined(m_document.CustomUIPartContainer))
        //     AddPartContainerToArchive(m_document.CustomUIPartContainer);
        // if (!isNullOrUndefined(m_document.CustomXMLContainer))
        //     AddPartContainerToArchive(m_document.CustomXMLContainer);
        //general relations
        this.serializeGeneralRelations();
        //[ContentTypes].xml
        this.serializeContentTypes(contenttype, formatType);
        // Clears the internal fields maintained for serializing.
        this.clearDocument();
    };
    // Sets the document
    WordExport.prototype.setDocument = function (document, keyindex) {
        if (isNullOrUndefined(this.keywordIndex)) {
            this.keywordIndex = keyindex;
        }
        this.document = document;
        this.mSections = document[sectionsProperty[this.keywordIndex]];
        this.mLists = document[listsProperty[this.keywordIndex]];
        this.mAbstractLists = document[abstractListsProperty[this.keywordIndex]];
        this.defCharacterFormat = document[characterFormatProperty[this.keywordIndex]];
        this.defParagraphFormat = document[paragraphFormatProperty[this.keywordIndex]];
        this.defaultTabWidthValue = document[defaultTabWidthProperty[this.keywordIndex]];
        this.themeFontLang = document[themeFontLanguagesProperty[this.keywordIndex]];
        this.dontUseHtmlParagraphAutoSpacing = HelperMethods.parseBoolValue(document[doNotUseHTMLParagraphAutoSpacingProperty[this.keywordIndex]]);
        this.mStyles = document[stylesProperty[this.keywordIndex]];
        this.mThemes = document[themesProperty[this.keywordIndex]];
        this.formatting = HelperMethods.parseBoolValue(document[formattingProperty[this.keywordIndex]]);
        this.enforcement = HelperMethods.parseBoolValue(document[enforcementProperty[this.keywordIndex]]);
        this.hashValue = document[hashValueProperty[this.keywordIndex]];
        this.saltValue = document[saltValueProperty[this.keywordIndex]];
        this.protectionType = document[protectionTypeProperty[this.keywordIndex]];
        this.formFieldShading = HelperMethods.parseBoolValue(document[formFieldShadingProperty[this.keywordIndex]]);
        this.trackChanges = HelperMethods.parseBoolValue(document[trackChangesProperty[this.keywordIndex]]);
        this.compatibilityMode = document[compatibilityModeProperty[this.keywordIndex]];
        this.allowSpaceOfSameStyleInTable = HelperMethods.parseBoolValue(document[allowSpaceOfSameStyleInTableProperty[this.keywordIndex]]);
    };
    // Clears the document
    WordExport.prototype.clearDocument = function () {
        // Owner Nodes
        this.section = undefined;
        this.lastSection = undefined;
        this.blockOwner = undefined;
        this.paragraph = undefined;
        this.table = undefined;
        this.row = undefined;
        this.headerFooter = undefined;
        this.commentParaIDInfo = {};
        this.commentParaID = 0;
        this.currentCommentId = 0;
        this.commentId = {};
        this.document = undefined;
        this.mSections = undefined;
        this.mLists = undefined;
        this.mAbstractLists = undefined;
        this.defCharacterFormat = undefined;
        this.defParagraphFormat = undefined;
        this.defaultTabWidthValue = undefined;
        this.trackChanges = undefined;
        this.customXMLProps = [];
        this.mRelationShipID = 0;
        this.eRelationShipId = 0;
        this.cRelationShipId = 0;
        this.efRelationShipId = 0;
        this.mDocPrID = 1;
        this.chartCount = 0;
        this.keywordIndex = undefined;
        this.mDifferentFirstPage = false;
        if (this.mHeaderFooterColl) {
            this.mHeaderFooterColl.destroy();
            this.mHeaderFooterColl = undefined;
        }
        if (this.mVerticalMerge) {
            this.mVerticalMerge.destroy();
            this.mVerticalMerge = undefined;
        }
        if (this.mGridSpans) {
            this.mGridSpans.destroy();
            this.mGridSpans = undefined;
        }
        if (this.mDocumentImages) {
            this.mDocumentImages.destroy();
            this.mDocumentImages = undefined;
        }
        if (this.mSvgImages) {
            this.mSvgImages.destroy();
            this.mSvgImages = undefined;
        }
        if (this.mExternalLinkImages) {
            this.mExternalLinkImages.destroy();
            this.mExternalLinkImages = undefined;
        }
        if (this.mHeaderFooterImages) {
            this.mHeaderFooterImages.destroy();
            this.mHeaderFooterImages = undefined;
        }
        if (this.mHeaderFooterSvgImages) {
            this.mHeaderFooterSvgImages.destroy();
            this.mHeaderFooterSvgImages = undefined;
        }
        if (this.mDocumentCharts) {
            this.mDocumentCharts.destroy();
            this.mDocumentCharts = undefined;
        }
        if (this.mFootEndnotesColl) {
            this.mFootEndnotesColl.destroy();
            this.mFootEndnotesColl = undefined;
        }
    };
    // Serializes the document elements (document.xml)
    WordExport.prototype.serializeDocument = function () {
        var writer = new XmlWriter();
        writer.writeStartElement('w', 'document', this.wNamespace);
        this.writeCommonAttributeStrings(writer);
        writer.writeStartElement('w', 'background', this.wNamespace);
        writer.writeAttributeString('w', 'color', undefined, this.getColor(this.document[backgroundProperty[this.keywordIndex]][colorProperty[this.keywordIndex]]));
        writer.writeEndElement();
        this.serializeDocumentBody(writer);
        writer.writeEndElement(); //end of document tag
        var archiveItem = new ZipArchiveItem(writer.buffer, this.documentPath);
        this.mArchive.addItem(archiveItem);
    };
    WordExport.prototype.writeCommonAttributeStrings = function (writer) {
        writer.writeAttributeString('xmlns', 'wpc', undefined, this.wpCanvasNamespace);
        this.writeCustom(writer);
        writer.writeAttributeString('xmlns', 'wp14', undefined, this.wpDrawingNamespace);
        writer.writeAttributeString('xmlns', 'wp', undefined, this.wpNamespace);
        writer.writeAttributeString('xmlns', 'w10', undefined, this.w10Namespace);
        writer.writeAttributeString('xmlns', 'w', undefined, this.wNamespace);
        this.writeDup(writer);
        writer.writeAttributeString('xmlns', 'wne', undefined, this.wneNamespace);
        writer.writeAttributeString('xmlns', 'wps', undefined, this.wpShapeNamespace);
        writer.writeAttributeString('mc', 'Ignorable', undefined, 'w14 w15 wp14');
    };
    WordExport.prototype.writeDup = function (writer) {
        writer.writeAttributeString('xmlns', 'w14', undefined, this.w14Namespace);
        writer.writeAttributeString('xmlns', 'w15', undefined, this.w15Namespace);
        writer.writeAttributeString('xmlns', 'wpg', undefined, this.wpGroupNamespace);
        writer.writeAttributeString('xmlns', 'wpi', undefined, this.wpInkNamespace);
    };
    WordExport.prototype.writeCustom = function (writer) {
        writer.writeAttributeString('xmlns', 'mc', undefined, this.veNamespace);
        writer.writeAttributeString('xmlns', 'o', undefined, this.oNamespace);
        writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
        writer.writeAttributeString('xmlns', 'm', undefined, this.mNamespace);
        writer.writeAttributeString('xmlns', 'v', undefined, this.vNamespace);
    };
    // Serializes the document body
    WordExport.prototype.serializeDocumentBody = function (writer) {
        writer.writeStartElement(undefined, 'body', this.wNamespace);
        var count = this.document[sectionsProperty[this.keywordIndex]].length;
        for (var i = 0; i < count; i++) {
            this.section = this.document[sectionsProperty[this.keywordIndex]][parseInt(i.toString(), 10)];
            this.lastSection = i === count - 1;
            this.containerWidth = this.section[sectionFormatProperty[this.keywordIndex]][pageWidthProperty[this.keywordIndex]] -
                (this.section[sectionFormatProperty[this.keywordIndex]][leftMarginProperty[this.keywordIndex]] +
                    this.section[sectionFormatProperty[this.keywordIndex]][rightMarginProperty[this.keywordIndex]]);
            this.serializeSection(writer, this.section, i === count - 1);
            this.section = undefined;
        }
        writer.writeEndElement();
    };
    // Serializes the Section.
    WordExport.prototype.serializeSection = function (writer, section, last) {
        this.blockOwner = section;
        if (!isNullOrUndefined(section[blocksProperty[this.keywordIndex]])) {
            this.serializeBodyItems(writer, section[blocksProperty[this.keywordIndex]], last);
        }
        if (last) {
            this.serializeSectionProperties(writer, section);
        }
        this.blockOwner = undefined;
    };
    // Serialize the comments (comments.xml)
    WordExport.prototype.serializeComments = function () {
        if (this.mComments.length === 0 || (this.mComments.length === 1 && this.mComments[0].text === '')) {
            return;
        }
        var writer = new XmlWriter();
        writer.writeStartElement('w', 'comments', this.wNamespace);
        this.serializeCommentCommonAttribute(writer);
        this.serializeCommentInternal(writer, this.mComments);
        writer.writeEndElement();
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.commentsPath);
        this.mArchive.addItem(zipArchiveItem);
    };
    //SerializeThemes the themes (theme.xml)
    WordExport.prototype.serializeThemes = function () {
        if (!isNullOrUndefined(this.mThemes)) {
            var writer = new XmlWriter();
            writer.writeStartElement('a', 'theme', this.aNamespace);
            writer.writeAttributeString(undefined, 'name', undefined, 'Office Theme');
            writer.writeStartElement(undefined, 'themeElements', this.aNamespace);
            writer.writeRaw('<a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000" /></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF" /></a:lt1><a:dk2><a:srgbClr val="44546A" /></a:dk2><a:lt2><a:srgbClr val="E7E6E6" /></a:lt2><a:accent1><a:srgbClr val="4472C4" /></a:accent1><a:accent2><a:srgbClr val="ED7D31" /></a:accent2><a:accent3><a:srgbClr val="A5A5A5" /></a:accent3><a:accent4><a:srgbClr val="FFC000" /></a:accent4><a:accent5><a:srgbClr val="5B9BD5" /></a:accent5><a:accent6><a:srgbClr val="70AD47" /></a:accent6><a:hlink><a:srgbClr val="0563C1" /></a:hlink><a:folHlink><a:srgbClr val="954F72" /></a:folHlink></a:clrScheme>');
            writer.writeStartElement(undefined, 'fontScheme', this.aNamespace);
            writer.writeAttributeString(undefined, 'name', undefined, this.mThemes[fontSchemeNameProperty[this.keywordIndex]]);
            writer.writeStartElement(undefined, 'majorFont', this.aNamespace);
            for (var i = 0; i < this.mThemes[fontSchemeProperty[this.keywordIndex]][majorFontSchemeProperty[this.keywordIndex]][fontSchemeListProperty[this.keywordIndex]].length; i++) {
                var theme = this.mThemes[fontSchemeProperty[this.keywordIndex]][majorFontSchemeProperty[this.keywordIndex]][fontSchemeListProperty[this.keywordIndex]][parseInt(i.toString(), 10)];
                this.themeFont(writer, theme);
            }
            var keys = Object.keys(this.mThemes[fontSchemeProperty[this.keywordIndex]][majorFontSchemeProperty[this.keywordIndex]][fontTypefaceProperty[this.keywordIndex]]);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                this.themeType(writer, key, this.mThemes[fontSchemeProperty[this.keywordIndex]][majorFontSchemeProperty[this.keywordIndex]][fontTypefaceProperty[this.keywordIndex]]["" + key]);
            }
            writer.writeEndElement();
            writer.writeStartElement(undefined, 'minorFont', this.aNamespace);
            for (var i = 0; i < this.mThemes[fontSchemeProperty[this.keywordIndex]][minorFontSchemeProperty[this.keywordIndex]][fontSchemeListProperty[this.keywordIndex]].length; i++) {
                var theme = this.mThemes[fontSchemeProperty[this.keywordIndex]][minorFontSchemeProperty[this.keywordIndex]][fontSchemeListProperty[this.keywordIndex]][parseInt(i.toString(), 10)];
                this.themeFont(writer, theme);
            }
            keys = Object.keys(this.mThemes[fontSchemeProperty[this.keywordIndex]][minorFontSchemeProperty[this.keywordIndex]][fontTypefaceProperty[this.keywordIndex]]);
            for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
                var key = keys_2[_a];
                this.themeType(writer, key, this.mThemes[fontSchemeProperty[this.keywordIndex]][minorFontSchemeProperty[this.keywordIndex]][fontTypefaceProperty[this.keywordIndex]]["" + key]);
            }
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement(undefined, 'fmtScheme', this.aNamespace);
            writer.writeAttributeString(undefined, 'name', undefined, 'Office');
            writer.writeRaw('<a:fillStyleLst><a:solidFill><a:schemeClr val="phClr" /></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:lumMod val="110000" /><a:satMod val="105000" /><a:tint val="67000" /></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:lumMod val="105000" /><a:satMod val="103000" /><a:tint val="73000" /></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="105000" /><a:satMod val="109000" /><a:tint val="81000" /></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0" /></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:satMod val="103000" /><a:lumMod val="102000" /><a:tint val="94000" /></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:satMod val="110000" /><a:lumMod val="100000" /><a:shade val="100000" /></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="99000" /><a:satMod val="120000" /><a:shade val="78000" /></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0" /></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr" /></a:solidFill><a:prstDash val="solid" /><a:miter lim="800000" /></a:ln><a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr" /></a:solidFill><a:prstDash val="solid" /><a:miter lim="800000" /></a:ln><a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr" /></a:solidFill><a:prstDash val="solid" /><a:miter lim="800000" /></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst /></a:effectStyle><a:effectStyle><a:effectLst /></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="57150" dist="19050" dir="5400000" algn="ctr" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="63000" /></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr" /></a:solidFill><a:solidFill><a:schemeClr val="phClr"><a:tint val="95000" /><a:satMod val="170000" /></a:schemeClr></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="93000" /><a:satMod val="150000" /><a:shade val="98000" /><a:lumMod val="102000" /></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:tint val="98000" /><a:satMod val="130000" /><a:shade val="90000" /><a:lumMod val="103000" /></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="63000" /><a:satMod val="120000" /></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0" /></a:gradFill></a:bgFillStyleLst>');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
            var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.themePath);
            this.mArchive.addItem(zipArchiveItem);
        }
    };
    WordExport.prototype.themeFont = function (writer, theme) {
        if (theme[nameProperty[this.keywordIndex]] === 'latin' || theme[nameProperty[this.keywordIndex]] === 'ea' || theme[nameProperty[this.keywordIndex]] === 'cs') {
            writer.writeStartElement(undefined, theme[nameProperty[this.keywordIndex]], this.aNamespace);
            writer.writeAttributeString(undefined, 'typeface', undefined, theme[typefaceProperty[this.keywordIndex]]);
            writer.writeAttributeString(undefined, 'panose', undefined, theme[panoseProperty[this.keywordIndex]]);
            writer.writeEndElement();
        }
    };
    WordExport.prototype.themeType = function (writer, script, typeFace) {
        writer.writeStartElement(undefined, 'font', this.aNamespace);
        writer.writeAttributeString(undefined, 'script', undefined, script);
        writer.writeAttributeString(undefined, 'typeface', undefined, typeFace);
        writer.writeEndElement();
    };
    WordExport.prototype.serializeCommentCommonAttribute = function (writer) {
        writer.writeAttributeString('xmlns', 'wpc', undefined, this.wpCanvasNamespace);
        writer.writeAttributeString('xmlns', 'cx', undefined, this.cxNamespace);
        writer.writeAttributeString('xmlns', 'mc', undefined, this.veNamespace);
        writer.writeAttributeString('xmlns', 'o', undefined, this.oNamespace);
        writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
        writer.writeAttributeString('xmlns', 'm', undefined, this.mNamespace);
        writer.writeAttributeString('xmlns', 'v', undefined, this.vNamespace);
        writer.writeAttributeString('xmlns', 'wp14', undefined, this.wpDrawingNamespace);
        writer.writeAttributeString('xmlns', 'wp', undefined, this.wpNamespace);
        writer.writeAttributeString('xmlns', 'w10', undefined, this.w10Namespace);
        writer.writeAttributeString('xmlns', 'w', undefined, this.wNamespace);
        writer.writeAttributeString('xmlns', 'w14', undefined, this.w14Namespace);
        writer.writeAttributeString('xmlns', 'w15', undefined, this.w15Namespace);
        writer.writeAttributeString('mc', 'Ignorable', undefined, 'w14 w15');
    };
    WordExport.prototype.serializeCommentInternal = function (writer, comments) {
        for (var i = 0; i < comments.length; i++) {
            var comment = comments[parseInt(i.toString(), 10)];
            // if (comment.isPosted) {
            writer.writeStartElement('w', 'comment', this.wNamespace);
            writer.writeAttributeString('w', 'id', this.wNamespace, this.commentId[comment.commentId].toString());
            if (comment.author && comment.author !== ' ') {
                writer.writeAttributeString('w', 'author', this.wNamespace, comment.author);
            }
            if (comment.date) {
                writer.writeAttributeString('w', 'date', this.wNamespace, comment.date);
            }
            if (comment.initial && comment.initial !== '') {
                writer.writeAttributeString('w', 'initials', this.wNamespace, comment.initial);
            }
            var blocks = HelperMethods.commentInlines(comment.text, comment.mentions, this.keywordIndex);
            for (var k = 0; k < blocks.length; k++) {
                this.isInsideComment = true;
                this.commentParaID++;
                this.serializeBodyItem(writer, blocks[parseInt(k.toString(), 10)], true);
                this.isInsideComment = false;
            }
            if (blocks.length === 0) {
                this.isInsideComment = true;
                this.commentParaID++;
            }
            this.commentParaIDInfo[comment.commentId] = this.commentParaID;
            this.isInsideComment = false;
            writer.writeEndElement();
            if (comment.replyComments.length > 0) {
                this.serializeCommentInternal(writer, comment.replyComments);
            }
            // }
        }
    };
    // Serialize the comments (commentsExtended.xml)
    WordExport.prototype.serializeCommentsExtended = function () {
        if (this.mComments.length === 0 || (this.mComments.length === 1 && this.mComments[0].text === '')) {
            return;
        }
        var writer = new XmlWriter();
        writer.writeStartElement('w15', 'commentsEx', this.wNamespace);
        this.serializeCommentCommonAttribute(writer);
        this.serializeCommentsExInternal(writer, this.mComments, false);
        writer.writeEndElement();
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.commentsExtendedPath);
        this.mArchive.addItem(zipArchiveItem);
    };
    WordExport.prototype.serializeCommentsExInternal = function (writer, comments, isReply) {
        for (var i = 0; i < comments.length; i++) {
            var comment = comments[parseInt(i.toString(), 10)];
            // if (comment.isPosted) {
            writer.writeStartElement('w15', 'commentEx', this.wNamespace);
            //if (comment.blocks.length > 0) {
            var syncParaID = this.commentParaIDInfo[comment.commentId];
            if (isReply) {
                var paraID = this.commentParaIDInfo[comment.ownerComment.commentId];
                writer.writeAttributeString('w15', 'paraIdParent', this.wNamespace, paraID.toString());
            }
            writer.writeAttributeString('w15', 'paraId', this.wNamespace, syncParaID.toString());
            //}
            var val = comment.done ? 1 : 0;
            writer.writeAttributeString('w15', 'done', this.wNamespace, val.toString());
            writer.writeEndElement();
            if (comment.replyComments.length > 0) {
                this.serializeCommentsExInternal(writer, comment.replyComments, true);
            }
            // }
        }
    };
    // Serialize the section properties.
    WordExport.prototype.serializeSectionProperties = function (writer, section) {
        if (!isNullOrUndefined(this.document.optimizeSfdt)) {
            this.keywordIndex = this.document.optimizeSfdt ? 1 : 0;
        }
        writer.writeStartElement('w', 'sectPr', this.wNamespace);
        if (section[headersFootersProperty[this.keywordIndex]]) {
            this.serializeHFReference(writer, section[headersFootersProperty[this.keywordIndex]]);
        }
        // if (IsNeedToSerializeSectionFootNoteProperties(section))
        //     SerializeFootnoteProperties(section);
        // if (IsNeedToSerializeSectionEndNoteProperties(section))
        //     SerializeEndnoteProperties(section);
        if (!isNullOrUndefined(section[sectionFormatProperty[this.keywordIndex]][breakCodeProperty[this.keywordIndex]])) {
            var breakCode = this.getSectionBreakCode(section[sectionFormatProperty[this.keywordIndex]][breakCodeProperty[this.keywordIndex]]);
            this.serializeSectionType(writer, breakCode);
        }
        this.serializePageSetup(writer, section[sectionFormatProperty[this.keywordIndex]]);
        this.serializeColumns(writer, section[sectionFormatProperty[this.keywordIndex]]);
        this.serializeFootNotesPr(writer, section[sectionFormatProperty[this.keywordIndex]]);
        this.serializeEndNotesPr(writer, section[sectionFormatProperty[this.keywordIndex]]);
        // this.serializeSectionProtection(section);
        // if (section.PageSetup.VerticalAlignment !== PageAlignment.Top) {
        //     writer.writeStartElement('vAlign', this.wNamespace);
        //     switch (section.PageSetup.VerticalAlignment) {
        //         case PageAlignment.Top:
        //             writer.WriteAttributeString('val', this.wNamespace, 'top');
        //             break;
        //         case PageAlignment.Middle:
        //             writer.WriteAttributeString('val', this.wNamespace, 'center');
        //             break;
        //         case PageAlignment.Justified:
        //             writer.WriteAttributeString('val', this.wNamespace, 'both');
        //             break;
        //         case PageAlignment.Bottom:
        //             writer.WriteAttributeString('val', this.wNamespace, 'bottom');
        //             break;
        //     }
        //     writer.WriteEndElement();
        // }
        if (section[sectionFormatProperty[this.keywordIndex]] !== undefined
            && HelperMethods.parseBoolValue(section[sectionFormatProperty[this.keywordIndex]][differentFirstPageProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'titlePg', this.wNamespace);
            writer.writeEndElement();
        }
        // SerializeTextDirection(section);
        if (!isNullOrUndefined(section[sectionFormatProperty[this.keywordIndex]])
            && HelperMethods.parseBoolValue(section[sectionFormatProperty[this.keywordIndex]][bidiProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'bidi', this.wNamespace);
            writer.writeEndElement();
        }
        //rtlGutter
        // SerializeDocGrid(section);
        //printerSettings
        writer.writeEndElement(); //end of sectPr tag
    };
    WordExport.prototype.getSectionBreakCode = function (breakCode) {
        switch (breakCode) {
            case 'NoBreak':
                return 'continuous';
            case 'NewColumn':
                return 'nextColumn';
            case 'EvenPage':
                return 'evenPage';
            case 'Oddpage':
                return 'oddPage';
            default:
                return 'nextPage';
        }
    };
    WordExport.prototype.serializeFootNotesPr = function (writer, section) {
        if (section[footNoteNumberFormatProperty[this.keywordIndex]] || section[restartIndexForFootnotesProperty[this.keywordIndex]]) {
            writer.writeStartElement(undefined, 'footnotePr', this.wNamespace);
            writer.writeStartElement(undefined, 'pos', this.wNamespace);
            writer.writeAttributeString(undefined, 'val', this.wNamespace, 'pageBottom');
            writer.writeEndElement();
            if (section[footNoteNumberFormatProperty[this.keywordIndex]] !== undefined) {
                writer.writeStartElement(undefined, 'numFmt', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, this.getFootNoteNumberFormat(section[footNoteNumberFormatProperty[this.keywordIndex]]));
                writer.writeEndElement();
            }
            if (section[restartIndexForFootnotesProperty[this.keywordIndex]] !== undefined) {
                writer.writeStartElement(undefined, 'numRestart', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, this.getFootNoteNumberRestart(section[restartIndexForFootnotesProperty[this.keywordIndex]]));
                writer.writeEndElement();
            }
            if (section[initialFootNoteNumberProperty[this.keywordIndex]] !== undefined) {
                writer.writeStartElement(undefined, 'numStart', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, (section[initialFootNoteNumberProperty[this.keywordIndex]]).toString());
                writer.writeEndElement();
            }
            writer.writeEndElement();
        }
    };
    WordExport.prototype.getFootNoteNumberFormat = function (numberFormat) {
        var patternType;
        switch (numberFormat) {
            case 'UpperCaseRoman':
            case 1:
                patternType = 'upperRoman';
                break;
            case 'LowerCaseRoman':
            case 2:
                patternType = 'lowerRoman';
                break;
            case 'UpperCaseLetter':
            case 3:
                patternType = 'upperLetter';
                break;
            case 'LowerCaseLetter':
            case 4:
                patternType = 'lowerLetter';
                break;
            default:
                patternType = 'decimal';
                break;
        }
        return patternType;
    };
    WordExport.prototype.getFootNoteNumberRestart = function (numberRestart) {
        switch (numberRestart) {
            case 'RestartForEachSection ':
            case 1:
                return 'eachSect';
            case 'RestartForEachPage':
            case 2:
                return 'eachPage';
            default:
                return 'continuous';
        }
    };
    WordExport.prototype.getPageNumberFormat = function (numberFormat) {
        var patternType;
        switch (numberFormat) {
            case 'RomanUpper':
                patternType = 'upperRoman';
                break;
            case 'RomanLower':
                patternType = 'lowerRoman';
                break;
            case 'LetterUpper':
                patternType = 'upperLetter';
                break;
            case 'LetterLower':
                patternType = 'lowerLetter';
                break;
            default:
                patternType = 'Arabic';
                break;
        }
        return patternType;
    };
    // Serialize the Footnote Properties
    WordExport.prototype.serializeEndNotesPr = function (writer, section) {
        if (!isNullOrUndefined(section[endnoteNumberFormatProperty[this.keywordIndex]]) ||
            !isNullOrUndefined(section[restartIndexForEndnotesProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'endnotePr', this.wNamespace);
            writer.writeStartElement(undefined, 'pos', this.wNamespace);
            writer.writeAttributeString(undefined, 'val', this.wNamespace, 'docEnd');
            writer.writeEndElement();
            if (section[endnoteNumberFormatProperty[this.keywordIndex]] !== undefined) {
                writer.writeStartElement(undefined, 'numFmt', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, this.getFootNoteNumberFormat(section[endnoteNumberFormatProperty[this.keywordIndex]]));
                writer.writeEndElement();
            }
            if (section[restartIndexForEndnotesProperty[this.keywordIndex]] !== undefined) {
                writer.writeStartElement(undefined, 'numRestart', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, this.getFootNoteNumberRestart(section[restartIndexForEndnotesProperty[this.keywordIndex]]));
                writer.writeEndElement();
            }
            if (section[initialEndNoteNumberProperty[this.keywordIndex]] !== undefined) {
                writer.writeStartElement(undefined, 'numStart', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, (section[initialEndNoteNumberProperty[this.keywordIndex]]).toString());
                writer.writeEndElement();
            }
            writer.writeEndElement();
        }
    };
    // Serialize the column properties of section.
    WordExport.prototype.serializeColumns = function (writer, sectionFormat) {
        if (sectionFormat[numberOfColumnsProperty[this.keywordIndex]] !== undefined
            && sectionFormat[numberOfColumnsProperty[this.keywordIndex]] > 1) {
            writer.writeStartElement(undefined, 'cols', this.wNamespace);
            writer.writeAttributeString(undefined, 'num', this.wNamespace, sectionFormat[numberOfColumnsProperty[this.keywordIndex]].toString());
            if (HelperMethods.parseBoolValue(sectionFormat[lineBetweenColumnsProperty[this.keywordIndex]])) {
                writer.writeAttributeString(undefined, 'sep', this.wNamespace, '1');
            }
            if (HelperMethods.parseBoolValue(sectionFormat[equalWidthProperty[this.keywordIndex]])) {
                writer.writeAttributeString(undefined, 'equalWidth', this.wNamespace, '1');
            }
            else {
                writer.writeAttributeString(undefined, 'equalWidth', this.wNamespace, '0');
                if (sectionFormat[columnsProperty[this.keywordIndex]] !== undefined
                    && sectionFormat[columnsProperty[this.keywordIndex]].length > 0) {
                    for (var i = 0; i < sectionFormat[columnsProperty[this.keywordIndex]].length; i++) {
                        writer.writeStartElement(undefined, 'col', this.wNamespace);
                        writer.writeAttributeString(undefined, 'w', this.wNamespace, this.roundToTwoDecimal(sectionFormat[columnsProperty[this.keywordIndex]][parseInt(i.toString(), 10)][widthProperty[this.keywordIndex]]
                            * this.twentiethOfPoint).toString());
                        writer.writeAttributeString(undefined, 'space', this.wNamespace, this.roundToTwoDecimal(sectionFormat[columnsProperty[this.keywordIndex]][parseInt(i.toString(), 10)][spaceProperty[this.keywordIndex]]
                            * this.twentiethOfPoint).toString());
                        writer.writeEndElement();
                    }
                }
            }
            writer.writeEndElement();
        }
        // ColumnCollection columns = section.Columns;
        // writer.WriteStartElement('cols', this.wNamespace);
        // if (columns.length > 0)
        // {
        //     writer.WriteAttributeString('num', this.wNamespace, columns.length.ToString());
        // }
        // if (section.PageSetup.DrawLinesBetweenCols)
        //     writer.WriteAttributeString('sep', this.wNamespace, '1');
        // if (columns.OwnerSection.PageSetup.EqualColumnWidth)
        // {
        //     writer.WriteAttributeString('equalWidth', this.wNamespace, '1');
        //     //When the column count is negative, MS word just reset the column's count to zero
        //     //To avoid index out of exception, checked the columns count
        //     writer.WriteAttributeString('space', this.wNamespace, ToString(columns.length > 0 ? columns[0].Space * this.TwentiethOfPoint : 0));
        // }
        // else if (columns.length > 0)
        // {
        //     writer.WriteAttributeString('equalWidth', this.wNamespace, '0');
        //     foreach (Column column in columns)
        //     {
        //         writer.WriteStartElement('col', this.wNamespace);
        //         writer.WriteAttributeString('w', this.wNamespace, ToString(column.Width * this.TwentiethOfPoint));
        //         writer.WriteAttributeString('space', this.wNamespace, ToString(column.Space * this.TwentiethOfPoint));
        //         writer.WriteEndElement();
        //     }
        // }
        // writer.WriteEndElement();
    };
    // Serialize the page setup properties.
    WordExport.prototype.serializePageSetup = function (writer, pageSetup) {
        if (pageSetup !== undefined) {
            this.serializePageSize(writer, pageSetup);
            this.serializePageMargins(writer, pageSetup);
            this.serializePageNumberType(writer, pageSetup);
        }
        // // StartElement paperSrc (if any)
        // if (pageSetup.FirstPageTray > 0 || pageSetup.OtherPagesTray > 0) {
        //     writer.WriteStartElement('paperSrc', this.wNamespace);
        //     if (pageSetup.FirstPageTray > 0) {
        //         writer.WriteAttributeString('first', this.wNamespace, pageSetup.FirstPageTray.ToString());
        //     }
        //     if (pageSetup.OtherPagesTray > 0) {
        //         writer.WriteAttributeString('other', this.wNamespace, pageSetup.OtherPagesTray.ToString());
        //     }
        //     writer.WriteEndElement();
        // }
        if (HelperMethods.parseBoolValue(pageSetup[restartPageNumberingProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'pgNumType', this.wNamespace);
            writer.writeAttributeString(undefined, 'start', this.wNamespace, pageSetup[pageStartingNumberProperty[this.keywordIndex]].toString());
            writer.writeEndElement();
        }
        writer.writeStartElement(undefined, 'pgBorders', this.wNamespace);
        // //zOrder
        // if (pageSetup.PageBordersApplyType === PageBordersApplyType.FirstPage)
        //     writer.WriteAttributeString('display', this.wNamespace, 'firstPage');
        // else if (pageSetup.PageBordersApplyType === PageBordersApplyType.AllExceptFirstPage)
        //     writer.WriteAttributeString('display', this.wNamespace, 'notFirstPage');
        // if (pageSetup.PageBorderOffsetFrom === PageBorderOffsetFrom.PageEdge) {
        //     writer.WriteAttributeString('offsetFrom', this.wNamespace, 'page');
        // }
        // //Serializing zOrder of the front page border
        // if (!pageSetup.IsFrontPageBorder) {
        //     writer.WriteAttributeString('zOrder', this.wNamespace, 'back');
        // }
        // SerializePageBorders(pageSetup.Borders);
        writer.writeEndElement();
        // this.serializeLineNumberType(writer, pageSetup);
        //this.serializePageNumberType(writer, pageSetup);
    };
    // serialize the page size
    WordExport.prototype.serializePageSize = function (writer, pageSetup) {
        writer.writeStartElement(undefined, 'pgSz', this.wNamespace);
        writer.writeAttributeString(undefined, 'w', this.wNamespace, this.roundToTwoDecimal(pageSetup[pageWidthProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
        writer.writeAttributeString(undefined, 'h', this.wNamespace, this.roundToTwoDecimal(pageSetup[pageHeightProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
        // if (pageSetup.Orientation === PageOrientation.Landscape)
        // {
        //     writer.WriteAttributeString('orient', this.wNamespace, 'landscape');
        // }
        writer.writeEndElement();
    };
    // Serialize the border.
    WordExport.prototype.serializePageMargins = function (writer, pageSetup) {
        writer.writeStartElement(undefined, 'pgMar', this.wNamespace);
        var marginValue = Math.round(pageSetup[topMarginProperty[this.keywordIndex]] * this.twentiethOfPoint);
        writer.writeAttributeString(undefined, 'top', this.wNamespace, marginValue.toString());
        marginValue = Math.round(pageSetup[rightMarginProperty[this.keywordIndex]] * this.twentiethOfPoint);
        writer.writeAttributeString(undefined, 'right', this.wNamespace, marginValue.toString());
        marginValue = Math.round(pageSetup[bottomMarginProperty[this.keywordIndex]] * this.twentiethOfPoint);
        writer.writeAttributeString(undefined, 'bottom', this.wNamespace, marginValue.toString());
        marginValue = Math.round(pageSetup[leftMarginProperty[this.keywordIndex]] * this.twentiethOfPoint);
        writer.writeAttributeString(undefined, 'left', this.wNamespace, marginValue.toString());
        writer.writeAttributeString(undefined, 'header', this.wNamespace, this.roundToTwoDecimal(pageSetup[headerDistanceProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
        writer.writeAttributeString(undefined, 'footer', this.wNamespace, this.roundToTwoDecimal(pageSetup[footerDistanceProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
        writer.writeAttributeString(undefined, 'gutter', this.wNamespace, '0');
        writer.writeEndElement();
    };
    //Serialize the page number type
    WordExport.prototype.serializePageNumberType = function (writer, pageSetup) {
        if (pageSetup[pageNumberStyleProperty[this.keywordIndex]] !== undefined) {
            writer.writeStartElement(undefined, 'pgNumType', this.wNamespace);
            writer.writeAttributeString(undefined, 'fmt', this.wNamespace, this.getPageNumberFormat(pageSetup[pageNumberStyleProperty[this.keywordIndex]]));
            writer.writeEndElement();
        }
    };
    // Serialize the section type.
    WordExport.prototype.serializeSectionType = function (writer, sectionBreakCode) {
        writer.writeStartElement('w', 'type', this.wNamespace);
        writer.writeAttributeString('w', 'val', this.wNamespace, sectionBreakCode); //GetSectionBreakCode(sectionBreakCode));
        writer.writeEndElement();
    };
    // Serialize the heeader/footer reference.
    WordExport.prototype.serializeHFReference = function (writer, headersFooters) {
        var hfId = '';
        if (headersFooters !== undefined) {
            this.mDifferentFirstPage = HelperMethods.parseBoolValue(this.section[sectionFormatProperty[this.keywordIndex]][differentOddAndEvenPagesProperty[this.keywordIndex]]);
            var hf = headersFooters[firstPageHeaderProperty[this.keywordIndex]];
            if (hf && hf[blocksProperty[this.keywordIndex]] && hf[blocksProperty[this.keywordIndex]].length > 0) {
                writer.writeStartElement(undefined, 'headerReference', this.wNamespace);
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'first');
                hfId = this.getNextRelationShipID();
                writer.writeAttributeString(undefined, 'id', this.rNamespace, hfId);
                this.addHeaderFooter(hf, 'FirstPageHeader', hfId);
                writer.writeEndElement();
            }
            hf = headersFooters[firstPageFooterProperty[this.keywordIndex]];
            if (hf && hf[blocksProperty[this.keywordIndex]] && hf[blocksProperty[this.keywordIndex]].length > 0) {
                writer.writeStartElement(undefined, 'footerReference', this.wNamespace);
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'first');
                hfId = this.getNextRelationShipID();
                writer.writeAttributeString(undefined, 'id', this.rNamespace, hfId);
                this.addHeaderFooter(hf, 'FirstPageFooter', hfId);
                writer.writeEndElement();
            }
            hf = headersFooters[evenHeaderProperty[this.keywordIndex]];
            if (hf && hf[blocksProperty[this.keywordIndex]] && hf[blocksProperty[this.keywordIndex]].length > 0) {
                writer.writeStartElement(undefined, 'headerReference', this.wNamespace);
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'even');
                hfId = this.getNextRelationShipID();
                writer.writeAttributeString(undefined, 'id', this.rNamespace, hfId);
                this.addHeaderFooter(hf, 'EvenHeader', hfId);
                writer.writeEndElement();
            }
            hf = headersFooters[evenFooterProperty[this.keywordIndex]];
            if (hf && hf[blocksProperty[this.keywordIndex]] && hf[blocksProperty[this.keywordIndex]].length > 0) {
                writer.writeStartElement(undefined, 'footerReference', this.wNamespace);
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'even');
                hfId = this.getNextRelationShipID();
                writer.writeAttributeString(undefined, 'id', this.rNamespace, hfId);
                this.addHeaderFooter(hf, 'EvenFooter', hfId);
                writer.writeEndElement();
            }
            hf = headersFooters[headerProperty[this.keywordIndex]];
            if (hf && hf[blocksProperty[this.keywordIndex]] && hf[blocksProperty[this.keywordIndex]].length > 0) {
                writer.writeStartElement(undefined, 'headerReference', this.wNamespace);
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'default');
                hfId = this.getNextRelationShipID();
                writer.writeAttributeString(undefined, 'id', this.rNamespace, hfId);
                this.addHeaderFooter(hf, 'OddHeader', hfId);
                writer.writeEndElement();
            }
            hf = headersFooters[footerProperty[this.keywordIndex]];
            if (hf && hf[blocksProperty[this.keywordIndex]] && hf[blocksProperty[this.keywordIndex]].length > 0) {
                writer.writeStartElement(undefined, 'footerReference', this.wNamespace);
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'default');
                hfId = this.getNextRelationShipID();
                writer.writeAttributeString(undefined, 'id', this.rNamespace, hfId);
                this.addHeaderFooter(hf, 'OddFooter', hfId);
                writer.writeEndElement();
            }
        }
    };
    // Adds the header footer details to the collection.
    WordExport.prototype.addHeaderFooter = function (hf, hfType, id) {
        var hfColl = new Dictionary();
        this.headersFooters.add(hfType, hfColl);
        this.headersFooters.get(hfType).add(id, hf);
    };
    // Serializes the bodyItems
    WordExport.prototype.serializeBodyItems = function (writer, blockCollection, isLastSection) {
        for (var i = 0; i < blockCollection.length; i++) {
            this.serializeBodyItem(writer, blockCollection[parseInt(i.toString(), 10)], isLastSection);
        }
    };
    // serialize the content Control
    /* eslint-disable-next-line max-len */
    WordExport.prototype.serializeContentControl = function (writer, contentControlItem, item, isLastSection, inlines) {
        if (isNullOrUndefined(contentControlItem)) {
            throw new Error('contentCOntrol should not be undefined');
        }
        writer.writeStartElement('w', 'sdt', this.wNamespace);
        writer.writeStartElement(undefined, 'sdtPr', this.wNamespace);
        if (!isNullOrUndefined(contentControlItem)) {
            this.serializeContentProperties(writer, contentControlItem, item, isLastSection, inlines);
        }
    };
    // serialize Content Control Properties
    /* eslint-disable-next-line max-len */
    WordExport.prototype.serializeContentProperties = function (writer, contentProperties, items, isLastSection, inlines) {
        var repeatSdt = undefined;
        if (!isNullOrUndefined(contentProperties[titleProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'alias', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, contentProperties[titleProperty[this.keywordIndex]]);
            writer.writeEndElement();
            writer.writeStartElement(undefined, 'tag', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, contentProperties[tagProperty[this.keywordIndex]]);
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(contentProperties[characterFormatProperty[this.keywordIndex]])) {
            this.serializeCharacterFormat(writer, items[contentControlPropertiesProperty[this.keywordIndex]][characterFormatProperty[this.keywordIndex]]);
        }
        // if (items.hasOwnProperty('blocks') && contentProperties.type !== 'CheckBox') {
        //     this.serializeContentParagraph(writer, items);
        // }
        if (HelperMethods.parseBoolValue(contentProperties[lockContentsProperty[this.keywordIndex]])
            || HelperMethods.parseBoolValue(contentProperties[lockContentControlProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'lock', this.wNamespace);
            if (HelperMethods.parseBoolValue(contentProperties[lockContentControlProperty[this.keywordIndex]])
                && HelperMethods.parseBoolValue(contentProperties[lockContentsProperty[this.keywordIndex]])) {
                writer.writeAttributeString('w', 'val', this.wNamespace, 'sdtContentLocked');
            }
            else if (HelperMethods.parseBoolValue(contentProperties[lockContentControlProperty[this.keywordIndex]])) {
                writer.writeAttributeString('w', 'val', this.wNamespace, 'sdtLocked');
            }
            else if (HelperMethods.parseBoolValue(contentProperties[lockContentsProperty[this.keywordIndex]])) {
                writer.writeAttributeString('w', 'val', this.wNamespace, 'contentLocked');
            }
            writer.writeEndElement();
        }
        if (HelperMethods.parseBoolValue(contentProperties[hasPlaceHolderTextProperty[this.keywordIndex]])
            && isNullOrUndefined(repeatSdt)) {
            writer.writeStartElement('w', 'placeholder', undefined);
            writer.writeAttributeString('w', 'docPart', this.wNamespace, undefined);
            writer.writeEndElement();
            writer.writeStartElement('w', 'showingPlcHdr', undefined);
            writer.writeEndElement();
        }
        if (HelperMethods.parseBoolValue(contentProperties[isTemporaryProperty[this.keywordIndex]])) {
            writer.writeStartElement('w', 'temporary', undefined);
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(contentProperties[appearanceProperty[this.keywordIndex]])) {
            writer.writeStartElement('w15', 'appearance', undefined);
            writer.writeAttributeString('w15', 'val', undefined, this.keywordIndex === 1 ? this.getContentControlAppearance(contentProperties[appearanceProperty[this.keywordIndex]]).toLowerCase() : contentProperties[appearanceProperty[this.keywordIndex]].toLowerCase());
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(contentProperties[colorProperty[this.keywordIndex]])) {
            writer.writeStartElement('w15', 'color', undefined);
            if (contentProperties[colorProperty[this.keywordIndex]] === 'empty' || contentProperties[colorProperty[this.keywordIndex]] === '#00000000') {
                writer.writeAttributeString('w', 'val', undefined, 'auto');
            }
            else {
                writer.writeAttributeString('w', 'val', undefined, this.getColor(contentProperties[colorProperty[this.keywordIndex]]));
            }
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(contentProperties[typeProperty[this.keywordIndex]]) && (contentProperties[typeProperty[this.keywordIndex]] === (this.keywordIndex === 1 ? 9 : 'Text'))) {
            writer.writeStartElement(undefined, 'text', this.wNamespace);
            writer.writeEndElement();
        }
        if (HelperMethods.parseBoolValue(contentProperties[multiLineProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'text', this.wNamespace);
            writer.writeAttributeString('w', 'multiLine', this.wNamespace, '1');
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(contentProperties[xmlMappingProperty[this.keywordIndex]])) {
            if (HelperMethods.parseBoolValue(contentProperties[xmlMappingProperty[this.keywordIndex]][isMappedProperty[this.keywordIndex]])) {
                writer.writeStartElement('w', 'dataBinding', this.wNamespace);
                var preMap = contentProperties[xmlMappingProperty[this.keywordIndex]][prefixMappingProperty[this.keywordIndex]];
                writer.writeAttributeString('w', 'prefixMappings', undefined, preMap);
                var xPath = contentProperties[xmlMappingProperty[this.keywordIndex]][xPathProperty[this.keywordIndex]];
                writer.writeAttributeString('w', 'xpath', undefined, xPath);
                var storeId = contentProperties[xmlMappingProperty[this.keywordIndex]][storeItemIdProperty[this.keywordIndex]];
                writer.writeAttributeString('w', 'storeItemID', undefined, storeId);
                writer.writeEndElement();
            }
        }
        if (contentProperties.picture) {
            writer.writeStartElement('w', 'picture', this.wNamespace);
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(contentProperties[uncheckedStateProperty[this.keywordIndex]]
            || contentProperties[checkedStateProperty[this.keywordIndex]])) {
            writer.writeStartElement('w14', 'checkbox', undefined);
            if (HelperMethods.parseBoolValue(contentProperties[isCheckedProperty[this.keywordIndex]])) {
                writer.writeStartElement('w14', 'checked', undefined);
                writer.writeAttributeString('w14', 'val', undefined, '1');
                writer.writeEndElement();
            }
            else {
                writer.writeStartElement('w14', 'checked', undefined);
                writer.writeAttributeString('w14', 'val', undefined, '0');
                writer.writeEndElement();
            }
            if (contentProperties[uncheckedStateProperty[this.keywordIndex]]) {
                writer.writeStartElement('w14', 'uncheckedState', undefined);
                writer.writeAttributeString('w14', 'val', undefined, this.toUnicode(contentProperties[uncheckedStateProperty[this.keywordIndex]][valueProperty[this.keywordIndex]]));
                writer.writeAttributeString('w14', 'font', undefined, (contentProperties[uncheckedStateProperty[this.keywordIndex]][fontProperty[this.keywordIndex]]));
                writer.writeEndElement();
            }
            if (contentProperties[checkedStateProperty[this.keywordIndex]]) {
                writer.writeStartElement('w14', 'checkedState', undefined);
                writer.writeAttributeString('w14', 'val', undefined, this.toUnicode(contentProperties[checkedStateProperty[this.keywordIndex]][valueProperty[this.keywordIndex]]));
                writer.writeAttributeString('w14', 'font', undefined, contentProperties[checkedStateProperty[this.keywordIndex]][fontProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(contentProperties[contentControlListItemsProperty[this.keywordIndex]])
            && contentProperties[typeProperty[this.keywordIndex]] === (this.keywordIndex === 1 ? 5 : 'DropDownList')) {
            var dropDownLists = contentProperties[contentControlListItemsProperty[this.keywordIndex]];
            writer.writeStartElement(undefined, 'dropDownList', this.wNamespace);
            this.serializeContentControlList(writer, dropDownLists);
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(contentProperties[contentControlListItemsProperty[this.keywordIndex]])
            && contentProperties[typeProperty[this.keywordIndex]] === (this.keywordIndex === 1 ? 3 : 'ComboBox')) {
            var comboList = contentProperties[contentControlListItemsProperty[this.keywordIndex]];
            writer.writeStartElement(undefined, 'comboBox', this.wNamespace);
            this.serializeContentControlList(writer, comboList);
            writer.writeEndElement();
        }
        this.serializeContentControlDate(writer, contentProperties);
        if (!isNullOrUndefined(contentProperties[typeProperty[this.keywordIndex]])) {
            if (contentProperties[typeProperty[this.keywordIndex]] === (this.keywordIndex === 1 ? 7 : 'Picture')) {
                writer.writeStartElement(undefined, 'picture', this.wNamespace);
                writer.writeEndElement();
            }
        }
        writer.writeEndElement();
        writer.writeStartElement('w', 'sdtContent', this.wNamespace);
        if (inlines) {
            return;
        }
        /* eslint-disable */
        if (items.hasOwnProperty(blocksProperty[this.keywordIndex]) && (isNullOrUndefined(items[cellFormatProperty[this.keywordIndex]]))) {
            for (var i = 0; i < items[blocksProperty[this.keywordIndex]].length; i++) {
                var block = items[blocksProperty[this.keywordIndex]][i];
                if (block.hasOwnProperty(inlinesProperty[this.keywordIndex])) {
                    this.paragraph = block;
                    this.serializeParagraph(writer, block, isLastSection);
                    this.paragraph = undefined;
                }
                else if (block.hasOwnProperty(rowFormatProperty[this.keywordIndex])) {
                    var mVerticalMerge = new Dictionary();
                    this.serializeRow(writer, block, mVerticalMerge);
                }
                else if (block.hasOwnProperty(contentControlPropertiesProperty[this.keywordIndex])) {
                    this.serializeContentControl(writer, block[contentControlPropertiesProperty[this.keywordIndex]], block, isLastSection);
                }
                else {
                    var table = block;
                    this.serializeTable(writer, table);
                }
            }
        }
        else if (items.hasOwnProperty(rowFormatProperty[this.keywordIndex])) {
            if (items[cellsProperty[this.keywordIndex]].length > 0) {
                var mVerticalMerge = new Dictionary();
                this.serializeRow(writer, items, mVerticalMerge);
            }
        }
        else if (items.hasOwnProperty(cellFormatProperty[this.keywordIndex])) {
            var mVerticalMerge = new Dictionary();
            this.serializeCell(writer, items, mVerticalMerge);
        }
        writer.writeEndElement();
        writer.writeEndElement();
    };
    WordExport.prototype.toUnicode = function (code) {
        var charCode = code.charCodeAt(0);
        return charCode.toString(16);
    };
    //serialize dropdown and list property
    WordExport.prototype.serializeContentControlList = function (writer, lists) {
        for (var i = 0; i < lists.length; i++) {
            writer.writeStartElement(undefined, 'listItem', this.wNamespace);
            if (!isNullOrUndefined(lists[i][displayTextProperty[this.keywordIndex]])) {
                writer.writeAttributeString('w', 'displayText', this.wNamespace, lists[i][displayTextProperty[this.keywordIndex]]);
            }
            writer.writeAttributeString('w', 'value', this.wNamespace, lists[i][valueProperty[this.keywordIndex]]);
            writer.writeEndElement();
        }
    };
    //Serialize character formatfor content control
    WordExport.prototype.serializeContentParagraph = function (writer, items) {
        for (var i = 0; i < items[blocksProperty[this.keywordIndex]].length; i++) {
            var blocks = items[blocksProperty[this.keywordIndex]][i];
            if (blocks.hasOwnProperty(inlinesProperty[this.keywordIndex])) {
                for (var j = 0; j < blocks[inlinesProperty[this.keywordIndex]].length; j++) {
                    var inlines = blocks[inlinesProperty[this.keywordIndex]][j];
                    if (!isNullOrUndefined(inlines[characterFormatProperty[this.keywordIndex]])) {
                        this.serializeCharacterFormat(writer, inlines[characterFormatProperty[this.keywordIndex]]);
                    }
                }
            }
        }
    };
    // serialize content control date property
    WordExport.prototype.serializeContentControlDate = function (writer, contentProperties) {
        if (contentProperties[typeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 4 : 'Date')) {
            writer.writeStartElement('w', 'date', this.wNamespace);
            if (!isNullOrUndefined(contentProperties[dateCalendarTypeProperty[this.keywordIndex]])) {
                writer.writeStartElement('w', 'calender', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, this.keywordIndex == 1 ? this.getDateCalendarType(contentProperties[dateCalendarTypeProperty[this.keywordIndex]]) : contentProperties[dateCalendarTypeProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            if (!isNullOrUndefined(contentProperties[dateDisplayLocaleProperty[this.keywordIndex]])) {
                writer.writeStartElement('w', 'lid', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, contentProperties[dateDisplayLocaleProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            if (!isNullOrUndefined(contentProperties[dateStorageFormatProperty[this.keywordIndex]])) {
                writer.writeStartElement('w', 'storeMappedDataAs', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, this.keywordIndex == 1 ? this.getDateStorageFormat(contentProperties[dateStorageFormatProperty[this.keywordIndex]]) : contentProperties[dateStorageFormatProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            if (!isNullOrUndefined(contentProperties[dateDisplayFormatProperty[this.keywordIndex]])) {
                writer.writeStartElement('w', 'dateFormat', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, contentProperties[dateDisplayFormatProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            writer.writeEndElement();
        }
    };
    // Serialize the TextBody item
    WordExport.prototype.serializeBodyItem = function (writer, item, isLastSection) {
        if (isNullOrUndefined(item)) {
            throw new Error('BodyItem should not be undefined');
        }
        if (item.hasOwnProperty(contentControlPropertiesProperty[this.keywordIndex])) {
            this.serializeContentControl(writer, item[contentControlPropertiesProperty[this.keywordIndex]], item, isLastSection);
        }
        else if (item.hasOwnProperty(inlinesProperty[this.keywordIndex])) {
            this.paragraph = item;
            this.serializeParagraph(writer, item, isLastSection);
            this.paragraph = undefined;
        }
        else {
            var table = item;
            for (var i = 0; i < table[rowsProperty[this.keywordIndex]].length; i++) {
                if (table[rowsProperty[this.keywordIndex]][i][cellsProperty[this.keywordIndex]].length > 0) {
                    this.serializeTable(writer, table);
                    break;
                }
            }
            var sec = this.blockOwner;
            //Need to write the Section Properties if the Table is last item in the section
            if (!isLastSection && sec.hasOwnProperty(sectionFormatProperty[this.keywordIndex])
                && sec[blocksProperty[this.keywordIndex]].indexOf(table) === sec[blocksProperty[this.keywordIndex]].length - 1) {
                writer.writeStartElement('w', 'p', this.wNamespace);
                writer.writeStartElement(undefined, 'pPr', this.wNamespace);
                this.serializeSectionProperties(writer, sec);
                writer.writeEndElement();
                writer.writeEndElement();
            }
        }
    };
    // Serialize the paragraph
    WordExport.prototype.serializeParagraph = function (writer, paragraph, isLastSection) {
        if (isNullOrUndefined(paragraph)) {
            throw new Error('Paragraph should not be undefined');
        }
        // if (paragraph.ParagraphFormat.PageBreakAfter && !IsPageBreakNeedToBeSkipped(paragraph as Entity))
        //     paragraph.InsertBreak(BreakType.PageBreak);
        // if (paragraph.ParagraphFormat.ColumnBreakAfter && !IsPageBreakNeedToBeSkipped(paragraph as Entity))
        //     paragraph.InsertBreak(BreakType.ColumnBreak);
        //Splits the paragraph based on the newline character
        // paragraph.SplitTextRange();
        if (!isNullOrUndefined(this.document.optimizeSfdt)) {
            this.keywordIndex = this.document.optimizeSfdt ? 1 : 0;
        }
        writer.writeStartElement('w', 'p', this.wNamespace);
        if (this.isInsideComment) {
            writer.writeAttributeString('w14', 'paraId', undefined, this.commentParaID.toString());
        }
        writer.writeStartElement(undefined, 'pPr', this.wNamespace);
        if (!isNullOrUndefined(paragraph[paragraphFormatProperty[this.keywordIndex]])) {
            this.serializeParagraphFormat(writer, paragraph[paragraphFormatProperty[this.keywordIndex]], paragraph);
        }
        if (!isNullOrUndefined(paragraph[characterFormatProperty[this.keywordIndex]])) {
            this.serializeCharacterFormat(writer, paragraph[characterFormatProperty[this.keywordIndex]]);
        }
        var sec = this.blockOwner;
        //Need to write the Section Properties if the Paragraph is last item in the section
        if (!isLastSection && sec.hasOwnProperty(sectionFormatProperty[this.keywordIndex])
            && sec[blocksProperty[this.keywordIndex]].indexOf(paragraph) === sec[blocksProperty[this.keywordIndex]].length - 1) {
            this.serializeSectionProperties(writer, sec);
        }
        writer.writeEndElement(); //end of pPr
        // Serialize watermark if paragraph is the first item of Header document.
        // EnsureWatermark(paragraph);
        this.prevRevisionIds = [];
        this.serializeParagraphItems(writer, paragraph[inlinesProperty[this.keywordIndex]]);
        if ((!this.isBookmarkAtEnd && !this.isBookmarkAtRowEnd) || this.isVerticalMergeCell) {
            writer.writeEndElement(); //end of paragraph tag.
        }
        this.isBookmarkAtEnd = false;
    };
    //Serialize Revision start
    WordExport.prototype.serializeRevisionStart = function (writer, item, previousNode) {
        if (item.hasOwnProperty(revisionIdsProperty[this.keywordIndex])) {
            if (!isNullOrUndefined(previousNode) && previousNode.hasOwnProperty(bookmarkTypeProperty[this.keywordIndex]) && (previousNode[bookmarkTypeProperty[this.keywordIndex]] === 0 && !(previousNode[nameProperty[this.keywordIndex]].indexOf('_Toc') >= 0) && isNullOrUndefined(item[revisionIdsProperty[this.keywordIndex]]))) {
                return;
            }
            var ids = item[revisionIdsProperty[this.keywordIndex]];
            for (var i = 0; i < ids.length; i++) {
                var revision = this.retrieveRevision(ids[i]);
                if (revision.revisionType === 'Insertion') {
                    this.serializeTrackChanges(writer, 'ins', revision.author, revision.date);
                }
                if (revision.revisionType === 'Deletion') {
                    this.serializeTrackChanges(writer, 'del', revision.author, revision.date);
                }
            }
        }
    };
    //Serialize track changes
    WordExport.prototype.serializeTrackChanges = function (writer, type, author, date) {
        writer.writeStartElement('w', type, this.wNamespace);
        writer.writeAttributeString('w', 'id', this.wNamespace, (this.trackChangesId++).toString());
        if (author != "Unknown") {
            writer.writeAttributeString('w', 'author', this.wNamespace, author);
        }
        writer.writeAttributeString('w', 'date', this.wNamespace, date);
    };
    WordExport.prototype.retrieveRevision = function (id) {
        var matchedRevisions = [];
        for (var i = 0; i < this.revisions.length; i++) {
            if (this.revisions[i].revisionID === id) {
                return this.revisions[i];
            }
        }
        return undefined;
    };
    // Serialize the paragraph items
    WordExport.prototype.serializeParagraphItems = function (writer, paraItems, keyindex) {
        if (isNullOrUndefined(paraItems)) {
            throw new Error('Paragraph should not be undefined');
        }
        var inlines;
        var previousNode = undefined;
        var isContinueOverride = false;
        if (isNullOrUndefined(this.keywordIndex)) {
            this.keywordIndex = keyindex;
        }
        for (var i = 0; i < paraItems.length; i++) {
            var item = paraItems[i];
            if (item.hasOwnProperty(contentControlPropertiesProperty[this.keywordIndex])) {
                inlines = true;
                this.serializeContentControl(writer, item[contentControlPropertiesProperty[this.keywordIndex]], item, undefined, inlines);
                this.serializeParagraphItems(writer, item[inlinesProperty[this.keywordIndex]]);
            }
            if (item.hasOwnProperty(inlinesProperty[this.keywordIndex])) {
                this.serializeParagraphItems(writer, item);
            }
            this.serializeRevisionStart(writer, item, previousNode);
            var isBdo = false;
            if (item[characterFormatProperty[this.keywordIndex]]) {
                isBdo = !isNullOrUndefined(item[characterFormatProperty[this.keywordIndex]][bdoProperty[this.keywordIndex]]) && item[characterFormatProperty[this.keywordIndex]][bdoProperty[this.keywordIndex]] !== 0;
                if (isBdo && !isContinueOverride) {
                    this.serializeBiDirectionalOverride(writer, item[characterFormatProperty[this.keywordIndex]]);
                    isContinueOverride = true;
                }
            }
            if (isContinueOverride && !isBdo) {
                writer.writeEndElement();
                isContinueOverride = false;
            }
            if (item.hasOwnProperty(fieldTypeProperty[this.keywordIndex])) {
                this.serializeFieldCharacter(writer, item);
            }
            else if (item.hasOwnProperty(imageStringProperty[this.keywordIndex])) {
                this.serializePicture(writer, item);
            }
            else if (item.hasOwnProperty(shapeIdProperty[this.keywordIndex])) {
                var currentParargaph = this.paragraph;
                this.serializeShape(writer, item);
                this.paragraph = currentParargaph;
            }
            else if (item.hasOwnProperty(bookmarkTypeProperty[this.keywordIndex])) {
                this.serializeBookMark(writer, item);
            }
            else if (item.hasOwnProperty(editRangeIdProperty[this.keywordIndex])) {
                this.serializeEditRange(writer, item);
            }
            else if (item.hasOwnProperty(chartTypeProperty[this.keywordIndex])) {
                this.chart = item;
                this.serializeChart(writer, item);
                // chart.xml
                this.serializeChartStructure();
            }
            else if (item.hasOwnProperty(commentCharacterTypeProperty[this.keywordIndex])) {
                this.serializeComment(writer, item);
            }
            else if (item.hasOwnProperty(footnoteTypeProperty[this.keywordIndex])) {
                this.serializeEFReference(writer, item);
            }
            else {
                this.serializeTextRange(writer, item, previousNode);
            }
            //Serialize revision end
            this.serializeRevisionEnd(writer, item, previousNode);
            previousNode = item;
            if (inlines) {
                writer.writeEndElement();
                writer.writeEndElement();
                inlines = false;
            }
        }
        if (isContinueOverride) {
            writer.writeEndElement();
        }
    };
    WordExport.prototype.serializeEFReference = function (writer, item) {
        var efId = '';
        var ef = item[blocksProperty[this.keywordIndex]];
        if (item[footnoteTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Footnote')) {
            writer.writeStartElement(undefined, 'r', this.wNamespace);
            this.serializeCharacterFormat(writer, item[characterFormatProperty[this.keywordIndex]]);
            writer.writeStartElement(undefined, 'footnoteReference', this.wNamespace);
            if (this.document[footnotesProperty[this.keywordIndex]][continuationNoticeProperty[this.keywordIndex]] && this.efRelationShipId === 0) {
                this.efRelationShipId = 1;
            }
            efId = this.getEFNextRelationShipID();
            writer.writeAttributeString(undefined, 'id', this.wNamespace, efId);
            this.addFootnotesEndnotes(ef, 'footnote', efId);
            writer.writeEndElement();
            writer.writeEndElement();
        }
        else {
            writer.writeStartElement(undefined, 'r', this.wNamespace);
            this.serializeCharacterFormat(writer, item[characterFormatProperty[this.keywordIndex]]);
            writer.writeStartElement(undefined, 'endnoteReference', this.wNamespace);
            if (this.document[endnotesProperty[this.keywordIndex]][continuationNoticeProperty[this.keywordIndex]] && this.efRelationShipId === 0) {
                this.efRelationShipId = 1;
            }
            efId = this.getEFNextRelationShipID();
            writer.writeAttributeString(undefined, 'id', this.wNamespace, efId);
            this.addFootnotesEndnotes(ef, 'endnote', efId);
            writer.writeEndElement();
            writer.writeEndElement();
        }
    };
    WordExport.prototype.addFootnotesEndnotes = function (ef, efType, id) {
        var efColl = new Dictionary();
        this.endnotesFootnotes.add(efType, efColl);
        this.endnotesFootnotes.get(efType).add(id, ef);
    };
    WordExport.prototype.serializeEndnotesFootnote = function (writer, efType) {
        if (this.endnotesFootnotes.length === 0) {
            return;
        }
        var endnoteFootnotePath;
        var endnoteFootnoteRelsPath;
        if (!this.endnotesFootnotes.containsKey(efType)) {
            return;
        }
        var efColl = this.endnotesFootnotes.get(efType);
        var ef = undefined;
        for (var i = 0; i < efColl.keys.length; i++) {
            var id = efColl.keys[i];
            ef = efColl.get(id);
            if (efType === 'endnote') {
                endnoteFootnotePath = this.endnotesPath;
                endnoteFootnoteRelsPath = this.endnotesRelationPath;
                this.serializeInlineEndnotes(writer, ef, id);
            }
            else {
                endnoteFootnotePath = this.footnotesPath;
                endnoteFootnoteRelsPath = this.footnotesRelationPath;
                this.serializeInlineFootnotes(writer, ef, id);
            }
        }
    };
    WordExport.prototype.serializeInlineEndnotes = function (writer, endNote, id) {
        this.isSerializeFootEndNote = "Endnote";
        this.endNoteFootnote = endNote;
        var owner = this.blockOwner;
        this.blockOwner = endNote;
        writer.writeStartElement('w', 'endnote', this.wNamespace);
        writer.writeAttributeString(undefined, 'id', this.wNamespace, id);
        this.serializeBodyItems(writer, endNote, true);
        writer.writeEndElement();
        this.blockOwner = owner;
        this.endNoteFootnote = undefined;
        this.isSerializeFootEndNote = undefined;
    };
    WordExport.prototype.serializeInlineFootnotes = function (writer, footNote, id) {
        this.isSerializeFootEndNote = "Footnote";
        this.endNoteFootnote = footNote;
        var owner = this.blockOwner;
        this.blockOwner = footNote;
        writer.writeStartElement('w', 'footnote', this.wNamespace);
        writer.writeAttributeString(undefined, 'id', this.wNamespace, id);
        this.serializeBodyItems(writer, footNote, true);
        writer.writeEndElement();
        this.blockOwner = owner;
        this.endNoteFootnote = undefined;
        this.isSerializeFootEndNote = undefined;
    };
    // private footnoteXMLItem(fileIndex: number): any {
    //     let writer = new XmlWriter;
    //     writer.writeStartElement(undefined, 'Sources', this.wNamespace)
    //     writer.writeAttributeString('xmlns', 'b', undefined, 'http://schemas.openxmlformats.org/officeDocument/2006/bibliography')
    //     writer.writeAttributeString(undefined,'xmlns',  undefined, 'http://schemas.openxmlformats.org/officeDocument/2006/bibliography')
    //     writer.writeAttributeString(undefined,'SelectedStyle', undefined,"\APASixthEditionOfficeOnline.xsl")
    //     writer.writeAttributeString(undefined,'StyleName',  undefined,"APA")
    //     writer.writeAttributeString(undefined,'Version',  undefined,"6")
    //     writer.writeEndElement();
    //     let itemPath: string = this.customXMLItemsPath + fileIndex + '.xml';
    //     let zipArchiveItem: ZipArchiveItem = new ZipArchiveItem(writer.buffer, itemPath);
    //     this.mArchive.addItem(zipArchiveItem);
    //     return itemPath;
    // }
    // private footnoteXMLItemProps(itemID: string, fileIndex: number): any {
    //     let writer: XmlWriter = new XmlWriter();
    //     let customitemPropsPath: string = this.customXMLItemsPropspath + fileIndex + '.xml';
    //     let itemPropsPath: string = this.itemPropsPath + fileIndex + '.xml';
    //     writer.writeStartElement('ds', 'datastoreItem', this.wNamespace);
    //     writer.writeAttributeString('ds', 'itemID', undefined, itemID);
    //     writer.writeAttributeString('xmlns', 'ds', undefined, this.dsNamespace);
    //     writer.writeStartElement('ds','schemaRefs', this.wNamespace);
    //     writer.writeStartElement('ds', 'schemaRef', this.wNamespace);
    //     writer.writeAttributeString('ds','uri', undefined,'http://schemas.openxmlformats.org/officeDocument/2006/bibliography' )
    //     writer.writeEndElement();
    //     writer.writeEndElement();
    //     writer.writeEndElement();
    //     this.customXMLProps.push(customitemPropsPath);
    //     let zipArchiveItem: ZipArchiveItem = new ZipArchiveItem(writer.buffer, customitemPropsPath);
    //     this.mArchive.addItem(zipArchiveItem);
    //     return itemPropsPath;
    // }
    //Serialize the Footnote Endnotes Common Atributes
    WordExport.prototype.writeEFCommonAttributes = function (writer) {
        writer.writeAttributeString('xmlns', 'wpc', undefined, this.wpCanvasNamespace);
        writer.writeAttributeString('xmlns', 'cx', undefined, this.cxNamespace);
        writer.writeAttributeString('xmlns', 'aink', undefined, 'http://schemas.microsoft.com/office/drawing/2016/ink');
        writer.writeAttributeString('xmlns', 'am3d', undefined, 'http://schemas.microsoft.com/office/drawing/2017/,odel3d');
        this.writeCustom(writer);
        writer.writeAttributeString('xmlns', 'wp14', undefined, this.wpDrawingNamespace);
        writer.writeAttributeString('xmlns', 'wp', undefined, this.wpNamespace);
        writer.writeAttributeString('xmlns', 'w', undefined, this.wNamespace);
        this.writeDup(writer);
        writer.writeAttributeString('xmlns', 'wne', undefined, this.wneNamespace);
        writer.writeAttributeString('xmlns', 'wps', undefined, this.wpShapeNamespace);
        writer.writeAttributeString('mc', 'Ignorable', undefined, 'w14 w15');
    };
    WordExport.prototype.serializeFootnotes = function () {
        if (isNullOrUndefined(this.document[footnotesProperty[this.keywordIndex]])) {
            return;
        }
        else {
            var writer = new XmlWriter();
            writer.writeStartElement('w', 'footnotes', this.wNamespace);
            this.writeEFCommonAttributes(writer);
            writer.writeStartElement('w', 'footnote', this.wNamespace);
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'separator');
            writer.writeAttributeString(undefined, 'id', this.wNamespace, '-1');
            this.serializeBodyItems(writer, this.document[footnotesProperty[this.keywordIndex]][separatorProperty[this.keywordIndex]], true);
            writer.writeEndElement();
            writer.writeStartElement('w', 'footnote', this.wNamespace);
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'continuationSeparator');
            writer.writeAttributeString(undefined, 'id', this.wNamespace, '0');
            this.serializeBodyItems(writer, this.document[footnotesProperty[this.keywordIndex]][continuationSeparatorProperty[this.keywordIndex]], true);
            writer.writeEndElement();
            if (this.document[footnotesProperty[this.keywordIndex]][continuationNoticeProperty[this.keywordIndex]]) {
                writer.writeStartElement('w', 'footnote', this.wNamespace);
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'continuationNotice');
                writer.writeAttributeString(undefined, 'id', this.wNamespace, '1');
                this.serializeBodyItems(writer, this.document[footnotesProperty[this.keywordIndex]][continuationNoticeProperty[this.keywordIndex]], true);
                writer.writeEndElement();
            }
            this.serializeEndnotesFootnote(writer, 'footnote');
            writer.writeEndElement();
            var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.footnotesPath);
            this.mArchive.addItem(zipArchiveItem);
        }
    };
    WordExport.prototype.serializeEndnotes = function () {
        if (isNullOrUndefined(this.document[endnotesProperty[this.keywordIndex]])) {
            return;
        }
        else {
            var writer = new XmlWriter();
            writer.writeStartElement('w', 'endnotes', this.wNamespace);
            this.writeEFCommonAttributes(writer);
            writer.writeStartElement('w', 'endnote', this.wNamespace);
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'separator');
            writer.writeAttributeString(undefined, 'id', this.wNamespace, '-1');
            this.serializeBodyItems(writer, this.document[endnotesProperty[this.keywordIndex]][separatorProperty[this.keywordIndex]], true);
            writer.writeEndElement();
            writer.writeStartElement('w', 'endnote', this.wNamespace);
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'continuationSeparator');
            writer.writeAttributeString(undefined, 'id', this.wNamespace, '0');
            this.serializeBodyItems(writer, this.document[endnotesProperty[this.keywordIndex]][continuationSeparatorProperty[this.keywordIndex]], true);
            writer.writeEndElement();
            if (this.document[endnotesProperty[this.keywordIndex]][continuationNoticeProperty[this.keywordIndex]]) {
                writer.writeStartElement('w', 'endnote', this.wNamespace);
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'continuationNotice');
                writer.writeAttributeString(undefined, 'id', this.wNamespace, '1');
                this.serializeBodyItems(writer, this.document[endnotesProperty[this.keywordIndex]][continuationNoticeProperty[this.keywordIndex]], true);
                writer.writeEndElement();
            }
            this.serializeEndnotesFootnote(writer, 'endnote');
            writer.writeEndElement();
            var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.endnotesPath);
            this.mArchive.addItem(zipArchiveItem);
        }
    };
    //Serialize Revision end
    WordExport.prototype.serializeRevisionEnd = function (writer, item, previousNode) {
        if (item.hasOwnProperty(revisionIdsProperty[this.keywordIndex])) {
            // Commnt the below code for the issue "Bug 899350: Resolve issues when exporting documents with TOC revisions."
            // if (!isNullOrUndefined(previousNode) && previousNode.hasOwnProperty(fieldTypeProperty[this.keywordIndex]) && (previousNode[fieldTypeProperty[this.keywordIndex]] === 0 && item[textProperty[this.keywordIndex]].indexOf('TOC') >= 0)) {
            //     return;
            // }
            for (var i = 0; i < item[revisionIdsProperty[this.keywordIndex]].length; i++) {
                var revision = this.retrieveRevision(item[revisionIdsProperty[this.keywordIndex]][i]);
                if (revision.revisionType === 'Insertion' || revision.revisionType === 'Deletion') {
                    writer.writeEndElement();
                }
            }
        }
    };
    // Serialize the comment
    WordExport.prototype.serializeComment = function (writer, comment) {
        if (!(this.mComments.length === 1 && this.mComments[0].text === '')) {
            if (comment[commentCharacterTypeProperty[this.keywordIndex]] === 0) {
                writer.writeStartElement('w', 'commentRangeStart', this.wNamespace);
            }
            else if (comment[commentCharacterTypeProperty[this.keywordIndex]] === 1) {
                writer.writeStartElement('w', 'commentRangeEnd', this.wNamespace);
            }
            var commentId = this.commentId[comment[commentIdProperty[this.keywordIndex]]];
            if (isNullOrUndefined(commentId)) {
                commentId = this.commentId[comment[commentIdProperty[this.keywordIndex]]] = this.currentCommentId++;
            }
            writer.writeAttributeString('w', 'id', this.wNamespace, commentId.toString());
            writer.writeEndElement();
            if (comment[commentCharacterTypeProperty[this.keywordIndex]] === 1) {
                this.serializeCommentItems(writer, commentId);
            }
        }
    };
    WordExport.prototype.serializeCommentItems = function (writer, commentId) {
        writer.writeStartElement('w', 'r', this.wNamespace);
        writer.writeStartElement('w', 'commentReference', this.wNamespace);
        writer.writeAttributeString('w', 'id', this.wNamespace, commentId.toString());
        writer.writeEndElement();
        writer.writeEndElement();
    };
    WordExport.prototype.serializeBiDirectionalOverride = function (writer, characterFormat) {
        writer.writeStartElement(undefined, 'bdo', this.wNamespace);
        writer.writeAttributeString(undefined, 'val', this.wNamespace, this.keywordIndex == 1 ? this.getBiDirectionalOverride(characterFormat[bdoProperty[this.keywordIndex]]).toLowerCase() : characterFormat[bdoProperty[this.keywordIndex]].toLowerCase());
    };
    // Serialize Document Protection
    //<w:permStart w:id="627587516" w:edGrp="everyone" />
    WordExport.prototype.serializeEditRange = function (writer, editElement) {
        if (editElement.hasOwnProperty(editableRangeStartProperty[this.keywordIndex])) {
            writer.writeStartElement('w', 'permEnd', this.wNamespace);
        }
        else {
            writer.writeStartElement('w', 'permStart', this.wNamespace);
            if (editElement[userProperty[this.keywordIndex]] && editElement[userProperty[this.keywordIndex]] !== '') {
                writer.writeAttributeString('w', 'ed', this.wNamespace, editElement[userProperty[this.keywordIndex]]);
            }
            if (editElement[groupProperty[this.keywordIndex]] && editElement[groupProperty[this.keywordIndex]] !== '') {
                writer.writeAttributeString('w', 'edGrp', this.wNamespace, editElement[groupProperty[this.keywordIndex]].toLowerCase());
            }
            if (!isNullOrUndefined(editElement[columnFirstProperty[this.keywordIndex]]) && editElement[columnFirstProperty[this.keywordIndex]] !== -1) {
                writer.writeAttributeString('w', 'colFirst', this.wNamespace, editElement[columnFirstProperty[this.keywordIndex]].toString());
            }
            if (!isNullOrUndefined(editElement[columnLastProperty[this.keywordIndex]]) && editElement[columnLastProperty[this.keywordIndex]] !== -1) {
                writer.writeAttributeString('w', 'colLast', this.wNamespace, editElement[columnLastProperty[this.keywordIndex]].toString());
            }
        }
        writer.writeAttributeString('w', 'id', this.wNamespace, editElement[editRangeIdProperty[this.keywordIndex]]);
        writer.writeEndElement();
    };
    // Serialize the book mark
    WordExport.prototype.serializeBookMark = function (writer, bookmark) {
        var bookmarkId = this.getBookmarkId(bookmark[nameProperty[this.keywordIndex]]);
        var bookmarkName = bookmark[nameProperty[this.keywordIndex]];
        if (bookmark[bookmarkTypeProperty[this.keywordIndex]] === 0) {
            writer.writeStartElement('w', 'bookmarkStart', this.wNamespace);
            writer.writeAttributeString('w', 'name', this.wNamespace, bookmarkName);
            if (!isNullOrUndefined(bookmark[propertiesProperty[this.keywordIndex]])) {
                writer.writeAttributeString('w', 'colFirst', this.wNamespace, bookmark[propertiesProperty[this.keywordIndex]][columnFirstProperty[this.keywordIndex]].toString());
                writer.writeAttributeString('w', 'colLast', this.wNamespace, bookmark[propertiesProperty[this.keywordIndex]][columnLastProperty[this.keywordIndex]].toString());
            }
        }
        else if (bookmark[bookmarkTypeProperty[this.keywordIndex]] === 1) {
            if (!isNullOrUndefined(bookmark[propertiesProperty[this.keywordIndex]]) && !this.isBookmarkAtEnd && !this.isBookmarkAtRowEnd) {
                if (HelperMethods.parseBoolValue(bookmark[propertiesProperty[this.keywordIndex]][isAfterParagraphMarkProperty[this.keywordIndex]])) {
                    writer.writeEndElement();
                    this.isBookmarkAtEnd = true;
                }
                else if (HelperMethods.parseBoolValue(bookmark[propertiesProperty[this.keywordIndex]][isAfterRowMarkProperty[this.keywordIndex]])) {
                    writer.writeEndElement();
                    writer.writeEndElement();
                    writer.writeEndElement();
                    this.isBookmarkAtRowEnd = true;
                }
            }
            writer.writeStartElement('w', 'bookmarkEnd', this.wNamespace);
        }
        writer.writeAttributeString('w', 'id', this.wNamespace, bookmarkId.toString());
        writer.writeEndElement();
    };
    WordExport.prototype.getBookmarkId = function (name) {
        var index = this.bookmarks.indexOf(name);
        if (index < 0) {
            index = this.bookmarks.length;
            this.bookmarks.push(name);
        }
        return index;
    };
    // Serialize the picture.
    WordExport.prototype.serializePicture = function (writer, image) {
        if (image[widthProperty[this.keywordIndex]] >= 0 && image[heightProperty[this.keywordIndex]] >= 0) {
            writer.writeStartElement(undefined, 'r', this.wNamespace);
            this.serializeCharacterFormat(writer, image[characterFormatProperty[this.keywordIndex]]);
            this.serializeDrawing(writer, image);
            writer.writeEndElement(); //end of run element
        }
    };
    WordExport.prototype.serializeShape = function (writer, item) {
        if (item[widthProperty[this.keywordIndex]] >= 0 && item[heightProperty[this.keywordIndex]] >= 0) {
            writer.writeStartElement(undefined, 'r', this.wNamespace);
            this.serializeCharacterFormat(writer, item[characterFormatProperty[this.keywordIndex]]);
            if (item[horizontalRuleProperty[this.keywordIndex]] > 0) {
                this.serializeHorizontalRule(writer, item);
            }
            else {
                this.serializeDrawing(writer, item);
            }
            writer.writeEndElement(); //end of run element
        }
    };
    WordExport.prototype.serializeHorizontalRule = function (writer, shape) {
        writer.writeStartElement(undefined, 'pict', this.wNamespace);
        writer.writeStartElement('v', 'rect', undefined);
        var cx = Math.round(shape[widthProperty[this.keywordIndex]]);
        var cy = Math.round(shape[heightProperty[this.keywordIndex]]);
        writer.writeAttributeString(undefined, 'style', undefined, 'width:' + cx.toString() + ';height:' + cy.toString());
        if (shape[horizontalAlignmentProperty[this.keywordIndex]] > 0) {
            var horAlig = this.keywordIndex == 1 ? this.getShapeHorizontalAlignment(shape[horizontalAlignmentProperty[this.keywordIndex]]) : shape[horizontalAlignmentProperty[this.keywordIndex]].toString();
            writer.writeAttributeString('o', 'hralign', undefined, horAlig.toLowerCase());
        }
        writer.writeAttributeString('o', 'hrstd', undefined, 't');
        writer.writeAttributeString('o', 'hr', undefined, 't');
        writer.writeAttributeString(undefined, 'fillcolor', undefined, this.getColor(shape[fillFormatProperty[this.keywordIndex]][colorProperty[this.keywordIndex]]));
        writer.writeAttributeString(undefined, 'stroked', undefined, 'f');
        writer.writeEndElement();
        writer.writeEndElement();
    };
    // Serialize the drawing element.
    WordExport.prototype.serializeDrawing = function (writer, draw) {
        writer.writeStartElement(undefined, 'drawing', this.wNamespace);
        if (draw.hasOwnProperty(chartTypeProperty[this.keywordIndex])) {
            this.serializeInlineCharts(writer, draw);
        }
        else {
            if (draw[textWrappingStyleProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Inline')) {
                this.serializeInlinePictureAndShape(writer, draw);
            }
            else {
                this.serializeWrappingPictureAndShape(writer, draw);
            }
        }
        writer.writeEndElement();
    };
    // Serialize the Other Wrapping picture & Shape.
    WordExport.prototype.serializeWrappingPictureAndShape = function (writer, picture) {
        if (!isNullOrUndefined(this.document.optimizeSfdt)) {
            this.keywordIndex = this.document.optimizeSfdt ? 1 : 0;
        }
        writer.writeStartElement('wp', 'anchor', this.wpNamespace);
        this.serializePictureAndShapeDistance(writer, picture);
        writer.writeAttributeString(undefined, 'simplePos', undefined, '0');
        writer.writeAttributeString(undefined, 'relativeHeight', undefined, picture[zOrderPositionProperty[this.keywordIndex]] ? Math.abs(picture[zOrderPositionProperty[this.keywordIndex]]).toString() : '0');
        var behindText = (picture[textWrappingStyleProperty[this.keywordIndex]] && picture[textWrappingStyleProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 4 : 'Behind'));
        writer.writeAttributeString(undefined, 'behindDoc', undefined, behindText ? '1' : '0');
        // LockAnchor & LayoutInCell & AllowOverlap in these boolean has 0 and 1 as values.If the value is null or undefined then set the default value as 0.
        var lockAnchor = this.keywordIndex == 1 ? !isNullOrUndefined(picture[lockAnchorProperty[this.keywordIndex]]) ? picture[lockAnchorProperty[this.keywordIndex]].toString() : '0' : (picture[lockAnchorProperty[this.keywordIndex]]) ? '1' : '0';
        writer.writeAttributeString(undefined, 'locked', undefined, lockAnchor);
        var layoutcell = this.keywordIndex == 1 ? !isNullOrUndefined(picture[layoutInCellProperty[this.keywordIndex]]) ? picture[layoutInCellProperty[this.keywordIndex]].toString() : '0' : (picture[layoutInCellProperty[this.keywordIndex]]) ? '1' : '0';
        writer.writeAttributeString(undefined, 'layoutInCell', undefined, layoutcell);
        var allowOverlap = this.keywordIndex == 1 ? !isNullOrUndefined(picture[allowOverlapProperty[this.keywordIndex]]) ? picture[allowOverlapProperty[this.keywordIndex]].toString() : '0' : (picture[allowOverlapProperty[this.keywordIndex]]) ? '1' : '0';
        writer.writeAttributeString(undefined, 'allowOverlap', undefined, allowOverlap);
        writer.writeStartElement('wp', 'simplePos', this.wpNamespace);
        writer.writeAttributeString(undefined, 'x', undefined, '0');
        writer.writeAttributeString(undefined, 'y', undefined, '0');
        writer.writeEndElement();
        writer.writeStartElement('wp', 'positionH', this.wpNamespace);
        var horizontalOrigin = this.keywordIndex == 1 ? this.getHorizontalOrigin(picture[horizontalOriginProperty[this.keywordIndex]]) : picture[horizontalOriginProperty[this.keywordIndex]].toString();
        writer.writeAttributeString(undefined, 'relativeFrom', undefined, HelperMethods.formatText("firstlower", horizontalOrigin));
        if (picture[horizontalAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'None')) {
            writer.writeStartElement('wp', 'posOffset', this.wpNamespace);
            var horPos = Math.round(picture[horizontalPositionProperty[this.keywordIndex]] * this.emusPerPoint);
            writer.writeString(horPos.toString());
            writer.writeEndElement(); //end of posOffset
        }
        else {
            writer.writeStartElement('wp', 'align', this.wpNamespace);
            var horAlig = this.keywordIndex == 1 ? this.getShapeHorizontalAlignment(picture[horizontalAlignmentProperty[this.keywordIndex]]) : picture[horizontalAlignmentProperty[this.keywordIndex]].toString();
            writer.writeString(horAlig.toLowerCase());
            writer.writeEndElement(); //end of align
        }
        writer.writeEndElement(); //end of postionH
        writer.writeStartElement('wp', 'positionV', this.wpNamespace);
        var verticalOrigin = this.keywordIndex == 1 ? this.getVerticalOrigin(picture[verticalOriginProperty[this.keywordIndex]]) : picture[verticalOriginProperty[this.keywordIndex]].toString();
        writer.writeAttributeString(undefined, 'relativeFrom', undefined, HelperMethods.formatText("firstlower", verticalOrigin));
        if (picture[verticalAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'None')) {
            writer.writeStartElement('wp', 'posOffset', this.wpNamespace);
            var vertPos = Math.round(picture[verticalPositionProperty[this.keywordIndex]] * this.emusPerPoint);
            writer.writeString(vertPos.toString());
            writer.writeEndElement(); // end of posOffset
        }
        else {
            writer.writeStartElement('wp', 'align', this.wpNamespace);
            var verAlig = this.keywordIndex == 1 ? this.getShapeVerticalAlignment(picture[verticalAlignmentProperty[this.keywordIndex]]) : picture[verticalAlignmentProperty[this.keywordIndex]];
            writer.writeString(verAlig.toLowerCase());
            writer.writeEndElement(); //end of align
        }
        writer.writeEndElement(); //end of postionV
        writer.writeStartElement(undefined, 'extent', this.wpNamespace);
        var cx = Math.round(picture[widthProperty[this.keywordIndex]] * this.emusPerPoint);
        writer.writeAttributeString(undefined, 'cx', undefined, cx.toString());
        var cy = Math.round(picture[heightProperty[this.keywordIndex]] * this.emusPerPoint);
        writer.writeAttributeString(undefined, 'cy', undefined, cy.toString());
        writer.writeEndElement(); //end of extent
        if (!isNullOrUndefined(picture[imageStringProperty[this.keywordIndex]])) {
            // this.serializePicProperties(writer, draw);
            this.serializeShapeWrapStyle(writer, picture);
            this.serializeDrawingGraphics(writer, picture);
        }
        else {
            this.serializeShapeDrawingGraphics(writer, picture);
        }
        writer.writeEndElement(); // end of anchor
    };
    // Serialize the inline picture & Shape.
    WordExport.prototype.serializeInlinePictureAndShape = function (writer, draw) {
        writer.writeStartElement(undefined, 'inline', this.wpNamespace);
        this.writeDefaultDistAttribute(writer);
        writer.writeStartElement(undefined, 'extent', this.wpNamespace);
        var cx = Math.round(draw[widthProperty[this.keywordIndex]] * this.emusPerPoint);
        writer.writeAttributeString(undefined, 'cx', undefined, cx.toString());
        var cy = Math.round(draw[heightProperty[this.keywordIndex]] * this.emusPerPoint);
        writer.writeAttributeString(undefined, 'cy', undefined, cy.toString());
        writer.writeEndElement();
        // double borderWidth = (double)picture.PictureShape.PictureDescriptor.BorderLeft.LineWidth / DLSConstants.BorderLineFactor;
        // if (borderWidth > 0 && picture.DocxProps.length === 0) {
        //     long leftTop = 0, rightBottom = 0;
        //     picture.PictureShape.GetEffectExtent(borderWidth, ref leftTop, ref rightBottom);
        //     m_writer.WriteStartElement('effectExtent', WP_namespace);
        //     m_writer.WriteAttributeString('l', leftTop.ToString(CultureInfo.InvariantCulture));
        //     m_writer.WriteAttributeString('t', leftTop.ToString(CultureInfo.InvariantCulture));
        //     m_writer.WriteAttributeString('r', rightBottom.ToString(CultureInfo.InvariantCulture));
        //     m_writer.WriteAttributeString('b', rightBottom.ToString(CultureInfo.InvariantCulture));
        //     m_writer.WriteEndElement();
        // }
        //this.serializePicProperties(writer, image);
        if (!isNullOrUndefined(draw[imageStringProperty[this.keywordIndex]])) {
            this.serializeShapeWrapStyle(writer, draw);
            this.serializeDrawingGraphics(writer, draw);
        }
        else {
            this.serializeShapeDrawingGraphics(writer, draw);
        }
        writer.writeEndElement();
    };
    WordExport.prototype.serializePictureAndShapeDistance = function (writer, draw) {
        var top = draw[distanceTopProperty[this.keywordIndex]] ? Math.round(draw[distanceTopProperty[this.keywordIndex]] * this.emusPerPoint).toString() : '0';
        writer.writeAttributeString(undefined, 'distT', undefined, top);
        var bottom = draw[distanceBottomProperty[this.keywordIndex]] ? Math.round(draw[distanceBottomProperty[this.keywordIndex]] * this.emusPerPoint).toString() : '0';
        writer.writeAttributeString(undefined, 'distB', undefined, bottom);
        var left = draw[distanceLeftProperty[this.keywordIndex]] ? Math.round(draw[distanceLeftProperty[this.keywordIndex]] * this.emusPerPoint).toString() : '114300';
        writer.writeAttributeString(undefined, 'distL', undefined, left);
        var right = draw[distanceRightProperty[this.keywordIndex]] ? Math.round(draw[distanceRightProperty[this.keywordIndex]] * this.emusPerPoint).toString() : '114300';
        writer.writeAttributeString(undefined, 'distR', undefined, right);
    };
    WordExport.prototype.writeDefaultDistAttribute = function (writer) {
        writer.writeAttributeString(undefined, 'distT', undefined, '0');
        writer.writeAttributeString(undefined, 'distB', undefined, '0');
        writer.writeAttributeString(undefined, 'distL', undefined, '0');
        writer.writeAttributeString(undefined, 'distR', undefined, '0');
    };
    // serialize inline chart
    WordExport.prototype.serializeInlineCharts = function (writer, item) {
        writer.writeStartElement(undefined, 'inline', this.wpNamespace);
        this.writeDefaultDistAttribute(writer);
        writer.writeStartElement(undefined, 'extent', this.wpNamespace);
        var cx = Math.round(item[widthProperty[this.keywordIndex]] * this.emusPerPoint);
        writer.writeAttributeString(undefined, 'cx', undefined, cx.toString());
        var cy = Math.round(item[heightProperty[this.keywordIndex]] * this.emusPerPoint);
        writer.writeAttributeString(undefined, 'cy', undefined, cy.toString());
        writer.writeEndElement(); // end of wp:extend
        writer.writeStartElement(undefined, 'effectExtent', this.wpNamespace);
        writer.writeAttributeString(undefined, 'l', undefined, '0');
        writer.writeAttributeString(undefined, 't', undefined, '0');
        writer.writeAttributeString(undefined, 'r', undefined, '0');
        writer.writeAttributeString(undefined, 'b', undefined, '0');
        writer.writeEndElement(); // end of wp: effectExtent
        this.serializeDrawingGraphicsChart(writer, item);
        writer.writeEndElement(); // end of inline
    };
    // Serialize the graphics element for chart.
    WordExport.prototype.serializeDrawingGraphicsChart = function (writer, chart) {
        var id = '';
        id = this.updatechartId(chart);
        // Processing chart
        writer.writeStartElement('wp', 'docPr', this.wpNamespace);
        writer.writeAttributeString(undefined, 'id', undefined, (this.mDocPrID++).toString());
        writer.writeAttributeString(undefined, 'name', undefined, this.getNextChartName());
        writer.writeEndElement(); // end of wp docPr
        writer.writeStartElement('wp', 'cNvGraphicFramePr', this.wpNamespace);
        writer.writeEndElement(); // end of cNvGraphicFramePr
        writer.writeStartElement('a', 'graphic', this.aNamespace);
        writer.writeStartElement('a', 'graphicData', this.aNamespace);
        writer.writeAttributeString(undefined, 'uri', undefined, this.chartNamespace);
        writer.writeStartElement('c', 'chart', this.chartNamespace);
        writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
        writer.writeAttributeString('r', 'id', undefined, id);
        writer.writeEndElement(); // end of chart
        writer.writeEndElement(); // end of graphic data
        writer.writeEndElement(); // end of graphic
    };
    WordExport.prototype.getBase64ImageString = function (image) {
        var base64ImageString = !isNullOrUndefined(image[metaFileImageStringProperty[this.keywordIndex]]) ? this.mImages.get(parseInt(image[metaFileImageStringProperty[this.keywordIndex]])) : this.mImages.get(parseInt(image[imageStringProperty[this.keywordIndex]]));
        var imageString = base64ImageString[HelperMethods.parseBoolValue(image[isMetaFileProperty[this.keywordIndex]]) ? 1 : 0];
        var index = (this.startsWith(imageString, "https://") || this.startsWith(imageString, "http://") || this.startsWith(imageString, "file://")) ? 1 : 0;
        var metaFileImageString = base64ImageString[index];
        return { imageString: imageString, metaFileImageString: metaFileImageString };
    };
    WordExport.prototype.getNextChartName = function () {
        return 'Chart' + (++this.chartCount);
    };
    // serialize chart
    WordExport.prototype.serializeChart = function (writer, chart) {
        writer.writeStartElement('w', 'r', this.wNamespace);
        this.serializeCharacterFormat(writer, chart[characterFormatProperty[this.keywordIndex]]);
        this.serializeDrawing(writer, chart);
        writer.writeEndElement();
    };
    WordExport.prototype.serializeChartStructure = function () {
        this.serializeChartXML();
        this.serializeChartColors();
        this.serializeChartExcelData();
        this.serializeChartRelations();
        this.chart = undefined;
        this.saveExcel();
    };
    // serialize Chart.xml
    WordExport.prototype.serializeChartXML = function () {
        var chartPath = '';
        var writer = new XmlWriter();
        writer.writeStartElement('c', 'chartSpace', this.chartNamespace);
        writer.writeAttributeString('xmlns', 'a', undefined, this.aNamespace);
        writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
        writer.writeAttributeString('xmlns', 'c16r2', undefined, this.c15Namespace);
        this.serializeChartData(writer, this.chart);
        writer.writeStartElement('c', 'externalData', this.chartNamespace);
        writer.writeAttributeString('r', 'id', undefined, 'rId1');
        writer.writeStartElement('c', 'autoUpdate', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement(); // end of autoUpdate
        writer.writeEndElement(); // end of externalData
        writer.writeEndElement(); // end of chartSpace
        chartPath = this.chartPath + '/chart' + this.chartCount + '.xml';
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, chartPath);
        this.mArchive.addItem(zipArchiveItem);
    };
    // serialize chart colors.xml
    WordExport.prototype.serializeChartColors = function () {
        var writer = new XmlWriter();
        var colorPath = '';
        writer.writeStartElement('cs', 'colorStyle', this.csNamespace);
        writer.writeAttributeString('xmlns', 'a', undefined, this.aNamespace);
        writer.writeAttributeString(undefined, 'meth', undefined, 'cycle');
        writer.writeAttributeString(undefined, 'id', undefined, '10');
        this.serializeChartColor(writer);
        colorPath = this.chartPath + '/colors' + this.chartCount + '.xml';
        writer.writeEndElement(); // end of cs:colorStyle chart color
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, colorPath);
        this.mArchive.addItem(zipArchiveItem);
        colorPath = '';
    };
    WordExport.prototype.serializeChartColor = function (writer) {
        for (var i = 1; i <= 6; i++) {
            writer.writeStartElement('a', 'schemeClr', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, 'accent' + i);
            writer.writeEndElement(); // end of a:schemeClr
        }
        writer.writeStartElement('cs', 'variation', this.csNamespace);
        writer.writeEndElement(); // end of cs:variation
        writer.writeStartElement('cs', 'variation', this.csNamespace);
        writer.writeStartElement('a', 'lumMod', this.aNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '60000');
        writer.writeEndElement(); // end of lumMod
        writer.writeEndElement(); // end of cs:variation
        writer.writeStartElement('cs', 'variation', this.csNamespace);
        writer.writeStartElement('a', 'lumMod', this.aNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '80000');
        writer.writeEndElement(); // end of lumMod
        writer.writeStartElement('a', 'lumOff', this.aNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '20000');
        writer.writeEndElement(); // end of lumoff
        writer.writeEndElement(); // end of cs:variation
        writer.writeStartElement('cs', 'variation', this.csNamespace);
        writer.writeStartElement('a', 'lumMod', this.aNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '80000');
        writer.writeEndElement(); // end of lumMod
        writer.writeEndElement(); // end of cs:variation
        writer.writeStartElement('cs', 'variation', this.csNamespace);
        writer.writeStartElement('a', 'lumMod', this.aNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '60000');
        writer.writeEndElement(); // end of lumMod
        writer.writeStartElement('a', 'lumOff', this.aNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '40000');
        writer.writeEndElement(); // end of lumoff
        writer.writeEndElement(); // end of cs:variation
        writer.writeStartElement('cs', 'variation', this.csNamespace);
        writer.writeStartElement('a', 'lumMod', this.aNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '50000');
        writer.writeEndElement(); // end of lumMod
        writer.writeEndElement(); // end of cs:variation
        writer.writeStartElement('cs', 'variation', this.csNamespace);
        writer.writeStartElement('a', 'lumMod', this.aNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '70000');
        writer.writeEndElement(); // end of lumMod
        writer.writeStartElement('a', 'lumOff', this.aNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '30000');
        writer.writeEndElement(); // end of lumoff
        writer.writeEndElement(); // end of cs:variation
        writer.writeStartElement('cs', 'variation', this.csNamespace);
        writer.writeStartElement('a', 'lumMod', this.aNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '70000');
        writer.writeEndElement(); // end of lumMod
        writer.writeEndElement(); // end of cs:variation
        writer.writeStartElement('cs', 'variation', this.csNamespace);
        writer.writeStartElement('a', 'lumMod', this.aNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '50000');
        writer.writeEndElement(); // end of lumMod
        writer.writeStartElement('a', 'lumOff', this.aNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '50000');
        writer.writeEndElement(); // end of lumoff
        writer.writeEndElement(); // end of cs:variation
    };
    // serialize chart Excel Data
    WordExport.prototype.serializeChartExcelData = function () {
        if (isNullOrUndefined(this.excelFiles)) {
            this.excelFiles = new Dictionary();
        }
        this.mArchiveExcel = new ZipArchive();
        this.mArchiveExcel.compressionLevel = 'Normal';
        var type = this.chart[chartTypeProperty[this.keywordIndex]];
        var isScatterType = (type === 'Scatter_Markers' || type === 'Bubble');
        this.serializeWorkBook();
        this.serializeSharedString(isScatterType);
        this.serializeExcelContentTypes();
        this.serializeExcelData(isScatterType);
        this.serializeExcelStyles();
        this.serializeExcelRelation();
        this.serializeExcelGeneralRelations();
        this.chartStringCount = 0;
    };
    WordExport.prototype.serializeWorkBook = function () {
        var writer = new XmlWriter();
        var workbookPath = 'xl/workbook.xml';
        this.resetExcelRelationShipId();
        writer.writeStartElement(undefined, 'workbook', undefined);
        writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
        writer.writeAttributeString('xmlns', undefined, undefined, this.spreadSheetNamespace);
        writer.writeStartElement(undefined, 'sheets', undefined);
        writer.writeStartElement(undefined, 'sheet', undefined);
        writer.writeAttributeString(undefined, 'name', undefined, 'Sheet1');
        writer.writeAttributeString(undefined, 'sheetId', undefined, '1');
        writer.writeAttributeString('r', 'id', undefined, this.getNextExcelRelationShipID());
        writer.writeEndElement(); // end of sheet
        writer.writeEndElement(); // end of sheets
        writer.writeEndElement(); // end of workbook
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, workbookPath);
        this.mArchiveExcel.addItem(zipArchiveItem);
    };
    WordExport.prototype.serializeExcelStyles = function () {
        var writer = new XmlWriter();
        var stylePath = 'xl/styles.xml';
        writer.writeStartElement(undefined, 'styleSheet', undefined);
        writer.writeAttributeString('xmlns', 'mc', undefined, this.veNamespace);
        writer.writeAttributeString('mc', 'Ignorable', undefined, 'x14ac');
        writer.writeAttributeString('xmlns', 'x14ac', undefined, 'http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac');
        writer.writeAttributeString('xmlns', undefined, undefined, this.spreadSheetNamespace);
        writer.writeEndElement(); // end of styleSheet
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, stylePath);
        this.mArchiveExcel.addItem(zipArchiveItem);
    };
    WordExport.prototype.serializeExcelData = function (isScatterType) {
        // excel data
        var sheetPath = '';
        var writer = new XmlWriter();
        writer.writeStartElement(undefined, 'worksheet', undefined);
        writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
        writer.writeAttributeString('xmlns', 'x14', undefined, this.spreadSheet9);
        writer.writeAttributeString('xmlns', 'mc', undefined, this.veNamespace);
        writer.writeAttributeString('xmlns', undefined, undefined, this.spreadSheetNamespace);
        this.serializeExcelSheet(writer, isScatterType);
        writer.writeEndElement(); // end of worksheet
        sheetPath = 'xl/worksheets' + '/sheet1.xml';
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, sheetPath);
        this.mArchiveExcel.addItem(zipArchiveItem);
    };
    WordExport.prototype.serializeSharedString = function (isScatterType) {
        var chart = this.chart;
        var writer = new XmlWriter();
        var sharedStringPath = '';
        var chartSharedString = [];
        var type = this.chart[chartTypeProperty[this.keywordIndex]];
        var seriesLength = chart[chartSeriesProperty[this.keywordIndex]].length;
        for (var column = 0; column < seriesLength; column++) {
            var series = chart[chartSeriesProperty[this.keywordIndex]][column];
            var seriesName = series[seriesNameProperty[this.keywordIndex]];
            var isString = seriesName.match(/[a-z]/i);
            if (isScatterType && column === 0) {
                chartSharedString.push('X-Values');
            }
            if (isString) {
                chartSharedString.push(series[seriesNameProperty[this.keywordIndex]]);
                this.chartStringCount++;
            }
        }
        if (type === 'Bubble') {
            chartSharedString.push('Size');
        }
        for (var row = 0; row < chart[chartCategoryProperty[this.keywordIndex]].length; row++) {
            var category = chart[chartCategoryProperty[this.keywordIndex]][row];
            var format = chart[chartPrimaryCategoryAxisProperty[this.keywordIndex]][numberFormatProperty[this.keywordIndex]];
            var categoryName = category[categoryXNameProperty[this.keywordIndex]];
            var isString = categoryName.match(/[a-z]/i);
            var dateRegex = /^(((0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4})|((0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4})|((\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])))/;
            if (dateRegex.test(categoryName) || isString || format === 'm/d/yyyy') {
                chartSharedString.push(category[categoryXNameProperty[this.keywordIndex]]);
                this.chartStringCount++;
            }
        }
        var uniqueCount = this.chartStringCount + 1;
        writer.writeStartElement(undefined, 'sst', undefined);
        writer.writeAttributeString('xmlns', undefined, undefined, this.spreadSheetNamespace);
        writer.writeAttributeString(undefined, 'count', undefined, uniqueCount.toString());
        writer.writeAttributeString(undefined, 'uniqueCount', undefined, uniqueCount.toString());
        for (var i = 0; i <= chartSharedString.length; i++) {
            writer.writeStartElement(undefined, 'si', undefined);
            writer.writeStartElement(undefined, 't', undefined);
            if (i !== chartSharedString.length) {
                writer.writeString(chartSharedString[i]);
            }
            else if (!isScatterType) {
                writer.writeAttributeString('xml', 'space', this.xmlNamespace, 'preserve');
                writer.writeString(' ');
            }
            writer.writeEndElement(); // end of t
            writer.writeEndElement(); // end of si
        }
        writer.writeEndElement(); // end of sst
        sharedStringPath = 'xl/sharedStrings' + '.xml';
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, sharedStringPath);
        this.mArchiveExcel.addItem(zipArchiveItem);
    };
    // excel sheet data
    WordExport.prototype.serializeExcelSheet = function (writer, isScatterType) {
        var chart = this.chart;
        var type = 's';
        var isBubbleType = (chart[chartTypeProperty[this.keywordIndex]] === 'Bubble');
        var bubbleLength;
        var categoryLength = chart[chartCategoryProperty[this.keywordIndex]].length + 1;
        var format = chart[chartPrimaryCategoryAxisProperty[this.keywordIndex]][numberFormatProperty[this.keywordIndex]];
        var seriesLength = chart[chartSeriesProperty[this.keywordIndex]].length + 1;
        if (isBubbleType) {
            bubbleLength = seriesLength;
            seriesLength = seriesLength + 1;
        }
        var category = undefined;
        var series = undefined;
        var count = 0;
        writer.writeStartElement(undefined, 'sheetData', undefined);
        for (var row = 0; row < categoryLength; row++) {
            writer.writeStartElement(undefined, 'row', undefined);
            writer.writeAttributeString(undefined, 'r', undefined, (row + 1).toString());
            for (var column = 0; column < seriesLength; column++) {
                var alphaNumeric = String.fromCharCode('A'.charCodeAt(0) + column) + (row + 1).toString();
                writer.writeStartElement(undefined, 'c', undefined);
                writer.writeAttributeString(undefined, 'r', undefined, alphaNumeric);
                if (row !== 0 && column === 0) {
                    category = chart[chartCategoryProperty[this.keywordIndex]][row - 1];
                    var categoryName = category[categoryXNameProperty[this.keywordIndex]];
                    var isString = categoryName.match(/[a-z]/i);
                    var dateRegex = /^(((0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4})|((0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4})|((\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])))/;
                    if (dateRegex.test(categoryName) || isNullOrUndefined(isString) && format === 'm/d/yyyy') {
                        type = 's';
                    }
                    else if (!isString || isScatterType) {
                        type = 'n';
                    }
                    else {
                        type = 's';
                    }
                }
                else if (row === 0 && column !== 0 && column !== (bubbleLength)) {
                    series = chart[chartSeriesProperty[this.keywordIndex]][column - 1];
                    var seriesName = series[seriesNameProperty[this.keywordIndex]];
                    var isString = seriesName.match(/[a-z]/i);
                    if (!isString) {
                        type = 'n';
                    }
                    else {
                        type = 's';
                    }
                }
                else if (row === 0 && isBubbleType && column === (bubbleLength)) {
                    type = 's';
                }
                else if (row === 0 && column === 0) {
                    type = 's';
                }
                else {
                    type = 'n';
                }
                writer.writeAttributeString(undefined, 't', undefined, type);
                writer.writeStartElement(undefined, 'v', undefined);
                if (row === 0 && column === 0 && !isScatterType) {
                    writer.writeString(this.chartStringCount.toString());
                }
                else if (type === 's' && count < this.chartStringCount) {
                    writer.writeString(count.toString());
                    count++;
                }
                else if (row !== 0 && type !== 's' && column === 0 && column !== (bubbleLength)) {
                    writer.writeString(category[categoryXNameProperty[this.keywordIndex]]);
                }
                else if (column !== 0 && type !== 's' && row === 0 && column !== (bubbleLength)) {
                    writer.writeString(series[seriesNameProperty[this.keywordIndex]]);
                }
                else if (row !== 0 && column !== 0 && column !== (bubbleLength)) {
                    var data = category[chartDataProperty[this.keywordIndex]][column - 1];
                    if (!isNullOrUndefined(data)) {
                        var yValue = data[yValueProperty[this.keywordIndex]];
                        writer.writeString(yValue.toString());
                    }
                }
                else if (row !== 0 && isBubbleType && column === (bubbleLength)) {
                    var data = category[chartDataProperty[this.keywordIndex]][column - 2];
                    if (!isNullOrUndefined(data)) {
                        var size = data[sizeProperty[this.keywordIndex]];
                        writer.writeString(size.toString());
                    }
                }
                writer.writeEndElement(); // end of v[value]
                writer.writeEndElement(); // end of c[column]
                type = '';
            }
            writer.writeEndElement(); // end of row
        }
        writer.writeEndElement(); // end of sheetData
    };
    // excel content types
    WordExport.prototype.serializeExcelContentTypes = function () {
        var writer = new XmlWriter();
        writer.writeStartElement(undefined, 'Types', 'http://schemas.openxmlformats.org/package/2006/content-types');
        this.serializeDefaultContentType(writer, 'xml', this.xmlContentType);
        this.serializeDefaultContentType(writer, 'rels', this.relationContentType);
        this.serializeOverrideContentType(writer, 'xl/styles.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml');
        this.serializeOverrideContentType(writer, 'xl/workbook.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml');
        // this.serializeOverrideContentType(writer, '/docProps/app.xml', 'application/vnd.openxmlformats-officedocument.extended-properties+xml');
        // this.serializeOverrideContentType(writer, '/docProps/core.xml', 'application/vnd.openxmlformats-package.core-properties+xml');
        this.serializeOverrideContentType(writer, 'xl/sharedStrings.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml');
        this.serializeOverrideContentType(writer, 'xl/worksheets/sheet1.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml');
        writer.writeEndElement(); // end of types tag
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.contentTypesPath);
        this.mArchiveExcel.addItem(zipArchiveItem);
    };
    WordExport.prototype.serializeExcelRelation = function () {
        var writer = new XmlWriter();
        this.resetExcelRelationShipId();
        var worksheetType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet';
        var sharedStringType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings';
        writer.writeStartElement(undefined, 'Relationships', this.rpNamespace);
        this.serializeRelationShip(writer, this.getNextExcelRelationShipID(), worksheetType, 'worksheets/sheet1.xml');
        this.serializeRelationShip(writer, this.getNextExcelRelationShipID(), this.stylesRelType, 'styles.xml');
        this.serializeRelationShip(writer, this.getNextExcelRelationShipID(), sharedStringType, 'sharedStrings.xml');
        writer.writeEndElement(); // end of relationships
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.excelRelationPath);
        this.mArchiveExcel.addItem(zipArchiveItem);
    };
    WordExport.prototype.serializeExcelGeneralRelations = function () {
        var writer = new XmlWriter();
        this.resetExcelRelationShipId();
        writer.writeStartElement(undefined, 'Relationships', this.rpNamespace);
        this.serializeRelationShip(writer, this.getNextExcelRelationShipID(), this.documentRelType, 'xl/workbook.xml');
        writer.writeEndElement(); // end of relationships
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.generalRelationPath);
        this.mArchiveExcel.addItem(zipArchiveItem);
    };
    // get the next Excel relationship ID
    WordExport.prototype.getNextExcelRelationShipID = function () {
        return 'rId' + (++this.eRelationShipId);
    };
    // get the next Chart relationship ID
    WordExport.prototype.getNextChartRelationShipID = function () {
        return 'rId' + (++this.cRelationShipId);
    };
    //  chart data
    WordExport.prototype.serializeChartData = function (writer, chart) {
        writer.writeStartElement('c', 'date1904', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement();
        writer.writeStartElement('c', 'lang', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, 'en-US');
        writer.writeEndElement();
        writer.writeStartElement('c', 'roundedCorners', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement();
        writer.writeStartElement('mc', 'AlternateContent', this.veNamespace);
        writer.writeStartElement('mc', 'Choice', this.veNamespace);
        writer.writeAttributeString('xmlns', 'c14', undefined, this.c7Namespace);
        writer.writeAttributeString(undefined, 'Requires', undefined, 'c14');
        writer.writeStartElement('c14', 'style', undefined);
        writer.writeAttributeString(undefined, 'val', undefined, '102');
        writer.writeEndElement(); // c14 style end
        writer.writeEndElement(); // mc:choice ened
        writer.writeStartElement('mc', 'Fallback', this.veNamespace);
        writer.writeStartElement('c', 'style', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '2');
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeEndElement(); // end tag of mc alternate content
        writer.writeStartElement('c', 'chart', this.chartNamespace);
        if (!isNullOrUndefined(this.chart[chartTitleProperty[this.keywordIndex]])) {
            writer.writeStartElement('c', 'title', this.chartNamespace);
            this.serializeTextProperties(writer, this.chart[chartTitleAreaProperty[this.keywordIndex]], this.chart[chartTitleProperty[this.keywordIndex]]);
            writer.writeEndElement(); // end tag of title
        }
        // serialize plot area
        this.serializeChartPlotArea(writer, chart);
        writer.writeEndElement(); // end tag of chart
        this.serializeShapeProperties(writer, 'D9D9D9', true);
        writer.writeStartElement('c', 'txPr', this.chartNamespace);
        writer.writeAttributeString('xmlns', 'c', undefined, this.chartNamespace);
        writer.writeStartElement('a', 'bodyPr', this.aNamespace);
        writer.writeAttributeString('xmlns', 'a', undefined, this.aNamespace);
        writer.writeEndElement(); // end tag of bodyPr
        writer.writeStartElement('a', 'lstStyle', this.aNamespace);
        writer.writeAttributeString('xmlns', 'a', undefined, this.aNamespace);
        writer.writeEndElement(); // end of a:lstStyle
        writer.writeStartElement('a', 'p', this.aNamespace);
        writer.writeAttributeString('xmlns', 'a', undefined, this.aNamespace);
        writer.writeStartElement('a', 'pPr', this.aNamespace);
        writer.writeStartElement('a', 'defRPr', this.aNamespace);
        writer.writeEndElement(); // end tag of defRPr
        writer.writeEndElement(); // end tag of pPr
        writer.writeStartElement('a', 'endParaRPr', this.aNamespace);
        writer.writeAttributeString(undefined, 'lang', undefined, 'en-US');
        writer.writeEndElement(); // end of a:endParaRPr
        writer.writeEndElement(); // end tag of p
        writer.writeEndElement(); // end tag of txPr
    };
    //  chart plot area
    /* eslint-disable */
    WordExport.prototype.serializeChartPlotArea = function (writer, chart) {
        writer.writeStartElement('c', 'autoTitleDeleted', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement(); // end of autoTitleDeleted
        writer.writeStartElement('c', 'plotArea', this.chartNamespace);
        writer.writeStartElement('c', 'layout', this.chartNamespace);
        writer.writeEndElement();
        // chart Type
        var serializationChartType = this.chartType(chart);
        var isPieTypeSerialization = (serializationChartType === 'pieChart' || serializationChartType === 'doughnutChart');
        var isScatterType = (serializationChartType === 'scatterChart' || serializationChartType === 'bubbleChart');
        writer.writeStartElement('c', serializationChartType, this.chartNamespace);
        if (serializationChartType === 'barChart') {
            var barDiv = '';
            if (chart[chartTypeProperty[this.keywordIndex]] === 'Column_Clustered' || chart[chartTypeProperty[this.keywordIndex]] === 'Column_Stacked'
                || chart[chartTypeProperty[this.keywordIndex]] === 'Column_Stacked_100') {
                barDiv = 'col';
            }
            else {
                barDiv = 'bar';
            }
            writer.writeStartElement('c', 'barDir', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, barDiv);
            writer.writeEndElement(); // end of barDir
        }
        if (!isPieTypeSerialization && !isScatterType) {
            var grouping = this.chartGrouping(chart[chartTypeProperty[this.keywordIndex]]);
            writer.writeStartElement('c', 'grouping', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, grouping);
            writer.writeEndElement(); // end of grouping
        }
        if (serializationChartType === 'scatterChart') {
            writer.writeStartElement('c', 'scatterStyle', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, 'marker');
            writer.writeEndElement(); // end of scatterStyle
        }
        writer.writeStartElement('c', 'varyColors', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement(); // end of c:varyColors
        var valueSheet = '';
        for (var i = 0; i < chart[chartSeriesProperty[this.keywordIndex]].length; i++) {
            var series = chart[chartSeriesProperty[this.keywordIndex]][i];
            this.seriesCount = i;
            writer.writeStartElement('c', 'ser', this.chartNamespace);
            writer.writeStartElement('c', 'idx', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, i.toString());
            writer.writeEndElement(); // end of c:idx
            writer.writeStartElement('c', 'order', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, i.toString());
            writer.writeEndElement(); // end of c:order
            writer.writeStartElement('c', 'tx', this.chartNamespace);
            writer.writeStartElement('c', 'strRef', this.chartNamespace);
            writer.writeStartElement('c', 'f', this.chartNamespace);
            var alphaNumeric = String.fromCharCode('B'.charCodeAt(0) + i);
            valueSheet = 'Sheet1!$' + alphaNumeric;
            writer.writeString(valueSheet + '$1');
            valueSheet = valueSheet + '$2:$' + alphaNumeric + '$';
            writer.writeEndElement(); // end of c:f
            writer.writeStartElement('c', 'strCache', this.chartNamespace);
            writer.writeStartElement('c', 'ptCount', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '1');
            writer.writeEndElement(); // end of ptCount
            writer.writeStartElement('c', 'pt', this.chartNamespace);
            writer.writeAttributeString(undefined, 'idx', undefined, '0');
            writer.writeStartElement('c', 'v', this.chartNamespace);
            writer.writeString(series[seriesNameProperty[this.keywordIndex]]);
            writer.writeEndElement(); // end of c:v
            writer.writeEndElement(); // end of pt
            writer.writeEndElement(); // end of strCache
            writer.writeEndElement(); // end of strRef
            writer.writeEndElement(); // end of tx
            if (chart[chartTypeProperty[this.keywordIndex]] === 'Pie' || chart[chartTypeProperty[this.keywordIndex]] === 'Doughnut') {
                this.parseChartDataPoint(writer, series);
                writer.writeStartElement('c', 'explosion', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, '0');
                writer.writeEndElement(); // end of explosion
            }
            else if (!isScatterType) {
                this.parseChartSeriesColor(writer, series[dataPointsProperty[this.keywordIndex]], serializationChartType);
            }
            if (serializationChartType === 'scatterChart') {
                var fillColor = series[dataPointsProperty[this.keywordIndex]][0][fillProperty[this.keywordIndex]][foreColorProperty[this.keywordIndex]];
                writer.writeStartElement('c', 'marker', this.chartNamespace);
                writer.writeStartElement('c', 'symbol', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, 'circle');
                writer.writeEndElement(); // end of a: symbol
                writer.writeStartElement('c', 'size', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, '5');
                writer.writeEndElement(); // end of a: size
                this.serializeShapeProperties(writer, fillColor, false);
                writer.writeEndElement(); // end of a: marker
            }
            if (series[dataLabelProperty[this.keywordIndex]]) {
                this.parseChartDataLabels(writer, series[dataLabelProperty[this.keywordIndex]]);
            }
            if (series[trendLinesProperty[this.keywordIndex]]) {
                this.parseChartTrendLines(writer, series);
            }
            if (series[errorBarProperty[this.keywordIndex]]) {
                this.serializeChartErrorBar(writer, series);
            }
            if (serializationChartType === 'scatterChart') {
                this.serializeDefaultShapeProperties(writer);
            }
            else if (serializationChartType === 'bubbleChart') {
                this.serializeShapeProperties(writer, series[dataPointsProperty[this.keywordIndex]][0][fillProperty[this.keywordIndex]][foreColorProperty[this.keywordIndex]], false);
            }
            var categoryType = 'cat';
            var categoryRef = 'strRef';
            var cacheType = 'strCache';
            if (serializationChartType === 'scatterChart') {
                categoryType = 'xVal';
                categoryRef = 'numRef';
                cacheType = 'numCache';
            }
            writer.writeStartElement('c', categoryType, this.chartNamespace);
            writer.writeStartElement('c', categoryRef, this.chartNamespace);
            this.serializeChartCategory(writer, chart, cacheType); // serialize chart yvalue
            writer.writeEndElement(); // end of categoryRef
            writer.writeEndElement(); // end of cat
            this.serializeChartValue(writer, valueSheet, serializationChartType);
            writer.writeEndElement(); // end of c:ser
        }
        writer.writeStartElement('c', 'dLbls', this.chartNamespace);
        if (isPieTypeSerialization) {
            writer.writeStartElement('c', 'dLblPos', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, 'bestFit');
            writer.writeEndElement(); // end of dLblPos
        }
        writer.writeStartElement('c', 'showLegendKey', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement(); // end of c: showLegendKey
        writer.writeStartElement('c', 'showVal', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement(); // end of c: showVal
        writer.writeStartElement('c', 'showCatName', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement(); // end of c: showCatName
        writer.writeStartElement('c', 'showSerName', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement(); // end of c: showSerName
        writer.writeStartElement('c', 'showPercent', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement(); // end of c: showPercent
        writer.writeStartElement('c', 'showBubbleSize', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement(); // end of c: showBubbleSize
        writer.writeStartElement('c', 'showLeaderLines', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '1');
        writer.writeEndElement(); // end of c: showLeaderLines
        writer.writeEndElement(); // end of c: dLbls
        if (isPieTypeSerialization) {
            var series = this.chart[chartSeriesProperty[this.keywordIndex]][0];
            var sliceAngle = 0;
            var holeSize = 0;
            if (series.hasOwnProperty(firstSliceAngleProperty[this.keywordIndex])) {
                sliceAngle = series[firstSliceAngleProperty[this.keywordIndex]];
            }
            writer.writeStartElement('c', 'firstSliceAng', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, sliceAngle.toString());
            writer.writeEndElement(); // end of c: firstSliceAng
            if (chart[chartTypeProperty[this.keywordIndex]] === 'Doughnut') {
                holeSize = series[holeSizeProperty[this.keywordIndex]];
                writer.writeStartElement('c', 'holeSize', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, holeSize.toString());
                writer.writeEndElement(); // end of c: holeSize
            }
        }
        if (serializationChartType !== 'lineChart' && !isScatterType) {
            writer.writeStartElement('c', 'gapWidth', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, this.chart[gapWidthProperty[this.keywordIndex]].toString());
            writer.writeEndElement(); // end of gapWidth
            writer.writeStartElement('c', 'overlap', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, this.chart[overlapProperty[this.keywordIndex]].toString());
            writer.writeEndElement(); // end of overlap
        }
        else if (serializationChartType !== 'bubbleChart') {
            writer.writeStartElement('c', 'smooth', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement(); // end of smooth
        }
        if (serializationChartType === 'bubbleChart') {
            writer.writeStartElement('c', 'sizeRepresents', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, 'area');
            writer.writeEndElement(); // end of smooth
        }
        var type = this.chart[chartTypeProperty[this.keywordIndex]];
        if (!isPieTypeSerialization) {
            writer.writeStartElement('c', 'axId', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '335265000');
            writer.writeEndElement(); // end of axId
            writer.writeStartElement('c', 'axId', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '335263360');
            writer.writeEndElement(); // end of axId
        }
        writer.writeEndElement(); // end of chart type
        var isStackedPercentage = (type === 'Column_Stacked_100' || type === 'Area_Stacked_100' ||
            type === 'Bar_Stacked_100' || type === 'Line_Stacked_100' || type === 'Line_Markers_Stacked_100');
        var format = this.chart[chartPrimaryCategoryAxisProperty[this.keywordIndex]][categoryTypeProperty[this.keywordIndex]];
        if (!isPieTypeSerialization) {
            this.serializeCategoryAxis(writer, format, isStackedPercentage);
            this.serializeValueAxis(writer, format, isStackedPercentage);
        }
        if (this.chart.hasOwnProperty(chartDataTableProperty[this.keywordIndex])) {
            var dataTable = this.chart[chartDataTableProperty[this.keywordIndex]];
            var showHorzBorder = 0;
            var showVertBorder = 0;
            var showOutline = 0;
            var showKeys = 0;
            if (HelperMethods.parseBoolValue(dataTable[showSeriesKeysProperty[this.keywordIndex]])) {
                showKeys = 1;
            }
            if (HelperMethods.parseBoolValue(dataTable[hasHorizontalBorderProperty[this.keywordIndex]])) {
                showHorzBorder = 1;
            }
            if (HelperMethods.parseBoolValue(dataTable[hasVerticalBorderProperty[this.keywordIndex]])) {
                showVertBorder = 1;
            }
            if (HelperMethods.parseBoolValue(dataTable[hasBordersProperty[this.keywordIndex]])) {
                showOutline = 1;
            }
            writer.writeStartElement('c', 'dTable', this.chartNamespace);
            writer.writeStartElement('c', 'showHorzBorder', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, showHorzBorder.toString());
            writer.writeEndElement(); // end of showHorzBorder
            writer.writeStartElement('c', 'showVertBorder', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, showVertBorder.toString());
            writer.writeEndElement(); // end of showVertBorder
            writer.writeStartElement('c', 'showOutline', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, showOutline.toString());
            writer.writeEndElement(); // end of showOutline
            writer.writeStartElement('c', 'showKeys', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, showKeys.toString());
            writer.writeEndElement(); // end of showKeys
            writer.writeEndElement(); // end of dTable
        }
        this.serializeDefaultShapeProperties(writer);
        writer.writeEndElement(); // end of plot area
        // legend
        if (!isNullOrUndefined(this.chart[chartLegendProperty[this.keywordIndex]][positionProperty[this.keywordIndex]])) {
            this.serializeChartLegend(writer);
        }
        writer.writeStartElement('c', 'plotVisOnly', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '1');
        writer.writeEndElement(); // end of c: plotVisOnly
        writer.writeStartElement('c', 'dispBlanksAs', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, 'gap');
        writer.writeEndElement(); // end of c: dispBlanksAs
    };
    WordExport.prototype.serializeChartLegend = function (writer) {
        var legendPosition = this.chartLegendPosition(this.chart[chartLegendProperty[this.keywordIndex]]);
        var title = this.chart[chartLegendProperty[this.keywordIndex]][chartTitleAreaProperty[this.keywordIndex]];
        var fill = title[dataFormatProperty[this.keywordIndex]][fillProperty[this.keywordIndex]][foreColorProperty[this.keywordIndex]];
        writer.writeStartElement('c', 'legend', this.chartNamespace);
        writer.writeStartElement('c', 'legendPos', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, legendPosition);
        writer.writeEndElement();
        writer.writeStartElement('c', 'overlay', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement();
        this.serializeDefaultShapeProperties(writer);
        writer.writeStartElement('c', 'txPr', this.chartNamespace);
        writer.writeStartElement('a', 'bodyPr', this.aNamespace);
        writer.writeEndElement();
        writer.writeStartElement('a', 'lstStyle', this.aNamespace);
        writer.writeEndElement();
        writer.writeStartElement('a', 'p', this.aNamespace);
        this.serializeChartTitleFont(writer, title[fontSizeProperty[this.keywordIndex]], fill, title[fontNameProperty[this.keywordIndex]]);
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeEndElement();
    };
    WordExport.prototype.serializeChartErrorBar = function (writer, series) {
        var errorBar = series[errorBarProperty[this.keywordIndex]];
        var errorBarValueType = this.errorBarValueType(errorBar[typeProperty[this.keywordIndex]]);
        var endStyle = 0;
        if (errorBar[endStyleProperty[this.keywordIndex]] !== 'Cap') {
            endStyle = 1;
        }
        writer.writeStartElement('c', 'errBars', this.chartNamespace);
        writer.writeStartElement('c', 'errBarType', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, errorBar[directionProperty[this.keywordIndex]].toLowerCase());
        writer.writeEndElement(); // end of c: errBarType
        writer.writeStartElement('c', 'errValType', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, errorBarValueType);
        writer.writeEndElement(); // end of c: errValType
        writer.writeStartElement('c', 'noEndCap', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, endStyle.toString());
        writer.writeEndElement(); // end of c: noEndCap
        writer.writeStartElement('c', 'val', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, errorBar[numberValueProperty[this.keywordIndex]].toString());
        writer.writeEndElement(); // end of c: val
        this.serializeShapeProperties(writer, '595959', true);
        writer.writeEndElement(); // end of c: errBars
    };
    WordExport.prototype.errorBarValueType = function (type) {
        var valueType = '';
        switch (type) {
            case 'StandardError':
                valueType = 'stdErr';
                break;
            case 'StandardDeviation':
                valueType = 'stdDev';
                break;
            case 'Percentage':
                valueType = 'percentage';
                break;
            case 'Fixed':
                valueType = 'fixedVal';
                break;
            default:
                valueType = 'stdErr';
                break;
        }
        return valueType;
    };
    WordExport.prototype.serializeCategoryAxis = function (writer, format, isStackedPercentage) {
        // serialize category axis
        var axisType = 'catAx';
        var formatCode = this.chart[chartPrimaryCategoryAxisProperty[this.keywordIndex]][numberFormatProperty[this.keywordIndex]];
        var type = this.chart[chartTypeProperty[this.keywordIndex]];
        var isScatterType = (type === 'Scatter_Markers' || type === 'Bubble');
        if (format === 'Time') {
            axisType = 'dateAx';
        }
        if (isScatterType) {
            axisType = 'valAx';
        }
        writer.writeStartElement('c', axisType, this.chartNamespace);
        writer.writeStartElement('c', 'axId', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '335265000');
        writer.writeEndElement(); // end of axId
        this.serializeAxis(writer, '335263360', this.chart[chartPrimaryCategoryAxisProperty[this.keywordIndex]], formatCode, isStackedPercentage);
        if (!isScatterType) {
            writer.writeStartElement('c', 'auto', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '1');
            writer.writeEndElement(); // end of auto
            writer.writeStartElement('c', 'lblAlgn', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, 'ctr');
            writer.writeEndElement(); // end of lblAlgn
            writer.writeStartElement('c', 'lblOffset', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '100');
            writer.writeEndElement(); // end of lblOffset
        }
        if (format === 'Time') {
            writer.writeStartElement('c', 'baseTimeUnit', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, 'days');
            writer.writeEndElement(); // end of baseTimeUnit
        }
        else if (this.chart[chartTypeProperty[this.keywordIndex]] !== 'Bubble') {
            writer.writeStartElement('c', 'noMultiLvlLbl', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement(); // end of noMultiLvlLbl
        }
        writer.writeEndElement(); // end of catAx
    };
    WordExport.prototype.serializeValueAxis = function (writer, format, isStackedPercentage) {
        // serialize category axis
        var valueAxis = this.chart[chartPrimaryValueAxisProperty[this.keywordIndex]];
        var crossBetween = 'between';
        if (format === 'Time') {
            crossBetween = 'midCat';
        }
        writer.writeStartElement('c', 'valAx', this.chartNamespace);
        writer.writeStartElement('c', 'axId', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '335263360');
        writer.writeEndElement(); // end of axId
        this.serializeAxis(writer, '335265000', valueAxis, 'General', isStackedPercentage);
        writer.writeStartElement('c', 'crossBetween', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, crossBetween);
        writer.writeEndElement(); // end of crossBetween
        if (valueAxis[majorUnitProperty[this.keywordIndex]] !== 0 && !isStackedPercentage && !valueAxis[isAutoMajorProperty[this.keywordIndex]]) {
            writer.writeStartElement('c', 'majorUnit', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, valueAxis[majorUnitProperty[this.keywordIndex]].toString());
            writer.writeEndElement(); // end of majorUnit
        }
        writer.writeEndElement(); // end of valAx
    };
    WordExport.prototype.serializeAxis = function (writer, axisID, axis, formatCode, isStackedPercentage) {
        var majorTickMark = 'none';
        var minorTickMark = 'none';
        var tickLabelPosition = 'nextTo';
        writer.writeStartElement('c', 'scaling', this.chartNamespace);
        writer.writeStartElement('c', 'orientation', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, 'minMax');
        writer.writeEndElement(); // end of orientation
        if (axis[maximumValueProperty[this.keywordIndex]] !== 0 && !isStackedPercentage) {
            writer.writeStartElement('c', 'max', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, axis[maximumValueProperty[this.keywordIndex]].toString());
            writer.writeEndElement(); // end of max
            writer.writeStartElement('c', 'min', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, axis[minimumValueProperty[this.keywordIndex]].toString());
            writer.writeEndElement(); // end of min
        }
        writer.writeEndElement(); // end of scaling
        writer.writeStartElement('c', 'delete', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement(); // end of delete
        writer.writeStartElement('c', 'axPos', this.chartNamespace);
        if (axisID === '335265000') {
            writer.writeAttributeString(undefined, 'val', undefined, 'l');
        }
        else {
            writer.writeAttributeString(undefined, 'val', undefined, 'b');
        }
        writer.writeEndElement(); // end of axPos
        if (HelperMethods.parseBoolValue(axis[hasMajorGridLinesProperty[this.keywordIndex]])) {
            writer.writeStartElement('c', 'majorGridlines', this.chartNamespace);
            this.serializeShapeProperties(writer, 'D9D9D9', true);
            writer.writeEndElement(); // end of majorGridlines
        }
        if (HelperMethods.parseBoolValue(axis[hasMinorGridLinesProperty[this.keywordIndex]])) {
            writer.writeStartElement('c', 'minorGridlines', this.chartNamespace);
            this.serializeShapeProperties(writer, 'F2F2F2', true);
            writer.writeEndElement(); // end of minorGridlines
        }
        if (axis[chartTitleProperty[this.keywordIndex]]) {
            writer.writeStartElement('c', 'title', this.chartNamespace);
            this.serializeTextProperties(writer, axis[chartTitleAreaProperty[this.keywordIndex]], axis[chartTitleProperty[this.keywordIndex]]);
            writer.writeEndElement(); // end tag of title
        }
        writer.writeStartElement('c', 'numFmt', this.chartNamespace);
        writer.writeAttributeString(undefined, 'formatCode', undefined, formatCode);
        writer.writeAttributeString(undefined, 'sourceLinked', undefined, '1');
        writer.writeEndElement(); // end of numFmt
        writer.writeStartElement('c', 'majorTickMark', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, majorTickMark);
        writer.writeEndElement(); // end of majorTickMark
        writer.writeStartElement('c', 'minorTickMark', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, minorTickMark);
        writer.writeEndElement(); // end of minorTickMark
        writer.writeStartElement('c', 'tickLblPos', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, tickLabelPosition);
        writer.writeEndElement(); // end of tickLblPos
        if (this.chart[chartTypeProperty[this.keywordIndex]] === 'Bubble') {
            this.serializeShapeProperties(writer, 'BFBFBF', true);
        }
        else {
            this.serializeDefaultShapeProperties(writer);
        }
        writer.writeStartElement('c', 'txPr', this.chartNamespace);
        writer.writeStartElement('a', 'bodyPr', this.aNamespace);
        writer.writeEndElement(); // end of bodyPr
        writer.writeStartElement('a', 'p', this.aNamespace);
        this.serializeChartTitleFont(writer, axis[fontSizeProperty[this.keywordIndex]], '595959', axis[fontNameProperty[this.keywordIndex]]);
        writer.writeEndElement(); // end of a: p
        writer.writeEndElement(); // end of c: txPr
        writer.writeStartElement('c', 'crossAx', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, axisID);
        writer.writeEndElement(); // end of crossAx
        writer.writeStartElement('c', 'crosses', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, 'autoZero');
        writer.writeEndElement(); // end of crosses
    };
    WordExport.prototype.parseChartTrendLines = function (writer, series) {
        for (var i = 0; i < series[trendLinesProperty[this.keywordIndex]].length; i++) {
            var data = series[trendLinesProperty[this.keywordIndex]][i];
            var type = this.chartTrendLineType(data[typeProperty[this.keywordIndex]]);
            var dispRSqr = 0;
            var dispEq = 0;
            if (HelperMethods.parseBoolValue(data[isDisplayEquationProperty[this.keywordIndex]])) {
                dispEq = 1;
            }
            else if (HelperMethods.parseBoolValue(data[isDisplayRSquaredProperty[this.keywordIndex]])) {
                dispRSqr = 1;
            }
            var solidFill = series[dataPointsProperty[this.keywordIndex]][i];
            writer.writeStartElement('c', 'trendline', this.chartNamespace);
            writer.writeStartElement('c', 'spPr', this.chartNamespace);
            writer.writeStartElement('a', 'ln', this.aNamespace);
            writer.writeAttributeString(undefined, 'w', undefined, '19050');
            this.serializeChartSolidFill(writer, solidFill[fillProperty[this.keywordIndex]][foreColorProperty[this.keywordIndex]], false);
            writer.writeStartElement('a', 'prstDash', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, 'sysDot');
            writer.writeEndElement(); // end of a: prstDash
            writer.writeStartElement('a', 'round', this.aNamespace);
            writer.writeEndElement(); // end of a: round
            writer.writeEndElement(); // end of a: ln
            writer.writeEndElement(); // end of c: spPr
            writer.writeStartElement('c', 'trendlineType', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, type);
            writer.writeEndElement(); // end of c: trendlineType
            writer.writeStartElement('c', 'forward', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, data[forwardProperty[this.keywordIndex]].toString());
            writer.writeEndElement(); // end of c: forward
            writer.writeStartElement('c', 'backward', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, data[backwardProperty[this.keywordIndex]].toString());
            writer.writeEndElement(); // end of c: backward
            if (data[interceptProperty[this.keywordIndex]] !== 'NaN') {
                writer.writeStartElement('c', 'intercept', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, data[interceptProperty[this.keywordIndex]].toString());
                writer.writeEndElement(); // end of c: intercept
            }
            writer.writeStartElement('c', 'dispRSqr', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, dispRSqr.toString());
            writer.writeEndElement(); // end of c: dispRSqr
            writer.writeStartElement('c', 'dispEq', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, dispEq.toString());
            writer.writeEndElement(); // end of c: dispEq
            writer.writeEndElement(); // end of c: trendline
        }
    };
    WordExport.prototype.chartTrendLineType = function (type) {
        var trendlineType = '';
        switch (type) {
            case 'Linear':
                trendlineType = 'linear';
                break;
            case 'Exponential':
                trendlineType = 'exp';
                break;
        }
        return trendlineType;
    };
    WordExport.prototype.parseChartDataLabels = function (writer, dataLabels) {
        var position = '';
        var dataLabelPosition = dataLabels[positionProperty[this.keywordIndex]];
        var isLegendKey = 0;
        var isBubbleSize = 0;
        var isCategoryName = 0;
        var isSeriesName = 0;
        var isValue = 0;
        var isPercentage = 0;
        var isLeaderLines = 0;
        switch (dataLabelPosition) {
            case 'Center':
                position = 'ctr';
                break;
            case 'Left':
                position = 'l';
                break;
            case 'Right':
                position = 'r';
                break;
            case 'Outside':
                position = 'outEnd';
                break;
            case 'BestFit':
                position = 'bestFit';
                break;
            case 'Bottom':
            case 'OutsideBase':
                position = 'inBase';
                break;
            case 'Inside':
                position = 'inEnd';
                break;
            case 'Above':
                position = 't';
                break;
            case 'Below':
                position = 'b';
                break;
            default:
                position = 'Automatic';
                break;
        }
        writer.writeStartElement('c', 'dLbls', this.chartNamespace);
        this.serializeDefaultShapeProperties(writer);
        writer.writeStartElement('c', 'txPr', this.chartNamespace);
        writer.writeStartElement('a', 'bodyPr', this.aNamespace);
        writer.writeEndElement(); //end of a:bodyPr.
        writer.writeStartElement('a', 'lstStyle', this.aNamespace);
        writer.writeEndElement(); //end of a:lstStyle.
        writer.writeStartElement('a', 'p', this.aNamespace);
        this.serializeChartTitleFont(writer, dataLabels[fontSizeProperty[this.keywordIndex]], dataLabels[fontColorProperty[this.keywordIndex]], dataLabels[fontNameProperty[this.keywordIndex]]);
        writer.writeEndElement(); //end of a:p.
        writer.writeEndElement(); //end of c:txPr.
        if (HelperMethods.parseBoolValue(dataLabels[isLegendKeyProperty[this.keywordIndex]])) {
            isLegendKey = 1;
        }
        else if (HelperMethods.parseBoolValue(dataLabels[isBubbleSizeProperty[this.keywordIndex]])) {
            isBubbleSize = 1;
        }
        else if (HelperMethods.parseBoolValue(dataLabels[isCategoryNameProperty[this.keywordIndex]])) {
            isCategoryName = 1;
        }
        else if (HelperMethods.parseBoolValue(dataLabels[isSeriesNameProperty[this.keywordIndex]])) {
            isSeriesName = 1;
        }
        else if (HelperMethods.parseBoolValue(dataLabels[isValueProperty[this.keywordIndex]])) {
            isValue = 1;
        }
        else if (HelperMethods.parseBoolValue(dataLabels[isPercentageProperty[this.keywordIndex]])) {
            isPercentage = 1;
        }
        else if (HelperMethods.parseBoolValue(dataLabels[isLeaderLinesProperty[this.keywordIndex]])) {
            isLeaderLines = 1;
        }
        if (position !== 'Automatic') {
            writer.writeStartElement('c', 'dLblPos', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, position);
            writer.writeEndElement(); // end of dLblPos
        }
        writer.writeStartElement('c', 'showLegendKey', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, isLegendKey.toString());
        writer.writeEndElement(); // end of showLegendKey
        writer.writeStartElement('c', 'showVal', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, isValue.toString());
        writer.writeEndElement(); // end of showVal
        writer.writeStartElement('c', 'showCatName', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, isCategoryName.toString());
        writer.writeEndElement(); // end of showCatName
        writer.writeStartElement('c', 'showSerName', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, isSeriesName.toString());
        writer.writeEndElement(); // end of showSerName
        writer.writeStartElement('c', 'showPercent', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, isPercentage.toString());
        writer.writeEndElement(); // end of showPercent
        writer.writeStartElement('c', 'showBubbleSize', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, isBubbleSize.toString());
        writer.writeEndElement(); // end of showBubbleSize
        writer.writeStartElement('c', 'showLeaderLines', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, isLeaderLines.toString());
        writer.writeEndElement(); // end of showBubbleSize
        writer.writeEndElement(); // end of dLbls
    };
    WordExport.prototype.serializeShapeProperties = function (writer, color, isLine) {
        var chartType = this.chart[chartTypeProperty[this.keywordIndex]];
        var isScatterType = (chartType === 'Scatter_Markers' || chartType === 'Bubble');
        // serialize shape
        writer.writeStartElement('c', 'spPr', this.chartNamespace);
        if (!isScatterType || isLine) {
            writer.writeStartElement('a', 'ln', this.aNamespace);
            writer.writeAttributeString(undefined, 'w', undefined, '9525');
            this.serializeChartSolidFill(writer, color, false);
            writer.writeStartElement('a', 'prstDash', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, 'solid');
            writer.writeEndElement(); // end of prstDash
            writer.writeStartElement('a', 'round', this.aNamespace);
            writer.writeEndElement(); // end tag of round
            writer.writeEndElement(); // end tag of ln
        }
        else if (chartType === 'Scatter_Markers') {
            this.serializeChartSolidFill(writer, color, false);
            this.serializeDefaultLineProperties(writer);
        }
        else if (chartType === 'Bubble') {
            this.serializeChartSolidFill(writer, color, true);
            this.serializeDefaultLineProperties(writer);
        }
        writer.writeStartElement('a', 'effectLst', this.aNamespace);
        writer.writeEndElement(); // end of a: effectLst
        writer.writeEndElement(); // end tag of spPr
    };
    WordExport.prototype.serializeDefaultShapeProperties = function (writer) {
        writer.writeStartElement('c', 'spPr', this.chartNamespace);
        writer.writeStartElement('a', 'noFill', this.aNamespace);
        writer.writeEndElement(); // end of a: noFill
        this.serializeDefaultLineProperties(writer);
        writer.writeStartElement('a', 'effectLst', this.aNamespace);
        writer.writeEndElement(); // end of a: effectLst
        writer.writeEndElement(); // end of c: spPr
    };
    WordExport.prototype.serializeDefaultLineProperties = function (writer) {
        writer.writeStartElement('a', 'ln', this.aNamespace);
        writer.writeStartElement('a', 'noFill', this.aNamespace);
        writer.writeEndElement(); // end of a: noFill
        writer.writeStartElement('a', 'round', this.aNamespace);
        writer.writeEndElement(); // end of a: round
        writer.writeEndElement(); // end of a: ln
    };
    WordExport.prototype.serializeTextProperties = function (writer, title, chartTitleName) {
        var fill = title[dataFormatProperty[this.keywordIndex]][fillProperty[this.keywordIndex]][foreColorProperty[this.keywordIndex]];
        var fontSize = title[fontSizeProperty[this.keywordIndex]] * 100;
        writer.writeStartElement('c', 'tx', this.chartNamespace);
        writer.writeStartElement('c', 'rich', this.chartNamespace);
        writer.writeStartElement('a', 'bodyPr', this.aNamespace);
        writer.writeAttributeString(undefined, 'rot', undefined, '0');
        writer.writeAttributeString(undefined, 'vert', undefined, 'horz');
        writer.writeEndElement(); // end of a: bodyPr
        writer.writeStartElement('a', 'lstStyle', this.aNamespace);
        writer.writeEndElement(); // end of a:lstStyle
        writer.writeStartElement('a', 'p', this.aNamespace);
        this.serializeChartTitleFont(writer, title[fontSizeProperty[this.keywordIndex]], fill, title[fontNameProperty[this.keywordIndex]]);
        writer.writeStartElement('a', 'r', this.aNamespace);
        writer.writeStartElement('a', 'rPr', this.aNamespace);
        writer.writeAttributeString(undefined, 'lang', undefined, 'en-US');
        writer.writeAttributeString(undefined, 'b', undefined, '0');
        writer.writeAttributeString(undefined, 'sz', undefined, this.roundToTwoDecimal(fontSize).toString());
        writer.writeAttributeString(undefined, 'baseline', undefined, '0');
        this.serializeChartSolidFill(writer, fill, false);
        this.serializeFont(writer, title[fontNameProperty[this.keywordIndex]]);
        writer.writeEndElement(); // end of a: rPr
        writer.writeStartElement('a', 't', this.aNamespace);
        writer.writeString(chartTitleName);
        writer.writeEndElement(); // end of a:t
        writer.writeEndElement(); // end of a: r
        writer.writeEndElement(); // end of a: p
        writer.writeEndElement(); // end of c: rich
        writer.writeEndElement(); // end of c: tx
        writer.writeStartElement('c', 'layout', this.chartNamespace);
        // writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement(); // end of c: layout
        writer.writeStartElement('c', 'overlay', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, '0');
        writer.writeEndElement(); // end of c: overlay
        this.serializeDefaultShapeProperties(writer);
        writer.writeStartElement('c', 'txPr', this.chartNamespace);
        writer.writeStartElement('a', 'bodyPr', this.aNamespace);
        writer.writeEndElement(); // end of a: bodyPr
        writer.writeStartElement('a', 'lstStyle', this.aNamespace);
        writer.writeEndElement(); // end of a: lstStyle
        writer.writeStartElement('a', 'p', this.aNamespace);
        writer.writeEndElement(); // end of a: p
        this.serializeChartTitleFont(writer, title[fontSizeProperty[this.keywordIndex]], fill, title[fontNameProperty[this.keywordIndex]]);
        writer.writeEndElement(); // end of c: txPr
    };
    WordExport.prototype.serializeChartTitleFont = function (writer, fontSize, fill, fontName) {
        var fontSizeCalc = fontSize * 100;
        writer.writeStartElement('a', 'pPr', this.aNamespace);
        writer.writeStartElement('a', 'defRPr', this.aNamespace);
        writer.writeAttributeString(undefined, 'lang', undefined, 'en-US');
        writer.writeAttributeString(undefined, 'b', undefined, '0');
        writer.writeAttributeString(undefined, 'sz', undefined, this.roundToTwoDecimal(fontSizeCalc).toString());
        writer.writeAttributeString(undefined, 'baseline', undefined, '0');
        this.serializeChartSolidFill(writer, fill, false);
        this.serializeFont(writer, fontName);
        writer.writeEndElement(); // end of defRPr
        writer.writeEndElement(); // end of a: pPr
    };
    WordExport.prototype.serializeChartSolidFill = function (writer, fill, isSeriesFill) {
        writer.writeStartElement('a', 'solidFill', this.aNamespace);
        writer.writeStartElement('a', 'srgbClr', this.aNamespace);
        if (fill !== '000000') {
            writer.writeAttributeString(undefined, 'val', undefined, fill);
        }
        else {
            writer.writeAttributeString(undefined, 'val', undefined, '595959');
        }
        if (this.chart[chartTypeProperty[this.keywordIndex]] === 'Bubble' && isSeriesFill) {
            writer.writeStartElement('a', 'alpha', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '75000');
            writer.writeEndElement(); // end of alpha
        }
        writer.writeEndElement(); // end of srgbClr
        writer.writeEndElement(); // end of solidFill
    };
    WordExport.prototype.serializeFont = function (writer, fontName) {
        writer.writeStartElement('a', 'latin', this.aNamespace);
        writer.writeAttributeString(undefined, 'typeface', undefined, fontName);
        writer.writeEndElement(); // end of a:latin
        writer.writeStartElement('a', 'ea', this.aNamespace);
        writer.writeAttributeString(undefined, 'typeface', undefined, fontName);
        writer.writeEndElement(); // end of a:ea
        writer.writeStartElement('a', 'cs', this.aNamespace);
        writer.writeAttributeString(undefined, 'typeface', undefined, fontName);
        writer.writeEndElement(); // end of a:cs
    };
    WordExport.prototype.parseChartSeriesColor = function (writer, dataPoints, chartType) {
        for (var i = 0; i < dataPoints.length; i++) {
            var data = dataPoints[i];
            writer.writeStartElement('c', 'spPr', this.chartNamespace);
            if (chartType === 'lineChart') {
                writer.writeStartElement('a', 'ln', this.aNamespace);
                writer.writeAttributeString(undefined, 'w', undefined, '28575');
                writer.writeAttributeString(undefined, 'cap', undefined, 'rnd');
            }
            if (chartType !== 'lineChart') {
                this.serializeChartSolidFill(writer, this.getColor(data[fillProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]]), true);
            }
            else {
                this.serializeChartSolidFill(writer, data[lineProperty[this.keywordIndex]][colorProperty[this.keywordIndex]], true);
            }
            if (chartType !== 'lineChart') {
                writer.writeStartElement('a', 'ln', this.aNamespace);
                writer.writeStartElement('a', 'noFill', this.aNamespace);
                writer.writeEndElement(); // end of a: noFill
            }
            writer.writeStartElement('a', 'round', this.aNamespace);
            writer.writeEndElement(); // end of a: round
            writer.writeEndElement(); // end of a: ln
            writer.writeStartElement('a', 'effectLst', this.aNamespace);
            writer.writeEndElement(); // end of a: effectLst
            writer.writeEndElement(); // end of c: spPr
            if (chartType === 'lineChart') {
                var symbolType = 'none';
                var size = 0;
                if (this.chart[chartSeriesProperty[this.keywordIndex]][i].hasOwnProperty(seriesFormatProperty[this.keywordIndex])) {
                    symbolType = this.chart[chartSeriesProperty[this.keywordIndex]][i][seriesFormatProperty[this.keywordIndex]][markerStyleProperty[this.keywordIndex]];
                    size = this.chart[chartSeriesProperty[this.keywordIndex]][i][seriesFormatProperty[this.keywordIndex]][markerSizeProperty[this.keywordIndex]];
                }
                writer.writeStartElement('c', 'marker', this.chartNamespace);
                writer.writeStartElement('c', 'symbol', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, symbolType.toLowerCase());
                writer.writeEndElement(); // end of a: symbol
                if (this.chart[chartSeriesProperty[this.keywordIndex]][i].hasOwnProperty(seriesFormatProperty[this.keywordIndex])) {
                    writer.writeStartElement('c', 'size', this.chartNamespace);
                    writer.writeAttributeString(undefined, 'val', undefined, size.toString());
                    writer.writeEndElement(); // end of a: size
                }
                writer.writeEndElement(); // end of a: marker
            }
        }
    };
    WordExport.prototype.parseChartDataPoint = function (writer, series) {
        // data point
        var dataPoints = series[dataPointsProperty[this.keywordIndex]];
        var points = [];
        for (var j = 0; j < dataPoints.length; j++) {
            points.push(dataPoints[j]);
            writer.writeStartElement('c', 'dPt', this.chartNamespace);
            writer.writeStartElement('c', 'idx', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, j.toString());
            writer.writeEndElement(); // end of c:idx
            writer.writeStartElement('c', 'bubble3D', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement(); // end of c:bubble3D
            this.parseChartSeriesColor(writer, points, this.chart[chartTypeProperty[this.keywordIndex]]);
            writer.writeEndElement(); // end of c:dPt
            points = [];
        }
    };
    // chart data value
    WordExport.prototype.serializeChartCategory = function (writer, chart, cacheType) {
        var chartCategory = chart[chartCategoryProperty[this.keywordIndex]];
        var chartCategoryCount = chartCategory.length;
        writer.writeStartElement('c', 'f', this.chartNamespace);
        writer.writeString('Sheet1!$A$2:$A$' + (chartCategoryCount + 1).toString());
        writer.writeEndElement(); // end of f
        writer.writeStartElement('c', cacheType, this.chartNamespace);
        if (cacheType === 'numCache') {
            writer.writeStartElement('c', 'formatCode', this.chartNamespace);
            writer.writeString('General');
            writer.writeEndElement(); // end of formatCode
        }
        writer.writeStartElement('c', 'ptCount', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, chartCategoryCount.toString());
        writer.writeEndElement(); // end of ptCount
        for (var i = 0; i < chartCategory.length; i++) {
            var category = chartCategory[i];
            writer.writeStartElement('c', 'pt', this.chartNamespace);
            writer.writeAttributeString(undefined, 'idx', undefined, i.toString());
            writer.writeStartElement('c', 'v', this.chartNamespace);
            if (category[categoryXNameProperty[this.keywordIndex]] !== '') {
                writer.writeString(category[categoryXNameProperty[this.keywordIndex]]);
            }
            writer.writeEndElement(); // end of v
            writer.writeEndElement(); // end of pt
        }
        writer.writeEndElement(); // end of cacheType
    };
    // chart value
    WordExport.prototype.serializeChartValue = function (writer, valueSheet, chartType) {
        var isScatterType = (chartType === 'scatterChart' || chartType === 'bubbleChart');
        var valueType = 'val';
        if (isScatterType) {
            valueType = 'yVal';
        }
        this.serializeChartYValue(writer, valueType, valueSheet);
        if (chartType === 'bubbleChart') {
            valueType = 'bubbleSize';
            valueSheet = 'Sheet1!$C$2:$C$';
            this.serializeChartYValue(writer, valueType, valueSheet);
        }
        if (chartType === 'lineChart' || chartType === 'scatterChart') {
            writer.writeStartElement('c', 'smooth', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement(); // end of smooth
        }
    };
    WordExport.prototype.serializeChartYValue = function (writer, valueType, valueSheet) {
        var chart = this.chart;
        var chartCategory = chart[chartCategoryProperty[this.keywordIndex]];
        var chartCategoryCount = chartCategory.length;
        writer.writeStartElement('c', valueType, this.chartNamespace);
        writer.writeStartElement('c', 'numRef', this.chartNamespace);
        writer.writeStartElement('c', 'f', this.chartNamespace);
        writer.writeString(valueSheet + (chartCategoryCount + 1).toString());
        writer.writeEndElement(); // end of f
        writer.writeStartElement('c', 'numCache', this.chartNamespace);
        writer.writeStartElement('c', 'formatCode', this.chartNamespace);
        writer.writeString('General');
        writer.writeEndElement(); // end of formatCode
        writer.writeStartElement('c', 'ptCount', this.chartNamespace);
        writer.writeAttributeString(undefined, 'val', undefined, chartCategoryCount.toString());
        writer.writeEndElement(); // end of ptCount
        for (var j = 0; j < chartCategoryCount; j++) {
            var category = chartCategory[j];
            for (var k = 0; k < category[chartDataProperty[this.keywordIndex]].length; k++) {
                if (k === this.seriesCount) {
                    var chartData = category[chartDataProperty[this.keywordIndex]][this.seriesCount];
                    writer.writeStartElement('c', 'pt', this.chartNamespace);
                    writer.writeAttributeString(undefined, 'idx', undefined, j.toString());
                    writer.writeStartElement('c', 'v', this.chartNamespace);
                    if (valueType !== 'bubbleSize') {
                        writer.writeString(chartData[yValueProperty[this.keywordIndex]].toString());
                    }
                    else {
                        writer.writeString(chartData[sizeProperty[this.keywordIndex]].toString());
                    }
                    writer.writeEndElement(); // end of v
                    writer.writeEndElement(); // end of pt
                }
            }
        }
        writer.writeEndElement(); // end of numCache
        writer.writeEndElement(); // end of numRef
        writer.writeEndElement(); // end of val
    };
    // chart type
    WordExport.prototype.chartType = function (chart) {
        var chartType = chart[chartTypeProperty[this.keywordIndex]];
        switch (chartType) {
            case 'Pie':
                chartType = 'pieChart';
                break;
            case 'Doughnut':
                chartType = 'doughnutChart';
                break;
            case 'Scatter_Markers':
                chartType = 'scatterChart';
                break;
            case 'Bubble':
                chartType = 'bubbleChart';
                break;
        }
        if (chartType === 'Area' || chartType === 'Area_Stacked' || chartType === 'Area_Stacked_100') {
            chartType = 'areaChart';
        }
        if (chartType === 'Bar_Stacked_100' || chartType === 'Bar_Stacked' || chartType === 'Bar_Clustered' ||
            chartType === 'Column_Clustered' || chartType === 'Column_Stacked' || chartType === 'Column_Stacked_100') {
            chartType = 'barChart';
        }
        if (chartType === 'Line' || chartType === 'Line_Markers' || chartType === 'Line_Markers_Stacked' || chartType === 'Line_Stacked'
            || chartType === 'Line_Markers_Stacked_100' || chartType === 'Line_Stacked_100') {
            chartType = 'lineChart';
        }
        return chartType;
    };
    // chart group
    WordExport.prototype.chartGrouping = function (type) {
        var grouping = 'standard';
        if (type === 'Bar_Stacked' || type === 'Column_Stacked' || type === 'Area_Stacked'
            || type === 'Line_Stacked' || type === 'Line_Markers_Stacked') {
            grouping = 'stacked';
        }
        else if (type === 'Bar_Stacked_100' || type === 'Column_Stacked_100' ||
            type === 'Area_Stacked_100' || type === 'Line_Stacked_100' ||
            type === 'Line_Markers_Stacked_100') {
            grouping = 'percentStacked';
        }
        else if (type === 'Bar_Clustered' || type === 'Column_Clustered') {
            grouping = 'clustered';
        }
        return grouping;
    };
    // chart legend position
    WordExport.prototype.chartLegendPosition = function (chart) {
        var legendPosition = chart[positionProperty[this.keywordIndex]];
        switch (legendPosition) {
            case 'Top':
                legendPosition = 't';
                break;
            case 'Bottom':
                legendPosition = 'b';
                break;
            case 'Left':
                legendPosition = 'l';
                break;
            case 'Right':
                legendPosition = 'r';
                break;
            case 'Corner':
                legendPosition = 'tr';
                break;
            default:
                legendPosition = 'b';
                break;
        }
        return legendPosition;
    };
    // update the chard id
    WordExport.prototype.updatechartId = function (chart) {
        var id = '';
        if (id === '') {
            id = this.addChartRelation(this.documentCharts, chart);
        }
        return id;
    };
    // adds the chart relation.
    WordExport.prototype.addChartRelation = function (chartCollection, chart) {
        var relationId = '';
        relationId = this.getNextRelationShipID();
        chartCollection.add(relationId, chart);
        return relationId;
    };
    /**
     * @private
     */
    WordExport.prototype.startsWith = function (sourceString, startString) {
        return startString.length > 0 && sourceString.substring(0, startString.length) === startString;
    };
    WordExport.prototype.serializeShapeDrawingGraphics = function (writer, shape) {
        var val = shape[autoShapeTypeProperty[this.keywordIndex]];
        var id = shape[shapeIdProperty[this.keywordIndex]];
        this.serializeShapeWrapStyle(writer, shape);
        writer.writeStartElement('wp', 'docPr', this.wpNamespace);
        writer.writeAttributeString(undefined, 'id', undefined, (this.mDocPrID++).toString());
        writer.writeAttributeString(undefined, 'name', undefined, shape[nameProperty[this.keywordIndex]]);
        writer.writeAttributeString(undefined, 'title', undefined, shape[titleProperty[this.keywordIndex]]);
        writer.writeEndElement();
        writer.writeStartElement('a', 'graphic', this.aNamespace);
        writer.writeStartElement('a', 'graphicData', this.aNamespace);
        writer.writeAttributeString(undefined, 'uri', undefined, this.wpShapeNamespace);
        writer.writeStartElement('wps', 'wsp', this.wpShapeNamespace);
        writer.writeStartElement('wps', 'cNvCnPr', this.wpShapeNamespace);
        writer.writeStartElement('a', 'cxnSpLocks', this.aNamespace);
        writer.writeAttributeString(undefined, 'noChangeShapeType', undefined, '1');
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeStartElement('wps', 'spPr', this.wpShapeNamespace);
        writer.writeAttributeString(undefined, 'bwMode', undefined, 'auto');
        writer.writeStartElement('a', 'xfrm', this.aNamespace);
        writer.writeStartElement('a', 'off', this.aNamespace);
        writer.writeAttributeString(undefined, 'x', undefined, '0');
        writer.writeAttributeString(undefined, 'y', undefined, '0');
        writer.writeEndElement();
        writer.writeStartElement('a', 'ext', this.aNamespace);
        var cx = Math.round((shape[widthProperty[this.keywordIndex]] * this.emusPerPoint));
        writer.writeAttributeString(undefined, 'cx', undefined, cx.toString());
        var cy = Math.round((shape[heightProperty[this.keywordIndex]] * this.emusPerPoint));
        writer.writeAttributeString(undefined, 'cy', undefined, cy.toString());
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeStartElement('a', 'prstGeom', this.aNamespace);
        if (val === (this.keywordIndex == 1 ? 3 : 'StraightConnector')) {
            writer.writeAttributeString(undefined, 'prst', undefined, 'straightConnector1');
        }
        else if (val === (this.keywordIndex == 1 ? 2 : 'RoundedRectangle')) {
            writer.writeAttributeString(undefined, 'prst', undefined, 'roundRect');
        }
        else {
            // writer.writeAttributeString(undefined, 'prst', undefined, 'rect');
            if (typeof val != 'number') {
                writer.writeAttributeString(undefined, 'prst', undefined, this.getExportAutoShapeType(this.getAutoShapeTypeEnumValue(val)));
            }
            else {
                writer.writeAttributeString(undefined, 'prst', undefined, this.getExportAutoShapeType(val));
            }
        }
        writer.writeStartElement('a', 'avLst', this.aNamespace);
        writer.writeEndElement();
        writer.writeEndElement();
        if (shape[fillFormatProperty[this.keywordIndex]] && shape[fillFormatProperty[this.keywordIndex]][colorProperty[this.keywordIndex]] && HelperMethods.parseBoolValue(shape[fillFormatProperty[this.keywordIndex]][fillProperty[this.keywordIndex]])) {
            writer.writeStartElement('a', 'solidFill', this.aNamespace);
            writer.writeStartElement('a', 'srgbClr', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, this.getColor(shape[fillFormatProperty[this.keywordIndex]][colorProperty[this.keywordIndex]]));
            writer.writeEndElement();
            writer.writeEndElement();
        }
        else {
            writer.writeStartElement('a', 'noFill', this.aNamespace);
            writer.writeEndElement();
        }
        var lineWeight = shape[lineFormatProperty[this.keywordIndex]][weightProperty[this.keywordIndex]] ? shape[lineFormatProperty[this.keywordIndex]][weightProperty[this.keywordIndex]] * this.emusPerPoint : this.emusPerPoint;
        writer.writeStartElement('a', 'ln', this.aNamespace);
        writer.writeAttributeString(undefined, 'w', undefined, Math.round(lineWeight).toString());
        if ((!isNullOrUndefined(shape[lineFormatProperty[this.keywordIndex]][lineFormatTypeProperty[this.keywordIndex]]) && shape[lineFormatProperty[this.keywordIndex]][lineFormatTypeProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 3 : 'None'))
            && HelperMethods.parseBoolValue(shape[lineFormatProperty[this.keywordIndex]][lineProperty[this.keywordIndex]])) {
            writer.writeStartElement('a', 'solidFill', this.aNamespace);
            writer.writeStartElement('a', 'srgbClr', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, this.getColor(shape[lineFormatProperty[this.keywordIndex]][colorProperty[this.keywordIndex]]));
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('a', 'round', this.aNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'headEnd', this.aNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'tailEnd', this.aNamespace);
            writer.writeEndElement();
        }
        else {
            writer.writeStartElement('a', 'noFill', this.aNamespace);
            writer.writeEndElement();
        }
        writer.writeEndElement();
        writer.writeEndElement();
        if (val === (this.keywordIndex == 1 ? 1 : 'Rectangle') || val === (this.keywordIndex == 1 ? 2 : 'RoundedRectangle')) {
            writer.writeStartElement('wps', 'txbx', this.wpShapeNamespace);
            writer.writeStartElement(undefined, 'txbxContent', this.wNamespace);
            this.serializeBodyItems(writer, shape[textFrameProperty[this.keywordIndex]][blocksProperty[this.keywordIndex]], true);
            writer.writeEndElement();
            writer.writeEndElement();
        }
        writer.writeStartElement('wps', 'bodyPr', this.wpShapeNamespace);
        if (!isNullOrUndefined(shape[textFrameProperty[this.keywordIndex]])) {
            var margin = void 0;
            if (shape[textFrameProperty[this.keywordIndex]][leftMarginProperty[this.keywordIndex]] >= 0) {
                margin = Math.round(shape[textFrameProperty[this.keywordIndex]][leftMarginProperty[this.keywordIndex]] * this.emusPerPoint).toString();
                writer.writeAttributeString(undefined, 'lIns', undefined, margin);
            }
            if (shape[textFrameProperty[this.keywordIndex]][topMarginProperty[this.keywordIndex]] >= 0) {
                margin = Math.round(shape[textFrameProperty[this.keywordIndex]][topMarginProperty[this.keywordIndex]] * this.emusPerPoint).toString();
                writer.writeAttributeString(undefined, 'tIns', undefined, margin);
            }
            if (shape[textFrameProperty[this.keywordIndex]][rightMarginProperty[this.keywordIndex]] >= 0) {
                margin = Math.round(shape[textFrameProperty[this.keywordIndex]][rightMarginProperty[this.keywordIndex]] * this.emusPerPoint).toString();
                writer.writeAttributeString(undefined, 'rIns', undefined, margin);
            }
            if (shape[textFrameProperty[this.keywordIndex]][bottomMarginProperty[this.keywordIndex]] >= 0) {
                margin = Math.round(shape[textFrameProperty[this.keywordIndex]][bottomMarginProperty[this.keywordIndex]] * this.emusPerPoint).toString();
                writer.writeAttributeString(undefined, 'bIns', undefined, margin);
            }
            if (shape[textFrameProperty[this.keywordIndex]][textVerticalAlignmentProperty[this.keywordIndex]]) {
                var vert = void 0;
                if (this.keywordIndex == 1) {
                    vert = HelperMethods.getTextVerticalAlignment(shape[textFrameProperty[this.keywordIndex]][textVerticalAlignmentProperty[this.keywordIndex]]).toString().toLowerCase();
                }
                else {
                    vert = shape[textFrameProperty[this.keywordIndex]][textVerticalAlignmentProperty[this.keywordIndex]].toString().toLowerCase();
                }
                writer.writeAttributeString(undefined, 'anchor', undefined, this.getTextVerticalAlignmentProperty(vert));
            }
            writer.writeAttributeString(undefined, 'anchorCtr', undefined, '0');
        }
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeEndElement();
    };
    WordExport.prototype.getTextVerticalAlignmentProperty = function (vert) {
        switch (vert) {
            case 'top':
                return 't';
            case 'middle':
            case 'center':
                return 'ctr';
            case 'bottom':
                return 'b';
            default:
                return vert;
        }
    };
    WordExport.prototype.serializeShapeWrapStyle = function (writer, shape) {
        var wrappingStyle = this.keywordIndex == 1 ? this.getTextWrappingStyle(shape[textWrappingStyleProperty[this.keywordIndex]]) : shape[textWrappingStyleProperty[this.keywordIndex]];
        if (wrappingStyle !== 'Inline') {
            var textWrappingStyle = 'wrapNone';
            if (wrappingStyle && wrappingStyle !== 'InFrontOfText' && wrappingStyle !== 'Behind') {
                textWrappingStyle = 'wrap' + wrappingStyle;
                if (wrappingStyle === 'Tight') {
                    textWrappingStyle = 'wrap' + 'Square';
                }
            }
            writer.writeStartElement('wp', textWrappingStyle, this.wpNamespace);
            if (wrappingStyle && wrappingStyle !== 'InFrontOfText' && wrappingStyle !== 'Behind' &&
                !isNullOrUndefined(shape[textWrappingTypeProperty[this.keywordIndex]])) {
                var wrapType = this.keywordIndex == 1 ? this.getTextWrappingType(shape[textWrappingTypeProperty[this.keywordIndex]]) : shape[textWrappingTypeProperty[this.keywordIndex]] === 'Both' ? 'bothSides' : shape[textWrappingTypeProperty[this.keywordIndex]].toLowerCase();
                writer.writeAttributeString(undefined, 'wrapText', undefined, wrapType);
            }
            writer.writeEndElement();
        }
    };
    // Serialize the graphics element for pictures.
    WordExport.prototype.serializeDrawingGraphics = function (writer, picture) {
        var id = '';
        var format;
        var imageStringInfo = this.getBase64ImageString(picture);
        var imageString = imageStringInfo.imageString;
        if (HelperMethods.parseBoolValue(picture[isMetaFileProperty[this.keywordIndex]])) {
            format = HelperMethods.formatClippedString(imageStringInfo.metaFileImageString).extension;
            if (format !== '.svg') {
                imageString = imageStringInfo.metaFileImageString;
            }
        }
        id = this.updateShapeId(picture, false);
        // picture.ShapeId = this.getNextDocPrID();
        // Processing picture
        writer.writeStartElement('wp', 'docPr', this.wpNamespace);
        writer.writeAttributeString(undefined, 'id', undefined, (this.mDocPrID++).toString());
        if (!isNullOrUndefined(picture[alternativeTextProperty[this.keywordIndex]])) {
            writer.writeAttributeString(undefined, 'descr', undefined, picture[alternativeTextProperty[this.keywordIndex]]);
        }
        writer.writeAttributeString(undefined, 'name', undefined, !isNullOrUndefined(picture[nameProperty[this.keywordIndex]]) ? picture[nameProperty[this.keywordIndex]] : '');
        if (!isNullOrUndefined(picture[titleProperty[this.keywordIndex]]))
            writer.writeAttributeString(undefined, 'title', undefined, picture[titleProperty[this.keywordIndex]]);
        // else
        // writer.writeAttributeString(undefined, 'title', undefined, '');
        // if (!picture.Visible)
        //     m_writer.WriteAttributeString('hidden', '1');
        // SerializePictureHyperlink(picture);
        writer.writeEndElement();
        writer.writeStartElement('a', 'graphic', this.aNamespace);
        writer.writeStartElement('a', 'graphicData', this.aNamespace);
        writer.writeAttributeString(undefined, 'uri', undefined, this.pictureNamespace);
        writer.writeStartElement('pic', 'pic', this.pictureNamespace);
        writer.writeStartElement('pic', 'nvPicPr', this.pictureNamespace);
        writer.writeStartElement('pic', 'cNvPr', this.pictureNamespace);
        writer.writeAttributeString(undefined, 'id', undefined, '0');
        writer.writeAttributeString(undefined, 'name', undefined, '');
        writer.writeAttributeString(undefined, 'descr', undefined, '');
        writer.writeEndElement();
        writer.writeStartElement('pic', 'cNvPicPr', this.pictureNamespace);
        writer.writeStartElement('a', 'picLocks', this.aNamespace);
        writer.writeAttributeString(undefined, 'noChangeAspect', undefined, '1');
        writer.writeAttributeString(undefined, 'noChangeArrowheads', undefined, '1');
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeStartElement('pic', 'blipFill', this.pictureNamespace);
        writer.writeStartElement('a', 'blip', this.aNamespace);
        if (this.startsWith(imageString, 'data:image')) {
            writer.writeAttributeString('r', 'embed', this.rNamespace, id);
        }
        else {
            if (this.documentImages.containsKey(id)) {
                //Remove the image document images collection for this particular key
                //If the picture image data has href means MS Word contains the image in media folder as well as 
                //it is having external relationship id
                // if (!this.startsWith(picture.imageString, 'data:image')) {
                this.documentImages.remove(id);
                this.externalImages.add(id, imageString);
                writer.writeAttributeString(undefined, 'link', this.rNamespace, id);
                if (!isNullOrUndefined(imageStringInfo.metaFileImageString) && (this.startsWith(imageString, "https://") || this.startsWith(imageString, "http://") || this.startsWith(imageString, "file://"))) {
                    var newRId = this.getNextRelationShipID();
                    this.documentImages.add(newRId, imageStringInfo.metaFileImageString);
                    writer.writeAttributeString('r', 'embed', this.rNamespace, newRId);
                }
            }
        }
        if (format === '.svg') {
            this.serializeBlipExtensions(writer, picture);
        }
        //End Element Blip
        writer.writeEndElement();
        if (!isNullOrUndefined(picture[topProperty[this.keywordIndex]]) && picture[topProperty[this.keywordIndex]] !== 0 ||
            !isNullOrUndefined(picture[bottomProperty[this.keywordIndex]]) && picture[bottomProperty[this.keywordIndex]] !== 0 ||
            !isNullOrUndefined(picture[leftProperty[this.keywordIndex]]) && picture[leftProperty[this.keywordIndex]] !== 0 ||
            !isNullOrUndefined(picture[rightProperty[this.keywordIndex]]) && picture[rightProperty[this.keywordIndex]] !== 0) {
            writer.writeStartElement('a', 'srcRect', this.aNamespace);
            var l = Math.round(picture[leftProperty[this.keywordIndex]] * 1000);
            writer.writeAttributeString(undefined, 'l', undefined, l.toString());
            var t = Math.round(picture[topProperty[this.keywordIndex]] * 1000);
            writer.writeAttributeString(undefined, 't', undefined, t.toString());
            var r = Math.round(picture[rightProperty[this.keywordIndex]] * 1000);
            writer.writeAttributeString(undefined, 'r', undefined, r.toString());
            var b = Math.round(picture[bottomProperty[this.keywordIndex]] * 1000);
            writer.writeAttributeString(undefined, 'b', undefined, b.toString());
            writer.writeEndElement();
        }
        writer.writeStartElement('a', 'stretch', this.aNamespace);
        writer.writeStartElement('a', 'fillRect', this.aNamespace);
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeStartElement('pic', 'spPr', this.pictureNamespace);
        writer.writeAttributeString(undefined, 'bwMode', undefined, 'auto');
        writer.writeStartElement('a', 'xfrm', this.aNamespace);
        // if (picture.Rotation !== 0)
        //     m_writer.WriteAttributeString('rot', picture.Rotation.ToString());
        writer.writeStartElement('a', 'off', this.aNamespace);
        writer.writeAttributeString(undefined, 'x', undefined, '0');
        writer.writeAttributeString(undefined, 'y', undefined, '0');
        writer.writeEndElement();
        writer.writeStartElement('a', 'ext', this.aNamespace);
        var cx = Math.round((picture[widthProperty[this.keywordIndex]] * this.emusPerPoint));
        writer.writeAttributeString(undefined, 'cx', undefined, cx.toString());
        var cy = Math.round((picture[heightProperty[this.keywordIndex]] * this.emusPerPoint));
        writer.writeAttributeString(undefined, 'cy', undefined, cy.toString());
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeStartElement('a', 'prstGeom', this.aNamespace);
        writer.writeAttributeString(undefined, 'prst', undefined, 'rect');
        writer.writeStartElement('a', 'avLst', this.aNamespace);
        writer.writeEndElement();
        writer.writeEndElement();
        //When the picture border has been added next to effect list
        //if not, Picture border has not been preserved
        // if (picture.HasBorder)
        // {
        //     if (picture.TextWrappingStyle === TextWrappingStyle.Inline && picture.IsShape)
        //         SerializeInlineShapeLine(picture.PictureShape);
        //     else
        //         SerializeShapeLine(picture.PictureShape);
        // }
        // if (picture.DocxProps.length > 0)
        //     SerializeDocxProps(picture.DocxProps, 'effectLst');
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeEndElement();
    };
    WordExport.prototype.serializeBlipExtensions = function (writer, picture) {
        writer.writeStartElement('a', 'extLst', this.aNamespace);
        writer.writeStartElement('a', "ext", this.aNamespace);
        writer.writeAttributeString(undefined, 'uri', undefined, '{96DAC541-7B7A-43D3-8B79-37D633B846F1}');
        writer.writeStartElement("asvg", "svgBlip", this.svgNamespace);
        var id = this.updateShapeId(picture, true);
        writer.writeAttributeString("r", "embed", undefined, id);
        writer.writeEndElement();
        writer.writeEndElement();
        writer.writeEndElement();
    };
    /// Update the shape id.
    WordExport.prototype.updateShapeId = function (picture, isSvgData) {
        var id = '';
        var tOwner = this.paragraph;
        // Adding picture byte data to the corresponding picture collection 
        // depending on its owner subdocument
        if (this.headerFooter) {
            id = this.updateHFImageRels(this.headerFooter, picture, isSvgData);
        }
        else {
            if (id === '') {
                if (tOwner.hasOwnProperty(sectionFormatProperty[this.keywordIndex]) || tOwner.hasOwnProperty(inlinesProperty[this.keywordIndex])) {
                    id = this.addImageRelation(!isSvgData ? this.documentImages : this.svgImages, picture, isSvgData);
                    // if (owner is WFootnote)
                    // {
                    //     if ((owner as WFootnote).FootnoteType === FootnoteType.Footnote)
                    //         id = AddImageRelation(FootnoteImages, picture.ImageRecord);
                    //     else
                    //         id = AddImageRelation(EndnoteImages, picture.ImageRecord);
                    // }
                    // if (owner is WComment)
                    //     id = AddImageRelation(CommentImages, picture.ImageRecord);
                }
            }
        }
        return id;
    };
    // Adds the image relation.
    WordExport.prototype.addImageRelation = function (imageCollection, image, isSvgData) {
        var relationId = '';
        var index = isSvgData ? this.svgImageRelationIds.keys.indexOf(parseInt(image[imageStringProperty[this.keywordIndex]])) : this.imageRelationIds.keys.indexOf(parseInt(image[imageStringProperty[this.keywordIndex]]));
        if (index < 0 || this.isHeaderFooter) {
            relationId = this.getNextRelationShipID();
            isSvgData ? this.svgImageRelationIds.add(parseInt(image[imageStringProperty[this.keywordIndex]]), relationId) : this.imageRelationIds.add(parseInt(image[imageStringProperty[this.keywordIndex]]), relationId);
        }
        else {
            relationId = isSvgData ? this.svgImageRelationIds.get(parseInt(image[imageStringProperty[this.keywordIndex]])) : this.imageRelationIds.get(parseInt(image[imageStringProperty[this.keywordIndex]]));
        }
        imageCollection.add(relationId, image);
        return relationId;
    };
    // Update the HeaderFooter image relations.
    WordExport.prototype.updateHFImageRels = function (hf, image, isSvgImage) {
        var id = '';
        // UpdateImages(image);
        var headerId = '';
        var types = this.headersFooters.keys;
        for (var i = 0; i < types.length; i++) {
            var hfColl = this.headersFooters.get(types[i]);
            var hfKeys = hfColl.keys;
            for (var j = 0; j < hfKeys.length; j++) {
                if (hfColl.get(hfKeys[j]) === hf) {
                    headerId = hfKeys[j];
                    var headerImages = void 0;
                    if (isSvgImage) {
                        if (this.headerFooterSvgImages.containsKey(headerId)) {
                            headerImages = this.headerFooterSvgImages.get(headerId);
                            id = this.addImageRelation(headerImages, image, true);
                        }
                        else {
                            headerImages = new Dictionary();
                            id = this.addImageRelation(headerImages, image, true);
                            this.headerFooterSvgImages.add(headerId, headerImages);
                        }
                    }
                    else {
                        if (this.headerFooterImages.containsKey(headerId)) {
                            headerImages = this.headerFooterImages.get(headerId);
                            id = this.addImageRelation(headerImages, image, false);
                        }
                        else {
                            headerImages = new Dictionary();
                            id = this.addImageRelation(headerImages, image, false);
                            this.headerFooterImages.add(headerId, headerImages);
                        }
                    }
                }
            }
        }
        return id;
    };
    // Serialize the table
    WordExport.prototype.serializeTable = function (writer, table) {
        if (isNullOrUndefined(this.keywordIndex)) {
            this.keywordIndex = 0;
        }
        if (table[rowsProperty[this.keywordIndex]].length <= 0) {
            return;
        }
        var owner = this.table;
        this.table = table;
        writer.writeStartElement(undefined, 'tbl', this.wNamespace);
        var tableFormat = table[rowsProperty[this.keywordIndex]][0][rowFormatProperty[this.keywordIndex]];
        this.serializeTableFormat(writer, tableFormat, table);
        this.serializeTableGrid(writer, table);
        var mVerticalMerge = new Dictionary();
        var mHorizontalMerge = new Dictionary();
        var cellFormats = new Dictionary();
        var rows = table[rowsProperty[this.keywordIndex]];
        if (rows.length > 0) {
            for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                var row = rows[rowIndex];
                if (row[cellsProperty[this.keywordIndex]].length > 0) {
                    if (row.hasOwnProperty(contentControlPropertiesProperty[this.keywordIndex])) {
                        this.serializeContentControl(writer, row[contentControlPropertiesProperty[this.keywordIndex]], row);
                        continue;
                    }
                    var owner_1 = this.row;
                    this.row = row;
                    writer.writeStartElement(undefined, 'tr', this.wNamespace);
                    this.serializeRowFormat(writer, row);
                    var cells = row[cellsProperty[this.keywordIndex]];
                    var cellLength = cells.length;
                    var prevColIndex = 0;
                    for (var i = 0; i < cellLength; i++) {
                        var cell = cells[i];
                        var columnIndex = cell[columnIndexProperty[this.keywordIndex]];
                        if (cell.hasOwnProperty(contentControlPropertiesProperty[this.keywordIndex])) {
                            this.serializeContentControl(writer, cell[contentControlPropertiesProperty[this.keywordIndex]], cell);
                            continue;
                        }
                        var cellFormat = cell[cellFormatProperty[this.keywordIndex]];
                        if ((columnIndex - prevColIndex) > 0) {
                            var checkIndex = i === 0 ? 0 : (prevColIndex + 1);
                            for (var k = checkIndex; k < columnIndex; k++) {
                                if (mVerticalMerge.containsKey(k)) {
                                    var format = this.getMergeCellFormat(cellFormat, cellFormats.get(k), k < cell[columnIndexProperty[this.keywordIndex]]);
                                    this.isVerticalMergeCell = true;
                                    this.isBookmarkAtRowEnd = true;
                                    this.serializeTableCell(writer, cell, format, false);
                                    mVerticalMerge.set(k, mVerticalMerge.get(k) - 1);
                                    if (mVerticalMerge.get(k) === 1) {
                                        mVerticalMerge.remove(k);
                                        cellFormats.remove(k);
                                        if (mHorizontalMerge.containsKey(k)) {
                                            mHorizontalMerge.remove(k);
                                        }
                                    }
                                    if (mHorizontalMerge.containsKey(k)) {
                                        prevColIndex += mHorizontalMerge.get(k) - 1;
                                        k += mHorizontalMerge.get(k);
                                        if (k > 0) {
                                            k--;
                                        }
                                    }
                                }
                            }
                        }
                        this.isVerticalMergeCell = false;
                        this.isBookmarkAtRowEnd = false;
                        prevColIndex = columnIndex;
                        if (cellFormat[rowSpanProperty[this.keywordIndex]] > 1) {
                            mVerticalMerge.add(columnIndex, cellFormat[rowSpanProperty[this.keywordIndex]]);
                            cellFormats.add(columnIndex, cellFormat);
                        }
                        this.serializeTableCell(writer, cell, cellFormat, true);
                        if (cellFormat[columnSpanProperty[this.keywordIndex]] > 1 && cellFormat[rowSpanProperty[this.keywordIndex]] > 1) {
                            mHorizontalMerge.add(columnIndex, cellFormat[columnSpanProperty[this.keywordIndex]]);
                        }
                        for (var j = columnIndex + 1;; j++) {
                            if (mVerticalMerge.containsKey(j)) {
                                var mergeFormat = this.getMergeCellFormat(cellFormat, cellFormats.get(j), j < cell[columnIndexProperty[this.keywordIndex]]);
                                this.serializeTableCell(writer, cell, mergeFormat, false);
                                mVerticalMerge.set(j, mVerticalMerge.get(j) - 1);
                                prevColIndex++;
                                if (mVerticalMerge.get(j) === 1) {
                                    mVerticalMerge.remove(j);
                                    cellFormats.remove(j);
                                    if (mHorizontalMerge.containsKey(j)) {
                                        mHorizontalMerge.remove(j);
                                    }
                                }
                                if (mHorizontalMerge.containsKey(j)) {
                                    prevColIndex += mHorizontalMerge.get(j) - 1;
                                    j += mHorizontalMerge.get(j);
                                }
                            }
                            else if (!(i === (cellLength - 1) && j < table[columnCountProperty[this.keywordIndex]])) {
                                break;
                            }
                        }
                    }
                    if (!this.isBookmarkAtRowEnd) {
                        writer.writeEndElement(); //end od table row 'tr'
                    }
                    this.isBookmarkAtRowEnd = false;
                    this.row = owner_1;
                }
            }
        }
        writer.writeEndElement();
        this.table = owner;
    };
    WordExport.prototype.getMergeCellFormat = function (cellFormat, mergedCellFormat, before) {
        var format = mergedCellFormat;
        if (before) {
            format[bordersProperty[this.keywordIndex]][rightProperty[this.keywordIndex]] = cellFormat[bordersProperty[this.keywordIndex]][leftProperty[this.keywordIndex]];
        }
        else {
            format[bordersProperty[this.keywordIndex]][leftProperty[this.keywordIndex]] = cellFormat[bordersProperty[this.keywordIndex]][rightProperty[this.keywordIndex]];
        }
        return format;
    };
    WordExport.prototype.serializeTableCell = function (xmlWriter, cell, cellFormat, mergeStart) {
        var owner = this.blockOwner;
        this.blockOwner = cell;
        xmlWriter.writeStartElement(undefined, 'tc', this.wNamespace);
        xmlWriter.writeStartElement(undefined, 'tcPr', this.wNamespace);
        this.serializeCellWidth(xmlWriter, cellFormat);
        this.serializeCellMargins(xmlWriter, cellFormat);
        xmlWriter.writeStartElement(undefined, 'tcBorders', this.wNamespace);
        this.serializeBorders(xmlWriter, cellFormat[bordersProperty[this.keywordIndex]], 8, false);
        xmlWriter.writeEndElement(); // end of tcBorders
        this.serializeShading(xmlWriter, cell[cellFormatProperty[this.keywordIndex]][shadingProperty[this.keywordIndex]]);
        this.serializeTableCellDirection(xmlWriter, cellFormat);
        this.serializeCellVerticalAlign(xmlWriter, cellFormat[verticalAlignmentProperty[this.keywordIndex]]);
        if (cellFormat[columnSpanProperty[this.keywordIndex]] > 1) {
            var num = cellFormat[columnSpanProperty[this.keywordIndex]];
            xmlWriter.writeStartElement(undefined, 'gridSpan', this.wNamespace);
            xmlWriter.writeAttributeString('w', 'val', this.wNamespace, num.toString());
            xmlWriter.writeEndElement();
        }
        if (cellFormat[rowSpanProperty[this.keywordIndex]] > 1) {
            xmlWriter.writeStartElement(undefined, 'vMerge', this.wNamespace);
            xmlWriter.writeAttributeString('w', 'val', this.wNamespace, mergeStart ? 'restart' : 'continue');
            xmlWriter.writeEndElement(); // end of vMerge
        }
        xmlWriter.writeEndElement(); // end of tcPr
        if (cell && cell[blocksProperty[this.keywordIndex]].length > 0) {
            var itemIndex = 0;
            var item = undefined;
            while (itemIndex < cell[blocksProperty[this.keywordIndex]].length) {
                item = cell[blocksProperty[this.keywordIndex]][itemIndex];
                this.serializeBodyItem(xmlWriter, item, false);
                itemIndex += 1;
            }
        }
        else {
            xmlWriter.writeStartElement(undefined, 'p', this.wNamespace);
            xmlWriter.writeStartElement(undefined, 'pPr', this.wNamespace);
            xmlWriter.writeStartElement(undefined, 'pStyle', this.wNamespace);
            xmlWriter.writeAttributeString('w', 'val', this.wNamespace, 'Normal');
            xmlWriter.writeEndElement(); //end of pStyle
            xmlWriter.writeEndElement(); //end of pPr
            xmlWriter.writeEndElement(); //end of P
        }
        if ((!this.isBookmarkAtRowEnd) || this.isVerticalMergeCell) {
            xmlWriter.writeEndElement(); //end of table cell 'tc' 
        }
        this.blockOwner = owner;
    };
    // Serialize the table grid
    WordExport.prototype.serializeTableGrid = function (writer, table) {
        writer.writeStartElement(undefined, 'tblGrid', this.wNamespace);
        if (table[gridProperty[this.keywordIndex]].length !== 0) {
            this.serializeGridColumns(writer, table[gridProperty[this.keywordIndex]]);
        }
        writer.writeEndElement();
    };
    // Serialize the table rows
    WordExport.prototype.serializeTableRows = function (writer, rows) {
        var mVerticalMerge = new Dictionary();
        if (rows.length > 0) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row[cellsProperty[this.keywordIndex]].length > 0) {
                    if (row.hasOwnProperty(contentControlPropertiesProperty[this.keywordIndex])) {
                        this.serializeContentControl(writer, row[contentControlPropertiesProperty[this.keywordIndex]], row);
                        continue;
                    }
                    this.serializeRow(writer, row, mVerticalMerge);
                }
            }
        }
    };
    // Serialize the table row
    WordExport.prototype.serializeRow = function (writer, row, mVerticalMerge) {
        var owner = this.row;
        this.row = row;
        writer.writeStartElement(undefined, 'tr', this.wNamespace);
        this.serializeRowFormat(writer, row);
        this.serializeCells(writer, row[cellsProperty[this.keywordIndex]], mVerticalMerge);
        if (!this.isBookmarkAtRowEnd) {
            writer.writeEndElement(); //end od table row 'tr'
        }
        this.isBookmarkAtRowEnd = false;
        this.row = owner;
    };
    // Serialize the row format
    WordExport.prototype.serializeRowFormat = function (writer, row) {
        this.serializeRowMargins(writer, row[rowFormatProperty[this.keywordIndex]]);
        writer.writeStartElement(undefined, 'trPr', this.wNamespace);
        //Serialize Row Height
        if (row[rowFormatProperty[this.keywordIndex]][heightProperty[this.keywordIndex]] > 0) {
            writer.writeStartElement(undefined, 'trHeight', this.wNamespace);
            if (row[rowFormatProperty[this.keywordIndex]][heightTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'Exactly')) {
                writer.writeAttributeString('w', 'hRule', this.wNamespace, 'exact');
            }
            else if (row[rowFormatProperty[this.keywordIndex]][heightTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'AtLeast')) {
                writer.writeAttributeString('w', 'hRule', this.wNamespace, 'atLeast');
            }
            var height = this.roundToTwoDecimal(row[rowFormatProperty[this.keywordIndex]][heightProperty[this.keywordIndex]] * this.twentiethOfPoint).toString();
            writer.writeAttributeString('w', 'val', this.wNamespace, height);
            writer.writeEndElement();
        }
        var rowFormat = row[rowFormatProperty[this.keywordIndex]];
        // //Serialize 'gridBefore' element
        var gridBefore = rowFormat[gridBeforeProperty[this.keywordIndex]];
        if (gridBefore > 0) {
            writer.writeStartElement(undefined, 'gridBefore', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, gridBefore.toString());
            writer.writeEndElement();
        }
        // //Serialize 'gridAfter' element
        var gridAfter = rowFormat[gridAfterProperty[this.keywordIndex]];
        if (gridAfter > 0) {
            writer.writeStartElement(undefined, 'gridAfter', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, gridAfter.toString());
            writer.writeEndElement();
        }
        // //Serialize 'wBefore' element 
        if (gridBefore > 0) {
            writer.writeStartElement(undefined, 'wBefore', this.wNamespace);
            switch (rowFormat[gridBeforeWidthTypeProperty[this.keywordIndex]]) {
                case 'Percent':
                case 1:
                    var width = this.roundToTwoDecimal(rowFormat[gridBeforeWidthProperty[this.keywordIndex]] * this.percentageFactor).toString();
                    writer.writeAttributeString('w', 'w', this.wNamespace, width);
                    writer.writeAttributeString('w', 'type', this.wNamespace, 'pct');
                    break;
                case 'Point':
                case 2:
                    var pointWidth = this.roundToTwoDecimal(rowFormat[gridBeforeWidthProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                    writer.writeAttributeString('w', 'w', this.wNamespace, pointWidth);
                    writer.writeAttributeString('w', 'type', this.wNamespace, 'dxa');
                    break;
            }
            writer.writeEndElement();
        }
        //Serialize 'wAfter' element
        if (gridAfter > 0) {
            writer.writeStartElement(undefined, 'wAfter', this.wNamespace);
            switch (rowFormat[gridAfterWidthTypeProperty[this.keywordIndex]]) {
                case 'Percent':
                case 1:
                    var width = this.roundToTwoDecimal(rowFormat[gridAfterWidthProperty[this.keywordIndex]] * this.percentageFactor).toString();
                    writer.writeAttributeString('w', 'val', this.wNamespace, width);
                    writer.writeAttributeString('w', 'type', this.wNamespace, 'pct');
                    break;
                case 'Point':
                case 2:
                    var pointWidth = this.roundToTwoDecimal(rowFormat[gridAfterWidthProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                    writer.writeAttributeString('w', 'val', this.wNamespace, pointWidth);
                    writer.writeAttributeString('w', 'type', this.wNamespace, 'dxa');
                    break;
            }
            writer.writeEndElement();
        }
        //Serialize 'cantSplit' element 
        if (!isNullOrUndefined(rowFormat[allowBreakAcrossPagesProperty[this.keywordIndex]]) && !HelperMethods.parseBoolValue(rowFormat[allowBreakAcrossPagesProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'cantSplit', this.wNamespace);
            writer.writeEndElement();
        }
        // //Serialize 'tblHeader' element 
        if (HelperMethods.parseBoolValue(rowFormat[isHeaderProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'tblHeader', this.wNamespace);
            writer.writeEndElement();
        }
        //serialize revision
        if (!isNullOrUndefined(rowFormat[revisionIdsProperty[this.keywordIndex]]) && rowFormat[revisionIdsProperty[this.keywordIndex]].length > 0) {
            this.serializeRevisionStart(writer, rowFormat, undefined);
            this.serializeRevisionEnd(writer, rowFormat, undefined);
        }
        writer.writeEndElement();
    };
    // serialize the table cells
    WordExport.prototype.serializeCells = function (writer, cells, mVerticalMerge) {
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].hasOwnProperty(contentControlPropertiesProperty[this.keywordIndex])) {
                this.serializeContentControl(writer, cells[i][contentControlPropertiesProperty[this.keywordIndex]], cells[i]);
                continue;
            }
            this.serializeCell(writer, cells[i], mVerticalMerge);
        }
    };
    // Serialize the table cell
    WordExport.prototype.serializeCell = function (writer, cell, mVerticalMerge) {
        var owner = this.blockOwner;
        this.blockOwner = cell;
        writer.writeStartElement(undefined, 'tc', this.wNamespace);
        mVerticalMerge = this.serializeCellFormat(writer, cell[cellFormatProperty[this.keywordIndex]], true, true, mVerticalMerge);
        if (cell[blocksProperty[this.keywordIndex]].length > 0) {
            var itemIndex = 0;
            var item = undefined;
            while (itemIndex < cell[blocksProperty[this.keywordIndex]].length) {
                item = cell[blocksProperty[this.keywordIndex]][itemIndex];
                this.serializeBodyItem(writer, item, false);
                itemIndex += 1;
            }
        }
        else {
            writer.writeStartElement(undefined, 'p', this.wNamespace);
            writer.writeStartElement(undefined, 'pPr', this.wNamespace);
            writer.writeStartElement(undefined, 'pStyle', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, 'Normal');
            writer.writeEndElement(); //end of pStyle
            writer.writeEndElement(); //end of pPr
            writer.writeEndElement(); //end of P
        }
        if (!this.isBookmarkAtRowEnd) {
            writer.writeEndElement(); //end of table cell 'tc' 
        }
        var increment = 1;
        // let count: number = 0;
        if (mVerticalMerge.containsKey((cell[columnIndexProperty[this.keywordIndex]] + cell[cellFormatProperty[this.keywordIndex]][columnSpanProperty[this.keywordIndex]] - 1) + increment) && this.row[cellsProperty[this.keywordIndex]].length === 1) {
            var length_1 = mVerticalMerge.keys[mVerticalMerge.keys.length - 1];
            while (increment <= length_1) {
                increment = this.createCellForMerge(writer, cell, mVerticalMerge, increment);
                increment++;
            }
        }
        else {
            this.createCellForMerge(writer, cell, mVerticalMerge, increment);
        }
        this.blockOwner = owner;
    };
    WordExport.prototype.createCellForMerge = function (writer, cell, mVerticalMerge, increment) {
        while (mVerticalMerge.containsKey((cell[columnIndexProperty[this.keywordIndex]] + cell[cellFormatProperty[this.keywordIndex]][columnSpanProperty[this.keywordIndex]] - 1) + increment)
            && (((this.row[cellsProperty[this.keywordIndex]].indexOf(cell) === this.row[cellsProperty[this.keywordIndex]].length - 1) || this.row[cellsProperty[this.keywordIndex]].indexOf(cell) === cell[columnIndexProperty[this.keywordIndex]]))
            && cell.nextNode === undefined) {
            var collKey = (cell[columnIndexProperty[this.keywordIndex]] + cell[cellFormatProperty[this.keywordIndex]][columnSpanProperty[this.keywordIndex]] - 1) + increment;
            writer.writeStartElement(undefined, 'tc', this.wNamespace);
            var endProperties = true;
            if (!isNullOrUndefined(this.spanCellFormat)) {
                endProperties = false;
                mVerticalMerge = this.serializeCellFormat(writer, this.spanCellFormat, false, endProperties, mVerticalMerge);
            }
            else {
                writer.writeStartElement(undefined, 'tcPr', this.wNamespace);
                endProperties = false;
            }
            this.serializeColumnSpan(collKey, writer);
            writer.writeStartElement(undefined, 'vMerge', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, 'continue');
            writer.writeEndElement();
            if (isNullOrUndefined(this.spanCellFormat)) {
                writer.writeStartElement(undefined, 'tcBorders', this.wNamespace);
                this.serializeBorders(writer, cell[cellFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]], 8, false);
                writer.writeEndElement();
            }
            if (!endProperties) {
                writer.writeEndElement();
            }
            mVerticalMerge = this.checkMergeCell(collKey, mVerticalMerge);
            writer.writeStartElement('w', 'p', this.wNamespace);
            writer.writeEndElement(); //end of P
            writer.writeEndElement(); //end of table cell 'tc'  
            increment++;
            //count++;
        }
        return increment;
    };
    // Serialize the cell formatting
    WordExport.prototype.serializeCellFormat = function (writer, cellFormat, ensureMerge, endProperties, mVerticalMerge) {
        var cell = this.blockOwner;
        //Get the table fomat
        var tf = this.table[tableFormatProperty[this.keywordIndex]];
        //Get the row format
        var rf = this.row[rowFormatProperty[this.keywordIndex]];
        writer.writeStartElement(undefined, 'tcPr', this.wNamespace);
        //w:cnfStyle -   Table Cell Conditional Formatting
        // SerializeCnfStyleElement(cell);
        //w:tcW -    Preferred Table Cell Width
        this.serializeCellWidth(writer, cellFormat);
        // serialize cell margins
        this.serializeCellMargins(writer, cellFormat);
        if (ensureMerge) {
            //w:hMerge -    Horizontally Merged Cell and w:vMerge -    Vertically Merged Cell
            mVerticalMerge = this.serializeCellMerge(writer, cellFormat, mVerticalMerge);
            //w:gridSpan -   Grid Columns Spanned by Current Table Cell
            this.serializeGridSpan(writer, cell);
        }
        //w:tcBorders -    Table Cell Borders
        writer.writeStartElement(undefined, 'tcBorders', this.wNamespace);
        this.serializeBorders(writer, cellFormat[bordersProperty[this.keywordIndex]], 8, false);
        writer.writeEndElement();
        //w:shd -  Table Cell Shading
        this.serializeShading(writer, cell[cellFormatProperty[this.keywordIndex]][shadingProperty[this.keywordIndex]]);
        // //w:noWrap -   Don't Wrap Cell Content
        // if (cellFormat.HasValue(CellFormat.TextWrapKey)) {
        //     m_writer.WriteStartElement('noWrap', W_namespace);
        //     if (cellFormat.TextWrap)
        //         m_writer.WriteAttributeString('w', 'val', W_namespace, 'false');
        //     m_writer.WriteEndElement();
        // }
        // //w:tcMar -  Single Table Cell Margins
        // if (!cellFormat.SamePaddingsAsTable) {
        //     m_writer.WriteStartElement('tcMar', W_namespace);
        //     SerializePaddings(cellFormat.Paddings);
        //     m_writer.WriteEndElement();
        // }
        //w:textDirection -   Table Cell Text Flow Direction
        this.serializeTableCellDirection(writer, cellFormat);
        // //w:tcFitText -  Fit Text Within Cell
        // if (cellFormat.FitText) {
        //     m_writer.WriteStartElement('tcFitText', W_namespace);
        //     m_writer.WriteEndElement();
        // }
        // //w:hideMark 
        // if (cellFormat.HideMark) {
        //     m_writer.WriteStartElement('hideMark', W_namespace);
        //     m_writer.WriteEndElement();
        // }
        //w:vAlign -  Table Cell Vertical Alignment
        // if (cellFormat.HasValue(CellFormat.VrAlignmentKey))
        this.serializeCellVerticalAlign(writer, cellFormat[verticalAlignmentProperty[this.keywordIndex]]);
        // //w:hideMark -   Ignore End Of Cell Marker In Row Height Calculation
        // SerializeDocxProps(tempDocxProps, 'hideMark');
        // //w:cellIns -    Table Cell Insertion
        // SerializeDocxProps(tempDocxProps, 'cellIns');
        // //w:cellDel -    Table Cell Deletion
        // SerializeDocxProps(tempDocxProps, 'cellDel');
        // //w:cellMerge -   Vertically Merged/Split Table Cells
        // SerializeDocxProps(tempDocxProps, 'cellMerge');
        // if (cellFormat.OldPropertiesHash.length > 0 && !m_isAlternativeCellFormat) {
        //     m_isAlternativeCellFormat = true;
        //     SerializeTrackChangeProps('tcPrChange', cellFormat.FormatChangeAuthorName, cellFormat.FormatChangeDateTime);
        //     Dictionary < int, object > oldPropertyHash = new Dictionary<int, object>(cellFormat.OldPropertiesHash);
        //     Dictionary < int, object > propertyHash = new Dictionary<int, object>(cellFormat.PropertiesHash);
        //     cellFormat.PropertiesHash.Clear();
        //     cellFormat.OldPropertiesHash.Clear();
        //     foreach(KeyValuePair < int, object > keyValue in oldPropertyHash)
        //     cellFormat.PropertiesHash[keyValue.Key] = keyValue.Value;
        //     SerializeCellFormat(cellFormat);
        //     cellFormat.PropertiesHash.Clear();
        //     foreach(KeyValuePair < int, object > keyValue in propertyHash)
        //     cellFormat.PropertiesHash[keyValue.Key] = keyValue.Value;
        //     foreach(KeyValuePair < int, object > keyValue in oldPropertyHash)
        //     cellFormat.OldPropertiesHash[keyValue.Key] = keyValue.Value;
        //     m_writer.WriteEndElement();
        //     m_isAlternativeCellFormat = false;
        // }
        if (endProperties) {
            writer.writeEndElement();
        }
        return mVerticalMerge;
    };
    // Serialize the cell width
    WordExport.prototype.serializeCellWidth = function (writer, cf) {
        writer.writeStartElement(undefined, 'tcW', this.wNamespace);
        if (cf[preferredWidthTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'Percent')) {
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'pct');
            writer.writeAttributeString(undefined, 'w', this.wNamespace, this.roundToTwoDecimal(cf[preferredWidthProperty[this.keywordIndex]] * this.percentageFactor).toString());
        }
        else if (cf[preferredWidthTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Auto')) {
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'auto');
            writer.writeAttributeString(undefined, 'w', this.wNamespace, '0');
        }
        else {
            writer.writeAttributeString(undefined, 'w', this.wNamespace, this.roundToTwoDecimal(cf[preferredWidthProperty[this.keywordIndex]] * this.twipsInOnePoint).toString());
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
        }
        writer.writeEndElement();
    };
    // Serialize cell merge
    WordExport.prototype.serializeCellMerge = function (writer, cellFormat, mVerticalMerge) {
        var cell = this.blockOwner;
        var isserialized = false;
        var collKey;
        var currentIndex = cell[columnIndexProperty[this.keywordIndex]];
        var cellIndex = this.row[cellsProperty[this.keywordIndex]].indexOf(cell);
        var prevIndex = cellIndex > 0 ? this.row[cellsProperty[this.keywordIndex]][cellIndex - 1][columnIndexProperty[this.keywordIndex]] : cell[columnIndexProperty[this.keywordIndex]];
        if (cell[columnIndexProperty[this.keywordIndex]] === cellIndex) {
            collKey = cell[columnIndexProperty[this.keywordIndex]];
            isserialized = true;
        }
        else {
            isserialized = false;
        }
        if (!isserialized) {
            if (cellIndex === 0) {
                currentIndex = cell[columnIndexProperty[this.keywordIndex]];
                prevIndex = -1;
            }
            for (var i = prevIndex; i < currentIndex; i++) {
                collKey = prevIndex + 1;
                prevIndex += 1;
                if (collKey === 0 && mVerticalMerge.containsKey(collKey)) {
                    mVerticalMerge = this.createMerge(writer, collKey, cell, mVerticalMerge);
                }
            }
        }
        if (cellFormat[rowSpanProperty[this.keywordIndex]] > 1) {
            writer.writeStartElement(undefined, 'vMerge', this.wNamespace);
            this.spanCellFormat = cellFormat;
            mVerticalMerge.add(collKey, cellFormat[rowSpanProperty[this.keywordIndex]] - 1);
            if (cellFormat[columnSpanProperty[this.keywordIndex]] > 1) {
                this.mGridSpans.add(collKey, cellFormat[columnSpanProperty[this.keywordIndex]]);
            }
            writer.writeAttributeString('w', 'val', this.wNamespace, 'restart');
            writer.writeEndElement();
        }
        else if (mVerticalMerge.containsKey(collKey) && isserialized) {
            mVerticalMerge = this.createMerge(writer, collKey, cell, mVerticalMerge);
        }
        return mVerticalMerge;
    };
    WordExport.prototype.createMerge = function (writer, collKey, cell, mVerticalMerge) {
        this.serializeColumnSpan(collKey, writer);
        writer.writeStartElement(undefined, 'vMerge', this.wNamespace);
        writer.writeAttributeString('w', 'val', this.wNamespace, 'continue');
        writer.writeEndElement();
        writer.writeStartElement(undefined, 'tcBorders', this.wNamespace);
        this.serializeBorders(writer, cell[cellFormatProperty[this.keywordIndex]][bordersProperty[this.keywordIndex]], 8, false);
        writer.writeEndElement();
        writer.writeEndElement(); //end tcPr
        writer.writeStartElement('w', 'p', this.wNamespace);
        writer.writeEndElement();
        writer.writeEndElement(); //end tc
        writer.writeStartElement(undefined, 'tc', this.wNamespace);
        writer.writeStartElement(undefined, 'tcPr', this.wNamespace);
        this.serializeCellWidth(writer, cell[cellFormatProperty[this.keywordIndex]]);
        mVerticalMerge = this.checkMergeCell(collKey, mVerticalMerge);
        return mVerticalMerge;
    };
    WordExport.prototype.serializeColumnSpan = function (collKey, writer) {
        if (this.mGridSpans.keys.length > 0 && this.mGridSpans.containsKey(collKey)) {
            writer.writeStartElement(undefined, 'gridSpan', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, this.mGridSpans.get(collKey).toString());
            writer.writeEndElement();
        }
    };
    WordExport.prototype.checkMergeCell = function (collKey, mVerticalMerge) {
        if ((mVerticalMerge.get(collKey) - 1) === 0) {
            mVerticalMerge.remove(collKey);
            this.spanCellFormat = undefined;
            if (this.mGridSpans.keys.length > 0 && this.mGridSpans.containsKey(collKey)) {
                this.mGridSpans.remove(collKey);
            }
        }
        else {
            mVerticalMerge.set(collKey, mVerticalMerge.get(collKey) - 1);
        }
        return mVerticalMerge;
    };
    // Serialize the grid span element of cell.
    WordExport.prototype.serializeGridSpan = function (writer, cell) {
        // int gridSpan = cell.cellFormat.GridSpan;
        if (cell[cellFormatProperty[this.keywordIndex]][columnSpanProperty[this.keywordIndex]] > 1) {
            var num = cell[cellFormatProperty[this.keywordIndex]][columnSpanProperty[this.keywordIndex]];
            writer.writeStartElement(undefined, 'gridSpan', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, num.toString());
            writer.writeEndElement();
        }
    };
    // Serialize the table cell direction
    WordExport.prototype.serializeTableCellDirection = function (writer, cellFormat) {
        // if (cellFormat..textDirection !== TextDirection.Horizontal)
        // {
        //     m_writer.WriteStartElement('textDirection', W_namespace);
        //     switch (cellFormat.TextDirection)
        //     {
        //         case TextDirection.Horizontal:
        //             m_writer.WriteAttributeString('w', 'val', W_namespace, 'lrTb');
        //             break;
        //         case TextDirection.VerticalBottomToTop:
        //             m_writer.WriteAttributeString('w', 'val', W_namespace, 'btLr');
        //             break;
        //         case TextDirection.VerticalTopToBottom:
        //             m_writer.WriteAttributeString('w', 'val', W_namespace, 'tbRl');
        //             break;
        //         case TextDirection.HorizontalFarEast:
        //             m_writer.WriteAttributeString('w', 'val', W_namespace, 'lrTbV');
        //             break;
        //         case TextDirection.Vertical:
        //             m_writer.WriteAttributeString('w', 'val', W_namespace, 'tbLrV');
        //             break;
        //         case TextDirection.VerticalFarEast:
        //             m_writer.WriteAttributeString('w', 'val', W_namespace, 'tbRlV');
        //             break;
        //     }
        //     m_writer.WriteEndElement();
        // }
    };
    // Serialize the cell vertical alignment
    WordExport.prototype.serializeCellVerticalAlign = function (writer, alignment) {
        writer.writeStartElement(undefined, 'vAlign', this.wNamespace);
        switch (alignment) {
            case 'Center':
            case 1:
                writer.writeAttributeString('w', 'val', this.wNamespace, 'center');
                break;
            case 'Bottom':
            case 2:
                writer.writeAttributeString('w', 'val', this.wNamespace, 'bottom');
                break;
            default:
                writer.writeAttributeString('w', 'val', this.wNamespace, 'top');
                break;
        }
        writer.writeEndElement();
    };
    // Serialize the table grid columns.
    WordExport.prototype.serializeGridColumns = function (writer, grid) {
        for (var i = 0, count = grid.length; i < count; i++) {
            var gridValue = Math.round(grid[i] * 20);
            writer.writeStartElement(undefined, 'gridCol', this.wNamespace);
            writer.writeAttributeString(undefined, 'w', this.wNamespace, gridValue.toString());
            writer.writeEndElement();
        }
    };
    // Serialize the row formattings.
    // Table parameter is passed for serializing table format and undefined for serializing row format.
    WordExport.prototype.serializeTableFormat = function (writer, format, table) {
        // if (!isNullOrUndefined(table))
        // {
        //     List<Stream> tempDocxProps = new List<Stream>();
        //     for (int i = 0, cnt = table.DocxTableFormat.NodeArray.length; i < cnt; i++)
        //         tempDocxProps.Add(table.DocxTableFormat.NodeArray[i]);
        writer.writeStartElement(undefined, 'tblPr', this.wNamespace);
        //     SerializeTableStlye(format);
        //     if (format.WrapTextAround &&!((table.OwnerTextBody.Owner is WTextBox) || 
        //(table.OwnerTextBody.Owner is WComment) || (table.OwnerTextBody.Owner is WFootnote)))
        //     {
        //         SerializeTablePositioning(format.Positioning);
        //         if (!format.Positioning.AllowOverlap)
        //         {
        //             m_writer.WriteStartElement('tblOverlap', W_namespace);
        //             m_writer.WriteAttributeString('val', W_namespace, 'never');
        //             m_writer.WriteEndElement();
        //         }
        //     }
        //     SerializeDocxProps(tempDocxProps, 'tblStyleRowBandSize');
        //     SerializeDocxProps(tempDocxProps, 'tblStyleColBandSize');  
        if (!isNullOrUndefined(table[tableFormatProperty[this.keywordIndex]][styleNameProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, "tblStyle", this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, table[tableFormatProperty[this.keywordIndex]][styleNameProperty[this.keywordIndex]]);
            writer.writeEndElement();
        }
        this.serializeTablePositioning(writer, table);
        this.serializeTableWidth(writer, table);
        this.serializeTableAlignment(writer, table[tableFormatProperty[this.keywordIndex]]);
        this.serializeCellSpacing(writer, table[tableFormatProperty[this.keywordIndex]]);
        this.serializeTableIndentation(writer, table[tableFormatProperty[this.keywordIndex]]);
        this.serializeTableMargins(writer, table[tableFormatProperty[this.keywordIndex]]);
        this.serializeTableBorders(writer, table[tableFormatProperty[this.keywordIndex]]);
        this.serializeShading(writer, table[tableFormatProperty[this.keywordIndex]][shadingProperty[this.keywordIndex]]);
        if (HelperMethods.parseBoolValue(table[tableFormatProperty[this.keywordIndex]][bidiProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'bidiVisual', this.wNamespace);
            writer.writeEndElement();
        }
        this.serializeTblLayout(writer, table[tableFormatProperty[this.keywordIndex]]);
        // this.serializeTableCellMargin(writer, table.tableFormat);
        //     SerializeTableLook(table);
        //         if (!isNullOrUndefined(table.Title))
        //             SerializeTableTitle(table);
        //         if (!isNullOrUndefined(table.Description))
        //             SerializeTableDescription(table);
        // }
        // else
        // {
        //     SerializeCellSpacing(format);
        //     SerializeTableIndentation(format);
        //     SerializeTableBorders(format);
        //     SerializeTableShading(format);
        //     SerializeTblLayout(format);
        //     SerializeTableCellMargin(format);
        // }
        // if (!isNullOrUndefined(format.OwnerBase) && format.OwnerBase is WTable
        //   && format.OldPropertiesHash.length > 0 && !m_isAlternativeTableFormat)
        // {
        //     m_isAlternativeTableFormat = true;
        //     SerializeTrackChangeProps('tblPrChange', format.FormatChangeAuthorName, format.FormatChangeDateTime);
        //     SerializeTableTrackChanges(format, format.OwnerBase as WTable);
        //     m_writer.WriteEndElement();
        //     m_isAlternativeTableFormat = false;
        // }
        // if (!isNullOrUndefined(format.OwnerRow) && format.OldPropertiesHash.length > 0)
        // {
        //     SerializeTrackChangeProps('tblPrExChange', format.FormatChangeAuthorName, format.FormatChangeDateTime);
        //     SerializeTableTrackChanges(format, undefined);
        //     m_writer.WriteEndElement();
        // }
        // SerializeTblTrackChanges(format);
        if (!isNullOrUndefined(table)) {
            writer.writeEndElement(); //end of tblPr
        }
    };
    // Serialize the table position
    WordExport.prototype.serializeTablePositioning = function (writer, table) {
        if (HelperMethods.parseBoolValue(table[wrapTextAroundProperty[this.keywordIndex]])) {
            writer.writeStartElement('w', 'tblpPr', this.wNamespace);
            if (table[positioningProperty[this.keywordIndex]][distanceLeftProperty[this.keywordIndex]] > 0) {
                var left = Math.round(table[positioningProperty[this.keywordIndex]][distanceLeftProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                writer.writeAttributeString('w', 'leftFromText', this.wNamespace, left);
            }
            if (table[positioningProperty[this.keywordIndex]][distanceRightProperty[this.keywordIndex]] > 0) {
                var right = Math.round(table[positioningProperty[this.keywordIndex]][distanceRightProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                writer.writeAttributeString('w', 'rightFromText', this.wNamespace, right);
            }
            if (table[positioningProperty[this.keywordIndex]][distanceTopProperty[this.keywordIndex]] > 0) {
                var top_1 = Math.round(table[positioningProperty[this.keywordIndex]][distanceTopProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                writer.writeAttributeString('w', 'topFromText', this.wNamespace, top_1);
            }
            if (table[positioningProperty[this.keywordIndex]][distanceBottomProperty[this.keywordIndex]] > 0) {
                var bottom = Math.round(table[positioningProperty[this.keywordIndex]][distanceBottomProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                writer.writeAttributeString('w', 'bottomFromText', this.wNamespace, bottom);
            }
            if (!isNullOrUndefined(table[positioningProperty[this.keywordIndex]][verticalOriginProperty[this.keywordIndex]])) {
                var verticalOrigin = table[positioningProperty[this.keywordIndex]][verticalOriginProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Paragraph') ? 'text' : this.keywordIndex == 1 ? this.getTableVerticalRelation(table[positioningProperty[this.keywordIndex]][verticalOriginProperty[this.keywordIndex]]).toLowerCase() : this.getTableVerticalRelation(this.getTableVerticalRelationEnumValue(table[positioningProperty[this.keywordIndex]][verticalOriginProperty[this.keywordIndex]])).toLowerCase();
                writer.writeAttributeString('w', 'vertAnchor', this.wNamespace, verticalOrigin);
            }
            if (!isNullOrUndefined(table[positioningProperty[this.keywordIndex]][horizontalOriginProperty[this.keywordIndex]]) && table[positioningProperty[this.keywordIndex]][horizontalOriginProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'Column')) {
                var horizontalOrigin = this.keywordIndex == 1 ? this.getTableHorizontalRelation(table[positioningProperty[this.keywordIndex]][horizontalOriginProperty[this.keywordIndex]]).toLowerCase() : table[positioningProperty[this.keywordIndex]][horizontalOriginProperty[this.keywordIndex]].toLowerCase();
                writer.writeAttributeString('w', 'horzAnchor', this.wNamespace, horizontalOrigin);
            }
            if (!isNullOrUndefined(table[positioningProperty[this.keywordIndex]][horizontalAlignmentProperty[this.keywordIndex]]) && table[positioningProperty[this.keywordIndex]][horizontalAlignmentProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'Left')) {
                var horizontalAlignment = this.keywordIndex == 1 ? this.getTableHorizontalAlignment(table[positioningProperty[this.keywordIndex]][horizontalAlignmentProperty[this.keywordIndex]]) : table[positioningProperty[this.keywordIndex]][horizontalAlignmentProperty[this.keywordIndex]].toLowerCase();
                writer.writeAttributeString('w', 'tblpXSpec', this.wNamespace, horizontalAlignment);
            }
            if (!isNullOrUndefined(table[positioningProperty[this.keywordIndex]][verticalAlignmentProperty[this.keywordIndex]]) && table[positioningProperty[this.keywordIndex]][verticalAlignmentProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'None')) {
                var verticalAlignment = this.keywordIndex == 1 ? this.getTableVerticalAlignment(table[positioningProperty[this.keywordIndex]][verticalAlignmentProperty[this.keywordIndex]]) : table[positioningProperty[this.keywordIndex]][verticalAlignmentProperty[this.keywordIndex]].toLowerCase();
                writer.writeAttributeString('w', 'tblpYSpec', this.wNamespace, verticalAlignment);
            }
            if (((!isNullOrUndefined(table[positioningProperty[this.keywordIndex]][horizontalAlignmentProperty[this.keywordIndex]]) && table[positioningProperty[this.keywordIndex]][horizontalAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Left'))
                || !table[positioningProperty[this.keywordIndex]][horizontalAlignmentProperty[this.keywordIndex]])
                && table[positioningProperty[this.keywordIndex]][horizontalPositionProperty[this.keywordIndex]] > 0) {
                var horizontalPosition = Math.round(table[positioningProperty[this.keywordIndex]][horizontalPositionProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                writer.writeAttributeString('w', 'tblpX', this.wNamespace, horizontalPosition);
            }
            if (!isNullOrUndefined(table[positioningProperty[this.keywordIndex]][verticalAlignmentProperty[this.keywordIndex]]) && table[positioningProperty[this.keywordIndex]][verticalAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'None')) {
                var verticalPosition = Math.round(table[positioningProperty[this.keywordIndex]][verticalPositionProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                writer.writeAttributeString('w', 'tblpY', this.wNamespace, verticalPosition);
            }
            writer.writeEndElement();
            if (!HelperMethods.parseBoolValue(table[positioningProperty[this.keywordIndex]][allowOverlapProperty[this.keywordIndex]])) {
                writer.writeStartElement('w', 'tblOverlap', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, 'never');
                writer.writeEndElement();
            }
        }
        if (!isNullOrUndefined(table[descriptionProperty[this.keywordIndex]])) {
            writer.writeStartElement('w', 'tblDescription', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, table[descriptionProperty[this.keywordIndex]]);
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(table[titleProperty[this.keywordIndex]])) {
            writer.writeStartElement('w', 'tblCaption', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, table[titleProperty[this.keywordIndex]]);
            writer.writeEndElement();
        }
    };
    // serialize the table margin
    WordExport.prototype.serializeTableMargins = function (writer, format) {
        this.serializeMargins(writer, format, 'tblCellMar');
    };
    // serialize the row margin
    WordExport.prototype.serializeRowMargins = function (writer, format) {
        writer.writeStartElement(undefined, 'tblPrEx', this.wNamespace);
        // serialize the row borders
        writer.writeStartElement(undefined, 'tblBorders', this.wNamespace);
        this.serializeBorders(writer, format[bordersProperty[this.keywordIndex]], 8, false);
        writer.writeEndElement();
        this.serializeMargins(writer, format, 'tblCellMar');
        writer.writeEndElement();
    };
    // serialize the cell margins
    WordExport.prototype.serializeCellMargins = function (writer, format) {
        this.serializeMargins(writer, format, 'tcMar');
    };
    // serialize the table margins, row margins, cell margins
    WordExport.prototype.serializeMargins = function (writer, format, tag) {
        if (format[topMarginProperty[this.keywordIndex]] === undefined && format[leftMarginProperty[this.keywordIndex]] === undefined &&
            format[bottomMarginProperty[this.keywordIndex]] === undefined && format[rightMarginProperty[this.keywordIndex]] === undefined) {
            return;
        }
        writer.writeStartElement(undefined, tag, this.wNamespace);
        if (!isNullOrUndefined(format[topMarginProperty[this.keywordIndex]])) {
            var topMargin = Math.round(format[topMarginProperty[this.keywordIndex]] * 20);
            writer.writeStartElement(undefined, 'top', this.wNamespace);
            writer.writeAttributeString(undefined, 'w', this.wNamespace, topMargin.toString());
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(format[leftMarginProperty[this.keywordIndex]])) {
            var leftMargin = Math.round(format[leftMarginProperty[this.keywordIndex]] * 20);
            writer.writeStartElement(undefined, 'left', this.wNamespace);
            writer.writeAttributeString(undefined, 'w', this.wNamespace, leftMargin.toString());
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(format[bottomMarginProperty[this.keywordIndex]])) {
            var bottomMargin = Math.round(format[bottomMarginProperty[this.keywordIndex]] * 20);
            writer.writeStartElement(undefined, 'bottom', this.wNamespace);
            writer.writeAttributeString(undefined, 'w', this.wNamespace, bottomMargin.toString());
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(format[rightMarginProperty[this.keywordIndex]])) {
            var rightMargin = Math.round(format[rightMarginProperty[this.keywordIndex]] * 20);
            writer.writeStartElement(undefined, 'right', this.wNamespace);
            writer.writeAttributeString(undefined, 'w', this.wNamespace, rightMargin.toString());
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
            writer.writeEndElement();
        }
        writer.writeEndElement();
    };
    // Serialize the table borders
    WordExport.prototype.serializeShading = function (writer, format) {
        // if (format.textureStyle !== 'TextureNone') {
        writer.writeStartElement(undefined, 'shd', this.wNamespace);
        if (format[backgroundColorProperty[this.keywordIndex]] && format[backgroundColorProperty[this.keywordIndex]] !== 'empty') {
            writer.writeAttributeString(undefined, 'fill', this.wNamespace, this.getColor(format[backgroundColorProperty[this.keywordIndex]]));
        }
        else {
            writer.writeAttributeString(undefined, 'fill', this.wNamespace, 'auto');
        }
        if (format[foregroundColorProperty[this.keywordIndex]] === 'empty' || isNullOrUndefined(format[foregroundColorProperty[this.keywordIndex]])) {
            writer.writeAttributeString(undefined, 'color', this.wNamespace, 'auto');
        }
        else {
            writer.writeAttributeString(undefined, 'color', this.wNamespace, this.getColor(format[foregroundColorProperty[this.keywordIndex]]));
        }
        if (!isNullOrUndefined(format[textureProperty[this.keywordIndex]])) {
            writer.writeAttributeString('w', 'val', this.wNamespace, this.getTextureStyle(format[textureProperty[this.keywordIndex]]));
        }
        writer.writeEndElement();
        // }
    };
    WordExport.prototype.getTextureStyle = function (textureStyle) {
        switch (textureStyle) {
            case 'Texture5Percent':
            case 'Texture2Pt5Percent':
            case 'Texture7Pt5Percent':
            case 1:
            case 2:
            case 3:
                return 'pct5';
            case 'Texture10Percent':
            case 4:
                return 'pct10';
            case 'Texture12Pt5Percent':
            case 5:
                return 'pct12';
            case 'Texture15Percent':
            case 'Texture17Pt5Percent':
            case 6:
            case 7:
                return 'pct15';
            case 'Texture20Percent':
            case 'Texture22Pt5Percent':
            case 8:
            case 9:
                return 'pct20';
            case 'Texture25Percent':
            case 'Texture27Pt5Percent':
            case 10:
            case 11:
                return 'pct25';
            case 'Texture30Percent':
            case 'Texture32Pt5Percent':
            case 12:
            case 13:
                return 'pct30';
            case 'Texture35Percent':
            case 14:
                return 'pct35';
            case 'Texture37Pt5Percent':
            case 15:
                return 'pct37';
            case 'Texture40Percent':
            case 'Texture42Pt5Percent':
            case 16:
            case 17:
                return 'pct40';
            case 'Texture45Percent':
            case 'Texture47Pt5Percent':
            case 18:
            case 19:
                return 'pct45';
            case 'Texture50Percent':
            case 'Texture52Pt5Percent':
            case 20:
            case 21:
                return 'pct50';
            case 'Texture55Percent':
            case 'Texture57Pt5Percent':
            case 22:
            case 23:
                return 'pct55';
            case 'Texture60Percent':
            case 24:
                return 'pct60';
            case 'Texture62Pt5Percent':
            case 25:
                return 'pct62';
            case 'Texture65Percent':
            case 'Texture67Pt5Percent':
            case 26:
            case 27:
                return 'pct65';
            case 'Texture70Percent':
            case 'Texture72Pt5Percent':
            case 28:
            case 29:
                return 'pct70';
            case 'Texture75Percent':
            case 'Texture77Pt5Percent':
            case 30:
            case 31:
                return 'pct75';
            case 'Texture80Percent':
            case 'Texture82Pt5Percent':
            case 32:
            case 33:
                return 'pct80';
            case 'Texture85Percent':
            case 34:
                return 'pct85';
            case 'Texture87Pt5Percent':
            case 35:
                return 'pct87';
            case 'Texture90Percent':
            case 'Texture92Pt5Percent':
            case 36:
            case 37:
                return 'pct90';
            case 'Texture95Percent':
            case 'Texture97Pt5Percent':
            case 38:
            case 39:
                return 'pct95';
            case 40:
                return 'solid';
            case 'TextureCross':
                return 'thinHorzCross';
            case 'TextureDarkCross':
                return 'horzCross';
            case 'TextureDarkDiagonalCross':
                return 'diagCross';
            case 'TextureDarkDiagonalDown':
                return 'reverseDiagStripe';
            case 'TextureDarkDiagonalUp':
                return 'diagStripe';
            case 'TextureDarkHorizontal':
            case 41:
                return 'horzStripe';
            case 'TextureDarkVertical':
            case 42:
                return 'vertStripe';
            case 43:
                return 'reverseDiagStripe';
            case 44:
                return 'diagStripe';
            case 45:
                return 'horzCross';
            case 46:
                return 'diagCross';
            case 'TextureDiagonalCross':
                return 'thinDiagCross';
            case 'TextureDiagonalDown':
                return 'thinReverseDiagStripe';
            case 'TextureDiagonalUp':
                return 'thinDiagStripe';
            case 'TextureHorizontal':
            case 47:
                return 'thinHorzStripe';
            case 'TextureSolid':
                return 'solid';
            case 'TextureVertical':
            case 48:
                return 'thinVertStripe';
            case 49:
                return 'thinReverseDiagStripe';
            case 50:
                return 'thinDiagStripe';
            case 51:
                return 'thinHorzCross';
            case 52:
                return 'thinDiagCross';
            default:
                return 'clear';
        }
    };
    //serialize the paragraph border
    WordExport.prototype.serializeParagraphBorders = function (writer, formatPara) {
        var borders = formatPara[bordersProperty[this.keywordIndex]];
        if (isNullOrUndefined(borders)) {
            return;
        }
        writer.writeStartElement(undefined, 'pBdr', this.wNamespace);
        this.serializeBorders(writer, formatPara[bordersProperty[this.keywordIndex]], 8, true);
        writer.writeEndElement();
    };
    // Serialize the table borders
    WordExport.prototype.serializeTableBorders = function (writer, format) {
        var borders = format[bordersProperty[this.keywordIndex]];
        if (isNullOrUndefined(borders)) {
            return;
        }
        writer.writeStartElement(undefined, 'tblBorders', this.wNamespace);
        this.serializeBorders(writer, format[bordersProperty[this.keywordIndex]], 8, false);
        writer.writeEndElement();
    };
    // Serialize the borders.
    WordExport.prototype.serializeBorders = function (writer, borders, multipler, isParagraphBorder) {
        this.serializeBorder(writer, borders[topProperty[this.keywordIndex]], 'top', multipler);
        this.serializeBorder(writer, borders[leftProperty[this.keywordIndex]], 'left', multipler);
        this.serializeBorder(writer, borders[bottomProperty[this.keywordIndex]], 'bottom', multipler);
        this.serializeBorder(writer, borders[rightProperty[this.keywordIndex]], 'right', multipler);
        if (isParagraphBorder) {
            this.serializeBorder(writer, borders[horizontalProperty[this.keywordIndex]], 'between', multipler);
            this.serializeBorder(writer, borders[verticalProperty[this.keywordIndex]], 'bar', multipler);
        }
        else {
            this.serializeBorder(writer, borders[horizontalProperty[this.keywordIndex]], 'insideH', multipler);
            this.serializeBorder(writer, borders[verticalProperty[this.keywordIndex]], 'insideV', multipler);
            this.serializeBorder(writer, borders[diagonalDownProperty[this.keywordIndex]], 'tl2br', multipler);
            this.serializeBorder(writer, borders[diagonalUpProperty[this.keywordIndex]], 'tr2bl', multipler);
        }
    };
    // Serialize the table layout element
    WordExport.prototype.serializeTblLayout = function (writer, format) {
        if (!HelperMethods.parseBoolValue(format[allowAutoFitProperty[this.keywordIndex]]) || format[preferredWidthProperty[this.keywordIndex]] > this.containerWidth) {
            writer.writeStartElement(undefined, 'tblLayout', this.wNamespace);
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'fixed');
            writer.writeEndElement();
        }
    };
    // Serializes the Border
    WordExport.prototype.serializeBorder = function (writer, border, tagName, multiplier) {
        var borderStyle = border[lineStyleProperty[this.keywordIndex]];
        var sz = ((border[lineWidthProperty[this.keywordIndex]] ? border[lineWidthProperty[this.keywordIndex]] : 0) * multiplier);
        var space = border[spaceProperty[this.keywordIndex]] ? border[spaceProperty[this.keywordIndex]] : 0;
        if (borderStyle === (this.keywordIndex == 1 ? 26 : 'Cleared')) {
            writer.writeStartElement(undefined, tagName, this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, 'nil');
            writer.writeEndElement();
            return;
        }
        else if (((borderStyle === (this.keywordIndex == 1 ? 1 : 'None') || isNullOrUndefined(borderStyle)) && !HelperMethods.parseBoolValue(border[hasNoneStyleProperty[this.keywordIndex]])) || (sz < 0 && !HelperMethods.parseBoolValue(border[hasNoneStyleProperty[this.keywordIndex]]))) {
            return;
        }
        writer.writeStartElement(undefined, tagName, this.wNamespace);
        writer.writeAttributeString('w', 'val', this.wNamespace, this.getBorderStyle(borderStyle));
        // if (border.color === '#000000')
        // {
        //     writer.writeAttributeString(undefined, 'color', this.wNamespace, 'auto');
        // }
        // else
        // {
        if (border[colorProperty[this.keywordIndex]]) {
            writer.writeAttributeString(undefined, 'color', this.wNamespace, this.getColor(border[colorProperty[this.keywordIndex]]));
        }
        // }
        writer.writeAttributeString(undefined, 'sz', this.wNamespace, this.roundToTwoDecimal(sz).toString());
        writer.writeAttributeString(undefined, 'space', this.wNamespace, space.toString());
        if (HelperMethods.parseBoolValue(border[shadowProperty[this.keywordIndex]])) {
            writer.writeAttributeString(undefined, 'shadow', this.wNamespace, 'on');
        }
        writer.writeEndElement();
    };
    // Get the border style as string
    WordExport.prototype.getBorderStyle = function (borderStyle) {
        switch (borderStyle) {
            case 'Cleared':
                return 'cleared';
            case 'None':
            case 1:
                return 'none';
            case 'DashSmallGap':
                return 'dashSmallGap';
            case 'Triple':
                return 'triple';
            case 'Dot':
            case 2:
                return 'dotted';
            case 3:
                return 'dashSmallGap';
            case 'DashDot':
                return 'dotDash';
            case 'DashLargeGap':
            case 4:
                return 'dashed';
            case 5:
                return 'dotDash';
            case 'DashDotDot':
            case 6:
                return 'dotDotDash';
            case 'Double':
            case 7:
                return 'double';
            case 8:
                return 'triple';
            case 'ThinThickSmallGap':
            case 9:
                return 'thinThickSmallGap';
            case 'ThickThinSmallGap':
            case 10:
                return 'thickThinSmallGap';
            case 'ThinThickThinSmallGap':
            case 11:
                return 'thinThickThinSmallGap';
            case 'ThickThinMediumGap':
            case 12:
                return 'thickThinMediumGap';
            case 'ThinThickMediumGap':
            case 13:
                return 'thinThickMediumGap';
            case 'ThinThickThinMediumGap':
            case 14:
                return 'thinThickThinMediumGap';
            case 'ThickThinLargeGap':
                return 'thickThinLargeGap';
            case 'ThinThickLargeGap':
            case 15:
                return 'thinThickLargeGap';
            case 16:
                return 'thickThinLargeGap';
            case 'ThinThickThinLargeGap':
            case 17:
                return 'thinThickThinLargeGap';
            case 'Thick':
                return 'thick';
            case 'SingleWavy':
            case 18:
                return 'wave';
            case 'DoubleWavy':
            case 19:
                return 'doubleWave';
            case 'DashDotStroked':
            case 20:
                return 'dashDotStroked';
            case 'Engrave3D':
                return 'threeDEngrave';
            case 'Emboss3D':
            case 21:
                return 'threeDEmboss';
            case 22:
                return 'threeDEngrave';
            case 'Outset':
            case 23:
                return 'outset';
            case 'Inset':
            case 24:
                return 'inset';
            case 25:
                return 'thick';
            case 26:
                return 'cleared';
            // case 'None':
            //     return 'none';
            default:
                return 'single';
        }
    };
    // Serialize the table indentation.
    WordExport.prototype.serializeTableIndentation = function (writer, format) {
        if (!isNullOrUndefined(format[leftIndentProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'tblInd', this.wNamespace);
            var tableIndent = Math.round(format[leftIndentProperty[this.keywordIndex]] * this.twipsInOnePoint);
            writer.writeAttributeString(undefined, 'w', this.wNamespace, tableIndent.toString());
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
            writer.writeEndElement();
        }
    };
    // Serialize the cell spacing.
    WordExport.prototype.serializeCellSpacing = function (writer, format) {
        if (!isNullOrUndefined(format[cellSpacingProperty[this.keywordIndex]]) && format[cellSpacingProperty[this.keywordIndex]] > 0) {
            writer.writeStartElement(undefined, 'tblCellSpacing', this.wNamespace);
            writer.writeAttributeString(undefined, 'w', this.wNamespace, this.roundToTwoDecimal((format[cellSpacingProperty[this.keywordIndex]] / 2) * this.twentiethOfPoint).toString());
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
            writer.writeEndElement();
        }
    };
    // Serialize the table width
    WordExport.prototype.serializeTableWidth = function (writer, table) {
        writer.writeStartElement(undefined, 'tblW', this.wNamespace);
        if (table[tableFormatProperty[this.keywordIndex]][preferredWidthTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'Percent')) {
            var tableWidth = Math.round(table[tableFormatProperty[this.keywordIndex]][preferredWidthProperty[this.keywordIndex]] * this.percentageFactor);
            writer.writeAttributeString(undefined, 'w', this.wNamespace, tableWidth.toString());
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'pct');
        }
        else if (table[tableFormatProperty[this.keywordIndex]][preferredWidthTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 2 : 'Point')) {
            var tableWidth = Math.round(table[tableFormatProperty[this.keywordIndex]][preferredWidthProperty[this.keywordIndex]] * this.twipsInOnePoint);
            writer.writeAttributeString(undefined, 'w', this.wNamespace, tableWidth.toString());
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
        }
        else {
            writer.writeAttributeString(undefined, 'w', this.wNamespace, '0');
            writer.writeAttributeString(undefined, 'type', this.wNamespace, 'auto');
        }
        writer.writeEndElement();
    };
    // Serialize the table alignment
    WordExport.prototype.serializeTableAlignment = function (writer, format) {
        writer.writeStartElement(undefined, 'jc', this.wNamespace);
        switch (format[tableAlignmentProperty[this.keywordIndex]]) {
            case 'Right':
                writer.writeAttributeString('w', 'val', this.wNamespace, 'right');
                break;
            case 'Center':
            case 1:
                writer.writeAttributeString('w', 'val', this.wNamespace, 'center');
                break;
            case 2:
                writer.writeAttributeString('w', 'val', this.wNamespace, 'right');
                break;
            default:
                writer.writeAttributeString('w', 'val', this.wNamespace, 'left');
                break;
        }
        writer.writeEndElement();
    };
    // Serialize the field
    WordExport.prototype.serializeFieldCharacter = function (writer, field) {
        writer.writeStartElement(undefined, 'r', this.wNamespace);
        this.serializeCharacterFormat(writer, field[characterFormatProperty[this.keywordIndex]]);
        writer.writeStartElement(undefined, 'fldChar', this.wNamespace);
        var type = field[fieldTypeProperty[this.keywordIndex]] === 0 ? 'begin'
            : field[fieldTypeProperty[this.keywordIndex]] === 1 ? 'end' : 'separate';
        writer.writeAttributeString(undefined, 'fldCharType', this.wNamespace, type);
        if (type === 'begin' && !isNullOrUndefined(field[formFieldDataProperty[this.keywordIndex]])) {
            var formFieldData = field[formFieldDataProperty[this.keywordIndex]];
            writer.writeStartElement(undefined, 'ffData', this.wNamespace);
            writer.writeStartElement(undefined, 'name', this.wNamespace);
            writer.writeAttributeString(undefined, 'val', this.wNamespace, formFieldData[nameProperty[this.keywordIndex]]);
            writer.writeEndElement();
            writer.writeStartElement(undefined, 'enabled', this.wNamespace);
            writer.writeEndElement();
            if (formFieldData.hasOwnProperty(textInputProperty[this.keywordIndex])) {
                writer.writeStartElement(undefined, 'textInput', this.wNamespace);
                var type_1 = this.keywordIndex == 1 ? this.getTextFormFieldType(formFieldData[textInputProperty[this.keywordIndex]][typeProperty[this.keywordIndex]]) : formFieldData[textInputProperty[this.keywordIndex]][typeProperty[this.keywordIndex]].toString();
                if (type_1 === 'Number' || 'Date') {
                    writer.writeStartElement(undefined, 'type', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, type_1 == 'Calculation' ? 'calculated' : type_1.toLowerCase());
                    writer.writeEndElement();
                }
                writer.writeStartElement(undefined, 'default', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, formFieldData[textInputProperty[this.keywordIndex]][defaultValueProperty[this.keywordIndex]]);
                writer.writeEndElement();
                writer.writeStartElement(undefined, 'format', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, this.keywordIndex == 1 && type_1 === 'Text' ? this.getTextFormFieldFormat(formFieldData[textInputProperty[this.keywordIndex]][formatProperty[this.keywordIndex]]) : formFieldData[textInputProperty[this.keywordIndex]][formatProperty[this.keywordIndex]]);
                writer.writeEndElement();
                writer.writeEndElement();
            }
            else if (formFieldData.hasOwnProperty(checkBoxProperty[this.keywordIndex])) {
                writer.writeStartElement(undefined, 'checkBox', this.wNamespace);
                if (formFieldData[checkBoxProperty[this.keywordIndex]][sizeTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Auto')) {
                    writer.writeStartElement(undefined, 'sizeAuto', this.wNamespace);
                    writer.writeEndElement();
                }
                else {
                    writer.writeStartElement(undefined, 'size', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, this.roundToTwoDecimal(formFieldData[checkBoxProperty[this.keywordIndex]][sizeProperty[this.keywordIndex]] * 2).toString());
                    writer.writeEndElement();
                }
                writer.writeStartElement(undefined, 'defalut', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, formFieldData[checkBoxProperty[this.keywordIndex]][defaultValueProperty[this.keywordIndex]] ? '1' : '0');
                writer.writeEndElement();
                if (formFieldData[checkBoxProperty[this.keywordIndex]][checkedProperty[this.keywordIndex]]) {
                    writer.writeStartElement(undefined, 'checked', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, formFieldData[checkBoxProperty[this.keywordIndex]][checkedProperty[this.keywordIndex]] ? '1' : '0');
                    writer.writeEndElement();
                }
                writer.writeEndElement();
            }
            else {
                writer.writeStartElement(undefined, 'ddList', this.wNamespace);
                if (formFieldData[dropDownListProperty[this.keywordIndex]][selectedIndexProperty[this.keywordIndex]] !== 0) {
                    writer.writeStartElement(undefined, 'result', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, formFieldData[dropDownListProperty[this.keywordIndex]][selectedIndexProperty[this.keywordIndex]].toString());
                    writer.writeEndElement();
                }
                for (var i = 0; i < formFieldData[dropDownListProperty[this.keywordIndex]][dropDownItemsProperty[this.keywordIndex]].length; i++) {
                    writer.writeStartElement(undefined, 'listEntry', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, formFieldData[dropDownListProperty[this.keywordIndex]][dropDownItemsProperty[this.keywordIndex]][i].toString());
                    writer.writeEndElement();
                }
                writer.writeEndElement();
            }
            writer.writeEndElement();
        }
        writer.writeEndElement();
        writer.writeEndElement();
        if (field[fieldTypeProperty[this.keywordIndex]] === 0 && field[fieldTypeProperty[this.keywordIndex]] === 'FieldFormTextInput') {
            writer.writeStartElement('w', 'r', this.wNamespace);
            writer.writeStartElement(undefined, 'instrText', this.wNamespace);
            writer.writeAttributeString('xml', 'space', this.xmlNamespace, 'preserve');
            writer.writeString('FORMTEXT');
            writer.writeEndElement();
            writer.writeEndElement();
        }
    };
    // Serialize the text range.
    WordExport.prototype.serializeTextRange = function (writer, span, previousNode, efType) {
        writer.writeStartElement('w', 'r', this.wNamespace);
        if (!isNullOrUndefined(span[characterFormatProperty[this.keywordIndex]])) {
            this.serializeCharacterFormat(writer, span[characterFormatProperty[this.keywordIndex]]);
        }
        if (span[textProperty[this.keywordIndex]] === '\t') {
            writer.writeElementString(undefined, 'tab', this.wNamespace, undefined);
        }
        else if (span[textProperty[this.keywordIndex]] === '\v') {
            writer.writeElementString(undefined, 'br', this.wNamespace, undefined);
        }
        else if (!isNullOrUndefined(span[breakClearTypeProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'br', this.wNamespace);
            writer.writeAttributeString('w', 'type', this.wNamespace, "textWrapping");
            writer.writeAttributeString('w', 'clear', this.wNamespace, this.getBreakClearType(span[breakClearTypeProperty[this.keywordIndex]]).toString().toLowerCase());
            writer.writeEndElement();
        }
        else if (span[textProperty[this.keywordIndex]] === '\f') {
            writer.writeStartElement(undefined, 'br', this.wNamespace);
            writer.writeAttributeString('w', 'type', this.wNamespace, 'page');
            writer.writeEndElement();
        }
        else if (span[textProperty[this.keywordIndex]] === '\r') {
            writer.writeStartElement('w', 'cr', this.wNamespace);
            writer.writeEndElement();
        }
        else if (span[textProperty[this.keywordIndex]] === String.fromCharCode(14)) {
            writer.writeStartElement(undefined, 'br', this.wNamespace);
            writer.writeAttributeString('w', 'type', this.wNamespace, 'column');
            writer.writeEndElement();
        }
        else if (encodeURI(span[textProperty[this.keywordIndex]]) === '%02') {
            writer.writeStartElement(undefined, 'footnoteRef', this.wNamespace);
            writer.writeEndElement();
        }
        else if (encodeURI(span[textProperty[this.keywordIndex]]) === '%02' && efType === 'endnote') {
            writer.writeStartElement(undefined, 'endnoteRef', this.wNamespace);
            writer.writeEndElement();
        }
        else if (encodeURI(span[textProperty[this.keywordIndex]]) === '%03') {
            writer.writeStartElement(undefined, 'separator', this.wNamespace);
            writer.writeEndElement();
        }
        else if (encodeURI(span[textProperty[this.keywordIndex]]) === '%04') {
            writer.writeStartElement(undefined, 'continuationSeparator', this.wNamespace);
            writer.writeEndElement();
        }
        else {
            var isDeleteText = this.retrieveDeleteRevision(span);
            var isField = !isNullOrUndefined(previousNode)
                && previousNode.hasOwnProperty(fieldTypeProperty[this.keywordIndex]) && previousNode[fieldTypeProperty[this.keywordIndex]] !== 2;
            var localName = isField ? isDeleteText ? 'delInstrText' : 'instrText' : isDeleteText ? 'delText' : 't';
            writer.writeStartElement(undefined, localName, this.wNamespace);
            writer.writeAttributeString('xml', 'space', this.xmlNamespace, 'preserve');
            writer.writeString(span[textProperty[this.keywordIndex]]);
            writer.writeEndElement();
        }
        writer.writeEndElement();
    };
    WordExport.prototype.retrieveDeleteRevision = function (span) {
        if (span.hasOwnProperty(revisionIdsProperty[this.keywordIndex])) {
            if (span[revisionIdsProperty[this.keywordIndex]].length > 0) {
                for (var i = 0; i < span[revisionIdsProperty[this.keywordIndex]].length; i++) {
                    if (this.retrieveRevision(span[revisionIdsProperty[this.keywordIndex]][i]).revisionType === 'Deletion') {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    // Serializes the paragraph format
    WordExport.prototype.serializeParagraphFormat = function (writer, paragraphFormat, paragraph, keyindex) {
        if (isNullOrUndefined(paragraphFormat)) {
            return;
        }
        if (isNullOrUndefined(this.keywordIndex)) {
            this.keywordIndex = keyindex;
        }
        this.serializeParagraphBorders(writer, paragraphFormat);
        if (!isNullOrUndefined(paragraphFormat[styleNameProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'pStyle', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, paragraphFormat[styleNameProperty[this.keywordIndex]]);
            writer.writeEndElement(); //end of pStyle
        }
        if (!isNullOrUndefined(paragraph)) {
            this.serializeListFormat(writer, paragraph[paragraphFormatProperty[this.keywordIndex]][listFormatProperty[this.keywordIndex]]);
        }
        else {
            this.serializeListFormat(writer, paragraphFormat[listFormatProperty[this.keywordIndex]]);
        }
        if (HelperMethods.parseBoolValue(paragraphFormat[bidiProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'bidi', this.wNamespace);
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(paragraphFormat[keepWithNextProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'keepNext', this.wNamespace);
            if (!HelperMethods.parseBoolValue(paragraphFormat[keepWithNextProperty[this.keywordIndex]])) {
                writer.writeAttributeString('w', 'val', this.wNamespace, '0');
            }
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(paragraphFormat[keepLinesTogetherProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'keepLines', this.wNamespace);
            if (!HelperMethods.parseBoolValue(paragraphFormat[keepLinesTogetherProperty[this.keywordIndex]])) {
                writer.writeAttributeString('w', 'val', this.wNamespace, '0');
            }
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(paragraphFormat[outlineLevelProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'outlineLvl', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, this.getOutlineLevelValue(paragraphFormat[outlineLevelProperty[this.keywordIndex]]).toString());
            writer.writeEndElement();
        }
        this.serializeParagraphSpacing(writer, paragraphFormat);
        if (!isNullOrUndefined(paragraphFormat[contextualSpacingProperty[this.keywordIndex]])) {
            writer.writeStartElement('w', 'contextualSpacing', this.wNamespace);
            if (!HelperMethods.parseBoolValue(paragraphFormat[contextualSpacingProperty[this.keywordIndex]])) {
                writer.writeAttributeString('w', 'val', this.wNamespace, '0');
            }
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(paragraphFormat[widowControlProperty[this.keywordIndex]])) {
            writer.writeStartElement('w', 'widowControl', this.wNamespace);
            if (HelperMethods.parseBoolValue(paragraphFormat[widowControlProperty[this.keywordIndex]])) {
                writer.writeAttributeString('w', 'val', this.wNamespace, '1');
            }
            else {
                writer.writeAttributeString('w', 'val', this.wNamespace, '0');
            }
            writer.writeEndElement();
        }
        this.serializeIndentation(writer, paragraphFormat);
        this.serializeParagraphAlignment(writer, paragraphFormat[textAlignmentProperty[this.keywordIndex]], HelperMethods.parseBoolValue(paragraphFormat[bidiProperty[this.keywordIndex]]));
        if (!isNullOrUndefined(paragraphFormat[tabsProperty[this.keywordIndex]]) && paragraphFormat[tabsProperty[this.keywordIndex]].length > 0) {
            this.serializeTabs(writer, paragraphFormat[tabsProperty[this.keywordIndex]]);
        }
    };
    WordExport.prototype.getOutlineLevelValue = function (outlineLvl) {
        if (this.keywordIndex == 1) {
            if (outlineLvl > 0) {
                return outlineLvl - 1;
            }
        }
        else {
            if (outlineLvl.toString().indexOf('Level') !== -1) {
                var lvlNumber = parseInt(outlineLvl.toString().substring(5), 10);
                if (lvlNumber > 0) {
                    return lvlNumber - 1;
                }
            }
        }
        return 9;
    };
    // Serialize Tabs
    WordExport.prototype.serializeTabs = function (writer, tabStops) {
        writer.writeStartElement('w', 'tabs', this.wNamespace);
        for (var i = 0; i < tabStops.length; i++) {
            this.serializeTab(writer, tabStops[i]);
        }
        writer.writeEndElement();
    };
    WordExport.prototype.serializeTab = function (writer, tabStop) {
        var position = 0;
        writer.writeStartElement('w', 'tab', this.wNamespace);
        if (tabStop[positionProperty[this.keywordIndex]] === 0 && tabStop[deletePositionProperty[this.keywordIndex]] !== 0) {
            position = tabStop[deletePositionProperty[this.keywordIndex]] * this.twentiethOfPoint;
            writer.writeAttributeString('w', 'val', this.wNamespace, 'clear');
        }
        else {
            position = tabStop[positionProperty[this.keywordIndex]] * this.twentiethOfPoint;
            writer.writeAttributeString('w', 'val', this.wNamespace, this.getTabJustification(tabStop[tabJustificationProperty[this.keywordIndex]]));
        }
        if (!isNullOrUndefined(tabStop[tabLeaderProperty[this.keywordIndex]]) && (tabStop[tabLeaderProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'None'))) {
            writer.writeAttributeString('w', 'leader', this.wNamespace, this.getTabLeader(tabStop[tabLeaderProperty[this.keywordIndex]]));
        }
        if (!isNaN(position)) {
            writer.writeAttributeString('w', 'pos', this.wNamespace, position.toString() + '');
        }
        writer.writeEndElement();
    };
    WordExport.prototype.getTextWrappingType = function (textWrappingType) {
        switch (textWrappingType) {
            case 0:
                return 'bothSides';
            case 1:
                return 'left';
            case 2:
                return 'right';
            case 3:
                return 'largest';
            default:
                return 'bothSides';
        }
    };
    WordExport.prototype.getTextWrappingStyle = function (textWrappingStyle) {
        switch (textWrappingStyle) {
            case 1:
                return 'InFrontOfText';
            case 2:
                return 'Square';
            case 3:
                return 'TopAndBottom';
            case 4:
                return 'Behind';
            default:
                return 'Inline';
        }
    };
    WordExport.prototype.getDateStorageFormat = function (dateStorageFormat) {
        switch (dateStorageFormat) {
            case 2:
                return 'DateStorageDateTime';
            case 3:
                return 'DateStorageText';
            default:
                return 'DateStorageDate';
        }
    };
    WordExport.prototype.getDateCalendarType = function (dateCalendarType) {
        switch (dateCalendarType) {
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
                return 'Gregorian';
        }
    };
    WordExport.prototype.getContentControlAppearance = function (contentControlAppearance) {
        switch (contentControlAppearance) {
            case 2:
                return 'Hidden';
            case 3:
                return 'Tags';
            default:
                return 'BoundingBox';
        }
    };
    WordExport.prototype.getTextFormFieldFormat = function (textFormFieldFormat) {
        switch (textFormFieldFormat) {
            case 1:
                return 'FirstCapital';
            case 2:
                return 'Lowercase';
            case 3:
                return 'Uppercase';
            case 4:
                return 'Titlecase';
            default:
                return 'None';
        }
    };
    WordExport.prototype.getTextFormFieldType = function (textFormFieldType) {
        switch (textFormFieldType) {
            case 1:
                return 'Number';
            case 2:
                return 'Date';
            case 3:
                return 'Calculation';
            default:
                return 'Text';
        }
    };
    WordExport.prototype.getTabLeader = function (tabLeader) {
        switch (tabLeader) {
            case 'Dot':
            case 2:
                return 'dot';
            case 'Hyphen':
            case 3:
                return 'hyphen';
            case 'Underscore':
            case 4:
                return 'underscore';
            default:
                return 'none';
        }
    };
    WordExport.prototype.getTabJustification = function (tabJustification) {
        switch (tabJustification) {
            case 'Bar':
            case 0:
                return 'left';
            case 1:
                return 'bar';
            case 'Center':
            case 2:
                return 'center';
            case 'Decimal':
            case 3:
                return 'decimal';
            case 'Left':
                return 'left';
            case 'List':
            case 4:
                return 'num';
            case 'Right':
            case 5:
                return 'right';
            default:
                return 'clear';
        }
    };
    WordExport.prototype.getTableVerticalAlignment = function (tableVerticalPosition) {
        switch (tableVerticalPosition) {
            case 1:
                return 'top';
            case 2:
                return 'center';
            case 3:
                return 'bottom';
            case 4:
                return 'inside';
            case 5:
                return 'outside';
            default:
                return 'none';
        }
    };
    WordExport.prototype.getTableHorizontalAlignment = function (tableHorizontalPosition) {
        switch (tableHorizontalPosition) {
            case 1:
                return 'center';
            case 2:
                return 'inside';
            case 3:
                return 'outside';
            case 4:
                return 'right';
            default:
                return 'left';
        }
    };
    WordExport.prototype.getTableVerticalRelationEnumValue = function (tableRelation) {
        switch (tableRelation) {
            case 'Paragraph':
                return 0;
            case 'Margin':
                return 1;
            case 'Page':
                return 2;
            default:
                return 0;
        }
    };
    WordExport.prototype.getTableVerticalRelation = function (tableRelation) {
        switch (tableRelation) {
            case 1:
                return 'Margin';
            case 2:
                return 'Page';
            default:
                return 'Paragraph';
        }
    };
    WordExport.prototype.getTableHorizontalRelation = function (tableRelation) {
        switch (tableRelation) {
            case 1:
                return 'Margin';
            case 2:
                return 'Page';
            default:
                return 'Column';
        }
    };
    WordExport.prototype.getVerticalOrigin = function (verticalOrigin) {
        switch (verticalOrigin) {
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
                return 'Paragraph';
        }
    };
    WordExport.prototype.getHorizontalOrigin = function (horizontalOrigin) {
        switch (horizontalOrigin) {
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
                return 'Column';
        }
    };
    WordExport.prototype.getShapeVerticalAlignment = function (shapeVerticalAlignment) {
        switch (shapeVerticalAlignment) {
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
                return 'None';
        }
    };
    WordExport.prototype.getShapeHorizontalAlignment = function (shapeHorizontalAlignment) {
        switch (shapeHorizontalAlignment) {
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
                return 'None';
        }
    };
    WordExport.prototype.getBiDirectionalOverride = function (biDirectionalOverride) {
        switch (biDirectionalOverride) {
            case 1:
                return 'LTR';
            case 2:
                return 'RTL';
            default:
                return 'None';
        }
    };
    WordExport.prototype.getBreakClearType = function (breakClearType) {
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
    // // Seraializes the pargraph list format
    // private serializeListParagraph(writer: XmlWriter, paragraph: any): void {
    //     if (!isNullOrUndefined(paragraph.paragraphFormat.listFormat)) {
    //         this.serializeListFormat(writer, paragraph.paragraphFormat.listFormat);
    //     }
    // }
    // Serialize the list format
    WordExport.prototype.serializeListFormat = function (writer, lf) {
        // let pStyleName = undefined;
        // if (lf.CurrentListStyle.IsBuiltInStyle && !isNullOrUndefined(lf.OwnerParagraph))
        // {
        //     pStyleName = lf.OwnerParagraph.StyleName;
        // }
        // int listId = GetListId(lf);
        // if (!isNullOrUndefined(pStyleName) && string.IsNullOrEmpty(lf.LFOStyleName)) 
        // {
        //     WordDocument doc = lf.OwnerParagraph.Document;
        //     WParagraphStyle style = doc.Styles.FindByName(pStyleName, StyleType.ParagraphStyle) as WParagraphStyle;
        //     if (style.ListIndex === -1)
        //     {
        //         ListStyle lstStyle = lf.OwnerParagraph.Document.ListStyles.FindByName(lf.CustomStyleName);
        //         style.ListIndex = listId;
        //         if (lstStyle.Levels.length > 1)
        //         {
        //             style.ListLevel = lf.ListLevelNumber;
        //         }
        //         pStyleName = pStyleName.Replace(' ', '');
        //         lstStyle.Levels[lf.ListLevelNumber].ParaStyleName = pStyleName;
        //     }
        // }
        // else
        // {
        // if (!isNullOrUndefined(lf.listId) && !isNullOrUndefined(lf.listLevelNumber)) {
        //     this.serializeNumPr(writer, lf.listId, lf.listLevelNumber);
        // }
        // }
        if (!isNullOrUndefined(lf[listIdProperty[this.keywordIndex]]) || !isNullOrUndefined(lf[listLevelNumberProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'numPr', this.wNamespace);
            if (!isNullOrUndefined(lf[listLevelNumberProperty[this.keywordIndex]]) && lf[listLevelNumberProperty[this.keywordIndex]] !== -1) {
                writer.writeStartElement(undefined, 'ilvl', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, lf[listLevelNumberProperty[this.keywordIndex]].toString());
                writer.writeEndElement();
            }
            if (!isNullOrUndefined(lf[listIdProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'numId', this.wNamespace);
                var listId = (lf[listIdProperty[this.keywordIndex]] + 1).toString();
                // When attempting to open the exported document in tika server, the empty listId value is having trouble.So commented this below lines
                // if (lf[listIdProperty[this.keywordIndex]] === -1) {
                //     listId = '';
                // }
                writer.writeAttributeString('w', 'val', this.wNamespace, listId);
                writer.writeEndElement();
            }
            writer.writeEndElement();
        }
    };
    // // Serializes the numbering properties to the paragraph
    // private serializeNumPr(writer: XmlWriter, listId: number, listLevel: number): void {
    //     writer.writeStartElement(undefined, 'numPr', this.wNamespace);
    //     if (listLevel !== -1) {
    //         writer.writeStartElement(undefined, 'ilvl', this.wNamespace);
    //         writer.writeAttributeString('w', 'val', this.wNamespace, listLevel.toString());
    //         writer.writeEndElement();
    //     }
    //     if (listId !== -1) {
    //         writer.writeStartElement(undefined, 'numId', this.wNamespace);
    //         writer.writeAttributeString('w', 'val', this.wNamespace, listId.toString());
    //         writer.writeEndElement();
    //     }
    //     writer.writeEndElement();
    // }
    WordExport.prototype.serializeParagraphAlignment = function (writer, txtAlignment, isBidi) {
        if (!isNullOrUndefined(txtAlignment)) {
            writer.writeStartElement(undefined, 'jc', this.wNamespace);
            var alignment = void 0;
            switch (txtAlignment) {
                case 'Center':
                case 1:
                    alignment = 'center';
                    break;
                case 'Right':
                case 2:
                    alignment = 'right';
                    break;
                case 'Justify':
                case 3:
                    alignment = 'both';
                    break;
                default:
                    alignment = 'left';
                    break;
            }
            writer.writeAttributeString('w', 'val', this.wNamespace, alignment);
            writer.writeEndElement();
        }
    };
    // Serializes the paragraph spacings
    WordExport.prototype.serializeParagraphSpacing = function (writer, paragraphFormat) {
        writer.writeStartElement(undefined, 'spacing', this.wNamespace);
        // if (paragraphFormat.HasValue(WParagraphFormat.BeforeLinesKey))
        // {
        //     short beforeLines = (short)Math.Round(paragraphFormat.BeforeLines * DLSConstants.HundredthsUnit);
        //     writer.WriteAttributeString('beforeLines', this.wNamespace, ToString((float)beforeLines));               
        // }
        // if (paragraphFormat.HasValue(WParagraphFormat.AfterLinesKey))
        // {
        //     short afterLines = (short)Math.Round(paragraphFormat.AfterLines * DLSConstants.HundredthsUnit);
        //     writer.WriteAttributeString('afterLines', this.wNamespace, ToString((float)afterLines));                 
        // }
        if (!isNullOrUndefined(paragraphFormat[beforeSpacingProperty[this.keywordIndex]])) {
            writer.writeAttributeString(undefined, 'before', this.wNamespace, this.roundToTwoDecimal(paragraphFormat[beforeSpacingProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
        }
        if (!isNullOrUndefined(paragraphFormat[spaceBeforeAutoProperty[this.keywordIndex]])) {
            var value = this.keywordIndex == 1 ? paragraphFormat[spaceBeforeAutoProperty[this.keywordIndex]].toString() : (paragraphFormat[spaceBeforeAutoProperty[this.keywordIndex]]) ? "1" : "0";
            writer.writeAttributeString(undefined, 'beforeAutospacing', this.wNamespace, value);
        }
        //TODO:ISSUEFIX(paragraphFormat.beforeSpacing * this.twentiethOfPoint).toString());
        // if (paragraphFormat.HasValue(WParagraphFormat.SpacingBeforeAutoKey))
        // {
        //     if (paragraphFormat.SpaceBeforeAuto)
        //     {
        //         writer.WriteAttributeString('beforeAutospacing', this.wNamespace, '1');
        //     }
        //     else
        //     {
        //         writer.WriteAttributeString('beforeAutospacing', this.wNamespace, '0');
        //     }
        // }
        if (!isNullOrUndefined(paragraphFormat[afterSpacingProperty[this.keywordIndex]])) {
            writer.writeAttributeString(undefined, 'after', this.wNamespace, this.roundToTwoDecimal(paragraphFormat[afterSpacingProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
        }
        if (!isNullOrUndefined(paragraphFormat[spaceAfterAutoProperty[this.keywordIndex]])) {
            var value = this.keywordIndex == 1 ? paragraphFormat[spaceAfterAutoProperty[this.keywordIndex]].toString() : (paragraphFormat[spaceAfterAutoProperty[this.keywordIndex]]) ? "1" : "0";
            writer.writeAttributeString(undefined, 'afterAutospacing', this.wNamespace, value);
        }
        //TODO:ISSUEFIX(paragraphFormat.afterSpacing * this.twentiethOfPoint).toString());
        // if (paragraphFormat.HasValue(WParagraphFormat.SpacingAfterAutoKey))
        // {
        //     if (paragraphFormat.SpaceAfterAuto)
        //     {
        //         writer.WriteAttributeString('afterAutospacing', this.wNamespace, '1');
        //     }
        //     else
        //     {
        //         writer.WriteAttributeString('afterAutospacing', this.wNamespace, '0');
        //     }
        // }
        //TODO:ISSUEFIX((paragraphFormat.lineSpacing) * this.twentiethOfPoint).toString());
        // lineSpacingType has enum values 0,1,2 for AtLeast, Exactly and Multiple respectively
        if (!isNullOrUndefined(paragraphFormat[lineSpacingProperty[this.keywordIndex]])) {
            var lineSpacingValue = (paragraphFormat[lineSpacingTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'AtLeast') || paragraphFormat[lineSpacingTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 2 : 'Exactly')) ? this.roundToTwoDecimal(paragraphFormat[lineSpacingProperty[this.keywordIndex]] * this.twentiethOfPoint) : this.roundToTwoDecimal(paragraphFormat[lineSpacingProperty[this.keywordIndex]] * 240);
            writer.writeAttributeString(undefined, 'line', this.wNamespace, lineSpacingValue.toString());
        }
        if (!isNullOrUndefined(paragraphFormat[lineSpacingTypeProperty[this.keywordIndex]])) {
            var lineSpacingType = 'auto';
            if (paragraphFormat[lineSpacingTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'AtLeast')) {
                lineSpacingType = 'atLeast';
            }
            else if (paragraphFormat[lineSpacingTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 2 : 'Exactly')) {
                lineSpacingType = 'exact';
            }
            writer.writeAttributeString(undefined, 'lineRule', this.wNamespace, lineSpacingType);
        }
        writer.writeEndElement();
    };
    // Serializes the paragraph indentation
    WordExport.prototype.serializeIndentation = function (writer, paragraphFormat) {
        writer.writeStartElement(undefined, 'ind', this.wNamespace);
        if (!isNullOrUndefined(paragraphFormat[leftIndentProperty[this.keywordIndex]])) {
            writer.writeAttributeString(undefined, 'left', this.wNamespace, this.roundToTwoDecimal(paragraphFormat[leftIndentProperty[this.keywordIndex]] * this.twipsInOnePoint).toString());
        }
        if (!isNullOrUndefined(paragraphFormat[rightIndentProperty[this.keywordIndex]])) {
            writer.writeAttributeString(undefined, 'right', this.wNamespace, this.roundToTwoDecimal(paragraphFormat[rightIndentProperty[this.keywordIndex]] * this.twipsInOnePoint).toString());
        }
        if (!isNullOrUndefined(paragraphFormat[firstLineIndentProperty[this.keywordIndex]])) {
            if (paragraphFormat[firstLineIndentProperty[this.keywordIndex]] < 0) {
                writer.writeAttributeString(undefined, 'hanging', this.wNamespace, this.roundToTwoDecimal(-1 * paragraphFormat[firstLineIndentProperty[this.keywordIndex]] * this.twipsInOnePoint).toString());
            }
            else {
                writer.writeAttributeString(undefined, 'firstLine', this.wNamespace, this.roundToTwoDecimal(paragraphFormat[firstLineIndentProperty[this.keywordIndex]] * this.twipsInOnePoint).toString());
            }
        }
        writer.writeEndElement();
    };
    //creates custom xml mapping
    WordExport.prototype.serializeCustomXMLMapping = function (customXML, writer) {
        if (customXML.length > 0) {
            var keys = customXML.keys;
            for (var i = 0; i < keys.length; i++) {
                var customXmlWriter = new XmlWriter();
                customXmlWriter.writeStartElement(undefined, 'Relationships', this.rpNamespace);
                var xmlData = this.mCustomXML.get(keys[i]);
                var itemID = keys[i];
                var id = this.getNextRelationShipID();
                var fileIndex = i + 1;
                var itemPath = this.createXMLItem(xmlData, id, fileIndex);
                var itemPropsPath = this.createXMLItemProps(itemID, fileIndex);
                this.serializeRelationShip(writer, id, this.customXmlRelType, '../' + itemPath);
                this.customXMLRelation(customXmlWriter, fileIndex, itemPropsPath);
                customXmlWriter.writeEndElement();
                var zipArchiveItem = new ZipArchiveItem(customXmlWriter.buffer, this.customXMLRelPath + fileIndex + '.xml.rels');
                this.mArchive.addItem(zipArchiveItem);
            }
        }
    };
    WordExport.prototype.customXMLRelation = function (writer, fileIndex, itemPropsPath) {
        this.serializeRelationShip(writer, 'rId1', this.wordMLCustomXmlPropsRelType, itemPropsPath);
    };
    WordExport.prototype.createXMLItem = function (xmlData, id, fileIndex) {
        var xmlBlob = new Blob([xmlData], { type: 'text/plain' });
        var itemPath = this.customXMLItemsPath + fileIndex + '.xml';
        var zipArchiveItem = new ZipArchiveItem(xmlBlob, itemPath);
        this.mArchive.addItem(zipArchiveItem);
        return itemPath;
    };
    WordExport.prototype.createXMLItemProps = function (itemID, fileIndex) {
        var writer = new XmlWriter();
        var customitemPropsPath = this.customXMLItemsPropspath + fileIndex + '.xml';
        var itemPropsPath = this.itemPropsPath + fileIndex + '.xml';
        writer.writeStartElement('ds', 'datastoreItem', this.wNamespace);
        writer.writeAttributeString('ds', 'itemID', undefined, itemID);
        writer.writeAttributeString('xmlns', 'ds', undefined, this.dsNamespace);
        writer.writeEndElement();
        this.customXMLProps.push(customitemPropsPath);
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, customitemPropsPath);
        this.mArchive.addItem(zipArchiveItem);
        return itemPropsPath;
    };
    // Serialize the styles (styles.xml)
    WordExport.prototype.serializeStyles = function () {
        var writer = new XmlWriter();
        writer.writeStartElement('w', 'styles', this.wNamespace);
        writer.writeAttributeString('xmlns', 'mc', undefined, this.veNamespace);
        writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
        writer.writeAttributeString('xmlns', 'w', undefined, this.wNamespace);
        writer.writeAttributeString('xmlns', 'w14', undefined, this.w14Namespace);
        writer.writeAttributeString('xmlns', 'w15', undefined, this.w15Namespace);
        writer.writeAttributeString('mc', 'Ignorable', undefined, 'w14 w15');
        //writes the document defaults, latent styles and default styles.
        this.serializeDefaultStyles(writer);
        //writes the document styles
        this.serializeDocumentStyles(writer);
        writer.writeEndElement(); //end of styles tag
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.stylePath);
        this.mArchive.addItem(zipArchiveItem); //this.stylePath, styleStream, false, FileAttributes.Archive);
    };
    // Serializes the default styles (document default paragraph and character format)
    WordExport.prototype.serializeDefaultStyles = function (writer) {
        writer.writeStartElement(undefined, 'docDefaults', this.wNamespace);
        //if (HasDefaultCharFormat())
        //{
        writer.writeStartElement(undefined, 'rPrDefault', this.wNamespace);
        // if (!isNullOrUndefined(this.mDocument.characterFormat)) {
        this.serializeCharacterFormat(writer, this.defCharacterFormat);
        writer.writeEndElement(); // end of rPrDefault
        // }
        // else {
        //     writer.writeStartElement(undefined, 'rPr', this.wNamespace);
        //     writer.writeStartElement(undefined, 'rFonts', this.wNamespace);
        //     if (!string.IsNullOrEmpty(m_document.StandardAsciiFont))
        //         writer.WriteAttributeString('ascii', this.wNamespace, m_document.StandardAsciiFont);
        //     if (!string.IsNullOrEmpty(m_document.StandardFarEastFont))
        //         writer.WriteAttributeString('eastAsia', this.wNamespace, m_document.StandardFarEastFont);
        //     if (!string.IsNullOrEmpty(m_document.StandardNonFarEastFont))
        //         writer.WriteAttributeString('hAnsi', this.wNamespace, m_document.StandardNonFarEastFont);
        //     if (!string.IsNullOrEmpty(m_document.StandardBidiFont))
        //         writer.WriteAttributeString('cs', this.wNamespace, m_document.StandardBidiFont);
        //     writer.WriteEndElement();
        //     float fontSize = GetDefFontSize(m_document, WCharacterFormat.FontSizeKey);
        //     if (fontSize !== 0f)
        //     {
        //         writer.WriteStartElement('sz', this.wNamespace);
        //         writer.WriteAttributeString('val', this.wNamespace, (fontSize * 2).ToString(CultureInfo.InvariantCulture));
        //         writer.WriteEndElement();
        //     }
        //     fontSize = GetDefFontSize(m_document, WCharacterFormat.FontSizeBidiKey);
        //     if (fontSize !== 0f)
        //     {
        //         writer.WriteStartElement('szCs', this.wNamespace);
        //         writer.WriteAttributeString('val', this.wNamespace, (fontSize * 2).ToString(CultureInfo.InvariantCulture));
        //         writer.WriteEndElement();
        //     }
        //     writer.WriteEndElement();
        // }
        // writer.WriteEndElement();
        // //}
        writer.writeStartElement(undefined, 'pPrDefault', this.wNamespace);
        if (!isNullOrUndefined(this.defParagraphFormat)) {
            writer.writeStartElement(undefined, 'pPr', this.wNamespace);
            this.serializeParagraphFormat(writer, this.defParagraphFormat, undefined);
            writer.writeEndElement(); //end of pPr
        }
        writer.writeEndElement(); //end of pPrDefault
        // writer.WriteEndElement();
        // SerializeLatentStyles();
        // //Default styles
        // if (m_document.Styles.length === 0 || isNullOrUndefined(m_document.Styles.FindByName('Normal')))
        // {
        //     SerializeDefaultParagraphStyle();
        // }
        // if (!IsDocumentContainsDefaultTableStyle())
        // {
        //     SerializeTableNormalStyle();
        // }
        // if (isNullOrUndefined(m_document.Styles.FindByName('No List')) && isNullOrUndefined(m_document.Styles.FindByName('NoList')))
        //     SerializeNoListStyle();
        // if (isNullOrUndefined(m_document.Styles.FindByName('Table Grid')) && isNullOrUndefined(m_document.Styles.FindByName('TableGrid')))
        // {
        //     SerializeTableGridStyle();
        // }
        // }        
        writer.writeEndElement();
    };
    WordExport.prototype.serializeDocumentStyles = function (writer) {
        for (var i = 0; i < this.mStyles.length; i++) {
            var style = this.mStyles[i];
            writer.writeStartElement(undefined, 'style', this.wNamespace);
            var type = this.getStyleType(style[typeProperty[this.keywordIndex]]);
            writer.writeAttributeString('w', 'type', this.wNamespace, type);
            writer.writeAttributeString('w', 'styleId', this.wNamespace, style[nameProperty[this.keywordIndex]]);
            //name
            writer.writeStartElement(undefined, 'name', this.wNamespace);
            var list = ["TOC 1", "TOC 2", "TOC 3", "TOC 4", "TOC 5", "TOC 6", "TOC 7", "TOC 8", "TOC 9"];
            if (list.indexOf(style[nameProperty[this.keywordIndex]]) != -1) {
                writer.writeAttributeString('w', 'val', this.wNamespace, style[nameProperty[this.keywordIndex]].toLowerCase());
            }
            else {
                writer.writeAttributeString('w', 'val', this.wNamespace, style[nameProperty[this.keywordIndex]]);
            }
            writer.writeEndElement();
            //basedOn
            if (!isNullOrUndefined(style[basedOnProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'basedOn', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, style[basedOnProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            //next
            if (!isNullOrUndefined(style[nextProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'next', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, style[nextProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            //link
            if (!isNullOrUndefined(style[linkProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'link', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, style[linkProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            if (style[typeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Paragraph')) {
                writer.writeStartElement(undefined, 'pPr', this.wNamespace);
                this.serializeParagraphFormat(writer, style[paragraphFormatProperty[this.keywordIndex]], undefined);
                writer.writeEndElement();
            }
            // let value = (style.characterFormat as WCharacterFormat).newgetCharacterFormat();
            if (style[typeProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 2 : 'Table')) {
                this.serializeCharacterFormat(writer, style[characterFormatProperty[this.keywordIndex]]);
            }
            writer.writeEndElement(); //end of Style
        }
    };
    // Serializes the Character format
    WordExport.prototype.serializeCharacterFormat = function (writer, characterFormat) {
        if (isNullOrUndefined(this.keywordIndex)) {
            this.keywordIndex = 0;
        }
        writer.writeStartElement(undefined, 'rPr', this.wNamespace);
        if (!isNullOrUndefined(characterFormat[styleNameProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'rStyle', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, characterFormat[styleNameProperty[this.keywordIndex]]);
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(characterFormat[fontFamilyProperty[this.keywordIndex]]) || !isNullOrUndefined(characterFormat[fontFamilyBidiProperty[this.keywordIndex]]) || !isNullOrUndefined(characterFormat[fontFamilyFarEastProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'rFonts', this.wNamespace);
            if (!isNullOrUndefined(characterFormat[fontFamilyAsciiProperty[this.keywordIndex]])) {
                var key = HelperMethods.isThemeFont(characterFormat[fontFamilyAsciiProperty[this.keywordIndex]]) ? 'asciiTheme' : 'ascii';
                writer.writeAttributeString(undefined, key, this.wNamespace, characterFormat[fontFamilyAsciiProperty[this.keywordIndex]]);
            }
            if (!isNullOrUndefined(characterFormat[fontFamilyFarEastProperty[this.keywordIndex]])) {
                var key = HelperMethods.isThemeFont(characterFormat[fontFamilyFarEastProperty[this.keywordIndex]]) ? 'eastAsiaTheme' : 'eastAsia';
                writer.writeAttributeString(undefined, key, this.wNamespace, characterFormat[fontFamilyFarEastProperty[this.keywordIndex]]);
            }
            if (!isNullOrUndefined(characterFormat[fontFamilyNonFarEastProperty[this.keywordIndex]])) {
                var key = HelperMethods.isThemeFont(characterFormat[fontFamilyNonFarEastProperty[this.keywordIndex]]) ? 'hAnsiTheme' : 'hAnsi';
                writer.writeAttributeString(undefined, key, this.wNamespace, characterFormat[fontFamilyNonFarEastProperty[this.keywordIndex]]);
            }
            if (!isNullOrUndefined(characterFormat[fontFamilyBidiProperty[this.keywordIndex]])) {
                var key = HelperMethods.isThemeFont(characterFormat[fontFamilyBidiProperty[this.keywordIndex]]) ? 'cstheme' : 'cs';
                writer.writeAttributeString(undefined, key, this.wNamespace, characterFormat[fontFamilyBidiProperty[this.keywordIndex]]);
            }
            if (!isNullOrUndefined(characterFormat[fontHintTypeProperty[this.keywordIndex]])) {
                writer.writeAttributeString(undefined, 'hint', this.wNamespace, this.getFontHintType(characterFormat[fontHintTypeProperty[this.keywordIndex]]));
            }
            writer.writeEndElement(); //end         
        }
        if (!isNullOrUndefined(characterFormat[boldProperty[this.keywordIndex]])) {
            this.serializeBoolProperty(writer, 'b', HelperMethods.parseBoolValue(characterFormat[boldProperty[this.keywordIndex]]));
        }
        if (HelperMethods.parseBoolValue(characterFormat[boldBidiProperty[this.keywordIndex]])) {
            this.serializeBoolProperty(writer, 'bCs', HelperMethods.parseBoolValue(characterFormat[boldBidiProperty[this.keywordIndex]]));
        }
        if (!isNullOrUndefined(characterFormat[italicProperty[this.keywordIndex]])) {
            this.serializeBoolProperty(writer, 'i', HelperMethods.parseBoolValue(characterFormat[italicProperty[this.keywordIndex]]));
        }
        if (!isNullOrUndefined(characterFormat[italicBidiProperty[this.keywordIndex]])) {
            this.serializeBoolProperty(writer, 'iCs', HelperMethods.parseBoolValue(characterFormat[italicBidiProperty[this.keywordIndex]]));
        }
        if (!isNullOrUndefined(characterFormat[hiddenProperty[this.keywordIndex]]) && HelperMethods.parseBoolValue(characterFormat[hiddenProperty[this.keywordIndex]])) {
            this.serializeBoolProperty(writer, 'vanish', HelperMethods.parseBoolValue(characterFormat[hiddenProperty[this.keywordIndex]]));
        }
        if (HelperMethods.parseBoolValue(characterFormat[bidiProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'rtl', this.wNamespace);
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(characterFormat[allCapsProperty[this.keywordIndex]])) {
            this.serializeBoolProperty(writer, 'caps', HelperMethods.parseBoolValue(characterFormat[allCapsProperty[this.keywordIndex]]));
        }
        if (HelperMethods.parseBoolValue(characterFormat[complexScriptProperty[this.keywordIndex]])) {
            this.serializeBoolProperty(writer, 'cs', HelperMethods.parseBoolValue(characterFormat[complexScriptProperty[this.keywordIndex]]));
        }
        if (!isNullOrUndefined(characterFormat[strikethroughProperty[this.keywordIndex]])) {
            switch (characterFormat[strikethroughProperty[this.keywordIndex]]) {
                case 'SingleStrike':
                case 1:
                    this.serializeBoolProperty(writer, 'strike', true);
                    break;
                case 'DoubleStrike':
                case 2:
                    this.serializeBoolProperty(writer, 'dstrike', true);
                    break;
                default:
                    this.serializeBoolProperty(writer, 'strike', false);
                    this.serializeBoolProperty(writer, 'dstrike', false);
                    break;
            }
        }
        if (!isNullOrUndefined(characterFormat[fontColorProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'color', this.wNamespace);
            // "empty" is old value used for auto color till v19.2.49. It is maintained for backward compatibility.
            if (characterFormat[fontColorProperty[this.keywordIndex]] === 'empty' || characterFormat[fontColorProperty[this.keywordIndex]] === '#00000000') {
                writer.writeAttributeString('w', 'val', this.wNamespace, 'auto');
            }
            else {
                writer.writeAttributeString('w', 'val', this.wNamespace, this.getColor(characterFormat[fontColorProperty[this.keywordIndex]]));
            }
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(characterFormat[fontSizeProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'sz', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, this.roundToTwoDecimal(characterFormat[fontSizeProperty[this.keywordIndex]] * 2).toString());
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(characterFormat[characterSpacingProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'spacing', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, (characterFormat[characterSpacingProperty[this.keywordIndex]] * 20).toString());
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(characterFormat[scalingProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'w', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, (characterFormat[scalingProperty[this.keywordIndex]]).toString());
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(characterFormat[fontSizeBidiProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'szCs', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, this.roundToTwoDecimal(characterFormat[fontSizeBidiProperty[this.keywordIndex]] * 2).toString());
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(characterFormat[highlightColorProperty[this.keywordIndex]]) && characterFormat[highlightColorProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'NoColor')) {
            writer.writeStartElement(undefined, 'highlight', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, this.getHighlightColor(characterFormat[highlightColorProperty[this.keywordIndex]]));
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(characterFormat[revisionIdsProperty[this.keywordIndex]]) && characterFormat[revisionIdsProperty[this.keywordIndex]].length > 0) {
            this.serializeRevisionStart(writer, characterFormat, undefined);
            this.serializeRevisionEnd(writer, characterFormat, undefined);
        }
        if (!isNullOrUndefined(characterFormat[underlineProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'u', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, this.getUnderlineStyle(characterFormat[underlineProperty[this.keywordIndex]]));
            if (!isNullOrUndefined(characterFormat[underlineColorProperty[this.keywordIndex]])) {
                writer.writeAttributeString('w', 'color', this.wNamespace, this.getColor(characterFormat[underlineColorProperty[this.keywordIndex]]));
            }
            writer.writeEndElement();
        }
        if (!isNullOrUndefined(characterFormat[baselineAlignmentProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'vertAlign', this.wNamespace);
            switch (characterFormat[baselineAlignmentProperty[this.keywordIndex]]) {
                case 'Superscript':
                case 1:
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'superscript');
                    break;
                case 'Subscript':
                case 2:
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'subscript');
                    break;
                default:
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'baseline');
                    break;
            }
            writer.writeEndElement();
        }
        writer.writeEndElement(); //end of rPrChange
    };
    WordExport.prototype.getColor = function (color) {
        if (color.length > 0) {
            if (color[0] === '#') {
                color = color.substr(1);
            }
            if (color.length > 6) {
                color = color.substr(0, 6);
            }
        }
        return color;
    };
    WordExport.prototype.getStyleType = function (styleType) {
        switch (styleType) {
            case 'Character':
            case 1:
                return 'character';
            case 'Table':
            case 2:
                return 'table';
            default:
                return 'paragraph';
        }
    };
    // Get the underline style as string
    WordExport.prototype.getUnderlineStyle = function (underlineStyle) {
        switch (underlineStyle) {
            case 'None':
            case 0:
                return 'none';
            case 'Single':
            case 1:
                return 'single';
            case 'Words':
            case 2:
                return 'words';
            case 'Double':
            case 3:
                return 'double';
            case 'Dotted':
            case 4:
                return 'dotted';
            case 'Thick':
            case 5:
                return 'thick';
            case 6:
                return 'dash';
            case 'DashLong':
            case 7:
                return 'dashLong';
            case 'DotDash':
            case 8:
                return 'dotDash';
            case 'DotDotDash':
            case 9:
                return 'dotDotDash';
            case 'Wavy':
            case 10:
                return 'wave';
            case 'DottedHeavy':
            case 11:
                return 'dottedHeavy';
            case 'DashHeavy':
            case 12:
                return 'dashedHeavy';
            case 'DashLongHeavy':
            case 13:
                return 'dashLongHeavy';
            case 'DotDashHeavy':
            case 14:
                return 'dashDotHeavy';
            case 'DotDotDashHeavy':
            case 15:
                return 'dashDotDotHeavy';
            case 'WavyHeavy':
            case 16:
                return 'wavyHeavy';
            case 'WavyDouble':
            case 17:
                return 'wavyDouble';
            default:
                return 'dash';
        }
    };
    //Get the FontHintType as string
    WordExport.prototype.getFontHintType = function (fontHintType) {
        switch (fontHintType) {
            case 'EastAsia':
            case 1:
                return 'eastAsia';
            case 'CS':
            case 2:
                return 'cs';
            default:
                return 'default';
        }
    };
    WordExport.prototype.getHighlightColor = function (highlight) {
        switch (highlight) {
            // Highlights the content with bright green (#ff00ff00) color.
            case 'BrightGreen':
            case 2:
                return 'green';
            // Highlights the content with turquoise (#ff00ffff) color.
            case 'Turquoise':
            case 3:
                return 'cyan';
            // Highlights the content with pink (#ffff00ff) color.
            case 'Pink':
            case 4:
                return 'magenta';
            // Highlights the content with blue (#ff0000ff) color.
            case 'Blue':
            case 5:
                return 'blue';
            // Highlights the content with red (#ffff0000) color.
            case 'Red':
            case 6:
                return 'red';
            // Highlights the content with dark blue (#ff000080) color.
            case 'DarkBlue':
            case 7:
                return 'darkBlue';
            // Highlights the content with teal (#ff008080) color.
            case 'Teal':
            case 8:
                return 'darkCyan';
            // Highlights the content with green (#ff008000) color.
            case 'Green':
            case 9:
                return 'darkGreen';
            // Highlights the content with violet (#ff800080) color.
            case 'Violet':
            case 10:
                return 'darkMagenta';
            // Highlights the content with dark red (#ff800000) color.
            case 'DarkRed':
            case 11:
                return 'darkRed';
            // Highlights the content with dark yellow (#ff808000)  color.
            case 'DarkYellow':
            case 12:
                return 'darkYellow';
            // Highlights the content with gray 50 (#ff808080) color.
            case 'Gray50':
            case 13:
                return 'darkGray';
            // Highlights the content with gray 25 (#ffc0c0c0) color.
            case 'Gray25':
            case 14:
                return 'lightGray';
            // Highlights the content with black (#ff000000) color.
            case 'Black':
            case 15:
                return 'black';
            // Highlights the content with yellow (#ffffff00) color.
            default:
                return 'yellow';
        }
    };
    /*private toggleFirstCahar(text: string) {
        return text.charAt(0).toLowerCase() + text.slice(1);
    }*/
    // Serializes the bool character format property
    WordExport.prototype.serializeBoolProperty = function (writer, tag, value) {
        writer.writeStartElement(undefined, tag, this.wNamespace);
        if (!value) {
            writer.writeAttributeString(undefined, 'val', this.wNamespace, '0');
        }
        writer.writeEndElement();
    };
    // Serialize the list styles and numberings (numberings.xml)
    WordExport.prototype.serializeNumberings = function () {
        if (this.document[listsProperty[this.keywordIndex]].length === 0) {
            return;
        }
        var writer = new XmlWriter();
        writer.writeStartElement('w', 'numbering', this.wNamespace);
        this.writeCommonAttributeStrings(writer);
        // this.serializePictureBullets(writer, this.mDocument.lists);
        this.serializeAbstractListStyles(writer, this.document[abstractListsProperty[this.keywordIndex]]);
        this.serializeListInstances(writer, this.document[listsProperty[this.keywordIndex]]);
        // SerializeListOverrides(writer, this.mDocument.ridesm_document.ListOverrides);
        writer.writeEndElement();
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.numberingPath);
        this.mArchive.addItem(zipArchiveItem);
    };
    // Serializes the abstract list styles
    WordExport.prototype.serializeAbstractListStyles = function (writer, listStyles) {
        for (var i = 0; i < listStyles.length; i++) {
            var abstractList = listStyles[i];
            writer.writeStartElement(undefined, 'abstractNum', this.wNamespace);
            writer.writeAttributeString(undefined, 'abstractNumId', this.wNamespace, abstractList[abstractListIdProperty[this.keywordIndex]].toString());
            writer.writeStartElement(undefined, 'nsid', this.wNamespace);
            writer.writeAttributeString(undefined, 'val', this.wNamespace, HelperMethods.numberToHexDecimal(abstractList[nsidProperty]));
            writer.writeEndElement();
            for (var ilvl = 0, cnt = abstractList[levelsProperty[this.keywordIndex]].length; ilvl < cnt; ilvl++) {
                this.serializeListLevel(writer, abstractList[levelsProperty[this.keywordIndex]][ilvl], ilvl);
            }
            writer.writeEndElement(); //end of abstractNum
        }
    };
    // Serializes the list styles
    WordExport.prototype.serializeListInstances = function (writer, listStyles) {
        for (var i = 0; i < listStyles.length; i++) {
            var list = listStyles[i];
            writer.writeStartElement(undefined, 'num', this.wNamespace);
            writer.writeAttributeString(undefined, 'numId', this.wNamespace, (list[listIdProperty[this.keywordIndex]] + 1).toString());
            writer.writeStartElement(undefined, 'abstractNumId', this.wNamespace);
            writer.writeAttributeString(undefined, 'val', this.wNamespace, list[abstractListIdProperty[this.keywordIndex]].toString());
            writer.writeEndElement();
            for (var lvl = 0, cnt = list[levelOverridesProperty[this.keywordIndex]].length; lvl < cnt; lvl++) {
                this.serializeLevelOverrides(writer, list[levelOverridesProperty[this.keywordIndex]][lvl], list[levelOverridesProperty[this.keywordIndex]][lvl][levelNumberProperty[this.keywordIndex]]);
            }
            writer.writeEndElement();
        }
    };
    WordExport.prototype.roundToTwoDecimal = function (num) {
        return Math.round(num); // * 100) / 100;
    };
    // Serialize the list level
    WordExport.prototype.serializeListLevel = function (writer, listLevel, levelIndex) {
        writer.writeStartElement(undefined, 'lvl', this.wNamespace);
        writer.writeAttributeString(undefined, 'ilvl', this.wNamespace, levelIndex.toString());
        if (!isNullOrUndefined(listLevel[isLegalStyleNumberingProperty[this.keywordIndex]]) && listLevel[isLegalStyleNumberingProperty[this.keywordIndex]]) {
            writer.writeElementString(undefined, 'isLgl', this.wNamespace, undefined);
        }
        writer.writeStartElement(undefined, 'start', this.wNamespace);
        writer.writeAttributeString(undefined, 'val', this.wNamespace, listLevel[startAtProperty[this.keywordIndex]].toString());
        writer.writeEndElement();
        writer.writeStartElement(undefined, 'numFmt', this.wNamespace);
        writer.writeAttributeString(undefined, 'val', this.wNamespace, this.getLevelPattern(listLevel[listLevelPatternProperty[this.keywordIndex]]));
        writer.writeEndElement();
        if (!isNullOrUndefined(listLevel[paraStyleNameProperty[this.keywordIndex]]) && listLevel[paraStyleNameProperty[this.keywordIndex]].toString() !== '') {
            writer.writeStartElement(undefined, 'pStyle', this.wNamespace);
            writer.writeAttributeString(undefined, 'val', this.wNamespace, listLevel[paraStyleNameProperty[this.keywordIndex]].toString());
            writer.writeEndElement();
        }
        // if (listLevel.restartLevel > 0) {
        //     writer.writeStartElement(undefined, 'lvlRestart', this.wNamespace);
        //     writer.writeAttributeString(undefined, 'val', this.wNamespace, '0');
        //     writer.writeEndElement();
        // }
        // if (!isNullOrUndefined(listLevel.paragraphFormat)) {
        //     string name = listLevel.ParaStyleName.Substring(0, 1).ToUpper() + listLevel.ParaStyleName.Remove(0, 1);
        //     writer.WriteStartElement('pStyle', this.wNamespace);
        //     writer.WriteAttributeString('val', this.wNamespace, name);
        //     writer.WriteEndElement();
        // }
        // if (listLevel.IsLegalStyleNumbering) {
        //     writer.WriteStartElement('isLgl', this.wNamespace);
        //     writer.WriteEndElement();
        // }
        this.serializeLevelFollow(writer, listLevel);
        this.serializeLevelText(writer, listLevel, levelIndex + 1);
        // SerializeLegacyProperties(listLevel);
        // if (listLevel.PicBulletId > 0) {
        //     writer.WriteStartElement('lvlPicBulletId', this.wNamespace);
        //     writer.WriteAttributeString('val', this.wNamespace, listLevel.PicBulletId.ToString());
        //     writer.WriteEndElement();
        // }
        // //lvlJc
        // if (listLevel.NumberAlignment !== ListNumberAlignment.Left) {
        //     writer.WriteStartElement('lvlJc', this.wNamespace);
        //     string alignment = string.Empty;
        //     if (listLevel.NumberAlignment === ListNumberAlignment.Right) {
        //         alignment = 'right';
        //     }
        //     else {
        //         alignment = 'center';
        //     }
        //     writer.WriteAttributeString('val', this.wNamespace, alignment);
        //     writer.WriteEndElement();
        // }
        writer.writeStartElement(undefined, 'pPr', this.wNamespace);
        this.serializeParagraphFormat(writer, listLevel[paragraphFormatProperty[this.keywordIndex]], undefined);
        writer.writeEndElement(); //end of pPr
        this.serializeCharacterFormat(writer, listLevel[characterFormatProperty[this.keywordIndex]]);
        writer.writeEndElement();
    };
    //Serialize the levelOverrides
    WordExport.prototype.serializeLevelOverrides = function (writer, listLevel, levelIndex) {
        writer.writeStartElement(undefined, 'lvlOverride', this.wNamespace);
        writer.writeAttributeString(undefined, 'ilvl', this.wNamespace, levelIndex.toString());
        if (!isNullOrUndefined(listLevel[overrideListLevelProperty[this.keywordIndex]]))
            this.serializeListLevel(writer, listLevel[overrideListLevelProperty[this.keywordIndex]], levelIndex);
        if (!isNullOrUndefined(listLevel[startAtProperty[this.keywordIndex]])) {
            writer.writeStartElement(undefined, 'startOverride', this.wNamespace);
            writer.writeAttributeString(undefined, 'val', this.wNamespace, listLevel[startAtProperty[this.keywordIndex]].toString());
            writer.writeEndElement();
        }
        writer.writeEndElement();
    };
    WordExport.prototype.getLevelPattern = function (levelPattern) {
        var patternType;
        switch (levelPattern) {
            case 'None':
            case 0:
                patternType = 'none';
                break;
            case 'Arabic':
            case 1:
                patternType = 'decimal';
                break;
            case 'UpRoman':
            case 2:
                patternType = 'upperRoman';
                break;
            case 'LowRoman':
            case 3:
                patternType = 'lowerRoman';
                break;
            case 'UpLetter':
            case 4:
                patternType = 'upperLetter';
                break;
            case 'LowLetter':
            case 5:
                patternType = 'lowerLetter';
                break;
            case 'Ordinal':
            case 6:
                patternType = 'ordinal';
                break;
            case 'Number':
            case 7:
                patternType = 'cardinalText';
                break;
            case 'OrdinalText':
            case 8:
                patternType = 'ordinalText';
                break;
            case 'LeadingZero':
            case 9:
                patternType = 'decimalZero';
                break;
            case 'FarEast':
            case 11:
                patternType = 'aiueoFullWidth';
                break;
            case 'Special':
            case 12:
                patternType = 'russianLower';
                break;
            // case 'Bullet':
            default:
                patternType = 'bullet';
                break;
        }
        return patternType;
    };
    // Serializes the level text
    WordExport.prototype.serializeLevelText = function (writer, listLevel, lvlIndex) {
        writer.writeStartElement(undefined, 'lvlText', this.wNamespace);
        writer.writeAttributeString(undefined, 'val', this.wNamespace, (listLevel[numberFormatProperty[this.keywordIndex]]));
        writer.writeEndElement();
    };
    // Serialize the level follow character
    WordExport.prototype.serializeLevelFollow = function (writer, listLevel) {
        var fc;
        //TODO:Type issue returns number instead of string
        if (listLevel[followCharacterProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Tab')) {
            fc = 'tab';
        }
        else if (listLevel[followCharacterProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'Space')) {
            fc = 'space';
        }
        else {
            fc = 'nothing';
        }
        writer.writeStartElement(undefined, 'suff', this.wNamespace);
        writer.writeAttributeString(undefined, 'val', this.wNamespace, fc);
        writer.writeEndElement();
    };
    WordExport.prototype.serializeThemeFontLang = function (writer) {
        var isLanguageIdBi = this.themeFontLang[localeIdBidiProperty[this.keywordIndex]] > 0;
        var isLanguageId = this.themeFontLang[localeIdProperty[this.keywordIndex]] > 0;
        var isLanguageIdFarEast = this.themeFontLang[localeIdFarEastProperty[this.keywordIndex]] > 0;
        if (isLanguageId || isLanguageIdFarEast || isLanguageIdBi) {
            writer.writeStartElement('w', 'themeFontLang', undefined);
            if (isLanguageId) {
                var ascii = LocaleId[this.themeFontLang[localeIdProperty[this.keywordIndex]]];
                writer.writeAttributeString('w', 'val', undefined, ascii.replace('_', '-')); //Ascii key
            }
            if (isLanguageIdBi) {
                var bidi = LocaleId[this.themeFontLang[localeIdBidiProperty[this.keywordIndex]]];
                writer.writeAttributeString('w', 'bidi', undefined, bidi.replace('_', '-')); //Bidi key
            }
            if (isLanguageIdFarEast) {
                var farEast = LocaleId[this.themeFontLang[localeIdFarEastProperty[this.keywordIndex]]];
                writer.writeAttributeString('w', 'eastAsia', undefined, farEast.replace('_', '-')); //EastAsia key
            }
            writer.writeEndElement();
        }
    };
    WordExport.prototype.serializeDocumentProtectionSettings = function (writer) {
        writer.writeStartElement('w', 'documentProtection', this.wNamespace);
        if (this.formatting) {
            writer.writeAttributeString('w', 'formatting', this.wNamespace, '1');
        }
        if (this.protectionType && this.protectionType !== 0) {
            var editMode = void 0;
            switch (this.protectionType) {
                case 'ReadOnly':
                case 1:
                    editMode = 'readOnly';
                    break;
                case 'FormFieldsOnly':
                case 2:
                    editMode = 'forms';
                    break;
                case 'CommentsOnly':
                case 3:
                    editMode = 'comments';
                    break;
                case 'RevisionsOnly':
                case 4:
                    editMode = 'trackedChanges';
                    break;
            }
            writer.writeAttributeString('w', 'edit', this.wNamespace, editMode);
        }
        writer.writeAttributeString('w', 'cryptProviderType', this.wNamespace, 'rsaAES');
        writer.writeAttributeString('w', 'cryptAlgorithmClass', this.wNamespace, 'hash');
        writer.writeAttributeString('w', 'cryptAlgorithmType', this.wNamespace, 'typeAny');
        writer.writeAttributeString('w', 'cryptAlgorithmSid', this.wNamespace, '14');
        writer.writeAttributeString('w', 'cryptSpinCount', this.wNamespace, '100000');
        if (this.enforcement) {
            writer.writeAttributeString('w', 'enforcement', this.wNamespace, '1');
        }
        if (this.hashValue) {
            writer.writeAttributeString('w', 'hash', this.wNamespace, this.hashValue);
        }
        if (this.saltValue) {
            writer.writeAttributeString('w', 'salt', this.wNamespace, this.saltValue);
        }
        writer.writeEndElement();
    };
    WordExport.prototype.serializeSettings = function () {
        var writer = new XmlWriter();
        writer.writeStartElement('w', 'settings', this.wNamespace);
        this.writeCustom(writer);
        // writer.writeAttributeString('xmlns', 'mc', undefined, this.veNamespace);
        // writer.writeAttributeString('xmlns', 'o', undefined, this.oNamespace);
        // writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
        // writer.writeAttributeString('xmlns', 'm', undefined, this.mNamespace);
        // writer.writeAttributeString('xmlns', 'v', undefined, this.vNamespace);
        writer.writeAttributeString('xmlns', 'w10', undefined, this.w10Namespace);
        writer.writeAttributeString('xmlns', 'w14', undefined, this.w14Namespace);
        writer.writeAttributeString('xmlns', 'w15', undefined, this.w15Namespace);
        writer.writeAttributeString('xmlns', 'sl', undefined, this.slNamespace);
        writer.writeAttributeString('mc', 'Ignorable', undefined, 'w14 w15');
        // //w:writeProtection - Write Protection
        this.serializeDocumentProtectionSettings(writer);
        //w:view - Document View Setting
        // if (this.mDocument.ViewSetup.DocumentViewType !== DocumentViewType.PrintLayout &&
        //   m_document.ViewSetup.DocumentViewType !== DocumentViewType.NormalLayout)
        // {
        //     writer.writeStartElement('view', this.wNamespace);
        //     string viewTypeStr = string.Empty;
        //     if (m_document.ViewSetup.DocumentViewType === DocumentViewType.OutlineLayout)
        //     {
        //         viewTypeStr = 'outline';
        //     }
        //     else if (m_document.ViewSetup.DocumentViewType === DocumentViewType.WebLayout)
        //     {
        //         viewTypeStr = 'web';
        //     }
        //     writer.writeAttributeString('val', this.wNamespace, viewTypeStr);
        //     writer.writeEndElement();
        // }
        //w:zoom - Magnification Setting
        writer.writeStartElement('w', 'zoom', this.wNamespace);
        // switch (m_document.ViewSetup.ZoomType)
        // {
        //     case ZoomType.FullPage:
        //         writer.writeAttributeString('w', 'val', this.wNamespace, 'fullPage');
        //         break;
        //     case ZoomType.PageWidth:
        //         writer.writeAttributeString('w', 'val', this.wNamespace, 'bestFit');
        //         break;
        //     case ZoomType.TextFit:
        //         writer.writeAttributeString('w', 'val', this.wNamespace, 'textFit');
        //         break;
        // default:
        writer.writeAttributeString('w', 'val', this.wNamespace, 'none');
        // break;
        // }
        writer.writeAttributeString('w', 'percent', this.wNamespace, '100');
        writer.writeEndElement();
        //<w:themeFontLang>
        this.serializeThemeFontLang(writer);
        //w:displayBackgroundShape - Display Background Objects When Displaying Document
        // if (m_document.Background.Type !== BackgroundType.NoBackground)
        // {
        writer.writeStartElement(undefined, 'displayBackgroundShape', this.wNamespace);
        writer.writeEndElement();
        // }
        //w:defaultTabStop - Distance Between Automatic Tab Stops
        writer.writeStartElement(undefined, 'defaultTabStop', this.wNamespace);
        var tabWidth = Math.round(this.defaultTabWidthValue * this.twipsInOnePoint);
        writer.writeAttributeString(undefined, 'val', this.wNamespace, tabWidth.toString());
        writer.writeEndElement();
        if (this.trackChanges) {
            writer.writeStartElement(undefined, 'trackRevisions', this.wNamespace);
            writer.writeEndElement();
        }
        //w:evenAndOddHeaders - Different Even/Odd Page Headers and Footers        
        if (this.mDifferentFirstPage) {
            writer.writeStartElement(undefined, 'evenAndOddHeaders', this.wNamespace);
            writer.writeEndElement();
        }
        //w:footnotePr - Document-Wide Footnote Properties and w:endnotePr - Document-Wide Endnote Properties
        // SerializeFootnoteSettings();
        //w:compat - Compatibility Settings
        if (!this.formFieldShading) {
            writer.writeStartElement(undefined, 'doNotShadeFormData', this.wNamespace);
            writer.writeEndElement();
        }
        writer.writeStartElement(undefined, 'compat', this.wNamespace);
        if (this.dontUseHtmlParagraphAutoSpacing) {
            this.serializeBoolProperty(writer, 'doNotUseHTMLParagraphAutoSpacing', this.dontUseHtmlParagraphAutoSpacing);
        }
        if (this.allowSpaceOfSameStyleInTable) {
            this.serializeBoolProperty(writer, 'allowSpaceOfSameStyleInTable', this.allowSpaceOfSameStyleInTable);
        }
        writer.writeStartElement(undefined, 'compatSetting', this.wNamespace);
        writer.writeAttributeString(undefined, 'name', this.wNamespace, 'compatibilityMode');
        writer.writeAttributeString(undefined, 'uri', this.wNamespace, 'http://schemas.microsoft.com/office/word');
        var compatValue = this.keywordIndex === 1 ? HelperMethods.getCompatibilityModeValue(this.compatibilityMode) : HelperMethods.getCompatibilityModeValue(this.getCompatibilityModeEnumValue(this.compatibilityMode.toString()));
        writer.writeAttributeString(undefined, 'val', this.wNamespace, compatValue);
        writer.writeEndElement();
        writer.writeEndElement();
        if (this.document[footnotesProperty[this.keywordIndex]]) {
            //this.serializeFootNotesPr(writer, this.document.section.sectionFormat);
            writer.writeStartElement(undefined, 'footnotePr', this.wNamespace);
            writer.writeStartElement(undefined, 'footnote', this.wNamespace);
            writer.writeAttributeString(undefined, 'id', this.wNamespace, '-1');
            writer.writeEndElement();
            writer.writeStartElement(undefined, 'footnote', this.wNamespace);
            writer.writeAttributeString(undefined, 'id', this.wNamespace, '0');
            writer.writeEndElement();
            writer.writeEndElement();
        }
        if (this.document[endnotesProperty[this.keywordIndex]]) {
            // this.serializeEndNotesPr(writer, this.document.section.sectionFormat);
            writer.writeStartElement(undefined, 'endnotePr', this.wNamespace);
            writer.writeStartElement(undefined, 'endnote', this.wNamespace);
            writer.writeAttributeString(undefined, 'id', this.wNamespace, '-1');
            writer.writeEndElement();
            writer.writeStartElement(undefined, 'endnote', this.wNamespace);
            writer.writeAttributeString(undefined, 'id', this.wNamespace, '0');
            writer.writeEndElement();
            writer.writeEndElement();
        }
        writer.writeEndElement();
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.settingsPath);
        this.mArchive.addItem(zipArchiveItem);
    };
    WordExport.prototype.serializeCoreProperties = function () {
        //implementation
    };
    WordExport.prototype.serializeAppProperties = function () {
        //implementation
    };
    WordExport.prototype.serializeFontTable = function (contentType) {
        //implementation
    };
    WordExport.prototype.serializeSettingsRelation = function () {
        //implementation
    };
    WordExport.prototype.getCompatibilityModeEnumValue = function (compatibilityMode) {
        switch (compatibilityMode) {
            case 'Word2013':
                return 0;
            case 'Word2003':
                return 1;
            case 'Word2007':
                return 2;
            case 'Word2010':
                return 3;
        }
    };
    WordExport.prototype.serializeHeaderFooters = function () {
        this.isHeaderFooter = true;
        this.serializeHeaderFooter('EvenFooter');
        this.serializeHeaderFooter('EvenHeader');
        this.serializeHeaderFooter('FirstPageFooter');
        this.serializeHeaderFooter('FirstPageHeader');
        this.serializeHeaderFooter('OddFooter');
        this.serializeHeaderFooter('OddHeader');
        this.isHeaderFooter = false;
    };
    // Serializes the Header/Footer
    WordExport.prototype.serializeHeaderFooter = function (hfType) {
        if (this.headersFooters.length === 0) {
            return;
        }
        var headerFooterPath;
        var headerFooterRelsPath;
        if (!this.headersFooters.containsKey(hfType)) {
            return;
        }
        var hfColl = this.headersFooters.get(hfType);
        var hf = undefined;
        for (var i = 0; i < hfColl.keys.length; i++) {
            var id = hfColl.keys[i];
            hf = hfColl.get(id);
            if (hfType === 'EvenHeader' || hfType === 'FirstPageHeader' ||
                hfType === 'OddHeader') {
                headerFooterPath = this.headerPath + id.replace('rId', '') + '.xml';
                headerFooterRelsPath = this.headerRelationPath + id.replace('rId', '') + '.xml.rels';
                this.serializeHeader(hf, id, headerFooterPath, headerFooterRelsPath);
            }
            else {
                headerFooterPath = this.footerPath + id.replace('rId', '') + '.xml';
                headerFooterRelsPath = this.footerRelationPath + id.replace('rId', '') + '.xml.rels';
                this.serializeFooter(hf, id, headerFooterPath, headerFooterRelsPath);
            }
        }
    };
    // Serialize the header part
    WordExport.prototype.serializeHeader = function (header, id, headerFooterPath, headerFooterRelsPath) {
        this.headerFooter = header;
        var writer = new XmlWriter();
        writer.writeStartElement('w', 'hdr', this.wNamespace);
        this.writeHFCommonAttributes(writer);
        var owner = this.blockOwner;
        this.blockOwner = header;
        this.serializeBodyItems(writer, header[blocksProperty[this.keywordIndex]], true);
        this.blockOwner = owner;
        writer.writeEndElement();
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, headerFooterPath);
        this.mArchive.addItem(zipArchiveItem);
        this.serializeHFRelations(id, headerFooterRelsPath);
        this.headerFooter = undefined;
    };
    // Serializes the HeaderFooter relations
    WordExport.prototype.serializeHFRelations = function (hfId, headerFooterRelsPath) {
        var hasHFImage = this.headerFooterImages.containsKey(hfId);
        // let hasHFHyperlinks = HeaderFooterHyperlinks.ContainsKey(hfId);
        // let hasHFInclPics = HeaderFooterInclPicUrls.ContainsKey(hfId);
        // let hasHFAlternateChunks = HeaderFooterAlternateChunks.ContainsKey(hfId);
        if (hasHFImage) { // || hasHFHyperlinks ||hasHFAlternateChunks
            var writer = new XmlWriter();
            writer.writeStartElement(undefined, 'Relationships', this.rpNamespace);
            this.serializeImagesRelations(this.headerFooterImages.get(hfId), writer, false);
            if (this.headerFooterSvgImages.containsKey(hfId)) {
                this.serializeSvgImageRelation(this.headerFooterSvgImages.get(hfId), writer);
            }
            // if (hasHFHyperlinks)
            //     SerializeHyperlinkRelations(stream, HeaderFooterHyperlinks[hfId]);
            // if (hasHFAlternateChunks)
            //     SerializeAltChunkRelations(stream, HeaderFooterAlternateChunks[hfId]);
            // if (hasHFInclPics)
            //     SerializeIncludePictureUrlRelations(stream, HeaderFooterInclPicUrls[hfId]);
            // if (HFOleContainers.ContainsKey(hfId))
            // {
            //     AddOLEToZip(HFOleContainers[hfId]);
            // }
            // if (HFRelations.ContainsKey(hfId))
            //     SerializeHFCommonRelations(stream, HFRelations[hfId]);
            writer.writeEndElement();
            var zipArchiveItem = new ZipArchiveItem(writer.buffer, headerFooterRelsPath);
            this.mArchive.addItem(zipArchiveItem);
        }
        else {
            return;
        }
    };
    WordExport.prototype.writeHFCommonAttributes = function (writer) {
        writer.writeAttributeString('xmlns', 'v', undefined, this.vNamespace);
        writer.writeAttributeString('xmlns', 'w10', undefined, this.w10Namespace);
        writer.writeAttributeString('xmlns', 'o', undefined, this.oNamespace);
        writer.writeAttributeString('xmlns', 've', undefined, this.veNamespace);
        writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
        writer.writeAttributeString('xmlns', 'm', undefined, this.mNamespace);
        writer.writeAttributeString('xmlns', 'wne', undefined, this.wneNamespace);
        writer.writeAttributeString('xmlns', 'a', undefined, this.aNamespace);
        writer.writeAttributeString('xmlns', 'pic', undefined, this.pictureNamespace);
        writer.writeAttributeString('xmlns', 'wp', undefined, this.wpNamespace);
        writer.writeAttributeString('xmlns', 'wpc', undefined, this.wpCanvasNamespace);
        writer.writeAttributeString('xmlns', 'wp14', undefined, this.wpDrawingNamespace);
        this.writeDup(writer);
        writer.writeAttributeString('xmlns', 'wps', undefined, this.wpShapeNamespace);
        writer.writeAttributeString('ve', 'Ignorable', undefined, 'w14 w15 wp14');
    };
    // Serailize the footer and its relations
    WordExport.prototype.serializeFooter = function (footer, id, headerFooterPath, headerFooterRelsPath) {
        this.headerFooter = footer;
        var writer = new XmlWriter();
        writer.writeStartElement('w', 'ftr', this.wNamespace);
        this.writeHFCommonAttributes(writer);
        this.serializeBodyItems(writer, footer[blocksProperty[this.keywordIndex]], true);
        writer.writeEndElement();
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, headerFooterPath);
        this.mArchive.addItem(zipArchiveItem);
        this.serializeHFRelations(id, headerFooterRelsPath);
    };
    WordExport.prototype.serializeDocumentRelations = function () {
        var writer = new XmlWriter();
        writer.writeStartElement(undefined, 'Relationships', this.rpNamespace);
        this.serializeRelationShip(writer, this.getNextRelationShipID(), this.stylesRelType, 'styles.xml');
        this.serializeRelationShip(writer, this.getNextRelationShipID(), this.settingsRelType, 'settings.xml');
        if (this.document[endnotesProperty[this.keywordIndex]]) {
            this.serializeRelationShip(writer, this.getNextRelationShipID(), this.endnoteRelType, 'endnotes.xml');
        }
        if (this.document[footnotesProperty[this.keywordIndex]]) {
            this.serializeRelationShip(writer, this.getNextRelationShipID(), this.footnoteRelType, 'footnotes.xml');
        }
        if (this.mComments.length > 0) {
            if (!(this.mComments.length === 1 && this.mComments[0].text === '')) {
                this.serializeRelationShip(writer, this.getNextRelationShipID(), this.commentsRelType, 'comments.xml');
                this.serializeRelationShip(writer, this.getNextRelationShipID(), this.commentsExRelType, 'commentsExtended.xml');
            }
        }
        if (!isNullOrUndefined(this.mThemes)) {
            this.serializeRelationShip(writer, this.getNextRelationShipID(), this.ThemeRelType, 'theme/theme1.xml');
        }
        if (this.document[listsProperty[this.keywordIndex]].length > 0) {
            this.serializeRelationShip(writer, this.getNextRelationShipID(), this.numberingRelType, 'numbering.xml');
        }
        //this.serializeFootnoteEndnoteRelations(writer);
        this.serializeHeaderFooterRelations(writer);
        //this.serializeFootnoteXMLMapping(writer);
        // if (HasFontTable) {
        //     SerializeRelationShip(docRelstream, GetNextRelationShipID(), this.FontTableRelType, 'fontTable.xml');
        // }
        // SerializeIncludePictureUrlRelations(docRelstream, InclPicFieldUrl);
        // //// Creating relationships for every hyperlink and image containing in the document
        this.serializeImagesRelations(this.documentImages, writer, false);
        this.serializeSvgImageRelation(this.svgImages, writer);
        // serialize custom xml
        this.serializeCustomXMLMapping(this.mCustomXML, writer);
        // serialize chart relations
        this.serializeChartDocumentRelations(this.documentCharts, writer);
        this.serializeExternalLinkImages(writer);
        // if (HasHyperlink && HyperlinkTargets.length > 0) {
        //     SerializeHyperlinkRelations(docRelstream, HyperlinkTargets);
        // }
        // if (m_document.HasMacros
        //     && IsMacroEnabled)
        //     SerializeRelationShip(docRelstream, GetNextRelationShipID(), this.VbaProjectRelType, this.VbaProject);
        writer.writeEndElement();
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.wordRelationPath);
        this.mArchive.addItem(zipArchiveItem);
        this.headerFooter = undefined;
    };
    // serialize chart relations
    WordExport.prototype.serializeChartDocumentRelations = function (charts, writer) {
        if (charts.length > 0) {
            var keys = charts.keys;
            for (var i = 1; i <= keys.length; i++) {
                this.serializeRelationShip(writer, keys[i - 1], this.chartRelType, 'charts/chart' + i + '.xml');
            }
        }
    };
    WordExport.prototype.serializeChartRelations = function () {
        var writer = new XmlWriter();
        this.resetChartRelationShipId();
        writer.writeStartElement(undefined, 'Relationships', this.rpNamespace);
        var chartColorPath = 'colors' + this.chartCount + '.xml';
        var chartRelationPath = this.chartPath + '/_rels/chart' + this.chartCount + '.xml.rels';
        var chartExcelPath = '../embeddings/Microsoft_Excel_Worksheet' + this.chartCount + '.xlsx';
        this.serializeRelationShip(writer, this.getNextChartRelationShipID(), this.packageRelType, chartExcelPath);
        this.serializeRelationShip(writer, this.getNextChartRelationShipID(), this.chartColorStyleRelType, chartColorPath);
        writer.writeEndElement(); // end of relationships
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, chartRelationPath);
        this.mArchive.addItem(zipArchiveItem);
    };
    // Serializes the image relations
    WordExport.prototype.serializeImagesRelations = function (images, writer, isSvg) {
        if (images.length > 0) {
            var imagePath = '';
            var base64ImageString = void 0;
            var keys = images.keys;
            for (var i = 0; i < keys.length; i++) {
                var mImage = images.get(keys[i]);
                var imageStringInfo = void 0;
                if (typeof mImage === 'string' && this.startsWith(mImage, 'data')) {
                    base64ImageString = mImage;
                }
                else {
                    imageStringInfo = this.getBase64ImageString(mImage);
                    base64ImageString = imageStringInfo.imageString;
                    if (HelperMethods.parseBoolValue(mImage[isMetaFileProperty[this.keywordIndex]])) {
                        var format = HelperMethods.formatClippedString(imageStringInfo.metaFileImageString).extension;
                        if (format !== '.svg' || isSvg) {
                            base64ImageString = imageStringInfo.metaFileImageString;
                        }
                    }
                }
                if (isNullOrUndefined(base64ImageString)) {
                    imagePath = this.imagePath + '/0.jpeg';
                    this.serializeRelationShip(writer, keys[i], this.imageRelType, imagePath.replace('word/', ''));
                }
                else {
                    var imageInfo = HelperMethods.formatClippedString(base64ImageString);
                    var extension = imageInfo.extension;
                    var formatClippedString = imageInfo.formatClippedString;
                    imagePath = this.imagePath + keys[i] + extension;
                    this.serializeRelationShip(writer, keys[i], this.imageRelType, imagePath.replace('word/', ''));
                    //if (m_archive.Find(imagePath.Replace('\\', '/')) === -1)
                    // {
                    var imageBlob = void 0;
                    if (this.startsWith(base64ImageString, 'data:image/svg+xml;utf8,')) {
                        imageBlob = new Blob([formatClippedString]);
                    }
                    else {
                        imageBlob = new Blob([this.encodedString(formatClippedString)]);
                    }
                    var zipArchiveItem = new ZipArchiveItem(imageBlob, imagePath);
                    // let TestArchive = new ZipArchive();
                    this.mArchive.addItem(zipArchiveItem);
                    // TestArchive.save('image.zip').then(function (): void {
                    //     TestArchive.destroy();
                    // });
                    // }
                }
            }
        }
    };
    WordExport.prototype.serializeSvgImageRelation = function (svgImages, writer) {
        this.serializeImagesRelations(svgImages, writer, true);
    };
    /**
     * @private
     */
    WordExport.prototype.encodedString = function (input) {
        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var chr1;
        var chr2;
        var chr3;
        var encode1;
        var encode2;
        var encode3;
        var encode4;
        var count = 0;
        var resultIndex = 0;
        /*let dataUrlPrefix: string = 'data:';*/
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        var totalLength = input.length * 3 / 4;
        if (input.charAt(input.length - 1) === keyStr.charAt(64)) {
            totalLength--;
        }
        if (input.charAt(input.length - 2) === keyStr.charAt(64)) {
            totalLength--;
        }
        if (totalLength % 1 !== 0) {
            // totalLength is not an integer, the length does not match a valid
            // base64 content. That can happen if:
            // - the input is not a base64 content
            // - the input is *almost* a base64 content, with a extra chars at the
            // beginning or at the end
            // - the input uses a base64 variant (base64url for example)
            throw new Error('Invalid base64 input, bad content length.');
        }
        var output = new Uint8Array(totalLength | 0);
        while (count < input.length) {
            encode1 = keyStr.indexOf(input.charAt(count++));
            encode2 = keyStr.indexOf(input.charAt(count++));
            encode3 = keyStr.indexOf(input.charAt(count++));
            encode4 = keyStr.indexOf(input.charAt(count++));
            chr1 = (encode1 << 2) | (encode2 >> 4);
            chr2 = ((encode2 & 15) << 4) | (encode3 >> 2);
            chr3 = ((encode3 & 3) << 6) | encode4;
            output[resultIndex++] = chr1;
            if (encode3 !== 64) {
                output[resultIndex++] = chr2;
            }
            if (encode4 !== 64) {
                output[resultIndex++] = chr3;
            }
        }
        return output;
    };
    WordExport.prototype.serializeExternalLinkImages = function (writer) {
        var imagePath = '';
        var keys = this.externalImages.keys;
        for (var i = 0; i < this.externalImages.keys.length; i++) {
            this.serializeRelationShip(writer, keys[i], this.imageRelType, this.externalImages.get(keys[i]));
        }
    };
    // Serializes the HeaderFooters relations to the document relations stream
    WordExport.prototype.serializeHeaderFooterRelations = function (writer) {
        this.serializeHFRelation(writer, 'EvenFooter');
        this.serializeHFRelation(writer, 'EvenHeader');
        this.serializeHFRelation(writer, 'FirstPageFooter');
        this.serializeHFRelation(writer, 'FirstPageHeader');
        this.serializeHFRelation(writer, 'OddFooter');
        this.serializeHFRelation(writer, 'OddHeader');
    };
    // Serializes the headers footers relations.
    WordExport.prototype.serializeHFRelation = function (writer, hfType) {
        var headerFooterPath = '';
        var relType;
        if (!this.headersFooters.containsKey(hfType)) {
            return;
        }
        var hfColl = this.headersFooters.get(hfType);
        for (var i = 0; i < hfColl.keys.length; i++) {
            var id = hfColl.keys[i];
            if (hfType === 'EvenHeader' || hfType === 'FirstPageHeader' ||
                hfType === 'OddHeader') {
                headerFooterPath = 'header' + id.replace('rId', '') + '.xml';
                relType = this.headerRelType;
            }
            else {
                headerFooterPath = 'footer' + id.replace('rId', '') + '.xml';
                relType = this.footerRelType;
            }
            this.serializeRelationShip(writer, id, relType, headerFooterPath);
        }
    };
    // Serializes the relationship
    WordExport.prototype.serializeRelationShip = function (writer, relationshipID, relationshipType, targetPath) {
        writer.writeStartElement(undefined, 'Relationship', undefined);
        writer.writeAttributeString(undefined, 'Id', undefined, relationshipID);
        writer.writeAttributeString(undefined, 'Type', undefined, relationshipType);
        writer.writeAttributeString(undefined, 'Target', undefined, targetPath.replace('\\', '/').replace('\v', ''));
        if (relationshipType === this.hyperlinkRelType || this.startsWith(targetPath, 'http://') || this.startsWith(targetPath, 'https://') || this.startsWith(targetPath, 'file:///')) {
            // Uri targetUri;
            // if ((!targetPath.StartsWith('file:///')) && Uri.TryCreate(targetPath, UriKind.Absolute, out targetUri))
            // {
            //     //Handled using Try catch to avoid exception if the Host name type is None because in 
            //Silverlight 'HostNameType' property is not available.
            //     try
            //     {
            //         m_writer.WriteAttributeString('Target', targetUri.AbsoluteUri);
            //     }
            //     catch
            //     {
            //         m_writer.WriteAttributeString('Target', targetPath.Replace('\\', '/').Replace(ControlChar.LineBreak, string.Empty));
            //     }
            // }
            // else
            // {
            //     m_writer.WriteAttributeString('Target', targetPath.Replace('\\', '/').Replace(ControlChar.LineBreak, string.Empty));
            // }
            writer.writeAttributeString(undefined, 'TargetMode', undefined, 'External');
        }
        writer.writeEndElement();
    };
    // Get the next relationship ID
    WordExport.prototype.getNextRelationShipID = function () {
        return 'rId' + (++this.mRelationShipID);
    };
    WordExport.prototype.getEFNextRelationShipID = function () {
        return (++this.efRelationShipId).toString();
    };
    WordExport.prototype.serializeGeneralRelations = function () {
        var writer = new XmlWriter();
        this.resetRelationShipID();
        writer.writeStartElement(undefined, 'Relationships', this.rpNamespace);
        this.serializeRelationShip(writer, this.getNextRelationShipID(), this.documentRelType, this.documentPath);
        // this.serializeRelationShip(writer, this.getNextRelationShipID(), this.AppRelType, this.appPath);
        // this.serializeRelationShip(writer, this.getNextRelationShipID(), this.CoreRelType, this.corePath);
        //End of Relationships tag
        writer.writeEndElement();
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.generalRelationPath);
        this.mArchive.addItem(zipArchiveItem);
    };
    WordExport.prototype.serializeContentTypes = function (contentType, formatType) {
        var writer = new XmlWriter();
        writer.writeStartElement(undefined, 'Types', 'http://schemas.openxmlformats.org/package/2006/content-types');
        //if (m_hasOleObject)
        //{
        //    //<Default Extension='bin' ContentType='application/vnd.openxmlformats-officedocument.oleObject'/>
        //    SerializeDefaultContentType(contentStream, 'bin', 'application/vnd.openxmlformats-officedocument.oleObject');
        //}
        this.serializeDefaultContentType(writer, 'rels', this.relationContentType);
        this.serializeDefaultContentType(writer, 'xml', this.xmlContentType);
        // if (m_hasEmbedFonts && !string.IsNullOrEmpty(type))
        // {
        //     SerializeDefaultContentType(contentStream,type, this.fontContentType);
        // }
        if (this.documentImages.length > 0 || this.externalImages.length > 0 || this.headerFooterImages.length > 0) {
            this.serializeDefaultContentType(writer, 'png', 'image/png');
            this.serializeDefaultContentType(writer, 'bmp', 'image/bmp');
            this.serializeDefaultContentType(writer, 'emf', 'image/x-emf');
            this.serializeDefaultContentType(writer, 'wmf', 'image/x-wmf');
            this.serializeDefaultContentType(writer, 'gif', 'image/gif');
            this.serializeDefaultContentType(writer, 'ico', 'image/x-icon');
            this.serializeDefaultContentType(writer, 'tif', 'image/tiff');
            this.serializeDefaultContentType(writer, 'tiff', 'image/tiff');
            this.serializeDefaultContentType(writer, 'jpeg', 'image/jpeg');
            this.serializeDefaultContentType(writer, 'jpg', 'image/jpeg');
            this.serializeDefaultContentType(writer, 'svg', 'image/svg+xml');
        }
        // if (m_document.HasMacros
        //     && IsMacroEnabled && !m_isSkipBinExtension)
        // {
        //     SerializeDefaultContentType(contentStream, 'bin', this.VbaProjectContentType);
        //     m_isSkipBinExtension = true;
        // }
        // if (m_hasOleObject)
        // {
        //     SerializeOleContentType(contentStream);
        // }
        //document.xml
        if (formatType == 'Docx') {
            this.serializeOverrideContentType(writer, this.documentPath, this.documentContentType);
        }
        else if (formatType == 'Dotx') {
            this.serializeOverrideContentType(writer, this.documentPath, this.TemplateContentType);
        }
        //<Override PartName='/word/numbering.xml' ContentType='application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml'/>
        // if (HasNumbering) {
        this.serializeOverrideContentType(writer, this.numberingPath, this.numberingContentType);
        // }
        //Add the header/footer Alternate chunks
        // if (HeaderFooterAlternateChunks.length > 0) {
        //     foreach(Dictionary < string, string > item in m_headerFooterAlternateChunks.Values)
        //     AddAlternateChunkItem(item);
        // }
        //styles.xml
        this.serializeOverrideContentType(writer, this.stylePath, this.stylesContentType);
        //settings.xml
        this.serializeOverrideContentType(writer, this.settingsPath, this.settingsContentType);
        this.serializeOverrideContentType(writer, this.commentsPath, this.commentsContentType);
        this.serializeOverrideContentType(writer, this.themePath, this.themeContentType);
        //comments.xml
        this.serializeOverrideContentType(writer, this.commentsExtendedPath, this.commentsExContentType);
        //charts.xml
        if (this.chartCount > 0) {
            var count = 1;
            this.serializeDefaultContentType(writer, 'xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            while (count <= this.chartCount) {
                this.serializeOverrideContentType(writer, 'word/charts/chart' + count + '.xml', this.chartsContentType);
                this.serializeOverrideContentType(writer, 'word/charts/colors' + count + '.xml', this.chartColorStyleContentType);
                count++;
            }
        }
        // Custom XML mapping
        if (this.customXMLProps.length > 0) {
            for (var i = 0; i < this.customXMLProps.length; i++) {
                this.serializeOverrideContentType(writer, this.customXMLProps[i], this.customXmlContentType);
            }
        }
        //             //core.xml
        //             SerializeOverrideContentType(contentStream, this.corePath, this.CoreContentType);
        //             //app.xml
        //             SerializeOverrideContentType(contentStream, this.appPath, this.AppContentType);
        //             //custom.xml
        //             if (!isNullOrUndefined(m_document.CustomDocumentProperties) && m_document.CustomDocumentProperties.length > 0)
        //                 SerializeOverrideContentType(contentStream, this.CustomPath, this.CustomContentType);
        // #if Chart
        //             if (m_hasChart)
        //                 SerializeChartContentType(contentStream);
        // #endif
        this.serializeHFContentTypes(writer);
        this.SerializeEFContentTypes(writer);
        // WriteXmlItemsContentTypes(contentStream);
        //End of Types tag
        writer.writeEndElement();
        var zipArchiveItem = new ZipArchiveItem(writer.buffer, this.contentTypesPath);
        this.mArchive.addItem(zipArchiveItem);
    };
    // Serializes the HeaderFooter content types
    WordExport.prototype.serializeHFContentTypes = function (writer) {
        this.serializeHeaderFootersContentType(writer, 'EvenFooter');
        this.serializeHeaderFootersContentType(writer, 'EvenHeader');
        this.serializeHeaderFootersContentType(writer, 'FirstPageFooter');
        this.serializeHeaderFootersContentType(writer, 'FirstPageHeader');
        this.serializeHeaderFootersContentType(writer, 'OddFooter');
        this.serializeHeaderFootersContentType(writer, 'OddHeader');
    };
    // Serializes the HeaderFooter content types.
    WordExport.prototype.serializeHeaderFootersContentType = function (writer, headerFooterType) {
        var contentType;
        var partName;
        if (!this.headersFooters.containsKey(headerFooterType)) {
            return;
        }
        var hfColl = this.headersFooters.get(headerFooterType);
        for (var i = 0; i < hfColl.keys.length; i++) {
            var id = hfColl.keys[i];
            if (headerFooterType === 'EvenHeader' || headerFooterType === 'FirstPageHeader' ||
                headerFooterType === 'OddHeader') {
                partName = this.headerPath + id.replace('rId', '') + '.xml';
                contentType = this.headerContentType;
            }
            else {
                partName = this.footerPath + id.replace('rId', '') + '.xml';
                contentType = this.footerContentType;
            }
            this.serializeOverrideContentType(writer, partName, contentType);
        }
    };
    WordExport.prototype.SerializeEFContentTypes = function (writer) {
        this.serializeEFContentType(writer);
    };
    // Serializes the HeaderFooter content types.
    WordExport.prototype.serializeEFContentType = function (writer) {
        var contentType;
        var partName;
        partName = this.endnotesPath;
        contentType = this.endnoteContentType;
        this.serializeOverrideContentType(writer, partName, contentType);
        partName = this.footnotesPath;
        contentType = this.footnoteContentType;
        this.serializeOverrideContentType(writer, partName, contentType);
    };
    // Serializes the Override content type.
    WordExport.prototype.serializeOverrideContentType = function (writer, partName, contentType) {
        writer.writeStartElement(undefined, 'Override', undefined);
        writer.writeAttributeString(undefined, 'PartName', undefined, '/' + partName.replace('\\', '/'));
        writer.writeAttributeString(undefined, 'ContentType', undefined, contentType);
        writer.writeEndElement();
    };
    // Serializes the default content type
    WordExport.prototype.serializeDefaultContentType = function (writer, extension, contentType) {
        writer.writeStartElement(undefined, 'Default', undefined);
        writer.writeAttributeString(undefined, 'Extension', undefined, extension);
        writer.writeAttributeString(undefined, 'ContentType', undefined, contentType);
        writer.writeEndElement();
    };
    // Reset the relationship id counter
    WordExport.prototype.resetRelationShipID = function () {
        this.mRelationShipID = 0;
    };
    WordExport.prototype.resetExcelRelationShipId = function () {
        this.eRelationShipId = 0;
    };
    WordExport.prototype.resetChartRelationShipId = function () {
        this.cRelationShipId = 0;
    };
    WordExport.prototype.close = function () {
        //Implement
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    /* eslint-enable */
    WordExport.prototype.getExportAutoShapeType = function (value) {
        switch (value) {
            case 1:
                return 'rect';
            case 2:
                return 'roundRect';
            case 3:
                return 'straightConnector1';
            case 4:
                return 'ellipse';
            case 5:
                return 'triangle';
            case 6:
                return 'rtTriangle';
            case 7:
                return 'parallelogram';
            case 8:
                return 'trapezoid';
            case 9:
                return 'diamond';
            case 10:
                return 'pentagon';
            case 11:
                return 'hexagon';
            case 12:
                return 'heptagon';
            case 13:
                return 'octagon';
            case 14:
                return 'decagon';
            case 15:
                return 'dodecagon';
            case 16:
                return 'chord';
            case 17:
                return 'teardrop';
            case 18:
                return 'frame';
            case 19:
                return 'halfFrame';
            case 20:
                return 'corner';
            case 21:
                return 'pie';
            case 22:
                return 'diagStripe';
            case 23:
                return 'plus';
            case 24:
                return 'plaque';
            case 25:
                return 'can';
            case 26:
                return 'cube';
            case 27:
                return 'bevel';
            case 28:
                return 'donut';
            case 29:
                return 'noSmoking';
            case 30:
                return 'blockArc';
            case 31:
                return 'foldedCorner';
            case 32:
                return 'smileyFace';
            case 33:
                return 'heart';
            case 34:
                return 'lightningBolt';
            case 35:
                return 'sun';
            case 36:
                return 'moon';
            case 37:
                return 'cloud';
            case 38:
                return 'arc';
            case 39:
                return 'bracketPair';
            case 40:
                return 'bracePair';
            case 41:
                return 'leftBracket';
            case 42:
                return 'rightBracket';
            case 43:
                return 'leftBrace';
            case 44:
                return 'rightBrace';
            case 45:
                return 'flowChartProcess';
            case 46:
                return 'flowChartAlternateProcess';
            case 47:
                return 'flowChartDecision';
            case 48:
                return 'flowChartInputOutput';
            case 49:
                return 'flowChartPredefinedProcess';
            case 50:
                return 'flowChartInternalStorage';
            case 51:
                return 'flowChartDocument';
            case 52:
                return 'flowChartMultidocument';
            case 53:
                return 'flowChartTerminator';
            case 54:
                return 'flowChartPreparation';
            case 55:
                return 'flowChartManualInput';
            case 56:
                return 'flowChartManualOperation';
            case 57:
                return 'flowChartConnector';
            case 58:
                return 'flowChartOffpageConnector';
            case 59:
                return 'flowChartPunchedCard';
            case 60:
                return 'flowChartPunchedTape';
            case 61:
                return 'flowChartSummingJunction';
            case 62:
                return 'flowChartOr';
            case 63:
                return 'flowChartCollate';
            case 64:
                return 'flowChartSort';
            case 65:
                return 'flowChartExtract';
            case 66:
                return 'flowChartMerge';
            case 67:
                return 'flowChartOnlineStorage';
            case 68:
                return 'flowChartDelay';
            case 69:
                return 'flowChartMagneticTape';
            case 70:
                return 'flowChartMagneticDisk';
            case 71:
                return 'flowChartMagneticDrum';
            case 72:
                return 'flowChartDisplay';
            case 73:
                return 'rightArrow';
            case 74:
                return 'leftArrow';
            case 75:
                return 'upArrow';
            case 76:
                return 'downArrow';
            case 77:
                return 'leftRightArrow';
            case 78:
                return 'upDownArrow';
            case 79:
                return 'quadArrow';
            case 80:
                return 'leftRightUpArrow';
            case 81:
                return 'bentArrow';
            case 82:
                return 'uturnArrow';
            case 83:
                return 'leftUpArrow';
            case 84:
                return 'bentUpArrow';
            case 85:
                return 'curvedRightArrow';
            case 86:
                return 'curvedLeftArrow';
            case 87:
                return 'curvedUpArrow';
            case 88:
                return 'curvedDownArrow';
            case 89:
                return 'stripedRightArrow';
            case 90:
                return 'notchedRightArrow';
            case 91:
                return 'homePlate';
            case 92:
                return 'chevron';
            case 93:
                return 'rightArrowCallout';
            case 94:
                return 'downArrowCallout';
            case 95:
                return 'leftArrowCallout';
            case 96:
                return 'upArrowCallout';
            case 97:
                return 'leftRightArrowCallout';
            case 98:
                return 'quadArrowCallout';
            case 99:
                return 'circularArrow';
            case 100:
                return 'mathPlus';
            case 101:
                return 'mathMinus';
            case 102:
                return 'mathMultiply';
            case 103:
                return 'mathDivide';
            case 104:
                return 'mathEqual';
            case 105:
                return 'mathNotEqual';
            case 106:
                return 'irregularSeal1';
            case 107:
                return 'irregularSeal2';
            case 108:
                return 'star4';
            case 109:
                return 'star5';
            case 110:
                return 'star6';
            case 111:
                return 'star7';
            case 112:
                return 'star8';
            case 113:
                return 'star10';
            case 114:
                return 'star12';
            case 115:
                return 'star16';
            case 116:
                return 'star24';
            case 117:
                return 'star32';
            case 118:
                return 'ribbon2';
            case 119:
                return 'ribbon';
            case 120:
                return 'ellipseRibbon2';
            case 121:
                return 'ellipseRibbon';
            case 122:
                return 'verticalScroll';
            case 123:
                return 'horizontalScroll';
            case 124:
                return 'wave';
            case 125:
                return 'doubleWave';
            case 126:
                return 'snip1Rect';
            case 127:
                return 'snip2SameRect';
            case 128:
                return 'snip2DiagRect';
            case 129:
                return 'snipRoundRect';
            case 130:
                return 'round1Rect';
            case 131:
                return 'round2SameRect';
            case 132:
                return 'round2DiagRect';
            case 133:
                return 'textNoShape'; //unknown type
            case 134:
                return 'bentConnector3';
            case 135:
                return 'curvedConnector3';
            default:
                return value;
        }
    };
    WordExport.prototype.getAutoShapeTypeEnumValue = function (autoShapeType) {
        switch (autoShapeType) {
            case 'Rectangle':
                return 1;
            case 'RoundedRectangle':
                return 2;
            case 'StraightConnector':
                return 3;
            case 'Oval':
                return 4;
            case 'IsoscelesTriangle':
                return 5;
            case 'RightTriangle':
                return 6;
            case 'Parallelogram':
                return 7;
            case 'Trapezoid':
                return 8;
            case 'Diamond':
                return 9;
            case 'RegularPentagon':
                return 10;
            case 'Hexagon':
                return 11;
            case 'Heptagon':
                return 12;
            case 'Octagon':
                return 13;
            case 'Decagon':
                return 14;
            case 'Dodecagon':
                return 15;
            case 'Chord':
                return 16;
            case 'Teardrop':
                return 17;
            case 'Frame':
                return 18;
            case 'HalfFrame':
                return 19;
            case 'L_Shape':
                return 20;
            case 'Pie':
                return 21;
            case 'DiagonalStripe':
                return 22;
            case 'Cross':
                return 23;
            case 'Plaque':
                return 24;
            case 'Can':
                return 25;
            case 'Cube':
                return 26;
            case 'Bevel':
                return 27;
            case 'Donut':
                return 28;
            case 'NoSymbol':
                return 29;
            case 'BlockArc':
                return 30;
            case 'FoldedCorner':
                return 31;
            case 'SmileyFace':
                return 32;
            case 'Heart':
                return 33;
            case 'LightningBolt':
                return 34;
            case 'Sun':
                return 35;
            case 'Moon':
                return 36;
            case 'Cloud':
                return 37;
            case 'Arc':
                return 38;
            case 'DoubleBracket':
                return 39;
            case 'DoubleBrace':
                return 40;
            case 'LeftBracket':
                return 41;
            case 'RightBracket':
                return 42;
            case 'LeftBrace':
                return 43;
            case 'RightBrace':
                return 44;
            //flowchartShapes
            case 'FlowChartProcess':
                return 45;
            case 'FlowChartAlternateProcess':
                return 46;
            case 'FlowChartDecision':
                return 47;
            case 'FlowChartData':
                return 48;
            case 'FlowChartPredefinedProcess':
                return 49;
            case 'FlowChartInternalStorage':
                return 50;
            case 'FlowChartDocument':
                return 51;
            case 'FlowChartMultiDocument':
                return 52;
            case 'FlowChartTerminator':
                return 53;
            case 'FlowChartPreparation':
                return 54;
            case 'FlowChartManualInput':
                return 55;
            case 'FlowChartManualOperation':
                return 56;
            case 'FlowChartConnector':
                return 57;
            case 'FlowChartOffPageConnector':
                return 58;
            case 'FlowChartCard':
                return 59;
            case 'FlowChartPunchedTape':
                return 60;
            case 'FlowChartSummingJunction':
                return 61;
            case 'FlowChartOr':
                return 62;
            case 'FlowChartCollate':
                return 63;
            case 'FlowChartSort':
                return 64;
            case 'FlowChartExtract':
                return 65;
            case 'FlowChartMerge':
                return 66;
            case 'FlowChartStoredData':
                return 67;
            case 'FlowChartDelay':
                return 68;
            case 'FlowChartSequentialAccessStorage':
                return 69;
            case 'FlowChartMagneticDisk':
                return 70;
            case 'FlowChartDirectAccessStorage':
                return 71;
            case 'FlowChartDisplay':
                return 72;
            // block arrows
            case 'RightArrow':
                return 73;
            case 'LeftArrow':
                return 74;
            case 'UpArrow':
                return 75;
            case 'DownArrow':
                return 76;
            case 'LeftRightArrow':
                return 77;
            case 'UpDownArrow':
                return 78;
            case 'QuadArrow':
                return 79;
            case 'LeftRightUpArrow':
                return 80;
            case 'BentArrow':
                return 81;
            case 'UTurnArrow':
                return 82;
            case 'LeftUpArrow':
                return 83;
            case 'BentUpArrow':
                return 84;
            case 'CurvedRightArrow':
                return 85;
            case 'CurvedLeftArrow':
                return 86;
            case 'CurvedUpArrow':
                return 87;
            case 'CurvedDownArrow':
                return 88;
            case 'StripedRightArrow':
                return 89;
            case 'NotchedRightArrow':
                return 90;
            case 'Pentagon':
                return 91;
            case 'Chevron':
                return 92;
            case 'RightArrowCallout':
                return 93;
            case 'DownArrowCallout':
                return 94;
            case 'LeftArrowCallout':
                return 95;
            case 'UpArrowCallout':
                return 96;
            case 'LeftRightArrowCallout':
                return 97;
            case 'QuadArrowCallout':
                return 98;
            case 'CircularArrow':
                return 99;
            // Equation shapes
            case 'MathPlus':
                return 100;
            case 'MathMinus':
                return 101;
            case 'MathMultiply':
                return 102;
            case 'MathDivision':
                return 103;
            case 'MathEqual':
                return 104;
            case 'MathNotEqual':
                return 105;
            // Stars and Banners
            case 'Explosion1':
                return 106;
            case 'Explosion2':
                return 107;
            case 'Star4Point':
                return 108;
            case 'Star5Point':
                return 109;
            case 'Star6Point':
                return 110;
            case 'Star7Point':
                return 111;
            case 'Star8Point':
                return 112;
            case 'Star10Point':
                return 113;
            case 'Star12Point':
                return 114;
            case 'Star16Point':
                return 115;
            case 'Star24Point':
                return 116;
            case 'Star32Point':
                return 117;
            case 'UpRibbon':
                return 118;
            case 'DownRibbon':
                return 119;
            case 'CurvedUpRibbon':
                return 120;
            case 'CurvedDownRibbon':
                return 121;
            case 'VerticalScroll':
                return 122;
            case 'HorizontalScroll':
                return 123;
            case 'Wave':
                return 124;
            case 'DoubleWave':
                return 125;
            // Rectangles
            case 'SnipSingleCornerRectangle':
                return 126;
            case 'SnipSameSideCornerRectangle':
                return 127;
            case 'SnipDiagonalCornerRectangle':
                return 128;
            case 'SnipAndRoundSingleCornerRectangle':
                return 129;
            case 'RoundSingleCornerRectangle':
                return 130;
            case 'RoundSameSideCornerRectangle':
                return 131;
            case 'RoundDiagonalCornerRectangle':
                return 132;
            case 'Unknown':
                return 133;
            case 'ElbowConnector':
                return 134;
            case 'CurvedConnector':
                return 135;
            default:
                return 0;
        }
    };
    return WordExport;
}());
export { WordExport };
