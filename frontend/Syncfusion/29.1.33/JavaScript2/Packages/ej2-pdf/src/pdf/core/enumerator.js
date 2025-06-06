/**
 * Public Enum to define annotation flag types.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfAnnotation = page.annotations.at(0);
 * // Sets the annotation flag to enable print
 * annotation.flags = PdfAnnotationFlag.print;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfAnnotationFlag;
(function (PdfAnnotationFlag) {
    /**
     * Specifies the type of `default`.
     */
    PdfAnnotationFlag[PdfAnnotationFlag["default"] = 0] = "default";
    /**
     * Specifies the type of `invisible`.
     */
    PdfAnnotationFlag[PdfAnnotationFlag["invisible"] = 1] = "invisible";
    /**
     * Specifies the type of `hidden`.
     */
    PdfAnnotationFlag[PdfAnnotationFlag["hidden"] = 2] = "hidden";
    /**
     * Specifies the type of `print`.
     */
    PdfAnnotationFlag[PdfAnnotationFlag["print"] = 4] = "print";
    /**
     * Specifies the type of `noZoom`.
     */
    PdfAnnotationFlag[PdfAnnotationFlag["noZoom"] = 8] = "noZoom";
    /**
     * Specifies the type of `noRotate`.
     */
    PdfAnnotationFlag[PdfAnnotationFlag["noRotate"] = 16] = "noRotate";
    /**
     * Specifies the type of `noView`.
     */
    PdfAnnotationFlag[PdfAnnotationFlag["noView"] = 32] = "noView";
    /**
     * Specifies the type of `readOnly`.
     */
    PdfAnnotationFlag[PdfAnnotationFlag["readOnly"] = 64] = "readOnly";
    /**
     * Specifies the type of `locked`.
     */
    PdfAnnotationFlag[PdfAnnotationFlag["locked"] = 128] = "locked";
    /**
     * Specifies the type of `toggleNoView`.
     */
    PdfAnnotationFlag[PdfAnnotationFlag["toggleNoView"] = 256] = "toggleNoView";
})(PdfAnnotationFlag || (PdfAnnotationFlag = {}));
/**
 * Public Enum to define line ending style.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfPolyLineAnnotation = page.annotations.at(0) as PdfPolyLineAnnotation;
 * // Sets the begin line end style as openArrow
 * annotation.beginLineStyle = PdfLineEndingStyle.openArrow;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfLineEndingStyle;
(function (PdfLineEndingStyle) {
    /**
     * Specifies the type of `none`.
     */
    PdfLineEndingStyle[PdfLineEndingStyle["none"] = 0] = "none";
    /**
     * Specifies the type of `openArrow`.
     */
    PdfLineEndingStyle[PdfLineEndingStyle["openArrow"] = 1] = "openArrow";
    /**
     * Specifies the type of `closedArrow`.
     */
    PdfLineEndingStyle[PdfLineEndingStyle["closedArrow"] = 2] = "closedArrow";
    /**
     * Specifies the type of `rOpenArrow`.
     */
    PdfLineEndingStyle[PdfLineEndingStyle["rOpenArrow"] = 3] = "rOpenArrow";
    /**
     * Specifies the type of `rClosedArrow`.
     */
    PdfLineEndingStyle[PdfLineEndingStyle["rClosedArrow"] = 4] = "rClosedArrow";
    /**
     * Specifies the type of `butt`.
     */
    PdfLineEndingStyle[PdfLineEndingStyle["butt"] = 5] = "butt";
    /**
     * Specifies the type of `diamond`.
     */
    PdfLineEndingStyle[PdfLineEndingStyle["diamond"] = 6] = "diamond";
    /**
     * Specifies the type of `circle`.
     */
    PdfLineEndingStyle[PdfLineEndingStyle["circle"] = 7] = "circle";
    /**
     * Specifies the type of `square`.
     */
    PdfLineEndingStyle[PdfLineEndingStyle["square"] = 8] = "square";
    /**
     * Specifies the type of `slash`.
     */
    PdfLineEndingStyle[PdfLineEndingStyle["slash"] = 9] = "slash";
})(PdfLineEndingStyle || (PdfLineEndingStyle = {}));
/**
 * Public Enum to define line indent.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
 * // Sets the line intent as lineArrow
 * annotation.lineIntent = PdfLineIntent.lineArrow;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfLineIntent;
(function (PdfLineIntent) {
    /**
     * Specifies the type of `lineArrow`.
     */
    PdfLineIntent[PdfLineIntent["lineArrow"] = 0] = "lineArrow";
    /**
     * Specifies the type of `lineDimension`.
     */
    PdfLineIntent[PdfLineIntent["lineDimension"] = 1] = "lineDimension";
})(PdfLineIntent || (PdfLineIntent = {}));
/**
 * Public Enum to define the types of points and segments in a path.
 *
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access the first page
 * let page: PdfPage = document.getPage(0);
 * // Create a new pen
 * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
 * // Create a new brush
 * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
 * // Add path points
 * let pathPoints: Array<number[]> = [[50, 50], [100, 50], [100, 100], [50, 100], [50, 50]];
 * // Add path types
 * let pathTypes: PathPointType[] = [0, 1, 1, 1, 1];
 * // Create a new PDF path
 * let path: PdfPath = new PdfPath(pathPoints, pathTypes);
 * // Draw the path to the PDF page
 * page.graphics.drawPath(path, pen, brush);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PathPointType;
(function (PathPointType) {
    /**
     * The starting point of a path.
     */
    PathPointType[PathPointType["start"] = 0] = "start";
    /**
     * A straight line segment.
     */
    PathPointType[PathPointType["line"] = 1] = "line";
    /**
     * A Bezier curve segment.
     */
    PathPointType[PathPointType["bezier"] = 3] = "bezier";
    /**
     * A mask for extracting the type of a point.
     */
    PathPointType[PathPointType["pathTypeMask"] = 7] = "pathTypeMask";
    /**
     * Indicates that the segment has dashed line style.
     */
    PathPointType[PathPointType["dashMode"] = 16] = "dashMode";
    /**
     * Indicates a marker point in the path.
     */
    PathPointType[PathPointType["pathMarker"] = 32] = "pathMarker";
    /**
     * Closes the current path.
     */
    PathPointType[PathPointType["closePath"] = 128] = "closePath";
})(PathPointType || (PathPointType = {}));
/**
 * Public Enum to define line caption type.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfAnnotation = page.annotations.at(0);
 * // Sets the line caption type as inline
 * annotation.caption.type = PdfLineCaptionType.inline;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfLineCaptionType;
(function (PdfLineCaptionType) {
    /**
     * Specifies the type of `inline`.
     */
    PdfLineCaptionType[PdfLineCaptionType["inline"] = 0] = "inline";
    /**
     * Specifies the type of `top`.
     */
    PdfLineCaptionType[PdfLineCaptionType["top"] = 1] = "top";
})(PdfLineCaptionType || (PdfLineCaptionType = {}));
/**
 * Public Enum to define border style.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfAnnotation = page.annotations.at(0);
 * // Sets the border style as underline
 * annotation.border.style = PdfBorderStyle.underline;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfBorderStyle;
(function (PdfBorderStyle) {
    /**
     * Specifies the type of `solid`.
     */
    PdfBorderStyle[PdfBorderStyle["solid"] = 0] = "solid";
    /**
     * Specifies the type of `dashed`.
     */
    PdfBorderStyle[PdfBorderStyle["dashed"] = 1] = "dashed";
    /**
     * Specifies the type of `beveled`.
     */
    PdfBorderStyle[PdfBorderStyle["beveled"] = 2] = "beveled";
    /**
     * Specifies the type of `inset`.
     */
    PdfBorderStyle[PdfBorderStyle["inset"] = 3] = "inset";
    /**
     * Specifies the type of `underline`.
     */
    PdfBorderStyle[PdfBorderStyle["underline"] = 4] = "underline";
    /**
     * Specifies the type of `dot`.
     */
    PdfBorderStyle[PdfBorderStyle["dot"] = 5] = "dot";
})(PdfBorderStyle || (PdfBorderStyle = {}));
/**
 * Public Enum to define border effect style.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfAnnotation = page.annotations.at(0);
 * // Sets the border effect as underline
 * annotation.borderEffect.style = PdfBorderEffectStyle.cloudy;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfBorderEffectStyle;
(function (PdfBorderEffectStyle) {
    /**
     * Specifies the type of `solid`.
     */
    PdfBorderEffectStyle[PdfBorderEffectStyle["solid"] = 0] = "solid";
    /**
     * Specifies the type of `cloudy`.
     */
    PdfBorderEffectStyle[PdfBorderEffectStyle["cloudy"] = 1] = "cloudy";
})(PdfBorderEffectStyle || (PdfBorderEffectStyle = {}));
/**
 * Public Enum to define rotation of the interactive elements.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access text box field
 * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
 * // Gets the rotation of the field
 * let rotation: PdfRotationAngle = field.rotationAngle;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfRotationAngle;
(function (PdfRotationAngle) {
    /**
     * Specifies the type of `angle0`.
     */
    PdfRotationAngle[PdfRotationAngle["angle0"] = 0] = "angle0";
    /**
     * Specifies the type of `angle90`.
     */
    PdfRotationAngle[PdfRotationAngle["angle90"] = 1] = "angle90";
    /**
     * Specifies the type of `angle180`.
     */
    PdfRotationAngle[PdfRotationAngle["angle180"] = 2] = "angle180";
    /**
     * Specifies the type of `angle270`.
     */
    PdfRotationAngle[PdfRotationAngle["angle270"] = 3] = "angle270";
})(PdfRotationAngle || (PdfRotationAngle = {}));
/**
 * Public Enum to define cross reference type.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Save the document with cross reference type as stream
 * document.save('output.pdf', PdfCrossReferenceType.stream);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfCrossReferenceType;
(function (PdfCrossReferenceType) {
    /**
     * Specifies the type of `table`.
     */
    PdfCrossReferenceType[PdfCrossReferenceType["table"] = 0] = "table";
    /**
     * Specifies the type of `stream`.
     */
    PdfCrossReferenceType[PdfCrossReferenceType["stream"] = 1] = "stream";
})(PdfCrossReferenceType || (PdfCrossReferenceType = {}));
/**
 * Public Enum to define highlight mode of text box field.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access text box field
 * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
 * // Sets the highlight mode of text box field as outline
 * field.highlightMode = PdfHighlightMode.outline;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfHighlightMode;
(function (PdfHighlightMode) {
    /**
     * Specifies the type of `noHighlighting`.
     */
    PdfHighlightMode[PdfHighlightMode["noHighlighting"] = 0] = "noHighlighting";
    /**
     * Specifies the type of `invert`.
     */
    PdfHighlightMode[PdfHighlightMode["invert"] = 1] = "invert";
    /**
     * Specifies the type of `outline`.
     */
    PdfHighlightMode[PdfHighlightMode["outline"] = 2] = "outline";
    /**
     * Specifies the type of `push`.
     */
    PdfHighlightMode[PdfHighlightMode["push"] = 3] = "push";
})(PdfHighlightMode || (PdfHighlightMode = {}));
/**
 * Public Enum to define text alignment of text box field.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access text box field
 * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
 * // Sets the text alignment of form field as center
 * field.textAlignment = PdfTextAlignment.center;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfTextAlignment;
(function (PdfTextAlignment) {
    /**
     * Specifies the type of `left`.
     */
    PdfTextAlignment[PdfTextAlignment["left"] = 0] = "left";
    /**
     * Specifies the type of `center`.
     */
    PdfTextAlignment[PdfTextAlignment["center"] = 1] = "center";
    /**
     * Specifies the type of `right`.
     */
    PdfTextAlignment[PdfTextAlignment["right"] = 2] = "right";
    /**
     * Specifies the type of `justify`.
     */
    PdfTextAlignment[PdfTextAlignment["justify"] = 3] = "justify";
})(PdfTextAlignment || (PdfTextAlignment = {}));
/**
 * Public Enum to define visibility of form field.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access PDF form field
 * let field: PdfField = document.form.fieldAt(0);
 * // Sets the visibility of form field as hidden
 * field.visibility = PdfFormFieldVisibility.hidden;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfFormFieldVisibility;
(function (PdfFormFieldVisibility) {
    /**
     * Specifies the type of `visible`.
     */
    PdfFormFieldVisibility[PdfFormFieldVisibility["visible"] = 0] = "visible";
    /**
     * Specifies the type of `hidden`.
     */
    PdfFormFieldVisibility[PdfFormFieldVisibility["hidden"] = 1] = "hidden";
    /**
     * Specifies the type of `visibleNotPrintable`.
     */
    PdfFormFieldVisibility[PdfFormFieldVisibility["visibleNotPrintable"] = 2] = "visibleNotPrintable";
    /**
     * Specifies the type of `hiddenPrintable`.
     */
    PdfFormFieldVisibility[PdfFormFieldVisibility["hiddenPrintable"] = 3] = "hiddenPrintable";
})(PdfFormFieldVisibility || (PdfFormFieldVisibility = {}));
/**
 * Public Enum to define measurement unit of line measurement annotation.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfLineAnnotation = page.annotations.at(0) PdfLineAnnotation;
 * // Sets the measurement unit of line measurement annoation as centimeter
 * annotation.unit = PdfMeasurementUnit.centimeter;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfMeasurementUnit;
(function (PdfMeasurementUnit) {
    /**
     * Specifies the type of `inch`.
     */
    PdfMeasurementUnit[PdfMeasurementUnit["inch"] = 0] = "inch";
    /**
     * Specifies the type of `pica`.
     */
    PdfMeasurementUnit[PdfMeasurementUnit["pica"] = 1] = "pica";
    /**
     * Specifies the type of `point`.
     */
    PdfMeasurementUnit[PdfMeasurementUnit["point"] = 3] = "point";
    /**
     * Specifies the type of `centimeter`.
     */
    PdfMeasurementUnit[PdfMeasurementUnit["centimeter"] = 4] = "centimeter";
    /**
     * Specifies the type of `millimeter`.
     */
    PdfMeasurementUnit[PdfMeasurementUnit["millimeter"] = 6] = "millimeter";
})(PdfMeasurementUnit || (PdfMeasurementUnit = {}));
/**
 * Public Enum to define measurement type of circle annotation.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfCircleAnnotation = page.annotations.at(0) PdfCircleAnnotation;
 * // Sets the measurement type of circle annotation as diameter
 * annotation.measureType = PdfCircleMeasurementType.diameter;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfCircleMeasurementType;
(function (PdfCircleMeasurementType) {
    /**
     * Specifies the type of `diameter`.
     */
    PdfCircleMeasurementType[PdfCircleMeasurementType["diameter"] = 0] = "diameter";
    /**
     * Specifies the type of `radius`.
     */
    PdfCircleMeasurementType[PdfCircleMeasurementType["radius"] = 1] = "radius";
})(PdfCircleMeasurementType || (PdfCircleMeasurementType = {}));
/**
 * Public Enum to define icon type of rubber stamp annotation.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfRubberStampAnnotation = page.annotations.at(0) PdfRubberStampAnnotation;
 * // Sets the rubber stamp annotation icon type as confidential
 * annotation.icon = PdfRubberStampAnnotationIcon.confidential;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfRubberStampAnnotationIcon;
(function (PdfRubberStampAnnotationIcon) {
    /**
     * Specifies the type of `approved`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["approved"] = 0] = "approved";
    /**
     * Specifies the type of `asIs`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["asIs"] = 1] = "asIs";
    /**
     * Specifies the type of `confidential`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["confidential"] = 2] = "confidential";
    /**
     * Specifies the type of `departmental`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["departmental"] = 3] = "departmental";
    /**
     * Specifies the type of `draft`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["draft"] = 4] = "draft";
    /**
     * Specifies the type of `experimental`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["experimental"] = 5] = "experimental";
    /**
     * Specifies the type of `expired`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["expired"] = 6] = "expired";
    /**
     * Specifies the type of `final`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["final"] = 7] = "final";
    /**
     * Specifies the type of `forComment`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["forComment"] = 8] = "forComment";
    /**
     * Specifies the type of `forPublicRelease`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["forPublicRelease"] = 9] = "forPublicRelease";
    /**
     * Specifies the type of `notApproved`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["notApproved"] = 10] = "notApproved";
    /**
     * Specifies the type of `notForPublicRelease`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["notForPublicRelease"] = 11] = "notForPublicRelease";
    /**
     * Specifies the type of `sold`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["sold"] = 12] = "sold";
    /**
     * Specifies the type of `topSecret`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["topSecret"] = 13] = "topSecret";
    /**
     * Specifies the type of `completed`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["completed"] = 14] = "completed";
    /**
     * Specifies the type of `void`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["void"] = 15] = "void";
    /**
     * Specifies the type of `informationOnly`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["informationOnly"] = 16] = "informationOnly";
    /**
     * Specifies the type of `preliminaryResults`.
     */
    PdfRubberStampAnnotationIcon[PdfRubberStampAnnotationIcon["preliminaryResults"] = 17] = "preliminaryResults";
})(PdfRubberStampAnnotationIcon || (PdfRubberStampAnnotationIcon = {}));
/**
 * Public Enum to define check box style.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access check box field
 * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
 * // Access first item of check box field
 * let item: PdfStateItem = field.itemAt(0) as PdfStateItem;
 * // Sets the check box style as check
 * item.style = PdfCheckBoxStyle.check;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfCheckBoxStyle;
(function (PdfCheckBoxStyle) {
    /**
     * Specifies the type of `check`.
     */
    PdfCheckBoxStyle[PdfCheckBoxStyle["check"] = 0] = "check";
    /**
     * Specifies the type of `circle`.
     */
    PdfCheckBoxStyle[PdfCheckBoxStyle["circle"] = 1] = "circle";
    /**
     * Specifies the type of `cross`.
     */
    PdfCheckBoxStyle[PdfCheckBoxStyle["cross"] = 2] = "cross";
    /**
     * Specifies the type of `diamond`.
     */
    PdfCheckBoxStyle[PdfCheckBoxStyle["diamond"] = 3] = "diamond";
    /**
     * Specifies the type of `square`.
     */
    PdfCheckBoxStyle[PdfCheckBoxStyle["square"] = 4] = "square";
    /**
     * Specifies the type of `star`.
     */
    PdfCheckBoxStyle[PdfCheckBoxStyle["star"] = 5] = "star";
})(PdfCheckBoxStyle || (PdfCheckBoxStyle = {}));
/**
 * Public Enum to define type of text markup annotation.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfTextMarkupAnnotation = page.annotations.at(0) PdfTextMarkupAnnotation;
 * // Sets the type of the text markup annotation as underline
 * annotation.textMarkupType = PdfTextMarkupAnnotationType.underline;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfTextMarkupAnnotationType;
(function (PdfTextMarkupAnnotationType) {
    /**
     * Specifies the type of `highlight`.
     */
    PdfTextMarkupAnnotationType[PdfTextMarkupAnnotationType["highlight"] = 0] = "highlight";
    /**
     * Specifies the type of `underline`.
     */
    PdfTextMarkupAnnotationType[PdfTextMarkupAnnotationType["underline"] = 1] = "underline";
    /**
     * Specifies the type of `squiggly`.
     */
    PdfTextMarkupAnnotationType[PdfTextMarkupAnnotationType["squiggly"] = 2] = "squiggly";
    /**
     * Specifies the type of `strikeOut`.
     */
    PdfTextMarkupAnnotationType[PdfTextMarkupAnnotationType["strikeOut"] = 3] = "strikeOut";
})(PdfTextMarkupAnnotationType || (PdfTextMarkupAnnotationType = {}));
/**
 * Public Enum to define icon type of popup annotation.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfPopupAnnotation = page.annotations.at(0) PdfPopupAnnotation;
 * // Sets the icon type of the popup annotation as comment
 * annotation.icon = PdfPopupIcon.comment;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfPopupIcon;
(function (PdfPopupIcon) {
    /**
     * Specifies the type of `note`.
     */
    PdfPopupIcon[PdfPopupIcon["note"] = 0] = "note";
    /**
     * Specifies the type of `comment`.
     */
    PdfPopupIcon[PdfPopupIcon["comment"] = 1] = "comment";
    /**
     * Specifies the type of `help`.
     */
    PdfPopupIcon[PdfPopupIcon["help"] = 2] = "help";
    /**
     * Specifies the type of `insert`.
     */
    PdfPopupIcon[PdfPopupIcon["insert"] = 3] = "insert";
    /**
     * Specifies the type of `key`.
     */
    PdfPopupIcon[PdfPopupIcon["key"] = 4] = "key";
    /**
     * Specifies the type of `new paragraph`.
     */
    PdfPopupIcon[PdfPopupIcon["newParagraph"] = 5] = "newParagraph";
    /**
     * Specifies the type of `paragraph`.
     */
    PdfPopupIcon[PdfPopupIcon["paragraph"] = 6] = "paragraph";
})(PdfPopupIcon || (PdfPopupIcon = {}));
/**
 * Public Enum to define annotation state.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfPopupAnnotation = page.annotations.at(0) PdfPopupAnnotation;
 * // Sets the state of the popup annotation as accepted
 * annotation.state = PdfAnnotationState.accepted;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfAnnotationState;
(function (PdfAnnotationState) {
    /**
     * Specifies the default state of `none`.
     */
    PdfAnnotationState[PdfAnnotationState["none"] = 0] = "none";
    /**
     * Specifies the state of `accepted`.
     */
    PdfAnnotationState[PdfAnnotationState["accepted"] = 1] = "accepted";
    /**
     * Specifies the state of `rejected`.
     */
    PdfAnnotationState[PdfAnnotationState["rejected"] = 2] = "rejected";
    /**
     * Specifies the state of `cancel`.
     */
    PdfAnnotationState[PdfAnnotationState["cancel"] = 3] = "cancel";
    /**
     * Specifies the state of `completed`.
     */
    PdfAnnotationState[PdfAnnotationState["completed"] = 4] = "completed";
    /**
     * Specifies the state of `marked`.
     */
    PdfAnnotationState[PdfAnnotationState["marked"] = 5] = "marked";
    /**
     * Specifies the state of `unmarked`.
     */
    PdfAnnotationState[PdfAnnotationState["unmarked"] = 6] = "unmarked";
    /**
     * Specifies the state of `unknown`.
     */
    PdfAnnotationState[PdfAnnotationState["unknown"] = 7] = "unknown";
})(PdfAnnotationState || (PdfAnnotationState = {}));
/**
 * Public Enum to define annotation state model.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfPopupAnnotation = page.annotations.at(0) PdfPopupAnnotation;
 * // Sets the state model of the popup annotation as marked
 * annotation.stateModel = PdfAnnotationStateModel.marked;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfAnnotationStateModel;
(function (PdfAnnotationStateModel) {
    /**
     * Specifies the default model of `none`.
     */
    PdfAnnotationStateModel[PdfAnnotationStateModel["none"] = 0] = "none";
    /**
     * Specifies the model of `marked`.
     */
    PdfAnnotationStateModel[PdfAnnotationStateModel["marked"] = 1] = "marked";
    /**
     * Specifies the model of `review`.
     */
    PdfAnnotationStateModel[PdfAnnotationStateModel["review"] = 2] = "review";
})(PdfAnnotationStateModel || (PdfAnnotationStateModel = {}));
/**
 * Public Enum to define icon type of attachment annotation.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfAttachmentAnnotation = page.annotations.at(0) PdfAttachmentAnnotation;
 * // Sets the icon type of attachment annotation to pushPin
 * annotation.icon = PdfAttachmentIcon.pushPin;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfAttachmentIcon;
(function (PdfAttachmentIcon) {
    /**
     * Specifies the default icon of `pushPin`.
     */
    PdfAttachmentIcon[PdfAttachmentIcon["pushPin"] = 0] = "pushPin";
    /**
     * Specifies the icon of `tag`.
     */
    PdfAttachmentIcon[PdfAttachmentIcon["tag"] = 1] = "tag";
    /**
     * Specifies the icon of `graph`.
     */
    PdfAttachmentIcon[PdfAttachmentIcon["graph"] = 2] = "graph";
    /**
     * Specifies the icon of `paperClip`.
     */
    PdfAttachmentIcon[PdfAttachmentIcon["paperClip"] = 3] = "paperClip";
})(PdfAttachmentIcon || (PdfAttachmentIcon = {}));
/**
 * Public Enum to define annotation intent of free text annotation.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) PdfFreeTextAnnotation;
 * // Sets the free text annotation intent to freeTextCallout
 * annotation.annotationIntent = PdfAnnotationIntent.freeTextCallout;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfAnnotationIntent;
(function (PdfAnnotationIntent) {
    /**
     * Specifies the default intent of `none`.
     */
    PdfAnnotationIntent[PdfAnnotationIntent["none"] = 0] = "none";
    /**
     * Specifies the intent of `freeTextCallout`.
     */
    PdfAnnotationIntent[PdfAnnotationIntent["freeTextCallout"] = 1] = "freeTextCallout";
    /**
     * Specifies the intent of `freeTextTypeWriter`.
     */
    PdfAnnotationIntent[PdfAnnotationIntent["freeTextTypeWriter"] = 2] = "freeTextTypeWriter";
})(PdfAnnotationIntent || (PdfAnnotationIntent = {}));
/**
 * Public Enum to define destination mode of document link annotation.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfDocumentLinkAnnotation = page.annotations.at(0) PdfDocumentLinkAnnotation;
 * // Sets the destination mode as fitToPage
 * annotation.destination.mode = PdfDestinationMode.fitToPage;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfDestinationMode;
(function (PdfDestinationMode) {
    /**
     * Specifies the default intent of `location`.
     */
    PdfDestinationMode[PdfDestinationMode["location"] = 0] = "location";
    /**
     * Specifies the intent of `FitToPage`.
     */
    PdfDestinationMode[PdfDestinationMode["fitToPage"] = 1] = "fitToPage";
    /**
     * Specifies the intent of `fitR`.
     */
    PdfDestinationMode[PdfDestinationMode["fitR"] = 2] = "fitR";
    /**
     * Specifies the intent of `fitH`.
     */
    PdfDestinationMode[PdfDestinationMode["fitH"] = 3] = "fitH";
})(PdfDestinationMode || (PdfDestinationMode = {}));
/**
 * Public Enum to define export or import data format.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Sets export data format as JSON type to annotation export settings
 * let settings: PdfAnnotationExportSettings = new PdfAnnotationExportSettings();
 * settings.dataFormat = DataFormat.json;
 * // Export annotations to JSON format
 * let json: Uint8Array = document.exportAnnotations(settings);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var DataFormat;
(function (DataFormat) {
    /**
     * Specifies the intent of `FDF`.
     */
    DataFormat[DataFormat["fdf"] = 0] = "fdf";
    /**
     * Specifies the intent of `XFDF`.
     */
    DataFormat[DataFormat["xfdf"] = 1] = "xfdf";
    /**
     * Specifies the intent of `JSON`.
     */
    DataFormat[DataFormat["json"] = 2] = "json";
    /**
     * Specifies the intent of `XML`.
     */
    DataFormat[DataFormat["xml"] = 3] = "xml";
})(DataFormat || (DataFormat = {}));
/**
 * Public enum to define form fields tab order.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Set a PDF form's tab order.
 * document.form.orderFormFields(PdfFormFieldsTabOrder.row);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfFormFieldsTabOrder;
(function (PdfFormFieldsTabOrder) {
    /**
     * Specifies that no tab order is defined.
     */
    PdfFormFieldsTabOrder[PdfFormFieldsTabOrder["none"] = 0] = "none";
    /**
     * Specifies the tab order is defined by the document's rows.
     */
    PdfFormFieldsTabOrder[PdfFormFieldsTabOrder["row"] = 1] = "row";
    /**
     * Specifies the tab order is defined by the document's columns.
     */
    PdfFormFieldsTabOrder[PdfFormFieldsTabOrder["column"] = 2] = "column";
    /**
     * Specifies the tab order is defined by the document's structure tree.
     */
    PdfFormFieldsTabOrder[PdfFormFieldsTabOrder["structure"] = 3] = "structure";
    /**
     * Specifies the tab order is defined manually.
     */
    PdfFormFieldsTabOrder[PdfFormFieldsTabOrder["manual"] = 4] = "manual";
    /**
     * Specifies the tab order is defined by the widget annotations in the document.
     */
    PdfFormFieldsTabOrder[PdfFormFieldsTabOrder["widget"] = 5] = "widget";
})(PdfFormFieldsTabOrder || (PdfFormFieldsTabOrder = {}));
/**
 * Enum for PDF loaded annotation type.
 */
