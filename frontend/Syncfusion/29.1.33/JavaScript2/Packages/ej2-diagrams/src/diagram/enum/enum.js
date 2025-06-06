/**
 * enum module defines the public enumerations
 */
/**
 * @private
 */
export var BlazorAction;
(function (BlazorAction) {
    /** Return the layout value is true when doLayout is called   */
    BlazorAction[BlazorAction["Default"] = 0] = "Default";
    /** Need to return the layout value when doLayout is called  */
    BlazorAction[BlazorAction["expandNode"] = 2] = "expandNode";
    /** Enabled during the mouse interaction  */
    BlazorAction[BlazorAction["interaction"] = 4] = "interaction";
    /** Enable when the group action start in history */
    BlazorAction[BlazorAction["GroupingInProgress"] = 8] = "GroupingInProgress";
    /** Enable when the group action start to clone another group node */
    BlazorAction[BlazorAction["GroupClipboardInProcess"] = 16] = "GroupClipboardInProcess";
    /** Enable when the clear the object to prevent the server update */
    BlazorAction[BlazorAction["ClearObject"] = 32] = "ClearObject";
})(BlazorAction || (BlazorAction = {}));
/**
 * Defines how the diagram elements have to be flipped with respect to its immediate parent
 * * FlipHorizontal - Translate the diagram element throughout its immediate parent
 * * FlipVertical - Rotate the diagram element throughout its immediate parent
 * * Both - Rotate  and Translate the diagram element throughout its immediate parent
 * * None - Set the flip Direction as None
 */
export var FlipDirection;
(function (FlipDirection) {
    /**
     * FlipHorizontal - Translate the diagram element throughout its immediate parent
     */
    FlipDirection[FlipDirection["Horizontal"] = 1] = "Horizontal";
    /**
     * FlipVertical - Rotate the diagram element throughout its immediate parent
     */
    FlipDirection[FlipDirection["Vertical"] = 2] = "Vertical";
    /**
     * Both - Rotate and Translate the diagram element throughout its immediate parent
     */
    FlipDirection[FlipDirection["Both"] = 3] = "Both";
    /**
     * None - Set the flip Direction as None
     */
    FlipDirection[FlipDirection["None"] = 0] = "None";
})(FlipDirection || (FlipDirection = {}));
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
export var PortVisibility;
(function (PortVisibility) {
    /** Always shows the port */
    PortVisibility[PortVisibility["Visible"] = 1] = "Visible";
    /** Always hides the port */
    PortVisibility[PortVisibility["Hidden"] = 2] = "Hidden";
    /** Shows the port when the mouse hovers over a node */
    PortVisibility[PortVisibility["Hover"] = 4] = "Hover";
    /** Shows the port when a connection end point is dragged over a node */
    PortVisibility[PortVisibility["Connect"] = 8] = "Connect";
})(PortVisibility || (PortVisibility = {}));
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
export var SnapConstraints;
(function (SnapConstraints) {
    /** None - Snapping does not happen */
    SnapConstraints[SnapConstraints["None"] = 0] = "None";
    /** ShowHorizontalLines - Displays only the horizontal gridlines in diagram. */
    SnapConstraints[SnapConstraints["ShowHorizontalLines"] = 1] = "ShowHorizontalLines";
    /** ShowVerticalLines - Displays only the Vertical gridlines in diagram  */
    SnapConstraints[SnapConstraints["ShowVerticalLines"] = 2] = "ShowVerticalLines";
    /** ShowLines - Display both Horizontal and Vertical gridlines */
    SnapConstraints[SnapConstraints["ShowLines"] = 3] = "ShowLines";
    /** SnapToHorizontalLines - Enables the object to snap only with horizontal gridlines */
    SnapConstraints[SnapConstraints["SnapToHorizontalLines"] = 4] = "SnapToHorizontalLines";
    /** SnapToVerticalLines - Enables the object to snap only with horizontal gridlines */
    SnapConstraints[SnapConstraints["SnapToVerticalLines"] = 8] = "SnapToVerticalLines";
    /** SnapToLines - Enables the object to snap with both horizontal and Vertical gridlines */
    SnapConstraints[SnapConstraints["SnapToLines"] = 12] = "SnapToLines";
    /** SnapToObject - Enables the object to snap with the other objects in the diagram. */
    SnapConstraints[SnapConstraints["SnapToObject"] = 16] = "SnapToObject";
    /** Shows gridlines and enables snapping */
    SnapConstraints[SnapConstraints["All"] = 31] = "All";
})(SnapConstraints || (SnapConstraints = {}));
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
export var SelectorConstraints;
(function (SelectorConstraints) {
    /** Hides all the selector elements */
    SelectorConstraints[SelectorConstraints["None"] = 1] = "None";
    /** Shows/hides the source thumb of the connector */
    SelectorConstraints[SelectorConstraints["ConnectorSourceThumb"] = 2] = "ConnectorSourceThumb";
    /** Shows/hides the target thumb of the connector */
    SelectorConstraints[SelectorConstraints["ConnectorTargetThumb"] = 4] = "ConnectorTargetThumb";
    /** Shows/hides the bottom right resize handle of the selector */
    SelectorConstraints[SelectorConstraints["ResizeSouthEast"] = 8] = "ResizeSouthEast";
    /** Shows/hides the bottom left resize handle of the selector */
    SelectorConstraints[SelectorConstraints["ResizeSouthWest"] = 16] = "ResizeSouthWest";
    /** Shows/hides the top right resize handle of the selector */
    SelectorConstraints[SelectorConstraints["ResizeNorthEast"] = 32] = "ResizeNorthEast";
    /** Shows/hides the top left resize handle of the selector */
    SelectorConstraints[SelectorConstraints["ResizeNorthWest"] = 64] = "ResizeNorthWest";
    /** Shows/hides the middle right resize handle of the selector  */
    SelectorConstraints[SelectorConstraints["ResizeEast"] = 128] = "ResizeEast";
    /** Shows/hides the middle left resize handle of the selector */
    SelectorConstraints[SelectorConstraints["ResizeWest"] = 256] = "ResizeWest";
    /** Shows/hides the bottom center resize handle of the selector */
    SelectorConstraints[SelectorConstraints["ResizeSouth"] = 512] = "ResizeSouth";
    /** Shows/hides the top center resize handle of the selector */
    SelectorConstraints[SelectorConstraints["ResizeNorth"] = 1024] = "ResizeNorth";
    /**  Shows/hides the rotate handle of the selector */
    SelectorConstraints[SelectorConstraints["Rotate"] = 2048] = "Rotate";
    /** Shows/hides the user handles of the selector */
    SelectorConstraints[SelectorConstraints["UserHandle"] = 4096] = "UserHandle";
    /** Shows/hides the default tooltip of nodes and connectors */
    SelectorConstraints[SelectorConstraints["ToolTip"] = 8192] = "ToolTip";
    /** Shows/hides all resize handles of the selector */
    SelectorConstraints[SelectorConstraints["ResizeAll"] = 2046] = "ResizeAll";
    /** Shows all handles of the selector  */
    SelectorConstraints[SelectorConstraints["All"] = 16382] = "All";
})(SelectorConstraints || (SelectorConstraints = {}));
/**
 * Defines the connection point of the connectors in the layout
 * SamePoint - Connectors will connect with same point in the layout
 * DifferentPoint - Connectors will connect with different points in the layout
 */
