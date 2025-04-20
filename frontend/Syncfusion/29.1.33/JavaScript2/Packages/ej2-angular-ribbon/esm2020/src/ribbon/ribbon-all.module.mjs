import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RibbonModule } from './ribbon.module';
import { RibbonButton, RibbonDropDown, RibbonSplitButton, RibbonCheckBox, RibbonColorPicker, RibbonComboBox, RibbonGroupButton, RibbonFileMenu, RibbonBackstage, RibbonKeyTip, RibbonContextualTab, RibbonGallery } from '@syncfusion/ej2-ribbon';
import * as i0 from "@angular/core";
export const RibbonButtonService = { provide: 'RibbonRibbonButton', useValue: RibbonButton };
export const RibbonDropDownService = { provide: 'RibbonRibbonDropDown', useValue: RibbonDropDown };
export const RibbonSplitButtonService = { provide: 'RibbonRibbonSplitButton', useValue: RibbonSplitButton };
export const RibbonCheckBoxService = { provide: 'RibbonRibbonCheckBox', useValue: RibbonCheckBox };
export const RibbonColorPickerService = { provide: 'RibbonRibbonColorPicker', useValue: RibbonColorPicker };
export const RibbonComboBoxService = { provide: 'RibbonRibbonComboBox', useValue: RibbonComboBox };
export const RibbonGroupButtonService = { provide: 'RibbonRibbonGroupButton', useValue: RibbonGroupButton };
export const RibbonFileMenuService = { provide: 'RibbonRibbonFileMenu', useValue: RibbonFileMenu };
export const RibbonBackstageService = { provide: 'RibbonRibbonBackstage', useValue: RibbonBackstage };
export const RibbonKeyTipService = { provide: 'RibbonRibbonKeyTip', useValue: RibbonKeyTip };
export const RibbonContextualTabService = { provide: 'RibbonRibbonContextualTab', useValue: RibbonContextualTab };
export const RibbonGalleryService = { provide: 'RibbonRibbonGallery', useValue: RibbonGallery };
/**
 * NgModule definition for the Ribbon component with providers.
 */
