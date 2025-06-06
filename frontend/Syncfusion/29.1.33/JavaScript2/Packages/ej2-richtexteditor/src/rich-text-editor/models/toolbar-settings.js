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
import { Property, ChildProperty, Complex, Event } from '@syncfusion/ej2-base';
import { AjaxSettings, ContextMenuSettings } from '@syncfusion/ej2-filemanager';
import { DetailsViewSettings, NavigationPaneSettings } from '@syncfusion/ej2-filemanager';
import { SearchSettings } from '@syncfusion/ej2-filemanager';
import { ToolbarSettings as FileToolbarSettings } from '@syncfusion/ej2-filemanager';
import { UploadSettings } from '@syncfusion/ej2-filemanager';
import { ToolbarType } from '../base/enum';
import { backgroundColor, fontColor, fontFamily, fontSize, formatItems, predefinedItems, TableStyleItems, numberFormatList, bulletFormatList, defaultEmojiIcons } from './items';
/**
 * Configures the toolbar settings of the RichTextEditor.
 */
var ToolbarSettings = /** @class */ (function (_super) {
    __extends(ToolbarSettings, _super);
    function ToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], ToolbarSettings.prototype, "enable", void 0);
    __decorate([
        Property(true)
    ], ToolbarSettings.prototype, "enableFloating", void 0);
    __decorate([
        Property(ToolbarType.Expand)
    ], ToolbarSettings.prototype, "type", void 0);
    __decorate([
        Property(predefinedItems)
    ], ToolbarSettings.prototype, "items", void 0);
    __decorate([
        Property({})
    ], ToolbarSettings.prototype, "itemConfigs", void 0);
    return ToolbarSettings;
}(ChildProperty));
export { ToolbarSettings };
/**
 * Configures the importWord settings of the RichTextEditor.
 */
var ImportWord = /** @class */ (function (_super) {
    __extends(ImportWord, _super);
    function ImportWord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], ImportWord.prototype, "serviceUrl", void 0);
    return ImportWord;
}(ChildProperty));
export { ImportWord };
/**
 * Configures the export settings for Word format in the RichTextEditor.
 */
var ExportWord = /** @class */ (function (_super) {
    __extends(ExportWord, _super);
    function ExportWord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], ExportWord.prototype, "serviceUrl", void 0);
    __decorate([
        Property('Sample.docx')
    ], ExportWord.prototype, "fileName", void 0);
    __decorate([
        Property(null)
    ], ExportWord.prototype, "stylesheet", void 0);
    return ExportWord;
}(ChildProperty));
export { ExportWord };
/**
 * Configures the export settings for PDF format in the RichTextEditor.
 */
var ExportPdf = /** @class */ (function (_super) {
    __extends(ExportPdf, _super);
    function ExportPdf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], ExportPdf.prototype, "serviceUrl", void 0);
    __decorate([
        Property('Sample.pdf')
    ], ExportPdf.prototype, "fileName", void 0);
    __decorate([
        Property(null)
    ], ExportPdf.prototype, "stylesheet", void 0);
    return ExportPdf;
}(ChildProperty));
export { ExportPdf };
/**
 * Configures the image settings of the RichTextEditor.
 */
var ImageSettings = /** @class */ (function (_super) {
    __extends(ImageSettings, _super);
    function ImageSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(['.jpeg', '.jpg', '.png'])
    ], ImageSettings.prototype, "allowedTypes", void 0);
    __decorate([
        Property('inline')
    ], ImageSettings.prototype, "display", void 0);
    __decorate([
        Property('Blob')
    ], ImageSettings.prototype, "saveFormat", void 0);
    __decorate([
        Property('auto')
    ], ImageSettings.prototype, "width", void 0);
    __decorate([
        Property('auto')
    ], ImageSettings.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], ImageSettings.prototype, "saveUrl", void 0);
    __decorate([
        Property(null)
    ], ImageSettings.prototype, "path", void 0);
    __decorate([
        Property(true)
    ], ImageSettings.prototype, "resize", void 0);
    __decorate([
        Property(null)
    ], ImageSettings.prototype, "removeUrl", void 0);
    __decorate([
        Property(0)
    ], ImageSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(null)
    ], ImageSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(0)
    ], ImageSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(null)
    ], ImageSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(false)
    ], ImageSettings.prototype, "resizeByPercent", void 0);
    return ImageSettings;
}(ChildProperty));
export { ImageSettings };
/**
 * Configures the audio settings of the RichTextEditor.
 */