export var ConnectionPointOrigin;
(function (ConnectionPointOrigin) {
    /** SamePoint - Connectors will connect with same point in the layout */
    ConnectionPointOrigin["SamePoint"] = "SamePoint";
    /** DifferentPoint - Connectors will connect with different points in the layout */
    ConnectionPointOrigin["DifferentPoint"] = "DifferentPoint";
})(ConnectionPointOrigin || (ConnectionPointOrigin = {}));
/**
 * Defines the child nodes need to arranged in linear manner in layout
 * Linear - Child nodes will be arranged in linear manner
 * Nonlinear - Child nodes will be arranged in not linear manner
 */
export var ChildArrangement;
(function (ChildArrangement) {
    /** Linear - Child nodes will be arranged in linear manner */
    ChildArrangement["Linear"] = "Linear";
    /** Nonlinear - Child nodes will be arranged in not linear manner */
    ChildArrangement["Nonlinear"] = "Nonlinear";
})(ChildArrangement || (ChildArrangement = {}));
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
export var ConnectorConstraints;
(function (ConnectorConstraints) {
    /** Disable all connector Constraints. */
    ConnectorConstraints[ConnectorConstraints["None"] = 1] = "None";
    /** Enables connector to be selected. */
    ConnectorConstraints[ConnectorConstraints["Select"] = 2] = "Select";
    /** Enables connector to be Deleted. */
    ConnectorConstraints[ConnectorConstraints["Delete"] = 4] = "Delete";
    /** Enables connector to be Dragged. */
    ConnectorConstraints[ConnectorConstraints["Drag"] = 8] = "Drag";
    /** Enables connectors source end to be selected. */
    ConnectorConstraints[ConnectorConstraints["DragSourceEnd"] = 16] = "DragSourceEnd";
    /** Enables connectors target end to be selected. */
    ConnectorConstraints[ConnectorConstraints["DragTargetEnd"] = 32] = "DragTargetEnd";
    /** Enables control point and end point of every segment in a connector for editing. */
    ConnectorConstraints[ConnectorConstraints["DragSegmentThumb"] = 64] = "DragSegmentThumb";
    /** Enables AllowDrop constraints to the  connector. */
    ConnectorConstraints[ConnectorConstraints["AllowDrop"] = 128] = "AllowDrop";
    /** Enables bridging to the connector. */
    ConnectorConstraints[ConnectorConstraints["Bridging"] = 256] = "Bridging";
    /** Enables or Disables Bridge Obstacles with overlapping of connectors. */
    ConnectorConstraints[ConnectorConstraints["BridgeObstacle"] = 512] = "BridgeObstacle";
    /** Enables bridging to the connector. */
    ConnectorConstraints[ConnectorConstraints["InheritBridging"] = 1024] = "InheritBridging";
    /** Used to set the pointer events. */
    ConnectorConstraints[ConnectorConstraints["PointerEvents"] = 2048] = "PointerEvents";
    /** Enables or disables tool tip for the connectors */
    ConnectorConstraints[ConnectorConstraints["Tooltip"] = 4096] = "Tooltip";
    /** Enables or disables tool tip for the connectors */
    ConnectorConstraints[ConnectorConstraints["InheritTooltip"] = 8192] = "InheritTooltip";
    /** Enables Interaction. */
    ConnectorConstraints[ConnectorConstraints["Interaction"] = 4218] = "Interaction";
    /** Enables ReadOnly */
    ConnectorConstraints[ConnectorConstraints["ReadOnly"] = 16384] = "ReadOnly";
    /** Enables or disables routing to the connector. */
    ConnectorConstraints[ConnectorConstraints["LineRouting"] = 32768] = "LineRouting";
    /** Enables or disables routing to the connector. */
    ConnectorConstraints[ConnectorConstraints["InheritLineRouting"] = 65536] = "InheritLineRouting";
    /** Enables or disables near node padding to the connector. */
    ConnectorConstraints[ConnectorConstraints["ConnectToNearByNode"] = 131072] = "ConnectToNearByNode";
    /** Enables or disables near port padding to the connector. */
    ConnectorConstraints[ConnectorConstraints["ConnectToNearByPort"] = 262144] = "ConnectToNearByPort";
    /** Enables or disables Enables or disables near port and node padding to the connector. */
    ConnectorConstraints[ConnectorConstraints["ConnectToNearByElement"] = 393216] = "ConnectToNearByElement";
    /**Enables or disables to inherit the value of segmentThumbShape */
    ConnectorConstraints[ConnectorConstraints["InheritSegmentThumbShape"] = 524288] = "InheritSegmentThumbShape";
    /**Enables or disables to inherit the value of segmentThumbSize */
    ConnectorConstraints[ConnectorConstraints["InheritSegmentThumbSize"] = 1048576] = "InheritSegmentThumbSize";
    /** Enables all constraints. */
    ConnectorConstraints[ConnectorConstraints["Default"] = 2043454] = "Default";
})(ConnectorConstraints || (ConnectorConstraints = {}));
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
export var AnnotationConstraints;
(function (AnnotationConstraints) {
    /** Enables/Disables the ReadOnly Constraints */
    AnnotationConstraints[AnnotationConstraints["ReadOnly"] = 2] = "ReadOnly";
    /** Enables/Disables the InheritReadOnly Constraints */
    AnnotationConstraints[AnnotationConstraints["InheritReadOnly"] = 4] = "InheritReadOnly";
    /** Enables/Disable select support for the annotation */
    AnnotationConstraints[AnnotationConstraints["Select"] = 8] = "Select";
    /** Enables/Disable drag support for the annotation */
    AnnotationConstraints[AnnotationConstraints["Drag"] = 16] = "Drag";
    /** Enables/Disable resize support for the annotation */
    AnnotationConstraints[AnnotationConstraints["Resize"] = 32] = "Resize";
    /** Enables/Disable rotate support for the annotation */
    AnnotationConstraints[AnnotationConstraints["Rotate"] = 64] = "Rotate";
    /** Enables or disables tool tip for the annotation */
    AnnotationConstraints[AnnotationConstraints["Tooltip"] = 128] = "Tooltip";
    /** Enables annotation to inherit the interaction option */
    AnnotationConstraints[AnnotationConstraints["Interaction"] = 120] = "Interaction";
    /** Disable all annotation Constraints */
    AnnotationConstraints[AnnotationConstraints["None"] = 0] = "None";
})(AnnotationConstraints || (AnnotationConstraints = {}));
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
export var NodeConstraints;
(function (NodeConstraints) {
    /** Disable all node Constraints. */
    NodeConstraints[NodeConstraints["None"] = 0] = "None";
    /** Enables node to be selected. */
    NodeConstraints[NodeConstraints["Select"] = 2] = "Select";
    /** Enables node to be Dragged. */
    NodeConstraints[NodeConstraints["Drag"] = 4] = "Drag";
    /** Enables node to be Rotate. */
    NodeConstraints[NodeConstraints["Rotate"] = 8] = "Rotate";
    /** Enables node to display shadow. */
    NodeConstraints[NodeConstraints["Shadow"] = 16] = "Shadow";
    /** Enables node to provide pointer  option */
    NodeConstraints[NodeConstraints["PointerEvents"] = 32] = "PointerEvents";
    /** Enables node to delete */
    NodeConstraints[NodeConstraints["Delete"] = 64] = "Delete";
    /** Enables node to provide in connect option */
    NodeConstraints[NodeConstraints["InConnect"] = 128] = "InConnect";
    /** Enables node to provide out connect option */
    NodeConstraints[NodeConstraints["OutConnect"] = 256] = "OutConnect";
    /** Enables node to provide individual resize option */
    NodeConstraints[NodeConstraints["Individual"] = 512] = "Individual";
    /** Enables node to provide Expandable option */
    NodeConstraints[NodeConstraints["Expandable"] = 1024] = "Expandable";
    /** Enables node to provide allow to drop option */
    NodeConstraints[NodeConstraints["AllowDrop"] = 2048] = "AllowDrop";
    /** Enables node to inherit the interaction option */
    NodeConstraints[NodeConstraints["Inherit"] = 78] = "Inherit";
    /** Enable ResizeNorthEast of the node  */
    NodeConstraints[NodeConstraints["ResizeNorthEast"] = 4096] = "ResizeNorthEast";
    /** Enable ResizeEast of the node  */
    NodeConstraints[NodeConstraints["ResizeEast"] = 8192] = "ResizeEast";
    /** Enable ResizeSouthEast of the node  */
    NodeConstraints[NodeConstraints["ResizeSouthEast"] = 16384] = "ResizeSouthEast";
    /** Enable ResizeSouth of the node  */
    NodeConstraints[NodeConstraints["ResizeSouth"] = 32768] = "ResizeSouth";
    /** Enable ResizeSouthWest of the node  */
    NodeConstraints[NodeConstraints["ResizeSouthWest"] = 65536] = "ResizeSouthWest";
    /** Enable ResizeWest of the node  */
    NodeConstraints[NodeConstraints["ResizeWest"] = 131072] = "ResizeWest";
    /** Enable ResizeNorthWest of the node  */
    NodeConstraints[NodeConstraints["ResizeNorthWest"] = 262144] = "ResizeNorthWest";
    /** Enable ResizeNorth of the node  */
    NodeConstraints[NodeConstraints["ResizeNorth"] = 524288] = "ResizeNorth";
    /** Enable Resize of the node  */
    NodeConstraints[NodeConstraints["Resize"] = 1044480] = "Resize";
    /** Enables the Aspect ratio fo the node */
    NodeConstraints[NodeConstraints["AspectRatio"] = 1048576] = "AspectRatio";
    /** Enables or disables tool tip for the Nodes */
    NodeConstraints[NodeConstraints["Tooltip"] = 2097152] = "Tooltip";
    /** Enables or disables tool tip for the Nodes */
    NodeConstraints[NodeConstraints["InheritTooltip"] = 4194304] = "InheritTooltip";
    /** Enables the  ReadOnly support for Annotation */
    NodeConstraints[NodeConstraints["ReadOnly"] = 8388608] = "ReadOnly";
    /** hide all resize support for node */
    NodeConstraints[NodeConstraints["HideThumbs"] = 16777216] = "HideThumbs";
    /** Enables or disables child in parent for the swimLane node */
    NodeConstraints[NodeConstraints["AllowMovingOutsideLane"] = 33554432] = "AllowMovingOutsideLane";
    /** Enables all constraints */
    NodeConstraints[NodeConstraints["Default"] = 5240814] = "Default";
})(NodeConstraints || (NodeConstraints = {}));
/** Enables/Disables The element actions
 * None - Diables all element actions are none
 * ElementIsPort - Enable element action is port
 * ElementIsGroup - Enable element action as Group
 *
 * @private
 */