export var _PdfAnnotationType;
(function (_PdfAnnotationType) {
    /**
     * Specifies the intent of `highlight`.
     */
    _PdfAnnotationType[_PdfAnnotationType["highlight"] = 0] = "highlight";
    /**
     * Specifies the intent of `underline`.
     */
    _PdfAnnotationType[_PdfAnnotationType["underline"] = 1] = "underline";
    /**
     * Specifies the intent of `strikeOut`.
     */
    _PdfAnnotationType[_PdfAnnotationType["strikeOut"] = 2] = "strikeOut";
    /**
     * Specifies the intent of `squiggly`.
     */
    _PdfAnnotationType[_PdfAnnotationType["squiggly"] = 3] = "squiggly";
    /**
     * Specifies the intent of `redactionAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["redactionAnnotation"] = 4] = "redactionAnnotation";
    /**
     * Specifies the intent of `textAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["textAnnotation"] = 5] = "textAnnotation";
    /**
     * Specifies the intent of `linkAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["linkAnnotation"] = 6] = "linkAnnotation";
    /**
     * Specifies the intent of `documentLinkAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["documentLinkAnnotation"] = 7] = "documentLinkAnnotation";
    /**
     * Specifies the intent of `uriAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["uriAnnotation"] = 8] = "uriAnnotation";
    /**
     * Specifies the intent of `fileLinkAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["fileLinkAnnotation"] = 9] = "fileLinkAnnotation";
    /**
     * Specifies the intent of `freeTextAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["freeTextAnnotation"] = 10] = "freeTextAnnotation";
    /**
     * Specifies the intent of `lineAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["lineAnnotation"] = 11] = "lineAnnotation";
    /**
     * Specifies the intent of `circleAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["circleAnnotation"] = 12] = "circleAnnotation";
    /**
     * Specifies the intent of `ellipseAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["ellipseAnnotation"] = 13] = "ellipseAnnotation";
    /**
     * Specifies the intent of `squareAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["squareAnnotation"] = 14] = "squareAnnotation";
    /**
     * Specifies the intent of `rectangleAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["rectangleAnnotation"] = 15] = "rectangleAnnotation";
    /**
     * Specifies the intent of `polygonAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["polygonAnnotation"] = 16] = "polygonAnnotation";
    /**
     * Specifies the intent of `polyLineAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["polyLineAnnotation"] = 17] = "polyLineAnnotation";
    /**
     * Specifies the intent of `textMarkupAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["textMarkupAnnotation"] = 18] = "textMarkupAnnotation";
    /**
     * Specifies the intent of `caretAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["caretAnnotation"] = 19] = "caretAnnotation";
    /**
     * Specifies the intent of `rubberStampAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["rubberStampAnnotation"] = 20] = "rubberStampAnnotation";
    /**
     * Specifies the intent of `popupAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["popupAnnotation"] = 21] = "popupAnnotation";
    /**
     * Specifies the intent of `fileAttachmentAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["fileAttachmentAnnotation"] = 22] = "fileAttachmentAnnotation";
    /**
     * Specifies the intent of `soundAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["soundAnnotation"] = 23] = "soundAnnotation";
    /**
     * Specifies the intent of `movieAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["movieAnnotation"] = 24] = "movieAnnotation";
    /**
     * Specifies the intent of `screenAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["screenAnnotation"] = 25] = "screenAnnotation";
    /**
     * Specifies the intent of `widgetAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["widgetAnnotation"] = 26] = "widgetAnnotation";
    /**
     * Specifies the intent of `printerMarkAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["printerMarkAnnotation"] = 27] = "printerMarkAnnotation";
    /**
     * Specifies the intent of `trapNetworkAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["trapNetworkAnnotation"] = 28] = "trapNetworkAnnotation";
    /**
     * Specifies the intent of `watermarkAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["watermarkAnnotation"] = 29] = "watermarkAnnotation";
    /**
     * Specifies the intent of `textWebLinkAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["textWebLinkAnnotation"] = 30] = "textWebLinkAnnotation";
    /**
     * Specifies the intent of `inkAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["inkAnnotation"] = 31] = "inkAnnotation";
    /**
     * Specifies the intent of `richMediaAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["richMediaAnnotation"] = 32] = "richMediaAnnotation";
    /**
     * Specifies the intent of `angleMeasurementAnnotation`.
     */
    _PdfAnnotationType[_PdfAnnotationType["angleMeasurementAnnotation"] = 33] = "angleMeasurementAnnotation";
    /**
     * Specifies the intent of `null`.
     */
    _PdfAnnotationType[_PdfAnnotationType["null"] = 34] = "null";
})(_PdfAnnotationType || (_PdfAnnotationType = {}));
/**
 * Enum for PDF graphics unit.
 */
