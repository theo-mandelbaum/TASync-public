import { SVGCanvasAttributes, Size } from '@syncfusion/ej2-svg-base';
import { Chart3DColorFormat, Chart3DStringBuilder, Chart3DVector, Chart3DLocation, Chart3DPolygon, Chart3DTickElement, Chart3DPolyAttributes, Chart3DPolyCollections, Chart3DLabelElement, Chart3DTextOption, Chart3DBasicTransform } from '../model/chart3d-Interface';
import { Chart3DSeries } from '../series/chart-series';
import { FontModel } from '../../common/model/base-model';
import { Chart3D } from '../chart3D';
import { Chart3DAxis } from '../axis/axis';
/**
 * Represents a 3D rendering configuration for the EJ3D rendering engine.
 *
 */
export declare class Chart3DRender {
    transform: Chart3DBasicTransform;
    tree: Chart3DBspNode[];
}
/**
 * Represents a node in a Binary Space Partitioning (BSP) tree.
 *
 * @interface
 */
interface Chart3DBspNode {
    /** The front subtree of the BSP tree. */
    front: Chart3DBspNode;
    /** The back subtree of the BSP tree. */
    back: Chart3DBspNode;
    /** The splitting plane associated with the node. */
    plane: Chart3DPolygon;
}
/**
 * Represents a three-dimensional vector in space.
 */
export declare class Vector3D {
    /** The x-coordinate of the vector. */
    x: number;
    /** The y-coordinate of the vector. */
    y: number;
    /** The z-coordinate of the vector. */
    z: number;
    /** A small value used for epsilon comparisons to handle floating-point inaccuracies.*/
    private epsilon;
    /**
     * Checks if a vector is valid (not NaN for any component).
     *
     * @param {Chart3DVector} point - The vector to check.
     * @returns {boolean} - True if the vector is valid, false otherwise.
     */
    isValid(point: Chart3DVector): boolean;
    /**
     * Constructs a new Vector3D instance.
     *
     * @constructor
     * @param {number | { x: number, y: number }} pointX - Either an object with x and y properties or the x-coordinate.
     * @param {number} [vy] - The y-coordinate (if the first parameter is a number).
     * @param {number} [vz] - The z-coordinate (if the first parameter is a number).
     */
    constructor(pointX: {
        x: number;
        y: number;
    } | number, vy?: number, vz?: number);
    /**
     * Creates a new Vector3D instance from provided coordinates.
     *
     * @param {number | { x: number, y: number }} vx - Either an object with x and y properties or the x-coordinate.
     * @param {number} vy - The y-coordinate.
     * @param {number} vz - The z-coordinate.
     * @returns {Chart3DVector} - The new Vector3D instance.
     */
    vector3D(vx: {
        x: number;
        y: number;
    } | number, vy: number, vz: number): Chart3DVector;
    /**
     * Subtracts one vector from another and returns the result.
     *
     * @param {Chart3DVector} v1 - The first vector.
     * @param {Chart3DVector} v2 - The second vector to subtract from the first.
     * @returns {Chart3DVector} - The resulting vector.
     */
    vector3DMinus(v1: Chart3DVector, v2: Chart3DVector): Chart3DVector;
    /**
     * Adds two vectors and returns the result.
     *
     * @param {Chart3DVector} v1 - The first vector.
     * @param {Chart3DVector} v2 - The second vector to add to the first.
     * @returns {Chart3DVector} - The resulting vector.
     */
    vector3DPlus(v1: Chart3DVector, v2: Chart3DVector): Chart3DVector;
    /**
     * Multiplies two vectors using the cross product and returns the result.
     *
     * @param {Chart3DVector} v1 - The first vector.
     * @param {Chart3DVector} v2 - The second vector.
     * @returns {Chart3DVector} - The resulting vector.
     */
    vector3DMultiply(v1: Chart3DVector, v2: Chart3DVector): Chart3DVector;
    /**
     * Calculates the dot product of two vectors.
     *
     * @param {Chart3DVector} v1 - The first vector.
     * @param {Chart3DVector} v2 - The second vector.
     * @returns {number} - The dot product.
     */
    vector3DAdd(v1: Chart3DVector, v2: Chart3DVector): number;
    /**
     * Multiplies a vector by a scalar value.
     *
     * @param {Chart3DVector} v1 - The vector to multiply.
     * @param {number} value - The scalar value.
     * @returns {Chart3DVector} - The resulting vector.
     */
    vector3DStarMultiply(v1: Chart3DVector, value: number): Chart3DVector;
    /**
     * Calculates the length of a vector.
     *
     * @param {Chart3DVector} vector - The vector to calculate the length of.
     * @returns {number} - The length of the vector.
     */
    getLength(vector: Chart3DVector): number;
    /**
     * Normalizes the vector to have a length of 1.
     *
     * @returns {void}
     */
    normalize(): void;
    /**
     * Calculates the normal vector of a triangle defined by three vectors.
     *
     * @param {Chart3DVector} v1 - The first vertex of the triangle.
     * @param {Chart3DVector} v2 - The second vertex of the triangle.
     * @param {Chart3DVector} v3 - The third vertex of the triangle.
     * @returns {Chart3DVector} - The normal vector of the triangle.
     */
    getNormal(v1: Chart3DVector, v2: Chart3DVector, v3: Chart3DVector): Chart3DVector;
}
/**
 * Represents a 3x3 or 4x4 matrix in 3D space and provides various matrix operations.
 *
 */