export var ElementAction;
(function (ElementAction) {
    /** Disables all element actions are none  */
    ElementAction[ElementAction["None"] = 0] = "None";
    /** Enable the element action is Port  */
    ElementAction[ElementAction["ElementIsPort"] = 2] = "ElementIsPort";
    /** Enable the element action as Group  */
    ElementAction[ElementAction["ElementIsGroup"] = 4] = "ElementIsGroup";
    /** Enable the element action if swimlaneHeader is rendered  */
    ElementAction[ElementAction["HorizontalLaneHeader"] = 8] = "HorizontalLaneHeader";
})(ElementAction || (ElementAction = {}));
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
export var ThumbsConstraints;
(function (ThumbsConstraints) {
    /** Enable Rotate Thumb  */
    ThumbsConstraints[ThumbsConstraints["Rotate"] = 2] = "Rotate";
    /** Enable Connector source point  */
    ThumbsConstraints[ThumbsConstraints["ConnectorSource"] = 4] = "ConnectorSource";
    /** Enable Connector target point  */
    ThumbsConstraints[ThumbsConstraints["ConnectorTarget"] = 8] = "ConnectorTarget";
    /** Enable ResizeNorthEast Resize  */
    ThumbsConstraints[ThumbsConstraints["ResizeNorthEast"] = 16] = "ResizeNorthEast";
    /** Enable ResizeEast Resize  */
    ThumbsConstraints[ThumbsConstraints["ResizeEast"] = 32] = "ResizeEast";
    /** Enable ResizeSouthEast Resize */
    ThumbsConstraints[ThumbsConstraints["ResizeSouthEast"] = 64] = "ResizeSouthEast";
    /** Enable ResizeSouth Resize */
    ThumbsConstraints[ThumbsConstraints["ResizeSouth"] = 128] = "ResizeSouth";
    /** Enable ResizeSouthWest Resize */
    ThumbsConstraints[ThumbsConstraints["ResizeSouthWest"] = 256] = "ResizeSouthWest";
    /** Enable ResizeWest Resize */
    ThumbsConstraints[ThumbsConstraints["ResizeWest"] = 512] = "ResizeWest";
    /** Enable ResizeNorthWest Resize */
    ThumbsConstraints[ThumbsConstraints["ResizeNorthWest"] = 1024] = "ResizeNorthWest";
    /** Enable ResizeNorth Resize */
    ThumbsConstraints[ThumbsConstraints["ResizeNorth"] = 2048] = "ResizeNorth";
    /** Enables all constraints */
    ThumbsConstraints[ThumbsConstraints["Default"] = 4094] = "Default";
})(ThumbsConstraints || (ThumbsConstraints = {}));
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
export var DiagramConstraints;
(function (DiagramConstraints) {
    /** Disable DiagramConstraints constraints */
    DiagramConstraints[DiagramConstraints["None"] = 1] = "None";
    /** Enables/Disable Bridging support for connector */
    DiagramConstraints[DiagramConstraints["Bridging"] = 2] = "Bridging";
    /** Enables/Disable the Undo/Redo support */
    DiagramConstraints[DiagramConstraints["UndoRedo"] = 4] = "UndoRedo";
    /** Enables/Disable Tooltip support */
    DiagramConstraints[DiagramConstraints["Tooltip"] = 8] = "Tooltip";
    /** Enables/Disable UserInteraction support for the diagram */
    DiagramConstraints[DiagramConstraints["UserInteraction"] = 16] = "UserInteraction";
    /** Enables/Disable ApiUpdate support for the diagram */
    DiagramConstraints[DiagramConstraints["ApiUpdate"] = 32] = "ApiUpdate";
    /** Enables/Disable PageEditable support for the diagram */
    DiagramConstraints[DiagramConstraints["PageEditable"] = 48] = "PageEditable";
    /** Enables/Disable Zoom support for the diagram */
    DiagramConstraints[DiagramConstraints["Zoom"] = 64] = "Zoom";
    /** Enables/Disable PanX support for the diagram */
    DiagramConstraints[DiagramConstraints["PanX"] = 128] = "PanX";
    /** Enables/Disable PanY support for the diagram */
    DiagramConstraints[DiagramConstraints["PanY"] = 256] = "PanY";
    /** Enables/Disable Pan support the diagram */
    DiagramConstraints[DiagramConstraints["Pan"] = 384] = "Pan";
    /** Enables/Disables zooming the text box while editing the text */
    DiagramConstraints[DiagramConstraints["ZoomTextEdit"] = 512] = "ZoomTextEdit";
    /** Enables/Disable Virtualization support the diagram */
    DiagramConstraints[DiagramConstraints["Virtualization"] = 1024] = "Virtualization";
    /** Enables/ Disable the line routing */
    DiagramConstraints[DiagramConstraints["LineRouting"] = 2048] = "LineRouting";
    /** Enables/Disables the line overlapping resolution globally in the diagram */
    DiagramConstraints[DiagramConstraints["AvoidLineOverlapping"] = 4096] = "AvoidLineOverlapping";
    /** Enables/Disable all constraints */
    DiagramConstraints[DiagramConstraints["Default"] = 500] = "Default";
})(DiagramConstraints || (DiagramConstraints = {}));
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
export var DiagramTools;
(function (DiagramTools) {
    /** Disable all constraints */
    DiagramTools[DiagramTools["None"] = 0] = "None";
    /** Enables/Disable single select support for the diagram */
    DiagramTools[DiagramTools["SingleSelect"] = 1] = "SingleSelect";
    /** Enables/Disable MultipleSelect select support for the diagram */
    DiagramTools[DiagramTools["MultipleSelect"] = 2] = "MultipleSelect";
    /** Enables/Disable ZoomPan support for the diagram */
    DiagramTools[DiagramTools["ZoomPan"] = 4] = "ZoomPan";
    /** Enables/Disable DrawOnce support for the diagram */
    DiagramTools[DiagramTools["DrawOnce"] = 8] = "DrawOnce";
    /** Enables/Disable continuousDraw support for the diagram */
    DiagramTools[DiagramTools["ContinuousDraw"] = 16] = "ContinuousDraw";
    /** Enables/Disable all constraints */
    DiagramTools[DiagramTools["Default"] = 3] = "Default";
})(DiagramTools || (DiagramTools = {}));
/**
 * Defines the container/canvas transform
 * Self - Sets the transform type as Self
 * Parent - Sets the transform type as Parent
 */
