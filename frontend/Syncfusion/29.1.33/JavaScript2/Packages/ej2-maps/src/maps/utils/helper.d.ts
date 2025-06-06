import { Maps, FontModel, BorderModel, LayerSettings } from '../../index';
import { Alignment, LayerSettingsModel, ZoomToolbarTooltipSettingsModel } from '../index';
import { MarkerType, IShapeSelectedEventArgs, ITouches, IShapes, SelectionSettingsModel, IMarkerRenderingEventArgs, MarkerSettings, MarkerClusterData } from '../index';
import { ExportType } from '../utils/enum';
/**
 * Specifies the size information of an element.
 */
export declare class Size {
    /**
     * Specifies the height of an element.
     */
    height: number;
    /**
     * Specifies the width of an element.
     */
    width: number;
    constructor(width: number, height: number);
}
/**
 * To find number from string.
 *
 * @param {string} value Specifies the value
 * @param {number} containerSize Specifies the container size
 * @returns {number} Returns the number
 * @private
 */
export declare function stringToNumber(value: string, containerSize: number): number;
/**
 * Method to calculate the width and height of the maps.
 *
 * @param {Maps} maps Specifies the maps instance
 * @returns {void}
 * @private
 */
export declare function calculateSize(maps: Maps): Size;
/**
 * Method to create svg for maps.
 *
 * @param {Maps} maps Specifies the map instance
 * @returns {void}
 * @private
 */
export declare function createSvg(maps: Maps): void;
/**
 * Method to get the mouse position.
 *
 * @param {number} pageX - Specifies the pageX.
 * @param {number} pageY - Specifies the pageY.
 * @param {Element} element - Specifies the element.
 * @returns {MapLocation} - Returns the location.
 * @private
 */
export declare function getMousePosition(pageX: number, pageY: number, element: Element): MapLocation;
/**
 * Method to convert degrees to radians.
 *
 * @param {number} deg Specifies the degree value
 * @returns {number} Returns the number
 * @private
 */
export declare function degreesToRadians(deg: number): number;
/**
 * Convert radians to degrees method.
 *
 * @param {number} radian Specifies the radian value
 * @returns {number} Returns the number
 * @private
 */
export declare function radiansToDegrees(radian: number): number;
/**
 * Method for converting from latitude and longitude values to points.
 *
 * @param {number} latitude - Specifies the latitude.
 * @param {number} longitude - Specifies the longitude.
 * @param {number} factor - Specifies the factor.
 * @param {LayerSettings} layer - Specifies the layer settings.
 * @param {Maps} mapModel - Specifies the maps.
 * @returns {Point} - Returns the point values.
 * @private
 */
export declare function convertGeoToPoint(latitude: number, longitude: number, factor: number, layer: LayerSettings, mapModel: Maps): Point;
/**
 * @param {Maps} maps - Specifies the map control.
 * @param {number} factor - Specifies the factor.
 * @param {LayerSettings} currentLayer - Specifies the current layer.
 * @param {Coordinate} markerData - Specifies the marker data.
 * @returns {string} - Returns the path.
 * @private
 */
export declare function calculatePolygonPath(maps: Maps, factor: number, currentLayer: LayerSettings, markerData: Coordinate[]): string;
/**
 * Converting tile latitude and longitude to point.
 *
 * @param {MapLocation} center Specifies the map center location
 * @param {number} zoomLevel Specifies the zoom level
 * @param {MapLocation} tileTranslatePoint Specifies the tile translate point
 * @param {boolean} isMapCoordinates Specifies the boolean value
 * @returns {MapLocation} Returns the location value
 * @private
 */
export declare function convertTileLatLongToPoint(center: MapLocation, zoomLevel: number, tileTranslatePoint: MapLocation, isMapCoordinates: boolean): MapLocation;
/**
 * Method for calculate x point.
 *
 * @param {Maps} mapObject - Specifies the maps.
 * @param {number} val - Specifies the value.
 * @returns {number} - Returns the number.
 * @private
 */
export declare function xToCoordinate(mapObject: Maps, val: number): number;
/**
 * Method for calculate y point.
 *
 * @param {Maps} mapObject - Specifies the maps.
 * @param {number} val - Specifies the value.
 * @returns {number} - Returns the number.
 * @private
 */
export declare function yToCoordinate(mapObject: Maps, val: number): number;
/**
 * Method for calculate aitoff projection.
 *
 * @param {number} x - Specifies the x value.
 * @param {number} y - Specifies the y value.
 * @returns {Point} - Returns the point value.
 * @private
 */
export declare function aitoff(x: number, y: number): Point;
/**
 * Method to round the number.
 *
 * @param {number} a - Specifies the a value
 * @param {number} b - Specifies the b value
 * @returns {number} - Returns the number
 * @private
 */
export declare function roundTo(a: number, b: number): number;
/**
 *
 * @param {number} x - Specifies the x value
 * @returns {number} - Returns the number
 * @private
 */
export declare function sinci(x: number): number;
/**
 *
 * @param {number} a - Specifies the a value
 * @returns {number} - Returns the number
 * @private
 */