export class RibbonAllModule {
}
RibbonAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RibbonAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonAllModule, imports: [CommonModule, RibbonModule], exports: [RibbonModule] });
RibbonAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonAllModule, providers: [
        RibbonButtonService,
        RibbonDropDownService,
        RibbonSplitButtonService,
        RibbonCheckBoxService,
        RibbonColorPickerService,
        RibbonComboBoxService,
        RibbonGroupButtonService,
        RibbonFileMenuService,
        RibbonBackstageService,
        RibbonKeyTipService,
        RibbonContextualTabService,
        RibbonGalleryService
    ], imports: [[CommonModule, RibbonModule], RibbonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RibbonModule],
                    exports: [
                        RibbonModule
                    ],
                    providers: [
                        RibbonButtonService,
                        RibbonDropDownService,
                        RibbonSplitButtonService,
                        RibbonCheckBoxService,
                        RibbonColorPickerService,
                        RibbonComboBoxService,
                        RibbonGroupButtonService,
                        RibbonFileMenuService,
                        RibbonBackstageService,
                        RibbonKeyTipService,
                        RibbonContextualTabService,
                        RibbonGalleryService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmliYm9uLWFsbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcmliYm9uL3JpYmJvbi1hbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU8vQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQTs7QUFFL08sTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQWtCLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUMsQ0FBQztBQUMzRyxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQyxDQUFDO0FBQ2pILE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFrQixFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsQ0FBQztBQUMxSCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQyxDQUFDO0FBQ2pILE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFrQixFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsQ0FBQztBQUMxSCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQyxDQUFDO0FBQ2pILE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFrQixFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsQ0FBQztBQUMxSCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBa0IsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQyxDQUFDO0FBQ2pILE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFrQixFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFDLENBQUM7QUFDcEgsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQWtCLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUMsQ0FBQztBQUMzRyxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBa0IsRUFBRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFDLENBQUM7QUFDaEksTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQWtCLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUMsQ0FBQztBQUM5Rzs7R0FFRztBQXFCSCxNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLFlBbkJkLFlBQVksRUFBRSxZQUFZLGFBRWhDLFlBQVk7NkdBaUJQLGVBQWUsYUFmZDtRQUNOLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsd0JBQXdCO1FBQ3hCLHFCQUFxQjtRQUNyQix3QkFBd0I7UUFDeEIscUJBQXFCO1FBQ3JCLHdCQUF3QjtRQUN4QixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLG1CQUFtQjtRQUNuQiwwQkFBMEI7UUFDMUIsb0JBQW9CO0tBQ3ZCLFlBakJRLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxFQUVqQyxZQUFZOzJGQWlCUCxlQUFlO2tCQXBCM0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO29CQUNyQyxPQUFPLEVBQUU7d0JBQ0wsWUFBWTtxQkFDZjtvQkFDRCxTQUFTLEVBQUM7d0JBQ04sbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLHdCQUF3Qjt3QkFDeEIscUJBQXFCO3dCQUNyQix3QkFBd0I7d0JBQ3hCLHFCQUFxQjt3QkFDckIsd0JBQXdCO3dCQUN4QixxQkFBcUI7d0JBQ3JCLHNCQUFzQjt3QkFDdEIsbUJBQW1CO3dCQUNuQiwwQkFBMEI7d0JBQzFCLG9CQUFvQjtxQkFDdkI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgVmFsdWVQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJpYmJvbkl0ZW1EaXJlY3RpdmUsIFJpYmJvbkl0ZW1zRGlyZWN0aXZlIH0gZnJvbSAnLi9pdGVtcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmliYm9uQ29sbGVjdGlvbkRpcmVjdGl2ZSwgUmliYm9uQ29sbGVjdGlvbnNEaXJlY3RpdmUgfSBmcm9tICcuL2NvbGxlY3Rpb25zLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSaWJib25Hcm91cERpcmVjdGl2ZSwgUmliYm9uR3JvdXBzRGlyZWN0aXZlIH0gZnJvbSAnLi9ncm91cHMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJpYmJvblRhYkRpcmVjdGl2ZSwgUmliYm9uVGFic0RpcmVjdGl2ZSB9IGZyb20gJy4vdGFicy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmliYm9uQ29udGV4dHVhbFRhYkRpcmVjdGl2ZSwgUmliYm9uQ29udGV4dHVhbFRhYnNEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRleHR1YWx0YWJzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSaWJib25Db21wb25lbnQgfSBmcm9tICcuL3JpYmJvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmliYm9uTW9kdWxlIH0gZnJvbSAnLi9yaWJib24ubW9kdWxlJztcbmltcG9ydCB7UmliYm9uQnV0dG9uLCBSaWJib25Ecm9wRG93biwgUmliYm9uU3BsaXRCdXR0b24sIFJpYmJvbkNoZWNrQm94LCBSaWJib25Db2xvclBpY2tlciwgUmliYm9uQ29tYm9Cb3gsIFJpYmJvbkdyb3VwQnV0dG9uLCBSaWJib25GaWxlTWVudSwgUmliYm9uQmFja3N0YWdlLCBSaWJib25LZXlUaXAsIFJpYmJvbkNvbnRleHR1YWxUYWIsIFJpYmJvbkdhbGxlcnl9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1yaWJib24nXG5cbmV4cG9ydCBjb25zdCBSaWJib25CdXR0b25TZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUmliYm9uUmliYm9uQnV0dG9uJywgdXNlVmFsdWU6IFJpYmJvbkJ1dHRvbn07XG5leHBvcnQgY29uc3QgUmliYm9uRHJvcERvd25TZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUmliYm9uUmliYm9uRHJvcERvd24nLCB1c2VWYWx1ZTogUmliYm9uRHJvcERvd259O1xuZXhwb3J0IGNvbnN0IFJpYmJvblNwbGl0QnV0dG9uU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1JpYmJvblJpYmJvblNwbGl0QnV0dG9uJywgdXNlVmFsdWU6IFJpYmJvblNwbGl0QnV0dG9ufTtcbmV4cG9ydCBjb25zdCBSaWJib25DaGVja0JveFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdSaWJib25SaWJib25DaGVja0JveCcsIHVzZVZhbHVlOiBSaWJib25DaGVja0JveH07XG5leHBvcnQgY29uc3QgUmliYm9uQ29sb3JQaWNrZXJTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUmliYm9uUmliYm9uQ29sb3JQaWNrZXInLCB1c2VWYWx1ZTogUmliYm9uQ29sb3JQaWNrZXJ9O1xuZXhwb3J0IGNvbnN0IFJpYmJvbkNvbWJvQm94U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1JpYmJvblJpYmJvbkNvbWJvQm94JywgdXNlVmFsdWU6IFJpYmJvbkNvbWJvQm94fTtcbmV4cG9ydCBjb25zdCBSaWJib25Hcm91cEJ1dHRvblNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdSaWJib25SaWJib25Hcm91cEJ1dHRvbicsIHVzZVZhbHVlOiBSaWJib25Hcm91cEJ1dHRvbn07XG5leHBvcnQgY29uc3QgUmliYm9uRmlsZU1lbnVTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUmliYm9uUmliYm9uRmlsZU1lbnUnLCB1c2VWYWx1ZTogUmliYm9uRmlsZU1lbnV9O1xuZXhwb3J0IGNvbnN0IFJpYmJvbkJhY2tzdGFnZVNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdSaWJib25SaWJib25CYWNrc3RhZ2UnLCB1c2VWYWx1ZTogUmliYm9uQmFja3N0YWdlfTtcbmV4cG9ydCBjb25zdCBSaWJib25LZXlUaXBTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUmliYm9uUmliYm9uS2V5VGlwJywgdXNlVmFsdWU6IFJpYmJvbktleVRpcH07XG5leHBvcnQgY29uc3QgUmliYm9uQ29udGV4dHVhbFRhYlNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdSaWJib25SaWJib25Db250ZXh0dWFsVGFiJywgdXNlVmFsdWU6IFJpYmJvbkNvbnRleHR1YWxUYWJ9O1xuZXhwb3J0IGNvbnN0IFJpYmJvbkdhbGxlcnlTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnUmliYm9uUmliYm9uR2FsbGVyeScsIHVzZVZhbHVlOiBSaWJib25HYWxsZXJ5fTtcbi8qKlxuICogTmdNb2R1bGUgZGVmaW5pdGlvbiBmb3IgdGhlIFJpYmJvbiBjb21wb25lbnQgd2l0aCBwcm92aWRlcnMuXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmliYm9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFJpYmJvbk1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOltcbiAgICAgICAgUmliYm9uQnV0dG9uU2VydmljZSxcbiAgICAgICAgUmliYm9uRHJvcERvd25TZXJ2aWNlLFxuICAgICAgICBSaWJib25TcGxpdEJ1dHRvblNlcnZpY2UsXG4gICAgICAgIFJpYmJvbkNoZWNrQm94U2VydmljZSxcbiAgICAgICAgUmliYm9uQ29sb3JQaWNrZXJTZXJ2aWNlLFxuICAgICAgICBSaWJib25Db21ib0JveFNlcnZpY2UsXG4gICAgICAgIFJpYmJvbkdyb3VwQnV0dG9uU2VydmljZSxcbiAgICAgICAgUmliYm9uRmlsZU1lbnVTZXJ2aWNlLFxuICAgICAgICBSaWJib25CYWNrc3RhZ2VTZXJ2aWNlLFxuICAgICAgICBSaWJib25LZXlUaXBTZXJ2aWNlLFxuICAgICAgICBSaWJib25Db250ZXh0dWFsVGFiU2VydmljZSxcbiAgICAgICAgUmliYm9uR2FsbGVyeVNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFJpYmJvbkFsbE1vZHVsZSB7IH0iXX0=