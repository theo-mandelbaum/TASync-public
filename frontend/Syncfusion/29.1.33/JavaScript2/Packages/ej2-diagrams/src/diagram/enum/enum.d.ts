/**
 * enum module defines the public enumerations
 */
/**
 * @private
 */
export declare enum BlazorAction {
    /** Return the layout value is true when doLayout is called   */
    Default = 0,
    /** Need to return the layout value when doLayout is called  */
    expandNode = 2,
    /** Enabled during the mouse interaction  */
    interaction = 4,
    /** Enable when the group action start in history */
    GroupingInProgress = 8,
    /** Enable when the group action start to clone another group node */
    GroupClipboardInProcess = 16,
    /** Enable when the clear the object to prevent the server update */
    ClearObject = 32
}
/**
 * Defines how the diagram elements have to be aligned with respect to its immediate parent
 * * Stretch - Stretches the diagram element throughout its immediate parent
 * * Left - Aligns the diagram element at the left of its immediate parent
 * * Right - Aligns the diagram element at the right of its immediate parent
 * * Center - Aligns the diagram element at the center of its immediate parent
 * * Auto - Aligns the diagram element based on the characteristics of its immediate parent
 */
export declare type HorizontalAlignment = 
/**
 * Stretch - Stretches the diagram element throughout its immediate parent
 */
'Stretch' | 
/**
 * Left - Aligns the diagram element at the left of its immediate parent
 */
'Left' | 
/**
 * Right - Aligns the diagram element at the right of its immediate parent
 */
'Right' | 
/**
 * Center - Aligns the diagram element at the center of its immediate parent
 */
'Center' | 
/**
 * Auto - Aligns the diagram element based on the characteristics of its immediate parent
 */
'Auto';
/**
 * Defines how the diagram elements have to be aligned with respect to its immediate parent
 * * Stretch - Stretches the diagram element throughout its immediate parent
 * * Top - Aligns the diagram element at the top of its immediate parent
 * * Bottom - Aligns the diagram element at the bottom of its immediate parent
 * * Center - Aligns the diagram element at the center of its immediate parent
 * * Auto - Aligns the diagram element based on the characteristics of its immediate parent
 */
export declare type VerticalAlignment = 
/**
 * Stretch - Stretches the diagram element throughout its immediate parent
 */
'Stretch' | 
/**
 * Top - Aligns the diagram element at the top of its immediate parent
 */
'Top' | 
/**
 * Bottom - Aligns the diagram element at the bottom of its immediate parent
 */
'Bottom' | 
/**
 * Center - Aligns the diagram element at the center of its immediate parent
 */
'Center' | 
/**
 * Auto - Aligns the diagram element based on the characteristics of its immediate parent
 */
'Auto';
/**
 * Defines how the ports have to be aligned with respect to its immediate parent
 * Center - Aligns the ports at the center of a connector segment
 * Before - Aligns the ports before a connector segment
 * After - Aligns the ports after a connector segment
 */
export declare type PortAlignment = 
/**
 * Center - Aligns the ports at the center of a connector segment
 */
'Center' | 
/**
 * Before - Aligns the ports before a connector segment
 */
'Before' | 
/**
 * After - Aligns the ports after a connector segment
 */
'After';
/**
 * Defines how the diagram elements have to be flipped with respect to its immediate parent
 * * FlipHorizontal - Translate the diagram element throughout its immediate parent
 * * FlipVertical - Rotate the diagram element throughout its immediate parent
 * * Both - Rotate  and Translate the diagram element throughout its immediate parent
 * * None - Set the flip Direction as None
 */
export declare enum FlipDirection {
    /**
     * FlipHorizontal - Translate the diagram element throughout its immediate parent
     */
    Horizontal = 1,
    /**
     * FlipVertical - Rotate the diagram element throughout its immediate parent
     */
    Vertical = 2,
    /**
     * Both - Rotate and Translate the diagram element throughout its immediate parent
     */
    Both = 3,
    /**
     * None - Set the flip Direction as None
     */
    None = 0
}
/**
 * Allows you to flip only the node or along with port, label, labelText
 * * All - Flips port, label and label text along with the node
 * * Label - Flips the label along with the node and keeps the text readable
 * * LabelText – Flips the node and inverts the label without flipping its position
 * * Port - Flips port along with the node
 * * None - Flips only the node
 * * PortAndLabel – Flips the port and label along with the node
 * * PortAndLabelText – Flips the port and label text along with the node
 * * LabelAndLabelText – Flips the label and label text along with the node
 */
export declare type FlipMode = 
/**
 * All - Flips port, label and label text along with the node
 */
'All' | 
/**
 * Label - Flips the label along with the node and keeps the text readable.
 */
'Label' | 
/**
 * LabelText – Flips the node and inverts the label without flipping its position
 */
'LabelText' | 
/**
 * Port - Flips port along with the node
 */
'Port' | 
/**
 * None - Flips only the node
 */
'None' | 
/**
 * PortAndLabel – Flips the port and label along with the node
 */
'PortAndLabel' | 
/**
 * PortAndLabelText – Flips the port and label text along with the node
 */
'PortAndLabelText' | 
/**
 * LabelAndLabelText – Flips the label and label text along with the node
 */
'LabelAndLabelText';
/**
 * Defines the orientation of the Page
 * Landscape - Display with page Width is more than the page Height.
 * Portrait - Display with page Height is more than the page width.
 */
export declare type PageOrientation = 
/**
 * Landscape - Display with page Width is more than the page Height
 */
'Landscape' | 
/**
 * Portrait - Display with page Height is more than the page width
 */
'Portrait';
/**
 * Defines the orientation of the layout
 * * TopToBottom - Renders the layout from top to bottom
 * * BottomToTop - Renders the layout from bottom to top
 * * LeftToRight - Renders the layout from left to right
 * * RightToLeft - Renders the layout from right to left
 */
export declare type LayoutOrientation = 
/**
 * TopToBottom - Renders the layout from top to bottom
 */
'TopToBottom' | 
/**
 * BottomToTop - Renders the layout from bottom to top
 */
'BottomToTop' | 
/**
 * LeftToRight - Renders the layout from left to right
 */
'LeftToRight' | 
/**
 * RightToLeft - Renders the layout from right to left
 */
'RightToLeft' | 
/**
 * Horizontal - Renders only the mindmap layout from left to right
 */
'Horizontal' | 
/**
 * vertical - Renders only the mindmap layout from top to bottom
 */
'vertical';
/**
 * Defines the types of the automatic layout
 * * None - None of the layouts is applied
 * * HierarchicalTree - Defines the type of the layout as Hierarchical Tree
 * * OrganizationalChart - Defines the type of the layout as Organizational Chart
 * * ComplexHierarchicalTree - Defines the type of the layout as complex HierarchicalTree
 * * RadialTree - Defines the type of the layout as Radial tree
 */
export declare type LayoutType = 
/**
 * None - None of the layouts is applied
 */
'None' | 
/**
 * HierarchicalTree - Defines the type of the layout as Hierarchical Tree
 */
'HierarchicalTree' | 
/**
 * RadialTree - Defines the type of the layout as Radial Tree
 */
'RadialTree' | 
/**
 * OrganizationalChart - Defines the type of the layout as Organizational Chart
 */
'OrganizationalChart' | 
/**
 * SymmetricalLayout - Defines the type of the layout as SymmetricalLayout
 */
'SymmetricalLayout' | 
/**
 * ComplexHierarchicalTree - Defines the type of the layout as complex HierarchicalTree
 */
'ComplexHierarchicalTree' | 
/**
 * MindMap - Defines the type of the layout as MindMap
 */
'MindMap' | 
/**
 * Flowchart - Defines the type of the layout as Flowchart
 */
'Flowchart';
/**
 * Defines the state of the layout rendering process.
 * * Started - Indicates that the layout rendering process has started.
 * * Completed - Indicates that the layout rendering process has finished.
 */
export declare type LayoutState = 
/**
 * Started - Indicates that the layout rendering process has started.
 */
'Started' | 
/**
 * Completed - Indicates that the layout rendering process has finished.
 */
'Completed';
export declare type BranchDirection = 
/**
 * SameAsFlow -Defines the direction as same as flow chart.
 */
'SameAsFlow' | 
/**
 * LeftInFlow - Defines the flow direction as left.
 */
'LeftInFlow' | 
/**
 * RightInFlow - Defines the flow direction as right.
 */
'RightInFlow';
/**
 * Alignment position
 * Left - Sets the branch type as Left
 * Right - Sets the branch type as Right
 * SubLeft - Sets the branch type as SubLeft
 * SubRight - Sets the branch type as SubRight
 * Root - Sets the branch type as Root
 */
export declare type BranchTypes = 
/**
 * Left - Sets the branch type as Left
 */
'Left' | 
/**
 * Right - Sets the branch type as Right
 */
'Right' | 
/**
 * SubLeft - Sets the branch type as SubLeft
 */
'SubLeft' | 
/**
 * SubRight - Sets the branch type as SubRight
 */
'SubRight' | 
/**
 * Root - Sets the branch type as Root
 */
'Root';
/**
 * Defines how the first segments have to be defined in a layout
 * Auto - Defines the first segment direction based on the type of the layout
 * Orientation - Defines the first segment direction based on the orientation of the layout
 * Custom - Defines the first segment direction dynamically by the user
 */
export declare type ConnectionDirection = 
/**
 * Auto - Defines the first segment direction based on the type of the layout
 */
'Auto' | 
/**
 * Orientation - Defines the first segment direction based on the orientation of the layout
 */
'Orientation' | 
/**
 * Custom - Defines the first segment direction dynamically by the user
 */
'Custom';
/**
 * Defines where the user handles have to be aligned
 * Top - Aligns the user handles at the top of an object
 * Bottom - Aligns the user handles at the bottom of an object
 * Left - Aligns the user handles at the left of an object
 * Right - Aligns the user handles at the right of an object
 */
export declare type Side = 
/**
 * Top - Aligns the user handles at the top of an object
 */
'Top' | 
/**
 * Bottom - Aligns the user handles at the bottom of an object
 */
'Bottom' | 
/**
 * Left - Aligns the user handles at the left of an object
 */
'Left' | 
/**
 * Right - Aligns the user handles at the right of an object
 */
'Right';
/**
 * Defines how the connectors have to be routed in a layout
 * Default - Routes the connectors like a default diagram
 * Layout - Routes the connectors based on the type of the layout
 */
export declare type ConnectorSegments = 
/**
 * Default - Routes the connectors like a default diagram
 */
'Default' | 
/**
 * Layout - Routes the connectors based on the type of the layout
 */
'Layout';
/**
 * Defines how the annotations have to be aligned with respect to its immediate parent
 * Center - Aligns the annotation at the center of a connector segment
 * Before - Aligns the annotation before a connector segment
 * After - Aligns the annotation after a connector segment
 */
export declare type AnnotationAlignment = 
/**
 * Center - Aligns the annotation at the center of a connector segment
 */
'Center' | 
/**
 * Before - Aligns the annotation before a connector segment
 */
'Before' | 
/**
 * After - Aligns the annotation after a connector segment
 */
'After';
/**
 * Defines how the fixedUserHandle have to be aligned with respect to its immediate parent
 * Center - Aligns the fixedUserHandle at the center of a connector segment
 * Before - Aligns the fixedUserHandle before a connector segment
 * After - Aligns the fixedUserHandle after a connector segment
 */
export declare type FixedUserHandleAlignment = 
/**
 * Center - Aligns the fixedUserHandle at the center of a connector segment
 */
'Center' | 
/**
 * Before - Aligns the fixedUserHandle before a connector segment
 */
'Before' | 
/**
 * After - Aligns the fixedUserHandle after a connector segment
 */
'After';
/**
 * Defines the type of the port
 * Point - Sets the type of the port as Point
 * Path - Sets the type of the port as Path
 * Dynamic - Sets the type of the port as Dynamic
 */
export declare type PortTypes = 
/**
 * Point - Sets the type of the port as Point
 */
'Point' | 
/**
 * Path - Sets the type of the port as Path
 */
'Path' | 
/**
 * Dynamic - Sets the type of the port as Dynamic
 */
'Dynamic';
/**
 * Defines the type of the annotation
 * Shape - Sets the annotation type as Shape
 * Path - Sets the annotation type as Path
 */
export declare type AnnotationTypes = 
/**
 * Shape - Sets the annotation type as Shape
 */
'Shape' | 
/**
 * Path - Sets the annotation type as Path
 */
'Path';
/**
 * File Format type for export.
 * JPG - Save the file in JPG Format
 * PNG - Saves the file in PNG Format
 * BMP - Save the file in BMP Format
 * SVG - save the file in SVG format
 *
 * @IgnoreSingular
 */
export declare type FileFormats = 
/** JPG-Save the file in JPG Format  */
'JPG' | 
/** PNG - Save the file in PNG Format */
'PNG' | 
/** BMP - Save the file in BMP format */
'BMP' | 
/** SVG - Saves the file in SVG format */
'SVG';
/**
 * Defines whether the diagram has to be exported as an image or it has to be converted as image url
 * Download
 * Data
 *
 * @IgnoreSingular
 */
export declare type ExportModes = 
/** Download - Download the image */
'Download' | 
/** Data - Converted as image url */
'Data';
/**
 * Defines the child type to be added in the UmlClassifierShape.
 * Methods
 * Attributes
 * Members
 *
 * @IgnoreSingular
 */
export declare type UmlClassChildType = 
/** Methods - Specified the UML class/interface child type as Method. */
'Method' | 
/** Attributes -Specified the UML class/interface child type as Method */
'Attribute' | 
/** Members - Specified the UML enum child type as Method */
'Member';
/**
 * Defines the region that has to be drawn as an image
 * PageSettings -  With the given page settings image has to be exported.
 * Content - The diagram content is export
 * CustomBounds - Exported with given bounds.
 *
 * @IgnoreSingular
 */
