import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttModule } from './gantt.module';
import { Filter, Selection, Sort, Reorder, Resize, Edit, DayMarkers, Toolbar, ContextMenu, ExcelExport, RowDD, ColumnMenu, PdfExport, VirtualScroll, CriticalPath, UndoRedo } from '@syncfusion/ej2-gantt';
import * as i0 from "@angular/core";
export const FilterService = { provide: 'GanttFilter', useValue: Filter };
export const SelectionService = { provide: 'GanttSelection', useValue: Selection };
export const SortService = { provide: 'GanttSort', useValue: Sort };
export const ReorderService = { provide: 'GanttReorder', useValue: Reorder };
export const ResizeService = { provide: 'GanttResize', useValue: Resize };
export const EditService = { provide: 'GanttEdit', useValue: Edit };
export const DayMarkersService = { provide: 'GanttDayMarkers', useValue: DayMarkers };
export const ToolbarService = { provide: 'GanttToolbar', useValue: Toolbar };
export const ContextMenuService = { provide: 'GanttContextMenu', useValue: ContextMenu };
export const ExcelExportService = { provide: 'GanttExcelExport', useValue: ExcelExport };
export const RowDDService = { provide: 'GanttRowDD', useValue: RowDD };
export const ColumnMenuService = { provide: 'GanttColumnMenu', useValue: ColumnMenu };
export const PdfExportService = { provide: 'GanttPdfExport', useValue: PdfExport };
export const VirtualScrollService = { provide: 'GanttVirtualScroll', useValue: VirtualScroll };
export const CriticalPathService = { provide: 'GanttCriticalPath', useValue: CriticalPath };
export const UndoRedoService = { provide: 'GanttUndoRedo', useValue: UndoRedo };
/**
 * NgModule definition for the Gantt component with providers.
 */
