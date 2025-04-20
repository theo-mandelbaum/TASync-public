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
import { PdfViewerBase } from '../index';
import { Browser, isBlazor, isNullOrUndefined, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { splitArrayCollection, processPathData, cornersPointsBeforeRotation, getPathString } from '@syncfusion/ej2-drawings';
import { Tooltip } from '@syncfusion/ej2-popups';
/**
 * The `FormFields` module is to render formfields in the PDF document.
 *
 * @hidden
 */
var FormFields = /** @class */ (function () {
    /**
     * @param {PdfViewer} viewer - It describes about the viewer
     * @param {PdfViewerBase} base - It describes about the base
     * @private
     * @returns {void}
     */
    function FormFields(viewer, base) {
        this.maintainTabIndex = {};
        this.maintanMinTabindex = {};
        this.isSignatureField = false;
        /**
         * @private
         */
        this.paddingDifferenceValue = 10;
        this.indicatorPaddingValue = 4;
        this.isKeyDownCheck = false;
        /**
         * @private
         */
        this.signatureFontSizeConstent = 1.35;
        /**
         * @private
         */
        this.readOnlyCollection = [];
        this.isSignatureRendered = false;
        /**
         * @private
         */
        this.signatureFieldCollection = [];
        this.selectedIndex = [];
        /**
         * @private
         */
        this.renderedPageList = [];
        this.pdfViewer = viewer;
        this.pdfViewerBase = base;
    }
    /**
     * @param {number} pageIndex - It describes about the page index
     * @param {boolean} isImportFormField - It describes about the isImportFormField
     * @private
     * @returns {void}
     */
    FormFields.prototype.renderFormFields = function (pageIndex, isImportFormField) {
        this.maxTabIndex = 0;
        this.minTabIndex = -1;
        if (this.renderedPageList.indexOf(pageIndex) !== -1 && !isImportFormField) {
            this.data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
            if (!this.data || this.data === '[]') {
                this.data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
            }
        }
        else {
            this.data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        }
        if (this.data) {
            this.formFieldsData = JSON.parse(this.data);
            if (this.formFieldsData[0] === '[') {
                this.formFieldsData = JSON.parse(this.formFieldsData);
            }
            var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageIndex);
            var canvasElement = document.getElementById(this.pdfViewer.element.id + '_pageCanvas_' + pageIndex);
            var count = void 0;
            if (this.formFieldsData !== null && canvasElement !== null && textLayer !== null) {
                var flag = false;
                for (var i = 0; i < this.formFieldsData.length; i++) {
                    var formField = this.formFieldsData[parseInt(i.toString(), 10)];
                    if (!flag && isNullOrUndefined(formField.ActualFieldName) && formField.PageIndex === pageIndex) {
                        count = parseInt(formField.FieldName.slice(formField.FieldName.lastIndexOf('_') + 1), 10);
                        flag = true;
                    }
                }
                if (this.renderedPageList.indexOf(pageIndex) === -1) {
                    this.renderedPageList.push(pageIndex);
                }
                var _loop_1 = function (i) {
                    var currentData = this_1.formFieldsData[parseInt(i.toString(), 10)];
                    if (currentData.FieldName !== '') {
                        if (currentData.IsInitialField) {
                            currentData.Name = 'InitialField';
                        }
                        var font = currentData['Font'];
                        if (this_1.pdfViewer.formDesigner) {
                            if (parseFloat(currentData['PageIndex']) === pageIndex) {
                                var fontFamily = void 0;
                                var fontStyle = void 0;
                                var fontSize = void 0;
                                if (!isNullOrUndefined(font) && font.Height) {
                                    fontFamily = font.Name;
                                    if (font.Italic) {
                                        fontStyle = 'Italic';
                                    }
                                    if (font.Bold) {
                                        fontStyle = 'Bold';
                                    }
                                    if (font.Strikeout) {
                                        fontStyle = 'Strikethrough';
                                    }
                                    if (font.Underline) {
                                        fontStyle = 'Underline';
                                    }
                                    fontSize = this_1.ConvertPointToPixel(font.Size);
                                }
                                var textAlignment = currentData.Alignment === 2 ? 'right' : (currentData.Alignment === 1 ? 'center' : 'left');
                                var backgroundColor = currentData['BackColor'];
                                var bounds = currentData['LineBounds'];
                                var backColor = 'rgba(' + backgroundColor.R + ',' + backgroundColor.G + ',' + backgroundColor.B + ',' + 1 + ')';
                                if (currentData.IsTransparent === true) {
                                    backColor = 'rgba(0,0,0,0)';
                                }
                                backColor = this_1.rgbaToHex(backColor);
                                // set default color if field have black color as bg.
                                if (backColor === '#000000ff') {
                                    backColor = '#daeaf7ff';
                                }
                                var fontColor = currentData['FontColor'];
                                var left = this_1.ConvertPointToPixel(bounds.X);
                                var top_1 = this_1.ConvertPointToPixel(bounds.Y);
                                var width = this_1.ConvertPointToPixel(bounds.Width);
                                var height = this_1.ConvertPointToPixel(bounds.Height);
                                var boundArray = { left: left, top: top_1, width: width, height: height };
                                var isFieldRotated = false;
                                var rotateFieldAngle = 0;
                                if (currentData['Rotation'] !== 0) {
                                    if (currentData['RotationAngle'] === -90 || currentData['RotationAngle'] === -270 || currentData['RotationAngle'] === -180) {
                                        boundArray = this_1.getBounds(boundArray, pageIndex, 0, isFieldRotated);
                                    }
                                }
                                else {
                                    isFieldRotated = true;
                                    boundArray = this_1.getBounds(boundArray, pageIndex, 0, isFieldRotated);
                                    rotateFieldAngle = this_1.getAngle(pageIndex);
                                }
                                var foreColor = 'rgba(' + fontColor.R + ',' + fontColor.G + ',' + fontColor.B + ',' + 1 + ')';
                                foreColor = this_1.rgbaToHex(foreColor);
                                var borderColor = currentData['BorderColor'];
                                var borderRGB = void 0;
                                if (currentData.IsTansparentBorderColor) {
                                    borderRGB = 'rgba(' + borderColor.R + ',' + borderColor.G + ',' + borderColor.B + ',' + 0 + ')';
                                }
                                else {
                                    borderRGB = 'rgba(' + borderColor.R + ',' + borderColor.G + ',' + borderColor.B + ',' + 1 + ')';
                                }
                                borderRGB = this_1.rgbaToHex(borderRGB);
                                var borderWidth = currentData['BorderWidth'];
                                this_1.selectedIndex = [];
                                var elementValue = '';
                                if (currentData.Name === 'RadioButton' || currentData.Name === 'CheckBox') {
                                    elementValue = currentData['Text'] ? currentData['Text'] : currentData['Value'];
                                }
                                else {
                                    elementValue = currentData['Text'];
                                }
                                var indicatorSettings = (currentData['Name'] === 'SignatureField') ? this_1.pdfViewer.signatureFieldSettings.signatureIndicatorSettings : this_1.pdfViewer.initialFieldSettings.initialIndicatorSettings;
                                var fieldProperties = {
                                    bounds: { X: boundArray.left, Y: boundArray.top, Width: boundArray.width,
                                        Height: boundArray.height }, pageNumber: parseFloat(currentData['PageIndex']) + 1,
                                    name: currentData['ActualFieldName'] ? currentData['ActualFieldName'] : currentData['FieldName'],
                                    tooltip: currentData['ToolTip'], value: elementValue, insertSpaces: currentData['InsertSpaces'],
                                    isChecked: currentData['Selected'], isSelected: currentData['Selected'], fontFamily: fontFamily,
                                    fontStyle: fontStyle, backgroundColor: backColor, color: foreColor, borderColor: borderRGB,
                                    thickness: borderWidth, fontSize: fontSize, isMultiline: currentData.Multiline,
                                    rotateAngle: rotateFieldAngle, isReadOnly: currentData['IsReadonly'],
                                    isRequired: currentData['IsRequired'], alignment: textAlignment,
                                    options: this_1.getListValues(currentData), selectedIndex: this_1.selectedIndex,
                                    maxLength: currentData.MaxLength, visibility: currentData.Visible === 1 ? 'hidden' : 'visible',
                                    font: { isItalic: !isNullOrUndefined(font) ? font.Italic : false, isBold: !isNullOrUndefined(font) ?
                                            font.Bold : false, isStrikeout: !isNullOrUndefined(font) ? font.Strikeout : false,
                                        isUnderline: !isNullOrUndefined(font) ? font.Underline : false },
                                    isTransparent: currentData.IsTransparent,
                                    customData: !isNullOrUndefined(currentData['CustomData']) ? typeof currentData['CustomData'] === 'object'
                                        ? currentData['CustomData'] : currentData['CustomData'].trim() !== ''
                                        ? JSON.parse(currentData['CustomData']) : '' : '',
                                    signatureIndicatorSettings: indicatorSettings
                                };
                                if (!currentData.id && this_1.pdfViewer.formFieldCollections[parseInt(i.toString(), 10)] && !isNullOrUndefined(currentData['ActualFieldName'])) {
                                    fieldProperties.id = this_1.pdfViewer.formFieldCollections[parseInt(i.toString(), 10)].id;
                                }
                                if (currentData.Name === 'DropDown' || currentData.Name === 'ListBox') {
                                    fieldProperties.value = currentData['SelectedValue'];
                                }
                                var fieldType = this_1.getFormFieldType(currentData);
                                if (currentData.Name !== 'SignatureText' || currentData.Name !== 'SignatureImage') {
                                    if (!isNullOrUndefined(this_1.getFormFieldType(currentData))) {
                                        if (currentData.IsRequired) {
                                            var thickness = fieldProperties.thickness;
                                            thickness = thickness > 0 ? thickness : 1;
                                            fieldProperties.thickness = thickness;
                                        }
                                        var addedElement1 = this_1.pdfViewer.formDesignerModule.
                                            addField(fieldType, fieldProperties, false, fieldProperties.id);
                                        if (addedElement1 && addedElement1.parentElement) {
                                            currentData.id = addedElement1.parentElement.id.split('_')[0];
                                        }
                                        if (addedElement1 && addedElement1.style.visibility === 'hidden') {
                                            addedElement1.childNodes[0].disabled = true;
                                        }
                                    }
                                }
                                if (fieldType === 'SignatureField' || fieldType === 'InitialField') {
                                    this_1.addSignaturePath(currentData, count);
                                    if (!isNullOrUndefined(currentData.Value) && currentData.Value !== '') {
                                        this_1.renderExistingAnnnot(currentData, parseFloat(currentData['PageIndex']) + 1, null, isFieldRotated);
                                        this_1.isSignatureRendered = true;
                                        count++;
                                    }
                                }
                                if (currentData.ActualFieldName == null && !isNullOrUndefined(currentData.FieldName) && this_1.formFieldsData.filter(function (item) { return !isNullOrUndefined(item.FieldName) && item.FieldName.includes(currentData.FieldName.replace(/_\d$/, '')); }).filter(function (value) { return value.Name !== 'ink'; }).length === 0) {
                                    this_1.renderExistingAnnnot(currentData, parseFloat(currentData['PageIndex']) + 1, null, isFieldRotated);
                                    this_1.pdfViewerBase.signatureModule.storeSignatureData(pageIndex, currentData);
                                    this_1.isSignatureRendered = true;
                                    count++;
                                }
                                this_1.pdfViewerBase.isLoadedFormFieldAdded = true;
                            }
                        }
                        else {
                            if (parseFloat(currentData['PageIndex']) === pageIndex) {
                                var field = this_1.createFormFields(currentData, pageIndex, i, null, count);
                                var inputField = field.currentField;
                                var signCount = field.count;
                                var isFieldRotated = false;
                                if (currentData.ActualFieldName === null && !isNullOrUndefined(currentData.FieldName) && this_1.formFieldsData.filter(function (item) { return !isNullOrUndefined(item.FieldName) && item.FieldName.includes(currentData.FieldName.replace(/_\d$/, '')); }).filter(function (value) { return value.Name !== 'ink'; }).length === 0) {
                                    this_1.renderExistingAnnnot(currentData, parseFloat(currentData['PageIndex']) + 1, null, isFieldRotated);
                                    this_1.pdfViewerBase.signatureModule.storeSignatureData(pageIndex, currentData);
                                    this_1.isSignatureRendered = true;
                                    count++;
                                }
                                if (inputField) {
                                    var divElement = this_1.createParentElement(currentData, pageIndex);
                                    var bounds = currentData['LineBounds'];
                                    var font_1 = currentData['Font'];
                                    var rotateAngle = 0;
                                    if (currentData['Rotation'] === 0) {
                                        isFieldRotated = true;
                                        rotateAngle = this_1.getAngle(pageIndex);
                                        if (divElement) {
                                            divElement.style.transform = 'rotate(' + rotateAngle + 'deg)';
                                        }
                                        else {
                                            inputField.style.transform = 'rotate(' + rotateAngle + 'deg)';
                                        }
                                    }
                                    else {
                                        if (divElement) {
                                            divElement.style.transform = 'rotate(' + rotateAngle + 'deg)';
                                        }
                                        else {
                                            inputField.style.transform = 'rotate(' + rotateAngle + 'deg)';
                                        }
                                    }
                                    this_1.applyPosition(inputField, bounds, font_1, pageIndex, 0, isFieldRotated);
                                    inputField.InsertSpaces = currentData.InsertSpaces;
                                    if (inputField.InsertSpaces) {
                                        var zoomFactor = this_1.pdfViewerBase.getZoomFactor();
                                        var font_2 = ((parseInt(inputField.style.width, 10) / inputField.maxLength)
                                            - (parseFloat(inputField.style.fontSize) / 2)) - (0.6 * zoomFactor);
                                        inputField.style.letterSpacing = '' + font_2 + 'px';
                                        inputField.style.fontFamily = 'monospace';
                                        inputField.style.paddingLeft = (font_2 / 2) + 'px';
                                    }
                                    currentData['uniqueID'] = this_1.pdfViewer.element.id + 'input_' + pageIndex + '_' + i;
                                    for (var j = 0; j < this_1.pdfViewer.formFieldCollections.length; j++) {
                                        if ((inputField.type === 'text' || inputField.type === 'password' || inputField.type === 'textarea') && currentData.Name !== 'SignatureField') {
                                            if (currentData['uniqueID'] === this_1.pdfViewer.formFieldCollections[parseInt(j.toString(), 10)].id) {
                                                this_1.pdfViewer.formFieldCollections[parseInt(j.toString(), 10)].value = currentData['Text'];
                                            }
                                        }
                                    }
                                    if (isNullOrUndefined(currentData.Value)) {
                                        currentData.Value = currentData['Text'];
                                    }
                                    if (currentData.ToolTip) {
                                        this_1.setToolTip(currentData.ToolTip, inputField);
                                    }
                                    this_1.applyCommonProperties(inputField, pageIndex, i, currentData, isFieldRotated);
                                    this_1.checkIsReadonly(currentData, inputField);
                                    this_1.applyTabIndex(currentData, inputField, pageIndex);
                                    this_1.checkIsRequiredField(currentData, inputField);
                                    this_1.applyDefaultColor(inputField);
                                    this_1.updateFormFieldsCollection(currentData);
                                    if (divElement) {
                                        divElement.appendChild(inputField);
                                        textLayer.appendChild(divElement);
                                    }
                                    else {
                                        inputField.style.position = 'absolute';
                                        textLayer.appendChild(inputField);
                                    }
                                    inputField.addEventListener('focus', this_1.focusFormFields.bind(this_1));
                                    inputField.addEventListener('blur', this_1.blurFormFields.bind(this_1));
                                    inputField.addEventListener('click', this_1.updateFormFields.bind(this_1));
                                    inputField.addEventListener('change', this_1.changeFormFields.bind(this_1));
                                    inputField.addEventListener('keydown', this_1.updateFormFieldsValue.bind(this_1));
                                    inputField.addEventListener('keyup', this_1.updateSameFieldsValue.bind(this_1));
                                    count = signCount;
                                }
                            }
                        }
                    }
                };
                var this_1 = this;
                for (var i = 0; i < this.formFieldsData.length; i++) {
                    _loop_1(i);
                }
                if (!this.pdfViewer.formDesigner) {
                    PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_formfields');
                    this.pdfViewerBase.setItemInSessionStorage(this.formFieldsData, '_formfields');
                }
            }
        }
        if (this.pdfViewerBase.isFocusField && this.pdfViewerBase.focusField) {
            var currentField = document.getElementById(this.pdfViewerBase.focusField.id);
            if (currentField) {
                if ((this.pdfViewerBase.focusField.type === 'SignatureField' || this.pdfViewerBase.focusField.type === 'InitialField') && this.pdfViewer.formDesignerModule) {
                    var y = this.pdfViewerBase.focusField.bounds.y;
                    var height = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].height;
                    this.pdfViewer.bookmark.goToBookmark(this.pdfViewerBase.focusField.pageIndex, height - y);
                }
                else {
                    currentField.focus();
                }
                this.pdfViewerBase.isFocusField = false;
                this.pdfViewerBase.focusField = [];
            }
        }
    };
    FormFields.prototype.setToolTip = function (tooltipContent, targetElement) {
        //initialize tooltip component
        var tooltip = new Tooltip({
            content: initializeCSPTemplate(function () { return tooltipContent; })
        });
        // render initialized tooltip
        tooltip.appendTo(targetElement);
    };
    FormFields.prototype.trim = function (str) {
        return str.replace(/^\s+|\s+$/gm, '');
    };
    FormFields.prototype.rgbaToHex = function (rgba) {
        var inParts = rgba.substring(rgba.indexOf('(')).split(',');
        var r = parseInt(this.trim(inParts[0].substring(1)), 10);
        var g = parseInt(this.trim(inParts[1]), 10);
        var b = parseInt(this.trim(inParts[2]), 10);
        var a = parseFloat(parseFloat(this.trim(inParts[3].substring(0, inParts[3].length - 1))).toFixed(2));
        var outParts = [
            r.toString(16),
            g.toString(16),
            b.toString(16),
            Math.round(a * 255).toString(16).substring(0, 2)
        ];
        // Pad single-digit output values
        outParts.forEach(function (part, i) {
            if (part.length === 1) {
                outParts[parseInt(i.toString(), 10)] = '0' + part;
            }
        });
        return ('#' + outParts.join(''));
    };
    FormFields.prototype.getListValues = function (currentData) {
        var listItem = currentData['TextList'];
        var options = [];
        if (this.getFormFieldType(currentData) === 'DropDown') {
            listItem = currentData['ComboBoxList'];
            for (var i = 0; i < listItem.length; i++) {
                var itemValue = listItem[parseInt(i.toString(), 10)].itemValue ? listItem[parseInt(i.toString(), 10)].itemValue
                    : listItem[parseInt(i.toString(), 10)].ItemValue;
                var itemName = listItem[parseInt(i.toString(), 10)].itemName ? listItem[parseInt(i.toString(), 10)].itemName
                    : listItem[parseInt(i.toString(), 10)].ItemName;
                if (itemName === currentData['SelectedValue']) {
                    this.selectedIndex.push(i);
                }
                options.push({ itemName: itemName, itemValue: itemValue });
            }
        }
        else {
            for (var i = 0; i < listItem.length; i++) {
                if (listItem[parseInt(i.toString(), 10)] === currentData['SelectedValue']) {
                    this.selectedIndex.push(i);
                }
                options.push({ itemName: listItem[parseInt(i.toString(), 10)], itemValue: listItem[parseInt(i.toString(), 10)] });
            }
        }
        if (this.getFormFieldType(currentData) === 'ListBox') {
            this.selectedIndex = currentData['SelectedList'];
        }
        return options;
    };
    FormFields.prototype.createParentElement = function (data, pageIndex) {
        var divElement;
        if (data['Name'] === 'Textbox' || data['Name'] === 'Password') {
            divElement = document.createElement('div');
            divElement.style.background = 'white';
            if (data.InsertSpaces) {
                divElement.style.background = 'transparent';
            }
            var bounds = data['LineBounds'];
            var font = data['Font'];
            divElement.style.position = 'absolute';
            var isFieldRotated = false;
            if (data['Rotation'] === 0) {
                isFieldRotated = true;
            }
            this.applyPosition(divElement, bounds, font, pageIndex, 0, isFieldRotated);
        }
        return divElement;
    };
    /**
     * @param {number} pageIndex -  It describes about the page index
     * @private
     * @returns {number} - number
     */
    FormFields.prototype.getAngle = function (pageIndex) {
        var angle = 0;
        var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
        if (pageDetails && pageDetails.rotation) {
            switch (pageDetails.rotation) {
                case 0:
                    angle = 0;
                    break;
                case 1:
                    angle = 90;
                    break;
                case 2:
                    angle = 180;
                    break;
                case 3:
                    angle = 270;
                    break;
            }
        }
        return angle;
    };
    FormFields.prototype.nextField = function () {
        this.signatureFieldNavigate(true);
    };
    FormFields.prototype.previousField = function () {
        this.signatureFieldNavigate(false);
    };
    FormFields.prototype.signatureFieldNavigate = function (nextSign) {
        var isNextSignField = nextSign;
        var signatureFields = this.signatureFieldCollection;
        var collectionData = this.pdfViewer.formFieldCollections;
        if (signatureFields.length === 0) {
            signatureFields = this.pdfViewerBase.signatureModule.getSignField();
        }
        var currentField;
        if (this.currentTarget) {
            if (this.pdfViewer.formDesignerModule) {
                for (var i = 0; i < collectionData.length; i++) {
                    currentField = collectionData[parseInt(i.toString(), 10)];
                    if (this.currentTarget.id === currentField.id) {
                        this.currentTarget = document.getElementById(currentField.id);
                        this.getSignatureIndex(i, collectionData.length, isNextSignField);
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < signatureFields.length; i++) {
                    currentField = this.pdfViewer.formDesignerModule ? signatureFields[parseInt(i.toString(), 10)].
                        FormField : signatureFields[parseInt(i.toString(), 10)];
                    if (this.currentTarget.id === currentField.uniqueID) {
                        this.currentTarget = document.getElementById(currentField.uniqueID);
                        this.getSignatureIndex(i, signatureFields.length, isNextSignField);
                        break;
                    }
                }
            }
        }
        else {
            if (nextSign) {
                if (this.pdfViewer.formDesignerModule) {
                    currentField = signatureFields[0];
                    if (currentField.id) {
                        this.currentTarget = document.getElementById(currentField.id);
                        this.getSignatureIndex(0, signatureFields.length, isNextSignField, true);
                    }
                }
                else {
                    currentField = signatureFields[0];
                    if (currentField.uniqueID) {
                        this.currentTarget = document.getElementById(currentField.uniqueID);
                        this.getSignatureIndex(0, signatureFields.length, isNextSignField, true);
                    }
                }
            }
        }
    };
    FormFields.prototype.getSignatureIndex = function (currentSignatureIndex, signatureCount, isNextSign, isFirstNavigate) {
        var signatureIndex = currentSignatureIndex;
        if (!isFirstNavigate) {
            if (isNextSign) {
                signatureIndex++;
            }
            else {
                signatureIndex--;
            }
        }
        if (signatureCount === 1) {
            this.renderSignatureField(0);
        }
        else {
            if (signatureIndex < signatureCount && signatureIndex >= 0) {
                this.renderSignatureField(signatureIndex);
            }
            else {
                if (isNextSign) {
                    if (signatureIndex >= signatureCount) {
                        this.renderSignatureField(0);
                    }
                }
                else {
                    if (signatureIndex <= 0) {
                        this.renderSignatureField(signatureCount - 1);
                    }
                }
            }
        }
    };
    FormFields.prototype.renderSignatureField = function (currentSignIndex) {
        var curSignIndex = currentSignIndex;
        var signatureFields = this.signatureFieldCollection;
        var collectionData = this.pdfViewer.formFieldCollections;
        var currentField;
        if (curSignIndex < collectionData.length) {
            for (var i = 0; i < collectionData.length; i++) {
                if (this.pdfViewer.formDesignerModule) {
                    var curSignIndexId = collectionData[parseInt(curSignIndex.toString(), 10)].id;
                    var signatureFieldData = collectionData[parseInt(i.toString(), 10)];
                    if (curSignIndexId === signatureFieldData.id) {
                        var pageIndex = signatureFieldData.pageIndex >= 0 ? signatureFieldData.pageIndex :
                            signatureFieldData.pageNumber;
                        var isRender = this.pdfViewer.annotationModule.findRenderPageList(pageIndex);
                        if (!isRender) {
                            this.pdfViewer.navigation.goToPage(pageIndex + 1);
                            this.renderFormFields(pageIndex, false);
                        }
                        this.currentTarget = document.getElementById(signatureFieldData.id);
                        currentField = signatureFieldData;
                        break;
                    }
                }
                else {
                    var curSignIndexId = this.pdfViewer.formDesignerModule ?
                        signatureFields[parseInt(curSignIndex.toString(), 10)].FormField.uniqueID :
                        signatureFields[parseInt(curSignIndex.toString(), 10)].uniqueID;
                    var signatureFieldData = this.pdfViewer.formDesignerModule ? signatureFields[parseInt(i.toString(), 10)].
                        FormField : signatureFields[parseInt(i.toString(), 10)];
                    if (curSignIndexId === signatureFieldData.uniqueID) {
                        var pageIndex = signatureFieldData.PageIndex >= 0 ? signatureFieldData.PageIndex :
                            signatureFieldData.pageNumber;
                        var isRender = this.pdfViewer.annotationModule.findRenderPageList(pageIndex);
                        if (!isRender) {
                            this.pdfViewer.navigation.goToPage(pageIndex + 1);
                            this.renderFormFields(pageIndex, false);
                        }
                        this.currentTarget = document.getElementById(signatureFieldData.uniqueID);
                        currentField = signatureFieldData;
                        break;
                    }
                }
            }
            if (this.currentTarget === null) {
                var pageIndex = currentField.PageIndex >= 0 ? currentField.PageIndex : currentField.pageNumber;
                this.pdfViewer.navigation.goToPage(pageIndex);
                this.currentTarget = document.getElementById(currentField.uniqueID);
            }
            if (this.currentTarget) {
                if (this.currentTarget.className === 'e-pdfviewer-signatureformfields-signature' && !(this.pdfViewer.formDesignerModule)) {
                    document.getElementById(this.currentTarget.id).focus();
                    this.pdfViewer.select([this.currentTarget.id], null);
                }
                else if (this.currentTarget.className === 'e-pdfviewer-signatureformfields' || this.currentTarget.className === 'e-pdfviewer-signatureformfields-signature') {
                    if (this.pdfViewer.formDesignerModule) {
                        document.getElementById(this.currentTarget.id).parentElement.focus();
                    }
                    else {
                        document.getElementById(this.currentTarget.id).focus();
                    }
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    FormFields.prototype.formFieldCollections = function () {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        if (data) {
            var formFieldsData = JSON.parse(data);
            for (var i = 0; i < formFieldsData.length; i++) {
                var currentData = formFieldsData[parseInt(i.toString(), 10)];
                var type = currentData['Name'];
                if (this.pdfViewer.formDesignerModule) {
                    if (currentData.Name !== 'ink' && currentData.Name !== 'SignatureImage' && currentData.Name !== 'SignatureText') {
                        this.retreiveFormFieldsData(currentData, true);
                    }
                }
                else {
                    if (currentData.Name !== 'ink') {
                        var bounds = void 0;
                        if (currentData.LineBounds) {
                            if (isNullOrUndefined(currentData.Bounds)) {
                                bounds = this.updateBoundsValue(currentData.LineBounds);
                            }
                            else {
                                bounds = currentData.Bounds;
                            }
                        }
                        var formFieldCollection = {
                            name: this.retriveFieldName(currentData),
                            id: this.pdfViewer.element.id + 'input_' + parseFloat(currentData['PageIndex']) + '_' + i,
                            isReadOnly: false, type: currentData.IsInitialField ? 'InitialField' : type,
                            value: this.retriveCurrentValue(currentData), fontName: '', isRequired: currentData.IsRequired, bounds: bounds
                        };
                        this.pdfViewer.formFieldCollections.push(formFieldCollection);
                    }
                }
            }
        }
    };
    FormFields.prototype.retreiveFormFieldsData = function (currentData, isCollection) {
        var fontFamily;
        var fontStyle;
        var fontSize;
        if (currentData.FieldName !== '') {
            if (currentData.IsInitialField) {
                currentData.Name = 'InitialField';
            }
            var font = currentData['Font'];
            if (!isNullOrUndefined(font) && font.Height) {
                fontFamily = font.Name;
                if (font.Italic) {
                    fontStyle = 'Italic';
                }
                if (font.Bold) {
                    fontStyle = 'Bold';
                }
                if (font.Strikeout) {
                    fontStyle = 'Strikethrough';
                }
                if (font.Underline) {
                    fontStyle = 'Underline';
                }
                fontSize = this.ConvertPointToPixel(font.Size);
            }
            var textAlignment = currentData.Alignment === 2 ? 'right' : (currentData.Alignment === 1 ? 'center' : 'left');
            var backgroundColor = currentData['BackColor'];
            var bounds = currentData['LineBounds'];
            var backColor = 'rgba(' + backgroundColor.R + ',' + backgroundColor.G + ',' + backgroundColor.B + ',' + 1 + ')';
            backColor = this.rgbaToHex(backColor);
            // set default color if field have black color as bg.
            if (currentData.IsTransparent === true) {
                backColor = 'rgba(0,0,0,0)';
            }
            else if (backColor === '#000000ff') {
                backColor = '#daeaf7ff';
            }
            var fontColor = currentData['FontColor'];
            var left = this.ConvertPointToPixel(bounds.X);
            var top_2 = this.ConvertPointToPixel(bounds.Y);
            var width = this.ConvertPointToPixel(bounds.Width);
            var height = this.ConvertPointToPixel(bounds.Height);
            var boundArray = { left: left, top: top_2, width: width, height: height };
            var foreColor = 'rgba(' + fontColor.R + ',' + fontColor.G + ',' + fontColor.B + ',' + 1 + ')';
            foreColor = this.rgbaToHex(foreColor);
            var borderColor = currentData['BorderColor'];
            var borderRGB = 'rgba(' + borderColor.R + ',' + borderColor.G + ',' + borderColor.B + ',' + 1 + ')';
            borderRGB = this.rgbaToHex(borderRGB);
            if (currentData.IsTansparentBorderColor === true) {
                borderRGB = 'rgba(0,0,0,0)';
            }
            var borderWidth = currentData['BorderWidth'];
            this.selectedIndex = [];
            var fieldProperties = {
                bounds: { X: boundArray.left, Y: boundArray.top, Width: boundArray.width, Height: boundArray.height },
                pageNumber: parseFloat(currentData['PageIndex']) + 1, name: currentData['ActualFieldName'], tooltip: currentData['ToolTip'],
                value: currentData['Text'], isChecked: currentData['Selected'], isSelected: currentData['Selected'], fontFamily: fontFamily,
                fontStyle: fontStyle, backgroundColor: backColor, color: foreColor, borderColor: borderRGB, thickness: borderWidth,
                fontSize: fontSize, isMultiline: currentData.Multiline,
                isReadOnly: currentData['IsReadonly'], isRequired: currentData['IsRequired'], insertSpaces: currentData['InsertSpaces'],
                alignment: textAlignment, options: this.getListValues(currentData), selectedIndex: this.selectedIndex,
                maxLength: currentData.MaxLength, visibility: currentData.Visible === 1 ? 'hidden' : 'visible',
                font: { isItalic: !isNullOrUndefined(font) ? font.Italic : false, isBold: !isNullOrUndefined(font) ? font.Bold : false,
                    isStrikeout: !isNullOrUndefined(font) ? font.Strikeout : false, isUnderline: !isNullOrUndefined(font) ?
                        font.Underline : false }, pageIndex: currentData['PageIndex'], isTransparent: currentData['IsTransparent'],
                rotationAngle: currentData['RotationAngle'], signatureType: currentData['SignatureType'] ? currentData['SignatureType'] : '',
                signatureIndicatorSettings: currentData['SignatureIndicatorSettings'], zIndex: currentData['zIndex'],
                customData: !isNullOrUndefined(currentData['CustomData']) ? typeof currentData['CustomData'] === 'object'
                    ? currentData['CustomData'] : currentData['CustomData'].trim() !== ''
                    ? JSON.parse(currentData['CustomData']) : '' : ''
            };
            if (currentData.Name === 'DropDown' || currentData.Name === 'ListBox') {
                fieldProperties.value = currentData['SelectedValue'];
            }
            if (currentData.Name === 'RadioButton') {
                fieldProperties.value = currentData['Value'];
            }
            var fieldType = this.getFormFieldType(currentData);
            if (fieldType === 'SignatureField' || fieldType === 'InitialField') {
                this.addSignaturePath(currentData);
                if (this.isSignatureField) {
                    fieldProperties.value = currentData.Value;
                }
            }
            var addedElement = this.pdfViewer.formDesignerModule.addField(fieldType, fieldProperties, isCollection);
            return addedElement;
        }
        return null;
    };
    FormFields.prototype.updateBoundsValue = function (lineBounds) {
        var bounds = {
            x: this.ConvertPointToPixel(lineBounds.X), y: this.ConvertPointToPixel(lineBounds.Y),
            width: this.ConvertPointToPixel(lineBounds.Width), height: this.ConvertPointToPixel(lineBounds.Height)
        };
        return bounds;
    };
    /**
     * @param {any} formField - It describes about the form field
     * @private
     * @returns {void}
     */
    FormFields.prototype.updateFormFieldsCollection = function (formField) {
        var type = formField['Name'];
        var bounds;
        if (formField.LineBounds) {
            if (isNullOrUndefined(formField.Bounds)) {
                bounds = this.updateBoundsValue(formField.LineBounds);
            }
            else {
                bounds = formField.Bounds;
            }
        }
        var textList = (formField.Name === 'DropDown') ? formField.ComboBoxList : formField.TextList;
        var formFieldCollection = {
            name: this.retriveFieldName(formField), id: formField.uniqueID, isReadOnly: formField.IsReadonly,
            isRequired: formField.IsRequired, isSelected: formField.Selected,
            isChecked: type === 'RadioButton' ? false : formField.Selected, type: type, value: type === 'ListBox' || type === 'DropDown' ?
                formField.SelectedValue : formField.Value, fontName: formField.FontFamily ? formField.FontFamily : '',
            pageIndex: formField.PageIndex, pageNumber: formField.PageIndex + 1, isMultiline: formField.isMultiline ?
                formField.isMultiline : formField.Multiline, insertSpaces: formField.insertSpaces ?
                formField.insertSpaces : formField.InsertSpaces, isTransparent: formField.isTransparent ? formField.isTransparent :
                formField.IsTransparent, rotateAngle: formField.rotateAngle ? formField.rotateAngle : formField.RotationAngle,
            selectedIndex: formField.selectedIndex ? formField.selectedIndex : formField.SelectedList,
            options: formField.options ? formField.options : textList ? textList : [], bounds: bounds,
            signatureType: formField.signatureType ? formField.signatureType : '', zIndex: formField.zIndex, tooltip: formField.tooltip ?
                formField.tooltip : formField.ToolTip ? formField.ToolTip : '', signatureIndicatorSettings: formField.signatureIndicatorSettings ?
                formField.signatureIndicatorSettings : ''
        };
        this.pdfViewer.formFieldCollections[this.pdfViewer.formFieldCollections.
            findIndex(function (el) { return el.id === formFieldCollection.id; })] = formFieldCollection;
    };
    FormFields.prototype.updateFormFieldValues = function (formFields) {
        this.readOnlyCollection.push(formFields.id);
        if (formFields) {
            var currentElement = document.getElementById(formFields.id);
            if (currentElement) {
                if (formFields.isReadOnly) {
                    currentElement.disabled = true;
                    currentElement.style.backgroundColor = '';
                    currentElement.style.cursor = 'default';
                }
                else {
                    if (currentElement.style.backgroundColor === '') {
                        currentElement.style.backgroundColor = 'rgba(0, 20, 200, 0.2)';
                    }
                    currentElement.disabled = false;
                    currentElement.style.cursor = '';
                }
            }
            this.updateDataInSession(currentElement);
        }
    };
    /**
     * @param {any} currentData - It describes about the current data
     * @private
     * @returns {string} - string
     */
    FormFields.prototype.retriveFieldName = function (currentData) {
        var currentField;
        switch (currentData['Name']) {
            case 'Textbox':
            case 'Password':
            case 'SignatureField':
            case 'InitialField':
                currentField = currentData.FieldName;
                break;
            case 'RadioButton':
            case 'CheckBox':
                currentField = currentData.GroupName;
                break;
            case 'DropDown':
                currentField = currentData.ActualFieldName;
                break;
            case 'ListBox':
                currentField = currentData.Text;
                break;
        }
        return currentField;
    };
    FormFields.prototype.retriveCurrentValue = function (currentData) {
        var currentField;
        switch (currentData['Name']) {
            case 'Textbox':
            case 'Password':
                currentField = currentData.Text;
                break;
            case 'SignatureField':
                currentField = currentData.Value;
                break;
            case 'RadioButton':
            case 'CheckBox':
                currentField = currentData.Selected;
                break;
            case 'DropDown':
                currentField = currentData.SelectedValue;
                break;
            case 'ListBox':
                currentField = currentData.SelectedList;
                break;
        }
        return currentField;
    };
    FormFields.prototype.getSignatureBounds = function (LineBounds, bounds, pageIndex) {
        var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
        var bound = 0;
        switch (pageDetails.rotation) {
            case 0:
                bound = bounds;
                break;
            case 1:
                bound = { x: bounds.x + LineBounds.Width + (bounds.width / 3.5), y: pageDetails.width - LineBounds.X + (bounds.height / 4) };
                break;
            case 2:
                bound = { x: pageDetails.width - bounds.x - bounds.width, y: pageDetails.height - bounds.y - bounds.height };
                break;
            case 3:
                bound = { x: bounds.y - (bounds.width / 2) + bounds.height, y: bounds.x + (bounds.width / 3) };
                break;
        }
        return bound;
    };
    /**
     * @private
     * @returns {any} - any
     */
    FormFields.prototype.downloadFormFieldsData = function () {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        if (data) {
            var formFieldsData = JSON.parse(data);
            var datas = {};
            var fieldDatas = [];
            for (var m = 0; m < formFieldsData.length; m++) {
                var currentData = formFieldsData[parseInt(m.toString(), 10)];
                var isRequired = currentData.IsRequired;
                if (currentData.Name === 'Textbox' || currentData.Name === 'Password' || currentData.Multiline) {
                    if (isRequired && (currentData.Text === '' || currentData.Text === null)) {
                        this.pdfViewerBase.validateForm = true;
                        this.pdfViewerBase.nonFillableFields[currentData.FieldName] = currentData.Text;
                    }
                    else {
                        delete (this.pdfViewerBase.nonFillableFields[currentData.FieldName]);
                    }
                    fieldDatas = { fieldValue: currentData.Text, isReadOnly: currentData.IsReadonly };
                    datas[currentData.FieldName] = fieldDatas;
                }
                else if (currentData.Name === 'RadioButton' && currentData.Selected) {
                    if (isRequired && currentData.Selected === false) {
                        this.pdfViewerBase.validateForm = true;
                        this.pdfViewerBase.nonFillableFields[currentData.GroupName] = currentData.Value;
                    }
                    else {
                        delete (this.pdfViewerBase.nonFillableFields[currentData.GroupName]);
                    }
                    fieldDatas = { fieldValue: currentData.Value, isReadOnly: currentData.IsReadonly };
                    datas[currentData.GroupName] = fieldDatas;
                }
                else if (currentData.Name === 'CheckBox') {
                    if (isRequired && currentData.Selected === false) {
                        this.pdfViewerBase.validateForm = true;
                        this.pdfViewerBase.nonFillableFields[currentData.GroupName] = currentData.Selected;
                    }
                    else {
                        delete (this.pdfViewerBase.nonFillableFields[currentData.GroupName]);
                    }
                    var currentCheckBoxIndex = currentData.CheckBoxIndex ? currentData.CheckBoxIndex :
                        currentData.CheckboxIndex ? currentData.CheckboxIndex : null;
                    if (currentCheckBoxIndex && currentData.Selected) {
                        fieldDatas = { isSelected: currentCheckBoxIndex, isReadOnly: currentData.IsReadonly,
                            fieldValue: !isNullOrUndefined(currentData.Value) ? currentData.Value : '' };
                        datas[currentData.GroupName] = fieldDatas;
                    }
                    else if (datas[currentData.GroupName] === undefined || datas[currentData.GroupName] === null) {
                        fieldDatas = { isSelected: currentData.Selected, isReadOnly: currentData.IsReadonly, fieldValue: currentData.Value };
                        datas[currentData.GroupName] = fieldDatas;
                    }
                }
                else if (currentData.Name === 'DropDown') {
                    if (isRequired && currentData.SelectedValue === '') {
                        this.pdfViewerBase.validateForm = true;
                        this.pdfViewerBase.nonFillableFields[currentData.Text] = currentData.SelectedValue;
                    }
                    else {
                        delete (this.pdfViewerBase.nonFillableFields[currentData.Text]);
                    }
                    fieldDatas = { fieldValue: currentData.SelectedValue, isReadOnly: currentData.IsReadonly };
                    datas[currentData.FieldName] = fieldDatas;
                }
                else if (currentData.Name === 'ListBox') {
                    var childItems = currentData['TextList'];
                    var childItemsText = [];
                    for (var m_1 = 0; m_1 < currentData.SelectedList.length; m_1++) {
                        var currentElement = currentData.SelectedList[parseInt(m_1.toString(), 10)];
                        childItemsText.push(childItems["" + currentElement]);
                    }
                    fieldDatas = { fieldValue: JSON.stringify(childItemsText), isReadOnly: currentData.IsReadonly };
                    datas[currentData.Text] = fieldDatas;
                }
                else if (currentData.Name === 'SignatureField' || currentData.Name === 'InitialField') {
                    var csData = void 0;
                    if (isRequired && (currentData.Value === null || currentData.Value === '')) {
                        this.addSignaturePath(currentData);
                    }
                    if (currentData.Value && currentData.Value !== '') {
                        csData = currentData.Value;
                        var fontFamily = currentData.fontFamily ? currentData.fontFamily : currentData.FontFamily;
                        if (fontFamily) {
                            datas[currentData.FieldName + 'fontName'] = fontFamily;
                            datas[currentData.FieldName + 'fontSize'] = currentData.fontSize ? currentData.fontSize : currentData.FontSize;
                        }
                        else if (currentData.Value.split('base64,')[1]) {
                            datas[currentData.FieldName + 'ImageData'] = true;
                        }
                        else {
                            var collectionData = processPathData(currentData.Value);
                            csData = splitArrayCollection(collectionData);
                        }
                    }
                    if (isRequired && (currentData.Value === null || currentData.Value === '')) {
                        this.pdfViewerBase.validateForm = true;
                        this.pdfViewerBase.nonFillableFields[currentData.FieldName] = JSON.stringify(csData);
                    }
                    else {
                        delete (this.pdfViewerBase.nonFillableFields[currentData.FieldName]);
                    }
                    datas[currentData.FieldName] = JSON.stringify(csData);
                    if (currentData.Bounds) {
                        var bounds = this.getSignatureBounds(currentData.LineBounds, currentData.Bounds, currentData.PageIndex);
                        currentData.Bounds.x = bounds.x;
                        currentData.Bounds.y = bounds.y;
                        datas[currentData.FieldName + 'bounds'] = JSON.stringify(currentData.Bounds);
                    }
                    else {
                        var lineBounds = currentData.LineBounds;
                        var bounds = { x: this.ConvertPointToPixel(lineBounds.X), y: this.ConvertPointToPixel(lineBounds.Y),
                            width: this.ConvertPointToPixel(lineBounds.Width), height: this.ConvertPointToPixel(lineBounds.Height) };
                        datas[currentData.FieldName + 'bounds'] = JSON.stringify(bounds);
                    }
                    datas[currentData.FieldName + 'isReadOnly'] = currentData.IsReadonly;
                }
            }
            return (JSON.stringify(datas));
        }
    };
    FormFields.prototype.focusFormFields = function (event) {
        var currentTarget = event.target;
        if (currentTarget && (currentTarget.className !== 'e-pdfviewer-signatureformfields' && currentTarget.className !== 'e-pdfviewer-signatureformfields e-pv-signature-focus')) {
            var backgroundcolor = currentTarget.style.backgroundColor;
            var currentIndex = backgroundcolor.lastIndexOf(',');
            var currentColor = backgroundcolor.slice(0, currentIndex + 1) + 0 + ')';
            currentTarget.style.backgroundColor = currentColor;
            if (currentTarget.type === 'checkbox') {
                currentTarget.style.webkitAppearance = '';
            }
            currentTarget.style.boxShadow = '0 0 5px ' + (currentTarget.style.borderColor === 'transparent' ? '#000000' : currentTarget.style.borderColor);
        }
        else if (currentTarget) {
            if (currentTarget.className === 'e-pdfviewer-signatureformfields' || currentTarget.className === 'e-pdfviewer-signatureformfields-signature' || currentTarget.className === 'e-pdfviewer-signatureformfields e-pv-signature-focus' || currentTarget.className === 'e-pdfviewer-signatureformfields-signature  e-pv-signature-focus') {
                this.pdfViewerBase.signatureModule.setFocus(currentTarget.id);
            }
        }
    };
    FormFields.prototype.blurFormFields = function (event) {
        var currentTarget = event.target;
        if (currentTarget.InsertSpaces && this.isKeyDownCheck) {
            var font = parseInt(currentTarget.style.width, 10) - (parseInt(currentTarget.style.height, 10) / 2);
            currentTarget.style.width = '' + font + 'px';
            this.isKeyDownCheck = false;
        }
        if (currentTarget.type === 'checkbox') {
            this.pdfViewer.fireFocusOutFormField(currentTarget.name, currentTarget.checked);
        }
        else {
            this.pdfViewer.fireFocusOutFormField(currentTarget.name, currentTarget.value);
        }
        var backgroundcolor = currentTarget.style.backgroundColor;
        var currentIndex = backgroundcolor.lastIndexOf(',');
        var currentColor = backgroundcolor.slice(0, currentIndex + 1) + 0.2 + ')';
        currentTarget.style.backgroundColor = currentColor;
        currentTarget.style.boxShadow = 'none';
        if ((currentTarget.type === 'checkbox') && !currentTarget.checked) {
            currentTarget.style.webkitAppearance = 'none';
        }
        else {
            currentTarget.style.webkitAppearance = '';
        }
    };
    FormFields.prototype.updateFormFields = function (event) {
        var currentTarget = event.target;
        if (this.pdfViewerBase.isDeviceiOS && currentTarget.type === 'checkbox') {
            currentTarget.focus();
        }
        if (currentTarget.className === 'e-pdfviewer-ListBox') {
            currentTarget = currentTarget.parentElement;
            this.updateDataInSession(currentTarget);
        }
        else if (currentTarget.className === 'e-pdfviewer-signatureformfields' || currentTarget.className === 'e-pdfviewer-signatureformfields e-pv-signature-focus') {
            this.currentTarget = currentTarget;
        }
        else if (currentTarget.className === 'e-pv-buttonItem' || currentTarget.type === 'button') {
            this.pdfViewer.fireButtonFieldClickEvent(currentTarget.value, currentTarget.name, currentTarget.id);
        }
        for (var m = 0; m < this.pdfViewer.formFieldCollections.length; m++) {
            if (currentTarget.id === this.pdfViewer.formFieldCollections[parseInt(m.toString(), 10)].id) {
                if (this.pdfViewer.formDesignerModule || this.pdfViewer.annotationModule) {
                    this.pdfViewer.fireFormFieldClickEvent('formFieldClicked', this.pdfViewer.formFieldCollections[parseInt(m.toString(), 10)]);
                }
                if (currentTarget.className === 'e-pdfviewer-signatureformfields' || currentTarget.className === 'e-pdfviewer-signatureformfields-signature' || currentTarget.className === 'e-pdfviewer-signatureformfields e-pv-signature-focus' || currentTarget.className === 'e-pdfviewer-signatureformfields-signature  e-pv-signature-focus') {
                    this.pdfViewerBase.signatureModule.setFocus(currentTarget.id);
                }
            }
        }
    };
    /**
     * @param {string} signatureType - It describes about the signature type
     * @param {string} value - It describes about the value
     * @param {any} target - It describes about the target
     * @param {string} fontname - It describes about the font name
     * @param {any} signBounds - It contains a signatureBounds
     * @private
     * @returns {void}
     */
    FormFields.prototype.drawSignature = function (signatureType, value, target, fontname, signBounds) {
        var annot;
        // eslint-disable-next-line
        var proxy = this;
        var bounds;
        var targetBounds;
        var parentElementBounds;
        var data;
        if (this.pdfViewer.formDesigner) {
            data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        }
        else {
            data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        }
        var formFieldsData = JSON.parse(data);
        var targetName;
        if (this.pdfViewer.formDesignerModule) {
            targetName = this.currentTarget && this.currentTarget.offsetParent ? this.currentTarget.offsetParent.name :
                this.currentTarget ? this.currentTarget.name : target.name ? target.name : target.offsetParent.name;
        }
        else {
            targetName = this.currentTarget ? this.currentTarget.name : target.name ? target.name : target.offsetParent.name;
        }
        var _loop_2 = function (i) {
            var fieldName = this_2.pdfViewer.formDesigner ? formFieldsData[parseInt(i.toString(), 10)].
                FormField.name : formFieldsData[parseInt(i.toString(), 10)].FieldName;
            if (this_2.pdfViewer.formDesigner ? fieldName === targetName : fieldName === targetName &&
                (!isNullOrUndefined(formFieldsData[parseInt(i.toString(), 10)].ActualFieldName))) {
                target = this_2.pdfViewer.formDesigner ? document.getElementById(formFieldsData[parseInt(i.toString(), 10)].Key.split('_')[0]) : document.getElementById(formFieldsData[parseInt(i.toString(), 10)].uniqueID);
                var currentField_1 = target;
                var signatureAdd_1 = true;
                this_2.pdfViewer.annotations.filter(function (item) {
                    if (!isNullOrUndefined(currentField_1) && item.id === target.id + '_content') {
                        signatureAdd_1 = false;
                    }
                });
                if (!isNullOrUndefined(currentField_1)) {
                    var elementId = currentField_1.offsetParent.offsetParent.id.split('_')[0];
                    var signatureField_1 = this_2.pdfViewer.nameTable["" + elementId];
                    if (target && target.offsetParent && signatureField_1) {
                        targetBounds = target.getBoundingClientRect();
                        parentElementBounds = target.offsetParent.offsetParent.offsetParent.getBoundingClientRect();
                        this_2.pdfViewerBase.drawSignatureWithTool = true;
                        if (target.nextSibling && target.nextSibling.id.indexOf('initial') !== -1) {
                            this_2.pdfViewer.isInitialFieldToolbarSelection = true;
                        }
                    }
                    var currentValue_1 = value ? value : this_2.pdfViewerBase.signatureModule.outputString;
                    if (signatureType === 'Path' && !this_2.pdfViewer.drawing.isPasted) {
                        if (value && this_2.pdfViewerBase.signatureModule.outputString === '') {
                            var parsenew = JSON.parse(currentValue_1);
                            var newArray = splitArrayCollection(parsenew);
                            currentValue_1 = getPathString(newArray);
                        }
                    }
                    var currentFont = fontname ? fontname : this_2.pdfViewerBase.signatureModule.fontName;
                    var zoomvalue = this_2.pdfViewerBase.getZoomFactor();
                    var currentWidth = this_2.pdfViewerBase.drawSignatureWithTool ?
                        targetBounds.width / zoomvalue : parseFloat(currentField_1.style.width) / zoomvalue;
                    var currentHeight = this_2.pdfViewerBase.drawSignatureWithTool ?
                        targetBounds.height / zoomvalue : parseFloat(currentField_1.style.height) / zoomvalue;
                    var currentLeft = this_2.pdfViewerBase.drawSignatureWithTool ?
                        ((targetBounds.left - parentElementBounds.left)) / zoomvalue : parseFloat(currentField_1.style.left) / zoomvalue;
                    var currentTop = this_2.pdfViewerBase.drawSignatureWithTool ?
                        ((targetBounds.top - parentElementBounds.top)) / zoomvalue : parseFloat(currentField_1.style.top) / zoomvalue;
                    var currentPage_1 = this_2.pdfViewerBase.drawSignatureWithTool ? target.nextElementSibling ? parseFloat(target.nextElementSibling.id.split('_')[1]) : parseFloat(currentField_1.id.split('_')[1]) : parseFloat(currentField_1.id.split('_')[1]);
                    var currentIndex = this_2.pdfViewerBase.drawSignatureWithTool ? target.nextElementSibling ? parseFloat(target.nextElementSibling.id.split('_')[2]) : parseFloat(currentField_1.id.split('_')[2]) : parseFloat(currentField_1.id.split('_')[2]);
                    var signString_1 = this_2.pdfViewerBase.signatureModule.saveImageString;
                    var signatureFontFamily_1;
                    var signatureFontSize_1;
                    var rotateAngleString = currentField_1.offsetParent.offsetParent.style.transform ?
                        currentField_1.offsetParent.offsetParent.style.transform : currentField_1.style.transform;
                    rotateAngleString = rotateAngleString.substring(rotateAngleString.indexOf('(') + 1, rotateAngleString.indexOf('d'));
                    var rotateAngle_1 = rotateAngleString ? parseInt(rotateAngleString, 10) : 0;
                    if (signatureType === 'Type' || signatureType === 'Text') {
                        if (!currentFont) {
                            currentFont = 'Helvetica';
                        }
                        bounds = this_2.getSignBounds(currentIndex, rotateAngle_1, currentPage_1, zoomvalue, currentLeft, currentTop, currentWidth, currentHeight);
                        if (this_2.pdfViewer.signatureFitMode === 'Default') {
                            bounds = this_2.getDefaultBoundsforSign(bounds);
                        }
                        annot = {
                            id: currentField_1.id, bounds: { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height }, pageIndex: currentPage_1, data: currentValue_1, modifiedDate: '',
                            shapeAnnotationType: 'SignatureText', opacity: 1, rotateAngle: rotateAngle_1, annotName: 'SignatureText', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }, fontFamily: currentFont, fontSize: bounds.height / this_2.signatureFontSizeConstent
                        };
                        if (annot.shapeAnnotationType === 'SignatureText') {
                            var textWidth = this_2.getTextWidth(annot.data, annot.fontSize, annot.fontFamily);
                            var widthRatio = 1;
                            if (textWidth > bounds.width) {
                                widthRatio = bounds.width / textWidth;
                            }
                            annot.fontSize = this_2.getFontSize(Math.floor((annot.fontSize * widthRatio)));
                        }
                        signString_1 = annot.data;
                        signatureFontFamily_1 = annot.fontFamily;
                        signatureFontSize_1 = annot.fontSize;
                    }
                    else if (signatureType === 'Image') {
                        bounds = this_2.getSignBounds(currentIndex, rotateAngle_1, currentPage_1, zoomvalue, currentLeft, currentTop, currentWidth, currentHeight);
                        var newBounds_1 = Object.freeze(bounds);
                        var image_1 = new Image();
                        var currentTarget_1 = target;
                        image_1.src = currentValue_1;
                        image_1.onload = function () {
                            var editableBounds = Object.isFrozen(newBounds_1) ? __assign({}, newBounds_1) : newBounds_1;
                            proxy.imageOnLoad(editableBounds, image_1, currentValue_1, currentPage_1, rotateAngle_1, currentField_1, signatureField_1, signString_1, signatureFontFamily_1, signatureFontSize_1, currentTarget_1);
                        };
                    }
                    else {
                        if ((currentValue_1.indexOf('base64')) !== -1) {
                            bounds = this_2.getSignBounds(currentIndex, rotateAngle_1, currentPage_1, zoomvalue, currentLeft, currentTop, currentWidth, currentHeight);
                            if (this_2.pdfViewer.signatureFitMode === 'Default') {
                                bounds = this_2.getDefaultBoundsforSign(bounds);
                            }
                            annot = {
                                id: currentField_1.id, bounds: { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height }, pageIndex: currentPage_1, data: currentValue_1, modifiedDate: '',
                                shapeAnnotationType: 'SignatureImage', opacity: 1, rotateAngle: rotateAngle_1, annotName: 'SignatureField', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }
                            };
                            signString_1 = annot.data;
                        }
                        else {
                            if (!isNullOrUndefined(signBounds)) {
                                bounds = signBounds;
                            }
                            else if (this_2.pdfViewer.signatureFitMode === 'Default') {
                                var signatureBounds = this_2.pdfViewerBase.signatureModule.
                                    updateSignatureAspectRatio(currentValue_1, false, currentField_1);
                                bounds = this_2.getSignBounds(currentIndex, rotateAngle_1, currentPage_1, zoomvalue, currentLeft, currentTop, signatureBounds.width, signatureBounds.height, true);
                                bounds.x = bounds.x + signatureBounds.left;
                                bounds.y = bounds.y + signatureBounds.top;
                            }
                            else {
                                bounds = this_2.getSignBounds(currentIndex, rotateAngle_1, currentPage_1, zoomvalue, currentLeft, currentTop, currentWidth, currentHeight);
                            }
                            annot = {
                                id: currentField_1.id, bounds: { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height }, pageIndex: currentPage_1, data: currentValue_1, modifiedDate: '',
                                shapeAnnotationType: 'Path', opacity: 1, rotateAngle: rotateAngle_1, annotName: 'SignatureField', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }
                            };
                        }
                    }
                    if (this_2.pdfViewerBase.drawSignatureWithTool && signatureField_1 && signatureType !== 'Image') {
                        annot.id = signatureField_1.id + '_content';
                        var obj = this_2.pdfViewer.add(annot);
                        if (signatureField_1.wrapper.children[1] && obj.wrapper.id === signatureField_1.wrapper.children[1].id) {
                            if (!isNullOrUndefined(signatureField_1.wrapper.children[1]) && signatureField_1.wrapper.children[1].relativeMode === 'Point') {
                                signatureField_1.wrapper.children.splice(1, 1);
                            }
                        }
                        signatureField_1.wrapper.children.push(obj.wrapper);
                    }
                    else if (signatureType !== 'Image') {
                        this_2.pdfViewer.add(annot);
                    }
                    if (annot && annot.shapeAnnotationType === 'Path' && currentValue_1 !== '') {
                        this_2.pdfViewerBase.currentSignatureAnnot = annot;
                        var position = { currentHeight: currentHeight, currentWidth: currentWidth,
                            currentLeft: currentLeft, currentTop: currentTop };
                        this_2.pdfViewerBase.signatureModule.addSignatureCollection(bounds, position);
                        signString_1 = this_2.pdfViewerBase.signatureModule.saveImageString;
                        this_2.pdfViewerBase.currentSignatureAnnot = null;
                    }
                    if (signatureType !== 'Image') {
                        var canvass = this_2.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', currentPage_1);
                        this_2.pdfViewer.renderDrawing(canvass, currentPage_1);
                        this_2.pdfViewerBase.signatureModule.showSignatureDialog(false);
                        if (currentField_1.className === 'e-pdfviewer-signatureformfields e-pv-signature-focus') {
                            currentField_1.className = 'e-pdfviewer-signatureformfields-signature e-pv-signature-focus';
                        }
                        else {
                            currentField_1.className = 'e-pdfviewer-signatureformfields-signature';
                        }
                        if (this_2.pdfViewerBase.drawSignatureWithTool && signatureField_1) {
                            var key = target.offsetParent.offsetParent.id.split('_')[0] + '_content';
                            annot.bounds = { x: bounds.x * zoomvalue, y: bounds.y * zoomvalue,
                                width: bounds.width * zoomvalue, height: bounds.height * zoomvalue };
                            this_2.updateSignatureDataInSession(annot, key);
                        }
                        else {
                            this_2.updateDataInSession(currentField_1, annot.data, annot.bounds, signatureFontFamily_1, signatureFontSize_1);
                        }
                        currentField_1.style.pointerEvents = 'none';
                        if (this_2.pdfViewer.annotation) {
                            this_2.pdfViewer.annotation.addAction(annot.pageIndex, null, annot, 'FormField Value Change', '', annot, annot);
                        }
                        if (annot.shapeAnnotationType === 'Path' || annot.shapeAnnotationType === 'SignatureText') {
                            this_2.pdfViewer.fireSignatureAdd(annot.pageIndex, annot.id, annot.shapeAnnotationType, annot.bounds, annot.opacity, null, null, signString_1);
                        }
                        this_2.pdfViewer.fireFocusOutFormField(currentField_1.name, currentValue_1);
                    }
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < formFieldsData.length; i++) {
            _loop_2(i);
        }
        if (signatureType !== 'Image') {
            this.pdfViewerBase.signatureModule.hideSignaturePanel();
            this.pdfViewerBase.drawSignatureWithTool = false;
            this.pdfViewer.isInitialFieldToolbarSelection = false;
        }
    };
    //  EJ2-62918- Image signature width is wrong while adding programmatically and it is fixed by adding an onload event.
    //  A function was added and it was called
    FormFields.prototype.imageOnLoad = function (bounds, image, currentValue, currentPage, rotateAngle, currentField, signatureField, signString, signatureFontFamily, signatureFontSize, target) {
        if (target && target.offsetParent && signatureField) {
            this.pdfViewerBase.drawSignatureWithTool = true;
            if (target.nextSibling && target.nextSibling.id.indexOf('initial') !== -1) {
                this.pdfViewer.isInitialFieldToolbarSelection = true;
            }
        }
        if (this.pdfViewer.signatureFitMode === 'Default') {
            var padding = Math.min(bounds.height / this.paddingDifferenceValue, bounds.width / this.paddingDifferenceValue);
            var maxHeight = bounds.height - padding;
            var maxWidth = bounds.width - padding;
            var imageWidth = image.width;
            var imageHeight = image.height;
            var beforeWidth = bounds.width;
            var beforeHeight = bounds.height;
            var ratio = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);
            bounds.width = imageWidth * ratio;
            bounds.height = imageHeight * ratio;
            bounds.x = bounds.x + (beforeWidth - bounds.width) / 2;
            bounds.y = bounds.y + (beforeHeight - bounds.height) / 2;
        }
        var annot = {
            id: currentField.id, bounds: { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height }, pageIndex: currentPage, data: currentValue, modifiedDate: '',
            shapeAnnotationType: 'SignatureImage', opacity: 1, rotateAngle: rotateAngle, annotName: 'SignatureField', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }
        };
        signString = annot.data;
        if (this.pdfViewerBase.drawSignatureWithTool && signatureField) {
            annot.id = signatureField.id + '_content';
            var obj = this.pdfViewer.add(annot);
            if (signatureField.wrapper.children[1] && obj.wrapper.id === signatureField.wrapper.children[1].id) {
                if (!isNullOrUndefined(signatureField.wrapper.children[1]) && signatureField.wrapper.children[1].relativeMode === 'Point') {
                    signatureField.wrapper.children.splice(1, 1);
                }
            }
            signatureField.wrapper.children.push(obj.wrapper);
        }
        else {
            this.pdfViewer.add(annot);
        }
        var canvass = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', currentPage);
        this.pdfViewer.renderDrawing(canvass, currentPage);
        this.pdfViewerBase.signatureModule.showSignatureDialog(false);
        if (currentField.className === 'e-pdfviewer-signatureformfields e-pv-signature-focus') {
            currentField.className = 'e-pdfviewer-signatureformfields-signature e-pv-signature-focus';
        }
        else {
            currentField.className = 'e-pdfviewer-signatureformfields-signature';
        }
        if (this.pdfViewerBase.drawSignatureWithTool && signatureField) {
            var zoomvalue = this.pdfViewerBase.getZoomFactor();
            var key = target.offsetParent.offsetParent.id.split('_')[0] + '_content';
            annot.bounds = { x: bounds.x * zoomvalue, y: bounds.y * zoomvalue, width: bounds.width * zoomvalue,
                height: bounds.height * zoomvalue };
            this.updateSignatureDataInSession(annot, key);
        }
        else {
            this.updateDataInSession(currentField, annot.data, annot.bounds, signatureFontFamily, signatureFontSize);
        }
        currentField.style.pointerEvents = 'none';
        if (this.pdfViewer.annotation) {
            this.pdfViewer.annotation.addAction(annot.pageIndex, null, annot, 'FormField Value Change', '', annot, annot);
        }
        if (annot.shapeAnnotationType === 'SignatureImage') {
            this.pdfViewer.fireSignatureAdd(annot.pageIndex, annot.id, annot.shapeAnnotationType, annot.bounds, annot.opacity, null, null, signString);
        }
        this.pdfViewer.fireFocusOutFormField(currentField.name, currentValue);
        this.pdfViewerBase.signatureModule.hideSignaturePanel();
        this.pdfViewerBase.drawSignatureWithTool = false;
        this.pdfViewer.isInitialFieldToolbarSelection = false;
    };
    FormFields.prototype.updateSignatureDataInSession = function (annot, key) {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = JSON.parse(data);
        if (!isNullOrUndefined(formFieldsData)) {
            var _loop_3 = function (i) {
                if (formFieldsData[parseInt(i.toString(), 10)].Key === key) {
                    var formFieldIndex = this_3.pdfViewer.formFieldCollection.findIndex(function (el) { return el.id === formFieldsData[parseInt(i.toString(), 10)].FormField.id.split('_')[0]; });
                    if (annot.shapeAnnotationType === 'SignatureText') {
                        formFieldsData[parseInt(i.toString(), 10)].FormField.signatureType = 'Text';
                        this_3.pdfViewer.nameTable[("" + key).split('_')[0]].signatureType = 'Text';
                        this_3.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.signatureType = 'Text';
                        this_3.pdfViewer.nameTable["" + key].signatureType = 'Text';
                        formFieldsData[parseInt(i.toString(), 10)].FormField.fontFamily = annot.fontFamily === 'TimesRoman' ? 'Times New Roman' : annot.fontFamily;
                        this_3.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.fontFamily = annot.fontFamily;
                        this_3.pdfViewer.nameTable["" + key].fontFamily = annot.fontFamily;
                        this_3.pdfViewer.nameTable[("" + key).split('_')[0]].fontFamily = annot.fontFamily;
                        formFieldsData[parseInt(i.toString(), 10)].FormField.fontSize = annot.fontSize;
                        this_3.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.fontSize = annot.fontSize;
                        this_3.pdfViewer.nameTable["" + key].fontSize = annot.fontSize;
                        this_3.pdfViewer.nameTable[("" + key).split('_')[0]].fontSize = annot.fontSize;
                        if (formFieldIndex > -1) {
                            this_3.pdfViewer.formFieldCollection[parseInt(formFieldIndex.toString(), 10)].signatureType = 'Text';
                        }
                    }
                    else if (annot.shapeAnnotationType === 'SignatureImage') {
                        formFieldsData[parseInt(i.toString(), 10)].FormField.signatureType = 'Image';
                        this_3.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.signatureType = 'Image';
                        this_3.pdfViewer.nameTable["" + key].signatureType = 'Image';
                        if (formFieldIndex > -1) {
                            this_3.pdfViewer.formFieldCollection[parseInt(formFieldIndex.toString(), 10)].signatureType = 'Image';
                        }
                    }
                    else {
                        formFieldsData[parseInt(i.toString(), 10)].FormField.signatureType = 'Path';
                        this_3.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.signatureType = 'Path';
                        this_3.pdfViewer.nameTable["" + key].signatureType = 'Path';
                        if (formFieldIndex > -1) {
                            this_3.pdfViewer.formFieldCollection[parseInt(formFieldIndex.toString(), 10)].signatureType = 'Path';
                        }
                    }
                    formFieldsData[parseInt(i.toString(), 10)].FormField.signatureBound = annot.bounds;
                    this_3.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.signatureBound = annot.bounds;
                    this_3.pdfViewer.nameTable["" + key].signatureBound = annot.bounds;
                    if (formFieldIndex > -1) {
                        this_3.pdfViewer.formFieldCollection[parseInt(formFieldIndex.toString(), 10)].signatureBound = annot.bounds;
                    }
                    if (annot.shapeAnnotationType === 'Path') {
                        var collectionData = processPathData(annot.data);
                        var csData = splitArrayCollection(collectionData);
                        formFieldsData[parseInt(i.toString(), 10)].FormField.value = JSON.stringify(csData);
                        this_3.pdfViewer.nameTable["" + key].value = annot.data;
                        this_3.pdfViewer.nameTable[key.split('_')[0]].value = annot.data;
                        this_3.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.value = JSON.stringify(csData);
                        if (formFieldIndex > -1) {
                            this_3.pdfViewer.formFieldCollection[parseInt(formFieldIndex.toString(), 10)].value = JSON.stringify(csData);
                        }
                    }
                    else {
                        formFieldsData[parseInt(i.toString(), 10)].FormField.value = annot.data;
                        this_3.pdfViewerBase.formFieldCollection[parseInt(i.toString(), 10)].FormField.value = annot.data;
                        this_3.pdfViewer.nameTable[key.split('_')[0]].value = annot.data;
                        this_3.pdfViewer.nameTable["" + key].value = annot.data;
                        if (formFieldIndex > -1) {
                            this_3.pdfViewer.formFieldCollection[parseInt(formFieldIndex.toString(), 10)].value = annot.data;
                        }
                    }
                    this_3.pdfViewer.formDesigner.updateFormFieldCollections(formFieldsData[parseInt(i.toString(), 10)].FormField);
                    this_3.pdfViewer.formDesigner.updateFormFieldPropertiesChanges('formFieldPropertiesChange', formFieldsData[parseInt(i.toString(), 10)].FormField, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, '', formFieldsData[parseInt(i.toString(), 10)].FormField.value);
                }
                if (formFieldsData[parseInt(i.toString(), 10)].Key === annot.id) {
                    formFieldsData[parseInt(i.toString(), 10)].FormField.signatureBound = annot.bounds;
                }
            };
            var this_3 = this;
            for (var i = 0; i < formFieldsData.length; i++) {
                _loop_3(i);
            }
        }
        this.pdfViewerBase.setItemInSessionStorage(formFieldsData, '_formDesigner');
    };
    /**
     * @param {any} bounds - It describes about the bounds
     * @private
     * @returns {any} - any
     */
    FormFields.prototype.getDefaultBoundsforSign = function (bounds) {
        return { x: bounds.x + 4, y: bounds.y + 4, width: bounds.width - 8, height: bounds.height - 8 };
    };
    /**
     * @param {number} currentIndex - It describes about the current index
     * @param {number} rotateAngle - It describes about the rorate angle
     * @param {number} currentPage - It describes about the current page
     * @param {number} zoomvalue - It describes about the zoom value
     * @param {number} currentLeft - It describes about the current left
     * @param {number} currentTop - It describes about the current top
     * @param {number} currentWidth - It describes about the current width
     * @param {number} currentHeight - It describes about the current height
     * @param {boolean} isDraw - It describes about the isDraw
     * @private
     * @returns {any} - any
     */
    FormFields.prototype.getSignBounds = function (currentIndex, rotateAngle, currentPage, zoomvalue, currentLeft, currentTop, currentWidth, currentHeight, isDraw) {
        var bounds;
        var signatureId = this.pdfViewer.isInitialFieldToolbarSelection ? 'initialIcon' : 'signIcon';
        var signIcon = document.getElementById(signatureId + '_' + currentPage + '_' + currentIndex);
        var signLeft = signIcon ? parseFloat(signIcon.style.left) * zoomvalue : 0;
        var difference = (currentLeft * zoomvalue) - (signLeft / zoomvalue);
        if (rotateAngle === 90 || rotateAngle === 270) {
            this.rotateAngle = 0;
            if (signIcon.style.left !== '') {
                if (isDraw) {
                    return bounds = { x: currentLeft - (difference / zoomvalue) - zoomvalue,
                        y: currentTop + (difference / zoomvalue) + zoomvalue, width: currentWidth, height: currentHeight };
                }
                else {
                    return bounds = { x: currentLeft - (difference / zoomvalue) - zoomvalue,
                        y: currentTop + (difference / zoomvalue) + zoomvalue, width: currentHeight, height: currentWidth };
                }
            }
            else {
                difference = 10;
                if (isDraw) {
                    return bounds = { x: currentLeft - currentWidth, y: currentTop + currentWidth,
                        width: currentHeight, height: currentWidth };
                }
                else {
                    return bounds = { x: currentLeft - currentWidth - difference / 2, y: currentTop + currentWidth + difference,
                        width: currentHeight, height: currentWidth };
                }
            }
        }
        else {
            this.rotateAngle = 0;
            return bounds = { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight };
        }
    };
    FormFields.prototype.updateSameFieldsValue = function (event) {
        if (this.formFieldsData) {
            for (var i = 0; i < this.formFieldsData.length; i++) {
                var currentField = this.formFieldsData[parseInt(i.toString(), 10)];
                if (event.target.name === currentField.FieldName && event.target.id !== currentField.uniqueID) {
                    var currentTarget = document.getElementById(this.formFieldsData[parseInt(i.toString(), 10)].uniqueID);
                    if (currentTarget) {
                        currentTarget.value = event.target.value;
                    }
                    else {
                        currentField.Text = event.target.value;
                        this.updateDataInSession(currentField, null, null, null, null, true);
                    }
                }
            }
        }
    };
    FormFields.prototype.updateFormFieldsValue = function (event) {
        var currentTarget = event.target;
        var fieldIndex;
        var nextFields;
        if (currentTarget.InsertSpaces && !this.isKeyDownCheck) {
            var font = parseInt(currentTarget.style.width, 10) + (parseInt(currentTarget.style.height, 10) / 2);
            currentTarget.style.width = '' + font + 'px';
            this.isKeyDownCheck = true;
        }
        if (event.which === 9 && currentTarget && (currentTarget.className === 'e-pdfviewer-formFields' || currentTarget.className === 'e-pdfviewer-signatureformfields e-pv-signature-focus' || currentTarget.className === 'e-pdfviewer-signatureformfields-signature')) {
            var id = currentTarget.id.split('input_')[1].split('_')[0];
            var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + parseInt(id, 10));
            var currentFields = textLayer.getElementsByClassName('e-pdfviewer-formFields');
            var istabindexed = true;
            fieldIndex = this.pdfViewer.formFieldCollections.findIndex(function (field) { return field.id === currentTarget.id; });
            if ((!event.shiftKey && event.key === 'Tab')) {
                nextFields = fieldIndex + 1 < this.pdfViewer.formFieldCollections.length ?
                    this.pdfViewer.formFieldCollections[fieldIndex + 1] : this.pdfViewer.formFieldCollections[0];
            }
            this.pdfViewer.focusFormField(nextFields);
            istabindexed = true;
            event.preventDefault();
            var tabindex = currentTarget.tabIndex + 1;
            while (!istabindexed) {
                for (var l = 0; l < currentFields.length; l++) {
                    istabindexed = false;
                    if (currentFields[parseInt(l.toString(), 10)].tabIndex === (tabindex)) {
                        currentFields[parseInt(l.toString(), 10)].focus();
                        istabindexed = true;
                        event.preventDefault();
                        break;
                    }
                }
                if (this.maintainTabIndex["" + id] === tabindex) {
                    istabindexed = true;
                }
                tabindex = tabindex + 1;
            }
        }
        if ((event.shiftKey && event.key === 'Tab')) {
            var fieldIndex_1 = this.pdfViewer.formFieldCollections.findIndex(function (field) { return field.id === currentTarget.id; });
            var nextField = fieldIndex_1 > 0 ? this.pdfViewer.formFieldCollections[fieldIndex_1 - 1] :
                this.pdfViewer.formFieldCollections[this.pdfViewer.formFieldCollections.length - 1];
            this.pdfViewer.focusFormField(nextField);
            event.preventDefault();
        }
        if (event.currentTarget.classList.contains('e-pdfviewer-signatureformfields') ||
            event.currentTarget.classList.contains('e-pdfviewer-signatureformfields-signature')) {
            if (event.key === 'Enter') {
                var currentTarget_2 = event.target;
                for (var m = 0; m < this.pdfViewer.formFieldCollections.length; m++) {
                    if (currentTarget_2.id === this.pdfViewer.formFieldCollections[parseInt(m.toString(), 10)].id) {
                        this.pdfViewerBase.signatureModule.setFocus(currentTarget_2.id);
                        this.pdfViewer.fireFormFieldClickEvent('formFieldClicked', this.pdfViewer.formFieldCollections[parseInt(m.toString(), 10)]);
                    }
                }
            }
            else {
                event.preventDefault();
            }
        }
    };
    FormFields.prototype.changeFormFields = function (event) {
        var currentTarget = event.target;
        this.updateDataInSession(currentTarget);
    };
    /**
     * @param {any} target - It describes about the target
     * @param {any} signaturePath - It describes about the signature path
     * @param {any} signatureBounds - It describes about the signature bounds
     * @param {string} signatureFontFamily - It describes about the signature font family
     * @param {number} signatureFontSize   - It describes about the signature font size
     * @param {boolean} isUpdateSameField - It describes about the isUpdateSameField
     * @private
     * @returns {void}
     */
    FormFields.prototype.updateDataInSession = function (target, signaturePath, signatureBounds, signatureFontFamily, signatureFontSize, isUpdateSameField) {
        if (isUpdateSameField === void 0) { isUpdateSameField = false; }
        this.pdfViewerBase.updateDocumentEditedProperty(true);
        var filterFields = [];
        var fieldsByName = ' ';
        var filterFieldName = [];
        var filterArrayLength = 0;
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        if (data && !this.pdfViewer.formDesignerModule) {
            var FormFieldsData = JSON.parse(data);
            filterFields = FormFieldsData.filter(function (item) { return item.uniqueID === target.id; });
            if (filterFields.length > 0) {
                fieldsByName = filterFields[0].FieldName;
                filterFieldName = FormFieldsData.filter(function (item) { return item.FieldName === fieldsByName; });
                filterArrayLength = filterFieldName.length;
            }
            for (var m = 0; m < FormFieldsData.length; m++) {
                var currentData = FormFieldsData[parseInt(m.toString(), 10)];
                if (currentData.uniqueID === target.id || fieldsByName === currentData.FieldName) {
                    if (target && target.type === 'text' || target.type === 'password' || target.type === 'textarea') {
                        var signField = target;
                        if (signField.classList.contains('e-pdfviewer-signatureformfields') || signField.classList.contains('e-pdfviewer-signatureformfields-signature')) {
                            if (signaturePath) {
                                currentData.Value = signaturePath;
                            }
                            if (signatureBounds) {
                                if (!isNullOrUndefined(currentData.uniqueID) && fieldsByName === currentData.FieldName
                                    && target.id === currentData.uniqueID) {
                                    currentData.Bounds = signatureBounds;
                                }
                                else {
                                    var boundWidth = this.ConvertPointToPixel(currentData.LineBounds.Width);
                                    var boundHeight = this.ConvertPointToPixel(currentData.LineBounds.Height);
                                    var boundX = this.ConvertPointToPixel(currentData.LineBounds.X);
                                    var boundY = this.ConvertPointToPixel(currentData.LineBounds.Y);
                                    var currentHeight = signatureBounds.height;
                                    var currenWidth = signatureBounds.width;
                                    var newX = boundX + ((boundWidth - currenWidth) / 2);
                                    var newY = boundY + ((boundHeight - currentHeight) / 2);
                                    currentData.Bounds = { x: newX, y: newY, height: currentHeight, width: currenWidth };
                                }
                            }
                            if (signatureFontFamily) {
                                currentData.FontFamily = signatureFontFamily;
                                currentData.FontSize = signatureFontSize;
                            }
                        }
                        else {
                            currentData.Text = target.value;
                            currentData.Value = target.value;
                            currentData.Multiline = target.multiline;
                        }
                    }
                    else if (target.type === 'radio') {
                        if (currentData.uniqueID === target.id) {
                            var targetRadioButton = target.id;
                            var filterRadioButtonSameName = FormFieldsData.filter(function (sameNameRadioButtonField) { return (sameNameRadioButtonField.GroupName === target.name) && sameNameRadioButtonField.Name === 'RadioButton'; });
                            for (var l = 0; l < filterRadioButtonSameName.length; l++) {
                                var currentType = filterRadioButtonSameName[parseInt(l.toString(), 10)];
                                if (currentType.uniqueID !== targetRadioButton) {
                                    currentType.Selected = false;
                                }
                                var currentTarget = document.getElementById(currentType.uniqueID);
                                if (currentTarget) {
                                    if (targetRadioButton !== currentTarget.id) {
                                        currentTarget.Selected = false;
                                    }
                                }
                            }
                            if (currentData.Value === '' || currentData.Value !== target.value) {
                                currentData.Value = target.value;
                            }
                            if (target.value === currentData.Value || target.id === currentData.uniqueID) {
                                currentData.Selected = true;
                                break;
                            }
                            else {
                                currentData.Selected = false;
                            }
                        }
                    }
                    else if (target.type === 'checkbox') {
                        var targetCheckBox = target.id;
                        var filterCheckBoxSameName = FormFieldsData.filter(function (sameNameCheckboxField) { return (sameNameCheckboxField.GroupName === target.name) && sameNameCheckboxField.Name === 'CheckBox'; });
                        for (var l = 0; l < filterCheckBoxSameName.length; l++) {
                            var currentType = filterCheckBoxSameName[parseInt(l.toString(), 10)];
                            if (currentType.uniqueID !== targetCheckBox) {
                                currentType.Selected = false;
                                currentType.checked = false;
                            }
                            var currentTarget = document.getElementById(currentType.uniqueID);
                            if (currentTarget) {
                                if (targetCheckBox !== currentTarget.id) {
                                    currentTarget.Selected = false;
                                    currentTarget.checked = false;
                                    currentTarget.style.webkitAppearance = 'none';
                                }
                            }
                        }
                        if (target.checked && target.id === currentData.uniqueID) {
                            currentData.Selected = true;
                        }
                        else {
                            currentData.Selected = false;
                        }
                        if (currentData.Value === '') {
                            currentData.Value = target.value;
                        }
                    }
                    else if (target.type === 'select-one' && target.size === 0) {
                        if (target.selectedIndex < 0) {
                            target.selectedIndex = currentData.selectedIndex;
                        }
                        var currentValue = target.options[target.selectedIndex].text;
                        var childrens = target.children;
                        for (var k = 0; k < childrens.length; k++) {
                            if (childrens[parseInt(k.toString(), 10)].text === currentValue) {
                                currentData.SelectedValue = currentValue;
                                currentData.selectedIndex = target.selectedIndex;
                            }
                        }
                    }
                    else if (target.type === 'select-multiple' || target.size > 0) {
                        var currentValue = target.selectedOptions;
                        currentData.SelectedList = [];
                        for (var z = 0; z < currentValue.length; z++) {
                            var childrens = target.children;
                            for (var k = 0; k < childrens.length; k++) {
                                if (childrens[parseInt(k.toString(), 10)] === currentValue[parseInt(z.toString(), 10)]) {
                                    currentData.SelectedList.push(k);
                                }
                            }
                        }
                        currentData.SelectedValue = target.value;
                        var index = currentData.TextList ? currentData.TextList.indexOf(target.value) : 0;
                        currentData.selectedIndex = index > -1 ? index : 0;
                        currentData.SelectedList = [currentData.selectedIndex];
                    }
                    if (target.disabled) {
                        currentData.IsReadonly = true;
                    }
                    currentData.IsRequired = target.Required ? target.Required : (target.required ? target.required : false);
                    currentData.ToolTip = target.tooltip ? target.tooltip : '';
                    this.updateFormFieldsCollection(currentData);
                    filterArrayLength--;
                    if (filterArrayLength === 0) {
                        break;
                    }
                }
                else if (!isUpdateSameField) {
                    if (target && target.getAttribute('list') != null && target.type === 'text' && currentData.uniqueID === target.list.id) {
                        currentData.SelectedValue = target.value;
                    }
                }
                else if (isUpdateSameField) {
                    currentData.SelectedValue = target.Text;
                }
                this.updateFormFieldsCollection(currentData);
            }
            PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_formfields');
            this.pdfViewerBase.setItemInSessionStorage(FormFieldsData, '_formfields');
        }
        if (this.pdfViewer.formDesignerModule && target && target.id) {
            var selectedItem = this.pdfViewer.nameTable[target.id.split('_')[0]];
            if (selectedItem && selectedItem.wrapper && selectedItem.wrapper.children[0]) {
                selectedItem.value = target.value;
                var point = cornersPointsBeforeRotation(selectedItem.wrapper.children[0]).topLeft;
                this.pdfViewer.formDesignerModule.
                    updateFormDesignerFieldInSessionStorage(point, selectedItem.wrapper.children[0], selectedItem.formFieldAnnotationType, selectedItem);
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    FormFields.prototype.removeExistingFormFields = function () {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = !isNullOrUndefined(data) ? JSON.parse(data) : null;
        if (formFieldsData) {
            for (var i = 0; i < formFieldsData.length; i++) {
                if (formFieldsData[parseInt(i.toString(), 10)].FormField.formFieldAnnotationType === 'RadioButton') {
                    var buttonItem = [];
                    buttonItem = formFieldsData[parseInt(i.toString(), 10)].FormField.radiobuttonItem;
                    var sameButtonItemId = formFieldsData[parseInt(i.toString(), 10)].FormField.id.split('_')[0];
                    for (var j = 0; j < buttonItem.length; j++) {
                        var otherButton = buttonItem[parseInt(j.toString(), 10)];
                        if (otherButton.id.split('_')[0] !== sameButtonItemId) {
                            this.pdfViewer.formDesignerModule.deleteFormField(otherButton.id.split('_')[0]);
                        }
                    }
                }
                if (formFieldsData[parseInt(i.toString(), 10)].Key) {
                    this.pdfViewer.formDesignerModule.deleteFormField(formFieldsData[parseInt(i.toString(), 10)].Key.split('_')[0]);
                }
            }
        }
    };
    FormFields.prototype.applyCommonProperties = function (inputdiv, pageIndex, index, currentData, isFieldRotated) {
        var inputField = document.getElementById(this.pdfViewer.element.id + 'input_' + pageIndex + '_' + index);
        if (inputField) {
            var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageIndex);
            if (inputdiv.type === 'text' && inputField.parentElement !== textLayer) {
                inputField.parentElement.remove();
            }
            if (!(inputField.className === 'e-pdfviewer-signatureformfields e-pv-signature-focus')) {
                inputField.remove();
            }
        }
        var signIcon = document.getElementById('signIcon_' + pageIndex + '_' + index);
        var left = parseFloat(inputdiv.style.left);
        var top = parseInt(inputdiv.style.top, 10);
        var width = parseFloat(inputdiv.style.width);
        var height = parseFloat(inputdiv.style.height);
        var signIconWidth;
        var signIconHeght;
        var hightDifference;
        var widthDifference;
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        if (signIcon && !isFieldRotated) {
            signIconWidth = parseFloat(signIcon.style.width);
            signIconHeght = parseFloat(signIcon.style.height);
            if (signIcon.style.transform === 'rotate(90deg)') {
                signIcon.style.transform = 'rotate(0deg)';
                hightDifference = height / 2;
                widthDifference = signIconWidth * zoomvalue;
                signIcon.style.left = ((left - (hightDifference - (signIconWidth * zoomvalue))) + (widthDifference / 2)) + 'px';
            }
            if (signIcon.style.transform === 'rotate(180deg)') {
                signIcon.style.transform = 'rotate(0deg)';
                signIcon.style.left = left + 'px';
                signIcon.style.top = (top) + 'px';
            }
            if (signIcon.style.transform === 'rotate(270deg)') {
                signIcon.style.transform = 'rotate(0deg)';
                hightDifference = height / 2;
                widthDifference = signIconWidth * zoomvalue;
                signIcon.style.left = ((left - (hightDifference - widthDifference)) + (widthDifference / 2)) + 'px';
                signIcon.style.top = (top) + 'px';
            }
        }
        if (currentData.IsSignatureField && this.isSignatureField) {
            inputdiv.className = 'e-pdfviewer-signatureformfields-signature';
            inputdiv.style.pointerEvents = 'none';
        }
        else if (currentData.IsSignatureField) {
            if (currentData.Value) {
                inputdiv.className = 'e-pdfviewer-signatureformfields-signature';
                inputdiv.style.pointerEvents = 'none';
            }
            else {
                inputdiv.className = 'e-pdfviewer-signatureformfields';
            }
        }
        else if (currentData.Name !== 'Button') {
            inputdiv.className = 'e-pdfviewer-formFields';
        }
        inputdiv.id = this.pdfViewer.element.id + 'input_' + pageIndex + '_' + index;
        inputdiv.ariaLabel = this.pdfViewer.element.id + 'input_' + pageIndex;
        inputdiv.style.zIndex = 1000;
    };
    /**
     * @param {any} currentData - It describes about the current data
     * @param {number} pageIndex - It describes about the page index
     * @param {number} index - It describes about the index
     * @param {any} printContainer - It describes about the print container
     * @param {number} count - It describes about the count
     * @private
     * @returns {any} - any
     */
    FormFields.prototype.createFormFields = function (currentData, pageIndex, index, printContainer, count) {
        var currentField;
        switch (currentData['Name']) {
            case 'Textbox':
                currentField = this.createTextBoxField(currentData, pageIndex, 'text');
                break;
            case 'Password':
                currentField = this.createTextBoxField(currentData, pageIndex, 'password');
                break;
            case 'RadioButton':
                currentField = this.createRadioBoxField(currentData, pageIndex, 'radio');
                break;
            case 'CheckBox':
                currentField = this.createRadioBoxField(currentData, pageIndex, 'checkbox', printContainer);
                break;
            case 'DropDown':
                currentField = this.createDropDownField(currentData, pageIndex, index, printContainer);
                break;
            case 'ListBox':
                currentField = this.createListBoxField(currentData, pageIndex);
                break;
            case 'InitialField':
            case 'SignatureField': {
                currentField = this.createSignatureField(currentData, pageIndex, index, printContainer, count);
                var isFieldRotated = false;
                if (currentData['Rotation'] === 0) {
                    isFieldRotated = true;
                }
                if (currentData.Value && currentData.Value !== '') {
                    this.renderExistingAnnnot(currentData, index, printContainer, isFieldRotated);
                    this.isSignatureRendered = true;
                    count++;
                }
                break;
            }
            case 'Button':
                currentField = this.createButtonField(currentData, pageIndex);
                break;
            case 'ink':
                if (this.pdfViewer.formDesignerModule) {
                    if (currentData.Value && currentData.Value !== '' && !this.isSignatureRendered) {
                        this.renderExistingAnnnot(currentData, index, printContainer);
                    }
                }
                break;
            case 'SignatureText':
            case 'SignatureImage':
                if (currentData.Value && currentData.Value !== '' && !this.isSignatureRendered) {
                    this.renderExistingAnnnot(currentData, index, printContainer);
                }
                break;
        }
        return { currentField: currentField, count: count };
    };
    FormFields.prototype.getFormFieldType = function (currentData) {
        var currentField;
        switch (currentData['Name']) {
            case 'Textbox':
                currentField = 'Textbox';
                break;
            case 'Password':
                currentField = 'Password';
                break;
            case 'RadioButton':
                currentField = 'RadioButton';
                break;
            case 'CheckBox':
                currentField = 'CheckBox';
                break;
            case 'DropDown':
                currentField = 'DropDown';
                break;
            case 'ListBox':
                currentField = 'ListBox';
                break;
            case 'SignatureField':
                currentField = 'SignatureField';
                if (currentData.IsInitialField) {
                    currentField = 'InitialField';
                }
                break;
            case 'InitialField':
                currentField = 'InitialField';
                break;
        }
        return currentField;
    };
    FormFields.prototype.createButtonField = function (data, pageIndex) {
        var inputField = document.createElement('input');
        if (data.Value && (this.isBase64(data.Value) || this.isURL(data.Value))) {
            inputField.type = 'image';
            inputField.src = data.Value;
        }
        else {
            inputField.type = 'button';
        }
        inputField.className = 'e-pv-buttonItem';
        if (data.Text !== '') {
            inputField.value = data.Text;
        }
        else {
            inputField.value = '';
        }
        inputField.name = data.FieldName;
        return inputField;
    };
    /**
     * Returns the boolean value based on the imgae source base64
     *
     * @param {string} imageSrc - Passing the image source.
     * @returns {boolean} - boolean
     */
    FormFields.prototype.isBase64 = function (imageSrc) {
        return /^data:([a-zA-Z]*\/[a-zA-Z+.-]*);base64,/.test(imageSrc);
    };
    /**
     * Returns the boolean value based on the imgae source URL
     *
     * @param {string} imageSrc - Passing the image source.
     * @returns {boolean} - boolean
     */
    FormFields.prototype.isURL = function (imageSrc) {
        try {
            new URL(imageSrc);
            return true;
        }
        catch (_a) {
            return false;
        }
    };
    FormFields.prototype.createTextBoxField = function (data, pageIndex, type) {
        var inputField;
        if (data.Visible === 1) {
            return;
        }
        if (data.Multiline) {
            inputField = document.createElement('textarea');
            inputField.style.resize = 'none';
        }
        else {
            inputField = document.createElement('input');
            inputField.type = type;
        }
        if (data.MaxLength > 0) {
            inputField.maxLength = data.MaxLength;
        }
        this.addAlignmentPropety(data, inputField);
        if (data.Text !== '') {
            inputField.value = data.Text;
        }
        else {
            inputField.value = '';
        }
        if (!this.pdfViewer.enableAutoComplete) {
            inputField.autocomplete = 'off';
        }
        inputField.name = data.FieldName;
        return inputField;
    };
    FormFields.prototype.checkIsReadonly = function (data, inputField) {
        var isReadonly = false;
        for (var n = 0; n < this.readOnlyCollection.length; n++) {
            if (inputField.id === this.readOnlyCollection[parseInt(n.toString(), 10)]) {
                isReadonly = true;
                break;
            }
        }
        if (!this.pdfViewer.formDesignerModule && !this.pdfViewer.annotationModule && (data.IsInitialField || data.IsSignatureField)) {
            isReadonly = true;
        }
        if (data.IsReadonly || (!this.pdfViewer.enableFormFields) || isReadonly) {
            inputField.disabled = true;
            inputField.style.cursor = 'default';
            inputField.style.backgroundColor = 'transparent';
        }
        else {
            var borderColor = data.BackColor;
            if (data.Name !== 'Button') {
                inputField.style.backgroundColor = 'rgba(' + borderColor.R + ',' + borderColor.G + ',' + borderColor.B + ',' + 0.2 + ')';
            }
            else {
                var opacity = data.Opacity;
                if (opacity) {
                    inputField.style.backgroundColor = 'rgba(' + borderColor.R + ',' + borderColor.G + ',' + borderColor.B + ',' + opacity + ')';
                }
                else {
                    inputField.style.backgroundColor = 'rgb(' + borderColor.R + ',' + borderColor.G + ',' + borderColor.B + ')';
                }
            }
            var fontColor = data.FontColor;
            inputField.style.color = 'rgba(' + fontColor.R + ',' + fontColor.G + ',' + fontColor.B + ',' + 1 + ')';
        }
    };
    /**
     * @param {boolean} isReadonly - It describes about the isReadOnly value
     * @private
     * @returns {void}
     */
    FormFields.prototype.formFieldsReadOnly = function (isReadonly) {
        var formFields = document.getElementsByClassName('e-pdfviewer-formFields');
        this.makeformFieldsReadonly(formFields, isReadonly);
        var signatureFields = document.getElementsByClassName('e-pdfviewer-signatureformfields');
        this.makeformFieldsReadonly(signatureFields, isReadonly);
    };
    FormFields.prototype.makeformFieldsReadonly = function (formFields, isReadonly) {
        for (var i = 0; i < formFields.length; i++) {
            if (formFields[parseInt(i.toString(), 10)]) {
                var inputField = formFields[parseInt(i.toString(), 10)];
                if (!isReadonly) {
                    inputField.disabled = true;
                    inputField.style.cursor = 'default';
                }
                else {
                    inputField.disabled = false;
                }
            }
        }
    };
    FormFields.prototype.applyTabIndex = function (data, inputField, pageIndex) {
        inputField.tabIndex = data.TabIndex;
        this.maxTabIndex = Math.max(this.maxTabIndex, inputField.tabIndex);
        if (this.minTabIndex === -1) {
            this.minTabIndex = inputField.tabIndex;
        }
        this.minTabIndex = Math.min(this.minTabIndex, inputField.tabIndex);
        this.maintainTabIndex[pageIndex.toString()] = this.maxTabIndex;
        this.maintanMinTabindex[pageIndex.toString()] = this.minTabIndex;
    };
    FormFields.prototype.checkIsRequiredField = function (data, inputField) {
        if (data.IsRequired) {
            inputField.required = true;
            inputField.style.border = '1px solid red';
        }
        else {
            var borderColor = data.BorderColor;
            inputField.style.border = data.BorderWidth;
            inputField.style.borderColor = 'rgba(' + borderColor.R + ',' + borderColor.G + ',' + borderColor.B + ',' + 1 + ')';
        }
        if (inputField.type !== 'checkbox' && inputField.type !== 'radio') {
            var borderStyle = data.BorderStyle;
            this.addBorderStylePropety(borderStyle, inputField);
        }
    };
    FormFields.prototype.applyDefaultColor = function (inputField) {
        if (inputField.type !== 'button' && (inputField.style.backgroundColor === 'rgba(255, 255, 255, 0.2)' || inputField.style.backgroundColor === 'rgba(0, 0, 0, 0.2)') || inputField.style.backgroundColor === 'rgba(218, 234, 247, 0.2)') {
            inputField.style.backgroundColor = 'rgba(0, 20, 200, 0.2)';
        }
        if (inputField.style.color === 'rgba(255, 255, 255, 0.2)') {
            inputField.style.color = 'black';
        }
    };
    FormFields.prototype.addAlignmentPropety = function (data, inputField) {
        var alignment = data.Alignment;
        switch (alignment) {
            case 0:
                inputField.style.textAlign = 'left';
                break;
            case 1:
                inputField.style.textAlign = 'center';
                break;
            case 2:
                inputField.style.textAlign = 'right';
                break;
            case 3:
                inputField.style.textAlign = 'justify';
                break;
        }
    };
    FormFields.prototype.addBorderStylePropety = function (borderStyle, inputField) {
        switch (borderStyle) {
            case 0:
                inputField.style.borderStyle = 'solid';
                break;
            case 1:
                inputField.style.borderStyle = 'dashed';
                break;
            case 2:
                inputField.style.borderStyle = 'outset';
                break;
            case 3:
                inputField.style.borderStyle = 'inset';
                break;
            case 4:
                inputField.style.borderStyle = 'outset';
                break;
            case 5:
                inputField.style.borderStyle = 'dotted';
                break;
            case 6:
                inputField.style.borderStyle = 'inset';
                break;
        }
    };
    FormFields.prototype.createRadioBoxField = function (data, pageIndex, type, printContainer) {
        var inputField = document.createElement('input');
        inputField.type = type;
        if (data.Selected) {
            inputField.checked = true;
        }
        else if (type === 'checkbox' && !printContainer) {
            inputField.style.webkitAppearance = 'none';
        }
        inputField.name = data.GroupName;
        inputField.value = data.Value;
        return inputField;
    };
    FormFields.prototype.createDropDownField = function (data, pageIndex, index, printContainer) {
        var inputField = document.createElement('select');
        var childItems = (data.Name === 'DropDown') ? data['ComboBoxList'] : data['TextList'];
        if (data.Selected && !printContainer) {
            var previousField = document.getElementById('editableDropdown' + pageIndex + '_' + index);
            if (previousField) {
                previousField.remove();
            }
            var inputFields = document.createElement('input');
            inputFields.id = 'editableDropdown' + pageIndex + '_' + index;
            inputFields.setAttribute('list', this.pdfViewer.element.id + 'input_' + pageIndex + '_' + index);
            var bounds = data['LineBounds'];
            var font = data['Font'];
            inputFields.style.position = 'absolute';
            inputFields.style.border = '0px';
            this.applyPosition(inputFields, bounds, font, pageIndex, data['Rotation']);
            inputFields.style.backgroundColor = 'rgba(0, 20, 200, 0.2)';
            inputFields.className = 'e-pdfviewer-formFields';
            if (data.selectedIndex === -1) {
                inputFields.value = data.SelectedValue;
            }
            if (printContainer) {
                printContainer.appendChild(inputFields);
            }
            else {
                var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageIndex);
                textLayer.appendChild(inputFields);
            }
            inputFields.addEventListener('focus', this.focusFormFields.bind(this));
            inputFields.addEventListener('blur', this.blurFormFields.bind(this));
            inputFields.addEventListener('click', this.updateFormFields.bind(this));
            inputFields.addEventListener('change', this.changeFormFields.bind(this));
            inputFields.addEventListener('keydown', this.updateFormFieldsValue.bind(this));
            inputField = document.createElement('DATALIST');
        }
        for (var j = 0; j < childItems.length; j++) {
            var option = document.createElement('option');
            option.className = 'e-dropdownSelect';
            var itemName = childItems[parseInt(j.toString(), 10)].itemName ?
                childItems[parseInt(j.toString(), 10)].itemName : childItems[parseInt(j.toString(), 10)].ItemName;
            var itemValue = childItems[parseInt(j.toString(), 10)].itemValue ?
                childItems[parseInt(j.toString(), 10)].itemValue : childItems[parseInt(j.toString(), 10)].ItemValue;
            if (data.SelectedValue === itemName || data.selectedIndex === j) {
                option.selected = true;
            }
            else {
                option.selected = false;
            }
            option.value = itemValue;
            option.innerHTML = itemName;
            inputField.appendChild(option);
        }
        inputField.name = data.Text;
        return inputField;
    };
    FormFields.prototype.createListBoxField = function (data, pageIndex) {
        var inputField = document.createElement('select');
        var childItems = data['TextList'];
        if (data.MultiSelect) {
            inputField.multiple = true;
        }
        else {
            inputField.multiple = false;
            inputField.size = childItems.length;
        }
        for (var j = 0; j < childItems.length; j++) {
            var option = document.createElement('option');
            option.className = 'e-pdfviewer-ListBox';
            for (var k = 0; k < data.SelectedList.length; k++) {
                if (data.SelectedList[parseInt(k.toString(), 10)] === j) {
                    option.selected = true;
                }
            }
            option.innerHTML = childItems[parseInt(j.toString(), 10)];
            inputField.appendChild(option);
        }
        inputField.name = data.Text;
        return inputField;
    };
    FormFields.prototype.createSignatureField = function (data, pageIndex, index, printContainer, count) {
        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.name = data.FieldName;
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        var previousField = document.getElementById('signIcon_' + pageIndex + '_' + index);
        if (previousField && !printContainer) {
            previousField.remove();
        }
        this.pdfViewerBase.isInitialField = data.IsInitialField;
        var signIndicator = this.pdfViewerBase.isInitialField ? 'Initial' : 'Sign';
        //check whether the width for sign indicator has default value or not and then set the default width value for initial field.
        var signatureFieldIndicatorWidth = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ?
            (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.width === 19 ?
                (this.pdfViewerBase.isInitialField ? 27 : 19) :
                this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.width) : 19;
        var span = document.createElement('span');
        var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageIndex);
        var bounds = data['LineBounds'];
        var left = this.ConvertPointToPixel(bounds.X);
        var top = this.ConvertPointToPixel(bounds.Y);
        var indicatorWidth = this.ConvertPointToPixel(bounds.Width);
        var indicatorHeight = this.ConvertPointToPixel(bounds.Height);
        var height = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ?
            (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.height > indicatorHeight * zoomvalue / 2 ?
                indicatorHeight * zoomvalue / 2 : this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.height) :
            indicatorHeight * zoomvalue / 2;
        var width = signatureFieldIndicatorWidth > indicatorWidth * zoomvalue / 2 ? indicatorWidth * zoomvalue / 2 :
            signatureFieldIndicatorWidth;
        var size = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ?
            (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.fontSize > height / 2 ? 10 :
                this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.fontSize) : 10;
        var fontSize = size > width ? width / 2 : (size > height ? height / 2 : size);
        span.style.position = 'absolute';
        span.id = 'signIcon_' + pageIndex + '_' + index;
        var rotation = this.getAngle(pageIndex);
        var annotBounds = { left: left, top: top, width: width, height: height };
        var fieldBounds = this.getBounds(annotBounds, pageIndex);
        span.style.transform = 'rotate(' + rotation + 'deg)';
        span.style.left = fieldBounds.left * zoomvalue + 'px';
        span.style.top = fieldBounds.top * zoomvalue + 'px';
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            span.style.height = 5 + 'px';
            span.style.width = 10 + 'px';
            span.style.fontSize = '3px';
        }
        else {
            span.style.height = height + 'px';
            span.style.width = width + 'px';
            span.style.fontSize = fontSize + 'px';
            if (isBlazor()) {
                span.style.fontSize = (fontSize - 1) + 'px';
            }
        }
        if (!((height + this.indicatorPaddingValue) > indicatorHeight * zoomvalue) &&
            !((width + this.indicatorPaddingValue) > indicatorWidth * zoomvalue)) {
            span.style.padding = '2px';
        }
        span.style.textAlign = 'center';
        span.style.boxSizing = 'content-box';
        span.innerHTML = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ?
            (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.text ?
                this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.text : signIndicator) : signIndicator;
        span.style.color = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ? (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.color ? this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.color : 'black') : 'black';
        span.style.backgroundColor = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ? (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.backgroundColor ? this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.backgroundColor : 'orange') : 'orange';
        span.style.opacity = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ?
            (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.opacity ?
                this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.opacity : 1) : 1;
        if (!isNullOrUndefined(textLayer)) {
            textLayer.appendChild(span);
        }
        this.addSignaturePath(data, count);
        return inputField;
    };
    FormFields.prototype.addSignaturePath = function (signData, count) {
        this.isSignatureField = false;
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        if (data) {
            var formFieldsData = JSON.parse(data);
            if (typeof formFieldsData === 'string') {
                formFieldsData = JSON.parse(formFieldsData);
            }
            for (var m = 0; m < formFieldsData.length; m++) {
                var currentData = formFieldsData[parseInt(m.toString(), 10)];
                if (currentData.ActualFieldName === null && count && (currentData.Name === 'ink' || currentData.Name === 'SignatureField' || currentData.Name === 'SignatureImage' || currentData.Name === 'SignatureText') && (this.pdfViewer.formDesigner ? ((currentData.FieldName.split('_')[0]) === (signData.ActualFieldName) || (currentData.FieldName.split('_')[0]) === (signData.FieldName)) : ((currentData.FieldName.split('_')[0] === (signData.FieldName)) && !isNullOrUndefined(signData.ActualFieldName)) && currentData.Value && currentData.Value !== '')) {
                    if (signData.PageIndex === currentData.PageIndex) {
                        signData.Value = currentData.Value;
                        signData.FontFamily = currentData.FontFamily;
                        signData.FontSize = currentData.FontSize;
                        this.isSignatureField = true;
                        signData.Bounds = currentData.LineBounds;
                    }
                }
                if (currentData.ActualFieldName === null && count && (currentData.Name === 'ink' || currentData.Name === 'SignatureField' || currentData.Name === 'SignatureImage' || currentData.Name === 'SignatureText') && this.pdfViewer.formDesigner ? currentData.FieldName === signData.ActualFieldName + '_' + count || currentData.FieldName === signData.FieldName + '_' + count : ((currentData.FieldName === signData.FieldName + '_' + count || currentData.FieldName === signData.ActualFieldName + '_' + count) && !isNullOrUndefined(signData.ActualFieldName)) && currentData.Value && currentData.Value !== '') {
                    signData.Value = currentData.Value;
                    signData.FontFamily = currentData.FontFamily;
                    signData.FontSize = currentData.FontSize;
                    this.isSignatureField = true;
                    if (!signData.Bounds) {
                        signData.Bounds = currentData.LineBounds;
                    }
                    break;
                }
            }
        }
        return this.isSignatureField;
    };
    FormFields.prototype.getBounds = function (bound, pageIndex, rotation, isFieldRotated) {
        var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
        var bounds;
        if (rotation > 0) {
            bounds = this.getBoundsPosition(rotation, bound, pageDetails, isFieldRotated);
        }
        else {
            bounds = this.getBoundsPosition(pageDetails.rotation, bound, pageDetails, isFieldRotated);
        }
        return bounds;
    };
    FormFields.prototype.getBoundsPosition = function (rotation, bound, pageDetails, isFieldRotated) {
        var bounds;
        if (!isFieldRotated) {
            switch (rotation) {
                case 90:
                    bounds = { left: pageDetails.width - bound.top - bound.height, top: bound.left, width: bound.height, height: bound.width };
                    break;
                case 180:
                    bounds = { left: pageDetails.width - bound.left - bound.width, top: pageDetails.height - bound.top - bound.height,
                        width: bound.width, height: bound.height };
                    break;
                case 270:
                    bounds = { left: bound.top, top: pageDetails.height - bound.left - bound.width, width: bound.height, height: bound.width };
                    break;
                case 0:
                    bounds = bound;
                    break;
                case 1:
                    bounds = { left: pageDetails.width - bound.top - bound.height, top: bound.left, width: bound.height, height: bound.width };
                    break;
                case 2:
                    bounds = { left: pageDetails.width - bound.left - bound.width, top: pageDetails.height - bound.top - bound.height,
                        width: bound.width, height: bound.height };
                    break;
                case 3:
                    bounds = { left: bound.top, top: pageDetails.height - bound.left - bound.width, width: bound.height, height: bound.width };
                    break;
            }
            if (!bounds) {
                bounds = bound;
            }
        }
        else {
            switch (rotation) {
                case 0:
                    bounds = bound;
                    break;
                case 1:
                    bounds = { left: pageDetails.width - bound.top - bound.height - (bound.width / 2 - bound.height / 2),
                        top: bound.left + (bound.width / 2 - bound.height / 2), width: bound.width, height: bound.height };
                    break;
                case 2:
                    bounds = { left: pageDetails.width - bound.left - bound.width, top: pageDetails.height - bound.top - bound.height,
                        width: bound.width, height: bound.height };
                    break;
                case 3:
                    bounds = { left: bound.top - (bound.width / 2 - bound.height / 2), top: (pageDetails.height - bound.left -
                            bound.width + (bound.width / 2 - bound.height / 2)), width: bound.width, height: bound.height };
                    break;
            }
            if (!bounds) {
                bounds = bound;
            }
        }
        return bounds;
    };
    FormFields.prototype.applyPosition = function (inputField, bounds, font, pageIndex, rotation, isFieldRotated) {
        if (bounds) {
            var left = this.ConvertPointToPixel(bounds.X);
            var top_3 = this.ConvertPointToPixel(bounds.Y);
            var width = this.ConvertPointToPixel(bounds.Width);
            var height = this.ConvertPointToPixel(bounds.Height);
            var fontHeight = 0;
            var fieldBounds = { left: left, top: top_3, width: width, height: height };
            var annotBounds = this.getBounds(fieldBounds, pageIndex, rotation, isFieldRotated);
            if (!isNullOrUndefined(font) && font.Height) {
                inputField.style.fontFamily = font.Name;
                if (font.Italic) {
                    inputField.style.fontStyle = 'italic';
                }
                if (font.Bold) {
                    inputField.style.fontWeight = 'Bold';
                }
                fontHeight = this.ConvertPointToPixel(font.Size);
            }
            this.pdfViewerBase.setStyleToTextDiv(inputField, annotBounds.left, annotBounds.top, fontHeight, annotBounds.width, annotBounds.height, false);
        }
    };
    FormFields.prototype.renderExistingAnnnot = function (data, index, printContainer, isFieldRotated) {
        if (!printContainer) {
            var bounds = void 0;
            if (data.Bounds && data.Name !== 'ink') {
                bounds = data.Bounds;
            }
            else {
                bounds = data.LineBounds;
            }
            var currentLeft = void 0;
            var currentTop = void 0;
            var currentWidth = void 0;
            var currentHeight = void 0;
            if (bounds.x || bounds.y || bounds.width || bounds.height) {
                currentLeft = bounds.x;
                currentTop = bounds.y;
                currentWidth = bounds.width;
                currentHeight = bounds.height;
            }
            else {
                currentLeft = this.ConvertPointToPixel(bounds.X);
                currentTop = this.ConvertPointToPixel(bounds.Y);
                currentWidth = this.ConvertPointToPixel(bounds.Width);
                currentHeight = this.ConvertPointToPixel(bounds.Height);
            }
            var currentPage = parseFloat(data['PageIndex']);
            var bound = { left: currentLeft, top: currentTop, width: currentWidth, height: currentHeight };
            var newBounds = this.updateSignatureBounds(bound, currentPage, isFieldRotated);
            var annot_1;
            var fontFamily = data.FontFamily ? data.FontFamily : data.fontFamily;
            if ((this.pdfViewerBase.isSignatureImageData(data.Value))) {
                annot_1 = {
                    id: this.pdfViewer.element.id + 'input_' + currentPage + '_' + index, bounds: newBounds, pageIndex: currentPage, data: data.Value, modifiedDate: '',
                    shapeAnnotationType: 'SignatureImage', opacity: 1, rotateAngle: isFieldRotated ? this.getAngle(currentPage) : 0, annotName: 'SignatureField', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }
                };
            }
            else if (this.pdfViewerBase.isSignaturePathData(data.Value)) {
                var bound_1 = newBounds;
                var tempBounds = { left: newBounds.x, top: newBounds.y, width: newBounds.width, height: newBounds.height };
                bound_1 = this.updateSignatureBounds(tempBounds, currentPage, false);
                annot_1 = {
                    id: this.pdfViewer.element.id + 'input_' + currentPage + '_' + index, bounds: bound_1, pageIndex: currentPage, data: data.Value, modifiedDate: '',
                    shapeAnnotationType: 'Path', opacity: 1, rotateAngle: 0, annotName: 'SignatureField', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }
                };
            }
            else {
                annot_1 = {
                    id: this.pdfViewer.element.id + 'input_' + currentPage + '_' + index, bounds: newBounds, pageIndex: currentPage, data: data.Value, modifiedDate: '',
                    shapeAnnotationType: 'SignatureText', opacity: 1, rotateAngle: isFieldRotated ? this.getAngle(currentPage) : 0, annotName: 'SignatureField', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }, fontFamily: data.FontFamily, fontSize: data.FontSize
                };
                annot_1.fontFamily = fontFamily === 'TimesRoman' ? 'Times New Roman' : fontFamily;
                annot_1.fontSize = data.FontSize ? data.FontSize : data.fontSize;
            }
            if ((data.Name === 'SignatureField' || data.Name === 'InitialField') && !isNullOrUndefined(data.id)) {
                var elementId = data.id;
                var signatureFieldElement = document.getElementById(elementId + '_content_html_element');
                var signatureField = this.pdfViewer.nameTable["" + elementId];
                annot_1.id = signatureField.id + '_content';
                var obj_1 = this.pdfViewer.add(annot_1);
                signatureField.wrapper.children.push(obj_1.wrapper);
                if (!isNullOrUndefined(signatureFieldElement) && this.isSignatureField) {
                    var inputField = signatureFieldElement.children[0].children[0];
                    inputField.style.pointerEvents = 'none';
                    inputField.className = 'e-pdfviewer-signatureformfields-signature';
                    inputField.parentElement.style.pointerEvents = 'none';
                }
                else if (!isNullOrUndefined(signatureFieldElement) && data.Value) {
                    var inputField = signatureFieldElement.children[0].children[0];
                    inputField.style.pointerEvents = 'none';
                    inputField.className = 'e-pdfviewer-signatureformfields-signature';
                    inputField.parentElement.style.pointerEvents = 'none';
                }
            }
            else {
                var target = document.getElementById(annot_1.id);
                if (target && target.classList.contains('e-pdfviewer-signatureformfields-signature')) {
                    this.pdfViewer.annotation.deleteAnnotationById(annot_1.id);
                }
                this.pdfViewer.add(annot_1);
                if (target) {
                    this.updateDataInSession(target, annot_1.data, annot_1.bounds);
                    this.pdfViewer.fireSignatureAdd(annot_1.pageIndex, annot_1.id, annot_1.shapeAnnotationType, annot_1.bounds, annot_1.opacity, annot_1.strokeColor, annot_1.thickness, annot_1.data);
                }
            }
            data.Bounds = annot_1.bounds;
            if (this.pdfViewer.formDesignerModule) {
                var zoomvalue = this.pdfViewerBase.getZoomFactor();
                annot_1.bounds = { x: currentLeft * zoomvalue, y: currentTop * zoomvalue, width: currentWidth * zoomvalue,
                    height: currentHeight * zoomvalue };
                this.updateSignatureDataInSession(annot_1, annot_1.id);
            }
            var canvass = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', currentPage);
            var obj = this.pdfViewer.formFieldCollection.filter(function (field) { return annot_1.id.split('_')[0] === field.id; });
            if (obj.length > 0 && obj[0].visibility !== 'hidden' || !this.pdfViewer.formDesignerModule) {
                this.pdfViewer.renderDrawing(canvass, currentPage);
            }
        }
    };
    /**
     * @param {any} bound - It describes about the bound
     * @param {number} pageIndex - It describes about the page index
     * @param {boolean} isFieldRotated - It describes about the isFieldRotated
     * @private
     * @returns {any} - any
     */
    FormFields.prototype.updateSignatureBounds = function (bound, pageIndex, isFieldRotated) {
        var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
        if (pageDetails) {
            if (!isFieldRotated) {
                if (pageDetails.rotation === 1) {
                    return { x: pageDetails.width - bound.top - bound.height, y: bound.left, width: bound.height, height: bound.width };
                }
                else if (pageDetails.rotation === 2) {
                    return { x: pageDetails.width - bound.left - bound.width, y: pageDetails.height - bound.top - bound.height,
                        width: bound.width, height: bound.height };
                }
                else if (pageDetails.rotation === 3) {
                    return { x: bound.top, y: (pageDetails.height - bound.left - bound.width), width: bound.height, height: bound.width };
                }
                else {
                    return { x: bound.left, y: bound.top, width: bound.width, height: bound.height };
                }
            }
            else {
                if (pageDetails.rotation === 1) {
                    return { x: pageDetails.width - bound.top - bound.height - (bound.width / 2 - bound.height / 2),
                        y: bound.left + (bound.width / 2 - bound.height / 2), width: bound.width, height: bound.height };
                }
                else if (pageDetails.rotation === 2) {
                    return { x: pageDetails.width - bound.left - bound.width, y: pageDetails.height - bound.top - bound.height,
                        width: bound.width, height: bound.height };
                }
                else if (pageDetails.rotation === 3) {
                    return { x: bound.top - (bound.width / 2 - bound.height / 2), y: (pageDetails.height - bound.left - bound.width +
                            (bound.width / 2 - bound.height / 2)), width: bound.width, height: bound.height };
                }
                else {
                    return { x: bound.left, y: bound.top, width: bound.width, height: bound.height };
                }
            }
        }
        else {
            return { x: bound.left, y: bound.top, width: bound.width, height: bound.height };
        }
    };
    FormFields.prototype.resetFormFields = function () {
        var formFieldData = this.pdfViewer.formFieldCollections;
        for (var i = 0; i < formFieldData.length; i++) {
            var currentData = formFieldData[parseInt(i.toString(), 10)];
            this.currentTarget = document.getElementById(currentData.id);
            if (currentData.type === 'Textbox') {
                this.currentTarget.value = currentData.value;
            }
            else if (currentData.type === 'RadioButton') {
                this.currentTarget.checked = currentData.value;
                if (currentData.value) {
                    this.updateDataInSession(this.currentTarget);
                }
            }
            else if (currentData.type === 'DropDown') {
                this.currentTarget.value = currentData.value;
            }
            else if (currentData.type === 'CheckBox') {
                this.currentTarget.checked = currentData.value;
            }
            else if (currentData.type === 'SignatureField') {
                var annotation = this.pdfViewer.nameTable[currentData.id];
                if (annotation) {
                    if (this.currentTarget && this.currentTarget.className === 'e-pdfviewer-signatureformfields-signature') {
                        this.currentTarget.className = 'e-pdfviewer-signatureformfields';
                        this.currentTarget.style.pointerEvents = '';
                        this.updateDataInSession(this.currentTarget, '');
                    }
                    this.pdfViewer.remove(annotation);
                    this.pdfViewer.renderDrawing();
                }
            }
            if (currentData.type !== 'RadioButton' && currentData.type !== 'SignatureField') {
                this.updateDataInSession(this.currentTarget);
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    FormFields.prototype.clearFormFieldStorage = function () {
        var sessionSize = PdfViewerBase.sessionStorageManager.getWindowSessionStorageSize();
        var maxSessionSize = 4500;
        if (this.pdfViewerBase.isDeviceiOS || this.pdfViewerBase.isMacSafari) {
            maxSessionSize = 2000;
        }
        if (this.pdfViewerBase.isStorageExceed) {
            var storageLength = PdfViewerBase.sessionStorageManager.getSessionLength();
            var formFieldsList = [];
            for (var i = 0; i < storageLength; i++) {
                if (PdfViewerBase.sessionStorageManager.getKey(i) && PdfViewerBase.sessionStorageManager.getKey(i).split('_')[3]) {
                    if (PdfViewerBase.sessionStorageManager.getKey(i).split('_')[3] === 'formfields') {
                        this.pdfViewerBase.formFieldStorage[PdfViewerBase.sessionStorageManager.getKey(i)] =
                            PdfViewerBase.sessionStorageManager.getItem(PdfViewerBase.sessionStorageManager.getKey(i));
                        formFieldsList.push(PdfViewerBase.sessionStorageManager.getKey(i));
                    }
                    else if (PdfViewerBase.sessionStorageManager.getKey(i).split('_')[3] === 'formDesigner') {
                        this.pdfViewerBase.formFieldStorage[PdfViewerBase.sessionStorageManager.getKey(i)] =
                            PdfViewerBase.sessionStorageManager.getItem(PdfViewerBase.sessionStorageManager.getKey(i));
                        formFieldsList.push(PdfViewerBase.sessionStorageManager.getKey(i));
                    }
                }
            }
            if (formFieldsList) {
                for (var i = 0; i < formFieldsList.length; i++) {
                    PdfViewerBase.sessionStorageManager.removeItem(formFieldsList[parseInt(i.toString(), 10)]);
                }
            }
        }
    };
    FormFields.prototype.clearFormFields = function (formField) {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        if (data) {
            var formFieldsData = void 0;
            if (formField) {
                formFieldsData = [formField];
            }
            else {
                formFieldsData = JSON.parse(data);
            }
            var isFirstRadio = true;
            for (var m = 0; m < formFieldsData.length; m++) {
                var currentData = formFieldsData[parseInt(m.toString(), 10)];
                if (formField) {
                    currentData.uniqueID = formField.id;
                    currentData.Name = formField.type;
                }
                this.currentTarget = document.getElementById(currentData.uniqueID);
                if (currentData.Name === 'Textbox') {
                    this.currentTarget.value = '';
                }
                else if (currentData.Name === 'RadioButton') {
                    if (isFirstRadio) {
                        this.currentTarget.checked = true;
                        this.updateDataInSession(this.currentTarget);
                        isFirstRadio = false;
                    }
                }
                else if (currentData.Name === 'DropDown') {
                    this.currentTarget.value = currentData.TextList[0];
                }
                else if (currentData.Name === 'CheckBox') {
                    this.currentTarget.checked = false;
                }
                else if (currentData.Name === 'SignatureField' || currentData.Name === 'InitialField') {
                    var annotation = this.pdfViewer.nameTable[currentData.uniqueID];
                    if (annotation.propName !== 'annotations') {
                        annotation = this.pdfViewer.nameTable[currentData.uniqueID + '_content'];
                    }
                    if (annotation) {
                        if (this.currentTarget && this.currentTarget.className === 'e-pdfviewer-signatureformfields-signature') {
                            this.currentTarget.className = 'e-pdfviewer-signatureformfields';
                            this.currentTarget.style.pointerEvents = '';
                            this.currentTarget.parentElement.style.pointerEvents = '';
                            this.updateDataInSession(this.currentTarget, '');
                            if (formField) {
                                formField.value = '';
                                formField.signatureType = [formField.signatureType];
                                formField.signatureType[0] = '';
                            }
                        }
                        this.pdfViewer.annotation.deleteAnnotationById(annotation.id);
                        this.currentTarget = null;
                    }
                }
                if (currentData.Name !== 'SignatureField' && currentData.Name !== 'ink' && currentData.Name !== 'RadioButton') {
                    this.updateDataInSession(this.currentTarget);
                }
            }
        }
    };
    /**
     * @param {any} number - It describes about the number
     * @private
     * @returns {number} - number
     */
    FormFields.prototype.ConvertPointToPixel = function (number) {
        return (number * (96 / 72));
    };
    /**
     * @private
     * @returns {void}
     */
    FormFields.prototype.destroy = function () {
        this.currentTarget = null;
        this.readOnlyCollection = [];
        if (this.pdfViewerBase && this.pdfViewerBase.signatureModule) {
            this.pdfViewerBase.signatureModule.destroy();
        }
    };
    /**
     * @private
     * @returns {string} - string
     */
    FormFields.prototype.getModuleName = function () {
        return 'FormFields';
    };
    /**
     * @private
     * @param {any} text - It describes about the text
     * @param {any} font - It describes about the font
     * @param {any} fontFamily - It describes about the font family
     * @returns {number} - number
     */
    FormFields.prototype.getTextWidth = function (text, font, fontFamily) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var fontName;
        if (font) {
            fontName = font + 'px' + ' ' + fontFamily;
        }
        context.font = fontName || getComputedStyle(document.body).font;
        var textWidth = context.measureText(text).width;
        this.pdfViewerBase.releaseCanvas(canvas);
        return textWidth;
    };
    /**
     * @private
     * @param {number} fontSize - Font size.
     * @returns {number} - Returns the font size.
     */
    FormFields.prototype.getFontSize = function (fontSize) {
        return fontSize;
    };
    return FormFields;
}());
export { FormFields };
