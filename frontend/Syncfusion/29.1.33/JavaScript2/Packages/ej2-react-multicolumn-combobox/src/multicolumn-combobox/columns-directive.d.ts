import { ComplexBase } from '@syncfusion/ej2-react-base';
import { ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';
export interface ColumnDirTypecast {
    template?: string | Function | any;
    headerTemplate?: string | Function | any;
}
/**
 * `ColumnDirective` represent a column of the React MultiColumnComboBox.
 * It must be contained in a MultiColumnComboBox component(`MultiColumnComboBoxComponent`).
 * ```tsx
 * <MultiColumnComboBoxComponent dataSource={data}>
 *   <ColumnsDirective>
 *     <ColumnDirective field='ID' width='100'></ColumnDirective>
 *     <ColumnDirective field='name' header='Name' width='100'></ColumnDirective>
 *   <ColumnsDirective>
 * </MultiColumnComboBoxComponent>
 * ```
 */
export declare class ColumnDirective extends ComplexBase<ColumnModel | ColumnDirTypecast & {
    children?: React.ReactNode;
}, ColumnModel | ColumnDirTypecast> {
    static moduleName: string;
}
export declare class ColumnsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