export declare class Matrix3D {
    /** The size of the matrix, which is set to 4 by default. */
    private matrixSize;
    /**
     * Creates a 3D matrix with the specified size.
     *
     * @param {number} size - The size of the matrix.
     * @returns {number[][]} - The created 3D matrix.
     */
    matrix3D(size: number): number[][];
    /**
     * Checks if a matrix is an affine matrix.
     *
     * @param {number[][]} matrixData - The matrix to check.
     * @returns {boolean} - True if the matrix is an affine matrix, false otherwise.
     */
    isAffine(matrixData: number[][]): boolean;
    /**
     * Creates a new array with zeros.
     *
     * @param {number} initialSize - The size of the array.
     * @returns {number[]} - The created array.
     */
    createArray(initialSize: number): number[];
    /**
     * Gets the identity matrix.
     *
     * @returns {number[][]} -The identity matrix.
     */
    getIdentity(): number[][];
    /**
     * Gets the interval of a matrix.
     *
     * @param {number[][]} matrix - The matrix to get the interval for.
     * @returns {number[][]} - The interval matrix.
     */
    getInterval(matrix: number[][]): number[][];
    /**
     * Multiplies all elements of a matrix by a factor.
     *
     * @param {number} factor - The factor to multiply with.
     * @param {number[][]} matrix - The matrix to multiply.
     * @returns {number[][]} - The resulting matrix.
     */
    getMatrixMultiple(factor: number, matrix: number[][]): number[][];
    /**
     * Multiplies a matrix by a vector.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {Chart3DVector} point - The vector to multiply with.
     * @returns {Chart3DVector} - The resulting vector.
     */
    getMatrixVectorMultiple(matrix: number[][], point: Chart3DVector): Chart3DVector;
    /**
     * Multiplies a matrix by a vector and applies translation.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {Chart3DVector} vector - The vector to multiply with.
     * @returns {Vector3D} - The resulting vector.
     */
    getMatrixVectorAnd(matrix: number[][], vector?: Chart3DVector): {
        x: number;
        y: number;
        z: number;
    };
    /**
     * Multiplies two matrices.
     *
     * @param {number[][]} matrix1 - The first matrix.
     * @param {number[][]} matrix2 - The second matrix.
     * @returns {number[][]} - The resulting matrix.
     */
    getMatrixMultiplication(matrix1: number[][], matrix2: number[][]): number[][];
    /**
     * Gets the minor of a matrix.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {number} columnIndex - The column index.
     * @param {number} rowIndex - The row index.
     * @returns {number} - The minor of the matrix.
     * @private
     */
    getMinor(matrix: number[][], columnIndex: number, rowIndex: number): number;
    /**
     * Gets a submatrix of a matrix.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {number} columnIndex - The column index.
     * @param {number} rowIndex - The row index.
     * @returns {number[][]} - The submatrix.
     */
    getMatrix(matrix: number[][], columnIndex: number, rowIndex: number): number[][];
    /**
     * Gets the determinant of a matrix.
     *
     * @param {number[][]} matrix - The matrix.
     * @returns {number} - The determinant of the matrix.
     */
    getDeterminant(matrix: number[][]): number;
    /**
     * Transforms a matrix by translation.
     *
     * @param {number} x - The x-coordinate of the translation.
     * @param {number} y - The y-coordinate of the translation.
     * @param {number} z - The z-coordinate of the translation.
     * @returns {number[][]} - The transformed matrix.
     */
    transform(x: number, y: number, z: number): number[][];
    /**
     * Creates a matrix for rotation around the y-axis.
     *
     * @param {number} angle - The angle of rotation.
     * @returns {number[][]} - The rotation matrix.
     */
    turn(angle: number): number[][];
    /**
     * Creates a matrix for rotation around the x-axis.
     *
     * @param {number} angle - The angle of rotation.
     * @returns {number[][]} - The rotation matrix.
     */
    tilt(angle: number): number[][];
    /**
     * Transposes a matrix.
     *
     * @param {number[][]} matrix3D - The matrix to transpose.
     * @returns {number[][]} - The transposed matrix.
     */
    transposed(matrix3D: number[][]): number[][];
}
/**
 * Represents a 3D chart transformation utility that provides methods for transforming
 * and projecting 3D coordinates onto a 2D screen.
 *
 */