var AudioSettings = /** @class */ (function (_super) {
    __extends(AudioSettings, _super);
    function AudioSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(['.wav', '.mp3', '.m4a', '.wma'])
    ], AudioSettings.prototype, "allowedTypes", void 0);
    __decorate([
        Property('Inline')
    ], AudioSettings.prototype, "layoutOption", void 0);
    __decorate([
        Property('Blob')
    ], AudioSettings.prototype, "saveFormat", void 0);
    __decorate([
        Property(null)
    ], AudioSettings.prototype, "saveUrl", void 0);
    __decorate([
        Property(null)
    ], AudioSettings.prototype, "removeUrl", void 0);
    __decorate([
        Property(null)
    ], AudioSettings.prototype, "path", void 0);
    return AudioSettings;
}(ChildProperty));
export { AudioSettings };
/**
 * Configures the video settings of the RichTextEditor.
 */
var VideoSettings = /** @class */ (function (_super) {
    __extends(VideoSettings, _super);
    function VideoSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(['.mp4', '.mov', '.wmv', '.avi'])
    ], VideoSettings.prototype, "allowedTypes", void 0);
    __decorate([
        Property('Inline')
    ], VideoSettings.prototype, "layoutOption", void 0);
    __decorate([
        Property('Blob')
    ], VideoSettings.prototype, "saveFormat", void 0);
    __decorate([
        Property('auto')
    ], VideoSettings.prototype, "width", void 0);
    __decorate([
        Property('auto')
    ], VideoSettings.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], VideoSettings.prototype, "saveUrl", void 0);
    __decorate([
        Property(null)
    ], VideoSettings.prototype, "path", void 0);
    __decorate([
        Property(true)
    ], VideoSettings.prototype, "resize", void 0);
    __decorate([
        Property(null)
    ], VideoSettings.prototype, "removeUrl", void 0);
    __decorate([
        Property(0)
    ], VideoSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(null)
    ], VideoSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(0)
    ], VideoSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(null)
    ], VideoSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(false)
    ], VideoSettings.prototype, "resizeByPercent", void 0);
    return VideoSettings;
}(ChildProperty));
export { VideoSettings };
/**
 * Configures the file manager settings of the RichTextEditor.
 */