export declare function acos(a: number): number;
/**
 * Method to calculate bound.
 *
 * @param {number} value Specifies the value
 * @param {number} min Specifies the minimum value
 * @param {number} max Specifies the maximum value
 * @returns {number} Returns the value
 * @private
 */
export declare function calculateBound(value: number, min: number, max: number): number;
/**
 * To trigger the download element.
 *
 * @param {string} fileName Specifies the file name
 * @param {ExportType} type Specifies the type
 * @param {string} url Specifies the url
 * @param {boolean} isDownload Specifies whether download a file.
 * @returns {void}
 * @private
 */
export declare function triggerDownload(fileName: string, type: ExportType, url: string, isDownload: boolean): void;
/**
 * Specifies the information of the position of the point in maps.
 */
export declare class Point {
    /**
     * Defines the x position in pixels.
     */
    x: number;
    /**
     * Defines the y position in pixels.
     */
    y: number;
    constructor(x: number, y: number);
}
/**
 * Specifies the position of the legend on the map, with options to set the
 * position values as percentages. The legend is placed relative to the Maps,
 * ensuring responsiveness.
 */
export declare class RelativePoint {
    /**
     * Defines the horizontal position of the legend as a percentage.
     */
    x: string;
    /**
     * Defines the vertical position of the legend as a percentage.
     */
    y: string;
    constructor(x: string, y: string);
}
/**
 * Defines the latitude and longitude values that define a map location.
 */
export declare class Coordinate {
    /**
     * Gets or sets the latitude of a coordinate on a map.
     */
    latitude: number;
    /**
     * Gets or sets the longitude of a coordinate on a map.
     */
    longitude: number;
    constructor(latitude: number, longitude: number);
}
/**
 * Map internal class for min and max
 *
 */
export declare class MinMax {
    min: number;
    max: number;
    constructor(min: number, max: number);
}
/**
 * Map internal class locations
 */
export declare class GeoLocation {
    latitude: MinMax;
    longitude: MinMax;
    constructor(latitude: MinMax, longitude: MinMax);
}
/**
 * Function to measure the height and width of the text.
 *
 * @param  {string} text Specifies the text
 * @param  {FontModel} font Specifies the font
 * @returns {Size} Returns the size
 * @private
 */
export declare function measureText(text: string, font: FontModel): Size;
/**
 * @param {string} text - Specifies the text.
 * @param {FontModel} font - Specifies the font.
 * @returns {Size} - Returns the size of text.
 * @private
 */
export declare function measureTextElement(text: string, font: FontModel): Size;
/**
 * Internal use of text options.
 *
 * @private
 */
export declare class TextOption {
    anchor: string;
    id: string;
    transform: string;
    x: number;
    y: number;
    text: string | string[];
    baseLine: string;
    constructor(id?: string, x?: number, y?: number, anchor?: string, text?: string | string[], transform?: string, baseLine?: string);
}
/**
 * Internal use of path options.
 *
 * @private
 */
export declare class PathOption {
    id: string;
    fill: string;
    stroke: string;
    ['stroke-width']: number;
    ['stroke-dasharray']: string;
    ['stroke-opacity']: number;
    ['fill-opacity']: number;
    d: string;
    constructor(id: string, fill: string, width: number, color: string, fillOpacity?: number, strokeOpacity?: number, dashArray?: string, d?: string);
}
/** @private */
export declare class ColorValue {
    r: number;
    g: number;
    b: number;
    constructor(r?: number, g?: number, b?: number);
}
/**
 * Internal use of rectangle options.
 *
 * @private
 */
export declare class RectOption extends PathOption {
    x: number;
    y: number;
    height: number;
    width: number;
    rx: number;
    ry: number;
    transform: string;
    ['stroke-dasharray']: string;
    constructor(id: string, fill: string, border: BorderModel, fillOpacity: number, rect: Rect, rx?: number, ry?: number, transform?: string, dashArray?: string);
}
/**
 * Internal use of circle options.
 *
 * @private
 */
export declare class CircleOption extends PathOption {
    cy: number;
    cx: number;
    r: number;
    ['stroke-dasharray']: string;
    constructor(id: string, fill: string, border: BorderModel, fillOpacity: number, cx: number, cy: number, r: number, dashArray: string);
}
/**
 * Internal use of polygon options.
 *
 * @private
 */
export declare class PolygonOption extends PathOption {
    points: string;
    constructor(id: string, points: string, fill: string, width: number, color: string, fillOpacity?: number, strokeOpacity?: number, dashArray?: string);
}
/**
 * Internal use of polyline options.
 *
 * @private
 */
export declare class PolylineOption extends PolygonOption {
    constructor(id: string, points: string, fill: string, width: number, color: string, fillOpacity?: number, strokeOpacity?: number, dashArray?: string);
}
/**
 * Internal use of line options.
 *
 * @private
 */
export declare class LineOption extends PathOption {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    constructor(id: string, line: Line, fill: string, width: number, color: string, fillOpacity?: number, strokeOpacity?: number, dashArray?: string);
}
/**
 * Internal use of line.
 *
 * @property {number} Line - Specifies the line class
 * @private
 */