export var Transform;
(function (Transform) {
    /** Self - Sets the transform type as Self */
    Transform[Transform["Self"] = 1] = "Self";
    /** Parent - Sets the transform type as Parent */
    Transform[Transform["Parent"] = 2] = "Parent";
})(Transform || (Transform = {}));
/**
 * Defines the rendering mode for diagram
 * Canvas - Sets the rendering mode type as Canvas
 * Svg - Sets the rendering mode type as Svg
 */
export var RenderMode;
(function (RenderMode) {
    /** Canvas - Sets the rendering mode type as Canvas */
    RenderMode[RenderMode["Canvas"] = 0] = "Canvas";
    /** Svg - Sets the rendering mode type as Svg */
    RenderMode[RenderMode["Svg"] = 1] = "Svg";
})(RenderMode || (RenderMode = {}));
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
export var KeyModifiers;
(function (KeyModifiers) {
    /** No modifiers are pressed */
    KeyModifiers[KeyModifiers["None"] = 0] = "None";
    /** The CTRL key */
    KeyModifiers[KeyModifiers["Control"] = 1] = "Control";
    /** The Meta key pressed in Mac */
    KeyModifiers[KeyModifiers["Meta"] = 1] = "Meta";
    /** The ALT key */
    KeyModifiers[KeyModifiers["Alt"] = 2] = "Alt";
    /** The Shift key */
    KeyModifiers[KeyModifiers["Shift"] = 4] = "Shift";
})(KeyModifiers || (KeyModifiers = {}));
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
export var Keys;
(function (Keys) {
    /** No key pressed */
    Keys[Keys["None"] = null] = "None";
    /** The 0 key */
    Keys[Keys["Number0"] = 0] = "Number0";
    /** The 1 key */
    Keys[Keys["Number1"] = 1] = "Number1";
    /** The 2 key */
    Keys[Keys["Number2"] = 2] = "Number2";
    /** The 3 key */
    Keys[Keys["Number3"] = 3] = "Number3";
    /** The 4 key */
    Keys[Keys["Number4"] = 4] = "Number4";
    /** The 5 key */
    Keys[Keys["Number5"] = 5] = "Number5";
    /** The 6 key */
    Keys[Keys["Number6"] = 6] = "Number6";
    /** The 7 key */
    Keys[Keys["Number7"] = 7] = "Number7";
    /** The 8 key */
    Keys[Keys["Number8"] = 8] = "Number8";
    /** The 9 key */
    Keys[Keys["Number9"] = 9] = "Number9";
    /** The A key */
    Keys[Keys["A"] = 65] = "A";
    /** The B key */
    Keys[Keys["B"] = 66] = "B";
    /** The C key */
    Keys[Keys["C"] = 67] = "C";
    /** The D key */
    Keys[Keys["D"] = 68] = "D";
    /** The E key */
    Keys[Keys["E"] = 69] = "E";
    /** The F key */
    Keys[Keys["F"] = 70] = "F";
    /** The G key */
    Keys[Keys["G"] = 71] = "G";
    /** The H key */
    Keys[Keys["H"] = 72] = "H";
    /** The I key */
    Keys[Keys["I"] = 73] = "I";
    /** The J key */
    Keys[Keys["J"] = 74] = "J";
    /** The K key */
    Keys[Keys["K"] = 75] = "K";
    /** The L key */
    Keys[Keys["L"] = 76] = "L";
    /** The M key */
    Keys[Keys["M"] = 77] = "M";
    /** The N key */
    Keys[Keys["N"] = 78] = "N";
    /** The O key */
    Keys[Keys["O"] = 79] = "O";
    /** The P key */
    Keys[Keys["P"] = 80] = "P";
    /** The Q key */
    Keys[Keys["Q"] = 81] = "Q";
    /** The R key */
    Keys[Keys["R"] = 82] = "R";
    /** The S key */
    Keys[Keys["S"] = 83] = "S";
    /** The T key */
    Keys[Keys["T"] = 84] = "T";
    /** The U key */
    Keys[Keys["U"] = 85] = "U";
    /** The V key */
    Keys[Keys["V"] = 86] = "V";
    /** The W key */
    Keys[Keys["W"] = 87] = "W";
    /** The X key */
    Keys[Keys["X"] = 88] = "X";
    /** The Y key */
    Keys[Keys["Y"] = 89] = "Y";
    /** The Z key */
    Keys[Keys["Z"] = 90] = "Z";
    /** The left arrow key */
    Keys[Keys["Left"] = 37] = "Left";
    /** The up arrow key */
    Keys[Keys["Up"] = 38] = "Up";
    /** The right arrow key */
    Keys[Keys["Right"] = 39] = "Right";
    /** The down arrow key */
    Keys[Keys["Down"] = 40] = "Down";
    /** The Escape key */
    Keys[Keys["Escape"] = 27] = "Escape";
    /** The Space key */
    Keys[Keys["Space"] = 32] = "Space";
    /** The page up key */
    Keys[Keys["PageUp"] = 33] = "PageUp";
    /** The Space key */
    Keys[Keys["PageDown"] = 34] = "PageDown";
    /** The Space key */
    Keys[Keys["End"] = 35] = "End";
    /** The Space key */
    Keys[Keys["Home"] = 36] = "Home";
    /** The delete key */
    Keys[Keys["Delete"] = 46] = "Delete";
    /** The tab key */
    Keys[Keys["Tab"] = 9] = "Tab";
    /** The enter key */
    Keys[Keys["Enter"] = 13] = "Enter";
    /** The BackSpace key */
    Keys[Keys["BackSpace"] = 8] = "BackSpace";
    /** The F1 key */
    Keys[Keys["F1"] = 112] = "F1";
    /** The F2 key */
    Keys[Keys["F2"] = 113] = "F2";
    /** The F3 key */
    Keys[Keys["F3"] = 114] = "F3";
    /** The F4 key */
    Keys[Keys["F4"] = 115] = "F4";
    /** The F5 key */
    Keys[Keys["F5"] = 116] = "F5";
    /** The F6 key */
    Keys[Keys["F6"] = 117] = "F6";
    /** The F7 key */
    Keys[Keys["F7"] = 118] = "F7";
    /** The F8 key */
    Keys[Keys["F8"] = 119] = "F8";
    /** The F9 key */
    Keys[Keys["F9"] = 120] = "F9";
    /** The F10 key */
    Keys[Keys["F10"] = 121] = "F10";
    /** The F111 key */
    Keys[Keys["F11"] = 122] = "F11";
    /** The F12 key */
    Keys[Keys["F12"] = 123] = "F12";
    /** The Star */
    Keys[Keys["Star"] = 56] = "Star";
    /** The Plus */
    Keys[Keys["Plus"] = 187] = "Plus";
    /** The Minus */
    Keys[Keys["Minus"] = 189] = "Minus";
    /** The Open Square bracket */
    Keys[Keys["BracketLeft"] = 219] = "BracketLeft";
    /** The close Square bracket */
    Keys[Keys["BracketRight"] = 221] = "BracketRight";
})(Keys || (Keys = {}));
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
export var DiagramAction;
(function (DiagramAction) {
    /** Indicates the diagram is in render state.r */
    DiagramAction[DiagramAction["Render"] = 2] = "Render";
    /** Indicates the diagram public method is in action. */
    DiagramAction[DiagramAction["PublicMethod"] = 4] = "PublicMethod";
    /** Indicates the diagram Tool is in action. */
    DiagramAction[DiagramAction["ToolAction"] = 8] = "ToolAction";
    /** Indicates the diagram undo/redo is in action. */
    DiagramAction[DiagramAction["UndoRedo"] = 16] = "UndoRedo";
    /** Indicates the text editing is in progress. */
    DiagramAction[DiagramAction["TextEdit"] = 32] = "TextEdit";
    /** Indicates the group is in progress. */
    DiagramAction[DiagramAction["Group"] = 64] = "Group";
    /** Indicates diagram have clear all. */
    DiagramAction[DiagramAction["Clear"] = 128] = "Clear";
    /** prevents diagram from clear selection. */
    DiagramAction[DiagramAction["PreventClearSelection"] = 256] = "PreventClearSelection";
    /** Indicates whether drag or rotate tool has been activated */
    DiagramAction[DiagramAction["Interactions"] = 512] = "Interactions";
    /** Use to prevent the history during some action in diagram */
    DiagramAction[DiagramAction["PreventHistory"] = 1024] = "PreventHistory";
    /** Use to prevent the icon while expand a node in diagram */
    DiagramAction[DiagramAction["PreventIconsUpdate"] = 2048] = "PreventIconsUpdate";
    /** Use to prevent the collection change event while dragging lane from palette and over it in diagram */
    DiagramAction[DiagramAction["PreventCollectionChangeOnDragOver"] = 4096] = "PreventCollectionChangeOnDragOver";
    /** Use to prevent the z order on dragging the diagram elements */
    DiagramAction[DiagramAction["PreventZIndexOnDragging"] = 8192] = "PreventZIndexOnDragging";
    /** Indicates whether group dragging has been activated */
    DiagramAction[DiagramAction["isGroupDragging"] = 16384] = "isGroupDragging";
    /** Indicates whether drag is initiated by mouse  */
    DiagramAction[DiagramAction["DragUsingMouse"] = 32768] = "DragUsingMouse";
    /** Indicates whether decorator property is changed or not */
    DiagramAction[DiagramAction["DecoratorPropertyChange"] = 65536] = "DecoratorPropertyChange";
    /** Avoid dropping of child nodes into the swim lane */
    DiagramAction[DiagramAction["PreventLaneContainerUpdate"] = 131072] = "PreventLaneContainerUpdate";
})(DiagramAction || (DiagramAction = {}));
/**
 * Defines the Selector type to be drawn
 * None - Draws Normal selector with resize handles
 * Symbol - Draws only the rectangle for the selector
 */