export declare type DiagramRegions = 
/** PageSettings -  With the given page settings image has to be exported. */
'PageSettings' | 
/** Content - The diagram content is export */
'Content' | 
/** CustomBounds - Exported with given bounds. */
'CustomBounds';
/**
 * Defines the type of annotation template
 * String -  Defines annotation template to be in string
 * Template - Defines annotation template to be in html content
 *
 * @IgnoreSingular
 */
export declare type AnnotationType = 
/** String -  Defines annotation template to be in string */
'String' | 
/** Template - Defines annotation template to be in html content */
'Template';
/**
 * Constraints to define when a port has to be visible
 * Visible - Always shows the port
 * Hidden - Always hides the port
 * Hover - Shows the port when the mouse hovers over a node
 * Connect - Shows the port when a connection end point is dragged over a node
 * Default - By default the ports will be visible when a node is hovered and being tried to connect
 *
 * @aspNumberEnum
 */
export declare enum PortVisibility {
    /** Always shows the port */
    Visible = 1,
    /** Always hides the port */
    Hidden = 2,
    /** Shows the port when the mouse hovers over a node */
    Hover = 4,
    /** Shows the port when a connection end point is dragged over a node */
    Connect = 8
}
/**
 * Define the allowed direction for connections to the port
 * Auto - Maintains the default behavior of automatic direction calculation.
 * Left - Restricts connections to only connect to the left side of the port.
 * Top - Restricts connections to only connect to the top side of the port.
 * Right - Restricts connections to only connect to the right side of the port.
 * Bottom - Restricts connections to only connect to the bottom side of the port.
 *
 * @IgnoreSingular
 */
export declare type PortConnectionDirection = 
/** Maintains the default behavior of automatic direction calculation.*/
'Auto' | 
/** Restricts connections to only connect to the left side of the port. */
'Left' | 
/** Restricts connections to only connect to the top side of the port */
'Top' | 
/** Restricts connections to only connect to the right side of the port  */
'Right' | 
/** Restricts connections to only connect to the bottom side of the port */
'Bottom';
/**
 * Defines the constraints to Enables / Disables some features of Snapping.
 * None - Snapping does not happen
 * ShowHorizontalLines - Displays only the horizontal gridlines in diagram.
 * ShowVerticalLines - Displays only the Vertical gridlines in diagram.
 * ShowLines - Display both Horizontal and Vertical gridlines.
 * SnapToHorizontalLines - Enables the object to snap only with horizontal gridlines.
 * SnapToVerticalLines - Enables the object to snap only with horizontal gridlines.
 * SnapToLines - Enables the object to snap with both horizontal and Vertical gridlines.
 * snapToObject - Enables the object to snap with the other objects in the diagram.
 *
 * @IgnoreSingular
 * @aspNumberEnum
 */
export declare enum SnapConstraints {
    /** None - Snapping does not happen */
    None = 0,
    /** ShowHorizontalLines - Displays only the horizontal gridlines in diagram. */
    ShowHorizontalLines = 1,
    /** ShowVerticalLines - Displays only the Vertical gridlines in diagram  */
    ShowVerticalLines = 2,
    /** ShowLines - Display both Horizontal and Vertical gridlines */
    ShowLines = 3,
    /** SnapToHorizontalLines - Enables the object to snap only with horizontal gridlines */
    SnapToHorizontalLines = 4,
    /** SnapToVerticalLines - Enables the object to snap only with horizontal gridlines */
    SnapToVerticalLines = 8,
    /** SnapToLines - Enables the object to snap with both horizontal and Vertical gridlines */
    SnapToLines = 12,
    /** SnapToObject - Enables the object to snap with the other objects in the diagram. */
    SnapToObject = 16,
    /** Shows gridlines and enables snapping */
    All = 31
}
/**
 * Defines the visibility of the selector handles
 * None - Hides all the selector elements
 * ConnectorSourceThumb - Shows/hides the source thumb of the connector
 * ConnectorTargetThumb - Shows/hides the target thumb of the connector
 * ResizeSouthEast - Shows/hides the bottom right resize handle of the selector
 * ResizeSouthWest - Shows/hides the bottom left resize handle of the selector
 * ResizeNorthEast - Shows/hides the top right resize handle of the selector
 * ResizeNorthWest - Shows/hides the top left resize handle of the selector
 * ResizeEast - Shows/hides the middle right resize handle of the selector
 * ResizeWest - Shows/hides the middle left resize handle of the selector
 * ResizeSouth - Shows/hides the bottom center resize handle of the selector
 * ResizeNorth - Shows/hides the top center resize handle of the selector
 * Rotate - Shows/hides the rotate handle of the selector
 * UserHandles - Shows/hides the user handles of the selector
 * Resize - Shows/hides all resize handles of the selector
 *
 * @aspNumberEnum
 * @IgnoreSingular
 */
export declare enum SelectorConstraints {
    /** Hides all the selector elements */
    None = 1,
    /** Shows/hides the source thumb of the connector */
    ConnectorSourceThumb = 2,
    /** Shows/hides the target thumb of the connector */
    ConnectorTargetThumb = 4,
    /** Shows/hides the bottom right resize handle of the selector */
    ResizeSouthEast = 8,
    /** Shows/hides the bottom left resize handle of the selector */
    ResizeSouthWest = 16,
    /** Shows/hides the top right resize handle of the selector */
    ResizeNorthEast = 32,
    /** Shows/hides the top left resize handle of the selector */
    ResizeNorthWest = 64,
    /** Shows/hides the middle right resize handle of the selector  */
    ResizeEast = 128,
    /** Shows/hides the middle left resize handle of the selector */
    ResizeWest = 256,
    /** Shows/hides the bottom center resize handle of the selector */
    ResizeSouth = 512,
    /** Shows/hides the top center resize handle of the selector */
    ResizeNorth = 1024,
    /**  Shows/hides the rotate handle of the selector */
    Rotate = 2048,
    /** Shows/hides the user handles of the selector */
    UserHandle = 4096,
    /** Shows/hides the default tooltip of nodes and connectors */
    ToolTip = 8192,
    /** Shows/hides all resize handles of the selector */
    ResizeAll = 2046,
    /** Shows all handles of the selector  */
    All = 16382
}
/**
 * Defines the type of the panel
 * None - Defines that the panel will not rearrange its children. Instead, it will be positioned based on its children.
 * Canvas - Defines the type of the panel as Canvas
 * Stack - Defines the type of the panel as Stack
 * Grid - Defines the type of the panel as Grid
 * WrapPanel - Defines the type of the panel as WrapPanel
 */
export declare type Panels = 
/** None - Defines that the panel will not rearrange its children. Instead, it will be positioned based on its children. */
'None' | 
/** Canvas - Defines the type of the panel as Canvas */
'Canvas' | 
/** Stack - Defines the type of the panel as Stack */
'Stack' | 
/** Grid - Defines the type of the panel as Grid */
'Grid' | 
/** WrapPanel - Defines the type of the panel as WrapPanel */
'WrapPanel';
/**
 * Defines the orientation
 * Horizontal - Sets the orientation as Horizontal
 * Vertical - Sets the orientation as Vertical
 */
export declare type Orientation = 
/** Horizontal - Sets the orientation as Horizontal */
'Horizontal' | 
/** Vertical - Sets the orientation as Vertical */
'Vertical';
/**
 * Defines the orientation
 * Horizontal - Sets the orientation as Horizontal
 * Vertical - Sets the orientation as Vertical
 */
export declare type ContainerTypes = 
/** Canvas - Sets the ContainerTypes as Canvas */
'Canvas' | 
/** Stack - Sets the ContainerTypes as Stack */
'Stack' | 
/** Grid - Sets the ContainerTypes as Grid */
'Grid';
/**
 * Defines the reference with respect to which the diagram elements have to be aligned
 * Point - Diagram elements will be aligned with respect to a point
 * Object - Diagram elements will be aligned with respect to its immediate parent
 */
export declare type RelativeMode = 
/** Point - Diagram elements will be aligned with respect to a point */
'Point' | 
/** Object - Diagram elements will be aligned with respect to its immediate parent */
'Object';
/**
 * Defines how to wrap the text when it exceeds the element bounds
 * WrapWithOverflow - Wraps the text so that no word is broken
 * Wrap - Wraps the text and breaks the word, if necessary
 * NoWrap - Text will no be wrapped
 */
export declare type TextWrap = 
/** WrapWithOverflow - Wraps the text so that no word is broken */
'WrapWithOverflow' | 
/** Wrap - Wraps the text and breaks the word, if necessary */
'Wrap' | 
/** NoWrap - Text will no be wrapped */
'NoWrap';
/**
 * Defines how to handle the text when it exceeds the element bounds
 * Wrap - Wraps the text to next line, when it exceeds its bounds
 * Ellipsis - It truncates the overflown text and represents the clipping with an ellipsis
 * Clip - It clips the overflow text
 */
export declare type TextOverflow = 
/** Wrap - Wraps the text to next line, when it exceeds its bounds */
'Wrap' | 
/** Ellipsis - It truncates the overflown text and represents the clipping with an ellipsis */
'Ellipsis' | 
/** Clip - It clips the overflow text */
'Clip';
/**
 * Defines how to show tooltip
 * Auto - Shows the tooltip on drag, scale, and rotate the object
 * Custom - Shows the tooltip for the diagram element
 */
export declare type TooltipMode = 
/** Auto - It shows the tooltip On drag,scale,rotate the object */
'Auto' | 
/** Custom - It shows tooltip based on object */
'Custom';
/**
 * Defines the mode of the alignment based on which the elements should be aligned
 * Object - Aligns the objects based on the first object in the selected list
 * Selector - Aligns the objects based on the  the selector bounds
 */
export declare type AlignmentMode = 
/** Object - Aligns the objects based on the first object in the selected list */
'Object' | 
/** Selector - Aligns the objects based on the  the selector bounds */
'Selector';
/**
 * Defines the alignment options
 * Left - Aligns the objects at the left of the selector bounds
 * Right - Aligns the objects at the right of the selector bounds
 * Center - Aligns the objects at the horizontal center of the selector bounds
 * Top - Aligns the objects at the top of the selector bounds
 * Bottom - Aligns the objects at the bottom of the selector bounds
 * Middle - Aligns the objects at the vertical center of the selector bounds
 */
export declare type AlignmentOptions = 
/** Left - Aligns the objects at the left of the selector bounds */
'Left' | 
/** Right - Aligns the objects at the right of the selector bounds */
'Right' | 
/** Center - Aligns the objects at the horizontal center of the selector bounds */
'Center' | 
/** Top - Aligns the objects at the top of the selector bounds */
'Top' | 
/** Bottom - Aligns the objects at the bottom of the selector bounds */
'Bottom' | 
/** Middle - Aligns the objects at the vertical center of the selector bounds */
'Middle';
/**
 * Defines the distribution options
 * RightToLeft - Distributes the objects based on the distance between the right and left sides of the adjacent objects
 * Left - Distributes the objects based on the distance between the left sides of the adjacent objects
 * Right - Distributes the objects based on the distance between the right sides of the adjacent objects
 * Center - Distributes the objects based on the distance between the center of the adjacent objects
 * BottomToTop - Distributes the objects based on the distance between the bottom and top sides of the adjacent objects
 * Top - Distributes the objects based on the distance between the top sides of the adjacent objects
 * Bottom - Distributes the objects based on the distance between the bottom sides of the adjacent objects
 * Middle - Distributes the objects based on the distance between the vertical center of the adjacent objects
 */
export declare type DistributeOptions = 
/** RightToLeft - Distributes the objects based on the distance between the right and left sides of the adjacent objects */
'RightToLeft' | 
/** Left - Distributes the objects based on the distance between the left sides of the adjacent objects */
'Left' | 
/** Right - Distributes the objects based on the distance between the right sides of the adjacent objects */
'Right' | 
/** Center - Distributes the objects based on the distance between the center of the adjacent objects */
'Center' | 
/** BottomToTop - Distributes the objects based on the distance between the bottom and top sides of the adjacent objects */
'BottomToTop' | 
/** Top - Distributes the objects based on the distance between the top sides of the adjacent objects */
'Top' | 
/** Bottom - Distributes the objects based on the distance between the bottom sides of the adjacent objects */
'Bottom' | 
/** Middle - Distributes the objects based on the distance between the vertical center of the adjacent objects */
'Middle';
/**
 * Defines the sizing options
 * Width - Scales the width of the selected objects
 * Height - Scales the height of the selected objects
 * Size - Scales the selected objects both vertically and horizontally
 */
export declare type SizingOptions = 
/** Width - Scales the width of the selected objects */
'Width' | 
/** Height - Scales the height of the selected objects */
'Height' | 
/** Size - Scales the selected objects both vertically and horizontally */
'Size';
/**
 * Defines how to handle the empty space and empty lines of a text
 * PreserveAll - Preserves all empty spaces and empty lines
 * CollapseSpace - Collapses the consequent spaces into one
 * CollapseAll - Collapses all consequent empty spaces and empty lines
 */
export declare type WhiteSpace = 
/** PreserveAll - Preserves all empty spaces and empty lines */
'PreserveAll' | 
/** CollapseSpace - Collapses the consequent spaces into one */
'CollapseSpace' | 
/** CollapseAll - Collapses all consequent empty spaces and empty lines */
'CollapseAll';
/**
 * Defines how to handle the rubber band selection
 * CompleteIntersect - Selects the objects that are contained within the selected region
 * PartialIntersect - Selects the objects that are partially intersected with the selected region
 */
