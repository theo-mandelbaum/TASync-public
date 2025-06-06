var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { measureText } from '@syncfusion/ej2-svg-base';
import { appendChildElement, colorNameToHex } from '../../common/utils/helper';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Represents a 3D rendering configuration for the EJ3D rendering engine.
 *
 */
var Chart3DRender = /** @class */ (function () {
    function Chart3DRender() {
        this.transform = null; // Chart3DBasicTransform
    }
    return Chart3DRender;
}());
export { Chart3DRender };
var chart3DRender = new Chart3DRender();
/**
 * Represents a three-dimensional vector in space.
 */
var Vector3D = /** @class */ (function () {
    /**
     * Constructs a new Vector3D instance.
     *
     * @constructor
     * @param {number | { x: number, y: number }} pointX - Either an object with x and y properties or the x-coordinate.
     * @param {number} [vy] - The y-coordinate (if the first parameter is a number).
     * @param {number} [vz] - The z-coordinate (if the first parameter is a number).
     */
    function Vector3D(pointX, vy, vz) {
        /** The x-coordinate of the vector. */
        this.x = 0;
        /** The y-coordinate of the vector. */
        this.y = 0;
        /** The z-coordinate of the vector. */
        this.z = 0;
        /** A small value used for epsilon comparisons to handle floating-point inaccuracies.*/
        this.epsilon = 0.00001;
        this.x = pointX;
        this.y = vy || 0;
        this.z = vz || 0;
    }
    /**
     * Checks if a vector is valid (not NaN for any component).
     *
     * @param {Chart3DVector} point - The vector to check.
     * @returns {boolean} - True if the vector is valid, false otherwise.
     */
    Vector3D.prototype.isValid = function (point) {
        return !isNaN(point.x) && !isNaN(point.y) && !isNaN(point.z);
    };
    /**
     * Creates a new Vector3D instance from provided coordinates.
     *
     * @param {number | { x: number, y: number }} vx - Either an object with x and y properties or the x-coordinate.
     * @param {number} vy - The y-coordinate.
     * @param {number} vz - The z-coordinate.
     * @returns {Chart3DVector} - The new Vector3D instance.
     */
    Vector3D.prototype.vector3D = function (vx, vy, vz) {
        this.x = vx;
        this.y = vy;
        this.z = vz;
        return { x: this.x, y: this.y, z: this.z };
    };
    /**
     * Subtracts one vector from another and returns the result.
     *
     * @param {Chart3DVector} v1 - The first vector.
     * @param {Chart3DVector} v2 - The second vector to subtract from the first.
     * @returns {Chart3DVector} - The resulting vector.
     */
    Vector3D.prototype.vector3DMinus = function (v1, v2) {
        return this.vector3D(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    };
    /**
     * Adds two vectors and returns the result.
     *
     * @param {Chart3DVector} v1 - The first vector.
     * @param {Chart3DVector} v2 - The second vector to add to the first.
     * @returns {Chart3DVector} - The resulting vector.
     */
    Vector3D.prototype.vector3DPlus = function (v1, v2) {
        return this.vector3D(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    };
    /**
     * Multiplies two vectors using the cross product and returns the result.
     *
     * @param {Chart3DVector} v1 - The first vector.
     * @param {Chart3DVector} v2 - The second vector.
     * @returns {Chart3DVector} - The resulting vector.
     */
    Vector3D.prototype.vector3DMultiply = function (v1, v2) {
        var x = v1.y * v2.z - v2.y * v1.z;
        var y = v1.z * v2.x - v2.z * v1.x;
        var z = v1.x * v2.y - v2.x * v1.y;
        return this.vector3D(x, y, z);
    };
    /**
     * Calculates the dot product of two vectors.
     *
     * @param {Chart3DVector} v1 - The first vector.
     * @param {Chart3DVector} v2 - The second vector.
     * @returns {number} - The dot product.
     */
    Vector3D.prototype.vector3DAdd = function (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    };
    /**
     * Multiplies a vector by a scalar value.
     *
     * @param {Chart3DVector} v1 - The vector to multiply.
     * @param {number} value - The scalar value.
     * @returns {Chart3DVector} - The resulting vector.
     */
    Vector3D.prototype.vector3DStarMultiply = function (v1, value) {
        var x = v1.x * value;
        var y = v1.y * value;
        var z = v1.z * value;
        return this.vector3D(x, y, z);
    };
    /**
     * Calculates the length of a vector.
     *
     * @param {Chart3DVector} vector - The vector to calculate the length of.
     * @returns {number} - The length of the vector.
     */
    Vector3D.prototype.getLength = function (vector) {
        var sqt = this.vector3DAdd(vector, vector);
        return Math.sqrt(sqt);
    };
    /**
     * Normalizes the vector to have a length of 1.
     *
     * @returns {void}
     */
    Vector3D.prototype.normalize = function () {
        var length = this.getLength(this);
        this.x /= length;
        this.y /= length;
        this.z /= length;
    };
    /**
     * Calculates the normal vector of a triangle defined by three vectors.
     *
     * @param {Chart3DVector} v1 - The first vertex of the triangle.
     * @param {Chart3DVector} v2 - The second vertex of the triangle.
     * @param {Chart3DVector} v3 - The third vertex of the triangle.
     * @returns {Chart3DVector} - The normal vector of the triangle.
     */
    Vector3D.prototype.getNormal = function (v1, v2, v3) {
        var vector4 = this.vector3DMinus(v1, v2);
        var vector5 = this.vector3DMinus(v3, v2);
        var n = this.vector3DMultiply(vector4, vector5);
        var length = this.getLength(n);
        if (length < this.epsilon) {
            return this.vector3D(0, 0, 0);
        }
        return this.vector3D(n.x / length, n.y / length, n.z / length);
    };
    return Vector3D;
}());
export { Vector3D };
/**
 * Represents a 3x3 or 4x4 matrix in 3D space and provides various matrix operations.
 *
 */
var Matrix3D = /** @class */ (function () {
    function Matrix3D() {
        /** The size of the matrix, which is set to 4 by default. */
        this.matrixSize = 4;
    }
    /**
     * Creates a 3D matrix with the specified size.
     *
     * @param {number} size - The size of the matrix.
     * @returns {number[][]} - The created 3D matrix.
     */
    Matrix3D.prototype.matrix3D = function (size) {
        var matrixData = [];
        for (var i = 0; i < size; i++) {
            matrixData[i] = this.createArray(size);
        }
        return matrixData;
    };
    /**
     * Checks if a matrix is an affine matrix.
     *
     * @param {number[][]} matrixData - The matrix to check.
     * @returns {boolean} - True if the matrix is an affine matrix, false otherwise.
     */
    Matrix3D.prototype.isAffine = function (matrixData) {
        return matrixData[0][3] === 0 && matrixData[1][3] === 0 && matrixData[2][3] === 0 && matrixData[3][3] === 1;
    };
    /**
     * Creates a new array with zeros.
     *
     * @param {number} initialSize - The size of the array.
     * @returns {number[]} - The created array.
     */
    Matrix3D.prototype.createArray = function (initialSize) {
        var matrixData = [];
        for (var index = 0; index < initialSize; ++index) {
            matrixData[index] = 0;
        }
        return matrixData;
    };
    /**
     * Gets the identity matrix.
     *
     * @returns {number[][]} -The identity matrix.
     */
    Matrix3D.prototype.getIdentity = function () {
        var matrixData = this.matrix3D(this.matrixSize);
        for (var i = 0; i < this.matrixSize; i++) {
            matrixData[i][i] = 1.0;
        }
        return matrixData;
    };
    /**
     * Gets the interval of a matrix.
     *
     * @param {number[][]} matrix - The matrix to get the interval for.
     * @returns {number[][]} - The interval matrix.
     */
    Matrix3D.prototype.getInterval = function (matrix) {
        var matrixData = this.getIdentity();
        for (var i = 0; i < this.matrixSize; i++) {
            for (var j = 0; j < this.matrixSize; j++) {
                matrixData[i][j] = this.getMinor(matrix, i, j);
            }
        }
        matrixData = this.transposed(matrixData);
        matrixData = this.getMatrixMultiple(1 / this.getDeterminant(matrix), matrixData);
        return matrixData;
    };
    /**
     * Multiplies all elements of a matrix by a factor.
     *
     * @param {number} factor - The factor to multiply with.
     * @param {number[][]} matrix - The matrix to multiply.
     * @returns {number[][]} - The resulting matrix.
     */
    Matrix3D.prototype.getMatrixMultiple = function (factor, matrix) {
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = matrix[i][j] * factor;
            }
        }
        return matrix;
    };
    /**
     * Multiplies a matrix by a vector.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {Chart3DVector} point - The vector to multiply with.
     * @returns {Chart3DVector} - The resulting vector.
     */
    Matrix3D.prototype.getMatrixVectorMultiple = function (matrix, point) {
        var x = matrix[0][0] * point.x +
            matrix[1][0] * point.y +
            matrix[2][0] * point.z +
            matrix[3][0];
        var y = matrix[0][1] * point.x +
            matrix[1][1] * point.y +
            matrix[2][1] * point.z +
            matrix[3][1];
        var z = matrix[0][2] * point.x +
            matrix[1][2] * point.y +
            matrix[2][2] * point.z +
            matrix[3][2];
        if (!this.isAffine(matrix)) {
            var c = 1 / (matrix[0][3] * point.x + matrix[1][3] * point.y + matrix[2][3] * point.z + matrix[3][3]);
            x *= c;
            y *= c;
            z *= c;
        }
        return { x: x, y: y, z: z };
    };
    /**
     * Multiplies a matrix by a vector and applies translation.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {Chart3DVector} vector - The vector to multiply with.
     * @returns {Vector3D} - The resulting vector.
     */
    Matrix3D.prototype.getMatrixVectorAnd = function (matrix, vector) {
        var x = matrix[0][0] * vector.x +
            matrix[1][0] * vector.y +
            matrix[2][0] * vector.z;
        var y = matrix[0][1] * vector.x +
            matrix[1][1] * vector.y +
            matrix[2][1] * vector.z;
        var z = matrix[0][2] * vector.x +
            matrix[1][2] * vector.y +
            matrix[2][2] * vector.z;
        return new Vector3D(x, y, z);
    };
    /**
     * Multiplies two matrices.
     *
     * @param {number[][]} matrix1 - The first matrix.
     * @param {number[][]} matrix2 - The second matrix.
     * @returns {number[][]} - The resulting matrix.
     */
    Matrix3D.prototype.getMatrixMultiplication = function (matrix1, matrix2) {
        var result = this.getIdentity();
        for (var i = 0; i < this.matrixSize; i++) {
            for (var j = 0; j < this.matrixSize; j++) {
                var value = 0;
                for (var k = 0; k < this.matrixSize; k++) {
                    value += matrix1[k][j] * matrix2[i][k];
                }
                result[i][j] = value;
            }
        }
        return result;
    };
    /**
     * Gets the minor of a matrix.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {number} columnIndex - The column index.
     * @param {number} rowIndex - The row index.
     * @returns {number} - The minor of the matrix.
     * @private
     */
    Matrix3D.prototype.getMinor = function (matrix, columnIndex, rowIndex) {
        return ((columnIndex + rowIndex) % 2 === 0 ? 1 : -1) * this.getDeterminant(this.getMatrix(matrix, columnIndex, rowIndex));
    };
    /**
     * Gets a submatrix of a matrix.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {number} columnIndex - The column index.
     * @param {number} rowIndex - The row index.
     * @returns {number[][]} - The submatrix.
     */
    Matrix3D.prototype.getMatrix = function (matrix, columnIndex, rowIndex) {
        var count = matrix.length - 1;
        var subMatrix = this.createArray(count);
        for (var i = 0; i < count; i++) {
            var matrixColumn = i >= columnIndex ? i + 1 : i;
            subMatrix[i] = this.createArray(count);
            for (var j = 0; j < count; j++) {
                var matrixRow = j >= rowIndex ? j + 1 : j;
                subMatrix[i][j] = matrix[matrixColumn][matrixRow];
            }
        }
        return subMatrix;
    };
    /**
     * Gets the determinant of a matrix.
     *
     * @param {number[][]} matrix - The matrix.
     * @returns {number} - The determinant of the matrix.
     */
    Matrix3D.prototype.getDeterminant = function (matrix) {
        var count = matrix.length;
        var determinant = 0;
        if (count < 2) {
            determinant = matrix[0][0];
        }
        else {
            var k = 1;
            for (var i = 0; i < count; i++) {
                var submatrix = this.getMatrix(matrix, i, 0);
                determinant += k * matrix[i][0] * this.getDeterminant(submatrix);
                k = k > 0 ? -1 : 1;
            }
        }
        return determinant;
    };
    /**
     * Transforms a matrix by translation.
     *
     * @param {number} x - The x-coordinate of the translation.
     * @param {number} y - The y-coordinate of the translation.
     * @param {number} z - The z-coordinate of the translation.
     * @returns {number[][]} - The transformed matrix.
     */
    Matrix3D.prototype.transform = function (x, y, z) {
        var transformedMatrix = this.getIdentity();
        transformedMatrix[3][0] = x;
        transformedMatrix[3][1] = y;
        transformedMatrix[3][2] = z;
        return transformedMatrix;
    };
    /**
     * Creates a matrix for rotation around the y-axis.
     *
     * @param {number} angle - The angle of rotation.
     * @returns {number[][]} - The rotation matrix.
     */
    Matrix3D.prototype.turn = function (angle) {
        var rotatedMatrix = this.getIdentity();
        rotatedMatrix[0][0] = Math.cos(angle);
        rotatedMatrix[2][0] = -Math.sin(angle);
        rotatedMatrix[0][2] = Math.sin(angle);
        rotatedMatrix[2][2] = Math.cos(angle);
        return rotatedMatrix;
    };
    /**
     * Creates a matrix for rotation around the x-axis.
     *
     * @param {number} angle - The angle of rotation.
     * @returns {number[][]} - The rotation matrix.
     */
    Matrix3D.prototype.tilt = function (angle) {
        var rotatedMatrix = this.getIdentity();
        rotatedMatrix[1][1] = Math.cos(angle);
        rotatedMatrix[2][1] = Math.sin(angle);
        rotatedMatrix[1][2] = -Math.sin(angle);
        rotatedMatrix[2][2] = Math.cos(angle);
        return rotatedMatrix;
    };
    /**
     * Transposes a matrix.
     *
     * @param {number[][]} matrix3D - The matrix to transpose.
     * @returns {number[][]} - The transposed matrix.
     */
    Matrix3D.prototype.transposed = function (matrix3D) {
        var transposedMatrix = this.getIdentity();
        for (var i = 0; i < this.matrixSize; i++) {
            for (var j = 0; j < this.matrixSize; j++) {
                transposedMatrix[i][j] = matrix3D[j][i];
            }
        }
        return transposedMatrix;
    };
    return Matrix3D;
}());
export { Matrix3D };
/**
 * Represents a 3D chart transformation utility that provides methods for transforming
 * and projecting 3D coordinates onto a 2D screen.
 *
 */