export var RendererAction;
(function (RendererAction) {
    /** None - Draws Normal selector with resize handles */
    RendererAction[RendererAction["None"] = 2] = "None";
    /** DrawSelectorBorder - Draws only the Border for the selector */
    RendererAction[RendererAction["DrawSelectorBorder"] = 4] = "DrawSelectorBorder";
    /** PreventRenderSelector - Avoid the render of selector during interaction */
    RendererAction[RendererAction["PreventRenderSelector"] = 8] = "PreventRenderSelector";
})(RendererAction || (RendererAction = {}));
export var RealAction;
(function (RealAction) {
    RealAction[RealAction["None"] = 0] = "None";
    RealAction[RealAction["PreventDrag"] = 2] = "PreventDrag";
    RealAction[RealAction["PreventScale"] = 4] = "PreventScale";
    RealAction[RealAction["PreventDataInit"] = 8] = "PreventDataInit";
    /** Indicates when the diagram is scrolled horizontal using scroll bar */
    RealAction[RealAction["hScrollbarMoved"] = 16] = "hScrollbarMoved";
    /** Indicates when the diagram is scrolled vertical using scroll bar */
    RealAction[RealAction["vScrollbarMoved"] = 32] = "vScrollbarMoved";
    /** Indicates whether animation happens or not  */
    RealAction[RealAction["AnimationClick"] = 64] = "AnimationClick";
    /** Enable the group action */
    RealAction[RealAction["EnableGroupAction"] = 128] = "EnableGroupAction";
    /** Indicate action in Progress */
    RealAction[RealAction["PanInProgress"] = 256] = "PanInProgress";
    /** Indicate overview action  */
    RealAction[RealAction["OverViewAction"] = 512] = "OverViewAction";
})(RealAction || (RealAction = {}));
/** @private */
export var ScrollActions;
(function (ScrollActions) {
    ScrollActions[ScrollActions["None"] = 0] = "None";
    /** Indicates when the scroll properties are changed using property change */
    ScrollActions[ScrollActions["PropertyChange"] = 1024] = "PropertyChange";
    /** Indicates when the scroll properties are changed using interaction */
    ScrollActions[ScrollActions["Interaction"] = 2048] = "Interaction";
})(ScrollActions || (ScrollActions = {}));
/** @private */
export var NoOfSegments;
(function (NoOfSegments) {
    NoOfSegments[NoOfSegments["Zero"] = 0] = "Zero";
    NoOfSegments[NoOfSegments["One"] = 1] = "One";
    NoOfSegments[NoOfSegments["Two"] = 2] = "Two";
    NoOfSegments[NoOfSegments["Three"] = 3] = "Three";
    NoOfSegments[NoOfSegments["Four"] = 4] = "Four";
    NoOfSegments[NoOfSegments["Five"] = 5] = "Five";
})(NoOfSegments || (NoOfSegments = {}));
/**
 * events of diagram
 *
 * @private
 */