export declare type RubberBandSelectionMode = 
/** CompleteIntersect - Selects the objects that are contained within the selected region */
'CompleteIntersect' | 
/** PartialIntersect - Selects the objects that are partially intersected with the selected region */
'PartialIntersect';
/**
 * Defines the rendering mode of the diagram
 * SVG - Renders the diagram objects as SVG elements
 * Canvas - Renders the diagram in a canvas
 */
export declare type RenderingMode = 
/** SVG - Renders the diagram objects as SVG elements */
'SVG' | 
/** Canvas - Renders the diagram in a canvas */
'Canvas';
/**
 * Defines the connection point of the connectors in the layout
 * SamePoint - Connectors will connect with same point in the layout
 * DifferentPoint - Connectors will connect with different points in the layout
 */
export declare enum ConnectionPointOrigin {
    /** SamePoint - Connectors will connect with same point in the layout */
    SamePoint = "SamePoint",
    /** DifferentPoint - Connectors will connect with different points in the layout */
    DifferentPoint = "DifferentPoint"
}
/**
 * Defines the child nodes need to arranged in linear manner in layout
 * Linear - Child nodes will be arranged in linear manner
 * Nonlinear - Child nodes will be arranged in not linear manner
 */
export declare enum ChildArrangement {
    /** Linear - Child nodes will be arranged in linear manner */
    Linear = "Linear",
    /** Nonlinear - Child nodes will be arranged in not linear manner */
    Nonlinear = "Nonlinear"
}
/**
 * Defines the gird rendering pattern
 * Lines - Render the line for the grid
 * Dots - Render the dot for the grid
 */
export declare type GridType = 
/** Lines - Render the diagram Grid in Line format */
'Lines' | 
/** Lines - Render the diagram Grid in Dot format */
'Dots';
/**
 * Defines how to decorate the text
 * Overline - Decorates the text with a line above the text
 * Underline - Decorates the text with an underline
 * LineThrough - Decorates the text by striking it with a line
 * None - Text will not have any specific decoration
 */
export declare type TextDecoration = 
/** Overline - Decorates the text with a line above the text */
'Overline' | 
/** Underline - Decorates the text with an underline */
'Underline' | 
/** LineThrough - Decorates the text by striking it with a line */
'LineThrough' | 
/** None - Text will not have any specific decoration */
'None';
/**
 * Defines how to open the annotation hyperlink in the new tab, current tab or new window
 */
export declare type LinkTarget = 
/**Opens hyperlink in the same tab */
'CurrentTab' | 
/**Opens hyperlink in the new tab */
'NewTab' | 
/**Opens hyperlink in the new window*/
'NewWindow';
/**
 * Defines how the text has to be aligned
 * Left - Aligns the text at the left of the text bounds
 * Right - Aligns the text at the right of the text bounds
 * Center - Aligns the text at the center of the text bounds
 * Justify - Aligns the text in a justified manner
 */
export declare type TextAlign = 
/** Left - Aligns the text at the left of the text bounds */
'Left' | 
/** Right - Aligns the text at the right of the text bounds */
'Right' | 
/** Center - Aligns the text at the center of the text bounds */
'Center' | 
/** Justify - Aligns the text in a justified manner */
'Justify';
/**
 * Defines the constraints to enable/disable certain features of connector.
 * * None - Interaction of the connectors cannot be done.
 * * Select - Selects the connector.
 * * Delete - Delete the connector.
 * * Drag - Drag the connector.
 * * DragSourceEnd - Drag the source end of the connector.
 * * DragTargetEnd - Drag the target end of the connector.
 * * DragSegmentThump - Drag the segment thumb of the connector.
 * * AllowDrop - Allow to drop a node.
 * * Bridging - Creates bridge  on intersection of two connectors.
 * * BridgeObstacle -
 * * InheritBridging - Creates bridge  on intersection of two connectors.
 * * PointerEvents - Sets the pointer events.
 * * Tooltip - Displays a tooltip for the connectors.
 * * InheritToolTip - Displays a tooltip for the connectors.
 * * Interaction - Features of the connector used for interaction.
 * * ReadOnly - Enables ReadOnly
 * * InheritSegmentThumbShape - Enables or disables to inherit the value of segmentThumbShape
 * * InheritSegmentThumbSize - Enables or disables to inherit the value of segmentThumbSize
 * * Default - Default features of the connector.
 *
 * @aspNumberEnum
 * @IgnoreSingular
 */
export declare enum ConnectorConstraints {
    /** Disable all connector Constraints. */
    None = 1,
    /** Enables connector to be selected. */
    Select = 2,
    /** Enables connector to be Deleted. */
    Delete = 4,
    /** Enables connector to be Dragged. */
    Drag = 8,
    /** Enables connectors source end to be selected. */
    DragSourceEnd = 16,
    /** Enables connectors target end to be selected. */
    DragTargetEnd = 32,
    /** Enables control point and end point of every segment in a connector for editing. */
    DragSegmentThumb = 64,
    /** Enables AllowDrop constraints to the  connector. */
    AllowDrop = 128,
    /** Enables bridging to the connector. */
    Bridging = 256,
    /** Enables or Disables Bridge Obstacles with overlapping of connectors. */
    BridgeObstacle = 512,
    /** Enables bridging to the connector. */
    InheritBridging = 1024,
    /** Used to set the pointer events. */
    PointerEvents = 2048,
    /** Enables or disables tool tip for the connectors */
    Tooltip = 4096,
    /** Enables or disables tool tip for the connectors */
    InheritTooltip = 8192,
    /** Enables Interaction. */
    Interaction = 4218,
    /** Enables ReadOnly */
    ReadOnly = 16384,
    /** Enables or disables routing to the connector. */
    LineRouting = 32768,
    /** Enables or disables routing to the connector. */
    InheritLineRouting = 65536,
    /** Enables or disables near node padding to the connector. */
    ConnectToNearByNode = 131072,
    /** Enables or disables near port padding to the connector. */
    ConnectToNearByPort = 262144,
    /** Enables or disables Enables or disables near port and node padding to the connector. */
    ConnectToNearByElement = 393216,
    /**Enables or disables to inherit the value of segmentThumbShape */
    InheritSegmentThumbShape = 524288,
    /**Enables or disables to inherit the value of segmentThumbSize */
    InheritSegmentThumbSize = 1048576,
    /** Enables all constraints. */
    Default = 2043454
}
/**
 * Enables/Disables the annotation constraints
 * ReadOnly - Enables/Disables the ReadOnly Constraints
 * InheritReadOnly - Enables/Disables the InheritReadOnly Constraints
 * Select -Enables/Disable select support for the annotation
 * Drag - Enables/Disable drag support for the annotation
 * Resize - Enables/Disable resize support for the annotation
 * Rotate - Enables/Disable rotate support for the annotation
 * Interaction - Enables annotation to inherit the interaction option
 * None - Disable all annotation constraints
 *
 * @aspNumberEnum
 * @IgnoreSingular
 */
export declare enum AnnotationConstraints {
    /** Enables/Disables the ReadOnly Constraints */
    ReadOnly = 2,
    /** Enables/Disables the InheritReadOnly Constraints */
    InheritReadOnly = 4,
    /** Enables/Disable select support for the annotation */
    Select = 8,
    /** Enables/Disable drag support for the annotation */
    Drag = 16,
    /** Enables/Disable resize support for the annotation */
    Resize = 32,
    /** Enables/Disable rotate support for the annotation */
    Rotate = 64,
    /** Enables or disables tool tip for the annotation */
    Tooltip = 128,
    /** Enables annotation to inherit the interaction option */
    Interaction = 120,
    /** Disable all annotation Constraints */
    None = 0
}
/**
 * Enables/Disables certain features of node
 * None - Disable all node Constraints
 * Select - Enables node to be selected
 * Drag - Enables node to be Dragged
 * Rotate - Enables node to be Rotate
 * Shadow - Enables node to display shadow
 * PointerEvents - Enables node to provide pointer  option
 * Delete - Enables node to delete
 * InConnect - Enables node to provide in connect option
 * OutConnect - Enables node to provide out connect option
 * Individual - Enables node to provide individual resize option
 * Expandable - Enables node to provide Expandable option
 * AllowDrop - Enables node to provide allow to drop option
 * Inherit - Enables node to inherit the interaction option
 * ResizeNorthEast - Enable ResizeNorthEast of the node
 * ResizeEast - Enable ResizeEast of the node
 * ResizeSouthEast - Enable ResizeSouthEast of the node
 * ResizeSouth - Enable ResizeSouthWest of the node
 * ResizeSouthWest - Enable ResizeSouthWest of the node
 * ResizeSouth - Enable ResizeSouth of the node
 * ResizeSouthWest - Enable ResizeSouthWest of the node
 * ResizeWest - Enable ResizeWest of the node
 * ResizeNorth - Enable ResizeNorth of the node
 * Resize - Enables the Aspect ratio fo the node
 * AspectRatio - Enables the Aspect ratio fo the node
 * Tooltip - Enables or disables tool tip for the Nodes
 * InheritTooltip - Enables or disables tool tip for the Nodes
 * ReadOnly - Enables the  ReadOnly support for Annotation
 * Default - Enables all constraints
 *
 * @aspNumberEnum
 * @IgnoreSingular
 */
export declare enum NodeConstraints {
    /** Disable all node Constraints. */
    None = 0,
    /** Enables node to be selected. */
    Select = 2,
    /** Enables node to be Dragged. */
    Drag = 4,
    /** Enables node to be Rotate. */
    Rotate = 8,
    /** Enables node to display shadow. */
    Shadow = 16,
    /** Enables node to provide pointer  option */
    PointerEvents = 32,
    /** Enables node to delete */
    Delete = 64,
    /** Enables node to provide in connect option */
    InConnect = 128,
    /** Enables node to provide out connect option */
    OutConnect = 256,
    /** Enables node to provide individual resize option */
    Individual = 512,
    /** Enables node to provide Expandable option */
    Expandable = 1024,
    /** Enables node to provide allow to drop option */
    AllowDrop = 2048,
    /** Enables node to inherit the interaction option */
    Inherit = 78,
    /** Enable ResizeNorthEast of the node  */
    ResizeNorthEast = 4096,
    /** Enable ResizeEast of the node  */
    ResizeEast = 8192,
    /** Enable ResizeSouthEast of the node  */
    ResizeSouthEast = 16384,
    /** Enable ResizeSouth of the node  */
    ResizeSouth = 32768,
    /** Enable ResizeSouthWest of the node  */
    ResizeSouthWest = 65536,
    /** Enable ResizeWest of the node  */
    ResizeWest = 131072,
    /** Enable ResizeNorthWest of the node  */
    ResizeNorthWest = 262144,
    /** Enable ResizeNorth of the node  */
    ResizeNorth = 524288,
    /** Enable Resize of the node  */
    Resize = 1044480,
    /** Enables the Aspect ratio fo the node */
    AspectRatio = 1048576,
    /** Enables or disables tool tip for the Nodes */
    Tooltip = 2097152,
    /** Enables or disables tool tip for the Nodes */
    InheritTooltip = 4194304,
    /** Enables the  ReadOnly support for Annotation */
    ReadOnly = 8388608,
    /** hide all resize support for node */
    HideThumbs = 16777216,
    /** Enables or disables child in parent for the swimLane node */
    AllowMovingOutsideLane = 33554432,
    /** Enables all constraints */
    Default = 5240814
}
/** Enables/Disables The element actions
 * None - Diables all element actions are none
 * ElementIsPort - Enable element action is port
 * ElementIsGroup - Enable element action as Group
 *
 * @private
 */
export declare enum ElementAction {
    /** Disables all element actions are none  */
    None = 0,
    /** Enable the element action is Port  */
    ElementIsPort = 2,
    /** Enable the element action as Group  */
    ElementIsGroup = 4,
    /** Enable the element action if swimlaneHeader is rendered  */
    HorizontalLaneHeader = 8
}
/** Enables/Disables the handles of the selector
 * Rotate - Enable Rotate Thumb
 * ConnectorSource - Enable Connector source point
 * ConnectorTarget - Enable Connector target point
 * ResizeNorthEast - Enable ResizeNorthEast Resize
 * ResizeEast - Enable ResizeEast Resize
 * ResizeSouthEast - Enable ResizeSouthEast Resize
 * ResizeSouth - Enable ResizeSouth Resize
 * ResizeSouthWest - Enable ResizeSouthWest Resize
 * ResizeWest - Enable ResizeWest Resize
 * ResizeNorthWest - Enable ResizeNorthWest Resize
 * ResizeNorth - Enable ResizeNorth Resize
 * Default - Enables all constraints
 *
 * @private
 */
