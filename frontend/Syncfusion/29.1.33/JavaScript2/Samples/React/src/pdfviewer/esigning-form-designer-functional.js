"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_base_1 = require("@syncfusion/ej2-base");
function ESignFormDesigner() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        defaultZoomFactor = true;
        initializeDraggable(textBtn.current.element, 'Textbox');
        initializeDraggable(signatureBtn.current.element, 'SignatureField');
        initializeDraggable(passwordBtn.current.element, 'Password');
        initializeDraggable(checkBoxBtn.current.element, 'CheckBox');
        initializeDraggable(radioBtn.current.element, 'RadioButton');
        initializeDraggable(dropdownBtn.current.element, 'DropDown');
        initializeDraggable(listBoxBtn.current.element, 'ListBox');
        initializeDraggable(initialBtn.current.element, 'InitialField');
        defaultZoomFactor = false;
    }, []);
    var viewer = React.useRef(null);
    var userMenu = React.useRef(null);
    var sidebarobj = React.useRef(null);
    var textBtn = React.useRef(null);
    var signatureBtn = React.useRef(null);
    var passwordBtn = React.useRef(null);
    var checkBoxBtn = React.useRef(null);
    var radioBtn = React.useRef(null);
    var dropdownBtn = React.useRef(null);
    var listBoxBtn = React.useRef(null);
    var initialBtn = React.useRef(null);
    var currentUserColorId = 'ff0000';
    var currentUser = React.useRef('andrew@mycompany.com');
    var borderColor = React.useRef('1px solid red');
    var isDropped = false;
    var currentFieldType = "";
    var fieldType = "";
    var userColor = 'rgba(255, 0, 0, 0.06)';
    var defaultFieldWidth = 200;
    var defaultFieldHeight = 24;
    var checkBoxFieldSize = 20;
    var radioFieldSize = 20;
    var SignatureFieldSize = 66;
    var ListFieldSize = 66;
    var zoomFactor;
    var isMobile = ej2_base_1.Browser.isDevice;
    var defaultZoomFactor;
    var userDetails = [
        { Name: 'Andrew Fuller', Eimg: 'profile1', Mail: 'andrew@mycompany.com', fieldIds: [] },
        { Name: 'Anne Dodsworth', Eimg: 'profile2', Mail: 'anne@mycompany.com', fieldIds: [] },
    ];
    var fields = { text: 'Mail', value: 'Eimg', fieldIds: 'fieldIds' };
    var ToolbarComponentMob = function () {
        return (React.createElement("div", null,
            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: signatureBtn, className: "e-pv-e-sign-form-field-property-mob e-outline", title: "Signature", onClick: signatureClickMob },
                React.createElement("span", { className: "e-pv-handwritten-icon e-pv-icon" })),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: initialBtn, className: "e-pv-e-sign-form-field-property-mob e-outline", title: "Initial", onClick: initialClickMob },
                React.createElement("i", { className: "e-icons e-font-name" })),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: textBtn, className: 'e-pv-e-sign-form-field-property-mob e-outline', title: 'TextBox', onClick: textClickMob },
                React.createElement("i", { className: "e-icons e-text-form" })),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: passwordBtn, className: 'e-pv-e-sign-form-field-property-mob e-outline', title: 'Password', onClick: passwordClickMob },
                React.createElement("i", { className: "e-icons e-password" })),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: checkBoxBtn, className: 'e-pv-e-sign-form-field-property-mob e-outline', title: 'CheckBox', onClick: checkboxClickMob },
                React.createElement("i", { className: "e-icons e-check-box" })),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: radioBtn, className: 'e-pv-e-sign-form-field-property-mob e-outline', title: 'RadioButton', onClick: radioClickMob },
                React.createElement("i", { className: "e-icons e-radio-button" })),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: dropdownBtn, className: 'e-pv-e-sign-form-field-property-mob e-outline', title: 'DropDown', onClick: dropdownClickMob },
                React.createElement("i", { className: "e-icons e-drop-down" })),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: listBoxBtn, className: 'e-pv-e-sign-form-field-property-mob e-outline', title: 'ListBox', onClick: listboxClickMob },
                React.createElement("i", { className: "e-icons e-list-unordered" }))));
    };
    var dropdownComponent = function () {
        return (React.createElement("div", { id: 'e-pv-e-sign-user-field', style: { width: '245px', height: '37px', left: '0px' } },
            React.createElement("div", { className: 'e-pv-e-sign-user-dropdown' },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: userMenu, id: 'userMenu', select: userChange, index: 0, popupWidth: '215px', dataSource: userDetails, width: '200px', fields: fields, itemTemplate: itemTemplate, valueTemplate: valueTemplate }))));
    };
    var itemTemplate = function (data) {
        return (React.createElement("div", { style: { display: 'flex' } },
            React.createElement("img", { className: "e-pv-e-sign-empImage", style: { maxHeight: '35px', marginTop: '7px', marginLeft: '4px', borderRadius: '50%', border: "1px solid ".concat(data.Mail === 'andrew@mycompany.com' ? 'red' : 'green') }, src: 'src/pdfviewer/images/employees/' + data['Eimg'] + '.png' }),
            React.createElement("div", null,
                React.createElement("div", { className: "e-pv-e-sign-ename", style: { height: '18px', fontSize: '13px' } },
                    " ",
                    data.Name,
                    " "),
                React.createElement("div", { className: "e-pv-e-sign-job", style: { fontSize: '11px' } },
                    " ",
                    data.Mail,
                    " "))));
    };
    var valueTemplate = function (data) {
        return (React.createElement("div", { className: "e-pv-e-sign valueTemplate", style: { display: 'flex', marginLeft: '2px' } },
            React.createElement("img", { className: "e-pv-e-sign-value", style: { borderRadius: '20px', marginTop: '1px', border: borderColor.current }, src: 'src/pdfviewer/images/employees/' + data['Eimg'] + '.png', height: "30px", width: "30px", alt: "employee" }),
            React.createElement("div", null,
                React.createElement("div", { className: "e-pv-e-sign-name", style: { fontSize: '12px', marginLeft: '12px', alignContent: 'center' } },
                    " ",
                    data.Name,
                    " "),
                React.createElement("div", { className: "e-pv-e-sign-job", style: { fontSize: '10px', marginLeft: '11px', alignContent: 'center' } },
                    " ",
                    data.Mail,
                    " "))));
    };
    var signatureClickMob = function () {
        viewer.current.formDesignerModule.setFormFieldMode('SignatureField');
    };
    var initialClickMob = function () {
        viewer.current.formDesignerModule.setFormFieldMode('InitialField');
    };
    var textClickMob = function () {
        viewer.current.formDesignerModule.setFormFieldMode('Textbox');
    };
    var passwordClickMob = function () {
        viewer.current.formDesignerModule.setFormFieldMode('Password');
    };
    var checkboxClickMob = function () {
        viewer.current.formDesignerModule.setFormFieldMode('CheckBox');
    };
    var radioClickMob = function () {
        viewer.current.formDesignerModule.setFormFieldMode('RadioButton');
    };
    var dropdownClickMob = function () {
        viewer.current.formDesignerModule.setFormFieldMode('DropDown');
    };
    var listboxClickMob = function () {
        viewer.current.formDesignerModule.setFormFieldMode('ListBox');
    };
    var signatureClick = function (e) {
        if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
            viewer.current.formDesignerModule.setFormFieldMode('SignatureField');
    };
    var initialClick = function (e) {
        if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
            viewer.current.formDesignerModule.setFormFieldMode('InitialField');
    };
    var textboxClick = function (e) {
        if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
            viewer.current.formDesignerModule.setFormFieldMode('Textbox');
    };
    var passwordClick = function (e) {
        if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
            viewer.current.formDesignerModule.setFormFieldMode('Password');
    };
    var checkboxClick = function (e) {
        if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
            viewer.current.formDesignerModule.setFormFieldMode('CheckBox');
    };
    var radioClick = function (e) {
        if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
            viewer.current.formDesignerModule.setFormFieldMode('RadioButton');
    };
    var dropdownClick = function (e) {
        if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
            viewer.current.formDesignerModule.setFormFieldMode('DropDown');
    };
    var listboxClick = function (e) {
        if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
            viewer.current.formDesignerModule.setFormFieldMode('ListBox');
    };
    var initializeDraggable = function (element, field) {
        if (defaultZoomFactor) {
            zoomFactor = 1;
        }
        else {
            zoomFactor = viewer.current.viewerBase.getZoomFactor();
        }
        var left, top;
        var scaledWidth = defaultFieldWidth * zoomFactor;
        var scaledHeight = defaultFieldHeight * zoomFactor;
        switch (field) {
            case 'CheckBox':
            case 'RadioButton':
                scaledWidth = checkBoxFieldSize * zoomFactor;
                scaledHeight = checkBoxFieldSize * zoomFactor;
                left = 0;
                top = (checkBoxFieldSize / 2) * zoomFactor - (scaledHeight / 2);
                break;
            case 'ListBox':
                scaledHeight = ListFieldSize * zoomFactor;
                left = 90;
                top = (ListFieldSize / 2) * zoomFactor - (scaledHeight / 2);
                break;
            case 'SignatureField':
            case 'InitialField':
                scaledHeight = SignatureFieldSize * zoomFactor;
                left = 90;
                top = (SignatureFieldSize / 2) * zoomFactor - (scaledHeight / 2);
                break;
            default:
                scaledHeight = defaultFieldHeight * zoomFactor;
                left = 90;
                top = (defaultFieldHeight / 2) * zoomFactor - (scaledHeight / 2);
                break;
        }
        left = left / zoomFactor - (scaledWidth / 2);
        var draggable = new ej2_base_1.Draggable(element, { dragArea: '#container_pageViewContainer', drag: function (e) { return drag(e); }, helper: function (e) { return helperClone(e, field); }, dragStart: function () { return dragStart(field); }, dragStop: dragStop, clone: true, cursorAt: { left: left, top: top }, enableTailMode: true, });
    };
    var drag = function (e) {
        e.event.preventDefault();
    };
    var dragStart = function (fieldType) {
        isDropped = true;
        currentFieldType = fieldType;
    };
    var dragStop = function (e) {
        if (e.helper && e.helper.parentNode) {
            e.helper.parentNode.removeChild(e.helper);
        }
        isDropped = false;
    };
    var helperClone = function (e, fieldType) {
        if (e.sender.type == "mousemove") {
            zoomFactor = viewer.current.viewerBase.getZoomFactor();
            var cloneElement = document.createElement('div');
            cloneElement.style.width = (defaultFieldWidth * zoomFactor) + 'px';
            cloneElement.style.height = (defaultFieldHeight * zoomFactor) + 'px';
            cloneElement.style.borderRadius = '0';
            switch (fieldType) {
                case 'SignatureField':
                case 'InitialField':
                    cloneElement.style.height = (SignatureFieldSize * zoomFactor) + 'px';
                    break;
                case 'CheckBox':
                    cloneElement.style.height = (checkBoxFieldSize * zoomFactor) + 'px';
                    cloneElement.style.width = (checkBoxFieldSize * zoomFactor) + 'px';
                    break;
                case 'RadioButton':
                    cloneElement.style.height = (radioFieldSize * zoomFactor) + 'px';
                    cloneElement.style.width = (radioFieldSize * zoomFactor) + 'px';
                    cloneElement.style.borderRadius = '50%';
                    break;
                case 'ListBox':
                    cloneElement.style.height = (ListFieldSize * zoomFactor) + 'px';
                    break;
            }
            cloneElement.style.backgroundColor = currentUser.current === 'andrew@mycompany.com' ? 'rgba(255, 0, 0, 0.06)' : 'rgba(0, 128, 0, 0.06';
            cloneElement.style.zIndex = '10001';
            cloneElement.style.position = 'absolute';
            cloneElement.style.pointerEvents = 'none';
            cloneElement.style.opacity = '0.5';
            document.body.appendChild(cloneElement);
            return cloneElement;
        }
        else {
            return null;
        }
    };
    var pageClick = function (args) {
        if (isDropped) {
            isDropped = false;
            var width = defaultFieldWidth;
            var height = defaultFieldHeight;
            switch (currentFieldType) {
                case 'SignatureField':
                case 'InitialField':
                    height = SignatureFieldSize;
                    break;
                case 'CheckBox':
                case 'RadioButton':
                    width = checkBoxFieldSize;
                    height = checkBoxFieldSize;
                    break;
                case 'ListBox':
                    height = ListFieldSize;
                    break;
            }
            viewer.current.formDesignerModule.addFormField(currentFieldType, {
                bounds: { X: args.x, Y: args.y, Width: width, Height: height }
            });
        }
    };
    var addFormField = function (args) {
        userColor = currentUser.current === 'andrew@mycompany.com' ? '#ffefef' : '#eff7ef';
        if (currentUser.current === "andrew@mycompany.com") {
            viewer.current.formDesigner.updateFormField(viewer.current.retrieveFormFields()[(viewer.current.formFieldCollections).length - 1], { customData: { author: 'andrew' }, backgroundColor: userColor });
        }
        else {
            viewer.current.formDesigner.updateFormField(viewer.current.retrieveFormFields()[(viewer.current.formFieldCollections).length - 1], { customData: { author: 'anne' }, backgroundColor: userColor });
        }
        var currentUserDetails = userDetails.filter(function (userDetail) { return userDetail.Mail === currentUser; })[0];
        var currentFormField = viewer.current.formFieldCollections.filter(function (formField) { return formField.id === args.field.id; })[0];
        if (currentUserDetails)
            currentUserDetails.fieldIds.push(currentFormField);
        var signIcons = document.querySelectorAll('[id*="signIcon"]');
        signIcons.forEach(function (element) {
            if (viewer.current.zoomPercentage < 65) {
                element.style.fontSize = '5px';
            }
            else if (viewer.current.zoomPercentage <= 85 && viewer.current.zoomPercentage > 65) {
                element.style.fontSize = "7px";
            }
        });
    };
    var userChange = function (args) {
        currentUser.current = args.itemData.Mail;
        if (args.itemData.Mail == "andrew@mycompany.com") {
            borderColor.current = '1px solid red';
            currentUserColorId = 'ff0000';
        }
        else {
            borderColor.current = '1px solid green';
            currentUserColorId = '00ff00';
        }
    };
    var documentLoad = function () {
        viewer.current.designerMode = true;
    };
    var downLoadFile = function () {
        viewer.current.download();
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: 'e-pv-e-sign control-section' },
            React.createElement("div", { className: "e-pv-e-sign-property-sec" },
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "e-pv-e-sign-toolbar-user-viewer", className: "".concat(!isMobile ? 'e-pv-sign-show-toolbar ' : 'e-pv-sign-hide-toolbar') },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-download", align: "Right", text: "Download", id: "e-pv-e-sign-download", tooltipText: "downLoad", click: downLoadFile }))),
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "e-pv-e-sign-toolbar-user-viewer", className: "".concat(isMobile ? 'e-pv-sign-show-toolbar ' : 'e-pv-sign-hide-toolbar') },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { template: dropdownComponent }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-download", align: "Right", tooltipText: "downLoad", click: downLoadFile })))),
            React.createElement("div", { style: { display: "".concat(isMobile ? 'block' : 'flex'), position: 'relative' } },
                React.createElement(ej2_react_navigations_1.SidebarComponent, { style: { display: "".concat(isMobile ? 'none' : 'block') }, id: "e-pv-e-sign-defaultSidebar", ref: sidebarobj, className: "e-pv-e-sign-default-sidebar", width: "200px", enableGestures: false },
                    React.createElement("div", { className: 'e-pv-e-sign-content-wrapper', style: { marginLeft: '4px', marginTop: '14px' } },
                        React.createElement("div", { className: "e-pv-e-sign-user-label", style: { fontSize: '16px', margin: '15px 10px 5px', fontWeight: '500px' } }, "Fields"),
                        React.createElement("div", { id: 'e-pv-e-sign-user-field', style: { width: '190px', height: '37px', border: '1px solid lightgray', marginBottom: '20px' } },
                            React.createElement("div", { className: 'e-pv-e-sign-user-dropdown' },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: userMenu, id: 'e-pv-e-sign-userMenu', select: userChange, index: 0, popupWidth: '190px', width: '188px', dataSource: userDetails, fields: fields, itemTemplate: itemTemplate, valueTemplate: valueTemplate }))),
                        React.createElement("div", { style: { display: 'flex', marginLeft: '6px' } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: signatureBtn, className: 'e-pv-e-sign-form-field-property e-outline', title: 'Signature', onClick: signatureClick },
                                React.createElement("span", { className: "e-pv-handwritten-icon e-pv-icon" }),
                                React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Signature")),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: initialBtn, className: 'e-pv-e-sign-form-field-property e-outline', title: 'Initial', onClick: initialClick },
                                React.createElement("i", { className: "e-icons e-font-name" }),
                                React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Initial"))),
                        React.createElement("div", { style: { display: 'flex', marginLeft: '6px' } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: textBtn, className: 'e-pv-e-sign-form-field-property e-outline', title: 'TextBox', onClick: textboxClick },
                                React.createElement("i", { className: "e-icons e-text-form" }),
                                React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Textbox")),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: passwordBtn, className: 'e-pv-e-sign-form-field-property e-outline', title: 'Password', onClick: passwordClick },
                                React.createElement("i", { className: "e-icons e-password" }),
                                React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Password"))),
                        React.createElement("div", { style: { display: 'flex', marginLeft: '6px' } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: checkBoxBtn, className: 'e-pv-e-sign-form-field-property e-outline', title: 'CheckBox', onClick: checkboxClick },
                                React.createElement("i", { className: "e-icons e-check-box" }),
                                React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Checkbox")),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: radioBtn, className: 'e-pv-e-sign-form-field-property e-outline', title: 'RadioButton', onClick: radioClick },
                                React.createElement("i", { className: "e-icons e-radio-button" }),
                                React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Radio"))),
                        React.createElement("div", { style: { display: 'flex', marginLeft: '6px' } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: dropdownBtn, className: 'e-pv-e-sign-form-field-property e-outline', title: 'DropDown', onClick: dropdownClick },
                                React.createElement("i", { className: "e-icons e-drop-down" }),
                                React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Dropdown")),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: listBoxBtn, className: 'e-pv-e-sign-form-field-property e-outline', title: 'ListBox', onClick: listboxClick },
                                React.createElement("i", { className: "e-icons e-list-unordered" }),
                                React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Listbox"))))),
                React.createElement("div", { style: { width: "".concat(isMobile ? '100%' : 'calc(100% - 200px)') } },
                    React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { ref: viewer, id: "container", enableNavigationToolbar: false, enableAnnotationToolbar: false, enableToolbar: false, documentPath: "https://cdn.syncfusion.com/content/PDFViewer/Fill+and+Sign.pdf", resourceUrl: "https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib", zoomMode: "FitToPage", documentLoad: documentLoad, formFieldAdd: addFormField, pageClick: pageClick, downloadFileName: 'eSign_designMode.pdf', style: { height: "".concat(isMobile ? '500px' : '640px') } },
                        React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] }))),
                React.createElement("div", null,
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "e-pv-e-sign-toolbar-user-viewer-mob", overflowMode: 'Scrollable', className: "".concat(isMobile ? 'e-pv-sign-show-toolbar ' : 'e-pv-sign-hide-toolbar') },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { template: ToolbarComponentMob })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample enables the design of a PDF form that accommodates signatures from two different users. The form includes distinct fields for each user: when the first user is selected, specific fields can be added that apply only to that user. Upon switching the user via the dropdown menu, new fields can be added for the second user. The fields for each user are distinguishable by different background colors.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "More information on the PDF Viewer instantiation can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                "."))));
}
exports.default = ESignFormDesigner;
