import { ChildProperty } from '@syncfusion/ej2-base';
import { RulerOrientation, TickAlignment } from '../../ruler/index';
import { DiagramRulerModel } from './ruler-settings-model';
/**
 * Defines the properties of both horizontal and vertical guides/rulers to measure the diagram area.
 */
export declare abstract class DiagramRuler extends ChildProperty<DiagramRuler> {
    /**
     * Defines the number of intervals to be present on each segment of the ruler.
     *
     * @default 5
     */
    interval: number;
    /**
     * Defines the textual description of the ruler segment, and the appearance of the ruler ticks of the ruler.
     *
     * @default 100
     */
    segmentWidth: number;
    /**
     * Defines the orientation of the ruler
     *
     * @default 'Horizontal'
     */
    orientation: RulerOrientation;
    /**
     * Defines and sets the tick alignment of the ruler scale.
     *
     * @default 'RightOrBottom'
     */
    tickAlignment: TickAlignment;
    /**
     * Defines the color of the ruler marker brush.
     *
     * @default 'red'
     */
    markerColor: string;
    /**
     * Defines the height of the ruler.
     *
     * @default 25
     */
    thickness: number;
    /**
     * Defines the method which is used to position and arrange the tick elements of the ruler.
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let arrange: Function = (args: IArrangeTickOptions) => {
     * if (args.tickInterval % 10 == 0) {
     * args.tickLength = 25;
     * }
     * }
     * let diagram: Diagram = new Diagram({
     * ...
     * rulerSettings: { showRulers: true,
     * horizontalRuler: { segmentWidth: 50, orientation: 'Horizontal', interval: 10,  arrangeTick: arrange },
     * verticalRuler: {segmentWidth: 200,interval: 20, thickness: 20,
     * tickAlignment: 'LeftOrTop', segmentWidth: 50, markerColor: 'red' }
     * },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default null
     * @deprecated
     */
    arrangeTick: Function | string;
}
/**
 * Defines the ruler settings of diagram
 * ```html
 * <div id='diagram'></div>
 * ```
 * ```typescript
 * let diagram: Diagram = new Diagram({
 * ...
 * rulerSettings: { showRulers: true,
 * horizontalRuler: { segmentWidth: 50,interval: 10 },
 * verticalRuler: {segmentWidth: 200,interval: 20}
 * },
 * ...
 * });
 * diagram.appendTo('#diagram');
 * ```
 *
 * @default {}
 */
export declare class RulerSettings extends ChildProperty<RulerSettings> {
    /**
     * Enables or disables both horizontal and vertical ruler.
     *
     * @default false
     */
    showRulers: boolean;
    /**
     * Updates the gridlines relative to the ruler ticks.
     *
     * @default true
     */
    dynamicGrid: boolean;
    /**
     * Defines the appearance of horizontal ruler
     *
     * @default {}
     */
    horizontalRuler: DiagramRulerModel;
    /**
     * Defines the appearance of vertical ruler
     *
     * @default {}
     */
    verticalRuler: DiagramRulerModel;
}