export declare enum ThumbsConstraints {
    /** Enable Rotate Thumb  */
    Rotate = 2,
    /** Enable Connector source point  */
    ConnectorSource = 4,
    /** Enable Connector target point  */
    ConnectorTarget = 8,
    /** Enable ResizeNorthEast Resize  */
    ResizeNorthEast = 16,
    /** Enable ResizeEast Resize  */
    ResizeEast = 32,
    /** Enable ResizeSouthEast Resize */
    ResizeSouthEast = 64,
    /** Enable ResizeSouth Resize */
    ResizeSouth = 128,
    /** Enable ResizeSouthWest Resize */
    ResizeSouthWest = 256,
    /** Enable ResizeWest Resize */
    ResizeWest = 512,
    /** Enable ResizeNorthWest Resize */
    ResizeNorthWest = 1024,
    /** Enable ResizeNorth Resize */
    ResizeNorth = 2048,
    /** Enables all constraints */
    Default = 4094
}
/**
 * Enables/Disables certain features of diagram
 * None - Disable DiagramConstraints constraints
 * Bridging - Enables/Disable Bridging support for connector
 * UndoRedo - Enables/Disable the Undo/Redo support
 * Tooltip - Enables/Disable Tooltip support
 * UserInteraction - Enables/Disable UserInteraction support for the diagram
 * ApiUpdate - Enables/Disable ApiUpdate support for the diagram
 * PageEditable - Enables/Disable PageEditable support for the diagram
 * Zoom - Enables/Disable Zoom support for the diagram
 * PanX - Enables/Disable PanX support for the diagram
 * PanY - Enables/Disable PanY support for the diagram
 * Pan - Enables/Disable Pan support the diagram
 * ZoomTextEdit - Enables/Disables zooming the text box while editing the text
 * Virtualization - Enables/Disable Virtualization support the diagram
 * LineRouting - Enables/ Disable the line routing
 * AvoidLineOverlapping - Enables/Disables the line overlapping resolution globally in the diagram
 * Default - Enables/Disable all constraints
 *
 * @aspNumberEnum
 * @IgnoreSingular
 */
export declare enum DiagramConstraints {
    /** Disable DiagramConstraints constraints */
    None = 1,
    /** Enables/Disable Bridging support for connector */
    Bridging = 2,
    /** Enables/Disable the Undo/Redo support */
    UndoRedo = 4,
    /** Enables/Disable Tooltip support */
    Tooltip = 8,
    /** Enables/Disable UserInteraction support for the diagram */
    UserInteraction = 16,
    /** Enables/Disable ApiUpdate support for the diagram */
    ApiUpdate = 32,
    /** Enables/Disable PageEditable support for the diagram */
    PageEditable = 48,
    /** Enables/Disable Zoom support for the diagram */
    Zoom = 64,
    /** Enables/Disable PanX support for the diagram */
    PanX = 128,
    /** Enables/Disable PanY support for the diagram */
    PanY = 256,
    /** Enables/Disable Pan support the diagram */
    Pan = 384,
    /** Enables/Disables zooming the text box while editing the text */
    ZoomTextEdit = 512,
    /** Enables/Disable Virtualization support the diagram */
    Virtualization = 1024,
    /** Enables/ Disable the line routing */
    LineRouting = 2048,
    /** Enables/Disables the line overlapping resolution globally in the diagram */
    AvoidLineOverlapping = 4096,
    /** Enables/Disable all constraints */
    Default = 500
}
/**
 * Activates the diagram tools
 * None - Enables/Disable single select support for the diagram
 * SingleSelect - Enables/Disable single select support for the diagram
 * MultipleSelect - Enables/Disable MultipleSelect select support for the diagram
 * ZoomPan - Enables/Disable ZoomPan support for the diagram
 * DrawOnce - Enables/Disable continuousDraw support for the diagram
 * ContinuousDraw - Enables/Disable continuousDraw support for the diagram
 * Default - Enables/Disable all constraints
 *
 * @aspNumberEnum
 * @IgnoreSingular
 */
export declare enum DiagramTools {
    /** Disable all constraints */
    None = 0,
    /** Enables/Disable single select support for the diagram */
    SingleSelect = 1,
    /** Enables/Disable MultipleSelect select support for the diagram */
    MultipleSelect = 2,
    /** Enables/Disable ZoomPan support for the diagram */
    ZoomPan = 4,
    /** Enables/Disable DrawOnce support for the diagram */
    DrawOnce = 8,
    /** Enables/Disable continuousDraw support for the diagram */
    ContinuousDraw = 16,
    /** Enables/Disable all constraints */
    Default = 3
}
/**
 * Defines the bridge direction
 * Top - Defines the direction of the bridge as Top
 * Bottom - Defines the direction of the bridge as Bottom
 * Left - Sets the bridge direction as left
 * Right - Sets the bridge direction as right
 */
export declare type BridgeDirection = 
/** Top - Defines the direction of the bridge as Top */
'Top' | 
/** Bottom - Defines the direction of the bridge as Bottom */
'Bottom' | 
/** Left - Sets the bridge direction as left */
'Left' | 
/** Right - Sets the bridge direction as right */
'Right';
/**
 * Defines the type of the gradient
 * Linear - Sets the type of the gradient as Linear
 * Radial - Sets the type of the gradient as Radial
 */
export declare type GradientType = 
/** None - Sets the type of the gradient as None */
'None' | 
/** Linear - Sets the type of the gradient as Linear */
'Linear' | 
/** Radial - Sets the type of the gradient as Radial */
'Radial';
/**
 * Defines the shape of a node
 * Path - Sets the type of the node as Path
 * Text - Sets the type of the node as Text
 * Image - Sets the type of the node as Image
 * Basic - Sets the type of the node as Basic
 * Flow - Sets the type of the node as Flow
 * Bpmn - Sets the type of the node as Bpmn
 * Native - Sets the type of the node as Native
 * HTML - Sets the type of the node as HTML
 */
export declare type Shapes = 
/** Basic - Sets the type of the node as Basic */
'Basic' | 
/** Path - Sets the type of the node as Path */
'Path' | 
/** Text - Sets the type of the node as Text */
'Text' | 
/** Image - Sets the type of the node as Image */
'Image' | 
/** Flow - Sets the type of the node as Flow */
'Flow' | 
/** Bpmn - Sets the type of the node as Bpmn */
'Bpmn' | 
/** Native - Sets the type of the node as Native */
'Native' | 
/** HTML - Sets the type of the node as HTML */
'HTML' | 
/** UMLActivity - Sets the type of the node as UMLActivity */
'UmlActivity' | 
/** UMLClassifier - Sets the type of the node as UMLClassifier */
'UmlClassifier' | 
/** SwimLane - Sets the type of the node as SwimLane */
'SwimLane';
/**
 * None - Scale value will be set as None for the image
 * Meet - Scale value Meet will be set for the image
 * Slice - Scale value Slice will be set for the image
 */
export declare type Scale = 
/** None - Scale value will be set as None for the image */
'None' | 
/** Meet - Scale value Meet will be set for the image */
'Meet' | 
/** Slice - Scale value Slice will be set for the image */
'Slice';
/**
 * None - Alignment value will be set as none
 * XMinYMin - smallest X value of the view port and  smallest Y value of the view port
 * XMidYMin - midpoint X value of the view port and  smallest Y value of the view port
 * XMaxYMin - maximum X value of the view port and  smallest Y value of the view port
 * XMinYMid - smallest X value of the view port and midpoint Y value of the view port
 * XMidYMid - midpoint X value of the view port and midpoint Y value of the view port
 * XMaxYMid - maximum X value of the view port and midpoint Y value of the view port
 * XMinYMax - smallest X value of the view port and maximum Y value of the view port
 * XMidYMax - midpoint X value of the view port and maximum Y value of the view port
 * XMaxYMax - maximum X value of the view port and maximum Y value of the view port
 */
export declare type ImageAlignment = 
/** None - Alignment value will be set as none */
'None' | 
/** XMinYMin - smallest X value of the view port and  smallest Y value of the view port */
'XMinYMin' | 
/** XMidYMin - midpoint X value of the view port and  smallest Y value of the view port */
'XMidYMin' | 
/** XMaxYMin - maximum X value of the view port and  smallest Y value of the view port */
'XMaxYMin' | 
/** XMinYMid - smallest X value of the view port and midpoint Y value of the view port */
'XMinYMid' | 
/** XMidYMid - midpoint X value of the view port and midpoint Y value of the view port */
'XMidYMid' | 
/** XMaxYMid - maximum X value of the view port and midpoint Y value of the view port */
'XMaxYMid' | 
/** XMinYMax - smallest X value of the view port and maximum Y value of the view port */
'XMinYMax' | 
/** XMidYMax - midpoint X value of the view port and maximum Y value of the view port */
'XMidYMax' | 
/** XMaxYMax - maximum X value of the view port and maximum Y value of the view port */
'XMaxYMax';
/**
 * Defines the type of the flow shape
 * Process - Sets the type of the flow shape as Process
 * Decision - Sets the type of the flow shape as Decision
 * Document - Sets the type of the flow shape as Document
 * PreDefinedProcess - Sets the type of the flow shape as PreDefinedProcess
 * Terminator - Sets the type of the flow shape as Terminator
 * PaperTap - Sets the type of the flow shape as PaperTap
 * DirectData - Sets the type of the flow shape as DirectData
 * SequentialData - Sets the type of the flow shape as SequentialData
 * MultiData - Sets the type of the flow shape as MultiData
 * Collate - Sets the type of the flow shape as Collate
 * SummingJunction - Sets the type of the flow shape as SummingJunction
 * Or - Sets the type of the flow shape as Or
 * InternalStorage - Sets the type of the flow shape as InternalStorage
 * Extract - Sets the type of the flow shape as Extract
 * ManualOperation - Sets the type of the flow shape as ManualOperation
 * Merge - Sets the type of the flow shape as Merge
 * OffPageReference - Sets the type of the flow shape as OffPageReference
 * SequentialAccessStorage - Sets the type of the flow shape as SequentialAccessStorage
 * Annotation - Sets the type of the flow shape as Annotation
 * Annotation2 - Sets the type of the flow shape as Annotation2
 * Data - Sets the type of the flow shape as Data
 * Card - Sets the type of the flow shape as Card
 * Delay - Sets the type of the flow shape as Delay
 * Preparation - Sets the type of the flow shape as Preparation
 * Display - Sets the type of the flow shape as Display
 * ManualInput - Sets the type of the flow shape as ManualInput
 * LoopLimit - Sets the type of the flow shape as LoopLimit
 * StoredData - Sets the type of the flow shape as StoredData
 */
export declare type FlowShapes = 
/** Terminator - Sets the type of the flow shape as Terminator */
'Terminator' | 
/** Process - Sets the type of the flow shape as Process */
'Process' | 
/** Decision - Sets the type of the flow shape as Decision */
'Decision' | 
/** Document - Sets the type of the flow shape as Document */
'Document' | 
/** PreDefinedProcess - Sets the type of the flow shape as PreDefinedProcess */
'PreDefinedProcess' | 
/** PaperTap - Sets the type of the flow shape as PaperTap */
'PaperTap' | 
/** DirectData - Sets the type of the flow shape as DirectData */
'DirectData' | 
/** SequentialData - Sets the type of the flow shape as SequentialData */
'SequentialData' | 
/** Sort - Sets the type of the flow shape as Sort */
'Sort' | 
/** MultiDocument - Sets the type of the flow shape as MultiDocument */
'MultiDocument' | 
/** Collate - Sets the type of the flow shape as Collate */
'Collate' | 
/** SummingJunction - Sets the type of the flow shape as SummingJunction */
'SummingJunction' | 
/** Or - Sets the type of the flow shape as Or */
'Or' | 
/** InternalStorage - Sets the type of the flow shape as InternalStorage */
'InternalStorage' | 
/** Extract - Sets the type of the flow shape as Extract */
'Extract' | 
/** ManualOperation - Sets the type of the flow shape as ManualOperation */
'ManualOperation' | 
/** Merge - Sets the type of the flow shape as Merge */
'Merge' | 
/** OffPageReference - Sets the type of the flow shape as OffPageReference */
'OffPageReference' | 
/** SequentialAccessStorage - Sets the type of the flow shape as SequentialAccessStorage */
'SequentialAccessStorage' | 
/** Annotation - Sets the type of the flow shape as Annotation */
'Annotation' | 
/** Annotation2 - Sets the type of the flow shape as Annotation2 */
'Annotation2' | 
/** Data - Sets the type of the flow shape as Data */
'Data' | 
/** Card - Sets the type of the flow shape as Card */
'Card' | 
/** Delay - Sets the type of the flow shape as Delay */
'Delay' | 
/** Preparation - Sets the type of the flow shape as Preparation */
'Preparation' | 
/** Display - Sets the type of the flow shape as Display */
'Display' | 
/** ManualInput - Sets the type of the flow shape as ManualInput */
'ManualInput' | 
/** LoopLimit - Sets the type of the flow shape as LoopLimit */
'LoopLimit' | 
/** StoredData - Sets the type of the flow shape as StoredData */
'StoredData';
/**
 * Defines the basic shapes
 * Rectangle - Sets the type of the basic shape as Rectangle
 * Ellipse - Sets the type of the basic shape as Ellipse
 * Hexagon - Sets the type of the basic shape as Hexagon
 * Parallelogram - Sets the type of the basic shape as Parallelogram
 * Triangle - Sets the type of the basic shape as Triangle
 * Plus - Sets the type of the basic shape as Plus
 * Star - Sets the type of the basic shape as Star
 * Pentagon - Sets the type of the basic shape as Pentagon
 * Heptagon - Sets the type of the basic shape as Heptagon
 * Octagon - Sets the type of the basic shape as Octagon
 * Trapezoid - Sets the type of the basic shape as Trapezoid
 * Decagon - Sets the type of the basic shape as Decagon
 * RightTriangle - Sets the type of the basic shape as RightTriangle
 * Cylinder - Sets the type of the basic shape as Cylinder
 * Diamond - Sets the type of the basic shape as Diamond
 */