var ChartTransform3D = /** @class */ (function () {
    /**
     * Initializes a new instance of the `ChartTransform3D` class.
     */
    function ChartTransform3D() {
        /** Represents the angle conversion factor from degrees to radians. */
        this.toRadial = Math.PI / 180;
        this.vector = new Vector3D(0, 0, 0);
        this.matrixObj = new Matrix3D();
    }
    /**
     * Creates a 3D transformation based on the specified size.
     *
     * @param {Size} size - The size of the viewing area.
     * @returns {Chart3DBasicTransform} - The 3D transformation.
     */
    ChartTransform3D.prototype.transform3D = function (size) {
        return {
            viewingArea: size,
            rotation: 0,
            tilt: 0,
            depth: 0,
            perspectiveAngle: 0,
            needUpdate: true,
            centeredMatrix: this.matrixObj.getIdentity(),
            perspective: this.matrixObj.getIdentity(),
            resultMatrix: this.matrixObj.getIdentity(),
            viewMatrix: this.matrixObj.getIdentity()
        };
    };
    /**
     * Applies the specified 3D transformation to the current state.
     *
     * @param {Chart3DBasicTransform} transform - The 3D transformation to apply.
     * @returns {void} - The 3D transformation.
     */
    ChartTransform3D.prototype.transform = function (transform) {
        this.setCenter(this.vector.vector3D(transform.viewingArea.width / 2, transform.viewingArea.height / 2, transform.depth / 2), transform);
        this.setViewMatrix(this.matrixObj.transform(0, 0, transform.depth), transform);
        this.setViewMatrix(this.matrixObj.getMatrixMultiplication(transform.viewMatrix, this.matrixObj.turn(-this.toRadial * transform.rotation)), transform);
        this.setViewMatrix(this.matrixObj.getMatrixMultiplication(transform.viewMatrix, this.matrixObj.tilt(-this.toRadial * transform.tilt)), transform);
        this.updatePerspective(transform.perspectiveAngle, transform);
        transform.needUpdate = true;
    };
    /**
     * Updates the perspective matrix based on the specified angle.
     *
     * @param {number} angle - The perspective angle.
     * @param {Chart3DBasicTransform} transform - The 3D transformation.
     * @returns {void}
     */
    ChartTransform3D.prototype.updatePerspective = function (angle, transform) {
        var width = (((transform.viewingArea.width + transform.viewingArea.height) *
            Math.tan(this.degreeToRadianConverter((180 - Math.abs(angle % 181)) / 2.0))) + (transform.depth * 2) / 2);
        transform.perspective[0][0] = width;
        transform.perspective[1][1] = width;
        transform.perspective[2][3] = 1;
        transform.perspective[3][3] = width;
    };
    /**
     * Converts degrees to radians.
     *
     * @param {number} angle - The angle in degrees.
     * @returns {number} - The angle in radians.
     * @private
     */
    ChartTransform3D.prototype.degreeToRadianConverter = function (angle) {
        return angle * Math.PI / 180;
    };
    /**
     * Transforms a 3D vector to screen coordinates based on the current state.
     *
     * @param {Chart3DVector} vector3D - The 3D vector to transform.
     * @param {Chart3DBasicTransform} transform - The 3D transformation.
     * @param {Matrix3D} chartObj - Optional custom matrix object for transformation.
     * @returns {Chart3DLocation} - The screen coordinates.
     */
    ChartTransform3D.prototype.toScreen = function (vector3D, transform, chartObj) {
        if (!chartObj) {
            transform.chartObj = this.matrixObj;
            vector3D = this.matrixObj.getMatrixVectorMultiple(this.result(transform), vector3D);
        }
        else {
            this.matrixObj = chartObj;
            vector3D = chartObj.getMatrixVectorMultiple(this.result(transform, chartObj), vector3D);
        }
        return { x: vector3D.x, y: vector3D.y };
    };
    /**
     * Sets the view matrix in the transformation state.
     *
     * @param {number[][]} matrix - The new view matrix.
     * @param {Chart3DBasicTransform} transform - The 3D transformation.
     * @returns {void}
     */
    ChartTransform3D.prototype.setViewMatrix = function (matrix, transform) {
        if (transform.viewMatrix === matrix) {
            return;
        }
        transform.viewMatrix = matrix;
        transform.needUpdate = true;
    };
    /**
     * Calculates the final result matrix based on the current state.
     *
     * @param {Chart3DBasicTransform} transform - The 3D transformation.
     * @param {Matrix3D} matrixobj - Optional custom matrix object for transformation.
     * @returns {number[][]} - The final result matrix.
     */
    ChartTransform3D.prototype.result = function (transform, matrixobj) {
        var chartObj = transform.chartObj ? transform.chartObj : this.matrixObj;
        if (!chartObj) {
            chartObj = matrixobj;
        }
        if (!transform.needUpdate) {
            return transform.resultMatrix;
        }
        var matrixObj = this.matrixObj ? this.matrixObj : matrixobj;
        transform.resultMatrix = chartObj.getMatrixMultiplication(matrixObj.getInterval(transform.centeredMatrix), transform.perspective);
        transform.resultMatrix = chartObj.getMatrixMultiplication(transform.resultMatrix, transform.viewMatrix);
        transform.resultMatrix = chartObj.getMatrixMultiplication(transform.resultMatrix, transform.centeredMatrix);
        transform.needUpdate = false;
        return transform.resultMatrix;
    };
    /**
     * Sets the center in the transformation state.
     *
     * @param {Chart3DVector} center - The new center vector.
     * @param {Chart3DBasicTransform} transform - The 3D transformation.
     * @returns {void}
     */
    ChartTransform3D.prototype.setCenter = function (center, transform) {
        transform.centeredMatrix = this.matrixObj.transform(-center.x, -center.y, -center.z);
        transform.needUpdate = true;
    };
    return ChartTransform3D;
}());
export { ChartTransform3D };
/**
 * Represents a 3D graphics rendering utility for drawing and managing 3D elements in a chart.
 *
 */
