import { PdfViewerBase, TextMarkupAnnotation, ShapeAnnotation, StampAnnotation, StickyNotesAnnotation, MeasureAnnotation, InkAnnotation, AllowedInteraction, DynamicStampItem, SignStampItem, StandardBusinessStampItem } from '../index';
import { createElement, Browser, isNullOrUndefined, isBlazor, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { NumericTextBox, Slider, ColorPicker } from '@syncfusion/ej2-inputs';
import { Dialog } from '@syncfusion/ej2-popups';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { processPathData, splitArrayCollection } from '@syncfusion/ej2-drawings';
import { isLineShapes, cloneObject } from '../drawing/drawing-util';
import { NodeDrawingTool, LineTool, MoveTool, ResizeTool, ConnectTool } from '../drawing/tools';
import { updateDistanceLabel, updateRadiusLabel, updatePerimeterLabel, updateCalibrateLabel } from '../drawing/connector-util';
import { FreeTextAnnotation } from './free-text-annotation';
import { InputElement } from './input-element';
import { InPlaceEditor } from '@syncfusion/ej2-inplace-editor';
/**
 * The `Annotation` module is used to handle annotation actions of PDF viewer.
 */
var Annotation = /** @class */ (function () {
    /**
     * @param {PdfViewer} pdfViewer - pdfViewer
     * @param {PdfViewerBase} viewerBase - viewerBase
     * @private
     */
    function Annotation(pdfViewer, viewerBase) {
        /**
         * @private
         */
        this.isUndoRedoAction = false;
        this.isFreeTextFontsizeChanged = false;
        this.isUndoAction = false;
        this.annotationSelected = true;
        this.isAnnotDeletionApiCall = false;
        this.removedDocumentAnnotationCollection = [];
        /**
         * @private
         * It is used to store the non render page selected annotation.
         */
        this.nonRenderSelectedAnnotation = null;
        /**
         * @private
         */
        this.isShapeCopied = false;
        /**
         * @private
         */
        this.actionCollection = [];
        /**
         * @private
         */
        this.redoCollection = [];
        /**
         * @private
         */
        this.isPopupNoteVisible = false;
        /**
         * @private
         */
        this.undoCommentsElement = [];
        /**
         * @private
         */
        this.redoCommentsElement = [];
        /**
         * @private
         */
        this.selectAnnotationId = null;
        /**
         * @private
         */
        this.isAnnotationSelected = false;
        /**
         * @private
         */
        this.annotationPageIndex = null;
        this.previousIndex = null;
        /**
         * @private
         */
        this.annotationType = null;
        this.overlappedAnnotations = [];
        /**
         * @private
         */
        this.overlappedCollections = [];
        /**
         * @private
         */
        this.isFormFieldShape = false;
        /**
         * @private
         */
        this.removedAnnotationCollection = [];
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = viewerBase;
        if (this.pdfViewer.enableTextMarkupAnnotation) {
            this.textMarkupAnnotationModule = new TextMarkupAnnotation(this.pdfViewer, this.pdfViewerBase);
        }
        if (this.pdfViewer.enableShapeAnnotation) {
            this.shapeAnnotationModule = new ShapeAnnotation(this.pdfViewer, this.pdfViewerBase);
        }
        if (this.pdfViewer.enableMeasureAnnotation) {
            this.measureAnnotationModule = new MeasureAnnotation(this.pdfViewer, this.pdfViewerBase);
        }
        this.stampAnnotationModule = new StampAnnotation(this.pdfViewer, this.pdfViewerBase);
        this.stickyNotesAnnotationModule = new StickyNotesAnnotation(this.pdfViewer, this.pdfViewerBase);
        this.freeTextAnnotationModule = new FreeTextAnnotation(this.pdfViewer, this.pdfViewerBase);
        this.inputElementModule = new InputElement(this.pdfViewer, this.pdfViewerBase);
        this.inkAnnotationModule = new InkAnnotation(this.pdfViewer, this.pdfViewerBase);
    }
    /**
     * Set annotation type to be added in next user interaction in PDF Document.
     *
     * @param {AnnotationType} type - type
     * @param {DynamicStampItem} dynamicStampItem - dynamicStampItem
     * @param {SignStampItem} signStampItem - signStampItem
     * @param {StandardBusinessStampItem} standardBusinessStampItem - standardBusinessStampItem.
     * @returns {void}
     */
    Annotation.prototype.setAnnotationMode = function (type, dynamicStampItem, signStampItem, standardBusinessStampItem) {
        var allowServerDataBind = this.pdfViewer.allowServerDataBinding;
        this.pdfViewer.enableServerDataBinding(false);
        if (this.pdfViewer.tool === 'Stamp' && this.pdfViewer.toolbarModule) {
            this.pdfViewer.toolbarModule.updateStampItems();
        }
        if (this.pdfViewer.toolbarModule && this.pdfViewer.toolbarModule.annotationToolbarModule) {
            this.pdfViewer.toolbarModule.annotationToolbarModule.resetFreeTextAnnot();
        }
        if (type !== 'None') {
            this.triggerAnnotationUnselectEvent();
        }
        this.pdfViewer.tool = '';
        if (this.pdfViewer.toolbarModule) {
            this.pdfViewer.toolbarModule.deSelectCommentAnnotation();
        }
        if (type === 'None') {
            this.clearAnnotationMode();
        }
        else if (type === 'Highlight' || type === 'Strikethrough' || type === 'Underline') {
            if (this.textMarkupAnnotationModule) {
                this.textMarkupAnnotationModule.isSelectionMaintained = false;
                this.textMarkupAnnotationModule.drawTextMarkupAnnotations(type.toString());
            }
        }
        else if (type === 'Line' || type === 'Arrow' || type === 'Rectangle' || type === 'Circle' || type === 'Polygon') {
            if (this.shapeAnnotationModule) {
                this.shapeAnnotationModule.setAnnotationType(type);
            }
        }
        else if (type === 'Distance' || type === 'Perimeter' || type === 'Area' || type === 'Radius' || type === 'Volume') {
            if (this.measureAnnotationModule) {
                this.measureAnnotationModule.setAnnotationType(type);
            }
        }
        else if (type === 'FreeText' && this.freeTextAnnotationModule) {
            this.freeTextAnnotationModule.setAnnotationType('FreeText');
            this.freeTextAnnotationModule.isNewFreeTextAnnot = true;
            this.freeTextAnnotationModule.isNewAddedAnnot = true;
        }
        else if (type === 'HandWrittenSignature') {
            this.pdfViewerBase.signatureModule.setAnnotationMode();
        }
        else if (type === 'Initial') {
            this.pdfViewerBase.signatureModule.setInitialMode();
        }
        else if (type === 'Ink') {
            this.inkAnnotationModule.setAnnotationMode();
        }
        else if (type === 'StickyNotes') {
            this.pdfViewerBase.isCommentIconAdded = true;
            this.pdfViewerBase.isAddComment = true;
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + (this.pdfViewerBase.currentPageNumber - 1));
            if (pageDiv) {
                pageDiv.addEventListener('mousedown', this.pdfViewer.annotationModule.stickyNotesAnnotationModule.drawIcons.bind(this));
            }
        }
        else if (type === 'Stamp') {
            this.pdfViewer.annotation.stampAnnotationModule.isStampAddMode = true;
            this.pdfViewer.annotationModule.stampAnnotationModule.isStampAnnotSelected = true;
            this.pdfViewerBase.stampAdded = true;
            if (dynamicStampItem) {
                // eslint-disable-next-line
                var stampName = DynamicStampItem[dynamicStampItem];
                this.pdfViewerBase.isDynamicStamp = true;
                this.stampAnnotationModule.retrieveDynamicStampAnnotation(stampName);
            }
            else if (signStampItem) {
                // eslint-disable-next-line
                var stampName = SignStampItem[signStampItem];
                this.pdfViewerBase.isDynamicStamp = false;
                this.stampAnnotationModule.retrievestampAnnotation(stampName);
            }
            else if (standardBusinessStampItem) {
                // eslint-disable-next-line
                var stampName = StandardBusinessStampItem[standardBusinessStampItem];
                this.pdfViewerBase.isDynamicStamp = false;
                this.stampAnnotationModule.retrievestampAnnotation(stampName);
            }
        }
        this.pdfViewer.enableServerDataBinding(allowServerDataBind, true);
        this.pdfViewerBase.initiateTextSelection();
    };
    Annotation.prototype.deleteAnnotationById = function (annotationId) {
        if (annotationId) {
            this.isAnnotDeletionApiCall = true;
            this.annotationSelected = false;
            this.selectAnnotation(annotationId);
            this.deleteAnnotation();
            this.isAnnotDeletionApiCall = false;
            if (this.pdfViewer.textSelectionModule) {
                this.pdfViewer.textSelectionModule.clearTextSelection();
            }
        }
    };
    Annotation.prototype.clearAnnotationMode = function () {
        if (this.textMarkupAnnotationModule) {
            this.textMarkupAnnotationModule.isTextMarkupAnnotationMode = false;
        }
        if (this.freeTextAnnotationModule) {
            this.freeTextAnnotationModule.isNewFreeTextAnnot = false;
            this.freeTextAnnotationModule.isNewAddedAnnot = false;
        }
        if (this.pdfViewerBase.isTextMarkupAnnotationModule()) {
            this.pdfViewer.annotation.textMarkupAnnotationModule.currentTextMarkupAddMode = '';
        }
        if (this.pdfViewerBase.isShapeAnnotationModule()) {
            this.pdfViewer.annotation.shapeAnnotationModule.currentAnnotationMode = '';
        }
        if (this.pdfViewerBase.isCalibrateAnnotationModule()) {
            this.pdfViewer.annotation.measureAnnotationModule.currentAnnotationMode = '';
        }
        if (this.pdfViewer.annotationModule.inkAnnotationModule) {
            var currentPageNumber = parseInt(this.pdfViewer.annotationModule.inkAnnotationModule.currentPageNumber, 10);
            this.pdfViewer.annotationModule.inkAnnotationModule.drawInkAnnotation(currentPageNumber);
        }
    };
    Annotation.prototype.deleteAnnotation = function () {
        if (this.textMarkupAnnotationModule) {
            this.textMarkupAnnotationModule.deleteTextMarkupAnnotation();
        }
        var selectedAnnotation = this.pdfViewer.selectedItems.annotations[0];
        if (selectedAnnotation) {
            var data = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_formfields');
            var formFieldsData = JSON.parse(data);
            var newFormFieldsData = [];
            if (formFieldsData) {
                for (var x = 0; x < formFieldsData.length; x++) {
                    // eslint-disable-next-line
                    if (formFieldsData[parseInt(x.toString(), 10)].uniqueID == selectedAnnotation.id) {
                        formFieldsData[parseInt(x.toString(), 10)].Value = '';
                        for (var y = 0; y < formFieldsData.length; y++) {
                            if (formFieldsData[parseInt(y.toString(), 10)].Name === 'ink') {
                                formFieldsData[parseInt(y.toString(), 10)].Value = '';
                            }
                            if (formFieldsData[parseInt(x.toString(), 10)].FieldName === formFieldsData[parseInt(y.toString(), 10)].FieldName && formFieldsData[parseInt(y.toString(), 10)].Name === 'ink') {
                                formFieldsData.splice(y, 1);
                            }
                        }
                        newFormFieldsData.push(formFieldsData[parseInt(x.toString(), 10)]);
                    }
                    else {
                        newFormFieldsData.push(formFieldsData[parseInt(x.toString(), 10)]);
                    }
                }
                PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + '_formfields', JSON.stringify(newFormFieldsData));
            }
        }
        var isLock = false;
        var isReadOnly = false;
        if (this.pdfViewer.selectedItems.annotations.length > 0) {
            var annotation_1 = this.pdfViewer.selectedItems.annotations[0];
            var type = annotation_1.shapeAnnotationType;
            if (type === 'Path' || annotation_1.formFieldAnnotationType === 'SignatureField' || annotation_1.formFieldAnnotationType === 'InitialField' || type === 'HandWrittenSignature' || type === 'SignatureText' || type === 'SignatureImage') {
                var inputFields = document.getElementById(annotation_1.id);
                if (inputFields && inputFields.disabled) {
                    isReadOnly = true;
                }
            }
            if (annotation_1.annotationSettings) {
                isLock = annotation_1.annotationSettings.isLock;
                if (isLock && this.checkAllowedInteractions('Delete', annotation_1)) {
                    isLock = false;
                }
            }
            if (!isLock && !isReadOnly) {
                var pageNumber = annotation_1.pageIndex;
                var shapeType = annotation_1.shapeAnnotationType;
                var undoElement = void 0;
                if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                    if (isNullOrUndefined(annotation_1.measureType) || annotation_1.measureType === '') {
                        this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(annotation_1, 'shape');
                        this.updateImportAnnotationCollection(annotation_1, pageNumber, 'shapeAnnotation');
                    }
                    else {
                        this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(annotation_1, 'measure');
                        this.updateImportAnnotationCollection(annotation_1, pageNumber, 'measureShapeAnnotation');
                    }
                    undoElement = this.modifyInCollections(annotation_1, 'delete');
                }
                else if (shapeType === 'FreeText') {
                    this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(annotation_1, 'FreeText', 'delete');
                    undoElement = this.modifyInCollections(annotation_1, 'delete');
                    this.updateImportAnnotationCollection(annotation_1, pageNumber, 'freeTextAnnotation');
                }
                else if (shapeType === 'HandWrittenSignature' || shapeType === 'SignatureImage' || shapeType === 'SignatureText') {
                    undoElement = this.modifyInCollections(annotation_1, 'delete');
                }
                else if (shapeType === 'Ink') {
                    this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(annotation_1, 'Ink', 'delete');
                    undoElement = this.modifyInCollections(annotation_1, 'delete');
                    this.updateImportAnnotationCollection(annotation_1, pageNumber, 'signatureInkAnnotation');
                }
                else {
                    undoElement = this.pdfViewer.selectedItems.annotations[0];
                    this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(undoElement, undoElement.shapeAnnotationType, 'delete');
                    this.pdfViewer.annotation.stampAnnotationModule.updateSessionStorage(annotation_1, null, 'delete');
                }
                if (shapeType === 'StickyNotes') {
                    this.updateImportAnnotationCollection(annotation_1, pageNumber, 'stickyNotesAnnotation');
                }
                if (shapeType === 'Stamp' || shapeType === 'Image') {
                    this.updateImportAnnotationCollection(annotation_1, pageNumber, 'stampAnnotations');
                }
                var formFieldObj = this.pdfViewer.nameTable[annotation_1.id.split('_')[0]];
                if (isNullOrUndefined(formFieldObj) || !(formFieldObj.formFieldAnnotationType === 'SignatureField' || formFieldObj.formFieldAnnotationType === 'InitialField')) {
                    this.pdfViewer.annotation.addAction(pageNumber, null, annotation_1, 'Delete', '', undoElement, annotation_1);
                }
                var removeDiv = void 0;
                if (annotation_1.annotName !== '') {
                    removeDiv = document.getElementById(annotation_1.annotName);
                }
                else {
                    if (undoElement) {
                        if (undoElement.annotName !== '') {
                            removeDiv = document.getElementById(undoElement.annotName);
                        }
                    }
                }
                this.removeCommentPanelDiv(removeDiv);
                var selectedAnnot = this.pdfViewer.selectedItems.annotations[0];
                var annotationId = selectedAnnot.annotName;
                var annotType = this.getAnnotationType(selectedAnnot.shapeAnnotationType, selectedAnnot.measureType);
                if (shapeType === 'Path' || selectedAnnot.formFieldAnnotationType === 'SignatureField' || selectedAnnot.formFieldAnnotationType === 'InitialField' || shapeType === 'HandWrittenSignature' || shapeType === 'SignatureText' || shapeType === 'SignatureImage') {
                    var formFieldCollection = this.pdfViewer.retrieveFormFields();
                    var index = formFieldCollection.findIndex(function (el) { return el.id === annotation_1.id; });
                    var formFieldName = void 0;
                    if (index > -1) {
                        formFieldName = formFieldCollection[parseInt(index.toString(), 10)].name;
                    }
                    for (var m = 0; m < formFieldCollection.length; m++) {
                        if (selectedAnnot.id === formFieldCollection[parseInt(m.toString(), 10)].id ||
                            (isNullOrUndefined(formFieldName) && formFieldName === formFieldCollection[parseInt(m.toString(), 10)].name)) {
                            formFieldCollection[parseInt(m.toString(), 10)].value = '';
                            formFieldCollection[parseInt(m.toString(), 10)].signatureType = '';
                            var annotation_2 = this.getAnnotationsFromCollections(formFieldCollection[parseInt(m.toString(), 10)].id);
                            this.updateInputFieldDivElement(annotation_2);
                            undoElement = this.modifyInCollections(annotation_2, 'delete');
                            this.pdfViewer.annotation.addAction(annotation_2.pageIndex, null, annotation_2, 'Delete', '', undoElement, annotation_2);
                            if (this.pdfViewer.formDesignerModule && selectedAnnot.formFieldAnnotationType) {
                                this.updateFormFieldCollection(annotation_2);
                            }
                            else {
                                this.updateAnnotationCollection(annotation_2);
                            }
                            this.pdfViewer.remove(annotation_2);
                        }
                    }
                    if (this.pdfViewer.formDesignerModule && selectedAnnot.formFieldAnnotationType) {
                        this.updateFormFieldCollection(annotation_1);
                    }
                    else {
                        this.updateAnnotationCollection(annotation_1);
                    }
                }
                if (this.pdfViewer.formDesignerModule && selectedAnnot.formFieldAnnotationType) {
                    this.updateFormFieldCollection(annotation_1);
                }
                else {
                    this.updateAnnotationCollection(annotation_1);
                }
                if (formFieldObj != null && (formFieldObj.formFieldAnnotationType === 'SignatureField' || formFieldObj.formFieldAnnotationType === 'InitialField')) {
                    var index = this.pdfViewer.formFieldCollections.findIndex(function (el) { return el.id === annotation_1.id.split('_')[0]; });
                    var formFieldName = void 0;
                    if (index > -1) {
                        formFieldName = this.pdfViewer.formFieldCollections[parseInt(index.toString(), 10)].name;
                    }
                    for (var i = 0; i < this.pdfViewer.formFieldCollections.length; i++) {
                        if (formFieldName === this.pdfViewer.formFieldCollections[parseInt(i.toString(), 10)].name) {
                            var formFieldsIndex = this.pdfViewer.formFieldCollections[parseInt(i.toString(), 10)];
                            this.pdfViewer.fireFormFieldPropertiesChangeEvent('formFieldPropertiesChange', formFieldsIndex, formFieldsIndex.pageIndex, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, formFieldsIndex.value, '');
                            formFieldsIndex.value = '';
                            formFieldsIndex.signatureType = '';
                            this.pdfViewer.formDesignerModule.updateFormFieldCollections(formFieldsIndex);
                            var annotation_3 = this.getAnnotationsFromCollections(formFieldsIndex.id + '_content');
                            if (!isNullOrUndefined(annotation_3)) {
                                undoElement = this.modifyInCollections(annotation_3, 'delete');
                                this.pdfViewer.annotation.addAction(annotation_3.pageIndex, null, annotation_3, 'Delete', '', undoElement, annotation_3);
                                this.updateInputFieldDivElement(annotation_3);
                                var formFieldObject = this.pdfViewer.nameTable[annotation_3.id.split('_')[0]];
                                formFieldObject.wrapper.children.splice(formFieldObject.wrapper.children.
                                    indexOf(annotation_3.wrapper.children[0]), 1);
                                this.pdfViewer.remove(annotation_3);
                            }
                        }
                    }
                }
                this.pdfViewer.remove(annotation_1);
                this.pdfViewer.renderDrawing();
                this.pdfViewer.clearSelection(pageNumber);
                this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
                this.pdfViewerBase.updateDocumentEditedProperty(true);
                this.pdfViewerBase.tool = null;
                this.pdfViewer.tool = null;
                if (selectedAnnot.shapeAnnotationType === 'HandWrittenSignature' || selectedAnnot.shapeAnnotationType === 'SignatureText' || selectedAnnot.shapeAnnotationType === 'SignatureImage' || selectedAnnot.shapeAnnotationType === 'Path') {
                    var bounds = { left: selectedAnnot.bounds.x, top: selectedAnnot.bounds.y,
                        width: selectedAnnot.bounds.width, height: selectedAnnot.bounds.height };
                    this.pdfViewer.fireSignatureRemove(pageNumber, selectedAnnot.id, selectedAnnot.shapeAnnotationType, bounds);
                }
                else if (this.pdfViewer.annotationModule) {
                    this.pdfViewer.fireAnnotationRemove(pageNumber, annotationId, annotType, selectedAnnot.bounds);
                }
                if (this.pdfViewer.textSelectionModule) {
                    this.pdfViewer.textSelectionModule.enableTextSelectionMode();
                }
            }
        }
        else if (this.nonRenderSelectedAnnotation && this.nonRenderSelectedAnnotation.annotationId && this.isAnnotDeletionApiCall) {
            var annotationId = this.nonRenderSelectedAnnotation.annotationId;
            var pageIndex = this.nonRenderSelectedAnnotation.pageNumber ? this.nonRenderSelectedAnnotation.pageNumber :
                this.nonRenderSelectedAnnotation.pageIndex;
            var collections = this.updateCollectionForNonRenderedPages(this.nonRenderSelectedAnnotation, annotationId, pageIndex);
            collections.pageIndex = pageIndex;
            this.pdfViewer.annotation.addAction(pageIndex, null, collections, 'Delete', '', collections, collections);
            this.undoCommentsElement.push(collections);
            var removeDiv = document.getElementById(annotationId);
            this.removeCommentPanelDiv(removeDiv);
            this.nonRenderSelectedAnnotation = null;
        }
        this.updateToolbar(true);
        if (this.pdfViewer.toolbarModule) {
            if (this.pdfViewer.toolbarModule.annotationToolbarModule && !isLock) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(false, true);
                this.pdfViewer.toolbarModule.annotationToolbarModule.enableTextMarkupAnnotationPropertiesTools(false);
            }
        }
    };
    /**
     * @param {string} annotationId - annotationId
     * @returns {void}
     */
    Annotation.prototype.getAnnotationsFromCollections = function (annotationId) {
        var collections = this.pdfViewer.annotations;
        if (collections && annotationId) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[parseInt(i.toString(), 10)].id === annotationId) {
                    return collections[parseInt(i.toString(), 10)];
                }
            }
        }
        return null;
    };
    /**
     * @param {any} annotation - annotation
     * @returns {void}
     */
    Annotation.prototype.updateInputFieldDivElement = function (annotation) {
        var inputFields = document.getElementById(annotation.id);
        var signatureFieldElement = document.getElementById(annotation.id + '_html_element');
        if (inputFields === null && !isNullOrUndefined(signatureFieldElement)) {
            inputFields = signatureFieldElement.children[0].children[0];
        }
        if (inputFields && inputFields.classList.contains('e-pdfviewer-signatureformfields-signature')) {
            inputFields.className = 'e-pdfviewer-signatureformfields';
            inputFields.style.pointerEvents = '';
            inputFields.parentElement.style.pointerEvents = '';
        }
        if (this.pdfViewer.formDesignerModule) {
            this.pdfViewer.formDesignerModule.updateSignatureValue(annotation.id);
        }
        else {
            this.pdfViewer.formFieldsModule.updateDataInSession(inputFields, '');
        }
    };
    /**
     * @param {any} annotation - annotation
     * @param {number} pageNumber - pageNumber
     * @param {boolean} isNeedToReorderCollection - Ensures whether need to reorder the collection or not
     * @param {number} orderNumber - Gets the order number
     * @private
     * @returns {void}
     */
    Annotation.prototype.storeAnnotationCollections = function (annotation, pageNumber, isNeedToReorderCollection, orderNumber) {
        if (this.isFormFieldShape) {
            var collectionDetails = this.checkFormDesignCollection(annotation);
            var selectAnnotation = cloneObject(annotation);
            selectAnnotation.formFieldId = annotation.annotName;
            selectAnnotation.pageNumber = pageNumber;
            delete selectAnnotation.annotName;
            if (annotation.id) {
                selectAnnotation.uniqueKey = annotation.id;
                delete selectAnnotation.id;
            }
            if (collectionDetails.isExisting) {
                this.pdfViewer.formFieldCollection.splice(collectionDetails.position, 0, selectAnnotation);
            }
            else {
                this.pdfViewer.formFieldCollection.push(selectAnnotation);
            }
        }
        else {
            var collectionDetails = this.checkAnnotationCollection(annotation);
            var selectAnnotation = cloneObject(annotation);
            selectAnnotation.annotationId = annotation.annotName;
            selectAnnotation.pageNumber = pageNumber;
            delete selectAnnotation.annotName;
            if (annotation.shapeAnnotationType === 'stamp') {
                selectAnnotation.uniqueKey = annotation.randomId;
                delete selectAnnotation.randomId;
            }
            if (annotation.shapeAnnotationType === 'sticky') {
                selectAnnotation.uniqueKey = annotation.annotName;
            }
            if (annotation.id) {
                selectAnnotation.uniqueKey = annotation.id;
                delete selectAnnotation.id;
            }
            if (selectAnnotation.customData && annotation.customData && JSON.stringify(selectAnnotation.customData) !==
                JSON.stringify(annotation.customData)) {
                selectAnnotation.customData = annotation.customData;
            }
            if (collectionDetails.isExisting) {
                this.pdfViewer.annotationCollection.splice(collectionDetails.position, 0, selectAnnotation);
            }
            else if (!isNullOrUndefined(isNeedToReorderCollection) && isNeedToReorderCollection) {
                this.pdfViewer.annotationCollection.splice(orderNumber, 0, selectAnnotation);
            }
            else {
                this.pdfViewer.annotationCollection.push(selectAnnotation);
            }
        }
    };
    Annotation.prototype.checkFormDesignCollection = function (annotation) {
        var collections = this.pdfViewer.formFieldCollection;
        if (collections && annotation) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[parseInt(i.toString(), 10)].formFieldId === annotation.annotName) {
                    this.pdfViewer.formFieldCollection.splice(i, 1);
                    return { isExisting: true, position: i };
                }
            }
        }
        return { isExisting: false, position: null };
    };
    Annotation.prototype.updateFormFieldCollection = function (annotation) {
        var collections = this.pdfViewer.formFieldCollection;
        if (collections && annotation) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[parseInt(i.toString(), 10)].formFieldId === annotation.annotName) {
                    this.removedAnnotationCollection.push(collections[parseInt(i.toString(), 10)]);
                    this.pdfViewer.formFieldCollection.splice(i, 1);
                    break;
                }
            }
        }
    };
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {void}
     */
    Annotation.prototype.getCustomData = function (annotation) {
        var customData;
        if (annotation.ExistingCustomData && !annotation.CustomData) {
            customData = JSON.parse(annotation.ExistingCustomData);
        }
        else if (annotation.CustomData === null) {
            if (annotation.shapeAnnotationType === 'sticky') {
                customData = this.pdfViewer.stickyNotesSettings.customData;
            }
            if (annotation.shapeAnnotationType === 'Stamp') {
                customData = this.pdfViewer.stampSettings.customData;
            }
            if (annotation.shapeAnnotationType === 'FreeText') {
                customData = this.pdfViewer.freeTextSettings.customData;
            }
            if (annotation.id === 'shape') {
                customData = this.getShapeData(annotation.ShapeAnnotationType, annotation.subject);
            }
            if (annotation.id === 'measure') {
                customData = this.getMeasureData(annotation.Subject);
            }
            if (annotation.shapeAnnotationType === 'textMarkup') {
                customData = this.getTextMarkupData(annotation.subject);
            }
            if (annotation.shapeAnnotationType === 'Ink') {
                customData = this.pdfViewer.inkAnnotationSettings.customData;
            }
        }
        else {
            var data = annotation.CustomData ? annotation.CustomData : annotation.customData;
            if (!isNullOrUndefined(data)) {
                customData = typeof data === 'string' ? JSON.parse(data) : data;
            }
        }
        return customData;
    };
    /**
     * @param {string} type - type
     * @param {string} subject - subject
     * @private
     * @returns {void}
     */
    Annotation.prototype.getShapeData = function (type, subject) {
        var customData;
        if (type === 'Line' && subject !== 'Arrow' && this.pdfViewer.lineSettings.customData) {
            customData = this.pdfViewer.lineSettings.customData;
        }
        else if ((type === 'LineWidthArrowHead' || subject === 'Arrow') && this.pdfViewer.arrowSettings.customData) {
            customData = this.pdfViewer.arrowSettings.customData;
        }
        else if ((type === 'Rectangle' || type === 'Square') && this.pdfViewer.rectangleSettings.customData) {
            customData = this.pdfViewer.rectangleSettings.customData;
        }
        else if ((type === 'Ellipse' || type === 'Circle') && this.pdfViewer.circleSettings.customData) {
            customData = this.pdfViewer.circleSettings.customData;
        }
        else if (type === 'Polygon' && this.pdfViewer.polygonSettings.customData) {
            customData = this.pdfViewer.polygonSettings.customData;
        }
        else if (this.pdfViewer.annotationSettings.customData) {
            customData = this.pdfViewer.annotationSettings.customData;
        }
        return customData;
    };
    /**
     * @param {string} type - type
     * @private
     * @returns {void}
     */
    Annotation.prototype.getMeasureData = function (type) {
        var customData;
        if ((type === 'Distance' || type === 'Distance calculation') && this.pdfViewer.distanceSettings.customData) {
            customData = this.pdfViewer.distanceSettings.customData;
        }
        else if ((type === 'Line' || type === 'Perimeter calculation') && this.pdfViewer.lineSettings.customData) {
            customData = this.pdfViewer.lineSettings.customData;
        }
        else if ((type === 'Polygon' || type === 'Area calculation' || type === 'Volume calculation') && this.pdfViewer.polygonSettings.customData) {
            customData = this.pdfViewer.polygonSettings.customData;
        }
        else if ((type === 'Radius' || type === 'Radius calculation') && this.pdfViewer.radiusSettings.customData) {
            customData = this.pdfViewer.radiusSettings.customData;
        }
        else if (this.pdfViewer.annotationSettings.customData) {
            customData = this.pdfViewer.annotationSettings.customData;
        }
        return customData;
    };
    /**
     * @param {string} type - type
     * @private
     * @returns {void}
     */
    Annotation.prototype.getTextMarkupData = function (type) {
        var customData;
        if (type === 'Highlight' && this.pdfViewer.highlightSettings.customData) {
            customData = this.pdfViewer.highlightSettings.customData;
        }
        else if (type === 'Underline' && this.pdfViewer.underlineSettings.customData) {
            customData = this.pdfViewer.underlineSettings.customData;
        }
        else if (type === 'Strikethrough' && this.pdfViewer.strikethroughSettings.customData) {
            customData = this.pdfViewer.strikethroughSettings.customData;
        }
        else if (this.pdfViewer.annotationSettings.customData) {
            customData = this.pdfViewer.annotationSettings.customData;
        }
        return customData;
    };
    /**
     * @param {string} type - type
     * @private
     * @returns {void}
     */
    Annotation.prototype.getData = function (type) {
        var customData;
        if (type === 'FreeText' && this.pdfViewer.freeTextSettings.customData) {
            customData = this.pdfViewer.freeTextSettings.customData;
        }
        else if ((type === 'image' || type === 'Stamp') && this.pdfViewer.stampSettings.customData) {
            customData = this.pdfViewer.stampSettings.customData;
        }
        else if (type === 'sticky' && this.pdfViewer.stickyNotesSettings.customData) {
            customData = this.pdfViewer.stickyNotesSettings.customData;
        }
        else if (this.pdfViewer.annotationSettings.customData) {
            customData = this.pdfViewer.annotationSettings.customData;
        }
        return customData;
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.clearAnnotationStorage = function () {
        var sessionSize = PdfViewerBase.sessionStorageManager.getWindowSessionStorageSize();
        var maxSessionSize = 4500;
        if (this.pdfViewerBase.isDeviceiOS || this.pdfViewerBase.isMacSafari) {
            maxSessionSize = 2000;
        }
        if (sessionSize > maxSessionSize) {
            var storageLength = PdfViewerBase.sessionStorageManager.getSessionLength();
            var annotationList = [];
            for (var i = 0; i < storageLength; i++) {
                if (PdfViewerBase.sessionStorageManager.getKey(i) && PdfViewerBase.sessionStorageManager.getKey(i).split('_')[3]) {
                    if (PdfViewerBase.sessionStorageManager.getKey(i).split('_')[3] === 'annotations') {
                        this.pdfViewerBase.annotationStorage[PdfViewerBase.sessionStorageManager.getKey(i)] =
                            PdfViewerBase.sessionStorageManager.getItem(PdfViewerBase.sessionStorageManager.getKey(i));
                        annotationList.push(PdfViewerBase.sessionStorageManager.getKey(i));
                    }
                }
            }
            if (annotationList) {
                for (var i = 0; i < annotationList.length; i++) {
                    PdfViewerBase.sessionStorageManager.removeItem(annotationList[parseInt(i.toString(), 10)]);
                }
            }
        }
    };
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {Object} - Object
     */
    Annotation.prototype.checkAnnotationCollection = function (annotation) {
        var collections = this.pdfViewer.annotationCollection;
        if (collections && annotation) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[parseInt(i.toString(), 10)].annotationId === annotation.annotName) {
                    this.pdfViewer.annotationCollection.splice(i, 1);
                    return { isExisting: true, position: i };
                }
            }
        }
        return { isExisting: false, position: null };
    };
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {void}
     */
    Annotation.prototype.updateAnnotationCollection = function (annotation) {
        var collections = this.pdfViewer.annotationCollection;
        if (collections && annotation) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[parseInt(i.toString(), 10)].annotationId ===
                    annotation.annotName || collections[parseInt(i.toString(), 10)].annotationId === annotation.annotationId) {
                    this.removedAnnotationCollection.push(collections[parseInt(i.toString(), 10)]);
                    this.pdfViewer.annotationCollection.splice(i, 1);
                    break;
                }
            }
        }
    };
    /**
     * @param {any} annotation - annotation
     * @param {number} pageNumber - pageNumber
     * @param {string} annotationType - annotationType
     * @private
     * @returns {void}
     */
    Annotation.prototype.updateImportAnnotationCollection = function (annotation, pageNumber, annotationType) {
        if (this.pdfViewerBase.isImportAction) {
            if (this.pdfViewerBase.importedAnnotation && this.pdfViewerBase.importedAnnotation[parseInt(pageNumber.toString(), 10)]) {
                var currentPageAnnotations = this.pdfViewerBase.importedAnnotation[parseInt(pageNumber.toString(), 10)];
                if (currentPageAnnotations["" + annotationType] &&
                    !isNullOrUndefined(this.pdfViewerBase.importedAnnotation[parseInt(pageNumber.toString(), 10)].annotationOrder)) {
                    this.pdfViewerBase.importedAnnotation[parseInt(pageNumber.toString(), 10)].annotationOrder =
                        this.pdfViewerBase.importedAnnotation[parseInt(pageNumber.toString(), 10)].annotationOrder.filter(function (currentAnnotation) {
                            return !(annotation.annotName === currentAnnotation.AnnotName
                                || annotation.annotName === currentAnnotation.annotName);
                        });
                }
                if (!isNullOrUndefined(this.pdfViewerBase.importedAnnotation) &&
                    !isNullOrUndefined(this.pdfViewerBase.importedAnnotation[parseInt(pageNumber.toString(), 10)])
                    && !isNullOrUndefined(this.pdfViewerBase.importedAnnotation[parseInt(pageNumber.toString(), 10)]["" + annotationType])) {
                    this.pdfViewerBase.importedAnnotation[parseInt(pageNumber.toString(), 10)]["" + annotationType] = this.pdfViewerBase.importedAnnotation[parseInt(pageNumber.toString(), 10)]["" + annotationType].filter(function (currentAnnotation) {
                        return annotation.annotName !== currentAnnotation.AnnotName;
                    });
                }
            }
        }
        var documentcollections = this.pdfViewerBase.documentAnnotationCollections;
        if (documentcollections && documentcollections[parseInt(pageNumber.toString(), 10)]) {
            var documentPageCollections = documentcollections[parseInt(pageNumber.toString(), 10)];
            if (documentPageCollections && documentPageCollections["" + annotationType]) {
                for (var i = 0; i < documentPageCollections["" + annotationType].length; i++) {
                    if (annotation.annotName === documentPageCollections["" + annotationType][parseInt(i.toString(), 10)].AnnotName) {
                        this.pdfViewerBase.documentAnnotationCollections[parseInt(pageNumber.toString(), 10)]["" + annotationType].splice(i, 1);
                        break;
                    }
                }
            }
        }
    };
    /**
     * Select the annotations using annotation object or annotation Id.
     *
     * @param {string | object} annotationId - annptationId
     * @returns {void}
     */
    Annotation.prototype.selectAnnotation = function (annotationId) {
        var annotation;
        var id;
        if (typeof annotationId === 'object') {
            annotation = annotationId;
            id = annotation.annotationId;
            annotation = this.getAnnotationsFromAnnotationCollections(id);
        }
        if (typeof annotationId === 'string') {
            annotation = this.getAnnotationsFromAnnotationCollections(annotationId);
            id = annotationId;
        }
        if (annotation) {
            var pageIndex = isNullOrUndefined(annotation.pageNumber) ? annotation.pageIndex : annotation.pageNumber;
            var isRender = false;
            isRender = this.findRenderPageList(pageIndex);
            var currentSelector = this.pdfViewer.annotationSelectorSettings;
            //let pageIndex: number = this.getPageNumberFromAnnotationCollections(annotation);
            if (annotation && pageIndex >= 0) {
                if (annotation.shapeAnnotationType === 'textMarkup') {
                    if (annotation.rect || annotation.bounds) {
                        var scrollValue = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].top *
                            this.pdfViewerBase.getZoomFactor() + (this.getAnnotationTop(annotation)) * this.pdfViewerBase.getZoomFactor();
                        if (!this.isAnnotDeletionApiCall) {
                            var scroll_1 = (scrollValue - 20).toString();
                            this.pdfViewerBase.viewerContainer.scrollTop = parseInt(scroll_1, 10);
                            this.pdfViewerBase.viewerContainer.scrollLeft = this.getAnnotationLeft(annotation) *
                                this.pdfViewerBase.getZoomFactor();
                        }
                    }
                    else {
                        if (this.pdfViewer.navigation) {
                            this.pdfViewer.navigation.goToPage(pageIndex + 1);
                        }
                    }
                }
                else {
                    if (annotation.bounds) {
                        var scrollValue = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].top *
                            this.pdfViewerBase.getZoomFactor() + (annotation.bounds.top) *
                            this.pdfViewerBase.getZoomFactor();
                        var scrollLeft = annotation.bounds.left * this.pdfViewerBase.getZoomFactor();
                        if (annotation.shapeAnnotationType === 'Ink') {
                            scrollValue = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].top *
                                this.pdfViewerBase.getZoomFactor() + (annotation.bounds.y) *
                                this.pdfViewerBase.getZoomFactor();
                            scrollLeft = annotation.bounds.x * this.pdfViewerBase.getZoomFactor();
                        }
                        if (!this.isAnnotDeletionApiCall) {
                            var scroll_2 = (scrollValue - 20).toString();
                            this.pdfViewerBase.viewerContainer.scrollTop = parseInt(scroll_2, 10);
                            this.pdfViewerBase.viewerContainer.scrollLeft = scrollLeft;
                        }
                    }
                    else {
                        if (this.pdfViewer.navigation) {
                            this.pdfViewer.navigation.goToPage(pageIndex + 1);
                        }
                    }
                }
                if (isRender) {
                    if (this.previousIndex) {
                        this.pdfViewer.clearSelection(this.previousIndex);
                    }
                    this.pdfViewer.clearSelection(pageIndex);
                    this.previousIndex = pageIndex;
                    if (annotation.shapeAnnotationType === 'textMarkup') {
                        this.pdfViewer.annotationModule.textMarkupAnnotationModule.clearCurrentAnnotationSelection(pageIndex, true);
                        var canvasId = annotation.textMarkupAnnotationType === 'Highlight' ? '_blendAnnotationsIntoCanvas_' : '_annotationCanvas_';
                        var canvas = (canvasId === '_blendAnnotationsIntoCanvas_') ? this.pdfViewerBase.getElement(canvasId + pageIndex) :
                            this.pdfViewerBase.getAnnotationCanvas(canvasId, pageIndex);
                        var textMarkupAnnotation = this.getTextMarkupAnnotations(pageIndex, annotation);
                        if (textMarkupAnnotation) {
                            this.textMarkupAnnotationModule.currentTextMarkupAnnotation = null;
                            this.textMarkupAnnotationModule.isSelectedAnnotation = true;
                            this.textMarkupAnnotationModule.showHideDropletDiv(true);
                            this.textMarkupAnnotationModule.annotationClickPosition = null;
                            this.textMarkupAnnotationModule.selectAnnotation(textMarkupAnnotation, canvas, pageIndex, null, true);
                            this.textMarkupAnnotationModule.currentTextMarkupAnnotation = textMarkupAnnotation;
                            this.textMarkupAnnotationModule.selectTextMarkupCurrentPage = pageIndex;
                            this.textMarkupAnnotationModule.enableAnnotationPropertiesTool(true);
                            this.textMarkupAnnotationModule.isSelectedAnnotation = false;
                            if (this.pdfViewer.toolbarModule && this.pdfViewer.enableAnnotationToolbar) {
                                this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                                this.pdfViewer.toolbarModule.annotationToolbarModule.
                                    showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                            }
                        }
                    }
                    else if (annotation.shapeAnnotationType === 'stamp' || annotation.ShapeAnnotationType === 'stamp') {
                        this.pdfViewer.select([annotation.uniqueKey], currentSelector);
                        this.pdfViewer.annotation.onAnnotationMouseDown();
                    }
                    else if (annotation.shapeAnnotationType === 'sticky' || annotation.ShapeAnnotationType === 'sticky') {
                        this.pdfViewer.select([annotation.annotationId], currentSelector);
                        this.pdfViewer.annotation.onAnnotationMouseDown();
                    }
                    else if (annotation.uniqueKey) {
                        this.pdfViewer.select([annotation.uniqueKey], currentSelector);
                        this.pdfViewer.annotation.onAnnotationMouseDown();
                    }
                    else {
                        this.selectAnnotationId = id;
                        this.isAnnotationSelected = true;
                        this.annotationPageIndex = pageIndex;
                        this.annotationType = annotation.stampAnnotationType;
                    }
                    var commentElement = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
                    if (commentElement && commentElement.style.display === 'block') {
                        var accordionExpand = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + this.pdfViewer.currentPageNumber);
                        if (accordionExpand) {
                            accordionExpand.ej2_instances[0].expandItem(true);
                        }
                        var commentsDiv = document.getElementById(id);
                        if (commentsDiv) {
                            if (!commentsDiv.classList.contains('e-pv-comments-border')) {
                                commentsDiv.firstChild.click();
                            }
                        }
                    }
                }
                else if (annotation.uniqueKey || (annotation.shapeAnnotationType === 'textMarkup' && annotation.annotationAddMode === 'Imported Annotation') || !this.isAnnotDeletionApiCall) {
                    this.selectAnnotationId = id;
                    this.isAnnotationSelected = true;
                    this.annotationPageIndex = pageIndex;
                    this.annotationType = annotation.stampAnnotationType;
                    if (annotation.uniqueKey || (annotation.shapeAnnotationType === 'textMarkup' && annotation.annotationAddMode === 'Imported Annotation')) {
                        this.selectAnnotationFromCodeBehind();
                    }
                }
                else if (!isRender && !annotation.uniqueKey && this.isAnnotDeletionApiCall) {
                    this.nonRenderSelectedAnnotation = annotation;
                }
            }
        }
    };
    // To update the collections for the non-rendered pages.
    Annotation.prototype.updateCollectionForNonRenderedPages = function (annotation, id, pageIndex) {
        var collections;
        var annotationCollection = this.pdfViewer.annotationCollection;
        if (annotationCollection.length) {
            var collectionDetails = annotationCollection.filter(function (annotCollection) {
                return annotCollection.annotationId === id;
            });
            collections = collectionDetails[0];
            this.updateAnnotationCollection(collectionDetails[0]);
        }
        var annotationType = this.getTypeOfAnnotation(annotation);
        var collection = this.pdfViewerBase.documentAnnotationCollections[parseInt(pageIndex.toString(), 10)];
        if (collection["" + annotationType].length) {
            for (var x = 0; x < collection["" + annotationType].length; x++) {
                if (collection["" + annotationType][parseInt(x.toString(), 10)].AnnotName === annotation.annotationId) {
                    var type = collection["" + annotationType][parseInt(x.toString(), 10)];
                    this.removedDocumentAnnotationCollection.push(type);
                    collection["" + annotationType].splice(x, 1);
                    break;
                }
            }
        }
        return collections;
    };
    // To get the annotation type to update the document Annotation collections
    Annotation.prototype.getTypeOfAnnotation = function (annotation) {
        var annotationType;
        if (annotation.id && annotation.id.toLowerCase() === 'shape') {
            annotationType = 'shapeAnnotation';
        }
        else if (annotation.id && annotation.id.toLowerCase() === 'measure') {
            annotationType = 'measureShapeAnnotation';
        }
        else if (annotation.id && annotation.id.toLowerCase() === 'freetext') {
            annotationType = 'freeTextAnnotation';
        }
        else if (annotation.shapeAnnotationType && annotation.shapeAnnotationType.toLowerCase() === 'textmarkup') {
            annotationType = 'textMarkupAnnotation';
        }
        else if (annotation.shapeAnnotationType && annotation.shapeAnnotationType.toLowerCase() === 'stamp') {
            annotationType = 'stampAnnotations';
        }
        else if (annotation.shapeAnnotationType && annotation.shapeAnnotationType.toLowerCase() === 'ink') {
            annotationType = 'signatureInkAnnotation';
        }
        else if (annotation.shapeAnnotationType && annotation.shapeAnnotationType.toLowerCase() === 'sticky') {
            annotationType = 'stickyNotesAnnotation';
        }
        return annotationType;
    };
    // To remove the commnet panel div
    Annotation.prototype.removeCommentPanelDiv = function (removeDiv) {
        if (removeDiv) {
            if (removeDiv.parentElement.childElementCount === 1) {
                this.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
            }
            else {
                removeDiv.remove();
            }
        }
    };
    /**
     * Clear the annotation selection.
     *
     * @returns {void}
     */
    Annotation.prototype.clearSelection = function () {
        if (this.textMarkupAnnotationModule && this.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
            this.textMarkupAnnotationModule.clearCurrentSelectedAnnotation();
            this.textMarkupAnnotationModule.clearCurrentAnnotationSelection(this.textMarkupAnnotationModule.selectTextMarkupCurrentPage);
        }
        else {
            if (this.pdfViewer.selectedItems && this.pdfViewer.selectedItems.annotations[0]) {
                var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
                this.pdfViewer.clearSelection(currentAnnotation.pageIndex);
            }
            else {
                this.pdfViewer.clearSelection(this.pdfViewer.currentPageNumber - 1);
            }
        }
    };
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {number} - number
     */
    Annotation.prototype.getAnnotationTop = function (annotation) {
        if (annotation.rect && (annotation.rect.Top || annotation.rect.top)) {
            return annotation.rect.Top || annotation.rect.top;
        }
        else {
            return annotation.bounds[0].Top || annotation.bounds[0].top;
        }
    };
    /**
     * @param {any} annotation - annotation
     * @returns {number} - number
     */
    Annotation.prototype.getAnnotationLeft = function (annotation) {
        if (annotation.rect) {
            if (annotation.rect.Left) {
                return annotation.rect.Left;
            }
            else {
                return annotation.rect.left;
            }
        }
        else {
            if (annotation.bounds[0].Left) {
                return annotation.bounds[0].Left;
            }
            else {
                return annotation.bounds[0].left;
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.selectAnnotationFromCodeBehind = function () {
        if (this.isAnnotationSelected && this.selectAnnotationId) {
            var annotation = this.getAnnotationsFromAnnotationCollections(this.selectAnnotationId);
            var id = this.selectAnnotationId;
            var pageIndex = annotation.pageNumber;
            var currentSelector = this.pdfViewer.annotationSelectorSettings;
            if (annotation && (this.annotationPageIndex >= 0) && this.annotationPageIndex === pageIndex) {
                if (this.previousIndex) {
                    this.pdfViewer.clearSelection(this.previousIndex);
                }
                this.pdfViewer.clearSelection(pageIndex);
                this.previousIndex = pageIndex;
                if (annotation.shapeAnnotationType === 'textMarkup') {
                    this.pdfViewer.annotationModule.textMarkupAnnotationModule.clearCurrentAnnotationSelection(pageIndex, true);
                    var canvasId = annotation.textMarkupAnnotationType === 'Highlight' ? '_blendAnnotationsIntoCanvas_' : '_annotationCanvas_';
                    var canvas = (canvasId === '_blendAnnotationsIntoCanvas_') ? this.pdfViewerBase.getElement(canvasId + pageIndex) :
                        this.pdfViewerBase.getAnnotationCanvas(canvasId, pageIndex);
                    var textMarkupAnnotation = this.getTextMarkupAnnotations(pageIndex, annotation);
                    if (textMarkupAnnotation) {
                        this.textMarkupAnnotationModule.currentTextMarkupAnnotation = null;
                        this.textMarkupAnnotationModule.isSelectedAnnotation = true;
                        this.textMarkupAnnotationModule.showHideDropletDiv(true);
                        this.textMarkupAnnotationModule.annotationClickPosition = null;
                        this.textMarkupAnnotationModule.selectAnnotation(textMarkupAnnotation, canvas, pageIndex);
                        this.textMarkupAnnotationModule.currentTextMarkupAnnotation = textMarkupAnnotation;
                        this.textMarkupAnnotationModule.selectTextMarkupCurrentPage = pageIndex;
                        this.textMarkupAnnotationModule.enableAnnotationPropertiesTool(true);
                        this.textMarkupAnnotationModule.isSelectedAnnotation = false;
                        if (this.pdfViewer.toolbarModule && this.pdfViewer.enableAnnotationToolbar) {
                            this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                            this.pdfViewer.toolbarModule.annotationToolbarModule.
                                showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                        }
                    }
                }
                else if (annotation.shapeAnnotationType === 'stamp' || annotation.ShapeAnnotationType === 'stamp') {
                    this.pdfViewer.select([annotation.uniqueKey], currentSelector);
                    this.pdfViewer.annotation.onAnnotationMouseDown();
                }
                else if (annotation.shapeAnnotationType === 'sticky' || annotation.ShapeAnnotationType === 'sticky') {
                    this.pdfViewer.select([annotation.annotationId], currentSelector);
                    this.pdfViewer.annotation.onAnnotationMouseDown();
                }
                else if (annotation.uniqueKey) {
                    this.pdfViewer.select([annotation.uniqueKey], currentSelector);
                    this.pdfViewer.annotation.onAnnotationMouseDown();
                }
                else {
                    this.pdfViewer.select([annotation.annotationId], currentSelector);
                    this.pdfViewer.annotation.onAnnotationMouseDown();
                }
                var commentElement = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
                if (commentElement && commentElement.style.display === 'block') {
                    var accordionExpand = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + this.pdfViewer.currentPageNumber);
                    if (accordionExpand) {
                        accordionExpand.ej2_instances[0].expandItem(true);
                    }
                    var commentsDiv = document.getElementById(id);
                    if (commentsDiv) {
                        if (!commentsDiv.classList.contains('e-pv-comments-border')) {
                            commentsDiv.firstChild.click();
                        }
                    }
                }
            }
            this.isAnnotationSelected = false;
            this.selectAnnotationId = null;
            this.annotationPageIndex = null;
        }
    };
    /**
     * @param {number} pageIndex - pageIndex
     * @private
     * @returns {boolean} - boolean
     */
    Annotation.prototype.findRenderPageList = function (pageIndex) {
        var isRender = false;
        var pageList = this.pdfViewerBase.renderedPagesList;
        if (pageList) {
            for (var i = 0; i < pageList.length; i++) {
                if (pageList[parseInt(i.toString(), 10)] === pageIndex) {
                    isRender = true;
                    return isRender;
                }
            }
        }
        return isRender;
    };
    Annotation.prototype.getAnnotationsFromAnnotationCollections = function (annotationId) {
        var collections = this.pdfViewer.annotationCollection;
        if (collections && annotationId) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[parseInt(i.toString(), 10)].annotationId === annotationId) {
                    return collections[parseInt(i.toString(), 10)];
                }
            }
        }
        if (this.pdfViewer.selectedItems.annotations.length === 0) {
            this.pdfViewer.selectedItems.annotations.push(this.pdfViewer.nameTable["" + annotationId]);
        }
    };
    Annotation.prototype.getTextMarkupAnnotations = function (pageIndex, annotation) {
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_textMarkup'];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.getPageCollection(annotObject, pageIndex);
            if (index != null && annotObject[parseInt(index.toString(), 10)]) {
                for (var i = 0; i < annotObject[parseInt(index.toString(), 10)].annotations.length; i++) {
                    if (annotObject[parseInt(index.toString(), 10)].annotations[parseInt(i.toString(), 10)].annotName ===
                        annotation.annotationId) {
                        return annotObject[parseInt(index.toString(), 10)].annotations[parseInt(i.toString(), 10)];
                    }
                }
                return null;
            }
            return null;
        }
        else {
            return null;
        }
    };
    /**
     * @param {string} type -string
     * @param {string} measureType - measureType
     * @private
     * @returns {AnnotationType} - type
     */
    Annotation.prototype.getAnnotationType = function (type, measureType) {
        var annotType;
        if (measureType === '' || isNullOrUndefined(measureType)) {
            switch (type) {
                case 'Line':
                    annotType = 'Line';
                    break;
                case 'LineWidthArrowHead':
                    annotType = 'Arrow';
                    break;
                case 'Rectangle':
                    annotType = 'Rectangle';
                    break;
                case 'Ellipse':
                    annotType = 'Circle';
                    break;
                case 'Polygon':
                    annotType = 'Polygon';
                    break;
                case 'Stamp':
                    annotType = 'Stamp';
                    break;
                case 'Image':
                    annotType = 'Image';
                    break;
                case 'FreeText':
                    annotType = 'FreeText';
                    break;
                case 'Ink':
                    annotType = 'Ink';
                    break;
                case 'StickyNotes':
                    annotType = 'StickyNotes';
                    break;
            }
        }
        else {
            switch (measureType) {
                case 'Distance':
                    annotType = 'Distance';
                    break;
                case 'Perimeter':
                    annotType = 'Perimeter';
                    break;
                case 'Area':
                    annotType = 'Area';
                    break;
                case 'Radius':
                    annotType = 'Radius';
                    break;
                case 'Volume':
                    annotType = 'Volume';
                    break;
            }
        }
        return annotType;
    };
    /**
     * @param {number} pageNumber - pageNumber
     * @param {string} annotationId - annotationId
     * @private
     * @returns {number} - number
     */
    Annotation.prototype.getAnnotationIndex = function (pageNumber, annotationId) {
        var pageAnnotationBases = this.pdfViewer.drawing.getPageObjects(pageNumber);
        var index = null;
        for (var i = 0; i < pageAnnotationBases.length; i++) {
            if (pageAnnotationBases[parseInt(i.toString(), 10)].id === annotationId) {
                index = i;
                break;
            }
        }
        return index;
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.initializeCollection = function () {
        this.actionCollection = [];
        this.redoCollection = [];
        if (!this.popupNote) {
            this.createNote();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.showCommentsPanel = function () {
        if (this.pdfViewer.enableCommentPanel) {
            var commentPanel = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
            if (commentPanel) {
                if (commentPanel.style.display === 'none') {
                    commentPanel.style.display = 'block';
                    if (Browser.isDevice && !isBlazor()) {
                        var viewer = document.getElementById(this.pdfViewer.element.id + '_viewerMainContainer');
                        viewer.insertBefore(this.pdfViewerBase.navigationPane.commentPanelContainer, this.pdfViewer.toolbarModule.toolbarElement);
                    }
                    if (this.pdfViewerBase.navigationPane.commentPanelResizer) {
                        this.pdfViewerBase.navigationPane.commentPanelResizer.style.display = 'block';
                    }
                    this.pdfViewerBase.navigationPane.setCommentPanelResizeIconTop();
                    this.pdfViewer.annotation.stickyNotesAnnotationModule.updateCommentPanelTextTop();
                    var viewerContainer = document.getElementById(this.pdfViewer.element.id + '_viewerContainer');
                    var pageContainer = document.getElementById(this.pdfViewer.element.id + '_pageViewContainer');
                    if (viewerContainer) {
                        if (this.pdfViewer.enableRtl) {
                            viewerContainer.style.left = this.pdfViewerBase.navigationPane.getViewerContainerRight() + 'px';
                        }
                        else {
                            viewerContainer.style.right = this.pdfViewerBase.navigationPane.getViewerContainerRight() + 'px';
                        }
                        viewerContainer.style.width = (this.pdfViewer.element.clientWidth - this.pdfViewerBase.navigationPane.getViewerContainerLeft() - this.pdfViewerBase.navigationPane.getViewerContainerRight()) + 'px';
                        pageContainer.style.width = (viewerContainer.offsetWidth - this.pdfViewerBase.navigationPane.getViewerContainerScrollbarWidth()) + 'px';
                    }
                    this.pdfViewerBase.updateZoomValue();
                    if (this.pdfViewer.annotation && this.pdfViewer.annotation.textMarkupAnnotationModule) {
                        this.pdfViewer.annotation.textMarkupAnnotationModule.showHideDropletDiv(true);
                    }
                    if (Browser.isDevice && !this.pdfViewer.enableDesktopMode && !isBlazor()) {
                        commentPanel.style.height = this.pdfViewerBase.viewerMainContainer.clientHeight + 'px';
                        if (this.pdfViewer.selectedItems.annotations.length > 0) {
                            var commentDiv = document.getElementById(this.pdfViewer.selectedItems.annotations[0].annotName);
                            if (commentDiv && commentDiv.lastElementChild.children[1] &&
                                commentDiv.lastElementChild.children[1].ej2_instances) {
                                commentDiv.lastElementChild.children[1].ej2_instances[0].enableEditMode = true;
                            }
                            else if (commentDiv && commentDiv.lastElementChild.ej2_instances) {
                                commentDiv.lastElementChild.ej2_instances[0].enableEditMode = true;
                                commentDiv.lastElementChild.style.display = 'block';
                                if (commentDiv.lastElementChild.children[1]) {
                                    commentDiv.lastElementChild.children[1].style.display = 'block';
                                }
                            }
                        }
                        if (this.pdfViewer.toolbarModule.annotationToolbarModule.toolbar) {
                            this.pdfViewer.toolbarModule.annotationToolbarModule.toolbar.element.style.display = 'none';
                            if (this.pdfViewer.toolbarModule.annotationToolbarModule.propertyToolbar) {
                                this.pdfViewer.toolbarModule.annotationToolbarModule.propertyToolbar.element.style.display = 'none';
                            }
                        }
                    }
                    if (!isNullOrUndefined(this.pdfViewerBase.navigationPane)) {
                        this.pdfViewerBase.navigationPane.calculateCommentPanelWidth();
                    }
                }
            }
        }
    };
    /**
     * @param {number} pageNumber - This is pageNumber
     * @param {number} index - index
     * @param {any} annotation - annotation
     * @param {string} actionString - actionString
     * @param {string} property - property
     * @param {any} node - node
     * @param {any} redo - redo
     * @private
     * @returns {void}
     */
    Annotation.prototype.addAction = function (pageNumber, index, annotation, actionString, property, node, redo) {
        var action = {
            pageIndex: pageNumber, index: index, annotation: annotation,
            action: actionString, modifiedProperty: property, undoElement: node, redoElement: redo
        };
        this.actionCollection.push(action);
        this.updateToolbar();
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.undo = function () {
        var _this = this;
        var actionObject = this.actionCollection.pop();
        if (actionObject) {
            var shapeType = actionObject.annotation.shapeAnnotationType;
            this.isUndoRedoAction = true;
            this.isUndoAction = true;
            switch (actionObject.action) {
                case 'Text Markup Added':
                case 'Text Markup Deleted':
                    if (this.textMarkupAnnotationModule) {
                        this.textMarkupAnnotationModule.undoTextMarkupAction(actionObject.annotation, actionObject.pageIndex, actionObject.index, actionObject.action);
                    }
                    break;
                case 'Text Markup Property modified':
                    if (this.textMarkupAnnotationModule) {
                        actionObject.annotation =
                            this.textMarkupAnnotationModule.undoRedoPropertyChange(actionObject.annotation, actionObject.pageIndex, actionObject.index, actionObject.modifiedProperty, true);
                    }
                    break;
                case 'Drag':
                case 'Resize':
                    if (isLineShapes(actionObject.annotation)) {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, {
                            bounds: actionObject.undoElement.bounds,
                            vertexPoints: actionObject.undoElement.vertexPoints, leaderHeight: actionObject.undoElement.leaderHeight
                        });
                    }
                    else {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, { bounds: actionObject.undoElement.bounds });
                    }
                    if (actionObject.annotation.measureType === 'Distance' || actionObject.annotation.measureType === 'Perimeter' || actionObject.annotation.measureType === 'Area' ||
                        actionObject.annotation.measureType === 'Radius' || actionObject.annotation.measureType === 'Volume') {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, { notes: actionObject.undoElement.notes });
                        this.updateCalibrateValues(actionObject.annotation);
                    }
                    if (actionObject.annotation.formFieldAnnotationType) {
                        this.pdfViewer.formDesigner.updateHTMLElement(actionObject.annotation);
                    }
                    this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    this.pdfViewer.select([actionObject.annotation.id]);
                    if (actionObject.annotation.shapeAnnotationType === 'Line' || actionObject.annotation.shapeAnnotationType === 'Rectangle' || actionObject.annotation.shapeAnnotationType === 'Ellipse' || actionObject.annotation.shapeAnnotationType === 'Polygon' || actionObject.annotation.shapeAnnotationType === 'LineWidthArrowHead' ||
                        actionObject.annotation.shapeAnnotationType === 'Radius' || actionObject.annotation.shapeAnnotationType === 'FreeText' || actionObject.annotation.shapeAnnotationType === 'HandWrittenSignature' || actionObject.annotation.shapeAnnotationType === 'SignatureText' || actionObject.annotation.shapeAnnotationType === 'SignatureImage' || actionObject.annotation.shapeAnnotationType === 'Ink') {
                        this.modifyInCollections(actionObject.annotation, 'bounds');
                    }
                    break;
                case 'Addition':
                    if (this.pdfViewer.formDesigner && actionObject.annotation.formFieldAnnotationType) {
                        this.pdfViewer.formDesigner.deleteFormField(actionObject.undoElement.id, false);
                    }
                    else {
                        var isAnnotationUpdate = false;
                        if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' ||
                            shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                            if (actionObject.annotation.measureType === '' || isNullOrUndefined(actionObject.annotation.measureType)) {
                                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, 'shape', null, true);
                            }
                            else {
                                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, 'measure', null, true);
                            }
                            isAnnotationUpdate = true;
                            var annotationObject = actionObject.annotation;
                            var wrapper = annotationObject.wrapper ? annotationObject.wrapper : null;
                            if (wrapper && wrapper.bounds) {
                                actionObject.annotation.bounds = wrapper.bounds;
                            }
                            actionObject.duplicate = this.modifyInCollections(actionObject.annotation, 'delete');
                        }
                        if (shapeType === 'Stamp' || shapeType === 'Image') {
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, actionObject.annotation.shapeAnnotationType, 'delete', true);
                            this.stampAnnotationModule.updateSessionStorage(actionObject.annotation, null, 'delete');
                            actionObject.duplicate = this.modifyInCollections(actionObject.annotation, 'delete');
                            isAnnotationUpdate = true;
                        }
                        if (shapeType === 'FreeText' || shapeType === 'HandWrittenSignature' ||
                            shapeType === 'SignatureImage' || shapeType === 'SignatureText' || shapeType === 'Ink') {
                            isAnnotationUpdate = true;
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, actionObject.annotation.shapeAnnotationType, 'delete', true);
                            actionObject.duplicate = this.modifyInCollections(actionObject.annotation, 'delete');
                        }
                        if (!isAnnotationUpdate) {
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, actionObject.annotation.shapeAnnotationType, 'delete', true);
                        }
                        this.pdfViewer.clearSelection((!isNullOrUndefined(this.pdfViewerBase.activeElements.activePageID) &&
                            !isNaN(this.pdfViewerBase.activeElements.activePageID)) ?
                            this.pdfViewerBase.activeElements.activePageID : actionObject.annotation.pageIndex);
                        this.pdfViewer.remove(actionObject.annotation);
                        var filteredAnnotations = this.pdfViewer.annotationCollection.filter(function (annotation) {
                            var excludeAnnotation = annotation.annotationId !== actionObject.annotation.annotName;
                            if (excludeAnnotation) {
                                var removeDiv_1 = document.getElementById(annotation.annotName);
                                if (removeDiv_1) {
                                    if (removeDiv_1.parentElement.childElementCount === 1) {
                                        _this.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv_1);
                                    }
                                    else {
                                        removeDiv_1.parentElement.removeChild(removeDiv_1);
                                    }
                                }
                            }
                            return !excludeAnnotation;
                        });
                        this.pdfViewer.renderDrawing(null, actionObject.annotation.pageIndex);
                        var removeDiv = document.getElementById(actionObject.annotation.annotName);
                        if (removeDiv) {
                            if (removeDiv.parentElement.childElementCount === 1) {
                                this.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                            }
                            else {
                                removeDiv.parentElement.removeChild(removeDiv);
                            }
                        }
                        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                            var mobileAnnotationToolbar = document.getElementById(this.pdfViewer.element.id + '_propertyToolbar');
                            if (mobileAnnotationToolbar && mobileAnnotationToolbar.children.length > 0) {
                                this.pdfViewer.toolbarModule.annotationToolbarModule.toolbarCreated = false;
                                this.pdfViewer.toolbarModule.annotationToolbarModule.createAnnotationToolbarForMobile();
                            }
                        }
                    }
                    break;
                case 'Delete':
                    if (this.pdfViewer.formDesigner && actionObject.annotation.formFieldAnnotationType) {
                        actionObject.undoElement.bounds.x = actionObject.undoElement.wrapper.bounds.x;
                        actionObject.undoElement.bounds.y = actionObject.undoElement.wrapper.bounds.y;
                        this.pdfViewer.formDesigner.drawFormField(actionObject.undoElement);
                    }
                    else {
                        if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                            if (actionObject.annotation.measureType === '' || isNullOrUndefined(actionObject.annotation.measureType)) {
                                shapeType = 'shape';
                                this.shapeAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.undoElement);
                            }
                            else {
                                shapeType = 'shape_measure';
                                this.measureAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.undoElement);
                            }
                        }
                        if (shapeType === 'Stamp' || shapeType === 'Image') {
                            this.stampAnnotationModule.updateDeleteItems(actionObject.annotation.pageIndex, actionObject.annotation);
                        }
                        else if (shapeType === 'FreeText') {
                            this.freeTextAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.undoElement);
                        }
                        else if (shapeType === 'Ink') {
                            this.inkAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.undoElement);
                        }
                        else if (shapeType === 'HandWrittenSignature' || shapeType === 'SignatureText' || shapeType === 'SignatureImage') {
                            this.pdfViewerBase.signatureModule.addInCollection(actionObject.annotation.pageIndex, actionObject.undoElement);
                        }
                        if (!actionObject.annotation.annotationId) {
                            var addedAnnot = this.pdfViewer.add(actionObject.annotation);
                            if ((shapeType === 'FreeText' || addedAnnot.enableShapeLabel) && addedAnnot) {
                                this.pdfViewer.nodePropertyChange(addedAnnot, {});
                            }
                        }
                        var formFieldObj = void 0;
                        if (actionObject.annotation.id) {
                            formFieldObj = this.pdfViewer.nameTable[actionObject.annotation.id.split('_')[0]];
                        }
                        if (formFieldObj != null && (formFieldObj.formFieldAnnotationType === 'SignatureField' || formFieldObj.formFieldAnnotationType === 'InitialField')) {
                            formFieldObj.wrapper.children.push(actionObject.annotation.wrapper.children[0]);
                            if (actionObject.annotation.shapeAnnotationType === 'SignatureText') {
                                formFieldObj.wrapper.children.push(actionObject.annotation.wrapper.children[1]);
                            }
                            var key = actionObject.annotation.id.split('_')[0] + '_content';
                            var data = null;
                            if (this.pdfViewer.formDesignerModule) {
                                data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
                            }
                            if (data) {
                                var formFieldsData = JSON.parse(data);
                                for (var i = 0; i < formFieldsData.length; i++) {
                                    if (formFieldsData[parseInt(i.toString(), 10)].Key === key) {
                                        if (actionObject.annotation.shapeAnnotationType === 'SignatureText') {
                                            formFieldsData[parseInt(i.toString(), 10)].FormField.signatureType = 'Text';
                                            formFieldsData[parseInt(i.toString(), 10)].FormField.value = actionObject.annotation.data;
                                            this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.value =
                                                actionObject.annotation.data;
                                            this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.signatureType = 'Text';
                                        }
                                        else if (actionObject.annotation.shapeAnnotationType === 'SignatureImage') {
                                            formFieldsData[parseInt(i.toString(), 10)].FormField.signatureType = 'Image';
                                            formFieldsData[parseInt(i.toString(), 10)].FormField.value = actionObject.annotation.data;
                                            this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.value =
                                                actionObject.annotation.data;
                                            this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.signatureType = 'Image';
                                        }
                                        else {
                                            formFieldsData[parseInt(i.toString(), 10)].FormField.signatureType = 'Path';
                                            this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.signatureType = 'Path';
                                            var collectionData = processPathData(actionObject.annotation.data);
                                            var csData = splitArrayCollection(collectionData);
                                            formFieldsData[parseInt(i.toString(), 10)].FormField.value = JSON.stringify(csData);
                                            this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.value =
                                                JSON.stringify(csData);
                                        }
                                    }
                                }
                                this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
                            }
                        }
                        this.pdfViewer.renderDrawing(null, actionObject.annotation.pageIndex);
                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                            addAnnotationComments(actionObject.annotation.pageIndex, shapeType, true);
                        if (actionObject.annotation.annotationId) {
                            var removedAnnotationCollection = this.removedAnnotationCollection[this.removedAnnotationCollection.length - 1];
                            var annotationType = this.getTypeOfAnnotation(removedAnnotationCollection);
                            this.pdfViewer.annotationCollection.push(removedAnnotationCollection);
                            this.removedAnnotationCollection.splice(this.removedAnnotationCollection.length - 1);
                            var pageNumber = actionObject.annotation.pageNumber >= 0 ? actionObject.annotation.pageNumber :
                                actionObject.annotation.pageIndex;
                            this.pdfViewerBase.documentAnnotationCollections[parseInt(pageNumber.toString(), 10)]["" + annotationType].
                                push(this.removedDocumentAnnotationCollection[this.removedDocumentAnnotationCollection.length - 1]);
                            this.removedDocumentAnnotationCollection.splice(this.removedDocumentAnnotationCollection.length - 1);
                        }
                    }
                    break;
                case 'stampOpacity':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { opacity: actionObject.undoElement.opacity });
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    actionObject.annotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                    break;
                case 'Shape Stroke':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { strokeColor: actionObject.undoElement.strokeColor });
                    this.modifyInCollections(actionObject.annotation, 'stroke');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Fill':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fillColor: actionObject.undoElement.fillColor });
                    this.modifyInCollections(actionObject.annotation, 'fill');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Opacity':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { opacity: actionObject.undoElement.opacity });
                    if (actionObject.annotation.shapeAnnotationType === 'StickyNotes') {
                        this.stickyNotesAnnotationModule.updateOpacityValue(actionObject.annotation);
                        this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                        actionObject.annotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                    }
                    else {
                        this.modifyInCollections(actionObject.annotation, 'opacity');
                    }
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Thickness':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { thickness: actionObject.undoElement.thickness });
                    this.modifyInCollections(actionObject.annotation, 'thickness');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Line properties change':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, {
                        fillColor: actionObject.undoElement.fillColor, borderDashArray: actionObject.undoElement.borderDashArray,
                        borderStyle: actionObject.undoElement.borderStyle,
                        strokeColor: actionObject.undoElement.strokeColor, opacity: actionObject.undoElement.opacity,
                        thickness: actionObject.undoElement.thickness,
                        sourceDecoraterShapes: this.getArrowType(actionObject.undoElement.lineHeadStart),
                        taregetDecoraterShapes: this.getArrowType(actionObject.undoElement.lineHeadEnd)
                    });
                    this.updateCollectionForLineProperty(actionObject.annotation);
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Text Property Added':
                    actionObject.annotation = this.pdfViewer.annotationModule.
                        stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    actionObject.annotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                    break;
                case 'Comments Property Added':
                    actionObject.annotation = this.pdfViewer.annotationModule.
                        stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    break;
                case 'Status Property Added':
                    actionObject.annotation = this.pdfViewer.annotationModule.
                        stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    break;
                case 'Comments Reply Deleted':
                    actionObject.annotation = this.pdfViewer.annotationModule.
                        stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    break;
                case 'dynamicText Change':
                    this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = true;
                    actionObject.annotation.dynamicText = actionObject.undoElement.dynamicText;
                    if (this.pdfViewer.selectedItems.annotations[0]) {
                        this.pdfViewer.selectedItems.annotations[0].dynamicText = actionObject.undoElement.dynamicText;
                    }
                    this.pdfViewer.annotationModule.
                        stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    this.modifyInCollections(actionObject.annotation, 'dynamicText');
                    if (this.pdfViewer.selectedItems.annotations[0]) {
                        this.pdfViewer.nodePropertyChange(this.pdfViewer.selectedItems.annotations[0], {});
                    }
                    else {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, {});
                    }
                    this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = false;
                    this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    break;
                case 'fontColor':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fontColor: actionObject.undoElement.fontColor });
                    this.modifyInCollections(actionObject.annotation, 'fontColor');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'fontSize':
                    this.isFreeTextFontsizeChanged = true;
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fontSize: actionObject.undoElement.fontSize });
                    this.modifyInCollections(actionObject.annotation, 'fontSize');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'fontFamily':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fontFamily: actionObject.undoElement.fontFamily });
                    this.modifyInCollections(actionObject.annotation, 'fontFamily');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'textAlign':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { textAlign: actionObject.undoElement.textAlign });
                    this.modifyInCollections(actionObject.annotation, 'textAlign');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'textPropertiesChange':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { font: actionObject.undoElement.font });
                    this.modifyInCollections(actionObject.annotation, 'textPropertiesChange');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Rotate':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation.annotations[0], {
                        bounds: actionObject.undoElement.bounds,
                        rotateAngle: actionObject.undoElement.rotateAngle
                    });
                    this.modifyInCollections(actionObject.annotation.annotations[0], 'bounds');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'FormDesigner Properties Change':
                    if (actionObject.undoElement && actionObject.undoElement.isMultiline !== actionObject.redoElement.isMultiline) {
                        this.undoRedoMultiline(actionObject.undoElement);
                    }
                    this.updateFormFieldPropertiesChanges(actionObject.undoElement.formFieldAnnotationType, actionObject.undoElement);
                    break;
                case 'FormField Value Change':
                    if (actionObject.annotation.formFieldAnnotationType) {
                        if (actionObject.annotation.formFieldAnnotationType === 'RadioButton') {
                            this.updateFormFieldValueChange(actionObject.annotation.formFieldAnnotationType, actionObject.undoElement, false);
                            this.updateFormFieldValueChange(actionObject.annotation.formFieldAnnotationType, actionObject.redoElement, true);
                        }
                        else {
                            this.updateFormFieldValueChange(actionObject.annotation.formFieldAnnotationType, actionObject.annotation, actionObject.undoElement);
                        }
                    }
                    else {
                        var spanElement = document.getElementById(actionObject.annotation.id + '_html_element').children[0].children[0];
                        spanElement.className = 'e-pdfviewer-signatureformfields';
                        var formFieldObj = this.pdfViewer.nameTable[actionObject.annotation.id.split('_')[0]];
                        var annotationObj = this.pdfViewer.nameTable[actionObject.annotation.id];
                        if (actionObject.annotation.annotName === 'SignatureField' || actionObject.annotation.annotName === 'SignatureText') {
                            actionObject.annotation.bounds = annotationObj.wrapper.bounds;
                        }
                        formFieldObj.wrapper.children.splice(formFieldObj.wrapper.children.indexOf(annotationObj.wrapper.children[0]), 1);
                        if (actionObject.annotation.shapeAnnotationType === 'SignatureText') {
                            formFieldObj.wrapper.children.splice(formFieldObj.wrapper.children.indexOf(annotationObj.wrapper.children[1]), 1);
                        }
                        var key = actionObject.annotation.id.split('_')[0] + '_content';
                        var data = null;
                        if (this.pdfViewer.formDesignerModule) {
                            data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
                        }
                        if (data) {
                            var formFieldsData = JSON.parse(data);
                            for (var i = 0; i < formFieldsData.length; i++) {
                                if (formFieldsData[parseInt(i.toString(), 10)].Key === key) {
                                    formFieldsData[parseInt(i.toString(), 10)].FormField.value = '';
                                    formFieldsData[parseInt(i.toString(), 10)].FormField.signatureType = '';
                                    this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.value = '';
                                    this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.signatureType = '';
                                }
                            }
                            this.pdfViewer.remove(actionObject.annotation);
                            this.pdfViewer.renderDrawing();
                            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
                        }
                    }
            }
            this.redoCollection.push(actionObject);
            this.updateToolbar();
            this.isUndoRedoAction = false;
            this.isUndoAction = false;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.redo = function () {
        var actionObject = this.redoCollection.pop();
        var annotationObject = this.pdfViewer.nameTable[actionObject.annotation.id];
        if (actionObject) {
            var shapeType = actionObject.annotation.shapeAnnotationType;
            this.isUndoRedoAction = true;
            switch (actionObject.action) {
                case 'Text Markup Property modified':
                    if (this.textMarkupAnnotationModule) {
                        actionObject.annotation = this.textMarkupAnnotationModule.
                            undoRedoPropertyChange(actionObject.annotation, actionObject.pageIndex, actionObject.index, actionObject.modifiedProperty);
                    }
                    break;
                case 'Text Markup Added':
                case 'Text Markup Deleted':
                    if (this.textMarkupAnnotationModule) {
                        this.textMarkupAnnotationModule.
                            redoTextMarkupAction(actionObject.annotation, actionObject.pageIndex, actionObject.index, actionObject.action);
                    }
                    break;
                case 'Drag':
                case 'Resize':
                    if (isLineShapes(actionObject.annotation)) {
                        this.pdfViewer.nodePropertyChange(annotationObject, { bounds: actionObject.redoElement.bounds, vertexPoints: actionObject.redoElement.vertexPoints, leaderHeight: actionObject.redoElement.leaderHeight });
                    }
                    else {
                        this.pdfViewer.nodePropertyChange(annotationObject, { bounds: actionObject.redoElement.bounds });
                    }
                    if (actionObject.annotation.measureType === 'Distance' || actionObject.annotation.measureType === 'Perimeter' || actionObject.annotation.measureType === 'Area' ||
                        actionObject.annotation.measureType === 'Radius' || actionObject.annotation.measureType === 'Volume') {
                        this.pdfViewer.nodePropertyChange(annotationObject, { notes: actionObject.redoElement.notes });
                        this.updateCalibrateValues(annotationObject);
                    }
                    if (actionObject.annotation.formFieldAnnotationType) {
                        this.pdfViewer.formDesigner.updateHTMLElement(actionObject.annotation);
                    }
                    this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    this.pdfViewer.select([annotationObject.id]);
                    if (actionObject.annotation.shapeAnnotationType === 'Line' || actionObject.annotation.shapeAnnotationType === 'Rectangle' || actionObject.annotation.shapeAnnotationType === 'Ellipse' || actionObject.annotation.shapeAnnotationType === 'Polygon' || actionObject.annotation.shapeAnnotationType === 'LineWidthArrowHead'
                        || actionObject.annotation.shapeAnnotationType === 'Radius' || actionObject.annotation.shapeAnnotationType === 'FreeText' || actionObject.annotation.shapeAnnotationType === 'HandWrittenSignature' || actionObject.annotation.shapeAnnotationType === 'SignatureText' || actionObject.annotation.shapeAnnotationType === 'SignatureImage' || actionObject.annotation.shapeAnnotationType === 'Ink') {
                        this.modifyInCollections(annotationObject, 'bounds');
                    }
                    break;
                case 'Addition':
                    if (this.pdfViewer.formDesigner && actionObject.annotation.formFieldAnnotationType) {
                        actionObject.redoElement.bounds.x = actionObject.redoElement.wrapper.bounds.x;
                        actionObject.redoElement.bounds.y = actionObject.redoElement.wrapper.bounds.y;
                        this.pdfViewer.formDesigner.drawFormField(actionObject.redoElement);
                    }
                    else {
                        if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                            if (actionObject.annotation.measureType === '' || isNullOrUndefined(actionObject.annotation.measureType)) {
                                shapeType = 'shape';
                                this.shapeAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.duplicate);
                            }
                            else {
                                shapeType = 'shape_measure';
                                this.measureAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.duplicate);
                            }
                        }
                        if (shapeType === 'FreeText') {
                            this.freeTextAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.duplicate);
                        }
                        if (shapeType === 'Stamp' || shapeType === 'Image') {
                            this.stampAnnotationModule.updateDeleteItems(actionObject.annotation.pageIndex, actionObject.redoElement);
                        }
                        if (shapeType === 'HandWrittenSignature' || shapeType === 'SignatureText' || shapeType === 'SignatureImage') {
                            this.pdfViewerBase.signatureModule.addInCollection(actionObject.annotation.pageIndex, actionObject.duplicate);
                        }
                        if (shapeType === 'Ink') {
                            this.inkAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.duplicate);
                        }
                        var addedAnnot = this.pdfViewer.add(actionObject.annotation);
                        this.pdfViewer.select([actionObject.annotation.id]);
                        if ((shapeType === 'FreeText' || addedAnnot.enableShapeLabel) && addedAnnot) {
                            this.pdfViewer.nodePropertyChange(addedAnnot, {});
                        }
                        this.pdfViewer.renderDrawing(null, actionObject.annotation.pageIndex);
                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                            addAnnotationComments(actionObject.annotation.pageIndex, shapeType, false);
                        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                            var mobileAnnotationToolbar = document.getElementById(this.pdfViewer.element.id + '_propertyToolbar');
                            if (mobileAnnotationToolbar && mobileAnnotationToolbar.children.length > 0) {
                                this.pdfViewer.toolbarModule.annotationToolbarModule.toolbarCreated = false;
                                this.pdfViewer.toolbarModule.annotationToolbarModule.createAnnotationToolbarForMobile();
                            }
                        }
                    }
                    break;
                case 'Delete':
                    if (this.pdfViewer.formDesigner && actionObject.annotation.formFieldAnnotationType) {
                        this.pdfViewer.formDesigner.deleteFormField(actionObject.redoElement.id, false);
                    }
                    else {
                        var isUpdate = false;
                        var sType = actionObject.annotation.shapeAnnotationType;
                        if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                            if (actionObject.annotation.measureType === '' || isNullOrUndefined(actionObject.annotation.measureType)) {
                                sType = 'shape';
                            }
                            else {
                                sType = 'measure';
                            }
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, sType, 'delete');
                            this.modifyInCollections(actionObject.annotation, 'delete');
                            isUpdate = true;
                        }
                        if (shapeType === 'Stamp' || shapeType === 'Image') {
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, sType, 'delete');
                            this.stampAnnotationModule.updateSessionStorage(actionObject.annotation, null, 'delete');
                            this.modifyInCollections(actionObject.annotation, 'delete');
                            isUpdate = true;
                        }
                        if (shapeType === 'FreeText' || shapeType === 'HandWrittenSignature' || shapeType === 'SignatureText' || shapeType === 'SignatureImage') {
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, sType, 'delete');
                            this.modifyInCollections(actionObject.annotation, 'delete');
                        }
                        if (!isUpdate) {
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, sType, 'delete');
                        }
                        var formFieldObj = void 0;
                        if (actionObject.annotation.id) {
                            formFieldObj = this.pdfViewer.nameTable[actionObject.annotation.id.split('_')[0]];
                        }
                        if (formFieldObj != null && (formFieldObj.formFieldAnnotationType === 'SignatureField' || formFieldObj.formFieldAnnotationType === 'InitialField')) {
                            formFieldObj.wrapper.children.splice(formFieldObj.wrapper.children.
                                indexOf(actionObject.annotation.wrapper.children[0]), 1);
                            if (actionObject.annotation.shapeAnnotationType === 'SignatureText') {
                                formFieldObj.wrapper.children.splice(formFieldObj.wrapper.children.
                                    indexOf(actionObject.annotation.wrapper.children[1]), 1);
                            }
                            var key = actionObject.annotation.id.split('_')[0] + '_content';
                            var data = null;
                            if (this.pdfViewer.formDesignerModule) {
                                data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
                            }
                            if (data) {
                                var formFieldsData = JSON.parse(data);
                                for (var i = 0; i < formFieldsData.length; i++) {
                                    if (formFieldsData[parseInt(i.toString(), 10)].Key === key) {
                                        formFieldsData[parseInt(i.toString(), 10)].FormField.value = '';
                                        formFieldsData[parseInt(i.toString(), 10)].FormField.signatureType = '';
                                        this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.value = '';
                                        this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.signatureType = '';
                                    }
                                }
                                this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
                            }
                        }
                        this.pdfViewer.clearSelection(actionObject.annotation.pageIndex);
                        this.pdfViewer.remove(actionObject.annotation);
                        this.pdfViewer.renderDrawing(null, actionObject.annotation.pageIndex);
                        var id = actionObject.annotation.annotName ? actionObject.annotation.
                            annotName : actionObject.annotation.annotationId;
                        var removeDiv = document.getElementById(id);
                        this.removeCommentPanelDiv(removeDiv);
                        if (actionObject.annotation.annotationId) {
                            var collections = this.
                                updateCollectionForNonRenderedPages(actionObject.annotation, id, actionObject.annotation.pageIndex);
                            this.undoCommentsElement.push(collections);
                        }
                    }
                    break;
                case 'stampOpacity':
                    this.pdfViewer.nodePropertyChange(annotationObject, { opacity: actionObject.redoElement.opacity });
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotationObject, null, true);
                    break;
                case 'Shape Stroke':
                    this.pdfViewer.nodePropertyChange(annotationObject, { strokeColor: actionObject.redoElement.strokeColor });
                    this.modifyInCollections(annotationObject, 'stroke');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Fill':
                    this.pdfViewer.nodePropertyChange(annotationObject, { fillColor: actionObject.redoElement.fillColor });
                    this.modifyInCollections(annotationObject, 'fill');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Opacity':
                    this.pdfViewer.nodePropertyChange(annotationObject, { opacity: actionObject.redoElement.opacity });
                    if (actionObject.annotation.shapeAnnotationType === 'StickyNotes') {
                        this.stickyNotesAnnotationModule.updateOpacityValue(annotationObject);
                        this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotationObject, null, true);
                    }
                    else {
                        this.modifyInCollections(annotationObject, 'opacity');
                    }
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Thickness':
                    this.pdfViewer.nodePropertyChange(annotationObject, { thickness: actionObject.redoElement.thickness });
                    this.modifyInCollections(annotationObject, 'thickness');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Line properties change':
                    this.pdfViewer.nodePropertyChange(annotationObject, {
                        fillColor: actionObject.redoElement.fillColor, strokeColor: actionObject.redoElement.strokeColor,
                        opacity: actionObject.redoElement.opacity, thickness: actionObject.redoElement.thickness,
                        sourceDecoraterShapes: this.getArrowType(actionObject.redoElement.lineHeadStart),
                        taregetDecoraterShapes: this.getArrowType(actionObject.redoElement.lineHeadEnd),
                        borderDashArray: actionObject.redoElement.borderDashArray, borderStyle: actionObject.redoElement.borderStyle
                    });
                    this.updateCollectionForLineProperty(annotationObject);
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Text Property Added':
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                        redoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    break;
                case 'Comments Property Added':
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                        redoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    break;
                case 'Status Property Added':
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                        redoAction(actionObject.annotation, actionObject.action);
                    break;
                case 'Comments Reply Deleted':
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                        redoAction(actionObject.annotation, actionObject.action);
                    break;
                case 'dynamicText Change': {
                    this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = true;
                    annotationObject.dynamicText = actionObject.redoElement.dynamicText;
                    var annotation = this.pdfViewer.selectedItems.annotations[0];
                    if (annotation) {
                        annotation.dynamicText = actionObject.redoElement.dynamicText;
                        annotation.bounds.height = actionObject.redoElement.bounds.height;
                    }
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                        redoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotationObject, null, true);
                    this.modifyInCollections(annotationObject, 'dynamicText');
                    if (annotation) {
                        this.pdfViewer.nodePropertyChange(annotation, {});
                    }
                    else {
                        this.pdfViewer.nodePropertyChange(annotationObject, {});
                    }
                    this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = false;
                    this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    this.pdfViewer.select([annotationObject.id]);
                    break;
                }
                case 'fontColor':
                    this.pdfViewer.nodePropertyChange(annotationObject, { fontColor: actionObject.redoElement.fontColor });
                    this.modifyInCollections(annotationObject, 'fontColor');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'fontSize':
                    this.isFreeTextFontsizeChanged = true;
                    this.pdfViewer.nodePropertyChange(annotationObject, { fontSize: actionObject.redoElement.fontSize });
                    this.modifyInCollections(annotationObject, 'fontSize');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'textAlign':
                    this.pdfViewer.nodePropertyChange(annotationObject, { textAlign: actionObject.redoElement.textAlign });
                    this.modifyInCollections(annotationObject, 'textAlign');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'textPropertiesChange':
                    this.pdfViewer.nodePropertyChange(annotationObject, { font: actionObject.redoElement.font });
                    this.modifyInCollections(annotationObject, 'textPropertiesChange');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Rotate':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation.annotations[0], { bounds: actionObject.redoElement.bounds,
                        rotateAngle: actionObject.redoElement.rotateAngle });
                    this.modifyInCollections(actionObject.annotation.annotations[0], 'bounds');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'FormDesigner Properties Change':
                    if (actionObject.redoElement && actionObject.undoElement.isMultiline !== actionObject.redoElement.isMultiline) {
                        this.undoRedoMultiline(actionObject.redoElement);
                    }
                    this.updateFormFieldPropertiesChanges(actionObject.redoElement.formFieldAnnotationType, actionObject.redoElement);
                    break;
                case 'FormField Value Change':
                    if (actionObject.annotation.formFieldAnnotationType) {
                        if (actionObject.annotation.formFieldAnnotationType === 'RadioButton') {
                            this.updateFormFieldValueChange(actionObject.annotation.formFieldAnnotationType, actionObject.undoElement, true);
                            this.updateFormFieldValueChange(actionObject.annotation.formFieldAnnotationType, actionObject.redoElement, false);
                        }
                        else {
                            this.updateFormFieldValueChange(actionObject.annotation.formFieldAnnotationType, actionObject.annotation, actionObject.redoElement);
                        }
                    }
                    else {
                        var spanElement = document.getElementById(actionObject.annotation.id + '_html_element').children[0].children[0];
                        spanElement.className = 'e-pdfviewer-signatureformfields-signature';
                        var formFieldObj = this.pdfViewer.nameTable[actionObject.annotation.id.split('_')[0]];
                        var annotationObj = this.pdfViewer.nameTable[actionObject.annotation.id];
                        formFieldObj.wrapper.children.push(annotationObj.wrapper.children[0]);
                        if (actionObject.annotation.shapeAnnotationType === 'SignatureText') {
                            formFieldObj.wrapper.children.push(annotationObj.wrapper.children[1]);
                        }
                        var key = actionObject.annotation.id.split('_')[0] + '_content';
                        var data = null;
                        if (this.pdfViewer.formDesignerModule) {
                            data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
                        }
                        if (data) {
                            var formFieldsData = JSON.parse(data);
                            for (var i = 0; i < formFieldsData.length; i++) {
                                if (formFieldsData[parseInt(i.toString(), 10)].Key === key) {
                                    if (actionObject.annotation.shapeAnnotationType === 'SignatureText') {
                                        formFieldsData[parseInt(i.toString(), 10)].FormField.signatureType = 'Text';
                                        formFieldsData[parseInt(i.toString(), 10)].FormField.value = actionObject.annotation.data;
                                        this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].
                                            FormField.value = actionObject.annotation.data;
                                        this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.signatureType = 'Text';
                                    }
                                    else if (actionObject.annotation.shapeAnnotationType === 'SignatureImage') {
                                        formFieldsData[parseInt(i.toString(), 10)].FormField.signatureType = 'Image';
                                        formFieldsData[parseInt(i.toString(), 10)].FormField.value = actionObject.annotation.data;
                                        this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].
                                            FormField.value = actionObject.annotation.data;
                                        this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.signatureType = 'Image';
                                    }
                                    else {
                                        formFieldsData[parseInt(i.toString(), 10)].FormField.signatureType = 'Path';
                                        this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.signatureType = 'Path';
                                        var collectionData = processPathData(actionObject.annotation.data);
                                        var csData = splitArrayCollection(collectionData);
                                        formFieldsData[parseInt(i.toString(), 10)].FormField.value = JSON.stringify(csData);
                                        this.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].
                                            FormField.value = JSON.stringify(csData);
                                    }
                                }
                            }
                            this.pdfViewer.add(actionObject.annotation);
                            var canvass = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', actionObject.pageIndex);
                            this.pdfViewer.renderDrawing(canvass, actionObject.pageIndex);
                            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
                        }
                    }
            }
            if (actionObject.redoElement && actionObject.redoElement.modifiedDate !== undefined) {
                actionObject.annotation.modifiedDate = actionObject.redoElement.modifiedDate;
            }
            this.actionCollection.push(actionObject);
            this.updateToolbar();
            this.isUndoRedoAction = false;
        }
    };
    Annotation.prototype.undoRedoMultiline = function (element) {
        if (element.isMultiline && element.formFieldAnnotationType === 'Textbox') {
            this.pdfViewer.formDesignerModule.renderMultilineText(element, true);
        }
        else if (element.formFieldAnnotationType === 'Textbox') {
            this.pdfViewer.formDesignerModule.renderTextbox(element, true);
        }
    };
    Annotation.prototype.updateFormFieldValueChange = function (formFieldAnnotationType, annotation, value) {
        if (annotation) {
            var formFieldModel = this.pdfViewer.formDesigner.getFormField(annotation.id.split('_')[0]);
            var data = null;
            if (this.pdfViewer.formDesignerModule) {
                data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
            }
            if (data) {
                var formFieldsData = JSON.parse(data);
                var index = this.pdfViewer.formDesigner.getFormFiledIndex(annotation.id.split('_')[0]);
                switch (formFieldAnnotationType) {
                    case 'Textbox':
                    case 'PasswordField':
                    case 'RadioButton':
                    case 'DropdownList':
                    case 'ListBox': {
                        var inputElement = document.getElementById(annotation.id.split('_')[0] + '_content_html_element').firstElementChild.firstElementChild;
                        if (formFieldAnnotationType === 'Textbox' || formFieldAnnotationType === 'PasswordField') {
                            formFieldModel.value = value;
                            this.pdfViewer.formDesigner.updateValuePropertyChange(formFieldModel, inputElement, true, index, formFieldsData);
                        }
                        else if (formFieldAnnotationType === 'RadioButton') {
                            formFieldModel.isSelected = value;
                            this.pdfViewer.formDesigner.updateIsSelectedPropertyChange(formFieldModel, inputElement.firstElementChild, true, index, formFieldsData);
                        }
                        else if (formFieldAnnotationType === 'DropdownList' || formFieldAnnotationType === 'ListBox') {
                            formFieldModel.selectedIndex = value;
                            formFieldsData[parseInt(index.toString(), 10)].FormField.selectedIndex = value;
                            this.pdfViewerBase.formFieldCollection[parseInt(index.toString(), 10)].FormField.selectedIndex = value;
                            this.pdfViewer.nameTable[formFieldsData[parseInt(index.toString(), 10)].Key.split('_')[0]].selectedIndex = value;
                            if (formFieldAnnotationType === 'ListBox') {
                                for (var k = 0; k < inputElement.options.length; k++) {
                                    inputElement.options[parseInt(k.toString(), 10)].selected = value.includes(k) ? true : false;
                                }
                            }
                            else {
                                inputElement.selectedIndex = value;
                            }
                        }
                        break;
                    }
                    case 'Checkbox': {
                        var checkboxDivElement = document.getElementById(annotation.id.split('_')[0] + '_content_html_element').firstElementChild.firstElementChild.lastElementChild;
                        formFieldModel.isChecked = value;
                        this.pdfViewer.formDesigner.updateIsCheckedPropertyChange(formFieldModel, checkboxDivElement, true, index, formFieldsData);
                        break;
                    }
                }
                this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
            }
        }
    };
    Annotation.prototype.updateFormFieldPropertiesChanges = function (formFieldAnnotationType, element) {
        switch (formFieldAnnotationType) {
            case 'Textbox':
            case 'PasswordField':
                this.pdfViewer.formDesigner.updateTextboxFormDesignerProperties(element, true);
                break;
            case 'Checkbox':
                this.pdfViewer.formDesigner.updateCheckboxFormDesignerProperties(element, true, true);
                break;
            case 'RadioButton':
                this.pdfViewer.formDesigner.updateRadioButtonDesignerProperties(element, true, true);
                break;
            case 'DropdownList':
                this.pdfViewer.formDesigner.updateDropdownFormDesignerProperties(element, true);
                break;
            case 'ListBox':
                this.pdfViewer.formDesigner.updateListBoxFormDesignerProperties(element, true);
                break;
            case 'SignatureField':
            case 'InitialField':
                this.pdfViewer.formDesigner.updateSignatureTextboxProperties(element, true);
        }
    };
    Annotation.prototype.updateCollectionForLineProperty = function (pdfAnnotationBase) {
        this.modifyInCollections(pdfAnnotationBase, 'fill');
        this.modifyInCollections(pdfAnnotationBase, 'stroke');
        this.modifyInCollections(pdfAnnotationBase, 'opacity');
        this.modifyInCollections(pdfAnnotationBase, 'thickness');
        this.modifyInCollections(pdfAnnotationBase, 'dashArray');
        this.modifyInCollections(pdfAnnotationBase, 'startArrow');
        this.modifyInCollections(pdfAnnotationBase, 'endArrow');
    };
    Annotation.prototype.updateToolbar = function (isAnnotationDelete) {
        if (this.pdfViewer.toolbarModule) {
            this.pdfViewer.toolbarModule.updateUndoRedoButtons();
        }
        if (this.actionCollection && this.actionCollection.length === 0) {
            this.pdfViewerBase.updateDocumentEditedProperty(false);
        }
        else {
            this.pdfViewerBase.updateDocumentEditedProperty(true);
        }
        if (isAnnotationDelete) {
            //This below lines are commented for the below task -EJ2-61754-IsDocumentEdited API is not Properly working for delete annotations
            //Also refer EJ2-55205-The isDocumentEdited property is False on adding handwritten signature
            // let isEdited: boolean = false;
            // if (this.pdfViewer.annotationCollection && this.pdfViewer.annotationCollection.length > 0 && this.pdfViewer.signatureCollection && this.pdfViewer.signatureCollection.length > 0) {
            //     isEdited = true;
            // }
            // if (!isEdited && this.pdfViewer.isDocumentEdited) {
            this.pdfViewerBase.updateDocumentEditedProperty(true);
            // }
        }
    };
    Annotation.prototype.createNote = function () {
        this.popupNote = createElement('div', { id: this.pdfViewer.element.id + '_annotation_note', className: 'e-pv-annotation-note', styles: 'display:none' });
        this.popupNoteAuthor = createElement('div', { id: this.pdfViewer.element.id + '_annotation_note_author', className: 'e-pv-annotation-note-author' });
        this.popupNote.appendChild(this.popupNoteAuthor);
        this.popupNoteContent = createElement('div', { id: this.pdfViewer.element.id + '_annotation_note_content', className: 'e-pv-annotation-note-content' });
        this.popupNote.appendChild(this.popupNoteContent);
        if (this.pdfViewerBase.mainContainer) {
            this.pdfViewerBase.mainContainer.appendChild(this.popupNote);
        }
    };
    /**
     * @param {any} event - event
     * @param {string} color - color
     * @param {string} author - author
     * @param {string} note - note
     * @param {string} type - type
     * @private
     * @returns {void}
     */
    Annotation.prototype.showPopupNote = function (event, color, author, note, type) {
        var mainContainerPosition = this.pdfViewerBase.mainContainer.getBoundingClientRect();
        var popupNoteClientRect = this.popupNote.getBoundingClientRect();
        if (author) {
            this.popupNoteAuthor.textContent = author;
        }
        this.popupNoteContent.textContent = note;
        if (type === 'Highlight') {
            this.popupNote.style.backgroundColor = 'rgb(237, 232, 177)';
        }
        else if (type === 'Underline') {
            this.popupNote.style.backgroundColor = 'rgb(187, 241, 191)';
        }
        else if (type === 'Strikethrough') {
            this.popupNote.style.backgroundColor = 'rgb(242, 188, 207)';
        }
        this.popupNote.style.display = 'block';
        var topPosition = (event.pageY - mainContainerPosition.top + 5);
        var leftPosition = (event.pageX - mainContainerPosition.left + 5);
        if (leftPosition + popupNoteClientRect.width > mainContainerPosition.width) {
            leftPosition = leftPosition - popupNoteClientRect.width;
        }
        if (topPosition + popupNoteClientRect.height > mainContainerPosition.height) {
            topPosition = topPosition - popupNoteClientRect.height;
        }
        this.popupNote.style.top = topPosition + 'px';
        this.popupNote.style.left = leftPosition + 'px';
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.hidePopupNote = function () {
        if (this.popupNote) {
            this.popupNote.style.display = 'none';
        }
    };
    Annotation.prototype.createTextMarkupPopup = function () {
        var _this = this;
        var elementId = this.pdfViewer.element.id;
        this.popupElement = createElement('div', { id: elementId + '_popup_annotation_note', className: 'e-pv-annotation-popup-menu', styles: 'display:none' });
        var headerElement = createElement('div', { id: elementId + '_popup_header', className: 'e-pv-annotation-popup-header' });
        this.authorPopupElement = createElement('div', { id: elementId + '_popup_author', className: 'e-pv-annotation-popup-author' });
        headerElement.appendChild(this.authorPopupElement);
        var closeBtn = createElement('span', { id: elementId + '_popup_close', className: 'e-pv-annotation-popup-close e-pv-icon' });
        headerElement.appendChild(closeBtn);
        this.popupElement.appendChild(headerElement);
        this.modifiedDateElement = createElement('div', { id: elementId + '_popup_modified_time', className: 'e-pv-annotation-modified-time' });
        this.popupElement.appendChild(this.modifiedDateElement);
        var contentContainer = createElement('div', { id: elementId + '_popup_content_container', className: 'e-pv-annotation-popup-note-container' });
        this.noteContentElement = createElement('div', { id: elementId + '_popup_content', className: 'e-pv-annotation-popup-content' });
        this.noteContentElement.contentEditable = 'true';
        contentContainer.appendChild(this.noteContentElement);
        this.popupElement.appendChild(contentContainer);
        this.pdfViewerBase.viewerContainer.appendChild(this.popupElement);
        closeBtn.addEventListener('click', this.saveClosePopupMenu.bind(this));
        closeBtn.addEventListener('touchend', this.saveClosePopupMenu.bind(this));
        this.popupElement.addEventListener('mousedown', this.onPopupElementMoveStart.bind(this));
        this.popupElement.addEventListener('mousemove', this.onPopupElementMove.bind(this));
        window.addEventListener('mouseup', this.onPopupElementMoveEnd.bind(this));
        this.popupElement.addEventListener('touchstart', this.onPopupElementMoveStart.bind(this));
        this.popupElement.addEventListener('touchmove', this.onPopupElementMove.bind(this));
        window.addEventListener('touchend', this.onPopupElementMoveEnd.bind(this));
        this.noteContentElement.addEventListener('mousedown', function () {
            _this.noteContentElement.focus();
        });
    };
    Annotation.prototype.onPopupElementMoveStart = function (event) {
        if (event.type === 'touchstart') {
            event = event.changedTouches[0];
        }
        if ((event.target.id !== (this.noteContentElement.id) || !(event.target.contains(this.noteContentElement.childNodes[0])))) {
            this.isPopupMenuMoved = true;
            var popupElementClientRect = this.popupElement.getBoundingClientRect();
            this.clientX = event.clientX - popupElementClientRect.left;
            this.clientY = (event.clientY - popupElementClientRect.top) +
                (this.pdfViewerBase.pageSize[this.currentAnnotPageNumber].top * this.pdfViewerBase.getZoomFactor());
        }
    };
    Annotation.prototype.onPopupElementMove = function (event) {
        if (event.type === 'touchmove') {
            event = event.changedTouches[0];
        }
        if (this.isPopupMenuMoved && (event.target.id !== (this.noteContentElement.id) ||
            !(event.target.contains(this.noteContentElement.childNodes[0])))) {
            var left = (event.clientX - this.clientX) + parseFloat(this.popupElement.style.left);
            var top_1 = ((event.clientY - this.clientY) + parseFloat(this.popupElement.style.top));
            this.clientX = event.clientX;
            this.clientY = event.clientY;
            var clientPosition = this.popupElement.getBoundingClientRect();
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + this.currentAnnotPageNumber);
            if (left > parseFloat(pageDiv.style.left) && (left + clientPosition.width) <
                (parseFloat(pageDiv.style.left) + parseFloat(pageDiv.style.width))) {
                this.popupElement.style.left = (left) + 'px';
            }
            else {
                this.popupElement.style.left = parseFloat(this.popupElement.style.left) + 'px';
            }
            if (top_1 > parseFloat(pageDiv.style.top) && (top_1 + clientPosition.height) <
                (parseFloat(pageDiv.style.top) + parseFloat(pageDiv.style.height))) {
                this.popupElement.style.top = (top_1) + 'px';
            }
            else {
                this.popupElement.style.top = parseFloat(this.popupElement.style.top) + 'px';
            }
        }
    };
    Annotation.prototype.onPopupElementMoveEnd = function () {
        this.isPopupMenuMoved = false;
    };
    Annotation.prototype.saveClosePopupMenu = function () {
        if (this.textMarkupAnnotationModule) {
            this.textMarkupAnnotationModule.saveNoteContent(this.currentAnnotPageNumber, this.noteContentElement.innerText);
        }
        this.closePopupMenu();
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.closePopupMenu = function () {
        if (this.popupElement) {
            this.popupElement.parentElement.removeChild(this.popupElement);
            this.popupElement = null;
            this.isPopupNoteVisible = false;
        }
    };
    /**
     * @param {any} event - event
     * @private
     * @returns {void}
     */
    Annotation.prototype.showAnnotationPopup = function (event) {
        if (this.textMarkupAnnotationModule) {
            this.currentAnnotPageNumber = this.getEventPageNumber(event);
            if (this.textMarkupAnnotationModule && (event.target !== (this.noteContentElement) ||
                (event.target.contains(this.noteContentElement.childNodes[0])))) {
                this.hidePopupNote();
                if (!this.popupElement) {
                    this.createTextMarkupPopup();
                    this.popupElement.style.display = 'block';
                    this.authorPopupElement.textContent = this.textMarkupAnnotationModule.currentTextMarkupAnnotation.author;
                    this.modifiedDateElement.textContent = this.getProperDate(this.textMarkupAnnotationModule.currentTextMarkupAnnotation.
                        modifiedDate);
                    this.noteContentElement.textContent = this.textMarkupAnnotationModule.currentTextMarkupAnnotation.note;
                    var clientPosition = this.popupElement.getBoundingClientRect();
                    var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + this.currentAnnotPageNumber);
                    var canvasPosition = pageDiv.getBoundingClientRect();
                    var topPosition = ((event.clientY) - canvasPosition.top) + parseFloat(pageDiv.style.top);
                    var leftPosition = (event.clientX);
                    if ((leftPosition + clientPosition.width) > (parseFloat(pageDiv.style.left) + parseFloat(pageDiv.style.width))) {
                        this.popupElement.style.left = (leftPosition - clientPosition.width) + 'px';
                    }
                    else {
                        this.popupElement.style.left = leftPosition + 'px';
                    }
                    if ((topPosition + clientPosition.height) > (parseFloat(pageDiv.style.top) + parseFloat(pageDiv.style.height))) {
                        this.popupElement.style.top = (topPosition - clientPosition.height) + 'px';
                    }
                    else {
                        this.popupElement.style.top = topPosition + 'px';
                    }
                    this.isPopupNoteVisible = true;
                }
            }
        }
    };
    /**
     * @param {any} args - args
     * @param {boolean} isOpacity - isOpacity
     * @private
     * @returns {void}
     */
    Annotation.prototype.modifyOpacity = function (args, isOpacity) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        var opacityValue = 1;
        if (isOpacity) {
            opacityValue = args / 100;
        }
        else {
            opacityValue = args.value / 100;
        }
        if (currentAnnotation.opacity !== opacityValue) {
            redoClonedObject.opacity = opacityValue;
            this.pdfViewer.nodePropertyChange(currentAnnotation, { opacity: opacityValue });
            if (currentAnnotation.shapeAnnotationType === 'StickyNotes') {
                this.stickyNotesAnnotationModule.updateOpacityValue(currentAnnotation);
            }
            else {
                this.modifyInCollections(currentAnnotation, 'opacity');
            }
            if (currentAnnotation.shapeAnnotationType === 'HandWrittenSignature' || currentAnnotation.shapeAnnotationType === 'SignatureImage' || currentAnnotation.shapeAnnotationType === 'SignatureText') {
                this.pdfViewer.fireSignaturePropertiesChange(currentAnnotation.pageIndex, currentAnnotation.signatureName, currentAnnotation.shapeAnnotationType, false, true, false, clonedObject.opacity, redoClonedObject.opacity);
            }
            else {
                this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
            }
            this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Opacity', '', clonedObject, redoClonedObject);
            this.pdfViewer.renderDrawing();
        }
    };
    /**
     * @param {string} currentColor - currentColor
     * @private
     * @returns {void}
     */
    Annotation.prototype.modifyFontColor = function (currentColor) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.fontColor = currentColor;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { fontColor: currentColor });
        this.modifyInCollections(currentAnnotation, 'fontColor');
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'fontColor', '', clonedObject, redoClonedObject);
        this.pdfViewer.renderDrawing();
    };
    /**
     * @param {string} currentValue - currentValue
     * @private
     * @returns {void}
     */
    Annotation.prototype.modifyFontFamily = function (currentValue) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.fontFamily = currentValue;
        if (this.pdfViewer.freeTextSettings.enableAutoFit) {
            this.updateFontFamilyRenderSize(currentAnnotation, currentValue);
        }
        else {
            this.pdfViewer.nodePropertyChange(currentAnnotation, { fontFamily: currentValue });
        }
        this.modifyInCollections(currentAnnotation, 'fontFamily');
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'fontFamily', '', clonedObject, redoClonedObject);
        this.pdfViewer.renderDrawing();
    };
    /**
     * @param {number} currentValue - currentValue
     * @param {boolean} isInteracted - isInteracted
     * @private
     * @returns {void}
     */
    Annotation.prototype.modifyFontSize = function (currentValue, isInteracted) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.fontSize = currentValue;
        var freeTextAnnotation = this.freeTextAnnotationModule;
        var x = currentAnnotation.bounds.x;
        var y = currentAnnotation.bounds.y;
        currentAnnotation.fontSize = currentValue;
        if (freeTextAnnotation && !freeTextAnnotation.isNewFreeTextAnnot && currentAnnotation.dynamicText !== '') {
            freeTextAnnotation.addInuptElemet({ x: x, y: y }, currentAnnotation);
            if (currentAnnotation) {
                if (currentAnnotation.previousFontSize !== currentValue) {
                    freeTextAnnotation.inputBoxElement.style.height = 'auto';
                    if (isInteracted || this.isFreeTextFontsizeChanged
                        || freeTextAnnotation.inputBoxElement.scrollHeight + 5 > currentAnnotation.bounds.height) {
                        this.isFreeTextFontsizeChanged = false;
                        freeTextAnnotation.inputBoxElement.style.height = freeTextAnnotation.inputBoxElement.scrollHeight + 5 + 'px';
                    }
                    else {
                        freeTextAnnotation.inputBoxElement.style.height = currentAnnotation.bounds.height + 'px';
                    }
                }
                var inputEleHeight = parseFloat(freeTextAnnotation.inputBoxElement.style.height);
                var inputEleWidth = parseFloat(freeTextAnnotation.inputBoxElement.style.width);
                var zoomFactor = this.pdfViewerBase.getZoomFactor();
                inputEleWidth = ((inputEleWidth) / zoomFactor);
                inputEleHeight = ((inputEleHeight) / zoomFactor);
                var heightDiff = (inputEleHeight - currentAnnotation.bounds.height);
                var y_1 = undefined;
                if (heightDiff > 0) {
                    y_1 = currentAnnotation.wrapper.offsetY + (heightDiff / 2);
                    y_1 = y_1 > 0 ? y_1 : undefined;
                }
                else {
                    heightDiff = Math.abs(heightDiff);
                    y_1 = currentAnnotation.wrapper.offsetY - (heightDiff / 2);
                    y_1 = y_1 > 0 ? y_1 : undefined;
                }
                var widthDiff = (inputEleWidth - currentAnnotation.bounds.width);
                var x_1 = undefined;
                if (widthDiff > 0) {
                    x_1 = currentAnnotation.wrapper.offsetX + (widthDiff / 2);
                    x_1 = x_1 > 0 ? x_1 : undefined;
                }
                else {
                    widthDiff = Math.abs(widthDiff);
                    x_1 = currentAnnotation.wrapper.offsetX - (widthDiff / 2);
                }
                currentAnnotation.bounds.width = inputEleWidth;
                currentAnnotation.bounds.height = inputEleHeight;
                this.pdfViewer.nodePropertyChange(currentAnnotation, { fontSize: currentValue, bounds: { width: currentAnnotation.bounds.width, height: currentAnnotation.bounds.height, y: y_1, x: x_1 } });
                this.pdfViewer.renderSelector(currentAnnotation.pageIndex, this.pdfViewer.annotationSelectorSettings);
                currentAnnotation.previousFontSize = currentValue;
            }
            this.modifyInCollections(currentAnnotation, 'fontSize');
            this.modifyInCollections(currentAnnotation, 'bounds');
            this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
            if (isInteracted) {
                this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'fontSize', '', clonedObject, redoClonedObject);
            }
            freeTextAnnotation.inputBoxElement.blur();
        }
        var canvas = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', currentAnnotation.pageIndex);
        this.pdfViewer.drawing.refreshCanvasDiagramLayer(canvas, currentAnnotation.pageIndex);
    };
    /**
     * @param {number} fontSize - font size
     * @private
     * @returns {void}
     */
    Annotation.prototype.handleFontSizeUpdate = function (fontSize) {
        // const fontSize: number = parseFloat(size);
        if (this.pdfViewer.selectedItems.annotations.length === 1 && fontSize) {
            if (this.isUndoRedoAction) {
                this.modifyFontSize(fontSize, false);
            }
            else {
                this.modifyFontSize(fontSize, true);
            }
        }
        else if (this.freeTextAnnotationModule) {
            this.pdfViewer.freeTextSettings.fontSize = fontSize;
            this.freeTextAnnotationModule.updateTextProperties();
        }
    };
    /**
     * @param {string} currentValue - currentValue
     * @private
     * @returns {void}
     */
    Annotation.prototype.modifyTextAlignment = function (currentValue) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        this.pdfViewer.nodePropertyChange(currentAnnotation, { textAlign: currentValue });
        this.modifyInCollections(currentAnnotation, 'textAlign');
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        this.pdfViewer.renderDrawing();
    };
    /**
     * @param {PdfFontModel} fontInfo - fontInfo
     * @param {string} action - action
     * @private
     * @returns {void}
     */
    Annotation.prototype.modifyTextProperties = function (fontInfo, action) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        if (action === 'bold') {
            redoClonedObject.font.isBold = fontInfo.isBold;
        }
        else if (action === 'italic') {
            redoClonedObject.font.isItalic = fontInfo.isItalic;
        }
        else if (action === 'underline') {
            redoClonedObject.font.isUnderline = fontInfo.isUnderline;
            if (redoClonedObject.font.isUnderline && redoClonedObject.font.isStrikeout) {
                redoClonedObject.font.isStrikeout = false;
            }
        }
        else if (action === 'strikeout') {
            redoClonedObject.font.isStrikeout = fontInfo.isStrikeout;
            if (redoClonedObject.font.isUnderline && redoClonedObject.font.isStrikeout) {
                redoClonedObject.font.isUnderline = false;
            }
        }
        this.pdfViewer.nodePropertyChange(currentAnnotation, { font: fontInfo });
        this.modifyInCollections(currentAnnotation, 'textPropertiesChange');
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'textPropertiesChange', '', clonedObject, redoClonedObject);
        this.pdfViewer.renderDrawing();
    };
    /**
     * @param {number} thicknessValue - thicknessValue
     * @private
     * @returns {void}
     */
    Annotation.prototype.modifyThickness = function (thicknessValue) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        if (currentAnnotation.thickness !== thicknessValue) {
            var clonedObject = cloneObject(currentAnnotation);
            var redoClonedObject = cloneObject(currentAnnotation);
            redoClonedObject.thickness = thicknessValue;
            this.pdfViewer.nodePropertyChange(currentAnnotation, { thickness: thicknessValue });
            this.modifyInCollections(currentAnnotation, 'thickness');
            if (currentAnnotation.shapeAnnotationType === 'HandWrittenSignature' || currentAnnotation.shapeAnnotationType === 'SignatureText' || currentAnnotation.shapeAnnotationType === 'SignatureImage') {
                this.pdfViewer.fireSignaturePropertiesChange(currentAnnotation.pageIndex, currentAnnotation.signatureName, currentAnnotation.shapeAnnotationType, false, false, true, clonedObject.thickness, redoClonedObject.thickness);
            }
            else {
                this.triggerAnnotationPropChange(currentAnnotation, false, false, true, false);
            }
            this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Thickness', '', clonedObject, redoClonedObject);
            this.pdfViewer.renderDrawing();
        }
    };
    /**
     * @param {string} color - color
     * @private
     * @returns {void}
     */
    Annotation.prototype.modifyStrokeColor = function (color) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.strokeColor = color;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { strokeColor: color });
        this.modifyInCollections(currentAnnotation, 'stroke');
        if (currentAnnotation.shapeAnnotationType === 'HandWrittenSignature' || currentAnnotation.shapeAnnotationType === 'SignatureText' || currentAnnotation.shapeAnnotationType === 'SignatureImage') {
            this.pdfViewer.fireSignaturePropertiesChange(currentAnnotation.pageIndex, currentAnnotation.signatureName, currentAnnotation.shapeAnnotationType, true, false, false, clonedObject.strokeColor, redoClonedObject.strokeColor);
        }
        else {
            this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
        }
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Stroke', '', clonedObject, redoClonedObject);
        this.pdfViewer.renderDrawing();
    };
    /**
     * @param {string} color -color
     * @private
     * @returns {void}
     */
    Annotation.prototype.modifyFillColor = function (color) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.fillColor = color;
        this.pdfViewer.nodePropertyChange(this.pdfViewer.selectedItems.annotations[0], { fillColor: color });
        this.modifyInCollections(currentAnnotation, 'fill');
        this.triggerAnnotationPropChange(currentAnnotation, true, false, false, false);
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Fill', '', clonedObject, redoClonedObject);
        this.pdfViewer.renderDrawing();
    };
    /**
     * @param {string} dynamicText - dynamicText
     * @param {string} annotName - annotName
     * @private
     * @returns {void}
     */
    Annotation.prototype.modifyDynamicTextValue = function (dynamicText, annotName) {
        var currentAnnotation = null;
        currentAnnotation = this.pdfViewer.annotations.filter(function (s) { return s.annotName === annotName; })[0];
        if (currentAnnotation) {
            var clonedObject = cloneObject(currentAnnotation);
            var redoClonedObject = cloneObject(currentAnnotation);
            currentAnnotation.dynamicText = dynamicText;
            redoClonedObject.dynamicText = dynamicText;
            if (clonedObject.dynamicText === '') {
                clonedObject.dynamicText = this.freeTextAnnotationModule.previousText;
            }
            this.pdfViewer.nodePropertyChange(currentAnnotation, { dynamicText: dynamicText });
            this.pdfViewer.renderSelector(currentAnnotation.pageIndex, currentAnnotation.annotationSelectorSettings);
            if (clonedObject.dynamicText !== redoClonedObject.dynamicText) {
                this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'dynamicText Change', '', clonedObject, redoClonedObject);
                this.modifyInCollections(currentAnnotation, 'dynamicText');
            }
            if (!isNullOrUndefined(this.freeTextAnnotationModule) && this.freeTextAnnotationModule.previousText
                !== currentAnnotation.dynamicText) {
                this.triggerAnnotationPropChange(currentAnnotation, false, false, false, false, false, false, false, true, this.freeTextAnnotationModule.previousText, currentAnnotation.dynamicText);
            }
            this.pdfViewer.renderDrawing();
        }
    };
    /**
     * @param {PdfAnnotationBaseModel} annotationBase - annotationBase
     * @param {string} property - property
     * @private
     * @returns {any} - any
     */
    Annotation.prototype.modifyInCollections = function (annotationBase, property) {
        var returnObj;
        if (annotationBase.measureType === '' || isNullOrUndefined(annotationBase.measureType)) {
            if (annotationBase.shapeAnnotationType === 'FreeText') {
                returnObj = this.freeTextAnnotationModule.modifyInCollection(property, annotationBase.pageIndex, annotationBase);
            }
            else if (annotationBase.shapeAnnotationType === 'HandWrittenSignature' || annotationBase.shapeAnnotationType === 'SignatureText' || annotationBase.shapeAnnotationType === 'SignatureImage') {
                returnObj = this.pdfViewerBase.signatureModule.
                    modifySignatureCollection(property, annotationBase.pageIndex, annotationBase);
            }
            else if (annotationBase.shapeAnnotationType === 'Stamp' || annotationBase.shapeAnnotationType === 'Image') {
                returnObj = this.stampAnnotationModule.modifyInCollection(property, annotationBase.pageIndex, annotationBase, null);
            }
            else if (annotationBase.shapeAnnotationType === 'Ink') {
                returnObj = this.inkAnnotationModule.modifySignatureInkCollection(property, annotationBase.pageIndex, annotationBase);
            }
            else {
                returnObj = this.shapeAnnotationModule.modifyInCollection(property, annotationBase.pageIndex, annotationBase, null);
            }
        }
        else if (annotationBase.measureType === 'Distance' || annotationBase.measureType === 'Perimeter' ||
            annotationBase.measureType === 'Radius' || annotationBase.measureType === 'Area' || annotationBase.measureType === 'Volume') {
            returnObj = this.measureAnnotationModule.modifyInCollection(property, annotationBase.pageIndex, annotationBase);
        }
        if (this.isUndoRedoAction) {
            this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotationBase, null, true);
            if (this.isUndoAction) {
                annotationBase.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
            }
        }
        else {
            if (property !== 'bounds') {
                this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotationBase);
            }
        }
        if (this.isUndoRedoAction && property === 'delete') {
            this.updateAnnotationCollection(annotationBase);
        }
        return returnObj;
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.createPropertiesWindow = function () {
        var _this = this;
        if (!isBlazor()) {
            var elementID = this.pdfViewer.element.id;
            var dialogDiv = createElement('div', { id: elementID + '_properties_window', className: 'e-pv-properties-window' });
            var appearanceTab = this.createAppearanceTab();
            this.pdfViewerBase.pageContainer.appendChild(dialogDiv);
            this.propertiesDialog = new Dialog({
                showCloseIcon: true, closeOnEscape: false, isModal: true, header: this.pdfViewer.localeObj.getConstant('Line Properties'),
                target: this.pdfViewer.element, content: appearanceTab, close: function () {
                    _this.destroyPropertiesWindow();
                }
            });
            if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
                this.propertiesDialog.buttons = [
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('OK'), isPrimary: true }, click: this.onOkClicked.bind(this) },
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel') }, click: this.onCancelClicked.bind(this) }
                ];
            }
            else {
                this.propertiesDialog.buttons = [
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel') }, click: this.onCancelClicked.bind(this) },
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('OK'), isPrimary: true }, click: this.onOkClicked.bind(this) }
                ];
            }
            if (this.pdfViewer.enableRtl) {
                this.propertiesDialog.enableRtl = true;
            }
            this.propertiesDialog.appendTo(dialogDiv);
            if (this.pdfViewer.selectedItems.annotations[0] && this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Line') {
                var fillColor = document.getElementById(this.pdfViewer.element.id + '_properties_fill_color');
                fillColor.disabled = true;
            }
            this.startArrowDropDown.content = this.
                createContent(this.getArrowString(this.pdfViewer.selectedItems.annotations[0].sourceDecoraterShapes)).outerHTML;
            this.endArrowDropDown.content = this.
                createContent(this.getArrowString(this.pdfViewer.selectedItems.annotations[0].taregetDecoraterShapes)).outerHTML;
            this.thicknessBox.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeWidth;
            this.fillColorPicker.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.fill;
            this.refreshColorPicker(this.fillColorPicker);
            this.strokeColorPicker.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeColor;
            this.refreshColorPicker(this.strokeColorPicker);
            this.updateColorInIcon(this.fillDropDown.element, this.fillColorPicker.value);
            this.updateColorInIcon(this.strokeDropDown.element, this.strokeColorPicker.value);
            this.opacitySlider.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.opacity * 100;
            this.updateOpacityIndicator();
            if (parseInt(this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray, 10) >= 3) {
                this.lineStyleDropDown.content = this.createDropDownContent('dashed').outerHTML;
            }
            else if (this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray === '2') {
                this.lineStyleDropDown.content = this.createDropDownContent('dotted').outerHTML;
            }
            else if (this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray === '0') {
                this.lineStyleDropDown.content = this.createDropDownContent('solid').outerHTML;
            }
            this.selectedLineStyle = this.pdfViewer.selectedItems.annotations[0].borderStyle;
            this.selectedLineDashArray = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray;
            if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance') {
                this.leaderLengthBox.value = this.pdfViewer.selectedItems.annotations[0].leaderHeight;
            }
        }
        else {
            var opacityValue = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.opacity * 100;
            var lineStartElement = this.getArrowString(this.pdfViewer.selectedItems.annotations[0].sourceDecoraterShapes);
            var lineEndElement = this.getArrowString(this.pdfViewer.selectedItems.annotations[0].taregetDecoraterShapes);
            var lineStyleElement = void 0;
            if (parseInt(this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray, 10) >= 3) {
                lineStyleElement = 'Dashed';
            }
            else if (this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray === '2') {
                lineStyleElement = 'Dotted';
            }
            else if (this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray === '0') {
                lineStyleElement = 'Solid';
            }
            this.pdfViewer._dotnetInstance.invokeMethodAsync('OpenPropertiesDialog', opacityValue, lineStartElement, lineEndElement, lineStyleElement);
        }
    };
    //Commented unused method - 878987
    // private updatePropertiesWindowInBlazor(): void {
    //     const thicknessElement: any = document.querySelector('#' + this.pdfViewer.element.id + '_line_thickness');
    //     const fillColorElement: any = document.querySelector('#' + this.pdfViewer.element.id + '_properties_fill_color_button');
    //     const strokeColorElement: any = document.querySelector('#' + this.pdfViewer.element.id + '_properties_stroke_color_button');
    //     const leaderLengthElement: any = document.querySelector('#' + this.pdfViewer.element.id + '_properties_leader_length');
    //     thicknessElement.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeWidth;
    //     fillColorElement.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.fill;
    //     strokeColorElement.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeColor;
    //     this.onStrokeColorChange(strokeColorElement.value);
    //     this.onFillColorChange(fillColorElement.value);
    //     if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance') {
    //         leaderLengthElement.value = parseInt(this.pdfViewer.selectedItems.annotations[0].leaderHeight.toString(), 10);
    //     }
    // }
    Annotation.prototype.destroyPropertiesWindow = function () {
        if (this.strokeColorPicker) {
            this.strokeColorPicker.destroy();
            this.strokeColorPicker = null;
        }
        if (this.fillColorPicker) {
            this.fillColorPicker.destroy();
            this.fillColorPicker = null;
        }
        if (this.endArrowDropDown) {
            this.endArrowDropDown.destroy();
            this.endArrowDropDown = null;
        }
        if (this.startArrowDropDown) {
            this.startArrowDropDown.destroy();
            this.startArrowDropDown = null;
        }
        if (this.opacitySlider) {
            this.opacitySlider.destroy();
            this.opacitySlider = null;
        }
        if (this.thicknessBox) {
            this.thicknessBox.destroy();
            this.thicknessBox = null;
        }
        if (this.lineStyleDropDown) {
            this.lineStyleDropDown.destroy();
            this.lineStyleDropDown = null;
        }
        if (this.leaderLengthBox) {
            this.leaderLengthBox.destroy();
            this.leaderLengthBox = null;
        }
        if (this.propertiesDialog) {
            this.propertiesDialog.destroy();
            this.propertiesDialog = null;
        }
        var dialogElement = this.pdfViewerBase.getElement('_properties_window');
        if (dialogElement) {
            dialogElement.parentElement.removeChild(dialogElement);
        }
    };
    Annotation.prototype.refreshColorPicker = function (colorPick) {
        colorPick.setProperties({ 'value': colorPick.value }, true);
        colorPick.refresh();
    };
    Annotation.prototype.createAppearanceTab = function () {
        var _this = this;
        var elementID = this.pdfViewer.element.id;
        var items = [{ text: this.pdfViewer.localeObj.getConstant('None') }, { text: this.pdfViewer.localeObj.getConstant('Open Arrow') }, { text: this.pdfViewer.localeObj.getConstant('Closed Arrow') },
            { text: this.pdfViewer.localeObj.getConstant('Round Arrow') }, { text: this.pdfViewer.localeObj.getConstant('Square Arrow') }, { text: this.pdfViewer.localeObj.getConstant('Diamond Arrow') }];
        var appearanceDiv = createElement('div', { id: elementID + '_properties_appearance' });
        var lineStyleContainer = createElement('div', { className: 'e-pv-properties-line-style-prop' });
        appearanceDiv.appendChild(lineStyleContainer);
        var lineHeadStartElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Start Arrow'), lineStyleContainer, 'text', 'button', true, 'e-pv-properties-line-start', elementID + '_properties_line_start');
        this.startArrowDropDown = new DropDownButton({ items: items, cssClass: 'e-pv-properties-line-start', select: this.onStartArrowHeadStyleSelect.bind(this) }, lineHeadStartElement);
        var lineHeadEndElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('End Arrow'), lineStyleContainer, 'text', 'button', true, 'e-pv-properties-line-end', elementID + '_properties_line_end');
        var borderStyleContainer = createElement('div', { className: 'e-pv-properties-border-style' });
        appearanceDiv.appendChild(borderStyleContainer);
        this.endArrowDropDown = new DropDownButton({ items: items, cssClass: 'e-pv-properties-line-end', select: this.onEndArrowHeadStyleSelect.bind(this) }, lineHeadEndElement);
        var lineStyleElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Line Style'), borderStyleContainer, 'text', 'button', true, 'e-pv-properties-line-style', elementID + '_properties_line_style');
        var dropDownTarget = this.createStyleList();
        this.lineStyleDropDown = new DropDownButton({ cssClass: 'e-pv-properties-line-style', target: dropDownTarget }, lineStyleElement);
        var thicknessElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Line Thickness'), borderStyleContainer, 'text', 'input', true, 'e-pv-properties-line-thickness', elementID + '_properties_thickness');
        this.thicknessBox = new NumericTextBox({ value: 0, format: '## pt', cssClass: 'e-pv-properties-line-thickness', min: 0, max: 12 }, thicknessElement);
        var colorStyleContainer = createElement('div', { className: 'e-pv-properties-color-style' });
        appearanceDiv.appendChild(colorStyleContainer);
        var fillColorElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Fill Color'), colorStyleContainer, 'color', 'button', true, 'e-pv-properties-line-fill-color', elementID + '_properties_fill_color');
        this.fillColorPicker = this.createColorPicker(elementID + '_properties_fill_color', true);
        this.fillColorPicker.change = function (args) {
            var currentColor = (args.currentValue.hex === '') ? '#ffffff00' : args.currentValue.hex;
            _this.fillDropDown.toggle();
            _this.updateColorInIcon(_this.fillDropDown.element, currentColor);
        };
        this.fillDropDown = this.createDropDownButton(fillColorElement, 'e-pv-properties-fill-color-icon', this.fillColorPicker.element.parentElement);
        this.fillDropDown.beforeOpen = this.onFillDropDownBeforeOpen.bind(this);
        this.fillDropDown.open = function () {
            _this.fillColorPicker.refresh();
        };
        var strokeColorElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Line Color'), colorStyleContainer, 'color', 'button', true, 'e-pv-properties-line-stroke-color', elementID + '_properties_stroke_color');
        this.strokeColorPicker = this.createColorPicker(elementID + '_properties_stroke_color', false);
        this.strokeColorPicker.change = function (args) {
            var currentColor = (args.currentValue.hex === '') ? '#ffffff00' : args.currentValue.hex;
            _this.strokeDropDown.toggle();
            _this.updateColorInIcon(_this.strokeDropDown.element, currentColor);
        };
        this.strokeDropDown = this.createDropDownButton(strokeColorElement, 'e-pv-properties-stroke-color-icon', this.strokeColorPicker.element.parentElement);
        this.strokeDropDown.beforeOpen = this.onStrokeDropDownBeforeOpen.bind(this);
        this.strokeDropDown.open = function () {
            _this.strokeColorPicker.refresh();
        };
        var opacityContainer = createElement('div', { className: 'e-pv-properties-opacity-style' });
        appearanceDiv.appendChild(opacityContainer);
        var opacityElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Opacity'), opacityContainer, '', 'div', true, 'e-pv-properties-line-opacity', elementID + '_properties_opacity');
        this.opacitySlider = new Slider({
            type: 'MinRange', max: 100, min: 0, cssClass: 'e-pv-properties-line-opacity', change: function () {
                _this.updateOpacityIndicator();
            }
        }, opacityElement);
        if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance') {
            var lineLengthElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Leader Length'), opacityContainer, 'text', 'input', true, 'e-pv-properties-line-leader-length', elementID + '_properties_leader_length');
            this.leaderLengthBox = new NumericTextBox({ value: 0, format: '## pt', cssClass: 'e-pv-properties-line-leader-length', min: 0, max: 100 }, lineLengthElement);
        }
        return appearanceDiv;
    };
    Annotation.prototype.createContent = function (text) {
        var divElement = createElement('div', { className: 'e-pv-properties-line-style-content' });
        divElement.textContent = text;
        return divElement;
    };
    Annotation.prototype.onStrokeDropDownBeforeOpen = function () {
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.strokeColorPicker.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeColor;
        }
        this.strokeColorPicker.refresh();
    };
    Annotation.prototype.onFillDropDownBeforeOpen = function () {
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.fillColorPicker.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeColor;
        }
        this.fillColorPicker.refresh();
    };
    Annotation.prototype.createStyleList = function () {
        var _this = this;
        var ulElement = createElement('ul');
        document.body.appendChild(ulElement);
        var solidLi = this.createListForStyle('solid');
        solidLi.addEventListener('click', function () {
            _this.setThickness('0', 'solid');
        });
        ulElement.appendChild(solidLi);
        var dottedLi = this.createListForStyle('dotted');
        dottedLi.addEventListener('click', function () {
            _this.setThickness('2', 'dotted');
        });
        ulElement.appendChild(dottedLi);
        var dashedLi = this.createListForStyle('dashed');
        dashedLi.addEventListener('click', function () {
            _this.setThickness('3', 'dashed');
        });
        ulElement.appendChild(dashedLi);
        return ulElement;
    };
    Annotation.prototype.createColorPicker = function (idString, isNoColor) {
        var inputElement = createElement('input', { id: idString + '_target' });
        document.body.appendChild(inputElement);
        var colorPicker = new ColorPicker({
            inline: true, mode: 'Palette', enableOpacity: false, value: '#000000', showButtons: false, modeSwitcher: false,
            noColor: isNoColor
        });
        if (this.pdfViewer.enableRtl) {
            colorPicker.enableRtl = true;
        }
        colorPicker.appendTo(inputElement);
        return colorPicker;
    };
    Annotation.prototype.createDropDownButton = function (element, iconClass, target) {
        var dropDownButton = new DropDownButton({ iconCss: iconClass + ' e-pv-icon', target: target });
        if (this.pdfViewer.enableRtl) {
            dropDownButton.enableRtl = true;
        }
        dropDownButton.appendTo(element);
        return dropDownButton;
    };
    Annotation.prototype.updateColorInIcon = function (element, color) {
        element.childNodes[0].style.borderBottomColor = color;
    };
    /**
     * @param {string} color - color
     * @private
     * @returns {void}
     */
    Annotation.prototype.onFillColorChange = function (color) {
        var colorElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_fill_color_button');
        if (color !== 'transparent') {
            colorElement.children[0].style.borderBottomColor = color;
        }
    };
    /**
     * @param {string} color - color
     * @private
     * @returns {void}
     */
    Annotation.prototype.onStrokeColorChange = function (color) {
        var colorElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_stroke_color_button');
        if (color !== 'transparent') {
            colorElement.children[0].style.borderBottomColor = color;
        }
    };
    Annotation.prototype.setThickness = function (value, style, isBlazor) {
        if (!isBlazor) {
            this.lineStyleDropDown.content = this.createDropDownContent(style).outerHTML;
        }
        this.selectedLineDashArray = value;
        if (value === '0') {
            this.selectedLineStyle = 'Solid';
        }
        else if (value === '2' || value === '3') {
            this.selectedLineStyle = 'Dashed';
        }
    };
    Annotation.prototype.createDropDownContent = function (style) {
        var divElement = createElement('div', { className: 'e-pv-line-styles-content-container' });
        var spanElement = createElement('span', { className: 'e-pv-line-styles-content', styles: 'border-bottom-style:' + style });
        divElement.appendChild(spanElement);
        return divElement;
    };
    Annotation.prototype.createListForStyle = function (style) {
        var liElement = createElement('li', { className: 'e-menu-item' });
        var divElement = createElement('div', { className: 'e-pv-line-styles-container' });
        var spanElement = createElement('span', { className: 'e-pv-line-styles-item', styles: 'border-bottom-style:' + style });
        divElement.appendChild(spanElement);
        liElement.appendChild(divElement);
        return liElement;
    };
    Annotation.prototype.onStartArrowHeadStyleSelect = function (args) {
        this.startArrowDropDown.content = this.createContent(args.item.text).outerHTML;
    };
    Annotation.prototype.onEndArrowHeadStyleSelect = function (args) {
        this.endArrowDropDown.content = this.createContent(args.item.text).outerHTML;
    };
    Annotation.prototype.createInputElement = function (labelText, parentElement, inputType, input, isLabelNeeded, className, idString) {
        var container = createElement('div', { id: idString + '_container', className: className + '-container' });
        if (isLabelNeeded) {
            var label = createElement('div', { id: idString + '_label', className: className + '-label' });
            label.textContent = labelText;
            container.appendChild(label);
        }
        if (this.pdfViewer.localeObj.getConstant('Opacity') === labelText) {
            this.opacityIndicator = createElement('span', { className: 'e-pv-properties-opacity-indicator' });
            container.appendChild(this.opacityIndicator);
        }
        var textBoxInput = createElement(input, { id: idString });
        if (input === 'input') {
            textBoxInput.type = inputType;
        }
        container.appendChild(textBoxInput);
        parentElement.appendChild(container);
        return textBoxInput;
    };
    Annotation.prototype.updateOpacityIndicator = function () {
        this.opacityIndicator.textContent = this.opacitySlider.value + '%';
    };
    /**
     * @param {number} opacityValue - opacityValue
     * @private
     * @returns {void}
     */
    Annotation.prototype.onOkClicked = function (opacityValue) {
        var startArrow;
        var endArrow;
        var thickness;
        var strokeColor;
        var fillColor;
        var opacity;
        if (!isBlazor()) {
            startArrow = this.getArrowTypeFromDropDown(this.startArrowDropDown.content);
            endArrow = this.getArrowTypeFromDropDown(this.endArrowDropDown.content);
            thickness = this.thicknessBox.value;
            strokeColor = this.strokeColorPicker.getValue(this.strokeColorPicker.value, 'hex');
            strokeColor = (strokeColor === '') ? '#ffffff00' : strokeColor;
            fillColor = this.fillColorPicker.getValue(this.fillColorPicker.value, 'hex');
            fillColor = (fillColor === '' || fillColor === '#transp' || this.fillColorPicker.value === '#ffffff00') ? '#ffffff00' : fillColor;
            opacity = this.opacitySlider.value / 100;
        }
        else {
            var lineStartElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_line_start');
            var lineEndElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_line_end');
            var thicknessElement = document.querySelector('#' + this.pdfViewer.element.id + '_line_thickness');
            var lineStyleElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_style');
            var fillColorElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_fill_color_button');
            var strokeColorElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_stroke_color_button');
            var opacityElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_opacity');
            startArrow = this.getArrowTypeFromDropDown(lineStartElement.value, true);
            endArrow = this.getArrowTypeFromDropDown(lineEndElement.value, true);
            thickness = parseInt(thicknessElement.value, 10);
            strokeColor = this.getValue(strokeColorElement.children[0].style.borderBottomColor, 'hex');
            strokeColor = (strokeColor === '') ? '#ffffff00' : strokeColor;
            fillColor = this.getValue(fillColorElement.children[0].style.borderBottomColor, 'hex');
            fillColor = (fillColor === '') ? '#ffffff00' : fillColor;
            if (opacityValue) {
                opacity = (opacityValue) / 100;
            }
            else {
                opacity = opacityElement.value / 100;
            }
            if (lineStyleElement.value) {
                if (lineStyleElement.value === 'Solid') {
                    this.setThickness('0', 'solid', true);
                }
                else if (lineStyleElement.value === 'Dotted') {
                    this.setThickness('2', 'dotted', true);
                }
                else if (lineStyleElement.value === 'Dashed') {
                    this.setThickness('3', 'dashed', true);
                }
            }
        }
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        var newNode = {};
        var isColorChanged = false;
        var isStrokeColorChanged = false;
        var isThicknessChanged = false;
        var isOpacityChanged = false;
        var isLineHeadStartStyleChanged = false;
        var isLineHeadEndStyleChanged = false;
        var isBorderDashArrayChanged = false;
        if (startArrow !== currentAnnotation.sourceDecoraterShapes) {
            newNode.sourceDecoraterShapes = startArrow;
            redoClonedObject.lineHeadStart = this.getArrowString(startArrow);
            isLineHeadStartStyleChanged = true;
        }
        if (endArrow !== currentAnnotation.taregetDecoraterShapes) {
            newNode.taregetDecoraterShapes = endArrow;
            redoClonedObject.lineHeadEnd = this.getArrowString(endArrow);
            isLineHeadEndStyleChanged = true;
        }
        if (thickness !== currentAnnotation.wrapper.children[0].style.strokeWidth) {
            newNode.thickness = thickness;
            redoClonedObject.thickness = thickness;
            isThicknessChanged = true;
        }
        if (strokeColor !== currentAnnotation.wrapper.children[0].style.strokeColor) {
            newNode.strokeColor = strokeColor;
            redoClonedObject.strokeColor = strokeColor;
            isStrokeColorChanged = true;
        }
        if (fillColor !== currentAnnotation.wrapper.children[0].style.fill) {
            newNode.fillColor = fillColor;
            redoClonedObject.fillColor = fillColor;
            isColorChanged = true;
        }
        if (opacity !== currentAnnotation.wrapper.children[0].style.opacity) {
            newNode.opacity = opacity;
            redoClonedObject.opacity = opacity;
            isOpacityChanged = true;
        }
        if (this.selectedLineDashArray !== currentAnnotation.wrapper.children[0].style.strokeDashArray) {
            newNode.borderDashArray = this.selectedLineDashArray;
            newNode.borderStyle = this.selectedLineStyle;
            redoClonedObject.borderDashArray = newNode.borderDashArray;
            redoClonedObject.borderStyle = newNode.borderStyle;
            isBorderDashArrayChanged = true;
        }
        if (!isBlazor()) {
            if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance' && this.leaderLengthBox.value !== this.pdfViewer.selectedItems.annotations[0].leaderHeight) {
                newNode.leaderHeight = this.leaderLengthBox.value;
            }
        }
        else {
            var leaderLengthElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_leader_length');
            if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance' && parseInt(leaderLengthElement.value, 10) !== this.pdfViewer.selectedItems.annotations[0].leaderHeight) {
                newNode.leaderHeight = parseInt(leaderLengthElement.value, 10);
            }
        }
        this.pdfViewer.nodePropertyChange(this.pdfViewer.selectedItems.annotations[0], newNode);
        this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.fill = fillColor;
        this.triggerAnnotationPropChange(this.pdfViewer.selectedItems.annotations[0], isColorChanged, isStrokeColorChanged, isThicknessChanged, isOpacityChanged, isLineHeadStartStyleChanged, isLineHeadEndStyleChanged, isBorderDashArrayChanged);
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'thickness');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'stroke');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'fill');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'opacity');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'dashArray');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'startArrow');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'endArrow');
        if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance') {
            this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'leaderLength');
        }
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Line properties change', '', clonedObject, redoClonedObject);
        this.renderAnnotations(currentAnnotation.pageIndex, null, null, null);
        if (!isBlazor()) {
            this.propertiesDialog.hide();
        }
    };
    Annotation.prototype.onCancelClicked = function () {
        this.propertiesDialog.hide();
    };
    Annotation.prototype.getArrowTypeFromDropDown = function (arrowType, isBlazor) {
        if (!isBlazor) {
            arrowType = arrowType.split('</div>')[0].split('">')[1];
        }
        var arrow = 'None';
        switch (arrowType) {
            case this.pdfViewer.localeObj.getConstant('None'):
                arrow = 'None';
                break;
            case this.pdfViewer.localeObj.getConstant('Open Arrow'):
                arrow = 'OpenArrow';
                break;
            case this.pdfViewer.localeObj.getConstant('Closed Arrow'):
                arrow = 'Arrow';
                break;
            case this.pdfViewer.localeObj.getConstant('Round Arrow'):
                arrow = 'Circle';
                break;
            case this.pdfViewer.localeObj.getConstant('Square Arrow'):
                arrow = 'Square';
                break;
            case this.pdfViewer.localeObj.getConstant('Diamond Arrow'):
                arrow = 'Diamond';
                break;
            case this.pdfViewer.localeObj.getConstant('Butt'):
                arrow = 'Butt';
                break;
        }
        return arrow;
    };
    /**
     * @param {DecoratorShapes} arrow - arrow
     * @private
     * @returns {string}- string
     */
    Annotation.prototype.getArrowString = function (arrow) {
        var arrowType = this.pdfViewer.localeObj.getConstant('None');
        switch (arrow) {
            case 'Arrow':
                arrowType = this.pdfViewer.localeObj.getConstant('Closed');
                break;
            case 'OpenArrow':
                arrowType = this.pdfViewer.localeObj.getConstant('Open Arrow');
                break;
            case 'Circle':
                arrowType = this.pdfViewer.localeObj.getConstant('Round');
                break;
            case 'None':
            case 'Square':
            case 'Diamond':
                arrowType = this.pdfViewer.localeObj.getConstant(arrow);
                break;
            case 'Butt':
                arrowType = this.pdfViewer.localeObj.getConstant('Butt');
                break;
        }
        return arrowType;
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.onAnnotationMouseUp = function () {
        if (this.pdfViewer.selectedItems.annotations.length !== 0) {
            if (this.pdfViewer.toolbar && this.pdfViewer.toolbar.annotationToolbarModule) {
                this.enableBasedOnType();
                this.pdfViewer.toolbar.annotationToolbarModule.selectAnnotationDeleteItem(true);
                if (!Browser.isDevice) {
                    this.pdfViewer.toolbar.annotationToolbarModule.updateAnnnotationPropertyItems();
                }
            }
            if (this.pdfViewer.textSelectionModule && !this.pdfViewer.textSelectionModule.isTextSelection) {
                this.pdfViewerBase.disableTextSelectionMode();
            }
        }
        else {
            if (this.pdfViewer.textSelectionModule && !this.pdfViewerBase.isPanMode && !this.pdfViewer.designerMode) {
                this.pdfViewer.textSelectionModule.enableTextSelectionMode();
            }
            if (this.pdfViewer.toolbar && this.pdfViewer.toolbar.annotationToolbarModule &&
                (!Browser.isDevice || this.pdfViewer.enableDesktopMode)) {
                var isSkip = this.pdfViewer.toolbar.annotationToolbarModule.inkAnnotationSelected;
                if (this.pdfViewer.annotation.freeTextAnnotationModule &&
                    !this.pdfViewer.annotation.freeTextAnnotationModule.isInuptBoxInFocus && !isSkip) {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableAnnotationPropertiesTools(false);
                    this.pdfViewer.toolbar.annotationToolbarModule.enableFreeTextAnnotationPropertiesTools(false);
                }
                this.pdfViewer.toolbar.annotationToolbarModule.updateAnnnotationPropertyItems();
                this.pdfViewer.toolbar.annotationToolbarModule.selectAnnotationDeleteItem(false);
            }
        }
    };
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - pdfAnnotationBase
     * @param {any} event - event
     * @private
     * @returns {void}
     */
    Annotation.prototype.onShapesMouseup = function (pdfAnnotationBase, event) {
        pdfAnnotationBase = !isNullOrUndefined(this.pdfViewer.selectedItems.annotations[0]) ?
            this.pdfViewer.selectedItems.annotations[0] : pdfAnnotationBase;
        var isToolMoved = false;
        if (this.pdfViewerBase.prevPosition.x !== this.pdfViewerBase.currentPosition.x ||
            this.pdfViewerBase.prevPosition.y !== this.pdfViewerBase.currentPosition.y) {
            isToolMoved = true;
        }
        if (pdfAnnotationBase) {
            if (this.textMarkupAnnotationModule && this.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
                this.textMarkupAnnotationModule.currentTextMarkupAnnotation = null;
                this.textMarkupAnnotationModule.selectTextMarkupCurrentPage = null;
            }
            if ((this.pdfViewerBase.tool instanceof NodeDrawingTool ||
                this.pdfViewerBase.tool instanceof LineTool) && !this.pdfViewerBase.tool.dragging) {
                var setting = {
                    opacity: pdfAnnotationBase.opacity, fillColor: pdfAnnotationBase.fillColor, strokeColor: pdfAnnotationBase.strokeColor,
                    thickness: pdfAnnotationBase.thickness, author: pdfAnnotationBase.author, subject: pdfAnnotationBase.subject,
                    modifiedDate: pdfAnnotationBase.modifiedDate
                };
                var index = this.getAnnotationIndex(pdfAnnotationBase.pageIndex, pdfAnnotationBase.id);
                if (this.pdfViewerBase.tool instanceof LineTool) {
                    setting.lineHeadStartStyle = this.getArrowString(pdfAnnotationBase.sourceDecoraterShapes);
                    setting.lineHeadEndStyle = this.getArrowString(pdfAnnotationBase.taregetDecoraterShapes);
                    setting.borderDashArray = pdfAnnotationBase.borderDashArray;
                }
                if (!this.pdfViewerBase.isAnnotationAdded || pdfAnnotationBase.measureType === 'Distance') {
                    if (pdfAnnotationBase.measureType === '' || isNullOrUndefined(pdfAnnotationBase.measureType)) {
                        this.shapeAnnotationModule.
                            renderShapeAnnotations(pdfAnnotationBase, this.pdfViewer.annotation.getEventPageNumber(event));
                    }
                    else if (pdfAnnotationBase.measureType === 'Distance' || pdfAnnotationBase.measureType === 'Perimeter' ||
                        pdfAnnotationBase.measureType === 'Radius') {
                        this.measureAnnotationModule.
                            renderMeasureShapeAnnotations(pdfAnnotationBase, this.pdfViewer.annotation.getEventPageNumber(event));
                    }
                }
                this.pdfViewerBase.updateDocumentEditedProperty(true);
            }
            else if (this.pdfViewerBase.tool instanceof MoveTool || this.pdfViewerBase.tool instanceof ResizeTool) {
                if (isToolMoved) {
                    this.pdfViewerBase.updateDocumentEditedProperty(true);
                }
                if (pdfAnnotationBase.measureType === '' || isNullOrUndefined(pdfAnnotationBase.measureType)) {
                    if (pdfAnnotationBase.shapeAnnotationType === 'FreeText') {
                        this.pdfViewer.annotation.freeTextAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    else if (pdfAnnotationBase.shapeAnnotationType === 'HandWrittenSignature' || pdfAnnotationBase.shapeAnnotationType === 'SignatureImage' || pdfAnnotationBase.shapeAnnotationType === 'SignatureText') {
                        this.pdfViewerBase.signatureModule.modifySignatureCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    else if (pdfAnnotationBase.shapeAnnotationType === 'Ink') {
                        this.inkAnnotationModule.modifySignatureInkCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    else if (pdfAnnotationBase.shapeAnnotationType === 'Stamp' || pdfAnnotationBase.shapeAnnotationType === 'Image') {
                        this.stampAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase, isToolMoved);
                    }
                    else {
                        this.pdfViewer.annotation.shapeAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase, isToolMoved);
                    }
                }
                else if (pdfAnnotationBase.measureType === 'Distance' || pdfAnnotationBase.measureType === 'Perimeter' || pdfAnnotationBase.measureType === 'Radius' || pdfAnnotationBase.measureType === 'Area' || pdfAnnotationBase.measureType === 'Volume') {
                    this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                }
                if (this.pdfViewerBase.tool instanceof ResizeTool) {
                    if (!pdfAnnotationBase.formFieldAnnotationType) {
                        this.triggerAnnotationResize(pdfAnnotationBase);
                    }
                }
                if (this.pdfViewerBase.tool instanceof MoveTool) {
                    if (this.pdfViewerBase.action !== 'Select') {
                        if (!pdfAnnotationBase.formFieldAnnotationType) {
                            this.triggerAnnotationMove(pdfAnnotationBase);
                        }
                    }
                }
            }
            else if (this.pdfViewerBase.tool instanceof ConnectTool) {
                if (isToolMoved) {
                    this.pdfViewerBase.updateDocumentEditedProperty(true);
                }
                if (pdfAnnotationBase.measureType === '' || isNullOrUndefined(pdfAnnotationBase.measureType)) {
                    if ((pdfAnnotationBase.shapeAnnotationType === 'Line' || pdfAnnotationBase.shapeAnnotationType === 'LineWidthArrowHead' || pdfAnnotationBase.shapeAnnotationType === 'Polygon')) {
                        this.pdfViewer.annotation.shapeAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase, isToolMoved);
                    }
                }
                else if (pdfAnnotationBase.measureType === 'Distance' || pdfAnnotationBase.measureType === 'Perimeter' || pdfAnnotationBase.measureType === 'Area' || pdfAnnotationBase.measureType === 'Volume') {
                    if (pdfAnnotationBase.measureType === 'Distance') {
                        this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('leaderLength', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                }
                this.triggerAnnotationResize(pdfAnnotationBase);
            }
            if (this.pdfViewerBase.navigationPane && this.pdfViewerBase.navigationPane.annotationMenuObj && this.pdfViewer.isSignatureEditable && (pdfAnnotationBase.shapeAnnotationType === 'HandWrittenSignature' || pdfAnnotationBase.shapeAnnotationType === 'SignatureText' || pdfAnnotationBase.shapeAnnotationType === 'SignatureImage')) {
                this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export Annotations')], true);
                this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export XFDF')], true);
            }
            if (this.pdfViewer.toolbarModule) {
                if (this.pdfViewer.toolbarModule.annotationToolbarModule && this.pdfViewer.enableAnnotationToolbar) {
                    this.pdfViewer.toolbarModule.annotationToolbarModule.clearTextMarkupMode();
                    if (pdfAnnotationBase.measureType === '' || isNullOrUndefined(pdfAnnotationBase.measureType)) {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.clearMeasureMode();
                    }
                    else if (pdfAnnotationBase.measureType === 'Distance' || pdfAnnotationBase.measureType === 'Perimeter' || pdfAnnotationBase.measureType === 'Area' || pdfAnnotationBase.measureType === 'Volume' || pdfAnnotationBase.measureType === 'Radius') {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.clearShapeMode();
                    }
                    if (this.pdfViewer.selectedItems.annotations.length === 1 &&
                        this.pdfViewer.selectedItems.annotations[0].formFieldAnnotationType === null) {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.enableAnnotationPropertiesTools(true);
                    }
                    if (!isBlazor()) {
                        if (this.pdfViewer.selectedItems.annotations.length === 1 && !this.pdfViewer.designerMode) {
                            this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(true);
                            this.pdfViewer.toolbarModule.annotationToolbarModule.setCurrentColorInPicker();
                            this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                            // eslint-disable-next-line
                            if (!this.pdfViewer.formDesignerModule && pdfAnnotationBase.id != '' && pdfAnnotationBase.id != null && pdfAnnotationBase.id.slice(0, 4) != 'sign') {
                                var id = document.getElementById(pdfAnnotationBase.id);
                                var isFieldReadOnly = id && id.disabled;
                                if (!isFieldReadOnly) {
                                    this.pdfViewer.toolbarModule.annotationToolbarModule.
                                        showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                                }
                                else if (this.pdfViewer.annotation && isFieldReadOnly) {
                                    this.pdfViewer.annotation.clearSelection();
                                }
                            }
                            else {
                                this.pdfViewer.toolbarModule.annotationToolbarModule.
                                    showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                            }
                            if (this.pdfViewer.isAnnotationToolbarVisible && this.pdfViewer.isFormDesignerToolbarVisible) {
                                var formDesignerMainDiv = document.getElementById(this.pdfViewer.element.id + '_formdesigner_toolbar');
                                formDesignerMainDiv.style.display = 'none';
                                if (this.pdfViewer.toolbarModule) {
                                    this.pdfViewer.toolbarModule.formDesignerToolbarModule.isToolbarHidden = false;
                                    this.pdfViewer.toolbarModule.formDesignerToolbarModule.
                                        showFormDesignerToolbar(this.pdfViewer.toolbarModule.formDesignerItem);
                                    this.pdfViewer.toolbarModule.annotationToolbarModule.adjustViewer(true);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - pdfAnnotationBase
     * @param {boolean} isNewlyAdded - isNewlyAdded
     * @private
     * @returns {void}
     */
    Annotation.prototype.updateCalibrateValues = function (pdfAnnotationBase, isNewlyAdded) {
        if (pdfAnnotationBase.measureType === 'Distance') {
            pdfAnnotationBase.notes = updateDistanceLabel(pdfAnnotationBase, pdfAnnotationBase.vertexPoints, this.measureAnnotationModule);
            if (pdfAnnotationBase.enableShapeLabel === true) {
                pdfAnnotationBase.labelContent = pdfAnnotationBase.notes;
            }
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase, isNewlyAdded);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
            this.renderAnnotations(pdfAnnotationBase.pageIndex, null, null, null, null);
        }
        else if (pdfAnnotationBase.measureType === 'Radius') {
            pdfAnnotationBase.notes = updateRadiusLabel(pdfAnnotationBase, this.measureAnnotationModule);
            if (pdfAnnotationBase.enableShapeLabel === true) {
                pdfAnnotationBase.labelContent = pdfAnnotationBase.notes;
            }
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase, isNewlyAdded);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
            this.renderAnnotations(pdfAnnotationBase.pageIndex, null, null, null, null);
        }
        else if (pdfAnnotationBase.measureType === 'Perimeter') {
            pdfAnnotationBase.notes = updatePerimeterLabel(pdfAnnotationBase, pdfAnnotationBase.vertexPoints, this.measureAnnotationModule);
            if (pdfAnnotationBase.enableShapeLabel === true) {
                pdfAnnotationBase.labelContent = pdfAnnotationBase.notes;
            }
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase, isNewlyAdded);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
            this.renderAnnotations(pdfAnnotationBase.pageIndex, null, null, null, null);
        }
        else if (pdfAnnotationBase.measureType === 'Area') {
            pdfAnnotationBase.notes = this.measureAnnotationModule.
                calculateArea(pdfAnnotationBase.vertexPoints, pdfAnnotationBase.id, pdfAnnotationBase.pageIndex);
            if (pdfAnnotationBase.enableShapeLabel === true) {
                pdfAnnotationBase.labelContent = pdfAnnotationBase.notes;
                updateCalibrateLabel(pdfAnnotationBase);
            }
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase, isNewlyAdded);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
            this.renderAnnotations(pdfAnnotationBase.pageIndex, null, null, null, null);
        }
        else if (pdfAnnotationBase.measureType === 'Volume') {
            pdfAnnotationBase.notes = this.measureAnnotationModule.
                calculateVolume(pdfAnnotationBase.vertexPoints, pdfAnnotationBase.id, pdfAnnotationBase.pageIndex);
            if (pdfAnnotationBase.enableShapeLabel === true) {
                pdfAnnotationBase.labelContent = pdfAnnotationBase.notes;
                updateCalibrateLabel(pdfAnnotationBase);
            }
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase, isNewlyAdded);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
            this.renderAnnotations(pdfAnnotationBase.pageIndex, null, null, null, null);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.onAnnotationMouseDown = function () {
        if (this.pdfViewer.selectedItems.annotations.length === 1 &&
            this.pdfViewer.selectedItems.annotations[0].formFieldAnnotationType === null) {
            if (this.pdfViewer.toolbar && this.pdfViewer.toolbar.annotationToolbarModule) {
                if (!isBlazor() && Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                    var commentPanel = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
                    if (commentPanel.style.display === 'none') {
                        if (this.pdfViewer.enableToolbar && this.pdfViewer.enableAnnotationToolbar &&
                            (!isNullOrUndefined(this.pdfViewer.annotationModule.textMarkupAnnotationModule) &&
                                this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation)) {
                            this.pdfViewer.toolbarModule.annotationToolbarModule.createPropertyTools('');
                        }
                        else {
                            if (this.pdfViewer.enableToolbar && this.pdfViewer.enableAnnotationToolbar &&
                                !this.pdfViewerBase.isAddComment) {
                                this.pdfViewer.toolbarModule.annotationToolbarModule.createAnnotationToolbarForMobile();
                                this.pdfViewer.toolbarModule.annotationToolbarModule.
                                    createPropertyTools(this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType);
                                var editIcon = document.getElementById(this.pdfViewer.element.id + '_annotationIcon');
                                if (editIcon && !editIcon.parentElement.classList.contains('e-pv-select')) {
                                    editIcon.parentElement.classList.add('e-pv-select');
                                }
                            }
                        }
                    }
                }
                this.enableBasedOnType();
                this.pdfViewer.toolbar.annotationToolbarModule.selectAnnotationDeleteItem(true);
            }
        }
    };
    Annotation.prototype.enableBasedOnType = function () {
        var isLock = false;
        var annotation = this.pdfViewer.selectedItems.annotations[0];
        if (annotation && annotation.annotationSettings) {
            isLock = annotation.annotationSettings.isLock;
            if (isLock && this.checkAllowedInteractions('PropertyChange', annotation)) {
                isLock = false;
            }
        }
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            if (!isLock) {
                if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Stamp' ||
                    this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Image') {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableStampAnnotationPropertiesTools(true);
                }
                else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'StickyNotes') {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableStampAnnotationPropertiesTools(true);
                }
                else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Path' ||
                    this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'SignatureImage' ||
                    this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'SignatureText') {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableAnnotationPropertiesTools(false);
                }
                else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'FreeText') {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableFreeTextAnnotationPropertiesTools(true);
                }
                else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'HandWrittenSignature') {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableSignaturePropertiesTools(true);
                }
                else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Ink') {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableSignaturePropertiesTools(true);
                }
                else {
                    if (this.pdfViewer.selectedItems.annotations.length === 1 &&
                        this.pdfViewer.selectedItems.annotations[0].formFieldAnnotationType === null) {
                        this.pdfViewer.toolbar.annotationToolbarModule.enableAnnotationPropertiesTools(true);
                    }
                }
            }
        }
        else if ((!isNullOrUndefined(this.pdfViewer.annotationModule.textMarkupAnnotationModule) && !this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) && !(this.pdfViewer.selectedItems.annotations[0].propName === 'annotations') && (Browser.isDevice && !this.pdfViewer.enableDesktopMode)) {
            this.pdfViewer.toolbarModule.annotationToolbarModule.createMobileAnnotationToolbar(true, true);
        }
    };
    Annotation.prototype.getProperDate = function (date) {
        var dateObject = new Date(date.toString());
        if (isNaN(dateObject.getFullYear())) {
            var dateString = date.slice(2, 16);
            dateString = dateString.slice(0, 4) + '/' + dateString.slice(4, 6) + '/' + dateString.slice(6, 8) + ' ' + dateString.slice(8, 10) + ':' + dateString.slice(10, 12) + ':' + dateString.slice(12, 14);
            dateObject = new Date(dateString);
        }
        return (dateObject.getMonth() + 1) + '/' + dateObject.getDate() + '/' + dateObject.getFullYear() + ' ' + dateObject.getHours() + ':' + dateObject.getMinutes() + ':' + dateObject.getSeconds();
    };
    /**
     * @param {IPageAnnotations} pageAnnotations - pageAnnotations
     * @param {number} pageNumber - pageNumber
     * @private
     * @returns {number} - number
     */
    Annotation.prototype.getPageCollection = function (pageAnnotations, pageNumber) {
        var index = null;
        for (var i = 0; i < pageAnnotations.length; i++) {
            if (pageAnnotations[parseInt(i.toString(), 10)].pageIndex === pageNumber) {
                index = i;
                break;
            }
        }
        return index;
    };
    /**
     * @param {any} annotations - annotations
     * @param {string} id - id
     * @private
     * @returns {any} - any
     */
    Annotation.prototype.getAnnotationWithId = function (annotations, id) {
        var annotation;
        for (var i = 0; i < annotations.length; i++) {
            if (id === annotations[parseInt(i.toString(), 10)].id) {
                annotation = annotations[parseInt(i.toString(), 10)];
            }
        }
        return annotation;
    };
    /**
     * @param {any} event - event
     * @private
     * @returns {number} - number
     */
    Annotation.prototype.getEventPageNumber = function (event) {
        var eventTarget = event.target;
        var eventParentElement = event.target.parentElement;
        if (eventTarget.classList.contains('e-pv-hyperlink')) {
            eventTarget = eventParentElement;
        }
        else if (eventParentElement && eventParentElement.classList.contains('foreign-object') && eventParentElement.parentElement && eventParentElement.parentElement.parentElement && eventParentElement.parentElement.parentElement.parentElement) {
            eventTarget = eventParentElement.parentElement.parentElement.parentElement;
        }
        else if (eventTarget.classList.contains('e-pdfviewer-formFields')) {
            eventTarget = eventParentElement;
        }
        var pageString;
        if (eventTarget) {
            pageString = eventTarget.id.split('_text_')[1] || eventTarget.id.split('_textLayer_')[1] || eventTarget.id.split('_annotationCanvas_')[1] || eventTarget.id.split('_pageDiv_')[1];
        }
        if (isNaN(parseInt(pageString, 10))) {
            event = this.pdfViewerBase.annotationEvent && this.pdfViewerBase.annotationEvent.target.id === eventTarget.id ?
                this.pdfViewerBase.annotationEvent : event;
            eventTarget = event.target;
            if (eventTarget && eventTarget.id) {
                pageString = eventTarget.id.split('_text_')[1] || eventTarget.id.split('_textLayer_')[1] || eventTarget.id.split('_annotationCanvas_')[1] || eventTarget.id.split('_pageDiv_')[1];
            }
            if (!isNullOrUndefined(this.pdfViewerBase.annotationEvent) &&
                (!isNullOrUndefined(this.pdfViewerBase.annotationEvent.target)) && (isNullOrUndefined(pageString))) {
                // eslint-disable-next-line
                pageString = this.pdfViewerBase.annotationEvent.target.id.split('_textLayer_')[1];
            }
        }
        return parseInt(pageString, 10);
    };
    /**
     * @param {any} commentsAnnotations - commentsAnnotations
     * @param {any} parentAnnotation - parentAnnotation
     * @param {string} author - author
     * @private
     * @returns {any} - any
     */
    Annotation.prototype.getAnnotationComments = function (commentsAnnotations, parentAnnotation, author) {
        var newArray = [];
        var annotationObject = null;
        if (commentsAnnotations) {
            if (commentsAnnotations.length > 0) {
                for (var i = 0; i < commentsAnnotations.length; i++) {
                    var annotation = commentsAnnotations[parseInt(i.toString(), 10)];
                    annotationObject = {
                        shapeAnnotationType: 'sticky', author: annotation.Author, modifiedDate: annotation.ModifiedDate, note: annotation.Note, state: annotation.state, stateModel: annotation.stateModel,
                        comments: [], review: { state: annotation.State, stateModel: annotation.StateModel,
                            modifiedDate: annotation.ModifiedDate, author: annotation.Author },
                        annotName: annotation.AnnotName, parentId: parentAnnotation.AnnotName, subject: annotation.Subject,
                        isLock: annotation.IsLock
                    };
                    newArray[newArray.length] = annotationObject;
                }
            }
        }
        return newArray;
    };
    Annotation.prototype.getRandomNumber = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var random = Math.random() * 16 | 0;
            var v = c === 'x' ? random : (random & 0x3 | 0x8);
            return random.toString(16);
        });
    };
    /**
     * @private
     * @returns {string} - string
     */
    Annotation.prototype.createGUID = function () {
        return this.getRandomNumber();
    };
    /**
     * Generates a canvas element with mix-blend mode to highlight annotations.
     * @param {HTMLElement} pageDiv - pageDiv
     * @param {number} pageWidth - pageWidth
     * @param {number} pageHeight - pageHeight
     * @param {number} pageNumber - pageNumber
     * @param {string} displayMode - displayMode
     * @private
     * @returns {HTMLElement} - htmlelement
     */
    Annotation.prototype.createBlendAnnotationsIntoCanvas = function (pageDiv, pageWidth, pageHeight, pageNumber, displayMode) {
        var canvas = this.pdfViewerBase.getElement('_blendAnnotationsIntoCanvas_' + pageNumber);
        if (canvas) {
            this.pdfViewerBase.updateCanvas(canvas, pageWidth, pageHeight, pageNumber);
            return canvas;
        }
        else {
            var annotationCanvas = createElement('canvas', { id: this.pdfViewer.element.id + '_blendAnnotationsIntoCanvas_' + pageNumber, className: 'e-pv-annotation-canvas' });
            this.pdfViewerBase.updateCanvas(annotationCanvas, pageWidth, pageHeight, pageNumber);
            annotationCanvas.style['mixBlendMode'] = 'multiply';
            pageDiv.appendChild(annotationCanvas);
            return annotationCanvas;
        }
    };
    /**
     * @param {number} width - width
     * @param {number} height - height
     * @param {number} pageNumber - pageNumber
     * @private
     * @returns {void}
     */
    Annotation.prototype.resizeAnnotations = function (width, height, pageNumber) {
        var _this = this;
        // Styles need to be applied to both canvases. The 'blendAnnotationsIntoCanvas' is used for highlight annotations.
        ['_annotationCanvas_', '_blendAnnotationsIntoCanvas_'].forEach(function (id) {
            var canvas = _this.pdfViewerBase.getElement(id + pageNumber);
            if (canvas) {
                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';
                _this.pdfViewerBase.applyElementStyles(canvas, pageNumber);
            }
        });
    };
    /**
     * @param {number} pageNumber - pageNumber
     * @private
     * @returns {void}
     */
    Annotation.prototype.clearAnnotationCanvas = function (pageNumber) {
        var _this = this;
        var zoom = this.pdfViewerBase.getZoomFactor();
        var ratio = this.pdfViewerBase.getZoomRatio(zoom);
        // Styles need to be applied to both canvases. The 'blendAnnotationsIntoCanvas' is used for highlight annotations.
        var canvasIds = ['_annotationCanvas_', '_blendAnnotationsIntoCanvas_'];
        canvasIds.forEach(function (id) {
            var canvas = _this.pdfViewerBase.getElement(id + pageNumber);
            if (canvas) {
                var width = _this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)].width;
                var height = _this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)].height;
                canvas.width = width * ratio;
                canvas.height = height * ratio;
                canvas.style.width = width * zoom + 'px';
                canvas.style.height = height * zoom + 'px';
            }
        });
    };
    /**
     * @param {number} pageNumber - pageNumber
     * @param {any} shapeAnnotation - shapeAnnotation
     * @param {any} measureShapeAnnotation - measureShapeAnnotation
     * @param {any} textMarkupAnnotation - textMarkupAnnotation
     * @param {any} canvas - canvas
     * @param {boolean} isImportAnnotations - isImportAnnotations
     * @param {boolean} isAnnotOrderAction - isAnnotOrderAction
     * @param {any} freeTextAnnotation - freeTextAnnotation
     * @param {any} inkAnnotation - inkAnnotation
     * @private
     * @returns {void}
     */
    Annotation.prototype.renderAnnotations = function (pageNumber, shapeAnnotation, measureShapeAnnotation, textMarkupAnnotation, canvas, isImportAnnotations, isAnnotOrderAction, freeTextAnnotation, inkAnnotation) {
        this.clearAnnotationCanvas(pageNumber);
        if (this.shapeAnnotationModule) {
            if (isImportAnnotations) {
                this.shapeAnnotationModule.renderShapeAnnotations(shapeAnnotation, pageNumber, true);
            }
            else {
                this.shapeAnnotationModule.renderShapeAnnotations(shapeAnnotation, pageNumber, null, isAnnotOrderAction);
            }
        }
        if (this.measureAnnotationModule) {
            if (isImportAnnotations) {
                this.measureAnnotationModule.renderMeasureShapeAnnotations(measureShapeAnnotation, pageNumber, true);
            }
            else {
                this.measureAnnotationModule.renderMeasureShapeAnnotations(measureShapeAnnotation, pageNumber, null, isAnnotOrderAction);
            }
        }
        if (this.freeTextAnnotationModule) {
            if (isImportAnnotations) {
                this.freeTextAnnotationModule.renderFreeTextAnnotations(freeTextAnnotation, pageNumber, true);
            }
            else {
                this.freeTextAnnotationModule.renderFreeTextAnnotations(freeTextAnnotation, pageNumber, null, isAnnotOrderAction);
            }
        }
        if (this.inkAnnotationModule) {
            if (isImportAnnotations) {
                this.inkAnnotationModule.renderExistingInkSignature(inkAnnotation, pageNumber, true);
            }
            else {
                this.inkAnnotationModule.renderExistingInkSignature(inkAnnotation, pageNumber, null, isAnnotOrderAction);
            }
        }
        this.pdfViewer.drawing.refreshCanvasDiagramLayer(canvas, pageNumber);
        var highlighCanvas = this.pdfViewerBase.getElement('_blendAnnotationsIntoCanvas_' + pageNumber);
        if (highlighCanvas) {
            this.pdfViewer.drawing.refreshCanvasDiagramLayer(canvas, pageNumber);
        }
        if (!this.pdfViewerBase.isInkAdded && this.pdfViewer.tool === 'Ink' && this.pdfViewer.currentPageNumber - 1 === pageNumber) {
            var currentcanvas = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', (this.pdfViewer.currentPageNumber - 1));
            var zoom = this.pdfViewerBase.getZoomFactor();
            var ratio = this.pdfViewerBase.getWindowDevicePixelRatio();
            var context = currentcanvas.getContext('2d');
            var thickness = this.pdfViewer.inkAnnotationSettings.thickness ? this.pdfViewer.inkAnnotationSettings.thickness : 1;
            var opacity = this.pdfViewer.inkAnnotationSettings.opacity ? this.pdfViewer.inkAnnotationSettings.opacity : 1;
            var strokeColor = this.pdfViewer.inkAnnotationSettings.strokeColor ? this.pdfViewer.inkAnnotationSettings.strokeColor : '#ff0000';
            if (!Browser.isDevice || (Browser.isDevice && zoom <= 0.7)) {
                context.setTransform(ratio, 0, 0, ratio, 0, 0);
            }
            context.beginPath();
            context.lineJoin = 'round';
            context.lineCap = 'round';
            context.lineWidth = thickness * zoom > 1 ? thickness * zoom : thickness;
            context.strokeStyle = strokeColor;
            context.globalAlpha = opacity;
            var collectionData = processPathData(this.pdfViewer.annotationModule.inkAnnotationModule.updateInkDataWithZoom());
            var csData = splitArrayCollection(collectionData);
            for (var j = 0; j < csData.length; j++) {
                var pathValue = csData[parseInt(j.toString(), 10)];
                switch (pathValue.command) {
                    case 'M':
                        context.moveTo(pathValue.x, pathValue.y);
                        break;
                    case 'L':
                        context.lineTo(pathValue.x, pathValue.y);
                        break;
                    default:
                        break;
                }
            }
            context.stroke();
            context.closePath();
            if (!isNullOrUndefined(this.pdfViewer.toolbarModule) &&
                !isNullOrUndefined(this.pdfViewer.toolbarModule.annotationToolbarModule)) {
                this.pdfViewer.toolbar.annotationToolbarModule.inkAnnotationSelected = true;
            }
        }
        if (this.textMarkupAnnotationModule) {
            if (isImportAnnotations) {
                this.textMarkupAnnotationModule.renderTextMarkupAnnotationsInPage(textMarkupAnnotation, pageNumber, true);
            }
            else {
                this.textMarkupAnnotationModule.renderTextMarkupAnnotationsInPage(textMarkupAnnotation, pageNumber);
            }
        }
    };
    /**
     * @param {number} pageNumber - pageNumber
     * @param {any} annotation - annotation
     * @param {string} annotationId - annotationId
     * @private
     * @returns {number} - number
     */
    Annotation.prototype.storeAnnotations = function (pageNumber, annotation, annotationId) {
        // let annotationId: string = '_annotations_textMarkup';
        // if (annotation is ITextMarkupAnnotation) {
        //     annotationId = '_annotations_textMarkup';
        // } else if (annotation as IShapeAnnotation) {
        //     annotationId = '_annotations_shape';
        // } else {
        //     annotationId = '_annotations_stamp';
        // }
        var sessionSize = PdfViewerBase.sessionStorageManager.getWindowSessionStorageSize();
        if (sessionSize > 4500) {
            this.clearAnnotationStorage();
            this.pdfViewerBase.isStorageExceed = true;
            if (!(this.pdfViewerBase.isFormStorageExceed)) {
                if (this.pdfViewer.formFieldsModule) {
                    this.pdfViewer.formFieldsModule.clearFormFieldStorage();
                }
            }
        }
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + annotationId);
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + annotationId];
        }
        var index = 0;
        if (!storeObject) {
            this.storeAnnotationCollections(annotation, pageNumber);
            var pageAnnotation = { pageIndex: pageNumber, annotations: [] };
            pageAnnotation.annotations.push(annotation);
            index = pageAnnotation.annotations.indexOf(annotation);
            var annotationCollection = [];
            annotationCollection.push(pageAnnotation);
            var annotationStringified = JSON.stringify(annotationCollection);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + annotationId] = annotationStringified;
            }
            else {
                PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + annotationId, annotationStringified);
            }
        }
        else {
            this.storeAnnotationCollections(annotation, pageNumber);
            var annotObject_1 = JSON.parse(storeObject);
            if (!this.pdfViewerBase.isStorageExceed) {
                PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + annotationId);
            }
            var pageIndex_1 = this.pdfViewer.annotationModule.getPageCollection(annotObject_1, pageNumber);
            if (pageIndex_1 != null && annotObject_1[parseInt(pageIndex_1.toString(), 10)]) {
                annotObject_1[parseInt(pageIndex_1.toString(), 10)].
                    annotations.filter(function (item, index) {
                    if (item.annotName === annotation.annotName) {
                        annotObject_1[parseInt(pageIndex_1.toString(), 10)].annotations.splice(index, 1);
                    }
                });
                annotObject_1[parseInt(pageIndex_1.toString(), 10)].annotations.push(annotation);
                index = annotObject_1[parseInt(pageIndex_1.toString(), 10)].annotations.indexOf(annotation);
            }
            else {
                var markupAnnotation = { pageIndex: pageNumber, annotations: [] };
                markupAnnotation.annotations.push(annotation);
                index = markupAnnotation.annotations.indexOf(annotation);
                annotObject_1.push(markupAnnotation);
            }
            var annotationStringified = JSON.stringify(annotObject_1);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + annotationId] = annotationStringified;
            }
            else {
                PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + annotationId, annotationStringified);
            }
        }
        return index;
    };
    /**
     * @param {string} type - type
     * @private
     * @returns {DecoratorShapes}- decorateshapes
     */
    Annotation.prototype.getArrowType = function (type) {
        var decoratorShapes = 'None';
        switch (type) {
            case 'ClosedArrow':
            case 'Closed':
                decoratorShapes = 'Arrow';
                break;
            case 'OpenArrow':
            case 'Open':
                decoratorShapes = 'OpenArrow';
                break;
            case 'Square':
                decoratorShapes = 'Square';
                break;
            case 'Circle':
            case 'Round':
                decoratorShapes = 'Circle';
                break;
            case 'Diamond':
                decoratorShapes = 'Diamond';
                break;
            case 'Butt':
                decoratorShapes = 'Butt';
                break;
            case 'Slash':
                // decoratorShapes = 'Slash';
                break;
        }
        return decoratorShapes;
    };
    /**
     * @param {DecoratorShapes} arrow - arrow
     * @private
     * @returns {string}- string
     */
    Annotation.prototype.getArrowTypeForCollection = function (arrow) {
        var arrowType;
        switch (arrow) {
            case 'Arrow':
                arrowType = 'ClosedArrow';
                break;
            case 'OpenArrow':
            case 'Square':
            case 'Circle':
            case 'Diamond':
            case 'None':
                arrowType = arrow.toString();
                break;
            case 'Butt':
                arrowType = 'Butt';
                break;
        }
        return arrowType;
    };
    /**
     * @param {any} bound - bound
     * @param {number} pageIndex - pageIndex
     * @private
     * @returns {any} - any
     */
    Annotation.prototype.getBounds = function (bound, pageIndex) {
        var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
        if (pageDetails) {
            if (pageDetails.rotation === 1) {
                return { left: bound.top, top: pageDetails.width - (bound.left + bound.width), width: bound.height, height: bound.width };
            }
            else if (pageDetails.rotation === 2) {
                return { left: pageDetails.width - bound.left - bound.width, top: pageDetails.height - bound.top - bound.height,
                    width: bound.width, height: bound.height };
            }
            else if (pageDetails.rotation === 3) {
                return { left: pageDetails.height - bound.top - bound.height, top: bound.left, width: bound.height, height: bound.width };
            }
            else {
                return bound;
            }
        }
        else {
            return bound;
        }
    };
    /**
     * @param {any} bound - bound
     * @param {number} pageIndex - pageIndex
     * @private
     * @returns {any} - any
     */
    Annotation.prototype.getInkBounds = function (bound, pageIndex) {
        var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
        if (pageDetails) {
            if (pageDetails.rotation === 1) {
                return { x: bound.y, y: pageDetails.width - (bound.x + bound.width), width: bound.height, height: bound.width };
            }
            else if (pageDetails.rotation === 2) {
                return { x: pageDetails.width - bound.x - bound.width, y: pageDetails.height - bound.y - bound.height,
                    width: bound.width, height: bound.height };
            }
            else if (pageDetails.rotation === 3) {
                return { x: pageDetails.height - bound.y - bound.height, y: bound.x, width: bound.height, height: bound.width };
            }
            else {
                return bound;
            }
        }
        else {
            return bound;
        }
    };
    /**
     * @param {any} points - points
     * @param {number} pageIndex - pageIndex
     * @private
     * @returns {any} - any
     */
    Annotation.prototype.getVertexPoints = function (points, pageIndex) {
        if (points) {
            var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
            if (pageDetails.rotation === 1) {
                var points1 = [];
                for (var i = 0; i < points.length; i++) {
                    var point = { x: points[parseInt(i.toString(), 10)].y,
                        y: pageDetails.width - points[parseInt(i.toString(), 10)].x };
                    points1.push(point);
                }
                return points1;
            }
            else if (pageDetails.rotation === 2) {
                var points2 = [];
                for (var i = 0; i < points.length; i++) {
                    var point = { x: pageDetails.width - points[parseInt(i.toString(), 10)].x,
                        y: pageDetails.height - points[parseInt(i.toString(), 10)].y };
                    points2.push(point);
                }
                return points2;
            }
            else if (pageDetails.rotation === 3) {
                var points3 = [];
                for (var i = 0; i < points.length; i++) {
                    var point = { x: pageDetails.height - points[parseInt(i.toString(), 10)].y,
                        y: points[parseInt(i.toString(), 10)].x };
                    points3.push(point);
                }
                return points3;
            }
            else {
                return points;
            }
        }
    };
    /**
     * @param {number} pageIndex - pageIndex
     * @param {any} shapeAnnotations - shapeAnnotations
     * @param {string} idString - idString
     * @private
     * @returns {any} - any
     */
    Annotation.prototype.getStoredAnnotations = function (pageIndex, shapeAnnotations, idString) {
        var annotationCollection;
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + idString);
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + idString];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageIndex);
            if (index != null && annotObject[parseInt(index.toString(), 10)]) {
                annotationCollection = annotObject[parseInt(index.toString(), 10)].annotations;
            }
            else {
                annotationCollection = null;
            }
        }
        else {
            annotationCollection = null;
        }
        return annotationCollection;
    };
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - pdfAnnotationBase
     * @param {boolean} isColor - isColor
     * @param {boolean} isStroke - isStroke
     * @param {boolean} isThickness - isThickness
     * @param {boolean} isOpacity - isOpacity
     * @param {boolean} isLineStart - isLineStart
     * @param {boolean} isLineEnd - isLineEnd
     * @param {boolean} isDashArray - isDashArray
     * @param {boolean} isFreeText - isFreeText
     * @param {string} previousText - previousText
     * @param {string} currentText - currentText
     * @private
     * @returns {void}
     */
    Annotation.prototype.triggerAnnotationPropChange = function (pdfAnnotationBase, isColor, isStroke, isThickness, isOpacity, isLineStart, isLineEnd, isDashArray, isFreeText, previousText, currentText) {
        var index = this.getAnnotationIndex(pdfAnnotationBase.pageIndex, pdfAnnotationBase.id);
        var type = this.getAnnotationType(pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.measureType);
        var eventArgs = { name: 'annotationPropertiesChange', pageIndex: pdfAnnotationBase.pageIndex, annotationId: pdfAnnotationBase.annotName, annotationType: type, isColorChanged: isColor, isOpacityChanged: isOpacity, isThicknessChanged: isThickness, isStrokeColorChanged: isStroke };
        if (isFreeText) {
            eventArgs.isFreeTextChanged = isFreeText;
            eventArgs.previousText = previousText;
            eventArgs.currentText = currentText;
        }
        if (isLineStart) {
            eventArgs.isLineHeadStartStyleChanged = isLineStart;
        }
        if (isLineEnd) {
            eventArgs.isLineHeadEndStyleChanged = isLineEnd;
        }
        if (isDashArray) {
            eventArgs.isBorderDashArrayChanged = isDashArray;
        }
        this.pdfViewer.trigger('annotationPropertiesChange', eventArgs);
    };
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - It describes about the pdf annotation base
     * @private
     * @returns {void}
     */
    Annotation.prototype.triggerAnnotationAdd = function (pdfAnnotationBase) {
        var setting = {
            opacity: pdfAnnotationBase.opacity, fillColor: pdfAnnotationBase.fillColor, strokeColor: pdfAnnotationBase.strokeColor,
            thickness: pdfAnnotationBase.thickness, author: pdfAnnotationBase.author, subject: pdfAnnotationBase.subject,
            modifiedDate: pdfAnnotationBase.modifiedDate
        };
        var bounds = { left: pdfAnnotationBase.wrapper.bounds.x, top: pdfAnnotationBase.wrapper.bounds.y,
            width: pdfAnnotationBase.wrapper.bounds.width, height: pdfAnnotationBase.wrapper.bounds.height };
        var type = this.getAnnotationType(pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.measureType);
        if (type === 'Line' || type === 'Arrow' || type === 'Distance' || type === 'Perimeter') {
            setting.lineHeadStartStyle = this.getArrowString(pdfAnnotationBase.sourceDecoraterShapes);
            setting.lineHeadEndStyle = this.getArrowString(pdfAnnotationBase.taregetDecoraterShapes);
            setting.borderDashArray = pdfAnnotationBase.borderDashArray;
        }
        var labelSettings;
        if (this.pdfViewer.enableShapeLabel) {
            labelSettings = {
                fontColor: pdfAnnotationBase.fontColor, fontSize: pdfAnnotationBase.fontSize, fontFamily: pdfAnnotationBase.fontFamily,
                opacity: pdfAnnotationBase.labelOpacity, labelContent: pdfAnnotationBase.labelContent,
                fillColor: pdfAnnotationBase.labelFillColor
            };
            this.pdfViewer.fireAnnotationAdd(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, type, bounds, setting, null, null, null, labelSettings);
        }
        else {
            this.pdfViewer.fireAnnotationAdd(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, type, bounds, setting);
        }
    };
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - pdfAnnotationBase
     * @private
     * @returns {void}
     */
    Annotation.prototype.triggerAnnotationResize = function (pdfAnnotationBase) {
        var setting = {
            opacity: pdfAnnotationBase.opacity, fillColor: pdfAnnotationBase.fillColor, strokeColor: pdfAnnotationBase.strokeColor,
            thickness: pdfAnnotationBase.thickness, author: pdfAnnotationBase.author, subject: pdfAnnotationBase.subject,
            modifiedDate: pdfAnnotationBase.modifiedDate
        };
        var annotationBounds = pdfAnnotationBase.bounds;
        var currentPosition = { left: annotationBounds.x, top: annotationBounds.y, x: annotationBounds.x,
            y: annotationBounds.y, width: annotationBounds.width, height: annotationBounds.height };
        var previousPosition = { left: annotationBounds.oldProperties.x, top: annotationBounds.oldProperties.y,
            width: annotationBounds.oldProperties.width, height: annotationBounds.oldProperties.height };
        var type = this.getAnnotationType(pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.measureType);
        if (type === 'Line' || type === 'Arrow' || type === 'Distance' || type === 'Perimeter') {
            setting.lineHeadStartStyle = this.getArrowString(pdfAnnotationBase.sourceDecoraterShapes);
            setting.lineHeadEndStyle = this.getArrowString(pdfAnnotationBase.taregetDecoraterShapes);
            setting.borderDashArray = pdfAnnotationBase.borderDashArray;
        }
        var labelSettings;
        if (this.pdfViewer.enableShapeLabel && (pdfAnnotationBase.shapeAnnotationType !== 'HandWrittenSignature')) {
            labelSettings = {
                fontColor: pdfAnnotationBase.fontColor, fontSize: pdfAnnotationBase.fontSize, fontFamily: pdfAnnotationBase.fontFamily,
                opacity: pdfAnnotationBase.labelOpacity, labelContent: pdfAnnotationBase.labelContent,
                fillColor: pdfAnnotationBase.labelFillColor, notes: pdfAnnotationBase.notes
            };
            this.pdfViewer.fireAnnotationResize(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, type, currentPosition, setting, null, null, null, labelSettings);
        }
        else {
            if (pdfAnnotationBase.shapeAnnotationType === 'HandWrittenSignature' || pdfAnnotationBase.shapeAnnotationType === 'SignatureText' || pdfAnnotationBase.shapeAnnotationType === 'SignatureImage') {
                this.pdfViewer.fireSignatureResize(pdfAnnotationBase.pageIndex, pdfAnnotationBase.signatureName, pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.opacity, pdfAnnotationBase.strokeColor, pdfAnnotationBase.thickness, currentPosition, previousPosition);
            }
            else {
                this.pdfViewer.fireAnnotationResize(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, type, currentPosition, setting);
            }
        }
    };
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - pdfAnnotationBase
     * @param {boolean} isMoving - isMoving
     * @private
     * @returns {void}
     */
    Annotation.prototype.triggerAnnotationMove = function (pdfAnnotationBase, isMoving) {
        var setting = {
            opacity: pdfAnnotationBase.opacity, fillColor: pdfAnnotationBase.fillColor, strokeColor: pdfAnnotationBase.strokeColor,
            thickness: pdfAnnotationBase.thickness, author: pdfAnnotationBase.author, subject: pdfAnnotationBase.subject,
            modifiedDate: pdfAnnotationBase.modifiedDate
        };
        var annotationBounds = pdfAnnotationBase.bounds;
        var currentPosition = { left: annotationBounds.x, top: annotationBounds.y,
            x: annotationBounds.x, y: annotationBounds.y, width: annotationBounds.width, height: annotationBounds.height };
        var previousPosition = { left: annotationBounds.oldProperties.x ?
                annotationBounds.oldProperties.x : annotationBounds.x, top: annotationBounds.oldProperties.y ?
                annotationBounds.oldProperties.y : annotationBounds.y, width: annotationBounds.width, height: annotationBounds.height };
        var type = this.getAnnotationType(pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.measureType);
        if (type === 'Line' || type === 'Arrow' || type === 'Distance' || type === 'Perimeter') {
            setting.lineHeadStartStyle = this.getArrowString(pdfAnnotationBase.sourceDecoraterShapes);
            setting.lineHeadEndStyle = this.getArrowString(pdfAnnotationBase.taregetDecoraterShapes);
            setting.borderDashArray = pdfAnnotationBase.borderDashArray;
        }
        if (pdfAnnotationBase.shapeAnnotationType === 'HandWrittenSignature' || pdfAnnotationBase.shapeAnnotationType === 'SignatureText' || pdfAnnotationBase.shapeAnnotationType === 'SignatureImage') {
            this.pdfViewer.fireSignatureMove(pdfAnnotationBase.pageIndex, pdfAnnotationBase.signatureName, pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.opacity, pdfAnnotationBase.strokeColor, pdfAnnotationBase.thickness, previousPosition, currentPosition);
        }
        else {
            if (isMoving) {
                this.pdfViewer.fireAnnotationMoving(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, type, setting, previousPosition, currentPosition);
            }
            else {
                this.pdfViewer.fireAnnotationMove(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, type, setting, previousPosition, currentPosition);
            }
        }
    };
    /**
     * @param {any} annotationId - annotationId
     * @param {number} pageNumber - pageNumber
     * @param {any} annotation - annotation
     * @param {any} annotationCollection - annotationCollection
     * @param {boolean} isDblClick - isDblClick
     * @param {boolean} isSelected - isSelected
     * @private
     * @returns {void}
     */
    Annotation.prototype.annotationSelect = function (annotationId, pageNumber, annotation, annotationCollection, isDblClick, isSelected) {
        var annotSettings;
        if (annotation.shapeAnnotationType === 'textMarkup') {
            annotSettings = { type: 'TextMarkup', subType: annotation.subject, opacity: annotation.opacity, color: annotation.color, textMarkupContent: annotation.textMarkupContent, textMarkupStartIndex: annotation.textMarkupStartIndex, textMarkupEndIndex: annotation.textMarkupEndIndex, customData: annotation.customData };
        }
        else if (annotation.shapeAnnotationType === 'StickyNotes') {
            annotSettings = { type: 'StickyNotes', opacity: annotation.opacity, customData: annotation.customData };
        }
        else if (annotation.shapeAnnotationType === 'Stamp' || annotation.shapeAnnotationType === 'Image') {
            annotSettings = { type: 'Stamp', opacity: annotation.opacity, customData: annotation.customData };
        }
        else if (annotation.shapeAnnotationType === 'Ink') {
            annotSettings = {
                type: 'Ink', opacity: annotation.opacity, strokeColor: annotation.strokeColor, thickness: annotation.thickness, modifiedDate: annotation.modifiedDate,
                width: annotation.bounds.width, height: annotation.bounds.height, left: annotation.bounds.x,
                top: annotation.bounds.y, data: annotation.data, customData: annotation.customData
            };
        }
        else if (annotation.shapeAnnotationType === 'FreeText') {
            annotSettings = {
                type: 'FreeText', opacity: annotation.opacity, fillColor: annotation.fillColor,
                strokeColor: annotation.strokeColor, thickness: annotation.thickness, content: annotation.dynamicText,
                fontFamily: annotation.fontFamily, fontSize: annotation.fontSize, fontColor: annotation.fontColor,
                textAlign: annotation.textAlign, fontStyle: this.updateFreeTextFontStyle(annotation.font),
                customData: annotation.customData
            };
        }
        else if (annotation.measureType === '') {
            if (annotation.shapeAnnotationType === 'Line') {
                annotSettings = { type: 'Shape', subType: 'Line', opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor, thickness: annotation.thickness, borderDashArray: annotation.borderDashArray, lineHeadStartStyle: annotation.sourceDecoraterShapes, lineHeadEndStyle: annotation.taregetDecoraterShapes, customData: annotation.customData };
            }
            else if (annotation.shapeAnnotationType === 'Arrow' || annotation.shapeAnnotationType === 'LineWidthArrowHead') {
                annotSettings = { type: 'Shape', subType: 'Arrow', opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor, thickness: annotation.thickness, borderDashArray: annotation.borderDashArray, lineHeadStartStyle: annotation.sourceDecoraterShapes, lineHeadEndStyle: annotation.taregetDecoraterShapes, customData: annotation.customData };
            }
            else if (annotation.shapeAnnotationType === 'Rectangle') {
                annotSettings = {
                    type: 'Shape', subType: 'Rectangle', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness, customData: annotation.customData
                };
            }
            else if (annotation.shapeAnnotationType === 'Circle' || annotation.shapeAnnotationType === 'Ellipse') {
                annotSettings = {
                    type: 'Shape', subType: 'Circle', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness, customData: annotation.customData
                };
            }
            else if (annotation.shapeAnnotationType === 'Polygon') {
                annotSettings = {
                    type: 'Shape', subType: 'Polygon', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness, customData: annotation.customData
                };
            }
        }
        else if (annotation.measureType !== '') {
            if (annotation.measureType === 'Distance') {
                annotSettings = { type: 'Measure', subType: 'Distance', opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor, thickness: annotation.thickness, borderDashArray: annotation.borderDashArray, lineHeadStartStyle: annotation.sourceDecoraterShapes, lineHeadEndStyle: annotation.taregetDecoraterShapes, customData: annotation.customData };
            }
            else if (annotation.measureType === 'Perimeter') {
                annotSettings = { type: 'Measure', subType: 'Perimeter', opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor, thickness: annotation.thickness, borderDashArray: annotation.borderDashArray, lineHeadStartStyle: annotation.sourceDecoraterShapes, lineHeadEndStyle: annotation.taregetDecoraterShapes, customData: annotation.customData };
            }
            else if (annotation.measureType === 'Area') {
                annotSettings = {
                    type: 'Measure', subType: 'Area', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness, customData: annotation.customData
                };
            }
            else if (annotation.measureType === 'Radius') {
                annotSettings = {
                    type: 'Measure', subType: 'Radius', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness, customData: annotation.customData
                };
            }
            else if (annotation.measureType === 'Volume') {
                annotSettings = {
                    type: 'Measure', subType: 'Volume', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness, calibrate: annotation.calibrate,
                    annotationId: annotation.annotName, customData: annotation.customData
                };
            }
        }
        var overlappedCollection = [];
        var overlappedAnnotations = this.getOverlappedAnnotations(annotation, pageNumber);
        if (overlappedAnnotations && this.overlappedCollections) {
            var overlappedCollections = [];
            for (var i = 0; i < overlappedAnnotations.length; i++) {
                if (overlappedAnnotations[parseInt(i.toString(), 10)].shapeAnnotationType !== 'textMarkup' && this.overlappedCollections || isSelected) {
                    for (var j = 0; j < this.overlappedCollections.length; j++) {
                        if (overlappedAnnotations[parseInt(i.toString(), 10)].annotName ===
                            this.overlappedCollections[parseInt(j.toString(), 10)].annotName) {
                            overlappedCollections.push(overlappedAnnotations[parseInt(i.toString(), 10)]);
                            break;
                        }
                    }
                }
                else {
                    overlappedCollections.push(overlappedAnnotations[parseInt(i.toString(), 10)]);
                }
            }
            overlappedAnnotations = overlappedCollections;
        }
        if (this.pdfViewer.enableMultiLineOverlap) {
            for (var i = 0; i < overlappedAnnotations.length; i++) {
                if (overlappedAnnotations[parseInt(i.toString(), 10)].shapeAnnotationType === 'textMarkup') {
                    var isOverlapped = false;
                    for (var j = 0; j < overlappedAnnotations[parseInt(i.toString(), 10)].bounds.length; j++) {
                        var bounds = this.orderTextMarkupBounds(overlappedAnnotations[parseInt(i.toString(), 10)].bounds[parseInt(j.toString(), 10)]);
                        var clickedPosition = this.textMarkupAnnotationModule.annotationClickPosition;
                        if (clickedPosition && (clickedPosition.x || clickedPosition.y)) {
                            if (bounds.left <= clickedPosition.x && (bounds.left + bounds.width) >= clickedPosition.x) {
                                if (bounds.top <= clickedPosition.y && (bounds.top + bounds.height) >= clickedPosition.y) {
                                    isOverlapped = true;
                                }
                            }
                        }
                        else {
                            isOverlapped = true;
                        }
                    }
                    if (!isOverlapped) {
                        overlappedAnnotations.splice(i, 1);
                    }
                }
            }
        }
        if (overlappedAnnotations && overlappedAnnotations.length > 0) {
            annotationCollection = overlappedAnnotations;
            for (var i = 0; i < annotationCollection.length; i++) {
                var overlappedObject = cloneObject(annotationCollection[parseInt(i.toString(), 10)]);
                overlappedObject.annotationId = annotationCollection[parseInt(i.toString(), 10)].annotName;
                if (annotationId === annotationCollection[parseInt(i.toString(), 10)].annotName && annotation.measureType && annotation.measureType === 'Volume') {
                    annotSettings.calibrate = annotationCollection[parseInt(i.toString(), 10)].calibrate;
                }
                delete overlappedObject.annotName;
                overlappedCollection.push(overlappedObject);
            }
        }
        else {
            overlappedCollection = null;
        }
        this.addFreeTextProperties(annotation, annotSettings);
        var annotationAddMode = annotation.annotationAddMode;
        if (!isDblClick) {
            if (annotation.shapeAnnotationType === 'Stamp' || annotation.shapeAnnotationType === 'Image') {
                if (!this.pdfViewerBase.isNewStamp && this.annotationSelected) {
                    if (overlappedCollection) {
                        this.pdfViewer.fireAnnotationSelect(annotationId, pageNumber, annotSettings, overlappedCollection, null, null, annotationAddMode);
                    }
                    else {
                        this.pdfViewer.fireAnnotationSelect(annotationId, pageNumber, annotSettings, null, null, null, annotationAddMode);
                    }
                }
            }
            else {
                var module = this.textMarkupAnnotationModule;
                var multiPageCollection = module && module.multiPageCollectionList(annotation);
                if (multiPageCollection && multiPageCollection.length === 0) {
                    multiPageCollection = null;
                }
                if (this.annotationSelected) {
                    if (overlappedCollection) {
                        isSelected = false;
                        this.pdfViewer.fireAnnotationSelect(annotationId, pageNumber, annotSettings, overlappedCollection, multiPageCollection, isSelected, annotationAddMode);
                    }
                    else {
                        isSelected = true;
                        this.pdfViewer.fireAnnotationSelect(annotationId, pageNumber, annotSettings, null, multiPageCollection, isSelected, annotationAddMode);
                    }
                }
            }
        }
        else {
            if (annotation.shapeAnnotationType === 'Stamp' || annotation.shapeAnnotationType === 'Image') {
                if (!this.pdfViewerBase.isNewStamp) {
                    this.pdfViewer.fireAnnotationDoubleClick(annotationId, pageNumber, annotSettings);
                }
            }
            else {
                this.pdfViewer.fireAnnotationDoubleClick(annotationId, pageNumber, annotSettings);
            }
        }
        this.annotationSelected = true;
    };
    Annotation.prototype.selectSignature = function (signatureId, pageNumber, signatureModule) {
        var annotBounds = signatureModule.bounds;
        var bounds = { height: annotBounds.height, width: annotBounds.width, x: annotBounds.x, y: annotBounds.y };
        if (!this.pdfViewerBase.signatureAdded && signatureModule.signatureName !== 'ink') {
            var signature = { bounds: bounds, opacity: signatureModule.opacity, thickness: signatureModule.thickness,
                strokeColor: signatureModule.strokeColor };
            this.pdfViewer.fireSignatureSelect(signatureId, pageNumber, signature);
        }
    };
    /**
     *
     * @param {string} signatureId - Gets the id of the signature
     * @param {number} pageNumber - Gets the page number value
     * @param {any} signatureModule - It describes about the signature module
     * @private
     * @returns {void}
     */
    Annotation.prototype.unselectSignature = function (signatureId, pageNumber, signatureModule) {
        var annotBounds = signatureModule.bounds;
        var bounds = { height: annotBounds.height, width: annotBounds.width, x: annotBounds.x, y: annotBounds.y };
        if (!this.pdfViewerBase.signatureAdded) {
            var signature = { bounds: bounds, opacity: signatureModule.opacity, thickness: signatureModule.thickness,
                strokeColor: signatureModule.strokeColor };
            this.pdfViewer.fireSignatureUnselect(signatureId, pageNumber, signature);
        }
    };
    Annotation.prototype.editSignature = function (signature) {
        var currentAnnotation;
        if (signature.uniqueKey) {
            currentAnnotation = this.pdfViewer.nameTable[signature.uniqueKey];
        }
        else {
            currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        }
        var pageNumber = currentAnnotation.pageIndex;
        if (currentAnnotation.shapeAnnotationType === 'HandWrittenSignature' || currentAnnotation.shapeAnnotationType === 'SignatureText' || currentAnnotation.shapeAnnotationType === 'SignatureImage') {
            var clonedObject = cloneObject(currentAnnotation);
            var redoClonedObject = cloneObject(currentAnnotation);
            if (!(isNullOrUndefined(signature.opacity)) || currentAnnotation.opacity !== signature.opacity) {
                redoClonedObject.opacity = signature.opacity;
                this.pdfViewer.nodePropertyChange(currentAnnotation, { opacity: signature.opacity });
                this.pdfViewer.fireSignaturePropertiesChange(currentAnnotation.pageIndex, currentAnnotation.signatureName, currentAnnotation.shapeAnnotationType, false, true, false, clonedObject.opacity, redoClonedObject.opacity);
                this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Opacity', '', clonedObject, redoClonedObject);
            }
            if (currentAnnotation.strokeColor !== signature.strokeColor) {
                redoClonedObject.strokeColor = signature.strokeColor;
                this.pdfViewer.nodePropertyChange(currentAnnotation, { strokeColor: signature.strokeColor });
                this.pdfViewer.fireSignaturePropertiesChange(currentAnnotation.pageIndex, currentAnnotation.signatureName, currentAnnotation.shapeAnnotationType, true, false, false, clonedObject.strokeColor, redoClonedObject.strokeColor);
                this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Stroke', '', clonedObject, redoClonedObject);
            }
            if (currentAnnotation.thickness !== signature.thickness) {
                redoClonedObject.thickness = signature.thickness;
                this.pdfViewer.nodePropertyChange(currentAnnotation, { thickness: signature.thickness });
                this.pdfViewer.fireSignaturePropertiesChange(currentAnnotation.pageIndex, currentAnnotation.signatureName, currentAnnotation.shapeAnnotationType, false, false, true, clonedObject.thickness, redoClonedObject.thickness);
                this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Thickness', '', clonedObject, redoClonedObject);
            }
            currentAnnotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
            this.pdfViewer.renderDrawing();
            this.pdfViewerBase.signatureModule.modifySignatureCollection(null, pageNumber, currentAnnotation, true);
        }
    };
    Annotation.prototype.deletComment = function (commentDiv) {
        if (commentDiv.parentElement.firstChild === commentDiv) {
            this.deleteAnnotation();
        }
        else {
            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.modifyCommentDeleteProperty(commentDiv.parentElement, commentDiv);
        }
    };
    Annotation.prototype.addReplyComments = function (currentAnnotation, replyComment, commentType) {
        if (commentType === 'add') {
            var commentsMainDiv = document.getElementById(currentAnnotation.annotName);
            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.createCommentDiv(commentsMainDiv);
            for (var j = 0; j < replyComment.length; j++) {
                this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                    saveCommentDiv(commentsMainDiv, replyComment[parseInt(j.toString(), 10)]);
            }
        }
        else if (commentType === 'next') {
            var commentsMainDiv = document.getElementById(currentAnnotation.annotationId);
            this.selectAnnotation(currentAnnotation);
            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.saveCommentDiv(commentsMainDiv, replyComment);
        }
    };
    Annotation.prototype.editComments = function (commentId, editComment) {
        var commentDiv = document.getElementById(commentId);
        commentDiv.childNodes[1].ej2_instances[0].value = editComment;
    };
    /**
     * Updates the existing properties of the specified annotation object.
     *
     * @param {any} annotation - The annotation object that contains the properties to be updated.
     * The object should include valid annotation properties such as type, bounds, color, opacity, etc.
     * Modifying these properties will update the annotation in the PDF Viewer accordingly.
     *
     * @remarks
     * This method will apply the changes to the annotation and refresh the viewer to reflect the updated properties.
     */
    Annotation.prototype.editAnnotation = function (annotation) {
        var currentAnnotation;
        var annotationId;
        var annotationType;
        var pageNumber;
        var isTextMarkupUpdate = false;
        var textMarkupAnnotation;
        if (!isNullOrUndefined(this.pdfViewer.annotationModule.textMarkupAnnotationModule) &&
            !isNullOrUndefined(this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation)) {
            textMarkupAnnotation = this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation;
        }
        if ((textMarkupAnnotation && (!annotation.annotationId || !annotation.uniqueKey) &&
            (annotation.annotationId === textMarkupAnnotation.annotName))) {
            currentAnnotation = this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation;
            annotationId = currentAnnotation.annotName;
            pageNumber = this.pdfViewer.annotationModule.textMarkupAnnotationModule.selectTextMarkupCurrentPage;
        }
        else {
            if (this.pdfViewer.selectedItems.annotations[0]) {
                currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
                annotationId = currentAnnotation.annotName;
                pageNumber = currentAnnotation.pageIndex;
            }
        }
        if (annotation.uniqueKey !== undefined) {
            currentAnnotation = this.pdfViewer.nameTable[annotation.uniqueKey];
            if (currentAnnotation && currentAnnotation.annotationSettings &&
                !isNullOrUndefined(currentAnnotation.annotationSettings.isLock)) {
                currentAnnotation.annotationSettings.isLock = annotation.annotationSettings.isLock;
            }
            annotationId = currentAnnotation.annotName;
            pageNumber = currentAnnotation.pageIndex;
            if (isBlazor()) {
                if (annotation.allowedInteractions) {
                    var allowedInteractionsCount = annotation.allowedInteractions.length;
                    for (var i = 0; i < allowedInteractionsCount; i++) {
                        if (annotation.allowedInteractions[parseInt(i.toString(), 10)] === 0) {
                            annotation.allowedInteractions[parseInt(i.toString(), 10)] = AllowedInteraction.Select;
                        }
                        if (annotation.allowedInteractions[parseInt(i.toString(), 10)] === 1) {
                            annotation.allowedInteractions[parseInt(i.toString(), 10)] = AllowedInteraction.Move;
                        }
                        if (annotation.allowedInteractions[parseInt(i.toString(), 10)] === 2) {
                            annotation.allowedInteractions[parseInt(i.toString(), 10)] = AllowedInteraction.Resize;
                        }
                        if (annotation.allowedInteractions[parseInt(i.toString(), 10)] === 3) {
                            annotation.allowedInteractions[parseInt(i.toString(), 10)] = AllowedInteraction.Delete;
                        }
                        if (annotation.allowedInteractions[parseInt(i.toString(), 10)] === 4) {
                            annotation.allowedInteractions[parseInt(i.toString(), 10)] = AllowedInteraction.PropertyChange;
                        }
                        if (annotation.allowedInteractions[parseInt(i.toString(), 10)] === 5) {
                            annotation.allowedInteractions[parseInt(i.toString(), 10)] = AllowedInteraction.None;
                        }
                    }
                }
            }
            currentAnnotation.allowedInteractions = annotation.allowedInteractions ?
                annotation.allowedInteractions : this.updateAnnotationAllowedInteractions(annotation);
        }
        if (!currentAnnotation) {
            if (annotation.shapeAnnotationType === 'sticky' && annotation.annotationId !== undefined) {
                currentAnnotation = this.pdfViewer.nameTable[annotation.annotationId];
                if (currentAnnotation) {
                    currentAnnotation.annotationSettings.isLock = annotation.annotationSettings.isLock;
                    annotationId = currentAnnotation.annotName;
                    pageNumber = currentAnnotation.pageIndex;
                }
            }
        }
        if (annotation.shapeAnnotationType === 'textMarkup') {
            currentAnnotation = this.pdfViewer.annotationModule.textMarkupAnnotationModule.
                getAnnotations(annotation.pageNumber, annotation);
            for (var i = 0; i < currentAnnotation.length; i++) {
                if (annotation.annotationId === currentAnnotation[parseInt(i.toString(), 10)].annotName) {
                    isTextMarkupUpdate = true;
                    currentAnnotation = currentAnnotation[parseInt(i.toString(), 10)];
                    currentAnnotation.isPrint = annotation.isPrint;
                    this.textMarkupAnnotationModule.currentTextMarkupAnnotation = currentAnnotation;
                    this.textMarkupAnnotationModule.selectTextMarkupCurrentPage = currentAnnotation.pageNumber;
                    currentAnnotation.allowedInteractions = annotation.allowedInteractions;
                    pageNumber = currentAnnotation.pageNumber;
                    annotationId = annotation.annotationId;
                    break;
                }
            }
        }
        if (currentAnnotation) {
            var clonedObject = cloneObject(currentAnnotation);
            var redoClonedObject = cloneObject(currentAnnotation);
            if (annotation.shapeAnnotationType === 'textMarkup') {
                annotationType = 'textMarkup';
            }
            if (annotation && annotation.isCommentLock === true) {
                currentAnnotation.isCommentLock = annotation.isCommentLock;
            }
            if (annotation && JSON.stringify(currentAnnotation.annotationSelectorSettings) !== JSON.stringify(annotation.annotationSelectorSettings) && ((!isNullOrUndefined(annotation.type) && annotation.type !== 'TextMarkup') || (!isNullOrUndefined(annotation.shapeAnnotationType) && annotation.shapeAnnotationType !== 'textMarkup'))) {
                currentAnnotation.annotationSelectorSettings = annotation.annotationSelectorSettings;
                redoClonedObject.annotationSelectorSettings = annotation.annotationSelectorSettings;
                this.pdfViewer.nodePropertyChange(currentAnnotation, { annotationSelectorSettings: annotation.annotationSelectorSettings });
                this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
            }
            if (annotation.comments) {
                for (var j = 0; j < annotation.comments.length; j++) {
                    if (annotation.comments[parseInt(j.toString(), 10)].isLock === true) {
                        if (annotationType) {
                            currentAnnotation.comments = annotation.comments;
                            currentAnnotation.comments[parseInt(j.toString(), 10)].isLock =
                                annotation.comments[parseInt(j.toString(), 10)].isLock;
                        }
                        else {
                            currentAnnotation.properties.comments = annotation.comments;
                            currentAnnotation.properties.comments[parseInt(j.toString(), 10)].isLock =
                                annotation.comments[parseInt(j.toString(), 10)].isLock;
                        }
                    }
                }
            }
            if (annotation && annotation.note !== '' && annotation.note !== undefined) {
                if (annotationType) {
                    currentAnnotation.note = annotation.note;
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                        addTextToComments(currentAnnotation.annotName, currentAnnotation.note);
                }
                else {
                    currentAnnotation.notes = annotation.note;
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                        addTextToComments(currentAnnotation.annotName, currentAnnotation.notes);
                }
            }
            else {
                if (annotation && annotation.isCommentLock && ((annotation.type && annotation.type !== 'FreeText') || annotation.shapeAnnotationType !== 'FreeText')) {
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addTextToComments(currentAnnotation.annotName, '  ');
                }
            }
            if (annotation.commentId && annotation.editComment && annotation.commentType === 'edit') {
                this.editComments(annotation.commentId, annotation.editComment);
            }
            if (annotation.replyComment && annotation.commentType === 'add') {
                this.addReplyComments(currentAnnotation, annotation.replyComment, annotation.commentType);
                this.pdfViewer.annotationCollection[0].note = annotation.note;
            }
            if (annotation.nextComment && annotation.commentType === 'next') {
                this.addReplyComments(annotation, annotation.nextComment, annotation.commentType);
            }
            if (annotation.note === '' && annotation.commentType === 'delete') {
                var commentDiv = document.getElementById(annotation.annotationId);
                this.deletComment(commentDiv);
            }
            if (annotation.comments && annotation.commentType === 'delete' && annotation.note !== '') {
                var repliesDiv = document.querySelectorAll('.e-pv-more-options-button');
                if (repliesDiv) {
                    for (var i = 0; i < repliesDiv.length; i++) {
                        if (repliesDiv[parseInt(i.toString(), 10)].style.visibility === 'visible') {
                            var activeReplyDiv = repliesDiv[parseInt(i.toString(), 10)].parentElement.nextSibling;
                            var isLocked = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                                checkIslockProperty(activeReplyDiv);
                            if (activeReplyDiv && !isLocked) {
                                this.deletComment(activeReplyDiv.parentElement);
                            }
                            break;
                        }
                    }
                }
            }
            if (annotation.type === 'TextMarkup' || annotation.shapeAnnotationType === 'textMarkup') {
                if (currentAnnotation.annotationSettings && annotation.annotationSettings) {
                    if (currentAnnotation.annotationSettings.isLock !== annotation.annotationSettings.isLock) {
                        var pageAnnotations = this.textMarkupAnnotationModule.modifyAnnotationProperty('AnnotationSettings', annotation.annotationSettings.isLock, null);
                        this.textMarkupAnnotationModule.manageAnnotations(pageAnnotations, this.textMarkupAnnotationModule.selectTextMarkupCurrentPage);
                    }
                }
                if (annotation && JSON.stringify(currentAnnotation.annotationSelectorSettings) !==
                    JSON.stringify(annotation.annotationSelectorSettings)) {
                    var pageAnnotations = this.textMarkupAnnotationModule.modifyAnnotationProperty('AnnotationSelectorSettings', annotation.annotationSelectorSettings, null);
                    this.textMarkupAnnotationModule.manageAnnotations(pageAnnotations, this.textMarkupAnnotationModule.selectTextMarkupCurrentPage);
                }
                if (currentAnnotation.opacity !== annotation.opacity) {
                    this.pdfViewer.annotationModule.textMarkupAnnotationModule.modifyOpacityProperty(null, annotation.opacity);
                }
                if (currentAnnotation.color !== annotation.color) {
                    this.pdfViewer.annotationModule.textMarkupAnnotationModule.modifyColorProperty(annotation.color);
                }
                if (JSON.stringify(currentAnnotation.bounds) !== JSON.stringify(annotation.bounds)) {
                    this.pdfViewer.annotationModule.textMarkupAnnotationModule.modifyBoundsProperty(annotation.bounds);
                }
                annotationType = 'textMarkup';
                if (isTextMarkupUpdate) {
                    this.textMarkupAnnotationModule.selectTextMarkupCurrentPage = null;
                }
            }
            else if (annotation && annotation.stampAnnotationType === 'image' && annotation.shapeAnnotationType === 'stamp' && annotation.stampAnnotationPath) {
                annotationType = 'stamp';
                if (currentAnnotation.data !== annotation.stampAnnotationPath) {
                    currentAnnotation.data = annotation.stampAnnotationPath;
                    currentAnnotation.wrapper.children[0].imageSource = annotation.stampAnnotationPath;
                    this.pdfViewer.renderDrawing(null, pageNumber);
                }
                if (!(isNullOrUndefined(annotation.opacity)) && currentAnnotation.opacity !== annotation.opacity) {
                    redoClonedObject.opacity = annotation.opacity;
                    this.annotationPropertyChange(currentAnnotation, annotation.opacity, 'Shape Opacity', clonedObject, redoClonedObject);
                }
                this.calculateAnnotationBounds(currentAnnotation, annotation);
            }
            else if (annotation.type === 'StickyNotes' || annotation.type === 'Stamp' || annotation.shapeAnnotationType === 'sticky' || annotation.shapeAnnotationType === 'stamp') {
                if (!(isNullOrUndefined(annotation.opacity)) && currentAnnotation.opacity !== annotation.opacity) {
                    redoClonedObject.opacity = annotation.opacity;
                    this.annotationPropertyChange(currentAnnotation, annotation.opacity, 'Shape Opacity', clonedObject, redoClonedObject);
                }
                this.calculateAnnotationBounds(currentAnnotation, annotation);
                if (annotation.type === 'StickyNotes' || annotation.shapeAnnotationType === 'sticky') {
                    annotationType = 'sticky';
                }
                else {
                    annotationType = 'stamp';
                }
            }
            else if (annotation.type === 'Ink' || annotation.type === 'Shape' || annotation.type === 'Measure' || annotation.shapeAnnotationType === 'Line' || annotation.shapeAnnotationType === 'Square' || annotation.shapeAnnotationType === 'Circle' || annotation.shapeAnnotationType === 'Polygon' || annotation.shapeAnnotationType === 'Polyline' || annotation.shapeAnnotationType === 'Ink') {
                if (annotation.shapeAnnotationType === 'Square' || annotation.shapeAnnotationType === 'Circle' || annotation.shapeAnnotationType === 'Radius' || annotation.shapeAnnotationType === 'Ink') {
                    this.calculateAnnotationBounds(currentAnnotation, annotation);
                }
                if (!(isNullOrUndefined(annotation.opacity)) && currentAnnotation.opacity !== annotation.opacity) {
                    redoClonedObject.opacity = annotation.opacity;
                    this.annotationPropertyChange(currentAnnotation, annotation.opacity, 'Shape Opacity', clonedObject, redoClonedObject);
                }
                if (annotation.fillColor && currentAnnotation.fillColor !== annotation.fillColor) {
                    redoClonedObject.fillColor = annotation.fillColor;
                    if (annotation.labelSettings && annotation.labelSettings.fillColor) {
                        annotation.labelSettings.fillColor = annotation.fillColor;
                    }
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { fillColor: annotation.fillColor });
                    this.triggerAnnotationPropChange(currentAnnotation, true, false, false, false);
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Fill', '', clonedObject, redoClonedObject);
                }
                if (annotation.strokeColor && currentAnnotation.strokeColor !== annotation.strokeColor) {
                    redoClonedObject.strokeColor = annotation.strokeColor;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { strokeColor: annotation.strokeColor });
                    this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Stroke', '', clonedObject, redoClonedObject);
                }
                if (annotation.leaderLength && currentAnnotation.leaderHeight !== annotation.leaderLength) {
                    redoClonedObject.leaderHeight = annotation.leaderLength;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { leaderHeight: annotation.leaderLength });
                }
                if (annotation.thickness && currentAnnotation.thickness !== annotation.thickness) {
                    redoClonedObject.thickness = annotation.thickness;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { thickness: annotation.thickness });
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, true, false);
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Thickness', '', clonedObject, redoClonedObject);
                }
                if (currentAnnotation.author !== annotation.author) {
                    redoClonedObject.author = annotation.author;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { author: annotation.author });
                    this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
                }
                if (currentAnnotation.subject !== annotation.subject) {
                    redoClonedObject.subject = annotation.subject;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { subject: annotation.subject });
                    this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
                }
                if (currentAnnotation.modifiedDate !== annotation.modifiedDate) {
                    redoClonedObject.modifiedDate = annotation.modifiedDate;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { modifiedDate: annotation.modifiedDate });
                }
                if (currentAnnotation.subject !== annotation.subject) {
                    redoClonedObject.subject = annotation.subject;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { subject: annotation.subject });
                    this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Stroke', '', clonedObject, redoClonedObject);
                }
                if (this.pdfViewer.enableShapeLabel && currentAnnotation.fontColor !== annotation.fontColor) {
                    redoClonedObject.fontColor = annotation.fontColor;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { fontColor: annotation.fontColor });
                }
                if (this.pdfViewer.enableShapeLabel && annotation.labelSettings && annotation.labelSettings.fillColor) {
                    if (currentAnnotation.labelFillColor !== annotation.labelSettings.fillColor) {
                        redoClonedObject.labelFillColor = annotation.labelSettings.fillColor;
                        this.pdfViewer.nodePropertyChange(currentAnnotation, { labelFillColor: annotation.labelSettings.fillColor });
                    }
                }
                if (annotation.shapeAnnotationType === 'Line' || annotation.shapeAnnotationType === 'Polyline' || annotation.shapeAnnotationType === 'Polygon') {
                    if (JSON.stringify(currentAnnotation.vertexPoints) !== JSON.stringify(annotation.vertexPoints)) {
                        currentAnnotation.vertexPoints = annotation.vertexPoints;
                        this.pdfViewer.nodePropertyChange(currentAnnotation, { vertexPoints: annotation.vertexPoints });
                    }
                }
                if (annotation.subType === 'Line' || annotation.subType === 'Arrow' || annotation.subType === 'Distance' || annotation.subType === 'Perimeter') {
                    var isSourceDecoraterShapesChanged = false;
                    var isTargetDecoraterShapesChanged = false;
                    var isBorderDashArrayChanged = false;
                    clonedObject.lineHeadStart = currentAnnotation.sourceDecoraterShapes;
                    clonedObject.lineHeadEnd = currentAnnotation.taregetDecoraterShapes;
                    redoClonedObject.lineHeadStart = annotation.lineHeadStartStyle;
                    redoClonedObject.lineHeadEnd = annotation.lineHeadEndStyle;
                    redoClonedObject.borderDashArray = annotation.borderDashArray;
                    if (currentAnnotation.taregetDecoraterShapes !== annotation.lineHeadEndStyle) {
                        isTargetDecoraterShapesChanged = true;
                    }
                    if (currentAnnotation.sourceDecoraterShapes !== annotation.lineHeadStartStyle) {
                        isSourceDecoraterShapesChanged = true;
                    }
                    if (currentAnnotation.borderDashArray !== annotation.borderDashArray) {
                        isBorderDashArrayChanged = true;
                    }
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { sourceDecoraterShapes: annotation.lineHeadStartStyle,
                        taregetDecoraterShapes: annotation.lineHeadEndStyle, borderDashArray: annotation.borderDashArray });
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, false, false, isSourceDecoraterShapesChanged, isTargetDecoraterShapesChanged, isBorderDashArrayChanged);
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Line properties change', '', clonedObject, redoClonedObject);
                }
                if (annotation.type === 'Shape' || annotation.shapeAnnotationType === 'Line' || annotation.shapeAnnotationType === 'Square' || annotation.shapeAnnotationType === 'Circle' || annotation.shapeAnnotationType === 'Polygon') {
                    annotationType = 'shape';
                }
                if (annotation.type === 'Ink' || annotation.shapeAnnotationType === 'Ink') {
                    annotationType = 'ink';
                }
                if (annotation.type === 'Measure' || annotation.indent === 'LineDimension' || annotation.indent === 'PolyLineDimension' || annotation.indent === 'PolygonDimension' || annotation.indent === 'PolygonRadius' || annotation.indent === 'PolygonVolume') {
                    annotationType = 'shape_measure';
                }
                if (annotation.labelSettings && this.pdfViewer.enableShapeLabel) {
                    this.updateFreeTextProperties(currentAnnotation);
                    this.pdfViewer.nodePropertyChange(currentAnnotation, {
                        labelOpacity: annotation.labelSettings.opacity, fontColor: annotation.labelSettings.fontColor,
                        fontSize: annotation.labelSettings.fontSize, fontFamily: annotation.labelSettings.fontFamily,
                        labelContent: currentAnnotation.notes, labelFillColor: annotation.labelSettings.fillColor
                    });
                }
                if (this.pdfViewer.enableShapeLabel && annotation.calibrate && annotation.calibrate.depth) {
                    if (this.pdfViewer.annotationModule.measureAnnotationModule.volumeDepth !== annotation.calibrate.depth) {
                        this.pdfViewer.annotationModule.measureAnnotationModule.volumeDepth = annotation.calibrate.depth;
                        currentAnnotation.notes = this.pdfViewer.annotationModule.measureAnnotationModule.
                            calculateVolume(currentAnnotation.vertexPoints, currentAnnotation.id, currentAnnotation.pageIndex);
                        currentAnnotation.labelContent = currentAnnotation.notes;
                        if (annotation.labelSettings && annotation.labelSettings.labelContent) {
                            annotation.labelSettings.labelContent = currentAnnotation.notes;
                        }
                        this.pdfViewer.nodePropertyChange(currentAnnotation, { labelContent: currentAnnotation.labelContent });
                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.
                            addTextToComments(currentAnnotation.annotName, currentAnnotation.notes);
                    }
                }
            }
            else if (annotation.type === 'FreeText' || annotation.shapeAnnotationType === 'FreeText') {
                annotationType = 'freetext';
                if (this.pdfViewer.freeTextSettings.enableAutoFit && currentAnnotation.dynamicText !== annotation.content) {
                    var canvas = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', currentAnnotation.pageIndex);
                    var context = canvas.getContext('2d');
                    var fontSize = annotation.fontSize;
                    var font = void 0;
                    var fontFamily = annotation.fontFamily;
                    var zoomFactor = this.pdfViewerBase.getZoomFactor();
                    if (annotation.font.isBold) {
                        font = 'bold' + ' ' + fontSize + 'px' + ' ' + fontFamily;
                    }
                    else {
                        font = fontSize + 'px' + ' ' + fontFamily;
                    }
                    context.font = font;
                    var characterLength = 8;
                    var highestTextNode = '';
                    var textNodes = [];
                    var textboxValue = annotation.content ? annotation.content : annotation.dynamicText;
                    if (textboxValue.indexOf('\n') > -1) {
                        textNodes = textboxValue.split('\n');
                        for (var j = 0; j < textNodes.length; j++) {
                            var textNodeData = context.measureText(textNodes[parseInt(j.toString(), 10)]);
                            var highestTextNodeData = context.measureText(highestTextNode);
                            if (textNodeData.width > highestTextNodeData.width) {
                                highestTextNode = textNodes[parseInt(j.toString(), 10)];
                            }
                        }
                    }
                    else {
                        highestTextNode = textboxValue;
                    }
                    var textwidth = context.measureText(highestTextNode);
                    annotation.bounds.width = Math.ceil(textwidth.width + ((characterLength + 1) * 2));
                    var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + (annotation.pageIndex));
                    var maxWidth = pageDiv.clientWidth - (annotation.bounds.left * zoomFactor);
                    if (annotation.bounds.width > maxWidth) {
                        annotation.bounds.width = maxWidth / zoomFactor;
                    }
                    var height = annotation.bounds.height;
                    annotation.bounds.height = height >= currentAnnotation.bounds.height ? height : currentAnnotation.bounds.height;
                }
                this.calculateAnnotationBounds(currentAnnotation, annotation);
                if (annotation.opacity && currentAnnotation.opacity !== annotation.opacity) {
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
                }
                if (annotation.fillColor && currentAnnotation.fillColor !== annotation.fillColor) {
                    redoClonedObject.fillColor = annotation.fillColor;
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Fill', '', clonedObject, redoClonedObject);
                    this.triggerAnnotationPropChange(currentAnnotation, true, false, false, false);
                }
                if (annotation.fontColor && currentAnnotation.fontColor !== annotation.fontColor) {
                    redoClonedObject.fontColor = annotation.fontColor;
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'fontColor', '', clonedObject, redoClonedObject);
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, false, false);
                }
                if (annotation.strokeColor && currentAnnotation.strokeColor !== annotation.strokeColor) {
                    this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
                }
                if (annotation.thickness && currentAnnotation.thickness !== annotation.thickness) {
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, true, false);
                }
                var isCurrentAnnotationLock = currentAnnotation.isLock;
                if (!isNullOrUndefined(annotation.isLock)) {
                    isCurrentAnnotationLock = annotation.isLock;
                }
                else if (!isNullOrUndefined(annotation.annotationSettings.isLock)) {
                    isCurrentAnnotationLock = annotation.annotationSettings.isLock;
                }
                currentAnnotation.annotationSettings.isLock = isCurrentAnnotationLock;
                currentAnnotation.isLock = isCurrentAnnotationLock;
                annotation.content = (annotation.content && annotation.content === annotation.dynamicText) ?
                    annotation.content : annotation.dynamicText;
                if (annotation.content && currentAnnotation.dynamicText !== annotation.content) {
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, false, false, false, false, false, true, currentAnnotation.dynamicText, annotation.content);
                }
                this.pdfViewer.nodePropertyChange(currentAnnotation, {
                    opacity: annotation.opacity, fontColor: annotation.fontColor, fontSize: annotation.fontSize,
                    fontFamily: annotation.fontFamily,
                    dynamicText: annotation.content, fillColor: annotation.fillColor, textAlign: annotation.textAlign,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness,
                    font: annotation.fontStyle ? this.setFreeTextFontStyle(annotation.fontStyle) :
                        this.setFreeTextFontStyle(annotation.font),
                    isReadonly: annotation.isReadonly
                });
                if (annotation.content && currentAnnotation) {
                    this.updateAnnotationComments(currentAnnotation.annotName, annotation.content);
                }
                var newCommentDiv = document.getElementById(this.pdfViewer.element.id + '_commenttextbox_editor');
                var commentObj = new InPlaceEditor({
                    value: annotation.content
                });
                commentObj.appendTo(newCommentDiv);
            }
            currentAnnotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
            if (currentAnnotation.customData !== annotation.customData) {
                currentAnnotation.customData = annotation.customData;
            }
            currentAnnotation.isPrint = annotation.isPrint;
            if (annotation.type !== 'TextMarkup' && annotation.shapeAnnotationType !== 'textMarkup') {
                this.pdfViewer.renderDrawing();
            }
            this.updateCollection(annotationId, pageNumber, annotation, annotationType);
        }
    };
    Annotation.prototype.annotationPropertyChange = function (currentAnnotation, opacity, actionString, clonedObject, redoClonedObject) {
        this.pdfViewer.nodePropertyChange(currentAnnotation, { opacity: opacity });
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, actionString, '', clonedObject, redoClonedObject);
    };
    Annotation.prototype.calculateAnnotationBounds = function (currentAnnotation, annotation) {
        var bounds = this.pdfViewerBase.convertBounds(currentAnnotation.wrapper.bounds);
        var annotBounds = this.pdfViewerBase.convertBounds(annotation.bounds);
        if (bounds && annotBounds) {
            if (JSON.stringify(bounds) !== JSON.stringify(annotBounds) && (Math.abs(bounds.Y -
                annotBounds.Y) > 2) ||
                (Math.abs(bounds.X - annotBounds.X) > 2) ||
                (Math.abs(bounds.Width - annotBounds.Width) > 2) ||
                (Math.abs(bounds.Height - annotBounds.Height) > 2)) {
                var annotationBounds = { x: annotBounds.X + (annotBounds.Width / 2),
                    y: annotBounds.Y + (annotBounds.Height / 2),
                    width: annotBounds.Width, height: annotBounds.Height };
                this.pdfViewer.nodePropertyChange(currentAnnotation, { bounds: annotationBounds });
                this.triggerAnnotationPropChange(currentAnnotation, false, false, false, false);
                this.pdfViewer.renderSelector(currentAnnotation.pageIndex, this.pdfViewer.annotationSelectorSettings);
            }
        }
    };
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {void}
     */
    Annotation.prototype.updateFreeTextProperties = function (annotation) {
        if (annotation.labelSettings) {
            if (annotation.labelSettings.fillColor) {
                annotation.labelFillColor = annotation.labelSettings.fillColor;
            }
            if (annotation.labelSettings.fontColor) {
                annotation.fontColor = annotation.labelSettings.fontColor;
            }
            if (annotation.labelSettings.fontSize) {
                annotation.fontSize = annotation.labelSettings.fontSize;
            }
            if (annotation.labelSettings.fontFamily) {
                annotation.fontFamily = annotation.labelSettings.fontFamily;
            }
            if (annotation.labelSettings.opacity) {
                annotation.labelOpacity = annotation.labelSettings.opacity;
            }
            if (annotation.labelSettings.labelContent) {
                annotation.labelContent = annotation.labelSettings.labelContent;
            }
        }
    };
    Annotation.prototype.updateAnnotationComments = function (annotationId, noteContent) {
        var commentsDiv = document.getElementById(annotationId);
        if (commentsDiv && commentsDiv.childNodes) {
            if (commentsDiv.childNodes[0].ej2_instances) {
                commentsDiv.childNodes[0].ej2_instances[0].value = noteContent;
            }
            else if (commentsDiv.childNodes[0].childNodes && commentsDiv.childNodes[0].childNodes[1].ej2_instances) {
                commentsDiv.childNodes[0].childNodes[1].ej2_instances[0].value = noteContent;
            }
        }
    };
    /**
     * @param {any} annotation - annotation
     * @param {any} currentAnnotation - currentAnnotation
     * @private
     * @returns {void}
     */
    Annotation.prototype.addFreeTextProperties = function (annotation, currentAnnotation) {
        if (this.pdfViewer.enableShapeLabel && annotation && currentAnnotation) {
            currentAnnotation.labelSettings = {
                fontColor: annotation.fontColor, fontSize: annotation.fontSize, fontFamily: annotation.fontFamily,
                opacity: annotation.labelOpacity, labelContent: annotation.labelContent, fillColor: annotation.labelFillColor
            };
        }
    };
    Annotation.prototype.updateMeasurementSettings = function () {
        if (this.pdfViewer.enableAnnotation && this.pdfViewer.enableMeasureAnnotation) {
            var ratioString = '1 ' + this.pdfViewer.measurementSettings.conversionUnit + ' = ' + this.pdfViewer.measurementSettings.scaleRatio + ' ' + this.pdfViewer.measurementSettings.displayUnit;
            this.measureAnnotationModule.updateMeasureValues(ratioString, this.pdfViewer.measurementSettings.displayUnit, this.pdfViewer.measurementSettings.conversionUnit, this.pdfViewer.measurementSettings.depth);
        }
    };
    Annotation.prototype.updateCollection = function (annotationId, pageNumber, annotation, annotationType) {
        var annotationCollection;
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_' + annotationType);
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_' + annotationType];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.getPageCollection(annotObject, pageNumber);
            if (index != null && annotObject[parseInt(index.toString(), 10)]) {
                annotationCollection = annotObject[parseInt(index.toString(), 10)].annotations;
                if (annotationCollection !== null) {
                    for (var i = 0; i < annotationCollection.length; i++) {
                        if (annotationCollection[parseInt(i.toString(), 10)].annotName === annotationId) {
                            var newAnnot = this.modifyAnnotationProperties(annotationCollection[parseInt(i.toString(), 10)], annotation, annotationType);
                            annotationCollection[parseInt(i.toString(), 10)] = newAnnot;
                            this.storeAnnotationCollections(newAnnot, pageNumber);
                        }
                    }
                    if (!this.pdfViewerBase.isStorageExceed) {
                        PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_' + annotationType);
                    }
                    if (annotObject[parseInt(index.toString(), 10)]) {
                        annotObject[parseInt(index.toString(), 10)].annotations = annotationCollection;
                    }
                    var annotationStringified = JSON.stringify(annotObject);
                    if (this.pdfViewerBase.isStorageExceed) {
                        this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_' + annotationType] = annotationStringified;
                    }
                    else {
                        PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + '_annotations_' + annotationType, annotationStringified);
                    }
                }
            }
        }
    };
    Annotation.prototype.modifyAnnotationProperties = function (newAnnotation, annotation, annotationType) {
        var isModifyStatus = false;
        if (annotation && annotation.isCommentLock === true) {
            newAnnotation.isCommentLock = annotation.isCommentLock;
        }
        if (!isNullOrUndefined(annotation) && !isNullOrUndefined(annotation.annotationSettings) &&
            annotation.annotationSettings.isLock === true && annotation.isCommentLock === true) {
            isModifyStatus = true;
        }
        if (annotation.comments) {
            for (var j = 0; j < annotation.comments.length; j++) {
                if (!isNullOrUndefined(annotation.comments[parseInt(j.toString(), 10)].isLock) &&
                    !isNullOrUndefined(newAnnotation.comments[parseInt(j.toString(), 10)])) {
                    newAnnotation.comments[parseInt(j.toString(), 10)].isLock = annotation.comments[parseInt(j.toString(), 10)].isLock;
                }
            }
        }
        if (annotation && annotation.note !== '' && annotation.note !== undefined) {
            newAnnotation.note = annotation.note;
        }
        if (annotation.commentId && annotation.editComment && annotation.commentType === 'edit') {
            var commentDiv = document.getElementById(annotation.commentId);
            if (annotation.annotationId === annotation.commentId) {
                newAnnotation.note = commentDiv.childNodes[1].ej2_instances[0].value;
            }
            for (var j = 0; j < annotation.comments.length; j++) {
                if (annotation.comments[parseInt(j.toString(), 10)].annotName === annotation.commentId) {
                    newAnnotation.comments[parseInt(j.toString(), 10)].note = commentDiv.childNodes[1].ej2_instances[0].value;
                }
            }
        }
        if (annotationType === 'textMarkup') {
            newAnnotation.opacity = annotation.opacity;
            newAnnotation.color = annotation.color;
            newAnnotation.allowedInteractions = annotation.allowedInteractions;
            newAnnotation.annotationSettings = annotation.annotationSettings;
        }
        else if (annotationType === 'sticky' || annotationType === 'stamp') {
            if (annotation.bounds) {
                newAnnotation.bounds = annotation.bounds;
            }
            newAnnotation.opacity = annotation.opacity;
            newAnnotation.annotationSettings = annotation.annotationSettings;
            newAnnotation.allowedInteractions = annotation.allowedInteractions;
            if (annotation.stampAnnotationPath) {
                newAnnotation.stampAnnotationPath = annotation.stampAnnotationPath;
            }
        }
        else if (annotationType === 'ink') {
            if (annotation.bounds) {
                newAnnotation.bounds = annotation.bounds;
            }
            newAnnotation.opacity = annotation.opacity;
            newAnnotation.strokeColor = annotation.strokeColor;
            newAnnotation.thickness = annotation.thickness;
            newAnnotation.annotationSettings = annotation.annotationSettings;
            newAnnotation.allowedInteractions = annotation.allowedInteractions;
        }
        else if (annotationType === 'shape' || annotationType === 'shape_measure') {
            if (annotation.subType === 'Line' || annotation.subType === 'Arrow' || annotation.subType === 'Distance' ||
                annotation.subType === 'Perimeter') {
                if (annotation.bounds) {
                    newAnnotation.bounds = annotation.bounds;
                }
                if (annotation.vertexPoints) {
                    newAnnotation.vertexPoints = annotation.vertexPoints;
                }
                newAnnotation.opacity = annotation.opacity;
                newAnnotation.fillColor = annotation.fillColor;
                newAnnotation.strokeColor = annotation.strokeColor;
                newAnnotation.thickness = annotation.thickness;
                newAnnotation.borderDashArray = annotation.borderDashArray;
                newAnnotation.lineHeadStart = this.getArrowTypeForCollection(annotation.lineHeadStartStyle);
                newAnnotation.lineHeadEnd = this.getArrowTypeForCollection(annotation.lineHeadEndStyle);
                newAnnotation.annotationSettings = annotation.annotationSettings;
                newAnnotation.allowedInteractions = annotation.allowedInteractions;
            }
            else {
                if (annotation.bounds) {
                    newAnnotation.bounds = annotation.bounds;
                }
                if (annotation.vertexPoints) {
                    newAnnotation.vertexPoints = annotation.vertexPoints;
                }
                newAnnotation.opacity = annotation.opacity;
                newAnnotation.fillColor = annotation.fillColor;
                newAnnotation.strokeColor = annotation.strokeColor;
                newAnnotation.thickness = annotation.thickness;
                newAnnotation.annotationSettings = annotation.annotationSettings;
                newAnnotation.allowedInteractions = annotation.allowedInteractions;
                if (annotation.calibrate) {
                    if (newAnnotation.annotName === annotation.annotationId) {
                        if (newAnnotation.calibrate.depth !== annotation.calibrate.depth) {
                            newAnnotation.calibrate.depth = annotation.calibrate.depth;
                            this.pdfViewer.annotationModule.measureAnnotationModule.volumeDepth = annotation.calibrate.depth;
                            newAnnotation.note = this.pdfViewer.annotationModule.measureAnnotationModule.
                                calculateVolume(newAnnotation.vertexPoints);
                        }
                    }
                }
            }
            if (this.pdfViewer.enableShapeLabel && annotation.labelSettings) {
                var text = annotation.labelSettings.labelContent;
                newAnnotation.note = text;
                newAnnotation.fontSize = annotation.labelSettings.fontSize;
                newAnnotation.labelFillColor = annotation.labelSettings.fillColor;
                if (newAnnotation.labelContent) {
                    newAnnotation.labelContent = text;
                }
                if (newAnnotation.labelSettings) {
                    newAnnotation.labelSettings = annotation.labelSettings;
                }
                this.updateAnnotationComments(newAnnotation.annotName, text);
            }
        }
        else if (annotationType === 'freetext') {
            if (annotation.bounds) {
                newAnnotation.bounds = annotation.bounds;
            }
            newAnnotation.opacity = annotation.opacity;
            newAnnotation.strokeColor = annotation.strokeColor;
            newAnnotation.thickness = annotation.thickness;
            if (annotation.content) {
                newAnnotation.dynamicText = annotation.content;
            }
            newAnnotation.fontFamily = annotation.fontFamily;
            newAnnotation.fontSize = annotation.fontSize;
            newAnnotation.fontColor = annotation.fontColor;
            newAnnotation.fillColor = annotation.fillColor;
            newAnnotation.font = annotation.font ? annotation.font : annotation.fontStyle;
            newAnnotation.textAlign = annotation.textAlign;
            newAnnotation.annotationSettings = annotation.annotationSettings;
            newAnnotation.allowedInteractions = annotation.allowedInteractions;
            newAnnotation.isReadonly = annotation.isReadonly;
        }
        newAnnotation.author = annotation.author;
        newAnnotation.customData = annotation.customData;
        newAnnotation.subject = annotation.subject;
        if (isModifyStatus) {
            newAnnotation.modifiedDate = annotation.modifiedDate;
        }
        else {
            newAnnotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        }
        newAnnotation.isPrint = annotation.isPrint;
        if (annotation.annotationSettings && !isNullOrUndefined(annotation.annotationSettings.isLock)) {
            newAnnotation.isLocked = annotation.annotationSettings.isLock;
        }
        if (!isNullOrUndefined(annotation.annotationSelectorSettings) && (newAnnotation.annotationSelectorSettings !==
            annotation.annotationSelectorSettings)) {
            newAnnotation.annotationSelectorSettings = annotation.annotationSelectorSettings;
        }
        return newAnnotation;
    };
    /**
     * @param {string} annotationType - annotationType
     * @param {string} annotationSubType - annotationSubType
     * @private
     * @returns {string} - string
     */
    Annotation.prototype.updateAnnotationAuthor = function (annotationType, annotationSubType) {
        var annotationAuthor;
        if (annotationType === 'sticky') {
            annotationAuthor = (this.pdfViewer.stickyNotesSettings.author !== 'Guest') ? this.pdfViewer.stickyNotesSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
            }
        }
        else if (annotationType === 'stamp') {
            annotationAuthor = (this.pdfViewer.stampSettings.author !== 'Guest') ? this.pdfViewer.stampSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
            }
        }
        else if (annotationType === 'shape') {
            if (annotationSubType === 'Line') {
                annotationAuthor = (this.pdfViewer.lineSettings.author !== 'Guest') ? this.pdfViewer.lineSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                    annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
                }
            }
            else if (annotationSubType === 'LineWidthArrowHead' || annotationSubType === 'Arrow') {
                annotationAuthor = (this.pdfViewer.arrowSettings.author !== 'Guest') ? this.pdfViewer.arrowSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                    annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
                }
            }
            else if (annotationSubType === 'Circle' || annotationSubType === 'Ellipse' || annotationSubType === 'Oval') {
                annotationAuthor = (this.pdfViewer.circleSettings.author !== 'Guest') ? this.pdfViewer.circleSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                    annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
                }
            }
            else if (annotationSubType === 'Rectangle' || annotationSubType === 'Square') {
                annotationAuthor = (this.pdfViewer.rectangleSettings.author !== 'Guest') ? this.pdfViewer.rectangleSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                    annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
                }
            }
            else if (annotationSubType === 'Polygon') {
                annotationAuthor = (this.pdfViewer.polygonSettings.author !== 'Guest') ? this.pdfViewer.polygonSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                    annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
                }
            }
        }
        else if (annotationType === 'measure') {
            if (annotationSubType === 'Distance' || annotationSubType === 'Distance calculation') {
                annotationAuthor = (this.pdfViewer.distanceSettings.author !== 'Guest') ? this.pdfViewer.distanceSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                    annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
                }
            }
            else if (annotationSubType === 'Perimeter' || annotationSubType === 'Perimeter calculation') {
                annotationAuthor = (this.pdfViewer.perimeterSettings.author !== 'Guest') ? this.pdfViewer.perimeterSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                    annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
                }
            }
            else if (annotationSubType === 'Radius' || annotationSubType === 'Radius calculation') {
                annotationAuthor = (this.pdfViewer.radiusSettings.author !== 'Guest') ? this.pdfViewer.radiusSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                    annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
                }
            }
            else if (annotationSubType === 'Area' || annotationSubType === 'Area calculation') {
                annotationAuthor = (this.pdfViewer.areaSettings.author !== 'Guest') ? this.pdfViewer.areaSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                    annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
                }
            }
            else if (annotationSubType === 'Volume' || annotationSubType === 'Volume calculation') {
                annotationAuthor = (this.pdfViewer.volumeSettings.author !== 'Guest') ? this.pdfViewer.volumeSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                    annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
                }
            }
        }
        else if (annotationType === 'textMarkup') {
            if (annotationSubType === 'Highlight') {
                annotationAuthor = (this.pdfViewer.highlightSettings.author !== 'Guest') ? this.pdfViewer.highlightSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                    annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
                }
            }
            else if (annotationSubType === 'Underline') {
                annotationAuthor = (this.pdfViewer.underlineSettings.author !== 'Guest') ? this.pdfViewer.underlineSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                    annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
                }
            }
            else if (annotationSubType === 'Strikethrough') {
                annotationAuthor = (this.pdfViewer.strikethroughSettings.author !== 'Guest') ? this.pdfViewer.strikethroughSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                    annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
                }
            }
            else {
                annotationAuthor = this.pdfViewer.annotationSettings.author;
            }
        }
        else if (annotationType === 'freeText') {
            annotationAuthor = (this.pdfViewer.freeTextSettings.author !== 'Guest') ? this.pdfViewer.freeTextSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
            }
        }
        else if (annotationType === 'ink') {
            annotationAuthor = (this.pdfViewer.inkAnnotationSettings.author !== 'Guest') ? this.pdfViewer.inkAnnotationSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            if (annotationAuthor !== 'Guest' && this.pdfViewer.enableHtmlSanitizer) {
                annotationAuthor = SanitizeHtmlHelper.sanitize(annotationAuthor);
            }
        }
        if (!annotationAuthor) {
            annotationAuthor = this.pdfViewer.annotationSettings.author;
        }
        return annotationAuthor;
    };
    /**
     * @param {string} colour - colour
     * @private
     * @returns {string} - string
     */
    Annotation.prototype.nameToHash = function (colour) {
        var colours = {
            'aliceblue': '#f0f8ff', 'antiquewhite': '#faebd7', 'aqua': '#00ffff', 'aquamarine': '#7fffd4', 'azure': '#f0ffff',
            'beige': '#f5f5dc', 'bisque': '#ffe4c4', 'black': '#000000', 'blanchedalmond': '#ffebcd', 'blue': '#0000ff',
            'blueviolet': '#8a2be2', 'brown': '#a52a2a', 'burlywood': '#deb887', 'yellow': '#ffff00', 'yellowgreen': '#9acd32',
            'cadetblue': '#5f9ea0', 'chartreuse': '#7fff00', 'chocolate': '#d2691e', 'coral': '#ff7f50',
            'cornflowerblue': '#6495ed', 'cornsilk': '#fff8dc', 'crimson': '#dc143c',
            'cyan': '#00ffff', 'darkblue': '#00008b', 'darkcyan': '#008b8b', 'darkgoldenrod': '#b8860b', 'darkgray': '#a9a9a9',
            'darkred': '#8b0000', 'darksalmon': '#e9967a', 'darkgreen': '#006400', 'darkkhaki': '#bdb76b',
            'darkmagenta': '#8b008b', 'darkolivegreen': '#556b2f', 'darkorange': '#ff8c00', 'darkorchid': '#9932cc',
            'darkseagreen': '#8fbc8f', 'darkslateblue': '#483d8b', 'darkslategray': '#2f4f4f', 'darkturquoise': '#00ced1',
            'darkviolet': '#9400d3', 'deeppink': '#ff1493', 'deepskyblue': '#00bfff', 'dimgray': '#696969',
            'dodgerblue': '#1e90ff', 'firebrick': '#b22222', 'floralwhite': '#fffaf0',
            'forestgreen': '#228b22', 'fuchsia': '#ff00ff', 'gainsboro': '#dcdcdc', 'ghostwhite': '#f8f8ff',
            'gold': '#ffd700', 'goldenrod': '#daa520', 'gray': '#808080', 'green': '#008000',
            'greenyellow': '#adff2f', 'honeydew': '#f0fff0', 'hotpink': '#ff69b4', 'indianred ': '#cd5c5c',
            'mediumorchid': '#ba55d3', 'mediumpurple': '#9370d8', 'indigo': '#4b0082', 'ivory': '#fffff0',
            'navy': '#000080', 'oldlace': '#fdf5e6', 'olive': '#808000', 'khaki': '#f0e68c',
            'lavender': '#e6e6fa', 'lavenderblush': '#fff0f5', 'lawngreen': '#7cfc00', 'lemonchiffon': '#fffacd',
            'lightblue': '#add8e6', 'lightcoral': '#f08080', 'lightcyan': '#e0ffff',
            'lightgoldenrodyellow': '#fafad2', 'lightgrey': '#d3d3d3', 'lightgreen': '#90ee90',
            'lightpink': '#ffb6c1', 'lightsalmon': '#ffa07a', 'lightseagreen': '#20b2aa',
            'lightskyblue': '#87cefa', 'lightslategray': '#778899', 'lightsteelblue': '#b0c4de',
            'lightyellow': '#ffffe0', 'lime': '#00ff00', 'limegreen': '#32cd32', 'linen': '#faf0e6',
            'magenta': '#ff00ff', 'maroon': '#800000', 'mediumaquamarine': '#66cdaa', 'mediumblue': '#0000cd',
            'mediumseagreen': '#3cb371', 'mediumslateblue': '#7b68ee', 'mediumspringgreen': '#00fa9a',
            'mediumturquoise': '#48d1cc', 'mediumvioletred': '#c71585', 'midnightblue': '#191970',
            'mintcream': '#f5fffa', 'mistyrose': '#ffe4e1', 'moccasin': '#ffe4b5', 'navajowhite': '#ffdead',
            'rebeccapurple': '#663399', 'red': '#ff0000', 'rosybrown': '#bc8f8f', 'royalblue': '#4169e1',
            'olivedrab': '#6b8e23', 'orange': '#ffa500', 'orangered': '#ff4500', 'orchid': '#da70d6',
            'palegoldenrod': '#eee8aa', 'palegreen': '#98fb98', 'paleturquoise': '#afeeee',
            'palevioletred': '#d87093', 'papayawhip': '#ffefd5', 'peachpuff': '#ffdab9', 'peru': '#cd853f',
            'wheat': '#f5deb3', 'white': '#ffffff', 'whitesmoke': '#f5f5f5', 'pink': '#ffc0cb', 'plum': '#dda0dd',
            'steelblue': '#4682b4', 'violet': '#ee82ee', 'powderblue': '#b0e0e6', 'purple': '#800080',
            'saddlebrown': '#8b4513', 'salmon': '#fa8072', 'sandybrown': '#f4a460', 'seagreen': '#2e8b57',
            'seashell': '#fff5ee', 'sienna': '#a0522d', 'silver': '#c0c0c0', 'skyblue': '#87ceeb',
            'slateblue': '#6a5acd', 'slategray': '#708090', 'snow': '#fffafa', 'springgreen': '#00ff7f',
            'tan': '#d2b48c', 'teal': '#008080', 'thistle': '#d8bfd8', 'tomato': '#ff6347', 'turquoise': '#40e0d0'
        };
        if (typeof colours[colour.toLowerCase()] !== 'undefined') {
            return colours[colour.toLowerCase()];
        }
        return '';
    };
    Annotation.prototype.updateFreeTextFontStyle = function (font) {
        var fontStyle = 0;
        if (font.isBold === 1) {
            fontStyle = 1;
        }
        else if (font.isItalic === 2) {
            fontStyle = 2;
        }
        else if (font.isUnderline === 4) {
            fontStyle = 4;
        }
        else if (font.isStrikeout === 8) {
            fontStyle = 8;
        }
        else {
            fontStyle = { isBold: font.isBold, isItalic: font.isItalic, isUnderline: font.isUnderline, isStrikeout: font.isStrikeout };
        }
        return fontStyle;
    };
    Annotation.prototype.setFreeTextFontStyle = function (fontStyle) {
        if (fontStyle === 1) {
            return { isBold: true };
        }
        else if (fontStyle === 2) {
            return { isItalic: true };
        }
        else if (fontStyle === 4) {
            return { isUnderline: true };
        }
        else if (fontStyle === 8) {
            return { isStrikeout: true };
        }
        else {
            return { isBold: fontStyle.isBold, isItalic: fontStyle.isItalic, isUnderline: fontStyle.isUnderline,
                isStrikeout: fontStyle.isStrikeout };
        }
    };
    /**
     * @param {any} annotation - annotation
     * @param {boolean} isSettings - isSettings
     * @private
     * @returns {any} - any
     */
    Annotation.prototype.findAnnotationSettings = function (annotation, isSettings) {
        var annotSettings = this.pdfViewer.annotationSettings;
        if (annotation) {
            var shapeType = annotation.shapeAnnotationType;
            if (shapeType === 'StickyNotes' && this.pdfViewer.stickyNotesSettings) {
                annotSettings = this.pdfViewer.stickyNotesSettings;
            }
            else if (shapeType === 'Stamp' || shapeType === 'Image') {
                annotSettings = this.pdfViewer.stampSettings;
                if ((shapeType === 'Image')) {
                    annotSettings = this.pdfViewer.customStampSettings;
                }
            }
            else if (shapeType === 'FreeText') {
                annotSettings = this.pdfViewer.freeTextSettings;
            }
            else if (annotation.measureType === '') {
                if (shapeType === 'Line') {
                    annotSettings = this.pdfViewer.lineSettings;
                }
                else if ((shapeType === 'Arrow' || shapeType === 'LineWidthArrowHead')) {
                    annotSettings = this.pdfViewer.arrowSettings;
                }
                else if (shapeType === 'Rectangle') {
                    annotSettings = this.pdfViewer.rectangleSettings;
                }
                else if ((shapeType === 'Circle' || shapeType === 'Ellipse')) {
                    annotSettings = this.pdfViewer.circleSettings;
                }
                else if (shapeType === 'Polygon' && this.pdfViewer.polygonSettings) {
                    annotSettings = this.pdfViewer.polygonSettings;
                }
            }
            else if (annotation.measureType !== '') {
                if (annotation.measureType === 'Distance') {
                    annotSettings = this.pdfViewer.distanceSettings;
                }
                else if (annotation.measureType === 'Perimeter') {
                    annotSettings = this.pdfViewer.perimeterSettings;
                }
                else if (annotation.measureType === 'Area') {
                    annotSettings = this.pdfViewer.areaSettings;
                }
                else if (annotation.measureType === 'Radius') {
                    annotSettings = this.pdfViewer.radiusSettings;
                }
                else if (annotation.measureType === 'Volume') {
                    annotSettings = this.pdfViewer.volumeSettings;
                }
            }
        }
        var settings = annotation ? annotation.annotationSettings : {};
        if (settings && (settings.minWidth || settings.maxWidth || settings.minHeight || settings.maxHeight)) {
            return this.updateSettings(settings);
        }
        else if (isSettings) {
            return this.updateSettings(annotSettings);
        }
        else {
            return annotSettings;
        }
    };
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {any} - any
     */
    Annotation.prototype.updateAnnotationSettings = function (annotation) {
        var annotSettings = this.pdfViewer.annotationSettings;
        if (annotation.AnnotType === 'sticky') {
            annotSettings = this.pdfViewer.stickyNotesSettings;
        }
        else if (annotation.AnnotType === 'stamp' || annotation.AnnotType === 'image' || annotation.AnnotType === 'Image') {
            annotSettings = this.pdfViewer.stampSettings;
            if ((annotation.Subject === 'image' || annotation.Subject === 'Image')) {
                annotSettings = this.pdfViewer.customStampSettings;
            }
        }
        else if (annotation.AnnotType === 'freeText') {
            annotSettings = this.pdfViewer.freeTextSettings;
        }
        else if (annotation.AnnotType === 'ink' || annotation.AnnotationType === 'Ink') {
            annotSettings = this.pdfViewer.inkAnnotationSettings;
        }
        else if (annotation.AnnotType === 'shape') {
            if (annotation.Subject === 'Line') {
                annotSettings = this.pdfViewer.lineSettings;
            }
            else if ((annotation.Subject === 'Arrow' || annotation.Subject === 'LineWidthArrowHead')) {
                annotSettings = this.pdfViewer.arrowSettings;
            }
            else if ((annotation.Subject === 'Rectangle' || annotation.Subject === 'Square')) {
                annotSettings = this.pdfViewer.rectangleSettings;
            }
            else if ((annotation.Subject === 'Circle' || annotation.Subject === 'Ellipse' || annotation.Subject === 'Oval')) {
                annotSettings = this.pdfViewer.circleSettings;
            }
            else if (annotation.Subject === 'Polygon') {
                annotSettings = this.pdfViewer.polygonSettings;
            }
        }
        else if (annotation.AnnotType === 'shape_measure') {
            if ((annotation.Subject === 'Distance' || annotation.Subject === 'Distance calculation')) {
                annotSettings = this.pdfViewer.distanceSettings;
            }
            else if ((annotation.Subject === 'Perimeter' || annotation.Subject === 'Perimeter calculation')) {
                annotSettings = this.pdfViewer.perimeterSettings;
            }
            else if ((annotation.Subject === 'Area' || annotation.Subject === 'Area calculation')) {
                annotSettings = this.pdfViewer.areaSettings;
            }
            else if ((annotation.Subject === 'Radius' || annotation.Subject === 'Radius calculation')) {
                annotSettings = this.pdfViewer.radiusSettings;
            }
            else if ((annotation.Subject === 'Volume' || annotation.Subject === 'Volume calculation')) {
                annotSettings = this.pdfViewer.volumeSettings;
            }
        }
        else if (annotation.shapeAnnotationType === 'textMarkup') {
            if (annotation.subject === 'Highlight') {
                annotSettings = this.pdfViewer.highlightSettings;
            }
            else if (annotation.subject === 'Underline') {
                annotSettings = this.pdfViewer.underlineSettings;
            }
            else if (annotation.subject === 'Strikethrough') {
                annotSettings = this.pdfViewer.strikethroughSettings;
            }
        }
        return this.updateSettings(annotSettings);
    };
    /**
     * @param {any} annotationSettings - annotationSettings
     * @private
     * @returns {any} - any
     */
    Annotation.prototype.updateSettings = function (annotationSettings) {
        var maxHeight = 0;
        var maxWidth = 0;
        var minHeight = 0;
        var minWidth = 0;
        var isLock = false;
        var isPrint = true;
        var settings = this.pdfViewer.annotationSettings;
        if (annotationSettings.minWidth || annotationSettings.maxWidth || annotationSettings.minHeight || annotationSettings.maxHeight) {
            maxHeight = annotationSettings.maxHeight ? annotationSettings.maxHeight : 2000;
            maxWidth = annotationSettings.maxWidth ? annotationSettings.maxWidth : 2000;
            minHeight = annotationSettings.minHeight ? annotationSettings.minHeight : 0;
            minWidth = annotationSettings.minWidth ? annotationSettings.minWidth : 0;
        }
        else if (settings.minWidth || settings.maxWidth || settings.minHeight || settings.maxHeight) {
            maxHeight = settings.maxHeight ? settings.maxHeight : 2000;
            maxWidth = settings.maxWidth ? settings.maxWidth : 2000;
            minHeight = settings.minHeight ? settings.minHeight : 0;
            minWidth = settings.minWidth ? settings.minWidth : 0;
        }
        isLock = annotationSettings.isLock ? annotationSettings.isLock : settings.isLock ? settings.isLock : false;
        isPrint = annotationSettings.isPrint;
        return { minWidth: minWidth, maxWidth: maxWidth, minHeight: minHeight, maxHeight: maxHeight, isLock: isLock, isPrint: isPrint };
    };
    Annotation.prototype.getOverlappedAnnotations = function (annotation, pageNumber) {
        var pageCollections = this.getPageShapeAnnotations(pageNumber);
        var selectedAnnotation;
        for (var i = 0; i < pageCollections.length; i++) {
            if (annotation.annotName === pageCollections[parseInt(i.toString(), 10)].annotName) {
                selectedAnnotation = pageCollections[parseInt(i.toString(), 10)];
                break;
            }
        }
        var annotationCollection = this.findOverlappedAnnotations(selectedAnnotation, pageCollections);
        return annotationCollection;
    };
    Annotation.prototype.getPageShapeAnnotations = function (pageNumber) {
        var pageCollections = [];
        var inkObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_ink');
        if (inkObject) {
            var inkAnnotObject = JSON.parse(inkObject);
            if (inkAnnotObject) {
                var index = this.getPageCollection(inkAnnotObject, pageNumber);
                if (index != null && inkAnnotObject[parseInt(index.toString(), 10)]) {
                    var inkAnnotations = inkAnnotObject[parseInt(index.toString(), 10)].annotations;
                    if (inkAnnotations && inkAnnotations.length > 0) {
                        for (var i = 0; i < inkAnnotations.length; i++) {
                            pageCollections.push(inkAnnotations[parseInt(i.toString(), 10)]);
                        }
                    }
                }
            }
        }
        var shapeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_shape');
        if (shapeObject) {
            var shapeAnnotObject = JSON.parse(shapeObject);
            if (shapeAnnotObject) {
                var index = this.getPageCollection(shapeAnnotObject, pageNumber);
                if (index != null && shapeAnnotObject[parseInt(index.toString(), 10)]) {
                    var shapeAnnotations = shapeAnnotObject[parseInt(index.toString(), 10)].annotations;
                    if (shapeAnnotations && shapeAnnotations.length > 0) {
                        for (var i = 0; i < shapeAnnotations.length; i++) {
                            pageCollections.push(shapeAnnotations[parseInt(i.toString(), 10)]);
                        }
                    }
                }
            }
        }
        var measureObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_shape_measure');
        if (measureObject) {
            var measureAnnotationObject = JSON.parse(measureObject);
            if (measureAnnotationObject) {
                var index = this.getPageCollection(measureAnnotationObject, pageNumber);
                if (index != null && measureAnnotationObject[parseInt(index.toString(), 10)]) {
                    var measureAnnotations = measureAnnotationObject[parseInt(index.toString(), 10)].annotations;
                    if (measureAnnotations && measureAnnotations.length > 0) {
                        for (var i = 0; i < measureAnnotations.length; i++) {
                            pageCollections.push(measureAnnotations[parseInt(i.toString(), 10)]);
                        }
                    }
                }
            }
        }
        var stampObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_stamp');
        if (stampObject) {
            var stampAnnotationObject = JSON.parse(stampObject);
            if (stampAnnotationObject) {
                var index = this.getPageCollection(stampAnnotationObject, pageNumber);
                if (index != null && stampAnnotationObject[parseInt(index.toString(), 10)]) {
                    var stampAnnotations = stampAnnotationObject[parseInt(index.toString(), 10)].annotations;
                    if (stampAnnotations && stampAnnotations.length > 0) {
                        for (var i = 0; i < stampAnnotations.length; i++) {
                            pageCollections.push(stampAnnotations[parseInt(i.toString(), 10)]);
                        }
                    }
                }
            }
        }
        var freeTextObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_freetext');
        if (freeTextObject) {
            var freeTextAnnotationObject = JSON.parse(freeTextObject);
            if (freeTextAnnotationObject) {
                var index = this.getPageCollection(freeTextAnnotationObject, pageNumber);
                if (index != null && freeTextAnnotationObject[parseInt(index.toString(), 10)]) {
                    var freeTextAnnotations = freeTextAnnotationObject[parseInt(index.toString(), 10)].annotations;
                    if (freeTextAnnotations && freeTextAnnotations.length > 0) {
                        for (var i = 0; i < freeTextAnnotations.length; i++) {
                            pageCollections.push(freeTextAnnotations[parseInt(i.toString(), 10)]);
                        }
                    }
                }
            }
        }
        var stickyObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_sticky');
        if (stickyObject) {
            var stickyNotesAnnotationObject = JSON.parse(stickyObject);
            if (stickyNotesAnnotationObject) {
                var index = this.getPageCollection(stickyNotesAnnotationObject, pageNumber);
                if (index != null && stickyNotesAnnotationObject[parseInt(index.toString(), 10)]) {
                    var stickyNotesAnnotations = stickyNotesAnnotationObject[parseInt(index.toString(), 10)].annotations;
                    if (stickyNotesAnnotations && stickyNotesAnnotations.length > 0) {
                        for (var i = 0; i < stickyNotesAnnotations.length; i++) {
                            pageCollections.push(stickyNotesAnnotations[parseInt(i.toString(), 10)]);
                        }
                    }
                }
            }
        }
        var textMarkupObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
        if (textMarkupObject) {
            var textMarkupAnnotationObject = JSON.parse(textMarkupObject);
            if (textMarkupAnnotationObject) {
                var index = this.getPageCollection(textMarkupAnnotationObject, pageNumber);
                if (index != null && textMarkupAnnotationObject[parseInt(index.toString(), 10)]) {
                    var textMarkupAnnotations = textMarkupAnnotationObject[parseInt(index.toString(), 10)].annotations;
                    if (textMarkupAnnotations && textMarkupAnnotations.length > 0) {
                        for (var i = 0; i < textMarkupAnnotations.length; i++) {
                            pageCollections.push(textMarkupAnnotations[parseInt(i.toString(), 10)]);
                        }
                    }
                }
            }
        }
        return pageCollections;
    };
    Annotation.prototype.findOverlappedAnnotations = function (annotation, pageCollections) {
        this.overlappedAnnotations = [];
        if (annotation && annotation.bounds) {
            if (annotation.shapeAnnotationType === 'textMarkup') {
                for (var i = 0; i < annotation.bounds.length; i++) {
                    var bounds = this.orderTextMarkupBounds(annotation.bounds[parseInt(i.toString(), 10)]);
                    this.calculateOverlappedAnnotationBounds(annotation, bounds, pageCollections);
                }
            }
            else {
                this.calculateOverlappedAnnotationBounds(annotation, annotation.bounds, pageCollections);
            }
        }
        return this.overlappedAnnotations;
    };
    Annotation.prototype.calculateOverlappedAnnotationBounds = function (annotation, bounds, pageCollections) {
        var selectBounds = bounds;
        if (annotation.shapeAnnotationType === 'Ink') {
            selectBounds = { left: bounds.x, top: bounds.y, height: bounds.height, width: bounds.width };
        }
        var left = parseInt(selectBounds.left, 10);
        var top = parseInt(selectBounds.top, 10);
        var totalHeight = parseInt(selectBounds.top + selectBounds.height, 10);
        var totalWidth = parseInt(selectBounds.left + selectBounds.width, 10);
        for (var i = 0; i < pageCollections.length; i++) {
            if (annotation.annotName === pageCollections[parseInt(i.toString(), 10)].annotName) {
                this.checkOverlappedCollections(pageCollections[parseInt(i.toString(), 10)], this.overlappedAnnotations);
            }
            else {
                var boundsCount = 1;
                if (pageCollections[parseInt(i.toString(), 10)].shapeAnnotationType === 'textMarkup') {
                    boundsCount = pageCollections[parseInt(i.toString(), 10)].bounds.length;
                }
                for (var j = 0; j < boundsCount; j++) {
                    var annotationBounds = void 0;
                    var annotationBoundsCollection = pageCollections[parseInt(i.toString(), 10)].bounds;
                    if (pageCollections[parseInt(i.toString(), 10)].shapeAnnotationType === 'Ink') {
                        annotationBoundsCollection = { left: annotationBoundsCollection.x, top: annotationBoundsCollection.y,
                            height: annotationBoundsCollection.height, width: annotationBoundsCollection.width };
                    }
                    if (pageCollections[parseInt(i.toString(), 10)].shapeAnnotationType !== 'textMarkup' && boundsCount === 1) {
                        annotationBounds = annotationBoundsCollection;
                    }
                    else {
                        annotationBounds = this.orderTextMarkupBounds(annotationBoundsCollection[parseInt(j.toString(), 10)]);
                    }
                    if (annotationBounds) {
                        var isOverlapped = false;
                        if (((left <= parseInt(annotationBounds.left, 10)) && (totalWidth >= parseInt(annotationBounds.left, 10))) ||
                            ((left <= parseInt(annotationBounds.left + annotationBounds.width, 10)) &&
                                (totalWidth >= parseInt(annotationBounds.left + annotationBounds.width, 10)))) {
                            isOverlapped = true;
                        }
                        if (isOverlapped) {
                            if (((top <= parseInt(annotationBounds.top, 10)) && (totalHeight >= parseInt(annotationBounds.top, 10))) ||
                                ((top <= parseInt(annotationBounds.top + annotationBounds.height, 10)) &&
                                    (totalHeight >= parseInt(annotationBounds.top + annotationBounds.height, 10)))) {
                                isOverlapped = true;
                            }
                            else {
                                isOverlapped = false;
                            }
                        }
                        if (isOverlapped) {
                            this.checkOverlappedCollections(pageCollections[parseInt(i.toString(), 10)], this.overlappedAnnotations);
                        }
                        else {
                            if (((parseInt(annotationBounds.left, 10) <= left) &&
                                (parseInt(annotationBounds.left + annotationBounds.width, 10) >= left)) ||
                                ((totalWidth >= parseInt(annotationBounds.left, 10)) &&
                                    (totalWidth <= parseInt(annotationBounds.left + annotationBounds.width, 10)))) {
                                isOverlapped = true;
                            }
                            if (isOverlapped) {
                                if (((parseInt(annotationBounds.top, 10) <= top) &&
                                    parseInt(annotationBounds.top + annotationBounds.height, 10) >= top) ||
                                    ((totalHeight >= parseInt(annotationBounds.top, 10)) &&
                                        (totalHeight <= parseInt(annotationBounds.top + annotationBounds.height, 10)))) {
                                    isOverlapped = true;
                                }
                                else {
                                    isOverlapped = false;
                                }
                            }
                            if (isOverlapped) {
                                this.checkOverlappedCollections(pageCollections[parseInt(i.toString(), 10)], this.overlappedAnnotations);
                            }
                            else {
                                if (((left <= parseInt(annotationBounds.left, 10)) &&
                                    (totalWidth >= parseInt(annotationBounds.left, 10))) ||
                                    ((left <= parseInt(annotationBounds.left + annotationBounds.width, 10)) &&
                                        (totalWidth >= parseInt(annotationBounds.left + annotationBounds.width, 10)))) {
                                    isOverlapped = true;
                                }
                                if (isOverlapped) {
                                    if (((parseInt(annotationBounds.top, 10) <= top) &&
                                        parseInt(annotationBounds.top + annotationBounds.height, 10) >= top) ||
                                        ((totalHeight >= parseInt(annotationBounds.top, 10)) &&
                                            (totalHeight <= parseInt(annotationBounds.top + annotationBounds.height, 10)))) {
                                        isOverlapped = true;
                                    }
                                    else {
                                        isOverlapped = false;
                                    }
                                }
                                if (isOverlapped) {
                                    this.checkOverlappedCollections(pageCollections[parseInt(i.toString(), 10)], this.overlappedAnnotations);
                                }
                                else {
                                    if (((parseInt(annotationBounds.left, 10) <= left) &&
                                        (parseInt(annotationBounds.left + annotationBounds.width, 10) >= left)) ||
                                        ((totalWidth >= parseInt(annotationBounds.left, 10)) &&
                                            (totalWidth <= parseInt(annotationBounds.left + annotationBounds.width, 10)))) {
                                        isOverlapped = true;
                                    }
                                    if (isOverlapped) {
                                        if (((top <= parseInt(annotationBounds.top, 10)) &&
                                            (totalHeight >= parseInt(annotationBounds.top, 10))) ||
                                            ((top <= parseInt(annotationBounds.top + annotationBounds.height, 10)) &&
                                                (totalHeight >= parseInt(annotationBounds.top + annotationBounds.height, 10)))) {
                                            isOverlapped = true;
                                        }
                                        else {
                                            isOverlapped = false;
                                        }
                                    }
                                    if (isOverlapped) {
                                        this.checkOverlappedCollections(pageCollections[parseInt(i.toString(), 10)], this.overlappedAnnotations);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * @param {any} annotation - annotation
     * @param {number} pageNumber - pageNumber
     * @param {string} type - type
     * @private
     * @returns {string} - string
     */
    Annotation.prototype.findAnnotationMode = function (annotation, pageNumber, type) {
        var importCollection = this.pdfViewer.viewerBase.importedAnnotation[parseInt(pageNumber.toString(), 10)];
        if (importCollection) {
            var collection = void 0;
            if (type === 'shape') {
                collection = importCollection.shapeAnnotation;
            }
            else if (type === 'shape_measure') {
                collection = importCollection.measureShapeAnnotation;
            }
            else if (type === 'freeText') {
                collection = importCollection.freeTextAnnotation;
            }
            else if (type === 'stamp') {
                collection = importCollection.stampAnnotations;
            }
            else if (type === 'sticky') {
                collection = importCollection.stickyNotesAnnotation;
            }
            else if (type === 'textMarkup') {
                collection = importCollection.textMarkupAnnotation;
            }
            if (collection) {
                for (var i = 0; i < collection.length; i++) {
                    if (collection[parseInt(i.toString(), 10)].AnnotName === annotation.AnnotName) {
                        return 'Imported Annotation';
                    }
                }
            }
        }
        return 'Existing Annotation';
    };
    Annotation.prototype.checkOverlappedCollections = function (annotation, overlappedCollections) {
        if (overlappedCollections.length > 0) {
            var isAdded = false;
            for (var i = 0; i < overlappedCollections.length; i++) {
                if (annotation.annotName === overlappedCollections[parseInt(i.toString(), 10)].annotName &&
                    annotation.bounds === overlappedCollections[parseInt(i.toString(), 10)].bounds) {
                    isAdded = true;
                    break;
                }
            }
            if (!isAdded) {
                overlappedCollections.push(annotation);
            }
        }
        else {
            overlappedCollections.push(annotation);
        }
    };
    Annotation.prototype.orderTextMarkupBounds = function (bounds) {
        if (bounds.Left || bounds.Width) {
            return { left: bounds.Left, top: bounds.Top, height: bounds.Height, width: bounds.Width };
        }
        else {
            return { left: bounds.left, top: bounds.top, height: bounds.height, width: bounds.width };
        }
    };
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {void}
     */
    Annotation.prototype.updateModifiedDate = function (annotation) {
        if (annotation.modifiedDate) {
            annotation.modifiedDate = this.setAnnotationModifiedDate(annotation.modifiedDate);
        }
        if (annotation.comments && annotation.comments.length > 0) {
            for (var i = 0; i < annotation.comments.length; i++) {
                if (annotation.comments[parseInt(i.toString(), 10)].modifiedDate) {
                    annotation.comments[parseInt(i.toString(), 10)].modifiedDate =
                        this.setAnnotationModifiedDate(annotation.comments[parseInt(i.toString(), 10)].modifiedDate);
                    if (annotation.comments[parseInt(i.toString(), 10)].review &&
                        annotation.comments[parseInt(i.toString(), 10)].review.modifiedDate) {
                        annotation.comments[parseInt(i.toString(), 10)].review.modifiedDate =
                            this.setAnnotationModifiedDate(annotation.comments[parseInt(i.toString(), 10)].review.modifiedDate);
                    }
                }
            }
        }
        if (annotation.review && annotation.review.modifiedDate) {
            annotation.review.modifiedDate = this.setAnnotationModifiedDate(annotation.review.modifiedDate);
        }
    };
    Annotation.prototype.setAnnotationModifiedDate = function (date) {
        var modifiedTime;
        var modifiedDateTime;
        if (date !== '') {
            var time = parseInt(date.split(' ')[1].split(':')[0], 10);
            if (date.split(' ').length === 3) {
                modifiedTime = time + ':' + date.split(' ')[1].split(':')[1] + ':' + date.split(' ')[1].split(':')[2] + ' ' + date.split(' ')[2];
            }
            else {
                if (time >= 12) {
                    if (time === 12) {
                        modifiedTime = time + ':' + date.split(' ')[1].split(':')[1] + ':' + date.split(' ')[1].split(':')[2] + ' PM';
                    }
                    else {
                        modifiedTime = (time - 12) + ':' + date.split(' ')[1].split(':')[1] + ':' + date.split(' ')[1].split(':')[2] + ' PM';
                    }
                }
                else {
                    modifiedTime = time + ':' + date.split(' ')[1].split(':')[1] + ':' + date.split(' ')[1].split(':')[2] + ' AM';
                }
            }
            var dateString = date.split(' ')[0];
            var dateStringSpilt = date.split(',');
            if (dateStringSpilt.length > 1) {
                modifiedDateTime = dateString + (' ') + modifiedTime;
            }
            else {
                modifiedDateTime = dateString + (', ') + modifiedTime;
            }
        }
        else {
            return date;
        }
        var isTwelveHourFormat = /\u0041\u004D|\u0050\u004D/i.test(modifiedDateTime);
        if (isTwelveHourFormat) {
            var modifiedDateToUTC = new Date(modifiedDateTime);
            modifiedDateTime = modifiedDateToUTC.toISOString();
        }
        return modifiedDateTime;
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.clear = function () {
        if (this.shapeAnnotationModule) {
            this.shapeAnnotationModule.shapeCount = 0;
        }
        if (this.measureAnnotationModule) {
            this.measureAnnotationModule.measureShapeCount = 0;
        }
        if (this.textMarkupAnnotationModule) {
            this.textMarkupAnnotationModule.clear();
        }
        if (this.stickyNotesAnnotationModule) {
            this.stickyNotesAnnotationModule.clear();
        }
        this.pdfViewer.refresh();
        this.undoCommentsElement = [];
        this.redoCommentsElement = [];
        this.overlappedAnnotations = [];
        this.previousIndex = null;
        if (this.pdfViewer.annotation && this.pdfViewer.annotation.stampAnnotationModule) {
            this.pdfViewer.annotation.stampAnnotationModule.stampPageNumber = [];
        }
        if (this.pdfViewer.annotation && this.pdfViewer.annotation.freeTextAnnotationModule) {
            this.pdfViewer.annotation.freeTextAnnotationModule.freeTextPageNumbers = [];
            this.freeTextAnnotationModule.previousText = 'Type Here';
        }
        if (this.pdfViewer.annotation && this.pdfViewer.annotation.inkAnnotationModule) {
            this.pdfViewer.annotation.inkAnnotationModule.inkAnnotationindex = [];
        }
        PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_shape');
        PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_shape_measure');
        PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_stamp');
        PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_sticky');
    };
    Annotation.prototype.retrieveAnnotationCollection = function () {
        return this.pdfViewer.annotationCollection;
    };
    /**
     * @param {string} interaction - interaction
     * @param {any} annotation - annotation
     * @private
     * @returns {boolean} - boolean
     */
    Annotation.prototype.checkAllowedInteractions = function (interaction, annotation) {
        var annotationInteraction = this.updateAnnotationAllowedInteractions(annotation);
        if (annotationInteraction && annotationInteraction.length > 0) {
            for (var i = 0; i < annotationInteraction.length; i++) {
                if (interaction === 'Select') {
                    if (annotationInteraction[parseInt(i.toString(), 10)] === 'Move' || annotationInteraction[parseInt(i.toString(), 10)] === 'Resize' || annotationInteraction[parseInt(i.toString(), 10)] === 'Delete' || annotationInteraction[parseInt(i.toString(), 10)] === 'PropertyChange' || annotationInteraction[parseInt(i.toString(), 10)] === 'Select') {
                        return true;
                    }
                }
                else {
                    if (annotationInteraction[parseInt(i.toString(), 10)] === interaction) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * @param {any} menuObj - menuObj
     * @private
     * @returns {void}
     */
    Annotation.prototype.checkContextMenuDeleteItem = function (menuObj) {
        var annotation = this.findCurrentAnnotation();
        if (annotation && annotation.annotationSettings) {
            if (annotation.annotationSettings.isLock) {
                if (this.checkAllowedInteractions('Delete', annotation)) {
                    menuObj.enableItems([this.pdfViewer.localeObj.getConstant('Delete Context')], true);
                }
                else {
                    menuObj.enableItems([this.pdfViewer.localeObj.getConstant('Delete Context')], false);
                }
            }
            else {
                menuObj.enableItems([this.pdfViewer.localeObj.getConstant('Delete Context')], true);
            }
        }
    };
    /**
     * @private
     * @returns {boolean} - boolean
     */
    Annotation.prototype.isEnableDelete = function () {
        var annotation = this.findCurrentAnnotation();
        if (annotation && annotation.annotationSettings) {
            if (annotation.annotationSettings.isLock) {
                if (this.checkAllowedInteractions('Delete', annotation)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     * @returns {ITextMarkupAnnotation | PdfAnnotationBaseModel} - ITextMarkupAnnotation | PdfAnnotationBaseModel
     */
    Annotation.prototype.findCurrentAnnotation = function () {
        if (this.textMarkupAnnotationModule && this.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
            return this.textMarkupAnnotationModule.currentTextMarkupAnnotation;
        }
        if (this.pdfViewer.selectedItems.annotations && this.pdfViewer.selectedItems.annotations[0]) {
            return this.pdfViewer.selectedItems.annotations[0];
        }
        return null;
    };
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {string[]} - return string array
     */
    Annotation.prototype.updateAnnotationAllowedInteractions = function (annotation) {
        var annotationInteraction = ['None'];
        if (annotation) {
            if (annotation.shapeAnnotationType === 'FreeText' && this.pdfViewer.freeTextSettings.allowedInteractions) {
                annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.freeTextSettings.allowedInteractions, annotation.allowedInteractions);
            }
            else if (annotation.shapeAnnotationType === 'Ink' && this.pdfViewer.inkAnnotationSettings.allowedInteractions) {
                annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.inkAnnotationSettings.allowedInteractions, annotation.allowedInteractions);
            }
            else if (annotation.shapeAnnotationType === 'StickyNotes' && this.pdfViewer.stickyNotesSettings.allowedInteractions) {
                annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.stickyNotesSettings.allowedInteractions, annotation.allowedInteractions);
            }
            else if (annotation.shapeAnnotationType === 'Stamp' && this.pdfViewer.stampSettings.allowedInteractions) {
                annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.stampSettings.allowedInteractions, annotation.allowedInteractions);
            }
            else if (annotation.shapeAnnotationType === 'Image' && this.pdfViewer.customStampSettings.allowedInteractions) {
                annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.customStampSettings.allowedInteractions, annotation.allowedInteractions);
            }
            else if (annotation.shapeAnnotationType === 'textMarkup') {
                if (annotation.textMarkupAnnotationType === 'Highlight' && this.pdfViewer.highlightSettings.allowedInteractions) {
                    annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.highlightSettings.allowedInteractions, annotation.allowedInteractions);
                }
                else if (annotation.textMarkupAnnotationType === 'Underline' && this.pdfViewer.underlineSettings.allowedInteractions) {
                    annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.underlineSettings.allowedInteractions, annotation.allowedInteractions);
                }
                else if (annotation.textMarkupAnnotationType === 'Strikethrough' && this.pdfViewer.strikethroughSettings.allowedInteractions) {
                    annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.strikethroughSettings.allowedInteractions, annotation.allowedInteractions);
                }
            }
            else {
                if (annotation.measureType !== '') {
                    if (annotation.measureType === 'Distance' && this.pdfViewer.distanceSettings.allowedInteractions) {
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.distanceSettings.
                            allowedInteractions, annotation.allowedInteractions);
                    }
                    else if (annotation.measureType === 'Perimeter' && this.pdfViewer.perimeterSettings.allowedInteractions) {
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.perimeterSettings.
                            allowedInteractions, annotation.allowedInteractions);
                    }
                    else if (annotation.measureType === 'Radius' && this.pdfViewer.radiusSettings.allowedInteractions) {
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.radiusSettings.
                            allowedInteractions, annotation.allowedInteractions);
                    }
                    else if (annotation.measureType === 'Area' && this.pdfViewer.areaSettings.allowedInteractions) {
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.areaSettings.
                            allowedInteractions, annotation.allowedInteractions);
                    }
                    else if (annotation.measureType === 'Volume' && this.pdfViewer.volumeSettings.allowedInteractions) {
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.volumeSettings.
                            allowedInteractions, annotation.allowedInteractions);
                    }
                }
                else {
                    if (annotation.shapeAnnotationType === 'Line' && this.pdfViewer.lineSettings.allowedInteractions) {
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.lineSettings.
                            allowedInteractions, annotation.allowedInteractions);
                    }
                    else if ((annotation.shapeAnnotationType === 'Arrow' || annotation.shapeAnnotationType === 'LineWidthArrowHead') && this.pdfViewer.arrowSettings.allowedInteractions) {
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.arrowSettings.
                            allowedInteractions, annotation.allowedInteractions);
                    }
                    else if ((annotation.shapeAnnotationType === 'Circle' || annotation.shapeAnnotationType === 'Ellipse' || annotation.shapeAnnotationType === 'Oval') && this.pdfViewer.circleSettings.allowedInteractions) {
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.circleSettings.
                            allowedInteractions, annotation.allowedInteractions);
                    }
                    else if ((annotation.shapeAnnotationType === 'Rectangle' || annotation.shapeAnnotationType === 'Square') && this.pdfViewer.rectangleSettings.allowedInteractions) {
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.rectangleSettings.
                            allowedInteractions, annotation.allowedInteractions);
                    }
                    else if (annotation.shapeAnnotationType === 'Polygon' && this.pdfViewer.polygonSettings.allowedInteractions) {
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.polygonSettings.
                            allowedInteractions, annotation.allowedInteractions);
                    }
                }
            }
        }
        return annotationInteraction;
    };
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {boolean} -boolean
     */
    Annotation.prototype.checkIsLockSettings = function (annotation) {
        var isLocked = false;
        if (annotation) {
            if (annotation.shapeAnnotationType === 'FreeText') {
                isLocked = this.checkLockSettings(this.pdfViewer.freeTextSettings.isLock);
            }
            else if (annotation.shapeAnnotationType === 'Ink') {
                isLocked = this.checkLockSettings(this.pdfViewer.inkAnnotationSettings.isLock);
            }
            else if (annotation.shapeAnnotationType === 'StickyNotes') {
                isLocked = this.checkLockSettings(this.pdfViewer.stickyNotesSettings.isLock);
            }
            else if (annotation.shapeAnnotationType === 'Stamp') {
                isLocked = this.checkLockSettings(this.pdfViewer.stampSettings.isLock);
            }
            else if (annotation.shapeAnnotationType === 'Image') {
                isLocked = this.checkLockSettings(this.pdfViewer.customStampSettings.isLock);
            }
            else if (annotation.shapeAnnotationType === 'textMarkup') {
                if (annotation.textMarkupAnnotationType === 'Highlight') {
                    isLocked = this.checkLockSettings(this.pdfViewer.highlightSettings.isLock);
                }
                else if (annotation.textMarkupAnnotationType === 'Underline') {
                    isLocked = this.checkLockSettings(this.pdfViewer.underlineSettings.isLock);
                }
                else if (annotation.textMarkupAnnotationType === 'Strikethrough') {
                    isLocked = this.checkLockSettings(this.pdfViewer.strikethroughSettings.isLock);
                }
            }
            else {
                if (annotation.measureType !== '') {
                    if (annotation.measureType === 'Distance') {
                        isLocked = this.checkLockSettings(this.pdfViewer.distanceSettings.isLock);
                    }
                    else if (annotation.measureType === 'Perimeter') {
                        isLocked = this.checkLockSettings(this.pdfViewer.perimeterSettings.isLock);
                    }
                    else if (annotation.measureType === 'Radius') {
                        isLocked = this.checkLockSettings(this.pdfViewer.radiusSettings.isLock);
                    }
                    else if (annotation.measureType === 'Area') {
                        isLocked = this.checkLockSettings(this.pdfViewer.areaSettings.isLock);
                    }
                    else if (annotation.measureType === 'Volume') {
                        isLocked = this.checkLockSettings(this.pdfViewer.volumeSettings.isLock);
                    }
                }
                else {
                    if (annotation.shapeAnnotationType === 'Line') {
                        isLocked = this.checkLockSettings(this.pdfViewer.lineSettings.isLock);
                    }
                    else if ((annotation.shapeAnnotationType === 'Arrow' || annotation.shapeAnnotationType === 'LineWidthArrowHead')) {
                        isLocked = this.checkLockSettings(this.pdfViewer.arrowSettings.isLock);
                    }
                    else if ((annotation.shapeAnnotationType === 'Circle' || annotation.shapeAnnotationType === 'Ellipse' || annotation.shapeAnnotationType === 'Oval')) {
                        isLocked = this.checkLockSettings(this.pdfViewer.circleSettings.isLock);
                    }
                    else if ((annotation.shapeAnnotationType === 'Rectangle' || annotation.shapeAnnotationType === 'Square')) {
                        isLocked = this.checkLockSettings(this.pdfViewer.rectangleSettings.isLock);
                    }
                    else if (annotation.shapeAnnotationType === 'Polygon') {
                        isLocked = this.checkLockSettings(this.pdfViewer.polygonSettings.isLock);
                    }
                }
            }
        }
        return isLocked;
    };
    Annotation.prototype.checkLockSettings = function (locked) {
        var islock = false;
        if (locked || this.pdfViewer.annotationSettings.isLock) {
            islock = true;
        }
        return islock;
    };
    /**
     * @private
     * @returns {boolean} - boolean
     */
    Annotation.prototype.restrictContextMenu = function () {
        var isRestrict = false;
        var annotation = this.findCurrentAnnotation();
        if (annotation && this.checkIsLockSettings(annotation) && this.checkAllowedInteractions('Select', annotation)) {
            isRestrict = true;
        }
        return isRestrict;
    };
    Annotation.prototype.checkAllowedInteractionSettings = function (annotationInteraction, annotationAllowedInteraction) {
        if (annotationAllowedInteraction) {
            if (annotationAllowedInteraction.length === 1) {
                if (annotationAllowedInteraction[0] !== 'None') {
                    return annotationAllowedInteraction;
                }
            }
            else {
                return annotationAllowedInteraction;
            }
        }
        if (annotationInteraction) {
            if (annotationInteraction.length === 1) {
                if (annotationInteraction[0] !== 'None') {
                    return annotationInteraction;
                }
            }
            else {
                return annotationInteraction;
            }
        }
        if (this.pdfViewer.annotationSettings.allowedInteractions) {
            return this.pdfViewer.annotationSettings.allowedInteractions;
        }
        return ['None'];
    };
    /**
     * @param {string} value - value
     * @param {string} type - type
     * @private
     * @returns {string} - string
     */
    Annotation.prototype.getValue = function (value, type) {
        type = !type ? 'hex' : type.toLowerCase();
        if (value[0] === 'r') {
            var cValue = this.convertRgbToNumberArray(value);
            if (type === 'hex' || type === 'hexa') {
                var hex = this.rgbToHex(cValue);
                return type === 'hex' ? hex.slice(0, 7) : hex;
            }
            else {
                if (type === 'hsv') {
                    // eslint-disable-next-line
                    return this.convertToHsvString(this.rgbToHsv.apply(this, cValue.slice(0, 3)));
                }
                else {
                    if (type === 'hsva') {
                        // eslint-disable-next-line
                        return this.convertToHsvString(this.rgbToHsv.apply(this, cValue));
                    }
                    else {
                        return 'null';
                    }
                }
            }
        }
        else {
            if (value[0] === 'h') {
                // eslint-disable-next-line
                var cValue = this.hsvToRgb.apply(this, this.convertRgbToNumberArray(value));
                if (type === 'rgba') {
                    return this.convertToRgbString(cValue);
                }
                else {
                    if (type === 'hex' || type === 'hexa') {
                        var hex = this.rgbToHex(cValue);
                        return type === 'hex' ? hex.slice(0, 7) : hex;
                    }
                    else {
                        if (type === 'rgb') {
                            return this.convertToRgbString(cValue.slice(0, 3));
                        }
                        else {
                            return 'null';
                        }
                    }
                }
            }
            else {
                value = this.roundValue(value);
                var rgb = this.hexToRgb(value);
                if (type === 'rgb' || type === 'hsv') {
                    rgb = rgb.slice(0, 3);
                }
                if (type === 'rgba' || type === 'rgb') {
                    return this.convertToRgbString(rgb);
                }
                else {
                    if (type === 'hsva' || type === 'hsv') {
                        // eslint-disable-next-line
                        return this.convertToHsvString(this.rgbToHsv.apply(this, rgb));
                    }
                    else {
                        if (type === 'hex') {
                            return value.slice(0, 7);
                        }
                        else {
                            if (type === 'a') {
                                return rgb[3].toString();
                            }
                            else {
                                return 'null';
                            }
                        }
                    }
                }
            }
        }
    };
    Annotation.prototype.convertRgbToNumberArray = function (value) {
        return (value.slice(value.indexOf('(') + 1, value.indexOf(')'))).split(',').map(function (n, i) {
            return (i !== 3) ? parseInt(n, 10) : parseFloat(n);
        });
    };
    Annotation.prototype.convertToRgbString = function (rgb) {
        return rgb.length ? rgb.length === 4 ? 'rgba(' + rgb.join() + ')' : 'rgb(' + rgb.join() + ')' : '';
    };
    Annotation.prototype.convertToHsvString = function (hsv) {
        return hsv.length === 4 ? 'hsva(' + hsv.join() + ')' : 'hsv(' + hsv.join() + ')';
    };
    Annotation.prototype.roundValue = function (value) {
        if (!value) {
            return '';
        }
        if (value[0] !== '#') {
            value = '#' + value;
        }
        var len = value.length;
        if (len === 4) {
            value += 'f';
            len = 5;
        }
        if (len === 5) {
            var tempValue = '';
            for (var i = 1, len_1 = value.length; i < len_1; i++) {
                tempValue += (value.charAt(i) + value.charAt(i));
            }
            value = '#' + tempValue;
            len = 9;
        }
        if (len === 7) {
            value += 'ff';
        }
        return value;
    };
    Annotation.prototype.hexToRgb = function (hex) {
        if (!hex) {
            return [];
        }
        hex = hex.trim();
        if (hex.length !== 9) {
            hex = this.roundValue(hex);
        }
        var opacity = Number((parseInt(hex.slice(-2), 16) / 255).toFixed(2));
        hex = hex.slice(1, 7);
        var bigInt = parseInt(hex, 16);
        var h = [];
        h.push((bigInt >> 16) & 255);
        h.push((bigInt >> 8) & 255);
        h.push(bigInt & 255);
        h.push(opacity);
        return h;
    };
    Annotation.prototype.rgbToHsv = function (r, g, b, opacity) {
        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h;
        var v = max;
        var d = max - min;
        var s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        var hsv = [Math.round(h * 360), Math.round(s * 1000) / 10, Math.round(v * 1000) / 10];
        if (!isNullOrUndefined(opacity)) {
            hsv.push(opacity);
        }
        return hsv;
    };
    Annotation.prototype.hsvToRgb = function (h, s, v, opacity) {
        var r;
        var g;
        var b;
        s /= 100;
        v /= 100;
        if (s === 0) {
            r = g = b = v;
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), opacity];
        }
        h /= 60;
        var i = Math.floor(h);
        var f = h - i;
        var p = v * (1 - s);
        var q = v * (1 - s * f);
        var t = v * (1 - s * (1 - f));
        switch (i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            default:
                r = v;
                g = p;
                b = q;
        }
        var rgb = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        if (!isNullOrUndefined(opacity)) {
            rgb.push(opacity);
        }
        return rgb;
    };
    Annotation.prototype.rgbToHex = function (rgb) {
        return rgb.length ? ('#' + this.hex(rgb[0]) + this.hex(rgb[1]) + this.hex(rgb[2]) +
            (!isNullOrUndefined(rgb[3]) ? (rgb[3] !== 0 ? (Math.round(rgb[3] * 255) + 0x10000).toString(16).substr(-2) : '00') : '')) : '';
    };
    /**
     * @param {AnnotationDataFormat} dataFormat - dataFormat
     * @private
     * @returns {Promise} - promise
     */
    Annotation.prototype.exportAnnotationsAsStream = function (dataFormat) {
        var _this = this;
        if (this.pdfViewer.annotationModule) {
            var isAnnotations = this.pdfViewer.viewerBase.updateExportItem();
            if (isAnnotations) {
                return new Promise(function (resolve, reject) {
                    _this.pdfViewer.viewerBase.createRequestForExportAnnotations(true, dataFormat, true).then(function (value) {
                        resolve(value);
                    });
                });
            }
        }
        return null;
    };
    Annotation.prototype.hex = function (x) {
        if (!isNullOrUndefined(x)) {
            return ('0' + x.toString(16)).slice(-2);
        }
        else {
            return '0';
        }
    };
    /**
     * @param {any} obj - obj
     * @private
     * @returns {Object} - Object
     */
    Annotation.prototype.cloneObject = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.destroy = function () {
        this.destroyPropertiesWindow();
        if (this.textMarkupAnnotationModule) {
            this.textMarkupAnnotationModule.clear();
        }
    };
    /**
     * @private
     * @returns {string} - string
     */
    Annotation.prototype.getModuleName = function () {
        return 'Annotation';
    };
    /**
     * Get vertex points properties
     *
     * @param {IPoint[]} points - points
     * @private
     * @returns {IPointBase[]} - IPointBase[]
     */
    Annotation.prototype.getVertexPointsXY = function (points) {
        var vertexPoints = [];
        //Converting points model into vertex property
        for (var j = 0; j < points.length; j++) {
            vertexPoints[parseInt(j.toString(), 10)] = { X: points[parseInt(j.toString(), 10)].x, Y: points[parseInt(j.toString(), 10)].y };
        }
        return vertexPoints;
    };
    /**
     * Method used to add annotations using program.
     *
     * @param {AnnotationType} annotationType - It describes type of annotation object.
     * @param {FreeTextSettings} options -  It describes about the annotation objects and it's property.
     * @param {DynamicStampItem} dynamicStampItem - It describe which type of dynamic stamp.
     * @param {SignStampItem} signStampItem - It describe which type of sign stamp.
     * @param {StandardBusinessStampItem} standardBusinessStampItem - It describe which type of standard business stamp.
     * @returns {void}
     */
    Annotation.prototype.addAnnotation = function (annotationType, options, dynamicStampItem, signStampItem, standardBusinessStampItem) {
        //Initialize the bounds and pageNumber
        var offset = { x: 1, y: 1 };
        var pageNumber = 0;
        if (options) {
            if (options.pageNumber && options.pageNumber > 0) {
                pageNumber = options.pageNumber ? options.pageNumber - 1 : 0;
            }
        }
        //Initialize the pdf annotation object array
        var annotationObject = null;
        var pdfAnnotation = [];
        this.pdfViewer.annotation.triggerAnnotationUnselectEvent();
        //Seperate the annotation type with it's method
        if (annotationType === 'FreeText') {
            pdfAnnotation[parseInt(pageNumber.toString(), 10)] =
                this.pdfViewer.annotation.freeTextAnnotationModule.updateAddAnnotationDetails(options, offset);
            this.pdfViewer.annotation.freeTextAnnotationModule.isAddAnnotationProgramatically = true;
        }
        else if (annotationType === 'StickyNotes') {
            pdfAnnotation[parseInt(pageNumber.toString(), 10)] =
                this.pdfViewer.annotation.stickyNotesAnnotationModule.updateAddAnnotationDetails(options, offset);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.isAddAnnotationProgramatically = true;
        }
        else if (annotationType === 'Highlight' || annotationType === 'Underline' || annotationType === 'Strikethrough') {
            if (annotationType === 'Highlight') {
                annotationObject = options;
            }
            else if (annotationType === 'Underline') {
                annotationObject = options;
            }
            else if (annotationType === 'Strikethrough') {
                annotationObject = options;
            }
            pdfAnnotation[parseInt(pageNumber.toString(), 10)] =
                this.pdfViewer.annotation.textMarkupAnnotationModule.updateAddAnnotationDetails(annotationType, annotationObject);
            this.pdfViewer.annotation.textMarkupAnnotationModule.isAddAnnotationProgramatically = true;
        }
        else if (annotationType === 'Line' || annotationType === 'Arrow' || annotationType === 'Rectangle' || annotationType === 'Circle' || annotationType === 'Polygon') {
            if (annotationType === 'Line') {
                annotationObject = options;
            }
            else if (annotationType === 'Arrow') {
                annotationObject = options;
            }
            else if (annotationType === 'Rectangle') {
                annotationObject = options;
            }
            else if (annotationType === 'Circle') {
                annotationObject = options;
            }
            else if (annotationType === 'Polygon') {
                annotationObject = options;
            }
            pdfAnnotation[parseInt(pageNumber.toString(), 10)] =
                this.pdfViewer.annotation.shapeAnnotationModule.updateAddAnnotationDetails(annotationType, annotationObject, offset);
            this.pdfViewer.annotation.shapeAnnotationModule.isAddAnnotationProgramatically = true;
        }
        else if (annotationType === 'Distance' || annotationType === 'Perimeter' || annotationType === 'Area' || annotationType === 'Radius' || annotationType === 'Volume') {
            if (annotationType === 'Distance') {
                annotationObject = options;
            }
            else if (annotationType === 'Perimeter') {
                annotationObject = options;
            }
            else if (annotationType === 'Area') {
                annotationObject = options;
            }
            else if (annotationType === 'Radius') {
                annotationObject = options;
            }
            else if (annotationType === 'Volume') {
                annotationObject = options;
            }
            pdfAnnotation[parseInt(pageNumber.toString(), 10)] =
                this.pdfViewer.annotation.measureAnnotationModule.updateAddAnnotationDetails(annotationType, annotationObject, offset);
            this.pdfViewer.annotation.measureAnnotationModule.isAddAnnotationProgramatically = true;
        }
        else if (annotationType === 'Stamp') {
            if (options && options.customStamps) {
                pdfAnnotation[parseInt(pageNumber.toString(), 10)] =
                    this.pdfViewer.annotation.stampAnnotationModule.updateAddAnnotationDetails(options, offset, pageNumber, dynamicStampItem, signStampItem, standardBusinessStampItem);
            }
            else {
                pdfAnnotation[parseInt(pageNumber.toString(), 10)] = this.pdfViewer.annotation.
                    stampAnnotationModule.updateAddAnnotationDetails(options, offset, pageNumber, dynamicStampItem, signStampItem, standardBusinessStampItem);
            }
            this.pdfViewer.annotation.stampAnnotationModule.isAddAnnotationProgramatically = true;
        }
        else if (annotationType === 'Ink') {
            pdfAnnotation[parseInt(pageNumber.toString(), 10)] = this.pdfViewer.annotation.inkAnnotationModule.
                updateAddAnnotationDetails(options, offset, pageNumber);
            this.pdfViewer.annotation.inkAnnotationModule.isAddAnnotationProgramatically = true;
        }
        else if (annotationType === 'HandWrittenSignature' || annotationType === 'Initial') {
            pdfAnnotation[parseInt(pageNumber.toString(), 10)] = this.pdfViewerBase.signatureModule.
                updateSignatureDetails(options, offset, pageNumber);
            this.pdfViewerBase.signatureModule.isAddAnnotationProgramatically = true;
        }
        //Annotation rendering can be done with the import annotation method.
        var pdf = { pdfAnnotation: pdfAnnotation };
        this.pdfViewerBase.isAddAnnotation = true;
        this.pdfViewerBase.importAnnotations(pdf);
        this.pdfViewerBase.isAddAnnotation = false;
    };
    /**
     * @param {PdfAnnotationBaseModel} annotation - annotation
     * @private
     * @returns {void}
     */
    Annotation.prototype.triggerAnnotationAddEvent = function (annotation) {
        var annotationType = annotation.shapeAnnotationType;
        if (annotationType === 'Stamp' || annotationType === 'Image' || annotationType === 'Path' || annotationType === 'FreeText' || annotationType === 'StickyNotes' || annotationType === 'Ink') {
            var settings = void 0;
            if (annotationType === 'FreeText') {
                settings = {
                    opacity: annotation.opacity, borderColor: annotation.strokeColor, borderWidth: annotation.thickness,
                    author: annotation.author, subject: annotation.subject, modifiedDate: annotation.modifiedDate,
                    fillColor: annotation.fillColor, fontSize: annotation.fontSize, width: annotation.bounds.width,
                    height: annotation.bounds.height, fontColor: annotation.fontColor, fontFamily: annotation.fontFamily,
                    defaultText: annotation.dynamicText, fontStyle: annotation.font, textAlignment: annotation.textAlign
                };
            }
            else {
                settings = {
                    opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor,
                    thickness: annotation.thickness, author: annotation.author, subject: annotation.subject,
                    modifiedDate: annotation.modifiedDate, data: annotation.data
                };
            }
            var bounds = { left: annotation.bounds.x, top: annotation.bounds.y, width: annotation.bounds.width,
                height: annotation.bounds.height };
            var type = this.getAnnotationType(annotation.shapeAnnotationType, annotation.measureType);
            this.pdfViewer.fireAnnotationAdd(annotation.pageIndex, annotation.annotName, type, bounds, settings);
        }
        else if (annotationType === 'SignatureText' || annotationType === 'SignatureImage' || annotationType === 'HandWrittenSignature') {
            var bounds = { left: annotation.bounds.x, top: annotation.bounds.y, width: annotation.bounds.width,
                height: annotation.bounds.height };
            this.pdfViewer.fireSignatureAdd(annotation.pageIndex, annotation.signatureName, annotation.shapeAnnotationType, bounds, annotation.opacity, annotation.strokeColor, annotation.thickness, annotation.data);
        }
        else {
            var setting = {
                opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor,
                thickness: annotation.thickness, author: annotation.author, subject: annotation.subject,
                modifiedDate: annotation.modifiedDate
            };
            var bounds = { left: annotation.bounds.x, top: annotation.bounds.y, width: annotation.bounds.width,
                height: annotation.bounds.height };
            var type = this.getAnnotationType(annotation.shapeAnnotationType, annotation.measureType);
            if (type === 'Line' || type === 'Arrow' || type === 'Distance' || type === 'Perimeter') {
                setting.lineHeadStartStyle = this.getArrowString(annotation.sourceDecoraterShapes);
                setting.lineHeadEndStyle = this.getArrowString(annotation.taregetDecoraterShapes);
                setting.borderDashArray = annotation.borderDashArray;
            }
            var labelSettings = void 0;
            if (this.pdfViewer.enableShapeLabel) {
                labelSettings = {
                    fontColor: annotation.fontColor, fontSize: annotation.fontSize, fontFamily: annotation.fontFamily,
                    opacity: annotation.labelOpacity, labelContent: annotation.labelContent, fillColor: annotation.labelFillColor
                };
                this.pdfViewer.fireAnnotationAdd(annotation.pageIndex, annotation.annotName, type, bounds, setting, null, null, null, labelSettings);
            }
            else {
                this.pdfViewer.fireAnnotationAdd(annotation.pageIndex, annotation.annotName, type, bounds, setting);
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.triggerAnnotationUnselectEvent = function () {
        if (this.pdfViewer.selectedItems.annotations && this.pdfViewer.selectedItems.annotations[0]) {
            var annotation = this.pdfViewer.selectedItems.annotations[0];
            if (annotation.shapeAnnotationType !== 'HandWrittenSignature' && annotation.shapeAnnotationType !== 'SignatureText' && annotation.shapeAnnotationType !== 'SignatureImage' && annotation.shapeAnnotationType !== 'Path') {
                this.pdfViewer.fireAnnotationUnSelect(annotation.annotName, annotation.pageIndex, annotation);
                this.pdfViewer.clearSelection(annotation.pageIndex);
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Annotation.prototype.triggerSignatureUnselectEvent = function () {
        if (this.pdfViewer.selectedItems.annotations && this.pdfViewer.selectedItems.annotations[0]) {
            var selectorModel = this.pdfViewer.selectedItems;
            if (selectorModel.annotations.length) {
                for (var j = 0; j < selectorModel.annotations.length; j++) {
                    var node = selectorModel.annotations[parseInt(j.toString(), 10)];
                    this.pdfViewer.annotationModule.unselectSignature(node.signatureName, node.pageIndex, node);
                    this.pdfViewer.clearSelection(node.pageIndex);
                }
            }
        }
    };
    /**
     * @param {PdfAnnotationBaseModel} currentAnnotation - currentAnnotation
     * @param {any} currentValue - currentValue
     * @private
     * @returns {void}
     */
    Annotation.prototype.updateFontFamilyRenderSize = function (currentAnnotation, currentValue) {
        var freeTextAnnotation = this.freeTextAnnotationModule;
        freeTextAnnotation.inputBoxElement.style.fontFamily = currentValue;
        freeTextAnnotation.autoFitFreeText();
        var zoomFactor = this.pdfViewerBase.getZoomFactor();
        var padding = parseFloat(freeTextAnnotation.inputBoxElement.style.paddingLeft);
        var inputEleHeight = currentAnnotation.bounds.height * zoomFactor;
        var characterLength = 8;
        var inputEleWidth = parseFloat(freeTextAnnotation.inputBoxElement.style.width) - characterLength;
        inputEleWidth = ((inputEleWidth) / zoomFactor);
        inputEleHeight = ((inputEleHeight) / zoomFactor);
        var heightDiff = (inputEleHeight - currentAnnotation.bounds.height);
        var y = undefined;
        if (heightDiff > 0) {
            y = currentAnnotation.wrapper.offsetY + (heightDiff / 2);
            y = y > 0 ? y : undefined;
        }
        else {
            heightDiff = Math.abs(heightDiff);
            y = currentAnnotation.wrapper.offsetY - (heightDiff / 2);
            y = y > 0 ? y : undefined;
        }
        var widthDiff = (inputEleWidth - currentAnnotation.bounds.width);
        var x = undefined;
        if (widthDiff > 0) {
            x = currentAnnotation.wrapper.offsetX + (widthDiff / 2);
            x = x > 0 ? x : undefined;
        }
        else {
            widthDiff = Math.abs(widthDiff);
            x = currentAnnotation.wrapper.offsetX - (widthDiff / 2);
        }
        currentAnnotation.bounds.width = inputEleWidth;
        currentAnnotation.bounds.height = inputEleHeight;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { fontFamily: currentValue,
            bounds: { width: currentAnnotation.bounds.width, height: currentAnnotation.bounds.height, y: y, x: x } });
        this.pdfViewer.renderSelector(currentAnnotation.pageIndex, this.pdfViewer.annotationSelectorSettings);
        this.modifyInCollections(currentAnnotation, 'bounds');
    };
    /**
     * @param {string} text - text
     * @param {number} rectangle - rectangle
     * @param {number} width - width
     * @private
     * @returns {number} - fontSize
     */
    Annotation.prototype.calculateFontSize = function (text, rectangle) {
        var canvasElement = document.createElement('canvas');
        var context = canvasElement.getContext('2d');
        var fontSize = 10;
        var contextWidth = 0;
        while (rectangle.width > contextWidth) {
            context.font = fontSize + 'px' + ' ' + 'Helvetica';
            contextWidth = context.measureText(text).width;
            fontSize++;
        }
        return fontSize;
    };
    return Annotation;
}());
export { Annotation };
/**
 *
 * @hidden
 */
var AnnotationBaseSettings = /** @class */ (function () {
    function AnnotationBaseSettings() {
    }
    return AnnotationBaseSettings;
}());
export { AnnotationBaseSettings };
/**
 *
 * @hidden
 */
var AnnotBoundsRect = /** @class */ (function () {
    function AnnotBoundsRect() {
    }
    return AnnotBoundsRect;
}());
export { AnnotBoundsRect };
/**
 *
 * @hidden
 */
var AnnotBoundsBase = /** @class */ (function () {
    function AnnotBoundsBase() {
    }
    return AnnotBoundsBase;
}());
export { AnnotBoundsBase };
/**
 *
 * @hidden
 */
var AnnotRectBase = /** @class */ (function () {
    function AnnotRectBase() {
    }
    return AnnotRectBase;
}());
export { AnnotRectBase };
/**
 *
 * @hidden
 */
var AnnotFontBase = /** @class */ (function () {
    function AnnotFontBase() {
    }
    return AnnotFontBase;
}());
export { AnnotFontBase };
/**
 *
 * @hidden
 */
var IBounds = /** @class */ (function () {
    function IBounds() {
    }
    return IBounds;
}());
export { IBounds };
/**
 *
 * @hidden
 */
var AnnotationsInternal = /** @class */ (function () {
    function AnnotationsInternal() {
    }
    return AnnotationsInternal;
}());
export { AnnotationsInternal };
/**
 *
 * @hidden
 */
var AnnotationsBase = /** @class */ (function () {
    function AnnotationsBase() {
    }
    return AnnotationsBase;
}());
export { AnnotationsBase };
