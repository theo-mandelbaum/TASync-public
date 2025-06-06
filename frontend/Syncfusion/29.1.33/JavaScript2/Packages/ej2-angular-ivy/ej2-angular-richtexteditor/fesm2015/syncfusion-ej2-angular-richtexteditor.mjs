import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { forwardRef, Component, ChangeDetectionStrategy, ContentChild, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { setValue, FormBase, ComponentBase, Template, ComponentMixins } from '@syncfusion/ej2-angular-base';
import { RichTextEditor, Toolbar, Link, Image, ImportExport, Audio, Video, Count, QuickToolbar, HtmlEditor, MarkdownEditor, Table, PasteCleanup, Resize, FileManager, FormatPainter, EmojiPicker, SlashMenu } from '@syncfusion/ej2-richtexteditor';
export * from '@syncfusion/ej2-richtexteditor';
import { CommonModule } from '@angular/common';

var RichTextEditorComponent_1;
const inputs = ['autoSaveOnIdle', 'backgroundColor', 'bulletFormatList', 'cssClass', 'editorMode', 'emojiPickerSettings', 'enableAutoUrl', 'enableHtmlEncode', 'enableHtmlSanitizer', 'enablePersistence', 'enableResize', 'enableRtl', 'enableTabKey', 'enableXhtml', 'enabled', 'enterKey', 'exportPdf', 'exportWord', 'fileManagerSettings', 'floatingToolbarOffset', 'fontColor', 'fontFamily', 'fontSize', 'format', 'formatPainterSettings', 'formatter', 'height', 'htmlAttributes', 'iframeSettings', 'importWord', 'inlineMode', 'insertAudioSettings', 'insertImageSettings', 'insertVideoSettings', 'keyConfig', 'locale', 'maxLength', 'numberFormatList', 'pasteCleanupSettings', 'placeholder', 'quickToolbarSettings', 'readonly', 'saveInterval', 'shiftEnterKey', 'showCharCount', 'showTooltip', 'slashMenuSettings', 'tableSettings', 'toolbarSettings', 'undoRedoSteps', 'undoRedoTimer', 'value', 'valueTemplate', 'width'];
const outputs = ['actionBegin', 'actionComplete', 'afterImageDelete', 'afterMediaDelete', 'afterPasteCleanup', 'beforeDialogClose', 'beforeDialogOpen', 'beforeFileUpload', 'beforeImageDrop', 'beforeImageUpload', 'beforePasteCleanup', 'beforeQuickToolbarOpen', 'beforeSanitizeHtml', 'blur', 'change', 'created', 'destroyed', 'dialogClose', 'dialogOpen', 'fileRemoving', 'fileSelected', 'fileUploadFailed', 'fileUploadSuccess', 'fileUploading', 'focus', 'imageRemoving', 'imageSelected', 'imageUploadFailed', 'imageUploadSuccess', 'imageUploading', 'quickToolbarClose', 'quickToolbarOpen', 'resizeStart', 'resizeStop', 'resizing', 'slashMenuItemSelect', 'toolbarClick', 'toolbarStatusUpdate', 'updatedToolbarStatus', 'valueChange'];
const twoWays = ['value'];
/**
 * `ejs-richtexteditor` represents the Angular richtexteditor Component.
 * ```html
 * <ejs-richtexteditor></ejs-richtexteditor>
 * ```
 */
let RichTextEditorComponent = RichTextEditorComponent_1 = class RichTextEditorComponent extends RichTextEditor {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.skipFromEvent = true;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('RichTextEditorToolbar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_a) { }
        try {
            let mod = this.injector.get('RichTextEditorLink');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_b) { }
        try {
            let mod = this.injector.get('RichTextEditorImage');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_c) { }
        try {
            let mod = this.injector.get('RichTextEditorImportExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_d) { }
        try {
            let mod = this.injector.get('RichTextEditorAudio');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_e) { }
        try {
            let mod = this.injector.get('RichTextEditorVideo');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_f) { }
        try {
            let mod = this.injector.get('RichTextEditorCount');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_g) { }
        try {
            let mod = this.injector.get('RichTextEditorQuickToolbar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_h) { }
        try {
            let mod = this.injector.get('RichTextEditorHtmlEditor');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_j) { }
        try {
            let mod = this.injector.get('RichTextEditorMarkdownEditor');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_k) { }
        try {
            let mod = this.injector.get('RichTextEditorTable');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_l) { }
        try {
            let mod = this.injector.get('RichTextEditorPasteCleanup');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_m) { }
        try {
            let mod = this.injector.get('RichTextEditorResize');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_o) { }
        try {
            let mod = this.injector.get('RichTextEditorFileManager');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_p) { }
        try {
            let mod = this.injector.get('RichTextEditorFormatPainter');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_q) { }
        try {
            let mod = this.injector.get('RichTextEditorEmojiPicker');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_r) { }
        try {
            let mod = this.injector.get('RichTextEditorSlashMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_s) { }
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.formCompContext.ngAfterContentChecked(this);
    }
};
RichTextEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
RichTextEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: RichTextEditorComponent, selector: "ejs-richtexteditor", inputs: { autoSaveOnIdle: "autoSaveOnIdle", backgroundColor: "backgroundColor", bulletFormatList: "bulletFormatList", cssClass: "cssClass", editorMode: "editorMode", emojiPickerSettings: "emojiPickerSettings", enableAutoUrl: "enableAutoUrl", enableHtmlEncode: "enableHtmlEncode", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableResize: "enableResize", enableRtl: "enableRtl", enableTabKey: "enableTabKey", enableXhtml: "enableXhtml", enabled: "enabled", enterKey: "enterKey", exportPdf: "exportPdf", exportWord: "exportWord", fileManagerSettings: "fileManagerSettings", floatingToolbarOffset: "floatingToolbarOffset", fontColor: "fontColor", fontFamily: "fontFamily", fontSize: "fontSize", format: "format", formatPainterSettings: "formatPainterSettings", formatter: "formatter", height: "height", htmlAttributes: "htmlAttributes", iframeSettings: "iframeSettings", importWord: "importWord", inlineMode: "inlineMode", insertAudioSettings: "insertAudioSettings", insertImageSettings: "insertImageSettings", insertVideoSettings: "insertVideoSettings", keyConfig: "keyConfig", locale: "locale", maxLength: "maxLength", numberFormatList: "numberFormatList", pasteCleanupSettings: "pasteCleanupSettings", placeholder: "placeholder", quickToolbarSettings: "quickToolbarSettings", readonly: "readonly", saveInterval: "saveInterval", shiftEnterKey: "shiftEnterKey", showCharCount: "showCharCount", showTooltip: "showTooltip", slashMenuSettings: "slashMenuSettings", tableSettings: "tableSettings", toolbarSettings: "toolbarSettings", undoRedoSteps: "undoRedoSteps", undoRedoTimer: "undoRedoTimer", value: "value", valueTemplate: "valueTemplate", width: "width" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", afterImageDelete: "afterImageDelete", afterMediaDelete: "afterMediaDelete", afterPasteCleanup: "afterPasteCleanup", beforeDialogClose: "beforeDialogClose", beforeDialogOpen: "beforeDialogOpen", beforeFileUpload: "beforeFileUpload", beforeImageDrop: "beforeImageDrop", beforeImageUpload: "beforeImageUpload", beforePasteCleanup: "beforePasteCleanup", beforeQuickToolbarOpen: "beforeQuickToolbarOpen", beforeSanitizeHtml: "beforeSanitizeHtml", blur: "blur", change: "change", created: "created", destroyed: "destroyed", dialogClose: "dialogClose", dialogOpen: "dialogOpen", fileRemoving: "fileRemoving", fileSelected: "fileSelected", fileUploadFailed: "fileUploadFailed", fileUploadSuccess: "fileUploadSuccess", fileUploading: "fileUploading", focus: "focus", imageRemoving: "imageRemoving", imageSelected: "imageSelected", imageUploadFailed: "imageUploadFailed", imageUploadSuccess: "imageUploadSuccess", imageUploading: "imageUploading", quickToolbarClose: "quickToolbarClose", quickToolbarOpen: "quickToolbarOpen", resizeStart: "resizeStart", resizeStop: "resizeStop", resizing: "resizing", slashMenuItemSelect: "slashMenuItemSelect", toolbarClick: "toolbarClick", toolbarStatusUpdate: "toolbarStatusUpdate", updatedToolbarStatus: "updatedToolbarStatus", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RichTextEditorComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "valueTemplate", first: true, predicate: ["valueTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], RichTextEditorComponent.prototype, "valueTemplate", void 0);
RichTextEditorComponent = RichTextEditorComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], RichTextEditorComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-richtexteditor',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => RichTextEditorComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { valueTemplate: [{
                type: ContentChild,
                args: ['valueTemplate']
            }] } });

