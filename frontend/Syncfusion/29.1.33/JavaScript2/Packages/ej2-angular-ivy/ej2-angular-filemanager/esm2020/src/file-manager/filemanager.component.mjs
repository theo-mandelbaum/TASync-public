import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { FileManager } from '@syncfusion/ej2-filemanager';
import { ToolbarItemsDirective } from './toolbaritems.directive';
import * as i0 from "@angular/core";
export const inputs = ['ajaxSettings', 'allowDragAndDrop', 'allowMultiSelection', 'contextMenuSettings', 'cssClass', 'detailsViewSettings', 'enableHtmlSanitizer', 'enablePersistence', 'enableRangeSelection', 'enableRtl', 'enableVirtualization', 'fileSystemData', 'height', 'locale', 'navigationPaneSettings', 'path', 'popupTarget', 'rootAliasName', 'searchSettings', 'selectedItems', 'showFileExtension', 'showHiddenItems', 'showItemCheckBoxes', 'showThumbnail', 'sortBy', 'sortComparer', 'sortOrder', 'toolbarItems', 'toolbarSettings', 'uploadSettings', 'view', 'width'];
export const outputs = ['beforeDelete', 'beforeDownload', 'beforeFolderCreate', 'beforeImageLoad', 'beforeMove', 'beforePopupClose', 'beforePopupOpen', 'beforeRename', 'beforeSend', 'created', 'delete', 'destroyed', 'failure', 'fileDragStart', 'fileDragStop', 'fileDragging', 'fileDropped', 'fileLoad', 'fileOpen', 'fileSelect', 'fileSelection', 'folderCreate', 'menuClick', 'menuClose', 'menuOpen', 'move', 'popupClose', 'popupOpen', 'rename', 'search', 'success', 'toolbarClick', 'toolbarCreate', 'uploadListCreate'];
export const twoWays = [''];
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
        catch { }
        try {
            let mod = this.injector.get('FileManagerNavigationPane');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('FileManagerLargeIconsView');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('FileManagerToolbar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('FileManagerContextMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('FileManagerBreadCrumbBar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('FileManagerVirtualization');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
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
export { FileManagerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZW1hbmFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZpbGUtbWFuYWdlci9maWxlbWFuYWdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWdDLHVCQUF1QixFQUFpRCxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLGFBQWEsRUFBK0IsZUFBZSxFQUEwQixRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3SSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBRWpFLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLGNBQWMsRUFBQyxrQkFBa0IsRUFBQyxxQkFBcUIsRUFBQyxxQkFBcUIsRUFBQyxVQUFVLEVBQUMscUJBQXFCLEVBQUMscUJBQXFCLEVBQUMsbUJBQW1CLEVBQUMsc0JBQXNCLEVBQUMsV0FBVyxFQUFDLHNCQUFzQixFQUFDLGdCQUFnQixFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxlQUFlLEVBQUMsZ0JBQWdCLEVBQUMsZUFBZSxFQUFDLG1CQUFtQixFQUFDLGlCQUFpQixFQUFDLG9CQUFvQixFQUFDLGVBQWUsRUFBQyxRQUFRLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUMsaUJBQWlCLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZpQixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxjQUFjLEVBQUMsZ0JBQWdCLEVBQUMsb0JBQW9CLEVBQUMsaUJBQWlCLEVBQUMsWUFBWSxFQUFDLGtCQUFrQixFQUFDLGlCQUFpQixFQUFDLGNBQWMsRUFBQyxZQUFZLEVB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Q25DLENBQUM7SUFFTSxxQkFBcUI7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUlKLENBQUE7aUhBdEhZLG9CQUFvQjtxR0FBcEIsb0JBQW9CLG1pRUFKVyxxQkFBcUIsdUVBSG5ELEVBQUU7QUFPSCxvQkFBb0I7SUFEaEMsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDcEIsb0JBQW9CLENBc0hoQztTQXRIWSxvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFYaEMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUUsT0FBTztvQkFDaEIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE9BQU8sRUFBRTt3QkFDTCxpQkFBaUIsRUFBRSxJQUFJLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQztxQkFDN0Q7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIFZhbHVlUHJvdmlkZXIsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBGaWxlTWFuYWdlciB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1maWxlbWFuYWdlcic7XG5cbmltcG9ydCB7IFRvb2xiYXJJdGVtc0RpcmVjdGl2ZSB9IGZyb20gJy4vdG9vbGJhcml0ZW1zLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhamF4U2V0dGluZ3MnLCdhbGxvd0RyYWdBbmREcm9wJywnYWxsb3dNdWx0aVNlbGVjdGlvbicsJ2NvbnRleHRNZW51U2V0dGluZ3MnLCdjc3NDbGFzcycsJ2RldGFpbHNWaWV3U2V0dGluZ3MnLCdlbmFibGVIdG1sU2FuaXRpemVyJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSYW5nZVNlbGVjdGlvbicsJ2VuYWJsZVJ0bCcsJ2VuYWJsZVZpcnR1YWxpemF0aW9uJywnZmlsZVN5c3RlbURhdGEnLCdoZWlnaHQnLCdsb2NhbGUnLCduYXZpZ2F0aW9uUGFuZVNldHRpbmdzJywncGF0aCcsJ3BvcHVwVGFyZ2V0Jywncm9vdEFsaWFzTmFtZScsJ3NlYXJjaFNldHRpbmdzJywnc2VsZWN0ZWRJdGVtcycsJ3Nob3dGaWxlRXh0ZW5zaW9uJywnc2hvd0hpZGRlbkl0ZW1zJywnc2hvd0l0ZW1DaGVja0JveGVzJywnc2hvd1RodW1ibmFpbCcsJ3NvcnRCeScsJ3NvcnRDb21wYXJlcicsJ3NvcnRPcmRlcicsJ3Rvb2xiYXJJdGVtcycsJ3Rvb2xiYXJTZXR0aW5ncycsJ3VwbG9hZFNldHRpbmdzJywndmlldycsJ3dpZHRoJ107XG5leHBvcnQgY29uc3Qgb3V0cHV0czogc3RyaW5nW10gPSBbJ2JlZm9yZURlbGV0ZScsJ2JlZm9yZURvd25sb2FkJywnYmVmb3JlRm9sZGVyQ3JlYXRlJywnYmVmb3JlSW1hZ2VMb2FkJywnYmVmb3JlTW92ZScsJ2JlZm9yZVBvcHVwQ2xvc2UnLCdiZWZvcmVQb3B1cE9wZW4nLCdiZWZvcmVSZW5hbWUnLCdiZWZvcmVTZW5kJywnY3JlYXRlZCcsJ2RlbGV0ZScsJ2Rlc3Ryb3llZCcsJ2ZhaWx1cmUnLCdmaWxlRHJhZ1N0YXJ0JywnZmlsZURyYWdTdG9wJywnZmlsZURyYWdnaW5nJywnZmlsZURyb3BwZWQnLCdmaWxlTG9hZCcsJ2ZpbGVPcGVuJywnZmlsZVNlbGVjdCcsJ2ZpbGVTZWxlY3Rpb24nLCdmb2xkZXJDcmVhdGUnLCdtZW51Q2xpY2snLCdtZW51Q2xvc2UnLCdtZW51T3BlbicsJ21vdmUnLCdwb3B1cENsb3NlJywncG9wdXBPcGVuJywncmVuYW1lJywnc2VhcmNoJywnc3VjY2VzcycsJ3Rvb2xiYXJDbGljaycsJ3Rvb2xiYXJDcmVhdGUnLCd1cGxvYWRMaXN0Q3JlYXRlJ107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbJyddO1xuXG4vKipcbiAgKiBSZXByZXNlbnRzIHRoZSBFc3NlbnRpYWwgSlMgMiBBbmd1bGFyIEZpbGVNYW5hZ2VyIENvbXBvbmVudC5cbiAqIGBgYGh0bWxcbiAqIDxlanMtZmlsZW1hbmFnZXIgc2hvd1RodW1ibmFpbD0nZmFsc2UnPjwvZWpzLWZpbGVtYW5hZ2VyPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWZpbGVtYW5hZ2VyJyxcbiAgICBpbnB1dHM6IGlucHV0cyxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkVG9vbGJhckl0ZW1zOiBuZXcgQ29udGVudENoaWxkKFRvb2xiYXJJdGVtc0RpcmVjdGl2ZSlcbiAgICB9XG59KVxuQENvbXBvbmVudE1peGlucyhbQ29tcG9uZW50QmFzZV0pXG5leHBvcnQgY2xhc3MgRmlsZU1hbmFnZXJDb21wb25lbnQgZXh0ZW5kcyBGaWxlTWFuYWdlciBpbXBsZW1lbnRzIElDb21wb25lbnRCYXNlIHtcbiAgICBwdWJsaWMgY29udGV4dCA6IGFueTtcbiAgICBwdWJsaWMgdGFnT2JqZWN0czogYW55O1xuXHRiZWZvcmVEZWxldGU6IGFueTtcblx0YmVmb3JlRG93bmxvYWQ6IGFueTtcblx0YmVmb3JlRm9sZGVyQ3JlYXRlOiBhbnk7XG5cdGJlZm9yZUltYWdlTG9hZDogYW55O1xuXHRiZWZvcmVNb3ZlOiBhbnk7XG5cdGJlZm9yZVBvcHVwQ2xvc2U6IGFueTtcblx0YmVmb3JlUG9wdXBPcGVuOiBhbnk7XG5cdGJlZm9yZVJlbmFtZTogYW55O1xuXHRiZWZvcmVTZW5kOiBhbnk7XG5cdGNyZWF0ZWQ6IGFueTtcblx0ZGVsZXRlOiBhbnk7XG5cdGRlc3Ryb3llZDogYW55O1xuXHRmYWlsdXJlOiBhbnk7XG5cdGZpbGVEcmFnU3RhcnQ6IGFueTtcblx0ZmlsZURyYWdTdG9wOiBhbnk7XG5cdGZpbGVEcmFnZ2luZzogYW55O1xuXHRmaWxlRHJvcHBlZDogYW55O1xuXHRmaWxlTG9hZDogYW55O1xuXHRmaWxlT3BlbjogYW55O1xuXHRmaWxlU2VsZWN0OiBhbnk7XG5cdGZpbGVTZWxlY3Rpb246IGFueTtcblx0Zm9sZGVyQ3JlYXRlOiBhbnk7XG5cdG1lbnVDbGljazogYW55O1xuXHRtZW51Q2xvc2U6IGFueTtcblx0bWVudU9wZW46IGFueTtcblx0bW92ZTogYW55O1xuXHRwb3B1cENsb3NlOiBhbnk7XG5cdHBvcHVwT3BlbjogYW55O1xuXHRyZW5hbWU6IGFueTtcblx0c2VhcmNoOiBhbnk7XG5cdHN1Y2Nlc3M6IGFueTtcblx0dG9vbGJhckNsaWNrOiBhbnk7XG5cdHRvb2xiYXJDcmVhdGU6IGFueTtcblx0cHVibGljIHVwbG9hZExpc3RDcmVhdGU6IGFueTtcbiAgICBwdWJsaWMgY2hpbGRUb29sYmFySXRlbXM6IFF1ZXJ5TGlzdDxUb29sYmFySXRlbXNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsndG9vbGJhckl0ZW1zJ107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nRWxlOiBFbGVtZW50UmVmLCBwcml2YXRlIHNyZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5uZ0VsZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcyA9IHRoaXMuaW5qZWN0ZWRNb2R1bGVzIHx8IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRmlsZU1hbmFnZXJEZXRhaWxzVmlldycpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRmlsZU1hbmFnZXJOYXZpZ2F0aW9uUGFuZScpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRmlsZU1hbmFnZXJMYXJnZUljb25zVmlldycpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRmlsZU1hbmFnZXJUb29sYmFyJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdGaWxlTWFuYWdlckNvbnRleHRNZW51Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdGaWxlTWFuYWdlckJyZWFkQ3J1bWJCYXInKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0ZpbGVNYW5hZ2VyVmlydHVhbGl6YXRpb24nKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkVG9vbGJhckl0ZW1zO1xuICAgICAgICB0aGlzLmNvbnRleHQubmdBZnRlckNvbnRlbnRDaGVja2VkKHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlckV2ZW50czogKGV2ZW50TGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG4gICAgcHVibGljIGFkZFR3b1dheTogKHByb3BMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbn1cblxuIl19