export declare class Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    constructor(x1: number, y1: number, x2: number, y2: number);
}
/**
 * Internal use of map location type.
 *
 * @private
 */
export declare class MapLocation {
    /**
     * To specify x value
     */
    x: number;
    /**
     * To specify y value
     */
    y: number;
    constructor(x: number, y: number);
}
/**
 * Internal use of type rect.
 *
 * @private
 */
export declare class Rect {
    x: number;
    y: number;
    height: number;
    width: number;
    constructor(x: number, y: number, width: number, height: number);
}
/**
 * Defines the pattern unit types for drawing the patterns in maps.
 *
 * @private
 */
export declare type patternUnits = 
/** Specifies the user space for maps. */
'userSpaceOnUse' | 
/** Specifies the bounding box for the object. */
'objectBoundingBox';
/**
 * Internal use for pattern creation.
 *
 * @property {PatternOptions} PatternOptions - Specifies the pattern option class.
 * @private
 */
export declare class PatternOptions {
    id: string;
    patternUnits: patternUnits;
    patternContentUnits: patternUnits;
    patternTransform: string;
    x: number;
    y: number;
    width: number;
    height: number;
    href: string;
    constructor(id: string, x: number, y: number, width: number, height: number, patternUnits?: patternUnits, patternContentUnits?: patternUnits, patternTransform?: string, href?: string);
}
/**
 * Internal rendering of text.
 *
 * @param {TextOption} option Specifies the text option
 * @param {FontModel} style Specifies the style
 * @param {string} color Specifies the color
 * @param {HTMLElement | Element} parent Specifies the parent element
 * @param {boolean} isMinus Specifies the boolean value
 * @returns {Element} Returns the html object
 * @private
 */
export declare function renderTextElement(option: TextOption, style: FontModel, color: string, parent: HTMLElement | Element, isMinus?: boolean): Element;
/**
 * @param {HTMLCollection} element - Specifies the html collection
 * @param {string} markerId - Specifies the marker id
 * @param {object} data - Specifies the data
 * @param {number} index - Specifies the index
 * @param {Maps} mapObj - Specifies the map object
 * @param {string} templateType - Specifies the template type
 * @returns {HTMLElement} - Returns the html element
 * @private
 */
export declare function convertElement(element: HTMLCollection, markerId: string, data: object, index: number, mapObj: Maps, templateType: string): HTMLElement;
/**
 *
 * @param {string} value - Specifies the value
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {string} - Returns the string value
 * @private
 */
export declare function formatValue(value: string, maps: Maps): string;
/**
 *
 * @param {string} stringTemplate - Specifies the template
 * @param {string} format - Specifies the format
 * @param {object} data - Specifies the data
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {string} - Returns the string value
 * @private
 */
export declare function convertStringToValue(stringTemplate: string, format: string, data: object, maps: Maps): string;
/**
 *
 * @param {Element} element - Specifies the element
 * @param {string} labelId - Specifies the label id
 * @param {object} data - Specifies the data
 * @returns {HTMLElement} - Returns the html element
 * @private
 */
export declare function convertElementFromLabel(element: Element, labelId: string, data: object): HTMLElement;
/**
 *
 * @param {MarkerType} shape - Specifies the shape
 * @param {string} imageUrl - Specifies the image url
 * @param {Point} location - Specifies the location
 * @param {string} markerID - Specifies the marker id
 * @param {any} shapeCustom - Specifies the shape custom
 * @param {Element} markerCollection - Specifies the marker collection
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawSymbols(shape: MarkerType, imageUrl: string, location: Point, markerID: string, shapeCustom: any, markerCollection: Element, maps: Maps): Element;
/**
 *
 * @param {object} data - Specifies the data
 * @param {string} value - Specifies the value
 * @returns {any} - Returns the data
 * @private
 */
export declare function getValueFromObject(data: object, value: string): any;
/**
 *
 * @param {IMarkerRenderingEventArgs} eventArgs - Specifies the event arguments
 * @param {object} data - Specifies the data
 * @returns {IMarkerRenderingEventArgs} - Returns the arguments
 * @private
 */
export declare function markerColorChoose(eventArgs: IMarkerRenderingEventArgs, data: object): IMarkerRenderingEventArgs;
/**
 *
 * @param {IMarkerRenderingEventArgs} eventArgs - Specifies the event arguments
 * @param {object} data - Specifies the data
 * @returns {IMarkerRenderingEventArgs} - Returns the arguments
 * @private
 */
export declare function markerShapeChoose(eventArgs: IMarkerRenderingEventArgs, data: object): IMarkerRenderingEventArgs;
/**
 *
 * @param {LayerSettings} currentLayer - Specifies the current layer
 * @param {HTMLElement | Element} markerTemplate - Specifies the marker template
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {number} layerIndex - Specifies the layer index
 * @param {number} markerIndex - Specifies the marker index
 * @param {Element} markerCollection - Specifies the marker collection
 * @param {Element} layerElement - Specifies the layer element
 * @param {boolean} check - Specifies the boolean value
 * @param {boolean} zoomCheck - Specifies the boolean value
 * @param {any} translatePoint - Specifies the data
 * @param {boolean} allowInnerClusterSetting - Specifies the boolean value
 * @returns {boolean} -Returns boolean for cluster completion
 * @private
 */