export var DiagramEvent;
(function (DiagramEvent) {
    DiagramEvent[DiagramEvent["collectionChange"] = 0] = "collectionChange";
    DiagramEvent[DiagramEvent["rotateChange"] = 1] = "rotateChange";
    DiagramEvent[DiagramEvent["positionChange"] = 2] = "positionChange";
    DiagramEvent[DiagramEvent["propertyChange"] = 3] = "propertyChange";
    DiagramEvent[DiagramEvent["selectionChange"] = 4] = "selectionChange";
    DiagramEvent[DiagramEvent["sizeChange"] = 5] = "sizeChange";
    DiagramEvent[DiagramEvent["drop"] = 6] = "drop";
    DiagramEvent[DiagramEvent["sourcePointChange"] = 7] = "sourcePointChange";
    DiagramEvent[DiagramEvent["targetPointChange"] = 8] = "targetPointChange";
    DiagramEvent[DiagramEvent["connectionChange"] = 9] = "connectionChange";
    DiagramEvent[DiagramEvent["animationComplete"] = 10] = "animationComplete";
    DiagramEvent[DiagramEvent["click"] = 11] = "click";
    DiagramEvent[DiagramEvent["doubleClick"] = 12] = "doubleClick";
    DiagramEvent[DiagramEvent["scrollChange"] = 13] = "scrollChange";
    DiagramEvent[DiagramEvent["dragEnter"] = 14] = "dragEnter";
    DiagramEvent[DiagramEvent["dragLeave"] = 15] = "dragLeave";
    DiagramEvent[DiagramEvent["dragOver"] = 16] = "dragOver";
    DiagramEvent[DiagramEvent["textEdit"] = 17] = "textEdit";
    DiagramEvent[DiagramEvent["paletteSelectionChange"] = 18] = "paletteSelectionChange";
    DiagramEvent[DiagramEvent["historyChange"] = 19] = "historyChange";
    DiagramEvent[DiagramEvent["mouseEnter"] = 20] = "mouseEnter";
    DiagramEvent[DiagramEvent["mouseLeave"] = 21] = "mouseLeave";
    DiagramEvent[DiagramEvent["mouseOver"] = 22] = "mouseOver";
    DiagramEvent[DiagramEvent["expandStateChange"] = 23] = "expandStateChange";
    DiagramEvent[DiagramEvent["segmentCollectionChange"] = 24] = "segmentCollectionChange";
    DiagramEvent[DiagramEvent["commandExecute"] = 25] = "commandExecute";
    DiagramEvent[DiagramEvent["historyStateChange"] = 26] = "historyStateChange";
    DiagramEvent[DiagramEvent["onUserHandleMouseDown"] = 27] = "onUserHandleMouseDown";
    DiagramEvent[DiagramEvent["onUserHandleMouseUp"] = 28] = "onUserHandleMouseUp";
    DiagramEvent[DiagramEvent["onUserHandleMouseEnter"] = 29] = "onUserHandleMouseEnter";
    DiagramEvent[DiagramEvent["onUserHandleMouseLeave"] = 30] = "onUserHandleMouseLeave";
    DiagramEvent[DiagramEvent["onImageLoad"] = 31] = "onImageLoad";
    DiagramEvent[DiagramEvent["onDoBindingInit"] = 32] = "onDoBindingInit";
    DiagramEvent[DiagramEvent["keyUp"] = 33] = "keyUp";
    DiagramEvent[DiagramEvent["keyDown"] = 34] = "keyDown";
    DiagramEvent[DiagramEvent["fixedUserHandleClick"] = 35] = "fixedUserHandleClick";
    DiagramEvent[DiagramEvent["elementDraw"] = 36] = "elementDraw";
    DiagramEvent[DiagramEvent["mouseWheel"] = 37] = "mouseWheel";
    DiagramEvent[DiagramEvent["segmentChange"] = 38] = "segmentChange";
    DiagramEvent[DiagramEvent["onFixedUserHandleMouseDown"] = 39] = "onFixedUserHandleMouseDown";
    DiagramEvent[DiagramEvent["onFixedUserHandleMouseUp"] = 40] = "onFixedUserHandleMouseUp";
    DiagramEvent[DiagramEvent["onFixedUserHandleMouseEnter"] = 41] = "onFixedUserHandleMouseEnter";
    DiagramEvent[DiagramEvent["onFixedUserHandleMouseLeave"] = 42] = "onFixedUserHandleMouseLeave";
    DiagramEvent[DiagramEvent["loaded"] = 43] = "loaded";
    DiagramEvent[DiagramEvent["layoutUpdated"] = 44] = "layoutUpdated";
})(DiagramEvent || (DiagramEvent = {}));
/** Enables/Disables certain features of port connection
 *
 * @aspNumberEnum
 * @IgnoreSingular
 */