var FileManagerSettings = /** @class */ (function (_super) {
    __extends(FileManagerSettings, _super);
    function FileManagerSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Event()
    ], FileManagerSettings.prototype, "beforeSend", void 0);
    __decorate([
        Complex({ getImageUrl: null, url: null, uploadUrl: null }, AjaxSettings)
    ], FileManagerSettings.prototype, "ajaxSettings", void 0);
    __decorate([
        Property(false)
    ], FileManagerSettings.prototype, "allowDragAndDrop", void 0);
    __decorate([
        Complex({ visible: true, file: ['Open', '|', 'Cut', 'Copy', '|', 'Delete', 'Rename', '|', 'Details'], folder: ['Open', '|', 'Cut', 'Copy', 'Paste', '|', 'Delete', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', 'Upload', '|', 'Details', '|', 'SelectAll'] }, ContextMenuSettings)
    ], FileManagerSettings.prototype, "contextMenuSettings", void 0);
    __decorate([
        Property('')
    ], FileManagerSettings.prototype, "cssClass", void 0);
    __decorate([
        Complex({}, DetailsViewSettings)
    ], FileManagerSettings.prototype, "detailsViewSettings", void 0);
    __decorate([
        Property(false)
    ], FileManagerSettings.prototype, "enable", void 0);
    __decorate([
        Complex({ maxWidth: '650px', minWidth: '240px', visible: true }, NavigationPaneSettings)
    ], FileManagerSettings.prototype, "navigationPaneSettings", void 0);
    __decorate([
        Property('/')
    ], FileManagerSettings.prototype, "path", void 0);
    __decorate([
        Property(null)
    ], FileManagerSettings.prototype, "rootAliasName", void 0);
    __decorate([
        Complex({}, SearchSettings)
    ], FileManagerSettings.prototype, "searchSettings", void 0);
    __decorate([
        Property(true)
    ], FileManagerSettings.prototype, "showFileExtension", void 0);
    __decorate([
        Property(false)
    ], FileManagerSettings.prototype, "showHiddenItems", void 0);
    __decorate([
        Property(true)
    ], FileManagerSettings.prototype, "showThumbnail", void 0);
    __decorate([
        Property('Ascending')
    ], FileManagerSettings.prototype, "sortOrder", void 0);
    __decorate([
        Complex({ visible: true, items: ['NewFolder', 'Upload', 'Cut', 'Copy', 'Paste', 'Delete', 'Download', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'] }, FileToolbarSettings)
    ], FileManagerSettings.prototype, "toolbarSettings", void 0);
    __decorate([
        Complex({ autoUpload: true, minFileSize: 0, maxFileSize: 30000000, allowedExtensions: '', autoClose: false }, UploadSettings)
    ], FileManagerSettings.prototype, "uploadSettings", void 0);
    __decorate([
        Property('LargeIcons')
    ], FileManagerSettings.prototype, "view", void 0);
    return FileManagerSettings;
}(ChildProperty));
export { FileManagerSettings };
var TableSettings = /** @class */ (function (_super) {
    __extends(TableSettings, _super);
    function TableSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('100%')
    ], TableSettings.prototype, "width", void 0);
    __decorate([
        Property(TableStyleItems)
    ], TableSettings.prototype, "styles", void 0);
    __decorate([
        Property(true)
    ], TableSettings.prototype, "resize", void 0);
    __decorate([
        Property(0)
    ], TableSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(null)
    ], TableSettings.prototype, "maxWidth", void 0);
    return TableSettings;
}(ChildProperty));
export { TableSettings };
/**
 * Configures the quick toolbar settings of the RichTextEditor.
 */
var QuickToolbarSettings = /** @class */ (function (_super) {
    __extends(QuickToolbarSettings, _super);
    function QuickToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], QuickToolbarSettings.prototype, "enable", void 0);
    __decorate([
        Property(false)
    ], QuickToolbarSettings.prototype, "showOnRightClick", void 0);
    __decorate([
        Property('hide')
    ], QuickToolbarSettings.prototype, "actionOnScroll", void 0);
    __decorate([
        Property(['Open', 'Edit', 'UnLink'])
    ], QuickToolbarSettings.prototype, "link", void 0);
    __decorate([
        Property(['Replace', 'Align', 'Caption', 'Remove', '-', 'InsertLink', 'OpenImageLink', 'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension'])
    ], QuickToolbarSettings.prototype, "image", void 0);
    __decorate([
        Property(['AudioReplace', 'AudioRemove', 'AudioLayoutOption'])
    ], QuickToolbarSettings.prototype, "audio", void 0);
    __decorate([
        Property(['VideoReplace', 'VideoAlign', 'VideoRemove', 'VideoLayoutOption', 'VideoDimension'])
    ], QuickToolbarSettings.prototype, "video", void 0);
    __decorate([
        Property(null)
    ], QuickToolbarSettings.prototype, "text", void 0);
    __decorate([
        Property(['TableHeader', 'TableRows', 'TableColumns', 'BackgroundColor', '-', 'TableRemove', 'Alignments', 'TableCellVerticalAlign', 'Styles'])
    ], QuickToolbarSettings.prototype, "table", void 0);
    return QuickToolbarSettings;
}(ChildProperty));
export { QuickToolbarSettings };
/**
 * Configures the format painter settings of the RichTextEditor.
 */
var FormatPainterSettings = /** @class */ (function (_super) {
    __extends(FormatPainterSettings, _super);
    function FormatPainterSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('b; em; font; sub; sup; kbd; i; s; u; code; strong; span; p; div; h1; h2; h3; h4; h5; h6; blockquote; ol; ul; li; pre;')
    ], FormatPainterSettings.prototype, "allowedFormats", void 0);
    __decorate([
        Property(null)
    ], FormatPainterSettings.prototype, "deniedFormats", void 0);
    return FormatPainterSettings;
}(ChildProperty));
export { FormatPainterSettings };
/**
 * Specifies the emoji picker options in the RichTextEditor.
 */
var EmojiSettings = /** @class */ (function (_super) {
    __extends(EmojiSettings, _super);
    function EmojiSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(defaultEmojiIcons)
    ], EmojiSettings.prototype, "iconsSet", void 0);
    __decorate([
        Property(true)
    ], EmojiSettings.prototype, "showSearchBox", void 0);
    return EmojiSettings;
}(ChildProperty));
export { EmojiSettings };
/**
 * Configures the paste cleanup settings of the RichTextEditor.
 */