var Graphics3D = /** @class */ (function () {
    function Graphics3D() {
        /** The vector class. */
        this.vector = new Vector3D(0, 0, 0);
    }
    /**
     * Adds a visual polygon to the 3D chart and returns its identifier.
     *
     * @param {Chart3DPolygon} polygon - The polygon to add.
     * @param {Chart3D} chart - The 3D chart.
     * @returns {number} - The identifier of the added polygon.
     */
    Graphics3D.prototype.addVisual = function (polygon, chart) {
        if (polygon == null || polygonObj.test()) {
            return -1;
        }
        return bspTreeObj.add(polygon, chart);
    };
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
    Graphics3D.prototype.prepareView = function (perspectiveAngle, depth, rotation, tilt, size, chart) {
        if (chart3DRender.transform == null) {
            chart3DRender.transform = chart.transform3D.transform3D(size);
        }
        else {
            chart3DRender.transform.viewingArea = size;
        }
        if (!chart3DRender.tree) {
            chart3DRender.tree = [];
        }
        chart3DRender.transform.rotation = rotation;
        chart3DRender.transform.tilt = tilt;
        chart3DRender.transform.depth = depth;
        chart3DRender.transform.perspectiveAngle = perspectiveAngle;
        chart.transform3D.transform(chart3DRender.transform);
        chart3DRender.tree[chart.chart3D.id] = bspTreeObj.build();
    };
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
    Graphics3D.prototype.view = function (panel, chart, rotation, tilt, size, perspectiveAngle, depth) {
        var MaxValue = 32767;
        if (arguments.length === 2) {
            if (panel == null) {
                return;
            }
            var eyeVector = this.vector.vector3D(0, 0, MaxValue);
            this.drawNode3D(chart3DRender.tree[chart.chart3D.id], eyeVector, panel, chart);
        }
        else {
            if (panel == null) {
                return;
            }
            if (chart3DRender.transform == null) {
                chart3DRender.transform = chart.transform3D.transform3D(size);
            }
            else {
                chart3DRender.transform.viewingArea = size;
            }
            chart3DRender.transform.rotation = rotation;
            chart3DRender.transform.tilt = tilt;
            chart3DRender.transform.depth = depth;
            chart3DRender.transform.perspectiveAngle = perspectiveAngle;
            chart.transform3D.transform(chart3DRender.transform);
            var eye = this.vector.vector3D(0, 0, MaxValue);
            this.drawNode3D(chart3DRender.tree[chart.chart3D.id], eye, panel, chart);
        }
    };
    /**
     * Draws a 3D element based on the specified Binary Space Partitioning Node.
     *
     * @param {Chart3DBspNode} bspElement - The Binary Space Partitioning Node representing the 3D element.
     * @param {Chart3D} chart - The 3D chart.
     * @returns {void}
     */
    Graphics3D.prototype.draw3DElement = function (bspElement, chart) {
        if (bspElement.plane.element) {
            if (bspElement.plane.element.tag === 'text' || bspElement.plane.element.tag === 'dataLabel') {
                polygonObj.drawText(bspElement.plane, chart);
            }
            else if (bspElement.plane.element.tag === 'template') {
                polygonObj.drawTemplate(bspElement.plane, chart);
            }
            else {
                polygonObj.drawLine(bspElement.plane, chart);
            }
        }
        else {
            polygonObj.draw(bspElement.plane, chart);
        }
    };
    /**
     * Draws the 3D nodes starting from the root based on the eye vector.
     *
     * @param {Chart3DBspNode} bspElement - The root Binary Space Partitioning Node.
     * @param {Chart3DVector} eyeVector - The eye vector.
     * @param {Element} panel - The panel element to render the view on.
     * @param {Chart3D} chart - The 3D chart.
     * @returns {void}
     */
    Graphics3D.prototype.drawNode3D = function (bspElement, eyeVector, panel, chart) {
        if (bspElement === null || chart3DRender.transform == null) {
            return;
        }
        var isVector = true;
        while (isVector) {
            var r = vector.vector3DAdd(polygonObj.getNormal(chart.transform3D.result(chart3DRender.transform), bspElement.plane.vectorPoints), eyeVector);
            if (r > bspElement.plane.d) {
                if (bspElement.front != null) {
                    this.drawNode3D(bspElement.front, eyeVector, panel, chart);
                }
                this.draw3DElement(bspElement, chart);
                if (bspElement.back != null) {
                    bspElement = bspElement.back;
                    continue;
                }
            }
            else {
                if (bspElement.back != null) {
                    this.drawNode3D(bspElement.back, eyeVector, panel, chart);
                }
                this.draw3DElement(bspElement, chart);
                if (bspElement.front != null) {
                    bspElement = bspElement.front;
                    continue;
                }
            }
            break;
        }
    };
    return Graphics3D;
}());
export { Graphics3D };
/**
 * Represents a binary tree builder for 3D polygons in a chart.
 *
 */
