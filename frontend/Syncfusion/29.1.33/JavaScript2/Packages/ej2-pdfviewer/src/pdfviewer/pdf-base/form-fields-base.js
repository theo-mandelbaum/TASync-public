import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { PdfTextBoxField, PdfFormFieldVisibility, PdfTextAlignment, PdfSignatureField, PdfFreeTextAnnotation, PdfFontFamily, PdfStandardFont, PdfAnnotationFlag, PdfRubberStampAnnotation, PdfBitmap, PdfFontStyle as FontStyle, PdfCheckBoxField, PdfComboBoxField, PdfListBoxField, PdfListFieldItem, PdfRadioButtonListField, PdfRadioButtonListItem, PdfRotationAngle, PdfFontStyle, PdfInkAnnotation, PdfTrueTypeFont, PdfPath } from '@syncfusion/ej2-pdf';
import { PageRenderer } from '../index';
import { getArialFontData } from '../pdf-base/fontData';
import { PdfViewerUtils } from '../base/pdfviewer-utlis';
/**
 * FormFieldsBase
 *
 * @hidden
 */
var FormFieldsBase = /** @class */ (function () {
    /**
     * @param {PdfViewer} pdfViewer - The PdfViewer.
     * @param {PdfViewerBase} pdfViewerBase - The PdfViewerBase.
     * @param {boolean} digitalSignatruePresent - The digitalSignatruePresent
     * @private
     * @returns {void}
     */
    function FormFieldsBase(pdfViewer, pdfViewerBase, digitalSignatruePresent) {
        /**
         * @private
         */
        this.PdfRenderedFormFields = [];
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
        this.formFieldLoadedDocument = this.pdfViewer.pdfRendererModule.loadedDocument;
        this.mIsDigitalSignaturePresent = digitalSignatruePresent;
    }
    /**
     * @private
     * @param {any} textSignature - This is textSignature
     * @param {any} loadedDocument - loadedDocument
     * @param {boolean} isAnnotationFlattern - isAnnotationFlattern
     * @returns {void}
     */
    FormFieldsBase.prototype.drawFreeTextAnnotations = function (textSignature, loadedDocument, isAnnotationFlattern) {
        var stampObjects = textSignature.data;
        var textData = stampObjects.replace(/"/g, '');
        var boundsObject = JSON.parse(textSignature.bounds);
        var page = loadedDocument.getPage(textSignature.pageIndex);
        if (stampObjects !== '') {
            var left = this.convertPixelToPoint(boundsObject.left);
            var top_1 = this.convertPixelToPoint(boundsObject.top);
            var width = this.convertPixelToPoint(boundsObject.width);
            var height = this.convertPixelToPoint(boundsObject.height);
            var annotation = new PdfFreeTextAnnotation(left, top_1, width, height);
            annotation._dictionary.set('NM', textSignature.signatureName.toString());
            var fontSize = textSignature.fontSize;
            annotation.border.width = 0;
            var fontFamilyEnum = PdfFontFamily.helvetica;
            var fontName = textSignature.fontFamily.toString();
            if (!isNullOrUndefined(fontName)) {
                var family = fontName.toString();
                if (family.includes('Times New Roman')) {
                    fontFamilyEnum = PdfFontFamily.timesRoman;
                }
                else if (family.includes('Courier')) {
                    fontFamilyEnum = PdfFontFamily.courier;
                }
                else if (family.includes('Symbol')) {
                    fontFamilyEnum = PdfFontFamily.symbol;
                }
                else if (family.includes('ZapfDingbats')) {
                    fontFamilyEnum = PdfFontFamily.zapfDingbats;
                }
            }
            fontSize = Math.floor(this.convertPixelToPoint(fontSize));
            var fontStyle = FontStyle.regular;
            annotation.font = new PdfStandardFont(fontFamilyEnum, fontSize, fontStyle);
            annotation.text = textData;
            annotation.borderColor = [0, 0, 0];
            annotation.textAlignment = PdfTextAlignment.center;
            annotation._annotFlags = PdfAnnotationFlag.print;
            if (isAnnotationFlattern) {
                var rotateAngle = this.getRotateAngle(page.rotation);
                annotation.rotationAngle = Math.abs(rotateAngle);
            }
            annotation.setValues('AnnotationType', 'Signature');
            if (isAnnotationFlattern) {
                annotation.flatten = true;
            }
            annotation.setAppearance(true);
            page.annotations.add(annotation);
        }
    };
    FormFieldsBase.prototype.getRotateAngle = function (angleString) {
        var angle = 0;
        switch (angleString) {
            case PdfRotationAngle.angle0:
                angle = 0;
                break;
            case PdfRotationAngle.angle180:
                angle = 2;
                break;
            case PdfRotationAngle.angle270:
                angle = 3;
                break;
            case PdfRotationAngle.angle90:
                angle = 1;
                break;
        }
        return angle;
    };
    /**
     * @private
     * @param {any} signatureImage - signatureImage
     * @param {any} loadedDocument - loadedDocument
     * @param {boolean} isAnnotationFlattern - isAnnotationFlattern
     * @returns {void}
     */
    FormFieldsBase.prototype.drawImage = function (signatureImage, loadedDocument, isAnnotationFlattern) {
        var _a;
        var stampObjects = signatureImage.data;
        var boundsObject = JSON.parse(signatureImage.bounds);
        var page = loadedDocument.getPage(signatureImage.pageIndex);
        if (stampObjects !== '') {
            var imageUrl = (stampObjects.toString()).split(',')[1];
            var left = this.convertPixelToPoint(boundsObject.left);
            var top_2 = this.convertPixelToPoint(boundsObject.top);
            var width = this.convertPixelToPoint(boundsObject.width);
            var height = this.convertPixelToPoint(boundsObject.height);
            if (page.rotation === PdfRotationAngle.angle90 || page.rotation === PdfRotationAngle.angle270) {
                _a = [height, width], width = _a[0], height = _a[1];
            }
            var rubberStampAnnotation = new PdfRubberStampAnnotation(left, top_2, width, height);
            var bitmap = new PdfBitmap(imageUrl);
            var graphics = page.graphics;
            var appearance = rubberStampAnnotation.appearance.normal;
            rubberStampAnnotation._dictionary.set('NM', signatureImage.signatureName.toString());
            var rotationAngle = this.getRotateAngle(page.rotation);
            rubberStampAnnotation.rotationAngle = Math.abs(rotationAngle);
            if (isAnnotationFlattern) {
                rubberStampAnnotation.flatten = true;
            }
            if (!isAnnotationFlattern) {
                var state = graphics.save();
                appearance.graphics.drawImage(bitmap, 0, 0, width, height);
                appearance.graphics.restore(state);
            }
            else {
                appearance.graphics.drawImage(bitmap, 0, 0, width, height);
            }
            page.annotations.add(rubberStampAnnotation);
        }
    };
    /**
     * @private
     * @param {any} jsonObject - jsonObject
     * @returns {void}
     */
    FormFieldsBase.prototype.saveFormFieldsDesignerData = function (jsonObject) {
        if (Object.prototype.hasOwnProperty.call(jsonObject, 'formDesigner')) {
            var formFields = jsonObject['formDesigner'];
            if (!isNullOrUndefined(formFields)) {
                var data = JSON.parse(formFields);
                var myList = [];
                var formFieldsPageList = Object.prototype.hasOwnProperty.call(jsonObject, 'formFieldsPageList') ? JSON.parse(jsonObject['formFieldsPageList']) : myList;
                //Removing form fields from the page.
                if (!isNullOrUndefined(this.formFieldLoadedDocument.form)) {
                    var initialCount = this.formFieldLoadedDocument.form._fields.length;
                    //Get the loaded form.
                    var loadedForm = this.formFieldLoadedDocument.form;
                    for (var k = initialCount - 1; k >= 0; k--) {
                        var formFieldPage = loadedForm.fieldAt(k);
                        var signField = null;
                        if (formFieldPage instanceof PdfSignatureField) {
                            signField = formFieldPage;
                        }
                        var signed = !isNullOrUndefined(signField) ? signField.isSigned : true;
                        //Removing the formfields from a page
                        // if (formFieldsPageList.includes(pageNumber + 1) && (signField === null || !signed)) {
                        // formFieldsPageList is did not removed  when delete non rendered pages form fields.
                        if (signField == null || !signed) {
                            loadedForm.removeField(loadedForm.fieldAt(k));
                        }
                    }
                }
                for (var i = 0; i < data.length; i++) {
                    this.addFormFieldsToDocument(data[parseInt(i.toString(), 10)].FormField);
                }
            }
            if (!isNullOrUndefined(this.formFieldLoadedDocument.form)) {
                if (!isNullOrUndefined(this.defaultAppearanceFields)) {
                    for (var i = 0; i < this.formFieldLoadedDocument.form.count; i++) {
                        var field = this.formFieldLoadedDocument.form.fieldAt(i);
                        if (this.defaultAppearanceFields.indexOf(field.name) === -1) {
                            field.setAppearance(true);
                        }
                    }
                    this.defaultAppearanceFields = null;
                }
                else {
                    this.formFieldLoadedDocument.form.setDefaultAppearance(false);
                }
            }
        }
    };
    FormFieldsBase.prototype.setFont = function (field, currentField) {
        var pdfFontStyle = this.getFontStyle(field);
        currentField._dictionary.set('FontStyle', pdfFontStyle);
        // eslint-disable-next-line
        var hasUnicode = /[^\u0000-\u007F]/.test(currentField.text);
        if (hasUnicode) {
            currentField.font = this.getTrueFont(field.fontSize, pdfFontStyle);
        }
        else {
            currentField.font = new PdfStandardFont(this.getFontFamily(field.FontFamily), this.convertPixelToPoint(field.fontSize), pdfFontStyle);
        }
    };
    /**
     * @private
     * @param {any} jsonObject - jsonObject
     * @returns {void}
     */
    FormFieldsBase.prototype.saveFormFieldsData = function (jsonObject) {
        if (Object.prototype.hasOwnProperty.call(jsonObject, 'fieldsData')) {
            var formFields = jsonObject['fieldsData'];
            var data = JSON.parse(formFields);
            if (!isNullOrUndefined(data) && Object.keys(data).length > 0 && !isNullOrUndefined(this.formFieldLoadedDocument.form)) {
                if (this.formFieldLoadedDocument.form._fields.length > 0) {
                    this.formFieldLoadedDocument.form.setDefaultAppearance(false);
                }
                for (var i = 0; i < this.formFieldLoadedDocument.form._fields.length; i++) {
                    var currentField = this.formFieldLoadedDocument.form.fieldAt(i);
                    var currentFieldName = '';
                    var actualFieldName = '';
                    if (!isNullOrUndefined(currentField.name)) {
                        currentFieldName = currentField.name.replace(/[^0-9a-zA-Z]+/g, '').replace(/\s+/g, '');
                        actualFieldName = currentField.name;
                    }
                    if (currentField instanceof PdfTextBoxField) {
                        if (!currentField.password) {
                            if ((Object.prototype.hasOwnProperty.call(data, currentFieldName) && !isNullOrUndefined(data["" + currentFieldName])) || (Object.prototype.hasOwnProperty.call(data, actualFieldName) && !isNullOrUndefined(data["" + actualFieldName]))) {
                                if (Object.prototype.hasOwnProperty.call(data, actualFieldName)) {
                                    currentFieldName = actualFieldName;
                                }
                                var field = data["" + currentFieldName];
                                if (!isNullOrUndefined(field) && Object.prototype.hasOwnProperty.call(field, 'isReadOnly')) {
                                    currentField.text = field['fieldValue'];
                                    currentField.readOnly = field['isReadOnly'] === 'true' ? true : false;
                                }
                                this.setFont(field, currentField);
                            }
                        }
                        else {
                            if ((Object.prototype.hasOwnProperty.call(data, currentFieldName) && !isNullOrUndefined(data["" + currentFieldName])) || (Object.prototype.hasOwnProperty.call(data, actualFieldName) && !isNullOrUndefined(data["" + actualFieldName]))) {
                                if (Object.prototype.hasOwnProperty.call(data, actualFieldName)) {
                                    currentFieldName = actualFieldName;
                                }
                                var field = data["" + currentFieldName];
                                if (!isNullOrUndefined(field) && Object.prototype.hasOwnProperty.call(field, 'isReadOnly')) {
                                    currentField.text = field['fieldValue'];
                                    currentField.readOnly = field['isReadOnly'] === 'true' ? true : false;
                                }
                                this.setFont(field, currentField);
                            }
                        }
                    }
                    else if (currentField instanceof PdfComboBoxField) {
                        if ((Object.prototype.hasOwnProperty.call(data, currentFieldName) && !isNullOrUndefined(data["" + currentFieldName])) || (Object.prototype.hasOwnProperty.call(data, actualFieldName) && !isNullOrUndefined(data["" + actualFieldName]))) {
                            if (Object.prototype.hasOwnProperty.call(data, actualFieldName)) {
                                currentFieldName = actualFieldName;
                            }
                            var field = data["" + currentFieldName];
                            var count = currentField.itemsCount;
                            var fieldName = '';
                            if (!isNullOrUndefined(field)) {
                                if (Object.prototype.hasOwnProperty.call(field, 'isReadOnly')) {
                                    currentField.readOnly = field['isReadOnly'] === 'true' ? true : false;
                                }
                                if (!isNullOrUndefined(field['fieldValue'])) {
                                    fieldName = field['fieldValue'];
                                }
                            }
                            var isExists = false;
                            for (var j = 0; j < count; j++) {
                                var optionArray = void 0;
                                var text = void 0;
                                if (currentField._dictionary.has('Opt')) {
                                    optionArray = currentField._dictionary.get('Opt');
                                    text = optionArray[parseInt(j.toString(), 10)];
                                }
                                else if (!isNullOrUndefined(currentField.itemAt(j))) {
                                    text = currentField.itemAt(j).text;
                                }
                                if (text === fieldName || (text && text.length > 0 && text[1] === fieldName)) {
                                    currentField.selectedIndex = j;
                                    isExists = true;
                                }
                            }
                            if (currentField.editable && !isExists) {
                                currentField.selectedValue = fieldName;
                            }
                            this.setFont(field, currentField);
                        }
                    }
                    else if (currentField instanceof PdfCheckBoxField) {
                        if ((Object.prototype.hasOwnProperty.call(data, currentFieldName) && !isNullOrUndefined(data["" + currentFieldName])) || (Object.prototype.hasOwnProperty.call(data, actualFieldName) && !isNullOrUndefined(data["" + actualFieldName]))) {
                            if (Object.prototype.hasOwnProperty.call(data, actualFieldName)) {
                                currentFieldName = actualFieldName;
                            }
                            var field = data["" + currentFieldName];
                            var fields = field['isSelected'];
                            var fieldValueString = fields.toString();
                            var fieldValue = field['fieldValue'];
                            if (!isNullOrUndefined(fieldValue)) {
                                currentField._dictionary.set('ExportValue', fieldValue);
                            }
                            if (fieldValueString.toLowerCase() === 'true' || fieldValueString.toLowerCase() === 'false') {
                                currentField.checked = fields;
                                if (!isNullOrUndefined(field) && Object.prototype.hasOwnProperty.call(field, 'isReadOnly')) {
                                    currentField.readOnly = field.readonly;
                                }
                                if (fieldValueString.toLowerCase() === 'false') {
                                    var checkBoxField = currentField;
                                    for (var k = 0; k < checkBoxField.itemsCount; k++) {
                                        checkBoxField.itemAt(k).checked = false;
                                    }
                                    currentField.checked = false;
                                }
                            }
                            else {
                                var integerValue = isNullOrUndefined(fieldValueString) ? -1 : parseInt(fieldValueString, 10);
                                var checkBoxField = currentField;
                                if (checkBoxField.itemsCount > 0) {
                                    if (integerValue === -1) {
                                        for (var n = 0; n < checkBoxField.itemsCount; n++) {
                                            checkBoxField.itemAt(n).checked = false;
                                        }
                                        currentField.checked = false;
                                    }
                                    else if (!isNullOrUndefined(checkBoxField.itemAt(integerValue))) {
                                        checkBoxField.itemAt(integerValue).checked = true;
                                    }
                                }
                            }
                        }
                    }
                    else if (currentField instanceof PdfListBoxField) {
                        if ((Object.prototype.hasOwnProperty.call(data, currentFieldName) && !isNullOrUndefined(data["" + currentFieldName])) || (Object.prototype.hasOwnProperty.call(data, actualFieldName) && !isNullOrUndefined(data["" + actualFieldName]))) {
                            if (Object.prototype.hasOwnProperty.call(data, actualFieldName)) {
                                currentFieldName = actualFieldName;
                            }
                            var table = data["" + currentFieldName];
                            var count = currentField.itemsCount;
                            var fieldName = '';
                            if (!isNullOrUndefined(table)) {
                                if (Object.prototype.hasOwnProperty.call(table, 'fieldValue') && !isNullOrUndefined(table['fieldValue'])) {
                                    fieldName = table['fieldValue'];
                                }
                                if (Object.prototype.hasOwnProperty.call(table, 'isReadOnly')) {
                                    currentField.readOnly = table['isReadOnly'] === 'true' ? true : false;
                                }
                            }
                            fieldName = JSON.parse(fieldName)[0].replace(/[^0-9a-zA-Z]+/g, '');
                            var selectedIndexes = [];
                            for (var k = 0; k < count; k++) {
                                var text = currentField.itemAt(k).text;
                                if (text === fieldName) {
                                    selectedIndexes.push(k);
                                }
                            }
                            currentField.selectedIndex = selectedIndexes;
                            this.setFont(table, currentField);
                        }
                    }
                    else if (currentField instanceof PdfRadioButtonListField) {
                        if ((Object.prototype.hasOwnProperty.call(data, currentFieldName) && !isNullOrUndefined(data["" + currentFieldName])) || (Object.prototype.hasOwnProperty.call(data, actualFieldName) && !isNullOrUndefined(data["" + actualFieldName]))) {
                            if (Object.prototype.hasOwnProperty.call(data, actualFieldName)) {
                                currentFieldName = actualFieldName;
                            }
                            var field = data["" + currentFieldName];
                            if (!isNullOrUndefined(field) && Object.prototype.hasOwnProperty.call(field, 'isReadOnly')) {
                                var selectedValue = field['fieldValue'];
                                if (selectedValue) {
                                    for (var i_1 = 0; i_1 < currentField.itemsCount; i_1++) {
                                        var item = currentField.itemAt(i_1);
                                        if (item && (item.value === selectedValue || item._optionValue === selectedValue)) {
                                            currentField.selectedIndex = i_1;
                                            break;
                                        }
                                    }
                                }
                                currentField.readOnly = field['isReadOnly'] === 'true' ? true : false;
                            }
                        }
                    }
                    else if (currentField instanceof PdfSignatureField) {
                        if ((Object.prototype.hasOwnProperty.call(data, currentFieldName) && !isNullOrUndefined(data["" + currentFieldName])) || (Object.prototype.hasOwnProperty.call(data, actualFieldName) && !isNullOrUndefined(data["" + actualFieldName]))) {
                            if (Object.prototype.hasOwnProperty.call(data, actualFieldName)) {
                                currentFieldName = actualFieldName;
                            }
                            var signatureFields = currentField;
                            if (Object.prototype.hasOwnProperty.call(data, currentFieldName + 'fontName')) {
                                this.drawFieldFreeTextAnnotations(data["" + currentFieldName], signatureFields, currentFieldName, data[currentFieldName + 'bounds'], data[currentFieldName + 'fontName'], data[currentFieldName + 'fontSize']);
                            }
                            else if (Object.prototype.hasOwnProperty.call(data, currentFieldName + 'ImageData')) {
                                this.drawFieldImage(data["" + currentFieldName], signatureFields, currentFieldName, data[currentFieldName + 'bounds']);
                            }
                            else if (Object.prototype.hasOwnProperty.call(data, currentFieldName + 'bounds')) {
                                this.drawFieldPath(data["" + currentFieldName], signatureFields, currentFieldName, data[currentFieldName + 'bounds']);
                            }
                            var signatureFieldListCount = signatureFields.itemsCount;
                            if (signatureFieldListCount > 0) {
                                for (var k = 0; k < signatureFieldListCount; k++) {
                                    if (Object.prototype.hasOwnProperty.call(data, currentFieldName + 'fontName' + '_' + k)) {
                                        this.drawFieldFreeTextAnnotations(data["" + currentFieldName], signatureFields, currentFieldName, data[currentFieldName + 'bounds' + '_' + k], data[currentFieldName + 'fontName' + '_' + k], data[currentFieldName + 'fontSize' + '_' + k]);
                                    }
                                    else if (Object.prototype.hasOwnProperty.call(data, currentFieldName + 'ImageData' + '_' + k)) {
                                        this.drawFieldImage(data["" + currentFieldName], signatureFields, currentFieldName, data[currentFieldName + 'bounds' + '_' + k]);
                                    }
                                    else if (Object.prototype.hasOwnProperty.call(data, currentFieldName + 'bounds' + '_' + k)) {
                                        this.drawFieldPath(data["" + currentFieldName], signatureFields, currentFieldName, data[currentFieldName + 'bounds' + '_' + k]);
                                    }
                                }
                            }
                        }
                        if (Object.prototype.hasOwnProperty.call(data, currentFieldName + 'isReadOnly') || Object.prototype.hasOwnProperty.call(data, actualFieldName + 'isReadOnly')) {
                            if (Object.prototype.hasOwnProperty.call(data, actualFieldName + 'isReadOnly')) {
                                currentFieldName = actualFieldName;
                            }
                            currentField.readOnly = data['isReadOnly'] === 'true' ? true : false;
                        }
                    }
                }
            }
        }
    };
    FormFieldsBase.prototype.addFormFieldsToDocument = function (formFieldAttributes) {
        var loadedPage = this.formFieldLoadedDocument.getPage(formFieldAttributes.pageNumber - 1);
        var field;
        switch (formFieldAttributes.formFieldAnnotationType) {
            case 'Textbox':
            case 'PasswordField':
                //Create a password and text box field for name
                field = this.saveTextBoxField(loadedPage, formFieldAttributes);
                break;
            case 'Checkbox':
                // Create Check Box field.
                field = this.SaveCheckBoxField(loadedPage, formFieldAttributes);
                break;
            case 'RadioButton':
                field = this.saveRadioButtonField(formFieldAttributes);
                break;
            case 'DropdownList':
                // Create Drop Down field.
                field = this.saveDropDownField(loadedPage, formFieldAttributes);
                break;
            case 'ListBox':
                field = this.saveListBoxField(loadedPage, formFieldAttributes);
                break;
            case 'SignatureField':
            case 'InitialField':
                //Create PDF Signature and Initial field.
                field = this.saveSignatureField(loadedPage, formFieldAttributes);
                break;
        }
        if (field) {
            this.formFieldLoadedDocument.form.add(field);
        }
    };
    FormFieldsBase.prototype.setFontFromKeys = function (text, field, textFont, fontSize, hasUnicode, fontStyle) {
        var font = PdfViewerUtils.tryGetFontFromKeys(textFont, text.toString(), fontSize, fontStyle);
        if (!isNullOrUndefined(font)) {
            field.font = font;
            field.setAppearance(true);
        }
        else {
            if (hasUnicode) {
                var trueTypeFont = this.getTrueFont(fontSize, fontStyle);
                var isGlyphPresent = PdfViewerUtils.isSupportedFont(text, font);
                if (isGlyphPresent) {
                    field.font = trueTypeFont;
                }
                else {
                    this.disableFieldAppearance(field);
                }
            }
            else {
                this.disableFieldAppearance(field);
            }
        }
    };
    FormFieldsBase.prototype.setFontAppearance = function (text, fontFamily, fontSize, field, textFont, hasUnicode, fontStyle) {
        if (!isNullOrUndefined(textFont) && Object.keys(textFont).length > 0) {
            var fontKey = PdfViewerUtils.getFontKey(textFont, fontFamily.toLowerCase());
            if (!isNullOrUndefined(fontKey)) {
                var fontStream = textFont["" + fontKey];
                fontStream = PdfViewerUtils.processFontStream(fontStream);
                var font = new PdfTrueTypeFont(fontStream, this.convertPixelToPoint(fontSize), fontStyle);
                var glyphPresent = PdfViewerUtils.isSupportedFont(text, font);
                field.setAppearance(glyphPresent);
                if (glyphPresent) {
                    field.font = font;
                }
                else {
                    this.setFontFromKeys(text, field, textFont, fontSize, hasUnicode, fontStyle);
                }
            }
            else {
                this.setFontFromKeys(text, field, textFont, fontSize, hasUnicode, fontStyle);
            }
        }
        else {
            try {
                field.font.measureString(text.toString());
            }
            catch (e) {
                if (hasUnicode) {
                    var trueTypeFont = this.getTrueFont(fontSize, fontStyle);
                    var isGlyphPresent = PdfViewerUtils.isSupportedFont(text, trueTypeFont);
                    if (isGlyphPresent) {
                        field.font = trueTypeFont;
                    }
                    else {
                        this.disableFieldAppearance(field);
                    }
                }
                else {
                    this.disableFieldAppearance(field);
                }
            }
        }
    };
    FormFieldsBase.prototype.disableFieldAppearance = function (field) {
        field.setAppearance(false);
        if (isNullOrUndefined(this.defaultAppearanceFields)) {
            this.defaultAppearanceFields = [];
        }
        this.defaultAppearanceFields.push(field.name);
    };
    FormFieldsBase.prototype.saveTextBoxField = function (loadedPage, formFieldAttributes) {
        var textboxName = isNullOrUndefined(formFieldAttributes.name) ? formFieldAttributes.type === 'Password' ? 'passwordTextbox' : 'textbox' : formFieldAttributes.name;
        var textBounds = this.convertFieldBounds(formFieldAttributes);
        var rotationAngle = loadedPage.rotation;
        var isFieldRotated = false;
        if (formFieldAttributes.rotation !== 0) {
            isFieldRotated = true;
        }
        var fieldBounds = this.getBounds(textBounds, loadedPage.size[1], loadedPage.size[0], rotationAngle, isFieldRotated);
        var bound = { x: fieldBounds.X, y: fieldBounds.Y, width: fieldBounds.Width, height: fieldBounds.Height };
        //Create a new text box field
        var textbox = new PdfTextBoxField(loadedPage, textboxName, bound);
        textbox.backColor = [formFieldAttributes.backgroundColor.r, formFieldAttributes.backgroundColor.g,
            formFieldAttributes.backgroundColor.b];
        if (formFieldAttributes.backgroundColor.r === 0 && formFieldAttributes.backgroundColor.g === 0 &&
            formFieldAttributes.backgroundColor.b === 0 && formFieldAttributes.backgroundColor.a === 0) {
            textbox.backColor = [formFieldAttributes.backgroundColor.r, formFieldAttributes.backgroundColor.g,
                formFieldAttributes.backgroundColor.b, formFieldAttributes.backgroundColor.a];
        }
        textbox.maxLength = formFieldAttributes.maxLength;
        textbox.insertSpaces = formFieldAttributes.insertSpaces;
        textbox.readOnly = formFieldAttributes.isReadonly;
        textbox.required = formFieldAttributes.isRequired;
        textbox.textAlignment = this.getTextAlignment(formFieldAttributes.textAlign);
        textbox.visibility = this.getFormFieldsVisibility(formFieldAttributes.visibility);
        textbox.text = isNullOrUndefined(formFieldAttributes.value) ? '' : formFieldAttributes.value;
        textbox.toolTip = isNullOrUndefined(formFieldAttributes.tooltip) ? '' : formFieldAttributes.tooltip;
        textbox.color = [formFieldAttributes.fontColor.r, formFieldAttributes.fontColor.g, formFieldAttributes.fontColor.b];
        textbox.borderColor = [formFieldAttributes.borderColor.r, formFieldAttributes.borderColor.g, formFieldAttributes.borderColor.b];
        // eslint-disable-next-line
        if (formFieldAttributes.borderColor.r == 0 && formFieldAttributes.borderColor.g == 0 &&
            // eslint-disable-next-line
            formFieldAttributes.borderColor.b == 0 && formFieldAttributes.borderColor.a == 0) {
            textbox.borderColor = [formFieldAttributes.borderColor.r, formFieldAttributes.borderColor.g,
                formFieldAttributes.borderColor.b, formFieldAttributes.borderColor.a];
        }
        textbox.border.width = formFieldAttributes.thickness;
        textbox.multiLine = formFieldAttributes.Multiline;
        var pdfFontStyle = this.getFontStyle(formFieldAttributes);
        textbox._dictionary.set('FontStyle', pdfFontStyle);
        // eslint-disable-next-line
        var hasUnicode = /[^\u0000-\u007F]/.test(textbox.text);
        var fontFamily = formFieldAttributes.FontFamily ? formFieldAttributes.FontFamily : formFieldAttributes.fontFamily;
        textbox.font = new PdfStandardFont(this.getFontFamily(fontFamily), this.convertPixelToPoint(formFieldAttributes.fontSize), pdfFontStyle);
        if (!isNullOrUndefined(textbox.text.toString())) {
            var textFont = this.pdfViewer.pdfRenderer.FallbackFontCollection;
            this.setFontAppearance(textbox.text.toString(), formFieldAttributes.fontFamily, formFieldAttributes.fontSize, textbox, textFont, hasUnicode, pdfFontStyle);
        }
        if (formFieldAttributes.formFieldAnnotationType === 'PasswordField') {
            textbox.password = true;
        }
        if (!isFieldRotated) {
            textbox.rotate = this.getFormfieldRotation(loadedPage.rotation);
        }
        if (!isNullOrUndefined(formFieldAttributes.customData)) {
            var customData = JSON.stringify(formFieldAttributes.customData);
            textbox._dictionary.set('CustomData', customData);
        }
        return textbox;
    };
    FormFieldsBase.prototype.saveDropDownField = function (loadedPage, formFieldAttributes) {
        var dropdownListName = isNullOrUndefined(formFieldAttributes.name) ? 'dropdownList' : formFieldAttributes.name;
        var dropDownListbounds = this.convertFieldBounds(formFieldAttributes);
        var rotationAngle = loadedPage.rotation;
        var isFieldRotated = false;
        if (formFieldAttributes.rotation !== 0) {
            isFieldRotated = true;
        }
        var fieldBounds = this.getBounds(dropDownListbounds, loadedPage.size[1], loadedPage.size[0], rotationAngle, isFieldRotated);
        var bound = { x: fieldBounds.X, y: fieldBounds.Y, width: fieldBounds.Width, height: fieldBounds.Height };
        var comboBox = new PdfComboBoxField(loadedPage, dropdownListName, bound);
        var hasUnicode = false;
        for (var i = 0; i < formFieldAttributes.option.length; i++) {
            var item = new PdfListFieldItem(formFieldAttributes.option[parseInt(i.toString(), 10)].itemName, formFieldAttributes.option[parseInt(i.toString(), 10)].itemValue);
            comboBox.addItem(item);
            // eslint-disable-next-line
            var flag = /[^\u0000-\u007F]/.test(formFieldAttributes.option[parseInt(i.toString(), 10)].itemName);
            if (flag) {
                hasUnicode = true;
            }
        }
        comboBox.textAlignment = this.getTextAlignment(formFieldAttributes.textAlign);
        var pdfFontStyle = this.getFontStyle(formFieldAttributes);
        comboBox._dictionary.set('FontStyle', pdfFontStyle);
        var fontFamily = formFieldAttributes.FontFamily ? formFieldAttributes.FontFamily : formFieldAttributes.fontFamily;
        comboBox.font = new PdfStandardFont(this.getFontFamily(fontFamily), this.convertPixelToPoint(formFieldAttributes.fontSize), pdfFontStyle);
        for (var i = 0; i < formFieldAttributes.option.length; i++) {
            var comboBoxText = formFieldAttributes.option[parseInt(i.toString(), 10)].itemName.toString();
            if (!isNullOrUndefined(comboBoxText)) {
                var textFont = this.pdfViewer.pdfRenderer.FallbackFontCollection;
                this.setFontAppearance(comboBoxText, formFieldAttributes.fontFamily, formFieldAttributes.fontSize, comboBox, textFont, hasUnicode, pdfFontStyle);
                break;
            }
        }
        if (comboBox.itemsCount > 0) {
            if (formFieldAttributes.selectedIndex.length > 0) {
                comboBox.selectedIndex = formFieldAttributes.selectedIndex[0];
            }
            else {
                comboBox.selectedIndex = 0;
            }
        }
        comboBox.required = formFieldAttributes.isRequired;
        comboBox.readOnly = formFieldAttributes.isReadonly;
        comboBox.visibility = this.getFormFieldsVisibility(formFieldAttributes.visibility);
        comboBox.backColor = [formFieldAttributes.backgroundColor.r, formFieldAttributes.backgroundColor.g,
            formFieldAttributes.backgroundColor.b];
        if (formFieldAttributes.backgroundColor.r === 0 && formFieldAttributes.backgroundColor.g === 0 &&
            formFieldAttributes.backgroundColor.b === 0 && formFieldAttributes.backgroundColor.a === 0) {
            comboBox.backColor = [formFieldAttributes.backgroundColor.r, formFieldAttributes.backgroundColor.g,
                formFieldAttributes.backgroundColor.b, formFieldAttributes.backgroundColor.a];
        }
        comboBox.borderColor = [formFieldAttributes.borderColor.r, formFieldAttributes.borderColor.g, formFieldAttributes.borderColor.b];
        // eslint-disable-next-line
        if (formFieldAttributes.borderColor.r == 0 && formFieldAttributes.borderColor.g == 0 &&
            // eslint-disable-next-line
            formFieldAttributes.borderColor.b == 0 && formFieldAttributes.borderColor.a == 0) {
            comboBox.borderColor = [formFieldAttributes.borderColor.r, formFieldAttributes.borderColor.g,
                formFieldAttributes.borderColor.b, formFieldAttributes.borderColor.a];
        }
        comboBox.border.width = formFieldAttributes.thickness;
        comboBox.color = [formFieldAttributes.fontColor.r, formFieldAttributes.fontColor.g, formFieldAttributes.fontColor.b];
        if (!isFieldRotated) {
            comboBox.rotate = this.getFormfieldRotation(loadedPage.rotation);
        }
        comboBox.toolTip = isNullOrUndefined(formFieldAttributes.tooltip) ? '' : formFieldAttributes.tooltip;
        if (!isNullOrUndefined(formFieldAttributes.customData)) {
            var customData = JSON.stringify(formFieldAttributes.customData);
            comboBox._dictionary.set('CustomData', customData);
        }
        return comboBox;
    };
    FormFieldsBase.prototype.SaveCheckBoxField = function (loadedPage, formFieldAttributes) {
        var checkboxFieldName = isNullOrUndefined(formFieldAttributes.name) && formFieldAttributes.name === '' ? 'checkboxField' : formFieldAttributes.name;
        var checkBounds = this.convertFieldBounds(formFieldAttributes);
        var rotationAngle = loadedPage.rotation;
        var isFieldRotated = false;
        if (formFieldAttributes.rotation !== 0) {
            isFieldRotated = true;
        }
        var fieldBounds = this.getBounds(checkBounds, loadedPage.size[1], loadedPage.size[0], rotationAngle, isFieldRotated);
        var bound = { x: fieldBounds.X, y: fieldBounds.Y, width: fieldBounds.Width, height: fieldBounds.Height };
        //Create a new Check box field
        var checkBoxField = new PdfCheckBoxField(checkboxFieldName, bound, loadedPage);
        checkBoxField.readOnly = formFieldAttributes.isReadonly;
        checkBoxField.required = formFieldAttributes.isRequired;
        checkBoxField.checked = formFieldAttributes.isChecked;
        checkBoxField.visibility = this.getFormFieldsVisibility(formFieldAttributes.visibility);
        checkBoxField._dictionary.set('ExportValue', formFieldAttributes.value);
        checkBoxField.backColor = [formFieldAttributes.backgroundColor.r, formFieldAttributes.backgroundColor.g,
            formFieldAttributes.backgroundColor.b];
        if (formFieldAttributes.backgroundColor.r === 0 && formFieldAttributes.backgroundColor.g === 0 &&
            formFieldAttributes.backgroundColor.b === 0 && formFieldAttributes.backgroundColor.a === 0) {
            checkBoxField.backColor = [formFieldAttributes.backgroundColor.r, formFieldAttributes.backgroundColor.g,
                formFieldAttributes.backgroundColor.b, formFieldAttributes.backgroundColor.a];
        }
        checkBoxField.borderColor = [formFieldAttributes.borderColor.r, formFieldAttributes.borderColor.g,
            formFieldAttributes.borderColor.b];
        if (formFieldAttributes.borderColor.r === 0 && formFieldAttributes.borderColor.g === 0 && formFieldAttributes.borderColor.b === 0
            && formFieldAttributes.borderColor.a === 0) {
            checkBoxField.borderColor = [formFieldAttributes.borderColor.r, formFieldAttributes.borderColor.g,
                formFieldAttributes.borderColor.b, formFieldAttributes.borderColor.a];
        }
        checkBoxField.border.width = formFieldAttributes.thickness;
        checkBoxField.toolTip = isNullOrUndefined(formFieldAttributes.tooltip) ? '' : formFieldAttributes.tooltip;
        if (!isFieldRotated) {
            checkBoxField.rotate = this.getFormfieldRotation(loadedPage.rotation);
        }
        if (!isNullOrUndefined(formFieldAttributes.customData)) {
            var customData = JSON.stringify(formFieldAttributes.customData);
            checkBoxField._dictionary.set('CustomData', customData);
        }
        return checkBoxField;
    };
    FormFieldsBase.prototype.saveListBoxField = function (loadedPage, formFieldAttributes) {
        var listBoxName = isNullOrUndefined(formFieldAttributes.name) ? 'listBox' : formFieldAttributes.name;
        var listBounds = this.convertFieldBounds(formFieldAttributes);
        var rotationAngle = loadedPage.rotation;
        var isFieldRotated = false;
        if (formFieldAttributes.rotation !== 0) {
            isFieldRotated = true;
        }
        var fieldBounds = this.getBounds(listBounds, loadedPage.size[1], loadedPage.size[0], rotationAngle, isFieldRotated);
        var bound = { x: fieldBounds.X, y: fieldBounds.Y, width: fieldBounds.Width, height: fieldBounds.Height };
        var listBox = new PdfListBoxField(loadedPage, listBoxName, bound);
        var flag = false;
        var hasUnicode = false;
        for (var i = 0; i < formFieldAttributes.option.length; i++) {
            var item = new PdfListFieldItem(formFieldAttributes.option[parseInt(i.toString(), 10)].itemName, formFieldAttributes.option[parseInt(i.toString(), 10)].itemValue);
            listBox.addItem(item);
            // eslint-disable-next-line
            var unicode = /[^\u0000-\u007F]/.test(formFieldAttributes.option[parseInt(i.toString(), 10)].itemName);
            if (unicode) {
                hasUnicode = true;
            }
            if (!isNullOrUndefined(item && item._dictionary && !flag)) {
                item.textAlignment = this.getTextAlignment(formFieldAttributes.textAlign);
                flag = true;
            }
        }
        if (listBox.itemsCount > 0) {
            var count = formFieldAttributes.selectedIndex.length;
            if (Array.isArray(formFieldAttributes.selectedIndex) && count > 0) {
                if (count === 1) {
                    listBox.selectedIndex = formFieldAttributes.selectedIndex[0];
                }
                else {
                    var selectedIndexes = [];
                    for (var j = 0; j < count; j++) {
                        selectedIndexes.push(formFieldAttributes.selectedIndex[parseInt(j.toString(), 10)]);
                    }
                    listBox.selectedIndex = selectedIndexes;
                }
            }
            else {
                listBox.selectedIndex = 0;
            }
        }
        listBox.textAlignment = this.getTextAlignment(formFieldAttributes.textAlign);
        listBox.multiSelect = true;
        listBox.backColor = [formFieldAttributes.backgroundColor.r, formFieldAttributes.backgroundColor.g,
            formFieldAttributes.backgroundColor.b];
        if (formFieldAttributes.backgroundColor.r === 0 && formFieldAttributes.backgroundColor.g === 0 &&
            formFieldAttributes.backgroundColor.b === 0 && formFieldAttributes.backgroundColor.a === 0) {
            listBox.backColor = [formFieldAttributes.backgroundColor.r, formFieldAttributes.backgroundColor.g,
                formFieldAttributes.backgroundColor.b, formFieldAttributes.backgroundColor.a];
        }
        listBox.borderColor = [formFieldAttributes.borderColor.r, formFieldAttributes.borderColor.g, formFieldAttributes.borderColor.b];
        // eslint-disable-next-line
        if (formFieldAttributes.borderColor.r == 0 && formFieldAttributes.borderColor.g == 0 &&
            // eslint-disable-next-line
            formFieldAttributes.borderColor.b == 0 && formFieldAttributes.borderColor.a == 0) {
            listBox.borderColor = [formFieldAttributes.borderColor.r, formFieldAttributes.borderColor.g,
                formFieldAttributes.borderColor.b, formFieldAttributes.borderColor.a];
        }
        listBox.border.width = formFieldAttributes.thickness;
        var pdfFontStyle = this.getFontStyle(formFieldAttributes);
        listBox._dictionary.set('FontStyle', pdfFontStyle);
        var fontFamily = formFieldAttributes.FontFamily ? formFieldAttributes.FontFamily : formFieldAttributes.fontFamily;
        listBox.font = new PdfStandardFont(this.getFontFamily(fontFamily), this.convertPixelToPoint(formFieldAttributes.fontSize), pdfFontStyle);
        for (var i = 0; i < formFieldAttributes.option.length; i++) {
            var listBoxText = formFieldAttributes.option[parseInt(i.toString(), 10)].itemName.toString();
            if (!isNullOrUndefined(listBoxText)) {
                var textFont = this.pdfViewer.pdfRenderer.FallbackFontCollection;
                this.setFontAppearance(listBoxText, formFieldAttributes.fontFamily, formFieldAttributes.fontSize, listBox, textFont, hasUnicode, pdfFontStyle);
                break;
            }
        }
        listBox.readOnly = formFieldAttributes.isReadonly;
        listBox.required = formFieldAttributes.isRequired;
        listBox.visibility = this.getFormFieldsVisibility(formFieldAttributes.visibility);
        listBox.toolTip = isNullOrUndefined(formFieldAttributes.tooltip) ? '' : formFieldAttributes.tooltip;
        if (!isFieldRotated) {
            listBox.rotate = this.getFormfieldRotation(loadedPage.rotation);
        }
        if (!isNullOrUndefined(formFieldAttributes.customData)) {
            var customData = JSON.stringify(formFieldAttributes.customData);
            listBox._dictionary.set('CustomData', customData);
        }
        return listBox;
    };
    FormFieldsBase.prototype.saveRadioButtonField = function (formFieldAttributes) {
        var loadedPage = this.formFieldLoadedDocument.getPage(formFieldAttributes.pageNumber - 1);
        var fieldName = isNullOrUndefined(formFieldAttributes.radiobuttonItem[0].name) ? 'radiobuttonField' : formFieldAttributes.radiobuttonItem[0].name;
        var field = new PdfRadioButtonListField(loadedPage, fieldName);
        var selectedIndex = 0;
        var isSelectedItem = false;
        var isReadOnly = false;
        var isRequired = false;
        for (var i = 0; i < formFieldAttributes.radiobuttonItem.length; i++) {
            var radiobuttonItem = formFieldAttributes.radiobuttonItem[parseInt(i.toString(), 10)];
            var page = this.formFieldLoadedDocument.getPage(radiobuttonItem.pageNumber - 1);
            var radioButtonName = !(isNullOrUndefined(radiobuttonItem.value) || radiobuttonItem.value === '') ? radiobuttonItem.value : fieldName;
            var rotationAngle = this.getRotateAngle(page.rotation);
            var bounds = this.convertFieldBounds(radiobuttonItem);
            var isFieldRotated = false;
            if (formFieldAttributes.rotation !== 0) {
                isFieldRotated = true;
            }
            var fieldBounds = this.getBounds(bounds, page.size[1], page.size[0], rotationAngle, isFieldRotated);
            var bound = { x: fieldBounds.X, y: fieldBounds.Y, width: fieldBounds.Width, height: fieldBounds.Height };
            var radioButtonItem = new PdfRadioButtonListItem(radioButtonName, bound, page);
            if (isFieldRotated) {
                radioButtonItem.rotationAngle = this.GetRotateAngle(page.rotation);
            }
            if (radiobuttonItem.isReadonly) {
                isReadOnly = true;
            }
            if (radiobuttonItem.isRequired) {
                isRequired = true;
            }
            radioButtonItem.borderColor = [radiobuttonItem.borderColor.r, radiobuttonItem.borderColor.g, radiobuttonItem.borderColor.b];
            // eslint-disable-next-line
            if (radiobuttonItem.borderColor.r == 0 && radiobuttonItem.borderColor.g == 0 &&
                // eslint-disable-next-line
                radiobuttonItem.borderColor.b == 0 && radiobuttonItem.borderColor.a == 0) {
                radioButtonItem.borderColor = [radiobuttonItem.borderColor.r, radiobuttonItem.borderColor.g,
                    radiobuttonItem.borderColor.b, radiobuttonItem.borderColor.a];
            }
            radioButtonItem.border.width = radiobuttonItem.thickness;
            radioButtonItem.backColor = [radiobuttonItem.backgroundColor.r, radiobuttonItem.backgroundColor.g,
                radiobuttonItem.backgroundColor.b];
            if (radiobuttonItem.backgroundColor.r === 0 && radiobuttonItem.backgroundColor.g === 0 &&
                radiobuttonItem.backgroundColor.b === 0 && radiobuttonItem.backgroundColor.a === 0) {
                radioButtonItem.backColor = [radiobuttonItem.backgroundColor.r, radiobuttonItem.backgroundColor.g,
                    radiobuttonItem.backgroundColor.b, radiobuttonItem.backgroundColor.a];
            }
            radioButtonItem.visibility = this.getFormFieldsVisibility(radiobuttonItem.visibility);
            field.add(radioButtonItem);
            if (radiobuttonItem.isSelected) {
                selectedIndex = i;
                isSelectedItem = true;
            }
        }
        field.readOnly = isReadOnly;
        field.required = isRequired;
        field.toolTip = isNullOrUndefined(formFieldAttributes.tooltip) ? '' : formFieldAttributes.tooltip;
        if (isSelectedItem) {
            field.selectedIndex = selectedIndex;
        }
        if (!isNullOrUndefined(formFieldAttributes.radiobuttonItem[0].customData)) {
            var customData = JSON.stringify(formFieldAttributes.radiobuttonItem[0].customData);
            field._dictionary.set('CustomData', customData);
        }
        else if (!isNullOrUndefined(formFieldAttributes.customData)) {
            var customData = JSON.stringify(formFieldAttributes.customData);
            field._dictionary.set('CustomData', customData);
        }
        return field;
    };
    FormFieldsBase.prototype.saveSignatureField = function (loadedPage, formFieldAttributes) {
        var signatureFieldName = isNullOrUndefined(formFieldAttributes.name) ? 'signatureField' : formFieldAttributes.name;
        var signatureFieldBounds = this.convertFieldBounds(formFieldAttributes);
        var rotationAngle = loadedPage.rotation;
        var isFieldRotated = false;
        if (formFieldAttributes.rotation !== 0) {
            isFieldRotated = true;
        }
        var fieldBounds = this.getBounds(signatureFieldBounds, loadedPage.size[1], loadedPage.size[0], rotationAngle, isFieldRotated);
        var bound = { x: fieldBounds.X, y: fieldBounds.Y, width: fieldBounds.Width, height: fieldBounds.Height };
        var signatureField = new PdfSignatureField(loadedPage, signatureFieldName, bound);
        //let page: PdfPage = signatureField.page;
        signatureField.toolTip = formFieldAttributes.tooltip;
        signatureField.required = formFieldAttributes.isRequired;
        signatureField.readOnly = formFieldAttributes.isReadonly;
        if (formFieldAttributes.formFieldAnnotationType === 'InitialField') {
            signatureField._dictionary.set('InitialField', true);
        }
        if (formFieldAttributes.value === '') {
            signatureField.backColor = [formFieldAttributes.backgroundColor.r, formFieldAttributes.backgroundColor.g,
                formFieldAttributes.backgroundColor.b];
            if (formFieldAttributes.backgroundColor.r === 0 && formFieldAttributes.backgroundColor.g === 0 &&
                formFieldAttributes.backgroundColor.b === 0 && formFieldAttributes.backgroundColor.a === 0) {
                signatureField.backColor = [formFieldAttributes.backgroundColor.r, formFieldAttributes.backgroundColor.g,
                    formFieldAttributes.backgroundColor.b, formFieldAttributes.backgroundColor.a];
            }
        }
        signatureField.borderColor = [formFieldAttributes.borderColor.r, formFieldAttributes.borderColor.g,
            formFieldAttributes.borderColor.b];
        if (formFieldAttributes.borderColor.r === 0 && formFieldAttributes.borderColor.g === 0 &&
            formFieldAttributes.borderColor.b === 0 && formFieldAttributes.borderColor.a === 0) {
            signatureField.borderColor = [formFieldAttributes.borderColor.r, formFieldAttributes.borderColor.g,
                formFieldAttributes.borderColor.b, formFieldAttributes.borderColor.a];
        }
        signatureField.border.width = formFieldAttributes.thickness;
        if (formFieldAttributes.visibility === 'hidden') {
            signatureField.visible = false;
        }
        else if (formFieldAttributes.visibility === 'visible') {
            signatureField.visible = true;
        }
        if (formFieldAttributes.signatureType === 'Text') {
            this.drawDesignerFieldFreeTextAnnotations(signatureField, signatureFieldName, formFieldAttributes);
        }
        else if (formFieldAttributes.signatureType === 'Image') {
            this.drawDesignerFieldImage(signatureField, signatureFieldName, formFieldAttributes);
        }
        else if (formFieldAttributes.signatureType === 'Path') {
            if (!isNullOrUndefined(formFieldAttributes.value) && formFieldAttributes.value !== '') {
                this.drawDesignerFieldPath(signatureField, signatureFieldName, formFieldAttributes);
            }
        }
        if (!isFieldRotated) {
            signatureField.rotate = this.getFormfieldRotation(loadedPage.rotation);
        }
        if (!isNullOrUndefined(formFieldAttributes.customData)) {
            var customData = JSON.stringify(formFieldAttributes.customData);
            signatureField._dictionary.set('CustomData', customData);
        }
        return signatureField;
    };
    FormFieldsBase.prototype.drawDesignerFieldFreeTextAnnotations = function (signatureField, currentFieldName, formFieldAttributes) {
        var boundsObjects = { X: formFieldAttributes.signatureBound.x, Y: formFieldAttributes.signatureBound.y,
            Width: formFieldAttributes.signatureBound.width, Height: formFieldAttributes.signatureBound.height };
        var page = signatureField.page;
        var pageRotationAngle = page.rotation;
        var zoomvalue = formFieldAttributes.zoomValue;
        var signBounds = { X: this.convertPixelToPoint(boundsObjects.X / zoomvalue),
            Y: this.convertPixelToPoint(boundsObjects.Y / zoomvalue), Width: this.convertPixelToPoint(boundsObjects.Width / zoomvalue),
            Height: this.convertPixelToPoint(boundsObjects.Height / zoomvalue) };
        var isFieldRotated = false;
        if (formFieldAttributes.rotation !== 0) {
            isFieldRotated = true;
        }
        signBounds = this.getBounds(signBounds, page.size[1], page.size[0], pageRotationAngle, isFieldRotated);
        if (!isNullOrUndefined(formFieldAttributes)) {
            var left = signBounds.X;
            var top_3 = signBounds.Y;
            var width = signBounds.Width;
            var height = signBounds.Height;
            var freeTextBounds = { X: left, Y: top_3, Width: width, Height: height };
            var annotation = new PdfFreeTextAnnotation(left, top_3, width, height);
            annotation.setAppearance(true);
            annotation._dictionary.set('T', currentFieldName);
            var font = formFieldAttributes.fontSize;
            var fontFamilyEnum = PdfFontFamily.helvetica;
            if (!isNullOrUndefined(formFieldAttributes.fontFamily)) {
                fontFamilyEnum = this.getFontFamily(formFieldAttributes.fontFamily);
            }
            var fontStyle = this.getFontStyle(formFieldAttributes);
            // eslint-disable-next-line
            var hasUnicode = /[^\u0000-\u007F]/.test(formFieldAttributes.value);
            if (hasUnicode) {
                annotation.font = this.getTrueFont(this.convertPixelToPoint(font), fontStyle);
            }
            else {
                annotation.font = new PdfStandardFont(fontFamilyEnum, this.convertPixelToPoint(formFieldAttributes.fontSize), fontStyle);
            }
            annotation.text = formFieldAttributes.value;
            this.setFontSize(this.convertPixelToPoint(font), annotation.font, formFieldAttributes.value, freeTextBounds, fontFamilyEnum, fontStyle);
            annotation.border.width = 0;
            annotation.textAlignment = PdfTextAlignment.center;
            annotation.flags = PdfAnnotationFlag.print;
            if (formFieldAttributes.visibility === 'hidden') {
                annotation.flags = PdfAnnotationFlag.hidden;
            }
            if (!isFieldRotated) {
                annotation.rotationAngle = Math.abs(this.getRotateAngle(page.rotation));
            }
            annotation.setValues('AnnotationType', 'Signature');
            annotation.setAppearance(true);
            page.annotations.add(annotation);
        }
    };
    FormFieldsBase.prototype.drawDesignerFieldImage = function (signatureField, currentFieldName, formFieldAttributes) {
        var boundsObjects = { X: formFieldAttributes.signatureBound.x, Y: formFieldAttributes.signatureBound.y,
            Width: formFieldAttributes.signatureBound.width, Height: formFieldAttributes.signatureBound.height };
        var page = signatureField.page;
        var pageRotationAngle = page.rotation;
        var zoomvalue = formFieldAttributes.zoomValue;
        var signBounds = { X: this.convertPixelToPoint(boundsObjects.X / zoomvalue),
            Y: this.convertPixelToPoint(boundsObjects.Y / zoomvalue), Width: this.convertPixelToPoint(boundsObjects.Width / zoomvalue),
            Height: this.convertPixelToPoint(boundsObjects.Height / zoomvalue) };
        var isFieldRotated = false;
        if (formFieldAttributes.rotation !== 0) {
            isFieldRotated = true;
        }
        signBounds = this.getBounds(signBounds, page.size[1], page.size[0], pageRotationAngle, isFieldRotated);
        if (!isNullOrUndefined(formFieldAttributes)) {
            var left = signBounds.X;
            var top_4 = signBounds.Y;
            var width = signBounds.Width;
            var height = signBounds.Height;
            var imageUrl = (formFieldAttributes.value.toString()).split(',')[1];
            var rubberStampAnnotation = new PdfRubberStampAnnotation(left, top_4, width, height);
            var bitmap = new PdfBitmap(imageUrl);
            rubberStampAnnotation.appearance.normal.graphics.drawImage(bitmap, 0, 0, width, height);
            if (!isFieldRotated) {
                rubberStampAnnotation.rotationAngle = Math.abs(this.getRotateAngle(page.rotation));
            }
            rubberStampAnnotation._dictionary.set('T', currentFieldName);
            rubberStampAnnotation.flags = PdfAnnotationFlag.print;
            if (formFieldAttributes.visibility === 'hidden') {
                rubberStampAnnotation.flags = PdfAnnotationFlag.hidden;
            }
            page.annotations.add(rubberStampAnnotation);
        }
    };
    FormFieldsBase.prototype.drawDesignerFieldPath = function (signatureField, currentFieldName, formFieldAttributes) {
        var stampObjects = JSON.parse(formFieldAttributes.value);
        var boundsObjects = { X: formFieldAttributes.signatureBound.x, Y: formFieldAttributes.signatureBound.y,
            Width: formFieldAttributes.signatureBound.width, Height: formFieldAttributes.signatureBound.height };
        var page = signatureField.page;
        var pageRotationAngle = page.rotation;
        var zoomvalue = formFieldAttributes.zoomValue;
        var signBounds = { X: this.convertPixelToPoint(boundsObjects.X / zoomvalue),
            Y: this.convertPixelToPoint(boundsObjects.Y / zoomvalue), Width: this.convertPixelToPoint(boundsObjects.Width / zoomvalue),
            Height: this.convertPixelToPoint(boundsObjects.Height / zoomvalue) };
        signBounds = this.getBounds(signBounds, page.size[1], page.size[0], pageRotationAngle, false);
        var pageNumber = 0;
        for (var k = 0; k < this.formFieldLoadedDocument.pageCount; k++) {
            if (page === this.formFieldLoadedDocument.getPage(k)) {
                break;
            }
            pageNumber++;
        }
        // Need to check and implement the logic of skia sharp to reduced the ink annotation thickness
        if (stampObjects.length > 0) {
            var left = signBounds.X;
            var top_5 = signBounds.Y;
            var width = signBounds.Width;
            var height = signBounds.Height;
            var minimumX = -1;
            var minimumY = -1;
            var maximumX = -1;
            var maximumY = -1;
            var drawingPath = new PdfPath();
            for (var p = 0; p < stampObjects.length; p++) {
                var val = stampObjects[parseInt(p.toString(), 10)];
                drawingPath.addLine(val.x, val.y, 0, 0);
            }
            for (var p = 0; p < drawingPath._points.length; p += 2) {
                var value = drawingPath._points[parseInt(p.toString(), 10)];
                if (minimumX === -1) {
                    minimumX = value[0];
                    minimumY = value[1];
                    maximumX = value[0];
                    maximumY = value[1];
                }
                else {
                    var point1 = value[0];
                    var point2 = value[1];
                    if (minimumX >= point1) {
                        minimumX = point1;
                    }
                    if (minimumY >= point2) {
                        minimumY = point2;
                    }
                    if (maximumX <= point1) {
                        maximumX = point1;
                    }
                    if (maximumY <= point2) {
                        maximumY = point2;
                    }
                }
            }
            var newDifferenceX = (maximumX - minimumX) / width;
            var newDifferenceY = (maximumY - minimumY) / height;
            var linePoints = [];
            var isNewValues = 0;
            if (pageRotationAngle !== 0) {
                for (var j = 0; j < stampObjects.length; j++) {
                    var value = stampObjects[parseInt(j.toString(), 10)];
                    var path = value.command.toString();
                    if (path === 'M' && j !== 0) {
                        isNewValues = j;
                        break;
                    }
                    linePoints.push(parseFloat(value.x));
                    linePoints.push(parseFloat(value.y));
                }
                linePoints = [];
                for (var z = 0; z < stampObjects.length; z++) {
                    var value = stampObjects[parseInt(z.toString(), 10)];
                    linePoints.push(((parseFloat(value.x) - minimumX) / newDifferenceX) + left);
                    linePoints.push(this.formFieldLoadedDocument.getPage(pageNumber).size[1] - ((parseFloat(value.y) - minimumY) /
                        newDifferenceY) - top_5);
                }
            }
            else {
                for (var k = 0; k < stampObjects.length; k++) {
                    var value = stampObjects[parseInt(k.toString(), 10)];
                    var path = value.command.toString();
                    if (path === 'M' && k !== 0) {
                        isNewValues = k;
                        break;
                    }
                    linePoints.push(((parseFloat(value.x) - minimumX) / newDifferenceX) + left);
                    var newX = ((parseFloat(value.y) - minimumY) / newDifferenceY);
                    linePoints.push(this.formFieldLoadedDocument.getPage(pageNumber).size[1] - newX - top_5);
                }
            }
            var inkAnnotation = new PdfInkAnnotation([left, top_5, width, height], linePoints);
            inkAnnotation.flags = PdfAnnotationFlag.print;
            if (formFieldAttributes.visibility === 'hidden') {
                inkAnnotation.flags = PdfAnnotationFlag.hidden;
            }
            inkAnnotation.bounds = { x: signBounds.X, y: signBounds.Y, width: signBounds.Width, height: signBounds.Height };
            inkAnnotation.border.width = 0;
            inkAnnotation.color = [0, 0, 0];
            inkAnnotation.setValues('annotationSignature', 'annotationSignature');
            linePoints = [];
            if (pageRotationAngle !== 0) {
                var pathCollection = [];
                for (var t = isNewValues; t < stampObjects.length; t++) {
                    var value = stampObjects[parseInt(t.toString(), 10)];
                    var path = value.command.toString();
                    if (path === 'M' && t !== isNewValues) {
                        pathCollection.push(linePoints);
                        linePoints = [];
                    }
                    linePoints.push(parseFloat(value.x));
                    linePoints.push(parseFloat(value.y));
                }
                if (linePoints.length > 0) {
                    pathCollection.push(linePoints);
                }
                for (var w = 0; w < pathCollection.length; w++) {
                    var pointsCollections = pathCollection[parseInt(w.toString(), 10)];
                    linePoints = [];
                    if (pointsCollections.length > 0) {
                        for (var z = 0; z < stampObjects.length; z++) {
                            var value = stampObjects[parseInt(z.toString(), 10)];
                            linePoints.push(((parseFloat(value.x) - minimumX) / newDifferenceX) + left);
                            linePoints.push(this.formFieldLoadedDocument.getPage(pageNumber).size[1] - ((parseFloat(value.y) -
                                minimumY) / newDifferenceY) - top_5);
                        }
                        inkAnnotation.inkPointsCollection.push(linePoints);
                    }
                    linePoints = [];
                }
            }
            else {
                for (var r = 0; r < stampObjects.length; r++) {
                    var value = stampObjects[parseInt(r.toString(), 10)];
                    var path = value.command.toString();
                    if (path === 'M' && r !== 0) {
                        inkAnnotation.inkPointsCollection.push(linePoints);
                        linePoints = [];
                    }
                    linePoints.push(((parseFloat(value.x) - minimumX) / newDifferenceX) + left);
                    var newX = ((parseFloat(value.y) - minimumY) / newDifferenceY);
                    linePoints.push(this.formFieldLoadedDocument.getPage(pageNumber).size[1] - newX - top_5);
                }
                if (linePoints.length > 0) {
                    inkAnnotation.inkPointsCollection.push(linePoints);
                }
            }
            inkAnnotation._dictionary.set('T', currentFieldName);
            inkAnnotation.setAppearance(true);
            inkAnnotation.rotationAngle = Math.abs(this.getRotateAngle(page.rotation));
            this.formFieldLoadedDocument.getPage(pageNumber).annotations.add(inkAnnotation);
        }
    };
    FormFieldsBase.prototype.setFontSize = function (fontSize, font, text, freeTextBounds, fontFamilyEnum, fontStyle) {
        var minimumFontSize = 0.25;
        font = new PdfStandardFont(fontFamilyEnum, fontSize, fontStyle);
        do {
            fontSize = fontSize - 0.001;
            font._size = fontSize;
            if (fontSize < minimumFontSize) {
                font._size = minimumFontSize;
                break;
            }
            var sizeF = font.measureString(text);
            if (sizeF[0] < freeTextBounds.Width && sizeF[1] < freeTextBounds.height) {
                font._size = fontSize;
                break;
            }
        } while (fontSize > minimumFontSize);
    };
    FormFieldsBase.prototype.getTrueFont = function (fontSize, fontStyle) {
        var font = new PdfTrueTypeFont(getArialFontData(), this.convertPixelToPoint(fontSize), fontStyle);
        return font;
    };
    FormFieldsBase.prototype.convertFieldBounds = function (formFieldAttributes) {
        var zoomvalue = formFieldAttributes.zoomValue;
        return { X: this.convertPixelToPoint(formFieldAttributes.lineBound.X / zoomvalue),
            Y: this.convertPixelToPoint(formFieldAttributes.lineBound.Y / zoomvalue),
            Width: this.convertPixelToPoint(formFieldAttributes.lineBound.Width / zoomvalue),
            Height: this.convertPixelToPoint(formFieldAttributes.lineBound.Height / zoomvalue) };
    };
    FormFieldsBase.prototype.getFontFamily = function (font) {
        var fontFamily = PdfFontFamily.helvetica;
        switch (font) {
            case 'Courier':
                fontFamily = PdfFontFamily.courier;
                break;
            case 'Times New Roman':
                fontFamily = PdfFontFamily.timesRoman;
                break;
            case 'Symbol':
                fontFamily = PdfFontFamily.symbol;
                break;
            case 'ZapfDingbats':
                fontFamily = PdfFontFamily.zapfDingbats;
                break;
        }
        return fontFamily;
    };
    //Need to calculate bound for all rotation
    FormFieldsBase.prototype.getBounds = function (bounds, pageHeight, pageWidth, pageRotation, isFieldRotated) {
        var bound = {};
        if (pageRotation === 0) {
            bound = { X: bounds.X, Y: bounds.Y, Width: bounds.Width, Height: bounds.Height };
        }
        else if (pageRotation === 1) {
            if (isFieldRotated) {
                bound = { X: bounds.Y - (bounds.Width / 2 - bounds.Height / 2),
                    Y: pageHeight - bounds.X - bounds.Height - (bounds.Width / 2 - bounds.Height / 2),
                    Width: bounds.Width, Height: bounds.Height };
            }
            else {
                bound = { X: bounds.Y, Y: pageHeight - bounds.X - bounds.Width, Width: bounds.Height, Height: bounds.Width };
            }
        }
        else if (pageRotation === 2) {
            bound = { X: pageWidth - bounds.X - bounds.Width, Y: pageHeight - bounds.Y - bounds.Height,
                Width: bounds.Width, Height: bounds.Height };
        }
        else if (pageRotation === 3) {
            if (isFieldRotated) {
                bound = { X: pageWidth - bounds.Y - bounds.Height - (bounds.Width / 2 - bounds.Height / 2),
                    Y: bounds.X + (bounds.Width / 2 - bounds.Height / 2), Width: bounds.Width, Height: bounds.Height };
            }
            else {
                bound = { X: pageWidth - bounds.Y - bounds.Height, Y: bounds.X, Width: bounds.Height, Height: bounds.Width };
            }
        }
        return bound;
    };
    FormFieldsBase.prototype.getFormfieldRotation = function (rotation) {
        var angle = 0;
        switch (rotation) {
            case 1:
                angle = 90;
                break;
            case 2:
                angle = 180;
                break;
            case 3:
                angle = 270;
                break;
            case 4:
                angle = 360;
                break;
        }
        return angle;
    };
    //Need to check the form field textAlignment property
    FormFieldsBase.prototype.getTextAlignment = function (alignment) {
        var textAlignment;
        switch (alignment.toLowerCase()) {
            case 'left':
                textAlignment = PdfTextAlignment.left;
                break;
            case 'right':
                textAlignment = PdfTextAlignment.right;
                break;
            case 'center':
                textAlignment = PdfTextAlignment.center;
                break;
            case 'justify':
                textAlignment = PdfTextAlignment.justify;
                break;
        }
        return textAlignment;
    };
    //Need to check the form field visibility property
    FormFieldsBase.prototype.getFormFieldsVisibility = function (visibility) {
        var fieldVisibility;
        switch (visibility) {
            case 'visible':
                fieldVisibility = PdfFormFieldVisibility.visible;
                break;
            case 'hidden':
                fieldVisibility = PdfFormFieldVisibility.hidden;
                break;
            case 'visibleNotPrintable':
                fieldVisibility = PdfFormFieldVisibility.visibleNotPrintable;
                break;
            case 'hiddenPrintable':
                fieldVisibility = PdfFormFieldVisibility.hiddenPrintable;
                break;
        }
        return fieldVisibility;
    };
    FormFieldsBase.prototype.getFontStyle = function (formFieldAttributes) {
        var fontStyle;
        fontStyle = PdfFontStyle.regular;
        if (!isNullOrUndefined(formFieldAttributes) && !isNullOrUndefined(formFieldAttributes.font)) {
            if (formFieldAttributes.font.isBold) {
                fontStyle |= PdfFontStyle.bold;
            }
            if (formFieldAttributes.font.isItalic) {
                fontStyle |= PdfFontStyle.italic;
            }
            if (formFieldAttributes.font.isUnderline) {
                fontStyle |= PdfFontStyle.underline;
            }
            if (formFieldAttributes.font.isStrikeout) {
                fontStyle |= PdfFontStyle.strikeout;
            }
        }
        return fontStyle;
    };
    FormFieldsBase.prototype.convertPixelToPoint = function (value) {
        return (value * 72 / 96);
    };
    FormFieldsBase.prototype.convertPointtoPixel = function (value) {
        return (value * 96 / 72);
    };
    FormFieldsBase.prototype.fontConvert = function (font) {
        return {
            Bold: font.isBold,
            FontFamily: this.getFontFamilyString(font.fontFamily),
            Height: font.height,
            Italic: font.isItalic,
            Name: this.getFontFamilyString(font.fontFamily).toString(),
            Size: font.size,
            Strikeout: font.isStrikeout,
            Underline: font.isUnderline,
            Style: font.style
        };
    };
    FormFieldsBase.prototype.parseFontStyle = function (numberValue, fontObject) {
        if ((numberValue & PdfFontStyle.underline) > 0) {
            fontObject.Underline = true;
        }
        if ((numberValue & PdfFontStyle.strikeout) > 0) {
            fontObject.Strikeout = true;
        }
        if ((numberValue & PdfFontStyle.bold) > 0) {
            fontObject.Bold = true;
        }
        if ((numberValue & PdfFontStyle.italic) > 0) {
            fontObject.Italic = true;
        }
        return fontObject;
    };
    /**
     * @private
     * @returns {void}
     */
    FormFieldsBase.prototype.GetFormFields = function () {
        this.PdfRenderedFormFields = [];
        var loadedForm = this.formFieldLoadedDocument.form;
        if (!isNullOrUndefined(loadedForm) && !isNullOrUndefined(loadedForm._fields)) {
            loadedForm.orderFormFields();
            for (var i = 0; i < loadedForm.count; i++) {
                var field = loadedForm.fieldAt(i);
                var page = field.page;
                var pageNumber = 0;
                for (var j = 0; j < this.formFieldLoadedDocument.pageCount; j++) {
                    if (page === this.formFieldLoadedDocument.getPage(j)) {
                        break;
                    }
                    pageNumber++;
                }
                if (!isNullOrUndefined(field.page)) {
                    if (field instanceof PdfTextBoxField) {
                        var textBox = field;
                        if (textBox.itemsCount > 0) {
                            this.addTextBoxFieldItems(textBox);
                        }
                        else {
                            this.addTextBoxField(textBox, pageNumber, textBox.bounds, null);
                        }
                    }
                    else if (field instanceof PdfComboBoxField) {
                        var comboBoxField = loadedForm.fieldAt(i);
                        this.addComboBoxField(comboBoxField, pageNumber);
                    }
                    else if (field instanceof PdfCheckBoxField) {
                        var checkbox = field;
                        if (checkbox.itemsCount > 1) {
                            this.addCheckBoxFieldItems(checkbox);
                        }
                        else {
                            this.addCheckBoxField(checkbox, pageNumber, checkbox.bounds, null);
                        }
                    }
                    else if (field instanceof PdfListBoxField) {
                        var listBoxField = field;
                        this.addListBoxField(listBoxField, pageNumber);
                    }
                    else if (field instanceof PdfRadioButtonListField) {
                        for (var i_2 = 0; i_2 < field.itemsCount; i_2++) {
                            var item = field.itemAt(i_2);
                            if (item) {
                                var page_1 = item.page;
                                if (page_1) {
                                    this.addRadioButtonField(item, page_1._pageIndex, field.name);
                                }
                            }
                        }
                    }
                    else if (loadedForm.fieldAt(i) instanceof PdfSignatureField) {
                        var signatureField = loadedForm.fieldAt(i);
                        if (signatureField.isSigned && this.showDigitalSignatureAppearance) {
                            this.mIsDigitalSignaturePresent = true;
                            signatureField.flatten = true;
                        }
                        else if (!signatureField.isSigned || !this.hideEmptyDigitalSignatureFields) {
                            if (signatureField.itemsCount > 0) {
                                this.addSigntureFieldItems(signatureField);
                            }
                            else {
                                this.addSignatureField(signatureField, pageNumber, signatureField.bounds);
                            }
                        }
                    }
                }
            }
        }
        this.retrieveInkAnnotation(this.formFieldLoadedDocument);
    };
    FormFieldsBase.prototype.addTextBoxFieldItems = function (field) {
        if (field instanceof PdfTextBoxField) {
            var textBoxField = field;
            if (textBoxField.itemsCount > 0) {
                for (var i = 0; i < textBoxField.itemsCount; i++) {
                    var item = textBoxField.itemAt(i).page;
                    if (!isNullOrUndefined(item)) {
                        var j = 0;
                        for (var k = 0; k < this.formFieldLoadedDocument.pageCount; k++) {
                            if (item === this.formFieldLoadedDocument.getPage(j)) {
                                break;
                            }
                            j++;
                        }
                        this.addTextBoxField(textBoxField, j, textBoxField.itemAt(i).bounds, textBoxField.itemAt(i).font);
                    }
                }
            }
        }
    };
    FormFieldsBase.prototype.addTextBoxField = function (textBox, pageNumber, bounds, font) {
        var formFields = new PdfRenderedFields();
        formFields.FieldName = textBox.name;
        formFields.ActualFieldName = textBox.name;
        if (textBox.password) {
            formFields.Name = 'Password';
        }
        else {
            formFields.Name = 'Textbox';
        }
        formFields.ToolTip = textBox.toolTip;
        if (!isNullOrUndefined(bounds)) {
            formFields.LineBounds = { X: bounds.x, Y: bounds.y, Width: bounds.width, Height: bounds.height };
        }
        else {
            formFields.LineBounds = { X: textBox.bounds.x, Y: textBox.bounds.y, Width: textBox.bounds.width,
                Height: textBox.bounds.height };
        }
        formFields.TabIndex = textBox.tabIndex;
        formFields.PageIndex = pageNumber;
        formFields.BorderWidth = textBox.border.width;
        formFields.BorderStyle = textBox.border.style;
        if (!isNullOrUndefined(textBox.backColor)) {
            formFields.BackColor = { R: textBox.backColor[0], G: textBox.backColor[1], B: textBox.backColor[2] };
        }
        else {
            formFields.IsTransparent = true;
        }
        formFields.Alignment = textBox.textAlignment;
        formFields.MaxLength = textBox.maxLength;
        formFields.Visible = textBox.visibility;
        formFields.InsertSpaces = textBox.insertSpaces;
        if (!isNullOrUndefined(font)) {
            formFields.Font = this.fontConvert(font);
        }
        else {
            formFields.Font = this.fontConvert(textBox.font);
        }
        if (textBox._dictionary.has('FontStyle')) {
            var fontStyle = textBox._dictionary.get('FontStyle');
            formFields.Font = this.parseFontStyle(fontStyle, formFields.Font);
        }
        formFields.Rotation = textBox.rotationAngle;
        formFields.IsReadonly = textBox.readOnly;
        formFields.IsRequired = textBox.required;
        if (!isNullOrUndefined(textBox.color)) {
            formFields.FontColor = { R: textBox.color[0], G: textBox.color[1], B: textBox.color[2] };
        }
        if (!isNullOrUndefined(textBox.borderColor)) {
            formFields.BorderColor = { R: textBox.borderColor[0], G: textBox.borderColor[1], B: textBox.borderColor[2] };
        }
        else {
            formFields.IsTransparent = true;
        }
        formFields.Text = textBox.text ? textBox.text.replace('"', '') : '';
        formFields.Multiline = textBox.multiLine;
        formFields.RotationAngle = this.GetRotateAngle(textBox.page.rotation);
        if (textBox._dictionary.has('CustomData')) {
            formFields.CustomData = JSON.parse(textBox._dictionary.get('CustomData'));
        }
        formFields.TextList = [];
        this.PdfRenderedFormFields.push(formFields);
    };
    FormFieldsBase.prototype.addComboBoxField = function (comboBoxField, pageNumber) {
        var formFields = new PdfRenderedFields();
        formFields.Name = 'DropDown';
        formFields.ToolTip = comboBoxField.toolTip;
        formFields.FieldName = comboBoxField.name;
        formFields.Font = this.fontConvert(comboBoxField.font);
        formFields.IsAutoSize = comboBoxField._isAutoFontSize;
        formFields.Selected = comboBoxField.editable;
        if (comboBoxField._dictionary.has('FontStyle')) {
            var fontStyle = comboBoxField._dictionary.get('FontStyle');
            formFields.Font = this.parseFontStyle(fontStyle, formFields.Font);
        }
        formFields.ActualFieldName = comboBoxField.name;
        formFields.SelectedValue = comboBoxField.selectedValue;
        if (comboBoxField._options.length > 0 && (typeof comboBoxField._options[0] !== 'string')) {
            var selectedValue = comboBoxField._options.filter(function (option) { return option[0] === formFields.SelectedValue; });
            if (selectedValue && selectedValue[0]) {
                formFields.SelectedValue = selectedValue[0][1];
            }
        }
        formFields.selectedIndex = comboBoxField.selectedIndex;
        formFields.LineBounds = { X: comboBoxField.bounds.x, Y: comboBoxField.bounds.y, Width: comboBoxField.bounds.width,
            Height: comboBoxField.bounds.height };
        formFields.TabIndex = comboBoxField.tabIndex;
        formFields.PageIndex = pageNumber;
        if (!isNullOrUndefined(comboBoxField.backColor)) {
            formFields.BackColor = { R: comboBoxField.backColor[0], G: comboBoxField.backColor[1], B: comboBoxField.backColor[2] };
        }
        else {
            formFields.IsTransparent = true;
        }
        formFields.BorderWidth = comboBoxField.border.width;
        formFields.BorderStyle = comboBoxField.border.style;
        if (!isNullOrUndefined(comboBoxField.borderColor)) {
            formFields.BorderColor = { R: comboBoxField.borderColor[0], G: comboBoxField.borderColor[1], B: comboBoxField.borderColor[2] };
        }
        else {
            formFields.IsTransparent = true;
        }
        formFields.FontColor = { R: comboBoxField.color[0], G: comboBoxField.color[1], B: comboBoxField.color[2] };
        formFields.Rotation = comboBoxField.rotationAngle;
        formFields.IsRequired = comboBoxField.required;
        formFields.IsReadonly = comboBoxField.readOnly;
        formFields.Visible = comboBoxField.visibility;
        formFields.RotationAngle = this.GetRotateAngle(comboBoxField.page.rotation);
        formFields.Alignment = comboBoxField.textAlignment;
        if (comboBoxField._dictionary.has('CustomData')) {
            formFields.CustomData = JSON.parse(comboBoxField._dictionary.get('CustomData'));
        }
        formFields.TextList = [];
        if (comboBoxField._dictionary.has('Opt')) {
            var options = comboBoxField._dictionary.get('Opt');
            if (options.length > 0) {
                formFields.ComboBoxList = options.map(function (item) {
                    return (typeof item === 'string' ?
                        { itemName: item, itemValue: item } : (typeof item === 'object' ?
                        { itemName: item[1], itemValue: item[0] } : { itemName: '', itemValue: '' }));
                });
            }
        }
        if (formFields.TextList.length === 0) {
            for (var i = 0; i < comboBoxField.itemsCount; i++) {
                var item = comboBoxField.itemAt(i);
                if (item) {
                    formFields.TextList.push(item.text);
                    if (i === 0) {
                        formFields.Alignment = item.textAlignment;
                    }
                }
            }
        }
        this.PdfRenderedFormFields.push(formFields);
    };
    FormFieldsBase.prototype.addCheckBoxFieldItems = function (field) {
        if (field instanceof PdfCheckBoxField) {
            var checkBoxField = field;
            if (checkBoxField.itemsCount > 0) {
                for (var i = 0; i < checkBoxField.itemsCount; i++) {
                    var item = checkBoxField.itemAt(i).page;
                    if (!isNullOrUndefined(item)) {
                        var j = 0;
                        for (var k = 0; k < this.formFieldLoadedDocument.pageCount; k++) {
                            if (item === this.formFieldLoadedDocument.getPage(j)) {
                                break;
                            }
                            j++;
                        }
                        this.addCheckBoxField(checkBoxField, j, checkBoxField.itemAt(i).bounds, i.toString());
                    }
                }
            }
        }
    };
    FormFieldsBase.prototype.addCheckBoxField = function (chkField, index, bounds, checkBoxIndex) {
        var formFields = new PdfRenderedFields();
        formFields.Name = 'CheckBox';
        formFields.ToolTip = chkField.toolTip;
        if (!bounds.IsEmpty) {
            formFields.LineBounds = { X: bounds.x, Y: bounds.y, Width: bounds.width, Height: bounds.height };
        }
        else {
            formFields.LineBounds = { X: chkField.bounds.x, Y: chkField.bounds.y, Width: chkField.bounds.width,
                Height: chkField.bounds.height };
        }
        formFields.Selected = chkField.checked;
        formFields.TabIndex = chkField.tabIndex;
        formFields.GroupName = chkField.name.replace(/[^0-9a-zA-Z]+/g, '');
        formFields.ActualFieldName = chkField.name;
        formFields.PageIndex = index;
        formFields.BorderWidth = chkField.border.width;
        if (!isNullOrUndefined(chkField.backColor)) {
            formFields.BackColor = { R: chkField.backColor[0], G: chkField.backColor[1], B: chkField.backColor[2] };
        }
        else {
            formFields.IsTransparent = true;
        }
        formFields.BorderStyle = chkField.border.style;
        if (!isNullOrUndefined(chkField.borderColor)) {
            formFields.BorderColor = { R: chkField.borderColor[0], G: chkField.borderColor[1], B: chkField.borderColor[2] };
        }
        else {
            formFields.IsTransparent = true;
        }
        formFields.RotationAngle = this.GetRotateAngle(chkField.page.rotation);
        formFields.IsReadonly = chkField.readOnly;
        formFields.IsRequired = chkField.required;
        formFields.Visible = chkField.visibility;
        var value = chkField._dictionary._get('ExportValue');
        if (chkField._dictionary._get('ExportValue') && !isNullOrUndefined(value)) {
            formFields.Value = value;
        }
        if (!isNullOrUndefined(checkBoxIndex)) {
            formFields.CheckBoxIndex = checkBoxIndex;
            var chekckboxField = chkField.itemAt(parseInt(checkBoxIndex, 10));
            if (!isNullOrUndefined(chekckboxField)) {
                formFields.Selected = chekckboxField.checked;
            }
        }
        formFields.RotationAngle = this.GetRotateAngle(chkField.page.rotation);
        if (chkField._dictionary.has('CustomData')) {
            formFields.CustomData = JSON.parse(chkField._dictionary.get('CustomData'));
        }
        this.PdfRenderedFormFields.push(formFields);
    };
    FormFieldsBase.prototype.addListBoxField = function (listBoxField, pageNumber) {
        var formFields = new PdfRenderedFields();
        formFields.Name = 'ListBox';
        formFields.ToolTip = listBoxField.toolTip;
        formFields.Text = listBoxField.name.replace(/[^0-9a-zA-Z]+/g, '');
        formFields.ActualFieldName = listBoxField.name;
        var itemCount = listBoxField.itemsCount;
        if (itemCount > 0) {
            var selectedIndex = listBoxField.selectedIndex;
            if (Array.isArray(selectedIndex)) {
                for (var i = 0; i < selectedIndex.length; i++) {
                    formFields.SelectedList.push(selectedIndex[parseInt(i.toString(), 10)]);
                }
            }
            else {
                formFields.SelectedList.push(selectedIndex);
            }
        }
        formFields.Font = this.fontConvert(listBoxField.font);
        if (listBoxField._dictionary.has('FontStyle')) {
            var fontStyle = listBoxField._dictionary.get('FontStyle');
            formFields.Font = this.parseFontStyle(fontStyle, formFields.Font);
        }
        formFields.LineBounds = { X: listBoxField.bounds.x, Y: listBoxField.bounds.y, Width: listBoxField.bounds.width,
            Height: listBoxField.bounds.height };
        formFields.TabIndex = listBoxField.tabIndex;
        formFields.PageIndex = pageNumber;
        formFields.BorderWidth = listBoxField.border.width;
        formFields.BorderStyle = listBoxField.border.style;
        if (!isNullOrUndefined(listBoxField.backColor)) {
            formFields.BackColor = { R: listBoxField.backColor[0], G: listBoxField.backColor[1], B: listBoxField.backColor[2] };
        }
        else {
            formFields.IsTransparent = true;
        }
        formFields.FontColor = { R: listBoxField.color[0], G: listBoxField.color[1], B: listBoxField.color[2] };
        if (!isNullOrUndefined(listBoxField.borderColor)) {
            formFields.BorderColor = { R: listBoxField.borderColor[0], G: listBoxField.borderColor[1], B: listBoxField.borderColor[2] };
        }
        formFields.Rotation = listBoxField.rotationAngle;
        formFields.IsReadonly = listBoxField.readOnly;
        formFields.IsRequired = listBoxField.required;
        formFields.Visible = listBoxField.visibility;
        formFields.MultiSelect = listBoxField.multiSelect;
        //Need to implement selected value
        if (itemCount > 0) {
            if (Array.isArray(listBoxField.selectedIndex) && Array.isArray(listBoxField.selectedValue)) {
                formFields.selectedIndex = listBoxField.selectedIndex[0];
                formFields.SelectedValue = listBoxField.selectedValue[0];
            }
        }
        for (var i = 0; i < itemCount; i++) {
            var item = listBoxField._kidsCount > 0 ? listBoxField.itemAt(i) : listBoxField._options[parseInt(i.toString(), 10)];
            if (item) {
                formFields.TextList.push(listBoxField._kidsCount > 0 ? item.text : item);
                if (i === 0) {
                    formFields.Alignment = listBoxField.textAlignment;
                }
            }
        }
        formFields.RotationAngle = this.GetRotateAngle(listBoxField.page.rotation);
        if (listBoxField._dictionary.has('CustomData')) {
            formFields.CustomData = JSON.parse(listBoxField._dictionary.get('CustomData'));
        }
        this.PdfRenderedFormFields.push(formFields);
    };
    FormFieldsBase.prototype.addRadioButtonField = function (item, index, radioButtonName) {
        var parent = item._field;
        var formFields = new PdfRenderedFields();
        formFields.Name = 'RadioButton';
        formFields.ToolTip = parent.toolTip;
        if (!isNullOrUndefined(parent.actualName)) {
            formFields.GroupName = parent.actualName.replace(/[^0-9a-zA-Z]+/g, '');
            formFields.ActualFieldName = radioButtonName;
        }
        formFields.TabIndex = parent.tabIndex;
        formFields.Selected = item.selected;
        formFields.LineBounds = { X: item.bounds.x, Y: item.bounds.y, Width: item.bounds.width, Height: item.bounds.height };
        formFields.Value = item.value;
        formFields.PageIndex = index;
        if (!isNullOrUndefined(item.backColor)) {
            formFields.BackColor = { R: item.backColor[0], G: item.backColor[1], B: item.backColor[2] };
        }
        else {
            formFields.IsTransparent = true;
        }
        formFields.BorderWidth = item.border.width;
        formFields.BorderStyle = item.border.style;
        formFields.BorderColor = { R: parent.borderColor[0], G: parent.borderColor[1], B: parent.borderColor[2] };
        formFields.Rotation = parent.rotationAngle;
        formFields.IsRequired = parent.required;
        formFields.IsReadonly = parent.readOnly;
        formFields.Visible = parent.visibility;
        formFields.RotationAngle = this.GetRotateAngle(item.page.rotation);
        if (parent._dictionary.has('CustomData')) {
            formFields.CustomData = JSON.parse(parent._dictionary.get('CustomData'));
        }
        this.PdfRenderedFormFields.push(formFields);
    };
    FormFieldsBase.prototype.checkTransparent = function (backColor) {
        var IsTransparent = false;
        if (backColor.R === 0 && backColor.G === 0 && backColor.B === 0) {
            IsTransparent = true;
        }
        return IsTransparent;
    };
    FormFieldsBase.prototype.GetRotateAngle = function (angleString) {
        var angle = 0;
        switch (angleString) {
            case 0:
                angle = 0;
                break;
            case 1:
                angle = -90;
                break;
            case 2:
                angle = -180;
                break;
            case 3:
                angle = -270;
                break;
        }
        return angle;
    };
    FormFieldsBase.prototype.drawFieldFreeTextAnnotations = function (resultObjects, signatureFields, currentFieldName, signatureBounds, fontName, fontSizes) {
        var stampObjects = JSON.parse(resultObjects);
        var boundsObjects = JSON.parse(signatureBounds);
        var page = signatureFields.page;
        var pageNumber = 0;
        for (var k = 0; k < this.formFieldLoadedDocument.pageCount; k++) {
            if (page === this.formFieldLoadedDocument.getPage(k)) {
                break;
            }
            pageNumber++;
        }
        if (!isNullOrUndefined(stampObjects) && stampObjects !== '') {
            var left = this.convertPixelToPoint(boundsObjects['x']);
            var top_6 = this.convertPixelToPoint(boundsObjects['y']);
            var width = this.convertPixelToPoint(boundsObjects['width']);
            var height = this.convertPixelToPoint(boundsObjects['height']);
            var annotation = new PdfFreeTextAnnotation(left, top_6, width, height);
            annotation.setAppearance(true);
            annotation._dictionary.set('T', currentFieldName);
            var fontSize = fontSizes > 0 ? fontSizes : height / 2;
            var fontFamilyEnum = PdfFontFamily.helvetica;
            if (!isNullOrUndefined(fontName)) {
                var family = fontName;
                if (family.includes('Times New Roman')) {
                    fontFamilyEnum = PdfFontFamily.timesRoman;
                }
                else if (family.includes('Courier')) {
                    fontFamilyEnum = PdfFontFamily.courier;
                }
                else if (family.includes('Symbol')) {
                    fontFamilyEnum = PdfFontFamily.symbol;
                }
                else if (family.includes('ZapfDingbats')) {
                    fontFamilyEnum = PdfFontFamily.zapfDingbats;
                }
            }
            var fontStyle = this.getFontStyle();
            annotation.font = new PdfStandardFont(fontFamilyEnum, this.convertPixelToPoint(fontSize), fontStyle);
            annotation.text = stampObjects;
            annotation.rotationAngle = this.getRotateAngle(page.rotation);
            annotation.flags = PdfAnnotationFlag.print;
            annotation.setValues('AnnotationType', 'Signature');
            annotation.setAppearance(true);
            page.annotations.add(annotation);
        }
    };
    FormFieldsBase.prototype.drawFieldImage = function (resultObjects, signatureFields, currentFieldName, signatureBounds) {
        var stampObjects = JSON.parse(resultObjects);
        var boundsObjects = JSON.parse(signatureBounds);
        var page = signatureFields.page;
        var pageNumber = 0;
        for (var k = 0; k < this.formFieldLoadedDocument.pageCount; k++) {
            if (page === this.formFieldLoadedDocument.getPage(k)) {
                break;
            }
            pageNumber++;
        }
        if (!isNullOrUndefined(stampObjects) && stampObjects !== '') {
            var imageUrl = (stampObjects.toString()).split(',')[1];
            var left = this.convertPixelToPoint(boundsObjects['x']);
            var top_7 = this.convertPixelToPoint(boundsObjects['y']);
            var width = this.convertPixelToPoint(boundsObjects['width']);
            var height = this.convertPixelToPoint(boundsObjects['height']);
            var rubberStampAnnotation = new PdfRubberStampAnnotation(left, top_7, width, height);
            var bitmap = new PdfBitmap(imageUrl);
            rubberStampAnnotation.appearance.normal.graphics.drawImage(bitmap, 0, 0, width, height);
            rubberStampAnnotation.rotationAngle = this.getRotateAngle(page.rotation);
            rubberStampAnnotation._dictionary.set('T', currentFieldName);
            rubberStampAnnotation.flags = PdfAnnotationFlag.print;
            rubberStampAnnotation.setAppearance(true);
            page.annotations.add(rubberStampAnnotation);
        }
    };
    FormFieldsBase.prototype.drawFieldPath = function (resultObjects, signatureFields, currentFieldName, signatureBounds) {
        var stampObjects = JSON.parse(resultObjects);
        var boundsObjects = JSON.parse(signatureBounds);
        var page = signatureFields.page;
        var pageNumber = 0;
        for (var k = 0; k < this.formFieldLoadedDocument.pageCount; k++) {
            if (page === this.formFieldLoadedDocument.getPage(k)) {
                break;
            }
            pageNumber++;
        }
        if (stampObjects.length > 0) {
            var rotationAngle = this.GetRotateAngle(page.rotation);
            var left = this.convertPixelToPoint(boundsObjects['x']);
            var top_8 = this.convertPixelToPoint(boundsObjects['y']);
            var width = this.convertPixelToPoint(boundsObjects['width']);
            var height = this.convertPixelToPoint(boundsObjects['height']);
            if (rotationAngle !== 0) {
                left = this.convertPixelToPoint(signatureFields.bounds.x);
                top_8 = this.convertPixelToPoint(signatureFields.bounds.y);
                width = this.convertPixelToPoint(signatureFields.bounds.width);
                height = this.convertPixelToPoint(signatureFields.bounds.height);
            }
            var minimumX = -1;
            var minimumY = -1;
            var maximumX = -1;
            var maximumY = -1;
            for (var p = 0; p < stampObjects.length; p++) {
                var value = stampObjects[parseInt(p.toString(), 10)];
                if (minimumX === -1) {
                    minimumX = value.x;
                    minimumY = value.y;
                    maximumX = value.x;
                    maximumY = value.y;
                }
                else {
                    var point1 = value.x;
                    var point2 = value.y;
                    if (minimumX >= point1) {
                        minimumX = point1;
                    }
                    if (minimumY >= point2) {
                        minimumY = point2;
                    }
                    if (maximumX <= point1) {
                        maximumX = point1;
                    }
                    if (maximumY <= point2) {
                        maximumY = point2;
                    }
                }
            }
            var newDifferenceX = (maximumX - minimumX) / width;
            var newDifferenceY = (maximumY - minimumY) / height;
            var linePoints = [];
            var isNewValues = 0;
            if (rotationAngle !== 0) {
                for (var j = 0; j < stampObjects.length; j++) {
                    var value = stampObjects[parseInt(j.toString(), 10)];
                    var path = value.command.toString();
                    if (path === 'M' && j !== 0) {
                        isNewValues = j;
                        break;
                    }
                    linePoints.push(parseFloat(value.x));
                    linePoints.push(parseFloat(value.y));
                }
                linePoints = [];
                for (var z = 0; z < stampObjects.length; z++) {
                    var value = stampObjects[parseInt(z.toString(), 10)];
                    linePoints.push(((parseFloat(value.x) - minimumX) / newDifferenceX) + left);
                    linePoints.push(this.formFieldLoadedDocument.getPage(pageNumber).size[1] - ((parseFloat(value.y) - minimumY) /
                        newDifferenceY) - top_8);
                }
            }
            else {
                for (var k = 0; k < stampObjects.length; k++) {
                    var value = stampObjects[parseInt(k.toString(), 10)];
                    var path = value.command.toString();
                    if (path === 'M' && k !== 0) {
                        isNewValues = k;
                        break;
                    }
                    linePoints.push(((parseFloat(value.x) - minimumX) / newDifferenceX) + left);
                    var newX = ((parseFloat(value.y) - minimumY) / newDifferenceY);
                    linePoints.push(this.formFieldLoadedDocument.getPage(pageNumber).size[1] - newX - top_8);
                }
            }
            var inkAnnotation = new PdfInkAnnotation([left, top_8, width, height], linePoints);
            inkAnnotation.flags = PdfAnnotationFlag.print;
            var bounds = { x: inkAnnotation.bounds.x, y: (page.size[1] -
                    (inkAnnotation.bounds.y + inkAnnotation.bounds.height)), width: inkAnnotation.bounds.width,
                height: inkAnnotation.bounds.height };
            inkAnnotation.bounds = bounds;
            inkAnnotation.border.width = 0;
            linePoints = [];
            if (rotationAngle !== 0) {
                var pathCollection = [];
                for (var t = isNewValues; t < stampObjects.length; t++) {
                    var value = stampObjects[parseInt(t.toString(), 10)];
                    var path = value.command.toString();
                    if (path === 'M' && t !== isNewValues) {
                        pathCollection.push(linePoints);
                        linePoints = [];
                    }
                    linePoints.push(parseFloat(value.x));
                    linePoints.push(parseFloat(value.y));
                }
                if (linePoints.length > 0) {
                    pathCollection.push(linePoints);
                }
                for (var w = 0; w < pathCollection.length; w++) {
                    var pointsCollections = pathCollection[parseInt(w.toString(), 10)];
                    linePoints = [];
                    if (pointsCollections.length > 0) {
                        for (var z = 0; z < stampObjects.length; z++) {
                            var value = stampObjects[parseInt(z.toString(), 10)];
                            linePoints.push(((parseFloat(value.x) - minimumX) / newDifferenceX) + left);
                            linePoints.push(this.formFieldLoadedDocument.getPage(pageNumber).size[1] -
                                ((parseFloat(value.y) - minimumY) / newDifferenceY) - top_8);
                        }
                        inkAnnotation.inkPointsCollection.push(linePoints);
                    }
                    linePoints = [];
                }
            }
            else {
                for (var r = 0; r < stampObjects.length; r++) {
                    var value = stampObjects[parseInt(r.toString(), 10)];
                    var path = value.command.toString();
                    if (path === 'M' && r !== 0) {
                        inkAnnotation.inkPointsCollection.push(linePoints);
                        linePoints = [];
                    }
                    linePoints.push(((parseFloat(value.x) - minimumX) / newDifferenceX) + left);
                    var newX = ((parseFloat(value.y) - minimumY) / newDifferenceY);
                    linePoints.push(this.formFieldLoadedDocument.getPage(pageNumber).size[1] - newX - top_8);
                }
                if (linePoints.length > 0) {
                    inkAnnotation.inkPointsCollection.push(linePoints);
                }
            }
            inkAnnotation._dictionary.set('T', currentFieldName);
            inkAnnotation.setAppearance(true);
            this.formFieldLoadedDocument.getPage(pageNumber).annotations.add(inkAnnotation);
        }
    };
    FormFieldsBase.prototype.addSigntureFieldItems = function (field) {
        if (field instanceof PdfSignatureField) {
            var signatureField = field;
            if (signatureField.itemsCount > 0) {
                for (var i = 0; i < signatureField.itemsCount; i++) {
                    if (!isNullOrUndefined(signatureField.itemAt(i).page)) {
                        var item = signatureField.itemAt(i).page;
                        var j = 0;
                        for (var k = 0; k < this.formFieldLoadedDocument.pageCount; k++) {
                            if (item === this.formFieldLoadedDocument.getPage(j)) {
                                break;
                            }
                            j++;
                        }
                        this.addSignatureField(signatureField, j, signatureField.itemAt(i).bounds);
                    }
                }
            }
        }
    };
    FormFieldsBase.prototype.addSignatureField = function (signatureField, index, bounds) {
        var formFields = new PdfRenderedFields();
        formFields.Name = 'SignatureField';
        formFields.ToolTip = signatureField.toolTip;
        formFields.FieldName = signatureField.name;
        formFields.ActualFieldName = signatureField.name;
        if (!bounds.IsEmpty) {
            formFields.LineBounds = { X: bounds.x, Y: bounds.y, Width: bounds.width, Height: bounds.height };
        }
        else {
            formFields.LineBounds = { X: signatureField.bounds.x, Y: signatureField.bounds.y,
                Width: signatureField.bounds.width, Height: signatureField.bounds.height };
        }
        formFields.PageIndex = index;
        formFields.TabIndex = signatureField.tabIndex;
        formFields.BorderWidth = signatureField.border.width;
        formFields.BorderStyle = signatureField.border.style;
        formFields.IsReadonly = signatureField.readOnly;
        formFields.IsRequired = signatureField.required;
        formFields.Visible = signatureField.visibility;
        if (!isNullOrUndefined(signatureField.backColor)) {
            formFields.BackColor = { R: signatureField.backColor[0], G: signatureField.backColor[1], B: signatureField.backColor[2] };
        }
        else if (formFields.IsReadonly) {
            formFields.IsTransparent = true;
        }
        formFields.IsSignatureField = true;
        formFields.Rotation = signatureField.rotationAngle;
        formFields.RotationAngle = this.GetRotateAngle(signatureField.page.rotation);
        var initialField = signatureField._dictionary.get('InitialField');
        if (!isNullOrUndefined(initialField)) {
            formFields.IsInitialField = initialField;
        }
        if (signatureField._dictionary.has('CustomData')) {
            formFields.CustomData = JSON.parse(signatureField._dictionary.get('CustomData'));
        }
        this.PdfRenderedFormFields.push(formFields);
    };
    FormFieldsBase.prototype.retrieveInkAnnotation = function (loadedDocument) {
        var count = 1;
        for (var i = 0; i < loadedDocument.pageCount; i++) {
            var loadedPage = loadedDocument.getPage(i);
            var oldPageAnnotations = loadedPage.annotations;
            var totalAnnotation = parseInt(oldPageAnnotations.count.toString(), 10);
            for (var j = 0; j < totalAnnotation; j++) {
                var annotation = oldPageAnnotations.at(j);
                if (annotation instanceof PdfInkAnnotation) {
                    var outputstring = '';
                    var inkAnnot = annotation;
                    var inkListX = [];
                    var inkListY = [];
                    if (inkAnnot._dictionary.has('T') && !inkAnnot._dictionary.has('NM')) {
                        if (!isNullOrUndefined(inkAnnot.inkPointsCollection)) {
                            for (var m = 0; m < inkAnnot.inkPointsCollection.length; m++) {
                                var inkList = inkAnnot.inkPointsCollection[parseInt(m.toString(), 10)];
                                for (var k = 0; k < inkList.length; k += 2) {
                                    var x = void 0;
                                    var y = void 0;
                                    if (loadedPage.rotation === PdfRotationAngle.angle90) {
                                        x = inkList[k + 1];
                                        y = inkList[parseInt(k.toString(), 10)];
                                    }
                                    else if (loadedPage.rotation === PdfRotationAngle.angle180) {
                                        x = loadedPage.size[0] - inkList[k + 1];
                                        y = inkList[k + 1];
                                    }
                                    else if (loadedPage.rotation === PdfRotationAngle.angle270) {
                                        x = loadedPage.size[0] - inkList[k + 1];
                                        y = loadedPage.size[1] - inkList[parseInt(k.toString(), 10)];
                                    }
                                    else {
                                        x = inkList[parseInt(k.toString(), 10)];
                                        y = loadedPage.size[1] - inkList[k + 1];
                                    }
                                    if (k === 0) {
                                        outputstring += 'M' + x + ',' + y + ' ';
                                    }
                                    else {
                                        outputstring += 'L' + x + ',' + y + ' ';
                                    }
                                    inkListX.push(x);
                                    inkListY.push(y);
                                }
                            }
                        }
                        var formFields = new PdfRenderedFields();
                        if (inkAnnot._dictionary.has('T')) {
                            formFields.FieldName = inkAnnot._dictionary.get('T');
                        }
                        formFields.FieldName = formFields.FieldName + '_' + count;
                        formFields.Name = 'ink';
                        var rotationAngle = loadedPage.rotation;
                        var isFieldRotated = false;
                        if (annotation.rotationAngle !== 0) {
                            isFieldRotated = true;
                        }
                        var bounds = { X: inkAnnot.bounds.x, Y: inkAnnot.bounds.y, Width: inkAnnot.bounds.width,
                            Height: inkAnnot.bounds.height };
                        formFields.LineBounds = this.getBounds(bounds, loadedPage.size[1], loadedPage.size[0], rotationAngle, !isFieldRotated);
                        formFields.Value = outputstring;
                        formFields.PageIndex = i;
                        formFields.BorderColor = [inkAnnot.color[0], inkAnnot.color[1], inkAnnot.color[2]];
                        formFields.Rotation = annotation.rotationAngle;
                        this.PdfRenderedFormFields.push(formFields);
                        count++;
                    }
                }
                else if (annotation instanceof PdfFreeTextAnnotation) {
                    var inkAnnot = annotation;
                    if (inkAnnot._dictionary.has('T') && !inkAnnot._dictionary.has('NM') && !inkAnnot._dictionary.has('M')) {
                        var formFields = new PdfRenderedFields();
                        formFields.FieldName = inkAnnot._dictionary.get('T') + '_' + count;
                        var bounds = { X: inkAnnot.bounds.x, Y: inkAnnot.bounds.y, Width: inkAnnot.bounds.width,
                            Height: inkAnnot.bounds.height };
                        formFields.LineBounds = bounds;
                        formFields.Name = 'SignatureText';
                        formFields.FontFamily = this.getFontFamilyString(inkAnnot.font._fontFamily);
                        formFields.FontSize = this.convertPointtoPixel(inkAnnot.font.size);
                        formFields.Value = inkAnnot.text;
                        formFields.PageIndex = i;
                        formFields.BorderColor = inkAnnot.borderColor;
                        this.PdfRenderedFormFields.push(formFields);
                        count++;
                    }
                }
                else if (annotation instanceof PdfRubberStampAnnotation) {
                    var stampAnnotation = annotation;
                    var pdfRenderedFormFields = [];
                    for (var _i = 0, _a = this.PdfRenderedFormFields; _i < _a.length; _i++) {
                        var formfield = _a[_i];
                        if (formfield.ActualFieldName === stampAnnotation._dictionary._map.T) {
                            pdfRenderedFormFields.push(formfield);
                            break;
                        }
                    }
                    if (stampAnnotation._dictionary.has('T') && !stampAnnotation._dictionary.has('NM') && !stampAnnotation._dictionary.has('M')
                        && pdfRenderedFormFields.length > 0 && this.pdfViewerBase.isSignatureWithInRect(this.pdfViewerBase.canvasRectArray(pdfRenderedFormFields[0].LineBounds), this.pdfViewerBase.canvasRectArray(stampAnnotation.bounds))) {
                        var formFields = new PdfRenderedFields();
                        formFields.FieldName = stampAnnotation._dictionary.get('T') + '_' + count;
                        var dictionary = annotation._dictionary.get('AP');
                        var pageRender = new PageRenderer(this.pdfViewer, this.pdfViewerBase);
                        formFields.LineBounds = {
                            X: stampAnnotation.bounds.x, Y: stampAnnotation.bounds.y,
                            Width: stampAnnotation.bounds.width, Height: stampAnnotation.bounds.height
                        };
                        formFields.Name = 'SignatureImage';
                        formFields.PageIndex = i;
                        count++;
                        if (isNullOrUndefined(dictionary)) {
                            var pdfReference = annotation._dictionary.get('AP');
                            if (!isNullOrUndefined(pdfReference) && !isNullOrUndefined(pdfReference.dictionary) && pdfReference.dictionary.has('N')) {
                                var apDictionary = pdfReference.dictionary;
                                if (!isNullOrUndefined(apDictionary)) {
                                    pageRender.findStampImage(annotation);
                                }
                            }
                        }
                        else if (dictionary.has('N')) {
                            var template = annotation.createTemplate();
                            if (template.size[0] === 0 || template.size[1] === 0 || isNullOrUndefined(template._appearance)) {
                                pageRender.findStampImage(annotation);
                            }
                            else {
                                formFields.PageIndex = i;
                                pageRender.findStampTemplate(annotation, formFields, formFields.Rotation, pageRender.annotationOrder.length - 1, true, formFields.FieldName, this.PdfRenderedFormFields, formFields.PageIndex);
                            }
                        }
                    }
                }
            }
        }
    };
    FormFieldsBase.prototype.getFontFamilyString = function (fontFamily) {
        switch (fontFamily) {
            case PdfFontFamily.helvetica:
                return 'Helvetica';
            case PdfFontFamily.timesRoman:
                return 'Times New Roman';
            case PdfFontFamily.courier:
                return 'Courier';
            case PdfFontFamily.symbol:
                return 'Symbol';
            case PdfFontFamily.zapfDingbats:
                return 'ZapfDingbats';
            default:
                return 'Helvetica';
        }
    };
    return FormFieldsBase;
}());
export { FormFieldsBase };
/**
 * @private
 */
var PdfRenderedFields = /** @class */ (function () {
    function PdfRenderedFields() {
        this.ActualFieldName = null;
        this.FontColor = { R: 0, G: 0, B: 0 };
        this.BackColor = { R: 0, G: 0, B: 0 };
        this.BorderColor = { R: 0, G: 0, B: 0 };
        this.CheckBoxGroupName = null;
        this.Alignment = 0;
        this.BorderStyle = 0;
        this.BorderWidth = 0;
        this.CheckBoxGroupName = null;
        this.CheckBoxIndex = null;
        this.ComboBoxList = [];
        this.FieldName = null;
        this.Font = null;
        this.FontFamily = null;
        this.FontSize = 0;
        this.FontStyle = 0;
        this.GroupName = null;
        this.InsertSpaces = false;
        this.IsAutoSize = false;
        this.IsInitialField = false;
        this.IsReadonly = false;
        this.IsRequired = false;
        this.IsSignatureField = false;
        this.IsTransparent = false;
        this.MaxLength = 0;
        this.MultiSelect = false;
        this.Multiline = false;
        this.Name = null;
        this.PageIndex = 0;
        this.Rotation = 0;
        this.RotationAngle = 0;
        this.Selected = false;
        this.SelectedList = [];
        this.SelectedValue = null;
        this.TabIndex = 0;
        this.Text = null;
        this.TextList = [];
        this.ToolTip = null;
        this.Value = null;
        this.Visible = 0;
        this.CustomData = null;
    }
    return PdfRenderedFields;
}());
export { PdfRenderedFields };
