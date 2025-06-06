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
export declare enum PdfAnnotationFlag {
    /**
     * Specifies the type of `default`.
     */
    default = 0,
    /**
     * Specifies the type of `invisible`.
     */
    invisible = 1,
    /**
     * Specifies the type of `hidden`.
     */
    hidden = 2,
    /**
     * Specifies the type of `print`.
     */
    print = 4,
    /**
     * Specifies the type of `noZoom`.
     */
    noZoom = 8,
    /**
     * Specifies the type of `noRotate`.
     */
    noRotate = 16,
    /**
     * Specifies the type of `noView`.
     */
    noView = 32,
    /**
     * Specifies the type of `readOnly`.
     */
    readOnly = 64,
    /**
     * Specifies the type of `locked`.
     */
    locked = 128,
    /**
     * Specifies the type of `toggleNoView`.
     */
    toggleNoView = 256
}
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
export declare enum PdfLineEndingStyle {
    /**
     * Specifies the type of `none`.
     */
    none = 0,
    /**
     * Specifies the type of `openArrow`.
     */
    openArrow = 1,
    /**
     * Specifies the type of `closedArrow`.
     */
    closedArrow = 2,
    /**
     * Specifies the type of `rOpenArrow`.
     */
    rOpenArrow = 3,
    /**
     * Specifies the type of `rClosedArrow`.
     */
    rClosedArrow = 4,
    /**
     * Specifies the type of `butt`.
     */
    butt = 5,
    /**
     * Specifies the type of `diamond`.
     */
    diamond = 6,
    /**
     * Specifies the type of `circle`.
     */
    circle = 7,
    /**
     * Specifies the type of `square`.
     */
    square = 8,
    /**
     * Specifies the type of `slash`.
     */
    slash = 9
}
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
export declare enum PdfLineIntent {
    /**
     * Specifies the type of `lineArrow`.
     */
    lineArrow = 0,
    /**
     * Specifies the type of `lineDimension`.
     */
    lineDimension = 1
}
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
export declare enum PathPointType {
    /**
     * The starting point of a path.
     */
    start = 0,
    /**
     * A straight line segment.
     */
    line = 1,
    /**
     * A Bezier curve segment.
     */
    bezier = 3,
    /**
     * A mask for extracting the type of a point.
     */
    pathTypeMask = 7,
    /**
     * Indicates that the segment has dashed line style.
     */
    dashMode = 16,
    /**
     * Indicates a marker point in the path.
     */
    pathMarker = 32,
    /**
     * Closes the current path.
     */
    closePath = 128
}
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
export declare enum PdfLineCaptionType {
    /**
     * Specifies the type of `inline`.
     */
    inline = 0,
    /**
     * Specifies the type of `top`.
     */
    top = 1
}
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
export declare enum PdfBorderStyle {
    /**
     * Specifies the type of `solid`.
     */
    solid = 0,
    /**
     * Specifies the type of `dashed`.
     */
    dashed = 1,
    /**
     * Specifies the type of `beveled`.
     */
    beveled = 2,
    /**
     * Specifies the type of `inset`.
     */
    inset = 3,
    /**
     * Specifies the type of `underline`.
     */
    underline = 4,
    /**
     * Specifies the type of `dot`.
     */
    dot = 5
}
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
export declare enum PdfBorderEffectStyle {
    /**
     * Specifies the type of `solid`.
     */
    solid = 0,
    /**
     * Specifies the type of `cloudy`.
     */
    cloudy = 1
}
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
export declare enum PdfRotationAngle {
    /**
     * Specifies the type of `angle0`.
     */
    angle0 = 0,
    /**
     * Specifies the type of `angle90`.
     */
    angle90 = 1,
    /**
     * Specifies the type of `angle180`.
     */
    angle180 = 2,
    /**
     * Specifies the type of `angle270`.
     */
    angle270 = 3
}
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
export declare enum PdfCrossReferenceType {
    /**
     * Specifies the type of `table`.
     */
    table = 0,
    /**
     * Specifies the type of `stream`.
     */
    stream = 1
}
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
export declare enum PdfHighlightMode {
    /**
     * Specifies the type of `noHighlighting`.
     */
    noHighlighting = 0,
    /**
     * Specifies the type of `invert`.
     */
    invert = 1,
    /**
     * Specifies the type of `outline`.
     */
    outline = 2,
    /**
     * Specifies the type of `push`.
     */
    push = 3
}
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
export declare enum PdfTextAlignment {
    /**
     * Specifies the type of `left`.
     */
    left = 0,
    /**
     * Specifies the type of `center`.
     */
    center = 1,
    /**
     * Specifies the type of `right`.
     */
    right = 2,
    /**
     * Specifies the type of `justify`.
     */
    justify = 3
}
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
export declare enum PdfFormFieldVisibility {
    /**
     * Specifies the type of `visible`.
     */
    visible = 0,
    /**
     * Specifies the type of `hidden`.
     */
    hidden = 1,
    /**
     * Specifies the type of `visibleNotPrintable`.
     */
    visibleNotPrintable = 2,
    /**
     * Specifies the type of `hiddenPrintable`.
     */
    hiddenPrintable = 3
}
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
export declare enum PdfMeasurementUnit {
    /**
     * Specifies the type of `inch`.
     */
    inch = 0,
    /**
     * Specifies the type of `pica`.
     */
    pica = 1,
    /**
     * Specifies the type of `point`.
     */
    point = 3,
    /**
     * Specifies the type of `centimeter`.
     */
    centimeter = 4,
    /**
     * Specifies the type of `millimeter`.
     */
    millimeter = 6
}
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
export declare enum PdfCircleMeasurementType {
    /**
     * Specifies the type of `diameter`.
     */
    diameter = 0,
    /**
     * Specifies the type of `radius`.
     */
    radius = 1
}
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
export declare enum PdfRubberStampAnnotationIcon {
    /**
     * Specifies the type of `approved`.
     */
    approved = 0,
    /**
     * Specifies the type of `asIs`.
     */
    asIs = 1,
    /**
     * Specifies the type of `confidential`.
     */
    confidential = 2,
    /**
     * Specifies the type of `departmental`.
     */
    departmental = 3,
    /**
     * Specifies the type of `draft`.
     */
    draft = 4,
    /**
     * Specifies the type of `experimental`.
     */
    experimental = 5,
    /**
     * Specifies the type of `expired`.
     */
    expired = 6,
    /**
     * Specifies the type of `final`.
     */
    final = 7,
    /**
     * Specifies the type of `forComment`.
     */
    forComment = 8,
    /**
     * Specifies the type of `forPublicRelease`.
     */
    forPublicRelease = 9,
    /**
     * Specifies the type of `notApproved`.
     */
    notApproved = 10,
    /**
     * Specifies the type of `notForPublicRelease`.
     */
    notForPublicRelease = 11,
    /**
     * Specifies the type of `sold`.
     */
    sold = 12,
    /**
     * Specifies the type of `topSecret`.
     */
    topSecret = 13,
    /**
     * Specifies the type of `completed`.
     */
    completed = 14,
    /**
     * Specifies the type of `void`.
     */
    void = 15,
    /**
     * Specifies the type of `informationOnly`.
     */
    informationOnly = 16,
    /**
     * Specifies the type of `preliminaryResults`.
     */
    preliminaryResults = 17
}
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
export declare enum PdfCheckBoxStyle {
    /**
     * Specifies the type of `check`.
     */
    check = 0,
    /**
     * Specifies the type of `circle`.
     */
    circle = 1,
    /**
     * Specifies the type of `cross`.
     */
    cross = 2,
    /**
     * Specifies the type of `diamond`.
     */
    diamond = 3,
    /**
     * Specifies the type of `square`.
     */
    square = 4,
    /**
     * Specifies the type of `star`.
     */
    star = 5
}
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
export declare enum PdfTextMarkupAnnotationType {
    /**
     * Specifies the type of `highlight`.
     */
    highlight = 0,
    /**
     * Specifies the type of `underline`.
     */
    underline = 1,
    /**
     * Specifies the type of `squiggly`.
     */
    squiggly = 2,
    /**
     * Specifies the type of `strikeOut`.
     */
    strikeOut = 3
}
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
export declare enum PdfPopupIcon {
    /**
     * Specifies the type of `note`.
     */
    note = 0,
    /**
     * Specifies the type of `comment`.
     */
    comment = 1,
    /**
     * Specifies the type of `help`.
     */
    help = 2,
    /**
     * Specifies the type of `insert`.
     */
    insert = 3,
    /**
     * Specifies the type of `key`.
     */
    key = 4,
    /**
     * Specifies the type of `new paragraph`.
     */
    newParagraph = 5,
    /**
     * Specifies the type of `paragraph`.
     */
    paragraph = 6
}
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
export declare enum PdfAnnotationState {
    /**
     * Specifies the default state of `none`.
     */
    none = 0,
    /**
     * Specifies the state of `accepted`.
     */
    accepted = 1,
    /**
     * Specifies the state of `rejected`.
     */
    rejected = 2,
    /**
     * Specifies the state of `cancel`.
     */
    cancel = 3,
    /**
     * Specifies the state of `completed`.
     */
    completed = 4,
    /**
     * Specifies the state of `marked`.
     */
    marked = 5,
    /**
     * Specifies the state of `unmarked`.
     */
    unmarked = 6,
    /**
     * Specifies the state of `unknown`.
     */
    unknown = 7
}
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
export declare enum PdfAnnotationStateModel {
    /**
     * Specifies the default model of `none`.
     */
    none = 0,
    /**
     * Specifies the model of `marked`.
     */
    marked = 1,
    /**
     * Specifies the model of `review`.
     */
    review = 2
}
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
export declare enum PdfAttachmentIcon {
    /**
     * Specifies the default icon of `pushPin`.
     */
    pushPin = 0,
    /**
     * Specifies the icon of `tag`.
     */
    tag = 1,
    /**
     * Specifies the icon of `graph`.
     */
    graph = 2,
    /**
     * Specifies the icon of `paperClip`.
     */
    paperClip = 3
}
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
export declare enum PdfAnnotationIntent {
    /**
     * Specifies the default intent of `none`.
     */
    none = 0,
    /**
     * Specifies the intent of `freeTextCallout`.
     */
    freeTextCallout = 1,
    /**
     * Specifies the intent of `freeTextTypeWriter`.
     */
    freeTextTypeWriter = 2
}
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
export declare enum PdfDestinationMode {
    /**
     * Specifies the default intent of `location`.
     */
    location = 0,
    /**
     * Specifies the intent of `FitToPage`.
     */
    fitToPage = 1,
    /**
     * Specifies the intent of `fitR`.
     */
    fitR = 2,
    /**
     * Specifies the intent of `fitH`.
     */
    fitH = 3
}
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
export declare enum DataFormat {
    /**
     * Specifies the intent of `FDF`.
     */
    fdf = 0,
    /**
     * Specifies the intent of `XFDF`.
     */
    xfdf = 1,
    /**
     * Specifies the intent of `JSON`.
     */
    json = 2,
    /**
     * Specifies the intent of `XML`.
     */
    xml = 3
}
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
export declare enum PdfFormFieldsTabOrder {
    /**
     * Specifies that no tab order is defined.
     */
    none = 0,
    /**
     * Specifies the tab order is defined by the document's rows.
     */
    row = 1,
    /**
     * Specifies the tab order is defined by the document's columns.
     */
    column = 2,
    /**
     * Specifies the tab order is defined by the document's structure tree.
     */
    structure = 3,
    /**
     * Specifies the tab order is defined manually.
     */
    manual = 4,
    /**
     * Specifies the tab order is defined by the widget annotations in the document.
     */
    widget = 5
}
/**
 * Enum for PDF loaded annotation type.
 */