export declare type BasicShapes = 
/** Rectangle - Sets the type of the basic shape as Rectangle */
'Rectangle' | 
/** Ellipse - Sets the type of the basic shape as Ellipse */
'Ellipse' | 
/** Hexagon - Sets the type of the basic shape as Hexagon */
'Hexagon' | 
/** Parallelogram - Sets the type of the basic shape as Parallelogram */
'Parallelogram' | 
/** Triangle - Sets the type of the basic shape as Triangle */
'Triangle' | 
/** Plus - Sets the type of the basic shape as Plus */
'Plus' | 
/** Star - Sets the type of the basic shape as Star */
'Star' | 
/** Pentagon - Sets the type of the basic shape as Pentagon */
'Pentagon' | 
/** Heptagon - Sets the type of the basic shape as Heptagon */
'Heptagon' | 
/** Octagon - Sets the type of the basic shape as Octagon */
'Octagon' | 
/** Trapezoid - Sets the type of the basic shape as Trapezoid */
'Trapezoid' | 
/** Decagon - Sets the type of the basic shape as Decagon */
'Decagon' | 
/** RightTriangle - Sets the type of the basic shape as RightTriangle */
'RightTriangle' | 
/** Cylinder - Sets the type of the basic shape as Cylinder */
'Cylinder' | 
/** Diamond - Sets the type of the basic shape as Diamond */
'Diamond' | 
/** Polygon - Sets the type of the basic shape as Polygon */
'Polygon';
/**
 * Defines the type of the Bpmn Shape
 * Event - Sets the type of the Bpmn Shape as Event
 * Gateway - Sets the type of the Bpmn Shape as Gateway
 * Message - Sets the type of the Bpmn Shape as Message
 * DataObject - Sets the type of the Bpmn Shape as DataObject
 * DataSource - Sets the type of the Bpmn Shape as DataSource
 * Activity - Sets the type of the Bpmn Shape as Activity
 * Group - Sets the type of the Bpmn Shape as Group
 * TextAnnotation - Represents the shape as Text Annotation
 */
export declare type BpmnShapes = 
/** Event - Sets the type of the Bpmn Shape as Event */
'Event' | 
/** Gateway - Sets the type of the Bpmn Shape as Gateway */
'Gateway' | 
/** Message - Sets the type of the Bpmn Shape as Message */
'Message' | 
/** DataObject - Sets the type of the Bpmn Shape as DataObject */
'DataObject' | 
/** DataSource - Sets the type of the Bpmn Shape as DataSource */
'DataSource' | 
/** Activity - Sets the type of the Bpmn Shape as Activity */
'Activity' | 
/** Group - Sets the type of the Bpmn Shape as Group */
'Group' | 
/** TextAnnotation - Represents the shape as Text Annotation */
'TextAnnotation';
/**
 * Defines the type of the UMLActivity Shape
 * Action - Sets the type of the UMLActivity Shape as Action
 * Decision - Sets the type of the UMLActivity Shape as Decision
 * MergeNode - Sets the type of the UMLActivity Shape as MergeNode
 * InitialNode - Sets the type of the UMLActivity Shape as InitialNode
 * FinalNode - Sets the type of the UMLActivity Shape as FinalNode
 * ForkNode - Sets the type of the UMLActivity Shape as ForkNode
 * JoinNode - Sets the type of the UMLActivity Shape as JoinNode
 * TimeEvent - Represents the UMLActivity shape as TimeEvent
 *
 * @IgnoreSingular
 */
export declare type UmlActivityShapes = 
/** Action - Sets the type of the UMLActivity Shape as Action */
'Action' | 
/** Decision - Sets the type of the UMLActivity Shape as Decision */
'Decision' | 
/** MergeNode - Sets the type of the UMLActivity Shape as MergeNode */
'MergeNode' | 
/** InitialNode - Sets the type of the UMLActivity Shape as InitialNode */
'InitialNode' | 
/** FinalNode - Sets the type of the UMLActivity Shape as FinalNode */
'FinalNode' | 
/** ForkNode - Sets the type of the UMLActivity Shape as ForkNode */
'ForkNode' | 
/** JoinNode - Sets the type of the UMLActivity Shape as JoinNode */
'JoinNode' | 
/** TimeEvent - Represents the shape as TimeEvent */
'TimeEvent' | 
/** AcceptingEvent - Sets the type of the UMLActivity Shape as AcceptingEvent */
'AcceptingEvent' | 
/** SendSignal - Sets the type of the UMLActivity Shape as SendSignal */
'SendSignal' | 
/** ReceiveSignal - Sets the type of the UMLActivity Shape as ReceiveSignal */
'ReceiveSignal' | 
/** StructuredNode - Sets the type of the UMLActivity Shape as StructuredNode */
'StructuredNode' | 
/** Note - Sets the type of the UMLActivity Shape as Note */
'Note';
/**
 * Defines the type of the UMLActivity flows
 * Object - Sets the type of the UMLActivity Flow as Object
 * Control - Sets the type of the UMLActivity Flow as Control
 * Exception - Sets the type of the UMLActivity Flow as Exception
 *
 * @IgnoreSingular
 */
export declare type UmlActivityFlows = 
/** Object - Sets the type of the UMLActivity Flow as Object */
'Object' | 
/** Control - Sets the type of the UMLActivity Flow as Control */
'Control' | 
/** Exception - Sets the type of the UMLActivity Flow as Exception */
'Exception';
/**
 * Defines the type of the Bpmn Events
 * Start - Sets the type of the Bpmn Event as Start
 * Intermediate - Sets the type of the Bpmn Event as Intermediate
 * End - Sets the type of the Bpmn Event as End
 * NonInterruptingStart - Sets the type of the Bpmn Event as NonInterruptingStart
 * NonInterruptingIntermediate - Sets the type of the Bpmn Event as NonInterruptingIntermediate
 * ThrowingIntermediate - Sets the type of the Bpmn Event as ThrowingIntermediate
 */
export declare type BpmnEvents = 
/** Sets the type of the Bpmn Event as Start */
'Start' | 
/** Sets the type of the Bpmn Event as Intermediate */
'Intermediate' | 
/** Sets the type of the Bpmn Event as End */
'End' | 
/** Sets the type of the Bpmn Event as NonInterruptingStart */
'NonInterruptingStart' | 
/** Sets the type of the Bpmn Event as NonInterruptingIntermediate */
'NonInterruptingIntermediate' | 
/** Sets the type of the Bpmn Event as ThrowingIntermediate */
'ThrowingIntermediate';
/**
 * Defines the type of the Bpmn Triggers
 * None - Sets the type of the trigger as None
 * Message - Sets the type of the trigger as Message
 * Timer - Sets the type of the trigger as Timer
 * Escalation - Sets the type of the trigger as Escalation
 * Link - Sets the type of the trigger as Link
 * Error - Sets the type of the trigger as Error
 * Compensation - Sets the type of the trigger as Compensation
 * Signal - Sets the type of the trigger as Signal
 * Multiple - Sets the type of the trigger as Multiple
 * Parallel - Sets the type of the trigger as Parallel
 * Cancel - Sets the type of the trigger as Cancel
 * Conditional - Sets the type of the trigger as Conditional
 * Terminate - Sets the type of the trigger as Terminate
 */
export declare type BpmnTriggers = 
/** None - Sets the type of the trigger as None */
'None' | 
/** Message - Sets the type of the trigger as Message */
'Message' | 
/** Timer - Sets the type of the trigger as Timer */
'Timer' | 
/** Escalation - Sets the type of the trigger as Escalation */
'Escalation' | 
/** Link - Sets the type of the trigger as Link */
'Link' | 
/** Error - Sets the type of the trigger as Error */
'Error' | 
/** Compensation - Sets the type of the trigger as Compensation */
'Compensation' | 
/** Signal - Sets the type of the trigger as Signal */
'Signal' | 
/** Multiple - Sets the type of the trigger as Multiple */
'Multiple' | 
/** Parallel - Sets the type of the trigger as Parallel */
'Parallel' | 
/** Cancel - Sets the type of the trigger as Cancel */
'Cancel' | 
/** Conditional - Sets the type of the trigger as Conditional */
'Conditional' | 
/** Terminate - Sets the type of the trigger as Terminate */
'Terminate';
/**
 * Defines the type of the Bpmn gateways
 * None - Sets the type of the gateway as None
 * Exclusive - Sets the type of the gateway as Exclusive
 * Inclusive - Sets the type of the gateway as Inclusive
 * Parallel - Sets the type of the gateway as Parallel
 * Complex - Sets the type of the gateway as Complex
 * EventBased - Sets the type of the gateway as EventBased
 * ExclusiveEventBased - Sets the type of the gateway as ExclusiveEventBased
 * ParallelEventBased - Sets the type of the gateway as ParallelEventBased
 */
export declare type BpmnGateways = 
/** None - Sets the type of the gateway as None */
'None' | 
/** Exclusive - Sets the type of the gateway as Exclusive */
'Exclusive' | 
/** Inclusive - Sets the type of the gateway as Inclusive */
'Inclusive' | 
/** Parallel - Sets the type of the gateway as Parallel */
'Parallel' | 
/** Complex - Sets the type of the gateway as Complex */
'Complex' | 
/** EventBased - Sets the type of the gateway as EventBased */
'EventBased' | 
/** ExclusiveEventBased - Sets the type of the gateway as ExclusiveEventBased */
'ExclusiveEventBased' | 
/** ParallelEventBased - Sets the type of the gateway as ParallelEventBased */
'ParallelEventBased';
/**
 * Defines the type of the Bpmn Data Objects
 * None - Sets the type of the data object as None
 * Input - Sets the type of the data object as Input
 * Output - Sets the type of the data object as Output
 */
export declare type BpmnDataObjects = 
/** None - Sets the type of the data object as None */
'None' | 
/** Input - Sets the type of the data object as Input */
'Input' | 
/** Output - Sets the type of the data object as Output */
'Output';
/**
 * Defines the type of the Bpmn Activity
 * None - Sets the type of the Bpmn Activity as None
 * Task - Sets the type of the Bpmn Activity as Task
 * SubProcess - Sets the type of the Bpmn Activity as SubProcess
 */
export declare type BpmnActivities = 
/** Task - Sets the type of the Bpmn Activity as Task */
'Task' | 
/** None - Sets the type of the Bpmn Activity as None */
'None' | 
/** SubProcess - Sets the type of the Bpmn Activity as SubProcess */
'SubProcess';
/**
 * Defines the type of the Bpmn Loops
 * None - Sets the type of the Bpmn loop as None
 * Standard - Sets the type of the Bpmn loop as Standard
 * ParallelMultiInstance - Sets the type of the Bpmn loop as ParallelMultiInstance
 * SequenceMultiInstance - Sets the type of the Bpmn loop as SequenceMultiInstance
 */
export declare type BpmnLoops = 
/** None - Sets the type of the Bpmn loop as None */
'None' | 
/** Standard - Sets the type of the Bpmn loop as Standard */
'Standard' | 
/** ParallelMultiInstance - Sets the type of the Bpmn loop as ParallelMultiInstance */
'ParallelMultiInstance' | 
/** SequenceMultiInstance - Sets the type of the Bpmn loop as SequenceMultiInstance */
'SequenceMultiInstance';
/**
 * Defines the type of the Bpmn Tasks
 * None - Sets the type of the Bpmn Tasks as None
 * Service - Sets the type of the Bpmn Tasks as Service
 * Receive - Sets the type of the Bpmn Tasks as Receive
 * Send - Sets the type of the Bpmn Tasks as Send
 * InstantiatingReceive - Sets the type of the Bpmn Tasks as InstantiatingReceive
 * Manual - Sets the type of the Bpmn Tasks as Manual
 * BusinessRule - Sets the type of the Bpmn Tasks as BusinessRule
 * User - Sets the type of the Bpmn Tasks as User
 * Script - Sets the type of the Bpmn Tasks as Script
 */
export declare type BpmnTasks = 
/** None - Sets the type of the Bpmn Tasks as None */
'None' | 
/** Service - Sets the type of the Bpmn Tasks as Service */
'Service' | 
/** Receive - Sets the type of the Bpmn Tasks as Receive */
'Receive' | 
/** Send - Sets the type of the Bpmn Tasks as Send */
'Send' | 
/** InstantiatingReceive - Sets the type of the Bpmn Tasks as InstantiatingReceive */
'InstantiatingReceive' | 
/** Manual - Sets the type of the Bpmn Tasks as Manual */
'Manual' | 
/** BusinessRule - Sets the type of the Bpmn Tasks as BusinessRule */
'BusinessRule' | 
/** User - Sets the type of the Bpmn Tasks as User */
'User' | 
/** Script - Sets the type of the Bpmn Tasks as Script */
'Script';
/**
 * Defines the type of the Bpmn Subprocess
 * None - Sets the type of the Sub process as None
 * Transaction - Sets the type of the Sub process as Transaction
 * Event - Sets the type of the Sub process as Event
 */
export declare type BpmnSubProcessTypes = 
/** None - Sets the type of the Sub process as None */
'None' | 
/** Transaction - Sets the type of the Sub process as Transaction */
'Transaction' | 
/** Event - Sets the type of the Sub process as Event */
'Event';
/**
 * Defines the type of the Bpmn boundary
 * Default - Sets the type of the boundary as Default
 * Call - Sets the type of the boundary as Call
 * Event - Sets the type of the boundary as Event
 */
export declare type BpmnBoundary = 
/** Default - Sets the type of the boundary as Default */
'Default' | 
/** Call - Sets the type of the boundary as Call */
'Call' | 
/** Event - Sets the type of the boundary as Event */
'Event';
/**
 * Defines the connection shapes
 * Bpmn - Sets the type of the connection shape as Bpmn
 */
export declare type ConnectionShapes = 
/** None - Sets the type of the connection shape as None */
'None' | 
/** Bpmn - Sets the type of the connection shape as Bpmn */
'Bpmn' | 
/** UMLActivity - Sets the type of the connection shape as UMLActivity */
'UmlActivity' | 
/** UMLClassifier - Sets the type of the connection shape as UMLClassifier */
'UmlClassifier';
/**
 * Defines the type of the Bpmn flows
 * Sequence - Sets the type of the Bpmn Flow as Sequence
 * Association - Sets the type of the Bpmn Flow as Association
 * Message - Sets the type of the Bpmn Flow as Message
 */