/**
 * NgModule definition for the RichTextEditor component.
 */
class RichTextEditorModule {
}
RichTextEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RichTextEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorModule, declarations: [RichTextEditorComponent], imports: [CommonModule], exports: [RichTextEditorComponent] });
RichTextEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        RichTextEditorComponent
                    ],
                    exports: [
                        RichTextEditorComponent
                    ]
                }]
        }] });

const ToolbarService = { provide: 'RichTextEditorToolbar', useValue: Toolbar };
const LinkService = { provide: 'RichTextEditorLink', useValue: Link };
const ImageService = { provide: 'RichTextEditorImage', useValue: Image };
const ImportExportService = { provide: 'RichTextEditorImportExport', useValue: ImportExport };
const AudioService = { provide: 'RichTextEditorAudio', useValue: Audio };
const VideoService = { provide: 'RichTextEditorVideo', useValue: Video };
const CountService = { provide: 'RichTextEditorCount', useValue: Count };
const QuickToolbarService = { provide: 'RichTextEditorQuickToolbar', useValue: QuickToolbar };
const HtmlEditorService = { provide: 'RichTextEditorHtmlEditor', useValue: HtmlEditor };
const MarkdownEditorService = { provide: 'RichTextEditorMarkdownEditor', useValue: MarkdownEditor };
const TableService = { provide: 'RichTextEditorTable', useValue: Table };
const PasteCleanupService = { provide: 'RichTextEditorPasteCleanup', useValue: PasteCleanup };
const ResizeService = { provide: 'RichTextEditorResize', useValue: Resize };
const FileManagerService = { provide: 'RichTextEditorFileManager', useValue: FileManager };
const FormatPainterService = { provide: 'RichTextEditorFormatPainter', useValue: FormatPainter };
const EmojiPickerService = { provide: 'RichTextEditorEmojiPicker', useValue: EmojiPicker };
const SlashMenuService = { provide: 'RichTextEditorSlashMenu', useValue: SlashMenu };
/**
 * NgModule definition for the RichTextEditor component with providers.
 */