var BinaryTreeBuilder = /** @class */ (function () {
    function BinaryTreeBuilder(chart) {
        /** A small value used for epsilon comparisons to handle floating-point inaccuracies.*/
        this.epsilon = 0.0005;
        this.chart = chart;
    }
    /**
     * Adds a polygon to the binary tree and returns its index.
     *
     * @param {Chart3DPolygon} polygon - The polygon to add.
     * @param {Chart3D} chart - The 3D chart.
     * @returns {number} - The index of the added polygon.
     */
    BinaryTreeBuilder.prototype.add = function (polygon, chart) {
        this.chart = chart;
        chart.polygons.push(polygon);
        return chart.polygons.length - 1;
    };
    /**
     * Gets the next index considering the array length and the current index.
     *
     * @param {number} index - The current index.
     * @param {number} count - The length of the array.
     * @returns {number} - The next index.
     */
    BinaryTreeBuilder.prototype.getNext = function (index, count) {
        if (index >= count) {
            return index - count;
        }
        if (index < 0) {
            return index + count;
        }
        return index;
    };
    /**
     * Creates a PolyAttributes object based on the vector, index, and result.
     *
     * @param {Chart3DVector} point - The vector representing the point.
     * @param {number} index - The index of the point.
     * @param {string} result - The result classification.
     * @returns {Chart3DPolyAttributes} - The created PolyAttributes object.
     */
    BinaryTreeBuilder.prototype.vector3DIndexClassification = function (point, index, result) {
        return {
            index: index,
            result: result,
            vector: point,
            isCuttingBackPoint: false,
            cuttingBackPairIndex: null,
            alreadyCutBack: false,
            isCuttingFrontPoint: false,
            cuttingFrontPairIndex: null,
            alreadyCutFront: false
        };
    };
    /**
     * Classifies a point relative to a polygon.
     *
     * @param {Chart3DVector} point - The point to classify.
     * @param {Chart3DPolygon} polygon - The polygon for classification.
     * @returns {string} - The classification result ('OnPlane', 'OnBack', 'OnFront').
     */
    BinaryTreeBuilder.prototype.classifyPoint = function (point, polygon) {
        var result = 'OnPlane';
        var signedDistance = -polygon.d - vector.vector3DAdd(point, polygon.normal);
        if (signedDistance > this.epsilon) {
            result = 'OnBack';
        }
        else if (signedDistance < -this.epsilon) {
            result = 'OnFront';
        }
        return result;
    };
    /**
     * Classifies a polygon relative to another polygon.
     *
     * @param {Chart3DPolygon} refPolygon - The reference polygon.
     * @param {Chart3DPolygon} classPolygon - The polygon to classify.
     * @returns {string} - The classification result ('OnPlane', 'ToRight', 'ToLeft', 'Unknown').
     */
    BinaryTreeBuilder.prototype.classifyPolygon = function (refPolygon, classPolygon) {
        var result = 'Unknown';
        var points = classPolygon.points;
        if (points == null) {
            return result;
        }
        var onBack = 0;
        var onFront = 0;
        var onPlane = 0;
        var normal = refPolygon.normal;
        var polygonValue = refPolygon.d;
        for (var i = 0, len = points.length; i < len; i++) {
            var value = -polygonValue - vector.vector3DAdd(points[i], normal);
            if (value > this.epsilon) {
                onBack++;
            }
            else if (value < -this.epsilon) {
                onFront++;
            }
            else {
                onPlane++;
            }
            if (onBack > 0 && onFront > 0) {
                break;
            }
        }
        if (onPlane === points.length) {
            result = 'OnPlane';
        }
        else if (onFront + onPlane === points.length) {
            result = 'ToRight';
        }
        else if (onBack + onPlane === points.length) {
            result = 'ToLeft';
        }
        else {
            result = 'Unknown';
        }
        return result;
    };
    /**
     * Splits a polygon into two parts based on another polygon.
     *
     * @param {Chart3DPolygon} splitPolygon - The polygon to split.
     * @param {Chart3DPolygon} refPolygon - The reference polygon for splitting.
     * @returns {Chart3DPolyCollections} - The resulting back and front parts.
     * @private
     */
    BinaryTreeBuilder.prototype.splitPolygon = function (splitPolygon, refPolygon) {
        var backPoint = [];
        var frontPoint = [];
        if (splitPolygon.points != null) {
            var polyPoints = [];
            var backPartPoints = [];
            var frontPartPoints = [];
            var outputs = void 0;
            var inputs = void 0;
            var count = splitPolygon.points.length;
            for (var i = 0; i < count; i++) {
                var pointB = splitPolygon.points[i];
                var pointC = splitPolygon.points[this.getNext(i + 1, count)];
                var sideB = this.classifyPoint(pointB, refPolygon);
                var sideC = this.classifyPoint(pointC, refPolygon);
                var attributeB = this.vector3DIndexClassification(pointB, polyPoints.length, sideB);
                polyPoints.push(attributeB);
                if (sideB !== sideC && sideB !== 'OnPlane' && sideC !== 'OnPlane') {
                    var vectorValue = vector.vector3DMinus(pointB, pointC);
                    var direction = vector.vector3DMinus(vector.vector3DStarMultiply(refPolygon.normal, -refPolygon.d), pointC);
                    var signedDistance = vector.vector3DAdd(direction, refPolygon.normal);
                    var intersectionParameter = signedDistance / vector.vector3DAdd(refPolygon.normal, vectorValue);
                    var intersectionPoint = vector.vector3DPlus(pointC, vector.vector3DStarMultiply(vectorValue, intersectionParameter));
                    var attributeIntersection = this.vector3DIndexClassification(intersectionPoint, polyPoints.length, 'OnPlane');
                    polyPoints.push(attributeIntersection);
                    backPartPoints.push(attributeIntersection);
                    frontPartPoints.push(attributeIntersection);
                }
                else if (sideB === 'OnPlane') {
                    var pointA = splitPolygon.points[this.getNext(i - 1, count)];
                    var sideA = this.classifyPoint(pointA, refPolygon);
                    if (sideA === sideC) {
                        continue;
                    }
                    if (sideA !== 'OnPlane' && sideC !== 'OnPlane') {
                        backPartPoints.push(attributeB);
                        frontPartPoints.push(attributeB);
                    }
                    else if (sideA === 'OnPlane') {
                        switch (sideC) {
                            case 'OnBack':
                                backPartPoints.push(attributeB);
                                break;
                            case 'OnFront':
                                frontPartPoints.push(attributeB);
                                break;
                        }
                    }
                    else if (sideC === 'OnPlane') {
                        switch (sideA) {
                            case 'OnBack':
                                backPartPoints.push(attributeB);
                                break;
                            case 'OnFront':
                                frontPartPoints.push(attributeB);
                                break;
                        }
                    }
                }
            }
            if (frontPartPoints.length !== 0 || backPartPoints.length !== 0) {
                for (var i = 0; i < backPartPoints.length - 1; i += 2) {
                    var backAttribute1 = backPartPoints[i];
                    var backAttribute2 = backPartPoints[i + 1];
                    backAttribute1.cuttingBackPoint = true;
                    backAttribute2.cuttingBackPoint = true;
                    backAttribute1.alterCuttingBackPairIndex = backAttribute2.index;
                    backAttribute2.alterCuttingBackPairIndex = backAttribute1.index;
                }
                for (var i = 0; i < frontPartPoints.length - 1; i += 2) {
                    var frontAttribute1 = frontPartPoints[i];
                    var frontAttribute2 = frontPartPoints[i + 1];
                    frontAttribute1.cuttingFrontPoint = true;
                    frontAttribute2.cuttingFrontPoint = true;
                    frontAttribute1.alterCuttingFrontPairIndex = frontAttribute2.index;
                    frontAttribute2.alterCuttingFrontPairIndex = frontAttribute1.index;
                }
                for (var i = 0; i < backPartPoints.length - 1; i++) {
                    var backAttribute1 = backPartPoints[i];
                    if (backAttribute1.alreadyCutBack) {
                        continue;
                    }
                    outputs = this.cutOutBackPolygon(polyPoints, backAttribute1);
                    if (outputs.length > 2) {
                        var polygon1 = polygonObj.polygon3D(outputs, splitPolygon);
                        backPoint.push(__assign({}, polygon1));
                    }
                }
                for (var i = 0; i < frontPartPoints.length - 1; i++) {
                    var backAttribute2 = frontPartPoints[i];
                    if (backAttribute2.alreadyCutFront) {
                        continue;
                    }
                    inputs = this.cutOutFrontPolygon(polyPoints, backAttribute2);
                    if (inputs.length > 2) {
                        var polygon2 = polygonObj.polygon3D(inputs, splitPolygon);
                        frontPoint.push(__assign({}, polygon2));
                    }
                }
            }
        }
        else {
            backPoint.push(splitPolygon);
            frontPoint.push(splitPolygon);
        }
        return { backPolygon: backPoint, frontPolygon: frontPoint };
    };
    /**
     * Cuts out the front part of a polygon based on the PolyAttributes.
     *
     * @param {Chart3DPolyAttributes[]} polyPoints - The PolyAttributes array of the polygon.
     * @param {Chart3DPolyAttributes} initialVertex - The PolyAttributes representing the cutting point.
     * @returns {Chart3DVector[]} - The resulting points of the front part.
     */
    BinaryTreeBuilder.prototype.cutOutFrontPolygon = function (polyPoints, initialVertex) {
        var points = [];
        var currentVertex = initialVertex;
        var isVector = true;
        while (isVector) {
            currentVertex.alreadyCutFront = true;
            points.push(currentVertex.vector);
            var currentVertexPair = polyPoints[currentVertex.alterCuttingFrontPairIndex];
            if (currentVertex.cuttingFrontPoint) {
                if (!currentVertexPair.alreadyCutFront) {
                    currentVertex = currentVertexPair;
                }
                else {
                    var previousVertexOnBack = polyPoints[this.getNext(currentVertex.index - 1, polyPoints.length)];
                    var nextVertexOnBack = polyPoints[this.getNext(currentVertex.index + 1, polyPoints.length)];
                    if (previousVertexOnBack.result === 'OnFront' && !previousVertexOnBack.alreadyCutFront) {
                        currentVertex = previousVertexOnBack;
                    }
                    else if (nextVertexOnBack.result === 'OnFront' && !nextVertexOnBack.alreadyCutFront) {
                        currentVertex = nextVertexOnBack;
                    }
                    else {
                        return points;
                    }
                }
            }
            else {
                var previousVertexOnBack = polyPoints[this.getNext(currentVertex.index - 1, polyPoints.length)];
                var nextVertexOnBack = polyPoints[this.getNext(currentVertex.index + 1, polyPoints.length)];
                if (previousVertexOnBack.result !== 'OnBack' && !previousVertexOnBack.alreadyCutFront) {
                    currentVertex = previousVertexOnBack;
                }
                else if (nextVertexOnBack.result !== 'OnBack' && !nextVertexOnBack.alreadyCutFront) {
                    currentVertex = nextVertexOnBack;
                }
                else {
                    return points;
                }
            }
        }
        return null;
    };
    /**
     * Cuts out the back part of a polygon based on the PolyAttributes.
     *
     * @param {Chart3DPolyAttributes[]} polyPoints - The PolyAttributes array of the polygon.
     * @param {Chart3DPolyAttributes} initialVertex - The PolyAttributes representing the cutting point.
     * @returns {Chart3DVector[]} - The resulting points of the back part.
     */
    BinaryTreeBuilder.prototype.cutOutBackPolygon = function (polyPoints, initialVertex) {
        var points = [];
        var currentVertex = initialVertex;
        var isVector = true;
        while (isVector) {
            currentVertex.alreadyCutBack = true;
            points.push(currentVertex.vector);
            var currentVertexPair = polyPoints[currentVertex.alterCuttingBackPairIndex];
            if (currentVertex.cuttingBackPoint) {
                if (!currentVertexPair.alreadyCutBack) {
                    currentVertex = currentVertexPair;
                }
                else {
                    var previousVertexOnBack = polyPoints[this.getNext(currentVertex.index - 1, polyPoints.length)];
                    var nextVertexOnBack = polyPoints[this.getNext(currentVertex.index + 1, polyPoints.length)];
                    if (previousVertexOnBack.result === 'OnBack' && !previousVertexOnBack.alreadyCutBack) {
                        currentVertex = previousVertexOnBack;
                    }
                    else if (nextVertexOnBack.result === 'OnBack' && !nextVertexOnBack.alreadyCutBack) {
                        currentVertex = nextVertexOnBack;
                    }
                    else {
                        return points;
                    }
                }
            }
            else {
                var previousVertexOnBack = polyPoints[this.getNext(currentVertex.index - 1, polyPoints.length)];
                var nextVertexOnBack = polyPoints[this.getNext(currentVertex.index + 1, polyPoints.length)];
                if (previousVertexOnBack.result !== 'OnFront' && !previousVertexOnBack.alreadyCutBack) {
                    currentVertex = previousVertexOnBack;
                }
                else if (nextVertexOnBack.result !== 'OnFront' && !nextVertexOnBack.alreadyCutBack) {
                    currentVertex = nextVertexOnBack;
                }
                else {
                    return points;
                }
            }
        }
        return null;
    };
    /**
     * Builds a Binary Space Partitioning from a list of polygons.
     *
     * @param {Chart3DPolygon[]} [points] - The list of polygons to build the tree from.
     * @returns {Chart3DBspNode} - The root node of the Binary Space Partitioning tree.
     */
    BinaryTreeBuilder.prototype.build = function (points) {
        if (!points) {
            return this.build(this.chart.polygons);
        }
        else {
            var inputPolygons = points;
            if (inputPolygons.length < 1) {
                return null;
            }
            var bspNode = { back: null, front: null, plane: null };
            var plane = inputPolygons[0];
            bspNode.plane = plane;
            var polygonsToLeft = [];
            var polygonsToRight = [];
            for (var i = 1, len = inputPolygons.length; i < len; i++) {
                var currentPolygon = inputPolygons[i];
                if (currentPolygon === plane) {
                    continue;
                }
                var classificationResult = this.classifyPolygon(plane, currentPolygon);
                switch (classificationResult) {
                    case 'OnPlane':
                    case 'ToRight':
                        polygonsToRight.push(currentPolygon);
                        break;
                    case 'ToLeft':
                        polygonsToLeft.push(currentPolygon);
                        break;
                    case 'Unknown':
                        if (currentPolygon.element && (currentPolygon.element.tag === 'line' || currentPolygon.element.tag === 'text')) {
                            polygonsToLeft.push(currentPolygon);
                        }
                        else {
                            var result = this.splitPolygon(currentPolygon, plane);
                            for (var k = 0; k < result.backPolygon.length; k++) {
                                result.backPolygon[k].name = result.backPolygon[k].name + '-back';
                                polygonsToLeft.push(result.backPolygon[k]);
                            }
                            for (var j = 0; j < result.frontPolygon.length; j++) {
                                result.frontPolygon[j].name = result.frontPolygon[j].name + '-front';
                                polygonsToRight.push(result.frontPolygon[j]);
                            }
                        }
                        break;
                }
            }
            if (polygonsToLeft.length > 0) {
                bspNode.back = this.build(polygonsToLeft);
            }
            if (polygonsToRight.length > 0) {
                bspNode.front = this.build(polygonsToRight);
            }
            return bspNode;
        }
    };
    return BinaryTreeBuilder;
}());
export { BinaryTreeBuilder };
/**
 * The Svg3DRenderer class provides methods for rendering SVG graphics in a 3D context.
 */