export declare class ChartTransform3D {
    /** Represents the angle conversion factor from degrees to radians. */
    private toRadial;
    /** Represents a 3D vector for performing vector operations. */
    private vector;
    /** Represents a 3D matrix for performing matrix operations. */
    private matrixObj;
    /**
     * Initializes a new instance of the `ChartTransform3D` class.
     */
    constructor();
    /**
     * Creates a 3D transformation based on the specified size.
     *
     * @param {Size} size - The size of the viewing area.
     * @returns {Chart3DBasicTransform} - The 3D transformation.
     */
    transform3D(size: Size): Chart3DBasicTransform;
    /**
     * Applies the specified 3D transformation to the current state.
     *
     * @param {Chart3DBasicTransform} transform - The 3D transformation to apply.
     * @returns {void} - The 3D transformation.
     */
    transform(transform: Chart3DBasicTransform): void;
    /**
     * Updates the perspective matrix based on the specified angle.
     *
     * @param {number} angle - The perspective angle.
     * @param {Chart3DBasicTransform} transform - The 3D transformation.
     * @returns {void}
     */
    private updatePerspective;
    /**
     * Converts degrees to radians.
     *
     * @param {number} angle - The angle in degrees.
     * @returns {number} - The angle in radians.
     * @private
     */
    private degreeToRadianConverter;
    /**
     * Transforms a 3D vector to screen coordinates based on the current state.
     *
     * @param {Chart3DVector} vector3D - The 3D vector to transform.
     * @param {Chart3DBasicTransform} transform - The 3D transformation.
     * @param {Matrix3D} chartObj - Optional custom matrix object for transformation.
     * @returns {Chart3DLocation} - The screen coordinates.
     */
    toScreen(vector3D: Chart3DVector, transform: Chart3DBasicTransform, chartObj?: Matrix3D): Chart3DLocation;
    /**
     * Sets the view matrix in the transformation state.
     *
     * @param {number[][]} matrix - The new view matrix.
     * @param {Chart3DBasicTransform} transform - The 3D transformation.
     * @returns {void}
     */
    private setViewMatrix;
    /**
     * Calculates the final result matrix based on the current state.
     *
     * @param {Chart3DBasicTransform} transform - The 3D transformation.
     * @param {Matrix3D} matrixobj - Optional custom matrix object for transformation.
     * @returns {number[][]} - The final result matrix.
     */
    result(transform: Chart3DBasicTransform, matrixobj?: Matrix3D): number[][];
    /**
     * Sets the center in the transformation state.
     *
     * @param {Chart3DVector} center - The new center vector.
     * @param {Chart3DBasicTransform} transform - The 3D transformation.
     * @returns {void}
     */
    private setCenter;
}
/**
 * Represents a 3D graphics rendering utility for drawing and managing 3D elements in a chart.
 *
 */