export var PortConstraints;
(function (PortConstraints) {
    /** Disable all constraints  */
    PortConstraints[PortConstraints["None"] = 1] = "None";
    /** Enables connections with connector  */
    PortConstraints[PortConstraints["Drag"] = 2] = "Drag";
    /** Enables to create the connection when mouse hover on the port  */
    PortConstraints[PortConstraints["Draw"] = 4] = "Draw";
    /** Enables to only connect the target end of connector */
    PortConstraints[PortConstraints["InConnect"] = 8] = "InConnect";
    /** Enables to only connect the source end of connector */
    PortConstraints[PortConstraints["OutConnect"] = 16] = "OutConnect";
    /**Enables or disables the Tooltip  for the ports*/
    PortConstraints[PortConstraints["ToolTip"] = 32] = "ToolTip";
    /** Enables or disables the Tooltip for the ports */
    PortConstraints[PortConstraints["InheritTooltip"] = 64] = "InheritTooltip";
    /** Enables all constraints */
    PortConstraints[PortConstraints["Default"] = 24] = "Default";
})(PortConstraints || (PortConstraints = {}));
/**
 * Defines the context menu click
 * contextMenuClick - Sets the context menu click as contextMenuClick
 */
export var contextMenuClick = 
/** contextMenuClick - Sets the context menu click as contextMenuClick */
'contextMenuClick';
/**
 * Defines the context menu open
 * contextMenuOpen - Sets the context menu open as contextMenuOpen
 */
