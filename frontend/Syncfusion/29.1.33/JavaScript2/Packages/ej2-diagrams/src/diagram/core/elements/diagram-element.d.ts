import { HorizontalAlignment, VerticalAlignment, UnitMode, Transform, RelativeMode, FlipDirection, ElementAction, PortConnectionDirection, FlipMode } from '../../enum/enum';
import { MarginModel, ShapeStyleModel, ShadowModel } from '../appearance-model';
import { Size } from '../../primitives/size';
import { PointModel } from '../../primitives/point-model';
import { Rect } from '../../primitives/rect';
/**
 * DiagramElement module defines the basic unit of diagram
 */
export declare class DiagramElement {
    /**
     * Sets the unique id of the element
     */
    id: string;
    /**
     * Sets/Gets the reference point of the element
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let stackPanel: StackPanel = new StackPanel();
     * stackPanel.offsetX = 300; stackPanel.offsetY = 200;
     * stackPanel.width = 100; stackPanel.height = 100;
     * stackPanel.style.fill = 'red';
     * stackPanel.pivot = { x: 0.5, y: 0.5 };
     * let diagram: Diagram = new Diagram({
     * ...
     * basicElements: [stackPanel],
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     */
    pivot: PointModel;
    /**
     * Sets or gets whether the content of the element needs to be measured
     */
    protected isDirt: boolean;
    /**
     * set to true during print and eport
     */
    /** @private */
    isExport: boolean;
    /**
     * set scaling value for print and export
     */
    /** @private */
    exportScaleValue: PointModel;
    /**
     * set scaling value for print and export
     */
    /** @private */
    exportScaleOffset: PointModel;
    /**
     * Check whether style need to be apply or not
     */
    /** @private */
    canApplyStyle: boolean;
    /**
     * Sets or gets whether the content of the element to be visible
     */
    visible: boolean;
    /**
     * Sets/Gets the x-coordinate of the element
     */
    offsetX: number;
    /**
     * Sets/Gets the y-coordinate of the element
     */
    offsetY: number;
    /**
     * Set the corner of the element
     */
    cornerRadius: number;
    /**
     * Sets/Gets the minimum height of the element
     */
    minHeight: number;
    /**
     * Sets/Gets the minimum width of the element
     */
    minWidth: number;
    /**
     * Sets/Gets the maximum width of the element
     */
    maxWidth: number;
    /**
     * Sets/Gets the maximum height of the element
     */
    maxHeight: number;
    /**
     * Sets/Gets the width of the element
     */
    width: number;
    /**
     * Sets/Gets the height of the element
     */
    height: number;
    /**
     * Sets/Gets the rotate angle of the element
     */
    rotateAngle: number;
    /**
     * Sets/Gets the margin of the element
     */
    margin: MarginModel;
    /**
     * Sets/Gets the allowed direction for connections to the port
     */
    connectionDirection: PortConnectionDirection;
    /**
     * Sets/Gets how the element has to be horizontally arranged with respect to its immediate parent
     * * Stretch - Stretches the diagram element throughout its immediate parent
     * * Left - Aligns the diagram element at the left of its immediate parent
     * * Right - Aligns the diagram element at the right of its immediate parent
     * * Center - Aligns the diagram element at the center of its immediate parent
     * * Auto - Aligns the diagram element based on the characteristics of its immediate parent
     */
    horizontalAlignment: HorizontalAlignment;
    /**
     * Sets/Gets how the element has to be vertically arranged with respect to its immediate parent
     * * Stretch - Stretches the diagram element throughout its immediate parent
     * * Top - Aligns the diagram element at the top of its immediate parent
     * * Bottom - Aligns the diagram element at the bottom of its immediate parent
     * * Center - Aligns the diagram element at the center of its immediate parent
     * * Auto - Aligns the diagram element based on the characteristics of its immediate parent
     */
    verticalAlignment: VerticalAlignment;
    /**
     * Sets/Gets the mirror image of diagram element in both horizontal and vertical directions
     * * FlipHorizontal - Translate the diagram element throughout its immediate parent
     * * FlipVertical - Rotate the diagram element throughout its immediate parent
     */
    flip: FlipDirection;
    /**
     * Sets/Gets the element that is to be flipped in assigned flip direction along with the node
     */
    flipMode: FlipMode;
    /**
     * Sets whether the element has to be aligned with respect to a point/with respect to its immediate parent
     * * Point - Diagram elements will be aligned with respect to a point
     * * Object - Diagram elements will be aligned with respect to its immediate parent
     */
    relativeMode: RelativeMode;
    /**
     * Sets whether the element has to be transformed based on its parent or not
     * * Self - Sets the transform type as Self
     * * Parent - Sets the transform type as Parent
     */
    transform: Transform;
    /**
     * Sets the style of the element
     */
    style: ShapeStyleModel;
    /**
     * Gets the parent id for the element
     */
    parentId: string;
    /**
     * Gets the minimum size that is required by the element
     */
    desiredSize: Size;
    /**
     * Gets the size that the element will be rendered
     */
    actualSize: Size;
    /**
     * Gets the rotate angle that is set to the immediate parent of the element
     */
    parentTransform: number;
    /** @private */
    preventContainer: boolean;
    /**
     * Gets/Set the boolean value for the element
     */
    isSvgRender: boolean;
    /**
     * Gets/Sets the boundary of the element
     */
    bounds: Rect;
    /**
     * Gets/Sets the corners of the rectangular bounds
     */
    corners: Corners;
    /**
     * Defines the appearance of the shadow of the element
     */
    shadow: ShadowModel;
    /**
     * Defines the description of the diagram element
     */
    description: string;
    /**
     * Defines whether the element has to be measured or not
     */
    staticSize: boolean;
    /**
     * Defines the shape of the diagram element
     */
    shapeType: string;
    /**
     * check whether the element is rect or not
     */
    isRectElement: boolean;
    /** @private */
    isCalculateDesiredSize: boolean;
    /**
     * Set the offset values for container in flipping
     */
    /** @private */
    flipOffset: PointModel;
    /**
     * Defines whether the element is group or port
     */
    /** @private */
    elementActions: ElementAction;
    /** @private */
    inversedAlignment: boolean;
    /**
     * Sets the offset of the element with respect to its parent \
     *
     * @returns { void }Sets the offset of the element with respect to its parent\
     * @param {number} x - provide the x value.
     * @param {number} y - provide the y value.
     * @param {UnitMode} mode - provide the id value.
     *
     * @private
     */
    setOffsetWithRespectToBounds(x: number, y: number, mode: UnitMode): void;
    /**
     * Gets the position of the element with respect to its parent \
     *
     * @returns { PointModel } Gets the position of the element with respect to its parent\
     * @param {Size} size - provide the x value.
     *
     * @private
     */
    getAbsolutePosition(size: Size): PointModel;
    private position;
    private unitMode;
    /**   @private  */
    float: boolean;
    /**
    * used to set the outer bounds value \
    *
    * @returns { void } used to set the outer bounds value.\
    * @param {Rect} bounds - provide the id value.
    *
    * @private
    */
    outerBounds: Rect;
    private floatingBounds;
    /**
     * Measures the minimum space that the element requires \
     *
     * @returns { void } Measures the minimum space that the element requires.\
     * @param {Size} availableSize - provide the id value.
     * @param {Object} obj - provide the id value.
     * @param {Function} callback - provide the id value.
     *
     * @private
     */
    measure(availableSize: Size, obj?: Object, callback?: Function): Size;
    /**
     * Arranges the element \
     *
     * @returns { PointModel } Arranges the element\
     * @param {Size} desiredSize - provide the x value.
     *
     * @private
     */
    arrange(desiredSize: Size): Size;
    /**
     * Updates the bounds of the element \
     *
     * @returns { void } Updates the bounds of the element\
     *
     * @private
     */
    updateBounds(): void;
    /**
     * Validates the size of the element with respect to its minimum and maximum size \
     *
     * @returns { Size } Validates the size of the element with respect to its minimum and maximum size.\
     * @param {Size} desiredSize - provide the id value.
     * @param {Size} availableSize - provide the id value.
     *
     * @private
     */
    protected validateDesiredSize(desiredSize: Size, availableSize: Size): Size;
}
/**
 * Interface for a class corners
 */
export interface Corners {
    /** returns the top left point of canvas corner */
    topLeft: PointModel;
    /** returns the top center point of canvas corner */
    topCenter: PointModel;
    /** returns the top right point of canvas corner */
    topRight: PointModel;
    /** returns the middle left point of canvas corner */
    middleLeft: PointModel;
    /** returns the center point of canvas corner */
    center: PointModel;
    /** returns the middle left point of canvas corner */
    middleRight: PointModel;
    /** returns the bottom left point of canvas corner */
    bottomLeft: PointModel;
    /** returns the bottom center point of canvas corner */
    bottomCenter: PointModel;
    /** returns the bottom right point of canvas corner */
    bottomRight: PointModel;
    /** returns left position of canvas corner */
    left: number;
    /** returns right position of canvas corner */
    right: number;
    /** returns top position of canvas corner */
    top: number;
    /** returns bottom position of canvas corner */
    bottom: number;
    /** returns width of canvas */
    width: number;
    /** returns height of canvas */
    height: number;
}
