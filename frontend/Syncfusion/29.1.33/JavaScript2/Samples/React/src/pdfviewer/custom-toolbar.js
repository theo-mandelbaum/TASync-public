"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomToolbar = void 0;
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
var viewer;
var CustomToolbar = /** @class */ (function (_super) {
    __extends(CustomToolbar, _super);
    function CustomToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentPageNumber = '1';
        _this.fileName = '';
        _this.searchText = '';
        _this.prevMatchCase = false;
        _this.isInkEnabled = false;
        _this.searchActive = false;
        return _this;
    }
    CustomToolbar.prototype.componentDidMount = function () {
        viewer = document.getElementById('container').ej2_instances[0];
    };
    CustomToolbar.prototype.stampTemplate = function () {
        var onItemSelect = function (args) {
            var stampId = args.element.id;
            var stampText = args.element.innerText;
            if (stampId === 'Dynamic' && stampText != null) {
                if (stampText === 'Revised') {
                    viewer.annotation.setAnnotationMode('Stamp', ej2_react_pdfviewer_1.DynamicStampItem.Revised);
                }
                else if (stampText == 'Reviewed') {
                    viewer.annotation.setAnnotationMode('Stamp', ej2_react_pdfviewer_1.DynamicStampItem.Reviewed);
                }
                else if (stampText == 'Received') {
                    viewer.annotation.setAnnotationMode('Stamp', ej2_react_pdfviewer_1.DynamicStampItem.Received);
                }
                else if (stampText == 'Confidential') {
                    viewer.annotation.setAnnotationMode('Stamp', ej2_react_pdfviewer_1.DynamicStampItem.Confidential);
                }
                else if (stampText == 'Approved') {
                    viewer.annotation.setAnnotationMode('Stamp', ej2_react_pdfviewer_1.DynamicStampItem.Approved);
                }
                else if (stampText == 'NotApproved') {
                    viewer.annotation.setAnnotationMode('Stamp', ej2_react_pdfviewer_1.DynamicStampItem.NotApproved);
                }
            }
            if (stampId === 'Sign Here' && stampText != null) {
                if (stampText === 'Witness') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, ej2_react_pdfviewer_1.SignStampItem.Witness);
                }
                else if (stampText == 'Initial Here') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, ej2_react_pdfviewer_1.SignStampItem.InitialHere);
                }
                else if (stampText == 'Sign Here') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, ej2_react_pdfviewer_1.SignStampItem.SignHere);
                }
                else if (stampText == 'Accepted') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, ej2_react_pdfviewer_1.SignStampItem.Accepted);
                }
                else if (stampText == 'Rejected') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, ej2_react_pdfviewer_1.SignStampItem.Rejected);
                }
            }
            if (stampId === 'Standard Business' && stampText != null) {
                if (stampText === 'Approved') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, undefined, ej2_react_pdfviewer_1.StandardBusinessStampItem.Approved);
                }
                else if (stampText == 'Not Approved') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, undefined, ej2_react_pdfviewer_1.StandardBusinessStampItem.NotApproved);
                }
                else if (stampText == 'Draft') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, undefined, ej2_react_pdfviewer_1.StandardBusinessStampItem.Draft);
                }
                else if (stampText == 'Final') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, undefined, ej2_react_pdfviewer_1.StandardBusinessStampItem.Final);
                }
                else if (stampText == 'Completed') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, undefined, ej2_react_pdfviewer_1.StandardBusinessStampItem.Completed);
                }
                else if (stampText == 'Confidential') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, undefined, ej2_react_pdfviewer_1.StandardBusinessStampItem.Confidential);
                }
                else if (stampText == 'For Public Release') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, undefined, ej2_react_pdfviewer_1.StandardBusinessStampItem.ForPublicRelease);
                }
                else if (stampText == 'Not For Public Release') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, undefined, ej2_react_pdfviewer_1.StandardBusinessStampItem.NotForPublicRelease);
                }
                else if (stampText == 'For Comment') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, undefined, ej2_react_pdfviewer_1.StandardBusinessStampItem.ForComment);
                }
                else if (stampText == 'Void') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, undefined, ej2_react_pdfviewer_1.StandardBusinessStampItem.Void);
                }
                else if (stampText == 'Preliminary Results') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, undefined, ej2_react_pdfviewer_1.StandardBusinessStampItem.PreliminaryResults);
                }
                else if (stampText == 'Information Only') {
                    viewer.annotation.setAnnotationMode('Stamp', undefined, undefined, ej2_react_pdfviewer_1.StandardBusinessStampItem.InformationOnly);
                }
            }
        };
        var data = [
            {
                iconCss: 'e-icons e-stamp',
                items: [
                    {
                        text: 'Dynamic',
                        items: [
                            { text: 'Revised', id: 'Dynamic' },
                            { text: 'Reviewed', id: 'Dynamic' },
                            { text: 'Received', id: 'Dynamic' },
                            { text: 'Confidential', id: 'Dynamic' },
                            { text: 'Approved', id: 'Dynamic' },
                            { text: 'Not Approved', id: 'Dynamic' },
                        ],
                    },
                    {
                        text: 'Sign Here',
                        items: [
                            { text: 'Witness', id: 'Sign Here' },
                            { text: 'Initial Here', id: 'Sign Here' },
                            { text: 'Sign Here', id: 'Sign Here' },
                            { text: 'Accepted', id: 'Sign Here' },
                            { text: 'Rejected', id: 'Sign Here' },
                        ],
                    },
                    {
                        text: 'Standard Business',
                        items: [
                            { text: 'Approved', id: 'Standard Business' },
                            { text: 'Not Approved', id: 'Standard Business' },
                            { text: 'Draft', id: 'Standard Business' },
                            { text: 'Final', id: 'Standard Business' },
                            { text: 'Completed', id: 'Standard Business' },
                            { text: 'Confidential', id: 'Standard Business' },
                            { text: 'For Public Release', id: 'Standard Business' },
                            { text: 'Not For Public Release', id: 'Standard Business' },
                            { text: 'For Comment', id: 'Standard Business' },
                            { text: 'Void', id: 'Standard Business' },
                            { text: 'Preliminary Results', id: 'Standard Business' },
                            { text: 'Information Only', id: 'Standard Business' },
                        ],
                    },
                ],
            },
        ];
        return (React.createElement(ej2_react_navigations_1.MenuComponent, { items: data, showItemOnClick: true, select: onItemSelect }));
    };
    CustomToolbar.prototype.signTemplate = function () {
        var signMenu = [{
                iconCss: "e-icons e-signature",
                items: [
                    { text: "Add Signature" },
                    { text: "Add Initial" },
                ]
            }];
        var onsignatureCilck = function (event) {
            var signatureText = event.element.innerText;
            var editAnnotationToolbar = document.getElementById('editAnnotationToolbar');
            if (editAnnotationToolbar.style.display === 'block') {
                if (signatureText === 'Add Signature') {
                    viewer.annotation.setAnnotationMode('HandWrittenSignature');
                }
                else if (signatureText === 'Add Initial') {
                    viewer.annotation.setAnnotationMode('Initial');
                }
            }
            var formFieldToolbar = document.getElementById('formFieldToolbar');
            if (formFieldToolbar.style.display === 'block') {
                if (signatureText === 'Add Signture') {
                    viewer.formDesignerModule.setFormFieldMode('SignatureField');
                }
                else if (signatureText === 'Add Initial') {
                    viewer.formDesignerModule.setFormFieldMode('InitialField');
                }
            }
        };
        return (React.createElement(ej2_react_navigations_1.MenuComponent, { items: signMenu, showItemOnClick: true, select: onsignatureCilck }));
    };
    CustomToolbar.prototype.formFieldSignTemplate = function () {
        var signMenu = [{
                iconCss: "e-icons e-signature",
                items: [
                    { text: "Add Signature" },
                    { text: "Add Initial" },
                ]
            }];
        var onsignatureCilck = function (event) {
            var signatureText = event.element.innerText;
            var editAnnotationToolbar = document.getElementById('editAnnotationToolbar');
            if (editAnnotationToolbar.style.display === 'block') {
                if (signatureText === 'Add Signature') {
                    viewer.annotation.setAnnotationMode('HandWrittenSignature');
                }
                else if (signatureText === 'Add Initial') {
                    viewer.annotation.setAnnotationMode('Initial');
                }
            }
            var formFieldToolbar = document.getElementById('formFieldToolbar');
            if (formFieldToolbar.style.display === 'block') {
                if (signatureText === 'Add Signature') {
                    viewer.formDesignerModule.setFormFieldMode('SignatureField');
                }
                else if (signatureText === 'Add Initial') {
                    viewer.formDesignerModule.setFormFieldMode('InitialField');
                }
            }
        };
        return (React.createElement(ej2_react_navigations_1.MenuComponent, { items: signMenu, showItemOnClick: true, select: onsignatureCilck }));
    };
    CustomToolbar.prototype.rendereComplete = function () {
        this.wireEvent();
    };
    CustomToolbar.prototype.render = function () {
        var _this = this;
        function template() {
            return (React.createElement("div", { style: { margin: '0px 6px' } },
                React.createElement("span", { className: 'e-pv-total-page-number', id: 'totalPage' }, "of 0")));
        }
        function inputTemplate() {
            return (React.createElement("div", null,
                React.createElement("input", { type: 'text', className: 'e-input-group e-pv-current-page-number', id: 'currentPage' })));
        }
        this.wireEvent = function () {
            var inputElement = document.getElementById('currentPage');
            inputElement.addEventListener('click', currentPageClicked.bind(this));
            inputElement.addEventListener('keypress', onCurrentPageBoxKeypress.bind(this));
            inputElement.value = this.currentPageNumber;
        };
        var disableInkAnnotation = function (args) {
            if (this.isInkEnabled) {
                viewer.annotation.setAnnotationMode("None");
                this.isInkEnabled = false;
            }
        };
        var clickHandler = function (args) {
            switch (args.item.id) {
                case 'file_Open':
                    {
                        disableInkAnnotation.bind(this);
                        var fileUpload = document.getElementById('fileUpload');
                        fileUpload.click();
                        var editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
                        if (editAnnotationToolbarElement.style.display === 'block')
                            editAnnotationToolbarElement.style.display = 'none';
                        var textSearchToolbarElement_1 = document.getElementById('textSearchToolbar');
                        if (textSearchToolbarElement_1.style.display === 'block')
                            textSearchToolbarElement_1.style.display = 'none';
                        var formFieldToolbarElement_1 = document.getElementById('formFieldToolbar');
                        if (formFieldToolbarElement_1.style.display === 'block') {
                            formFieldToolbarElement_1.style.display = 'none';
                            viewer.designerMode = false;
                        }
                    }
                    break;
                case 'save':
                    {
                        disableInkAnnotation.bind(this);
                        var editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
                        if (editAnnotationToolbarElement.style.display == 'block')
                            editAnnotationToolbarElement.style.display = 'none';
                        var textSearchToolbarElement_2 = document.getElementById('textSearchToolbar');
                        if (textSearchToolbarElement_2.style.display == 'block')
                            textSearchToolbarElement_2.style.display = 'none';
                        var formFieldToolbarElement_2 = document.getElementById('formFieldToolbar');
                        if (formFieldToolbarElement_2.style.display == 'block') {
                            formFieldToolbarElement_2.style.display = 'none';
                            viewer.designerMode = false;
                        }
                        viewer.download();
                    }
                    break;
                case 'previous_page':
                    disableInkAnnotation.bind(this);
                    viewer.navigation.goToPreviousPage();
                    break;
                case 'next_page':
                    disableInkAnnotation.bind(this);
                    viewer.navigation.goToNextPage();
                    break;
                case 'fit_to_page':
                    viewer.magnification.fitToPage();
                    break;
                case 'zoom_in':
                    {
                        viewer.magnification.zoomIn();
                        var editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
                        if (editAnnotationToolbarElement.style.display === 'block')
                            editAnnotationToolbarElement.style.display = 'none';
                        var textSearchToolbarElement_3 = document.getElementById('textSearchToolbar');
                        if (textSearchToolbarElement_3.style.display === 'block')
                            textSearchToolbarElement_3.style.display = 'none';
                        var formFieldToolbarElement_3 = document.getElementById('formFieldToolbar');
                        if (formFieldToolbarElement_3.style.display === 'block') {
                            formFieldToolbarElement_3.style.display = 'none';
                            viewer.designerMode = false;
                        }
                    }
                    break;
                case 'zoom_out':
                    {
                        viewer.magnification.zoomOut();
                        var editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
                        if (editAnnotationToolbarElement.style.display === 'block')
                            editAnnotationToolbarElement.style.display = 'none';
                        var textSearchToolbarElement_4 = document.getElementById('textSearchToolbar');
                        if (textSearchToolbarElement_4.style.display === 'block')
                            textSearchToolbarElement_4.style.display = 'none';
                        var formFieldToolbarElement_4 = document.getElementById('formFieldToolbar');
                        if (formFieldToolbarElement_4.style.display === 'block') {
                            formFieldToolbarElement_4.style.display = 'none';
                            viewer.designerMode = false;
                        }
                    }
                    break;
                case 'text_selection_tool':
                    {
                        disableInkAnnotation.bind(this);
                        viewer.interactionMode = 'TextSelection';
                        var editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
                        if (editAnnotationToolbarElement.style.display === 'block')
                            editAnnotationToolbarElement.style.display = 'none';
                        var textSearchToolbarElement_5 = document.getElementById('textSearchToolbar');
                        if (textSearchToolbarElement_5.style.display === 'block')
                            textSearchToolbarElement_5.style.display = 'none';
                        var formFieldToolbarElement_5 = document.getElementById('formFieldToolbar');
                        if (formFieldToolbarElement_5.style.display === 'block') {
                            formFieldToolbarElement_5.style.display = 'none';
                            viewer.designerMode = false;
                        }
                    }
                    break;
                case 'pan_tool':
                    {
                        disableInkAnnotation.bind(this);
                        viewer.interactionMode = 'Pan';
                        var editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
                        if (editAnnotationToolbarElement.style.display === 'block')
                            editAnnotationToolbarElement.style.display = 'none';
                        var textSearchToolbarElement_6 = document.getElementById('textSearchToolbar');
                        if (textSearchToolbarElement_6.style.display === 'block')
                            textSearchToolbarElement_6.style.display = 'none';
                        var formFieldToolbarElement_6 = document.getElementById('formFieldToolbar');
                        if (formFieldToolbarElement_6.style.display === 'block') {
                            formFieldToolbarElement_6.style.display = 'none';
                            viewer.designerMode = false;
                        }
                    }
                    break;
                case 'find_text': {
                    disableInkAnnotation.bind(this);
                    var editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
                    if (editAnnotationToolbarElement.style.display === 'block')
                        editAnnotationToolbarElement.style.display = 'none';
                    var textSearchToolbarElement_7 = document.getElementById('textSearchToolbar');
                    if (textSearchToolbarElement_7.style.display === 'block')
                        textSearchToolbarElement_7.style.display = 'none';
                    else
                        textSearchToolbarElement_7.style.display = 'block';
                    var formFieldToolbarElement_7 = document.getElementById('formFieldToolbar');
                    if (formFieldToolbarElement_7.style.display === 'block') {
                        formFieldToolbarElement_7.style.display = 'none';
                        viewer.designerMode = false;
                    }
                    break;
                }
                case 'print':
                    {
                        disableInkAnnotation.bind(this);
                        viewer.print.print();
                        var editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
                        if (editAnnotationToolbarElement.style.display == 'block')
                            editAnnotationToolbarElement.style.display = 'none';
                        var textSearchToolbarElement_8 = document.getElementById('textSearchToolbar');
                        if (textSearchToolbarElement_8.style.display == 'block')
                            textSearchToolbarElement_8.style.display = 'none';
                        var formFieldToolbarElement_8 = document.getElementById('formFieldToolbar');
                        if (formFieldToolbarElement_8.style.display == 'block') {
                            formFieldToolbarElement_8.style.display = 'none';
                            viewer.designerMode = false;
                        }
                    }
                    break;
                case 'highlights':
                    disableInkAnnotation.bind(this);
                    viewer.annotationModule.setAnnotationMode('Highlight');
                    break;
                case 'underline':
                    disableInkAnnotation.bind(this);
                    viewer.annotationModule.setAnnotationMode('Underline');
                    break;
                case 'strikethrough':
                    disableInkAnnotation.bind(this);
                    viewer.annotationModule.setAnnotationMode('Strikethrough');
                    break;
                case 'edit_annotation':
                    disableInkAnnotation.bind(this);
                    var formFieldToolbarElement = document.getElementById('formFieldToolbar');
                    if (formFieldToolbarElement.style.display === 'block') {
                        formFieldToolbarElement.style.display = 'none';
                        viewer.designerMode = false;
                    }
                    var textSearchToolbarElement = document.getElementById('textSearchToolbar');
                    if (textSearchToolbarElement.style.display === 'block')
                        textSearchToolbarElement.style.display = 'none';
                    var editAnnotationToolbar = document.getElementById('editAnnotationToolbar');
                    if (editAnnotationToolbar !== null) {
                        if (editAnnotationToolbar.style.display === 'block') {
                            editAnnotationToolbar.style.display = 'none';
                        }
                        else {
                            editAnnotationToolbar.style.display = 'block';
                        }
                    }
                    break;
                case 'line':
                    disableInkAnnotation.bind(this);
                    viewer.annotationModule.setAnnotationMode('Line');
                    break;
                case 'arrow':
                    disableInkAnnotation.bind(this);
                    viewer.annotationModule.setAnnotationMode('Arrow');
                    break;
                case 'rectangle':
                    disableInkAnnotation.bind(this);
                    viewer.annotationModule.setAnnotationMode('Rectangle');
                    break;
                case 'circle':
                    disableInkAnnotation.bind(this);
                    viewer.annotationModule.setAnnotationMode('Circle');
                    break;
                case 'polygon':
                    disableInkAnnotation.bind(this);
                    viewer.annotationModule.setAnnotationMode('Polygon');
                    break;
                case 'calibrate_distance':
                    disableInkAnnotation.bind(this);
                    viewer.annotationModule.setAnnotationMode('Distance');
                    break;
                case 'calibrate_perimeter':
                    disableInkAnnotation.bind(this);
                    viewer.annotation.setAnnotationMode('Perimeter');
                    break;
                case 'calibrate_area':
                    disableInkAnnotation.bind(this);
                    viewer.annotation.setAnnotationMode('Area');
                    break;
                case 'calibrate_radius':
                    disableInkAnnotation.bind(this);
                    viewer.annotation.setAnnotationMode('Radius');
                    break;
                case 'calibrate_volume':
                    disableInkAnnotation.bind(this);
                    viewer.annotation.setAnnotationMode('Volume');
                    break;
                case 'freeText':
                    disableInkAnnotation.bind(this);
                    viewer.annotationModule.setAnnotationMode('FreeText');
                    break;
                case 'signature':
                case 'formField_signature':
                    {
                        var textSearchToolbarElement_9 = document.getElementById('textSearchToolbar');
                        if (textSearchToolbarElement_9.style.display === 'block') {
                            textSearchToolbarElement_9.style.display = 'none';
                        }
                    }
                    break;
                case 'ink':
                    if (!this.isInkEnabled) {
                        viewer.annotation.setAnnotationMode("Ink");
                        this.isInkEnabled = true;
                    }
                    else {
                        viewer.annotation.setAnnotationMode("None");
                        this.isInkEnabled = false;
                    }
                    viewer.annotationModule.setAnnotationMode('Ink');
                    break;
                case 'textbox':
                    viewer.formDesignerModule.setFormFieldMode('Textbox');
                    break;
                case 'password':
                    viewer.formDesignerModule.setFormFieldMode('Password');
                    break;
                case 'checkbok':
                    viewer.formDesignerModule.setFormFieldMode('CheckBox');
                    break;
                case 'radio_button':
                    viewer.formDesignerModule.setFormFieldMode('RadioButton');
                    break;
                case 'drop_down':
                    viewer.formDesignerModule.setFormFieldMode('DropDown');
                    break;
                case 'list_box':
                    viewer.formDesignerModule.setFormFieldMode('ListBox');
                    break;
                case 'add_form_field':
                    {
                        var editAnnotationToolbar_1 = document.getElementById('editAnnotationToolbar');
                        if (editAnnotationToolbar_1.style.display === 'block') {
                            editAnnotationToolbar_1.style.display = 'none';
                        }
                        var textSearchToolbarElement_10 = document.getElementById('textSearchToolbar');
                        if (textSearchToolbarElement_10.style.display === 'block') {
                            textSearchToolbarElement_10.style.display = 'none';
                        }
                        var formFieldToolbarElement_9 = document.getElementById('formFieldToolbar');
                        if (formFieldToolbarElement_9.style.display === 'block') {
                            formFieldToolbarElement_9.style.display = 'none';
                            viewer.designerMode = false;
                        }
                        else {
                            formFieldToolbarElement_9.style.display = 'block';
                            viewer.designerMode = true;
                        }
                    }
                    break;
            }
        };
        var updatePageNavigation = function () {
            if (this.viewer.currentPageNumber === 1) {
                this.toolbar.enableItems(document.getElementById('previous_page').parentElement, false);
                this.toolbar.enableItems(document.getElementById('next_page').parentElement, true);
            }
            else if (viewer.currentPageNumber === viewer.pageCount) {
                this.toolbar.enableItems(document.getElementById('previous_page').parentElement, true);
                this.toolbar.enableItems(document.getElementById('next_page').parentElement, false);
            }
            else {
                this.toolbar.enableItems(document.getElementById('previous_page').parentElement, true);
                this.toolbar.enableItems(document.getElementById('next_page').parentElement, true);
            }
        };
        var currentPageClicked = function (args) {
            var currentPage = document.getElementById('currentPage');
            currentPage.select();
        };
        var checkSearchActive = function (args) {
            if (viewer && viewer.textSearchModule && !this.searchActive) {
                viewer.textSearchModule.clearAllOccurrences();
            }
        };
        var onPageChange = function (args) {
            this.currentPageNumber = viewer.currentPageNumber.toString();
            var inputElement = document.getElementById('currentPage');
            inputElement.value = this.currentPageNumber;
            updatePageNavigation.bind(this);
        };
        var onCurrentPageBoxKeypress = function (event) {
            var currentPageBox = document.getElementById('currentPage');
            if ((event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 13) {
                event.preventDefault();
                return false;
            }
            else {
                var currentPageNumber = parseInt(currentPageBox.value);
                if (event.which === 13) {
                    if (currentPageNumber > 0 && currentPageNumber <= viewer.pageCount) {
                        viewer.navigation.goToPage(currentPageNumber);
                    }
                    else {
                        currentPageBox.value = viewer.currentPageNumber.toString();
                    }
                }
                return true;
            }
        };
        var documentLoaded = function (args) {
            document.addEventListener('click', checkSearchActive.bind(this));
            viewer = document.getElementById('container').ej2_instances[0];
            var pageCount = document.getElementById('totalPage');
            pageCount.textContent = 'of ' + viewer.pageCount;
            updatePageNavigation.bind(this);
            var inputElement = document.getElementById('currentPage');
            inputElement.addEventListener('click', currentPageClicked.bind(this));
            inputElement.addEventListener('keypress', onCurrentPageBoxKeypress.bind(this));
            inputElement.value = this.currentPageNumber;
        };
        return (React.createElement("div", null,
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "flex-container" },
                    React.createElement("label", { htmlFor: "checked", className: "switchLabel" }, " Standalone PDF Viewer "),
                    React.createElement("div", { className: "e-message render-mode-info" },
                        React.createElement("span", { className: "e-msg-icon render-mode-info-icon", title: "Turn OFF to render the PDF Viewer as server-backed" })),
                    React.createElement(ej2_react_buttons_1.SwitchComponent, { cssClass: "buttonSwitch", id: "checked", change: this.change, checked: true })),
                React.createElement("div", null,
                    React.createElement("div", { className: 'e-pdf-toolbar' },
                        React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: function (scope) { _this.toolbar = scope; }, clicked: clickHandler.bind(this) },
                            React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-folder', id: 'file_Open', tooltipText: 'Open' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-save', tooltipText: "Save", id: 'save' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-chevron-left", id: 'previous_page', tooltipText: "Previous Page", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-chevron-right", id: 'next_page', tooltipText: "Next Page", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { template: inputTemplate, tooltipText: "Page Number", type: "Input", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { template: template, align: "Center", tooltipText: "Page Number" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Separator", tooltipText: "separator", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-mouse-pointer", id: "text_selection_tool", align: "Center", tooltipText: "Text Selection tool" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-pan", id: "pan_tool", align: "Center", tooltipText: "Pan Mode" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Separator", tooltipText: "separator", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-annotation-edit", tooltipText: "Edit Annotation", id: "edit_annotation", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Separator", align: "Center", tooltipText: "separator" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-split-vertical", tooltipText: "Add and Edit Form Fields", id: "add_form_field", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-search", tooltipText: "Find Text", id: "find_text", align: "Right" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-print", tooltipText: "Print", id: 'print', align: "Right" })))),
                    React.createElement("div", { id: "editAnnotationToolbar", style: { display: 'none' } },
                        React.createElement(ej2_react_navigations_1.ToolbarComponent, { clicked: clickHandler },
                            React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-highlight-color", tooltipText: "Highlight", id: "highlights", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-underline", tooltipText: "Underline", id: "underline", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-strikethrough", tooltipText: "Strikethrough", id: "strikethrough", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Separator", tooltipText: "separator", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-line", tooltipText: "Add Line", id: "line", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-arrow-right-up", tooltipText: "Add Arrow", id: "arrow", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-rectangle", tooltipText: "Add Reactangle", id: "rectangle", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-circle", tooltipText: "Add Circle", id: "circle", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-pentagon", tooltipText: "Add Polygon", id: "polygon", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Separator", tooltipText: "separator", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-length", tooltipText: "Calibrate Distance", id: "calibrate_distance", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-perimeter", tooltipText: "Calibrate Perimeter", id: "calibrate_perimeter", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-area", tooltipText: "Calibrate Area", id: "calibrate_area", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-radius", tooltipText: "Calibrate Radius", id: "calibrate_radius", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-volume", tooltipText: "Calibrate Volume", id: "calibrate_volume", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Separator", tooltipText: "separator", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-text-annotation", tooltipText: "Free Text", id: "freeText", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Separator", tooltipText: "separator", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { template: this.stampTemplate, tooltipText: "Add Stamp", id: "stamp", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Separator", tooltipText: "separator", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { template: this.signTemplate, tooltipText: "Add Signature", id: "signature", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Separator", tooltipText: "separator", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-style", id: "ink", align: "Center" })))),
                    React.createElement("div", { id: "formFieldToolbar", style: { display: 'none' }, className: "e-tbar-btn:hover e-tbar-btn:focus" },
                        React.createElement(ej2_react_navigations_1.ToolbarComponent, { clicked: clickHandler },
                            React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-text-form", tooltipText: "Textbox", id: "textbox", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-password", tooltipText: "Password", id: "password", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-check-box", tooltipText: "Checkbok", id: "checkbok", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-radio-button", tooltipText: "Radio Button", id: "radio_button", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-drop-down", tooltipText: "Drop Down", id: "drop_down", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-list-unordered", tooltipText: "List Box", id: "list_box", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { template: this.formFieldSignTemplate, tooltipText: "ADD SIGNATURE", id: "formField_signature", align: "Center" })))),
                    React.createElement("div", { id: "textSearchToolbar", style: { display: 'none', marginLeft: '840px' } },
                        React.createElement("div", { className: "e-pv-search-bar", id: "container_search_box", style: { right: '0px' } },
                            React.createElement("div", { className: "e-pv-search-bar-elements", id: "container_search_box_elements" },
                                React.createElement("div", { className: "e-input-group e-pv-search-input", id: "container_search_input_container" },
                                    React.createElement("input", { className: "e-input", id: "container_search_input", type: "text", placeholder: "Find in document", onKeyPress: this.searchInputKeypressed, onChange: this.inputChange }),
                                    React.createElement("span", { className: "e-input-group-icon e-input-search-group-icon e-icons e-search", id: "container_search_box-icon", onClick: this.searchClickHandler })),
                                React.createElement("button", { className: "e-btn e-icon-btn e-pv-search-btn e-icons e-chevron-left", id: "container_prev_occurrence", type: "button", disabled: true, "aria-label": "Previous Search text" },
                                    React.createElement("span", { className: "e-pv-icon-search e-pv-prev-search-icon", id: "container_prev_occurrenceIcon", onClick: this.previousTextSearch })),
                                React.createElement("button", { className: "e-btn e-icon-btn e-pv-search-btn e-icons e-chevron-right", id: "container_next_occurrence", type: "button", disabled: true, "aria-label": "Next Search text" },
                                    React.createElement("span", { className: "e-pv-icon-search e-pv-next-search-icon", id: "container_next_occurrenceIcon", onClick: this.nextTextSearch }))),
                            React.createElement("div", { className: "e-pv-match-case-container", id: "container_match_case_container" },
                                React.createElement("div", { className: "e-checkbox-wrapper e-wrapper e-pv-match-case" },
                                    React.createElement("label", { htmlFor: "container_match_case" },
                                        React.createElement("input", { id: "container_match_case", type: "checkbox", className: "e-control e-checkbox e-lib", onClick: this.checkBoxChanged }),
                                        React.createElement("span", { className: "e-ripple-container", "data-ripple": "true" }),
                                        React.createElement("span", { id: "checkboxSpan", className: "e-icons e-frame" }),
                                        React.createElement("span", { className: "e-label" }, "Match case")))))),
                    React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { id: "container", ref: function (scope) { viewer = scope; }, enableToolbar: false, enableNavigationToolbar: false, enableAnnotationToolbar: false, enableCommentPanel: false, documentLoad: documentLoaded, pageChange: onPageChange, resourceUrl: "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib", documentPath: "https://cdn.syncfusion.com/content/pdf/hive-succinctly.pdf", style: { 'display': 'block', 'height': '640px' } },
                        React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer,
                                ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation] })),
                    React.createElement("input", { type: "file", id: "fileUpload", accept: ".pdf", onChange: this.readFile.bind(this), style: { 'display': 'block', 'visibility': 'hidden', 'width': '0', 'height': '0' } }),
                    React.createElement("div", { className: 'e-pdf-toolbar', id: "magnificationToolbarItems" },
                        React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "magnificationToolbar", clicked: clickHandler.bind(this) },
                            React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-pv-fit-page", id: 'fit_to_page', tooltipText: "Fit to page" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-circle-add", id: 'zoom_in', tooltipText: "Zoom in" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-circle-remove", id: 'zoom_out', tooltipText: "Zoom out" })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example illustrates the process of crafting a customized toolbar within the PDF Viewer, allowing you to incorporate specific tools tailored to your needs.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample demonstrate how to perform the PDF Viewer core functionalities using a custom toolbar.In this example, you can see PDF Viewer control API in action to perform the functionalities"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Load document - ",
                        React.createElement("code", null, "viewer.load(fileName, password)")),
                    React.createElement("li", null,
                        "Save - ",
                        React.createElement("code", null, "viewer.download()")),
                    React.createElement("li", null,
                        "Go to Previous Page - ",
                        React.createElement("code", null, "viewer.navigation.goToPreviousPage()")),
                    React.createElement("li", null,
                        "Go to Next Page - ",
                        React.createElement("code", null, "viewer.navigation.goToNextPage()")),
                    React.createElement("li", null,
                        "Go to Page - ",
                        React.createElement("code", null, "viewer.navigation.goToPage(pageindex)")),
                    React.createElement("li", null,
                        "TextSelection  - ",
                        React.createElement("code", null, "textSelection()")),
                    React.createElement("li", null,
                        "Pan  - ",
                        React.createElement("code", null, "panMode()")),
                    React.createElement("li", null,
                        "Annotation Edit - ",
                        React.createElement("code", null, "openEditAnnotation()")),
                    React.createElement("li", null,
                        "FormFields Edit - ",
                        React.createElement("code", null, "addEditFormFields()")),
                    React.createElement("li", null,
                        "Search Text - ",
                        React.createElement("code", null, "viewer.textSearch.searchText(searchText,isMatchCase)")),
                    React.createElement("li", null,
                        "Search Next - ",
                        React.createElement("code", null, "viewer.textSearch.searchNext()")),
                    React.createElement("li", null,
                        "Search Previous - ",
                        React.createElement("code", null, "viewer.textSearch.searchPrevious()")),
                    React.createElement("li", null,
                        "Cancel Search Text - ",
                        React.createElement("code", null, "viewer.textSearch.cancelTextSearch()")),
                    React.createElement("li", null,
                        "Print - ",
                        React.createElement("code", null, "viewer.print.print()")),
                    React.createElement("li", null,
                        "Fit To Page - ",
                        React.createElement("code", null, "viewer.magnification.fitToPage()")),
                    React.createElement("li", null,
                        "Zoom In - ",
                        React.createElement("code", null, "viewer.magnification.zoomIn()")),
                    React.createElement("li", null,
                        "Zoom Out - ",
                        React.createElement("code", null, "viewer.magnification.zoomOut()"))),
                React.createElement("p", null,
                    "More information on the PDF Viewer instantiation can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                    "."))));
    };
    CustomToolbar.prototype.readFile = function (evt) {
        var uploadedFiles = evt.target.files;
        var uploadedFile = uploadedFiles[0];
        this.fileName = uploadedFile.name;
        var reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        var uploadedFileName = this.fileName;
        reader.onload = function (e) {
            var uploadedFileUrl = e.currentTarget.result;
            viewer.documentPath = uploadedFileUrl;
            viewer.downloadFileName = viewer.fileName = uploadedFileName;
            var pageCount = document.getElementById('totalPage');
            pageCount.textContent = 'of ' + viewer.pageCount;
        };
    };
    CustomToolbar.prototype.change = function (args) {
        if (args.checked) {
            viewer.serviceUrl = '';
        }
        else {
            viewer.serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
        }
        viewer.dataBind();
        viewer.load(viewer.documentPath, null);
    };
    CustomToolbar.prototype.searchInputKeypressed = function (event) {
        if (event.key === 'Enter') {
            this.initiateTextSearch();
        }
    };
    CustomToolbar.prototype.initiateTextSearch = function () {
        var textsearchPrevElement = document.getElementById('container_prev_occurrence');
        var textsearchNextElement = document.getElementById('container_next_occurrence');
        var textsearchElement = document.getElementById('container_search_box-icon');
        if (textsearchPrevElement && textsearchNextElement && textsearchElement) {
            textsearchPrevElement.disabled = false;
            textsearchNextElement.disabled = false;
            textsearchElement.classList.add('e-close');
            textsearchElement.classList.remove('e-search');
            textsearchPrevElement.addEventListener("click", this.previousTextSearch);
            textsearchNextElement.addEventListener("click", this.nextTextSearch);
            if (this.searchText !== document.getElementById('container_search_input').value || this.prevMatchCase !== this.matchCase) {
                viewer.textSearch.cancelTextSearch();
                this.searchText = document.getElementById('container_search_input').value;
                this.searchActive = true;
                viewer.textSearch.searchText(this.searchText, this.matchCase);
                this.prevMatchCase = this.matchCase;
            }
            else {
                this.nextTextSearch();
            }
        }
    };
    CustomToolbar.prototype.inputChange = function () {
        viewer.textSearchModule.clearAllOccurrences();
        this.searchActive = false;
        if (document.getElementById('container_search_input').value == '') {
            this.updateSearchInputIcon(true);
            viewer.textSearch.cancelTextSearch();
            this.searchText = '';
        }
    };
    CustomToolbar.prototype.searchClickHandler = function () {
        var searchBtn = document.getElementById('container_search_box-icon');
        if (searchBtn.classList.contains('e-search')) {
            viewer.textSearch.cancelTextSearch();
            this.initiateTextSearch();
            this.updateSearchInputIcon(false);
            this.searchText = '';
        }
        else if (searchBtn.classList.contains('e-close')) {
            var searchInput = document.getElementById('container_search_input');
            this.updateSearchInputIcon(true);
            searchInput.value = '';
            searchInput.focus();
            viewer.textSearch.cancelTextSearch();
            this.searchText = '';
        }
    };
    CustomToolbar.prototype.updateSearchInputIcon = function (isEnable) {
        var searchBtn = document.getElementById('container_search_box-icon');
        if (isEnable) {
            searchBtn.classList.add('e-search');
            searchBtn.classList.remove('e-close');
        }
        else {
            searchBtn.classList.add('e-close');
            searchBtn.classList.remove('e-search');
        }
    };
    CustomToolbar.prototype.nextTextSearch = function () {
        viewer.textSearchModule.searchNext();
        this.searchActive = true;
    };
    CustomToolbar.prototype.previousTextSearch = function () {
        viewer.textSearchModule.searchPrevious();
        this.searchActive = true;
    };
    CustomToolbar.prototype.checkBoxChanged = function (event) {
        var target = event.target;
        if (target.checked) {
            var matchcaseElement = document.getElementById('container_match_case');
            if (matchcaseElement) {
                matchcaseElement.checked = true;
            }
            this.matchCase = true;
            var checkboxSpanElement = document.getElementById('checkboxSpan');
            if (checkboxSpanElement) {
                checkboxSpanElement.classList.add('e-check');
            }
        }
        else {
            this.matchCase = false;
            var checkboxSpanElement = document.getElementById('checkboxSpan');
            if (checkboxSpanElement) {
                checkboxSpanElement.classList.remove('e-check');
            }
        }
    };
    CustomToolbar.prototype.onPageChanged = function () {
        var currentPageNumber = viewer.currentPageNumber;
        var inputElement = document.getElementById('currentPage');
        inputElement.value = currentPageNumber.toString();
    };
    return CustomToolbar;
}(sample_base_1.SampleBase));
exports.CustomToolbar = CustomToolbar;
