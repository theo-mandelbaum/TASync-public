import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { AddDialogFieldSettingsModel } from '@syncfusion/ej2-gantt';
export declare let AddDialogFieldsDirective: any;
export declare const AddDialogFieldsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-add-dialog-fields` directive represent a add dialog fields in VueJS Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```vue
 * <ejs-gantt :dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-add-dialog-fields>
 *     <e-add-dialog-field type='General' headerText='General'/>
 *     <e-add-dialog-field type='Dependency' headerText='Dependency'/>
 *   </e-add-dialog-fields>
 * </ejs-gantt>
 * ```
 */
export declare let AddDialogFieldDirective: DefineVueDirective<AddDialogFieldSettingsModel>;
export declare const AddDialogFieldPlugin: {
    name: string;
    install(Vue: any): void;
};
