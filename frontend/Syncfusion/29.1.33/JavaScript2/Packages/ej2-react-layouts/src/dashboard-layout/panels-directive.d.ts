import { ComplexBase } from '@syncfusion/ej2-react-base';
import { PanelModel } from '@syncfusion/ej2-layouts';
export interface PanelDirTypecast {
    header?: string | Function | any;
    content?: string | Function | any;
    panels?: any;
}
/**
 * `PanelsDirective` represent a presets of the react dashboardlayout.
 * It must be contained in a dashboardlayout component(`DashBoardLayoutComponent`).
 * ```tsx
 * <DashBoardLayoutComponent>
 * <PanelsDirective>
 * <PanelDirective></PanelDirective>
 * <PanelDirective></PanelDirective>
 * </PanelsDirective>
 * </DashBoardLayoutComponent>
 * ```
 */
export declare class PanelDirective extends ComplexBase<PanelModel | PanelDirTypecast & {
    children?: React.ReactNode;
}, PanelModel | PanelDirTypecast> {
    static moduleName: string;
    static complexTemplate: Object;
}
export declare class PanelsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