export var _PdfGraphicsUnit;
(function (_PdfGraphicsUnit) {
    /**
     * Specifies the type of `centimeter`.
     */
    _PdfGraphicsUnit[_PdfGraphicsUnit["centimeter"] = 0] = "centimeter";
    /**
     * Specifies the type of `pica`.
     */
    _PdfGraphicsUnit[_PdfGraphicsUnit["pica"] = 1] = "pica";
    /**
     * Specifies the type of `pixel`.
     */
    _PdfGraphicsUnit[_PdfGraphicsUnit["pixel"] = 2] = "pixel";
    /**
     * Specifies the type of `point`.
     */
    _PdfGraphicsUnit[_PdfGraphicsUnit["point"] = 3] = "point";
    /**
     * Specifies the type of `inch`.
     */
    _PdfGraphicsUnit[_PdfGraphicsUnit["inch"] = 4] = "inch";
    /**
     * Specifies the type of `document`.
     */
    _PdfGraphicsUnit[_PdfGraphicsUnit["document"] = 5] = "document";
    /**
     * Specifies the type of `millimeter`.
     */
    _PdfGraphicsUnit[_PdfGraphicsUnit["millimeter"] = 6] = "millimeter";
})(_PdfGraphicsUnit || (_PdfGraphicsUnit = {}));
export var _FieldFlag;
(function (_FieldFlag) {
    _FieldFlag[_FieldFlag["default"] = 0] = "default";
    _FieldFlag[_FieldFlag["readOnly"] = 1] = "readOnly";
    _FieldFlag[_FieldFlag["required"] = 2] = "required";
    _FieldFlag[_FieldFlag["noExport"] = 4] = "noExport";
    _FieldFlag[_FieldFlag["multiLine"] = 4096] = "multiLine";
    _FieldFlag[_FieldFlag["password"] = 8192] = "password";
    _FieldFlag[_FieldFlag["fileSelect"] = 1048576] = "fileSelect";
    _FieldFlag[_FieldFlag["doNotSpellCheck"] = 4194304] = "doNotSpellCheck";
    _FieldFlag[_FieldFlag["doNotScroll"] = 8388608] = "doNotScroll";
    _FieldFlag[_FieldFlag["comb"] = 16777216] = "comb";
    _FieldFlag[_FieldFlag["richText"] = 33554432] = "richText";
    _FieldFlag[_FieldFlag["noToggleToOff"] = 16384] = "noToggleToOff";
    _FieldFlag[_FieldFlag["radio"] = 32768] = "radio";
    _FieldFlag[_FieldFlag["pushButton"] = 65536] = "pushButton";
    _FieldFlag[_FieldFlag["radiosInUnison"] = 33554432] = "radiosInUnison";
    _FieldFlag[_FieldFlag["combo"] = 131072] = "combo";
    _FieldFlag[_FieldFlag["edit"] = 262144] = "edit";
    _FieldFlag[_FieldFlag["sort"] = 524288] = "sort";
    _FieldFlag[_FieldFlag["multiSelect"] = 2097152] = "multiSelect";
    _FieldFlag[_FieldFlag["commitOnSelectChange"] = 67108864] = "commitOnSelectChange";
})(_FieldFlag || (_FieldFlag = {}));
export var _SignatureFlag;
(function (_SignatureFlag) {
    _SignatureFlag[_SignatureFlag["none"] = 0] = "none";
    _SignatureFlag[_SignatureFlag["signatureExists"] = 1] = "signatureExists";
    _SignatureFlag[_SignatureFlag["appendOnly"] = 2] = "appendOnly";
})(_SignatureFlag || (_SignatureFlag = {}));
export var _PdfCheckFieldState;
(function (_PdfCheckFieldState) {
    _PdfCheckFieldState[_PdfCheckFieldState["unchecked"] = 0] = "unchecked";
    _PdfCheckFieldState[_PdfCheckFieldState["checked"] = 1] = "checked";
    _PdfCheckFieldState[_PdfCheckFieldState["pressedUnchecked"] = 2] = "pressedUnchecked";
    _PdfCheckFieldState[_PdfCheckFieldState["pressedChecked"] = 3] = "pressedChecked";
})(_PdfCheckFieldState || (_PdfCheckFieldState = {}));
/**
 * Public enum to define the PDF document permission flags.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the permission flag
 * let permission: PdfPermissionFlag = document.permissions;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfPermissionFlag;
(function (PdfPermissionFlag) {
    /**
     * Specifies the default permission flag.
     */
    PdfPermissionFlag[PdfPermissionFlag["default"] = 0] = "default";
    /**
     * Specifies the print permission flag.
     */
    PdfPermissionFlag[PdfPermissionFlag["print"] = 4] = "print";
    /**
     * Specifies the edit content permission flag.
     */
    PdfPermissionFlag[PdfPermissionFlag["editContent"] = 8] = "editContent";
    /**
     * Specifies the copy content permission flag.
     */
    PdfPermissionFlag[PdfPermissionFlag["copyContent"] = 16] = "copyContent";
    /**
     * Specifies the edit annotations permission flag.
     */
    PdfPermissionFlag[PdfPermissionFlag["editAnnotations"] = 32] = "editAnnotations";
    /**
     * Specifies the fill fields permission flag.
     */
    PdfPermissionFlag[PdfPermissionFlag["fillFields"] = 256] = "fillFields";
    /**
     * Specifies the accessibility copy content permission flag.
     */
    PdfPermissionFlag[PdfPermissionFlag["accessibilityCopyContent"] = 512] = "accessibilityCopyContent";
    /**
     * Specifies the assemble document permission flag.
     */
    PdfPermissionFlag[PdfPermissionFlag["assembleDocument"] = 1024] = "assembleDocument";
    /**
     * Specifies the full quality print permission flag.
     */
    PdfPermissionFlag[PdfPermissionFlag["fullQualityPrint"] = 2048] = "fullQualityPrint";
})(PdfPermissionFlag || (PdfPermissionFlag = {}));
/**
 * Public enum to define the PDF page orientation.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Get the page orientation
 * let orientation: PdfPageOrientation = page.orientation;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfPageOrientation;
(function (PdfPageOrientation) {
    /**
     * Specifies the type of `portrait`.
     */
    PdfPageOrientation[PdfPageOrientation["portrait"] = 0] = "portrait";
    /**
     * Specifies the type of `landscape`.
     */
    PdfPageOrientation[PdfPageOrientation["landscape"] = 1] = "landscape";
})(PdfPageOrientation || (PdfPageOrientation = {}));
/**
 * Public enum to define the text direction.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Load the font file
 * let font: PdfTrueTypeFont = new PdfTrueTypeFont(read('./resources/Fonts/', 'Arial.ttf'), 10);
 * // Add a string format
 * let format: PdfStringFormat = new PdfStringFormat();
 * format.alignment = PdfTextAlignment.right;
 * format.textDirection = PdfTextDirection.rightToLeft;
 * // Draw a text with right to left direction
 * page.graphics.drawString('Hello World مرحبا بالعالم', font, [10, 20, 300, 200], undefined, new PdfBrush([0, 0, 255]), format);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfTextDirection;
(function (PdfTextDirection) {
    /**
     * Specifies the type of `none`.
     */
    PdfTextDirection[PdfTextDirection["none"] = 0] = "none";
    /**
     * Specifies the type of `leftToRight`.
     */
    PdfTextDirection[PdfTextDirection["leftToRight"] = 1] = "leftToRight";
    /**
     * Specifies the type of `rightToLeft`.
     */
    PdfTextDirection[PdfTextDirection["rightToLeft"] = 2] = "rightToLeft";
})(PdfTextDirection || (PdfTextDirection = {}));
/**
 * Public enum to define the subscript or superscript mode.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Gets the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new PDF standard font
 * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
 * // Create a new PDF string format
 * let format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right);
 * // Set a new paragraph indent
 * format.paragraphIndent = 20;
 * // Set the subscript or superscript mode
 * format.subSuperScript = PdfSubSuperScript.subScript;
 * // Draw the text
 * page.graphics.drawString('Helvetica', font, [0, 180, page.size[0], 40], undefined, new PdfBrush([0, 0, 255]), format);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfSubSuperScript;
(function (PdfSubSuperScript) {
    /**
     * Specifies the type of `none`.
     */
    PdfSubSuperScript[PdfSubSuperScript["none"] = 0] = "none";
    /**
     * Specifies the type of `superScript`.
     */
    PdfSubSuperScript[PdfSubSuperScript["superScript"] = 1] = "superScript";
    /**
     * Specifies the type of `subScript`.
     */
    PdfSubSuperScript[PdfSubSuperScript["subScript"] = 2] = "subScript";
})(PdfSubSuperScript || (PdfSubSuperScript = {}));
/**
 * Public enum to define blend mode of the PDF page.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Gets the graphics of the PDF page
 * let graphics: PdfGraphics = page.graphics;
 * // Create a new font
 * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.symbol, 10);
 * // Set the blend mode
 * graphics.setTransparency(0.5, 0.5, PdfBlendMode.hardLight);
 * // Draw the text
 * graphics.drawString('Hello World', font, null, new PointF(10, 10));
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfBlendMode;
(function (PdfBlendMode) {
    /**
     * Specifies the type of `normal`.
     */
    PdfBlendMode[PdfBlendMode["normal"] = 0] = "normal";
    /**
     * Specifies the type of `multiply`.
     */
    PdfBlendMode[PdfBlendMode["multiply"] = 1] = "multiply";
    /**
     * Specifies the type of `screen`.
     */
    PdfBlendMode[PdfBlendMode["screen"] = 2] = "screen";
    /**
     * Specifies the type of `overlay`.
     */
    PdfBlendMode[PdfBlendMode["overlay"] = 3] = "overlay";
    /**
     * Specifies the type of `darken`.
     */
    PdfBlendMode[PdfBlendMode["darken"] = 4] = "darken";
    /**
     * Specifies the type of `lighten`.
     */
    PdfBlendMode[PdfBlendMode["lighten"] = 5] = "lighten";
    /**
     * Specifies the type of `colorDodge`.
     */
    PdfBlendMode[PdfBlendMode["colorDodge"] = 6] = "colorDodge";
    /**
     * Specifies the type of `colorBurn`.
     */
    PdfBlendMode[PdfBlendMode["colorBurn"] = 7] = "colorBurn";
    /**
     * Specifies the type of `hardLight`.
     */
    PdfBlendMode[PdfBlendMode["hardLight"] = 8] = "hardLight";
    /**
     * Specifies the type of `softLight`.
     */
    PdfBlendMode[PdfBlendMode["softLight"] = 9] = "softLight";
    /**
     * Specifies the type of `difference`.
     */
    PdfBlendMode[PdfBlendMode["difference"] = 10] = "difference";
    /**
     * Specifies the type of `exclusion`.
     */
    PdfBlendMode[PdfBlendMode["exclusion"] = 11] = "exclusion";
    /**
     * Specifies the type of `hue`.
     */
    PdfBlendMode[PdfBlendMode["hue"] = 12] = "hue";
    /**
     * Specifies the type of `saturation`.
     */
    PdfBlendMode[PdfBlendMode["saturation"] = 13] = "saturation";
    /**
     * Specifies the type of `color`.
     */
    PdfBlendMode[PdfBlendMode["color"] = 14] = "color";
    /**
     * Specifies the type of `luminosity`.
     */
    PdfBlendMode[PdfBlendMode["luminosity"] = 15] = "luminosity";
})(PdfBlendMode || (PdfBlendMode = {}));
/**
 * Public enum to define fill mode of the PDF page.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Gets the graphics of the PDF page
 * let graphics: PdfGraphics = page.graphics;
 * // Create a new font
 * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.symbol, 10);
 * // Set the fill mode
 * graphics.setClip([0, 0, 100, 100], PdfFillMode.winding);
 * // Draw the text
 * graphics.drawString('Hello World', font, null, new PointF(10, 10));
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfFillMode;
(function (PdfFillMode) {
    /**
     * Specifies the type of `winding`.
     */
    PdfFillMode[PdfFillMode["winding"] = 0] = "winding";
    /**
     * Specifies the type of `alternate`.
     */
    PdfFillMode[PdfFillMode["alternate"] = 1] = "alternate";
})(PdfFillMode || (PdfFillMode = {}));
/**
 * Public enum to define the dash style.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Gets the graphics of the PDF page
 * let graphics: PdfGraphics = page.graphics;
 * // Create a new pen
 * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
 * // Set the dash style
 * pen._dashStyle = PdfDashStyle.dashDot;
 * // Draw a rectangle using pen
 * graphics.drawRectangle(150, 50, 50, 50, pen);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfDashStyle;
(function (PdfDashStyle) {
    /**
     * Specifies the type of `solid`.
     */
    PdfDashStyle[PdfDashStyle["solid"] = 0] = "solid";
    /**
     * Specifies the type of `dash`.
     */
    PdfDashStyle[PdfDashStyle["dash"] = 1] = "dash";
    /**
     * Specifies the type of `dot`.
     */
    PdfDashStyle[PdfDashStyle["dot"] = 2] = "dot";
    /**
     * Specifies the type of `dashDot`.
     */
    PdfDashStyle[PdfDashStyle["dashDot"] = 3] = "dashDot";
    /**
     * Specifies the type of `dashDotDot`.
     */
    PdfDashStyle[PdfDashStyle["dashDotDot"] = 4] = "dashDotDot";
    /**
     * Specifies the type of `custom`.
     */
    PdfDashStyle[PdfDashStyle["custom"] = 5] = "custom";
})(PdfDashStyle || (PdfDashStyle = {}));
/**
 * Public enum to define the line cap.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Gets the graphics of the PDF page
 * let graphics: PdfGraphics = page.graphics;
 * // Create a new pen
 * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
 * // Set the dash style
 * pen._dashStyle = PdfDashStyle.dashDot;
 * // Set the line cap
 * pen._lineCap = PdfLineCap.round;
 * // Draw a rectangle using pen
 * graphics.drawRectangle(150, 50, 50, 50, pen);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfLineCap;
(function (PdfLineCap) {
    /**
     * Specifies the type of `flat`.
     */
    PdfLineCap[PdfLineCap["flat"] = 0] = "flat";
    /**
     * Specifies the type of `round`.
     */
    PdfLineCap[PdfLineCap["round"] = 1] = "round";
    /**
     * Specifies the type of `square`.
     */
    PdfLineCap[PdfLineCap["square"] = 2] = "square";
})(PdfLineCap || (PdfLineCap = {}));
/**
 * Public enum to define the line join.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Gets the graphics of the PDF page
 * let graphics: PdfGraphics = page.graphics;
 * // Create a new pen
 * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
 * // Set the dash style
 * pen._dashStyle = PdfDashStyle.dashDot;
 * // Set the line join
 * pen._lineJoin = PdfLineJoin.bevel;
 * // Draw a rectangle using pen
 * graphics.drawRectangle(150, 50, 50, 50, pen);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfLineJoin;
(function (PdfLineJoin) {
    /**
     * Specifies the type of `miter`.
     */
    PdfLineJoin[PdfLineJoin["miter"] = 0] = "miter";
    /**
     * Specifies the type of `round`.
     */
    PdfLineJoin[PdfLineJoin["round"] = 1] = "round";
    /**
     * Specifies the type of `bevel`.
     */
    PdfLineJoin[PdfLineJoin["bevel"] = 2] = "bevel";
})(PdfLineJoin || (PdfLineJoin = {}));
export var _PdfWordWrapType;
(function (_PdfWordWrapType) {
    /**
     * Specifies the type of `none`.
     */
    _PdfWordWrapType[_PdfWordWrapType["none"] = 0] = "none";
    /**
     * Specifies the type of `word`.
     */
    _PdfWordWrapType[_PdfWordWrapType["word"] = 1] = "word";
    /**
     * Specifies the type of `wordOnly`.
     */
    _PdfWordWrapType[_PdfWordWrapType["wordOnly"] = 2] = "wordOnly";
    /**
     * Specifies the type of `character`.
     */
    _PdfWordWrapType[_PdfWordWrapType["character"] = 3] = "character";
})(_PdfWordWrapType || (_PdfWordWrapType = {}));
export var _FontDescriptorFlag;
(function (_FontDescriptorFlag) {
    _FontDescriptorFlag[_FontDescriptorFlag["fixedPitch"] = 1] = "fixedPitch";
    _FontDescriptorFlag[_FontDescriptorFlag["serif"] = 2] = "serif";
    _FontDescriptorFlag[_FontDescriptorFlag["symbolic"] = 4] = "symbolic";
    _FontDescriptorFlag[_FontDescriptorFlag["script"] = 8] = "script";
    _FontDescriptorFlag[_FontDescriptorFlag["nonSymbolic"] = 32] = "nonSymbolic";
    _FontDescriptorFlag[_FontDescriptorFlag["italic"] = 64] = "italic";
    _FontDescriptorFlag[_FontDescriptorFlag["forceBold"] = 262144] = "forceBold";
})(_FontDescriptorFlag || (_FontDescriptorFlag = {}));
export var _TrueTypeCmapFormat;
(function (_TrueTypeCmapFormat) {
    _TrueTypeCmapFormat[_TrueTypeCmapFormat["apple"] = 0] = "apple";
    _TrueTypeCmapFormat[_TrueTypeCmapFormat["microsoft"] = 4] = "microsoft";
    _TrueTypeCmapFormat[_TrueTypeCmapFormat["trimmed"] = 6] = "trimmed";
})(_TrueTypeCmapFormat || (_TrueTypeCmapFormat = {}));
export var _TrueTypeCmapEncoding;
(function (_TrueTypeCmapEncoding) {
    _TrueTypeCmapEncoding[_TrueTypeCmapEncoding["unknown"] = 0] = "unknown";
    _TrueTypeCmapEncoding[_TrueTypeCmapEncoding["symbol"] = 1] = "symbol";
    _TrueTypeCmapEncoding[_TrueTypeCmapEncoding["unicode"] = 2] = "unicode";
    _TrueTypeCmapEncoding[_TrueTypeCmapEncoding["macintosh"] = 3] = "macintosh";
})(_TrueTypeCmapEncoding || (_TrueTypeCmapEncoding = {}));
export var _TrueTypePlatformID;
(function (_TrueTypePlatformID) {
    _TrueTypePlatformID[_TrueTypePlatformID["appleUnicode"] = 0] = "appleUnicode";
    _TrueTypePlatformID[_TrueTypePlatformID["macintosh"] = 1] = "macintosh";
    _TrueTypePlatformID[_TrueTypePlatformID["iSO"] = 2] = "iSO";
    _TrueTypePlatformID[_TrueTypePlatformID["microsoft"] = 3] = "microsoft";
})(_TrueTypePlatformID || (_TrueTypePlatformID = {}));
export var _TrueTypeMicrosoftEncodingID;
(function (_TrueTypeMicrosoftEncodingID) {
    _TrueTypeMicrosoftEncodingID[_TrueTypeMicrosoftEncodingID["undefined"] = 0] = "undefined";
    _TrueTypeMicrosoftEncodingID[_TrueTypeMicrosoftEncodingID["unicode"] = 1] = "unicode";
})(_TrueTypeMicrosoftEncodingID || (_TrueTypeMicrosoftEncodingID = {}));
export var _TrueTypeMacintoshEncodingID;
(function (_TrueTypeMacintoshEncodingID) {
    _TrueTypeMacintoshEncodingID[_TrueTypeMacintoshEncodingID["roman"] = 0] = "roman";
    _TrueTypeMacintoshEncodingID[_TrueTypeMacintoshEncodingID["japanese"] = 1] = "japanese";
    _TrueTypeMacintoshEncodingID[_TrueTypeMacintoshEncodingID["chinese"] = 2] = "chinese";
})(_TrueTypeMacintoshEncodingID || (_TrueTypeMacintoshEncodingID = {}));
export var _TrueTypeCompositeGlyphFlag;
(function (_TrueTypeCompositeGlyphFlag) {
    _TrueTypeCompositeGlyphFlag[_TrueTypeCompositeGlyphFlag["Arg1And2AreWords"] = 1] = "Arg1And2AreWords";
    _TrueTypeCompositeGlyphFlag[_TrueTypeCompositeGlyphFlag["ArgsAreXyValues"] = 2] = "ArgsAreXyValues";
    _TrueTypeCompositeGlyphFlag[_TrueTypeCompositeGlyphFlag["RoundXyToGrid"] = 4] = "RoundXyToGrid";
    _TrueTypeCompositeGlyphFlag[_TrueTypeCompositeGlyphFlag["WeHaveScale"] = 8] = "WeHaveScale";
    _TrueTypeCompositeGlyphFlag[_TrueTypeCompositeGlyphFlag["Reserved"] = 16] = "Reserved";
    _TrueTypeCompositeGlyphFlag[_TrueTypeCompositeGlyphFlag["MoreComponents"] = 32] = "MoreComponents";
    _TrueTypeCompositeGlyphFlag[_TrueTypeCompositeGlyphFlag["WeHaveAnXyScale"] = 64] = "WeHaveAnXyScale";
    _TrueTypeCompositeGlyphFlag[_TrueTypeCompositeGlyphFlag["WeHaveTwoByTwo"] = 128] = "WeHaveTwoByTwo";
    _TrueTypeCompositeGlyphFlag[_TrueTypeCompositeGlyphFlag["WeHaveInstructions"] = 256] = "WeHaveInstructions";
    _TrueTypeCompositeGlyphFlag[_TrueTypeCompositeGlyphFlag["UseMyMetrics"] = 512] = "UseMyMetrics";
})(_TrueTypeCompositeGlyphFlag || (_TrueTypeCompositeGlyphFlag = {}));
export var _ImageFormat;
(function (_ImageFormat) {
    /**
     * Specifies the type of `unknown`.
     */
    _ImageFormat[_ImageFormat["unknown"] = 0] = "unknown";
    /**
     * Specifies the type of `bmp`.
     */
    _ImageFormat[_ImageFormat["bmp"] = 1] = "bmp";
    /**
     * Specifies the type of `emf`.
     */
    _ImageFormat[_ImageFormat["emf"] = 2] = "emf";
    /**
     * Specifies the type of `gif`.
     */
    _ImageFormat[_ImageFormat["gif"] = 3] = "gif";
    /**
     * Specifies the type of `jpeg`.
     */
    _ImageFormat[_ImageFormat["jpeg"] = 4] = "jpeg";
    /**
     * Specifies the type of `png`.
     */
    _ImageFormat[_ImageFormat["png"] = 5] = "png";
    /**
     * Specifies the type of `wmf`.
     */
    _ImageFormat[_ImageFormat["wmf"] = 6] = "wmf";
    /**
     * Specifies the type of `icon`.
     */
    _ImageFormat[_ImageFormat["icon"] = 7] = "icon";
})(_ImageFormat || (_ImageFormat = {}));
export var _TokenType;
(function (_TokenType) {
    _TokenType[_TokenType["none"] = 0] = "none";
    _TokenType[_TokenType["comment"] = 1] = "comment";
    _TokenType[_TokenType["number"] = 2] = "number";
    _TokenType[_TokenType["real"] = 3] = "real";
    _TokenType[_TokenType["string"] = 4] = "string";
    _TokenType[_TokenType["hexString"] = 5] = "hexString";
    _TokenType[_TokenType["unicodeString"] = 6] = "unicodeString";
    _TokenType[_TokenType["unicodeHexString"] = 7] = "unicodeHexString";
    _TokenType[_TokenType["name"] = 8] = "name";
    _TokenType[_TokenType["operator"] = 9] = "operator";
    _TokenType[_TokenType["beginArray"] = 10] = "beginArray";
    _TokenType[_TokenType["endArray"] = 11] = "endArray";
    _TokenType[_TokenType["eof"] = 12] = "eof";
})(_TokenType || (_TokenType = {}));
/**
 * Public enum to define text style.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Get the bookmarks
 * let bookmarks: PdfBookmarkBase = document.bookmarks;
 * // Gets bookmark at the specified index
 * let bookmark : PdfBookMark = bookmarks.at(0) as PdfBookMark;
 * // Gets the textStyle
 * let textStyle: PdfTextStyle = bookmark.textStyle;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfTextStyle;
(function (PdfTextStyle) {
    /**
     * Specifies the `regular` text style.
     */
    PdfTextStyle[PdfTextStyle["regular"] = 0] = "regular";
    /**
     * Specifies the `italic` text style.
     */
    PdfTextStyle[PdfTextStyle["italic"] = 1] = "italic";
    /**
     * Specifies the `bold` text style.
     */
    PdfTextStyle[PdfTextStyle["bold"] = 2] = "bold";
})(PdfTextStyle || (PdfTextStyle = {}));
export var _PdfColorSpace;
(function (_PdfColorSpace) {
    _PdfColorSpace[_PdfColorSpace["rgb"] = 0] = "rgb";
    _PdfColorSpace[_PdfColorSpace["cmyk"] = 1] = "cmyk";
    _PdfColorSpace[_PdfColorSpace["grayScale"] = 2] = "grayScale";
    _PdfColorSpace[_PdfColorSpace["indexed"] = 3] = "indexed";
})(_PdfColorSpace || (_PdfColorSpace = {}));
/**
 * Public enum type to represent the ordered list style
 * ````typescript
 * // Load an existing document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access the first page
 * let page: PdfPage = document.getPage(0);
 * // Add each item to the item collection by passing the string array
 * let items: PdfListitemCollection = new PdfListitemCollection(['Excel', 'Power', 'Point', 'Word', 'PDF']);
 * // Create a new ordered list and passing the list item collection
 * let list: PdfOrderedList = new PdfOrderedList(items);
 * // Set the ordered list number style for the list items
 * list.style = PdfNumberStyle.lowerLatin;
 * // Draw the ordered list
 * list.draw(page, 0, 20, 500, 700);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfNumberStyle;
(function (PdfNumberStyle) {
    /**
     * No numbering at all.
     */
    PdfNumberStyle[PdfNumberStyle["none"] = 0] = "none";
    /**
     * Specifies the type '1'.
     */
    PdfNumberStyle[PdfNumberStyle["numeric"] = 1] = "numeric";
    /**
     * Specifies the style 'a'.
     */
    PdfNumberStyle[PdfNumberStyle["lowerLatin"] = 2] = "lowerLatin";
    /**
     * Specifies the style 'i'.
     */
    PdfNumberStyle[PdfNumberStyle["lowerRoman"] = 3] = "lowerRoman";
    /**
     * Specifies the style 'A'.
     */
    PdfNumberStyle[PdfNumberStyle["upperLatin"] = 4] = "upperLatin";
    /**
     * Specifies the style 'I'.
     */
    PdfNumberStyle[PdfNumberStyle["upperRoman"] = 5] = "upperRoman";
})(PdfNumberStyle || (PdfNumberStyle = {}));
/**
 * Public enum to define the style used for unordered list.
 * ```typescript
 * // Load an existing document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access the first page
 * let page: PdfPage = document.getPage(0);
 * // Add each item to the collection by passing the string array
 * let items: PdfListitemCollection = new PdfListitemCollection(['Excel', 'Power', 'Point', 'Word', 'PDF']);
 * // Create a unordered list and pass the list item collection
 * let list: PdfUnorderedList = new PdfUnorderedList(items);
 * // Set the unordered list style for the list items
 * list.style = PdfUnorderedListStyle.circle;
 * // Draw the unordered list associated with items
 * list.draw(page, 0, 20, 500, 700);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfUnorderedListStyle;
(function (PdfUnorderedListStyle) {
    /**
     * No bulleting at all.
     */
    PdfUnorderedListStyle[PdfUnorderedListStyle["none"] = 0] = "none";
    /**
     * Specifies disk style.
     */
    PdfUnorderedListStyle[PdfUnorderedListStyle["disk"] = 1] = "disk";
    /**
     * Specifies square style.
     */
    PdfUnorderedListStyle[PdfUnorderedListStyle["square"] = 2] = "square";
    /**
     * Specifies asterisk style.
     */
    PdfUnorderedListStyle[PdfUnorderedListStyle["asterisk"] = 3] = "asterisk";
    /**
     * Specifies circle style.
     */
    PdfUnorderedListStyle[PdfUnorderedListStyle["circle"] = 4] = "circle";
})(PdfUnorderedListStyle || (PdfUnorderedListStyle = {}));
/**
 * Public enum to define a layout type for drawing
 * ```typescript
 * // Load an existing document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access the first page
 * let page: PdfPage = document.getPage(0);
 * // Assign the array of string for items
 * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
 * // Add the items to the list item collection by passing the array
 * let items: PdfListItemCollection = new PdfListItemCollection(products);
 * // Create a new ordered list
 * let list: PdfOrderedList = new PdfOrderedList(items);
 * // Create a layout format for drawing
 * let pageLayout: PdfLayoutFormat = new PdfLayoutFormat();
 * // Initialize layout type for drawing
 * pageLayout.layout = PdfLayoutType.paginate;
 * // Draw the list on the page along with the specified layout
 * list.draw(page, 0, 20, 500, 700, pageLayout);
 * // Get the layout type used to draw the list
 * let layoutType: PdfLayoutType = pageLayout.layout;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ````
 */