export declare type BpmnFlows = 
/** Sequence - Sets the type of the Bpmn Flow as Sequence */
'Sequence' | 
/** Association - Sets the type of the Bpmn Flow as Association */
'Association' | 
/** Message - Sets the type of the Bpmn Flow as Message */
'Message';
/**
 * Defines the type of the Bpmn Association Flows
 * Default - Sets the type of Association flow as Default
 * Directional - Sets the type of Association flow as Directional
 * BiDirectional - Sets the type of Association flow as BiDirectional
 */
export declare type BpmnAssociationFlows = 
/** Default - Sets the type of Association flow as Default */
'Default' | 
/** Directional - Sets the type of Association flow as Directional */
'Directional' | 
/** BiDirectional - Sets the type of Association flow as BiDirectional */
'BiDirectional';
/**
 * Defines the type of the Bpmn Message Flows
 * Default - Sets the type of the Message flow as Default
 * InitiatingMessage - Sets the type of the Message flow as InitiatingMessage
 * NonInitiatingMessage - Sets the type of the Message flow as NonInitiatingMessage
 */
export declare type BpmnMessageFlows = 
/** Default - Sets the type of the Message flow as Default */
'Default' | 
/** InitiatingMessage - Sets the type of the Message flow as InitiatingMessage */
'InitiatingMessage' | 
/** NonInitiatingMessage - Sets the type of the Message flow as NonInitiatingMessage */
'NonInitiatingMessage';
/**
 * Defines the type of the Bpmn Sequence flows
 * Default - Sets the type of the sequence flow as Default
 * Normal - Sets the type of the sequence flow as Normal
 * Conditional - Sets the type of the sequence flow as Conditional
 */
export declare type BpmnSequenceFlows = 
/** Normal - Sets the type of the sequence flow as Normal */
'Normal' | 
/** Default - Sets the type of the sequence flow as Default */
'Default' | 
/** Conditional - Sets the type of the sequence flow as Conditional */
'Conditional';
/**
 * Defines the segment type of the connector
 * Straight - Sets the segment type as Straight
 * Orthogonal - Sets the segment type as Orthogonal
 * Polyline - Sets the segment type as Polyline
 * Bezier - Sets the segment type as Bezier
 */
export declare type Segments = 
/** Straight - Sets the segment type as Straight */
'Straight' | 
/** Orthogonal - Sets the segment type as Orthogonal */
'Orthogonal' | 
/** Polyline - Sets the segment type as Polyline */
'Polyline' | 
/** Bezier - Sets the segment type as Bezier */
'Bezier' | 
/** FreeHand - Sets the segment type as FreeHand */
'Freehand';
/**
 * Defines the decorator shape of the connector
 * None - Sets the decorator shape as None
 * Arrow - Sets the decorator shape as Arrow
 * Diamond - Sets the decorator shape as Diamond
 * Path - Sets the decorator shape as Path
 * OpenArrow - Sets the decorator shape as OpenArrow
 * Circle - Sets the decorator shape as Circle
 * Square - Sets the decorator shape as Square
 * Fletch - Sets the decorator shape as Fletch
 * OpenFetch - Sets the decorator shape as OpenFetch
 * IndentedArrow - Sets the decorator shape as Indented Arrow
 * OutdentedArrow - Sets the decorator shape as Outdented Arrow
 * DoubleArrow - Sets the decorator shape as DoubleArrow
 */
export declare type DecoratorShapes = 
/** Arrow - Sets the decorator shape as Arrow */
'Arrow' | 
/** None - Sets the decorator shape as None */
'None' | 
/** Diamond - Sets the decorator shape as Diamond */
'Diamond' | 
/** OpenArrow - Sets the decorator shape as OpenArrow */
'OpenArrow' | 
/** Circle - Sets the decorator shape as Circle */
'Circle' | 
/** Square - Sets the decorator shape as Square */
'Square' | 
/** Fletch - Sets the decorator shape as Fletch */
'Fletch' | 
/** OpenFetch - Sets the decorator shape as OpenFetch */
'OpenFetch' | 
/** IndentedArrow - Sets the decorator shape as Indented Arrow */
'IndentedArrow' | 
/** OutdentedArrow - Sets the decorator shape as Outdented Arrow */
'OutdentedArrow' | 
/** DoubleArrow - Sets the decorator shape as DoubleArrow */
'DoubleArrow' | 
/** Custom - Sets the decorator shape as Custom */
'Custom';
/**
 * Defines the segmentThumb shape of the connector
 * Rhombus - Sets the segmentThumb shape as Rhombus
 * Square - Sets the segmentThumb shape as Square
 * Rectangle - Sets the segmentThumb shape as Rectangle
 * Ellipse - Sets the segmentThumb shape as Ellipse
 * Arrow - Sets the segmentThumb shape as Arrow
 * Diamond - Sets the segmentThumb shape as Diamond
 * OpenArrow - Sets the segmentThumb shape as OpenArrow
 * Circle - Sets the segmentThumb shape as Circle
 * Fletch - Sets the segmentThumb shape as Fletch
 * OpenFetch - Sets the segmentThumb shape as OpenFetch
 * IndentedArrow - Sets the segmentThumb shape as Indented Arrow
 * OutdentedArrow - Sets the segmentThumb shape as Outdented Arrow
 * DoubleArrow - Sets the segmentThumb shape as DoubleArrow
 */
export declare type SegmentThumbShapes = 
/** Rhombus - Sets the segmentThumb shape as Rhombus */
'Rhombus' | 
/** Square - Sets the segmentThumb shape as Square */
'Square' | 
/** Rectangle - Sets the segmentThumb shape as Rectangle */
'Rectangle' | 
/** Ellipse - Sets the segmentThumb shape as Ellipse */
'Ellipse' | 
/** Arrow - Sets the segmentThumb shape as Arrow */
'Arrow' | 
/** Diamond - Sets the segmentThumb shape as Diamond */
'Diamond' | 
/** OpenArrow - Sets the segmentThumb shape as OpenArrow */
'OpenArrow' | 
/** Circle - Sets the segmentThumb shape as Circle */
'Circle' | 
/** Fletch - Sets the segmentThumb shape as Fletch */
'Fletch' | 
/** OpenFetch - Sets the segmentThumb shape as OpenFetch */
'OpenFetch' | 
/** IndentedArrow - Sets the segmentThumb shape as Indented Arrow */
'IndentedArrow' | 
/** OutdentedArrow - Sets the segmentThumb shape as Outdented Arrow */
'OutdentedArrow' | 
/** DoubleArrow - Sets the segmentThumb shape as DoubleArrow */
'DoubleArrow';
/**
 * Defines the shape of the ports
 * X - Sets the decorator shape as X
 * Circle - Sets the decorator shape as Circle
 * Square - Sets the decorator shape as Square
 * Custom - Sets the decorator shape as Custom
 */
export declare type PortShapes = 
/** X - Sets the decorator shape as X */
'X' | 
/** Circle - Sets the decorator shape as Circle */
'Circle' | 
/** Square - Sets the decorator shape as Square */
'Square' | 
/** Custom - Sets the decorator shape as Custom */
'Custom';
/**
 * Defines the unit mode
 * Absolute - Sets the unit mode type as Absolute
 * Fraction - Sets the unit mode type as Fraction
 */
export declare type UnitMode = 
/** Absolute - Sets the unit mode type as Absolute */
'Absolute' | 
/** Fraction - Sets the unit mode type as Fraction */
'Fraction';
/**
 * Defines the property change entry type
 * PositionChanged - Sets the entry type as PositionChanged
 * Align - Sets the entry type as Align
 * Distribute - Sets the entry type as Distribute
 * SizeChanged - Sets the entry type as SizeChanged
 * Sizing - Sets the entry type as Sizing
 * RotationChanged - Sets the entry type as RotationChanged
 * ConnectionChanged - Sets the entry type as ConnectionChanged
 * PropertyChanged - Sets the entry type as PropertyChanged
 * CollectionChanged - Sets the entry type as CollectionChanged
 * StartGroup - Sets the entry type as StartGroup
 * EndGroup - Sets the entry type as EndGroup
 * Group - Sets the entry type as Group
 * UnGroup - Sets the entry type as UnGroup
 * SegmentChanged - Sets the entry type as SegmentChanged
 * LabelCollectionChanged - Sets the entry type as LabelCollectionChanged
 * PortCollectionChanged - Sets the entry type as PortCollectionChanged
 */
export declare type EntryType = 
/** PositionChanged - Sets the entry type as PositionChanged */
'PositionChanged' | 
/** Align - Sets the entry type as Align */
'Align' | 
/** Distribute - Sets the entry type as Distribute */
'Distribute' | 
/** SizeChanged - Sets the entry type as SizeChanged */
'SizeChanged' | 
/** Sizing - Sets the entry type as Sizing */
'Sizing' | 
/** RotationChanged - Sets the entry type as RotationChanged */
'RotationChanged' | 
/** ConnectionChanged - Sets the entry type as ConnectionChanged */
'ConnectionChanged' | 
/** PropertyChanged - Sets the entry type as PropertyChanged */
'PropertyChanged' | 
/** CollectionChanged - Sets the entry type as CollectionChanged */
'CollectionChanged' | 
/** StartGroup - Sets the entry type as StartGroup */
'StartGroup' | 
/** EndGroup - Sets the entry type as EndGroup */
'EndGroup' | 
/** Group - Sets the entry type as Group */
'Group' | 
/** UnGroup - Sets the entry type as UnGroup */
'UnGroup' | 
/** SegmentChanged - Sets the entry type as SegmentChanged */
'SegmentChanged' | 
/** LabelCollectionChanged - Sets the entry type as LabelCollectionChanged */
'LabelCollectionChanged' | 
/** PortCollectionChanged - Sets the entry type as PortCollectionChanged */
'PortCollectionChanged' | 
/** PortPositionChanged - Sets the entry type as PortPositionChanged */
'PortPositionChanged' | 
/** AnnotationPropertyChanged - Sets the entry type as AnnotationPropertyChanged */
'AnnotationPropertyChanged' | 
/** ChildCollectionChanged - Sets the entry type as ChildCollectionChanged used for add and remove a child collection in a container */
'ChildCollectionChanged' | 
/** StackNodeChanged - Sets the entry type as StackNodePositionChanged */
'StackChildPositionChanged' | 
/** ColumnWidthChanged - Sets the entry type as ColumnWidthChanged */
'ColumnWidthChanged' | 
/** RowHeightChanged - Sets the entry type as RowHeightChanged */
'RowHeightChanged' | 
/** LanePositionChanged - Sets the entry type as LanePositionChanged */
'LanePositionChanged' | 
/** PhaseCollectionChanged - Sets the entry type as PhaseCollectionChanged */
'PhaseCollectionChanged' | 
/** LaneCollectionChanged - Sets the entry type as LaneCollectionChanged */
'LaneCollectionChanged' | 
/** SendForward - Sets the entry type as sendForward */
'SendForward' | 
/** SendBackward - Sets the entry type as sendBackward */
'SendBackward' | 
/** BringToFront - Sets the entry type as bringToFront */
'BringToFront' | 
/** SendToBack - Sets the entry type as sendToBack */
'SendToBack' | 
/** AddChildToGroupNode - Sets the entry type as  AddChildToGroupNode */
'AddChildToGroupNode' | 
/** RemoveChildFromGroupNode - Sets the entry type as  RemoveChildFromGroupNode */
'RemoveChildFromGroupNode' | 
/** ExtrenalEntry - Sets the entry type as ExtrenalEntry */
'ExternalEntry';
/**
 * Defines the entry category type
 * Internal - Sets the entry category type as Internal
 * External - Sets the entry category type as External
 */
export declare type EntryCategory = 
/** Internal - Sets the entry category type as Internal */
'Internal' | 
/** External - Sets the entry category type as External */
'External';
/**
 * Defines the entry change type
 * Insert - Sets the entry change type as Insert
 * Remove - Sets the entry change type as Remove
 */
export declare type EntryChangeType = 
/** Insert - Sets the entry change type as Insert */
'Insert' | 
/** Remove - Sets the entry change type as Remove */
'Remove';
/**
 * Defines the container/canvas transform
 * Self - Sets the transform type as Self
 * Parent - Sets the transform type as Parent
 */
export declare enum Transform {
    /** Self - Sets the transform type as Self */
    Self = 1,
    /** Parent - Sets the transform type as Parent */
    Parent = 2
}
/**
 * Defines the nudging direction
 * Left - Nudge the object in the left direction
 * Right - Nudge the object in the right direction
 * Up - Nudge the object in the up direction
 * Down - Nudge the object in the down direction
 */
export declare type NudgeDirection = 
/** Left - Nudge the object in the left direction */
'Left' | 
/** Right - Nudge the object in the right direction */
'Right' | 
/** Up - Nudge the object in the up direction */
'Up' | 
/** Down - Nudge the object in the down direction */
'Down';
/**
 * Defines the diagrams stretch
 * None - Sets the stretch type for diagram as None
 * Stretch - Sets the stretch type for diagram as Stretch
 * Meet - Sets the stretch type for diagram as Meet
 * Slice - Sets the stretch type for diagram as Slice
 */
export declare type Stretch = 
/** None - Sets the stretch type for diagram as None */
'None' | 
/** Stretch - Sets the stretch type for diagram as Stretch */
'Stretch' | 
/** Meet - Sets the stretch type for diagram as Meet */
'Meet' | 
/** Slice - Sets the stretch type for diagram as Slice */
'Slice';
/**
 * Defines the BoundaryConstraints for the diagram
 * Infinity - Allow the interactions to take place at the infinite height and width
 * Diagram - Allow the interactions to take place around the diagram height and width
 * Page - Allow the interactions to take place around the page height and width
 */