export declare class Graphics3D {
    /** The vector class. */
    private vector;
    /**
     * Adds a visual polygon to the 3D chart and returns its identifier.
     *
     * @param {Chart3DPolygon} polygon - The polygon to add.
     * @param {Chart3D} chart - The 3D chart.
     * @returns {number} - The identifier of the added polygon.
     */
    addVisual(polygon: Chart3DPolygon, chart: Chart3D): number;
    /**
     * Prepares the view for rendering based on specified parameters.
     *
     * @param {number} perspectiveAngle - The perspective angle.
     * @param {number} depth - The depth of the view.
     * @param {number} rotation - The rotation angle.
     * @param {number} tilt - The tilt angle.
     * @param {Size} size - The size of the viewing area.
     * @param {Chart3D} chart - The 3D chart.
     * @returns {void}
     */
    prepareView(perspectiveAngle: number, depth: number, rotation: number, tilt: number, size: Size, chart: Chart3D): void;
    /**
     * Renders the 3D view on the specified panel element.
     *
     * @param {Element} panel - The panel element to render the view on.
     * @param {Chart3D} chart - The 3D chart.
     * @param {number} rotation - The rotation angle.
     * @param {number} tilt - The tilt angle.
     * @param {Size} size - The size of the viewing area.
     * @param {number} perspectiveAngle - The perspective angle.
     * @param {number} depth - The depth of the view.
     * @returns {void}
     */
    view(panel?: Element, chart?: Chart3D, rotation?: number, tilt?: number, size?: Size, perspectiveAngle?: number, depth?: number): void;
    /**
     * Draws a 3D element based on the specified Binary Space Partitioning Node.
     *
     * @param {Chart3DBspNode} bspElement - The Binary Space Partitioning Node representing the 3D element.
     * @param {Chart3D} chart - The 3D chart.
     * @returns {void}
     */
    draw3DElement(bspElement: Chart3DBspNode, chart: Chart3D): void;
    /**
     * Draws the 3D nodes starting from the root based on the eye vector.
     *
     * @param {Chart3DBspNode} bspElement - The root Binary Space Partitioning Node.
     * @param {Chart3DVector} eyeVector - The eye vector.
     * @param {Element} panel - The panel element to render the view on.
     * @param {Chart3D} chart - The 3D chart.
     * @returns {void}
     */
    drawNode3D(bspElement: Chart3DBspNode, eyeVector: Chart3DVector, panel: Element, chart: Chart3D): void;
}
/**
 * Represents a binary tree builder for 3D polygons in a chart.
 *
 */