export var PdfLayoutType;
(function (PdfLayoutType) {
    /**
     * Specifies pagination across multiple pages based on the specified dimensions and layout options
     */
    PdfLayoutType[PdfLayoutType["paginate"] = 0] = "paginate";
    /**
     * Specifies content to be laid out to fit within a single page, without pagination
     */
    PdfLayoutType[PdfLayoutType["onePage"] = 1] = "onePage";
})(PdfLayoutType || (PdfLayoutType = {}));
/**
 * Public enum to define a layout Break type for drawing
 * ```typescript
 * // Load an existing document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access the first page
 * let page: PdfPage = document.getPage(0);
 * // Assign the array of string for items
 * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
 * // Add the item to list item collection by passing the string array
 * let items: PdfListItemCollection = new PdfListItemCollection(products);
 * // Create a new ordered list
 * let list: PdfOrderedList = new PdfOrderedList(items);
 * // Create a layout for drawing
 * let pageLayout: PdfLayoutFormat = new PdfLayoutFormat();
 * // Set  the layout break type for drawing
 * pageLayout.break = PdfLayoutBreakType.fitPage;
 * // Draw the list associated with items along with layout
 * list.draw(page, 0, 20, 500, 700, pageLayout);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ````
 */
export var PdfLayoutBreakType;
(function (PdfLayoutBreakType) {
    /**
     * Specifies that content should break to a new page to fit within specified dimensions.
     */
    PdfLayoutBreakType[PdfLayoutBreakType["fitPage"] = 0] = "fitPage";
    /**
     * Specifies that content should break to a new page or element to fit within specified dimensions.
     */
    PdfLayoutBreakType[PdfLayoutBreakType["fitElement"] = 1] = "fitElement";
})(PdfLayoutBreakType || (PdfLayoutBreakType = {}));
/**
 * Public enum to define a list marker alignment
 * ````typescript
 * // Load an existing document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access the first page
 * let page: PdfPage = document.getPage(0);
 * // Add each item to the item collection by passing the string array
 * let items: PdfListitemCollection = new PdfListitemCollection(['Excel', 'Power', 'Point', 'Word', 'PDF']);
 * // Create a new ordered list and passing the list item collection
 * let list: PdfOrderedList = new PdfOrderedList(items);
 * // Set the marker alignment
 * list.alignment = PdfListMarkerAlignment.left;
 * // Draw the ordered list
 * list.draw(page, 0, 20, 500, 700);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export var PdfListMarkerAlignment;
(function (PdfListMarkerAlignment) {
    /**
     * Left alignment for marker.
     */
    PdfListMarkerAlignment[PdfListMarkerAlignment["left"] = 0] = "left";
    /**
     * Right alignment for marker.
     */
    PdfListMarkerAlignment[PdfListMarkerAlignment["right"] = 1] = "right";
})(PdfListMarkerAlignment || (PdfListMarkerAlignment = {}));
/**
 * Public enum to define a print state of layer
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access the collection of layers in the document
 * let layers: PdfLayerCollection = document.layers;
 * // Retrieve the first layer from the layers collection
 * let layer: PdfLayer = layers.at(0);
 * // Retrieve the print state of the layer
 * let printState: PdfPrintState = layer.printState;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ````
 */
export var PdfPrintState;
(function (PdfPrintState) {
    /**
     * The PDF layers always get print
     */
    PdfPrintState[PdfPrintState["alwaysPrint"] = 0] = "alwaysPrint";
    /**
     * The PDF layers never get print
     */
    PdfPrintState[PdfPrintState["neverPrint"] = 1] = "neverPrint";
    /**
     * The visible PDF layers get print
     */
    PdfPrintState[PdfPrintState["printWhenVisible"] = 2] = "printWhenVisible";
})(PdfPrintState || (PdfPrintState = {}));