export declare function clusterTemplate(currentLayer: LayerSettings, markerTemplate: HTMLElement | Element, maps: Maps, layerIndex: number, markerIndex: number, markerCollection: Element, layerElement: Element, check: boolean, zoomCheck: boolean, translatePoint?: any, allowInnerClusterSetting?: boolean): boolean;
/**
 * @param {Maps} maps - Specifies the map control.
 * @param {number} currentZoomFactor - Specifies the current zoom factor.
 * @param {number} layerIndex - Specifies the layer index.
 * @param {number} index - Specifies the index.
 * @param {number} indexCollection - Specifies the index Collection.
 * @returns {void}
 * @private
 */
export declare function markerClusterListHandler(maps: Maps, currentZoomFactor: number, layerIndex: number, index: number, indexCollection: number[]): void;
/**
 * @param {Element} tempElement - Specifies the temp element.
 * @param {ClientRect} markerBounds - Specifies the marker bounds.
 * @param {ClientRect} colloideBounds - Specifies the colloide Bounds.
 * @param {number[]} indexCollection - Specifies the index collection.
 * @param {number} p - Specifies the p.
 * @returns {void}
 * @private
 */
export declare function markerBoundsComparer(tempElement: Element, markerBounds: ClientRect, colloideBounds: ClientRect[], indexCollection: number[], p: number): void;
/**
 *
 * @param {MarkerClusterData[]} sameMarkerData - Specifies the marker data
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
export declare function mergeSeparateCluster(sameMarkerData: MarkerClusterData[], maps: Maps): void;
/**
 *
 * @param {MarkerClusterData[]} sameMarkerData - Specifies the marker data
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {Element | HTMLElement} markerElement - Specifies the marker element
 * @param {boolean} isDom - Specifies the boolean value
 * @returns {void}
 * @private
 */
export declare function clusterSeparate(sameMarkerData: MarkerClusterData[], maps: Maps, markerElement: Element | HTMLElement, isDom?: boolean): void;
/**
 *
 * @param {IMarkerRenderingEventArgs} eventArgs - Specifies the arguments
 * @param {MarkerSettings} markerSettings - Specifies the marker settings
 * @param {any[]} markerData - Specifies the marker data
 * @param {number} dataIndex - Specifies the data index
 * @param {Point} location - Specifies the location
 * @param {Point} transPoint - Specifies the translate point
 * @param {string} markerID - Specifies the marker id
 * @param {Point} offset - Specifies the offset value
 * @param {number} scale - Specifies the scale value
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {Element} markerCollection - Specifies the marker collection
 * @returns {Element} - Returns the element
 * @private
 */
export declare function marker(eventArgs: IMarkerRenderingEventArgs, markerSettings: MarkerSettings, markerData: any[], dataIndex: number, location: Point, transPoint: Point, markerID: string, offset: Point, scale: number, maps: Maps, markerCollection: Element): Element;
/**
 *
 * @param {IMarkerRenderingEventArgs} eventArgs - Specifies the arguments
 * @param {any} templateFn - Specifies the template function
 * @param {string} markerID - Specifies the marker id
 * @param {any} data - Specifies the data
 * @param {number} markerIndex - Specifies the marker index
 * @param {HTMLElement} markerTemplate - Specifies the marker template element
 * @param {Point} location - Specifies the location
 * @param {Point} transPoint - Specifies the translate point.
 * @param {number} scale - Specifies the scale value
 * @param {Point} offset - Specifies the offset value
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {HTMLElement} - Returns the html element
 * @private
 */
export declare function markerTemplate(eventArgs: IMarkerRenderingEventArgs, templateFn: any, markerID: string, data: any, markerIndex: number, markerTemplate: HTMLElement, location: Point, transPoint: Point, scale: number, offset: Point, maps: Maps): HTMLElement;
/**
 * To maintain selection during page resize.
 *
 * @param {string[]} elementId - Specifies the element id
 * @param {Element} elementClass - Specifies the element class
 * @param {Element} element - Specifies the element
 * @param {string} className - Specifies the class name
 * @returns {void}
 * @private
 */
export declare function maintainSelection(elementId: string[], elementClass: Element, element: Element, className: string): void;
/**
 * To maintain toggle state during page resize.
 *
 * @param {string[]} toggledElements - Specifies the list of toggled elements
 * @param {Element} element - Specifies the element id
 * @param {any} styleProperty - Specifies the style properties
 * @returns {void}
 * @private
 */
export declare function maintainToggleSelection(toggledElements: string[], element: Element, styleProperty: any): void;
/**
 * To maintain selection style class.
 *
 * @param {string} id - Specifies the id
 * @param {string} idClass - Specifies the class id
 * @param {string} fill - Specifies the fill
 * @param {string} opacity - Specifies the opactiy
 * @param {string} borderColor - Specifies the border color
 * @param {string} borderWidth - Specifies the border width
 * @param {Maps} maps - Specifies the maps
 * @returns {void}
 * @private
 */
