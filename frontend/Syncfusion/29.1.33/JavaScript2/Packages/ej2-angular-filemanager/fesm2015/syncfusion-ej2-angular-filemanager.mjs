import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Directive, ContentChild, ContentChildren, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { ComplexBase, setValue, Template, ArrayBase, ComponentBase, ComponentMixins } from '@syncfusion/ej2-angular-base';
import { FileManager, DetailsView, NavigationPane, LargeIconsView, Toolbar, ContextMenu, BreadCrumbBar, Virtualization } from '@syncfusion/ej2-filemanager';
export * from '@syncfusion/ej2-filemanager';
import { CommonModule } from '@angular/common';

let input = ['align', 'cssClass', 'disabled', 'htmlAttributes', 'id', 'name', 'overflow', 'prefixIcon', 'showAlwaysInPopup', 'showTextOn', 'suffixIcon', 'tabIndex', 'template', 'text', 'tooltipText', 'type', 'visible', 'width'];
let outputs$1 = [];
class ToolbarItemDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$1);
        this.directivePropList = input;
    }
}
ToolbarItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarItemDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ToolbarItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ToolbarItemDirective, selector: "e-toolbaritems>e-toolbaritem", inputs: { align: "align", cssClass: "cssClass", disabled: "disabled", htmlAttributes: "htmlAttributes", id: "id", name: "name", overflow: "overflow", prefixIcon: "prefixIcon", showAlwaysInPopup: "showAlwaysInPopup", showTextOn: "showTextOn", suffixIcon: "suffixIcon", tabIndex: "tabIndex", template: "template", text: "text", tooltipText: "tooltipText", type: "type", visible: "visible", width: "width" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], ToolbarItemDirective.prototype, "template", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-toolbaritems>e-toolbaritem',
                    inputs: input,
                    outputs: outputs$1,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }] } });
/**
 * ToolbarItem Array Directive
 * @private
 */
