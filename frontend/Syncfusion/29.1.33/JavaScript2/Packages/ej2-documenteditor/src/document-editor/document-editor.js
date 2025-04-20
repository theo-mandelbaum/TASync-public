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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, Property, NotifyPropertyChanges, Event, ChildProperty, classList, Complex, formatUnit, updateCSSText } from '@syncfusion/ej2-base';
import { isNullOrUndefined, L10n, Browser } from '@syncfusion/ej2-base';
import { Save } from '@syncfusion/ej2-file-utils';
import { XmlHttpRequestHandler, beforeXmlHttpRequestSend } from './index';
import { LayoutViewer, PageLayoutViewer, WebLayoutViewer, BulletsAndNumberingDialog } from './index';
import { Print } from './index';
import { BodyWidget, ParagraphWidget } from './index';
import { WSectionFormat, WParagraphFormat, WCharacterFormat } from './index';
import { SfdtReader } from './index';
import { Selection } from './index';
import { Editor, EditorHistory } from './index';
import { WStyles } from './index';
import { Search } from './index';
import { OptionsPane } from './index';
import { XmlPane } from './index';
import { WordExport } from './index';
import { TextExport } from './index';
import { ContextMenu } from './index';
import { ImageResizer } from './index';
import { SfdtExport } from './index';
import { HyperlinkDialog, TableDialog, BookmarkDialog, StylesDialog, TableOfContentsDialog } from './index';
import { PageSetupDialog, ParagraphDialog, ListDialog, StyleDialog, FontDialog } from './index';
import { TablePropertiesDialog, BordersAndShadingDialog, CellOptionsDialog, TableOptionsDialog } from './index';
import { SpellChecker } from './implementation/spell-check/spell-checker';
import { SpellCheckDialog } from './implementation/dialogs/spellCheck-dialog';
import { DocumentHelper, listsProperty, abstractListsProperty } from './index';
import { CheckBoxFormFieldDialog, DropDownFormField, TextFormField, CheckBoxFormField } from './implementation/index';
import { TextFormFieldDialog } from './implementation/dialogs/form-field-text-dialog';
import { DropDownFormFieldDialog } from './implementation/dialogs/form-field-drop-down-dialog';
import { RevisionCollection } from './implementation/track-changes/track-changes';
import { NotesDialog } from './implementation/dialogs/notes-dialog';
import { ContentControl, FootNoteWidget, ImageElementBox, TextElementBox } from './implementation/viewer/page';
import { internalZoomFactorChange, contentChangeEvent, documentChangeEvent, selectionChangeEvent, zoomFactorChangeEvent, beforeFieldFillEvent, afterFieldFillEvent, serviceFailureEvent, viewChangeEvent, customContextMenuSelectEvent, customContextMenuBeforeOpenEvent, internalviewChangeEvent, internalDocumentEditorSettingsChange, trackChanges, internalOptionPaneChange, documentLoadFailedEvent, beforecontentControlFillEvent, aftercontentControlFillEvent } from './base/constants';
import { Optimized, Regular, HelperMethods } from './index';
import { ColumnsDialog } from './implementation/dialogs/columns-dialog';
import { ZipArchiveItem, ZipArchive } from '@syncfusion/ej2-compression';
import { TabDialog } from './implementation/dialogs/tab-dialog';
import { RulerHelper } from './implementation/utility/dom-util';
import { DatePickerDialog } from './implementation/dialogs/datepicker-dialog';
import { ContentControlPropertiesDialog } from './implementation/dialogs/content-control-properties-dialog';
import { PicContentControlDialog } from './implementation/dialogs/pic-contentControl-dialog';
import { DialogUtility, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { Comment } from './base/events-helper';
/**
 * The `DocumentEditorSettings` module is used to provide the customize property of Document Editor.
 */
var DocumentEditorSettings = /** @class */ (function (_super) {
    __extends(DocumentEditorSettings, _super);
    function DocumentEditorSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], DocumentEditorSettings.prototype, "popupTarget", void 0);
    __decorate([
        Property('#FFE97F')
    ], DocumentEditorSettings.prototype, "searchHighlightColor", void 0);
    __decorate([
        Property(['Algerian', 'Arial', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Courier New', 'Georgia', 'Impact', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Symbol', 'Times New Roman', 'Verdana', 'Wingdings'])
    ], DocumentEditorSettings.prototype, "fontFamilies", void 0);
    __decorate([
        Property({ shadingColor: '#cfcfcf', applyShading: true, selectionColor: '#cccccc', formFillingMode: 'Popup' })
    ], DocumentEditorSettings.prototype, "formFieldSettings", void 0);
    __decorate([
        Property({ interval: 2000, itertationCount: 5 })
    ], DocumentEditorSettings.prototype, "autoResizeSettings", void 0);
    __decorate([
        Property({ roomName: '', editableRegionColor: '#22b24b', lockedRegionColor: '#f44336' })
    ], DocumentEditorSettings.prototype, "collaborativeEditingSettings", void 0);
    __decorate([
        Property(1)
    ], DocumentEditorSettings.prototype, "printDevicePixelRatio", void 0);
    __decorate([
        Property(true)
    ], DocumentEditorSettings.prototype, "enableOptimizedTextMeasuring", void 0);
    __decorate([
        Property(true)
    ], DocumentEditorSettings.prototype, "allowDragAndDrop", void 0);
    __decorate([
        Property(32767)
    ], DocumentEditorSettings.prototype, "maximumRows", void 0);
    __decorate([
        Property(63)
    ], DocumentEditorSettings.prototype, "maximumColumns", void 0);
    __decorate([
        Property(false)
    ], DocumentEditorSettings.prototype, "showHiddenMarks", void 0);
    __decorate([
        Property(false)
    ], DocumentEditorSettings.prototype, "showBookmarks", void 0);
    __decorate([
        Property(true)
    ], DocumentEditorSettings.prototype, "highlightEditableRanges", void 0);
    __decorate([
        Property(true)
    ], DocumentEditorSettings.prototype, "optimizeSfdt", void 0);
    __decorate([
        Property(false)
    ], DocumentEditorSettings.prototype, "showRuler", void 0);
    __decorate([
        Property({ mode: 'Picker', modeSwitcher: true, showButtons: true })
    ], DocumentEditorSettings.prototype, "colorPickerSettings", void 0);
    __decorate([
        Property(false)
    ], DocumentEditorSettings.prototype, "showNavigationPane", void 0);
    __decorate([
        Property({ mentionChar: '@' })
    ], DocumentEditorSettings.prototype, "mentionSettings", void 0);
    __decorate([
        Property(false)
    ], DocumentEditorSettings.prototype, "pasteAsNewParagraph", void 0);
    return DocumentEditorSettings;
}(ChildProperty));
export { DocumentEditorSettings };
/**
 * Represents the settings and properties of the document that is opened in Document editor component.
 */
var DocumentSettings = /** @class */ (function (_super) {
    __extends(DocumentSettings, _super);
    function DocumentSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Word2013')
    ], DocumentSettings.prototype, "compatibilityMode", void 0);
    return DocumentSettings;
}(ChildProperty));
export { DocumentSettings };
/**
 * Represents the settings required for resizing the Document editor automatically when the visibility of parent element changed.
 */
var AutoResizeSettings = /** @class */ (function (_super) {
    __extends(AutoResizeSettings, _super);
    function AutoResizeSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(2000)
    ], AutoResizeSettings.prototype, "interval", void 0);
    __decorate([
        Property(5)
    ], AutoResizeSettings.prototype, "iterationCount", void 0);
    return AutoResizeSettings;
}(ChildProperty));
export { AutoResizeSettings };
/**
 * The Document editor component is used to draft, save or print rich text contents as page by page.
 */
