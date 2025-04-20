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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnotationBase = void 0;
/**
 * Default PDF Viewer sample
 */
var React = require("react");
var uuid_1 = require("uuid");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var number_formatter_1 = require("@syncfusion/ej2-base/src/intl/number-formatter");
var ProgrammaticOperations = /** @class */ (function (_super) {
    __extends(ProgrammaticOperations, _super);
    function ProgrammaticOperations(props) {
        var _this = _super.call(this, props) || this;
        _this.toolbarSettings = {
            showTooltip: true,
            toolbarItems: [
                "OpenOption",
                "UndoRedoTool",
                "PageNavigationTool",
                "MagnificationTool",
                "PanTool",
                "SelectionTool",
                "CommentTool",
                "SubmitForm",
                "FormDesignerEditTool",
                "FreeTextAnnotationOption",
                "InkAnnotationOption",
                "ShapeAnnotationOption",
                "StampAnnotation",
                "SignatureOption",
                "SearchOption",
                "PrintOption",
                "DownloadOption"
            ],
            formDesignerToolbarItems: [
                "TextboxTool",
                "PasswordTool",
                "CheckBoxTool",
                "RadioButtonTool",
                "DropdownTool",
                "ListboxTool",
                "DrawSignatureTool",
                "DeleteTool"
            ]
        };
        _this.vertexTableNumberFormat = number_formatter_1.NumberFormat.numberFormatter(undefined, { maximumFractionDigits: 0 }, undefined);
        _this.selectedAnnotation = null;
        _this.commentStatusList = [
            { Status: 'None' },
            { Status: 'Accepted' },
            { Status: 'Cancelled' },
            { Status: 'Completed' },
            { Status: 'Rejected' }
        ];
        _this.commentStatusListfields = { text: 'Status' };
        _this.currentCommentStatus = 'None';
        _this.lineHeadstatusList = [
            { Type: 'None', Value: "None" },
            { Type: 'Closed Arrow', Value: "Arrow" },
            { Type: 'Open Arrow', Value: "OpenArrow" },
            { Type: 'Sqaure', Value: "Square" },
            { Type: 'Diamond', Value: "Diamond" },
            { Type: 'Round', Value: "Circle" }
        ];
        _this.lineHeadstatusfield = { text: 'Type', value: 'Value' };
        _this.inkAnnotationDataList = [
            { Type: 'Syncfusion' },
            { Type: 'PdfViewer' },
            { Type: 'Star' }
        ];
        _this.inkAnnotationfield = { text: 'Type' };
        _this.stampTypeDataList = [
            { Type: 'Dynamic' },
            { Type: 'Sign Here' },
            { Type: 'Standard Business' },
        ];
        _this.stampTypeDatafields = { text: 'Type' };
        _this.dynamicstampCommentsList = [
            { Type: 'Approved', Value: "Approved" },
            { Type: 'Confidential', Value: "Confidential" },
            { Type: 'Not Approved', Value: "NotApproved" },
            { Type: 'Received', Value: "Received" },
            { Type: 'Reviewed', Value: "Reviewed" },
            { Type: 'Revised', Value: "Revised" },
        ];
        _this.sighhereCommentsList = [
            { Type: 'Accepted', Value: "Accepted" },
            { Type: 'Initial Here', Value: "InitialHere" },
            { Type: 'Rejected', Value: "Rejected" },
            { Type: 'Sign Here', Value: "SignHere" },
            { Type: 'Witness', Value: "Witness" },
        ];
        _this.StandardBusinessStampsList = [
            { Type: 'Approved', Value: "Approved" },
            { Type: 'Not Approved', Value: 'NotApproved' },
            { Type: 'Completed', Value: "Completed" },
            { Type: 'Confidential', Value: "Confidential" },
            { Type: 'Draft', Value: "Draft" },
            { Type: 'Final', Value: "Final" },
            { Type: 'For Public Release', Value: "ForPublicRelease" },
            { Type: 'Information Only', Value: "InformationOnly" },
            { Type: 'Not For Public Release', Value: "NotForPublicRelease" },
            { Type: 'Preliminary Results', Value: "PreliminaryResults" },
            { Type: 'Void', Value: "Void" },
            { Type: 'For Comment', Value: "ForComment" }
        ];
        _this.stampCommentsTypeDatafields = { text: 'Type', value: 'Value' };
        _this.currentCommentsList = _this.dynamicstampCommentsList;
        _this.freeTextFontFamilyList = [
            { Type: 'Helvetica', Value: 'Helvetica' },
            { Type: 'Courier', Value: 'Courier' },
            { Type: 'Symbol', Value: 'Symbol' },
            { Type: 'Times New Roman', Value: 'TimesNewRoman' }
        ];
        _this.freetextFontFamilyFields = { text: 'Type', value: 'Value' };
        _this.freeTextAlignmentList = [
            { Type: 'Center', Value: 'Center' },
            { Type: 'Right', Value: 'Right' },
            { Type: 'Left', Value: 'Left' },
            { Type: 'Justify', Value: 'Justify' }
        ];
        _this.freeTextAlignmentField = { text: 'Type', value: 'Value' };
        _this.freeTextFontStyleList = [
            { Type: 'None', Value: 'None' },
            { Type: 'Bold', Value: 'Bold' },
            { Type: 'Underline', Value: 'Underline' },
            { Type: 'Italic', Value: 'Italic' },
            { Type: 'Strike through', Value: 'Strikethrough' }
        ];
        _this.freeTextFontStyleFields = { text: 'Type', value: 'Value' };
        _this.intractionsList = [
            { Type: 'None', Value: "None" },
            { Type: 'Delete', Value: "Delete" },
            { Type: 'Property Change', Value: "PropertyChange" },
            { Type: 'Move', Value: "Move" },
            { Type: 'Select', Value: "Select" },
            { Type: 'Resize', Value: "Resize" },
        ];
        _this.intractionsListfield = { dataSource: _this.intractionsList, value: 'Value', text: 'Type' };
        _this.annotationsList = [
            { className: 'Highlight', Text: 'Highlight' },
            { className: 'Underline', Text: 'Underline' },
            { className: 'Strikethrough', Text: 'Strikethrough' },
            { className: 'Line', Text: 'Line' },
            { className: 'Arrow', Text: 'Arrow' },
            { className: 'Rectangle', Text: 'Rectangle' },
            { className: 'Circle', Text: 'Circle' },
            { className: 'Polygon', Text: 'Polygon' },
            { className: 'Distance', Text: 'Distance' },
            { className: 'Perimeter', Text: 'Perimeter' },
            { className: 'Area', Text: 'Area' },
            { className: 'Radius', Text: 'Radius' },
            { className: 'Volume', Text: 'Volume' },
            { className: 'StickyNotes', Text: 'StickyNotes' },
            { className: 'Ink', Text: 'Ink' },
            { className: 'Stamp', Text: 'Stamp' },
            { className: 'CustomStamp', Text: 'CustomStamp' },
            { className: 'FreeText', Text: 'FreeText' },
        ];
        _this.annotationListFields = { text: 'Text', value: 'className' };
        _this.pdfviewerApiPath = {
            saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
            removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
        };
        _this.dropImageElement = document.getElementsByClassName('control-fluid')[0];
        _this.annotationSettings = function () { return ({
            offset: { x: _this.selectedAnnotation.x, y: _this.selectedAnnotation.y },
            isLock: _this.selectedAnnotation.isLocked,
            isPrint: _this.selectedAnnotation.isPrint,
            pageNumber: _this.selectedAnnotation.pageNumber,
            width: _this.selectedAnnotation.width,
            height: _this.selectedAnnotation.height,
            opacity: _this.selectedAnnotation.opacity / 100,
            thickness: _this.selectedAnnotation.thickness,
            strokeColor: _this.selectedAnnotation.strokeColor,
            fillColor: _this.selectedAnnotation.fillColor,
            bounds: (_this.selectedAnnotation.bounds && _this.selectedAnnotation.bounds.length > 0) ? _this.selectedAnnotation.bounds.map(function (item) { return ({ x: item.X, y: item.Y, width: item.Width, height: item.Height }); }) :
                [{
                        x: _this.selectedAnnotation.x,
                        y: _this.selectedAnnotation.y,
                        width: _this.selectedAnnotation.width,
                        height: _this.selectedAnnotation.height
                    }],
            vertexPoints: _this.selectedAnnotation.vertexPoints,
            fontFamily: _this.selectedAnnotation.fontFamily,
            fontStyle: _this.selectedAnnotation.fontStyle,
            fontSize: _this.selectedAnnotation.fontSize,
            defaultText: _this.selectedAnnotation.defaultText,
            textAlignment: _this.selectedAnnotation.alignment,
            author: _this.selectedAnnotation.author,
            setState: _this.selectedAnnotation.setState,
            note: _this.selectedAnnotation.comment,
            notes: _this.selectedAnnotation.comment,
            replyAuthor: _this.selectedAnnotation.replyAuthor,
            replyState: _this.selectedAnnotation.replyState,
            replyComment: _this.selectedAnnotation.replyComment,
            modifiedDate: _this.selectedAnnotation.modifiedDate,
            replyModifiedDate: _this.selectedAnnotation.replyModifiedDate,
            lineHeadEndStyle: _this.viewer.annotation.getArrowString(_this.selectedAnnotation.lineHeadEndStyle),
            lineHeadStartStyle: _this.viewer.annotation.getArrowString(_this.selectedAnnotation.lineHeadStartStyle),
            leaderLength: _this.selectedAnnotation.leaderLength,
            inkAnnotationType: _this.selectedAnnotation.inkAnnotationType,
            color: _this.selectedAnnotation.fillColor,
            allowedInteractions: _this.selectedAnnotation.allowedInteractions,
            dynamicStamps: _this.selectedAnnotation.dynamicStamps,
            signStamps: _this.selectedAnnotation.signStamps,
            standardBusinessStamps: _this.selectedAnnotation.standardBusinessStamps,
            path: _this.selectedAnnotation.path,
            fontColor: _this.selectedAnnotation.fontColor,
            borderColor: _this.selectedAnnotation.strokeColor,
            customStamps: [{
                    customStampImageSource: _this.selectedAnnotation.customStampImageSource,
                    customStampName: _this.selectedAnnotation.customStampName,
                }],
        }); };
        _this.RGBAtoHex = function (rgba, type) {
            var rgbaValues = rgba
                .replace("rgba", "")
                .replace("(", "")
                .replace(")", "")
                .split(",")
                .map(function (value) { return value.trim(); });
            var r = parseInt(rgbaValues[0], 10);
            var g = parseInt(rgbaValues[1], 10);
            var b = parseInt(rgbaValues[2], 10);
            var a = Math.round(parseFloat(rgbaValues[3]) * 255);
            if (type === "stroke") {
                return "#".concat(r.toString(16).padStart(2, '0')).concat(g.toString(16).padStart(2, '0')).concat(b.toString(16).padStart(2, '0'));
            }
            else {
                return "#".concat(r.toString(16).padStart(2, '0')).concat(g.toString(16).padStart(2, '0')).concat(b.toString(16).padStart(2, '0')).concat(a.toString(16).padStart(2, '0'));
            }
        };
        _this.IsRGBAColor = function (input) {
            var rgbaPattern = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(?:\.\d+)?)\)$/;
            if (input !== null) {
                return rgbaPattern.test(input);
            }
            return false;
        };
        _this.change = function (args) {
            if (args.checked) {
                _this.viewer.serviceUrl = '';
            }
            else {
                _this.viewer.serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
            }
            _this.viewer.dataBind();
            _this.viewer.load(_this.viewer.documentPath, null);
        };
        if (_this.selectedAnnotation === null) {
            _this.selectedAnnotation = new AnnotationBase();
        }
        _this.state = {
            annotationType: _this.selectedAnnotation.annotationType,
            stampType: _this.selectedAnnotation.stampType,
            stampComment: _this.selectedAnnotation.stampComment,
            pageNumber: _this.selectedAnnotation.pageNumber,
            x: _this.selectedAnnotation.x,
            y: _this.selectedAnnotation.y,
            width: _this.selectedAnnotation.width,
            height: _this.selectedAnnotation.height,
            x1: _this.selectedAnnotation.vertexX1,
            y1: _this.selectedAnnotation.vertexY1,
            x2: _this.selectedAnnotation.vertexX2,
            y2: _this.selectedAnnotation.vertexY2,
            vertexPoints: _this.selectedAnnotation.vertexPoints,
            bounds: _this.selectedAnnotation.bounds,
            strokeThickness: _this.selectedAnnotation.thickness,
            opacity: _this.selectedAnnotation.opacity,
            fillColor: _this.selectedAnnotation.fillColor,
            strokeColor: _this.selectedAnnotation.strokeColor,
            lineHeadStartStyle: _this.selectedAnnotation.lineHeadStartStyle,
            lineHeadEndStyle: _this.selectedAnnotation.lineHeadEndStyle,
            leaderLength: _this.selectedAnnotation.leaderLength,
            inkAnnotationType: _this.selectedAnnotation.inkAnnotationType,
            defaultText: _this.selectedAnnotation.defaultText,
            fontFamily: _this.selectedAnnotation.fontFamily,
            alignment: _this.selectedAnnotation.alignment,
            fontStyle: _this.selectedAnnotation.fontStyle,
            fontSize: _this.selectedAnnotation.fontSize,
            fontColor: _this.selectedAnnotation.fontColor,
            allowedInteractions: _this.selectedAnnotation.allowedInteractions,
            author: _this.selectedAnnotation.author,
            comment: _this.selectedAnnotation.comment,
            commentState: _this.selectedAnnotation.setState,
            replyAuthor: _this.selectedAnnotation.replyAuthor,
            replyComment: _this.selectedAnnotation.replyComment,
            replyState: _this.selectedAnnotation.replyState,
            replies: _this.selectedAnnotation.replies,
            showStampType: false,
            showAnnotationList: true,
            showPageNumber: true,
            showAddAnnotation: true,
            showUpdateAnnotation: false,
            showStrokeProps: true,
            showBoundsButtons: false,
            showFillColor: true,
            showXYRow: true,
            showX1Y1Row: false,
            showX2Y2Row: false,
            showHeightWidthRow: true,
            showLineProps: false,
            showVertexButtons: false,
            showInkAnnotationType: false,
            showFreeTextProps: false,
            showFileUploader: false,
            showLeaderLength: false,
            isReplyBoxChecked: false,
            lockAnnotation: false,
            printAnnotation: true,
            isEditing: false,
            pageCount: 1,
            disableInkAnnotField: false,
            isDeleteBoundsDisabled: true,
            isDeleteVertexDisabled: true,
            currentCommentsList: _this.dynamicstampCommentsList
        };
        return _this;
    }
    ProgrammaticOperations.prototype.annotationSelectedEvent = function (annotationSelectEventArgs) {
        this.viewer.enableCommentPanel = true;
        this.selectedAnnotation.annotationSelected = true;
        this.currentUpdateAnnotationID = annotationSelectEventArgs.annotationId;
        var currentAnnotation = this.getAnnotationById(this.currentUpdateAnnotationID);
        if (currentAnnotation) {
            this.updateProperties(currentAnnotation);
            this.setState({
                showAddAnnotation: false,
                showUpdateAnnotation: true,
                showAnnotationList: false,
                showPageNumber: false
            });
        }
    };
    ProgrammaticOperations.prototype.annotationUnSelectedEvent = function () {
        this.viewer.enableCommentPanel = false;
        this.selectedAnnotation.annotationSelected = false;
        this.currentUpdateAnnotationID = "";
        this.resetAnnotationProperties();
        this.setState({
            showAnnotationList: true,
            showUpdateAnnotation: false,
            showAddAnnotation: true,
            showPageNumber: true
        });
    };
    ;
    ProgrammaticOperations.prototype.Reset = function () {
        this.resetAnnotationProperties();
        if (this.selectedAnnotation.annotationSelected) {
            this.selectedAnnotation.showFileUploader = false;
            this.selectedAnnotation.disableInkAnnotField = true;
            this.selectedAnnotation.showStampType = false;
            this.updatePropertiesInUI();
        }
    };
    ProgrammaticOperations.prototype.render = function () {
        var _this = this;
        var _a;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'col-lg-9 e-pv-control-section e-pv-pdfviewer-control-section' },
                React.createElement("div", { className: "e-pv-flex-container" },
                    React.createElement("label", { htmlFor: "checked", className: "e-pv-switchLabel" }, " Standalone PDF Viewer "),
                    React.createElement("div", { className: "e-message render-mode-info" },
                        React.createElement("span", { className: "e-msg-icon render-mode-info-icon", title: "Turn OFF to render the PDF Viewer as server-backed" })),
                    React.createElement("div", null,
                        React.createElement(ej2_react_buttons_1.SwitchComponent, { cssClass: "e-pv-buttonSwitch", id: "checked", change: this.change, checked: true }))),
                React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { ref: function (scope) { _this.viewer = scope; }, id: "container", documentPath: "https://cdn.syncfusion.com/content/pdf/annotations.pdf", resourceUrl: "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib", toolbarSettings: this.toolbarSettings, documentLoad: this.documentLoaded, annotationSelect: this.annotationSelectedEvent, annotationUnSelect: this.annotationUnSelectedEvent, annotationMove: this.onAnnotationMoved, annotationResize: this.onAnnotationResized, annotationRemove: this.annotationUnSelectedEvent, style: { 'height': '640px' } },
                    React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the creation of various types of annotations in the PDF viewer, including text markup, shapes, measurements, free text, stamps, handwritten signatures, ink, and sticky notes. Additionally, we can customize existing annotations or add new annotations programmatically in the PDF viewer using the provided options.")),
            React.createElement("div", { className: "col-lg-3 e-pv-property-section-pdfviewer e-pv-main-panel" },
                React.createElement("div", { className: "property-panel-header header-panel" },
                    "Properties",
                    React.createElement("button", { id: "e-pv-refresh-button-icon", className: "e-btn e-bigger e-lib e-flat e-icon-btn", value: '', onClick: this.Reset },
                        React.createElement("span", { className: "e-icons e-refresh e-btn-icon" }))),
                React.createElement("div", { className: "e-pv-property-panel-content" },
                    React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                        React.createElement("span", null, "Annotation Type")),
                    React.createElement("div", { className: "e-pv-input-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.annotationsList, value: this.state.annotationType, change: function (e) { return _this.onAnnotationChange(e); }, fields: this.annotationListFields, enabled: this.state.showAnnotationList })),
                    React.createElement("div", { className: "e-pv-annot-inner-container", hidden: !this.state.showStampType },
                        React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                            React.createElement("span", null, "Stamp Type")),
                        React.createElement("div", { className: "e-pv-input-item" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.stampTypeDataList, fields: this.stampTypeDatafields, value: this.state.stampType, change: function (e) { _this.onStampTypeChange(e); _this.onpropertiesvaluechanges("stampType", e); } })),
                        React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                            React.createElement("span", null, "Comments")),
                        React.createElement("div", { className: "e-pv-input-item" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.currentCommentsList, fields: this.stampCommentsTypeDatafields, value: this.state.stampComment, change: function (e) { return _this.onpropertiesvaluechanges('stampComment', e); } }))),
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title", id: 'e-pv-customStamp', hidden: this.state.showFileUploader },
                        React.createElement(ej2_react_inputs_1.UploaderComponent, { ref: function (scope) { _this.dropImageElement; _this.uploaderObj = scope; }, asyncSettings: this.pdfviewerApiPath, dropArea: this.dropImageElement, removing: this.onFileRemove, success: this.onFileSuccess })),
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                        React.createElement("span", null, "Page Number")),
                    React.createElement("div", { className: "e-pv-input-item" },
                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "e-pv-pdfViewer-pagenumber-annotation", format: "n0", value: this.state.pageNumber, change: function (e) { return _this.onpropertiesvaluechanges('pageNumber', e); }, min: 1, max: this.state.pageCount, enabled: this.state.showPageNumber })),
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                        React.createElement("span", null, "Settings:")),
                    React.createElement("div", { className: "e-pv-annot-inner-container", style: { padding: '0 0 12px 0' } },
                        React.createElement("table", { className: "e-pv-annot-inner-table" },
                            React.createElement("tbody", null,
                                React.createElement("tr", { hidden: !this.state.showXYRow },
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                                React.createElement("span", null, "X Position"),
                                                React.createElement("div", { className: "e-pv-input-item" },
                                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.state.x, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return _this.onpropertiesvaluechanges('x', e); } }))))),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                                React.createElement("span", null, "Y Position"),
                                                React.createElement("div", { className: "e-pv-input-item" },
                                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.state.y, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return _this.onpropertiesvaluechanges('y', e); } })))))),
                                React.createElement("tr", { hidden: !this.state.showHeightWidthRow },
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                                React.createElement("span", null, "Width"),
                                                React.createElement("div", { className: "e-pv-input-item" },
                                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.state.width, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return _this.onpropertiesvaluechanges('width', e); } }))))),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                                React.createElement("span", null, "Height"),
                                                React.createElement("div", { className: "e-pv-input-item" },
                                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.state.height, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return _this.onpropertiesvaluechanges('height', e); } })))))),
                                React.createElement("tr", { hidden: !this.state.showX1Y1Row },
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                                React.createElement("span", null, "X1 Position"),
                                                React.createElement("div", { className: "e-pv-input-item" },
                                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.state.x1, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return _this.onpropertiesvaluechanges('vertexX1', e); } }))))),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                                React.createElement("span", null, "Y1 Position"),
                                                React.createElement("div", { className: "e-pv-input-item" },
                                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.state.y1, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return _this.onpropertiesvaluechanges('vertexY1', e); } })))))),
                                React.createElement("tr", { hidden: !this.state.showX2Y2Row },
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                                React.createElement("span", null, "X2 Position"),
                                                React.createElement("div", { className: "e-pv-input-item" },
                                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.state.x2, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return _this.onpropertiesvaluechanges('vertexX2', e); } }))))),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                                React.createElement("span", null, "Y2 Position"),
                                                React.createElement("div", { className: "e-pv-input-item" },
                                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.state.y2, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return _this.onpropertiesvaluechanges('vertexY2', e); } })))))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                                React.createElement("span", null, "Shape Opacity"),
                                                React.createElement("div", { className: "e-pv-input-item" },
                                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.state.opacity, format: 'n0', showSpinButton: false, min: 0, max: 100, change: function (e) { return _this.onpropertiesvaluechanges('opacity', e); } }))))),
                                    React.createElement("td", { hidden: !this.state.showFillColor },
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                                React.createElement("span", null, "Fill Color"),
                                                React.createElement("div", { className: "e-pv-input-item" },
                                                    React.createElement(ej2_react_inputs_1.ColorPickerComponent, { value: (_a = this.state.fillColor) !== null && _a !== void 0 ? _a : "#FFFFFF00", change: function (e) { return _this.onpropertiesvaluechanges('fillColor', e); }, mode: 'Palette' })))))),
                                React.createElement("tr", { hidden: !this.state.showStrokeProps },
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                                React.createElement("span", null, "Stroke Thickness"),
                                                React.createElement("div", { className: "e-pv-input-item" },
                                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.state.strokeThickness, min: 0, max: 12, format: 'n0', showSpinButton: false, change: function (e) { return _this.onpropertiesvaluechanges('thickness', e); } }))))),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                                React.createElement("span", null, "Stroke Color"),
                                                React.createElement("div", { className: "e-pv-input-item" },
                                                    React.createElement(ej2_react_inputs_1.ColorPickerComponent, { value: this.state.strokeColor, change: function (e) { return _this.onpropertiesvaluechanges('strokeColor', e); }, mode: 'Palette' })))))))),
                        React.createElement("div", { style: { padding: '12px 12px 0 12px' } },
                            React.createElement("table", { className: "e-pv-annot-inner-table e-pv-annot-bounds-list", style: { borderCollapse: "collapse" } },
                                React.createElement("tbody", null, (this.state.annotationType === "Highlight" || this.state.annotationType === "Underline" || this.state.annotationType === "Strikethrough") &&
                                    (this.state.bounds && this.state.bounds.length > 0) && (this.state.bounds.map(function (item, index) {
                                    return (React.createElement("tr", { key: item.id },
                                        React.createElement("td", null,
                                            React.createElement("div", { className: "e-pv-table-items" },
                                                React.createElement("div", null,
                                                    "X",
                                                    index + 1,
                                                    " = ",
                                                    _this.vertexTableNumberFormat(item.X)),
                                                React.createElement("div", null,
                                                    "Y",
                                                    index + 1,
                                                    " = ",
                                                    _this.vertexTableNumberFormat(item.Y)))),
                                        React.createElement("td", null,
                                            React.createElement("div", { className: "e-pv-table-items" },
                                                React.createElement("div", null,
                                                    "W",
                                                    index + 1,
                                                    " = ",
                                                    _this.vertexTableNumberFormat(item.Width)),
                                                React.createElement("div", null,
                                                    "H",
                                                    index + 1,
                                                    " = ",
                                                    _this.vertexTableNumberFormat(item.Height))))));
                                })))),
                            React.createElement("table", { className: "e-pv-annot-inner-table e-pv-pdfViewer-coordinate-table", style: { borderCollapse: "collapse" } },
                                React.createElement("tbody", null, (this.state.annotationType !== "Line" && this.state.annotationType !== "Distance" && this.state.vertexPoints && this.state.vertexPoints.length > 0) &&
                                    (this.state.vertexPoints.map(function (item, index) {
                                        return (React.createElement("tr", { key: item.id }, index % 2 === 0 ? (React.createElement(React.Fragment, null,
                                            React.createElement("td", null,
                                                React.createElement("div", { className: "e-pv-table-items" },
                                                    React.createElement("div", null,
                                                        "X",
                                                        index + 1,
                                                        " = ",
                                                        _this.vertexTableNumberFormat(item.x)),
                                                    React.createElement("div", null,
                                                        "Y",
                                                        index + 1,
                                                        " = ",
                                                        _this.vertexTableNumberFormat(item.y)))),
                                            index + 1 < _this.state.vertexPoints.length ? (React.createElement("td", null,
                                                React.createElement("div", { className: "e-pv-table-items" },
                                                    React.createElement("div", null,
                                                        "X",
                                                        index + 2,
                                                        " = ",
                                                        _this.vertexTableNumberFormat(_this.state.vertexPoints[index + 1].x)),
                                                    React.createElement("div", null,
                                                        "Y",
                                                        index + 2,
                                                        " = ",
                                                        _this.vertexTableNumberFormat(_this.state.vertexPoints[index + 1].y))))) : React.createElement("td", { style: { border: "none" } }))) : null));
                                    }))))),
                        React.createElement("div", { hidden: !this.state.showBoundsButtons },
                            React.createElement("div", { className: "e-pv-annot-button-section", style: { padding: '12px 12px 0 0', border: 0 } },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: 'capitalize' }, onClick: this.OnBoundsDelete, disabled: this.state.isDeleteBoundsDisabled }, "Delete"),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: 'capitalize' }, onClick: function () { _this.addBounds(); _this.onpropertiesvaluechanges("", { isInteracted: true }); } }, "Add Bounds"))),
                        React.createElement("div", { id: 'e-pv-lineistrue', hidden: !this.state.showLineProps, style: { padding: '0px 12px 12px 12px' } },
                            React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                                React.createElement("span", null, "Line Head Start")),
                            React.createElement("div", { className: "e-pv-input-item" },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.lineHeadstatusList, fields: this.lineHeadstatusfield, value: this.state.lineHeadStartStyle, change: function (e) { return _this.onpropertiesvaluechanges('lineHeadStartStyle', e); } })),
                            React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                                React.createElement("span", null, "Line Head End")),
                            React.createElement("div", { className: "e-pv-input-item" },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.lineHeadstatusList, fields: this.lineHeadstatusfield, value: this.state.lineHeadEndStyle, change: function (e) { return _this.onpropertiesvaluechanges('lineHeadEndStyle', e); } })),
                            React.createElement("div", { id: 'e-pv-distanceistrue', hidden: !this.state.showLeaderLength },
                                React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                                    React.createElement("span", null, "Leader Length")),
                                React.createElement("div", { className: "e-pv-input-item" },
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.state.leaderLength, format: '###.##', showSpinButton: false, change: function (e) { return _this.onpropertiesvaluechanges('leaderLength', e); } }))),
                            React.createElement("div", { hidden: !this.state.showVertexButtons },
                                React.createElement("div", { className: "e-pv-annot-button-section", style: { padding: '12px 12px 0 0', border: 0 } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: 'capitalize' }, onClick: this.onDeleteVertex, disabled: this.state.isDeleteVertexDisabled }, "Delete"),
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: 'capitalize' }, onClick: function () { _this.addVertex(); _this.onpropertiesvaluechanges("", { isInteracted: true }); } }, "Add Vertex")))))),
                React.createElement("div", { hidden: !this.state.showInkAnnotationType },
                    React.createElement("div", { style: { padding: '0 0 12px 0' } },
                        React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                            React.createElement("span", null, "Ink Annotation")),
                        React.createElement("div", { className: "e-pv-input-item" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.inkAnnotationDataList, fields: this.inkAnnotationfield, value: this.state.inkAnnotationType, change: function (e) { return _this.onpropertiesvaluechanges('inkAnnotationType', e); }, enabled: !this.state.disableInkAnnotField })))),
                React.createElement("div", { id: 'e-pv-textistrue', className: "e-pv-annot-inner-container", hidden: !this.state.showFreeTextProps },
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                        React.createElement("span", null, "Text Properties:")),
                    React.createElement("div", { className: "e-pv-annot-inner-container" },
                        React.createElement("div", { className: "e-pv-pdfviewer-text-content", style: { marginTop: '0%' } },
                            React.createElement("span", null, "Default Text")),
                        React.createElement("div", { className: "e-pv-input-item" },
                            React.createElement(ej2_react_inputs_1.TextBoxComponent, { value: this.state.defaultText, change: function (e) { return _this.onpropertiesvaluechanges('defaultText', e); } })),
                        React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                            React.createElement("span", null, "Font Family")),
                        React.createElement("div", { className: "e-pv-input-item" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.freeTextFontFamilyList, fields: this.freetextFontFamilyFields, value: this.state.fontFamily, change: function (e) { return _this.onpropertiesvaluechanges('fontFamily', e); } })),
                        React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                            React.createElement("span", null, "Alignment")),
                        React.createElement("div", { className: "e-pv-input-item" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.freeTextAlignmentList, fields: this.freeTextAlignmentField, value: this.state.alignment, change: function (e) { return _this.onpropertiesvaluechanges('alignment', e); } })),
                        React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                            React.createElement("span", null, "Font Style")),
                        React.createElement("div", { className: "e-pv-input-item" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.freeTextFontStyleList, fields: this.freeTextFontStyleFields, value: this.state.fontStyle, change: function (e) { return _this.onpropertiesvaluechanges('fontStyle', e); } })),
                        React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                            React.createElement("table", { className: "e-pv-annot-inner-table" },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", { style: { width: '50%', padding: '0' } },
                                            React.createElement("span", null, "Font Size"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.state.fontSize, format: 'n0', showSpinButton: false, change: function (e) { return _this.onpropertiesvaluechanges('fontSize', e); } }))),
                                        React.createElement("td", { style: { padding: '0' } },
                                            React.createElement("div", { style: { marginLeft: '12px' }, className: "e-pv-text-content" },
                                                React.createElement("span", null, "Font Color"),
                                                React.createElement("div", { className: "e-pv-input-item" },
                                                    React.createElement(ej2_react_inputs_1.ColorPickerComponent, { value: this.state.fontColor, mode: "Palette", change: function (e) { return _this.onpropertiesvaluechanges('fontColor', e); } })))))))))),
                React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { className: "e-pv-check-box-row" },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: this.state.printAnnotation, change: function (e) { _this.onPrintCheckBoxChange(e); _this.onpropertiesvaluechanges("", { isInteracted: true }); } })),
                                React.createElement("td", { className: "e-pv-check-box-row" },
                                    React.createElement("span", null, "Print Annotation"))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "e-pv-check-box-row" },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: this.state.lockAnnotation, change: function (e) { _this.onCheckboxChangeIntractionBox(e); _this.onpropertiesvaluechanges("", { isInteracted: true }); } })),
                                React.createElement("td", { className: "e-pv-check-box-row" },
                                    React.createElement("span", null, "Lock Annotation")))))),
                React.createElement("div", { id: 'e-pv-allowInteraction', hidden: !this.state.lockAnnotation },
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title e-pv-pdfviewer-text-content" },
                        React.createElement("span", null, "Allow Interactions")),
                    React.createElement("div", { className: "e-pv-input-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { fields: this.intractionsListfield, showCheckBox: true, value: this.state.allowedInteractions, change: function (e) { _this.onInteractionValueChange(e); _this.onpropertiesvaluechanges("", { isInteracted: true }); } }))),
                React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                    React.createElement("span", null, "Add Comments")),
                React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                    React.createElement("span", null, "Author")),
                React.createElement("div", { className: "e-pv-input-item" },
                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "Enter text", value: this.state.author, change: function (e) { return _this.onpropertiesvaluechanges('author', e); } })),
                React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                    React.createElement("span", null, "Content")),
                React.createElement("div", { className: "e-pv-input-item" },
                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { value: this.state.comment, change: function (e) { return _this.onpropertiesvaluechanges('comment', e); }, placeholder: 'New Comment' })),
                React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                    React.createElement("span", null, "Status")),
                React.createElement("div", { className: "e-pv-input-item" },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.commentStatusList, fields: this.commentStatusListfields, value: this.state.commentState, change: function (e) { return _this.onpropertiesvaluechanges('setState', e); } })),
                React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { className: "e-pv-check-box-row" },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: this.state.isReplyBoxChecked, change: function (e) { _this.onCheckboxChangeReplyBox(e); _this.onpropertiesvaluechanges("", { isInteracted: true }); } })),
                                React.createElement("td", { className: "e-pv-check-box-row" },
                                    React.createElement("span", null, "Reply")))))),
                React.createElement("div", { hidden: !this.state.isReplyBoxChecked },
                    React.createElement("div", { className: "pdfviewer-input-title", hidden: this.state.replies.length <= 0 }, "Replies:"),
                    React.createElement("div", { className: "e-pv-annot-inner-container replies" }, this.state.replies.map(function (comment) { return (React.createElement("div", { className: "e-pv-reply-container", id: comment.id, key: comment.id },
                        React.createElement("div", { className: "reply-icon e-pv-comment-icon e-pv-icon" }),
                        React.createElement("div", { className: "e-pv-reply-main-container" },
                            React.createElement("div", { className: "reply-text" }, "".concat(comment.author, " - ").concat(comment.modifiedDate)),
                            React.createElement("div", { className: "reply-text" }, "".concat(comment.note, " ").concat(comment.state !== "None" ? comment.state : ""))),
                        React.createElement("div", { className: "more-container", style: { width: "min-content" } },
                            React.createElement("button", { className: "e-control e-btn e-lib e-flat e-icon-btn context-menu-btn", "data-id": comment.id, onClick: function (event) {
                                    _this.OpenContextMenu(event);
                                }, onMouseDown: function () { _this.getCommentID(comment.id); }, style: { padding: "5px 4px" } },
                                React.createElement("span", { className: "e-icons e-more-vertical-1 e-btn-icon" }))))); })),
                    React.createElement(ej2_react_navigations_1.ContextMenuComponent, { ref: function (scope) { _this.contextMenu = scope; }, items: this.selectedAnnotation.replyMenuItems, select: function (event) { _this.contextMenuItemSelected(event); } })),
                React.createElement("div", { className: "e-pv-annot-inner-container e-pv-pdfViewer-checked-Content", id: 'e-pv-replyBox', style: { padding: '10px' }, hidden: !this.state.isReplyBoxChecked },
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                        React.createElement("span", null, "Author")),
                    React.createElement("div", { className: "e-pv-input-item" },
                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "Enter text", value: this.state.replyAuthor, change: function (e) { return _this.onpropertiesvaluechanges('replyAuthor', e); } })),
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                        React.createElement("span", null, "Content")),
                    React.createElement("div", { className: "e-pv-input-item" },
                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { value: this.state.replyComment, change: function (e) { return _this.onpropertiesvaluechanges('replyComment', e); }, placeholder: 'Reply Comment' })),
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                        React.createElement("span", null, "Status")),
                    React.createElement("div", { className: "e-pv-input-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: '', dataSource: this.commentStatusList, fields: this.commentStatusListfields, value: this.state.replyState, change: function (e) { return _this.onpropertiesvaluechanges('replyState', e); } })),
                    React.createElement("div", { className: "e-pv-annot-button-section", style: { padding: '12px 0 0 0', border: 0 } },
                        React.createElement("div", { hidden: this.state.isEditing },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: 'capitalize' }, onClick: function () { _this.updateReply(); _this.onpropertiesvaluechanges("", { isInteracted: true }); } }, "Add Reply")),
                        React.createElement("div", { hidden: !this.state.isEditing },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: "capitalize" }, onClick: this.updateEditReply }, "Update Reply")))),
                React.createElement("div", { className: "e-pv-property-panel-footer" },
                    React.createElement("div", { className: "e-pv-annot-button-section" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'e-pv-updateButton', isPrimary: true, style: { textTransform: 'capitalize' }, onClick: this.updateChangesAnnotation }, "Update"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'e-pv-addAnnotationButton', isPrimary: true, style: { textTransform: 'capitalize' }, onClick: this.addNewAnnotation }, "Add Annotation")))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The PDF Viewer component allows the process of programmatically adding or modifying annotations within a PDF document. With the ability to programmatically add any type of annotation using the ",
                    React.createElement("a", { target: '_blank', href: 'https://helpej2.syncfusion.com/react/documentation/api/pdfviewer/annotation/#addannotation', "aria-label": "Navigate to the documentation for Add Annotation API in PdfViewercomponent" }, "addAnnotation"),
                    " API and edit existing annotations using the editAnnotation API, users can seamlessly enhance their PDF Viewing experience."),
                React.createElement("br", null),
                React.createElement("p", null, "The creation of an annotation when clicking the \u2018Add annotation\u2019 button depends on the selected properties from the Property panel. To update an existing annotation, users can select the desired annotation, modify its properties, and then click the \u2018Update\u2019 button."),
                React.createElement("br", null),
                React.createElement("p", null, "We can programmatically add or update the following types of annotations in the PDF viewer:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/text-markup-annotation', "aria-label": "Navigate to the documentation for Text markup annotations in PdfViewercomponent" }, " Text markup annotations ")),
                    React.createElement("li", null,
                        React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/shape-annotation ', "aria-label": "Navigate to the documentation for Shape annotations in PdfViewercomponent" }, " Shape annotations ")),
                    React.createElement("li", null,
                        React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/measurement-annotation', "aria-label": "Navigate to the documentation for Measurements annotation in PdfViewercomponent" }, " Measurements annotation ")),
                    React.createElement("li", null,
                        React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/free-text-annotation', "aria-label": "Navigate to the documentation for Free text annotation in PdfViewercomponent" }, " Free text annotation ")),
                    React.createElement("li", null,
                        React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/stamp-annotation', "aria-label": "Navigate to the documentation Stamp annotation in PdfViewercomponent" }, " Stamp annotation ")),
                    React.createElement("li", null,
                        React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/ink-annotation', "aria-label": "Navigate to the documentation for Ink annotation in PdfViewercomponent" }, " Ink annotation ")),
                    React.createElement("li", null,
                        React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/sticky-notes-annotation', "aria-label": "Navigate to the documentation for Sticky notes annotation in PdfViewercomponent" }, " Sticky notes annotation "))),
                React.createElement("p", null,
                    "More information on adding annotation programmatically can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                    "."))));
    };
    ProgrammaticOperations.prototype.onFileRemove = function (args) {
        args.postRawFile = false;
    };
    ProgrammaticOperations.prototype.onFileSuccess = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var fileData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fileData = args.file.rawFile;
                        if (!(fileData instanceof Blob)) return [3 /*break*/, 2];
                        _a = this.selectedAnnotation;
                        return [4 /*yield*/, this.convertBlobToBase64(fileData)];
                    case 1:
                        _a.customStampImageSource = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        console.error('Unexpected file data type:', typeof fileData);
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProgrammaticOperations.prototype.convertPixelToPoint = function (number) {
        return (number * (72 / 96));
    };
    ;
    ProgrammaticOperations.prototype.convertBlobToBase64 = function (blob) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };
    ProgrammaticOperations.prototype.contextMenuItemSelected = function (event) {
        switch (event.item.text) {
            case "Edit": {
                this.onEditButtonClick(this.currentEditCommentId);
                break;
            }
            case "Delete": {
                this.onreplycommentdelete(this.currentEditCommentId);
                break;
            }
        }
    };
    ProgrammaticOperations.prototype.onAnnotationChange = function (event) {
        this.selectedAnnotation.annotationType = event.value;
        this.setState({
            showStrokeProps: false,
            showBoundsButtons: false,
            showFillColor: false,
            showXYRow: false,
            showX1Y1Row: false,
            showX2Y2Row: false,
            showHeightWidthRow: false,
            showLineProps: false,
            showVertexButtons: false,
            showFreeTextProps: false,
            showLeaderLength: false
        });
        switch (this.selectedAnnotation.annotationType) {
            case 'Highlight':
            case 'Underline':
            case 'Strikethrough':
                {
                    this.setState({
                        showBoundsButtons: true,
                        showFillColor: true,
                        showXYRow: true,
                        showHeightWidthRow: true
                    });
                    break;
                }
            case 'Line':
            case 'Arrow':
                {
                    this.setState({
                        showStrokeProps: true,
                        showFillColor: true,
                        showX1Y1Row: true,
                        showX2Y2Row: true,
                        showLineProps: true
                    });
                    break;
                }
            case 'Square':
            case 'Rectangle':
            case 'Circle':
            case 'Radius':
                {
                    this.setState({
                        showStrokeProps: true,
                        showFillColor: true,
                        showXYRow: true,
                        showHeightWidthRow: true
                    });
                    break;
                }
            case 'Polygon':
            case 'Perimeter':
            case 'Area':
            case 'Volume':
                {
                    this.setState({
                        showVertexButtons: true,
                        showXYRow: true,
                        showStrokeProps: true,
                        showFillColor: true
                    });
                    break;
                }
            case 'Distance':
                {
                    this.setState({
                        showStrokeProps: true,
                        showFillColor: true,
                        showX1Y1Row: true,
                        showX2Y2Row: true,
                        showLineProps: true,
                        showLeaderLength: true
                    });
                    break;
                }
            case 'StickyNotes':
                {
                    this.setState({
                        showXYRow: true,
                        showHeightWidthRow: true
                    });
                    break;
                }
            case 'Ink':
                {
                    this.setState({
                        showStrokeProps: true,
                        showFillColor: true,
                        showXYRow: true,
                        showHeightWidthRow: true
                    });
                    break;
                }
            case 'stamp':
            case 'Stamp':
                {
                    this.setState({
                        showXYRow: true,
                        showHeightWidthRow: true
                    });
                    break;
                }
            case 'FreeText':
                {
                    this.setState({
                        showStrokeProps: true,
                        showFillColor: true,
                        showXYRow: true,
                        showHeightWidthRow: true,
                        showFreeTextProps: true
                    });
                    break;
                }
            case 'CustomStamp':
                {
                    this.setState({
                        showXYRow: true,
                        showHeightWidthRow: true
                    });
                    break;
                }
        }
        if (!(0, ej2_base_1.isNullOrUndefined)(event) && event.isInteracted) {
            this.resetAnnotationProperties();
        }
    };
    ProgrammaticOperations.prototype.addBounds = function () {
        this.setState({
            showUpdateAnnotation: true,
            showBoundsButtons: true
        });
        var newBound = {
            id: this.generateUniqueId(),
            X: this.selectedAnnotation.x,
            Y: this.selectedAnnotation.y,
            Width: this.selectedAnnotation.width,
            Height: this.selectedAnnotation.height
        };
        if ((0, ej2_base_1.isNullOrUndefined)(this.selectedAnnotation.bounds)) {
            this.selectedAnnotation.bounds = [];
        }
        this.selectedAnnotation.bounds.push(newBound);
        this.setState(function (prevState) {
            return {
                bounds: __spreadArray(__spreadArray([], prevState.bounds, true), [newBound], false)
            };
        });
        if (this.selectedAnnotation.bounds.length > 1) {
            this.setState({
                isDeleteBoundsDisabled: false
            });
        }
    };
    ProgrammaticOperations.prototype.OnBoundsDelete = function () {
        if ((0, ej2_base_1.isNullOrUndefined)(this.selectedAnnotation.bounds)) {
            this.selectedAnnotation.bounds = [];
        }
        if (this.selectedAnnotation.bounds.length > 1) {
            this.selectedAnnotation.bounds = this.selectedAnnotation.bounds.slice(0, this.selectedAnnotation.bounds.length - 1);
            this.setState({
                showUpdateAnnotation: true
            });
        }
        if (this.selectedAnnotation.bounds.length <= 1) {
            this.setState({
                isDeleteBoundsDisabled: true
            });
        }
        if (this.selectedAnnotation.bounds.length < 1) {
            this.setState({
                showUpdateAnnotation: false
            });
        }
        this.setState(function (prevState) {
            return {
                bounds: __spreadArray([], prevState.bounds, true)
            };
        });
    };
    ProgrammaticOperations.prototype.addVertex = function () {
        var newVertex = { x: this.selectedAnnotation.x, y: this.selectedAnnotation.y, id: this.generateUniqueId() };
        if ((0, ej2_base_1.isNullOrUndefined)(this.selectedAnnotation.vertexPoints)) {
            this.selectedAnnotation.vertexPoints = [];
        }
        this.selectedAnnotation.vertexPoints.push(newVertex);
        if (this.selectedAnnotation.vertexPoints.length > 1) {
            this.setState({
                isDeleteVertexDisabled: false
            });
        }
        this.setState(function (prevState) {
            return {
                showUpdateAnnotation: true,
                vertexPoints: __spreadArray(__spreadArray([], prevState.vertexPoints, true), [newVertex], false)
            };
        });
    };
    ;
    ProgrammaticOperations.prototype.onInteractionValueChange = function (event) {
        var _a;
        if ((0, ej2_base_1.isNullOrUndefined)(this.selectedAnnotation.allowedInteractions) || (this.selectedAnnotation.allowedInteractions.length === 0)) {
            this.selectedAnnotation.allowedInteractions = [ej2_react_pdfviewer_1.AllowedInteraction.Select, ej2_react_pdfviewer_1.AllowedInteraction.Resize];
        }
        else {
            this.selectedAnnotation.allowedInteractions = ((_a = event.value) !== null && _a !== void 0 ? _a : [ej2_react_pdfviewer_1.AllowedInteraction.Select, ej2_react_pdfviewer_1.AllowedInteraction.Resize]);
        }
        this.setState({
            allowedInteractions: __spreadArray([], this.selectedAnnotation.allowedInteractions, true)
        });
    };
    ProgrammaticOperations.prototype.onDeleteVertex = function () {
        if ((0, ej2_base_1.isNullOrUndefined)(this.selectedAnnotation.vertexPoints)) {
            this.selectedAnnotation.vertexPoints = [];
        }
        if (this.selectedAnnotation.vertexPoints.length > 1) {
            this.selectedAnnotation.vertexPoints = this.selectedAnnotation.vertexPoints.slice(0, this.selectedAnnotation.vertexPoints.length - 1);
            this.setState({
                showUpdateAnnotation: true
            });
        }
        if (this.selectedAnnotation.vertexPoints.length <= 1) {
            this.setState({
                isDeleteVertexDisabled: true,
                showUpdateAnnotation: false
            });
        }
        this.setState(function (prevState) {
            return {
                vertexPoints: __spreadArray([], prevState.vertexPoints, true)
            };
        });
    };
    ProgrammaticOperations.prototype.onStampTypeChange = function (event) {
        var selectedValue = event.value;
        switch (selectedValue) {
            case 'Dynamic': {
                this.setState({
                    currentCommentsList: this.dynamicstampCommentsList,
                    stampType: "Dynamic",
                    stampComment: "Approved"
                });
                this.onpropertiesvaluechanges("stampComment", { isInteracted: true, value: "Approved" });
                break;
            }
            case 'Sign Here': {
                this.setState({
                    currentCommentsList: this.sighhereCommentsList,
                    stampType: "Sign Here",
                    stampComment: "Accepted"
                });
                this.onpropertiesvaluechanges("stampComment", { isInteracted: true, value: "Accepted" });
                break;
            }
            case 'Standard Business': {
                this.setState({
                    currentCommentsList: this.StandardBusinessStampsList,
                    stampType: "Standard Business",
                    stampComment: "Approved"
                });
                this.onpropertiesvaluechanges("stampComment", { isInteracted: true, value: "Approved" });
                break;
            }
            default:
                this.currentCommentsList = [];
        }
    };
    ProgrammaticOperations.prototype.onCheckboxChangeReplyBox = function (event) {
        this.setState({
            isReplyBoxChecked: event.checked
        });
        if (!event.checked) {
            if (this.state.isEditing) {
                this.setState({
                    isEditing: false
                });
                this.currentEditCommentId = "";
            }
        }
    };
    ProgrammaticOperations.prototype.onPrintCheckBoxChange = function (event) {
        this.setState({
            printAnnotation: event.checked
        });
        this.selectedAnnotation.isPrint = event.checked;
    };
    ProgrammaticOperations.prototype.onCheckboxChangeIntractionBox = function (event) {
        this.setState({
            lockAnnotation: event.checked
        });
        this.selectedAnnotation.isLocked = event.checked;
    };
    ProgrammaticOperations.prototype.onpropertiesvaluechanges = function (property, event) {
        if (this.selectedAnnotation.annotationSelected && !this.state.showUpdateAnnotation) {
            if (!(0, ej2_base_1.isNullOrUndefined)(event.isInteracted) && event.isInteracted) {
                this.setState({
                    showUpdateAnnotation: true
                });
            }
            else if (!(0, ej2_base_1.isNullOrUndefined)(event.event)) {
                this.setState({
                    showUpdateAnnotation: true
                });
            }
            else {
                this.setState({
                    showUpdateAnnotation: false
                });
            }
            var shapeAnnotation = this.selectedAnnotation.annotationType;
            if (((property === "x") || (property === "y") || (property === "height") || (property === "width")) && ((shapeAnnotation === "Underline") || (shapeAnnotation === "Strikethrough") || (shapeAnnotation === "Highlight"))) {
                this.setState({
                    showUpdateAnnotation: false
                });
            }
            if (((property === "x") || (property === "y")) && ((shapeAnnotation === "Polygon") || (shapeAnnotation === "Area") || (shapeAnnotation === "Perimeter") || (shapeAnnotation === "Volume"))) {
                this.setState({
                    showUpdateAnnotation: false
                });
            }
        }
        if (!(0, ej2_base_1.isNullOrUndefined)(event.value)) {
            this.selectedAnnotation[property] = event.value;
        }
        else if (!(0, ej2_base_1.isNullOrUndefined)(event.name)) {
            this.selectedAnnotation[property] = event.name;
        }
        if (event && event.isInteracted && (property === "stampComment" || property === "stampType")) {
            this.resetAnnotationProperties();
        }
    };
    ProgrammaticOperations.prototype.addNewAnnotation = function () {
        var _this = this;
        var _a;
        var currentannotationSettings;
        currentannotationSettings = this.annotationSettings();
        if (this.selectedAnnotation.annotationType === "Highlight") {
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.annotationType === 'Underline') {
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.annotationType === 'Strikethrough') {
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.annotationType === 'Line') {
            currentannotationSettings.vertexPoints = [{ x: this.selectedAnnotation.vertexX1, y: this.selectedAnnotation.vertexY1 },
                { x: this.selectedAnnotation.vertexX2, y: this.selectedAnnotation.vertexY2 }];
            currentannotationSettings.offset = currentannotationSettings.vertexPoints[0];
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
            this.selectedAnnotation.vertexPoints = [];
        }
        else if (this.selectedAnnotation.annotationType === 'Arrow') {
            currentannotationSettings.vertexPoints = [{ x: this.selectedAnnotation.vertexX1, y: this.selectedAnnotation.vertexY1 },
                { x: this.selectedAnnotation.vertexX2, y: this.selectedAnnotation.vertexY2 }];
            currentannotationSettings.offset = currentannotationSettings.vertexPoints[0];
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
            this.selectedAnnotation.vertexPoints = [];
        }
        else if (this.selectedAnnotation.annotationType === 'Rectangle') {
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.annotationType === 'Circle') {
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.annotationType === 'Polygon') {
            if (this.selectedAnnotation.vertexPoints.length === 0) {
                this.selectedAnnotation.vertexPoints = this.addUniqueId([{ x: 100, y: 39 }, { x: 142, y: 10 }, { x: 189, y: 38 }, { x: 178, y: 81 }, { x: 111, y: 81 }, { x: 100, y: 39 }]);
                currentannotationSettings = this.annotationSettings();
            }
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.annotationType === 'Distance') {
            currentannotationSettings.vertexPoints = [{ x: this.selectedAnnotation.vertexX1, y: this.selectedAnnotation.vertexY1 },
                { x: this.selectedAnnotation.vertexX2, y: this.selectedAnnotation.vertexY2 }];
            currentannotationSettings.offset = currentannotationSettings.vertexPoints[0];
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
            this.selectedAnnotation.vertexPoints = [];
        }
        else if (this.selectedAnnotation.annotationType === 'Perimeter') {
            if (this.selectedAnnotation.vertexPoints.length === 0) {
                this.selectedAnnotation.vertexPoints = this.addUniqueId([{ x: 100, y: 100 }, { x: 185, y: 100 }, { x: 186, y: 162 }]);
                currentannotationSettings = this.annotationSettings();
            }
            currentannotationSettings.offset = currentannotationSettings.vertexPoints[0];
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.annotationType === 'Area') {
            if (this.selectedAnnotation.vertexPoints.length === 0) {
                this.selectedAnnotation.vertexPoints = this.addUniqueId([{ x: 100, y: 100 }, { x: 188, y: 99 }, { x: 189, y: 153 }, { x: 100, y: 100 }]);
                currentannotationSettings = this.annotationSettings();
            }
            currentannotationSettings.offset = currentannotationSettings.vertexPoints[0];
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.annotationType === 'Radius') {
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.annotationType === 'Volume') {
            if (this.selectedAnnotation.vertexPoints.length === 0) {
                this.selectedAnnotation.vertexPoints = this.addUniqueId([{ x: 100, y: 100 }, { x: 100, y: 209 }, { x: 220, y: 209 }, { x: 220, y: 99 }, { x: 100, y: 100 }]);
                currentannotationSettings = this.annotationSettings();
            }
            currentannotationSettings.offset = currentannotationSettings.vertexPoints[0];
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.annotationType === 'FreeText') {
            this.selectedAnnotation.strokeColor = "#FFFFFF00";
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.annotationType === 'Stamp') {
            currentannotationSettings.customStamps = null;
            currentannotationSettings.offset = { x: this.convertPixelToPoint(currentannotationSettings.offset.x), y: this.convertPixelToPoint(currentannotationSettings.offset.y) };
            currentannotationSettings.width = this.convertPixelToPoint(currentannotationSettings.width);
            currentannotationSettings.height = this.convertPixelToPoint(currentannotationSettings.height);
            if (this.selectedAnnotation.stampType === 'Dynamic') {
                if (this.selectedAnnotation.dynamicStamps) {
                    var selectedStampItem = this.selectedAnnotation.dynamicStamps.find(function (stamp) { return stamp === _this.selectedAnnotation.stampComment; });
                    if (selectedStampItem) {
                        this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings, selectedStampItem);
                    }
                }
            }
            else if (this.selectedAnnotation.stampType === "Sign Here") {
                if (this.selectedAnnotation.signStamps) {
                    var selectedStampItem = this.selectedAnnotation.signStamps.find(function (stamp) { return stamp === _this.selectedAnnotation.stampComment; });
                    if (selectedStampItem) {
                        this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings, null, selectedStampItem);
                    }
                }
            }
            else if (this.selectedAnnotation.stampType === "Standard Business") {
                if (this.selectedAnnotation.signStamps) {
                    var selectedStampItem = this.selectedAnnotation.standardBusinessStamps.find(function (stamp) { return stamp === _this.selectedAnnotation.stampComment; });
                    if (selectedStampItem) {
                        this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings, null, null, selectedStampItem);
                    }
                }
            }
        }
        else if (this.selectedAnnotation.annotationType === 'Ink') {
            if (this.selectedAnnotation.inkAnnotationType === "Syncfusion") {
                this.selectedAnnotation.path = '[{\"command\":\"M\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":250.83334350585938,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":257.5,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":926.6667175292969},{\"command\":\"L\",\"x\":259.5,\"y\":924.0000305175781},{\"command\":\"L\",\"x\":259.5,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":258.16668701171875,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.16668701171875,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":253.5,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":925.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":927.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":253.5,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":260.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":264.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":274.16668701171875,\"y\":958.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":281.5,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":285.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":967.3333435058594},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":282.8333740234375,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":266.16668701171875,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":259.5,\"y\":993.3333435058594},{\"command\":\"L\",\"x\":252.16668701171875,\"y\":994.0000305175781},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":228.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":246.16668701171875,\"y\":972.0000305175781},{\"command\":\"L\",\"x\":257.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":262.8333435058594,\"y\":976.0000305175781},{\"command\":\"L\",\"x\":269.5,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":276.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":279.5,\"y\":978.0000305175781},{\"command\":\"L\",\"x\":285.5,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":288.16668701171875,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":293.5,\"y\":966.6667175292969},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":291.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":292.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":295.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":297.5,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":298.8333740234375,\"y\":970.6667175292969},{\"command\":\"L\",\"x\":301.5,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":304.16668701171875,\"y\":968.6667175292969},{\"command\":\"L\",\"x\":305.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":308.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":310.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":311.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":312.8333740234375,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":968.0000305175781},{\"command\":\"L\",\"x\":317.5,\"y\":972.6667175292969},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":986.0000305175781},{\"command\":\"L\",\"x\":319.5,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.8333740234375,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":987.3333435058594},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":985.3333435058594},{\"command\":\"L\",\"x\":314.16668701171875,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":320.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":321.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":322.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":322.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":326.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":328.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":328.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":329.5,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.6667175292969},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":331.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":332.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":333.5,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":334.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":335.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":336.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":337.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":338.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":340.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":341.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":342.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":344.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":346.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":349.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":350.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":351.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":355.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":356.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":358.16668701171875,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":360.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":364.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":370.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":932.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":375.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":378.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":380.8333740234375,\"y\":981.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":383.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":387.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":392.8333740234375,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":385.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":382.8333740234375,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":963.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":384.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":387.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":389.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":390.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":390.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":393.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":396.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":398.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":947.3333435058594},{\"command\":\"L\",\"x\":401.5,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":402.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":403.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":404.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":406.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":407.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":410.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":412.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.0000305175781},{\"command\":\"L\",\"x\":415.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":418.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":420.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":423.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":423.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":421.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":422.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":424.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":425.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":428.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":429.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":430.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":432.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":434.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":437.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":440.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":441.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":442.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":443.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":444.16668701171875,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":447.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":450.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":453.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":452.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":450.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":448.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":447.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":445.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.8333740234375,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":454.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":456.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":459.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":460.8333740234375,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":461.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":462.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":464.16668701171875,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":465.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":466.16668701171875,\"y\":932.6667175292969},{\"command\":\"L\",\"x\":467.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":469.5,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":470.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":474.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":475.5,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":478.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":481.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":484.8333740234375,\"y\":934.0000305175781},{\"command\":\"L\",\"x\":488.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":489.5,\"y\":928.0000305175781}]';
            }
            else if (this.selectedAnnotation.inkAnnotationType === "PdfViewer") {
                this.selectedAnnotation.path = "M10,50 L10,65 M10,50 L25,50 L25,57.5 L10,57.5 M40,50 L40,65 M40,50 L43,50 L55,55 L55,60 L43,65 L40,65 M80,50 L80,65 M80,50 L95,50 M80,57.5 L95,57.5 M110,50 L125,65 L140,50 M160,50 L160,65 M155,50 L165,50 M155,65 L165,65 M182,50 L192,65 L202,50 L212,65 L222,50 M230,50 L230,65 M230,50 L240,50 M230,57.5 L240,57.5 M230,65 L240,65 M255,50 L270,65 L285,50 M295,50 L295,65 M290,50 L300,50 M290,65 L300,65 M310,50 L310,65 M310,50 L325,50 M310,57.5 L325,57.5 M310,65 L325,65 M340,50 L340,65 M340,50 L355,50 L355,57.5 L340,57.5 M340,57.5 L355,65";
            }
            else if (this.selectedAnnotation.inkAnnotationType === "Star") {
                this.selectedAnnotation.path = "[{\"command\":\"M\",\"x\":72,\"y\":200},{\"command\":\"L\",\"x\":79,\"y\":65},{\"command\":\"L\",\"x\":92,\"y\":200},{\"command\":\"L\",\"x\":65,\"y\":110},{\"command\":\"L\",\"x\":95,\"y\":110},{\"command\":\"L\",\"x\":72,\"y\":200}]";
            }
            currentannotationSettings = this.annotationSettings();
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.annotationType === 'StickyNotes') {
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.annotationType === 'CustomStamp') {
            currentannotationSettings.offset = { x: this.convertPixelToPoint(currentannotationSettings.offset.x), y: this.convertPixelToPoint(currentannotationSettings.offset.y) };
            currentannotationSettings.width = this.convertPixelToPoint(currentannotationSettings.width);
            currentannotationSettings.height = this.convertPixelToPoint(currentannotationSettings.height);
            this.viewer.annotation.addAnnotation("Stamp", currentannotationSettings);
        }
        var newlyAddedAnnotation = this.viewer.annotationCollection[((_a = this.viewer.annotationCollection) === null || _a === void 0 ? void 0 : _a.length) - 1];
        if (newlyAddedAnnotation) {
            this.updateAnnotationComments(newlyAddedAnnotation);
            this.viewer.annotation.editAnnotation(newlyAddedAnnotation);
        }
        this.selectedAnnotation.annotationSelected = false;
        this.setState({
            isReplyBoxChecked: false,
            replies: []
        });
    };
    ProgrammaticOperations.prototype.updateProperties = function (currentannotation) {
        var _this = this;
        this.selectedAnnotation.pageNumber = currentannotation.pageNumber + 1;
        this.selectedAnnotation.fillColor = currentannotation.fillColor;
        this.selectedAnnotation.strokeColor = currentannotation.strokeColor;
        if (this.IsRGBAColor(this.selectedAnnotation.fillColor)) {
            this.selectedAnnotation.fillColor = this.RGBAtoHex(this.selectedAnnotation.fillColor, "fill");
        }
        if (this.IsRGBAColor(this.selectedAnnotation.strokeColor)) {
            this.selectedAnnotation.strokeColor = this.RGBAtoHex(this.selectedAnnotation.strokeColor, "stroke");
        }
        if (currentannotation.textMarkupAnnotationType === "Highlight" || currentannotation.textMarkupAnnotationType === "Underline" || currentannotation.textMarkupAnnotationType === "Strikethrough") {
            this.selectedAnnotation.annotationType = currentannotation.textMarkupAnnotationType;
        }
        else if (currentannotation.shapeAnnotationType === "Square" && currentannotation.subject === "Rectangle") {
            this.selectedAnnotation.annotationType = "Rectangle";
        }
        else if (currentannotation.shapeAnnotationType === "Line" && currentannotation.subject === "Arrow") {
            this.selectedAnnotation.annotationType = "Arrow";
        }
        else if (currentannotation.shapeAnnotationType === "sticky") {
            this.selectedAnnotation.annotationType = "StickyNotes";
        }
        else if (currentannotation.shapeAnnotationType.toLowerCase() === "stamp") {
            if (currentannotation.stampAnnotationType) {
                if (currentannotation.stampAnnotationType === "image") {
                    this.selectedAnnotation.annotationType = "CustomStamp";
                }
                else if (currentannotation.stampAnnotationType === "path") {
                    this.selectedAnnotation.annotationType = "Stamp";
                }
            }
            else {
                this.selectedAnnotation.annotationType = "Stamp";
            }
        }
        else if (currentannotation.shapeAnnotationType === "Ink") {
            this.selectedAnnotation.annotationType = "Ink";
        }
        else if (currentannotation.shapeAnnotationType === "Line" || currentannotation.shapeAnnotationType === "Polyline" || currentannotation.shapeAnnotationType === "Square" || currentannotation.shapeAnnotationType === "Circle" || currentannotation.shapeAnnotationType === "Polygon" && currentannotation.indent) {
            if (currentannotation.vertexPoints) {
                this.selectedAnnotation.vertexPoints = this.addUniqueId(__spreadArray([], currentannotation.vertexPoints, true));
            }
            if (currentannotation.indent === "LineDimension") {
                this.selectedAnnotation.annotationType = "Distance";
            }
            else if (currentannotation.indent === "PolyLineDimension") {
                this.selectedAnnotation.annotationType = "Perimeter";
            }
            else if (currentannotation.indent === "PolyLineDimension" && currentannotation.subject === "Arrow") {
                this.selectedAnnotation.annotationType = "Arrow";
            }
            else if (currentannotation.indent === "PolygonDimension") {
                this.selectedAnnotation.annotationType = "Area";
            }
            else if (currentannotation.indent === "PolygonRadius") {
                this.selectedAnnotation.annotationType = "Radius";
            }
            else if (currentannotation.indent === "PolygonVolume") {
                this.selectedAnnotation.annotationType = "Volume";
            }
            else if (currentannotation.shapeAnnotationType === "Line" && currentannotation.shapeAnnotationType === currentannotation.subject) {
                this.selectedAnnotation.annotationType = "Line";
            }
            else if (currentannotation.shapeAnnotationType === "Circle" && currentannotation.shapeAnnotationType === currentannotation.subject) {
                this.selectedAnnotation.annotationType = "Circle";
            }
        }
        else {
            this.selectedAnnotation.annotationType = currentannotation.shapeAnnotationType;
            if (currentannotation.shapeAnnotationType === "Polygon") {
                this.selectedAnnotation.vertexPoints = this.addUniqueId(__spreadArray([], currentannotation.vertexPoints, true));
            }
        }
        if (currentannotation.fillColor) {
            this.selectedAnnotation.fillColor = currentannotation.fillColor;
        }
        this.selectedAnnotation.showInkAnnotationType = false;
        if (this.selectedAnnotation.annotationType === "Highlight" || this.selectedAnnotation.annotationType === "Underline" || this.selectedAnnotation.annotationType === "Strikethrough") {
            if (currentannotation.bounds[0] && currentannotation.bounds[0].X && currentannotation.bounds[0].Y && currentannotation.bounds[0].Width && currentannotation.bounds[0].Height) {
                this.selectedAnnotation.bounds = this.addUniqueId(currentannotation.bounds);
                this.selectedAnnotation.width = currentannotation.bounds[0].Width;
                this.selectedAnnotation.height = currentannotation.bounds[0].Height;
                this.selectedAnnotation.x = currentannotation.bounds[0].X;
                this.selectedAnnotation.y = currentannotation.bounds[0].Y;
            }
            else if (currentannotation.annotationAddMode && currentannotation.annotationAddMode === "UI Drawn Annotation") {
                this.selectedAnnotation.fillColor = currentannotation.color;
                var annotBounds = currentannotation.bounds;
                this.selectedAnnotation.bounds = [];
                var totalWidth_1 = 0, startX_1 = 0, startY_1 = 0;
                if ((annotBounds === null || annotBounds === void 0 ? void 0 : annotBounds.length) > 1) {
                    this.selectedAnnotation.x = annotBounds[0].left;
                    this.selectedAnnotation.y = annotBounds[0].top;
                    this.selectedAnnotation.height = annotBounds[0].height;
                    var isFirstBound_1 = true;
                    var left_1 = annotBounds[0].left;
                    var top_1 = annotBounds[0].top;
                    startX_1 = annotBounds[0].left;
                    startY_1 = annotBounds[0].top;
                    var width_1 = annotBounds[0].width;
                    var height_1 = annotBounds[0].height;
                    annotBounds.forEach(function (element, index, array) {
                        left_1 = element.left;
                        width_1 = element.width;
                        height_1 = element.height;
                        if (top_1 !== element.top) {
                            if (isFirstBound_1) {
                                _this.selectedAnnotation.width = totalWidth_1;
                                isFirstBound_1 = false;
                            }
                            _this.selectedAnnotation.bounds.push({
                                id: _this.generateUniqueId(),
                                X: startX_1,
                                Y: startY_1,
                                Width: totalWidth_1,
                                Height: height_1
                            });
                            totalWidth_1 = 0;
                            top_1 = element.top;
                            startX_1 = element.left;
                            startY_1 = element.top;
                        }
                        totalWidth_1 += element.width;
                    });
                    if (totalWidth_1 > 0) {
                        this.selectedAnnotation.bounds.push({
                            id: this.generateUniqueId(),
                            X: startX_1,
                            Y: startY_1,
                            Width: totalWidth_1,
                            Height: annotBounds[annotBounds.length - 1].height
                        });
                        if (isFirstBound_1) {
                            this.selectedAnnotation.width = totalWidth_1;
                            isFirstBound_1 = false;
                        }
                    }
                }
                else {
                    this.selectedAnnotation.bounds = {
                        id: this.generateUniqueId(),
                        X: currentannotation.bounds[0].left,
                        Y: currentannotation.bounds[0].top,
                        Height: currentannotation.bounds[0].height,
                        Width: currentannotation.bounds[0].width
                    };
                }
                this.selectedAnnotation.width = currentannotation.bounds[0].width;
                this.selectedAnnotation.height = currentannotation.bounds[0].height;
                this.selectedAnnotation.x = currentannotation.bounds[0].left;
                this.selectedAnnotation.y = currentannotation.bounds[0].top;
            }
            else {
                this.selectedAnnotation.bounds = this.addUniqueId(currentannotation.bounds);
                this.selectedAnnotation.width = currentannotation.bounds[0].Width;
                this.selectedAnnotation.height = currentannotation.bounds[0].Height;
                this.selectedAnnotation.x = currentannotation.bounds[0].X;
                this.selectedAnnotation.y = currentannotation.bounds[0].Y;
            }
            this.selectedAnnotation.fillColor = currentannotation.color;
        }
        else if (this.selectedAnnotation.annotationType === "Line" || this.selectedAnnotation.annotationType === "Arrow" || this.selectedAnnotation.annotationType === "Distance") {
            this.selectedAnnotation.vertexX1 = currentannotation.vertexPoints[0].x;
            this.selectedAnnotation.vertexY1 = currentannotation.vertexPoints[0].y;
            this.selectedAnnotation.vertexX2 = currentannotation.vertexPoints[1].x;
            this.selectedAnnotation.vertexY2 = currentannotation.vertexPoints[1].y;
            this.selectedAnnotation.vertexPoints = [];
            if (this.selectedAnnotation.annotationType === "Distance") {
                this.selectedAnnotation.leaderLength = currentannotation.leaderLength;
            }
        }
        else if (this.selectedAnnotation.annotationType === "Ink") {
            this.selectedAnnotation.width = currentannotation.bounds.width;
            this.selectedAnnotation.height = currentannotation.bounds.height;
            this.selectedAnnotation.x = currentannotation.bounds.x;
            this.selectedAnnotation.y = currentannotation.bounds.y;
            this.selectedAnnotation.showInkAnnotationType = true;
        }
        else if (this.selectedAnnotation.annotationType === "FreeText") {
            this.selectedAnnotation.width = currentannotation.bounds.width;
            this.selectedAnnotation.height = currentannotation.bounds.height;
            this.selectedAnnotation.x = currentannotation.bounds.left;
            this.selectedAnnotation.y = currentannotation.bounds.top;
            this.selectedAnnotation.defaultText = currentannotation.dynamicText;
            this.selectedAnnotation.fontFamily = currentannotation.fontFamily;
            this.selectedAnnotation.alignment = currentannotation.textAlign;
            this.selectedAnnotation.fontSize = currentannotation.fontSize;
            this.selectedAnnotation.fontColor = currentannotation.fontColor;
            if (currentannotation.font) {
                if (currentannotation.font.isBold) {
                    this.selectedAnnotation.fontStyle = "Bold";
                }
                else if (currentannotation.font.isItalic) {
                    this.selectedAnnotation.fontStyle = "Italic";
                }
                else if (currentannotation.font.isUnderline) {
                    this.selectedAnnotation.fontStyle = "Underline";
                }
                else if (currentannotation.font.isStrikeout) {
                    this.selectedAnnotation.fontStyle = "Strikethrough";
                }
                else {
                    this.selectedAnnotation.fontStyle = "None";
                }
            }
            else {
                this.selectedAnnotation.fontStyle = "None";
            }
        }
        else {
            this.selectedAnnotation.width = currentannotation.bounds.width;
            this.selectedAnnotation.height = currentannotation.bounds.height;
            this.selectedAnnotation.x = currentannotation.bounds.left;
            this.selectedAnnotation.y = currentannotation.bounds.top;
        }
        if (this.selectedAnnotation.annotationType === "Polygon" || this.selectedAnnotation.annotationType === "Perimeter" ||
            this.selectedAnnotation.annotationType === "Area" || this.selectedAnnotation.annotationType === "Volume") {
            this.selectedAnnotation.vertexPoints = this.addUniqueId(__spreadArray([], currentannotation.vertexPoints, true));
        }
        if (currentannotation.lineHeadStartStyle && currentannotation.lineHeadEndStyle) {
            this.selectedAnnotation.lineHeadStartStyle = currentannotation.lineHeadStartStyle;
            this.selectedAnnotation.lineHeadEndStyle = currentannotation.lineHeadEndStyle;
        }
        else if (currentannotation.lineHeadStart && currentannotation.lineHeadEnd) {
            this.selectedAnnotation.lineHeadStartStyle = this.viewer.annotation.getArrowType(currentannotation.lineHeadStart);
            this.selectedAnnotation.lineHeadEndStyle = this.viewer.annotation.getArrowType(currentannotation.lineHeadEnd);
        }
        else {
            if (this.selectedAnnotation.annotationType === "Line") {
                this.selectedAnnotation.lineHeadStartStyle = "None";
                this.selectedAnnotation.lineHeadEndStyle = "None";
            }
            else {
                this.selectedAnnotation.lineHeadStartStyle = "Arrow";
                this.selectedAnnotation.lineHeadEndStyle = "Arrow";
            }
        }
        if (currentannotation.isPrint) {
            this.selectedAnnotation.isPrint = true;
        }
        else {
            this.selectedAnnotation.isPrint = false;
        }
        this.selectedAnnotation.isLocked = currentannotation.annotationSettings.isLock;
        if (this.selectedAnnotation.isLocked) {
            this.selectedAnnotation.allowedInteractions = currentannotation.allowedInteractions;
        }
        else {
            this.selectedAnnotation.allowedInteractions = [ej2_react_pdfviewer_1.AllowedInteraction.Select, ej2_react_pdfviewer_1.AllowedInteraction.Resize];
        }
        this.selectedAnnotation.opacity = currentannotation.opacity >= 100 ? currentannotation.opacity : currentannotation.opacity * 100;
        this.selectedAnnotation.thickness = currentannotation.thickness;
        this.selectedAnnotation.strokeColor = currentannotation.strokeColor;
        if (currentannotation.note) {
            this.selectedAnnotation.comment = currentannotation.note;
        }
        else if (currentannotation.notes) {
            this.selectedAnnotation.comment = currentannotation.notes;
        }
        else {
            this.selectedAnnotation.comment = "";
        }
        this.selectedAnnotation.author = currentannotation.author;
        this.selectedAnnotation.modifiedDate = currentannotation.modifiedDate;
        this.selectedAnnotation.setState = currentannotation.state;
        this.selectedAnnotation.showStampType = false;
        this.selectedAnnotation.disableInkAnnotField = true;
        this.selectedAnnotation.showFileUploader = false;
        this.selectedAnnotation.replies = [];
        if (this.selectedAnnotation.replies.length === 0 && currentannotation.comments) {
            if (currentannotation.comments.length > 0) {
                currentannotation.comments.forEach(function (element) {
                    var reply = new Comment();
                    reply.id = element.annotName;
                    reply.author = element.author;
                    reply.note = element.note;
                    reply.modifiedDate = element.modifiedDate;
                    reply.state = element.state;
                    _this.selectedAnnotation.replies.push(reply);
                });
            }
        }
        if (this.selectedAnnotation.replies.length === 0 && currentannotation.replyComment) {
            if (currentannotation.replyComment.length > 0) {
                currentannotation.replyComment.forEach(function (element) {
                    var reply = new Comment();
                    reply.id = _this.generateUniqueId();
                    reply.author = _this.selectedAnnotation.replyAuthor;
                    reply.note = element;
                    reply.modifiedDate = new Date().toDateString();
                    reply.state = 'None';
                    _this.selectedAnnotation.replies.push(reply);
                });
            }
        }
        this.updatePropertiesInUI();
        this.setState({
            showAnnotationList: false,
            showPageNumber: false
        });
    };
    ProgrammaticOperations.prototype.addUniqueId = function (array) {
        var _this = this;
        if (array) {
            array.forEach(function (value) {
                value.id = _this.generateUniqueId();
            });
        }
        else {
            array = [];
        }
        return array;
    };
    ProgrammaticOperations.prototype.onAnnotationMoved = function (annotationMoveEventArgs) {
        this.selectedAnnotation.annotationSelected = true;
        this.currentUpdateAnnotationID = annotationMoveEventArgs.annotationId;
        var currentAnnotation = this.getAnnotationById(this.currentUpdateAnnotationID);
        if (currentAnnotation) {
            currentAnnotation.bounds = annotationMoveEventArgs.currentPosition;
            this.updateProperties(currentAnnotation);
        }
    };
    ProgrammaticOperations.prototype.onAnnotationResized = function (annotationResizeEventArgs) {
        this.selectedAnnotation.annotationSelected = true;
        this.currentUpdateAnnotationID = annotationResizeEventArgs.annotationId;
        var currentAnnotation = this.getAnnotationById(this.currentUpdateAnnotationID);
        if (currentAnnotation) {
            currentAnnotation.bounds = annotationResizeEventArgs.annotationBound;
            this.updateProperties(currentAnnotation);
        }
    };
    ProgrammaticOperations.prototype.updatePropertiesInUI = function () {
        if (this.IsRGBAColor(this.selectedAnnotation.fillColor)) {
            this.selectedAnnotation.fillColor = this.RGBAtoHex(this.selectedAnnotation.fillColor, "fill");
        }
        if (this.IsRGBAColor(this.selectedAnnotation.strokeColor)) {
            this.selectedAnnotation.strokeColor = this.RGBAtoHex(this.selectedAnnotation.strokeColor, "stroke");
        }
        if (this.selectedAnnotation.isLocked) {
            if ((0, ej2_base_1.isNullOrUndefined)(this.selectedAnnotation.allowedInteractions) || (this.selectedAnnotation.allowedInteractions.length === 0)) {
                this.selectedAnnotation.allowedInteractions = [ej2_react_pdfviewer_1.AllowedInteraction.Select, ej2_react_pdfviewer_1.AllowedInteraction.Resize];
            }
        }
        else {
            this.selectedAnnotation.allowedInteractions = [ej2_react_pdfviewer_1.AllowedInteraction.Select, ej2_react_pdfviewer_1.AllowedInteraction.Resize];
        }
        this.setState({
            annotationType: this.selectedAnnotation.annotationType,
            pageNumber: this.selectedAnnotation.pageNumber,
            width: this.selectedAnnotation.width,
            height: this.selectedAnnotation.height,
            x: this.selectedAnnotation.x,
            y: this.selectedAnnotation.y,
            x1: this.selectedAnnotation.vertexX1,
            y1: this.selectedAnnotation.vertexY1,
            x2: this.selectedAnnotation.vertexX2,
            y2: this.selectedAnnotation.vertexY2,
            opacity: this.selectedAnnotation.opacity,
            fillColor: this.selectedAnnotation.fillColor,
            strokeThickness: this.selectedAnnotation.thickness,
            strokeColor: this.selectedAnnotation.strokeColor,
            lineHeadStartStyle: this.selectedAnnotation.lineHeadStartStyle,
            lineHeadEndStyle: this.selectedAnnotation.lineHeadEndStyle,
            leaderLength: this.selectedAnnotation.leaderLength,
            inkAnnotationType: this.selectedAnnotation.inkAnnotationType,
            showInkAnnotationType: this.selectedAnnotation.showInkAnnotationType,
            disableInkAnnotField: this.selectedAnnotation.disableInkAnnotField,
            defaultText: this.selectedAnnotation.defaultText,
            fontFamily: this.selectedAnnotation.fontFamily,
            alignment: this.selectedAnnotation.alignment,
            fontSize: this.selectedAnnotation.fontSize,
            fontColor: this.selectedAnnotation.fontColor,
            fontStyle: this.selectedAnnotation.fontStyle,
            author: this.selectedAnnotation.author,
            comment: this.selectedAnnotation.comment,
            commentState: this.selectedAnnotation.setState,
            replyAuthor: this.selectedAnnotation.replyAuthor,
            replyComment: this.selectedAnnotation.replyComment,
            replyState: this.selectedAnnotation.replyState,
            printAnnotation: this.selectedAnnotation.isPrint,
            showStampType: this.selectedAnnotation.showStampType,
            vertexPoints: (this.selectedAnnotation.vertexPoints ? __spreadArray([], this.selectedAnnotation.vertexPoints, true) : []),
            bounds: this.selectedAnnotation.bounds ? __spreadArray([], this.selectedAnnotation.bounds, true) : [],
            lockAnnotation: this.selectedAnnotation.isLocked,
            allowedInteractions: this.selectedAnnotation.allowedInteractions,
            isReplyBoxChecked: (this.selectedAnnotation.replies && (this.selectedAnnotation.replies.length > 0)),
            replies: (this.selectedAnnotation.replies && (this.selectedAnnotation.replies.length > 0)) ? __spreadArray([], this.selectedAnnotation.replies, true) : [],
            isDeleteBoundsDisabled: (0, ej2_base_1.isNullOrUndefined)(this.selectedAnnotation.bounds) ? ((this.selectedAnnotation.bounds.length > 1) ? false : true) : true,
            isDeleteVertexDisabled: (0, ej2_base_1.isNullOrUndefined)(this.selectedAnnotation.vertexPoints) ? ((this.selectedAnnotation.vertexPoints.length > 1) ? false : true) : true
        });
    };
    ProgrammaticOperations.prototype.resetAnnotationProperties = function () {
        var selectedAnnotation = this.selectedAnnotation;
        var shapeAnnotation = selectedAnnotation.annotationType;
        selectedAnnotation.x = 100;
        selectedAnnotation.y = 100;
        selectedAnnotation.fillColor = "#FFFFFF00";
        selectedAnnotation.strokeColor = "#FF0000FF";
        selectedAnnotation.showStampType = false;
        selectedAnnotation.showInkAnnotationType = false;
        selectedAnnotation.showFileUploader = false;
        //reset the properties
        if (shapeAnnotation == "Arrow" || shapeAnnotation == "Distance") {
            selectedAnnotation.lineHeadStartStyle = "Arrow";
            selectedAnnotation.lineHeadEndStyle = "Arrow";
        }
        else if (shapeAnnotation == "Perimeter") {
            selectedAnnotation.lineHeadStartStyle = "OpenArrow";
            selectedAnnotation.lineHeadEndStyle = "OpenArrow";
        }
        else {
            selectedAnnotation.lineHeadEndStyle = "None";
            selectedAnnotation.lineHeadStartStyle = "None";
        }
        if (shapeAnnotation == "Distance") {
            selectedAnnotation.leaderLength = 0;
        }
        if (shapeAnnotation == "Rectangle" || shapeAnnotation == "Square" || shapeAnnotation == "Circle" || shapeAnnotation == "Radius") {
            selectedAnnotation.width = 100;
            selectedAnnotation.height = 100;
        }
        else if (shapeAnnotation == "Ink") {
            selectedAnnotation.width = 150;
            selectedAnnotation.height = 60;
            selectedAnnotation.showInkAnnotationType = true;
            selectedAnnotation.disableInkAnnotField = selectedAnnotation.annotationSelected;
        }
        else if (shapeAnnotation == "FreeText") {
            selectedAnnotation.width = 150;
            selectedAnnotation.height = 26.5;
            selectedAnnotation.fontFamily = "Helvetica";
            selectedAnnotation.fontStyle = "None";
            selectedAnnotation.alignment = "Left";
            selectedAnnotation.defaultText = "Free Text";
            selectedAnnotation.fontSize = 16;
            selectedAnnotation.fontColor = "#000000FF";
        }
        else if (shapeAnnotation == "StickyNotes") {
            selectedAnnotation.width = 30;
            selectedAnnotation.height = 30;
        }
        else if (shapeAnnotation == "Stamp") {
            if (selectedAnnotation.stampType == "Dynamic") {
                selectedAnnotation.width = 140;
                selectedAnnotation.height = 55;
            }
            else if (selectedAnnotation.stampType === "Sign Here") {
                switch (selectedAnnotation.stampComment) {
                    case "SignHere": {
                        selectedAnnotation.width = 110;
                        selectedAnnotation.height = 30;
                        break;
                    }
                    case "Witness": {
                        selectedAnnotation.width = 130;
                        selectedAnnotation.height = 30;
                        break;
                    }
                    case "InitialHere": {
                        selectedAnnotation.width = 90;
                        selectedAnnotation.height = 30;
                        break;
                    }
                    case "Accepted":
                    case "Rejected": {
                        selectedAnnotation.width = 35;
                        selectedAnnotation.height = 35;
                        break;
                    }
                }
            }
            else if (selectedAnnotation.stampType === "Standard Business") {
                selectedAnnotation.height = 30;
                switch (selectedAnnotation.stampComment) {
                    case "Final":
                    case "Draft": {
                        selectedAnnotation.width = 110;
                        break;
                    }
                    case "Void": {
                        selectedAnnotation.width = 100;
                        break;
                    }
                    default: {
                        selectedAnnotation.width = 130;
                        break;
                    }
                }
            }
            selectedAnnotation.showStampType = !selectedAnnotation.annotationSelected;
        }
        else if (shapeAnnotation == "CustomStamp") {
            selectedAnnotation.width = 100;
            selectedAnnotation.height = 100;
            selectedAnnotation.showFileUploader = !selectedAnnotation.annotationSelected;
        }
        else if ((shapeAnnotation == "Highlight") || (shapeAnnotation == "Underline") || (shapeAnnotation == "Strikethrough")) {
            selectedAnnotation.width = 100;
            selectedAnnotation.height = 14;
        }
        else {
            selectedAnnotation.width = 0;
            selectedAnnotation.height = 0;
        }
        if ((shapeAnnotation == "Highlight") || (shapeAnnotation == "Underline") || (shapeAnnotation == "Strikethrough") || shapeAnnotation == "FreeText") {
            selectedAnnotation.x = 10;
            selectedAnnotation.y = 10;
            if (selectedAnnotation.annotationType === 'Highlight') {
                selectedAnnotation.fillColor = '#FFDF56FF';
            }
            else if (selectedAnnotation.annotationType === 'Underline') {
                selectedAnnotation.fillColor = '#00FF00FF';
            }
            else if (selectedAnnotation.annotationType === 'Strikethrough') {
                selectedAnnotation.fillColor = '#FF0000FF';
            }
            else {
                selectedAnnotation.fillColor = "#FFFFFF00";
            }
            selectedAnnotation.strokeColor = "#FFFFFF00";
        }
        if ((shapeAnnotation === "Polygon") || (shapeAnnotation === "Perimeter") || (shapeAnnotation === "Area") || (shapeAnnotation === "Volume")) {
            selectedAnnotation.x = 10;
            selectedAnnotation.y = 10;
        }
        selectedAnnotation.opacity = 100;
        selectedAnnotation.thickness = 1;
        selectedAnnotation.author = "Guest";
        selectedAnnotation.comment = "";
        selectedAnnotation.setState = "None";
        selectedAnnotation.replyAuthor = "Guest";
        selectedAnnotation.replyComment = "";
        selectedAnnotation.replyState = "None";
        selectedAnnotation.vertexX1 = 100;
        selectedAnnotation.vertexX2 = 200;
        selectedAnnotation.vertexY1 = 100;
        selectedAnnotation.vertexY2 = 100;
        selectedAnnotation.vertexPoints = [];
        selectedAnnotation.bounds = [];
        selectedAnnotation.replies = [];
        selectedAnnotation.isLocked = false;
        selectedAnnotation.isPrint = true;
        selectedAnnotation.allowedInteractions = [ej2_react_pdfviewer_1.AllowedInteraction.Select, ej2_react_pdfviewer_1.AllowedInteraction.Resize];
        this.uploaderObj.clearAll();
        this.updatePropertiesInUI();
    };
    ProgrammaticOperations.prototype.updateChangesAnnotation = function () {
        var currentAnnotation = this.getAnnotationById(this.currentUpdateAnnotationID);
        if (currentAnnotation) {
            var updatedValues = this.annotationUpdate(currentAnnotation);
            this.viewer.annotation.editAnnotation(updatedValues);
            this.setState({
                showUpdateAnnotation: false
            });
        }
    };
    ProgrammaticOperations.prototype.getAnnotationById = function (annotationId) {
        if (this.viewer && this.viewer.annotationCollection) {
            for (var index = 0; index < this.viewer.annotationCollection.length; index++) {
                if (this.viewer.annotationCollection[index].annotationId === annotationId) {
                    return this.viewer.annotationCollection[index];
                }
            }
        }
        return null;
    };
    ProgrammaticOperations.prototype.updateReply = function () {
        var currentReplyComment = new Comment();
        currentReplyComment.id = this.generateUniqueId();
        currentReplyComment.author = this.selectedAnnotation.replyAuthor;
        currentReplyComment.note = this.selectedAnnotation.replyComment;
        currentReplyComment.modifiedDate = new Date().toDateString();
        currentReplyComment.state = this.selectedAnnotation.replyState;
        if ((0, ej2_base_1.isNullOrUndefined)(this.selectedAnnotation.replies)) {
            this.selectedAnnotation.replies = [];
        }
        this.selectedAnnotation.replies.push(currentReplyComment);
        this.selectedAnnotation.replyAuthor = "Guest";
        this.selectedAnnotation.replyComment = "";
        this.selectedAnnotation.replyState = "None";
        this.setState(function (prevState) {
            return {
                replies: __spreadArray(__spreadArray([], prevState.replies, true), [currentReplyComment], false),
                replyAuthor: "Guest",
                replyComment: "",
                replyState: "None"
            };
        });
    };
    ProgrammaticOperations.prototype.generateUniqueId = function () {
        return (0, uuid_1.v4)();
    };
    ProgrammaticOperations.prototype.getCommentID = function (commentId) {
        this.currentEditCommentId = commentId;
    };
    ProgrammaticOperations.prototype.onEditButtonClick = function (commentId) {
        var comment = this.selectedAnnotation.replies.find(function (comment) { return comment.id === commentId; });
        if (comment) {
            this.selectedAnnotation.replyAuthor = comment.author;
            this.selectedAnnotation.replyComment = comment.note;
            this.selectedAnnotation.replyState = comment.state;
        }
        this.setState({
            isEditing: true,
            replyAuthor: this.selectedAnnotation.replyAuthor,
            replyComment: this.selectedAnnotation.replyComment,
            replyState: this.selectedAnnotation.replyState
        });
    };
    ProgrammaticOperations.prototype.onreplycommentdelete = function (commentId) {
        var commentIndex = this.selectedAnnotation.replies.findIndex(function (comment) { return comment.id === commentId; });
        if (commentIndex !== -1) {
            this.selectedAnnotation.replies.splice(commentIndex, 1);
        }
        this.setState({
            replies: __spreadArray([], this.selectedAnnotation.replies, true)
        });
    };
    ProgrammaticOperations.prototype.updateEditReply = function () {
        var _this = this;
        var currentReplyComment;
        if (this.state.isEditing && this.currentEditCommentId) {
            var replyIndex = void 0;
            replyIndex = this.selectedAnnotation.replies.findIndex(function (comment) { return comment.id === _this.currentEditCommentId; });
            if (replyIndex !== -1) {
                currentReplyComment = this.selectedAnnotation.replies[replyIndex];
            }
            if (currentReplyComment) {
                currentReplyComment.author = this.selectedAnnotation.replyAuthor;
                currentReplyComment.note = this.selectedAnnotation.replyComment;
                currentReplyComment.state = this.selectedAnnotation.replyState;
                currentReplyComment.modifiedDate = new Date().toDateString();
            }
            else {
                console.error("Comment with ID ".concat(this.currentEditCommentId, " not found."));
            }
            this.currentEditCommentId = "";
            this.setState({
                isEditing: false,
                replies: __spreadArray([], this.selectedAnnotation.replies, true)
            });
        }
    };
    ProgrammaticOperations.prototype.OpenContextMenu = function (event) {
        this.contextMenu.open(event.clientY, event.clientX);
    };
    ;
    ProgrammaticOperations.prototype.annotationUpdate = function (currentAnnotation) {
        var _this = this;
        var _a, _b;
        currentAnnotation.opacity = this.selectedAnnotation.opacity;
        currentAnnotation.fillColor = this.selectedAnnotation.fillColor;
        currentAnnotation.thickness = this.selectedAnnotation.thickness;
        currentAnnotation.strokeColor = this.selectedAnnotation.strokeColor;
        currentAnnotation.color = "";
        if (this.selectedAnnotation.annotationType === "Highlight" || this.selectedAnnotation.annotationType === "Underline" || this.selectedAnnotation.annotationType === "Strikethrough") {
            currentAnnotation.bounds = [];
            currentAnnotation.color = this.selectedAnnotation.fillColor;
            if (((_a = this.selectedAnnotation.bounds) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                currentAnnotation.bounds.push({
                    id: this.generateUniqueId(),
                    X: this.selectedAnnotation.x,
                    Y: this.selectedAnnotation.y,
                    Height: this.selectedAnnotation.height,
                    Width: this.selectedAnnotation.width,
                    Top: this.selectedAnnotation.y,
                    Left: this.selectedAnnotation.x
                });
            }
            else if (((_b = this.selectedAnnotation.bounds) === null || _b === void 0 ? void 0 : _b.length) >= 1) {
                this.selectedAnnotation.bounds.forEach(function (value, index) {
                    currentAnnotation.bounds.push({
                        id: _this.generateUniqueId(),
                        X: _this.selectedAnnotation.bounds[index].X,
                        Y: _this.selectedAnnotation.bounds[index].Y,
                        Height: _this.selectedAnnotation.bounds[index].Height,
                        Width: _this.selectedAnnotation.bounds[index].Width,
                        Top: _this.selectedAnnotation.bounds[index].Y,
                        Left: _this.selectedAnnotation.bounds[index].X
                    });
                });
            }
        }
        else if (this.selectedAnnotation.annotationType === "Ink") {
            currentAnnotation.bounds.width = this.selectedAnnotation.width;
            currentAnnotation.bounds.height = this.selectedAnnotation.height;
            currentAnnotation.bounds.x = this.selectedAnnotation.x;
            currentAnnotation.bounds.y = this.selectedAnnotation.y;
        }
        else if (this.selectedAnnotation.annotationType === "Line" || this.selectedAnnotation.annotationType === "Arrow" || this.selectedAnnotation.annotationType === "Distance") {
            currentAnnotation.vertexPoints[0] = { x: this.selectedAnnotation.vertexX1, y: this.selectedAnnotation.vertexY1 };
            currentAnnotation.vertexPoints[1] = { x: this.selectedAnnotation.vertexX2, y: this.selectedAnnotation.vertexY2 };
            currentAnnotation.lineHeadStartStyle = this.selectedAnnotation.lineHeadStartStyle;
            currentAnnotation.lineHeadEndStyle = this.selectedAnnotation.lineHeadEndStyle;
            currentAnnotation.offset = { x: currentAnnotation.vertexPoints[0].x, y: currentAnnotation.vertexPoints[0].y };
            if (this.selectedAnnotation.annotationType === "Line") {
                currentAnnotation.subType = "Line";
            }
            else if (this.selectedAnnotation.annotationType === "Arrow") {
                currentAnnotation.subType = "Arrow";
            }
            else if (this.selectedAnnotation.annotationType === "Distance") {
                currentAnnotation.subType = "Distance";
            }
        }
        else if (this.selectedAnnotation.annotationType === "Polygon" || this.selectedAnnotation.annotationType === "Perimeter" || this.selectedAnnotation.annotationType === "Area" || this.selectedAnnotation.annotationType === "Volume") {
            currentAnnotation.vertexPoints = this.selectedAnnotation.vertexPoints;
            currentAnnotation.bounds.width = this.selectedAnnotation.width;
            currentAnnotation.bounds.height = this.selectedAnnotation.height;
            currentAnnotation.bounds.left = this.selectedAnnotation.x;
            currentAnnotation.bounds.top = this.selectedAnnotation.y;
        }
        else if (this.selectedAnnotation.annotationType === "FreeText") {
            currentAnnotation.bounds.width = this.selectedAnnotation.width;
            currentAnnotation.bounds.height = this.selectedAnnotation.height;
            currentAnnotation.bounds.left = this.selectedAnnotation.x;
            currentAnnotation.bounds.top = this.selectedAnnotation.y;
            currentAnnotation.bounds.x = this.selectedAnnotation.x;
            currentAnnotation.bounds.y = this.selectedAnnotation.y;
            currentAnnotation.dynamicText = this.selectedAnnotation.defaultText;
            currentAnnotation.fontFamily = this.selectedAnnotation.fontFamily;
            currentAnnotation.textAlign = this.selectedAnnotation.alignment;
            currentAnnotation.fontSize = this.selectedAnnotation.fontSize;
            currentAnnotation.fontColor = this.selectedAnnotation.fontColor;
            currentAnnotation.font.isBold = false;
            currentAnnotation.font.isUnderline = false;
            currentAnnotation.font.isItalic = false;
            currentAnnotation.font.isStrikeout = false;
            switch (this.selectedAnnotation.fontStyle) {
                case "Bold": {
                    currentAnnotation.font.isBold = true;
                    break;
                }
                case "Underline": {
                    currentAnnotation.font.isUnderline = true;
                    break;
                }
                case "Italic": {
                    currentAnnotation.font.isItalic = true;
                    break;
                }
                case "Strikethrough": {
                    currentAnnotation.font.isStrikeout = true;
                    break;
                }
            }
        }
        else {
            currentAnnotation.bounds.width = this.selectedAnnotation.width;
            currentAnnotation.bounds.height = this.selectedAnnotation.height;
            currentAnnotation.bounds.left = this.selectedAnnotation.x;
            currentAnnotation.bounds.top = this.selectedAnnotation.y;
            if (!(0, ej2_base_1.isNullOrUndefined)(currentAnnotation.bounds.x) && !(0, ej2_base_1.isNullOrUndefined)(currentAnnotation.bounds.y)) {
                currentAnnotation.bounds.x = this.selectedAnnotation.x;
                currentAnnotation.bounds.y = this.selectedAnnotation.y;
            }
        }
        if (this.selectedAnnotation.annotationType === "Distance") {
            currentAnnotation.leaderLength = this.selectedAnnotation.leaderLength;
        }
        else {
            currentAnnotation.leaderLength = 0;
        }
        if (this.selectedAnnotation.annotationType === "Polygon" || this.selectedAnnotation.annotationType === "Perimeter" || this.selectedAnnotation.annotationType === "Area" || this.selectedAnnotation.annotationType === "Volume") {
            currentAnnotation.vertexPoints = this.selectedAnnotation.vertexPoints;
        }
        currentAnnotation.isPrint = this.selectedAnnotation.isPrint;
        currentAnnotation.isLocked = this.selectedAnnotation.isLocked;
        currentAnnotation.annotationSettings.isLock = this.selectedAnnotation.isLocked;
        if (this.selectedAnnotation.isLocked) {
            currentAnnotation.allowedInteractions = this.selectedAnnotation.allowedInteractions.map(function (value) { return value.toString(); });
            if (currentAnnotation.allowedInteractions.length === 0) {
                currentAnnotation.allowedInteractions = ["None"];
            }
        }
        else {
            currentAnnotation.allowedInteractions = ["None"];
        }
        this.updateAnnotationComments(currentAnnotation);
        return currentAnnotation;
    };
    ProgrammaticOperations.prototype.updateAnnotationComments = function (currentAnnotation) {
        var _a, _b;
        var isReplyChanged = false;
        currentAnnotation.commentType = "add";
        if (((!(0, ej2_base_1.isNullOrUndefined)(currentAnnotation.note) && (currentAnnotation.note !== this.selectedAnnotation.comment)) || (!(0, ej2_base_1.isNullOrUndefined)(currentAnnotation.notes) && (currentAnnotation.notes !== this.selectedAnnotation.comment))) && (currentAnnotation.comments && (currentAnnotation.comments.length > 0))) {
            currentAnnotation.commentType = "edit";
        }
        var shapeType = (_a = currentAnnotation.indent) !== null && _a !== void 0 ? _a : "";
        if (shapeType !== "LineDimension" && shapeType !== "PolyLineDimension" && shapeType !== "PolygonDimension" && shapeType !== "PolygonRadius" && shapeType !== "PolygonVolume") {
            if (!(0, ej2_base_1.isNullOrUndefined)(currentAnnotation.note) || (currentAnnotation.shapeAnnotationType === "Ink" && !currentAnnotation.note)) {
                currentAnnotation.note = this.selectedAnnotation.comment;
            }
            else if (!(0, ej2_base_1.isNullOrUndefined)(currentAnnotation.notes)) {
                currentAnnotation.notes = this.selectedAnnotation.comment;
            }
        }
        currentAnnotation.replyComment = [];
        if (((_b = this.selectedAnnotation.replies) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            if (this.selectedAnnotation.replies.length > currentAnnotation.comments.length) {
                var diff = (this.selectedAnnotation.replies.length - currentAnnotation.comments.length);
                currentAnnotation.commentType = "add";
                for (var index = (this.selectedAnnotation.replies.length - diff); index < (this.selectedAnnotation.replies.length); index++) {
                    currentAnnotation.replyComment.push(this.selectedAnnotation.replies[index].note);
                }
            }
            else if (this.selectedAnnotation.replies.length === currentAnnotation.replies.length) {
                this.selectedAnnotation.replies.forEach(function (value, index) {
                    if (currentAnnotation.comments[index] && (value.note !== currentAnnotation.comments[index].note)) {
                        isReplyChanged = true;
                        currentAnnotation.commentType = "edit";
                        currentAnnotation.commentId = currentAnnotation.comments[index].annotName;
                        currentAnnotation.editComment = value.note;
                    }
                });
            }
        }
        if (!isReplyChanged) {
            currentAnnotation.commentId = null;
            currentAnnotation.editComment = null;
        }
    };
    ProgrammaticOperations.prototype.documentLoaded = function (e) {
        if (this.viewer) {
            this.setState({
                pageCount: this.viewer.pageCount
            });
        }
        if (e.documentName === 'annotations.pdf') {
            this.viewer.annotation.addAnnotation("Highlight", {
                bounds: [{ x: 97, y: 610, width: 350, height: 14 }],
                pageNumber: 1
            });
            this.viewer.annotation.addAnnotation("Underline", {
                bounds: [{ x: 97, y: 723, width: 353.5, height: 14 }],
                pageNumber: 1
            });
            this.viewer.annotation.addAnnotation("Strikethrough", {
                bounds: [{ x: 97, y: 836, width: 376.5, height: 14 }],
                pageNumber: 1
            });
            this.viewer.annotation.addAnnotation("Line", {
                offset: { x: 200, y: 230 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
            });
            this.viewer.annotation.addAnnotation("Arrow", {
                offset: { x: 200, y: 370 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 370 }, { x: 350, y: 370 }]
            });
            this.viewer.annotation.addAnnotation("Rectangle", {
                offset: { x: 200, y: 480 },
                pageNumber: 2,
                width: 150,
                height: 75
            });
            this.viewer.annotation.addAnnotation("Circle", {
                offset: { x: 200, y: 620 },
                pageNumber: 2,
                width: 90,
                height: 90
            });
            this.viewer.annotation.addAnnotation("Polygon", {
                offset: { x: 200, y: 800 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 800 }, { x: 242, y: 771 }, { x: 289, y: 799 }, { x: 278, y: 842 }, { x: 211, y: 842 }, { x: 200, y: 800 }]
            });
            this.viewer.annotation.addAnnotation("Distance", {
                offset: { x: 200, y: 230 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
            });
            this.viewer.annotation.addAnnotation("Perimeter", {
                offset: { x: 200, y: 350 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 350 }, { x: 285, y: 350 }, { x: 286, y: 412 }]
            });
            this.viewer.annotation.addAnnotation("Area", {
                offset: { x: 200, y: 500 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 500 }, { x: 288, y: 499 }, { x: 289, y: 553 }, { x: 200, y: 500 }]
            });
            this.viewer.annotation.addAnnotation("Radius", {
                offset: { x: 200, y: 630 },
                pageNumber: 3,
                width: 90,
                height: 90
            });
            this.viewer.annotation.addAnnotation("Volume", {
                offset: { x: 200, y: 810 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 810 }, { x: 200, y: 919 }, { x: 320, y: 919 }, { x: 320, y: 809 }, { x: 200, y: 810 }]
            });
            this.viewer.annotation.addAnnotation("FreeText", {
                offset: { x: 250, y: 150 },
                fontSize: 16,
                fontFamily: "Helvetica",
                pageNumber: 4,
                width: 200,
                height: 40,
                isLock: false,
                defaultText: "Syncfusion"
            });
            this.viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 240 },
                pageNumber: 4
            }, ej2_react_pdfviewer_1.DynamicStampItem.Approved);
            this.viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 350 },
                pageNumber: 4
            }, null, ej2_react_pdfviewer_1.SignStampItem.SignHere);
            this.viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 460 },
                pageNumber: 4
            }, null, null, ej2_react_pdfviewer_1.StandardBusinessStampItem.Confidential);
            //The customStampImageSource property contains the stamp image as a base64 string
            this.viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 530 },
                pageNumber: 4,
                customStamps: [
                    {
                        customStampName: "Image",
                        customStampImageSource: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIIAqwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQHAv/EAEEQAAEDAwIEAwYDBAYLAAAAAAECAwQABREGIRIxQVETYXEHFCIygZEVQmIjUnKCJCUzU6HRFhc1c5KisbKzwvD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APcaUpQKUpQKUpQKUpQKUpQKVzXGdFtsN2ZPfbYjNJ4nHHDgJFfEK5Q5ttbuUaQhcNxvxUPcklPfflQdlYJxURpe/salthuMNpxEYvuNtKc28VKVcPGB2JB577Vyz7pNuUxy26eWlCml8Mu4OI4kR/0oB2Wvp2T17EJK43qDbloakOqL7m6I7TanHVjOMhCQTjzxgVut89i4Mqdj8Y4VlC0OIKFIUOYKTuOn0INRZZtWkrVLuDpIIHHJlPK4nX1dOJR5kk4A5DYDArVoWbHuVgTPjvF5Ul5xx5zhIBc4jkJyBlI+UHqE0FjpSlApSlApSlApSlApSlApSlApSlArClAczgVmqr7QZLptkezxHi1KvD4ihxKsFprBU6v6IB+pFBTdUKf1uUuFa0WpyUIVoYBx706chchXdKEhZSPLNXXVTsOw6NdjNxkvJS0iLEidHnDhLaPME4z5ZzVHk6kTHu1vTpyE1Jf8L3Oww1ZDaGc4XJXjklXDhP6UlWd63ybrL1rq1mNa1hLcAKEeQgcTbbvyuScHnw5KGweZJPIVRYoDT6okfSlnfWhmCwlu43FGAUKxu2j9atyT+UHvirZBixLZBaiQ2kR4zCMIQnZKRWuz2yLZ7czBgo4GWh13KidypR6qJJJPevOvaFqCXqC4HSGmzxlxQbmvJJAPXwwe2M8R9R3FQc1xde9qOqEW+C44jTFuVxPvtnHvCvI+e4HYZPavV4sdmLGajxmktMtJCENpGAkDkBUbpixRNO2dm3Q0/Cj4lrPNazzUf/uWKlkkEZByKDNKUoFKUoFKUoFKUoFKwahZ2p7dFfMZhTs+ZnHu0FHirB/VjZHqogUE3WOIYzUApzUlwBKUxLOwQCFL/bv467DCEn6qr5i6btk5ht+ZOlXlCxlLkiTxtr8whGG8fy0HdK1FZorymHbjH8dPNlC+NY/lTk1XNTe0m12SCXBFnrkOpX7uh6ItkKUBzPGEnhzjcA1bokKLAZS1BjMx20jAQy2EjHoK85i6PuOovaFNv+pWPDt8J/ggMKUCXktq+BX8HNXmT2G9HLF1trSyW2GrUFgbluT3eCIRIS26tS/iSjwgCcDl35Z3qBlSb/edVcN58e4tojKafiW2MfDQpRBXF8X5UnZPGsq5ZAr0TV2j52oL9Anx7wqCxHYWypLbeXAFH4lNqz8KiNs8x0qy2e1QrNbmYFuZDUdkYSkHOT1JPUk7k0HhsG6u3SHPeisLFwnucE95hOPdmc8DUNhR/OrCR5Ak9NvX9F6cRp20IZIR706AX1I5DA2Qn9KRsPvzJqGmXG0N6pfk3KTEhW2ykBsLKUh2Y4nKlY6lKCAOuVmuafry5T5rFs0vaHQ5JSVIm3FBaQhvq7wfNwjurAPnQZ9pms1WtlVmtDqRcnxwrdK+ERknqT0Vj7DftUN7OA1BilywWx65TnU8PjOAtMsJJzlbhBypXMhPFgADbrF6B0sNSagkzrk+5cbTDeUQ5IHwy3T+bHbYE/y9yK9sabQ02lDSAhCRhKUjAAoIaFaZ8gh++zg8vIKYsUFphB+/Ev8AmONuVTYGBgcqzSoFKUoFKUoFKUoFcV4mOW+2yJbEN6Y40gqTHYGVuHsK7awRmg8rd/1gameJn2n8Ptv5YQn+78f+8cSFLI57AJ8/Oy2eyalhxkRo79htEVI2YgQ1uEH+JSgD68NW/FQ2r7yqxWCTNZR4knZqM1/ePLPChP3IoKRc4l91FqJ3TkfUst2Aygfiz7TDTaEA8mkEAnjPXfAH2NohaPehR2Y8bVF9QwygNttJMcJSkDAAAZru0hY02CyMxFK8SWv9rMfPN55W6lE9d9vQCpughmrLNZVxI1Fc19kupYUn/wAYP+NdQVMjD+khEhsfM40nhUPMp3z9D9K76xQRN/uNxjWj3qwW9F0krKfDa8YISUn83F25VVocf2kXdR/EJlrskZQxiM14ryR5ZJA9c/SrHo973m2SFjPhCfKSzn9wPLCceXbyxUpPmRrdDemTHUMx2UFbjizgJAoPGrbpyJBRPvEi53STfhc34MRCVMrckLSvCT8aFEEjBUQdhUlfbHcrcItuYvc+VqbUBDcpf7PgDSfnJPBxBCQcDBGcnlUn7Om4kly+aonhbPBPkeGiRsIqCEqUcHkSMZ9K5bRqqMbjJ1E5FkTrndFe72m2sAF1MVBI4iD8iVKyoqO2w7VRbrJpRdkt7MGDe56GGhgJ8Njn1P8AZ9fPNd5gXNKQEXt0q7uRmz/0AqFja29znGFq2EmxuqaLzDrkhK2XUj5gF7YUNvhqsX+66nvtqlarsrsmDa7aUvQIqQULuCUqHiLdGPk4c8I686g9BMK8/lu7IxyzCB/9q4bpJkWeP7xd9TQojGeHjdipRk9hlW5/yrF21raoEGM/HcM+TMSDEhwyFuv55YA5DfcnYVx2fTD9wm/jeskMS7goYYhY42IKeyQeajtlR68tqCUjtXWVHakQL/FejupC23PcwsLSeoKVgEVsLWomsFMm1yAM5C2HGir6hSsfY1B6ILViuV50utSWkRpHvNvQTgGO6OLCe/CviB7bVMXjVMC2vCG0VTrk4MtQIeHHleZHJCf1KwKDTcNSqskB2XqSCYjTQ3fYcDzSj0SOSgSdhlP1r50FqherbM5cVQVQwmQtkNlfFxBON8/XB8wa4JNsfUzJ1Jq/wXFQWnH4tvbPEzFCUk8RyPjd2+bkOQ7nHs0iSLRY7dBkKUoy4gnYV8yHFEFxPoCtOPU+VBdaUpQKUpQKqF4H4xry027YxrYyq4yB3cPwND/vV9BVvNVTRf8ATrhqC9KIUJU4x2T2aZHAB/xcZ+tBa6UpQKr+r7lIjRWrdaz/AFrcleBF2z4W3xOq8kDf1wOtSV5ukSz216fOc4GGhk4GSo9EpHVROwHU1DaWtst2S9qG+N8Nzlp4WWSc+6R85S0P1dVHqfSgm7Rb2bTbItvjcXhR2g2kqOVKx1J6k8zVbfP+leoSxkGx2h7LxztJlD8h6FCOZ/VjtXdq25ymWY9ptSv61uSi2yr+4Rj43T5JHLzIrRfHIujtCy/dthFiqQyD8zrqhgZ7qUo/40FJsbL2q7W/YYchUdqdMlXC5SEDJQhbq/CbHTKuEEj90edXfRWi4Gk4yvAUqTMdADsp35ikckj91I7Vn2e6bTpnTUaG5hUtweLJcHVw9PQch6VZ6Dhudot12aQ1dIEWa2hXEhEllLgSe4Cga7OBPBwYHDjGMbYr6pQRNp03ZrM669arVChuu/OphkJJ8tunlUt0pSgjLxYLVew2LtAYleEctqcT8SPRXMfevq0WO12VtTdpgRoiVHKy02AVnuo8z9akaUEBr2O9L0beI8dtx1xyMpIQ2kqUodQANycZrk07JVeLyq4R2HmrZCiiJFW62UF9SilS1AHfhHAgA7b8XlVqIzWMb0GaUpQKUpQc9wkCJAkyVcmWlOH6AmoL2bsqZ0LZi4SXHowfcUeZU58ZP3VUpqNlcjT1zYaGVuRHUJA6koIFcuiZDcnR9lea+RcFkgdvgG1BN1omS48GM7JluoZYaSVuOLOEpSOZJrXdLjEtUF2bcJLceM0MrccOAP8AP0qqR4czWk1qfd2HItgZWFxLe6MLlKHJ14dE9kH1NBttDEjVVzYvtxaUza4547ZCdThSz0kLHQ4+UdAc86tcmQzDjOyJLiW2WUFxxxWwSkDJJ+lbQAOVVPU6vx29xdLsqPgBKZdzIG3ghWEtE9CtX/Kk0GzSTDlwekamnNlL08BMNCs5ZijdAweRVniPqB0qsarce1XrezWlghVsiTCp3B/tFtDicPok8CP4lq7VedSzXYFr8OBwpmyVCPEyPhStQPxEfupAKj5JNVz2eW9t2RIvLJWqGlsQbetXN1pCsuPerjmVZ6gCqLyBis0pUClKUClKUClKUClKUClKUClKUGCMjFVNqw36yeOxpmbb/wAPdcU43GntLPuqlHJCFJO6ckkJI2zzq20oKtE0iZE5q46mnKu8to8TLSmwiMwe6G99/wBSiTVoGwrNcV4uUez2yTcJiiGY7ZWrAyT2AHUk7D1oMXq6R7PapNxlk+FHQVkAZKj0SB1JOAPWozRtqfhW5ybcf9qXJz3qZk54FEbNg9kDCfoT1qGi++alvEGJdGwlq2hE+e0FApTKVu0we4Qk8R7nhNXkcqCs6q0zK1DcIWbkqNbW23ESmWk4ceCsZAV+UEAgnngnvViix2okZqPHbS2y0kIbQkYCUjYAVtpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKouv7mwi7W2HJBdZiJNxXHSd5DoUER2gOpU4rI/gq9VxO2i3PXRu6OwmFz2m/DbkKQCtKck4B+p+9BxaTtblqtQEvhM+UtUqatO4U8vdW/YbJHkkVNVgDFZoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoP//Z"
                    }
                ]
            });
            //The pathData property holds the value of the signature drawn using the ink annotation
            this.viewer.annotation.addAnnotation("Ink", {
                offset: { x: 250, y: 860 },
                pageNumber: 4,
                width: 200,
                height: 60,
                path: '[{\"command\":\"M\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":250.83334350585938,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":257.5,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":926.6667175292969},{\"command\":\"L\",\"x\":259.5,\"y\":924.0000305175781},{\"command\":\"L\",\"x\":259.5,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":258.16668701171875,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.16668701171875,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":253.5,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":925.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":927.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":253.5,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":260.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":264.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":274.16668701171875,\"y\":958.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":281.5,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":285.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":967.3333435058594},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":282.8333740234375,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":266.16668701171875,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":259.5,\"y\":993.3333435058594},{\"command\":\"L\",\"x\":252.16668701171875,\"y\":994.0000305175781},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":228.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":246.16668701171875,\"y\":972.0000305175781},{\"command\":\"L\",\"x\":257.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":262.8333435058594,\"y\":976.0000305175781},{\"command\":\"L\",\"x\":269.5,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":276.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":279.5,\"y\":978.0000305175781},{\"command\":\"L\",\"x\":285.5,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":288.16668701171875,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":293.5,\"y\":966.6667175292969},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":291.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":292.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":295.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":297.5,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":298.8333740234375,\"y\":970.6667175292969},{\"command\":\"L\",\"x\":301.5,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":304.16668701171875,\"y\":968.6667175292969},{\"command\":\"L\",\"x\":305.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":308.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":310.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":311.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":312.8333740234375,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":968.0000305175781},{\"command\":\"L\",\"x\":317.5,\"y\":972.6667175292969},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":986.0000305175781},{\"command\":\"L\",\"x\":319.5,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.8333740234375,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":987.3333435058594},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":985.3333435058594},{\"command\":\"L\",\"x\":314.16668701171875,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":320.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":321.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":322.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":322.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":326.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":328.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":328.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":329.5,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.6667175292969},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":331.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":332.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":333.5,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":334.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":335.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":336.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":337.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":338.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":340.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":341.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":342.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":344.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":346.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":349.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":350.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":351.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":355.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":356.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":358.16668701171875,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":360.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":364.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":370.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":932.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":375.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":378.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":380.8333740234375,\"y\":981.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":383.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":387.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":392.8333740234375,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":385.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":382.8333740234375,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":963.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":384.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":387.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":389.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":390.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":390.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":393.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":396.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":398.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":947.3333435058594},{\"command\":\"L\",\"x\":401.5,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":402.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":403.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":404.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":406.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":407.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":410.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":412.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.0000305175781},{\"command\":\"L\",\"x\":415.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":418.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":420.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":423.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":423.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":421.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":422.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":424.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":425.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":428.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":429.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":430.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":432.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":434.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":437.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":440.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":441.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":442.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":443.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":444.16668701171875,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":447.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":450.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":453.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":452.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":450.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":448.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":447.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":445.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.8333740234375,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":454.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":456.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":459.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":460.8333740234375,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":461.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":462.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":464.16668701171875,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":465.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":466.16668701171875,\"y\":932.6667175292969},{\"command\":\"L\",\"x\":467.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":469.5,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":470.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":474.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":475.5,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":478.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":481.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":484.8333740234375,\"y\":934.0000305175781},{\"command\":\"L\",\"x\":488.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":489.5,\"y\":928.0000305175781}]'
            });
            this.viewer.annotation.addAnnotation("StickyNotes", {
                offset: { x: 300, y: 980 },
                pageNumber: 4,
                isLock: false
            });
        }
        this.selectedAnnotation = new AnnotationBase();
        this.annotationUnSelectedEvent();
    };
    return ProgrammaticOperations;
}(sample_base_1.SampleBase));
var AnnotationBase = /** @class */ (function () {
    function AnnotationBase() {
        this.annotationType = "Rectangle";
        this.pageNumber = 1;
        this.x = 100;
        this.y = 100;
        this.width = 100;
        this.height = 100;
        this.opacity = 100;
        this.thickness = 1;
        this.fillColor = "rgba(0, 0, 0, 0)";
        this.strokeColor = "#FF0000FF";
        this.author = "Guest";
        this.setState = "None";
        this.comment = "";
        this.replyAuthor = "Guest";
        this.replyState = "None";
        this.replyComment = "";
        this.replies = [];
        this.replyMenuItems = [
            {
                text: "Edit",
            },
            {
                text: "Delete",
            },
        ];
        this.modifiedDate = new Date().toString();
        this.replyModifiedDate = new Date().toString();
        this.vertexPoints = [];
        this.bounds = [];
        this.allowedInteractions = [];
        this.lineHeadStartStyle = "None";
        this.lineHeadEndStyle = "None";
        this.leaderLength = 0;
        this.fontFamily = "Helvetica";
        this.alignment = "Left";
        this.defaultText = "Free Text";
        this.fontSize = 16;
        this.fontColor = "#000000";
        this.vertexX1 = 100;
        this.vertexY1 = 100;
        this.vertexX2 = 200;
        this.vertexY2 = 100;
        this.stampType = "Dynamic";
        this.inkAnnotationType = "Syncfusion";
        this.color = '#FFDF56';
        this.customStampName = "Image";
        this.annotationSelected = false;
        this.dynamicStamps = [
            ej2_react_pdfviewer_1.DynamicStampItem.Approved,
            ej2_react_pdfviewer_1.DynamicStampItem.Confidential,
            ej2_react_pdfviewer_1.DynamicStampItem.NotApproved,
            ej2_react_pdfviewer_1.DynamicStampItem.Received,
            ej2_react_pdfviewer_1.DynamicStampItem.Reviewed,
            ej2_react_pdfviewer_1.DynamicStampItem.Revised
        ];
        this.signStamps = [
            ej2_react_pdfviewer_1.SignStampItem.Accepted,
            ej2_react_pdfviewer_1.SignStampItem.InitialHere,
            ej2_react_pdfviewer_1.SignStampItem.Rejected,
            ej2_react_pdfviewer_1.SignStampItem.SignHere,
            ej2_react_pdfviewer_1.SignStampItem.Witness
        ];
        this.standardBusinessStamps = [
            ej2_react_pdfviewer_1.StandardBusinessStampItem.Approved,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.Completed,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.Confidential,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.Draft,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.Final,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.ForComment,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.ForPublicRelease,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.InformationOnly,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.NotApproved,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.NotForPublicRelease,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.PreliminaryResults,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.Void,
        ];
        this.isLocked = false;
        this.showStampType = false;
        this.showInkAnnotationType = false;
        this.disableInkAnnotField = false;
        this.showFileUploader = false;
        this.isPrint = true;
    }
    return AnnotationBase;
}());
exports.AnnotationBase = AnnotationBase;
var Comment = /** @class */ (function () {
    function Comment() {
    }
    return Comment;
}());
exports.default = ProgrammaticOperations;