class ToolbarItemsDirective extends ArrayBase {
    constructor() {
        super('toolbaritems');
    }
}
ToolbarItemsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarItemsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ToolbarItemsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ToolbarItemsDirective, selector: "ejs-filemanager>e-toolbaritems", queries: [{ propertyName: "children", predicate: ToolbarItemDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-filemanager>e-toolbaritems',
                    queries: {
                        children: new ContentChildren(ToolbarItemDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs = ['ajaxSettings', 'allowDragAndDrop', 'allowMultiSelection', 'contextMenuSettings', 'cssClass', 'detailsViewSettings', 'enableHtmlSanitizer', 'enablePersistence', 'enableRangeSelection', 'enableRtl', 'enableVirtualization', 'fileSystemData', 'height', 'locale', 'navigationPaneSettings', 'path', 'popupTarget', 'rootAliasName', 'searchSettings', 'selectedItems', 'showFileExtension', 'showHiddenItems', 'showItemCheckBoxes', 'showThumbnail', 'sortBy', 'sortComparer', 'sortOrder', 'toolbarItems', 'toolbarSettings', 'uploadSettings', 'view', 'width'];
const outputs = ['beforeDelete', 'beforeDownload', 'beforeFolderCreate', 'beforeImageLoad', 'beforeMove', 'beforePopupClose', 'beforePopupOpen', 'beforeRename', 'beforeSend', 'created', 'delete', 'destroyed', 'failure', 'fileDragStart', 'fileDragStop', 'fileDragging', 'fileDropped', 'fileLoad', 'fileOpen', 'fileSelect', 'fileSelection', 'folderCreate', 'menuClick', 'menuClose', 'menuOpen', 'move', 'popupClose', 'popupOpen', 'rename', 'search', 'success', 'toolbarClick', 'toolbarCreate', 'uploadListCreate'];
const twoWays = [''];
/**
  * Represents the Essential JS 2 Angular FileManager Component.
 * ```html
 * <ejs-filemanager showThumbnail='false'></ejs-filemanager>
 * ```
 */
let FileManagerComponent = class FileManagerComponent extends FileManager {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['toolbarItems'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('FileManagerDetailsView');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_a) { }
        try {
            let mod = this.injector.get('FileManagerNavigationPane');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_b) { }
        try {
            let mod = this.injector.get('FileManagerLargeIconsView');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_c) { }
        try {
            let mod = this.injector.get('FileManagerToolbar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_d) { }
        try {
            let mod = this.injector.get('FileManagerContextMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_e) { }
        try {
            let mod = this.injector.get('FileManagerBreadCrumbBar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_f) { }
        try {
            let mod = this.injector.get('FileManagerVirtualization');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_g) { }
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.context = new ComponentBase();
    }
    ngOnInit() {
        this.context.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.context.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.context.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.tagObjects[0].instance = this.childToolbarItems;
        this.context.ngAfterContentChecked(this);
    }
};
FileManagerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
FileManagerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: FileManagerComponent, selector: "ejs-filemanager", inputs: { ajaxSettings: "ajaxSettings", allowDragAndDrop: "allowDragAndDrop", allowMultiSelection: "allowMultiSelection", contextMenuSettings: "contextMenuSettings", cssClass: "cssClass", detailsViewSettings: "detailsViewSettings", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRangeSelection: "enableRangeSelection", enableRtl: "enableRtl", enableVirtualization: "enableVirtualization", fileSystemData: "fileSystemData", height: "height", locale: "locale", navigationPaneSettings: "navigationPaneSettings", path: "path", popupTarget: "popupTarget", rootAliasName: "rootAliasName", searchSettings: "searchSettings", selectedItems: "selectedItems", showFileExtension: "showFileExtension", showHiddenItems: "showHiddenItems", showItemCheckBoxes: "showItemCheckBoxes", showThumbnail: "showThumbnail", sortBy: "sortBy", sortComparer: "sortComparer", sortOrder: "sortOrder", toolbarItems: "toolbarItems", toolbarSettings: "toolbarSettings", uploadSettings: "uploadSettings", view: "view", width: "width" }, outputs: { beforeDelete: "beforeDelete", beforeDownload: "beforeDownload", beforeFolderCreate: "beforeFolderCreate", beforeImageLoad: "beforeImageLoad", beforeMove: "beforeMove", beforePopupClose: "beforePopupClose", beforePopupOpen: "beforePopupOpen", beforeRename: "beforeRename", beforeSend: "beforeSend", created: "created", delete: "delete", destroyed: "destroyed", failure: "failure", fileDragStart: "fileDragStart", fileDragStop: "fileDragStop", fileDragging: "fileDragging", fileDropped: "fileDropped", fileLoad: "fileLoad", fileOpen: "fileOpen", fileSelect: "fileSelect", fileSelection: "fileSelection", folderCreate: "folderCreate", menuClick: "menuClick", menuClose: "menuClose", menuOpen: "menuOpen", move: "move", popupClose: "popupClose", popupOpen: "popupOpen", rename: "rename", search: "search", success: "success", toolbarClick: "toolbarClick", toolbarCreate: "toolbarCreate", uploadListCreate: "uploadListCreate" }, queries: [{ propertyName: "childToolbarItems", first: true, predicate: ToolbarItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
FileManagerComponent = __decorate([
    ComponentMixins([ComponentBase])
], FileManagerComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-filemanager',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childToolbarItems: new ContentChild(ToolbarItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the FileManager component.
 */
class FileManagerModule {
}
FileManagerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FileManagerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerModule, declarations: [FileManagerComponent,
        ToolbarItemDirective,
        ToolbarItemsDirective], imports: [CommonModule], exports: [FileManagerComponent,
        ToolbarItemDirective,
        ToolbarItemsDirective] });
FileManagerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        FileManagerComponent,
                        ToolbarItemDirective,
                        ToolbarItemsDirective
                    ],
                    exports: [
                        FileManagerComponent,
                        ToolbarItemDirective,
                        ToolbarItemsDirective
                    ]
                }]
        }] });

const DetailsViewService = { provide: 'FileManagerDetailsView', useValue: DetailsView };
const NavigationPaneService = { provide: 'FileManagerNavigationPane', useValue: NavigationPane };
const LargeIconsViewService = { provide: 'FileManagerLargeIconsView', useValue: LargeIconsView };
const ToolbarService = { provide: 'FileManagerToolbar', useValue: Toolbar };
const ContextMenuService = { provide: 'FileManagerContextMenu', useValue: ContextMenu };
const BreadCrumbBarService = { provide: 'FileManagerBreadCrumbBar', useValue: BreadCrumbBar };
const VirtualizationService = { provide: 'FileManagerVirtualization', useValue: Virtualization };
/**
 * NgModule definition for the FileManager component with providers.
 */
class FileManagerAllModule {
}
FileManagerAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FileManagerAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerAllModule, imports: [CommonModule, FileManagerModule], exports: [FileManagerModule] });
FileManagerAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerAllModule, providers: [
        DetailsViewService,
        NavigationPaneService,
        LargeIconsViewService,
        ToolbarService,
        ContextMenuService,
        BreadCrumbBarService,
        VirtualizationService
    ], imports: [[CommonModule, FileManagerModule], FileManagerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FileManagerAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FileManagerModule],
                    exports: [
                        FileManagerModule
                    ],
                    providers: [
                        DetailsViewService,
                        NavigationPaneService,
                        LargeIconsViewService,
                        ToolbarService,
                        ContextMenuService,
                        BreadCrumbBarService,
                        VirtualizationService
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BreadCrumbBarService, ContextMenuService, DetailsViewService, FileManagerAllModule, FileManagerComponent, FileManagerModule, LargeIconsViewService, NavigationPaneService, ToolbarItemDirective, ToolbarItemsDirective, ToolbarService, VirtualizationService };
//# sourceMappingURL=syncfusion-ej2-angular-filemanager.mjs.map
