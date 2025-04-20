import { ComplexBase } from '@syncfusion/ej2-react-base';
import { RibbonItemModel } from '@syncfusion/ej2-ribbon';
export interface RibbonItemDirTypecast {
    itemTemplate?: string | Function | any;
}
export declare class RibbonItemDirective extends ComplexBase<RibbonItemModel | RibbonItemDirTypecast & {
    children?: React.ReactNode;
}, RibbonItemModel | RibbonItemDirTypecast> {
    static moduleName: string;
}
export declare class RibbonItemsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