export declare class BinaryTreeBuilder {
    /** A small value used for epsilon comparisons to handle floating-point inaccuracies.*/
    private epsilon;
    /** The 3D chart. */
    private chart;
    constructor(chart?: Chart3D);
    /**
     * Adds a polygon to the binary tree and returns its index.
     *
     * @param {Chart3DPolygon} polygon - The polygon to add.
     * @param {Chart3D} chart - The 3D chart.
     * @returns {number} - The index of the added polygon.
     */
    add(polygon: Chart3DPolygon, chart: Chart3D): number;
    /**
     * Gets the next index considering the array length and the current index.
     *
     * @param {number} index - The current index.
     * @param {number} count - The length of the array.
     * @returns {number} - The next index.
     */
    getNext(index: number, count: number): number;
    /**
     * Creates a PolyAttributes object based on the vector, index, and result.
     *
     * @param {Chart3DVector} point - The vector representing the point.
     * @param {number} index - The index of the point.
     * @param {string} result - The result classification.
     * @returns {Chart3DPolyAttributes} - The created PolyAttributes object.
     */
    vector3DIndexClassification(point: Chart3DVector, index: number, result: string): Chart3DPolyAttributes;
    /**
     * Classifies a point relative to a polygon.
     *
     * @param {Chart3DVector} point - The point to classify.
     * @param {Chart3DPolygon} polygon - The polygon for classification.
     * @returns {string} - The classification result ('OnPlane', 'OnBack', 'OnFront').
     */
    classifyPoint(point: Chart3DVector, polygon: Chart3DPolygon): string;
    /**
     * Classifies a polygon relative to another polygon.
     *
     * @param {Chart3DPolygon} refPolygon - The reference polygon.
     * @param {Chart3DPolygon} classPolygon - The polygon to classify.
     * @returns {string} - The classification result ('OnPlane', 'ToRight', 'ToLeft', 'Unknown').
     */
    classifyPolygon(refPolygon: Chart3DPolygon, classPolygon: Chart3DPolygon): string;
    /**
     * Splits a polygon into two parts based on another polygon.
     *
     * @param {Chart3DPolygon} splitPolygon - The polygon to split.
     * @param {Chart3DPolygon} refPolygon - The reference polygon for splitting.
     * @returns {Chart3DPolyCollections} - The resulting back and front parts.
     * @private
     */
    splitPolygon(splitPolygon: Chart3DPolygon, refPolygon: Chart3DPolygon): Chart3DPolyCollections;
    /**
     * Cuts out the front part of a polygon based on the PolyAttributes.
     *
     * @param {Chart3DPolyAttributes[]} polyPoints - The PolyAttributes array of the polygon.
     * @param {Chart3DPolyAttributes} initialVertex - The PolyAttributes representing the cutting point.
     * @returns {Chart3DVector[]} - The resulting points of the front part.
     */
    private cutOutFrontPolygon;
    /**
     * Cuts out the back part of a polygon based on the PolyAttributes.
     *
     * @param {Chart3DPolyAttributes[]} polyPoints - The PolyAttributes array of the polygon.
     * @param {Chart3DPolyAttributes} initialVertex - The PolyAttributes representing the cutting point.
     * @returns {Chart3DVector[]} - The resulting points of the back part.
     */
    private cutOutBackPolygon;
    /**
     * Builds a Binary Space Partitioning from a list of polygons.
     *
     * @param {Chart3DPolygon[]} [points] - The list of polygons to build the tree from.
     * @returns {Chart3DBspNode} - The root node of the Binary Space Partitioning tree.
     */
    build(points?: Chart3DPolygon[]): Chart3DBspNode;
}
/**
 * The Svg3DRenderer class provides methods for rendering SVG graphics in a 3D context.
 */