var Svg3DRenderer = /** @class */ (function () {
    function Svg3DRenderer() {
    }
    /**
     * Gets a Chart3DStringBuilder instance for constructing strings.
     *
     * @returns {Chart3DStringBuilder} - The StringBuilder instance.
     */
    Svg3DRenderer.prototype.getStringBuilder = function () {
        var data = [];
        var counter = 0;
        return {
            append: function (text) {
                data[counter++] = text;
                return this;
            },
            remove: function (i, j) {
                data.splice(i, j || 1);
                return this;
            },
            insert: function (i, text) {
                data.splice(i, 0, text);
                return this;
            },
            toString: function (text) {
                return data.join(text || '');
            }
        };
    };
    /**
     * Parses a hex color code and returns its Red green Blue values.
     *
     * @param {string} hexColorCode - The hex color code.
     * @returns {Chart3DColorFormat | null} - The parsed color format (Red green Blue) or null if parsing fails.
     */
    Svg3DRenderer.prototype.hexToValue = function (hexColorCode) {
        var result;
        var values;
        if (hexColorCode.indexOf('rgba(') === 0) {
            values = hexColorCode.slice(5, -1).split(',');
            return values ? {
                red: parseInt(values[0], 10),
                green: parseInt(values[1], 10),
                blue: parseInt(values[2], 10),
                alpha: parseFloat(values[3])
            } : null;
        }
        else if (hexColorCode.indexOf('rgb(') === 0) {
            values = hexColorCode.slice(4, -1).split(',');
            return values ? {
                red: parseInt(values[0], 10),
                green: parseInt(values[1], 10),
                blue: parseInt(values[2], 10)
            } : null;
        }
        else {
            result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColorCode);
            return result
                ? {
                    red: parseInt(result[1], 16),
                    green: parseInt(result[2], 16),
                    blue: parseInt(result[3], 16)
                }
                : null;
        }
    };
    /**
     * Converts a Chart3DColorFormat object to its corresponding color string.
     *
     * @param {Chart3DColorFormat} color - The color in Chart3DColorFormat.
     * @returns {string} - The color string representation.
     */
    Svg3DRenderer.prototype.hexColor = function (color) {
        var redValue = color.red;
        var greenValue = color.green;
        var blueValue = color.blue;
        if (color.alpha) {
            var returnColor = "rgba(" + redValue.toString() + "," + greenValue.toString() + "," + blueValue.toString() + "," + color.alpha + ")";
            return returnColor;
        }
        else {
            var hex_1 = [redValue.toString(16), greenValue.toString(16), blueValue.toString(16)];
            hex_1.forEach(function (val, nr) {
                if (val.length === 1) {
                    hex_1[nr] = '0' + val;
                }
            });
            return '#' + hex_1.join('').toUpperCase();
        }
    };
    /**
     * Checks if a given color string is in a valid format (hex or rgba).
     *
     * @param {string} color - The color string to check.
     * @returns {boolean} - True if the color string is valid, otherwise false.
     */
    Svg3DRenderer.prototype.checkColorFormat = function (color) {
        if (color.indexOf('rgba(') === 0 || color.indexOf('rgb(') === 0) {
            var rgbaValues = color.substring(color.indexOf('(') + 1, color.lastIndexOf(')')).split(',');
            if (rgbaValues.length === 3 || rgbaValues.length === 4) {
                return rgbaValues.every(function (val) {
                    var num = parseFloat(val);
                    return !isNaN(num) && num >= 0 && num <= 255;
                });
            }
        }
        else if (color.indexOf('#') === 0) {
            var hex = color.substring(1);
            return (hex.length === 3 || hex.length === 6) && /^[0-9A-Fa-f]{3,6}$/.test(hex);
        }
        return false;
    };
    /**
     * Draws text on an SVG element.
     *
     * @param {any} options - The options for drawing the text.
     * @param {string | string[]} label - The text label.
     * @param {FontModel} font - The font settings for the text.
     * @param {Chart3D} chart - The 3D chart instance.
     * @returns {Element} - The created SVG text element.
     */
    Svg3DRenderer.prototype.drawText = function (options, label, font, chart) {
        var text = document.getElementById(options.id);
        if (text === null) {
            text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        }
        if (label.length > 1 && typeof label !== 'string') {
            var dy = 0;
            for (var i = 0; i < label.length; i++) {
                var tspanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspanElement.textContent = label[i];
                tspanElement.setAttribute('x', String(options.x));
                tspanElement.setAttribute('dy', String(dy));
                text.appendChild(tspanElement);
                dy = measureText(label[i], font, chart.themeStyle.axisLabelFont).height;
            }
        }
        else {
            text.textContent = label;
        }
        text = chart.svgRenderer.setElementAttributes(options, text);
        return text;
    };
    /**
     * Transforms 3D coordinates to visible 2D coordinates on the chart.
     *
     * @param {Chart3DSeries} currentSeries - The current 3D series.
     * @param {number} x - The x-coordinate in 3D space.
     * @param {number} y - The y-coordinate in 3D space.
     * @param {Chart3D} chart - The 3D chart instance.
     * @returns {Chart3DLocation} - The transformed 2D coordinates.
     */
    Svg3DRenderer.prototype.transform3DToVisible = function (currentSeries, x, y, chart) {
        if (currentSeries.xAxis != null && currentSeries.yAxis != null) {
            var valueType = currentSeries.xAxis.valueType;
            var xlogarithmicBase = 10; // Replace with the actual logarithmic base if needed
            var xIsLogarithmic = valueType === 'Logarithmic';
            // Apply logarithmic transformation if necessary
            if (xIsLogarithmic && x > 0) {
                x = Math.log(x) / Math.log(xlogarithmicBase);
            }
            var ylogarithmicBase = currentSeries.yAxis.logBase;
            var yIsLogarithmic = currentSeries.yAxis.valueType === 'Logarithmic';
            // Apply logarithmic transformation if necessary
            if (yIsLogarithmic && y > 0) {
                y = Math.log(y) / Math.log(ylogarithmicBase);
            }
            // Adjust the coordinates based on inverted axes
            if (chart.requireInvertedAxis) {
                var left = chart.chartAxisLayoutPanel.seriesClipRect.x;
                var top_1 = chart.chartAxisLayoutPanel.seriesClipRect.y;
                var pointX = left + currentSeries.yAxis.rect.width * valueToCoefficients(y, currentSeries.yAxis);
                var pointY = top_1 + currentSeries.xAxis.rect.height * (1 - valueToCoefficients(x, currentSeries.xAxis));
                return { x: pointX, y: pointY };
            }
            else {
                var left = currentSeries.xAxis.rect.x;
                var top_2 = currentSeries.yAxis.rect.y;
                var newX = left + Math.round(currentSeries.xAxis.rect.width * valueToCoefficients(x, currentSeries.xAxis));
                var newY = top_2 + Math.round(currentSeries.yAxis.rect.height * (1 - valueToCoefficients(y, currentSeries.yAxis)));
                return { x: newX, y: newY };
            }
        }
        // Return a default Point if xAxis and yAxis are null
        return { x: 0, y: 0 };
    };
    return Svg3DRenderer;
}());
export { Svg3DRenderer };
/**
 * Represents a 3D polygon in a chart.
 *
 */