export var contextMenuOpen = 
/** contextMenuOpen - Sets the context menu open as contextMenuOpen */
'contextMenuOpen';
/**
 * Defines the context menu Before Item Render
 * contextMenuBeforeItemRender - Sets the context menu open as contextMenuBeforeItemRender
 */
export var contextMenuBeforeItemRender = 
/** contextMenuBeforeItemRender - Sets the context menu open as contextMenuBeforeItemRender */
'contextMenuBeforeItemRender';
/**
 * Defines the visibility of the control points in the Bezier connector
 */
export var ControlPointsVisibility;
(function (ControlPointsVisibility) {
    /** None - Hides all the control points of the Bezier connector*/
    ControlPointsVisibility[ControlPointsVisibility["None"] = 1] = "None";
    /** Source - Shows the source control point*/
    ControlPointsVisibility[ControlPointsVisibility["Source"] = 2] = "Source";
    /** Target - Shows the target control point*/
    ControlPointsVisibility[ControlPointsVisibility["Target"] = 4] = "Target";
    /** Intermediate - Shows the intermediate control points*/
    ControlPointsVisibility[ControlPointsVisibility["Intermediate"] = 8] = "Intermediate";
    /** All - Shows all the control points of the Bezier connector*/
    ControlPointsVisibility[ControlPointsVisibility["All"] = 14] = "All";
})(ControlPointsVisibility || (ControlPointsVisibility = {}));
export var BezierSmoothness;
(function (BezierSmoothness) {
    /** Disable all smoothness Constraints. */
    BezierSmoothness[BezierSmoothness["None"] = 0] = "None";
    /** Enables the  SymmetricAngle for a bezier segment to the angle between the control point as same. */
    BezierSmoothness[BezierSmoothness["SymmetricAngle"] = 2] = "SymmetricAngle";
    /** Enables the SymmetricDistance for bezier segment to the distance between the control point as same. */
    BezierSmoothness[BezierSmoothness["SymmetricDistance"] = 4] = "SymmetricDistance";
    /** Enables the symmetric for bezier segment to the distance and angle between the control point as same. */
    BezierSmoothness[BezierSmoothness["Default"] = 6] = "Default";
})(BezierSmoothness || (BezierSmoothness = {}));