var PasteCleanupSettings = /** @class */ (function (_super) {
    __extends(PasteCleanupSettings, _super);
    function PasteCleanupSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], PasteCleanupSettings.prototype, "prompt", void 0);
    __decorate([
        Property(null)
    ], PasteCleanupSettings.prototype, "deniedAttrs", void 0);
    __decorate([
        Property(['background', 'background-color', 'border', 'border-bottom', 'border-left', 'border-radius', 'border-right', 'border-style', 'border-top', 'border-width', 'clear', 'color', 'cursor', 'direction', 'display', 'float', 'font', 'font-family', 'font-size', 'font-weight', 'font-style', 'height', 'left', 'line-height', 'list-style-type', 'margin', 'margin-top', 'margin-left', 'margin-right', 'margin-bottom', 'max-height', 'max-width', 'min-height', 'min-width', 'overflow', 'overflow-x', 'overflow-y', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'position', 'right', 'table-layout', 'text-align', 'text-decoration', 'text-transform', 'text-indent', 'top', 'vertical-align', 'visibility', 'white-space', 'width', 'flex-direction'])
    ], PasteCleanupSettings.prototype, "allowedStyleProps", void 0);
    __decorate([
        Property(null)
    ], PasteCleanupSettings.prototype, "deniedTags", void 0);
    __decorate([
        Property(true)
    ], PasteCleanupSettings.prototype, "keepFormat", void 0);
    __decorate([
        Property(false)
    ], PasteCleanupSettings.prototype, "plainText", void 0);
    return PasteCleanupSettings;
}(ChildProperty));
export { PasteCleanupSettings };
/**
 * Configures the font family settings of the RichTextEditor.
 */
var FontFamily = /** @class */ (function (_super) {
    __extends(FontFamily, _super);
    function FontFamily() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], FontFamily.prototype, "default", void 0);
    __decorate([
        Property('72px')
    ], FontFamily.prototype, "width", void 0);
    __decorate([
        Property(fontFamily)
    ], FontFamily.prototype, "items", void 0);
    return FontFamily;
}(ChildProperty));
export { FontFamily };
/**
 * Configures the font size settings of the RichTextEditor.
 */
var FontSize = /** @class */ (function (_super) {
    __extends(FontSize, _super);
    function FontSize() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], FontSize.prototype, "default", void 0);
    __decorate([
        Property('60px')
    ], FontSize.prototype, "width", void 0);
    __decorate([
        Property(fontSize)
    ], FontSize.prototype, "items", void 0);
    return FontSize;
}(ChildProperty));
export { FontSize };
/**
 * Configures the format settings of the RichTextEditor.
 */
var Format = /** @class */ (function (_super) {
    __extends(Format, _super);
    function Format() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], Format.prototype, "default", void 0);
    __decorate([
        Property('65px')
    ], Format.prototype, "width", void 0);
    __decorate([
        Property(formatItems)
    ], Format.prototype, "types", void 0);
    return Format;
}(ChildProperty));
export { Format };
/**
 * Configures the font color settings of the RichTextEditor.
 */
var FontColor = /** @class */ (function (_super) {
    __extends(FontColor, _super);
    function FontColor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('#ff0000')
    ], FontColor.prototype, "default", void 0);
    __decorate([
        Property('Palette')
    ], FontColor.prototype, "mode", void 0);
    __decorate([
        Property(10)
    ], FontColor.prototype, "columns", void 0);
    __decorate([
        Property(fontColor)
    ], FontColor.prototype, "colorCode", void 0);
    __decorate([
        Property(false)
    ], FontColor.prototype, "modeSwitcher", void 0);
    return FontColor;
}(ChildProperty));
export { FontColor };
/**
 * Configures the background color settings of the RichTextEditor.
 */
var BackgroundColor = /** @class */ (function (_super) {
    __extends(BackgroundColor, _super);
    function BackgroundColor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('#ffff00')
    ], BackgroundColor.prototype, "default", void 0);
    __decorate([
        Property('Palette')
    ], BackgroundColor.prototype, "mode", void 0);
    __decorate([
        Property(10)
    ], BackgroundColor.prototype, "columns", void 0);
    __decorate([
        Property(backgroundColor)
    ], BackgroundColor.prototype, "colorCode", void 0);
    __decorate([
        Property(false)
    ], BackgroundColor.prototype, "modeSwitcher", void 0);
    return BackgroundColor;
}(ChildProperty));
export { BackgroundColor };
/**
 * Configures the settings for the number format list in the RichTextEditor.
 */
var NumberFormatList = /** @class */ (function (_super) {
    __extends(NumberFormatList, _super);
    function NumberFormatList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(numberFormatList)
    ], NumberFormatList.prototype, "types", void 0);
    return NumberFormatList;
}(ChildProperty));
export { NumberFormatList };
/**
 * Configures the settings for the bullet format list in the RichTextEditor.
 */
var BulletFormatList = /** @class */ (function (_super) {
    __extends(BulletFormatList, _super);
    function BulletFormatList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(bulletFormatList)
    ], BulletFormatList.prototype, "types", void 0);
    return BulletFormatList;
}(ChildProperty));
export { BulletFormatList };