var Polygon3D = /** @class */ (function () {
    function Polygon3D() {
        /** A small constant used for numerical comparisons. */
        this.epsilon = 0.00001;
        /** A small constant used for numerical comparisons. */
        this.normal = { x: 0, y: 0, z: 0 };
        /** A small constant used for numerical comparisons. */
        this.vector = new Vector3D(0, 0, 0);
        /** A small constant used for numerical comparisons. */
        this.vectorPoints = [];
        /** A small constant used for numerical comparisons. */
        this.matrixObj = new Matrix3D();
        /** A small constant used for numerical comparisons. */
        this.tabIndex = true;
    }
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
    Polygon3D.prototype.polygon3D = function (points, tag, index, stroke, strokeThickness, opacity, fill, name, parent, text) {
        if (arguments.length === 3) {
            this.calculateNormal(points, tag, index);
            return null;
        }
        else if (arguments.length === 2) {
            //points = arguments[0];
            this.calculateNormal(points[0], points[1], points[2]);
            this.vectorPoints = points;
            this.calculateNormal(this.vectorPoints);
            var polygon = tag;
            polygon.normal = this.normal;
            polygon.points = points;
            polygon.vectorPoints = this.vectorPoints;
            polygon.isSplit = true;
            polygon.d = this.d;
            return polygon;
        }
        else {
            this.calculateNormal(points[0], points[1], points[2]);
            this.vectorPoints = points;
            this.calculateNormal(this.vectorPoints);
            var element = { tag: 'path', parent: parent };
            var polygon = {
                normal: this.normal,
                points: points,
                vectorPoints: this.vectorPoints,
                index: index,
                tag: tag,
                name: name ? name : null,
                strokeThickness: strokeThickness,
                opacity: opacity,
                fill: fill,
                d: this.d,
                text: text ? text : '',
                polygonElement: element
            };
            if (arguments.length !== 1) {
                polygon.polygonElement = element;
            }
            return polygon;
        }
    };
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
    Polygon3D.prototype.createLine = function (line, x1, y1, x2, y2, depth) {
        var strokeThickness = line.width;
        var vectorCollection = [];
        vectorCollection[0] = this.vector.vector3D(x1, y1, depth);
        vectorCollection[1] = this.vector.vector3D(x1 + strokeThickness, y2 + strokeThickness, depth);
        vectorCollection[2] = this.vector.vector3D(x2, y2, depth);
        return this.line3D(line, vectorCollection);
    };
    /**
     *  Creates a 3D line polygon based on the given tick elements and points.
     *
     * @param {Chart3DTickElement} element - The tick elements associated with the line.
     * @param {Chart3DVector[]} points - The array of 3D vector points defining the line in 3D space.
     * @returns {Chart3DPolygon} - Returns the created 3D line polygon.
     */
    Polygon3D.prototype.line3D = function (element, points) {
        var plane = this.polygon3D(points);
        plane.element = element;
        return plane;
    };
    /**
     * Creates a 3D text polygon based on the given label element and points.
     *
     * @param {Chart3DLabelElement} element - The label element associated with the text.
     * @param {Chart3DVector[]} points - The array of 3D vector points defining the position of the text in 3D space.
     * @returns {Chart3DPolygon} - Returns the created 3D text polygon.
     */
    Polygon3D.prototype.text3D = function (element, points) {
        var plane = this.polygon3D(points);
        plane.element = element;
        return plane;
    };
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
    Polygon3D.prototype.createCylinder = function (v1, //top left front vecotr.
    v2, // bottom right back vector.
    chart, index, type, stroke, fill, strokeThickness, opacity, name, parent) {
        var i = 0; //cylinder path count.
        var offsetX;
        var offsetY;
        var offsetZ;
        var vectorCollection;
        var pathCount = 24;
        var theta = 360 / pathCount;
        var degreeToRadian = Math.PI / 180;
        var centerZ = (v1.z + v2.z) / 2;
        var result = [];
        var outPoints = [];
        var topVector = [];
        var bottomVector = [];
        var radiusB = (v2.y - v1.y) < (v2.z - v1.z) ? (v2.y - v1.y) / 2 : (v2.z - v1.z) / 2;
        var radiusC = (v2.x - v1.x) < (v2.z - v1.z) ? (v2.x - v1.x) / 2 : (v2.z - v1.z) / 2;
        var centerX = (v1.x + v2.x) / 2;
        var centerY = (v1.y + v2.y) / 2;
        switch (type) {
            case 'Bar':
            case 'StackingBar':
            case 'StackingBar100':
                pathCount++;
                while (pathCount--) {
                    offsetY = centerY + radiusB * Math.cos((i * theta) * degreeToRadian);
                    offsetZ = centerZ + radiusB * Math.sin((i * theta) * degreeToRadian);
                    outPoints[i] = { Y: offsetY, Z: offsetZ };
                    topVector.push(this.vector.vector3D(v1.x, outPoints[i].Y, outPoints[i].Z));
                    bottomVector.push(this.vector.vector3D(v2.x, outPoints[i].Y, outPoints[i].Z));
                    if (i > 0) {
                        vectorCollection = [
                            this.vector.vector3D(v1.x, outPoints[i - 1].Y, outPoints[i - 1].Z),
                            this.vector.vector3D(v2.x, outPoints[i - 1].Y, outPoints[i - 1].Z),
                            this.vector.vector3D(v2.x, outPoints[i].Y, outPoints[i].Z),
                            this.vector.vector3D(v1.x, outPoints[i].Y, outPoints[i].Z)
                        ];
                        result[i + 1] = this.polygon3D(vectorCollection, chart, index, fill, 0, opacity, fill, ('-' + (i + 1).toString() + '-' + name), parent);
                        graphics.addVisual(result[i + 1], chart);
                    }
                    i++;
                }
                break;
            case 'Column':
            case 'StackingColumn':
            case 'StackingColumn100':
                pathCount++;
                while (pathCount--) {
                    offsetX = centerX + radiusC * Math.cos((i * theta) * degreeToRadian);
                    offsetZ = centerZ + radiusC * Math.sin((i * theta) * degreeToRadian);
                    outPoints[i] = { Y: offsetX, Z: offsetZ };
                    topVector.push(this.vector.vector3D(outPoints[i].Y, v1.y, outPoints[i].Z));
                    bottomVector.push(this.vector.vector3D(outPoints[i].Y, v2.y, outPoints[i].Z));
                    if (i > 0) {
                        vectorCollection = [
                            this.vector.vector3D(outPoints[i - 1].Y, v1.y, outPoints[i - 1].Z),
                            this.vector.vector3D(outPoints[i - 1].Y, v2.y, outPoints[i - 1].Z),
                            this.vector.vector3D(outPoints[i].Y, v2.y, outPoints[i].Z),
                            this.vector.vector3D(outPoints[i].Y, v1.y, outPoints[i].Z)
                        ];
                        result[i + 1] = this.polygon3D(vectorCollection, chart, index, fill, 0, opacity, fill, '-' + (i + 1).toString() + '-' + name, parent);
                        graphics.addVisual(result[i + 1], chart);
                    }
                    i++;
                }
                break;
        }
        result[0] = this.polygon3D(bottomVector, chart, index, stroke, 0, opacity, fill, '-0-' + name, parent);
        result[1] = this.polygon3D(topVector, chart, index, stroke, strokeThickness, opacity, fill, '-1-' + name, parent);
        graphics.addVisual(result[0], chart);
        graphics.addVisual(result[1], chart);
        return result;
    };
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
    Polygon3D.prototype.createBox = function (v1, //top left front vecotr.
    v2, // bottom right back vector.
    chart, index, stroke, fill, strokeThickness, opacity, inverse, name, parent, text) {
        var result = [];
        var point1 = [
            this.vector.vector3D(v1.x, v1.y, v1.z),
            this.vector.vector3D(v2.x, v1.y, v1.z),
            this.vector.vector3D(v2.x, v2.y, v1.z),
            this.vector.vector3D(v1.x, v2.y, v1.z)
        ];
        var point2 = [
            this.vector.vector3D(v1.x, v1.y, v2.z),
            this.vector.vector3D(v2.x, v1.y, v2.z),
            this.vector.vector3D(v2.x, v2.y, v2.z),
            this.vector.vector3D(v1.x, v2.y, v2.z)
        ];
        var point3 = [
            this.vector.vector3D(v1.x, v1.y, v2.z),
            this.vector.vector3D(v2.x, v1.y, v2.z),
            this.vector.vector3D(v2.x, v1.y, v1.z),
            this.vector.vector3D(v1.x, v1.y, v1.z)
        ];
        var point4 = [
            this.vector.vector3D(v1.x, v2.y, v2.z),
            this.vector.vector3D(v2.x, v2.y, v2.z),
            this.vector.vector3D(v2.x, v2.y, v1.z),
            this.vector.vector3D(v1.x, v2.y, v1.z)
        ];
        var point5 = [
            this.vector.vector3D(v1.x, v1.y, v1.z),
            this.vector.vector3D(v1.x, v1.y, v2.z),
            this.vector.vector3D(v1.x, v2.y, v2.z),
            this.vector.vector3D(v1.x, v2.y, v1.z)
        ];
        var point6 = [
            this.vector.vector3D(v2.x, v1.y, v1.z),
            this.vector.vector3D(v2.x, v1.y, v2.z),
            this.vector.vector3D(v2.x, v2.y, v2.z),
            this.vector.vector3D(v2.x, v2.y, v1.z)
        ];
        if (name) {
            result[0] = this.polygon3D(point1, chart, index, stroke, strokeThickness, opacity, fill, '-0-' + name, parent, text);
            result[1] = this.polygon3D(point2, chart, index, stroke, strokeThickness, opacity, fill, '-1-' + name, parent, text);
            result[2] = this.polygon3D(point3, chart, index, stroke, strokeThickness, opacity, fill, '-2-' + name, parent, text);
            result[3] = this.polygon3D(point4, chart, index, stroke, strokeThickness, opacity, fill, '-3-' + name, parent, text);
            result[4] = this.polygon3D(point5, chart, index, stroke, strokeThickness, opacity, fill, '-4-' + name, parent, text);
            result[5] = this.polygon3D(point6, chart, index, stroke, strokeThickness, opacity, fill, '-5-' + name, parent, text);
        }
        else {
            result[0] = this.polygon3D(point1, chart, index, stroke, strokeThickness, opacity, fill, '-0-' + index, parent, text);
            result[1] = this.polygon3D(point2, chart, index, stroke, strokeThickness, opacity, fill, '-1-' + index, parent, text);
            result[2] = this.polygon3D(point3, chart, index, stroke, strokeThickness, opacity, fill, '-2-' + index, parent, text);
            result[3] = this.polygon3D(point4, chart, index, stroke, strokeThickness, opacity, fill, '-3-' + index, parent, text);
            result[4] = this.polygon3D(point5, chart, index, stroke, strokeThickness, opacity, fill, '-4-' + index, parent, text);
            result[5] = this.polygon3D(point6, chart, index, stroke, strokeThickness, opacity, fill, '-5-' + index, parent, text);
        }
        if (inverse) {
            graphics.addVisual(result[0], chart);
            graphics.addVisual(result[1], chart);
            graphics.addVisual(result[2], chart);
            graphics.addVisual(result[3], chart);
            graphics.addVisual(result[4], chart);
            graphics.addVisual(result[5], chart);
        }
        else {
            graphics.addVisual(result[5], chart);
            graphics.addVisual(result[4], chart);
            graphics.addVisual(result[0], chart);
            graphics.addVisual(result[1], chart);
            graphics.addVisual(result[2], chart);
            graphics.addVisual(result[3], chart);
        }
        return result;
    };
    /**
     * Calculates the normal vector for a 3D polygon based on the provided points.
     *
     * @param {...Chart3DVector} args - Variable number of vector3d arguments representing points of the polygon.
     * @returns {void}
     */
    Polygon3D.prototype.calculateNormal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length >= 3) {
            // Relative information of the points
            var vector1 = args[0];
            var vector2 = args[1];
            var vector3 = args[2];
            var vector4 = this.vector.vector3DMinus(vector1, vector2);
            var vector5 = this.vector.vector3DMinus(vector3, vector2);
            var normal = this.vector.vector3DMultiply(vector4, vector5);
            var length_1 = this.vector.getLength(normal); // Get length of the vector
            if (length_1 < this.epsilon) {
                length_1 = 1;
            }
            this.normal = this.vector.vector3D(normal.x / length_1, normal.y / length_1, normal.z / length_1); // Calculate normalization of the vector
            this.d = -(this.normal.x * vector1.x + this.normal.y * vector1.y + this.normal.z * vector1.z); // Normalized values * 1st coordinates Coordinates - Depth of the plan
            if (args[3]) {
                args[3].normal = this.normal;
                args[3].d = this.d;
            }
        }
        else {
            var Points = args[0];
            this.calculateNormal(Points[0], Points[1], Points[2], args[1]);
            for (var i = 3; (i < Points.length) && (this.test()); i++) {
                this.calculateNormal(Points[i], Points[0], Points[i / 2]);
            }
        }
    };
    /**
     * Tests whether the calculated normal vector is valid.
     *
     * @returns {boolean} - Returns true if the normal vector is valid, false otherwise.
     */
    Polygon3D.prototype.test = function () {
        return !this.vector.isValid(this.normal);
    };
    /**
     * Transforms the vector points of the specified polygon using the provided matrix.
     *
     * @param {number[][]} matrix - The transformation matrix.
     * @param {Chart3DPolygon} polygon - The polygon to transform.
     * @returns {void}
     */
    Polygon3D.prototype.transform = function (matrix, polygon) {
        if (polygon.points != null) {
            for (var i = 0; i < polygon.points.length; i++) {
                polygon.vectorPoints[i] = polygon.points[i] =
                    matrixObj.getMatrixVectorMultiple(matrix, polygon.points[i]);
            }
            this.calculateNormal(polygon.vectorPoints, polygon);
        }
    };
    /**
     *  Gets the normal vector based on the transformed points using the specified transformation matrix.
     *
     * @param {number[][]} transform - The transformation matrix.
     * @param {Chart3DVector[]} [vectorPoints] - The vector points.
     * @returns {Chart3DVector} - Returns the normal vector.
     * @private
     */
    Polygon3D.prototype.getNormal = function (transform, vectorPoints) {
        var normal;
        if (vectorPoints != null) {
            normal = this.vector.getNormal(this.matrixObj.getMatrixVectorMultiple(transform, vectorPoints[0]), matrixObj.getMatrixVectorMultiple(transform, vectorPoints[1]), this.matrixObj.getMatrixVectorMultiple(transform, vectorPoints[2]));
            for (var i = 3; (i < vectorPoints.length) && !this.vector.isValid(normal) && vectorPoints[i / 2]; i++) {
                var v1 = matrixObj.getMatrixVectorMultiple(transform, vectorPoints[i]);
                var v2 = matrixObj.getMatrixVectorMultiple(transform, vectorPoints[0]);
                var v3 = matrixObj.getMatrixVectorMultiple(transform, vectorPoints[i / 2]);
                normal = this.vector.getNormal(v1, v2, v3);
            }
        }
        else {
            normal = matrixObj.getMatrixVectorAnd(transform);
            this.vector.normalize();
        }
        return normal;
    };
    /**
     * A method for creating text element.
     *
     * @param {Chart3DVector} position - text position.
     * @param {Chart3DLabelElement} element - text element.
     * @param {number} xLength - text element x value.
     * @param {number} yLength - text element y value.
     * @returns {Chart3DPolygon} - Returns the polygon.
     */
    Polygon3D.prototype.createTextElement = function (position, element, xLength, yLength) {
        var vectorCollection = [];
        var x = position.x;
        var y = position.y;
        var desiredWidth = element.width;
        var desiredHeight = element.height;
        vectorCollection[0] = this.vector.vector3D(x, y, position.z);
        vectorCollection[1] = this.vector.vector3D(x + desiredWidth, y + desiredHeight + yLength, position.z);
        vectorCollection[2] = this.vector.vector3D(x + desiredWidth + xLength, y + desiredHeight + yLength, position.z);
        return this.text3D(element, vectorCollection);
    };
    /**
     * Draws a template on the specified 3D chart panel.
     *
     * @param {Chart3DPolygon} panel - The 3D polygon representing the panel on which the template will be drawn.
     * @param {Chart3D} chart - The 3D chart to which the panel belongs.
     * @returns {void}
     */
    Polygon3D.prototype.drawLine = function (panel, chart) {
        var transform = chart3DRender.transform;
        if (transform == null) {
            return;
        }
        var actual3DPosition1 = chart.transform3D.toScreen(panel.vectorPoints[0], transform);
        var actual3DPosition2 = chart.transform3D.toScreen(panel.vectorPoints[2], transform);
        var optionsLine = {
            'id': panel.element.id,
            'x1': actual3DPosition1.x,
            'y1': actual3DPosition1.y,
            'x2': actual3DPosition2.x,
            'y2': actual3DPosition2.y,
            'stroke-dasharray': '',
            'stroke-width': panel.element.width,
            'stroke': panel.element.stroke,
            'opacity': panel.element.opacity
        };
        chart.chart3D.appendChild(chart.svgRenderer.drawLine(optionsLine));
        if (chart.previousID && chart.isTouch) {
            var previousElement = document.getElementById(chart.previousID);
            var currentElement = document.getElementById(optionsLine.id);
            if (previousElement && currentElement) {
                currentElement.parentNode.insertBefore(currentElement, previousElement.nextSibling);
            }
        }
        chart.previousID = optionsLine.id;
    };
    /**
     * Draws text on the specified 3D chart panel.
     *
     * @param {Chart3DPolygon} panel - The 3D polygon representing the panel on which the text will be drawn.
     * @param {Chart3D} chart - The 3D chart to which the panel belongs.
     * @returns {void}
     */
    Polygon3D.prototype.drawTemplate = function (panel, chart) {
        var element = panel.element;
        var transform = chart3DRender.transform;
        if (transform == null) {
            return;
        }
        var label = element.label;
        var actual3DPosition = chart.transform3D.toScreen(panel.vectorPoints[0], transform);
        chart.dataLabel3DModule.createDataLabelTemplate(label.series.dataLabelElement, label.series, label.series.dataLabel, label.series.visiblePoints[label.pointIndex], element.argsData, label.pointIndex, false, actual3DPosition);
    };
    /**
     * Draws a data label symbol for a specific data point in a three-dimensional series.
     *
     * @param {Chart3DPolygon} panel - The 3D polygon representing the panel on which the text will be drawn.
     * @param {Chart3D} chart - The 3D chart to which the panel belongs.
     * @returns {void}
     */
    Polygon3D.prototype.drawText = function (panel, chart) {
        var element = panel.element;
        var transform = chart3DRender.transform;
        if (transform == null) {
            return;
        }
        var actual3DPosition = chart.transform3D.toScreen(panel.vectorPoints[0], transform);
        var x = actual3DPosition.x;
        var y = actual3DPosition.y;
        if (element.tag === 'text') {
            var options = {
                'id': element.id,
                'x': x,
                'y': y,
                'fill': element.font.color || element.fill,
                'font-size': element.font.size,
                'font-family': element.font.fontFamily,
                'font-style': element.font.fontStyle,
                'font-weight': element.font.fontWeight,
                'opacity': element.font.opacity,
                'text-anchor': element.textAnchor,
                'cursor': 'default',
                'transform': element.angle ? 'rotate(' + element.angle + ',' + (x) + ',' + y + ')' : ''
            };
            var textElement = chart.svg3DRenderer.drawText(options, element.label.text, panel.element.font, chart);
            if (element.id.indexOf('-axis-title') > -1) {
                textElement.setAttribute('aria-hidden', 'true');
            }
            chart.chart3D.append(textElement);
        }
        else {
            var series = element.series;
            var labelFormat = (series.yAxis && series.yAxis.labelFormat) ? series.yAxis.labelFormat : '';
            var pointText = (element.point.text) ? element.point.text : element.point.y + labelFormat.substring(labelFormat.indexOf('}') + 1);
            var textOffset = measureText(pointText, series.dataLabel.font, chart.themeStyle.datalabelFont);
            var margin = series.dataLabel.margin;
            var width = textOffset.width + margin.left + margin.right;
            var height = textOffset.height + margin.top + margin.bottom;
            var location_1 = { x: actual3DPosition.x, y: actual3DPosition.y };
            var xXalue = location_1.x - (margin.left) / 2 + (margin.right) / 2;
            var yValue = location_1.y - (margin.top) / 2 - (height / margin.top) + (margin.bottom) / 2;
            var seriesIndex = series.index;
            this.dataLabelSymbol(seriesIndex, series, element.pointIndex, xXalue, yValue, width, height, chart);
        }
    };
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
    Polygon3D.prototype.dataLabelSymbol = function (seriesIndex, series, pointIndex, x, y, width, height, chart) {
        var path = 'M' + ' ' + (x + (-width / 2)) + ' ' +
            (y + (-height / 2)) + ' ' + 'L' + ' ' + (x + (width / 2)) +
            ' ' + (y + (-height / 2)) + ' ' + 'L' + ' ' + (x + (width / 2)) +
            ' ' + (y + (height / 2)) + ' ' + 'L' + ' ' + (x + (-width / 2)) +
            ' ' + (y + (height / 2)) + ' ' + 'L' + ' ' + (x + (-width / 2)) +
            ' ' + (y + (-height / 2)) + ' z';
        var Rectoptions = {
            id: chart.element.id + '-svg' + '-data-label-series-' + seriesIndex + '-point-' + pointIndex,
            fill: series.dataLabel.fill,
            'stroke-width': series.dataLabel.border.width,
            'stroke-dasharray': series.dataLabel.border.dashArray,
            stroke: series.dataLabel.border.color,
            opacity: series.dataLabel.opacity,
            visibility: '',
            d: path
        };
        var element = chart.svgRenderer.drawPath(Rectoptions);
        chart.chart3D.append(element);
    };
    /**
     * Draws a three-dimensional polygon on the specified chart.
     *
     * @param {Chart3DPolygon} panel - The polygon to be drawn.
     * @param {Chart3D} chart - The three-dimensional chart on which the polygon is to be drawn.
     * @returns {void}
     */
    Polygon3D.prototype.draw = function (panel, chart) {
        if (panel.vectorPoints == null || panel.vectorPoints.length <= 0) {
            return;
        }
        var transform = chart3DRender.transform;
        var pathDirection = chart.svg3DRenderer.getStringBuilder();
        var color = panel.fill;
        var format = chart.svg3DRenderer.checkColorFormat(color);
        if (!format) {
            if (color !== 'transparent') {
                color = colorNameToHex(color);
            }
        }
        var figure = { StartPoint: null };
        if (transform != null) {
            figure.StartPoint = chart.transform3D.toScreen(panel.vectorPoints[0], transform);
            pathDirection.append('M' + ' ' + (figure.StartPoint.x) + ' ' + (figure.StartPoint.y) + ' ');
            for (var i = 0; i < panel.vectorPoints.length; i++) {
                var lineSegment = chart.transform3D.toScreen(panel.vectorPoints[i], transform);
                pathDirection.append('L' + ' ' + (lineSegment.x) + ' ' + (lineSegment.y) + ' ');
            }
        }
        var direction = pathDirection.toString();
        var name = 'Light';
        var lightCoefficientZ = (2 * (Math.abs(this.vector.vector3DAdd(panel.normal, this.vector.vector3D(0, 0, 1))) - 1));
        var lightCoefficientY = (2 * (Math.abs(this.vector.vector3DAdd(panel.normal, this.vector.vector3D(0, 1, 0))) - 1));
        var lightCoefficientX = (2 * (Math.abs(this.vector.vector3DAdd(panel.normal, this.vector.vector3D(1, 0, 0))) - 1));
        if (panel.name && !(panel.name.indexOf('-wall-brush') > -1)) {
            if (lightCoefficientZ === lightCoefficientX) {
                name = 'ZLight';
                color = this.applyZLight(color, chart);
            }
            else if (((lightCoefficientY === lightCoefficientZ) || (lightCoefficientZ !== 0 && lightCoefficientY < lightCoefficientZ))) {
                name = 'XLight';
                color = this.applyXLight(color, chart);
            }
            else if (lightCoefficientZ < 0) {
                name = 'ZLight';
                color = this.applyZLight(color, chart);
            }
            else {
                name = 'Light';
            }
        }
        var options = {
            'id': chart.element.id + '-svg' + panel.name,
            'name': name,
            'fill': color,
            'stroke': '',
            'stroke-width': panel.strokeThickness,
            'opacity': panel.opacity,
            'd': direction
        };
        var element = chart.svgRenderer.drawPath(options);
        if (panel.text) {
            element.setAttribute('aria-label', panel.text);
            element.setAttribute('role', 'img');
        }
        if (panel.name && panel.name.indexOf('-wall-brush') > -1) {
            element.setAttribute('aria-hidden', 'true');
        }
        if (element.id.indexOf('0-region-series-0-point-0') > -1) {
            if (this.tabIndex) {
                element.setAttribute('tabindex', '0');
            }
            else {
                var elements = panel.polygonElement.parent.querySelectorAll('[id*="0-region-series-0-point-0"]');
                if (elements.length > 0) {
                    elements[elements.length - 1].removeAttribute('tabindex');
                }
                element.setAttribute('tabindex', '0');
            }
            this.tabIndex = false;
        }
        appendChildElement(false, panel.polygonElement.parent, element, chart.redraw, true, 'x', 'y', null, direction);
        if (chart.previousID && chart.isTouch) {
            var previousElement = document.getElementById(chart.previousID);
            var currentElement = document.getElementById(options.id);
            if (previousElement && currentElement) {
                currentElement.parentNode.insertBefore(currentElement, previousElement.nextSibling);
            }
        }
        chart.previousID = options.id;
    };
    /**
     * Applies a lightening effect to the given color by reducing its red, green and blue components.
     *
     * @param {string} color - The input color in hexadecimal format.
     * @param {Chart3D} chart - The three-dimensional chart associated with the color.
     * @returns {string} - The lightened color in hexadecimal format.
     */
    Polygon3D.prototype.applyXLight = function (color, chart) {
        var RGB = chart.svg3DRenderer.hexToValue(color);
        RGB.red = parseInt((RGB.red * 0.7).toString(), 10);
        RGB.green = parseInt((RGB.green * 0.7).toString(), 10);
        RGB.blue = parseInt((RGB.blue * 0.7).toString(), 10);
        return chart.svg3DRenderer.hexColor(RGB);
    };
    /**
     * Applies a lightening effect to the given color by reducing its red, green and blue components with a focus on the Z-axis.
     *
     * @param {string} color - The input color in hexadecimal format.
     * @param {Chart3D} chart - The three-dimensional chart associated with the color.
     * @returns {string} - The lightened color in hexadecimal format.
     */
    Polygon3D.prototype.applyZLight = function (color, chart) {
        var RGB = chart.svg3DRenderer.hexToValue(color);
        RGB.red = parseInt((RGB.red * 0.9).toString(), 10);
        RGB.green = parseInt((RGB.green * 0.9).toString(), 10);
        RGB.blue = parseInt((RGB.blue * 0.9).toString(), 10);
        return chart.svg3DRenderer.hexColor(RGB);
    };
    return Polygon3D;
}());
export { Polygon3D };
var vector = new Vector3D(0, 0, 0);
var matrixObj = new Matrix3D();
var bspTreeObj = new BinaryTreeBuilder();
var polygonObj = new Polygon3D();
var graphics = new Graphics3D();
/**
 * Gets the minimum delta value between adjacent data points on a given axis in a three-dimensional chart.
 *
 * @param {Chart3DAxis} axis - The three-dimensional axis for which the delta value is calculated.
 * @param {Chart3DSeries[]} seriesCollection - Collection of three-dimensional series in the chart.
 * @returns {number} - The minimum delta value between adjacent data points on the specified axis.
 */
