import { ChildProperty } from '@syncfusion/ej2-base';
/**
 * Configures tooltip settings for Gantt.
 */
export declare class TooltipSettings extends ChildProperty<TooltipSettings> {
    /**
     * Enables or disables tooltip of Gantt element.
     *
     * @default true
     */
    showTooltip: boolean;
    /**
     * Defines tooltip template for taskbar elements.
     *
     * @default null
     * @aspType string
     */
    taskbar: string | Function;
    /**
     * Defines template for baseline tooltip element.
     *
     * @default null
     * @aspType string
     */
    baseline: string | Function;
    /**
     * Defines template for dependency line tooltip.
     *
     * @default null
     * @aspType string
     */
    connectorLine: string | Function;
    /**
     * Defines tooltip template for taskbar editing action.
     *
     * @default null
     * @aspType string
     */
    editing: string | Function;
    /**
     * Defines template for timeLine tooltip element.
     *
     * @default null
     * @aspType string
     */
    timeline: string | Function;
}
