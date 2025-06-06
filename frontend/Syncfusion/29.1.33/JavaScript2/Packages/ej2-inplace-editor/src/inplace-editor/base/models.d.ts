import { ChildProperty } from '@syncfusion/ej2-base';
import { TooltipModel } from '@syncfusion/ej2-popups';
/**
 * Configures the popup settings of the In-place editor.
 */
export declare class PopupSettings extends ChildProperty<PopupSettings> {
    /**
     * Specifies title for the editor popup.
     *
     * @default ''
     */
    title: string;
    /**
     * Specifies model for editor popup customization like position, animation,etc.
     *
     * @default null
     */
    model: TooltipModel;
}
/**
 * @hidden
 */
export declare const modulesList: {
    [key: string]: string;
};
/**
 * @hidden
 */
export declare const localeConstant: {
    [key: string]: object;
};