export declare function maintainStyleClass(id: string, idClass: string, fill: string, opacity: string, borderColor: string, borderWidth: string, maps: Maps): void;
/**
 * Internal use of append shape element.
 *
 * @param {Element} shape - Specifies the shape
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function appendShape(shape: Element, element: Element): Element;
/**
 * Internal rendering of Circle.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {CircleOption} options - Specifies the circle options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawCircle(maps: Maps, options: CircleOption, element?: Element): Element;
/**
 * Internal rendering of Rectangle.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {RectOption} options - Specifies the rect options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawRectangle(maps: Maps, options: RectOption, element?: Element): Element;
/**
 * Internal rendering of Path.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the polygon options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawPath(maps: Maps, options: PathOption, element?: Element): Element;
/**
 * Internal rendering of Polygon.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PolygonOption} options - Specifies the polygon options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawPolygon(maps: Maps, options: PolygonOption, element?: Element): Element;
/**
 * Internal rendering of Polyline.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PolylineOption} options - Specifies the poly line options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawPolyline(maps: Maps, options: PolylineOption, element?: Element): Element;
/**
 * Internal rendering of Line.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {LineOption} options - Specifies the line options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawLine(maps: Maps, options: LineOption, element?: Element): Element;
/**
 * Calculate marker shapes.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {MarkerType} shape - Specifies the marker type
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} markerEle - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function calculateShapes(maps: Maps, shape: MarkerType, options: PathOption, size: Size, location: MapLocation, markerEle: Element): Element;
/**
 * Internal rendering of Diamond.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawDiamond(maps: Maps, options: PathOption, size: Size, location: MapLocation, element?: Element): Element;
/**
 * Internal rendering of Triangle.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawTriangle(maps: Maps, options: PathOption, size: Size, location: MapLocation, element?: Element): Element;
/**
 * Internal rendering of Cross.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawCross(maps: Maps, options: PathOption, size: Size, location: MapLocation, element?: Element): Element;
/**
 * Internal rendering of HorizontalLine.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawHorizontalLine(maps: Maps, options: PathOption, size: Size, location: MapLocation, element?: Element): Element;
/**
 * Internal rendering of VerticalLine.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawVerticalLine(maps: Maps, options: PathOption, size: Size, location: MapLocation, element?: Element): Element;
/**
 * Internal rendering of Star.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawStar(maps: Maps, options: PathOption, size: Size, location: MapLocation, element?: Element): Element;
/**
 * Internal rendering of Balloon.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {string} type - Specifies the type.
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawBalloon(maps: Maps, options: PathOption, size: Size, location: MapLocation, type: string, element?: Element): Element;
/**
 * Internal rendering of Pattern.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PatternOptions} options - Specifies the pattern options
 * @param {Element[]} elements - Specifies the elements
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawPattern(maps: Maps, options: PatternOptions, elements: Element[], element?: Element): Element;
/**
 * Method to get specific field and vaues from data.
 *
 * @param {any[]} dataSource - Specifies the data source
 * @param {string[]} fields - Specifies the fields
 * @returns {any[]} - Returns the object
 * @private
 */
export declare function getFieldData(dataSource: any[], fields: string[]): any[];
/**
 * To find the index of dataSource from shape properties.
 *
 * @param {any[]} dataSource - Specifies the data source
 * @param {any} properties - Specifies the properties
 * @param {string} dataPath - Specifies the data path
 * @param {string | string[]} propertyPath - Specifies the property path
 * @param {LayerSettingsModel} layer - Specifies the layer settings
 * @returns {number} - Returns the number
 * @private
 */
export declare function checkShapeDataFields(dataSource: any[], properties: any, dataPath: string, propertyPath: string | string[], layer: LayerSettingsModel): number;
/**
 *
 * @param {string} shapeData - Specifies the shape data
 * @param {string | string[]} shapePropertyPath -  Specifies the shape property path
 * @param {object} shape -  Specifies the shape
 * @returns {string} - Returns the string value
 */
export declare function checkPropertyPath(shapeData: string, shapePropertyPath: string | string[], shape: object): string;
/**
 *
 * @param {MapLocation[]} points - Specifies the location
 * @param {number} start - Specifies the start value
 * @param {number} end - Specifies the end value
 * @returns {MapLocation[]} - Returns the location
 * @private
 */
export declare function filter(points: MapLocation[], start: number, end: number): MapLocation[];
/**
 *
 * @param {number} min - Specifies the min value
 * @param {number} max - Specifies the max value
 * @param {number} value - Specifies the value
 * @param {number} minValue - Specifies the minValue
 * @param {number} maxValue -Specifies the maxValue
 * @returns {number} - Returns the number
 * @private
 */
export declare function getRatioOfBubble(min: number, max: number, value: number, minValue: number, maxValue: number): number;
/**
 * To find the midpoint of the polygon from points.
 *
 * @param {MapLocation[]} points - Specifies the points
 * @param {string} type - Specifies the type
 * @param {string} geometryType - Specified the type of the geometry
 * @returns {any} - Specifies the object
 * @private
 */