export declare class Svg3DRenderer {
    /**
     * Gets a Chart3DStringBuilder instance for constructing strings.
     *
     * @returns {Chart3DStringBuilder} - The StringBuilder instance.
     */
    getStringBuilder(): Chart3DStringBuilder;
    /**
     * Parses a hex color code and returns its Red green Blue values.
     *
     * @param {string} hexColorCode - The hex color code.
     * @returns {Chart3DColorFormat | null} - The parsed color format (Red green Blue) or null if parsing fails.
     */
    hexToValue(hexColorCode: string): Chart3DColorFormat | null;
    /**
     * Converts a Chart3DColorFormat object to its corresponding color string.
     *
     * @param {Chart3DColorFormat} color - The color in Chart3DColorFormat.
     * @returns {string} - The color string representation.
     */
    hexColor(color: Chart3DColorFormat): string;
    /**
     * Checks if a given color string is in a valid format (hex or rgba).
     *
     * @param {string} color - The color string to check.
     * @returns {boolean} - True if the color string is valid, otherwise false.
     */
    checkColorFormat(color: string): boolean;
    /**
     * Draws text on an SVG element.
     *
     * @param {any} options - The options for drawing the text.
     * @param {string | string[]} label - The text label.
     * @param {FontModel} font - The font settings for the text.
     * @param {Chart3D} chart - The 3D chart instance.
     * @returns {Element} - The created SVG text element.
     */
    drawText(options: Chart3DTextOption | SVGCanvasAttributes, label: string | string[], font: FontModel, chart: Chart3D): Element;
    /**
     * Transforms 3D coordinates to visible 2D coordinates on the chart.
     *
     * @param {Chart3DSeries} currentSeries - The current 3D series.
     * @param {number} x - The x-coordinate in 3D space.
     * @param {number} y - The y-coordinate in 3D space.
     * @param {Chart3D} chart - The 3D chart instance.
     * @returns {Chart3DLocation} - The transformed 2D coordinates.
     */
    transform3DToVisible(currentSeries: Chart3DSeries, x: number, y: number, chart: Chart3D): Chart3DLocation;
}
/**
 * Represents a 3D polygon in a chart.
 *
 */