export declare type BoundaryConstraints = 
/** Infinity - Allow the interactions to take place at the infinite height and width */
'Infinity' | 
/** Diagram - Allow the interactions to take place around the diagram height and width */
'Diagram' | 
/** Page - Allow the interactions to take place around the page height and width */
'Page';
/**
 * Defines the rendering mode for diagram
 * Canvas - Sets the rendering mode type as Canvas
 * Svg - Sets the rendering mode type as Svg
 */
export declare enum RenderMode {
    /** Canvas - Sets the rendering mode type as Canvas */
    Canvas = 0,
    /** Svg - Sets the rendering mode type as Svg */
    Svg = 1
}
/**
 * Defines the objects direction
 * Left - Sets the direction type as Left
 * Right - Sets the direction type as Right
 * Top - Sets the direction type as Top
 * Bottom - Sets the direction type as Bottom
 */
export declare type Direction = 
/** Left - Sets the direction type as Left */
'Left' | 
/** Right - Sets the direction type as Right */
'Right' | 
/** Top - Sets the direction type as Top */
'Top' | 
/** Bottom - Sets the direction type as Bottom */
'Bottom';
/**
 * Defines the scrollable region of diagram
 * Diagram - Enables scrolling to view the diagram content
 * Infinity - Diagram will be extended, when we try to scroll the diagram
 */
export declare type ScrollLimit = 
/** Diagram - Enables scrolling to view the diagram content */
'Diagram' | 
/** Infinity - Diagram will be extended, when we try to scroll the diagram */
'Infinity' | 
/** Limited - Diagram scrolling will be limited */
'Limited';
/**
 * Sets a combination of key modifiers, on recognition of which the command will be executed.They are
 * * None - no modifiers are pressed
 * * Control - ctrl key
 * * Meta - meta key im mac
 * * Alt - alt key
 * * Shift - shift key
 *
 * @aspNumberEnum
 * @IgnoreSingular
 */
export declare enum KeyModifiers {
    /** No modifiers are pressed */
    None = 0,
    /** The CTRL key */
    Control = 1,
    /** The Meta key pressed in Mac */
    Meta = 1,
    /** The ALT key */
    Alt = 2,
    /** The Shift key */
    Shift = 4
}
/**
 * Sets the key value, on recognition of which the command will be executed. They are
 * * none - no key
 * * Number0 = The 0 key
 * * Number1 = The 1 key
 * * Number2 = The 2 key
 * * Number3 = The 3 key
 * * Number4 = The 4 key
 * * Number5 = The 5 key
 * * Number6 = The 6 key
 * * Number7 = The 7 key
 * * Number8 = The 8 key
 * * Number9 = The 9 key
 * * Number0 = The 0 key
 * * BackSpace = The BackSpace key
 * * F1 = The f1 key
 * * F2 = The f2 key
 * * F3 = The f3 key
 * * F4 = The f4 key
 * * F5 = The f5 key
 * * F6 = The f6 key
 * * F7 = The f7 key
 * * F8 = The f8 key
 * * F9 = The f9 key
 * * F10 = The f10 key
 * * F11 = The f11 key
 * * F12 = The f12 key
 * * A = The a key
 * * B = The b key
 * * C = The c key
 * * D = The d key
 * * E = The e key
 * * F = The f key
 * * G = The g key
 * * H = The h key
 * * I = The i key
 * * J = The j key
 * * K = The k key
 * * L = The l key
 * * M = The m key
 * * N = The n key
 * * O = The o key
 * * P = The p key
 * * Q = The q key
 * * R = The r key
 * * S = The s key
 * * T = The t key
 * * U = The u key
 * * V = The v key
 * * W = The w key
 * * X = The x key
 * * Y = The y key
 * * Z = The z key
 * * Left = The left key
 * * Right = The right key
 * * Top = The top key
 * * Bottom = The bottom key
 * * Escape = The Escape key
 * * Tab = The tab key
 * * Delete = The delete key
 * * Enter = The enter key
 * * The Space key
 * * The page up key
 * * The page down key
 * * The end key
 * * The home key
 * * The Minus
 * * The Plus
 * * The Star
 * * The Open Square Bracket
 * * The close Square Bracket
 *
 * @aspNumberEnum
 * @IgnoreSingular
 */
export declare enum Keys {
    /** No key pressed */
    None,
    /** The 0 key */
    Number0 = 0,
    /** The 1 key */
    Number1 = 1,
    /** The 2 key */
    Number2 = 2,
    /** The 3 key */
    Number3 = 3,
    /** The 4 key */
    Number4 = 4,
    /** The 5 key */
    Number5 = 5,
    /** The 6 key */
    Number6 = 6,
    /** The 7 key */
    Number7 = 7,
    /** The 8 key */
    Number8 = 8,
    /** The 9 key */
    Number9 = 9,
    /** The A key */
    A = 65,
    /** The B key */
    B = 66,
    /** The C key */
    C = 67,
    /** The D key */
    D = 68,
    /** The E key */
    E = 69,
    /** The F key */
    F = 70,
    /** The G key */
    G = 71,
    /** The H key */
    H = 72,
    /** The I key */
    I = 73,
    /** The J key */
    J = 74,
    /** The K key */
    K = 75,
    /** The L key */
    L = 76,
    /** The M key */
    M = 77,
    /** The N key */
    N = 78,
    /** The O key */
    O = 79,
    /** The P key */
    P = 80,
    /** The Q key */
    Q = 81,
    /** The R key */
    R = 82,
    /** The S key */
    S = 83,
    /** The T key */
    T = 84,
    /** The U key */
    U = 85,
    /** The V key */
    V = 86,
    /** The W key */
    W = 87,
    /** The X key */
    X = 88,
    /** The Y key */
    Y = 89,
    /** The Z key */
    Z = 90,
    /** The left arrow key */
    Left = 37,
    /** The up arrow key */
    Up = 38,
    /** The right arrow key */
    Right = 39,
    /** The down arrow key */
    Down = 40,
    /** The Escape key */
    Escape = 27,
    /** The Space key */
    Space = 32,
    /** The page up key */
    PageUp = 33,
    /** The Space key */
    PageDown = 34,
    /** The Space key */
    End = 35,
    /** The Space key */
    Home = 36,
    /** The delete key */
    Delete = 46,
    /** The tab key */
    Tab = 9,
    /** The enter key */
    Enter = 13,
    /** The BackSpace key */
    BackSpace = 8,
    /** The F1 key */
    F1 = 112,
    /** The F2 key */
    F2 = 113,
    /** The F3 key */
    F3 = 114,
    /** The F4 key */
    F4 = 115,
    /** The F5 key */
    F5 = 116,
    /** The F6 key */
    F6 = 117,
    /** The F7 key */
    F7 = 118,
    /** The F8 key */
    F8 = 119,
    /** The F9 key */
    F9 = 120,
    /** The F10 key */
    F10 = 121,
    /** The F111 key */
    F11 = 122,
    /** The F12 key */
    F12 = 123,
    /** The Star */
    Star = 56,
    /** The Plus */
    Plus = 187,
    /** The Minus */
    Minus = 189,
    /** The Open Square bracket */
    BracketLeft = 219,
    /** The close Square bracket */
    BracketRight = 221
}
/**
 * Enables/Disables certain actions of diagram
 * * Render - Indicates the diagram is in render state.
 * * PublicMethod - Indicates the diagram public method is in action.
 * * ToolAction - Indicates the diagram Tool is in action.
 * * UndoRedo - Indicates the diagram undo/redo is in action.
 * * TextEdit - Indicates the text editing is in progress.
 * * Group - Indicates the group is in progress.
 * * Clear - Indicates diagram have clear all.
 * * PreventClearSelection - prevents diagram from clear selection
 */
export declare enum DiagramAction {
    /** Indicates the diagram is in render state.r */
    Render = 2,
    /** Indicates the diagram public method is in action. */
    PublicMethod = 4,
    /** Indicates the diagram Tool is in action. */
    ToolAction = 8,
    /** Indicates the diagram undo/redo is in action. */
    UndoRedo = 16,
    /** Indicates the text editing is in progress. */
    TextEdit = 32,
    /** Indicates the group is in progress. */
    Group = 64,
    /** Indicates diagram have clear all. */
    Clear = 128,
    /** prevents diagram from clear selection. */
    PreventClearSelection = 256,
    /** Indicates whether drag or rotate tool has been activated */
    Interactions = 512,
    /** Use to prevent the history during some action in diagram */
    PreventHistory = 1024,
    /** Use to prevent the icon while expand a node in diagram */
    PreventIconsUpdate = 2048,
    /** Use to prevent the collection change event while dragging lane from palette and over it in diagram */
    PreventCollectionChangeOnDragOver = 4096,
    /** Use to prevent the z order on dragging the diagram elements */
    PreventZIndexOnDragging = 8192,
    /** Indicates whether group dragging has been activated */
    isGroupDragging = 16384,
    /** Indicates whether drag is initiated by mouse  */
    DragUsingMouse = 32768,
    /** Indicates whether decorator property is changed or not */
    DecoratorPropertyChange = 65536,
    /** Avoid dropping of child nodes into the swim lane */
    PreventLaneContainerUpdate = 131072
}
/** @private */
export declare type DiagramHistoryAction = 'AddNodeToLane';
/**
 * Defines the Selector type to be drawn
 * None - Draws Normal selector with resize handles
 * Symbol - Draws only the rectangle for the selector
 */
export declare enum RendererAction {
    /** None - Draws Normal selector with resize handles */
    None = 2,
    /** DrawSelectorBorder - Draws only the Border for the selector */
    DrawSelectorBorder = 4,
    /** PreventRenderSelector - Avoid the render of selector during interaction */
    PreventRenderSelector = 8
}
export declare enum RealAction {
    None = 0,
    PreventDrag = 2,
    PreventScale = 4,
    PreventDataInit = 8,
    /** Indicates when the diagram is scrolled horizontal using scroll bar */
    hScrollbarMoved = 16,
    /** Indicates when the diagram is scrolled vertical using scroll bar */
    vScrollbarMoved = 32,
    /** Indicates whether animation happens or not  */
    AnimationClick = 64,
    /** Enable the group action */
    EnableGroupAction = 128,
    /** Indicate action in Progress */
    PanInProgress = 256,
    /** Indicate overview action  */
    OverViewAction = 512
}
/** @private */
export declare enum ScrollActions {
    None = 0,
    /** Indicates when the scroll properties are changed using property change */
    PropertyChange = 1024,
    /** Indicates when the scroll properties are changed using interaction */
    Interaction = 2048
}
/** @private */
export declare enum NoOfSegments {
    Zero = 0,
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5
}
/** @private */
export declare type SourceTypes = 'HierarchicalData' | 'MindMap';
/**
 * Defines the relative mode of the tooltip
 * Object - sets the tooltip position relative to the node
 * Mouse - sets the tooltip position relative to the mouse
 */
export declare type TooltipRelativeMode = 
/** Object - sets the tooltip position relative to the node */
'Object' | 
/** Mouse - sets the tooltip position relative to the mouse */
'Mouse';
/**
 * Collections of icon content shapes.
 * None
 * Minus - sets the icon shape as minus
 * Plus - sets the icon shape as Plus
 * ArrowUp - sets the icon shape as ArrowUp
 * ArrowDown - sets the icon shape as ArrowDown
 * Template - sets the icon shape based on  the given  custom template
 * Path - sets the icon shape based on the given  custom Path
 */
export declare type IconShapes = 
/** None - sets the icon shape as None */
'None' | 
/** Minus - sets the icon shape as minus */
'Minus' | 
/** Plus - sets the icon shape as Plus */
'Plus' | 
/** ArrowUp - sets the icon shape as ArrowUp */
'ArrowUp' | 
/** ArrowDown - sets the icon shape as ArrowDown */
'ArrowDown' | 
/** Template - sets the icon shape based on  the given  custom template */
'Template' | 
/** Path - sets the icon shape based on the given  custom Path */
'Path';
/**
 * Defines the collection of sub tree orientations in an organizational chart
 * Vertical - Aligns the child nodes in vertical manner
 * Horizontal - Aligns the child nodes in horizontal manner
 */
export declare type SubTreeOrientation = 
/** Horizontal - Aligns the child nodes in horizontal manner */
'Horizontal' | 
/** Vertical - Aligns the child nodes in vertical manner */
'Vertical';
/**
 * Defines the collection of sub tree alignments in an organizational chart
 * Left - Aligns the child nodes at the left of the parent in a horizontal/vertical sub tree
 * Right - Aligns the child nodes at the right of the parent in a horizontal/vertical sub tree
 * Center - Aligns the child nodes at the center of the parent in a horizontal sub tree
 * Alternate - Aligns the child nodes at both left and right sides of the parent in a vertical sub tree
 * Balanced - Aligns the child nodes in multiple rows to balance the width and height of the horizontal sub tree
 */
export declare type SubTreeAlignments = 
/** Left - Aligns the child nodes at the left of the parent in a horizontal/vertical sub tree */
'Left' | 
/** Right - Aligns the child nodes at the right of the parent in a horizontal/vertical sub tree */
'Right' | 
/** Center - Aligns the child nodes at the center of the parent in a horizontal sub tree */
'Center' | 
/** Alternate - Aligns the child nodes at both left and right sides of the parent in a vertical sub tree */
'Alternate' | 
/** Balanced - Aligns the child nodes in multiple rows to balance the width and height of the horizontal sub tree */
'Balanced';
/**
 * events of diagram
 *
 * @private
 */