var DocumentEditor = /** @class */ (function (_super) {
    __extends(DocumentEditor, _super);
    /**
     * Initializes a new instance of the DocumentEditor class.
     *
     * @param {DocumentEditorModel} options Specifies the document editor model.
     * @param {string | HTMLElement} element Specifies the element.
     */
    function DocumentEditor(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.enableHeaderFooterIn = false;
        /**
         * @private
         */
        _this.isShiftingEnabled = false;
        /**
         * @private
         */
        _this.isContainerResize = false;
        /**
         * @private
         */
        _this.enableXMLPane = false;
        /**
         * @private
         */
        _this.isLayoutEnabled = true;
        /**
         * @private
         */
        _this.isPastingContent = false;
        /**
         * @private
         */
        _this.isOnIndent = false;
        /**
         * @private
         */
        _this.isTableMarkerDragging = false;
        /**
         * @private
         */
        _this.startXPosition = 0;
        /**
         * @private
         */
        _this.parser = undefined;
        /**
         * @private
         */
        _this.isUpdateTrackChanges = false;
        _this.disableHistoryIn = false;
        _this.documentSettingOps = [];
        /**
         * @private
         */
        _this.skipSettingsOps = false;
        _this.isSettingOp = false;
        /**
         * @private
         */
        _this.findResultsList = undefined;
        /**
         * @private
         */
        _this.tablePropertiesDialogModule = undefined;
        /**
         * @private
         */
        _this.bordersAndShadingDialogModule = undefined;
        /**
         * @private
         */
        _this.cellOptionsDialogModule = undefined;
        /**
         * @private
         */
        _this.tableOptionsDialogModule = undefined;
        /**
         * @private
         */
        _this.paragraphDialogModule = undefined;
        /**
         * @private
         */
        _this.imageResizerModule = undefined;
        _this.createdTriggered = false;
        /**
         * @private
         */
        _this.serverActionSettingsImport = 'Import';
        /**
         * Gets or sets a value indicating whether xml toolbar is enabled or not.
         * @private
         *
         * @default false
         */
        _this.isXmlPaneTool = false;
        /**
         * Gets or sets a value indicating whether xml cc is enabled or not.
         * @private
         *
         * @default false
         */
        _this.isXmlMapCC = false;
        /**
         * @private
         */
        _this.defaultLocale = {
            'Table': 'Table',
            'Row': 'Row',
            'Cell': 'Cell',
            'Ok': 'OK',
            'Apply': 'Apply',
            'Alt Text': 'Alt Text',
            'Title': 'Title',
            'Description': 'Description',
            'Cancel': 'Cancel',
            'Size': 'Size',
            'Preferred Width': 'Preferred width',
            'Points': 'Points',
            'Percent': 'Percent',
            'Measure in': 'Measure in',
            'Alignment': 'Alignment',
            'OutlineLevel': 'Outline Level',
            'BodyText': 'Body Text',
            'Level1': 'Level 1',
            'Level2': 'Level 2',
            'Level3': 'Level 3',
            'Level4': 'Level 4',
            'Level5': 'Level 5',
            'Level6': 'Level 6',
            'Level7': 'Level 7',
            'Level8': 'Level 8',
            'Level9': 'Level 9',
            'Left': 'Left',
            'Center': 'Center',
            'Right': 'Right',
            'Decimal': 'Decimal',
            'Bar': 'Bar',
            'Justify': 'Justify',
            'Indent from left': 'Indent from left',
            'Borders and Shading': 'Borders and Shading',
            'Options': 'Options',
            'Specify height': 'Specify height',
            'At least': 'At least',
            'Exactly': 'Exactly',
            'Row height is': 'Row height is',
            'Allow row to break across pages': 'Allow row to break across pages',
            'Repeat as header row at the top of each page': 'Repeat as header row at the top of each page',
            'Vertical alignment': 'Vertical alignment',
            'Top': 'Top',
            'Bottom': 'Bottom',
            'Default cell margins': 'Default cell margins',
            'Default cell spacing': 'Default cell spacing',
            'Allow spacing between cells': 'Allow spacing between cells',
            'Cell margins': 'Cell margins',
            'Same as the whole table': 'Same as the whole table',
            'Borders': 'Borders',
            'None': 'None',
            'Style': 'Style',
            'Width': 'Width',
            'Height': 'Height',
            'Letter': 'Letter',
            '1, 2, 3, ...': '1, 2, 3, ...',
            'a, b, c, ...': 'a, b, c, ...',
            'A, B, C, ...': 'A, B, C, ...',
            'I, II, III, ...': 'I, II, III, ...',
            'i, ii, iii, ...': 'i, ii, iii, ...',
            'Tabloid': 'Tabloid',
            'Legal': 'Legal',
            'Statement': 'Statement',
            'Executive': 'Executive',
            'A3': 'A3',
            'A4': 'A4',
            'A5': 'A5',
            'B4': 'B4',
            'B5': 'B5',
            'Custom Size': 'Custom size',
            'Different odd and even': 'Different odd and even',
            'Different first page': 'Different first page',
            'From edge': 'From edge',
            'Header': 'Header',
            'Footer': 'Footer',
            'First Page Header': 'First Page Header',
            'First Page Footer': 'First Page Footer',
            'Even Page Header': 'Even Page Header',
            'Even Page Footer': 'Even Page Footer',
            'Odd Page Header': 'Odd Page Header',
            'Odd Page Footer': 'Odd Page Footer',
            'Same as Previous': 'Same as Previous',
            'Section': 'Section',
            'Margin': 'Margins',
            'Paper': 'Paper',
            'Layout': 'Layout',
            'Orientation': 'Orientation',
            'Landscape': 'Landscape',
            'Portrait': 'Portrait',
            'Show page numbers': 'Show page numbers',
            'Right align page numbers': 'Right align page numbers',
            'Nothing': 'Nothing',
            'Tab leader': 'Tab leader',
            'Leader': 'Leader',
            'Show levels': 'Show levels',
            'Use hyperlinks instead of page numbers': 'Use hyperlinks instead of page numbers',
            'Build table of contents from': 'Build table of contents from',
            'Styles': 'Styles',
            'Available styles': 'Available styles',
            'TOC level': 'TOC level',
            'Heading': 'Heading',
            'Heading 1': 'Heading 1',
            'Heading 2': 'Heading 2',
            'Heading 3': 'Heading 3',
            'Heading 4': 'Heading 4',
            'Heading 5': 'Heading 5',
            'Heading 6': 'Heading 6',
            'Heading 7': 'Heading 7',
            'Heading 8': 'Heading 8',
            'Heading 9': 'Heading 9',
            'List Paragraph': 'List Paragraph',
            'Normal': 'Normal',
            'Outline levels': 'Outline levels',
            'Table entry fields': 'Table entry fields',
            'Modify': 'Modify',
            'Color': 'Color',
            'Setting': 'Setting',
            'Box': 'Box',
            'All': 'All',
            'Custom': 'Custom',
            'Preview': 'Preview',
            'Shading': 'Shading',
            'Fill': 'Fill',
            'Apply To': 'Apply to',
            'Table Properties': 'Table Properties',
            'Cell Options': 'Cell Options',
            'Table Options': 'Table Options',
            'Insert Table': 'Insert Table',
            'Number of columns': 'Number of columns',
            'Number of rows': 'Number of rows',
            'Text to display': 'Text to display',
            'ScreenTip text': 'ScreenTip text',
            'Address': 'Address',
            'Insert Hyperlink': 'Insert Hyperlink',
            'Edit Hyperlink': 'Edit Hyperlink',
            'Insert': 'Insert',
            'General': 'General',
            'The number must be between': 'The number must be between 1 and 9',
            'The Invalid number': 'This is not a valid number',
            'Indentation': 'Indentation',
            'Before text': 'Before text',
            'Special': 'Special',
            'First line': 'First line',
            'Hanging': 'Hanging',
            'After text': 'After text',
            'By': 'By',
            'Before': 'Before',
            'Line Spacing': 'Line spacing',
            'After': 'After',
            'At': 'At',
            'Multiple': 'Multiple',
            'Spacing': 'Spacing',
            'Define new Multilevel list': 'Define new Multilevel list',
            'List level': 'List level',
            'Choose level to modify': 'Choose level to modify',
            'Level': 'Level',
            'Number format': 'Number format',
            'Number style for this level': 'Number style for this level',
            'Enter formatting for number': 'Enter formatting for number',
            'Start at': 'Start at',
            'Restart list after': 'Restart list after',
            'Position': 'Position',
            'Text indent at': 'Text indent at',
            'Aligned at': 'Aligned at',
            'Follow number with': 'Follow number with',
            'Tab character': 'Tab character',
            'Space': 'Space',
            'Arabic': 'Arabic',
            'UpRoman': 'UpRoman',
            'LowRoman': 'LowRoman',
            'UpLetter': 'UpLetter',
            'LowLetter': 'LowLetter',
            'Number': 'Number',
            'Leading zero': 'Leading zero',
            'Bullet': 'Bullet',
            'Ordinal': 'Ordinal',
            'Ordinal Text': 'Ordinal Text',
            'For East': 'For East',
            'No Restart': 'No Restart',
            'Font': 'Font',
            'Font style': 'Font style',
            'Underline style': 'Underline style',
            'Font color': 'Font color',
            'Effects': 'Effects',
            'Strikethrough': 'Strikethrough',
            'Superscript': 'Superscript',
            'Subscript': 'Subscript',
            'Double strikethrough': 'Double strikethrough',
            'Regular': 'Regular',
            'Bold': 'Bold',
            'Italic': 'Italic',
            'Cut': 'Cut',
            'Copy': 'Copy',
            'Paste': 'Paste',
            'Hyperlink': 'Hyperlink',
            'Remove Content Control': 'Remove Content Control',
            'Content Control Properties': 'Content Control Properties',
            'Remove content control when contents are edited': 'Remove content control when contents are edited',
            'Content control cannot be deleted': 'Content control cannot be deleted',
            'Contents cannot be edited': 'Contents cannot be edited',
            'Plain Text properties': 'Plain Text properties',
            'Allow carriage returns': 'Allow carriage returns',
            'Drop_Down List properties': 'Drop_Down List properties',
            'Display Text': 'Display Text',
            'Locking': 'Locking',
            'Tag': 'Tag',
            'Value': 'Value',
            'PictureContentControl': 'PictureContentControl',
            'Upload from computer': 'Upload from computer',
            'Picture': 'Picture',
            'Choose an item': 'Choose an item',
            'Insert Pictures': 'Insert Pictures',
            'Open Hyperlink': 'Open Hyperlink',
            'Copy Hyperlink': 'Copy Hyperlink',
            'Remove Hyperlink': 'Remove Hyperlink',
            'Paragraph': 'Paragraph',
            'Linked Style': 'Linked(Paragraph and Character)',
            'Character': 'Character',
            'Merge Cells': 'Merge Cells',
            'Insert Above': 'Insert Above',
            'Insert Below': 'Insert Below',
            'Insert Left': 'Insert Left',
            'Insert Right': 'Insert Right',
            'Delete': 'Delete',
            'Delete Table': 'Delete Table',
            'Delete Row': 'Delete Row',
            'Delete Column': 'Delete Column',
            'File Name': 'File Name',
            'Format Type': 'Format Type',
            'Save': 'Save',
            'Navigation': 'Navigation',
            'Results': 'Results',
            'Replace': 'Replace',
            'Replace All': 'Replace All',
            'We replaced all': 'We replaced all',
            'Find': 'Find',
            'No matches': 'No matches',
            'All Done': 'All Done',
            'Result': 'Result',
            'of': 'of',
            'instances': 'instances',
            'with': 'with',
            'Click to follow link': 'Click to follow link',
            'Continue Numbering': 'Continue Numbering',
            'Bookmark name': 'Bookmark name',
            'Tab': 'Tab',
            'Tab stop position': 'Tab stop position',
            'Close': 'Close',
            'Restart At': 'Restart At',
            'Properties': 'Properties',
            'Name': 'Name',
            'Style type': 'Style type',
            'Style based on': 'Style based on',
            'Style for following paragraph': 'Style for following paragraph',
            'Formatting': 'Formatting',
            'Numbering and Bullets': 'Numbering and Bullets',
            'Numbering': 'Numbering',
            'Update Field': 'Update Field',
            'Edit Field': 'Edit Field',
            'Bookmark': 'Bookmark',
            'Page Setup': 'Page Setup',
            'No bookmarks found': 'No bookmarks found',
            'Number format tooltip information': 'Single-level number format: </br>[PREFIX]%[LEVELNUMBER][SUFFIX]</br>'
                + 'For example, "Chapter %1." will display numbering like</br>Chapter 1. Item</br>Chapter 2. Item</br>…'
                + '</br>Chapter N. Item</br>'
                + '</br>Multilevel number format:</br>[PREFIX]%[LEVELNUMBER][SUFFIX]+[PREFIX]%[LEVELNUMBER][SUFFIX]'
                + '</br>For example, "%1.%2." will display numbering like</br>1.1. Item</br>1.2. Item</br>…</br>1.N. Item',
            'Format': 'Format',
            'Create New Style': 'Create New Style',
            'Modify Style': 'Modify Style',
            'New': 'New',
            'InsertFootnote': 'InsertFootnote',
            'InsertEndnote': 'InsertEndnote',
            'Footnote': 'Footnote',
            'Endnote': 'Endnote',
            'Notes Options': 'Notes Options',
            'Bullets': 'Bullets',
            'Use bookmarks': 'Use bookmarks',
            'Table of Contents': 'Table of Contents',
            'AutoFit': 'AutoFit',
            'AutoFit to Contents': 'AutoFit to Contents',
            'AutoFit to Window': 'AutoFit to Window',
            'Fixed Column Width': 'Fixed Column Width',
            'Reset': 'Reset',
            'Match case': 'Match case',
            'Whole words': 'Whole words',
            'Add': 'Add',
            'Go To': 'Go To',
            'Search for': 'Search for',
            'Replace with': 'Replace with',
            'TOC 1': 'TOC 1',
            'TOC 2': 'TOC 2',
            'TOC 3': 'TOC 3',
            'TOC 4': 'TOC 4',
            'TOC 5': 'TOC 5',
            'TOC 6': 'TOC 6',
            'TOC 7': 'TOC 7',
            'TOC 8': 'TOC 8',
            'TOC 9': 'TOC 9',
            'Right-to-left': 'Right-to-left',
            'Left-to-right': 'Left-to-right',
            'Direction': 'Direction',
            'Table direction': 'Table direction',
            'Indent from right': 'Indent from right',
            /* eslint-disable */
            "Contextual Spacing": "Don't add space between paragraphs of the same style",
            "Password Mismatch": "The password don't match",
            'Restrict Editing': 'Restrict Editing',
            'Formatting restrictions': 'Formatting restrictions',
            'Allow formatting': 'Allow formatting',
            'Editing restrictions': 'Editing restrictions',
            'Read only': 'Read only',
            'Exceptions Optional': 'Exceptions (optional)',
            'Select Part Of Document And User': 'Select parts of the document and choose users who are allowed to freely edit them.',
            'Everyone': 'Everyone',
            'More users': 'More users',
            'Add Users': 'Add Users',
            'Enforcing Protection': 'Yes, Start Enforcing Protection',
            'Start Enforcing Protection': 'Start Enforcing Protection',
            'Enter User': 'Enter User',
            'Users': 'Users',
            'Enter new password': 'Enter new password',
            'Reenter new password to confirm': 'Reenter new password to confirm',
            'Your permissions': 'Your permissions',
            'Protected Document': 'This document is protected from unintentional editing.',
            'FormFieldsOnly': 'You may only fill in forms in this region.',
            'CommentsOnly': 'You may only insert comments into this region.',
            'ReadOnlyProtection': 'You may edit in this region.',
            'Stop Protection': 'Stop Protection',
            'Password': 'Password',
            'Spelling Editor': 'Spelling Editor',
            'Spelling': 'Spelling',
            'Spell Check': 'Spell Check',
            'Underline errors': 'Underline errors',
            'Ignore': 'Ignore',
            'Ignore All': 'Ignore All',
            'Add to Dictionary': 'Add to Dictionary',
            'Change': 'Change',
            'Change All': 'Change All',
            'Suggestions': 'Suggestions',
            'The password is incorrect': 'The password is incorrect',
            'Error in establishing connection with web server': 'Error in establishing connection with web server',
            'Failed to load the file': 'Failed to load the file',
            'Highlight the regions I can edit': 'Highlight the regions I can edit',
            'Show All Regions I Can Edit': 'Show All Regions I Can Edit',
            'Find Next Region I Can Edit': 'Find Next Region I Can Edit',
            'Keep source formatting': 'Keep source formatting',
            'Match destination formatting': 'Match destination formatting',
            'InsertAsRows': 'Insert as New Rows',
            'InsertAsColumns': 'Insert as New Columns',
            'OverwriteCells': 'Overwrite Cells',
            'NestTable': 'Nest Table',
            'Text only': 'Text only',
            'Comments': 'Comments',
            'Type your comment': 'Type your comment',
            'Post': 'Post',
            'Reply': 'Reply',
            'New Comment': 'New Comment',
            'Edit': 'Edit',
            'Resolve': 'Resolve',
            'Reopen': 'Reopen',
            'No comments in this document': 'No comments in this document',
            'more': 'more',
            'Type your comment here': 'Type your comment here',
            'Next Comment': 'Next Comment',
            'Previous Comment': 'Previous Comment',
            'Un-posted comments': 'Un-posted comments',
            'XML Mapping': 'XML Mapping',
            'Custom XML Part': 'Custom XML Part:',
            'Discard Comment': 'Added comments not posted. If you continue, that comment will be discarded.',
            'Discard Content Control': 'You can not insert a content control when the selection includes another content control.',
            'No Headings': 'No Heading Found!',
            'Add Headings': 'This document has no headings. Please add headings and try again.',
            'More Options': 'More Options',
            'Click to see this comment': 'Click to see this comment',
            'Form Fields': 'Form Fields',
            'Text Form': 'Text Form',
            'Check Box': 'Check Box',
            'Drop Down Form Field': 'Drop Down Form Field',
            'Dropdown items': 'Drop-down items',
            'Items in dropdown list': 'Items in drop-down list',
            'ADD': 'ADD',
            'REMOVE': 'REMOVE',
            'Field settings': 'Field settings',
            'Tooltip': 'Tooltip',
            'Dropdown enabled': 'Drop-down enabled',
            'Check Box Form Field': 'Check Box Form Field',
            'Check box size': 'Check box size',
            'Auto': 'Auto',
            'Default value': 'Default value',
            'Not checked': 'Not checked',
            'Checked': 'Checked',
            'Check box enabled': 'Check box enabled',
            'Text Form Field': 'Text Form Field',
            'Type': 'Type',
            'Default text': 'Default text',
            'Maximum length': 'Maximum length',
            'Text format': 'Text format',
            'Fillin enabled': 'Fill-in enabled',
            'Default number': 'Default number',
            'Default date': 'Default date',
            'Date format': 'Date format',
            'Merge Track': 'This action wont be marked as change. Do you want to continue?',
            'UnTrack': 'Cannot be tracked !',
            'Accept': 'Accept',
            'Reject': 'Reject',
            'Previous Changes': 'Previous Changes',
            'Next Changes': 'Next Changes',
            'Inserted': 'Inserted',
            'Deleted': 'Deleted',
            'Move From': 'Move From',
            'Move To': 'Move To',
            'Changes': 'Changes',
            'Accept all': 'Accept all',
            'Reject all': 'Reject all',
            'No changes': 'No changes',
            'Accept Changes': 'Accept Changes',
            'Reject Changes': 'Reject Changes',
            'User': 'User',
            'View': 'View',
            'Insertion': 'Insertion',
            'Deletion': 'Deletion',
            'All caps': 'All caps',
            'This region is locked by': 'This region is locked by',
            'Lock': 'Lock',
            'Unlock': 'Unlock',
            'Already locked': 'Selected or part of region is already locked by another user',
            'Click to View/Edit Footnote': 'Click to View/Edit Footnote',
            'Click to View/Edit Endnote': 'Click to View/Edit Endnote',
            'Multiple Comment': 'Please post your comment',
            'No suggestions': 'No suggestions',
            'More Suggestion': 'More Suggestion',
            'Ignore Once': 'Ignore Once',
            'Keep With Next': 'Keep with next',
            'Keep Lines Together': 'Keep lines together',
            'WidowControl': 'Widow/Orphan control',
            'Indents and Spacing': 'Indents and Spacing',
            'Line and Page Breaks': 'Line and Page Breaks',
            'Pagination': 'Pagination',
            'Single': 'Single',
            'DashSmallGap': 'DashSmallGap',
            'DashDot': 'DashDot',
            'Double': 'Double',
            'ThinThickSmallGap': 'ThinThickSmallGap',
            'ThickThinSmallGap': 'ThickThinSmallGap',
            'ThickThinMediumGap': 'ThickThinMediumGap',
            'ThickThinLargeGap': 'ThickThinLargeGap',
            'SingleWavy': 'SingleWavy',
            'DoubleWavy': 'DoubleWavy',
            'Inset': 'Inset',
            'DashLargeGap': 'DashLargeGap',
            'Dot': 'Dot',
            'DashDotDot': 'DashDotDot',
            'Triple': 'Triple',
            'ThinThickThinSmallGap': 'ThinThickThinSmallGap',
            'ThinThickThinMediumGap': 'ThinThickThinMediumGap',
            'ThinThickThinLargeGap': 'ThinThickThinLargeGap',
            'DashDotStroked': 'DashDotStroked',
            'Engrave3D': 'Engrave3D',
            'Thick': 'Thick',
            'Outset': 'Outset',
            'Emboss3D': 'Emboss3D',
            'ThinThickLargeGap': 'ThinThickLargeGap',
            'ThinThickMediumGap': 'ThinThickMediumGap',
            'Number of rows must be between': 'Number of rows must be between',
            'Number of columns must be between': 'Number of columns must be between',
            'and': 'and',
            'Unlimited': 'Unlimited',
            'Regular text': 'Regular text',
            'Date': 'Date',
            'Uppercase': 'Uppercase',
            'Lowercase': 'Lowercase',
            'FirstCapital': 'FirstCapital',
            'TitleCase': 'Titlecase',
            'Filling in forms': 'Filling in forms',
            'px': 'px',
            'Tracked changes': 'Tracked changes',
            'TrackChangesOnly': 'You may edit in this region, but all change will be tracked.',
            'RemovedIgnoreExceptions': 'If you make this change in document protection, Word will ignore all the exceptions in this document.',
            'RemovedIgnore': 'Do you want to remove the ignored exceptions?',
            'Information': 'Information',
            'Yes': 'Yes',
            'No': 'No',
            'Page Break': 'Page Break',
            'Column Break': 'Column Break',
            'Section Break Next Page': 'Section Break (Next Page)',
            'Section Break Continuous': 'Section Break (Continuous)',
            'Unsupported format': 'The file format you have selected isn\'t supported. Please choose valid format.',
            'One': 'One',
            'Two': 'Two',
            'Three': 'Three',
            'Presets': 'Presets',
            'Columns': 'Columns',
            'Split your text into two or more columns': 'Split your text into two or more columns',
            'Line between column': 'Line between column',
            'Width and Spacing': 'Width and Spacing',
            'Equal column width': 'Equal column width',
            'Column': 'Column',
            'Paste Content Dialog': 'Due to browser’s security policy, paste from system clipboard is restricted. Alternatively use the keyboard shortcut',
            'Paste Content CheckBox': 'Don’t show again',
            'BookMarkList': 'List of bookmarks in the document',
            'TabMarkList': 'List of tab stops in the paragraph',
            'Default tab stops': 'Default tab stops',
            'Tab stops to be cleared': 'Tab stops to be cleared',
            'Tabs': 'Tabs',
            'Set': 'Set',
            'Clear': 'Clear',
            'Clear All': 'Clear All',
            'Discard': 'Discard',
            'The top/bottom margins are too large for the page height in some sections.': 'The top/bottom margins are too large for the page height in some sections.',
            'Column width cannot be less than 36 pt.': 'Column width cannot be less than 36 pt.',
            'Left and right margins.': 'Settings you chose for the left and right margins, column spacing, or pargraph indents are too large for the page width in same secitions.',
            'Left Indent': 'Left Indent',
            'Right Indent': 'Right Indent',
            'Hanging Indent': 'Hanging Indent',
            'First Line Indent': 'First Line Indent',
            'Left Margin': 'Left Margin',
            'Right Margin': 'Right Margin',
            'Top Margin': 'Top Margin',
            'Bottom Margin': 'Bottom Margin',
            'Left Tab': 'Left Tab',
            'Right Tab': 'Right Tab',
            'Center Tab': 'Center Tab',
            'Decimal Tab': 'Decimal Tab',
            'Bar Tab': 'Bar Tab',
            'Move Table Column': 'Move Table Column',
            'Default Content Control Text': 'Click here or tap to insert text',
            'Default Date Picker': 'Click or tap enter the date',
            'Rich text Controls': 'Rich text controls cannot be applied here.',
            'Plain text Controls': 'Plain text controls cannot be applied here.'
        };
        _this.initHelper();
        return _this;
    }
    DocumentEditor_1 = DocumentEditor;
    Object.defineProperty(DocumentEditor.prototype, "enableHeaderAndFooter", {
        /**
         * @private
         * @returns {boolean} Returns true if header and footer is enabled.
         */
        get: function () {
            return this.enableHeaderFooterIn;
        },
        /**
         * @private
         * @param {boolean} value True if enable the header and footer; Otherwise, false.
         */
        set: function (value) {
            this.enableHeaderFooterIn = value;
            if (!value && this.selectionModule && this.selectionModule.isWebLayout) {
                this.selectionModule.isWebLayout = false;
            }
            this.viewer.updateScrollBars();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "pageCount", {
        /**
         * Gets the total number of pages.
         *
         * @returns {number} Returns the page count.
         */
        get: function () {
            if (!this.isDocumentLoaded || isNullOrUndefined(this.viewer) || this.viewer instanceof WebLayoutViewer) {
                return 1;
            }
            return this.documentHelper.pages.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the entire document's comment information.
     *
     * @returns {CommentInfo[]} Returns the collection of comments.
     */
    DocumentEditor.prototype.getComments = function () {
        var data = [];
        var commentCollection = this.documentHelper.comments;
        if (commentCollection.length > 0) {
            var tempData = [];
            for (var _i = 0, _a = this.documentHelper.comments; _i < _a.length; _i++) {
                var comment = _a[_i];
                tempData = [];
                var commentProperties = {
                    author: comment.author,
                    isResolved: comment.isResolved ? comment.isResolved : false,
                    dateTime: this.editor.parseDateTime(comment.createdDate)
                };
                for (var _b = 0, _c = comment.replyComments; _b < _c.length; _b++) {
                    var replyComment = _c[_b];
                    var replyCommentProperties = {
                        author: replyComment.author,
                        isResolved: replyComment.isResolved ? comment.isResolved : false,
                        dateTime: this.editor.parseDateTime(replyComment.createdDate)
                    };
                    var commentText = HelperMethods.parseCommentAsText(replyComment);
                    var newComment = new Comment(replyComment.commentId, replyCommentProperties, commentText);
                    tempData.push(newComment);
                }
                var commentInfo = {
                    id: comment.commentId,
                    text: HelperMethods.parseCommentAsText(comment),
                    commentProperties: commentProperties,
                    replies: tempData
                };
                data.push(commentInfo);
            }
        }
        return data;
    };
    Object.defineProperty(DocumentEditor.prototype, "selection", {
        /**
         * Gets the selection object of the document editor.
         *
         * @default undefined
         * @aspType Selection
         * @returns {Selection} Returns the selection object.
         */
        get: function () {
            if (!this.selectionModule) {
                this.checkModuleInjection('Selection', this.enableSelection);
            }
            return this.selectionModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "editor", {
        /**
         * Gets the editor object of the document editor.
         *
         * @aspType Editor
         * @returns {Editor} Returns the editor object.
         */
        get: function () {
            if (!this.editorModule) {
                this.checkModuleInjection('Editor', this.enableEditor);
            }
            return this.editorModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "editorHistory", {
        /**
         * Gets the editor history object of the document editor.
         *
         * @aspType EditorHistory
         * @returns {EditorHistory} Returns the editor history object.
         */
        get: function () {
            if (!this.editorHistoryModule) {
                this.checkModuleInjection('EditorHistory', this.enableEditorHistory);
            }
            return this.editorHistoryModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "search", {
        /**
         * Gets the search object of the document editor.
         *
         * @aspType Search
         * @returns { Search } Returns the search object.
         */
        get: function () {
            if (!this.searchModule) {
                this.checkModuleInjection('Search', this.enableSearch);
            }
            return this.searchModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "contextMenu", {
        /**
         * Gets the context menu object of the document editor.
         *
         * @aspType ContextMenu
         * @returns {ContextMenu} Returns the context menu object.
         */
        get: function () {
            if (!this.contextMenuModule) {
                this.checkModuleInjection('ContextMenu', this.enableContextMenu);
            }
            return this.contextMenuModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "spellCheckDialog", {
        /**
         * Gets the spell check dialog object of the document editor.
         *
         * @returns {SpellCheckDialog} Returns the spell check dialog object.
         */
        get: function () {
            if (!this.spellCheckDialogModule) {
                this.checkModuleInjection('SpellCheck', this.enableSpellCheck);
            }
            return this.spellCheckDialogModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "spellChecker", {
        /**
         * Gets the spell check object of the document editor.
         *
         * @aspType SpellChecker
         * @returns {SpellChecker} Returns the spell checker object.
         */
        get: function () {
            if (!this.spellCheckerModule) {
                this.checkModuleInjection('SpellCheck', this.enableSpellCheck);
            }
            return this.spellCheckerModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "containerId", {
        /**
         * @private
         * @returns {string }- Returns the container id.
         */
        get: function () {
            return this.element.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "isDocumentLoaded", {
        /**
         * @private
         * @returns {boolean} - Returns true if document is loaded.
         */
        get: function () {
            return this.isDocumentLoadedIn;
        },
        /**
         * @private
         * @param {boolean} value - Specifies whether the document is loaded or not.
         * @returns {void}
         */
        set: function (value) {
            this.isDocumentLoadedIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "isDocumentEmpty", {
        /**
         *  Describes whether Document contains any content or not
         *
         * @returns {boolean} Returns `true` if Document does not contains any content; otherwise, `false`
         * @aspType bool
         * @default false
         */
        get: function () {
            if (this.documentHelper.pages.length === 1) {
                var firstPage = this.documentHelper.pages[0];
                var headerWidget = firstPage.headerWidget;
                var footerWidget = firstPage.footerWidget;
                var isHeaderEmpty = true;
                var isFooterEmpty = true;
                if (!isNullOrUndefined(headerWidget) && !isNullOrUndefined(headerWidget.firstChild)) {
                    if (!(headerWidget.firstChild instanceof ParagraphWidget) || !headerWidget.firstChild.isEmpty()) {
                        isHeaderEmpty = false;
                    }
                }
                if (!isNullOrUndefined(footerWidget) && !isNullOrUndefined(footerWidget.firstChild)) {
                    if (!(footerWidget.firstChild instanceof ParagraphWidget) || !footerWidget.firstChild.isEmpty()) {
                        isFooterEmpty = false;
                    }
                }
                if (isHeaderEmpty && isFooterEmpty) {
                    var firstBodywidget = firstPage.bodyWidgets[0];
                    if (isNullOrUndefined(firstBodywidget.nextWidget)) {
                        var firstChild = firstBodywidget.firstChild;
                        if (firstChild instanceof ParagraphWidget
                            && firstChild.isEmpty()
                            && isNullOrUndefined(firstChild.nextWidget)) {
                            return true;
                        }
                    }
                }
                return false;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "revisions", {
        /**
         * Gets the revision collection which contains information about changes made from original document
         *
         * @returns {RevisionCollection} Returns the revision collection object.
         */
        get: function () {
            if (isNullOrUndefined(this.revisionsInternal)) {
                this.revisionsInternal = new RevisionCollection(this);
            }
            return this.revisionsInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "enableHistoryMode", {
        /**
         * Determines whether history needs to be enabled or not.
         *
         * @default - false
         * @private
         * @returns {boolean} Returns true if history module is enabled.
         */
        get: function () {
            return this.enableEditorHistory && !isNullOrUndefined(this.editorHistoryModule);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "documentStart", {
        /**
         * Gets the start text position in the document.
         *
         * @default undefined
         * @private
         * @returns {TextPosition} - Returns the document start.
         */
        get: function () {
            if (!isNullOrUndefined(this.selectionModule)) {
                return this.selectionModule.getDocumentStart();
            }
            else {
                this.checkModuleInjection('Selection', this.enableSelection);
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "documentEnd", {
        /**
         * Gets the end text position in the document.
         *
         * @default undefined
         * @private
         * @returns {TextPosition} - Returns the document end.
         */
        get: function () {
            if (!isNullOrUndefined(this.selectionModule)) {
                return this.selectionModule.getDocumentEnd();
            }
            else {
                this.checkModuleInjection('Selection', this.enableSelection);
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "isReadOnlyMode", {
        /**
         * @private
         * @returns {TextPosition} - Returns isReadOnlyMode.
         */
        get: function () {
            return this.isReadOnly || isNullOrUndefined(this.editorModule)
                || isNullOrUndefined(this.selectionModule) || !isNullOrUndefined(this.editorModule) && this.editorModule.restrictEditing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "isSpellCheck", {
        /**
         * @private
         * @returns {TextPosition} - Returns isSpellCheck.
         */
        get: function () {
            return this.enableSpellCheck && this.spellCheckerModule.enableSpellCheck;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "enableImageResizerMode", {
        /**
         * Specifies to enable image resizer option
         *
         * @private
         * @returns {boolean} - Returns enableImageResizerMode.
         */
        get: function () {
            return this.enableImageResizer && !isNullOrUndefined(this.imageResizerModule);
        },
        enumerable: true,
        configurable: true
    });
    DocumentEditor.prototype.preRender = function () {
        var _this = this;
        if (this.documentEditorSettings && this.documentEditorSettings.enableOptimizedTextMeasuring) {
            DocumentEditor_1.Inject(Optimized);
        }
        else {
            DocumentEditor_1.Inject(Regular);
        }
        //pre render section
        this.findResultsList = [];
        setTimeout(function () {
            if (isNullOrUndefined(_this.documentEditorSettings.popupTarget)) {
                _this.documentEditorSettings.popupTarget = document.body;
            }
        }, 0);
        if (!isNullOrUndefined(this.element) && this.element.id === '') {
            //Set unique id, if id is empty
            this.element.id = HelperMethods.getUniqueElementId();
        }
        if (this.refreshing) {
            this.initHelper();
        }
    };
    DocumentEditor.prototype.updateExternalStyle = function () {
        var _this = this;
        if (this.externalFonts && this.externalFonts.length > 0) {
            this.clearExistingStyles();
            var style = document.createElement('style');
            style.type = 'text/css';
            style.id = 'e-de-custom-font-styles';
            var fontFaceDeclarations_1 = '';
            this.externalFonts.forEach(function (externalFont) {
                if (externalFont.src && externalFont.fontFamily && !_this.parser.isFontInstalled(externalFont.fontFamily)) {
                    fontFaceDeclarations_1 += "@font-face {font-family: '" + externalFont.fontFamily + "'; src: " + externalFont.src + "}";
                }
            });
            if (fontFaceDeclarations_1) {
                style.appendChild(document.createTextNode(fontFaceDeclarations_1));
                document.head.appendChild(style);
                style.onload = function () {
                    var _this = this;
                    this.externalFonts.forEach(function (externalFont) {
                        if (externalFont.src && externalFont.fontFamily && !_this.parser.isFontInstalled(externalFont.fontFamily)) {
                            // Render text in a div for each font
                            var testDiv = document.createElement('div');
                            var cssText = 'position:absolute;top:-1000px;left:-1000px;opacity:0;font-size:0px;line-height:normal;';
                            updateCSSText(testDiv, cssText);
                            testDiv.textContent = 'test font';
                            testDiv.style.fontFamily = "\"" + externalFont.fontFamily + "\"";
                            document.body.appendChild(testDiv);
                        }
                    });
                }.bind(this);
            }
        }
    };
    DocumentEditor.prototype.clearExistingStyles = function () {
        var head = document.head;
        var styles = head.querySelectorAll('style#e-de-custom-font-styles');
        styles.forEach(function (style) {
            head.removeChild(style);
        });
    };
    DocumentEditor.prototype.initHelper = function () {
        this.documentHelper = new DocumentHelper(this);
        if (this.layoutType === 'Pages') {
            this.viewer = new PageLayoutViewer(this);
        }
        else {
            this.viewer = new WebLayoutViewer(this);
        }
        this.parser = new SfdtReader(this.documentHelper);
    };
    DocumentEditor.prototype.render = function () {
        if (!isNullOrUndefined(this.element)) {
            var container = this.element;
            container.style.minHeight = '200px';
            container.style.minWidth = '200px';
            if (this.height !== '') {
                this.element.style.height = formatUnit(this.height);
            }
            if (this.width !== '') {
                this.element.style.width = formatUnit(this.width);
            }
        }
        this.textMeasureHelper = (this.optimizedModule) ? this.optimizedModule : this.regularModule;
        if (isNullOrUndefined(this.textMeasureHelper)) {
            this.textMeasureHelper = new Optimized(this.documentHelper);
        }
        this.documentHelper.initializeComponents();
        this.openBlank();
        this.renderComplete();
        this.renderRulers();
        this.renderNavigationPane();
        this.createdTriggered = true;
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.renderRulers = function () {
        // if (this.documentEditorSettings.showRuler) {
        this.rulerHelper = new RulerHelper();
        this.rulerContainer = this.rulerHelper.renderOverlapElement(this);
        this.rulerHelper.renderRuler(this, true);
        this.rulerHelper.renderRuler(this, false);
        this.rulerHelper.renderRulerMarkerIndicatorElement(this);
        this.rulerHelper.createIndicatorLines(this);
        this.showHideRulers();
        // }
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showHideRulers = function () {
        if (this.rulerHelper && this.documentEditorSettings && !isNullOrUndefined(!this.documentEditorSettings.showRuler)) {
            var showRuler = this.documentEditorSettings.showRuler && !this.isReadOnlyMode;
            this.rulerHelper.hideTabStopSwitch(showRuler);
            this.rulerHelper.hideRulerBottom(showRuler);
            if (this.vRuler) {
                this.vRuler.showHideRuler(showRuler);
            }
            if (this.hRuler) {
                this.hRuler.showHideRuler(showRuler);
            }
        }
    };
    DocumentEditor.prototype.renderNavigationPane = function () {
        if (!this.isReadOnly && this.optionsPaneModule) {
            this.optionsPaneModule.showHideOptionsPane(this.documentEditorSettings.showNavigationPane);
        }
    };
    /**
     * Get component name
     *
     * @private
     * @returns {string} - Returns module name.
     */
    DocumentEditor.prototype.getModuleName = function () {
        return 'DocumentEditor';
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {DocumentEditorModel} model - Specifies the new model.
     * @param {DocumentEditorModel} oldProp - Specifies the old model.
     * @returns {void}
     */
    DocumentEditor.prototype.onPropertyChanged = function (model, oldProp) {
        var _this = this;
        for (var _i = 0, _a = Object.keys(model); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'enableTrackChanges':
                    this.notify(trackChanges, model);
                    this.getSettingData('enableTrackChanges', model.enableTrackChanges);
                    if (this.documentHelper.isTrackedOnlyMode && !model.enableTrackChanges) {
                        this.enableTrackChanges = true;
                    }
                    break;
                case 'autoResizeOnVisibilityChange':
                    if (model.autoResizeOnVisibilityChange) {
                        this.documentHelper.triggerAutoResizeInterval();
                    }
                    break;
                case 'zoomFactor':
                    if (this.viewer && oldProp.zoomFactor !== model.zoomFactor) {
                        this.documentHelper.zoomFactor = model.zoomFactor;
                        if (this.rulerHelper && this.documentEditorSettings && this.documentEditorSettings.showRuler) {
                            this.rulerHelper.updateRuler(this, true);
                        }
                        if (this.enableCollaborativeEditing && this.collaborativeEditingHandlerModule) {
                            this.collaborativeEditingHandlerModule.updateCaretPosition();
                        }
                    }
                    break;
                case 'layoutType':
                    if (this.selectionModule && this.selectionModule.isWebLayout) {
                        break;
                    }
                    this.viewer.destroy();
                    if (this.layoutType === 'Pages') {
                        this.viewer = new PageLayoutViewer(this);
                    }
                    else {
                        if (this.enableHeaderAndFooter === true) {
                            this.selectionModule.closeHeaderFooter();
                        }
                        this.viewer = new WebLayoutViewer(this);
                    }
                    /* eslint-disable */
                    var paragraph = this.selectionModule.start.paragraph;
                    if (paragraph.containerWidget instanceof FootNoteWidget) {
                        this.selectionModule.clearSelectionHighlightInSelectedWidgets();
                        this.selectionModule.selectContent(this.documentStart, true);
                    }
                    this.editorModule.layoutWholeDocument(true);
                    setTimeout(function () {
                        _this.fireViewChange();
                    }, 200);
                    break;
                case 'locale':
                    this.localizeDialogs();
                    break;
                case 'isReadOnly':
                    if (!isNullOrUndefined(this.optionsPaneModule) && this.optionsPaneModule.isOptionsPaneShow) {
                        this.optionsPaneModule.showHideOptionsPane(false);
                        this.documentHelper.updateFocus();
                    }
                    if (this.showComments) {
                        this.commentReviewPane.showHidePane(true, 'Comments');
                    }
                    this.commentReviewPane.enableDisableItems();
                    this.trackChangesPane.enableDisableButton(!this.isReadOnly && !this.documentHelper.isDocumentProtected);
                    this.showHideRulers();
                    break;
                case 'currentUser':
                case 'userColor':
                    if (this.selectionModule && this.documentHelper.isDocumentProtected) {
                        this.selectionModule.highlightEditRegion();
                    }
                    this.viewer.updateScrollBars();
                    break;
                case 'pageGap':
                case 'pageOutline':
                    this.viewer.updateScrollBars();
                    break;
                case 'zIndex':
                    if (this.documentHelper.dialog) {
                        this.documentHelper.dialog.zIndex = model.zIndex + 10;
                    }
                    if (this.documentHelper.dialog2) {
                        this.documentHelper.dialog2.zIndex = model.zIndex;
                    }
                    break;
                case 'showComments':
                    if (this.viewer && model.showComments !== oldProp.showComments) {
                        this.documentHelper.showComments(model.showComments);
                    }
                    this.viewer.updateScrollBars();
                    break;
                case 'enableRtl':
                    this.localizeDialogs(model.enableRtl);
                    break;
                case 'enableComment':
                    if (this.viewer && this.showComments) {
                        this.showComments = this.showComments ? this.enableComment : false;
                        this.documentHelper.showComments(model.enableComment);
                    }
                    this.viewer.updateScrollBars();
                    break;
                case 'showRevisions':
                    if (this.isReadOnly || this.documentHelper.isDocumentProtected) {
                        this.documentHelper.showRevisions(false);
                    }
                    else if (this.viewer) {
                        this.documentHelper.showRevisions(model.showRevisions);
                    }
                    this.viewer.updateScrollBars();
                    break;
                case 'documentSettings':
                    if (!isNullOrUndefined(model.documentSettings.compatibilityMode)) {
                        var oldValue = oldProp.documentSettings.compatibilityMode;
                        var newValue = model.documentSettings.compatibilityMode;
                        if ((oldValue == "Word2013" && newValue != "Word2013") || (oldValue != "Word2013" && newValue == "Word2013")) {
                            if (this.documentHelper.compatibilityMode !== newValue) {
                                this.documentHelper.compatibilityMode = newValue;
                                this.editorModule.layoutWholeDocument(true);
                            }
                        }
                    }
                    this.viewer.updateScrollBars();
                    break;
                case 'documentEditorSettings':
                    if (!isNullOrUndefined(model.documentEditorSettings.enableOptimizedTextMeasuring)) {
                        //Clears previously cached height information.
                        this.documentHelper.heightInfoCollection = {};
                        if (model.documentEditorSettings.enableOptimizedTextMeasuring) {
                            this.textMeasureHelper = this.optimizedModule;
                        }
                        else {
                            this.textMeasureHelper = this.regularModule;
                        }
                        this.viewer.updateScrollBars();
                    }
                    if ((!isNullOrUndefined(model.documentEditorSettings.showHiddenMarks) && (model.documentEditorSettings.showHiddenMarks !== oldProp.documentEditorSettings.showHiddenMarks))
                        || (!isNullOrUndefined(model.documentEditorSettings.showBookmarks) && (model.documentEditorSettings.showBookmarks !== oldProp.documentEditorSettings.showBookmarks))) {
                        if (this.trackChangesPane) {
                            this.trackChangesPane.showHiddenParaMark();
                        }
                        this.viewer.updateScrollBars();
                    }
                    if (!isNullOrUndefined(model.documentEditorSettings.highlightEditableRanges)) {
                        if (this.documentHelper && this.documentHelper.restrictEditingPane) {
                            this.documentHelper.restrictEditingPane.highlightCheckBox.checked = model.documentEditorSettings.highlightEditableRanges;
                            this.documentHelper.selection.isHighlightEditRegion = model.documentEditorSettings.highlightEditableRanges;
                        }
                    }
                    if (!isNullOrUndefined(model.documentEditorSettings.colorPickerSettings)) {
                        if (model.documentEditorSettings.colorPickerSettings) {
                            this.applyColorPickerProperties(model);
                        }
                    }
                    if (!isNullOrUndefined(model.documentEditorSettings.showRuler)) {
                        this.showHideRulers();
                        if (model.documentEditorSettings.showRuler) {
                            // if (isNullOrUndefined(this.rulerHelper)) {
                            //     this.renderRulers();
                            // }
                            this.rulerHelper.updateRuler(this, true);
                        }
                    }
                    if (!isNullOrUndefined(model.documentEditorSettings.showNavigationPane)) {
                        if (!this.isReadOnly && this.optionsPaneModule) {
                            this.optionsPaneModule.showHideOptionsPane(this.documentEditorSettings.showNavigationPane);
                        }
                    }
                    if (this.enableCollaborativeEditing && this.collaborativeEditingHandlerModule) {
                        this.collaborativeEditingHandlerModule.updateCaretPosition();
                    }
                    if (!isNullOrUndefined(model.documentEditorSettings.pasteAsNewParagraph)) {
                        this.documentEditorSettings.pasteAsNewParagraph = model.documentEditorSettings.pasteAsNewParagraph;
                    }
                    break;
                case 'height':
                    this.element.style.height = formatUnit(this.height);
                    this.resize();
                    break;
                case 'width':
                    this.element.style.width = formatUnit(this.width);
                    this.resize();
                    break;
                case 'enableAutoFocus':
                    this.enableAutoFocus = model.enableAutoFocus;
                    break;
            }
        }
    };
    DocumentEditor.prototype.applyColorPickerProperties = function (model) {
        if (model.documentEditorSettings.colorPickerSettings) {
            var settings = model.documentEditorSettings.colorPickerSettings;
            if (!this.isReadOnly && !isNullOrUndefined(settings) && this.bordersAndShadingDialogModule && this.documentHelper.borderColorPicker && this.documentHelper.shadingColorPicker) {
                // setting border and shading color picker properties
                if (!isNullOrUndefined(settings.mode)) {
                    this.documentHelper.borderColorPicker.mode = model.documentEditorSettings.colorPickerSettings.mode;
                    this.documentHelper.shadingColorPicker.mode = model.documentEditorSettings.colorPickerSettings.mode;
                }
                if (!isNullOrUndefined(settings.showButtons)) {
                    this.documentHelper.borderColorPicker.showButtons = model.documentEditorSettings.colorPickerSettings.showButtons;
                    this.documentHelper.shadingColorPicker.showButtons = model.documentEditorSettings.colorPickerSettings.showButtons;
                }
                if (!isNullOrUndefined(settings.modeSwitcher)) {
                    this.documentHelper.borderColorPicker.modeSwitcher = model.documentEditorSettings.colorPickerSettings.modeSwitcher;
                    this.documentHelper.shadingColorPicker.modeSwitcher = model.documentEditorSettings.colorPickerSettings.modeSwitcher;
                }
            }
            // setting fontColor picker properties
            if (!this.isReadOnly && !isNullOrUndefined(settings) && this.fontDialogModule && this.documentHelper.fontColor) {
                if (!isNullOrUndefined(settings.mode)) {
                    this.documentHelper.fontColor.mode = model.documentEditorSettings.colorPickerSettings.mode;
                }
                if (!isNullOrUndefined(settings.showButtons)) {
                    this.documentHelper.fontColor.showButtons = model.documentEditorSettings.colorPickerSettings.showButtons;
                }
                if (!isNullOrUndefined(settings.modeSwitcher)) {
                    this.documentHelper.fontColor.modeSwitcher = model.documentEditorSettings.colorPickerSettings.modeSwitcher;
                }
            }
            // settingstyle dialog color picker
            if (!this.isReadOnly && !isNullOrUndefined(settings) && this.styleDialogModule && this.documentHelper.colorPicker) {
                if (!isNullOrUndefined(settings.mode)) {
                    this.documentHelper.colorPicker.mode = model.documentEditorSettings.colorPickerSettings.mode;
                }
                if (!isNullOrUndefined(settings.showButtons)) {
                    this.documentHelper.colorPicker.showButtons = model.documentEditorSettings.colorPickerSettings.showButtons;
                }
                if (!isNullOrUndefined(settings.modeSwitcher)) {
                    this.documentHelper.colorPicker.modeSwitcher = model.documentEditorSettings.colorPickerSettings.modeSwitcher;
                }
            }
            // setting font and table properties 
            if (!isNullOrUndefined(settings)) {
                if (!isNullOrUndefined(settings.mode)) {
                    this.documentHelper.fontColorInputElement.mode = model.documentEditorSettings.colorPickerSettings.mode;
                    this.documentHelper.shadingBtn.mode = model.documentEditorSettings.colorPickerSettings.mode;
                    this.documentHelper.borderBtn.mode = model.documentEditorSettings.colorPickerSettings.mode;
                }
                if (!isNullOrUndefined(settings.showButtons)) {
                    this.documentHelper.fontColorInputElement.showButtons = model.documentEditorSettings.colorPickerSettings.showButtons;
                    this.documentHelper.shadingBtn.showButtons = model.documentEditorSettings.colorPickerSettings.showButtons;
                    this.documentHelper.borderBtn.showButtons = model.documentEditorSettings.colorPickerSettings.showButtons;
                }
                if (!isNullOrUndefined(settings.modeSwitcher)) {
                    this.documentHelper.fontColorInputElement.modeSwitcher = model.documentEditorSettings.colorPickerSettings.modeSwitcher;
                    this.documentHelper.shadingBtn.modeSwitcher = model.documentEditorSettings.colorPickerSettings.modeSwitcher;
                    this.documentHelper.borderBtn.modeSwitcher = model.documentEditorSettings.colorPickerSettings.modeSwitcher;
                }
            }
        }
    };
    DocumentEditor.prototype.localizeDialogs = function (enableRtl) {
        if (this.locale !== '') {
            var l10n = new L10n('documenteditor', this.defaultLocale);
            l10n.setLocale(this.locale);
            if (!isNullOrUndefined(enableRtl)) {
                this.documentHelper.dialog.enableRtl = enableRtl;
                this.documentHelper.dialog2.enableRtl = enableRtl;
            }
            if (this.optionsPaneModule) {
                this.optionsPaneModule.initOptionsPane(l10n, enableRtl);
            }
            if (this.paragraphDialogModule) {
                this.paragraphDialogModule.initParagraphDialog(l10n);
            }
            if (this.footNotesDialogModule) {
                this.footNotesDialogModule.notesDialog(l10n, enableRtl);
            }
            if (this.pageSetupDialogModule) {
                this.pageSetupDialogModule.initPageSetupDialog(l10n, enableRtl);
            }
            if (this.columnsDialogModule) {
                this.columnsDialogModule.initColumnsDialog(l10n, enableRtl);
            }
            if (this.fontDialogModule) {
                this.fontDialogModule.initFontDialog(l10n, enableRtl);
            }
            if (this.hyperlinkDialogModule) {
                this.hyperlinkDialogModule.initHyperlinkDialog(l10n, enableRtl);
            }
            if (this.contextMenuModule) {
                this.contextMenuModule.contextMenuInstance.destroy();
                this.contextMenuModule.initContextMenu(l10n, enableRtl);
            }
            if (this.listDialogModule) {
                this.listDialogModule.initListDialog(l10n, enableRtl);
            }
            if (this.tablePropertiesDialogModule) {
                this.tablePropertiesDialogModule.initTablePropertyDialog(l10n, enableRtl);
            }
            if (this.bordersAndShadingDialogModule) {
                this.bordersAndShadingDialogModule.initBordersAndShadingsDialog(l10n, enableRtl);
            }
            if (this.cellOptionsDialogModule) {
                this.cellOptionsDialogModule.initCellMarginsDialog(l10n, enableRtl);
            }
            if (this.tableOptionsDialogModule) {
                this.tableOptionsDialogModule.initTableOptionsDialog(l10n, enableRtl);
            }
            if (this.tableDialogModule) {
                this.tableDialogModule.initTableDialog(l10n);
            }
            if (this.styleDialogModule) {
                this.styleDialogModule.initStyleDialog(l10n, enableRtl);
            }
            if (this.tabDialogModule) {
                this.tabDialogModule.initTabsDialog(l10n, enableRtl);
            }
            if (this.tableOfContentsDialogModule) {
                this.tableOfContentsDialogModule.initTableOfContentDialog(l10n, enableRtl);
            }
            if (this.commentReviewPane && this.commentReviewPane.parentPaneElement) {
                if (this.enableRtl) {
                    classList(this.commentReviewPane.parentPaneElement, ['e-rtl'], []);
                }
                else {
                    classList(this.commentReviewPane.parentPaneElement, [], ['e-rtl']);
                }
            }
        }
    };
    /**
     * Sets the default character format for document editor
     *
     * @param {CharacterFormatProperties} characterFormat Specifies the character format.
     * @returns {void}
     */
    DocumentEditor.prototype.setDefaultCharacterFormat = function (characterFormat) {
        this.characterFormat = JSON.parse(HelperMethods.sanitizeString(JSON.stringify(characterFormat)));
        this.documentHelper.setDefaultDocumentFormat();
        if (!isNullOrUndefined(this.selectionModule)) {
            this.selectionModule.retrieveCurrentFormatProperties();
        }
    };
    /**
     * Sets the default paragraph format for document editor
     *
     * @param {ParagraphFormatProperties} paragraphFormat Specifies the paragraph format.
     * @returns {void}
     */
    DocumentEditor.prototype.setDefaultParagraphFormat = function (paragraphFormat) {
        this.paragraphFormat = JSON.parse(HelperMethods.sanitizeString(JSON.stringify(paragraphFormat)));
        this.documentHelper.setDefaultDocumentFormat();
        if (!isNullOrUndefined(this.selectionModule)) {
            this.selectionModule.retrieveCurrentFormatProperties();
        }
    };
    /**
     * Sets the default section format for document editor
     *
     * @param {SectionFormatProperties} sectionFormat Specifies the section format.
     * @returns {void}
     */
    DocumentEditor.prototype.setDefaultSectionFormat = function (sectionFormat) {
        this.sectionFormat = JSON.parse(HelperMethods.sanitizeString(JSON.stringify(sectionFormat)));
        this.documentHelper.setDefaultDocumentFormat();
        if (!isNullOrUndefined(this.selectionModule)) {
            this.selectionModule.retrieveCurrentFormatProperties();
        }
    };
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - Returns the persisted data.
     */
    DocumentEditor.prototype.getPersistData = function () {
        return 'documenteditor';
    };
    DocumentEditor.prototype.clearPreservedCollectionsInViewer = function () {
        if (this.viewer instanceof LayoutViewer) {
            this.documentHelper.clearDocumentItems();
        }
    };
    /**
     * @private
     * @returns {HTMLElement} - Returns the document editor element.
     */
    DocumentEditor.prototype.getDocumentEditorElement = function () {
        return this.element;
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireContentChange = function () {
        if (this.enableEditor && this.editorModule.isIncrementalSave) {
            return;
        }
        if (this.enableLockAndEdit && this.collaborativeEditingModule) {
            this.collaborativeEditingModule.saveContent();
        }
        var eventArgs = { source: this };
        if (this.enableCollaborativeEditing) {
            eventArgs.operations = [];
            if (this.isSettingOp) {
                eventArgs.operations = this.documentSettingOps;
                this.documentSettingOps = [];
                this.isSettingOp = false;
            }
            else {
                if (!isNullOrUndefined(this.editorHistoryModule)) {
                    if (!isNullOrUndefined(this.editorHistoryModule.currentHistoryInfo) && this.editorHistoryModule.currentHistoryInfo.action === 'IMEInput') {
                        eventArgs.operations = this.editorHistoryModule.currentHistoryInfo.getActionInfo();
                    }
                    else if (!isNullOrUndefined(this.editorHistoryModule.lastOperation)) {
                        var history_1 = this.editorHistoryModule.lastOperation;
                        if (history_1.action === 'IMEInput') {
                            eventArgs.operations = history_1.getActionInfo(true);
                        }
                        else {
                            eventArgs.operations = history_1.getActionInfo();
                        }
                        this.editorHistoryModule.lastOperation = undefined;
                    }
                    if (this.enableTrackChanges && eventArgs.operations.length > 0) {
                        for (var i = 0; i < eventArgs.operations.length; i++) {
                            if (isNullOrUndefined(eventArgs.operations[i].markerData)) {
                                eventArgs.operations[i].markerData = {};
                            }
                            if (isNullOrUndefined(eventArgs.operations[i].markerData.author) || eventArgs.operations[i].markerData.author === '') {
                                eventArgs.operations[i].markerData.author = this.currentUser;
                            }
                        }
                    }
                }
            }
        }
        this.trigger(contentChangeEvent, eventArgs);
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireDocumentChange = function () {
        if (this.enableLockAndEdit && this.enableEditor) {
            this.editorModule.enforceProtection('', false, true);
        }
        var eventArgs = { source: this };
        this.trigger(documentChangeEvent, eventArgs);
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireSelectionChange = function () {
        if (this.enableEditor && this.editorModule.isIncrementalSave) {
            return;
        }
        if (!this.documentHelper.isCompositionStart && Browser.isDevice && this.editorModule) {
            this.editorModule.predictText();
        }
        var eventArgs = { source: this, isCompleted: this.documentHelper.isCompleted };
        // if (this.createdTriggered) {
        this.trigger(selectionChangeEvent, eventArgs);
        this.documentHelper.isSelectionCompleted = this.documentHelper.isCompleted;
        this.documentHelper.isCompleted = true;
        // }
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireZoomFactorChange = function () {
        var eventArgs = { source: this };
        this.trigger(zoomFactorChangeEvent, eventArgs);
        this.notify(internalZoomFactorChange, eventArgs);
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireOptionPaneChange = function (show) {
        var eventArgs = { show: show };
        this.notify(internalOptionPaneChange, eventArgs);
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireBeformFieldFill = function () {
        var eventArgs = {};
        this.trigger(beforeFieldFillEvent, eventArgs);
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireAfterFormFieldFill = function () {
        var eventArgs = {};
        this.trigger(afterFieldFillEvent, eventArgs);
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireBeforeContentControlFill = function () {
        var eventArgs = {};
        this.trigger(beforecontentControlFillEvent, eventArgs);
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireAfterContentControlFill = function () {
        var eventArgs = {};
        this.trigger(aftercontentControlFillEvent, eventArgs);
    };
    /**
     * @private
     * @param {ServiceFailureArgs} eventArgs - Specifies the event args.
     * @returns {void}
     */
    DocumentEditor.prototype.fireServiceFailure = function (eventArgs) {
        this.trigger(serviceFailureEvent, eventArgs);
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireViewChange = function () {
        if (this.viewer && this.documentHelper.pages.length > 0) {
            if (this.viewer.visiblePages.length > 0) {
                var pages = this.viewer.visiblePages;
                var eventArgs = {
                    startPage: pages[0].index + 1,
                    endPage: pages[pages.length - 1].index + 1,
                    source: this
                };
                this.trigger(viewChangeEvent, eventArgs);
                this.notify(internalviewChangeEvent, eventArgs);
            }
        }
    };
    /**
     * @private
     * @param {string} item - Specifies the menu items.
     * @returns {void}
     */
    DocumentEditor.prototype.fireCustomContextMenuSelect = function (item) {
        var eventArgs = { id: item };
        this.trigger(customContextMenuSelectEvent, eventArgs);
    };
    /**
     * @private
     * @param {string[]} item - Specifies the menu items.
     * @returns {void}
     */
    DocumentEditor.prototype.fireCustomContextMenuBeforeOpen = function (item) {
        var eventArgs = { ids: item };
        this.trigger(customContextMenuBeforeOpenEvent, eventArgs);
    };
    /**
     * Shows the Paragraph dialog
     *
     * @private
     * @param {WParagraphFormat} paragraphFormat - Specifies the paragraph format.
     * @returns {void}
     */
    DocumentEditor.prototype.showParagraphDialog = function (paragraphFormat) {
        if (this.paragraphDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.paragraphDialogModule.show(paragraphFormat);
        }
        else {
            this.checkModuleInjection('ParagraphDialog', this.enableParagraphDialog);
        }
    };
    /**
     * Shows the margin dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showPageSetupDialog = function () {
        if (this.pageSetupDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.pageSetupDialogModule.show();
        }
        else {
            this.checkModuleInjection('PageSetupDialog', this.enablePageSetupDialog);
        }
    };
    /**
     * Shows insert columns dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showColumnsDialog = function () {
        if (this.columnsDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.columnsDialogModule.show();
        }
        else {
            this.checkModuleInjection('ColumnsDialog', this.enableColumnsDialog);
        }
    };
    /**
     * Shows the Footnote dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showFootNotesDialog = function () {
        if (this.footNotesDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.footNotesDialogModule.show();
        }
    };
    /**
     * Shows the font dialog
     *
     * @private
     * @param {WCharacterFormat} characterFormat - Specifies character format.
     * @returns {void}
     */
    DocumentEditor.prototype.showFontDialog = function (characterFormat) {
        if (this.fontDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.fontDialogModule.showFontDialog(characterFormat);
        }
        else {
            this.checkModuleInjection('FontDialog', this.enableFontDialog);
        }
    };
    /**
     * Shows the cell option dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showCellOptionsDialog = function () {
        if (this.cellOptionsDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.cellOptionsDialogModule.show();
        }
    };
    /**
     * Shows the table options dialog.
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showTableOptionsDialog = function () {
        if (this.tableOptionsDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.tableOptionsDialogModule.show();
        }
        else {
            this.checkModuleInjection('TableOptionsDialog', this.enableTableOptionsDialog);
        }
    };
    /**
     * Shows insert table dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showTableDialog = function () {
        if (this.tableDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.tableDialogModule.show();
        }
        else {
            this.checkModuleInjection('TableDialog', this.enableTableDialog);
        }
    };
    /**
     * Shows Date picker content dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showDateContentDialog = function () {
        if (this.dateContentDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.dateContentDialogModule.show();
        }
        else {
            this.checkModuleInjection('DateContentDialog', this.enableDateContentDialog);
        }
    };
    /**
    * Apply Content control properties
    *
    * @private
    * @returns {void}
    */
    DocumentEditor.prototype.showPicContentControlDialog = function () {
        var contentControlImage = this.getImageContentControl();
        var showPicCCButton = true;
        var pictureElement = true;
        var picturePositionY = this.picturePositionY;
        // to check whether the selection is empty =true, open the pic content control dialog 
        if (this.selection.isEmpty) {
            this.renderPictureContentControlElement(this, showPicCCButton, pictureElement, picturePositionY);
        }
        // to check whether selected image have content control =false , apply content control    
        if (this.selection.isImageSelected) {
            this.renderPictureContentControlElement(this, showPicCCButton, pictureElement, picturePositionY);
            if (!(contentControlImage instanceof ContentControl && contentControlImage.contentControlProperties.type != 'Picture')) {
                this.editor.insertContentControl('Picture');
            }
        }
    };
    /**
     * Shows Picture Content Control dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showpicContentControlDialogModule = function () {
        if (this.picContentControlDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.picContentControlDialogModule.show();
        }
        else {
            this.checkModuleInjection('PicContentControlDialog', this.enablePicContentControlDialog);
        }
    };
    /**
        * Shows Picture Content Control button
        *
        * @private
        * @returns {void}
    */
    DocumentEditor.prototype.renderPictureContentControlElement = function (documentEditor, showPicContentControl, pictureElement, picturePositionY) {
        var _this = this;
        var PICTURE_CONTENT_CONTROL = '_picture_Content_Control';
        if (!this.enableSelection) {
            return;
        }
        var attributes = {
            'id': this.element.id + 'PICTURE_CONTENT_CONTROL', innerHTML: 'Picture',
            class: 'e-btn-icon e-icons e-de-ctnr-image e-icon-left',
            style: 'height:' + 20 + 'px;width:' + 70 + 'px;z-index:5;position:absolute;background-color:#ccc;border:1px solid #ccc;display:',
        };
        var pictureCC;
        var contentControlImage;
        var element = document.getElementById(this.element.id + '_viewerContainer');
        var picture_cc = document.getElementById(this.element.id + 'PICTURE_CONTENT_CONTROL');
        if ((isNullOrUndefined(picture_cc) && showPicContentControl) || pictureElement) {
            pictureCC = this.rulerHelper.createHtmlElement('div', attributes);
            this.setPictureContentControlPositions(pictureCC);
            element.insertBefore(pictureCC, element.firstChild);
            pictureCC.style.display = "block";
            pictureCC.addEventListener('click', function (event) {
                contentControlImage = _this.getImageContentControl();
                if (isNullOrUndefined(contentControlImage) || !(contentControlImage.contentControlProperties.type == 'Picture')) {
                    _this.picContentControlDialogModule.show();
                }
            });
        }
        else if (!isNullOrUndefined(picture_cc) && showPicContentControl && !pictureElement) {
            picture_cc.style.display = "block";
            this.setPictureContentControlPositions(picture_cc);
            picture_cc.addEventListener('click', function (event) {
                contentControlImage = _this.getImageContentControl();
                if ((contentControlImage instanceof ContentControl && !contentControlImage.contentControlProperties.lockContentControl && contentControlImage.contentControlProperties.type == 'Picture' && !_this.documentHelper.owner.isReadOnlyMode)) {
                    _this.picContentControlDialogModule.show();
                }
            });
        }
        else if (!isNullOrUndefined(picture_cc) && !showPicContentControl && !pictureElement) {
            picture_cc.style.display = "none";
        }
        var locale = new L10n('documenteditor', this.defaultLocale);
        locale.setLocale(this.locale);
        locale.getConstant('Picture');
    };
    /**
        * Update the picture content control dialog position
        *
        * @private
        * @returns {void}
    */
    DocumentEditor.prototype.setPictureContentControlPositions = function (pictureElement) {
        var left = this.selection.isForward ? this.selection.start.location.x : this.selection.end.location.x;
        var top = this.selection.getTop(this.documentHelper.selection.start.currentWidget);
        pictureElement.style.left = ((left * this.documentHelper.zoomFactor) + this.documentHelper.pages[0].boundingRectangle.x).toString() + 'px';
        pictureElement.style.top = (top * this.documentHelper.zoomFactor).toString() + 'px';
    };
    /**
    * @private
    * @returns {ElementBox}
    */
    DocumentEditor.prototype.getImageContentControl = function () {
        var contentControlImage;
        var contentControlPara = this.documentHelper.owner.selectionModule.start.currentWidget.paragraph;
        for (var i = 0; i < contentControlPara.childWidgets.length; i++) {
            for (var j = 0; j < contentControlPara.childWidgets[i].children.length; j++) {
                var contentControlImageCheck = contentControlPara.childWidgets[i].children[j];
                if (contentControlImageCheck instanceof ContentControl && contentControlImageCheck.type == 0 && contentControlImageCheck.contentControlProperties.type == 'Picture') {
                    contentControlImage = contentControlPara.childWidgets[i].children[j];
                    break;
                }
            }
        }
        return contentControlImage;
    };
    /**
     * Shows content Control properties dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showContentPropertiesDialog = function () {
        if (this.contentControlPropertiesDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.contentControlPropertiesDialogModule.show();
        }
        else {
            this.checkModuleInjection('ContentControlPropertiesDialog', this.enableContentControlPropertiesDialog);
        }
    };
    /**
     * Shows the table of content dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showTableOfContentsDialog = function () {
        if (this.tableOfContentsDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.tableOfContentsDialogModule.show();
        }
        else {
            this.checkModuleInjection('TableOfContentsDialog', this.enableTableOfContentsDialog);
        }
    };
    /**
     * Shows the style dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showStyleDialog = function () {
        if (this.styleDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.styleDialogModule.show();
        }
        else {
            this.checkModuleInjection('StyleDialog', this.enableStyleDialog);
        }
    };
    /**
     * Shows the hyperlink dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showHyperlinkDialog = function () {
        if (this.hyperlinkDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.hyperlinkDialogModule.show();
        }
        else {
            this.checkModuleInjection('HyperlinkDialog', this.enableHyperlinkDialog);
        }
    };
    /**
     * Shows the bookmark dialog.
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showBookmarkDialog = function () {
        if (this.bookmarkDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.bookmarkDialogModule.show();
        }
        else {
            this.checkModuleInjection('BookmarkDialog', this.enableBookmarkDialog);
        }
    };
    /**
     * Shows the styles dialog.
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showStylesDialog = function () {
        if (this.stylesDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.stylesDialogModule.show();
        }
        else {
            this.checkModuleInjection('StylesDialog', this.enableStyleDialog);
        }
    };
    /**
     * Shows the List dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showListDialog = function () {
        if (this.listDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.listDialogModule.showListDialog();
        }
        else {
            this.checkModuleInjection('ListDialog', this.enableListDialog);
        }
    };
    /**
     * Shows the table properties dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showTablePropertiesDialog = function () {
        if (this.tablePropertiesDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.tablePropertiesDialogModule.show();
        }
        else {
            this.checkModuleInjection('TablePropertiesDialog', this.enableTablePropertiesDialog);
        }
    };
    /**
     * Shows the borders and shading dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showBordersAndShadingDialog = function () {
        if (this.bordersAndShadingDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.bordersAndShadingDialogModule.show();
        }
        else {
            this.checkModuleInjection('BordersAndShadingDialog', this.enableBordersAndShadingDialog);
        }
    };
    /* eslint-disable  */
    DocumentEditor.prototype.requiredModules = function () {
        var modules = [];
        if (this.enableCollaborativeEditing) {
            modules.push({
                member: 'CollaborativeEditingHandler', args: [this]
            });
        }
        if (this.enableLockAndEdit) {
            modules.push({
                member: 'CollaborativeEditing', args: [this]
            });
        }
        if (this.enablePrint) {
            modules.push({
                member: 'Print', args: []
            });
        }
        if (this.enableSfdtExport || this.enableWordExport || this.enableTextExport || this.enableSelection || this.enableEditor) {
            modules.push({
                member: 'SfdtExport', args: [this.documentHelper]
            });
        }
        if (this.enableWordExport) {
            modules.push({
                member: 'WordExport', args: []
            });
        }
        if (this.enableTextExport) {
            modules.push({
                member: 'TextExport', args: []
            });
        }
        if (this.enableSelection || this.enableSearch || this.enableEditor) {
            modules.push({
                member: 'Selection', args: [this]
            });
            if (this.enableContextMenu) {
                modules.push({
                    member: 'ContextMenu', args: [this.documentHelper]
                });
            }
        }
        if (this.enableSearch) {
            modules.push({
                member: 'Search', args: [this]
            });
            if (this.enableOptionsPane) {
                modules.push({
                    member: 'OptionsPane', args: [this.documentHelper]
                });
            }
        }
        if (this.documentEditorSettings && this.documentEditorSettings.enableOptimizedTextMeasuring) {
            DocumentEditor_1.Inject(Optimized);
            modules.push({ member: 'Optimized', args: [this.documentHelper] });
        }
        else {
            DocumentEditor_1.Inject(Regular);
            modules.push({ member: 'Regular', args: [this.documentHelper] });
        }
        if (this.enableEditor) {
            modules.push({
                member: 'Editor', args: [this.documentHelper]
            });
            modules.push({
                member: 'XmlPane', args: [this.documentHelper]
            });
            if (this.enableImageResizer) {
                modules.push({
                    member: 'ImageResizer', args: [this, this.documentHelper]
                });
            }
            if (this.enableEditorHistory) {
                modules.push({
                    member: 'EditorHistory', args: [this]
                });
            }
            if (this.enableHyperlinkDialog) {
                modules.push({
                    member: 'HyperlinkDialog', args: [this.documentHelper]
                });
            }
            if (this.enableTableDialog) {
                modules.push({
                    member: 'TableDialog', args: [this.documentHelper]
                });
            }
            if (this.enableDateContentDialog) {
                modules.push({
                    member: 'DateContentDialog', args: [this.documentHelper]
                });
            }
            if (this.enablePicContentControlDialog) {
                modules.push({
                    member: 'PicContentControlDialog', args: [this.documentHelper]
                });
            }
            if (this.enableContentControlPropertiesDialog) {
                modules.push({
                    member: 'ContentControlPropertiesDialog', args: [this.documentHelper]
                });
            }
            if (this.enableBookmarkDialog) {
                modules.push({
                    member: 'BookmarkDialog', args: [this.documentHelper]
                });
            }
            if (this.enableTableOfContentsDialog) {
                modules.push({
                    member: 'TableOfContentsDialog', args: [this.documentHelper]
                });
            }
            if (this.enablePageSetupDialog) {
                modules.push({
                    member: 'PageSetupDialog', args: [this.documentHelper]
                });
            }
            if (this.enableColumnsDialog) {
                modules.push({
                    member: 'ColumnsDialog', args: [this.documentHelper]
                });
            }
            if (this.enableFootnoteAndEndnoteDialog) {
                modules.push({
                    member: 'FootNotesDialog', args: [this.documentHelper]
                });
            }
            if (this.enableStyleDialog) {
                modules.push({
                    member: 'StylesDialog', args: [this.documentHelper]
                });
                modules.push({
                    member: 'StyleDialog', args: [this.documentHelper]
                });
                modules.push({
                    member: 'BulletsAndNumberingDialog', args: [this.documentHelper]
                });
            }
            if (this.enableListDialog) {
                modules.push({
                    member: 'ListDialog', args: [this.documentHelper]
                });
            }
            if (this.enableParagraphDialog) {
                modules.push({
                    member: 'ParagraphDialog', args: [this.documentHelper]
                });
                modules.push({
                    member: 'TabDialog', args: [this.documentHelper]
                });
            }
            if (this.enableFontDialog) {
                modules.push({
                    member: 'FontDialog', args: [this.documentHelper]
                });
            }
            if (this.enableTablePropertiesDialog) {
                modules.push({
                    member: 'TablePropertiesDialog', args: [this.documentHelper]
                });
                modules.push({
                    member: 'CellOptionsDialog', args: [this.documentHelper]
                });
            }
            if (this.enableBordersAndShadingDialog) {
                modules.push({
                    member: 'BordersAndShadingDialog', args: [this.documentHelper]
                });
            }
            if (this.enableTableOptionsDialog) {
                modules.push({
                    member: 'TableOptionsDialog', args: [this.documentHelper]
                });
            }
            if (this.enableSpellCheck) {
                modules.push({
                    member: 'SpellChecker', args: [this.documentHelper]
                });
                modules.push({
                    member: 'SpellCheckDialog', args: [this.documentHelper]
                });
            }
            if (this.enableFormField) {
                modules.push({
                    member: 'TextFormFieldDialog', args: [this]
                });
                modules.push({
                    member: 'DropDownFormFieldDialog', args: [this]
                });
                modules.push({
                    member: 'CheckBoxFormFieldDialog', args: [this]
                });
            }
        }
        return modules;
    };
    /**
     * @private
     * @param moduleName
     * @param value
     */
    DocumentEditor.prototype.checkModuleInjection = function (moduleName, value) {
        if (!value && !this.isReadOnly) {
            console.warn("[WARNING] :: Module \"" + moduleName + "\" is not available in Document Editor component! You either misspelled the module name or forgot to load it.");
            throw new Error("Inject " + moduleName + " module");
        }
    };
    DocumentEditor.prototype.open = function (sfdtText) {
        // sfdtText = HelperMethods.sanitizeString(sfdtText);
        showSpinner(this.element);
        try {
            if (!isNullOrUndefined(sfdtText)) {
                this.openInternal(sfdtText, false);
            }
        }
        catch (error) {
            this.failureHandler('onError');
        }
    };
    DocumentEditor.prototype.openAsync = function (sfdtText) {
        // sfdtText = HelperMethods.sanitizeString(sfdtText);
        showSpinner(this.element);
        try {
            if (!isNullOrUndefined(sfdtText)) {
                this.openInternal(sfdtText, true);
            }
        }
        catch (error) {
            this.failureHandler('onError');
        }
    };
    DocumentEditor.prototype.openInternal = function (sfdtText, isAsync) {
        var _this = this;
        var fileName = this.isValidUrl(sfdtText);
        if (fileName !== null) {
            this.getSfdtFromUrl(sfdtText, fileName)
                .then(function (sfdt) {
                sfdtText = sfdt;
                // Continue with the next steps after getting sfdt from URL
                _this.processSfdt(sfdtText);
            })
                .catch(function (error) {
                // Handle error
                console.error(error);
            });
        }
        else if (this.isValidBase64(sfdtText)) {
            this.getSfdtFromBase64string(sfdtText)
                .then(function (sfdt) {
                sfdtText = sfdt;
                // Continue with the next steps after getting sfdt from base64 string
                _this.processSfdt(sfdtText);
            })
                .catch(function (error) {
                // Handle error
                console.error(error);
            });
        }
        else if (sfdtText instanceof File) {
            this.convertToSfdt(sfdtText)
                .then(function (sfdt) {
                sfdtText = sfdt;
                // Continue with the next steps after converting file to sfdt
                _this.processSfdt(sfdtText);
            })
                .catch(function (error) {
                // Handle error
                console.error(error);
            });
        }
        else if (sfdtText instanceof Blob) {
            var name_1 = sfdtText.type.split('/');
            if (name_1[name_1.length - 1] === 'sfdt') {
                this.convertFromSfdtBlob(sfdtText)
                    .then(function (sfdt) {
                    sfdtText = sfdt;
                    // Continue with the next steps after converting from sfdt blob
                    _this.processSfdt(sfdtText);
                })
                    .catch(function (error) {
                    // Handle error
                    console.error(error);
                });
            }
            else {
                this.convertFromBlob(sfdtText)
                    .then(function (sfdt) {
                    sfdtText = sfdt;
                    // Continue with the next steps after converting from blob
                    _this.processSfdt(sfdtText);
                })
                    .catch(function (error) {
                    // Handle error
                    console.error(error);
                });
            }
        }
        else {
            if (!isAsync) {
                this.processSfdt(sfdtText);
            }
            else {
                setTimeout(function () {
                    try {
                        _this.processSfdt(sfdtText);
                    }
                    catch (error) {
                        _this.failureHandler('onError');
                    }
                }, 50);
            }
        }
    };
    DocumentEditor.prototype.processSfdt = function (sfdtText) {
        if (!isNullOrUndefined(this.viewer) && !isNullOrUndefined(sfdtText)) {
            this.clearPreservedCollectionsInViewer();
            this.documentHelper.userCollection.push('Everyone');
            this.documentHelper.lists = [];
            this.documentHelper.abstractLists = [];
            this.documentHelper.styles = new WStyles();
            this.documentHelper.cachedPages = [];
            this.clearSpellCheck();
            if (this.isSpellCheck) {
                if (this.isSpellCheck && !this.spellCheckerModule.enableOptimizedSpellCheck) {
                    this.documentHelper.triggerElementsOnLoading = true;
                    this.documentHelper.triggerSpellCheck = true;
                }
            }
            if (!isNullOrUndefined(sfdtText) && this.viewer) {
                var incrementalOps = {};
                var sections = this.parser.convertJsonToDocument(sfdtText, incrementalOps);
                this.documentHelper.setDefaultDocumentFormat();
                this.documentHelper.onDocumentChanged(sections, incrementalOps);
            }
            if (this.isSpellCheck) {
                if (this.isSpellCheck && !this.spellCheckerModule.enableOptimizedSpellCheck) {
                    this.documentHelper.triggerElementsOnLoading = false;
                    this.documentHelper.triggerSpellCheck = false;
                }
            }
        }
        hideSpinner(this.element);
    };
    DocumentEditor.prototype.isValidUrl = function (url) {
        try {
            var parsedUrl = new URL(url);
            var pathname = parsedUrl.pathname;
            var segments = pathname.split('/');
            var fileName = segments.pop();
            return fileName || null;
        }
        catch (error) {
            return null;
        }
    };
    DocumentEditor.prototype.isValidBase64 = function (input) {
        try {
            var decoded = atob(input);
            var reencoded = btoa(decoded);
            return reencoded === input;
        }
        catch (error) {
            return false;
        }
    };
    DocumentEditor.prototype.getSfdtFromUrl = function (value, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var documentEditor;
            return __generator(this, function (_a) {
                documentEditor = this;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', value, true);
                        xhr.responseType = 'blob';
                        xhr.onload = function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var blob, formData, sfdt;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(xhr.status === 200)) return [3 /*break*/, 2];
                                            blob = xhr.response;
                                            formData = new FormData();
                                            formData.append('file', blob, fileName);
                                            return [4 /*yield*/, documentEditor.send(formData)];
                                        case 1:
                                            sfdt = _a.sent();
                                            resolve(sfdt);
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            });
                        };
                        xhr.onerror = function () {
                            reject(null);
                        };
                        xhr.send();
                    })];
            });
        });
    };
    DocumentEditor.prototype.convertToSfdt = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var formData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        formData.append('files', file);
                        return [4 /*yield*/, this.send(formData)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DocumentEditor.prototype.getSfdtFromBase64string = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var binaryString, byteArray, i, blob, formData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        binaryString = atob(value);
                        byteArray = new Uint8Array(binaryString.length);
                        for (i = 0; i < binaryString.length; i++) {
                            byteArray[parseInt(i.toString(), 10)] = binaryString.charCodeAt(parseInt(i.toString(), 10));
                        }
                        blob = new Blob([byteArray], { type: 'application/octet-stream' });
                        formData = new FormData();
                        formData.append('file', blob);
                        return [4 /*yield*/, this.send(formData)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DocumentEditor.prototype.convertFromBlob = function (blob) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        type = this.getBlobType(blob.type);
                        type = type === '' ? blob.type : type;
                        formData.append('files', blob, type);
                        return [4 /*yield*/, this.send(formData)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DocumentEditor.prototype.getBlobType = function (type) {
        var contentType = '';
        switch (type) {
            case 'text/html':
                contentType = '.html';
                break;
            case 'text/plain':
                contentType = '.txt';
                break;
            case 'application/rtf':
                contentType = '.rtf';
                break;
            case 'application/xml':
                contentType = '.xml';
                break;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.template':
                contentType = '.dotx';
                break;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                contentType = '.docx';
                break;
            case 'application/msword':
                contentType = '.doc';
                break;
            case 'application/vnd.ms-word.document.macroEnabled.12':
                contentType = '.docm';
                break;
            case 'application/vnd.ms-word.template.macroenabled.12':
                contentType = '.dotm';
                break;
            case 'application/vnd.oasis.opendocument.text':
                contentType = '.odt';
                break;
        }
        return contentType;
    };
    DocumentEditor.prototype.send = function (formData) {
        var _this = this;
        var serviceUrl = this.serviceUrl + this.serverActionSettingsImport;
        return new Promise(function (resolve, reject) {
            var ajax = new XmlHttpRequestHandler();
            ajax.url = serviceUrl;
            ajax.onSuccess = function (result) {
                resolve(result.data);
            };
            ajax.onFailure = _this.failureHandler.bind(_this);
            ajax.onError = _this.failureHandler.bind(_this);
            ajax.customHeaders = _this.headers;
            var httprequestEventArgs = {
                serverActionType: _this.serverActionSettingsImport,
                headers: _this.headers, timeout: 0, cancel: false, withCredentials: false
            };
            _this.trigger(beforeXmlHttpRequestSend, httprequestEventArgs);
            if (httprequestEventArgs.cancel) {
                reject(null);
            }
            else {
                ajax.send(formData, httprequestEventArgs);
            }
        });
    };
    DocumentEditor.prototype.convertFromSfdtBlob = function (blob) {
        return new Promise(function (resolve) {
            var reader = new FileReader();
            // eslint-disable-next-line @typescript-eslint/tslint/config
            reader.onload = function (event) {
                var text = event.target.result;
                resolve(text);
            };
            reader.readAsText(blob);
        });
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    DocumentEditor.prototype.failureHandler = function (args) {
        hideSpinner(this.element);
        var locale = new L10n('documenteditor', this.defaultLocale);
        var status = args.name === 'onError' ? locale.getConstant('Error in establishing connection with web server') :
            locale.getConstant('Failed to load the file');
        var failedargs = { status: status, hideOpenFailedPopup: false };
        this.trigger(documentLoadFailedEvent, failedargs);
        if (!failedargs.hideOpenFailedPopup) {
            if (args.name === 'onError') {
                DialogUtility.alert({
                    content: locale.getConstant('Error in establishing connection with web server'),
                    closeOnEscape: true, showCloseIcon: true,
                    position: { X: 'center', Y: 'center' }
                }).enableRtl = this.enableRtl;
            }
            else if (args === 'onError') {
                alert(locale.getConstant('Failed to load the file'));
                //this.fireServiceFailure(args);
            }
        }
    };
    /**
     * Scrolls view to start of the given page number if exists.
     *
     * @param {number} pageNumber Specifies the page number.
     * @returns {void}
     */
    DocumentEditor.prototype.scrollToPage = function (pageNumber) {
        if (isNullOrUndefined(this.viewer) || pageNumber < 1 || pageNumber > this.documentHelper.pages.length) {
            return false;
        }
        this.viewer.scrollToPage(pageNumber - 1);
        return true;
    };
    /**
     * Enables all the modules.
     *
     * @returns {void}
     */
    DocumentEditor.prototype.enableAllModules = function () {
        this.enablePrint = this.enableSfdtExport = this.enableWordExport = this.enableTextExport
            = this.enableSelection = this.enableContextMenu = this.enableSearch = this.enableOptionsPane
                = this.enableEditor = this.enableImageResizer = this.enableEditorHistory
                    = this.enableHyperlinkDialog = this.enableTableDialog = this.enableBookmarkDialog
                        = this.enableTableOfContentsDialog = this.enableFootnoteAndEndnoteDialog
                            = this.enablePageSetupDialog = this.enableStyleDialog = this.enableDateContentDialog
                                = this.enablePicContentControlDialog
                                    = this.enableContentControlPropertiesDialog
                                        = this.enableListDialog = this.enableParagraphDialog = this.enableFontDialog
                                            = this.enableTablePropertiesDialog = this.enableBordersAndShadingDialog
                                                = this.enableTableOptionsDialog = this.enableSpellCheck = this.enableComment
                                                    = this.enableFormField = this.enableColumnsDialog = true;
        /* eslint-disable-next-line max-len */
        DocumentEditor_1.Inject(Print, SfdtExport, WordExport, TextExport, Selection, Search, Editor, ImageResizer, EditorHistory, ContextMenu, OptionsPane, HyperlinkDialog, TableDialog, NotesDialog, BookmarkDialog, TableOfContentsDialog, PageSetupDialog, StyleDialog, ListDialog, ParagraphDialog, TabDialog, DatePickerDialog, PicContentControlDialog, ContentControlPropertiesDialog, BulletsAndNumberingDialog, FontDialog, TablePropertiesDialog, BordersAndShadingDialog, TableOptionsDialog, CellOptionsDialog, StylesDialog, SpellChecker, SpellCheckDialog, CheckBoxFormFieldDialog, TextFormFieldDialog, DropDownFormFieldDialog, ColumnsDialog, XmlPane);
    };
    /**
     * Resizes the component and its sub elements based on given size or container size.
     *
     * @param {number} width Specifies the width
     * @param {number} height Specifies the hight
     * @returns {void}
     */
    DocumentEditor.prototype.resize = function (width, height) {
        if (this.element) {
            if (!isNullOrUndefined(width) && width > 200) {
                this.element.style.width = width + 'px';
            }
            if (!isNullOrUndefined(height) && height > 200) {
                this.element.style.height = height + 'px';
            }
            if (this.viewer) {
                this.documentHelper.updateViewerSize();
            }
            if (this.trackChangesPane.toolbar) {
                this.trackChangesPane.toolbar.refreshOverflow();
            }
            if (this.optionsPaneModule) {
                this.optionsPaneModule.refreshHeadingPaneHeight();
            }
        }
        if (this.rulerHelper && this.documentEditorSettings && this.documentEditorSettings.showRuler) {
            this.rulerHelper.updateRuler(this, false);
        }
        if (this.enableCollaborativeEditing && this.collaborativeEditingHandlerModule) {
            this.collaborativeEditingHandlerModule.updateCaretPosition();
        }
    };
    /**
     * Resize Document Editor
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.triggerResize = function () {
        var _this = this;
        if (this) {
            setTimeout(function () {
                if (_this) {
                    _this.resize();
                }
            }, 10);
        }
    };
    /**
     * Gets all the form field names in current document.
     *
     * @returns {string[]} Returns all the form field names in current document.
     */
    DocumentEditor.prototype.getFormFieldNames = function () {
        var formFieldNames = [];
        var formFields = this.documentHelper.formFields;
        for (var i = 0; i < formFields.length; i++) {
            if (formFields[parseInt(i.toString(), 10)].formFieldData.name !== '') {
                formFieldNames.push(formFields[parseInt(i.toString(), 10)].formFieldData.name);
            }
        }
        return formFieldNames;
    };
    /**
     * Gets the form field by name
     *
     * @param {string} name - The form field name.
     * @returns {TextFormFieldInfo | CheckBoxFormFieldInfo | DropDownFormFieldInfo} Returns the form field info.
     */
    DocumentEditor.prototype.getFormFieldInfo = function (name) {
        var formFields = this.documentHelper.formFields;
        for (var i = 0; i < formFields.length; i++) {
            if ((formFields[parseInt(i.toString(), 10)].formFieldData.name === name) && (formFields[parseInt(i.toString(), 10)].formFieldData.name !== '')) {
                return formFields[parseInt(i.toString(), 10)].formFieldData.getFormFieldInfo();
            }
        }
        return undefined;
    };
    /**
     * Sets the form field info with the specified name.
     *
     * @param {string} name Specifies the form field name
     * @param {TextFormFieldInfo | CheckBoxFormFieldInfo | DropDownFormFieldInfo} formFieldInfo - Form Field info.
     * @returns {void}
     */
    DocumentEditor.prototype.setFormFieldInfo = function (name, formFieldInfo) {
        name = HelperMethods.sanitizeString(name);
        var formFields = this.documentHelper.formFields;
        for (var i = 0; i < formFields.length; i++) {
            if ((formFields[parseInt(i.toString(), 10)].formFieldData.name === name) && (formFields[parseInt(i.toString(), 10)].formFieldData.name !== '')) {
                var currentField = formFields[parseInt(i.toString(), 10)];
                if (this.selectionModule) {
                    this.selectionModule.selectFieldInternal(currentField);
                    if (this.editorModule) {
                        this.editorModule.setFormField(currentField, formFieldInfo);
                    }
                    else {
                        this.checkModuleInjection('Editor', this.enableEditor);
                    }
                }
                else {
                    this.checkModuleInjection('Selection', this.enableSelection);
                }
                return;
            }
        }
    };
    /**
     * Resets the form field value to default with the specified form field name.
     *
     * @param {string} name Specifies the form field name
     * @returns {void}
     */
    DocumentEditor.prototype.resetFormFields = function (name) {
        if (!this.editorModule) {
            this.checkModuleInjection('Editor', this.enableEditor);
        }
        if (!isNullOrUndefined(name)) {
            name = HelperMethods.sanitizeString(name);
        }
        var formFields = this.documentHelper.formFields;
        for (var i = 0; i < formFields.length; i++) {
            if (isNullOrUndefined(name) || name === formFields[parseInt(i.toString(), 10)].formFieldData.name) {
                if (formFields[parseInt(i.toString(), 10)].formFieldData instanceof TextFormField) {
                    this.editorModule.updateFormField(formFields[parseInt(i.toString(), 10)], formFields[parseInt(i.toString(), 10)].formFieldData.defaultValue, true);
                }
                else if (formFields[parseInt(i.toString(), 10)].formFieldData instanceof CheckBoxFormField) {
                    /* eslint-disable-next-line max-len */
                    this.editorModule.toggleCheckBoxFormField(formFields[parseInt(i.toString(), 10)], true, formFields[parseInt(i.toString(), 10)].formFieldData.defaultValue);
                }
                else if (formFields[parseInt(i.toString(), 10)].formFieldData instanceof DropDownFormField) {
                    this.editorModule.updateFormField(formFields[parseInt(i.toString(), 10)], 0, true);
                }
            }
        }
    };
    /**
     * Imports the form field values.
     *
     * @param {FormFieldData[]} formData Specifies the form field values.
     * @returns {void}
     */
    DocumentEditor.prototype.importFormData = function (formData) {
        if (!this.editorModule) {
            this.checkModuleInjection('Editor', this.enableEditor);
        }
        var formField = this.documentHelper.formFields;
        for (var i = 0; i < formData.length; i++) {
            var formFieldData = formData[parseInt(i.toString(), 10)];
            var fieldName = formFieldData.fieldName;
            for (var j = 0; j < formField.length; j++) {
                if (formField[parseInt(j.toString(), 10)].formFieldData.name === fieldName) {
                    if (formField[parseInt(j.toString(), 10)].formFieldData instanceof CheckBoxFormField) {
                        this.editorModule.toggleCheckBoxFormField(formField[parseInt(j.toString(), 10)], true, formFieldData.value);
                    }
                    else if (formField[parseInt(j.toString(), 10)].formFieldData instanceof TextFormField) {
                        this.editorModule.updateFormField(formField[parseInt(j.toString(), 10)], formFieldData.value);
                    }
                    else if (formField[parseInt(j.toString(), 10)].formFieldData instanceof DropDownFormField) {
                        this.editorModule.updateFormField(formField[parseInt(j.toString(), 10)], formFieldData.value);
                    }
                }
            }
        }
    };
    /**
     * Exports the form field values.
     *
     * @returns {FormFieldData[]} Returns the form field data.
     */
    DocumentEditor.prototype.exportFormData = function () {
        var data = [];
        var formField = this.documentHelper.formFields;
        for (var i = 0; i < formField.length; i++) {
            if (formField[parseInt(i.toString(), 10)].formFieldData.name !== '') {
                var formData = { fieldName: '', value: '' };
                formData.fieldName = formField[parseInt(i.toString(), 10)].formFieldData.name;
                if (formField[parseInt(i.toString(), 10)].formFieldData instanceof CheckBoxFormField) {
                    formData.value = formField[parseInt(i.toString(), 10)].formFieldData.checked;
                }
                else if (formField[parseInt(i.toString(), 10)].formFieldData instanceof TextFormField) {
                    var resultText = '';
                    if (this.documentHelper.isInlineFormFillProtectedMode) {
                        resultText = this.editorModule.getFieldResultText(formField[parseInt(i.toString(), 10)]);
                    }
                    else {
                        resultText = formField[parseInt(i.toString(), 10)].resultText;
                    }
                    var rex = RegExp(this.documentHelper.textHelper.getEnSpaceCharacter(), 'gi');
                    if (resultText.replace(rex, '') === '') {
                        resultText = '';
                    }
                    formData.value = resultText;
                }
                else if (formField[parseInt(i.toString(), 10)].formFieldData instanceof DropDownFormField) {
                    formData.value = formField[parseInt(i.toString(), 10)].formFieldData.selectedIndex;
                }
                data.push(formData);
            }
        }
        return data;
    };
    /**
     * Imports content control data and returns the processed content control information.
     *
     * @param {ContentControlInfo[]} contentControlInfo - The array of content control information to be imported.
     * @returns {ContentControlInfo[]} The processed content control information.
     */
    DocumentEditor.prototype.importContentControlData = function (contentControlInfo) {
        for (var i = 0; i < contentControlInfo.length; i++) {
            var contentInfo = contentControlInfo[parseInt(i.toString(), 10)];
            for (var j = 0; j < this.documentHelper.contentControlCollection.length; j++) {
                var contentControl = this.documentHelper.contentControlCollection[parseInt(j.toString(), 10)];
                if (contentInfo.type === contentControl.contentControlProperties.type
                    && contentInfo.title === contentControl.contentControlProperties.title) {
                    this.editorModule.updateContentControl(contentControl, contentInfo.value);
                }
            }
        }
        return [];
    };
    /**
     * Exports the content control values.
     *
     * @returns {ContentControlInfo[]} The array of content control data.
     */
    DocumentEditor.prototype.exportContentControlData = function () {
        this.selection.contentControleditRegionHighlighters.clear();
        this.selection.onHighlightContentControl();
        var data = [];
        var properties = this.documentHelper.contentControlCollection;
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var contentControl = properties_1[_i];
            if (contentControl instanceof ContentControl) {
                var contentControlData = { title: '', tag: '', value: '', canDelete: false, canEdit: false, type: contentControl.contentControlProperties.type };
                contentControlData.title = contentControl.contentControlProperties.title;
                contentControlData.tag = contentControl.contentControlProperties.tag;
                if (contentControl.contentControlProperties.lockContentControl) {
                    contentControlData.canDelete = true;
                }
                if (contentControl.contentControlProperties.lockContents) {
                    contentControlData.canEdit = true;
                }
                var element = contentControl.nextElement;
                if (contentControl.contentControlProperties.type === 'Picture') {
                    if (element instanceof ImageElementBox) {
                        contentControlData.value = this.documentHelper.getImageString(element);
                    }
                }
                else if (contentControl.contentControlProperties.type === 'CheckBox') {
                    contentControlData.value = String(contentControl.contentControlProperties.isChecked);
                }
                else if (contentControl.contentControlProperties.type === 'Date') {
                    contentControlData.value = element.text;
                }
                else if (contentControl.contentControlProperties.type === 'ComboBox' || contentControl.contentControlProperties.type === 'DropDownList') {
                    contentControlData.value = this.getContentControlValue(element);
                }
                else {
                    contentControlData.value = this.getContentControlValueForText(contentControl);
                }
                data.push(contentControlData);
            }
        }
        return data;
    };
    /**
     * Resets the content control data.
     *
     * @param {ContentControlInfo[]} contentControInfo - The array of content control information to be reset.
     * @returns {void}
     */
    DocumentEditor.prototype.resetContentControlData = function (contentControInfo) {
        for (var i = 0; i < contentControInfo.length; i++) {
            var contentInfo = contentControInfo[parseInt(i.toString(), 10)];
            for (var j = 0; j < this.documentHelper.contentControlCollection.length; j++) {
                var contentControl = this.documentHelper.contentControlCollection[parseInt(j.toString(), 10)];
                if (contentInfo.title === contentControl.contentControlProperties.title) {
                    this.editorModule.updateContentControl(contentControl, contentInfo.value, true);
                }
            }
        }
    };
    /**
     * @param {TextElementBox} element - Specifies the text element box.
     * @private
     * @returns {string} - Returns the content control value.
     */
    DocumentEditor.prototype.getContentControlValue = function (element) {
        var text = '';
        while (element) {
            if (element instanceof ContentControl) {
                break;
            }
            if (element instanceof TextElementBox) {
                text += element.text;
            }
            element = element.nextElement;
        }
        return text;
    };
    /**
     * @param {ContentControl} element - Specifies the content control.
     * @private
     * @returns {string} - Returns the content control value.
     */
    DocumentEditor.prototype.getContentControlValueForText = function (element) {
        var text = '';
        var startIndex = element.line.children.indexOf(element) + 1;
        var skip = false;
        if (this.selection.contentControleditRegionHighlighters.containsKey(element)) {
            var contentInfo = this.selection.contentControleditRegionHighlighters.get(element);
            for (var i = 0; i < contentInfo.keys.length; i++) {
                var line = contentInfo.keys[parseInt(i.toString(), 10)];
                if (i > 0 && line.paragraph !== contentInfo.keys[i - 1].paragraph) {
                    text += '/n';
                }
                for (var j = startIndex; j < line.children.length; j++) {
                    startIndex = 0;
                    var textElement = line.children[parseInt(j.toString(), 10)];
                    if (textElement instanceof TextElementBox) {
                        text += textElement.text;
                    }
                    if (textElement instanceof ContentControl) {
                        skip = true;
                        break;
                    }
                }
                if (skip) {
                    break;
                }
            }
        }
        return text;
    };
    /**
     * Updates the fields in the current document.
     * Currently cross reference field only supported.
     *
     * @returns {void}
     */
    DocumentEditor.prototype.updateFields = function () {
        if (!this.selectionModule) {
            this.checkModuleInjection('Selection', this.enableSelection);
        }
        for (var i = 0; i < this.documentHelper.fields.length; i++) {
            var field = this.documentHelper.fields[parseInt(i.toString(), 10)];
            var code = this.selectionModule.getFieldCode(field);
            if (code.toLowerCase().trim().indexOf('ref ') === 0) {
                var fieldPara = field.line.paragraph;
                if (!isNullOrUndefined(fieldPara)
                    && !isNullOrUndefined(this.selectionModule)
                    && !isNullOrUndefined(this.selectionModule.getPage(fieldPara))) {
                    this.selectionModule.updateRefField(field);
                }
            }
        }
    };
    /**
     * Shifts the focus to the document.
     *
     * @returns {void}
     */
    DocumentEditor.prototype.focusIn = function () {
        if (this.viewer) {
            this.documentHelper.updateFocus();
        }
    };
    /**
     * Fits the page based on given fit type.
     *
     * @param {PageFitType} pageFitType - The default value of ‘pageFitType’ parameter is 'None'
     * @returns {void}
     */
    DocumentEditor.prototype.fitPage = function (pageFitType) {
        if (isNullOrUndefined(pageFitType)) {
            pageFitType = 'None';
        }
        if (this.viewer) {
            this.viewer.pageFitType = pageFitType;
        }
    };
    /**
     * Exports the specified page as image.
     *
     * @param {number} pageNumber Specifies the page number starts from index `1`.
     * @param {number} format Specifies the image format.
     * @returns {HTMLImageElement} Returns the html image element.
     */
    DocumentEditor.prototype.exportAsImage = function (pageNumber, format) {
        if (isNullOrUndefined(this.viewer)) {
            throw new Error('Invalid operation.');
        }
        if (this.printModule) {
            var mimeType = format === 'Png' ? 'image/png' : 'image/jpeg';
            return this.printModule.exportAsImage(this.documentHelper, pageNumber, mimeType);
        }
        else {
            this.checkModuleInjection('Print', this.enablePrint);
        }
        return undefined;
    };
    /**
     * Exports the specified page as content.
     *
     * @param {number} pageNumber Specifies the page number starts from index `1`.
     * @private
     * @returns {string} Returns the page as content.
     */
    DocumentEditor.prototype.exportAsPath = function (pageNumber) {
        if (!isNullOrUndefined(pageNumber) && pageNumber <= this.documentHelper.pages.length && pageNumber >= 1) {
            var printPage = this.documentHelper.pages[(pageNumber - 1)];
            this.documentHelper.render.isExporting = true;
            this.documentHelper.render.renderWidgets(printPage, 0, 0, 0, 0);
            //get the image data from the canvas
            var imageData = this.documentHelper.render.pageCanvas.toDataURL();
            this.documentHelper.render.pageCanvas.getContext('2d').renderedPath = '';
            this.documentHelper.render.isExporting = false;
            return imageData;
        }
        return undefined;
    };
    /**
     * Prints the document.
     *
     * @param {Window} printWindow - Default value of 'printWindow' parameter is undefined.
     * @returns {void}
     */
    DocumentEditor.prototype.print = function (printWindow) {
        if (isNullOrUndefined(this.viewer)) {
            throw new Error('Invalid operation.');
        }
        if (this.printModule) {
            if (this.layoutType === 'Continuous') {
                this.documentHelper.isWebPrinting = true;
                this.viewer = new PageLayoutViewer(this);
                this.editorModule.layoutWholeDocument();
                this.printModule.print(this.documentHelper, printWindow);
                this.viewer = new WebLayoutViewer(this);
                this.editorModule.layoutWholeDocument();
                this.documentHelper.isWebPrinting = false;
            }
            else {
                this.printModule.print(this.documentHelper, printWindow);
            }
        }
        else {
            this.checkModuleInjection('Print', this.enablePrint);
        }
    };
    /**
     * Serializes the data to JSON string.
     *
     * @returns {string} Returns the data as JSON string.
     */
    DocumentEditor.prototype.serialize = function () {
        var json = '';
        if (this.enableSfdtExport && this.sfdtExportModule instanceof SfdtExport) {
            json = this.sfdtExportModule.serialize();
        }
        else {
            this.checkModuleInjection('SfdtExport', this.enableSfdtExport);
        }
        return json;
    };
    /**
     * Saves the document.
     *
     * @param {string} fileName Specifies the file name.
     * @param {FormatType} formatType Specifies the format type.
     * @returns {void}
     */
    DocumentEditor.prototype.save = function (fileName, formatType) {
        var _this = this;
        if (!isNullOrUndefined(fileName)) {
            fileName = HelperMethods.sanitizeString(fileName);
        }
        fileName = fileName || 'Untitled';
        if (isNullOrUndefined(this.documentHelper)) {
            throw new Error('Invalid operation.');
        }
        if (formatType === 'Docx' || formatType === 'Dotx') {
            if (this.wordExportModule) {
                this.wordExportModule.save(this.documentHelper, fileName, formatType);
            }
            else {
                this.checkModuleInjection('WordExport', this.enableWordExport);
            }
        }
        else if (formatType === 'Txt') {
            if (this.textExportModule) {
                this.textExportModule.save(this.documentHelper, fileName);
            }
            else {
                this.checkModuleInjection('TextExport', this.enableTextExport);
            }
        }
        else if (formatType === 'Sfdt') {
            if (this.sfdtExportModule) {
                if (this.documentEditorSettings.optimizeSfdt) {
                    var jsonString = this.serialize();
                    var blob = new Blob([jsonString], {
                        type: 'application/json'
                    });
                    var archiveItem = new ZipArchiveItem(blob, 'sfdt');
                    var mArchive = new ZipArchive();
                    mArchive.addItem(archiveItem);
                    mArchive.saveAsBlob().then(function (blob) {
                        _this.zipArchiveBlobToSfdtFile(blob, fileName);
                    });
                }
                else {
                    var jsonString = this.serialize();
                    var blob = new Blob([jsonString], {
                        type: 'application/json'
                    });
                    Save.save(fileName + '.sfdt', blob);
                }
            }
            else {
                this.checkModuleInjection('SfdtExport', this.enableSfdtExport);
            }
        }
        else {
            throw new Error('Invalid operation. Specified export is not enabled.');
        }
    };
    DocumentEditor.prototype.zipArchiveBlobToSfdtFile = function (blob, fileName) {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            var jsonString = {};
            jsonString.sfdt = base64;
            var blob = new Blob([JSON.stringify(jsonString)], {
                type: 'application/json'
            });
            Save.save(fileName + '.sfdt', blob);
        };
    };
    /**
     * Saves the document as blob.
     *
     * @param {FormatType} formatType Specifies the format type.
     * @returns {Promise<Blob>} Returns the document as blob.
     */
    DocumentEditor.prototype.saveAsBlob = function (formatType) {
        var _this = this;
        if (isNullOrUndefined(this.viewer)) {
            throw new Error('Invalid operation');
        }
        return new Promise(function (resolve) {
            if (formatType === 'Docx' || formatType === 'Dotx') {
                if (_this.wordExportModule) {
                    resolve(_this.wordExportModule.saveAsBlob(_this.documentHelper, formatType));
                }
                else {
                    _this.checkModuleInjection('WordExport', _this.enableWordExport);
                }
            }
            else if (formatType === 'Txt') {
                if (_this.textExportModule) {
                    resolve(_this.textExportModule.saveAsBlob(_this.documentHelper));
                }
                else {
                    _this.checkModuleInjection('TextExport', _this.enableTextExport);
                }
            }
            else if (formatType === 'Sfdt') {
                if (_this.sfdtExportModule) {
                    if (_this.documentEditorSettings.optimizeSfdt) {
                        _this.sfdtExportModule.saveAsBlob(_this.documentHelper).then(function (blob) {
                            _this.getBase64StringFromBlob(blob).then(function (base64) {
                                var jsonString = {};
                                jsonString.sfdt = base64;
                                var blob = new Blob([JSON.stringify(jsonString)], {
                                    type: 'application/json'
                                });
                                resolve(blob);
                            });
                        });
                    }
                    else {
                        resolve(_this.sfdtExportModule.saveAsBlobNonOptimized(_this.documentHelper));
                    }
                }
                else {
                    _this.checkModuleInjection('SfdtExport', _this.enableSfdtExport);
                }
            }
        });
    };
    DocumentEditor.prototype.getBase64StringFromBlob = function (blob) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function () {
                var dataUrl = reader.result;
                var base64 = dataUrl.split(',')[1];
                resolve(base64);
            };
        });
    };
    /**
     * Opens a blank document.
     *
     * @returns {void}
     */
    DocumentEditor.prototype.openBlank = function () {
        var sections = [];
        sections.push(this.createNewBodyWidget());
        /* eslint-disable-next-line max-len */
        var hfs = this.parser.parseHeaderFooter({ header: {}, footer: {}, evenHeader: {}, evenFooter: {}, firstPageHeader: {}, firstPageFooter: {} }, undefined);
        if (this.viewer) {
            this.clearPreservedCollectionsInViewer();
            this.documentHelper.userCollection.push('Everyone');
            this.documentHelper.cachedPages = [];
            this.clearSpellCheck();
            this.documentHelper.setDefaultDocumentFormat();
            this.documentHelper.headersFooters.push(hfs);
            if (this.editorModule) {
                this.editorModule.intializeDefaultStyles();
                var style = this.documentHelper.styles.findByName('Normal');
                for (var i = 0; i < sections.length; i++) {
                    var paragraph = sections[parseInt(i.toString(), 10)].childWidgets[0];
                    paragraph.paragraphFormat.baseStyle = style;
                    paragraph.paragraphFormat.listFormat.baseStyle = style;
                }
            }
            this.documentHelper.onDocumentChanged(sections);
        }
    };
    /**
     * Gets the style names based on given style type.
     *
     * @param {StyleType} styleType Specifies the style type.
     * @returns {string[]} Returns the style names.
     */
    DocumentEditor.prototype.getStyleNames = function (styleType) {
        if (this.viewer) {
            return this.documentHelper.styles.getStyleNames(styleType);
        }
        return [];
    };
    /**
     * Gets the style objects on given style type.
     *
     * @param {StyleType} styleType Specifies the style type.
     * @returns {Object[]} Returns the Specifies styles.
     */
    DocumentEditor.prototype.getStyles = function (styleType) {
        if (this.viewer) {
            return this.documentHelper.styles.getStyles(styleType);
        }
        return [];
    };
    /* eslint-enable */
    /**
     * Gets the bookmarks.
     *
     * @returns {string[]} Returns the bookmark collection.
     */
    DocumentEditor.prototype.getBookmarks = function () {
        var bookmarks = [];
        if (this.viewer) {
            bookmarks = this.documentHelper.getBookmarks(true);
        }
        return bookmarks;
    };
    /**
     * Shows the dialog.
     *
     * @param {DialogType} dialogType Specifies the dialog type.
     * @returns {void}
     */
    DocumentEditor.prototype.showDialog = function (dialogType) {
        switch (dialogType) {
            case 'Hyperlink':
                this.showHyperlinkDialog();
                break;
            case 'Table':
                this.showTableDialog();
                break;
            case 'Bookmark':
                this.showBookmarkDialog();
                break;
            case 'TableOfContents':
                this.showTableOfContentsDialog();
                break;
            case 'PageSetup':
                this.showPageSetupDialog();
                break;
            case 'Columns':
                this.showColumnsDialog();
                break;
            case 'List':
                this.showListDialog();
                break;
            case 'Styles':
                this.showStylesDialog();
                break;
            case 'Style':
                this.showStyleDialog();
                break;
            case 'Paragraph':
                this.showParagraphDialog();
                break;
            case 'Font':
                this.showFontDialog();
                break;
            case 'TableProperties':
                this.showTablePropertiesDialog();
                break;
            case 'BordersAndShading':
                this.showBordersAndShadingDialog();
                break;
            case 'TableOptions':
                this.showTableOptionsDialog();
                break;
            case 'SpellCheck':
                this.showSpellCheckDialog();
                break;
            case 'DatepickerContentControl':
                this.showDateContentDialog();
                break;
            case 'PictureContentControl':
                this.showPicContentControlDialog();
                break;
            case 'ContentControlProperties':
                this.showContentPropertiesDialog();
                break;
            // case 'TabStop':
            //     this.showTabDialog();
            //     break;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.toggleShowHiddenMarksInternal = function () {
        this.documentEditorSettings.showHiddenMarks = !this.documentEditorSettings.showHiddenMarks;
        this.notify(internalDocumentEditorSettingsChange, this.documentEditorSettings);
    };
    /**
     * Shows the options pane.
     *
     * @returns {void}
     */
    DocumentEditor.prototype.showOptionsPane = function () {
        if (!isNullOrUndefined(this.optionsPaneModule) && !isNullOrUndefined(this.viewer)) {
            this.optionsPaneModule.showHideOptionsPane(true);
        }
        else {
            this.checkModuleInjection('OptionsPane', this.enableOptionsPane);
        }
    };
    /**
     * Shows the Xml pane.
     *
     * @returns {void}
     */
    DocumentEditor.prototype.showXmlPane = function () {
        if (!isNullOrUndefined(this.xmlPaneModule) && isNullOrUndefined(this.xmlPaneModule.element)) {
            this.xmlPaneModule.showXmlProperties(true);
        }
        else {
            this.checkModuleInjection('XmlPane', this.enableXMLPane);
        }
    };
    /**
     * Shows the restrict editing pane.
     *
     * @param {boolean} show Specifies to show or hide restrict editing pane.
     * @returns {void}
     */
    DocumentEditor.prototype.showRestrictEditingPane = function (show) {
        show = isNullOrUndefined(show) ? true : show;
        if (this.documentHelper && this.documentHelper.restrictEditingPane) {
            this.documentHelper.restrictEditingPane.showHideRestrictPane(show);
        }
    };
    /**
     * Shows the spell check dialog.
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showSpellCheckDialog = function () {
        if (this.spellCheckDialogModule && this.spellCheckerModule) {
            var element = this.spellCheckerModule.retriveText();
            if (!isNullOrUndefined(element)) {
                this.spellCheckDialogModule.show(element.text, element.element);
            }
        }
        else {
            this.checkModuleInjection('SpellCheck', this.enableSpellCheck);
        }
    };
    /**
     * Shows the tab dialog.
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showTabDialog = function () {
        if (this.tabDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.tabDialogModule.show();
        }
    };
    /**
     * Destroys all managed resources used by this object.
     *
     * @returns {void}
     */
    DocumentEditor.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.destroyDependentModules();
        if (!isNullOrUndefined(this.documentHelper)) {
            this.documentHelper.destroy();
        }
        if (this.viewer) {
            this.viewer.componentDestroy();
        }
        this.viewer = undefined;
        if (!isNullOrUndefined(this.element)) {
            this.element.classList.remove('e-documenteditor');
            this.element.innerHTML = '';
        }
        if (!this.refreshing) {
            this.element = undefined;
            this.rulerHelper.destroy();
        }
        if (this.parser) {
            this.parser.destroy();
            this.parser = undefined;
        }
        if (this.revisionsInternal) {
            this.revisionsInternal.destroy();
            this.revisionsInternal = undefined;
        }
        this.findResultsList = [];
        this.findResultsList = undefined;
        this.documentHelper = undefined;
    };
    /**
     * @param {WStyle} styleInCollection - Specifies the style in collection.
     * @param {WStyle} style - Specifies the style.
     * @private
     * @returns {void} - Returns the void.
     */
    DocumentEditor.prototype.updateStyle = function (styleInCollection, style) {
        if (!isNullOrUndefined(this.styleDialogModule)) {
            var type = style.type === 'Paragraph' ? !isNullOrUndefined(style.link) ? 'Linked Style' : 'Paragraph' : 'Character';
            styleInCollection.type = this.styleDialogModule.getTypeValue(type);
            styleInCollection.basedOn = style.basedOn;
            if (type === 'Paragraph' || type === 'Linked Style') {
                styleInCollection.next = style.next;
                styleInCollection.characterFormat.destroy();
                styleInCollection.characterFormat.copyFormat(style.characterFormat);
                var oldListId = styleInCollection.paragraphFormat.listFormat.listId;
                styleInCollection.paragraphFormat.destroy();
                styleInCollection.paragraphFormat.copyFormat(style.paragraphFormat);
                // this.updateList();
                styleInCollection.link = style.link;
                if (!isNullOrUndefined(oldListId) && oldListId > -1) {
                    var list = this.documentHelper.getListById(oldListId);
                    if (!isNullOrUndefined(list)) {
                        this.documentHelper.lists.splice(this.documentHelper.lists.indexOf(list), 1);
                    }
                }
            }
            else if (type === 'Character') {
                styleInCollection.characterFormat.destroy();
                styleInCollection.characterFormat.copyFormat(style.characterFormat);
            }
            styleInCollection.name = style.name;
        }
    };
    DocumentEditor.prototype.createNewBodyWidget = function () {
        var section = new BodyWidget();
        section.index = 0;
        section.sectionFormat = new WSectionFormat(section);
        if (this.sectionFormat) {
            this.parser.parseSectionFormat(0, this.sectionFormat, section.sectionFormat);
        }
        var paragraph = new ParagraphWidget();
        paragraph.index = 0;
        paragraph.paragraphFormat = new WParagraphFormat(paragraph);
        paragraph.characterFormat = new WCharacterFormat(paragraph);
        section.childWidgets.push(paragraph);
        paragraph.containerWidget = section;
        return section;
    };
    DocumentEditor.prototype.clearSpellCheck = function () {
        if (!isNullOrUndefined(this.spellCheckerModule)) {
            if (!isNullOrUndefined(this.spellCheckerModule.errorWordCollection)) {
                this.spellCheckerModule.errorWordCollection.clear();
            }
            if (!isNullOrUndefined(this.spellCheckerModule.uniqueWordsCollection)) {
                this.spellCheckerModule.uniqueWordsCollection.clear();
            }
        }
    };
    /**
     * @param {string} name - Specifies the name.
     * @param {number} listId - Specifies the list id.
     * @private
     * @returns {void} - Returns the void.
     */
    DocumentEditor.prototype.setStyleData = function (name, listId) {
        if (!this.enableCollaborativeEditing) {
            return;
        }
        this.isSettingOp = true;
        var operation;
        if (!isNullOrUndefined(name) && !isNullOrUndefined(this.documentHelper.owner.sfdtExportModule)) {
            var style = this.documentHelper.styles.findByName(name);
            if (!isNullOrUndefined(style)) {
                var styleObject = this.getStyleObject(style, listId);
                if (!isNullOrUndefined(style) && this.enableCollaborativeEditing) {
                    operation = {
                        action: 'Update',
                        styleData: JSON.stringify(styleObject)
                    };
                    this.documentSettingOps.push(operation);
                }
            }
        }
        this.fireContentChange();
    };
    /**
     * Sets custom fonts in the document editor.
     *
     * @param {string | object[]}fonts - A stringified JSON array or an array of objects, where each object defines:
     * - `fontFamily`: The name of the font family.
     * - `src`: A URL or relative path pointing to the font file.
     *
     * Example usage:
     *
     * // Using a stringified JSON array
     * documentEditor.setCustomFonts('[{fontFamily: "Algerian", src: "url('/fonts/myfont.ttf') format('ttf')"}, {fontFamily: "Arial", src: "url('https://example.com/font2.ttf') format('ttf')"}, {fontFamily: "Arial", src: "url('data:font/ttf;base64,d09GRgABAAAAAA...') format('ttf')"}]');
     *
     * // Using an array of objects
     * documentEditor.setCustomFonts([
     * {fontFamily: "Algerian", src: "url('/fonts/myfont.ttf') format('ttf')"},
     * {fontFamily: "Arial", src: "url('https://example.com/font2.ttf') format('ttf')"},
     * {fontFamily: "Arial", src: "url('data:font/ttf;base64,d09GRgABAAAAAA...') format('ttf')"}
     * ]);
     * @returns {void}
     */
    DocumentEditor.prototype.setCustomFonts = function (fonts) {
        var _this = this;
        var externalFonts;
        this.externalFonts = [];
        if (typeof fonts === 'string') {
            try {
                externalFonts = JSON.parse(fonts);
            }
            catch (error) {
                console.error('Failed to parse JSON string:', error);
                return;
            }
        }
        else if (Array.isArray(fonts)) {
            externalFonts = fonts;
        }
        else {
            console.error('Invalid input type');
            return;
        }
        externalFonts.forEach(function (externalFonts) {
            _this.externalFonts.push({
                fontFamily: externalFonts.fontFamily,
                src: externalFonts.src
            });
        });
        this.updateExternalStyle();
    };
    /**
     *
     * @private
     * @param {Object} style - Specifies the style.
     * @param {number} listId - Specifies the list id.
     * @returns {any} - Returns the style object.
     */
    DocumentEditor.prototype.getStyleObject = function (style, listId) {
        if (!isNullOrUndefined(style)) {
            var keyIndex = this.documentHelper.owner.sfdtExportModule.keywordIndex;
            this.documentHelper.owner.sfdtExportModule.keywordIndex = 1;
            var styleData = this.documentHelper.owner.sfdtExportModule.writeStyle(style);
            var styleObject = {
                'optimizeSfdt': true,
                'sty': [styleData]
            };
            if (this.editorModule.isLinkedStyle(style.name)) {
                var linkedStyle = this.documentHelper.styles.findByName(style.name + ' Char');
                var linkedStyleData = this.documentHelper.owner.sfdtExportModule.writeStyle(linkedStyle);
                styleObject.sty.push(linkedStyleData);
            }
            if (!isNullOrUndefined(listId) && listId > -1) {
                var list = this.documentHelper.getListById(listId);
                styleObject[listsProperty[1]] = [];
                styleObject[listsProperty[1]].push(this.sfdtExportModule.writeList(list));
                styleObject[abstractListsProperty[1]] = [];
                styleObject[abstractListsProperty[1]].push(this.sfdtExportModule.writeAbstractList(list.abstractList));
            }
            this.documentHelper.owner.sfdtExportModule.keywordIndex = keyIndex;
            return styleObject;
        }
        return undefined;
    };
    /**
     * @param {string} name - Specifies the name.
     * @param {boolean} value - Specifies the value.
     * @param {string} hashValue - Specifies the hash value.
     * @param {string} saltValue - Specifies the salt value.
     * @param {ProtectionType} protectionType - Specifies the protection type.
     * @private
     * @returns {void} - Returns the void.
     */
    DocumentEditor.prototype.getSettingData = function (name, value, hashValue, saltValue, protectionType) {
        if (!this.enableCollaborativeEditing || this.editorModule.isRemoteAction) {
            return;
        }
        this.isSettingOp = true;
        var protectionData;
        var operation;
        if (name === 'protection') {
            protectionData = {
                saltValue: saltValue,
                hashValue: hashValue,
                protectionType: protectionType
            };
            operation = {
                text: name,
                protectionData: protectionData
            };
        }
        else {
            operation = {
                text: name,
                enableTrackChanges: value
            };
        }
        if (!this.skipSettingsOps) {
            this.documentSettingOps.push(operation);
            this.fireContentChange();
        }
        this.skipSettingsOps = false;
        this.isSettingOp = false;
    };
    DocumentEditor.prototype.destroyDependentModules = function () {
        if (this.printModule) {
            this.printModule.destroy();
            this.printModule = undefined;
        }
        if (this.sfdtExportModule) {
            this.sfdtExportModule.destroy();
            this.sfdtExportModule = undefined;
        }
        if (this.optionsPaneModule) {
            this.optionsPaneModule.destroy();
            this.optionsPaneModule = undefined;
        }
        if (this.xmlPaneModule) {
            this.xmlPaneModule.destroy();
            this.xmlPaneModule = undefined;
        }
        if (this.commentReviewPane) {
            this.commentReviewPane.destroy();
            this.commentReviewPane = undefined;
        }
        if (this.trackChangesPane) {
            this.trackChangesPane.destroy();
            this.trackChangesPane = undefined;
        }
        if (!isNullOrUndefined(this.hyperlinkDialogModule)) {
            this.hyperlinkDialogModule.destroy();
            this.hyperlinkDialogModule = undefined;
        }
        if (this.searchModule) {
            this.searchModule.destroy();
            this.searchModule = undefined;
        }
        if (this.contextMenuModule) {
            this.contextMenuModule.componentDestroy();
            this.contextMenuModule = undefined;
        }
        if (this.editorModule) {
            this.editorModule.destroy();
            this.editorModule = undefined;
        }
        if (this.selectionModule) {
            this.selectionModule.destroy();
            this.selectionModule = undefined;
        }
        if (this.editorHistoryModule) {
            this.editorHistoryModule.destroy();
            this.editorHistoryModule = undefined;
        }
        if (!isNullOrUndefined(this.paragraphDialogModule)) {
            this.paragraphDialogModule.destroy();
            this.paragraphDialogModule = undefined;
        }
        if (this.tabDialogModule) {
            this.tabDialogModule.destroy();
            this.tabDialogModule = undefined;
        }
        if (this.pageSetupDialogModule) {
            this.pageSetupDialogModule.destroy();
            this.pageSetupDialogModule = undefined;
        }
        if (this.columnsDialogModule) {
            this.columnsDialogModule.destroy();
            this.columnsDialogModule = undefined;
        }
        if (this.footNotesDialogModule) {
            this.footNotesDialogModule.destroy();
            this.footNotesDialogModule = undefined;
        }
        if (this.fontDialogModule) {
            this.fontDialogModule.destroy();
            this.fontDialogModule = undefined;
        }
        if (this.listDialogModule) {
            this.listDialogModule.destroy();
            this.listDialogModule = undefined;
        }
        if (this.imageResizerModule) {
            this.imageResizerModule.destroy();
            this.imageResizerModule = undefined;
        }
        if (this.tablePropertiesDialogModule) {
            this.tablePropertiesDialogModule.destroy();
            this.tablePropertiesDialogModule = undefined;
        }
        if (this.contentControlPropertiesDialogModule) {
            this.contentControlPropertiesDialogModule.destroy();
            this.contentControlPropertiesDialogModule = undefined;
        }
        if (this.picContentControlDialogModule) {
            this.picContentControlDialogModule.destroy();
            this.picContentControlDialogModule = undefined;
        }
        if (this.bordersAndShadingDialogModule) {
            this.bordersAndShadingDialogModule.destroy();
            this.bordersAndShadingDialogModule = undefined;
        }
        if (this.cellOptionsDialogModule) {
            this.cellOptionsDialogModule.destroy();
            this.cellOptionsDialogModule = undefined;
        }
        if (this.tableOptionsDialogModule) {
            this.tableOptionsDialogModule.destroy();
            this.tableOptionsDialogModule = undefined;
        }
        if (this.tableDialogModule) {
            this.tableDialogModule.destroy();
            this.tableDialogModule = undefined;
        }
        if (this.bookmarkDialogModule) {
            this.bookmarkDialogModule.destroy();
            this.bookmarkDialogModule = undefined;
        }
        if (this.styleDialogModule) {
            this.styleDialogModule.destroy();
            this.styleDialogModule = undefined;
        }
        if (this.textExportModule) {
            this.textExportModule.destroy();
            this.textExportModule = undefined;
        }
        if (this.wordExportModule) {
            this.wordExportModule.destroy();
            this.wordExportModule = undefined;
        }
        if (this.tableOfContentsDialogModule) {
            this.tableOfContentsDialogModule.destroy();
            this.tableOfContentsDialogModule = undefined;
        }
        if (this.spellCheckerModule) {
            this.spellCheckerModule.destroy();
            this.spellCheckerModule = undefined;
        }
        if (this.checkBoxFormFieldDialogModule) {
            this.checkBoxFormFieldDialogModule.destroy();
            this.checkBoxFormFieldDialogModule = undefined;
        }
        if (this.dropDownFormFieldDialogModule) {
            this.dropDownFormFieldDialogModule.destroy();
            this.dropDownFormFieldDialogModule = undefined;
        }
        if (this.textFormFieldDialogModule) {
            this.textFormFieldDialogModule.destroy();
            this.textFormFieldDialogModule = undefined;
        }
        if (this.spellCheckDialogModule) {
            this.spellCheckDialogModule.destroy();
            this.spellCheckDialogModule = undefined;
        }
        if (this.stylesDialogModule) {
            this.stylesDialogModule.destroy();
            this.stylesDialogModule = undefined;
        }
        if (this.optimizedModule) {
            this.optimizedModule.destroy();
            this.optimizedModule = undefined;
        }
        if (this.regularModule) {
            this.regularModule.destroy();
            this.regularModule = undefined;
        }
        if (this.hRuler) {
            this.hRuler.destroy();
            this.hRuler = undefined;
        }
        if (this.vRuler) {
            this.vRuler.destroy();
            this.vRuler = undefined;
        }
        if (this.rulerContainer) {
            this.rulerContainer.remove();
            this.rulerContainer = null;
        }
    };
    var DocumentEditor_1;
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableCollaborativeEditing", void 0);
    __decorate([
        Property('KeepSourceFormatting')
    ], DocumentEditor.prototype, "defaultPasteOption", void 0);
    __decorate([
        Property('Pages')
    ], DocumentEditor.prototype, "layoutType", void 0);
    __decorate([
        Property('')
    ], DocumentEditor.prototype, "currentUser", void 0);
    __decorate([
        Property('#FFFF00')
    ], DocumentEditor.prototype, "userColor", void 0);
    __decorate([
        Property(20)
    ], DocumentEditor.prototype, "pageGap", void 0);
    __decorate([
        Property('')
    ], DocumentEditor.prototype, "documentName", void 0);
    __decorate([
        Property('100%')
    ], DocumentEditor.prototype, "width", void 0);
    __decorate([
        Property('200px')
    ], DocumentEditor.prototype, "height", void 0);
    __decorate([
        Property('')
    ], DocumentEditor.prototype, "serviceUrl", void 0);
    __decorate([
        Property(1)
    ], DocumentEditor.prototype, "zoomFactor", void 0);
    __decorate([
        Property(2000)
    ], DocumentEditor.prototype, "zIndex", void 0);
    __decorate([
        Property(true)
    ], DocumentEditor.prototype, "isReadOnly", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enablePrint", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableSelection", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableEditor", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableEditorHistory", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableSfdtExport", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableWordExport", void 0);
    __decorate([
        Property(true)
    ], DocumentEditor.prototype, "enableAutoFocus", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableTextExport", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableOptionsPane", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableContextMenu", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableHyperlinkDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableBookmarkDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableTableOfContentsDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableSearch", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableParagraphDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableListDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableTablePropertiesDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableBordersAndShadingDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableFootnoteAndEndnoteDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableColumnsDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enablePageSetupDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableStyleDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableFontDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableTableOptionsDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableTableDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableImageResizer", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableSpellCheck", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableComment", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableTrackChanges", void 0);
    __decorate([
        Property(true)
    ], DocumentEditor.prototype, "enableFormField", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "acceptTab", void 0);
    __decorate([
        Property(true)
    ], DocumentEditor.prototype, "useCtrlClickToFollowHyperlink", void 0);
    __decorate([
        Property('#000000')
    ], DocumentEditor.prototype, "pageOutline", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableCursorOnReadOnly", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableLocalPaste", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableLockAndEdit", void 0);
    __decorate([
        Complex({}, DocumentEditorSettings)
    ], DocumentEditor.prototype, "documentEditorSettings", void 0);
    __decorate([
        Complex({}, DocumentSettings)
    ], DocumentEditor.prototype, "documentSettings", void 0);
    __decorate([
        Property({ systemClipboard: 'SystemClipboard', spellCheck: 'SpellCheck', spellCheckByPage: 'SpellCheckByPage', restrictEditing: 'RestrictEditing', canLock: 'CanLock', getPendingActions: 'GetPendingActions' })
    ], DocumentEditor.prototype, "serverActionSettings", void 0);
    __decorate([
        Property([])
    ], DocumentEditor.prototype, "headers", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "showComments", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "showRevisions", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "autoResizeOnVisibilityChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "documentChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "viewChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "zoomFactorChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "selectionChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "requestNavigate", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "contentChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "keyDown", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "searchResultsChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "created", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "customContextMenuSelect", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "customContextMenuBeforeOpen", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "beforePaneSwitch", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "commentBegin", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "commentEnd", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "beforeFileOpen", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "commentDelete", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "beforeAcceptRejectChanges", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "beforeCommentAction", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "trackChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "beforeFormFieldFill", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "serviceFailure", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "afterFormFieldFill", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "actionComplete", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "contentControl", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "beforeXmlHttpRequestSend", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "documentLoadFailed", void 0);
    DocumentEditor = DocumentEditor_1 = __decorate([
        NotifyPropertyChanges
    ], DocumentEditor);
    return DocumentEditor;
}(Component));
export { DocumentEditor };
/**
 * The `ServerActionSettings` module is used to provide the server action methods of Document Editor.
 */
var ServerActionSettings = /** @class */ (function (_super) {
    __extends(ServerActionSettings, _super);
    function ServerActionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('SystemClipboard')
    ], ServerActionSettings.prototype, "systemClipboard", void 0);
    __decorate([
        Property('SpellCheck')
    ], ServerActionSettings.prototype, "spellCheck", void 0);
    __decorate([
        Property('SpellCheckByPage')
    ], ServerActionSettings.prototype, "spellCheckByPage", void 0);
    __decorate([
        Property('RestrictEditing')
    ], ServerActionSettings.prototype, "restrictEditing", void 0);
    __decorate([
        Property('CanLock')
    ], ServerActionSettings.prototype, "canLock", void 0);
    __decorate([
        Property('GetPendingActions')
    ], ServerActionSettings.prototype, "getPendingActions", void 0);
    return ServerActionSettings;
}(ChildProperty));
export { ServerActionSettings };
/**
 * Form field settings.
 */
var FormFieldSettings = /** @class */ (function (_super) {
    __extends(FormFieldSettings, _super);
    function FormFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('#cfcfcf')
    ], FormFieldSettings.prototype, "shadingColor", void 0);
    __decorate([
        Property(true)
    ], FormFieldSettings.prototype, "applyShading", void 0);
    __decorate([
        Property('#cccccc')
    ], FormFieldSettings.prototype, "selectionColor", void 0);
    __decorate([
        Property('Popup')
    ], FormFieldSettings.prototype, "formFillingMode", void 0);
    __decorate([
        Property([])
    ], FormFieldSettings.prototype, "formattingExceptions", void 0);
    return FormFieldSettings;
}(ChildProperty));
export { FormFieldSettings };
/**
 * Represents the collaborative editing settings.
 */
var CollaborativeEditingSettings = /** @class */ (function (_super) {
    __extends(CollaborativeEditingSettings, _super);
    function CollaborativeEditingSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], CollaborativeEditingSettings.prototype, "roomName", void 0);
    __decorate([
        Property('#22b24b')
    ], CollaborativeEditingSettings.prototype, "editableRegionColor", void 0);
    __decorate([
        Property('#f44336')
    ], CollaborativeEditingSettings.prototype, "lockedRegionColor", void 0);
    __decorate([
        Property(3000)
    ], CollaborativeEditingSettings.prototype, "saveTimeout", void 0);
    return CollaborativeEditingSettings;
}(ChildProperty));
export { CollaborativeEditingSettings };
/**
 * The `ServerActionSettings` module is used to provide the server action methods of Document Editor Container.
 */
var ContainerServerActionSettings = /** @class */ (function (_super) {
    __extends(ContainerServerActionSettings, _super);
    function ContainerServerActionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Import')
    ], ContainerServerActionSettings.prototype, "import", void 0);
    return ContainerServerActionSettings;
}(ServerActionSettings));
export { ContainerServerActionSettings };
