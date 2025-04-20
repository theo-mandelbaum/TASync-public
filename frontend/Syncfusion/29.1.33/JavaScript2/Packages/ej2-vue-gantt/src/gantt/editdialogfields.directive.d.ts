import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { EditDialogFieldSettingsModel } from '@syncfusion/ej2-gantt';
export declare let EditDialogFieldsDirective: any;
export declare const EditDialogFieldsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-edit-dialog-fields` directive represent a add dialog fields in VueJS Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```vue
 * <ejs-gantt :dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-edit-dialog-fields>
 *     <e-edit-dialog-field type='General' headerText='General'/>
 *     <e-edit-dialog-field type='Dependency' headerText='Dependency'/>
 *   </e-edit-dialog-fields>
 * </ejs-gantt>
 * ```
 */
export declare let EditDialogFieldDirective: DefineVueDirective<EditDialogFieldSettingsModel>;
export declare const EditDialogFieldPlugin: {
    name: string;
    install(Vue: any): void;
};
