import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { Diagram } from '@syncfusion/ej2-diagrams';
import { Template } from '@syncfusion/ej2-angular-base';
import { LayersDirective } from './layers.directive';
import { CustomCursorsDirective } from './customcursor.directive';
import { ConnectorsDirective } from './connectors.directive';
import { NodesDirective } from './nodes.directive';
import * as i0 from "@angular/core";
export const inputs = ['addInfo', 'annotationTemplate', 'backgroundColor', 'bridgeDirection', 'commandManager', 'connectorDefaults', 'connectors', 'constraints', 'contextMenuSettings', 'customCursor', 'dataSourceSettings', 'diagramSettings', 'drawingObject', 'enableConnectorSplit', 'enablePersistence', 'enableRtl', 'fixedUserHandleTemplate', 'getConnectorDefaults', 'getCustomCursor', 'getCustomProperty', 'getCustomTool', 'getDescription', 'getNodeDefaults', 'height', 'historyManager', 'layers', 'layout', 'locale', 'mode', 'nodeDefaults', 'nodeTemplate', 'nodes', 'pageSettings', 'rulerSettings', 'scrollSettings', 'segmentThumbShape', 'segmentThumbSize', 'selectedItems', 'serializationSettings', 'setNodeTemplate', 'snapSettings', 'tool', 'tooltip', 'updateSelection', 'userHandleTemplate', 'width'];
export const outputs = ['animationComplete', 'click', 'collectionChange', 'commandExecute', 'connectionChange', 'contextMenuBeforeItemRender', 'contextMenuClick', 'contextMenuOpen', 'created', 'dataLoaded', 'doubleClick', 'dragEnter', 'dragLeave', 'dragOver', 'drop', 'elementDraw', 'expandStateChange', 'fixedUserHandleClick', 'historyChange', 'historyStateChange', 'keyDown', 'keyUp', 'layoutUpdated', 'load', 'loaded', 'mouseEnter', 'mouseLeave', 'mouseOver', 'mouseWheel', 'onFixedUserHandleMouseDown', 'onFixedUserHandleMouseEnter', 'onFixedUserHandleMouseLeave', 'onFixedUserHandleMouseUp', 'onImageLoad', 'onUserHandleMouseDown', 'onUserHandleMouseEnter', 'onUserHandleMouseLeave', 'onUserHandleMouseUp', 'positionChange', 'propertyChange', 'rotateChange', 'scrollChange', 'segmentChange', 'segmentCollectionChange', 'selectionChange', 'sizeChange', 'sourcePointChange', 'targetPointChange', 'textEdit'];
export const twoWays = [''];
/**
 * Diagram Component
 * ```html
 * <ej-diagram></ej-diagram>
 * ```
 */
