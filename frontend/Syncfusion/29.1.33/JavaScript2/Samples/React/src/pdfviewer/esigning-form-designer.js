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
exports.ESignFormDesigner = void 0;
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ESignFormDesigner = /** @class */ (function (_super) {
    __extends(ESignFormDesigner, _super);
    function ESignFormDesigner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentUserColorId = 'ff0000';
        _this.userColor = 'rgba(255, 0, 0, 0.06)';
        _this.currentUser = ('andrew@mycompany.com');
        _this.borderColor = ('1px solid red');
        _this.userDetails = [
            { Name: 'Andrew Fuller', Eimg: 'profile1', Mail: 'andrew@mycompany.com', fieldIds: [] },
            { Name: 'Anne Dodsworth', Eimg: 'profile2', Mail: 'anne@mycompany.com', fieldIds: [] },
        ];
        _this.fields = { text: 'Mail', value: 'Eimg', fieldIds: 'fieldIds' };
        _this.defaultFieldWidth = 200;
        _this.defaultFieldHeight = 24;
        _this.checkBoxFieldSize = 20;
        _this.radioFieldSize = 20;
        _this.SignatureFieldSize = 66;
        _this.ListFieldSize = 66;
        _this.currentFieldType = '';
        _this.isDropped = false;
        _this.isMobile = ej2_base_1.Browser.isDevice;
        _this.ToolbarComponentMob = function () {
            return (React.createElement("div", null,
                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.signatureBtn = scope; }, className: "e-pv-e-sign-form-field-property-mob e-outline", title: "Signature", onClick: _this.signatureClickMob },
                    React.createElement("span", { className: "e-pv-handwritten-icon e-pv-icon", style: { fontSize: '18px' } })),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.initialBtn = scope; }, className: "e-pv-e-sign-form-field-property-mob e-outline", title: "Initial", onClick: _this.initialClickMob },
                    React.createElement("i", { className: "e-icons e-font-name", style: { fontSize: '18px' } })),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.textBtn = scope; }, className: 'e-pv-e-sign-form-field-property-mob e-outline', title: 'TextBox', onClick: _this.textClickMob },
                    React.createElement("i", { className: "e-icons e-text-form", style: { fontSize: '18px' } })),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.passwordBtn = scope; }, className: 'e-pv-e-sign-form-field-property-mob e-outline', title: 'Password', onClick: _this.passwordClickMob },
                    React.createElement("i", { className: "e-icons e-password", style: { fontSize: '18px' } })),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.checkBoxBtn = scope; }, className: 'e-pv-e-sign-form-field-property-mob e-outline', title: 'CheckBox', onClick: _this.checkboxClickMob },
                    React.createElement("i", { className: "e-icons e-check-box", style: { fontSize: '18px' } })),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.radioBtn = scope; }, className: 'e-pv-e-sign-form-field-property-mob e-outline', title: 'RadioButton', onClick: _this.radioClickMob },
                    React.createElement("i", { className: "e-icons e-radio-button", style: { fontSize: '18px' } })),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.dropdownBtn = scope; }, className: 'e-pv-e-sign-form-field-property-mob e-outline', title: 'DropDown', onClick: _this.dropdownClickMob },
                    React.createElement("i", { className: "e-icons e-drop-down", style: { fontSize: '18px' } })),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.listBoxBtn = scope; }, className: 'e-pv-e-sign-form-field-property-mob e-outline', title: 'ListBox', onClick: _this.listboxClickMob },
                    React.createElement("i", { className: "e-icons e-list-unordered", style: { fontSize: '18px' } }))));
        };
        _this.dropdownComponent = function () {
            return (React.createElement("div", { id: 'e-pv-e-sign-user-field', style: { width: '245px', height: '37px', left: '0px' } },
                React.createElement("div", { className: 'e-pv-e-sign-user-dropdown' },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (scope) { _this.userMenu = scope; }, id: 'this.userMenu', select: _this.userChange, index: 0, popupWidth: '215px', dataSource: _this.userDetails, width: '200px', fields: _this.fields, itemTemplate: _this.itemTemplate, valueTemplate: _this.valueTemplate }))));
        };
        _this.itemTemplate = function (data) {
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
        _this.valueTemplate = function (data) {
            return (React.createElement("div", { className: "e-pv-e-sign valueTemplate", style: { display: 'flex', marginLeft: '2px' } },
                React.createElement("img", { className: "e-pv-e-sign-value", style: { borderRadius: '20px', marginTop: '1px', border: _this.borderColor }, src: 'src/pdfviewer/images/employees/' + data['Eimg'] + '.png', height: "30px", width: "30px", alt: "employee" }),
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
        _this.signatureClickMob = function () {
            _this.viewer.formDesignerModule.setFormFieldMode('SignatureField');
        };
        _this.initialClickMob = function () {
            _this.viewer.formDesignerModule.setFormFieldMode('InitialField');
        };
        _this.textClickMob = function () {
            _this.viewer.formDesignerModule.setFormFieldMode('Textbox');
        };
        _this.passwordClickMob = function () {
            _this.viewer.formDesignerModule.setFormFieldMode('Password');
        };
        _this.checkboxClickMob = function () {
            _this.viewer.formDesignerModule.setFormFieldMode('CheckBox');
        };
        _this.radioClickMob = function () {
            _this.viewer.formDesignerModule.setFormFieldMode('RadioButton');
        };
        _this.dropdownClickMob = function () {
            _this.viewer.formDesignerModule.setFormFieldMode('DropDown');
        };
        _this.listboxClickMob = function () {
            _this.viewer.formDesignerModule.setFormFieldMode('ListBox');
        };
        _this.signatureClick = function (e) {
            if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
                _this.viewer.formDesignerModule.setFormFieldMode('SignatureField');
        };
        _this.initialClick = function (e) {
            if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
                _this.viewer.formDesignerModule.setFormFieldMode('InitialField');
        };
        _this.textboxClick = function (e) {
            if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
                _this.viewer.formDesignerModule.setFormFieldMode('Textbox');
        };
        _this.passwordClick = function (e) {
            if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
                _this.viewer.formDesignerModule.setFormFieldMode('Password');
        };
        _this.checkboxClick = function (e) {
            if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
                _this.viewer.formDesignerModule.setFormFieldMode('CheckBox');
        };
        _this.radioClick = function (e) {
            if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
                _this.viewer.formDesignerModule.setFormFieldMode('RadioButton');
        };
        _this.dropdownClick = function (e) {
            if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
                _this.viewer.formDesignerModule.setFormFieldMode('DropDown');
        };
        _this.listboxClick = function (e) {
            if (e === null || e === void 0 ? void 0 : e.nativeEvent.sourceCapabilities.firesTouchEvents)
                _this.viewer.formDesignerModule.setFormFieldMode('ListBox');
        };
        _this.initializeDraggable = function (element, field) {
            if (_this.defaultZoomFactor) {
                _this.zoomFactor = 1;
            }
            else {
                _this.zoomFactor = _this.viewer.viewerBase.getZoomFactor();
            }
            var left, top;
            var scaledWidth = _this.defaultFieldWidth * _this.zoomFactor;
            var scaledHeight = _this.defaultFieldHeight * _this.zoomFactor;
            switch (field) {
                case 'CheckBox':
                case 'RadioButton':
                    scaledWidth = _this.checkBoxFieldSize * _this.zoomFactor;
                    scaledHeight = _this.checkBoxFieldSize * _this.zoomFactor;
                    left = 0;
                    top = (_this.checkBoxFieldSize / 2) * _this.zoomFactor - (scaledHeight / 2);
                    break;
                case 'ListBox':
                    scaledHeight = _this.ListFieldSize * _this.zoomFactor;
                    left = 90;
                    top = (_this.ListFieldSize / 2) * _this.zoomFactor - (scaledHeight / 2);
                    break;
                case 'SignatureField':
                case 'InitialField':
                    scaledHeight = _this.SignatureFieldSize * _this.zoomFactor;
                    left = 90;
                    top = (_this.SignatureFieldSize / 2) * _this.zoomFactor - (scaledHeight / 2);
                    break;
                default:
                    scaledHeight = _this.defaultFieldHeight * _this.zoomFactor;
                    left = 90;
                    top = (_this.defaultFieldHeight / 2) * _this.zoomFactor - (scaledHeight / 2);
                    break;
            }
            left = left / _this.zoomFactor - (scaledWidth / 2);
            var draggable = new ej2_base_1.Draggable(element, { dragArea: '#container_pageViewContainer', helper: function (e) { return _this.helperClone(e, field); }, drag: function (e) { return _this.drag(e); }, dragStart: function () { return _this.dragStart(field); }, dragStop: _this.dragStop, clone: true, cursorAt: { left: left, top: top }, enableTailMode: true, });
        };
        _this.drag = function (e) {
            e.event.preventDefault();
        };
        _this.dragStart = function (fieldType) {
            _this.currentFieldType = fieldType;
            _this.isDropped = true;
        };
        _this.dragStop = function (e) {
            if (e.helper && e.helper.parentNode) {
                e.helper.parentNode.removeChild(e.helper);
            }
            _this.isDropped = false;
        };
        _this.helperClone = function (e, fieldType) {
            if (e.sender.type == "mousemove") {
                _this.zoomFactor = _this.viewer.viewerBase.getZoomFactor();
                var cloneElement = document.createElement('div');
                cloneElement.style.width = (_this.defaultFieldWidth * _this.zoomFactor) + 'px';
                cloneElement.style.height = (_this.defaultFieldHeight * _this.zoomFactor) + 'px';
                cloneElement.style.borderRadius = '0';
                switch (fieldType) {
                    case 'SignatureField':
                    case 'InitialField':
                        cloneElement.style.height = (_this.SignatureFieldSize * _this.zoomFactor) + 'px';
                        break;
                    case 'CheckBox':
                        cloneElement.style.height = (_this.checkBoxFieldSize * _this.zoomFactor) + 'px';
                        cloneElement.style.width = (_this.checkBoxFieldSize * _this.zoomFactor) + 'px';
                        break;
                    case 'RadioButton':
                        cloneElement.style.height = (_this.radioFieldSize * _this.zoomFactor) + 'px';
                        cloneElement.style.width = (_this.radioFieldSize * _this.zoomFactor) + 'px';
                        cloneElement.style.borderRadius = '50%';
                        break;
                    case 'ListBox':
                        cloneElement.style.height = (_this.ListFieldSize * _this.zoomFactor) + 'px';
                        break;
                }
                cloneElement.style.backgroundColor = _this.currentUser === 'andrew@mycompany.com' ? '#ffefef' : '#eff7ef';
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
        _this.pageClick = function (args) {
            var _a;
            if (_this.isDropped) {
                _this.isDropped = false;
                var width = _this.defaultFieldWidth;
                var height = _this.defaultFieldHeight;
                switch (_this.currentFieldType) {
                    case 'SignatureField':
                    case 'InitialField':
                        height = _this.SignatureFieldSize;
                        break;
                    case 'CheckBox':
                    case 'RadioButton':
                        width = _this.checkBoxFieldSize;
                        height = _this.checkBoxFieldSize;
                        break;
                    case 'ListBox':
                        height = _this.ListFieldSize;
                        break;
                }
                (_a = _this.viewer) === null || _a === void 0 ? void 0 : _a.formDesignerModule.addFormField(_this.currentFieldType, {
                    bounds: { X: args.x, Y: args.y, Width: width, Height: height }
                });
            }
        };
        _this.addFormField = function (args) {
            _this.userColor = _this.currentUser === 'andrew@mycompany.com' ? 'rgba(255, 0, 0, 0.06)' : 'rgba(0, 128, 0, 0.06)';
            if (_this.currentUser === "andrew@mycompany.com") {
                _this.viewer.formDesigner.updateFormField(_this.viewer.retrieveFormFields()[(_this.viewer.formFieldCollections).length - 1], { customData: { author: 'andrew' }, backgroundColor: _this.userColor });
            }
            else {
                _this.viewer.formDesigner.updateFormField(_this.viewer.retrieveFormFields()[(_this.viewer.formFieldCollections).length - 1], { customData: { author: 'anne' }, backgroundColor: _this.userColor });
            }
            var currentUserDetails = _this.userDetails.filter(function (userDetail) { return userDetail.Mail === _this.currentUser; })[0];
            var currentFormField = _this.viewer.formFieldCollections.filter(function (formField) { return formField.id === args.field.id; })[0];
            if (currentUserDetails)
                currentUserDetails.fieldIds.push(currentFormField);
            var signIcons = document.querySelectorAll('[id*="signIcon"]');
            signIcons.forEach(function (element) {
                if (_this.viewer.zoomPercentage < 65) {
                    element.style.fontSize = '5px';
                }
                else if (_this.viewer.zoomPercentage <= 85 && _this.viewer.zoomPercentage > 65) {
                    element.style.fontSize = "7px";
                }
            });
        };
        _this.userChange = function (args) {
            _this.currentUser = args.itemData.Mail;
            if (args.itemData.Mail == "andrew@mycompany.com") {
                _this.borderColor = '1px solid red';
                _this.currentUserColorId = 'ff0000';
            }
            else {
                _this.borderColor = '1px solid green';
                _this.currentUserColorId = '00ff00';
            }
        };
        _this.documentLoad = function () {
            _this.viewer.designerMode = true;
        };
        _this.downLoadFile = function () {
            _this.viewer.download();
        };
        return _this;
    }
    ESignFormDesigner.prototype.componentDidMount = function () {
        this.defaultZoomFactor = true;
        this.initializeDraggable(this.textBtn.element, 'Textbox');
        this.initializeDraggable(this.signatureBtn.element, 'SignatureField');
        this.initializeDraggable(this.passwordBtn.element, 'Password');
        this.initializeDraggable(this.checkBoxBtn.element, 'CheckBox');
        this.initializeDraggable(this.radioBtn.element, 'RadioButton');
        this.initializeDraggable(this.dropdownBtn.element, 'DropDown');
        this.initializeDraggable(this.listBoxBtn.element, 'ListBox');
        this.initializeDraggable(this.initialBtn.element, 'InitialField');
        this.defaultZoomFactor = false;
    };
    ESignFormDesigner.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'e-pv-e-sign control-section' },
                React.createElement("div", { className: "e-pv-e-sign-property-sec" },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "e-pv-e-sign-toolbar-user-viewer", className: "".concat(!this.isMobile ? 'e-pv-sign-show-toolbar ' : '.e-pv-sign-hide-toolbar') },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-download", align: "Right", text: "Download", id: "e-pv-e-sign-download", tooltipText: "downLoad", click: this.downLoadFile }))),
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "e-pv-e-sign-toolbar-user-viewer", className: "".concat(this.isMobile ? 'e-pv-sign-show-toolbar ' : '.e-pv-sign-hide-toolbar') },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { template: this.dropdownComponent }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-download", align: "Right", tooltipText: "downLoad", click: this.downLoadFile })))),
                React.createElement("div", { style: { display: "".concat(this.isMobile ? 'block' : 'flex'), position: 'relative' } },
                    React.createElement(ej2_react_navigations_1.SidebarComponent, { style: { display: "".concat(this.isMobile ? 'none' : 'block') }, id: "e-pv-e-sign-defaultSidebar", ref: function (scope) { _this.sidebarobj = scope; }, className: "e-pv-e-sign default-sidebar", width: "200px", enableGestures: false },
                        React.createElement("div", { className: 'e-pv-e-sign-content-wrapper', style: { marginLeft: '4px', marginTop: '14px' } },
                            React.createElement("div", { className: "e-pv-e-sign-user-label", style: { fontSize: '16px', margin: '15px 10px 5px', fontWeight: '500px' } }, "Fields"),
                            React.createElement("div", { id: 'e-pv-e-sign-user-field', style: { width: '190px', height: '37px', border: '1px solid lightgray', marginBottom: '20px' } },
                                React.createElement("div", { className: 'e-pv-e-sign-user-dropdown' },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (scope) { _this.userMenu = scope; }, id: 'e-pv-e-sign-userMenu', select: this.userChange, index: 0, popupWidth: '190px', dataSource: this.userDetails, width: '188px', fields: this.fields, itemTemplate: this.itemTemplate, valueTemplate: this.valueTemplate }))),
                            React.createElement("div", { style: { display: 'flex', marginLeft: '6px' } },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.signatureBtn = scope; }, className: 'e-pv-e-sign-form-field-property e-outline', title: 'Signature', onClick: this.signatureClick },
                                    React.createElement("span", { className: "e-pv-handwritten-icon e-pv-icon", style: { fontSize: '18px' } }),
                                    React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Signature")),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.initialBtn = scope; }, className: 'e-pv-e-sign-form-field-property e-outline', title: 'Initial', onClick: this.initialClick },
                                    React.createElement("i", { className: "e-icons e-font-name", style: { fontSize: '18px' } }),
                                    React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Initial"))),
                            React.createElement("div", { style: { display: 'flex', marginLeft: '6px' } },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.textBtn = scope; }, className: 'e-pv-e-sign-form-field-property e-outline', title: 'TextBox', onClick: this.textboxClick },
                                    React.createElement("i", { className: "e-icons e-text-form", style: { fontSize: '18px' } }),
                                    React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Textbox")),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.passwordBtn = scope; }, className: 'e-pv-e-sign-form-field-property e-outline', title: 'Password', onClick: this.passwordClick },
                                    React.createElement("i", { className: "e-icons e-password", style: { fontSize: '18px' } }),
                                    React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Password"))),
                            React.createElement("div", { style: { display: 'flex', marginLeft: '6px' } },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.checkBoxBtn = scope; }, className: 'e-pv-e-sign-form-field-property e-outline', title: 'CheckBox', onClick: this.checkboxClick },
                                    React.createElement("i", { className: "e-icons e-check-box", style: { fontSize: '18px' } }),
                                    React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Checkbox")),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.radioBtn = scope; }, className: 'e-pv-e-sign-form-field-property e-outline', title: 'RadioButton', onClick: this.radioClick },
                                    React.createElement("i", { className: "e-icons e-radio-button", style: { fontSize: '18px' } }),
                                    React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Radio"))),
                            React.createElement("div", { style: { display: 'flex', marginLeft: '6px' } },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.dropdownBtn = scope; }, className: 'e-pv-e-sign-form-field-property e-outline', title: 'DropDown', onClick: this.dropdownClick },
                                    React.createElement("i", { className: "e-icons e-drop-down", style: { fontSize: '18px' } }),
                                    React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Dropdown")),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.listBoxBtn = scope; }, className: 'e-pv-e-sign-form-field-property e-outline', title: 'ListBox', onClick: this.listboxClick },
                                    React.createElement("i", { className: "e-icons e-list-unordered", style: { fontSize: '18px' } }),
                                    React.createElement("span", { style: { fontSize: '12px', marginTop: '11px' } }, "Listbox")))))),
                React.createElement("div", { style: { width: "".concat(this.isMobile ? '100%' : 'calc(100% - 200px)') } },
                    React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { ref: function (scope) { _this.viewer = scope; }, id: "container", enableNavigationToolbar: false, enableAnnotationToolbar: false, enableToolbar: false, documentPath: "https://cdn.syncfusion.com/content/PDFViewer/Fill+and+Sign.pdf", resourceUrl: "https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib", zoomMode: "FitToPage", documentLoad: this.documentLoad, formFieldAdd: this.addFormField, pageClick: this.pageClick, downloadFileName: 'eSign_designMode.pdf', style: { 'height': '640px' } },
                        React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] }))),
                React.createElement("div", null,
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "e-pv-e-sign-toolbar-user-viewer-mob", className: "".concat(this.isMobile ? 'e-pv-sign-show-toolbar ' : 'e-pv-sign-hide-toolbar') },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { template: this.ToolbarComponentMob }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample enables two different users to sign the document. The first user must fill out and sign their designated fields, which are visible only to them. Once the first user has completed their section, the second user can be selected to fill out and sign their own fields. After both users have signed, the document can be finalized.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "More information on the PDF Viewer instantiation can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                    "."))));
    };
    return ESignFormDesigner;
}(sample_base_1.SampleBase));
exports.ESignFormDesigner = ESignFormDesigner;