export declare function findMidPointOfPolygon(points: MapLocation[], type: string, geometryType?: string): any;
/**
 * Check custom path.
 *
 * @param {any[]} layerData - Specifies the layer data
 * @returns {boolean} - Returns the boolean vlue
 * @private
 */
export declare function isCustomPath(layerData: any[]): boolean;
/**
 * Trim the title text.
 *
 * @param {number} maxWidth - Specifies the maximum width
 * @param {string} text - Specifies the text
 * @param {FontModel} font - Specifies the font
 * @param {number} width - Specifies the width of text
 * @param {boolean} isCanvasMeasure - checks the canvas measure
 * @param {number[]} widthList - Specifies the width list
 * @returns {string} - Returns the string
 * @private
 */
export declare function textTrim(maxWidth: number, text: string, font: FontModel, width?: number, isCanvasMeasure?: boolean, widthList?: number[]): string;
/**
 * Method to calculate x position of title.
 *
 * @param {Rect} location - Specifies the location
 * @param {Alignment} alignment - Specifies the alignment
 * @param {Size} textSize - Specifies the text size
 * @param {string} type - Specifies the type
 * @returns {Point} - Returns the point values
 * @private
 */
export declare function findPosition(location: Rect, alignment: Alignment, textSize: Size, type: string): Point;
/**
 * To remove element by id.
 *
 * @param {string} id - Specifies the id
 * @returns {void}
 * @private
 */
export declare function removeElement(id: string): void;
/**
 * To calculate map center position from pixel values.
 *
 * @param {Maps} mapObject - Specifies the map object
 * @param {LayerSettings} layer - Specifies the layer settings
 * @returns {Point} - Returns the x and y points
 * @private
 */
export declare function calculateCenterFromPixel(mapObject: Maps, layer: LayerSettings): Point;
/**
 * @param {Maps} mapObject - Specifies the map object
 * @param {LayerSettings} layer - Specifies the layer settings
 * @param {boolean} animate - Specifies the boolean value
 * @returns {any} - Returns the object
 * @private
 */
export declare function getTranslate(mapObject: Maps, layer: LayerSettings, animate?: boolean): any;
/**
 * @param {Maps} mapObject - Specifies the map object
 * @param {LayerSettings} layer - Specifies the layer
 * @param {boolean} animate - Specifies the boolean value
 * @returns {any} - Returns the object.
 * @private
 */
export declare function getZoomTranslate(mapObject: Maps, layer: LayerSettings, animate?: boolean): any;
/**
 * To get the html element by specified id.
 *
 * @param {Maps} map - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
export declare function fixInitialScaleForTile(map: Maps): void;
/**
 * To get the html element by specified id.
 *
 * @param {string} id - Specifies the id
 * @returns {Element} - Returns the element
 * @private
 */
export declare function getElementByID(id: string): Element;
/**
 * Function to return the number value for the string value.
 *
 * @param {string | number} marginValue - Specifies the margin value.
 * @returns {number} - Returns the number value.
 * @private
 */
export declare function getProcessedMarginValue(marginValue: string | number): number;
/**
 * To apply internalization.
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {number} value - Specifies the value
 * @returns {string} - Returns the string
 * @private
 */
export declare function Internalize(maps: Maps, value: number): string;
/**
 * Function to compile the template function for maps.
 *
 * @param {string | Function} template - Specifies the template
 * @param {Maps} maps - Specifies the Maps instance.
 * @returns {any} - Returns the template function
 * @private
 */
export declare function getTemplateFunction(template: string | Function, maps: Maps): any;
/**
 * Function to get element from id.
 *
 * @param {string} id - Specifies the id
 * @returns {Element} - Returns the element
 * @private
 */
export declare function getElement(id: string): Element;
/**
 * Function to get shape data using target id.
 *
 * @param {string} targetId - Specifies the target id
 * @param {Maps} map - Specifies the instance of the maps
 * @returns {object} - Returns the object
 * @private
 */
export declare function getShapeData(targetId: string, map: Maps): {
    shapeData: any;
    data: any;
};
/**
 * Function to trigger shapeSelected event.
 *
 * @param {string} targetId - Specifies the target id
 * @param {SelectionSettingsModel} selection - Specifies the selection
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {string} eventName - Specifies the event name
 * @returns {IShapeSelectedEventArgs} - Returns the event args
 * @private
 */
export declare function triggerShapeEvent(targetId: string, selection: SelectionSettingsModel, maps: Maps, eventName: string): IShapeSelectedEventArgs;
/**
 * Function to get elements using class name.
 *
 * @param {string} className - Specifies the class name
 * @returns {HTMLCollectionOf<Element>} - Returns the collection
 * @private
 */
export declare function getElementsByClassName(className: string): HTMLCollectionOf<Element>;
/**
 * Function to get elements using querySelectorAll
 */
/**
 * Function to get elements using querySelector.
 *
 * @param {string} args - Specifies the args
 * @param {string} elementSelector - Specifies the element selector
 * @returns {Element} - Returns the element
 * @private
 */
export declare function querySelector(args: string, elementSelector: string): Element;
/**
 * Function to get the element for selection and highlight using public method.
 *
 * @param {number} layerIndex - Specifies the layer index
 * @param {string} name - Specifies the layer name
 * @param {boolean} enable - Specifies the boolean value
 * @param {Maps} map - Specifies the instance of the maps
 * @returns {Element} - Returns the element
 * @private
 */