let DiagramComponent = class DiagramComponent extends Diagram {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['layers', 'customCursor', 'connectors', 'nodes'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('DiagramsHierarchicalTree');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsMindMap');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsRadialTree');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsComplexHierarchicalTree');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsDataBinding');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsSnapping');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsPrintAndExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsBpmnDiagrams');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsSymmetricLayout');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsConnectorBridging');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsUndoRedo');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsLayoutAnimation');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsDiagramContextMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsLineRouting');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsAvoidLineOverlapping');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsConnectorEditing');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsLineDistribution');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsEj1Serialization');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('DiagramsFlowchartLayout');
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
        this.tagObjects[0].instance = this.childLayers;
        if (this.childCustomCursor) {
            this.tagObjects[1].instance = this.childCustomCursor;
        }
        if (this.childConnectors) {
            this.tagObjects[2].instance = this.childConnectors;
        }
        if (this.childNodes) {
            this.tagObjects[3].instance = this.childNodes;
        }
        this.context.ngAfterContentChecked(this);
    }
};
DiagramComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DiagramComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
DiagramComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: DiagramComponent, selector: "ejs-diagram", inputs: { addInfo: "addInfo", annotationTemplate: "annotationTemplate", backgroundColor: "backgroundColor", bridgeDirection: "bridgeDirection", commandManager: "commandManager", connectorDefaults: "connectorDefaults", connectors: "connectors", constraints: "constraints", contextMenuSettings: "contextMenuSettings", customCursor: "customCursor", dataSourceSettings: "dataSourceSettings", diagramSettings: "diagramSettings", drawingObject: "drawingObject", enableConnectorSplit: "enableConnectorSplit", enablePersistence: "enablePersistence", enableRtl: "enableRtl", fixedUserHandleTemplate: "fixedUserHandleTemplate", getConnectorDefaults: "getConnectorDefaults", getCustomCursor: "getCustomCursor", getCustomProperty: "getCustomProperty", getCustomTool: "getCustomTool", getDescription: "getDescription", getNodeDefaults: "getNodeDefaults", height: "height", historyManager: "historyManager", layers: "layers", layout: "layout", locale: "locale", mode: "mode", nodeDefaults: "nodeDefaults", nodeTemplate: "nodeTemplate", nodes: "nodes", pageSettings: "pageSettings", rulerSettings: "rulerSettings", scrollSettings: "scrollSettings", segmentThumbShape: "segmentThumbShape", segmentThumbSize: "segmentThumbSize", selectedItems: "selectedItems", serializationSettings: "serializationSettings", setNodeTemplate: "setNodeTemplate", snapSettings: "snapSettings", tool: "tool", tooltip: "tooltip", updateSelection: "updateSelection", userHandleTemplate: "userHandleTemplate", width: "width" }, outputs: { animationComplete: "animationComplete", click: "click", collectionChange: "collectionChange", commandExecute: "commandExecute", connectionChange: "connectionChange", contextMenuBeforeItemRender: "contextMenuBeforeItemRender", contextMenuClick: "contextMenuClick", contextMenuOpen: "contextMenuOpen", created: "created", dataLoaded: "dataLoaded", doubleClick: "doubleClick", dragEnter: "dragEnter", dragLeave: "dragLeave", dragOver: "dragOver", drop: "drop", elementDraw: "elementDraw", expandStateChange: "expandStateChange", fixedUserHandleClick: "fixedUserHandleClick", historyChange: "historyChange", historyStateChange: "historyStateChange", keyDown: "keyDown", keyUp: "keyUp", layoutUpdated: "layoutUpdated", load: "load", loaded: "loaded", mouseEnter: "mouseEnter", mouseLeave: "mouseLeave", mouseOver: "mouseOver", mouseWheel: "mouseWheel", onFixedUserHandleMouseDown: "onFixedUserHandleMouseDown", onFixedUserHandleMouseEnter: "onFixedUserHandleMouseEnter", onFixedUserHandleMouseLeave: "onFixedUserHandleMouseLeave", onFixedUserHandleMouseUp: "onFixedUserHandleMouseUp", onImageLoad: "onImageLoad", onUserHandleMouseDown: "onUserHandleMouseDown", onUserHandleMouseEnter: "onUserHandleMouseEnter", onUserHandleMouseLeave: "onUserHandleMouseLeave", onUserHandleMouseUp: "onUserHandleMouseUp", positionChange: "positionChange", propertyChange: "propertyChange", rotateChange: "rotateChange", scrollChange: "scrollChange", segmentChange: "segmentChange", segmentCollectionChange: "segmentCollectionChange", selectionChange: "selectionChange", sizeChange: "sizeChange", sourcePointChange: "sourcePointChange", targetPointChange: "targetPointChange", textEdit: "textEdit" }, queries: [{ propertyName: "annotationTemplate", first: true, predicate: ["annotationTemplate"], descendants: true }, { propertyName: "nodeTemplate", first: true, predicate: ["nodeTemplate"], descendants: true }, { propertyName: "userHandleTemplate", first: true, predicate: ["userHandleTemplate"], descendants: true }, { propertyName: "childLayers", first: true, predicate: LayersDirective, descendants: true }, { propertyName: "childCustomCursor", first: true, predicate: CustomCursorsDirective, descendants: true }, { propertyName: "childConnectors", first: true, predicate: ConnectorsDirective, descendants: true }, { propertyName: "childNodes", first: true, predicate: NodesDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], DiagramComponent.prototype, "annotationTemplate", void 0);
__decorate([
    Template()
], DiagramComponent.prototype, "nodeTemplate", void 0);
__decorate([
    Template()
], DiagramComponent.prototype, "userHandleTemplate", void 0);
DiagramComponent = __decorate([
    ComponentMixins([ComponentBase])
], DiagramComponent);
export { DiagramComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DiagramComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-diagram',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childLayers: new ContentChild(LayersDirective),
                        childCustomCursor: new ContentChild(CustomCursorsDirective),
                        childConnectors: new ContentChild(ConnectorsDirective),
                        childNodes: new ContentChild(NodesDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { annotationTemplate: [{
                type: ContentChild,
                args: ['annotationTemplate']
            }], nodeTemplate: [{
                type: ContentChild,
                args: ['nodeTemplate']
            }], userHandleTemplate: [{
                type: ContentChild,
                args: ['userHandleTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhZ3JhbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGlhZ3JhbS9kaWFncmFtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsdUJBQXVCLEVBQWlELFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFbkQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsU0FBUyxFQUFDLG9CQUFvQixFQUFDLGlCQUFpQixFQUFDLGlCQUFpQixFQUFDLGdCQUFnQixFQUFDLG1CQUFtQixFQUFDLFlBQVksRUFBQyxhQUFhLEVBQUMscUJBQXFCLEVBQUMsY0FBYyxFQUFDLG9CQUFvQixFQUFDLGlCQUFpQixFQUFDLGVBQWUsRUFBQyxzQkFBc0IsRUFBQyxtQkFBbUIsRUFBQyxXQUFXLEVBQUMseUJBQXlCLEVBQUMsc0JBQXNCLEVBQUMsaUJBQWlCLEVBQUMsbUJBQW1CLEVBQUMsZUFBZSxFQUFDLGdCQUFnQixFQUFDLGlCQUFpQixFQUFDLFFBQVEsRUFBQyxnQkFBZ0IsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsY0FBYyxF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LCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIEluamVjdG9yLCBWYWx1ZVByb3ZpZGVyLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudEJhc2UsIElDb21wb25lbnRCYXNlLCBhcHBseU1peGlucywgQ29tcG9uZW50TWl4aW5zLCBQcm9wZXJ0eUNvbGxlY3Rpb25JbmZvLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgRGlhZ3JhbSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1kaWFncmFtcyc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgTGF5ZXJzRGlyZWN0aXZlIH0gZnJvbSAnLi9sYXllcnMuZGlyZWN0aXZlJztcbmltcG9ydCB7IEN1c3RvbUN1cnNvcnNEaXJlY3RpdmUgfSBmcm9tICcuL2N1c3RvbWN1cnNvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29ubmVjdG9yc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29ubmVjdG9ycy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm9kZXNEaXJlY3RpdmUgfSBmcm9tICcuL25vZGVzLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhZGRJbmZvJywnYW5ub3RhdGlvblRlbXBsYXRlJywnYmFja2dyb3VuZENvbG9yJywnYnJpZGdlRGlyZWN0aW9uJywnY29tbWFuZE1hbmFnZXInLCdjb25uZWN0b3JEZWZhdWx0cycsJ2Nvbm5lY3RvcnMnLCdjb25zdHJhaW50cycsJ2NvbnRleHRNZW51U2V0dGluZ3MnLCdjdXN0b21DdXJzb3InLCdkYXRhU291cmNlU2V0dGluZ3MnLCdkaWFncmFtU2V0dGluZ3MnLCdkcmF3aW5nT2JqZWN0JywnZW5hYmxlQ29ubmVjdG9yU3BsaXQnLCdlbmFibGVQZXJzaXN0ZW5jZScsJ2VuYWJsZVJ0bCcsJ2ZpeGVkVXNlckhhbmRsZVRlbXBsYXRlJywnZ2V0Q29ubmVjdG9yRGVmYXVsdHMnLCdnZXRDdXN0b21DdXJzb3InLCdnZXRDdXN0b21Qcm9wZXJ0eScsJ2dldEN1c3RvbVRvb2wnLCdnZXREZXNjcmlwdGlvbicsJ2dldE5vZGVEZWZhdWx0cycsJ2hlaWdodCcsJ2hpc3RvcnlNYW5hZ2VyJywnbGF5ZXJzJywnbGF5b3V0JywnbG9jYWxlJywnbW9kZScsJ25vZGVEZWZhdWx0cycsJ25vZGVUZW1wbGF0ZScsJ25vZGVzJywncGFnZVNldHRpbmdzJywncnVsZXJTZXR0aW5ncycsJ3Njcm9sbFNldHRpbmdzJywnc2VnbWVudFRodW1iU2hhcGUnLCdzZWdtZW50VGh1bWJTaXplJywnc2VsZWN0ZWRJdGVtcycsJ3NlcmlhbGl6YXRpb25TZXR0aW5ncycsJ3NldE5vZGVUZW1wbGF0ZScsJ3NuYXBTZXR0aW5ncycsJ3Rvb2wnLCd0b29sdGlwJywndXBkYXRlU2VsZWN0aW9uJywndXNlckhhbmRsZVRlbXBsYXRlJywnd2lkdGgnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnYW5pbWF0aW9uQ29tcGxldGUnLCdjbGljaycsJ2NvbGxlY3Rpb25DaGFuZ2UnLCdjb21tYW5kRXhlY3V0ZScsJ2Nvbm5lY3Rpb25DaGFuZ2UnLCdjb250ZXh0TWVudUJlZm9yZUl0ZW1SZW5kZXInLCdjb250ZXh0TWVudUNsaWNrJywnY29udGV4dE1lbnVPcGVuJywnY3JlYXRlZCcsJ2RhdGFMb2FkZWQnLCdkb3VibGVDbGljaycsJ2RyYWdFbnRlcicsJ2RyYWdMZWF2ZScsJ2RyYWdPdmVyJywnZHJvcCcsJ2VsZW1lbnREcmF3JywnZXhwYW5kU3RhdGVDaGFuZ2UnLCdmaXhlZFVzZXJIYW5kbGVDbGljaycsJ2hpc3RvcnlDaGFuZ2UnLCdoaXN0b3J5U3RhdGVDaGFuZ2UnLCdrZXlEb3duJywna2V5VXAnLCdsYXlvdXRVcGRhdGVkJywnbG9hZCcsJ2xvYWRlZCcsJ21vdXNlRW50ZXInLCdtb3VzZUxlYXZlJywnbW91c2VPdmVyJywnbW91c2VXaGVlbCcsJ29uRml4ZWRVc2VySGFuZGxlTW91c2VEb3duJywnb25GaXhlZFVzZXJIYW5kbGVNb3VzZUVudGVyJywnb25GaXhlZFVzZXJIYW5kbGVNb3VzZUxlYXZlJywnb25GaXhlZFVzZXJIYW5kbGVNb3VzZVVwJywnb25JbWFnZUxvYWQnLCdvblVzZXJIYW5kbGVNb3VzZURvd24nLCdvblVzZXJIYW5kbGVNb3VzZUVudGVyJywnb25Vc2VySGFuZGxlTW91c2VMZWF2ZScsJ29uVXNlckhhbmRsZU1vdXNlVXAnLCdwb3NpdGlvbkNoYW5nZScsJ3Byb3BlcnR5Q2hhbmdlJywncm90YXRlQ2hhbmdlJywnc2Nyb2xsQ2hhbmdlJywnc2VnbWVudENoYW5nZScsJ3NlZ21lbnRDb2xsZWN0aW9uQ2hhbmdlJywnc2VsZWN0aW9uQ2hhbmdlJywnc2l6ZUNoYW5nZScsJ3NvdXJjZVBvaW50Q2hhbmdlJywndGFyZ2V0UG9pbnRDaGFuZ2UnLCd0ZXh0RWRpdCddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gWycnXTtcblxuLyoqXG4gKiBEaWFncmFtIENvbXBvbmVudFxuICogYGBgaHRtbFxuICogPGVqLWRpYWdyYW0+PC9lai1kaWFncmFtPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWRpYWdyYW0nLFxuICAgIGlucHV0czogaW5wdXRzLFxuICAgIG91dHB1dHM6IG91dHB1dHMsXG4gICAgdGVtcGxhdGU6ICcnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRMYXllcnM6IG5ldyBDb250ZW50Q2hpbGQoTGF5ZXJzRGlyZWN0aXZlKSwgXG4gICAgICAgIGNoaWxkQ3VzdG9tQ3Vyc29yOiBuZXcgQ29udGVudENoaWxkKEN1c3RvbUN1cnNvcnNEaXJlY3RpdmUpLCBcbiAgICAgICAgY2hpbGRDb25uZWN0b3JzOiBuZXcgQ29udGVudENoaWxkKENvbm5lY3RvcnNEaXJlY3RpdmUpLCBcbiAgICAgICAgY2hpbGROb2RlczogbmV3IENvbnRlbnRDaGlsZChOb2Rlc0RpcmVjdGl2ZSlcbiAgICB9XG59KVxuQENvbXBvbmVudE1peGlucyhbQ29tcG9uZW50QmFzZV0pXG5leHBvcnQgY2xhc3MgRGlhZ3JhbUNvbXBvbmVudCBleHRlbmRzIERpYWdyYW0gaW1wbGVtZW50cyBJQ29tcG9uZW50QmFzZSB7XG4gICAgcHVibGljIGNvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIHRhZ09iamVjdHM6IGFueTtcblx0YW5pbWF0aW9uQ29tcGxldGU6IGFueTtcblx0Y2xpY2s6IGFueTtcblx0Y29sbGVjdGlvbkNoYW5nZTogYW55O1xuXHRjb21tYW5kRXhlY3V0ZTogYW55O1xuXHRjb25uZWN0aW9uQ2hhbmdlOiBhbnk7XG5cdGNvbnRleHRNZW51QmVmb3JlSXRlbVJlbmRlcjogYW55O1xuXHRjb250ZXh0TWVudUNsaWNrOiBhbnk7XG5cdGNvbnRleHRNZW51T3BlbjogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdGRhdGFMb2FkZWQ6IGFueTtcblx0ZG91YmxlQ2xpY2s6IGFueTtcblx0ZHJhZ0VudGVyOiBhbnk7XG5cdGRyYWdMZWF2ZTogYW55O1xuXHRkcmFnT3ZlcjogYW55O1xuXHRkcm9wOiBhbnk7XG5cdGVsZW1lbnREcmF3OiBhbnk7XG5cdGV4cGFuZFN0YXRlQ2hhbmdlOiBhbnk7XG5cdGZpeGVkVXNlckhhbmRsZUNsaWNrOiBhbnk7XG5cdGhpc3RvcnlDaGFuZ2U6IGFueTtcblx0aGlzdG9yeVN0YXRlQ2hhbmdlOiBhbnk7XG5cdGtleURvd246IGFueTtcblx0a2V5VXA6IGFueTtcblx0bGF5b3V0VXBkYXRlZDogYW55O1xuXHRsb2FkOiBhbnk7XG5cdGxvYWRlZDogYW55O1xuXHRtb3VzZUVudGVyOiBhbnk7XG5cdG1vdXNlTGVhdmU6IGFueTtcblx0bW91c2VPdmVyOiBhbnk7XG5cdG1vdXNlV2hlZWw6IGFueTtcblx0b25GaXhlZFVzZXJIYW5kbGVNb3VzZURvd246IGFueTtcblx0b25GaXhlZFVzZXJIYW5kbGVNb3VzZUVudGVyOiBhbnk7XG5cdG9uRml4ZWRVc2VySGFuZGxlTW91c2VMZWF2ZTogYW55O1xuXHRvbkZpeGVkVXNlckhhbmRsZU1vdXNlVXA6IGFueTtcblx0b25JbWFnZUxvYWQ6IGFueTtcblx0b25Vc2VySGFuZGxlTW91c2VEb3duOiBhbnk7XG5cdG9uVXNlckhhbmRsZU1vdXNlRW50ZXI6IGFueTtcblx0b25Vc2VySGFuZGxlTW91c2VMZWF2ZTogYW55O1xuXHRvblVzZXJIYW5kbGVNb3VzZVVwOiBhbnk7XG5cdHBvc2l0aW9uQ2hhbmdlOiBhbnk7XG5cdHByb3BlcnR5Q2hhbmdlOiBhbnk7XG5cdHJvdGF0ZUNoYW5nZTogYW55O1xuXHRzY3JvbGxDaGFuZ2U6IGFueTtcblx0c2VnbWVudENoYW5nZTogYW55O1xuXHRzZWdtZW50Q29sbGVjdGlvbkNoYW5nZTogYW55O1xuXHRzZWxlY3Rpb25DaGFuZ2U6IGFueTtcblx0c2l6ZUNoYW5nZTogYW55O1xuXHRzb3VyY2VQb2ludENoYW5nZTogYW55O1xuXHR0YXJnZXRQb2ludENoYW5nZTogYW55O1xuXHRwdWJsaWMgdGV4dEVkaXQ6IGFueTtcbiAgICBwdWJsaWMgY2hpbGRMYXllcnM6IFF1ZXJ5TGlzdDxMYXllcnNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyBjaGlsZEN1c3RvbUN1cnNvcjogUXVlcnlMaXN0PEN1c3RvbUN1cnNvcnNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyBjaGlsZENvbm5lY3RvcnM6IFF1ZXJ5TGlzdDxDb25uZWN0b3JzRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgY2hpbGROb2RlczogUXVlcnlMaXN0PE5vZGVzRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ2xheWVycycsICdjdXN0b21DdXJzb3InLCAnY29ubmVjdG9ycycsICdub2RlcyddO1xuICAgIC8qKiBcbiAgICAgKiBDdXN0b21pemVzIHRoZSBhbm5vdGF0aW9uIHRlbXBsYXRlXG4gICAgICogQGRlZmF1bHQgdW5kZWZpbmVkXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnYW5ub3RhdGlvblRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBhbm5vdGF0aW9uVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogQ3VzdG9taXplcyB0aGUgbm9kZSB0ZW1wbGF0ZVxuICAgICAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ25vZGVUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgbm9kZVRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoaXMgcHJvcGVydHkgcmVwcmVzZW50cyB0aGUgdGVtcGxhdGUgY29udGVudCBvZiBhIHVzZXIgaGFuZGxlLiBUaGUgdXNlciBjYW4gZGVmaW5lIGFueSBIVE1MIGVsZW1lbnQgYXMgYSB0ZW1wbGF0ZS5cbiAgICAgKiBAZGVmYXVsdCB1bmRlZmluZWRcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCd1c2VySGFuZGxlVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHVzZXJIYW5kbGVUZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zSGllcmFyY2hpY2FsVHJlZScpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRGlhZ3JhbXNNaW5kTWFwJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEaWFncmFtc1JhZGlhbFRyZWUnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zQ29tcGxleEhpZXJhcmNoaWNhbFRyZWUnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zRGF0YUJpbmRpbmcnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zU25hcHBpbmcnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zUHJpbnRBbmRFeHBvcnQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zQnBtbkRpYWdyYW1zJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEaWFncmFtc1N5bW1ldHJpY0xheW91dCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRGlhZ3JhbXNDb25uZWN0b3JCcmlkZ2luZycpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRGlhZ3JhbXNVbmRvUmVkbycpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRGlhZ3JhbXNMYXlvdXRBbmltYXRpb24nKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zRGlhZ3JhbUNvbnRleHRNZW51Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEaWFncmFtc0xpbmVSb3V0aW5nJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEaWFncmFtc0F2b2lkTGluZU92ZXJsYXBwaW5nJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEaWFncmFtc0Nvbm5lY3RvckVkaXRpbmcnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0RpYWdyYW1zTGluZURpc3RyaWJ1dGlvbicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRGlhZ3JhbXNFajFTZXJpYWxpemF0aW9uJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEaWFncmFtc0Zsb3djaGFydExheW91dCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuYWRkVHdvV2F5LmNhbGwodGhpcywgdHdvV2F5cyk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmNvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdBZnRlclZpZXdJbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnT2JqZWN0c1swXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRMYXllcnM7XG4gICAgICAgIFxuXHQgICAgaWYgKHRoaXMuY2hpbGRDdXN0b21DdXJzb3IpIHtcbiAgICAgICAgICAgIHRoaXMudGFnT2JqZWN0c1sxXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRDdXN0b21DdXJzb3I7XG4gICAgICAgIH1cbiAgICAgICAgXG5cdCAgICBpZiAodGhpcy5jaGlsZENvbm5lY3RvcnMpIHtcbiAgICAgICAgICAgIHRoaXMudGFnT2JqZWN0c1syXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRDb25uZWN0b3JzO1xuICAgICAgICB9XG4gICAgICAgIFxuXHQgICAgaWYgKHRoaXMuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgdGhpcy50YWdPYmplY3RzWzNdLmluc3RhbmNlID0gdGhpcy5jaGlsZE5vZGVzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=