export class GanttAllModule {
}
GanttAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GanttAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttAllModule, imports: [CommonModule, GanttModule], exports: [GanttModule] });
GanttAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttAllModule, providers: [
        FilterService,
        SelectionService,
        SortService,
        ReorderService,
        ResizeService,
        EditService,
        DayMarkersService,
        ToolbarService,
        ContextMenuService,
        ExcelExportService,
        RowDDService,
        ColumnMenuService,
        PdfExportService,
        VirtualScrollService,
        CriticalPathService,
        UndoRedoService
    ], imports: [[CommonModule, GanttModule], GanttModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, GanttModule],
                    exports: [
                        GanttModule
                    ],
                    providers: [
                        FilterService,
                        SelectionService,
                        SortService,
                        ReorderService,
                        ResizeService,
                        EditService,
                        DayMarkersService,
                        ToolbarService,
                        ContextMenuService,
                        ExcelExportService,
                        RowDDService,
                        ColumnMenuService,
                        PdfExportService,
                        VirtualScrollService,
                        CriticalPathService,
                        UndoRedoService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWxsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYW50dC9nYW50dC1hbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFBOztBQUd4TSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUM7QUFDeEYsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUMsQ0FBQztBQUNqRyxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQWtCLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7QUFDbEYsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFrQixFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDO0FBQzNGLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBa0IsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBQztBQUN4RixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQWtCLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7QUFDbEYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUMsQ0FBQztBQUNwRyxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLENBQUM7QUFDM0YsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUMsQ0FBQztBQUN2RyxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBa0IsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBQyxDQUFDO0FBQ3ZHLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBa0IsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQztBQUNyRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQ3BHLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFrQixFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLENBQUM7QUFDakcsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQWtCLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUMsQ0FBQztBQUM3RyxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQyxDQUFDO0FBQzFHLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBa0IsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQztBQUU5Rjs7R0FFRztBQXlCSCxNQUFNLE9BQU8sY0FBYzs7MkdBQWQsY0FBYzs0R0FBZCxjQUFjLFlBdkJiLFlBQVksRUFBRSxXQUFXLGFBRS9CLFdBQVc7NEdBcUJOLGNBQWMsYUFuQmI7UUFDTixhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxjQUFjO1FBQ2QsYUFBYTtRQUNiLFdBQVc7UUFDWCxpQkFBaUI7UUFDakIsY0FBYztRQUNkLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIsWUFBWTtRQUNaLGlCQUFpQjtRQUNqQixnQkFBZ0I7UUFDaEIsb0JBQW9CO1FBQ3BCLG1CQUFtQjtRQUNuQixlQUFlO0tBQ2xCLFlBckJRLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxFQUVoQyxXQUFXOzJGQXFCTixjQUFjO2tCQXhCMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO29CQUNwQyxPQUFPLEVBQUU7d0JBQ0wsV0FBVztxQkFDZDtvQkFDRCxTQUFTLEVBQUM7d0JBQ04sYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsaUJBQWlCO3dCQUNqQixjQUFjO3dCQUNkLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3dCQUNsQixZQUFZO3dCQUNaLGlCQUFpQjt3QkFDakIsZ0JBQWdCO3dCQUNoQixvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsZUFBZTtxQkFDbEI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgVmFsdWVQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSwgQ29sdW1uc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1ucy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWRkRGlhbG9nRmllbGREaXJlY3RpdmUsIEFkZERpYWxvZ0ZpZWxkc0RpcmVjdGl2ZSB9IGZyb20gJy4vYWRkZGlhbG9nZmllbGRzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFZGl0RGlhbG9nRmllbGREaXJlY3RpdmUsIEVkaXREaWFsb2dGaWVsZHNEaXJlY3RpdmUgfSBmcm9tICcuL2VkaXRkaWFsb2dmaWVsZHMuZGlyZWN0aXZlJztcbmltcG9ydCB7IERheVdvcmtpbmdUaW1lRGlyZWN0aXZlLCBEYXlXb3JraW5nVGltZUNvbGxlY3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuL2RheXdvcmtpbmd0aW1lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBXZWVrV29ya2luZ1RpbWVEaXJlY3RpdmUsIFdlZWtXb3JraW5nVGltZXNEaXJlY3RpdmUgfSBmcm9tICcuL3dlZWt3b3JraW5ndGltZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSG9saWRheURpcmVjdGl2ZSwgSG9saWRheXNEaXJlY3RpdmUgfSBmcm9tICcuL2hvbGlkYXlzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFdmVudE1hcmtlckRpcmVjdGl2ZSwgRXZlbnRNYXJrZXJzRGlyZWN0aXZlIH0gZnJvbSAnLi9ldmVudG1hcmtlcnMuZGlyZWN0aXZlJztcbmltcG9ydCB7IEdhbnR0Q29tcG9uZW50IH0gZnJvbSAnLi9nYW50dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2FudHRNb2R1bGUgfSBmcm9tICcuL2dhbnR0Lm1vZHVsZSc7XG5pbXBvcnQge0ZpbHRlciwgU2VsZWN0aW9uLCBTb3J0LCBSZW9yZGVyLCBSZXNpemUsIEVkaXQsIERheU1hcmtlcnMsIFRvb2xiYXIsIENvbnRleHRNZW51LCBFeGNlbEV4cG9ydCwgUm93REQsIENvbHVtbk1lbnUsIFBkZkV4cG9ydCwgVmlydHVhbFNjcm9sbCwgQ3JpdGljYWxQYXRoLCBVbmRvUmVkb30gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWdhbnR0J1xuXG5cbmV4cG9ydCBjb25zdCBGaWx0ZXJTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnR2FudHRGaWx0ZXInLCB1c2VWYWx1ZTogRmlsdGVyfTtcbmV4cG9ydCBjb25zdCBTZWxlY3Rpb25TZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnR2FudHRTZWxlY3Rpb24nLCB1c2VWYWx1ZTogU2VsZWN0aW9ufTtcbmV4cG9ydCBjb25zdCBTb3J0U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0dhbnR0U29ydCcsIHVzZVZhbHVlOiBTb3J0fTtcbmV4cG9ydCBjb25zdCBSZW9yZGVyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0dhbnR0UmVvcmRlcicsIHVzZVZhbHVlOiBSZW9yZGVyfTtcbmV4cG9ydCBjb25zdCBSZXNpemVTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnR2FudHRSZXNpemUnLCB1c2VWYWx1ZTogUmVzaXplfTtcbmV4cG9ydCBjb25zdCBFZGl0U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0dhbnR0RWRpdCcsIHVzZVZhbHVlOiBFZGl0fTtcbmV4cG9ydCBjb25zdCBEYXlNYXJrZXJzU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0dhbnR0RGF5TWFya2VycycsIHVzZVZhbHVlOiBEYXlNYXJrZXJzfTtcbmV4cG9ydCBjb25zdCBUb29sYmFyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0dhbnR0VG9vbGJhcicsIHVzZVZhbHVlOiBUb29sYmFyfTtcbmV4cG9ydCBjb25zdCBDb250ZXh0TWVudVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdHYW50dENvbnRleHRNZW51JywgdXNlVmFsdWU6IENvbnRleHRNZW51fTtcbmV4cG9ydCBjb25zdCBFeGNlbEV4cG9ydFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdHYW50dEV4Y2VsRXhwb3J0JywgdXNlVmFsdWU6IEV4Y2VsRXhwb3J0fTtcbmV4cG9ydCBjb25zdCBSb3dERFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdHYW50dFJvd0REJywgdXNlVmFsdWU6IFJvd0REfTtcbmV4cG9ydCBjb25zdCBDb2x1bW5NZW51U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0dhbnR0Q29sdW1uTWVudScsIHVzZVZhbHVlOiBDb2x1bW5NZW51fTtcbmV4cG9ydCBjb25zdCBQZGZFeHBvcnRTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnR2FudHRQZGZFeHBvcnQnLCB1c2VWYWx1ZTogUGRmRXhwb3J0fTtcbmV4cG9ydCBjb25zdCBWaXJ0dWFsU2Nyb2xsU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ0dhbnR0VmlydHVhbFNjcm9sbCcsIHVzZVZhbHVlOiBWaXJ0dWFsU2Nyb2xsfTtcbmV4cG9ydCBjb25zdCBDcml0aWNhbFBhdGhTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnR2FudHRDcml0aWNhbFBhdGgnLCB1c2VWYWx1ZTogQ3JpdGljYWxQYXRofTtcbmV4cG9ydCBjb25zdCBVbmRvUmVkb1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdHYW50dFVuZG9SZWRvJywgdXNlVmFsdWU6IFVuZG9SZWRvfTtcblxuLyoqXG4gKiBOZ01vZHVsZSBkZWZpbml0aW9uIGZvciB0aGUgR2FudHQgY29tcG9uZW50IHdpdGggcHJvdmlkZXJzLlxuICovXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEdhbnR0TW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEdhbnR0TW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6W1xuICAgICAgICBGaWx0ZXJTZXJ2aWNlLFxuICAgICAgICBTZWxlY3Rpb25TZXJ2aWNlLFxuICAgICAgICBTb3J0U2VydmljZSxcbiAgICAgICAgUmVvcmRlclNlcnZpY2UsXG4gICAgICAgIFJlc2l6ZVNlcnZpY2UsXG4gICAgICAgIEVkaXRTZXJ2aWNlLFxuICAgICAgICBEYXlNYXJrZXJzU2VydmljZSxcbiAgICAgICAgVG9vbGJhclNlcnZpY2UsXG4gICAgICAgIENvbnRleHRNZW51U2VydmljZSxcbiAgICAgICAgRXhjZWxFeHBvcnRTZXJ2aWNlLFxuICAgICAgICBSb3dERFNlcnZpY2UsXG4gICAgICAgIENvbHVtbk1lbnVTZXJ2aWNlLFxuICAgICAgICBQZGZFeHBvcnRTZXJ2aWNlLFxuICAgICAgICBWaXJ0dWFsU2Nyb2xsU2VydmljZSxcbiAgICAgICAgQ3JpdGljYWxQYXRoU2VydmljZSxcbiAgICAgICAgVW5kb1JlZG9TZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBHYW50dEFsbE1vZHVsZSB7IH0iXX0=