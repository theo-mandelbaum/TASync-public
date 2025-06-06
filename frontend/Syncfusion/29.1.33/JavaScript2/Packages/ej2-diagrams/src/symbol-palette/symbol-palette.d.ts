import { Component, ChildProperty } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, ModuleDeclaration } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { NodeModel, ConnectorModel, TextDecoration } from '../diagram/index';
import { IPaletteExpandArgs } from '../diagram/index';
import { BpmnDiagrams } from '../diagram/index';
import { DiagramElement, MarginModel, PointModel } from '../diagram/index';
import { SymbolPaletteModel, SymbolPreviewModel, PaletteModel, SymbolDragSizeModel } from './symbol-palette-model';
import { TextWrap, TextOverflow, IPaletteSelectionChangeArgs } from '../diagram/index';
import { Tooltip } from '@syncfusion/ej2-popups';
/**
 * A palette allows to display a group of related symbols and it textually annotates the group with its header.
 */
export declare class Palette extends ChildProperty<Palette> {
    /**
     * Defines the unique id of a symbol group
     *
     * @default ''
     */
    id: string;
    /**
     * Sets the height of the symbol group
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    height: number;
    /**
     * Sets whether the palette items to be expanded or not
     *
     * @default true
     */
    expanded: boolean;
    /**
     * Defines the content of the symbol group
     *
     * @default ''
     */
    iconCss: string;
    /**
     * Defines the title of the symbol group
     *
     * @default ''
     */
    title: string;
    /**
     * Defines the collection of predefined symbols
     *
     * @aspType object
     */
    symbols: (NodeModel | ConnectorModel)[];
    /** @private */
    isInteraction: boolean;
    constructor(parent: any, propName: string, defaultValue: Object, isArray?: boolean);
}
/**
 * customize the drag size of the individual palette items.
 */