export function getMinPointsDeltaValue(axis, seriesCollection) {
    var minDelta = Number.MAX_VALUE;
    var xValues;
    var minVal;
    var seriesMin;
    for (var index = 0; index < seriesCollection.length; index++) {
        var series = seriesCollection[index];
        xValues = [];
        if (series.visible &&
            (axis.name === series.xAxisName || (axis.name === 'primaryXAxis' && series.xAxisName === null))) {
            xValues = series.points.map(function (point) {
                return point.xValue;
            });
            xValues.sort(function (first, second) { return first - second; });
            if (xValues.length === 1) {
                seriesMin = (axis.valueType === 'DateTime' && series.xMin === series.xMax) ? (series.xMin - 25920000) : series.xMin;
                minVal = xValues[0] - (!isNullOrUndefined(seriesMin) ?
                    seriesMin : axis.visibleRange.min);
                if (minVal !== 0) {
                    minDelta = Math.min(minDelta, minVal);
                }
            }
            else {
                for (var index_1 = 0; index_1 < xValues.length; index_1++) {
                    var value = xValues[index_1];
                    if (index_1 > 0 && value) {
                        minVal = value - xValues[index_1 - 1];
                        if (minVal !== 0) {
                            minDelta = Math.min(minDelta, minVal);
                        }
                    }
                }
            }
        }
    }
    if (minDelta === Number.MAX_VALUE) {
        minDelta = 1;
    }
    return minDelta;
}
/**
 * Converts a numeric value to a coefficient based on the given 3D axis.
 *
 * @param {number} value - The numeric value to be converted.
 * @param {Chart3DAxis} axis - The 3D axis for reference.
 * @returns {number} - The coefficient value.
 * @private
 */
export function valueToCoefficients(value, axis) {
    var range = axis.visibleRange;
    var result = (value - range.min) / (range.delta);
    var isInverse = axis.isAxisInverse;
    return isInverse ? (1 - result) : result;
}
