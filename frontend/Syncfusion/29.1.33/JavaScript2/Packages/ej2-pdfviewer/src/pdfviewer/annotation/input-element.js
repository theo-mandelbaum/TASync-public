/**
 * @hidden
 */
var InputElement = /** @class */ (function () {
    function InputElement(pdfviewer, pdfViewerBase) {
        this.pdfViewer = pdfviewer;
        this.pdfViewerBase = pdfViewerBase;
        this.inputBoxElement = document.createElement('input');
        this.inputBoxElement.addEventListener('focusout', this.onFocusOutInputBox.bind(this));
        this.maxHeight = 24.6;
        this.maxWidth = 151;
        this.fontSize = 16;
        this.isInFocus = false;
        this.inputBoxElement.style.position = 'absolute';
        this.inputBoxElement.style.fontFamily = 'Helvetica';
    }
    /**
     * @param {PointModel} currentPosition - It describes about the current position
     * @param {PdfAnnotationBaseModel} annotation - It describes about the annotation
     * @private
     * @returns {void}
     */
    InputElement.prototype.editLabel = function (currentPosition, annotation) {
        var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
        var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + (pageIndex));
        var zoomFactor = this.pdfViewerBase.getZoomFactor();
        this.inputBoxElement.value = annotation.labelContent;
        this.inputBoxElement.select();
        annotation.labelContent = '';
        this.pdfViewer.nodePropertyChange(annotation, {});
        this.inputBoxElement.style.left = ((currentPosition.x) * zoomFactor) + 'px';
        this.inputBoxElement.style.top = ((currentPosition.y) * zoomFactor) + 'px';
        this.inputBoxElement.style.maxHeight = (this.maxHeight * zoomFactor) + 'px';
        this.inputBoxElement.style.maxWidth = (this.maxWidth * zoomFactor) + 'px';
        this.inputBoxElement.style.fontSize = (this.fontSize * zoomFactor) + 'px';
        this.inputBoxElement.style.textAlign = 'center';
        if (annotation && annotation.wrapper && annotation.wrapper.bounds) {
            this.inputBoxElement.style.width = annotation.wrapper.bounds.width ? (annotation.wrapper.bounds.width * zoomFactor) + 1 + 'px' : (this.maxWidth * zoomFactor) + 'px';
            var inputEleWidth = parseFloat(this.inputBoxElement.style.width);
            inputEleWidth = inputEleWidth > (this.maxWidth * zoomFactor) ? (this.maxWidth * zoomFactor) : inputEleWidth;
            if (annotation.wrapper.bounds.left) {
                this.inputBoxElement.style.left = ((annotation.wrapper.bounds.left + (annotation.wrapper.bounds.width / 2) - (inputEleWidth / (zoomFactor * 2))) * zoomFactor) + 'px';
            }
            if (annotation.wrapper.bounds.top) {
                if (annotation.shapeAnnotationType === 'Line' || annotation.shapeAnnotationType === 'LineWidthArrowHead' ||
                    annotation.shapeAnnotationType === 'Distance' || annotation.shapeAnnotationType === 'Polygon') {
                    this.inputBoxElement.style.top = ((annotation.wrapper.bounds.top + (annotation.wrapper.bounds.height / 2) - (this.maxHeight)) * zoomFactor) + 'px';
                }
                else {
                    this.inputBoxElement.style.top = ((annotation.wrapper.bounds.top + (annotation.wrapper.bounds.height / 2) - (this.maxHeight / 2)) * zoomFactor) + 'px';
                }
            }
            this.inputBoxElement.maxLength = annotation.labelMaxLength;
            this.inputBoxElement.fontFamily = annotation.fontFamily;
            this.inputBoxElement.style.color = annotation.fontColor;
            this.inputBoxElement.style.border = '1px solid #ffffff00';
            this.inputBoxElement.style.padding = '2px';
            this.inputBoxElement.style.background = annotation.labelFillColor;
        }
        pageDiv.appendChild(this.inputBoxElement);
        this.isInFocus = true;
        this.inputBoxElement.focus();
    };
    /**
     * @private
     * @returns {void}
     */
    InputElement.prototype.onFocusOutInputBox = function () {
        var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
        var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + (pageIndex));
        var inputEleHeight = parseFloat(this.inputBoxElement.style.height);
        var inputEleWidth = parseFloat(this.inputBoxElement.style.width);
        this.isInFocus = false;
        var selectedAnnotation = this.pdfViewer.selectedItems.annotations[0];
        if (selectedAnnotation) {
            inputEleWidth = ((inputEleWidth - 1) / this.pdfViewerBase.getZoomFactor());
            inputEleHeight = ((inputEleHeight - 1) / this.pdfViewerBase.getZoomFactor());
            // this.pdfViewer.annotation.modifyDynamicTextValue(this.inputBoxElement.value, this.selectedAnnotation.annotName);
            selectedAnnotation.labelContent = this.inputBoxElement.value;
            selectedAnnotation.notes = this.inputBoxElement.value;
            if (selectedAnnotation.shapeAnnotationType === 'Rectangle' || selectedAnnotation.shapeAnnotationType === 'Ellipse' || selectedAnnotation.shapeAnnotationType === 'Line'
                || selectedAnnotation.shapeAnnotationType === 'LineWidthArrowHead') {
                this.pdfViewer.annotation.shapeAnnotationModule.modifyInCollection('labelContent', pageIndex, selectedAnnotation, null);
            }
            else if (selectedAnnotation.shapeAnnotationType === 'Radius' && selectedAnnotation.measureType) {
                this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('labelContent', pageIndex, selectedAnnotation);
            }
            this.pdfViewer.nodePropertyChange(selectedAnnotation, {});
            this.pdfViewer.renderSelector(selectedAnnotation.pageIndex, this.pdfViewer.annotationSelectorSettings);
            var commentsDiv = document.getElementById(this.pdfViewer.selectedItems.annotations[0].annotName);
            if (commentsDiv && commentsDiv.childNodes && this.inputBoxElement.value !== 'label') {
                if (commentsDiv.childNodes[0].ej2_instances) {
                    commentsDiv.childNodes[0].ej2_instances[0].value = this.inputBoxElement.value;
                }
                else if (commentsDiv.childNodes[0].childNodes && commentsDiv.childNodes[0].childNodes[1].ej2_instances) {
                    commentsDiv.childNodes[0].childNodes[1].ej2_instances[0].value = this.inputBoxElement.value;
                }
            }
        }
        pageDiv.removeChild(this.inputBoxElement);
        var canvass = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', pageIndex);
        this.pdfViewer.renderDrawing(canvass, pageIndex);
    };
    /**
     * @param {any} bounds - It describes about the bounds value
     * @param {number} pageIndex - It describes about the page index value
     * @private
     * @returns {any} - any
     */
    InputElement.prototype.calculateLabelBounds = function (bounds, pageIndex) {
        var labelBounds = {};
        if (bounds) {
            var labelTop = 0;
            var labelLeft = 0;
            var labelWidth = 0;
            var labelHeight = 24.6;
            var labelMaxWidth = 151;
            if (pageIndex === undefined) {
                pageIndex = this.pdfViewerBase.currentPageNumber - 1;
            }
            var rotation = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].rotation;
            if (bounds.width) {
                labelWidth = (bounds.width / 2);
                labelWidth = (labelWidth > 0 && labelWidth < labelMaxWidth) ? labelWidth : labelMaxWidth;
            }
            if (bounds.left) {
                labelLeft = (bounds.left + (bounds.width / 2) - (labelWidth / 2));
            }
            if (bounds.top) {
                labelTop = (bounds.top + (bounds.height / 2) - (labelHeight / 2));
            }
            if (rotation === 1 || rotation === 3) {
                labelBounds = { left: labelLeft, top: labelTop, width: (labelWidth - labelHeight) + (labelWidth / 2),
                    height: (labelHeight * 2) + labelWidth, right: 0, bottom: 0 };
            }
            else {
                labelBounds = { left: labelLeft, top: labelTop, width: labelWidth, height: labelHeight, right: 0, bottom: 0 };
            }
        }
        return labelBounds;
    };
    /**
     * @param bounds
     * @private
     */
    InputElement.prototype.calculateLabelBoundsFromLoadedDocument = function (bounds) {
        var labelBounds = {};
        if (bounds) {
            var labelTop = 0;
            var labelLeft = 0;
            var labelWidth = 0;
            var labelHeight = 24.6;
            var labelMaxWidth = 151;
            if (bounds.Width) {
                labelWidth = (bounds.Width / 2);
                labelWidth = (labelWidth > 0 && labelWidth < labelMaxWidth) ? labelWidth : labelMaxWidth;
            }
            if (bounds.Left) {
                labelLeft = (bounds.Left + (bounds.Width / 2) - (labelWidth / 2));
            }
            if (bounds.Top) {
                labelTop = (bounds.Top + (bounds.Height / 2) - (labelHeight / 2));
            }
            labelBounds = { left: labelLeft, top: labelTop, width: labelWidth, height: labelHeight, right: 0, bottom: 0 };
        }
        return labelBounds;
    };
    return InputElement;
}());
export { InputElement };