export declare enum _PdfAnnotationType {
    /**
     * Specifies the intent of `highlight`.
     */
    highlight = 0,
    /**
     * Specifies the intent of `underline`.
     */
    underline = 1,
    /**
     * Specifies the intent of `strikeOut`.
     */
    strikeOut = 2,
    /**
     * Specifies the intent of `squiggly`.
     */
    squiggly = 3,
    /**
     * Specifies the intent of `redactionAnnotation`.
     */
    redactionAnnotation = 4,
    /**
     * Specifies the intent of `textAnnotation`.
     */
    textAnnotation = 5,
    /**
     * Specifies the intent of `linkAnnotation`.
     */
    linkAnnotation = 6,
    /**
     * Specifies the intent of `documentLinkAnnotation`.
     */
    documentLinkAnnotation = 7,
    /**
     * Specifies the intent of `uriAnnotation`.
     */
    uriAnnotation = 8,
    /**
     * Specifies the intent of `fileLinkAnnotation`.
     */
    fileLinkAnnotation = 9,
    /**
     * Specifies the intent of `freeTextAnnotation`.
     */
    freeTextAnnotation = 10,
    /**
     * Specifies the intent of `lineAnnotation`.
     */
    lineAnnotation = 11,
    /**
     * Specifies the intent of `circleAnnotation`.
     */
    circleAnnotation = 12,
    /**
     * Specifies the intent of `ellipseAnnotation`.
     */
    ellipseAnnotation = 13,
    /**
     * Specifies the intent of `squareAnnotation`.
     */
    squareAnnotation = 14,
    /**
     * Specifies the intent of `rectangleAnnotation`.
     */
    rectangleAnnotation = 15,
    /**
     * Specifies the intent of `polygonAnnotation`.
     */
    polygonAnnotation = 16,
    /**
     * Specifies the intent of `polyLineAnnotation`.
     */
    polyLineAnnotation = 17,
    /**
     * Specifies the intent of `textMarkupAnnotation`.
     */
    textMarkupAnnotation = 18,
    /**
     * Specifies the intent of `caretAnnotation`.
     */
    caretAnnotation = 19,
    /**
     * Specifies the intent of `rubberStampAnnotation`.
     */
    rubberStampAnnotation = 20,
    /**
     * Specifies the intent of `popupAnnotation`.
     */
    popupAnnotation = 21,
    /**
     * Specifies the intent of `fileAttachmentAnnotation`.
     */
    fileAttachmentAnnotation = 22,
    /**
     * Specifies the intent of `soundAnnotation`.
     */
    soundAnnotation = 23,
    /**
     * Specifies the intent of `movieAnnotation`.
     */
    movieAnnotation = 24,
    /**
     * Specifies the intent of `screenAnnotation`.
     */
    screenAnnotation = 25,
    /**
     * Specifies the intent of `widgetAnnotation`.
     */
    widgetAnnotation = 26,
    /**
     * Specifies the intent of `printerMarkAnnotation`.
     */
    printerMarkAnnotation = 27,
    /**
     * Specifies the intent of `trapNetworkAnnotation`.
     */
    trapNetworkAnnotation = 28,
    /**
     * Specifies the intent of `watermarkAnnotation`.
     */
    watermarkAnnotation = 29,
    /**
     * Specifies the intent of `textWebLinkAnnotation`.
     */
    textWebLinkAnnotation = 30,
    /**
     * Specifies the intent of `inkAnnotation`.
     */
    inkAnnotation = 31,
    /**
     * Specifies the intent of `richMediaAnnotation`.
     */
    richMediaAnnotation = 32,
    /**
     * Specifies the intent of `angleMeasurementAnnotation`.
     */
    angleMeasurementAnnotation = 33,
    /**
     * Specifies the intent of `null`.
     */
    null = 34
}
/**
 * Enum for PDF graphics unit.
 */
