import { ComplexBase } from '@syncfusion/ej2-react-base';
import { RibbonContextualTabSettingsModel } from '@syncfusion/ej2-ribbon';
/**
 * `RibbonContextualTabDirective` represent a contextual tab of the React Ribbon.
 * It must be contained in a Ribbon component(`RibbonComponent`).
 * ```tsx
 * <RibbonComponent>
 *   <RibbonContextualTabsDirective>
 *     <RibbonContextualTabDirective></RibbonContextualTabDirective>
 *     <RibbonContextualTabDirective></RibbonContextualTabDirective>
 *   <RibbonContextualTabsDirective>
 * </RibbonComponent>
 * ```
 */
export declare class RibbonContextualTabDirective extends ComplexBase<RibbonContextualTabSettingsModel & {
    children?: React.ReactNode;
}, RibbonContextualTabSettingsModel> {
    static moduleName: string;
}
export declare class RibbonContextualTabsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