export declare class SymbolDragSize extends ChildProperty<SymbolDragSize> {
    /**
     * Sets the drag width of the symbols
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    width: number;
    /**
     * Sets the drag height of the symbols
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    height: number;
}
/**
 * customize the preview size and position of the individual palette items.
 */
export declare class SymbolPreview extends ChildProperty<SymbolPreview> {
    /**
     * Sets the preview width of the symbols
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    width: number;
    /**
     * Sets the preview height of the symbols
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    height: number;
    /**
     * Defines the distance to be left between the cursor and symbol
     *
     * @default {}
     */
    offset: PointModel;
}
/**
 * Represents the Symbol Palette Component.
 * ```html
 * <div id="symbolpalette"></div>
 * <script>
 *  var palette = new SymbolPalatte({ allowDrag:true });
 *  palette.appendTo("#symbolpalette");
 * </script>
 * ```
 */
/**
 * The symbol palette control allows to predefine the frequently used nodes and connectors
 * and to drag and drop those nodes/connectors to drawing area
 */
export declare class SymbolPalette extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Configures the key, when it pressed the symbol palette will be focused
     *
     * @default 'S'
     */
    accessKey: string;
    /**
     * Defines the width of the symbol palette
     *
     * @default '100%'
     */
    width: string | number;
    /**
     * Defines the height of the symbol palette
     *
     * @default '100%'
     */
    height: string | number;
    /**
     * Defines the collection of symbol groups
     *
     * @default []
     */
    palettes: PaletteModel[];
    /**
     * Defines the size, appearance and description of a symbol
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    /**
     * ```html
     * <div id="symbolpalette"></div>
     *  ```
     * ```typescript
     * let palette: SymbolPalette = new SymbolPalette({
     *   expandMode: 'Multiple',
     *   palettes: [
     *       { id: 'flow', expanded: false, symbols: getFlowShapes(), title: 'Flow Shapes' },
     *   ],
     *   width: '100%', height: '100%', symbolHeight: 50, symbolWidth: 50,
     *   symbolPreview: { height: 100, width: 100 },
     *   enableSearch: true,
     *   getNodeDefaults: setPaletteNodeDefaults,
     *   symbolMargin: { left: 12, right: 12, top: 12, bottom: 12 },
     *   getSymbolInfo: (symbol: NodeModel): SymbolInfo => {
     *       return { fit: true };
     *   }
     * });
     * palette.appendTo('#symbolpalette');
     * export function getFlowShapes(): NodeModel[] {
     *   let flowShapes: NodeModel[] = [
     *       { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' }, style: { strokeWidth: 2 } },
     *       { id: 'Process', shape: { type: 'Flow', shape: 'Process' }, style: { strokeWidth: 2 } },
     *       { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' }, style: { strokeWidth: 2 } }
     *   ];
     *   return flowShapes;
     * }
     * function setPaletteNodeDefaults(node: NodeModel): void {
     * if (node.id === 'Terminator' || node.id === 'Process') {
     *   node.width = 130;
     *   node.height = 65;
     * } else {
     *   node.width = 50;
     *   node.height = 50;
     * }
     * node.style.strokeColor = '#3A3A3A';
     * }
     * ```
     *
     * @deprecated
     */
    getSymbolInfo: Function | string;
    /**
     * Defines the size, appearance and description of a symbol
     *
     */
    symbolInfo: SymbolInfo;
    /**
     * Defines the symbols to be added in search palette
     *
     * @aspDefaultValueIgnore
     * @default undefined
     * @deprecated
     */
    filterSymbols: Function | string;
    /**
     * Defines the symbols to be added in search palette
     *
     */
    ignoreSymbolsOnSearch: string[];
    /**
     * Defines the content of a symbol
     *
     * @aspDefaultValueIgnore
     * @default undefined
     * @deprecated
     */
    getSymbolTemplate: Function | string;
    /**
     * Defines the width of the symbol
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    symbolWidth: number;
    /**
     * Defines the height of the symbol
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    symbolHeight: number;
    /**
     * Defines the space to be left around a symbol
     *
     * @default {left:10,right:10,top:10,bottom:10}
     */
    symbolMargin: MarginModel;
    /**
     * Defines whether the symbols can be dragged from palette or not
     *
     * @default true
     */
    allowDrag: boolean;
    /**
     * Defines the size and position of the symbol preview
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    symbolPreview: SymbolPreviewModel;
    /**
     * Defines the size of a drop symbol
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    symbolDragSize: SymbolDragSizeModel;
    /**
     * Enables/Disables search option in symbol palette
     *
     * @default false
     */
    enableSearch: boolean;
    /**
     * Enables/Disables animation when the palette header is expanded/collapsed
     *
     */
    enableAnimation: boolean;
    /**
     * Defines how many palettes can be at expanded mode at a time
     *
     * @default 'Multiple'
     * @aspDefaultValueIgnore
     * @isEnumeration true
     */
    expandMode: ExpandMode;
    /**
     * Triggers after the selection changes in the symbol palette
     *
     * @event
     */
    paletteSelectionChange: EmitType<IPaletteSelectionChangeArgs>;
    /**
     * Triggers when the icon is expanded
     *
     * @event
     */
    paletteExpanding: EmitType<IPaletteExpandArgs>;
    /**
     * `bpmnModule` is used to add built-in BPMN Shapes to diagrams
     *
     * @private
     */
    bpmnModule: BpmnDiagrams;
    /**
     * Helps to return the default properties of node
     *
     * @deprecated
     */
    getNodeDefaults: Function | string;
    /**
     * Helps to return the default properties of node
     *
     */
    nodeDefaults: NodeModel;
    /**
     * Helps to return the default properties of connector
     *
     * @deprecated
     */
    getConnectorDefaults: Function | string;
    /**
     * Helps to return the default properties of connectors
     *
     */
    connectorDefaults: ConnectorModel;
    /** @private */
    selectedSymbols: NodeModel | ConnectorModel;
    /**   @private  */
    symbolTable: {};
    /**   @private  */
    childTable: {};
    private diagramRenderer;
    private svgRenderer;
    private accordionElement;
    private highlightedSymbol;
    private selectedSymbol;
    private info;
    private oldObject;
    private timer;
    private draggable;
    private laneTable;
    private isExpand;
    private isExpandMode;
    private isMethod;
    private paletteid;
    private checkOnRender;
    private l10n;
    private currentPosition;
    symbolTooltipObject: Tooltip;
    /**
     *  Constructor for creating the symbol palette Component
     *
     * @param {SymbolPaletteModel} options The symbol palette model.
     * @param {string | HTMLElement} element The symbol palette element.
     */
    constructor(options?: SymbolPaletteModel, element?: Element);
    /**
     * Refreshes the panel when the symbol palette properties are updated\
     *
     * @returns {  void}    Refreshes the panel when the symbol palette properties are updated .\
     * @param {SymbolPaletteModel} newProp - Defines the new values of the changed properties.
     * @param {SymbolPaletteModel} oldProp - Defines the old values of the changed properties.
     */
    onPropertyChanged(newProp: SymbolPaletteModel, oldProp: SymbolPaletteModel): void;
    /**
     * updateBlazorProperties method\
     *
     * @returns {void}    updateBlazorProperties method .\
     * @param {SymbolPaletteModel} newProp - provide the scale value.
     *
     * @private
     */
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string}  Get the properties to be maintained in the persisted state.
     */
    getPersistData(): string;
    /**
     * Initializes the values of private members.
     *
     * @returns {void}  Initializes the values of private members.
     * @private
     */
    protected preRender(): void;
    /**
     * EJ2-61531- Localization support for the symbol palette search box placeholder.
     * @returns {Object} defaultLocale
     */
    private defaultLocale;
    /**
     * Renders the rulers.
     *
     * @returns {void}  Renders the rulers.
     * @private
     */
    render(): void;
    /**
     * Core method to return the component name.
     *
     * @returns {string}  Core method to return the component name.
     * @private
     */
    getModuleName(): string;
    /**
     * To provide the array of modules needed for control rendering.
     *
     * @returns {ModuleDeclaration[]}  To provide the array of modules needed for control rendering .
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     *To destroy the ruler
     *
     * @returns {void} To destroy the ruler
     */
    destroy(): void;
    /**
     * Add particular palettes to symbol palette at runtime.\
     *
     * @returns {  void}    Refreshes the ruler when the Ruler properties are updated .\
     * @param { PaletteModel[]} palettes -Defines the collection of palettes to be added.
     */
    addPalettes(palettes: PaletteModel[]): void;
    /**
     * removePalette method\
     *
     * @returns {void}    removePalette method .\
     * @param {string} paletteId - provide the scale value.
     *
     * @private
     */
    removePalette(paletteId: string): void;
    /**
     * Remove particular palettes to symbol palette at runtime \
     *
     * @returns {void}   Remove particular palettes to symbol palette at runtime .\
     * @param {string[]} palettes - provide the scale value.
     */
    removePalettes(palettes: string[]): void;
    /**
     * Method to initialize the items in the symbols \
     *
     * @returns {void}    Method to initialize the items in the symbols .\
     * @param {PaletteModel} symbolGroup - provide the scale value.
     *
     */
    private initSymbols;
    private renderPalette;
    /**
     * Used to add the palette item as nodes or connectors in palettes \
     *
     * @returns {void}    Used to add the palette item as nodes or connectors in palettes .\
     * @param {string} paletteName - provide the scale value.
     * @param {NodeModel | ConnectorModel} paletteSymbol - provide the scale value.
     * @param {boolean} isChild - provide the scale value.
     */
    addPaletteItem(paletteName: string, paletteSymbol: NodeModel | ConnectorModel, isChild?: boolean): void;
    /**
     * Used to remove the palette item as nodes or connectors in palettes \
     *
     * @returns {void}    Used to remove the palette item as nodes or connectors in palettes .\
     * @param {string} paletteName - provide the scale value.
     * @param {string} symbolId - provide the scale value.
     */
    removePaletteItem(paletteName: string, symbolId: string): void;
    private prepareSymbol;
    private getContainer;
    /**
     * Feature [EJ2- 47318] - Support for the change of the symbol description
     * Feature [EJ2- 50705] - Support to add margin between the text and symbols
     */
    private getSymbolDescription;
    private renderSymbols;
    private getSymbolPreview;
    private measureAndArrangeSymbol;
    private updateSymbolSize;
    private getSymbolContainer;
    private getGroupParent;
    private getHtmlSymbol;
    private getSymbolSize;
    private getMousePosition;
    private hoverElement;
    /** Gets the default content of the Tooltip
     *
     * @returns {string | HTMLElement} Returns the default content of the Tooltip.\
     * @param {object} obj - provide the Symbol object.
     */
    private getContent;
    /**
     * Initialize the basic properties of Toolip object
     *
     * @returns {Tooltip} Returns the basic properties of Toolip object.\
     * @param {NodeModel | ConnectorModel} element - provide the Symbol object.
     */
    private initTooltip;
    /**Method to update Tooltip Content
     *
     * @returns { Tooltip } Returns the basic properties of Toolip object.\
     *
     * @param {TooltipModel} tooltip - provide the Symbol object.
     * @param {Tooltip} tooltipObject - provide the Symbol object.
     */
    private updateTooltipContent;
    /**
     * To open the Tooltip element relevant to the target and relative mode
     *
     * @returns { void} opens the Tooltip element relevant to the target and relative mode.\
     *
     * @param {PointModel} mousePosition - provide the mousePosition value.
     * @param {boolean} elementOver - provide the elementOver value.
     * @param {boolean} isSearchSymbol - provide the isSearchSymbol value.
     */
    private elementEnter;
    private mouseMove;
    /**
     * When Mouse pointer leaves the symbol palette object Mouse leave event is called and closes Tooltip
     * @returns {void} Function to close symbol tooltip on mouse leave.
     */
    private elementLeave;
    /** @private
     * @returns {void} Handles mouse leave events
     * @param {PointerEvent} evt - provide event name
     */
    mouseLeave(evt: PointerEvent): void;
    private mouseUp;
    private keyUp;
    private mouseDown;
    private keyDown;
    private initDraggable;
    private helper;
    private dragStart;
    private dragStop;
    private scaleSymbol;
    private scaleChildren;
    private measureChild;
    private scaleGroup;
    private refreshPalettes;
    private updatePalettes;
    private createTextbox;
    private getFilterSymbol;
    private searchPalette;
    private createSearchPalette;
    private wireEvents;
    private unWireEvents;
}
/**
 * Defines the size and description of a symbol
 */