export declare enum _PdfGraphicsUnit {
    /**
     * Specifies the type of `centimeter`.
     */
    centimeter = 0,
    /**
     * Specifies the type of `pica`.
     */
    pica = 1,
    /**
     * Specifies the type of `pixel`.
     */
    pixel = 2,
    /**
     * Specifies the type of `point`.
     */
    point = 3,
    /**
     * Specifies the type of `inch`.
     */
    inch = 4,
    /**
     * Specifies the type of `document`.
     */
    document = 5,
    /**
     * Specifies the type of `millimeter`.
     */
    millimeter = 6
}
export declare enum _FieldFlag {
    default = 0,
    readOnly = 1,
    required = 2,
    noExport = 4,
    multiLine = 4096,
    password = 8192,
    fileSelect = 1048576,
    doNotSpellCheck = 4194304,
    doNotScroll = 8388608,
    comb = 16777216,
    richText = 33554432,
    noToggleToOff = 16384,
    radio = 32768,
    pushButton = 65536,
    radiosInUnison = 33554432,
    combo = 131072,
    edit = 262144,
    sort = 524288,
    multiSelect = 2097152,
    commitOnSelectChange = 67108864
}
export declare enum _SignatureFlag {
    none = 0,
    signatureExists = 1,
    appendOnly = 2
}
export declare enum _PdfCheckFieldState {
    unchecked = 0,
    checked = 1,
    pressedUnchecked = 2,
    pressedChecked = 3
}
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
export declare enum PdfPermissionFlag {
    /**
     * Specifies the default permission flag.
     */
    default = 0,
    /**
     * Specifies the print permission flag.
     */
    print = 4,
    /**
     * Specifies the edit content permission flag.
     */
    editContent = 8,
    /**
     * Specifies the copy content permission flag.
     */
    copyContent = 16,
    /**
     * Specifies the edit annotations permission flag.
     */
    editAnnotations = 32,
    /**
     * Specifies the fill fields permission flag.
     */
    fillFields = 256,
    /**
     * Specifies the accessibility copy content permission flag.
     */
    accessibilityCopyContent = 512,
    /**
     * Specifies the assemble document permission flag.
     */
    assembleDocument = 1024,
    /**
     * Specifies the full quality print permission flag.
     */
    fullQualityPrint = 2048
}
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
export declare enum PdfPageOrientation {
    /**
     * Specifies the type of `portrait`.
     */
    portrait = 0,
    /**
     * Specifies the type of `landscape`.
     */
    landscape = 1
}
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
export declare enum PdfTextDirection {
    /**
     * Specifies the type of `none`.
     */
    none = 0,
    /**
     * Specifies the type of `leftToRight`.
     */
    leftToRight = 1,
    /**
     * Specifies the type of `rightToLeft`.
     */
    rightToLeft = 2
}
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
export declare enum PdfSubSuperScript {
    /**
     * Specifies the type of `none`.
     */
    none = 0,
    /**
     * Specifies the type of `superScript`.
     */
    superScript = 1,
    /**
     * Specifies the type of `subScript`.
     */
    subScript = 2
}
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
export declare enum PdfBlendMode {
    /**
     * Specifies the type of `normal`.
     */
    normal = 0,
    /**
     * Specifies the type of `multiply`.
     */
    multiply = 1,
    /**
     * Specifies the type of `screen`.
     */
    screen = 2,
    /**
     * Specifies the type of `overlay`.
     */
    overlay = 3,
    /**
     * Specifies the type of `darken`.
     */
    darken = 4,
    /**
     * Specifies the type of `lighten`.
     */
    lighten = 5,
    /**
     * Specifies the type of `colorDodge`.
     */
    colorDodge = 6,
    /**
     * Specifies the type of `colorBurn`.
     */
    colorBurn = 7,
    /**
     * Specifies the type of `hardLight`.
     */
    hardLight = 8,
    /**
     * Specifies the type of `softLight`.
     */
    softLight = 9,
    /**
     * Specifies the type of `difference`.
     */
    difference = 10,
    /**
     * Specifies the type of `exclusion`.
     */
    exclusion = 11,
    /**
     * Specifies the type of `hue`.
     */
    hue = 12,
    /**
     * Specifies the type of `saturation`.
     */
    saturation = 13,
    /**
     * Specifies the type of `color`.
     */
    color = 14,
    /**
     * Specifies the type of `luminosity`.
     */
    luminosity = 15
}
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
export declare enum PdfFillMode {
    /**
     * Specifies the type of `winding`.
     */
    winding = 0,
    /**
     * Specifies the type of `alternate`.
     */
    alternate = 1
}
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
export declare enum PdfDashStyle {
    /**
     * Specifies the type of `solid`.
     */
    solid = 0,
    /**
     * Specifies the type of `dash`.
     */
    dash = 1,
    /**
     * Specifies the type of `dot`.
     */
    dot = 2,
    /**
     * Specifies the type of `dashDot`.
     */
    dashDot = 3,
    /**
     * Specifies the type of `dashDotDot`.
     */
    dashDotDot = 4,
    /**
     * Specifies the type of `custom`.
     */
    custom = 5
}
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
export declare enum PdfLineCap {
    /**
     * Specifies the type of `flat`.
     */
    flat = 0,
    /**
     * Specifies the type of `round`.
     */
    round = 1,
    /**
     * Specifies the type of `square`.
     */
    square = 2
}
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
export declare enum PdfLineJoin {
    /**
     * Specifies the type of `miter`.
     */
    miter = 0,
    /**
     * Specifies the type of `round`.
     */
    round = 1,
    /**
     * Specifies the type of `bevel`.
     */
    bevel = 2
}
export declare enum _PdfWordWrapType {
    /**
     * Specifies the type of `none`.
     */
    none = 0,
    /**
     * Specifies the type of `word`.
     */
    word = 1,
    /**
     * Specifies the type of `wordOnly`.
     */
    wordOnly = 2,
    /**
     * Specifies the type of `character`.
     */
    character = 3
}
export declare enum _FontDescriptorFlag {
    fixedPitch = 1,
    serif = 2,
    symbolic = 4,
    script = 8,
    nonSymbolic = 32,
    italic = 64,
    forceBold = 262144
}
export declare enum _TrueTypeCmapFormat {
    apple = 0,
    microsoft = 4,
    trimmed = 6
}
export declare enum _TrueTypeCmapEncoding {
    unknown = 0,
    symbol = 1,
    unicode = 2,
    macintosh = 3
}
export declare enum _TrueTypePlatformID {
    appleUnicode = 0,
    macintosh = 1,
    iSO = 2,
    microsoft = 3
}
export declare enum _TrueTypeMicrosoftEncodingID {
    undefined = 0,
    unicode = 1
}
export declare enum _TrueTypeMacintoshEncodingID {
    roman = 0,
    japanese = 1,
    chinese = 2
}
export declare enum _TrueTypeCompositeGlyphFlag {
    Arg1And2AreWords = 1,
    ArgsAreXyValues = 2,
    RoundXyToGrid = 4,
    WeHaveScale = 8,
    Reserved = 16,
    MoreComponents = 32,
    WeHaveAnXyScale = 64,
    WeHaveTwoByTwo = 128,
    WeHaveInstructions = 256,
    UseMyMetrics = 512
}
export declare enum _ImageFormat {
    /**
     * Specifies the type of `unknown`.
     */
    unknown = 0,
    /**
     * Specifies the type of `bmp`.
     */
    bmp = 1,
    /**
     * Specifies the type of `emf`.
     */
    emf = 2,
    /**
     * Specifies the type of `gif`.
     */
    gif = 3,
    /**
     * Specifies the type of `jpeg`.
     */
    jpeg = 4,
    /**
     * Specifies the type of `png`.
     */
    png = 5,
    /**
     * Specifies the type of `wmf`.
     */
    wmf = 6,
    /**
     * Specifies the type of `icon`.
     */
    icon = 7
}
export declare enum _TokenType {
    none = 0,
    comment = 1,
    number = 2,
    real = 3,
    string = 4,
    hexString = 5,
    unicodeString = 6,
    unicodeHexString = 7,
    name = 8,
    operator = 9,
    beginArray = 10,
    endArray = 11,
    eof = 12
}
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
export declare enum PdfTextStyle {
    /**
     * Specifies the `regular` text style.
     */
    regular = 0,
    /**
     * Specifies the `italic` text style.
     */
    italic = 1,
    /**
     * Specifies the `bold` text style.
     */
    bold = 2
}
export declare enum _PdfColorSpace {
    rgb = 0,
    cmyk = 1,
    grayScale = 2,
    indexed = 3
}
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
export declare enum PdfNumberStyle {
    /**
     * No numbering at all.
     */
    none = 0,
    /**
     * Specifies the type '1'.
     */
    numeric = 1,
    /**
     * Specifies the style 'a'.
     */
    lowerLatin = 2,
    /**
     * Specifies the style 'i'.
     */
    lowerRoman = 3,
    /**
     * Specifies the style 'A'.
     */
    upperLatin = 4,
    /**
     * Specifies the style 'I'.
     */
    upperRoman = 5
}
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
export declare enum PdfUnorderedListStyle {
    /**
     * No bulleting at all.
     */
    none = 0,
    /**
     * Specifies disk style.
     */
    disk = 1,
    /**
     * Specifies square style.
     */
    square = 2,
    /**
     * Specifies asterisk style.
     */
    asterisk = 3,
    /**
     * Specifies circle style.
     */
    circle = 4
}
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
export declare enum PdfLayoutType {
    /**
     * Specifies pagination across multiple pages based on the specified dimensions and layout options
     */
    paginate = 0,
    /**
     * Specifies content to be laid out to fit within a single page, without pagination
     */
    onePage = 1
}
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
export declare enum PdfLayoutBreakType {
    /**
     * Specifies that content should break to a new page to fit within specified dimensions.
     */
    fitPage = 0,
    /**
     * Specifies that content should break to a new page or element to fit within specified dimensions.
     */
    fitElement = 1
}
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
export declare enum PdfListMarkerAlignment {
    /**
     * Left alignment for marker.
     */
    left = 0,
    /**
     * Right alignment for marker.
     */
    right = 1
}
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
export declare enum PdfPrintState {
    /**
     * The PDF layers always get print
     */
    alwaysPrint = 0,
    /**
     * The PDF layers never get print
     */
    neverPrint = 1,
    /**
     * The visible PDF layers get print
     */
    printWhenVisible = 2
}
