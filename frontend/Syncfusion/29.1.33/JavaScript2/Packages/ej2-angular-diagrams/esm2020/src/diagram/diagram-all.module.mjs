import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramModule } from './diagram.module';
import { HierarchicalTree, MindMap, RadialTree, ComplexHierarchicalTree, DataBinding, Snapping, PrintAndExport, BpmnDiagrams, SymmetricLayout, ConnectorBridging, UndoRedo, LayoutAnimation, DiagramContextMenu, LineRouting, AvoidLineOverlapping, ConnectorEditing, LineDistribution, Ej1Serialization, FlowchartLayout } from '@syncfusion/ej2-diagrams';
import * as i0 from "@angular/core";
export const HierarchicalTreeService = { provide: 'DiagramsHierarchicalTree', useValue: HierarchicalTree };
export const MindMapService = { provide: 'DiagramsMindMap', useValue: MindMap };
export const RadialTreeService = { provide: 'DiagramsRadialTree', useValue: RadialTree };
export const ComplexHierarchicalTreeService = { provide: 'DiagramsComplexHierarchicalTree', useValue: ComplexHierarchicalTree };
export const DataBindingService = { provide: 'DiagramsDataBinding', useValue: DataBinding };
export const SnappingService = { provide: 'DiagramsSnapping', useValue: Snapping };
export const PrintAndExportService = { provide: 'DiagramsPrintAndExport', useValue: PrintAndExport };
export const BpmnDiagramsService = { provide: 'DiagramsBpmnDiagrams', useValue: BpmnDiagrams };
export const SymmetricLayoutService = { provide: 'DiagramsSymmetricLayout', useValue: SymmetricLayout };
export const ConnectorBridgingService = { provide: 'DiagramsConnectorBridging', useValue: ConnectorBridging };
export const UndoRedoService = { provide: 'DiagramsUndoRedo', useValue: UndoRedo };
export const LayoutAnimationService = { provide: 'DiagramsLayoutAnimation', useValue: LayoutAnimation };
export const DiagramContextMenuService = { provide: 'DiagramsDiagramContextMenu', useValue: DiagramContextMenu };
export const LineRoutingService = { provide: 'DiagramsLineRouting', useValue: LineRouting };
export const AvoidLineOverlappingService = { provide: 'DiagramsAvoidLineOverlapping', useValue: AvoidLineOverlapping };
export const ConnectorEditingService = { provide: 'DiagramsConnectorEditing', useValue: ConnectorEditing };
export const LineDistributionService = { provide: 'DiagramsLineDistribution', useValue: LineDistribution };
export const Ej1SerializationService = { provide: 'DiagramsEj1Serialization', useValue: Ej1Serialization };
export const FlowchartLayoutService = { provide: 'DiagramsFlowchartLayout', useValue: FlowchartLayout };
/**
 * NgModule definition for the Diagram component with providers.
 */