export declare function getTargetElement(layerIndex: number, name: string, enable: boolean, map: Maps): Element;
/**
 * Function to create style element for highlight and selection.
 *
 * @param {string} id - Specifies the id
 * @param {string} className - Specifies the class name
 * @param {IShapeSelectedEventArgs | any} eventArgs - Specifies the event args
 * @returns {Element} - Returns the element
 * @private
 */
export declare function createStyle(id: string, className: string, eventArgs: IShapeSelectedEventArgs | any): Element;
/**
 * Function to customize the style for highlight and selection.
 *
 * @param {string} id - Specifies the id
 * @param {string} className - Specifies the class name
 * @param {IShapeSelectedEventArgs | any} eventArgs - Specifies the event args
 * @returns {void}
 * @private
 */
export declare function customizeStyle(id: string, className: string, eventArgs: IShapeSelectedEventArgs | any): void;
/**
 * Function to trigger itemSelection event for legend selection and public method.
 *
 * @param {SelectionSettingsModel} selectionSettings - Specifies the selection settings
 * @param {Maps} map - Specifies the instance of the maps
 * @param {Element} targetElement - Specifies the target element
 * @param {object} shapeData - Specifies the shape data
 * @param {object} data - Specifies the data
 * @returns {void}
 * @private
 */
export declare function triggerItemSelectionEvent(selectionSettings: SelectionSettingsModel, map: Maps, targetElement: Element, shapeData: object, data: object): void;
/**
 * Function to remove class from element.
 *
 * @param {Element} element - Specifies the element
 * @returns {void}
 * @private
 */
export declare function removeClass(element: Element): void;
/**
 * Animation Effect Calculation End
 *
 * @param {Element} element - Specifies the element
 * @param {number} delay - Specifies the delay
 * @param {number} duration - Specifies the duration
 * @param {MapLocation} point - Specifies the location
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {string} ele - Specifies the element
 * @param {number} radius - Specifies the radius
 * @returns {void}
 * @private
 */
export declare function elementAnimate(element: Element, delay: number, duration: number, point: MapLocation, maps: Maps, ele?: string, radius?: number): void;
/**
 * @param {string} id - Specifies the id
 * @returns {void}
 * @private
 */
export declare function timeout(id: string): void;
/**
 * @param {string} text - Specifies the text
 * @param {string} size - Specifies the size
 * @param {number} x - Specifies the x value
 * @param {number} y - Specifies the y value
 * @param {number} areaWidth - Specifies the area width
 * @param {number} areaHeight - Specifies the area height
 * @param {string} id - Specifies the id
 * @param {Element} element - Specifies the element
 * @param {boolean} isTouch - Specifies the boolean value
 * @returns {void}
 * @private
 */
export declare function showTooltip(text: string, size: string, x: number, y: number, areaWidth: number, areaHeight: number, id: string, element: Element, isTouch?: boolean): void;
/**
 * @param {HTMLElement} tooltip - Specifies the tooltip element
 * @param {string} text - Specifies the text
 * @param {number} x - Specifies the x value
 * @param {number} y - Specifies the y value
 * @param {string[]} size1 - Specifies the size
 * @param {number} width - Specifies the width
 * @param {number} areaWidth - Specifies the area width
 * @param {Element} element - Specifies the element
 * @returns {void}
 * @private
 */
export declare function wordWrap(tooltip: HTMLElement, text: string, x: number, y: number, size1: string[], width: number, areaWidth: number, element: Element): void;
/**
 * @param {string} id - Specifies the id
 * @param {string} text - Specifies the text
 * @param {number} top - Specifies the top
 * @param {number} left - Specifies the left
 * @param {ZoomToolbarTooltipSettingsModel} settings - Specifies the tooltip settings.
 * @returns {void}
 * @private
 */
export declare function createTooltip(id: string, text: string, top: number, left: number, settings: ZoomToolbarTooltipSettingsModel): void;
/**
 * @param {string} color - Specifies the color
 * @returns {any} - Returns the color in rgb
 * @private
 */
export declare function getHexColor(color: string): any;
/**
 * @param {Point} location - Specifies the location
 * @param {string} shape - Specifies the shape
 * @param {Size} size - Specifies the size
 * @param {string} url - Specifies the url
 * @param {PathOption} options - Specifies the options
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawSymbol(location: Point, shape: string, size: Size, url: string, options: PathOption): Element;
/**
 * @param {MapLocation} location - Specifies the location
 * @param {Size} size - Specifies the size
 * @param {string} shape - Specifies the shape
 * @param {PathOption} options - Specifies the path options
 * @param {string} url - Specifies the url
 * @returns {IShapes} - Returns the shapes
 * @private
 */
export declare function renderLegendShape(location: MapLocation, size: Size, shape: string, options: PathOption, url: string): IShapes;
/**
 * Animation Effect Calculation End
 *
 * @private
 */
