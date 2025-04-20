import { ComplexBase } from '@syncfusion/ej2-react-base';
import { ToolbarItemModel } from '@syncfusion/ej2-filemanager';
export interface ToolbarItemDirTypecast {
    template?: string | Function | any;
}
export declare class ToolbarItemDirective extends ComplexBase<ToolbarItemModel | ToolbarItemDirTypecast & {
    children?: React.ReactNode;
}, ToolbarItemModel | ToolbarItemDirTypecast> {
    static moduleName: string;
}
export declare class ToolbarItemsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