export declare class Polygon3D {
    /** A small constant used for numerical comparisons. */
    private epsilon;
    /** A small constant used for numerical comparisons. */
    private normal;
    /** A small constant used for numerical comparisons. */
    private vector;
    /** A small constant used for numerical comparisons. */
    private vectorPoints;
    /** A small constant used for numerical comparisons. */
    private d;
    /** A small constant used for numerical comparisons. */
    private matrixObj;
    /** A small constant used for numerical comparisons. */
    private tabIndex;
    /**
     * Creates a 3D polygon.
     *
     * @param {Chart3DVector[]} [points] - An array of 3D vectors representing points on the polygon.
     * @param {any} [tag] - Additional information or metadata for the polygon.
     * @param {number} [index] - An index associated with the polygon.
     * @param {string} [stroke] - The stroke color of the polygon.
     * @param {number} [strokeThickness] - The thickness of the polygon's stroke.
     * @param {number} [opacity] - The opacity of the polygon.
     * @param {string} [fill] - The fill color of the polygon.
     * @param {string} [name] - The name or identifier of the polygon.
     * @param {Element} [parent] - The parent element to which the polygon belongs.
     * @param {string} [text] - Additional text associated with the polygon.
     * @returns {Chart3DPolygon} - Returns the created polygon.
     */
    polygon3D(points?: Chart3DVector[], tag?: any, index?: number, stroke?: string, strokeThickness?: number, opacity?: number, fill?: string, name?: string, parent?: Element, text?: string): Chart3DPolygon;
    /**
     * Creates a 3D line.
     *
     * @param {Chart3DTickElement} line - The tick elements associated with the line.
     * @param {number} x1 - The x-coordinate of the starting point.
     * @param {number} y1 - The y-coordinate of the starting point.
     * @param {number} x2 - The x-coordinate of the ending point.
     * @param {number} y2 - The y-coordinate of the ending point.
     * @param {number} depth - The depth or z-coordinate of the line in 3D space.
     * @returns {Chart3DPolygon} - Returns the created 3D line as a polygon.
     */
    createLine(line: Chart3DTickElement, x1: number, y1: number, x2: number, y2: number, depth: number): Chart3DPolygon;
    /**
     *  Creates a 3D line polygon based on the given tick elements and points.
     *
     * @param {Chart3DTickElement} element - The tick elements associated with the line.
     * @param {Chart3DVector[]} points - The array of 3D vector points defining the line in 3D space.
     * @returns {Chart3DPolygon} - Returns the created 3D line polygon.
     */
    line3D(element: Chart3DTickElement, points: Chart3DVector[]): Chart3DPolygon;
    /**
     * Creates a 3D text polygon based on the given label element and points.
     *
     * @param {Chart3DLabelElement} element - The label element associated with the text.
     * @param {Chart3DVector[]} points - The array of 3D vector points defining the position of the text in 3D space.
     * @returns {Chart3DPolygon} - Returns the created 3D text polygon.
     */
    text3D(element: Chart3DLabelElement, points: Chart3DVector[]): Chart3DPolygon;
    /**
     * Creates a 3D cylinder based on the given vectors, chart, and styling parameters.
     *
     * @param {Chart3DVector} v1 - The start vector of the cylinder.
     * @param {Chart3DVector} v2 - The end vector of the cylinder.
     * @param {Chart3D} chart - The 3D chart to which the cylinder belongs.
     * @param {number} index - The index of the cylinder.
     * @param {string} type - The type of the cylinder.
     * @param {string} stroke - The stroke color of the cylinder.
     * @param {string} fill - The fill color of the cylinder.
     * @param {number} strokeThickness - The thickness of the stroke.
     * @param {number} opacity - The opacity of the cylinder.
     * @param {string} name - The name of the cylinder.
     * @param {Element} parent - The parent element of the cylinder.
     * @returns {Chart3DPolygon[]} - Returns an array of polygons representing the 3D cylinder.
     */
    createCylinder(v1: Chart3DVector, //top left front vecotr.
    v2: Chart3DVector, // bottom right back vector.
    chart: Chart3D, index: number, type: string, stroke: string, fill: string, strokeThickness: number, opacity: number, name: string, parent: Element): Chart3DPolygon[];
    /**
     * Creates a 3D box based on the given vectors, chart, and styling parameters.
     *
     * @param {Chart3DVector} v1 - The start vector of the box.
     * @param {Chart3DVector} v2 - The end vector of the box.
     * @param {Chart3D} chart - The 3D chart to which the box belongs.
     * @param {number} index - The index of the box.
     * @param {string} stroke - The stroke color of the box.
     * @param {string} fill - The fill color of the box.
     * @param {number} strokeThickness - The thickness of the stroke.
     * @param {number} opacity - The opacity of the box.
     * @param {boolean} inverse - A boolean indicating whether to inverse the box.
     * @param {string} name - The name of the box.
     * @param {Element} parent - The parent element of the box.
     * @param {string} [text] - Optional text associated with the box.
     * @returns {Chart3DPolygon[]} - Returns an array of polygons representing the 3D box.
     *
     */
    createBox(v1: Chart3DVector, //top left front vecotr.
    v2: Chart3DVector, // bottom right back vector.
    chart: Chart3D, index: number, stroke: string, fill: string, strokeThickness: number, opacity: number, inverse: boolean, name: string, parent: Element, text?: string): Chart3DPolygon[];
    /**
     * Calculates the normal vector for a 3D polygon based on the provided points.
     *
     * @param {...Chart3DVector} args - Variable number of vector3d arguments representing points of the polygon.
     * @returns {void}
     */
    calculateNormal(...args: any[]): void;
    /**
     * Tests whether the calculated normal vector is valid.
     *
     * @returns {boolean} - Returns true if the normal vector is valid, false otherwise.
     */
    test(): boolean;
    /**
     * Transforms the vector points of the specified polygon using the provided matrix.
     *
     * @param {number[][]} matrix - The transformation matrix.
     * @param {Chart3DPolygon} polygon - The polygon to transform.
     * @returns {void}
     */
    transform(matrix: number[][], polygon: Chart3DPolygon): void;
    /**
     *  Gets the normal vector based on the transformed points using the specified transformation matrix.
     *
     * @param {number[][]} transform - The transformation matrix.
     * @param {Chart3DVector[]} [vectorPoints] - The vector points.
     * @returns {Chart3DVector} - Returns the normal vector.
     * @private
     */
    getNormal(transform: number[][], vectorPoints?: Chart3DVector[]): Chart3DVector;
    /**
     * A method for creating text element.
     *
     * @param {Chart3DVector} position - text position.
     * @param {Chart3DLabelElement} element - text element.
     * @param {number} xLength - text element x value.
     * @param {number} yLength - text element y value.
     * @returns {Chart3DPolygon} - Returns the polygon.
     */
    createTextElement(position: Chart3DVector, element: Chart3DLabelElement, xLength: number, yLength: number): Chart3DPolygon;
    /**
     * Draws a template on the specified 3D chart panel.
     *
     * @param {Chart3DPolygon} panel - The 3D polygon representing the panel on which the template will be drawn.
     * @param {Chart3D} chart - The 3D chart to which the panel belongs.
     * @returns {void}
     */
    drawLine(panel: Chart3DPolygon, chart: Chart3D): void;
    /**
     * Draws text on the specified 3D chart panel.
     *
     * @param {Chart3DPolygon} panel - The 3D polygon representing the panel on which the text will be drawn.
     * @param {Chart3D} chart - The 3D chart to which the panel belongs.
     * @returns {void}
     */
    drawTemplate(panel: Chart3DPolygon, chart: Chart3D): void;
    /**
     * Draws a data label symbol for a specific data point in a three-dimensional series.
     *
     * @param {Chart3DPolygon} panel - The 3D polygon representing the panel on which the text will be drawn.
     * @param {Chart3D} chart - The 3D chart to which the panel belongs.
     * @returns {void}
     */
    drawText(panel: Chart3DPolygon, chart: Chart3D): void;
    /**
     * Draws a data label symbol for a specific data point in a three-dimensional series.
     *
     * @param {number} seriesIndex - The index of the series to which the data point belongs.
     * @param {Chart3DSeries} series - The three-dimensional series containing the data point.
     * @param {number} pointIndex - The index of the data point within the series.
     * @param {number} x - The x-coordinate of the center of the symbol.
     * @param {number} y - The y-coordinate of the center of the symbol.
     * @param {number} width - The width of the symbol.
     * @param {number} height - The height of the symbol.
     * @param {Chart3D} chart - The three-dimensional chart containing the series.
     * @returns {void}
     */
    private dataLabelSymbol;
    /**
     * Draws a three-dimensional polygon on the specified chart.
     *
     * @param {Chart3DPolygon} panel - The polygon to be drawn.
     * @param {Chart3D} chart - The three-dimensional chart on which the polygon is to be drawn.
     * @returns {void}
     */
    draw(panel: Chart3DPolygon, chart: Chart3D): void;
    /**
     * Applies a lightening effect to the given color by reducing its red, green and blue components.
     *
     * @param {string} color - The input color in hexadecimal format.
     * @param {Chart3D} chart - The three-dimensional chart associated with the color.
     * @returns {string} - The lightened color in hexadecimal format.
     */
    applyXLight(color: string, chart: Chart3D): string;
    /**
     * Applies a lightening effect to the given color by reducing its red, green and blue components with a focus on the Z-axis.
     *
     * @param {string} color - The input color in hexadecimal format.
     * @param {Chart3D} chart - The three-dimensional chart associated with the color.
     * @returns {string} - The lightened color in hexadecimal format.
     */
    applyZLight(color: string, chart: Chart3D): string;
}
/**
 * Gets the minimum delta value between adjacent data points on a given axis in a three-dimensional chart.
 *
 * @param {Chart3DAxis} axis - The three-dimensional axis for which the delta value is calculated.
 * @param {Chart3DSeries[]} seriesCollection - Collection of three-dimensional series in the chart.
 * @returns {number} - The minimum delta value between adjacent data points on the specified axis.
 */
export declare function getMinPointsDeltaValue(axis: Chart3DAxis, seriesCollection: Chart3DSeries[]): number;
/**
 * Converts a numeric value to a coefficient based on the given 3D axis.
 *
 * @param {number} value - The numeric value to be converted.
 * @param {Chart3DAxis} axis - The 3D axis for reference.
 * @returns {number} - The coefficient value.
 * @private
 */
export declare function valueToCoefficients(value: number, axis: Chart3DAxis): number;
export {};