export class DiagramAllModule {
}
DiagramAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DiagramAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DiagramAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DiagramAllModule, imports: [CommonModule, DiagramModule], exports: [DiagramModule] });
DiagramAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DiagramAllModule, providers: [
        HierarchicalTreeService,
        MindMapService,
        RadialTreeService,
        ComplexHierarchicalTreeService,
        DataBindingService,
        SnappingService,
        PrintAndExportService,
        BpmnDiagramsService,
        SymmetricLayoutService,
        ConnectorBridgingService,
        UndoRedoService,
        LayoutAnimationService,
        DiagramContextMenuService,
        LineRoutingService,
        AvoidLineOverlappingService,
        ConnectorEditingService,
        LineDistributionService,
        Ej1SerializationService,
        FlowchartLayoutService
    ], imports: [[CommonModule, DiagramModule], DiagramModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DiagramAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DiagramModule],
                    exports: [
                        DiagramModule
                    ],
                    providers: [
                        HierarchicalTreeService,
                        MindMapService,
                        RadialTreeService,
                        ComplexHierarchicalTreeService,
                        DataBindingService,
                        SnappingService,
                        PrintAndExportService,
                        BpmnDiagramsService,
                        SymmetricLayoutService,
                        ConnectorBridgingService,
                        UndoRedoService,
                        LayoutAnimationService,
                        DiagramContextMenuService,
                        LineRoutingService,
                        AvoidLineOverlappingService,
                        ConnectorEditingService,
                        LineDistributionService,
                        Ej1SerializationService,
                        FlowchartLayoutService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhZ3JhbS1hbGwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RpYWdyYW0vZGlhZ3JhbS1hbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVcvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQTs7QUFHelYsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDO0FBQ3pILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBa0IsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDO0FBQzlGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFrQixFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLENBQUM7QUFDdkcsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBQyxDQUFDO0FBQzlJLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFrQixFQUFFLE9BQU8s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Y0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLDhCQUE4Qjt3QkFDOUIsa0JBQWtCO3dCQUNsQixlQUFlO3dCQUNmLHFCQUFxQjt3QkFDckIsbUJBQW1CO3dCQUNuQixzQkFBc0I7d0JBQ3RCLHdCQUF3Qjt3QkFDeEIsZUFBZTt3QkFDZixzQkFBc0I7d0JBQ3RCLHlCQUF5Qjt3QkFDekIsa0JBQWtCO3dCQUNsQiwyQkFBMkI7d0JBQzNCLHVCQUF1Qjt3QkFDdkIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7d0JBQ3ZCLHNCQUFzQjtxQkFDekI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgVmFsdWVQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IExheWVyRGlyZWN0aXZlLCBMYXllcnNEaXJlY3RpdmUgfSBmcm9tICcuL2xheWVycy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ3VzdG9tQ3Vyc29yRGlyZWN0aXZlLCBDdXN0b21DdXJzb3JzRGlyZWN0aXZlIH0gZnJvbSAnLi9jdXN0b21jdXJzb3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbm5lY3RvckZpeGVkVXNlckhhbmRsZURpcmVjdGl2ZSwgQ29ubmVjdG9yRml4ZWRVc2VySGFuZGxlc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29ubmVjdG9yLWZpeGVkdXNlcmhhbmRsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29ubmVjdG9yQW5ub3RhdGlvbkRpcmVjdGl2ZSwgQ29ubmVjdG9yQW5ub3RhdGlvbnNEaXJlY3RpdmUgfSBmcm9tICcuL2Nvbm5lY3Rvci1hbm5vdGF0aW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb25uZWN0b3JEaXJlY3RpdmUsIENvbm5lY3RvcnNEaXJlY3RpdmUgfSBmcm9tICcuL2Nvbm5lY3RvcnMuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5vZGVGaXhlZFVzZXJIYW5kbGVEaXJlY3RpdmUsIE5vZGVGaXhlZFVzZXJIYW5kbGVzRGlyZWN0aXZlIH0gZnJvbSAnLi9ub2RlLWZpeGVkdXNlcmhhbmRsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm9kZUFubm90YXRpb25EaXJlY3RpdmUsIE5vZGVBbm5vdGF0aW9uc0RpcmVjdGl2ZSB9IGZyb20gJy4vbm9kZS1hbm5vdGF0aW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQb3J0RGlyZWN0aXZlLCBQb3J0c0RpcmVjdGl2ZSB9IGZyb20gJy4vcG9ydHMuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5vZGVEaXJlY3RpdmUsIE5vZGVzRGlyZWN0aXZlIH0gZnJvbSAnLi9ub2Rlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGlhZ3JhbUNvbXBvbmVudCB9IGZyb20gJy4vZGlhZ3JhbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGlhZ3JhbU1vZHVsZSB9IGZyb20gJy4vZGlhZ3JhbS5tb2R1bGUnO1xuaW1wb3J0IHtIaWVyYXJjaGljYWxUcmVlLCBNaW5kTWFwLCBSYWRpYWxUcmVlLCBDb21wbGV4SGllcmFyY2hpY2FsVHJlZSwgRGF0YUJpbmRpbmcsIFNuYXBwaW5nLCBQcmludEFuZEV4cG9ydCwgQnBtbkRpYWdyYW1zLCBTeW1tZXRyaWNMYXlvdXQsIENvbm5lY3RvckJyaWRnaW5nLCBVbmRvUmVkbywgTGF5b3V0QW5pbWF0aW9uLCBEaWFncmFtQ29udGV4dE1lbnUsIExpbmVSb3V0aW5nLCBBdm9pZExpbmVPdmVybGFwcGluZywgQ29ubmVjdG9yRWRpdGluZywgTGluZURpc3RyaWJ1dGlvbiwgRWoxU2VyaWFsaXphdGlvbiwgRmxvd2NoYXJ0TGF5b3V0fSBmcm9tICdAc3luY2Z1c2lvbi9lajItZGlhZ3JhbXMnXG5cblxuZXhwb3J0IGNvbnN0IEhpZXJhcmNoaWNhbFRyZWVTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRGlhZ3JhbXNIaWVyYXJjaGljYWxUcmVlJywgdXNlVmFsdWU6IEhpZXJhcmNoaWNhbFRyZWV9O1xuZXhwb3J0IGNvbnN0IE1pbmRNYXBTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRGlhZ3JhbXNNaW5kTWFwJywgdXNlVmFsdWU6IE1pbmRNYXB9O1xuZXhwb3J0IGNvbnN0IFJhZGlhbFRyZWVTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRGlhZ3JhbXNSYWRpYWxUcmVlJywgdXNlVmFsdWU6IFJhZGlhbFRyZWV9O1xuZXhwb3J0IGNvbnN0IENvbXBsZXhIaWVyYXJjaGljYWxUcmVlU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zQ29tcGxleEhpZXJhcmNoaWNhbFRyZWUnLCB1c2VWYWx1ZTogQ29tcGxleEhpZXJhcmNoaWNhbFRyZWV9O1xuZXhwb3J0IGNvbnN0IERhdGFCaW5kaW5nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zRGF0YUJpbmRpbmcnLCB1c2VWYWx1ZTogRGF0YUJpbmRpbmd9O1xuZXhwb3J0IGNvbnN0IFNuYXBwaW5nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zU25hcHBpbmcnLCB1c2VWYWx1ZTogU25hcHBpbmd9O1xuZXhwb3J0IGNvbnN0IFByaW50QW5kRXhwb3J0U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zUHJpbnRBbmRFeHBvcnQnLCB1c2VWYWx1ZTogUHJpbnRBbmRFeHBvcnR9O1xuZXhwb3J0IGNvbnN0IEJwbW5EaWFncmFtc1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc0JwbW5EaWFncmFtcycsIHVzZVZhbHVlOiBCcG1uRGlhZ3JhbXN9O1xuZXhwb3J0IGNvbnN0IFN5bW1ldHJpY0xheW91dFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc1N5bW1ldHJpY0xheW91dCcsIHVzZVZhbHVlOiBTeW1tZXRyaWNMYXlvdXR9O1xuZXhwb3J0IGNvbnN0IENvbm5lY3RvckJyaWRnaW5nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zQ29ubmVjdG9yQnJpZGdpbmcnLCB1c2VWYWx1ZTogQ29ubmVjdG9yQnJpZGdpbmd9O1xuZXhwb3J0IGNvbnN0IFVuZG9SZWRvU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zVW5kb1JlZG8nLCB1c2VWYWx1ZTogVW5kb1JlZG99O1xuZXhwb3J0IGNvbnN0IExheW91dEFuaW1hdGlvblNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc0xheW91dEFuaW1hdGlvbicsIHVzZVZhbHVlOiBMYXlvdXRBbmltYXRpb259O1xuZXhwb3J0IGNvbnN0IERpYWdyYW1Db250ZXh0TWVudVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc0RpYWdyYW1Db250ZXh0TWVudScsIHVzZVZhbHVlOiBEaWFncmFtQ29udGV4dE1lbnV9O1xuZXhwb3J0IGNvbnN0IExpbmVSb3V0aW5nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zTGluZVJvdXRpbmcnLCB1c2VWYWx1ZTogTGluZVJvdXRpbmd9O1xuZXhwb3J0IGNvbnN0IEF2b2lkTGluZU92ZXJsYXBwaW5nU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0RpYWdyYW1zQXZvaWRMaW5lT3ZlcmxhcHBpbmcnLCB1c2VWYWx1ZTogQXZvaWRMaW5lT3ZlcmxhcHBpbmd9O1xuZXhwb3J0IGNvbnN0IENvbm5lY3RvckVkaXRpbmdTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRGlhZ3JhbXNDb25uZWN0b3JFZGl0aW5nJywgdXNlVmFsdWU6IENvbm5lY3RvckVkaXRpbmd9O1xuZXhwb3J0IGNvbnN0IExpbmVEaXN0cmlidXRpb25TZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRGlhZ3JhbXNMaW5lRGlzdHJpYnV0aW9uJywgdXNlVmFsdWU6IExpbmVEaXN0cmlidXRpb259O1xuZXhwb3J0IGNvbnN0IEVqMVNlcmlhbGl6YXRpb25TZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnRGlhZ3JhbXNFajFTZXJpYWxpemF0aW9uJywgdXNlVmFsdWU6IEVqMVNlcmlhbGl6YXRpb259O1xuZXhwb3J0IGNvbnN0IEZsb3djaGFydExheW91dFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdEaWFncmFtc0Zsb3djaGFydExheW91dCcsIHVzZVZhbHVlOiBGbG93Y2hhcnRMYXlvdXR9O1xuXG4vKipcbiAqIE5nTW9kdWxlIGRlZmluaXRpb24gZm9yIHRoZSBEaWFncmFtIGNvbXBvbmVudCB3aXRoIHByb3ZpZGVycy5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBEaWFncmFtTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIERpYWdyYW1Nb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczpbXG4gICAgICAgIEhpZXJhcmNoaWNhbFRyZWVTZXJ2aWNlLFxuICAgICAgICBNaW5kTWFwU2VydmljZSxcbiAgICAgICAgUmFkaWFsVHJlZVNlcnZpY2UsXG4gICAgICAgIENvbXBsZXhIaWVyYXJjaGljYWxUcmVlU2VydmljZSxcbiAgICAgICAgRGF0YUJpbmRpbmdTZXJ2aWNlLFxuICAgICAgICBTbmFwcGluZ1NlcnZpY2UsXG4gICAgICAgIFByaW50QW5kRXhwb3J0U2VydmljZSxcbiAgICAgICAgQnBtbkRpYWdyYW1zU2VydmljZSxcbiAgICAgICAgU3ltbWV0cmljTGF5b3V0U2VydmljZSxcbiAgICAgICAgQ29ubmVjdG9yQnJpZGdpbmdTZXJ2aWNlLFxuICAgICAgICBVbmRvUmVkb1NlcnZpY2UsXG4gICAgICAgIExheW91dEFuaW1hdGlvblNlcnZpY2UsXG4gICAgICAgIERpYWdyYW1Db250ZXh0TWVudVNlcnZpY2UsXG4gICAgICAgIExpbmVSb3V0aW5nU2VydmljZSxcbiAgICAgICAgQXZvaWRMaW5lT3ZlcmxhcHBpbmdTZXJ2aWNlLFxuICAgICAgICBDb25uZWN0b3JFZGl0aW5nU2VydmljZSxcbiAgICAgICAgTGluZURpc3RyaWJ1dGlvblNlcnZpY2UsXG4gICAgICAgIEVqMVNlcmlhbGl6YXRpb25TZXJ2aWNlLFxuICAgICAgICBGbG93Y2hhcnRMYXlvdXRTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBEaWFncmFtQWxsTW9kdWxlIHsgfSJdfQ==