import { ChildProperty } from '@syncfusion/ej2-base';
import { TextStyleModel, MarginModel } from '../core/appearance-model';
import { PointModel } from '../primitives/point-model';
import { HyperlinkModel } from '../objects/annotation-model';
import { HorizontalAlignment, VerticalAlignment, AnnotationAlignment, AnnotationTypes, TextDecoration, AnnotationType, LinkTarget, RotationReference } from '../enum/enum';
import { AnnotationConstraints } from '../enum/enum';
import { DiagramTooltipModel } from './tooltip-model';
/**
 * Defines the hyperlink for the annotations in the nodes/connectors
 */
export declare class Hyperlink extends ChildProperty<Hyperlink> {
    /**
     * Sets the fill color of the hyperlink
     *
     * @default 'blue'
     */
    color: string;
    /**
     * Defines the content for hyperlink
     *
     * @default ''
     */
    content: string;
    /**
     * Defines the link for hyperlink
     *
     * @default ''
     */
    link: string;
    /**
     * Defines how the link should be decorated. For example, with underline/over line
     * * Overline - Decorates the text with a line above the text
     * * Underline - Decorates the text with an underline
     * * LineThrough - Decorates the text by striking it with a line
     * * None - Text will not have any specific decoration
     *
     * @default 'None'
     */
    textDecoration: TextDecoration;
    /**
     *Allows the user to open the hyperlink in the new tab, current tab or new window
     *
     * @default 'NewTab'
     */
    hyperlinkOpenState: LinkTarget;
}
/**
 * Defines the textual description of nodes/connectors
 */
export declare class Annotation extends ChildProperty<Annotation> {
    /**
     * Sets the textual description of the node/connector
     *
     * @default ''
     */
    content: string;
    /**
     * Sets the textual description of the node/connector
     *
     * @default 'undefined'
     */
    template: string | HTMLElement | Function;
    /**
     *  Defines the type of annotation template
     * String -  Defines annotation template to be in string
     * Template - Defines annotation template to be in html content
     *
     * @default 'String'
     */
    annotationType: AnnotationType;
    /**
     * Defines the visibility of the label
     *
     * @default true
     */
    visibility: boolean;
    /**
     * Enables or disables the default behaviors of the label.
     * * ReadOnly - Enables/Disables the ReadOnly Constraints
     * * InheritReadOnly - Enables/Disables the InheritReadOnly Constraints
     *
     * @default 'InheritReadOnly'
     * @aspNumberEnum
     */
    constraints: AnnotationConstraints;
    /**
     * Sets the hyperlink of the label
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let nodes: NodeModel[] = [{
     * id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100,
     * annotations: [{ id: 'label1',
     * content: 'Default Shape', style: { color: 'red' },
     * hyperlink: { link: 'https://www.google.com', color : 'blue', textDecoration : 'Overline', content : 'google' }
     * }, {content: 'text', constraints: ~AnnotationConstraints.InheritReadOnly
     * }],
     * }];
     * let diagram: Diagram = new Diagram({
     * ...
     * nodes : nodes,
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    hyperlink: HyperlinkModel;
    /**
     * Defines the unique id of the annotation
     *
     * @default ''
     */
    id: string;
    /**
     * Sets the width of the text
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    width: number;
    /**
     * Sets the height of the text
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    height: number;
    /**
     * Sets the rotate angle of the text
     *
     * @default 0
     */
    rotateAngle: number;
    /**
     * Gets or sets the reference mode for annotation rotation.
     *
     * @default 'Parent'
     */
    rotationReference: RotationReference;
    /**
     * Defines the appearance of the text
     *
     * @default new TextStyle()
     */
    style: TextStyleModel;
    /**
     * Sets the horizontal alignment of the text with respect to the parent node/connector
     * * Stretch - Stretches the diagram element throughout its immediate parent
     * * Left - Aligns the diagram element at the left of its immediate parent
     * * Right - Aligns the diagram element at the right of its immediate parent
     * * Center - Aligns the diagram element at the center of its immediate parent
     * * Auto - Aligns the diagram element based on the characteristics of its immediate parent
     *
     * @default 'Center'
     */
    horizontalAlignment: HorizontalAlignment;
    /**
     * Sets the vertical alignment of the text with respect to the parent node/connector
     * * Stretch - Stretches the diagram element throughout its immediate parent
     * * Top - Aligns the diagram element at the top of its immediate parent
     * * Bottom - Aligns the diagram element at the bottom of its immediate parent
     * * Center - Aligns the diagram element at the center of its immediate parent
     * * Auto - Aligns the diagram element based on the characteristics of its immediate parent
     *
     * @default 'Center'
     */
    verticalAlignment: VerticalAlignment;
    /**
     * Sets the space to be left between an annotation and its parent node/connector
     *
     * @default new Margin(0,0,0,0)
     */
    margin: MarginModel;
    /**
     * Sets the space to be left between an annotation and its parent node/connector
     *
     * @default new Margin(20,20,20,20)
     */
    dragLimit: MarginModel;
    /**
     * Sets the type of the annotation
     *  * Shape - Sets the annotation type as Shape
     *  * Path - Sets the annotation type as Path
     *
     * @default 'Shape'
     */
    type: AnnotationTypes;
    /**
     * This property is used to show tooltip for annotation on mouse over.
     *
     * @default new DiagramToolTip();
     */
    tooltip: DiagramTooltipModel;
    /**
     * Allows the user to save custom information/data about an annotation
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let addInfo: {}  = { content: 'label' };
     * let nodes: NodeModel[] = [{
     * id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100,
     * annotations: [{ id: 'label1',
     * content: 'text', constraints: ~AnnotationConstraints.InheritReadOnly, addInfo: addInfo
     * }],
     * }];
     * let diagram: Diagram = new Diagram({
     * ...
     * nodes : nodes,
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    addInfo: Object;
    constructor(parent: any, propName: string, defaultValue: Object, isArray?: boolean);
}
/**
 * Defines the textual description of nodes/connectors with respect to bounds
 */
export declare class ShapeAnnotation extends Annotation {
    /**
     * Sets the position of the annotation with respect to its parent bounds
     *
     * @default { x: 0.5, y: 0.5 }
     * @blazorType NodeAnnotationOffset
     */
    offset: PointModel;
    constructor(parent: any, propName: string, defaultValue: Object, isArray?: boolean);
    /**
     * @private
     * Returns the module of class ShapeAnnotation
     */
    getClassName(): string;
}
/**
 * Defines the connector annotation
 */
export declare class PathAnnotation extends Annotation {
    /**
     * Sets the segment offset of annotation
     *
     * @default 0.5
     */
    offset: number;
    /**
     * Sets the displacement of an annotation from its actual position
     *
     * @aspDefaultValueIgnore
     * @blazorDefaultValueIgnore
     * @default undefined
     */
    displacement: PointModel;
    /**
     * Sets the segment alignment of annotation
     *  * Center - Aligns the annotation at the center of a connector segment
     *  * Before - Aligns the annotation before a connector segment
     *  * After - Aligns the annotation after a connector segment
     *
     * @default Center
     */
    alignment: AnnotationAlignment;
    /**
     * Enable/Disable the angle based on the connector segment
     *
     * @default false
     */
    segmentAngle: boolean;
    constructor(parent: any, propName: string, defaultValue: Object, isArray?: boolean);
    /**
     * Returns the module of class PathAnnotation.
     *
     * @returns {string}  Returns the module of class PathAnnotation.
     * @private
     */
    getClassName(): string;
}