class RichTextEditorAllModule {
}
RichTextEditorAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RichTextEditorAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorAllModule, imports: [CommonModule, RichTextEditorModule], exports: [RichTextEditorModule] });
RichTextEditorAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorAllModule, providers: [
        ToolbarService,
        LinkService,
        ImageService,
        ImportExportService,
        AudioService,
        VideoService,
        CountService,
        QuickToolbarService,
        HtmlEditorService,
        MarkdownEditorService,
        TableService,
        PasteCleanupService,
        ResizeService,
        FileManagerService,
        FormatPainterService,
        EmojiPickerService,
        SlashMenuService
    ], imports: [[CommonModule, RichTextEditorModule], RichTextEditorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RichTextEditorAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RichTextEditorModule],
                    exports: [
                        RichTextEditorModule
                    ],
                    providers: [
                        ToolbarService,
                        LinkService,
                        ImageService,
                        ImportExportService,
                        AudioService,
                        VideoService,
                        CountService,
                        QuickToolbarService,
                        HtmlEditorService,
                        MarkdownEditorService,
                        TableService,
                        PasteCleanupService,
                        ResizeService,
                        FileManagerService,
                        FormatPainterService,
                        EmojiPickerService,
                        SlashMenuService
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AudioService, CountService, EmojiPickerService, FileManagerService, FormatPainterService, HtmlEditorService, ImageService, ImportExportService, LinkService, MarkdownEditorService, PasteCleanupService, QuickToolbarService, ResizeService, RichTextEditorAllModule, RichTextEditorComponent, RichTextEditorModule, SlashMenuService, TableService, ToolbarService, VideoService };
//# sourceMappingURL=syncfusion-ej2-angular-richtexteditor.mjs.map
