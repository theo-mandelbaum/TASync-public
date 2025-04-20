import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnDirective, ColumnsDirective } from './columns.directive';
import { MultiColumnComboBoxComponent } from './multicolumncombobox.component';
import * as i0 from "@angular/core";
/**
 * NgModule definition for the MultiColumnComboBox component.
 */
export class MultiColumnComboBoxModule {
}
MultiColumnComboBoxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MultiColumnComboBoxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxModule, declarations: [MultiColumnComboBoxComponent,
        ColumnDirective,
        ColumnsDirective], imports: [CommonModule], exports: [MultiColumnComboBoxComponent,
        ColumnDirective,
        ColumnsDirective] });
MultiColumnComboBoxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        MultiColumnComboBoxComponent,
                        ColumnDirective,
                        ColumnsDirective
                    ],
                    exports: [
                        MultiColumnComboBoxComponent,
                        ColumnDirective,
                        ColumnsDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGljb2x1bW5jb21ib2JveC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbXVsdGljb2x1bW4tY29tYm9ib3gvbXVsdGljb2x1bW5jb21ib2JveC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztBQUUvRTs7R0FFRztBQWNILE1BQU0sT0FBTyx5QkFBeUI7O3NIQUF6Qix5QkFBeUI7dUhBQXpCLHlCQUF5QixpQkFWOUIsNEJBQTRCO1FBQzVCLGVBQWU7UUFDZixnQkFBZ0IsYUFKVixZQUFZLGFBT2xCLDRCQUE0QjtRQUM1QixlQUFlO1FBQ2YsZ0JBQWdCO3VIQUdYLHlCQUF5QixZQVp6QixDQUFDLFlBQVksQ0FBQzsyRkFZZCx5QkFBeUI7a0JBYnJDLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUU7d0JBQ1YsNEJBQTRCO3dCQUM1QixlQUFlO3dCQUNmLGdCQUFnQjtxQkFDbkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLDRCQUE0Qjt3QkFDNUIsZUFBZTt3QkFDZixnQkFBZ0I7cUJBQ25CO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb2x1bW5EaXJlY3RpdmUsIENvbHVtbnNEaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbnMuZGlyZWN0aXZlJztcbmltcG9ydCB7IE11bHRpQ29sdW1uQ29tYm9Cb3hDb21wb25lbnQgfSBmcm9tICcuL211bHRpY29sdW1uY29tYm9ib3guY29tcG9uZW50JztcblxuLyoqXG4gKiBOZ01vZHVsZSBkZWZpbml0aW9uIGZvciB0aGUgTXVsdGlDb2x1bW5Db21ib0JveCBjb21wb25lbnQuXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE11bHRpQ29sdW1uQ29tYm9Cb3hDb21wb25lbnQsXG4gICAgICAgIENvbHVtbkRpcmVjdGl2ZSxcbiAgICAgICAgQ29sdW1uc0RpcmVjdGl2ZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNdWx0aUNvbHVtbkNvbWJvQm94Q29tcG9uZW50LFxuICAgICAgICBDb2x1bW5EaXJlY3RpdmUsXG4gICAgICAgIENvbHVtbnNEaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpQ29sdW1uQ29tYm9Cb3hNb2R1bGUgeyB9Il19