export interface SymbolInfo {
    /**
     * Defines the width of the symbol to be drawn over the palette
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    width?: number;
    /**
     * Defines the height of the symbol to be drawn over the palette
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    height?: number;
    /**
     * Defines whether the symbol has to be fit inside the size, that is defined by the symbol palette
     *
     * @default true
     */
    fit?: boolean;
    /**
     * Define the template of the symbol that is to be drawn over the palette
     *
     * @default null
     */
    template?: DiagramElement;
    /**
     * Define the text to be displayed and how that is to be handled.
     *
     * @default null
     */
    description?: SymbolDescription;
    /**
     * Define the text to be displayed when mouse hover on the shape.
     *
     * @default ''
     */
    tooltip?: string;
}
/**
 * Defines the textual description of a symbol
 */
export interface SymbolDescription {
    /**
     * Defines the symbol description
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    text?: string;
    /**
     * Defines how to handle the text when its size exceeds the given symbol size
     * * Wrap - Wraps the text to next line, when it exceeds its bounds
     * * Ellipsis - It truncates the overflown text and represents the clipping with an ellipsis
     * * Clip - It clips the overflow text
     *
     * @default ellipsis
     */
    overflow?: TextOverflow;
    /**
     * Defines how to wrap the text
     * * WrapWithOverflow - Wraps the text so that no word is broken
     * * Wrap - Wraps the text and breaks the word, if necessary
     * * NoWrap - Text will no be wrapped
     *
     * @default Wrap
     */
    wrap?: TextWrap;
    /**
     * Sets the font color of a text
     *
     * @default 'black'
     */
    color?: string;
    /**
     * Sets the fill color of a shape/path
     *
     * @default 'white'
     */
    fill?: string;
    /**
     * Sets the font type of a text
     *
     * @default 'Arial'
     */
    fontFamily?: string;
    /**
     * Defines the font size of a text
     *
     * @default 12
     */
    fontSize?: number;
    /**
     * Enables/disables the bold style of text
     *
     * @default false
     */
    bold?: boolean;
    /**
     * Enables/disables the italic style of text
     *
     * @default false
     */
    italic?: boolean;
    /**
     * Defines how the text should be decorated. For example, with underline/over line
     * * Overline - Decorates the text with a line above the text
     * * Underline - Decorates the text with an underline
     * * LineThrough - Decorates the text by striking it with a line
     * * None - Text will not have any specific decoration
     *
     * @default 'None'
     */
    textDecoration?: TextDecoration;
    /**
     *
     * Sets/Gets the margin of the element
     * The margin top and bottom alone works for the symbol description
     */
    margin?: MarginModel;
}