export declare enum DiagramEvent {
    'collectionChange' = 0,
    'rotateChange' = 1,
    'positionChange' = 2,
    'propertyChange' = 3,
    'selectionChange' = 4,
    'sizeChange' = 5,
    'drop' = 6,
    'sourcePointChange' = 7,
    'targetPointChange' = 8,
    'connectionChange' = 9,
    'animationComplete' = 10,
    'click' = 11,
    'doubleClick' = 12,
    'scrollChange' = 13,
    'dragEnter' = 14,
    'dragLeave' = 15,
    'dragOver' = 16,
    'textEdit' = 17,
    'paletteSelectionChange' = 18,
    'historyChange' = 19,
    'mouseEnter' = 20,
    'mouseLeave' = 21,
    'mouseOver' = 22,
    'expandStateChange' = 23,
    'segmentCollectionChange' = 24,
    'commandExecute' = 25,
    'historyStateChange' = 26,
    'onUserHandleMouseDown' = 27,
    'onUserHandleMouseUp' = 28,
    'onUserHandleMouseEnter' = 29,
    'onUserHandleMouseLeave' = 30,
    'onImageLoad' = 31,
    'onDoBindingInit' = 32,
    'keyUp' = 33,
    'keyDown' = 34,
    'fixedUserHandleClick' = 35,
    'elementDraw' = 36,
    'mouseWheel' = 37,
    'segmentChange' = 38,
    'onFixedUserHandleMouseDown' = 39,
    'onFixedUserHandleMouseUp' = 40,
    'onFixedUserHandleMouseEnter' = 41,
    'onFixedUserHandleMouseLeave' = 42,
    'loaded' = 43,
    'layoutUpdated' = 44
}
/**
 * @private
 */
export declare type HistoryChangeAction = 
/** Node - Defines the history entry type is node */
'CustomAction' | 
/** Connector - Defines the history entry type is Connector */
'Undo' | 
/** Selector - Defines the history entry type is Selector Model */
'Redo';
export declare type HistoryEntryType = 
/** Node - Defines the history entry type is node */
'Node' | 
/** Connector - Defines the history entry type is Connector */
'Connector' | 
/** Selector - Defines the history entry type is Selector Model */
'Selector' | 
/** Diagram - Defines the history entry type is Diagram */
'Diagram' | 
/** ShapeAnnotation - Defines the history entry type is ShapeAnnotation Model */
'ShapeAnnotation' | 
/** PathAnnotation - Defines the history entry type is PathAnnotation Model */
'PathAnnotation' | 
/** PortObject - Defines the history entry type is PortObject */
'PortObject' | 
/** Object - Defines the history entry type is Custom Object */
'Object';
/**
 * Defines the zoom type
 * ZoomIn - Zooms in the diagram control
 * ZoomOut - Zooms out the diagram control
 */
export declare type ZoomTypes = 
/** ZoomIn - Zooms in the diagram control */
'ZoomIn' | 
/** ZoomOut - Zooms out the diagram control */
'ZoomOut';
/**
 * Defines how the diagram has to fit into view
 * Page - Fits the diagram content within the viewport
 * Width - Fits the width of the diagram content within the viewport
 * Height - Fits the height of the diagram content within the viewport
 */
export declare type FitModes = 
/** Page - Fits the diagram content within the viewport */
'Page' | 
/** Width - Fits the width of the diagram content within the viewport */
'Width' | 
/** Height - Fits the height of the diagram content within the viewport */
'Height';
/** Enables/Disables certain features of port connection
 *
 * @aspNumberEnum
 * @IgnoreSingular
 */
export declare enum PortConstraints {
    /** Disable all constraints  */
    None = 1,
    /** Enables connections with connector  */
    Drag = 2,
    /** Enables to create the connection when mouse hover on the port  */
    Draw = 4,
    /** Enables to only connect the target end of connector */
    InConnect = 8,
    /** Enables to only connect the source end of connector */
    OutConnect = 16,
    /**Enables or disables the Tooltip  for the ports*/
    ToolTip = 32,
    /** Enables or disables the Tooltip for the ports */
    InheritTooltip = 64,
    /** Enables all constraints */
    Default = 24
}
/**
 * Defines the type of the object
 * Port - Sets the port type as object
 * Annotations - Sets the annotation type as object
 */
export declare type ObjectTypes = 
/** Port - Sets the port type as object */
'Port' | 
/** Annotations - Sets the annotation type as object */
'Annotations';
/**
 * Defines the selection change state
 * Interaction - Sets the selection change state as Interaction
 * Commands - Sets the selection change state as Commands
 * Keyboard - Sets the selection change state as Keyboard
 * Unknown - Sets the selection change state as Unknown
 */
export declare type SelectionChangeCause = 
/** Interaction - Sets the selection change state as Interaction */
'Interaction' | 
/** Commands - Sets the selection change state as Commands */
'Commands' | 
/** Keyboard - Sets the selection change state as Keyboard */
'Keyboard' | 
/** Unknown - Sets the selection change state as Unknown */
'Unknown';
/**
 * Defines the change state
 * Changing - Sets the event state as Changing
 * Changed - Sets the event state as Changed
 * canceled - Sets the event state as canceled
 */
export declare type EventState = 
/** Changing - Sets the event state as Changing */
'Changing' | 
/** Changed - Sets the event state as Changed */
'Changed' | 
/** canceled - Sets the event state as canceled */
'Cancelled';
/**
 * Defines the state of the interactions such as drag, resize and rotate
 * Start - Sets the interaction state as Start
 * Progress - Sets the interaction state as Progress
 * Completed - Sets the interaction state as Completed
 */
export declare type State = 
/** Start - Sets the interaction state as Start */
'Start' | 
/** Progress - Sets the interaction state as Progress */
'Progress' | 
/** Completed - Sets the interaction state as Completed */
'Completed';
/**
 * Returns which mouse button is clicked.
 * Left - Whenever the left button of the mouse is clicked, ‘Left’ is returned.
 * Progress - Whenever the mouse wheel is clicked, ‘Middle’ is returned.
 * Completed - Whenever the right button of the mouse is clicked, ‘Right’ is returned.
 */
export declare type MouseButtons = 
/** Left - Whenever the left button of the mouse is clicked, ‘Left’ is returned. */
'Left' | 
/** Middle - Whenever the mouse wheel is clicked, ‘Middle’ is returned. */
'Middle' | 
/** Right - Whenever the right button of the mouse is clicked, ‘Right’ is returned. */
'Right';
/**
 * Specifies to add or remove intermediate segment.
 * Add - Specifies to add the intermediate segment at the specified point.
 * Remove - Specifies to remove the intermediate segment at the specified point.
 * Toggle - New segment will be added at the tapped point if there is no segment at that point or existing segment will be deleted
 */
export declare type SegmentEditing = 
/** Add - Specifies to add the intermediate segment at the specified point. */
'Add' | 
/** Remove - Specifies to remove the intermediate segment at the specified point. */
'Remove' | 
/**
 * Toggle - Specifies to either add or remove the intermediate segment at the specified point.
 * Note: If there is a segment in the specified point then the existing segment will be removed. Otherwise, it will add a new segment.  */
'Toggle';
/**
 * Defines whether an object is added/removed from diagram
 * Addition - Sets the ChangeType as Addition
 * Removal - Sets the ChangeType as Removal
 */
export declare type ChangeType = 
/** Addition - Sets the ChangeType as Addition */
'Addition' | 
/** Removal - Sets the ChangeType as Removal */
'Removal';
/**
 * Defines the accessibility element
 * NodeModel - Sets the accessibility element as NodeModel
 * ConnectorModel - Sets the accessibility element as ConnectorModel
 * PortModel - Sets the accessibility element as PortModel
 * TextElement - Sets the accessibility element as TextElement
 * IconShapeModel - Sets the accessibility element as IconShapeModel
 * DecoratorModel - Sets the accessibility element as DecoratorModel
 */
export declare type accessibilityElement = 
/** NodeModel - Sets the accessibility element as NodeModel */
'NodeModel' | 
/** ConnectorModel - Sets the accessibility element as ConnectorModel */
'ConnectorModel' | 
/** PortModel - Sets the accessibility element as PortModel */
'PortModel' | 
/** TextElement - Sets the accessibility element as TextElement */
'TextElement' | 
/** IconShapeModel - Sets the accessibility element as IconShapeModel */
'IconShapeModel' | 
/** DecoratorModel - Sets the accessibility element as DecoratorModel */
'DecoratorModel';
/**
 * Defines the context menu click
 * contextMenuClick - Sets the context menu click as contextMenuClick
 */
export declare const contextMenuClick: string;
/**
 * Defines the context menu open
 * contextMenuOpen - Sets the context menu open as contextMenuOpen
 */
export declare const contextMenuOpen: string;
/**
 * Defines the context menu Before Item Render
 * contextMenuBeforeItemRender - Sets the context menu open as contextMenuBeforeItemRender
 */
export declare const contextMenuBeforeItemRender: string;
/**
 * Detect the status of Crud operation performed in the diagram
 */
export declare type Status = 'None' | 'New' | 'Update';
/**
 * Enables/Disables scope of the uml shapes
 * * Public - Indicates the scope is public.
 * * Protected - Indicates the scope is protected.
 * * Private - Indicates the scope is private.
 * * Package - Indicates the scope is package.
 */
export declare type UmlScope = 'Public' | 'Protected' | 'Private' | 'Package';
/**
 * Enables/Disables shape of the uml classifier shapes
 * * Package - Indicates the scope is public.
 * * Class - Indicates the scope is protected.
 * * Interface - Indicates the scope is private.
 * * Enumeration - Indicates the scope is package.
 * * CollapsedPackage - Indicates the scope is public.
 * * Inheritance - Indicates the scope is protected.
 * * Association - Indicates the scope is private.
 * * Aggregation - Indicates the scope is package.
 * * Composition - Indicates the scope is public.
 * * Realization - Indicates the scope is protected.
 * * DirectedAssociation - Indicates the scope is private.
 * * Dependency - Indicates the scope is package.
 */
export declare type ClassifierShape = 'Aggregation' | 'Class' | 'Interface' | 'Enumeration' | 'Inheritance' | 'Association' | 'Composition' | 'Realization' | 'Dependency';
/**
 * Defines the direction the uml connectors
 * * Default - Indicates the direction is Default.
 * * Directional - Indicates the direction is single Directional.
 * * BiDirectional - Indicates the direction is BiDirectional.
 */
export declare type AssociationFlow = 'Directional' | 'Default' | 'BiDirectional';
/**
 * Define the Multiplicity of uml connector shapes
 * * OneToOne - Indicates the connector multiplicity is OneToOne.
 * * OneToMany - Indicates the connector multiplicity is OneToMany.
 * * ManyToOne - Indicates the connector multiplicity is ManyToOne.
 * * ManyToMany - Indicates the connector multiplicity is ManyToMany.
 */
export declare type Multiplicity = 'OneToOne' | 'OneToMany' | 'ManyToOne' | 'ManyToMany';
/**
 * Defines the visibility of the control points in the Bezier connector
 */
export declare enum ControlPointsVisibility {
    /** None - Hides all the control points of the Bezier connector*/
    None = 1,
    /** Source - Shows the source control point*/
    Source = 2,
    /** Target - Shows the target control point*/
    Target = 4,
    /** Intermediate - Shows the intermediate control points*/
    Intermediate = 8,
    /** All - Shows all the control points of the Bezier connector*/
    All = 14
}
/**
 * Defines the editing mode of the intermediate point of two bezier curve
 */
export declare type BezierSegmentEditOrientation = 
/** BiDirectional - Allows the intermediate points to be dragged either vertical or horizontal direction only */
'BiDirectional' | 
/** FreeForm - Allows the intermediate points to be dragged in any direction */
'FreeForm';
export declare enum BezierSmoothness {
    /** Disable all smoothness Constraints. */
    None = 0,
    /** Enables the  SymmetricAngle for a bezier segment to the angle between the control point as same. */
    SymmetricAngle = 2,
    /** Enables the SymmetricDistance for bezier segment to the distance between the control point as same. */
    SymmetricDistance = 4,
    /** Enables the symmetric for bezier segment to the distance and angle between the control point as same. */
    Default = 6
}
/**
 * Specifies the direction for text annotation.
 * * Auto - Specifies the direction as auto to switch the direction based on the connector position.
 * * Left - Specifies the direction as left when the absolute angle as 180 degree.
 * * Right - Specifies the direction as right when the absolute angle as 0 degree.
 * * Top - Specifies the direction as top when the absolute angle as 270 degree or -90 degree.
 * * Bottom - Specifies the direction as bottom when the absolute angle as 90 degree.
 */
export declare type TextAnnotationDirection = 
/** Auto - Specifies the direction as auto to switch the direction based on the connector position. */
'Auto' | 
/** Left - Specifies the direction as left when the absolute angle as 180 degree. */
'Left' | 
/** Right - Specifies the direction as right when the absolute angle as 0 degree. */
'Right' | 
/** Top - Specifies the direction as top when the absolute angle as 270 degree or -90 degree. */
'Top' | 
/** Bottom - Specifies the direction as bottom when the absolute angle as 90 degree. */
'Bottom';
/**
 * Defines the rotating mode of the annotation.
 * * Page - Annotation remains fixed relative to the entire page, regardless of parent node rotation.
 * * Parent - Annotation maintains its relative angle to the parent node during rotation.
 */
export declare type RotationReference = 
/**Page - Annotation remains fixed relative to the entire page, regardless of parent node rotation.  */
'Page' | 
/**parent - Annotation maintains its relative angle to the parent node during rotation. */
'Parent';