/**
 * @param {HTMLElement} childElement - Specifies the child element
 * @param {HTMLElement} parentElement - Specifies the parent element
 * @returns {Size} - Returns the size
 * @private
 */
export declare function getElementOffset(childElement: HTMLElement, parentElement: HTMLElement): Size;
/**
 * @param {Element} element - Specifies the element
 * @param {number} index - Specifies the element
 * @param {number} scale - Specifies the scale
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
export declare function changeBorderWidth(element: Element, index: number, scale: number, maps: Maps): void;
/**
 * @param {Element} element - Specifies the element
 * @param {number} index - Specifies the element
 * @param {number} scale - Specifies the scale
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
export declare function changeNavaigationLineWidth(element: Element, index: number, scale: number, maps: Maps): void;
/**
 * @param {PointerEvent | TouchEvent} event - Specifies the pointer or touch event
 * @returns {ITouches[]} - Returns the target
 * @private
 */
export declare function targetTouches(event: PointerEvent | TouchEvent): ITouches[];
/**
 * @param {ITouches[]} startTouches - Specifies the start touches
 * @param {ITouches[]} endTouches - Specifies the end touches
 * @returns {number} - Returns the number
 * @private
 */
export declare function calculateScale(startTouches: ITouches[], endTouches: ITouches[]): number;
/**
 * @param {ITouches} a - Specifies the a value
 * @param {ITouches} b - Specifies the b value
 * @returns {number} - Returns the number
 * @private
 */
export declare function getDistance(a: ITouches, b: ITouches): number;
/**
 * @param {ITouches[]} touches - Specifies the touches
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {any[]} - Returns the object
 * @private
 */
export declare function getTouches(touches: ITouches[], maps: Maps): any[];
/**
 * @param {any[]} touches - Specifies the touches
 * @returns {Point} - Returns the point
 * @private
 */
export declare function getTouchCenter(touches: any[]): Point;
/**
 * @param {number} a - Specifies a value
 * @param {number} b - Specifies b value
 * @returns {number} - Returns the sum of a and b
 * @private
 */
export declare function sum(a: number, b: number): number;
/**
 * Animation Effect Calculation End.
 *
 * @param {Element} element - Specifies the element.
 * @param {number} delay - Specifies the delay.
 * @param {number} duration - Specifies the duration.
 * @param {MapLocation} point - Specifies the location.
 * @param {number} scale - Specifies the scale value.
 * @param {Size} size - Specifies the size.
 * @param {Maps} maps - Specifies the maps.
 * @returns {void}
 * @private
 */
export declare function zoomAnimate(element: Element, delay: number, duration: number, point: MapLocation, scale: number, size: Size, maps: Maps): void;
/**
 * To process custom animation.
 *
 * @param {Element} element - Specifies the element
 * @param {number} delay - Specifies the delay
 * @param {number} duration - Specifies the duration
 * @param {Function} process - Specifies the process
 * @param {Function} end - Specifies the end
 * @returns {void}
 * @private
 */
export declare function animate(element: Element, delay: number, duration: number, process: Function, end: Function): void;
/**
 * Defines the options to get shape data file using Ajax request.
 */
export declare class MapAjax {
    /**
     * Defines the data options for the Ajax.
     */
    dataOptions: string | any;
    /**
     * Defines type of the Ajax.
     */
    type: string;
    /**
     * Defines whether the Ajax request is asynchronous or not.
     */
    async: boolean;
    /**
     * Defines the type of the content in Ajax request.
     */
    contentType: string;
    /**
     * Defines the data sent in the Ajax request.
     */
    sendData: string | any;
    constructor(options: string | any, type?: string, async?: boolean, contentType?: string, sendData?: string | any);
}
/**
 * Animation Translate.
 *
 * @param {Element} element - Specifies the element
 * @param {number} delay - Specifies the delay
 * @param {number} duration - Specifies the duration
 * @param {MapLocation} point - Specifies the location
 * @returns {void}
 * @private
 */
export declare function smoothTranslate(element: Element, delay: number, duration: number, point: MapLocation): void;
/**
 * To find compare should zoom factor with previous factor and current factor.
 *
 * @param {number} scaleFactor - Specifies the scale factor
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
export declare function compareZoomFactor(scaleFactor: number, maps: Maps): void;
/**
 * To find zoom level for the min and max latitude values.
 *
 * @param {number} minLat - Specifies the minimum latitude
 * @param {number} maxLat - Specifies the maximum latitude
 * @param {number} minLong - Specifies the minimum longitude
 * @param {number} maxLong - Specifies the maximum longitude
 * @param {number} mapWidth - Specifies the width of the maps
 * @param {number} mapHeight - Specifies the height of the maps
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {boolean} isZoomToCoordinates - Checks for the zoom to coordinates
 * @returns {number} - Returns the scale factor
 * @private
 */
export declare function calculateZoomLevel(minLat: number, maxLat: number, minLong: number, maxLong: number, mapWidth: number, mapHeight: number, maps: Maps, isZoomToCoordinates: boolean): number;
/**
 * Method to get the result.
 *
 * @param {any} e - Specifies the any type value
 * @returns {any} - Returns the data value
 * @private
 */
export declare function processResult(e: any): any;
