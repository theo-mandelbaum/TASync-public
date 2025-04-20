"use strict";
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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_base_1 = require("@syncfusion/ej2-base");
var number_formatter_1 = require("@syncfusion/ej2-base/src/intl/number-formatter");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var Comment = /** @class */ (function () {
    function Comment() {
    }
    return Comment;
}());
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
        this.fillColor = "#FFFFFF00";
        this.strokeColor = "#FF0000FF";
        this.isLocked = false;
        this.author = "Guest";
        this.setState = "None";
        this.comment = "";
        this.replyAuthor = "Guest";
        this.replyState = "";
        this.replyComment = "";
        this.replyMenuItems = [
            {
                text: "Edit",
            },
            {
                text: "Delete",
            },
        ];
        this.modifiedDate = new Date().toDateString();
        this.replyModifiedDate = new Date().toDateString();
        this.vertexPoints = [];
        this.allowedInteractions = ["None"];
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
        this.stampComment = "Approved";
        this.inkAnnotationType = "Syncfusion";
        this.color = '#FFDF56';
        this.customStampName = "Image";
        this.annotationSelected = false;
        this.bounds = [];
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
            ej2_react_pdfviewer_1.StandardBusinessStampItem.InformationOnly,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.NotApproved,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.PreliminaryResults,
            ej2_react_pdfviewer_1.StandardBusinessStampItem.Void,
        ];
        this.isPrint = true;
        this.showStampType = false;
        this.showInkAnnotationType = false;
        this.disableInkAnnotField = true;
        this.showFileUploader = false;
    }
    return AnnotationBase;
}());
exports.AnnotationBase = AnnotationBase;
function ProgrammaticOperations() {
    var syncfusionLogo = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADJCAMAAABYMS1zAAAAllBMVEX///8rNXz2kh7b3OXQ0d8jLnlMU4wfK3hYXpH5+fvz8/bv7/SRlbYAAGyLj7GMkLBGToqdoLt4fKS1t8vIydoAGHEXJXUMHnP1hAD1jAD9483+9u7707L4sXSDh6s0PoL3oE76xpr4qV/97d/5vov96NYADW/2m0b7zaX2mTv4t3v5uYT83cL4rms+R4YAAGX2kjBubpsmc7m7AAAEKUlEQVR4nO3c6VbiQBAF4Dai7AiikCbIjuyK7/9ykziTCJLuVLUcu5O5938d8x2kUr0chEAQBEEQpBgJbD/A9RLMVnPbz3C1LHw5Gdh+iCtl7Xue3AxtP8ZVMpReGOlNC/DF2Xt/I+U295rlRHoxZ5ZzzXyWWELNZGn7eX6SYHdiidrA3vYT/SBT3zuPXNt+JOOsv1tCzSKnX5y9vLB4nr/N5TQw8NIwnjzksA3MV6mWqKnlrg0EM4UlmgbyNtu8KC2fs43tx2NlobFEnDzNNmst5bMN5EYzzLKEmlVOmtpgo/8n+/fFyUVTW6ob2ZlG5qCpBbpGdhbf/QXbjmoJNTvHZ5sp3ZI521S7oxY93biqwSga3Wr+/ppjyZptaq3XMjm9Rox569Or3p/Ufz51UtZqdPs2tYf+DTl3CaZdplc11Zj5kWnxtAs2q5hANSlr4+9UTc0mRjMp6zWqfRubmK2ZJdRs0lu0RQyrKX/TTBzDEKZLVeQxfWPdGoY0XSosqpnTFka55KdgVK8aSxizpvzPolxEW8LMLvf7qPHVS2hrn4ypRreAttYADF8y2qMBe615aoTRHgxYfGkOjwYfjnbpbHOc2U/YCwD9EYfVqZm4lZHE32ktttczW05T818yNjTsYkRwcVim+R+bZG1nWMakHpcpLJvMPU3rGLGXtC+OzL6CYh8jlqT5mbKf6QDm/PRfFcq5swsYEewyLaRTZycwYVPLOGyiHc+4gYkW0bpzwMym7BZG7DUaSdwvdwYTzjaqN45PvRfoDkbMD+kan3zI5BBGBIs0jU8/N3cJk3rqLDMmZXcxlws21pm5Y5jvCzY54xz8uYYRy8PpzcbsSdlpjAhO9m2OvLN/9zDRbBNzmLcaHcQks41cMOucxIh91NTkjFvmJkYMVlJKdpWjmOi8k3+3xFWMCAxuljiLMUmxMKP3Z3JeWzFm3KRX6a6bXDfVpw4jyWNxihq6i0BX1rBiVPVrFgRBkIKkVmekZlSV9OaAEwNLtfvxSE9ye7bFKPpIXpovjBxMBs1Ws0dOPxln3p7pVV/jjGSEvCd7ivnNQZNzUA4MMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwPzvmOcCYVoFwlRLXUZKcRmnqJtcBBoysnb+lxkRBEEQSuq3jNTjKk6RYVUt/Xl1qXbuK/R04qpHRlE7mQAYRZV2SfHEmtQajN+e7T/GmArnt2fjC8TipnedX6xVYxhTc3mUYIxms/GdSRUHwxg0gQEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAaaImELdA3i9I6f3henTq5pfNzTK9CqjGxqdt3ty2g8x5qNNrxonmAq96H5sgBH1EiPJPdhbTlVyq4lTVDK41YQgCIIgCIIgSFr+AKg+KPUzaG6DAAAAAElFTkSuQmCC";
    var vertexTableNumberFormat = number_formatter_1.NumberFormat.numberFormatter(undefined, { maximumFractionDigits: 0 }, undefined);
    var toolbarSettings = {
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
    var selectedAnnotation = React.useRef(null);
    if (selectedAnnotation.current === null) {
        selectedAnnotation.current = new AnnotationBase();
    }
    var currentEditCommentId = React.useRef("");
    var _a = React.useState(true), isDeleteBoundsDisabled = _a[0], setIsDeleteBoundsDisabled = _a[1];
    var _b = React.useState(true), isDeleteVertexDisabled = _b[0], setIsDeleteVertexDisabled = _b[1];
    var _c = React.useState(selectedAnnotation.current.annotationType), annotationType = _c[0], setAnnotationType = _c[1];
    var _d = React.useState(selectedAnnotation.current.stampType), stampType = _d[0], setStampType = _d[1];
    var _e = React.useState(selectedAnnotation.current.stampComment), stampComment = _e[0], setStampComment = _e[1];
    var _f = React.useState(1), pageNumber = _f[0], setPageNumber = _f[1];
    var _g = React.useState(selectedAnnotation.current.x), x = _g[0], setX = _g[1];
    var _h = React.useState(selectedAnnotation.current.y), y = _h[0], setY = _h[1];
    var _j = React.useState(selectedAnnotation.current.width), width = _j[0], setWidth = _j[1];
    var _k = React.useState(selectedAnnotation.current.height), height = _k[0], setHeight = _k[1];
    var _l = React.useState(selectedAnnotation.current.vertexX1), x1 = _l[0], setX1 = _l[1];
    var _m = React.useState(selectedAnnotation.current.vertexY1), y1 = _m[0], setY1 = _m[1];
    var _o = React.useState(selectedAnnotation.current.vertexX2), x2 = _o[0], setX2 = _o[1];
    var _p = React.useState(selectedAnnotation.current.vertexY2), y2 = _p[0], setY2 = _p[1];
    var _q = React.useState([]), vertexPoints = _q[0], setVertexPoints = _q[1];
    var _r = React.useState([]), bounds = _r[0], setBounds = _r[1];
    var _s = React.useState(selectedAnnotation.current.thickness), strokeThickness = _s[0], setStrokeThickness = _s[1];
    var _t = React.useState(selectedAnnotation.current.opacity), opacity = _t[0], setOpacity = _t[1];
    var _u = React.useState(selectedAnnotation.current.fillColor), fillColor = _u[0], setFillColor = _u[1];
    var _v = React.useState(selectedAnnotation.current.strokeColor), strokeColor = _v[0], setStrokeColor = _v[1];
    var _w = React.useState(selectedAnnotation.current.lineHeadStartStyle), lineHeadStartStyle = _w[0], setLineHeadStartStyle = _w[1];
    var _x = React.useState(selectedAnnotation.current.lineHeadEndStyle), lineHeadEndStyle = _x[0], setLineHeadEndStyle = _x[1];
    var _y = React.useState(selectedAnnotation.current.leaderLength), leaderLength = _y[0], setLeaderLength = _y[1];
    var _z = React.useState(selectedAnnotation.current.inkAnnotationType), inkAnnotationType = _z[0], setInkAnnotationType = _z[1];
    var _0 = React.useState(selectedAnnotation.current.defaultText), defaultText = _0[0], setDefaultText = _0[1];
    var _1 = React.useState(selectedAnnotation.current.fontFamily), fontFamily = _1[0], setFontFamily = _1[1];
    var _2 = React.useState(selectedAnnotation.current.alignment), alignment = _2[0], setAlignment = _2[1];
    var _3 = React.useState(selectedAnnotation.current.fontStyle), fontStyle = _3[0], setFontStyle = _3[1];
    var _4 = React.useState(selectedAnnotation.current.fontSize), fontSize = _4[0], setFontSize = _4[1];
    var _5 = React.useState(selectedAnnotation.current.fontColor), fontColor = _5[0], setFontColor = _5[1];
    var _6 = React.useState(selectedAnnotation.current.allowedInteractions), allowedInteractions = _6[0], setAllowedInteractions = _6[1];
    var _7 = React.useState(selectedAnnotation.current.author), author = _7[0], setAuthor = _7[1];
    var _8 = React.useState(selectedAnnotation.current.comment), comment = _8[0], setComment = _8[1];
    var _9 = React.useState(selectedAnnotation.current.setState), commentState = _9[0], setCommentState = _9[1];
    var _10 = React.useState(selectedAnnotation.current.replyAuthor), replyAuthor = _10[0], setReplyAuthor = _10[1];
    var _11 = React.useState(selectedAnnotation.current.replyComment), replyComment = _11[0], setReplyComment = _11[1];
    var _12 = React.useState(selectedAnnotation.current.replyState), replyState = _12[0], setReplyState = _12[1];
    var _13 = React.useState([]), replies = _13[0], setReplies = _13[1];
    var _14 = React.useState(false), showStampType = _14[0], setStampTypeVisibility = _14[1];
    var _15 = React.useState(true), showAnnotationListField = _15[0], setAnnotationFieldVisibility = _15[1];
    var _16 = React.useState(true), showPageNumberField = _16[0], setPageNumberVisibility = _16[1];
    var _17 = React.useState(true), showAddAnnotButton = _17[0], setAddAnnotVisibility = _17[1];
    var _18 = React.useState(false), showUpdateAnnotButton = _18[0], setUpdateAnnotVisibility = _18[1];
    var _19 = React.useState(true), showStrokeProperties = _19[0], setStrokePropsVisibility = _19[1];
    var _20 = React.useState(false), showBoundsButtons = _20[0], setBoundsButtonsVisibility = _20[1];
    var _21 = React.useState(true), showFillColor = _21[0], setFillColorVisibility = _21[1];
    var _22 = React.useState(true), showXYRow = _22[0], setXYRowVisibility = _22[1];
    var _23 = React.useState(false), showX1Y1Row = _23[0], setX1Y1RowVisibility = _23[1];
    var _24 = React.useState(false), showX2Y2Row = _24[0], setX2Y2RowVisibility = _24[1];
    var _25 = React.useState(true), showHeightWidthRow = _25[0], setHeightWidthRowVisibility = _25[1];
    var _26 = React.useState(false), showLineProps = _26[0], setLinePropsVisibility = _26[1];
    var _27 = React.useState(false), showVertexButtons = _27[0], setVertexButtonsVisibility = _27[1];
    var _28 = React.useState(false), showInkAnnotationType = _28[0], setInkAnnotationTypeVisibility = _28[1];
    var _29 = React.useState(false), showFreeTextProps = _29[0], setFreeTextPropsVisibility = _29[1];
    var _30 = React.useState(false), showFileUploader = _30[0], setFileUploaderVisibility = _30[1];
    var _31 = React.useState(false), showLeaderLength = _31[0], setLeaderLengthVisibility = _31[1];
    var _32 = React.useState(false), isReplyBoxChecked = _32[0], setReplyBoxChecked = _32[1];
    var _33 = React.useState(false), lockAnnotations = _33[0], setLockAnnotations = _33[1];
    var _34 = React.useState(true), printAnnotation = _34[0], setPrintAnnotation = _34[1];
    var _35 = React.useState(false), isEditing = _35[0], setIsEditing = _35[1];
    var _36 = React.useState(1), pageCount = _36[0], setPageCount = _36[1];
    var _37 = React.useState(false), disableInkAnnotField = _37[0], setDisableInkAnnotField = _37[1];
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        setUpdateAnnotVisibility(false);
    }, []);
    var pdfviewerApiPath = {
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
        removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
    };
    var viewer;
    var uploaderObj;
    var contextMenu;
    var previewImage;
    var annotationListFields = { text: 'Text', value: 'ID' };
    var uploaderTemplate = function (data) {
        return (React.createElement("div", null,
            React.createElement("span", { className: 'wrapper' },
                React.createElement("img", { className: 'upload-image', ref: function (scope) { previewImage = scope; }, alt: 'image', src: syncfusionLogo }),
                React.createElement("span", { className: 'name file-name' }, data.name),
                React.createElement("span", { className: 'e-icons e-file-remove-btn', onClick: function () { uploaderObj.remove(); }, title: 'Remove' }))));
    };
    var annotationSettings = function () { return ({
        offset: { x: selectedAnnotation.current.x, y: selectedAnnotation.current.y },
        isLock: selectedAnnotation.current.isLocked,
        isPrint: selectedAnnotation.current.isPrint,
        pageNumber: selectedAnnotation.current.pageNumber,
        width: selectedAnnotation.current.width,
        height: selectedAnnotation.current.height,
        opacity: selectedAnnotation.current.opacity / 100,
        thickness: selectedAnnotation.current.thickness,
        strokeColor: selectedAnnotation.current.strokeColor,
        fillColor: selectedAnnotation.current.fillColor,
        bounds: (selectedAnnotation.current.bounds && selectedAnnotation.current.bounds.length > 0) ? selectedAnnotation.current.bounds.map(function (item) { return ({ x: item.X, y: item.Y, width: item.Width, height: item.Height }); }) :
            [{
                    x: selectedAnnotation.current.x,
                    y: selectedAnnotation.current.y,
                    height: selectedAnnotation.current.height,
                    width: selectedAnnotation.current.width
                }],
        vertexPoints: selectedAnnotation.current.vertexPoints,
        fontFamily: selectedAnnotation.current.fontFamily,
        fontStyle: selectedAnnotation.current.fontStyle,
        fontSize: selectedAnnotation.current.fontSize,
        defaultText: selectedAnnotation.current.defaultText,
        textAlignment: selectedAnnotation.current.alignment,
        author: selectedAnnotation.current.author,
        setState: selectedAnnotation.current.setState,
        note: selectedAnnotation.current.comment,
        notes: selectedAnnotation.current.comment,
        comments: selectedAnnotation.current.replies,
        replyAuthor: selectedAnnotation.current.replyAuthor,
        replyState: selectedAnnotation.current.replyState,
        replyComment: selectedAnnotation.current.replyComment,
        modifiedDate: selectedAnnotation.current.modifiedDate,
        replyModifiedDate: selectedAnnotation.current.replyModifiedDate,
        lineHeadEndStyle: viewer.annotation.getArrowString(selectedAnnotation.current.lineHeadEndStyle),
        lineHeadStartStyle: viewer.annotation.getArrowString(selectedAnnotation.current.lineHeadStartStyle),
        leaderLength: selectedAnnotation.current.leaderLength,
        inkAnnotationType: selectedAnnotation.current.inkAnnotationType,
        color: selectedAnnotation.current.fillColor,
        allowedInteractions: selectedAnnotation.current.allowedInteractions,
        dynamicStamps: selectedAnnotation.current.dynamicStamps,
        signStamps: selectedAnnotation.current.signStamps,
        standardBusinessStamps: selectedAnnotation.current.standardBusinessStamps,
        path: selectedAnnotation.current.path,
        fontColor: selectedAnnotation.current.fontColor,
        borderColor: selectedAnnotation.current.strokeColor,
        customStamps: [{
                customStampImageSource: selectedAnnotation.current.customStampImageSource,
                customStampName: selectedAnnotation.current.customStampName,
            }]
    }); };
    var annotationsList = [
        { ID: 'Highlight', Text: 'Highlight' },
        { ID: 'Underline', Text: 'Underline' },
        { ID: 'Strikethrough', Text: 'Strikethrough' },
        { ID: 'Line', Text: 'Line' },
        { ID: 'Arrow', Text: 'Arrow' },
        { ID: 'Rectangle', Text: 'Rectangle' },
        { ID: 'Circle', Text: 'Circle' },
        { ID: 'Polygon', Text: 'Polygon' },
        { ID: 'Distance', Text: 'Distance' },
        { ID: 'Perimeter', Text: 'Perimeter' },
        { ID: 'Area', Text: 'Area' },
        { ID: 'Radius', Text: 'Radius' },
        { ID: 'Volume', Text: 'Volume' },
        { ID: 'StickyNotes', Text: 'Sticky Notes' },
        { ID: 'Ink', Text: 'Ink' },
        { ID: 'Stamp', Text: 'Stamp' },
        { ID: 'CustomStamp', Text: 'Custom Stamp' },
        { ID: 'FreeText', Text: 'Free Text' },
    ];
    var commentStatusList = [
        { Status: 'None' },
        { Status: 'Accepted' },
        { Status: 'Cancelled' },
        { Status: 'Completed' },
        { Status: 'Rejected' }
    ];
    var commentStatusListfields = { text: 'Status' };
    var lineHeadstatusList = [
        { Type: 'None', Value: "None" },
        { Type: 'Closed Arrow', Value: "Arrow" },
        { Type: 'Open Arrow', Value: "OpenArrow" },
        { Type: 'Square', Value: "Square" },
        { Type: 'Diamond', Value: "Diamond" },
        { Type: 'Round', Value: "Circle" }
    ];
    var lineHeadstatusfield = { text: 'Type', value: 'Value' };
    var inkAnnotationDataList = [
        { Type: 'Syncfusion' },
        { Type: 'PdfViewer' },
        { Type: 'Star' }
    ];
    var inkAnnotationfield = { text: 'Type' };
    var stampTypeDataList = [
        { Type: 'Dynamic' },
        { Type: 'Sign Here' },
        { Type: 'Standard Business' },
    ];
    var stampTypeDatafields = { text: 'Type' };
    var dynamicstampCommentsList = [
        { Type: 'Approved', Value: "Approved" },
        { Type: 'Confidential', Value: "Confidential" },
        { Type: 'Not Approved', Value: "NotApproved" },
        { Type: 'Received', Value: "Received" },
        { Type: 'Reviewed', Value: "Reviewed" },
        { Type: 'Revised', Value: "Revised" },
    ];
    var sighhereCommentsList = [
        { Type: 'Accepted', Value: "Accepted" },
        { Type: 'Initial Here', Value: "InitialHere" },
        { Type: 'Rejected', Value: "Rejected" },
        { Type: 'Sign Here', Value: "SignHere" },
        { Type: 'Witness', Value: "Witness" },
    ];
    var StandardBusinessStampsList = [
        { Type: 'Approved', Value: "Approved" },
        { Type: 'Not Approved', Value: 'NotApproved' },
        { Type: 'Completed', Value: "Completed" },
        { Type: 'Confidential', Value: "Confidential" },
        { Type: 'Draft', Value: "Draft" },
        { Type: 'Final', Value: "Final" },
        { Type: 'For let Release', Value: "ForletRelease" },
        { Type: 'Information Only', Value: "InformationOnly" },
        { Type: 'Not For let Release', Value: "NotForletRelease" },
        { Type: 'Preliminary Results', Value: "PreliminaryResults" },
        { Type: 'Void', Value: "Void" },
        { Type: 'For Comment', Value: "ForComment" }
    ];
    var stampCommentsTypeDatafields = { text: 'Type', value: 'Value' };
    var _38 = React.useState(dynamicstampCommentsList), currentCommentsList = _38[0], setCurrentCommentsList = _38[1];
    var freeTextFontFamilyList = [
        { Type: 'Helvetica', Value: 'Helvetica' },
        { Type: 'Courier', Value: 'Courier' },
        { Type: 'Symbol', Value: 'Symbol' },
        { Type: 'Times New Roman', Value: 'TimesNewRoman' }
    ];
    var freetextFontFamilyFields = { text: 'Type', value: 'Value' };
    var freeTextAlignmentList = [
        { Type: 'Center', Value: 'Center' },
        { Type: 'Right', Value: 'Right' },
        { Type: 'Left', Value: 'Left' },
        { Type: 'Justify', Value: 'Justify' }
    ];
    var freeTextAlignmentField = { text: 'Type', value: 'Value' };
    var freeTextFontStyleList = [
        { Type: 'None', Value: 'None' },
        { Type: 'Bold', Value: 'Bold' },
        { Type: 'Underline', Value: 'Underline' },
        { Type: 'Italic', Value: 'Italic' },
        { Type: 'Strike through', Value: 'Strikethrough' }
    ];
    var freeTextFontStyleFields = { text: 'Type', value: 'Value' };
    var intractionsList = [
        { Type: 'None', Value: "None" },
        { Type: 'Delete', Value: "Delete" },
        { Type: 'Property Change', Value: "PropertyChange" },
        { Type: 'Move', Value: "Move" },
        { Type: 'Select', Value: "Select" },
        { Type: 'Resize', Value: "Resize" },
    ];
    var intractionsListfield = { dataSource: intractionsList, value: 'Value', text: 'Type' };
    var dropImageElement = document.getElementsByClassName('control-fluid')[0];
    var currentUpdateAnnotIdRef = React.useRef("");
    function annotationSelectedEvent(annotationSelectEventArgs) {
        viewer.enableCommentPanel = true;
        selectedAnnotation.current.annotationSelected = true;
        currentUpdateAnnotIdRef.current = annotationSelectEventArgs.annotationId;
        var currentAnnotation = getAnnotationByID(currentUpdateAnnotIdRef.current);
        if (currentAnnotation) {
            setAddAnnotVisibility(false);
            setUpdateAnnotVisibility(false);
            updateProperties(currentAnnotation);
        }
    }
    var annotationUnSelectedEvent = function () {
        viewer.enableCommentPanel = false;
        selectedAnnotation.current.annotationSelected = false;
        currentUpdateAnnotIdRef.current = "";
        setAddAnnotVisibility(true);
        setUpdateAnnotVisibility(false);
        setAnnotationFieldVisibility(true);
        setPageNumberVisibility(true);
        resetAnnotationProperties();
    };
    function Reset() {
        resetAnnotationProperties();
        if (selectedAnnotation.current.annotationSelected) {
            selectedAnnotation.current.showFileUploader = false;
            selectedAnnotation.current.disableInkAnnotField = true;
            selectedAnnotation.current.showStampType = false;
            updatePropertiesInUI();
        }
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: 'col-lg-9 e-pv-control-section e-pv-pdfviewer-control-section' },
            React.createElement("div", { className: "e-pv-flex-container" },
                React.createElement("label", { htmlFor: "checked", className: "e-pv-switchLabel" }, " Standalone PDF Viewer "),
                React.createElement("div", { className: "e-message render-mode-info" },
                    React.createElement("span", { className: "e-msg-icon render-mode-info-icon", title: "Turn OFF to render the PDF Viewer as server-backed" })),
                React.createElement("div", null,
                    React.createElement(ej2_react_buttons_1.SwitchComponent, { cssClass: "e-pv-buttonSwitch", id: "checked", change: change, checked: true }))),
            React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { ref: function (scope) { viewer = scope; }, id: "container", documentPath: "https://cdn.syncfusion.com/content/pdf/annotations.pdf", resourceUrl: "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib", toolbarSettings: toolbarSettings, enableAnnotationToolbar: false, documentLoad: documentLoaded, annotationSelect: annotationSelectedEvent, annotationUnSelect: annotationUnSelectedEvent, annotationMove: onAnnotationMoved, annotationRemove: annotationUnSelectedEvent, annotationResize: onAnnotationResized, style: { 'height': '640px' } },
                React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the creation of various types of annotations in the PDF viewer, including text markup, shapes, measurements, free text, stamps, handwritten signatures, ink, and sticky notes. Additionally, we can customize existing annotations or add new annotations programmatically in the PDF viewer using the provided options.")),
        React.createElement("div", { className: "col-lg-3 e-pv-property-section-pdfviewer e-pv-main-panel" },
            React.createElement("div", { className: "property-panel-header e-pv-header-panel" },
                "Properties",
                React.createElement("button", { id: "e-pv-refresh-button-icon", className: "e-btn e-bigger e-lib e-flat e-icon-btn", onClick: Reset },
                    React.createElement("span", { className: "e-icons e-refresh e-btn-icon" }))),
            React.createElement("div", { className: "e-pv-property-panel-content" },
                React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                    React.createElement("span", null, "Annotation Type")),
                React.createElement("div", { className: "e-pv-input-item" },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: annotationsList, value: annotationType, change: function (e) { return onAnnotationChange(e); }, fields: annotationListFields, enabled: showAnnotationListField })),
                React.createElement("div", { className: "e-pv-annot-inner-container", id: 'e-pv-stampAnnotation', hidden: !showStampType },
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                        React.createElement("span", null, "Stamp Type")),
                    React.createElement("div", { className: "e-pv-input-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: stampTypeDataList, fields: stampTypeDatafields, value: stampType, change: function (e) { onStampTypeChange(e); onPropertiesValueChanges('stampType', e); } })),
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                        React.createElement("span", null, "Comments")),
                    React.createElement("div", { className: "e-pv-input-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: currentCommentsList, fields: stampCommentsTypeDatafields, value: stampComment, change: function (e) { onPropertiesValueChanges('stampComment', e); } }))),
                React.createElement("div", { className: "e-pv-pdfviewer-input-title", id: 'e-pv-customStamp', hidden: !showFileUploader },
                    React.createElement(ej2_react_inputs_1.UploaderComponent, { ref: function (scope) { dropImageElement; uploaderObj = scope; }, className: 'pdfViewer-ejs-uploader', asyncSettings: pdfviewerApiPath, dropArea: dropImageElement, removing: onFileRemove, success: onFileSuccess, template: uploaderTemplate, multiple: false })),
                React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                    React.createElement("span", null, "Page Number")),
                React.createElement("div", { className: "e-pv-input-item" },
                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: "n0", value: pageNumber, change: function (e) { return onPropertiesValueChanges('pageNumber', e); }, min: 1, max: pageCount, enabled: showPageNumberField })),
                React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                    React.createElement("span", null, "Settings:")),
                React.createElement("div", { className: "e-pv-annot-inner-container", style: { padding: '0 0 12px 0' } },
                    React.createElement("table", { className: "e-pv-annot-inner-table" },
                        React.createElement("tbody", null,
                            React.createElement("tr", { hidden: !showXYRow },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                            React.createElement("span", null, "X Position"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: x, min: 0, format: '###.##', showSpinButton: false, change: function (e) { onPropertiesValueChanges('x', e); } }))))),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                            React.createElement("span", null, "Y Position"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: y, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return onPropertiesValueChanges('y', e); } })))))),
                            React.createElement("tr", { hidden: !showHeightWidthRow },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                            React.createElement("span", null, "Width"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: width, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return onPropertiesValueChanges('width', e); } }))))),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                            React.createElement("span", null, "Height"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: height, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return onPropertiesValueChanges('height', e); } })))))),
                            React.createElement("tr", { hidden: !showX1Y1Row },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                            React.createElement("span", null, "X1 Position"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: x1, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return onPropertiesValueChanges('vertexX1', e); } }))))),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                            React.createElement("span", null, "Y1 Position"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: y1, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return onPropertiesValueChanges('vertexY1', e); } })))))),
                            React.createElement("tr", { hidden: !showX2Y2Row },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                            React.createElement("span", null, "X2 Position"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: x2, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return onPropertiesValueChanges('vertexX2', e); } }))))),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                            React.createElement("span", null, "Y2 Position"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: y2, min: 0, format: '###.##', showSpinButton: false, change: function (e) { return onPropertiesValueChanges('vertexY2', e); } })))))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                            React.createElement("span", null, "Shape Opacity"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: opacity, format: 'n0', showSpinButton: false, min: 0, max: 100, change: function (e) { return onPropertiesValueChanges('opacity', e); } }))))),
                                React.createElement("td", { hidden: !showFillColor },
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                            React.createElement("span", null, "Fill Color"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.ColorPickerComponent, { value: fillColor !== null && fillColor !== void 0 ? fillColor : "#FFFFFF00", change: function (e) { return onPropertiesValueChanges('fillColor', e); }, mode: "Palette" })))))),
                            React.createElement("tr", { hidden: !showStrokeProperties },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                            React.createElement("span", null, "Stroke Thickness"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: strokeThickness, format: 'n0', showSpinButton: false, min: 0, max: 12, change: function (e) { return onPropertiesValueChanges('thickness', e); } }))))),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "e-pv-pdfviewer-text-content" },
                                            React.createElement("span", null, "Stroke Color"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.ColorPickerComponent, { value: strokeColor, change: function (e) { return onPropertiesValueChanges('strokeColor', e); }, mode: "Palette" })))))))),
                    React.createElement("div", { style: { padding: '12px 12px 0 12px' } },
                        React.createElement("table", { className: "e-pv-annot-inner-table e-pv-annot-bounds-list", style: { borderCollapse: "collapse" } },
                            React.createElement("tbody", null, (selectedAnnotation.current.annotationType === "Highlight" || selectedAnnotation.current.annotationType === "Underline" || selectedAnnotation.current.annotationType === "Strikethrough") &&
                                (bounds && bounds.length > 0) && (bounds.map(function (item, index) {
                                return (React.createElement("tr", { key: item.id },
                                    React.createElement("td", null,
                                        React.createElement("div", { className: "e-pv-table-items" },
                                            React.createElement("div", null,
                                                "X",
                                                index + 1,
                                                " = ",
                                                vertexTableNumberFormat(item.X)),
                                            React.createElement("div", null,
                                                "Y",
                                                index + 1,
                                                " = ",
                                                vertexTableNumberFormat(item.Y)))),
                                    React.createElement("td", null,
                                        React.createElement("div", { className: "e-pv-table-items" },
                                            React.createElement("div", null,
                                                "W",
                                                index + 1,
                                                " = ",
                                                vertexTableNumberFormat(item.Width)),
                                            React.createElement("div", null,
                                                "H",
                                                index + 1,
                                                " = ",
                                                vertexTableNumberFormat(item.Height))))));
                            })))),
                        React.createElement("table", { className: "e-pv-annot-inner-table e-pv-pdfViewer-coordinate-table", style: { borderCollapse: "collapse" } },
                            React.createElement("tbody", null, (annotationType !== "Line" && annotationType !== "Distance" && vertexPoints && vertexPoints.length > 0) &&
                                (vertexPoints.map(function (item, index) {
                                    return (React.createElement("tr", { key: item.id }, index % 2 === 0 ? (React.createElement(React.Fragment, null,
                                        React.createElement("td", null,
                                            React.createElement("div", { className: "e-pv-table-items" },
                                                React.createElement("div", null,
                                                    "X",
                                                    index + 1,
                                                    " = ",
                                                    vertexTableNumberFormat(item.x)),
                                                React.createElement("div", null,
                                                    "Y",
                                                    index + 1,
                                                    " = ",
                                                    vertexTableNumberFormat(item.y)))),
                                        index + 1 < vertexPoints.length ? (React.createElement("td", null,
                                            React.createElement("div", { className: "e-pv-table-items" },
                                                React.createElement("div", null,
                                                    "X",
                                                    index + 2,
                                                    " = ",
                                                    vertexTableNumberFormat(vertexPoints[index + 1].x)),
                                                React.createElement("div", null,
                                                    "Y",
                                                    index + 2,
                                                    " = ",
                                                    vertexTableNumberFormat(vertexPoints[index + 1].y))))) : React.createElement("td", { style: { border: "none" } }))) : null));
                                }))))),
                    React.createElement("div", { id: 'e-pv-bounds', hidden: !showBoundsButtons },
                        React.createElement("div", { className: "e-pv-annot-button-section", style: { padding: '12px 12px 0 0', border: 0 } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: 'capitalize' }, disabled: isDeleteBoundsDisabled, onClick: OnBoundsDelete }, "Delete"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: 'capitalize' }, onClick: function () { addBounds(); onPropertiesValueChanges("", { isInteracted: true }); } }, "Add Bounds"))),
                    React.createElement("div", { hidden: !showLineProps, style: { padding: '0px 12px 12px 12px' } },
                        React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                            React.createElement("span", null, "Line Head Start")),
                        React.createElement("div", { className: "e-pv-input-item" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: lineHeadstatusList, fields: lineHeadstatusfield, value: lineHeadStartStyle, change: function (e) { return onPropertiesValueChanges('lineHeadStartStyle', e); } })),
                        React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                            React.createElement("span", null, "Line Head End")),
                        React.createElement("div", { className: "e-pv-input-item" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: lineHeadstatusList, fields: lineHeadstatusfield, value: lineHeadEndStyle, change: function (e) { return onPropertiesValueChanges('lineHeadEndStyle', e); } })),
                        React.createElement("div", { hidden: !showLeaderLength },
                            React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                                React.createElement("span", null, "Leader Length")),
                            React.createElement("div", { className: "e-pv-input-item" },
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: leaderLength, format: '###.##', showSpinButton: false, change: function (e) { return onPropertiesValueChanges('leaderLength', e); } })))),
                    React.createElement("div", { id: 'e-pv-vertex', hidden: !showVertexButtons },
                        React.createElement("div", { className: "e-pv-annot-button-section", style: { padding: '12px 12px 0 0', border: 0 } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: 'capitalize' }, disabled: isDeleteVertexDisabled, onClick: onDeleteVertex }, "Delete"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: 'capitalize' }, onClick: function () { addVertex(); onPropertiesValueChanges("", { isInteracted: true }); } }, "Add Vertex"))))),
            React.createElement("div", { hidden: !showInkAnnotationType },
                React.createElement("div", { style: { padding: '0 0 12px 0' } },
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                        React.createElement("span", null, "Ink Annotation")),
                    React.createElement("div", { className: "e-pv-input-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: inkAnnotationDataList, fields: inkAnnotationfield, value: inkAnnotationType, change: function (e) { return onPropertiesValueChanges('inkAnnotationType', e); }, enabled: !disableInkAnnotField })))),
            React.createElement("div", { hidden: !showFreeTextProps },
                React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                    React.createElement("span", null, "Text Properties:")),
                React.createElement("div", { className: "e-pv-annot-inner-container" },
                    React.createElement("div", { className: "e-pv-pdfviewer-text-content", style: { marginTop: '0%' } },
                        React.createElement("span", null, "Default Text")),
                    React.createElement("div", { className: "e-pv-input-item" },
                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { value: defaultText, change: function (e) { return onPropertiesValueChanges('defaultText', e); } })),
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                        React.createElement("span", null, "Font Family")),
                    React.createElement("div", { className: "e-pv-input-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: freeTextFontFamilyList, fields: freetextFontFamilyFields, value: fontFamily, change: function (e) { return onPropertiesValueChanges('fontFamily', e); } })),
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                        React.createElement("span", null, "Alignment")),
                    React.createElement("div", { className: "e-pv-input-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: freeTextAlignmentList, fields: freeTextAlignmentField, value: alignment, change: function (e) { return onPropertiesValueChanges('alignment', e); } })),
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                        React.createElement("span", null, "Font Style")),
                    React.createElement("div", { className: "e-pv-input-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: freeTextFontStyleList, fields: freeTextFontStyleFields, value: fontStyle, change: function (e) { return onPropertiesValueChanges('fontStyle', e); } })),
                    React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                        React.createElement("table", { className: "e-pv-annot-inner-table" },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%', padding: '0' } },
                                        React.createElement("span", null, "Font Size"),
                                        React.createElement("div", { className: "e-pv-input-item" },
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: fontSize, format: 'n0', showSpinButton: false, change: function (e) { return onPropertiesValueChanges('fontSize', e); } }))),
                                    React.createElement("td", { style: { padding: '0' } },
                                        React.createElement("div", { style: { marginLeft: '12px' }, className: "e-pv-text-content" },
                                            React.createElement("span", null, "Font Color"),
                                            React.createElement("div", { className: "e-pv-input-item" },
                                                React.createElement(ej2_react_inputs_1.ColorPickerComponent, { value: fontColor, mode: "Palette", change: function (e) { return onPropertiesValueChanges('fontColor', e); } })))))))))),
            React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { className: "e-pv-check-box-row" },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: printAnnotation, change: function (e) { onPrintCheckBoxChange(e); onPropertiesValueChanges("", { isInteracted: true }); } })),
                            React.createElement("td", { className: "e-pv-check-box-row" },
                                React.createElement("span", null, "Print Annotation"))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: "e-pv-check-box-row" },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: lockAnnotations, change: function (e) { onCheckboxChangeIntractionBox(e); onPropertiesValueChanges("", { isInteracted: true }); } })),
                            React.createElement("td", { className: "e-pv-check-box-row" },
                                React.createElement("span", null, "Lock Annotation")))))),
            React.createElement("div", { hidden: !lockAnnotations },
                React.createElement("div", { className: "e-pv-pdfviewer-input-title e-pv-pdfviewer-text-content" },
                    React.createElement("span", null, "Allow Interactions")),
                React.createElement("div", { className: "e-pv-input-item" },
                    React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { fields: intractionsListfield, showCheckBox: true, value: allowedInteractions, change: function (e) { onInteractionValueChange(e); onPropertiesValueChanges("", { isInteracted: true }); } }))),
            React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                React.createElement("span", null, "Add Comments")),
            React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                React.createElement("span", null, "Author")),
            React.createElement("div", { className: "e-pv-input-item" },
                React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "Enter text", value: author, change: function (e) { return onPropertiesValueChanges('author', e); } })),
            React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                React.createElement("span", null, "Content")),
            React.createElement("div", { className: "e-pv-input-item" },
                React.createElement(ej2_react_inputs_1.TextBoxComponent, { value: comment, change: function (e) { return onPropertiesValueChanges('comment', e); }, placeholder: 'New Comment' })),
            React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                React.createElement("span", null, "Status")),
            React.createElement("div", { className: "e-pv-input-item" },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: commentStatusList, fields: commentStatusListfields, value: commentState, change: function (e) { return onPropertiesValueChanges('setState', e); } })),
            React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { className: "e-pv-check-box-row" },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: isReplyBoxChecked, change: function (e) { onCheckboxChangeReplyBox(e); onPropertiesValueChanges("", { isInteracted: true }); } })),
                            React.createElement("td", { className: "e-pv-check-box-row" },
                                React.createElement("span", null, "Reply")))))),
            React.createElement("div", { hidden: !isReplyBoxChecked },
                React.createElement("div", { className: "pdfviewer-input-title", hidden: replies.length <= 0 }, "Replies:"),
                React.createElement("div", { className: "e-pv-inner-container e-pv-replies", id: "repliesContainer" }, replies.map(function (comment) {
                    var _a, _b;
                    return (React.createElement("div", { className: "e-pv-reply-container", id: comment.id, key: comment.id },
                        React.createElement("div", { className: "reply-icon e-pv-comment-icon e-pv-icon" }),
                        React.createElement("div", { className: "e-pv-reply-main-container" },
                            React.createElement("div", { className: "reply-text" }, "".concat((_a = comment.author) !== null && _a !== void 0 ? _a : "Guest", " - ").concat(comment.modifiedDate)),
                            React.createElement("div", { className: "reply-text" }, "".concat((_b = comment.note) !== null && _b !== void 0 ? _b : "", " ").concat((comment.state && comment.state !== "None") ? comment.state : ""))),
                        React.createElement("div", { className: "more-container", style: { width: "min-content" } },
                            React.createElement("button", { className: "e-control e-btn e-lib e-flat e-icon-btn context-menu-btn", "data-id": comment.id, onClick: function (event) {
                                    openContextMenu(event);
                                }, onMouseDown: function () { getCommentID(comment.id); }, style: { padding: "5px 4px" } },
                                React.createElement("span", { className: "e-icons e-more-vertical-1 e-btn-icon" })))));
                })),
                React.createElement(ej2_react_navigations_1.ContextMenuComponent, { ref: function (scope) { contextMenu = scope; }, items: selectedAnnotation.current.replyMenuItems, select: function (event) { contextMenuItemSelected(event); } })),
            React.createElement("div", { className: "e-pv-annot-inner-container", style: { padding: '10px' }, id: 'e-pv-replyBox', hidden: !isReplyBoxChecked },
                React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                    React.createElement("span", null, "Author")),
                React.createElement("div", { className: "e-pv-input-item" },
                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "Enter text", value: replyAuthor, change: function (e) { return onPropertiesValueChanges('replyAuthor', e); } })),
                React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                    React.createElement("span", null, "Content")),
                React.createElement("div", { className: "e-pv-input-item" },
                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { value: replyComment, change: function (e) { return onPropertiesValueChanges('replyComment', e); }, placeholder: 'Reply Comment' })),
                React.createElement("div", { className: "e-pv-pdfviewer-input-title" },
                    React.createElement("span", null, "Status")),
                React.createElement("div", { className: "e-pv-input-item" },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: commentStatusList, fields: commentStatusListfields, value: replyState, change: function (e) { return onPropertiesValueChanges('replyState', e); } })),
                React.createElement("div", { className: "e-pv-annot-button-section", style: { padding: '12px 0 0 0', border: 0 } },
                    React.createElement("div", { hidden: isEditing },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: 'capitalize' }, onClick: function () { updateReply(); onPropertiesValueChanges('', { isInteracted: true }); } }, "Add Reply")),
                    React.createElement("div", { hidden: !isEditing },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: "capitalize" }, onClick: updateEditReply }, "Update Reply")))),
            React.createElement("div", { className: "e-pv-property-panel-footer" },
                React.createElement("div", { className: "e-pv-annot-button-section" },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: 'capitalize' }, onClick: updateChangesAnnotation, disabled: !showUpdateAnnotButton }, "Update"),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, style: { textTransform: 'capitalize' }, onClick: addNewAnnotation, disabled: !showAddAnnotButton }, "Add Annotation")))),
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
    function onFileRemove(args) {
        args.postRawFile = false;
        previewImage.src = syncfusionLogo;
    }
    function onFileSuccess(args) {
        return __awaiter(this, void 0, void 0, function () {
            var fileData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fileData = args.file.rawFile;
                        if (!(fileData instanceof Blob)) return [3 /*break*/, 2];
                        _a = selectedAnnotation.current;
                        return [4 /*yield*/, convertBlobToBase64(fileData)];
                    case 1:
                        _a.customStampImageSource = _b.sent();
                        previewImage.src = selectedAnnotation.current.customStampImageSource;
                        return [3 /*break*/, 3];
                    case 2:
                        console.error('Unexpected file data type:', typeof fileData);
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function convertBlobToBase64(blob) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
    function contextMenuItemSelected(event) {
        switch (event.item.text) {
            case "Edit":
                onEditButtonClick(currentEditCommentId.current);
                break;
            case "Delete":
                onreplycommentdelete(currentEditCommentId.current);
                break;
        }
    }
    function onAnnotationChange(event) {
        selectedAnnotation.current.annotationType = event.value;
        setStrokePropsVisibility(false);
        setBoundsButtonsVisibility(false);
        setFillColorVisibility(false);
        setXYRowVisibility(false);
        setX1Y1RowVisibility(false);
        setX2Y2RowVisibility(false);
        setHeightWidthRowVisibility(false);
        setLinePropsVisibility(false);
        setVertexButtonsVisibility(false);
        setFreeTextPropsVisibility(false);
        setLeaderLengthVisibility(false);
        switch (selectedAnnotation.current.annotationType) {
            case 'Highlight':
            case 'Underline':
            case 'Strikethrough':
                {
                    setBoundsButtonsVisibility(true);
                    setFillColorVisibility(true);
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    break;
                }
            case 'Line':
            case 'Arrow':
                {
                    setStrokePropsVisibility(true);
                    setFillColorVisibility(true);
                    setX1Y1RowVisibility(true);
                    setX2Y2RowVisibility(true);
                    setLinePropsVisibility(true);
                    break;
                }
            case 'Square':
            case 'Rectangle':
            case 'Circle':
            case 'Radius':
                {
                    setStrokePropsVisibility(true);
                    setFillColorVisibility(true);
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    break;
                }
            case 'Polygon':
            case 'Perimeter':
            case 'Area':
            case 'Volume':
                {
                    setVertexButtonsVisibility(true);
                    setXYRowVisibility(true);
                    setStrokePropsVisibility(true);
                    setFillColorVisibility(true);
                    break;
                }
            case 'Distance':
                {
                    setStrokePropsVisibility(true);
                    setFillColorVisibility(true);
                    setX1Y1RowVisibility(true);
                    setX2Y2RowVisibility(true);
                    setLinePropsVisibility(true);
                    setLeaderLengthVisibility(true);
                    break;
                }
            case 'StickyNotes':
                {
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    break;
                }
            case 'Ink':
                {
                    setStrokePropsVisibility(true);
                    setFillColorVisibility(true);
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    break;
                }
            case 'Stamp':
            case 'stamp':
                {
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    break;
                }
            case 'FreeText':
                {
                    setStrokePropsVisibility(true);
                    setFillColorVisibility(true);
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    setFreeTextPropsVisibility(true);
                    break;
                }
            case 'CustomStamp':
                {
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    break;
                }
        }
        if (!(0, ej2_base_1.isNullOrUndefined)(event) && event.isInteracted) {
            resetAnnotationProperties();
        }
    }
    function addBounds() {
        setBoundsButtonsVisibility(true);
        var newBound = {
            id: generateUniqueId(),
            X: selectedAnnotation.current.x,
            Y: selectedAnnotation.current.y,
            Width: selectedAnnotation.current.width,
            Height: selectedAnnotation.current.height
        };
        if ((0, ej2_base_1.isNullOrUndefined)(selectedAnnotation.current.bounds)) {
            selectedAnnotation.current.bounds = [];
        }
        selectedAnnotation.current.bounds.push(newBound);
        setBounds(function (prevList) { return __spreadArray(__spreadArray([], prevList, true), [newBound], false); });
        if (selectedAnnotation.current.bounds.length > 1) {
            setIsDeleteBoundsDisabled(false);
        }
    }
    function OnBoundsDelete() {
        if ((0, ej2_base_1.isNullOrUndefined)(selectedAnnotation.current.bounds)) {
            selectedAnnotation.current.bounds = [];
        }
        if (selectedAnnotation.current.bounds.length > 1) {
            selectedAnnotation.current.bounds = selectedAnnotation.current.bounds.slice(0, selectedAnnotation.current.bounds.length - 1);
            setUpdateAnnotVisibility(true);
        }
        if (selectedAnnotation.current.bounds.length <= 1) {
            setIsDeleteBoundsDisabled(true);
        }
        if (selectedAnnotation.current.bounds.length < 1) {
            setUpdateAnnotVisibility(false);
        }
        setBounds(__spreadArray([], selectedAnnotation.current.bounds, true));
    }
    function addVertex() {
        var newVertex = { x: selectedAnnotation.current.x, y: selectedAnnotation.current.y, id: generateUniqueId() };
        if ((0, ej2_base_1.isNullOrUndefined)(selectedAnnotation.current.vertexPoints)) {
            selectedAnnotation.current.vertexPoints = [];
        }
        selectedAnnotation.current.vertexPoints.push(newVertex);
        if (selectedAnnotation.current.vertexPoints.length > 1) {
            setIsDeleteVertexDisabled(false);
        }
        setVertexPoints(function (prevList) { return __spreadArray(__spreadArray([], prevList, true), [newVertex], false); });
    }
    ;
    function onInteractionValueChange(event) {
        if ((0, ej2_base_1.isNullOrUndefined)(selectedAnnotation.current.allowedInteractions) || selectedAnnotation.current.allowedInteractions.length === 0) {
            selectedAnnotation.current.allowedInteractions = ["None"];
            setAllowedInteractions(["None"]);
        }
        else {
            selectedAnnotation.current.allowedInteractions = event.value;
            if (event.value && event.value.length === 0) {
                setAllowedInteractions(["None"]);
            }
            else {
                setAllowedInteractions(__spreadArray([], event.value, true));
            }
        }
    }
    function onDeleteVertex() {
        if ((0, ej2_base_1.isNullOrUndefined)(selectedAnnotation.current.vertexPoints)) {
            selectedAnnotation.current.vertexPoints = [];
        }
        if (selectedAnnotation.current.vertexPoints.length > 1) {
            selectedAnnotation.current.vertexPoints = selectedAnnotation.current.vertexPoints.slice(0, selectedAnnotation.current.vertexPoints.length - 1);
            setUpdateAnnotVisibility(true);
        }
        if (selectedAnnotation.current.vertexPoints.length <= 1) {
            setIsDeleteVertexDisabled(true);
            setUpdateAnnotVisibility(false);
        }
        setVertexPoints(__spreadArray([], selectedAnnotation.current.vertexPoints, true));
    }
    function onStampTypeChange(event) {
        var selectedValue = event.value;
        switch (selectedValue) {
            case 'Dynamic': {
                setCurrentCommentsList(dynamicstampCommentsList);
                setStampType("Dynamic");
                setStampComment("Approved");
                onPropertiesValueChanges("stampComment", { isInteracted: true, value: "Approved" });
                break;
            }
            case 'Sign Here': {
                setCurrentCommentsList(sighhereCommentsList);
                setStampType("Sign Here");
                setStampComment("Accepted");
                onPropertiesValueChanges("stampComment", { isInteracted: true, value: "Accepted" });
                break;
            }
            case 'Standard Business': {
                setCurrentCommentsList(StandardBusinessStampsList);
                setStampType("Standard Business");
                setStampComment("Approved");
                onPropertiesValueChanges("stampComment", { isInteracted: true, value: "Approved" });
                break;
            }
            default: {
                setCurrentCommentsList(dynamicstampCommentsList);
                setStampType("Dynamic");
                setStampComment("Approved");
                onPropertiesValueChanges("stampComment", { isInteracted: true, value: "Approved" });
                break;
            }
        }
    }
    function onCheckboxChangeReplyBox(event) {
        setReplyBoxChecked(event.checked);
        if (!event.checked) {
            if (isEditing) {
                setIsEditing(false);
                currentEditCommentId.current = "";
            }
        }
    }
    function onPrintCheckBoxChange(event) {
        setPrintAnnotation(event.checked);
        selectedAnnotation.current.isPrint = event.checked;
    }
    function onCheckboxChangeIntractionBox(event) {
        setLockAnnotations(event.checked);
        selectedAnnotation.current.isLocked = event.checked;
    }
    function onPropertiesValueChanges(property, event) {
        if (selectedAnnotation.current.annotationSelected && !showUpdateAnnotButton) {
            if (!(0, ej2_base_1.isNullOrUndefined)(event.isInteracted) && event.isInteracted) {
                setUpdateAnnotVisibility(true);
            }
            // color picker change event
            else if (!(0, ej2_base_1.isNullOrUndefined)(event.event)) {
                setUpdateAnnotVisibility(true);
            }
            else {
                setUpdateAnnotVisibility(false);
            }
            var shapeAnnotation = selectedAnnotation.current.annotationType;
            if (((property === "x") || (property === "y") || (property === "height") || (property === "width")) && ((shapeAnnotation === "Underline") || (shapeAnnotation === "Strikethrough") || (shapeAnnotation === "Highlight"))) {
                setUpdateAnnotVisibility(false);
            }
            if (((property === "x") || (property === "y")) && ((shapeAnnotation === "Polygon") || (shapeAnnotation === "Area") || (shapeAnnotation === "Perimeter") || (shapeAnnotation === "Volume"))) {
                setUpdateAnnotVisibility(false);
            }
        }
        if (!(0, ej2_base_1.isNullOrUndefined)(event.value)) {
            selectedAnnotation.current[property] = event.value;
        }
        // color picker change event
        else if (!(0, ej2_base_1.isNullOrUndefined)(event.name)) {
            selectedAnnotation.current[property] = event.name;
        }
        if (event && event.isInteracted && (property === "stampComment" || property === "stampType")) {
            resetAnnotationProperties();
        }
    }
    function addNewAnnotation() {
        var _a;
        var currentAnnotationSettings;
        currentAnnotationSettings = annotationSettings();
        if (selectedAnnotation.current.annotationType === "Highlight") {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Underline') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Strikethrough') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Line') {
            currentAnnotationSettings.vertexPoints = [{ x: selectedAnnotation.current.vertexX1, y: selectedAnnotation.current.vertexY1 },
                { x: selectedAnnotation.current.vertexX2, y: selectedAnnotation.current.vertexY2 }];
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
            selectedAnnotation.current.vertexPoints = [];
        }
        else if (selectedAnnotation.current.annotationType === 'Arrow') {
            currentAnnotationSettings.vertexPoints = [{ x: selectedAnnotation.current.vertexX1, y: selectedAnnotation.current.vertexY1 },
                { x: selectedAnnotation.current.vertexX2, y: selectedAnnotation.current.vertexY2 }];
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
            selectedAnnotation.current.vertexPoints = [];
        }
        else if (selectedAnnotation.current.annotationType === 'Rectangle') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Circle') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Polygon') {
            if (selectedAnnotation.current.vertexPoints.length === 0) {
                selectedAnnotation.current.vertexPoints = addUniqueId([{ x: 100, y: 39 }, { x: 142, y: 10 }, { x: 189, y: 38 }, { x: 178, y: 81 }, { x: 111, y: 81 }, { x: 100, y: 39 }]);
                currentAnnotationSettings = annotationSettings();
            }
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Distance') {
            currentAnnotationSettings.vertexPoints = [{ x: selectedAnnotation.current.vertexX1, y: selectedAnnotation.current.vertexY1 },
                { x: selectedAnnotation.current.vertexX2, y: selectedAnnotation.current.vertexY2 }];
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
            selectedAnnotation.current.vertexPoints = [];
        }
        else if (selectedAnnotation.current.annotationType === 'Perimeter') {
            if (selectedAnnotation.current.vertexPoints.length === 0) {
                selectedAnnotation.current.vertexPoints = addUniqueId([{ x: 100, y: 100 }, { x: 185, y: 100 }, { x: 186, y: 162 }]);
                currentAnnotationSettings = annotationSettings();
            }
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Area') {
            if (selectedAnnotation.current.vertexPoints.length === 0) {
                selectedAnnotation.current.vertexPoints = addUniqueId([{ x: 100, y: 100 }, { x: 188, y: 99 }, { x: 189, y: 153 }, { x: 100, y: 100 }]);
                currentAnnotationSettings = annotationSettings();
            }
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Radius') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Volume') {
            if (selectedAnnotation.current.vertexPoints.length === 0) {
                selectedAnnotation.current.vertexPoints = addUniqueId([{ x: 100, y: 100 }, { x: 100, y: 209 }, { x: 220, y: 209 }, { x: 220, y: 99 }, { x: 100, y: 100 }]);
                currentAnnotationSettings = annotationSettings();
            }
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'FreeText') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Stamp') {
            currentAnnotationSettings.customStamps = null;
            if (selectedAnnotation.current.stampType === 'Dynamic') {
                if (selectedAnnotation.current.dynamicStamps) {
                    var selectedStampItem = selectedAnnotation.current.dynamicStamps.find(function (stamp) { return stamp === selectedAnnotation.current.stampComment; });
                    if (selectedStampItem) {
                        viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings, selectedStampItem);
                    }
                }
            }
            else if (selectedAnnotation.current.stampType === "Sign Here") {
                if (selectedAnnotation.current.signStamps) {
                    var selectedStampItem = selectedAnnotation.current.signStamps.find(function (stamp) { return stamp === selectedAnnotation.current.stampComment; });
                    if (selectedStampItem) {
                        viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings, null, selectedStampItem);
                    }
                }
            }
            else if (selectedAnnotation.current.stampType === "Standard Business") {
                if (selectedAnnotation.current.signStamps) {
                    var selectedStampItem = selectedAnnotation.current.standardBusinessStamps.find(function (stamp) { return stamp === selectedAnnotation.current.stampComment; });
                    if (selectedStampItem) {
                        viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings, null, null, selectedStampItem);
                    }
                }
            }
        }
        else if (selectedAnnotation.current.annotationType === 'Ink') {
            if (selectedAnnotation.current.inkAnnotationType === "Syncfusion") {
                selectedAnnotation.current.path = '[{\"command\":\"M\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":250.83334350585938,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":257.5,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":926.6667175292969},{\"command\":\"L\",\"x\":259.5,\"y\":924.0000305175781},{\"command\":\"L\",\"x\":259.5,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":258.16668701171875,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.16668701171875,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":253.5,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":925.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":927.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":253.5,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":260.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":264.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":274.16668701171875,\"y\":958.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":281.5,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":285.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":967.3333435058594},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":282.8333740234375,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":266.16668701171875,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":259.5,\"y\":993.3333435058594},{\"command\":\"L\",\"x\":252.16668701171875,\"y\":994.0000305175781},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":228.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":246.16668701171875,\"y\":972.0000305175781},{\"command\":\"L\",\"x\":257.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":262.8333435058594,\"y\":976.0000305175781},{\"command\":\"L\",\"x\":269.5,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":276.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":279.5,\"y\":978.0000305175781},{\"command\":\"L\",\"x\":285.5,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":288.16668701171875,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":293.5,\"y\":966.6667175292969},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":291.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":292.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":295.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":297.5,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":298.8333740234375,\"y\":970.6667175292969},{\"command\":\"L\",\"x\":301.5,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":304.16668701171875,\"y\":968.6667175292969},{\"command\":\"L\",\"x\":305.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":308.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":310.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":311.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":312.8333740234375,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":968.0000305175781},{\"command\":\"L\",\"x\":317.5,\"y\":972.6667175292969},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":986.0000305175781},{\"command\":\"L\",\"x\":319.5,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.8333740234375,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":987.3333435058594},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":985.3333435058594},{\"command\":\"L\",\"x\":314.16668701171875,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":320.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":321.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":322.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":322.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":326.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":328.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":328.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":329.5,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.6667175292969},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":331.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":332.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":333.5,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":334.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":335.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":336.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":337.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":338.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":340.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":341.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":342.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":344.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":346.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":349.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":350.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":351.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":355.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":356.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":358.16668701171875,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":360.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":364.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":370.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":932.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":375.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":378.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":380.8333740234375,\"y\":981.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":383.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":387.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":392.8333740234375,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":385.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":382.8333740234375,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":963.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":384.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":387.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":389.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":390.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":390.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":393.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":396.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":398.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":947.3333435058594},{\"command\":\"L\",\"x\":401.5,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":402.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":403.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":404.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":406.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":407.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":410.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":412.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.0000305175781},{\"command\":\"L\",\"x\":415.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":418.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":420.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":423.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":423.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":421.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":422.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":424.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":425.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":428.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":429.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":430.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":432.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":434.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":437.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":440.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":441.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":442.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":443.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":444.16668701171875,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":447.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":450.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":453.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":452.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":450.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":448.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":447.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":445.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.8333740234375,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":454.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":456.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":459.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":460.8333740234375,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":461.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":462.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":464.16668701171875,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":465.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":466.16668701171875,\"y\":932.6667175292969},{\"command\":\"L\",\"x\":467.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":469.5,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":470.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":474.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":475.5,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":478.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":481.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":484.8333740234375,\"y\":934.0000305175781},{\"command\":\"L\",\"x\":488.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":489.5,\"y\":928.0000305175781}]';
            }
            else if (selectedAnnotation.current.inkAnnotationType === "PdfViewer") {
                selectedAnnotation.current.path = "M10,50 L10,65 M10,50 L25,50 L25,57.5 L10,57.5\n                M40,50 L40,65 M40,50 L43,50 L55,55 L55,60 L43,65 L40,65\n                M80,50 L80,65 M80,50 L95,50 M80,57.5 L95,57.5\n                M110,50 L125,65 L140,50\n                M160,50 L160,65 M155,50 L165,50 M155,65 L165,65\n                M182,50 L182,65 M182,50 L197,50 M182,57.5 L197,57.5 M182,65 L197,65 \n                M205,50 L215,65 L225,50 L235,65 L245,50\n                M255,50 L255,65 M255,50 L270,50 M255,57.5 L270,57.5 M255,65 L270,65\n                M295,50 L295,65 M295,50 L305,50 L305,57.5 L295,57.5 M295,57.5 L305,65";
            }
            else if (selectedAnnotation.current.inkAnnotationType === "Star") {
                selectedAnnotation.current.path = '[{\"command\":\"M\",\"x\":72,\"y\":200},{\"command\":\"L\",\"x\":79,\"y\":65},{\"command\":\"L\",\"x\":92,\"y\":200},{\"command\":\"L\",\"x\":65,\"y\":110},{\"command\":\"L\",\"x\":95,\"y\":110},{\"command\":\"L\",\"x\":72,\"y\":200}]';
            }
            currentAnnotationSettings = annotationSettings();
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'StickyNotes') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'CustomStamp') {
            viewer.annotation.addAnnotation("Stamp", currentAnnotationSettings);
        }
        var newlyAddedAnnotation = viewer.annotationCollection[((_a = viewer.annotationCollection) === null || _a === void 0 ? void 0 : _a.length) - 1];
        if (newlyAddedAnnotation) {
            updateAnnotationComments(newlyAddedAnnotation);
            viewer.annotation.editAnnotation(newlyAddedAnnotation);
        }
        selectedAnnotation.current.annotationSelected = false;
        setReplyBoxChecked(false);
        setReplies([]);
    }
    function updateProperties(currentAnnotation) {
        selectedAnnotation.current.pageNumber = currentAnnotation.pageNumber + 1;
        selectedAnnotation.current.fillColor = currentAnnotation.fillColor;
        selectedAnnotation.current.strokeColor = currentAnnotation.strokeColor;
        if (IsRGBAColor(selectedAnnotation.current.fillColor)) {
            selectedAnnotation.current.fillColor = RGBAtoHex(selectedAnnotation.current.fillColor, "fill");
        }
        if (IsRGBAColor(selectedAnnotation.current.strokeColor)) {
            selectedAnnotation.current.strokeColor = RGBAtoHex(selectedAnnotation.current.strokeColor, "stroke");
        }
        if (currentAnnotation.textMarkupAnnotationType === "Highlight" || currentAnnotation.textMarkupAnnotationType === "Underline" || currentAnnotation.textMarkupAnnotationType === "Strikethrough") {
            selectedAnnotation.current.annotationType = currentAnnotation.textMarkupAnnotationType;
        }
        else if (currentAnnotation.shapeAnnotationType === "Square" && currentAnnotation.subject === "Rectangle") {
            selectedAnnotation.current.annotationType = "Rectangle";
        }
        else if (currentAnnotation.shapeAnnotationType === "Line" && currentAnnotation.subject === "Arrow") {
            selectedAnnotation.current.annotationType = "Arrow";
        }
        else if (currentAnnotation.shapeAnnotationType === "sticky") {
            selectedAnnotation.current.annotationType = "StickyNotes";
        }
        else if (currentAnnotation.shapeAnnotationType === "stamp" || currentAnnotation.shapeAnnotationType === "Stamp") {
            if (currentAnnotation.stampAnnotationType) {
                if (currentAnnotation.stampAnnotationType === 'image') {
                    selectedAnnotation.current.annotationType = "CustomStamp";
                }
                else if (currentAnnotation.stampAnnotationType === 'path') {
                    selectedAnnotation.current.annotationType = 'Stamp';
                }
            }
            else {
                selectedAnnotation.current.annotationType = 'Stamp';
            }
        }
        else if (currentAnnotation.shapeAnnotationType === "Ink") {
            selectedAnnotation.current.annotationType = "Ink";
        }
        else if (currentAnnotation.shapeAnnotationType === "Line" || currentAnnotation.shapeAnnotationType === "Polyline" || currentAnnotation.shapeAnnotationType === "Square" || currentAnnotation.shapeAnnotationType === "Circle" || currentAnnotation.shapeAnnotationType === "Polygon" && currentAnnotation.indent) {
            if (currentAnnotation.vertexPoints) {
                selectedAnnotation.current.vertexPoints = addUniqueId(__spreadArray([], currentAnnotation.vertexPoints, true));
            }
            if (currentAnnotation.indent === "LineDimension") {
                selectedAnnotation.current.annotationType = "Distance";
            }
            else if (currentAnnotation.indent === "PolyLineDimension") {
                selectedAnnotation.current.annotationType = "Perimeter";
            }
            else if (currentAnnotation.indent === "PolyLineDimension" && currentAnnotation.subject === "Arrow") {
                selectedAnnotation.current.annotationType = "Arrow";
            }
            else if (currentAnnotation.indent === "PolygonDimension") {
                selectedAnnotation.current.annotationType = "Area";
            }
            else if (currentAnnotation.indent === "PolygonRadius") {
                selectedAnnotation.current.annotationType = "Radius";
            }
            else if (currentAnnotation.indent === "PolygonVolume") {
                selectedAnnotation.current.annotationType = "Volume";
            }
            else if (currentAnnotation.shapeAnnotationType === "Line" && currentAnnotation.shapeAnnotationType === currentAnnotation.subject) {
                selectedAnnotation.current.annotationType = "Line";
            }
            else if (currentAnnotation.shapeAnnotationType === "Circle" && currentAnnotation.shapeAnnotationType === currentAnnotation.subject) {
                selectedAnnotation.current.annotationType = "Circle";
            }
        }
        else {
            selectedAnnotation.current.annotationType = currentAnnotation.shapeAnnotationType;
            if (currentAnnotation.shapeAnnotationType === "Polygon") {
                selectedAnnotation.current.vertexPoints = addUniqueId(__spreadArray([], currentAnnotation.vertexPoints, true));
            }
        }
        if (currentAnnotation.fillColor) {
            selectedAnnotation.current.fillColor = currentAnnotation.fillColor;
        }
        selectedAnnotation.current.showInkAnnotationType = false;
        if (selectedAnnotation.current.annotationType === "Highlight" || selectedAnnotation.current.annotationType === "Underline" || selectedAnnotation.current.annotationType === "Strikethrough") {
            if (currentAnnotation.bounds[0] && currentAnnotation.bounds[0].X && currentAnnotation.bounds[0].Y && currentAnnotation.bounds[0].Width && currentAnnotation.bounds[0].Height) {
                selectedAnnotation.current.bounds = addUniqueId(currentAnnotation.bounds);
                selectedAnnotation.current.width = currentAnnotation.bounds[0].Width;
                selectedAnnotation.current.height = currentAnnotation.bounds[0].Height;
                selectedAnnotation.current.x = currentAnnotation.bounds[0].X;
                selectedAnnotation.current.y = currentAnnotation.bounds[0].Y;
            }
            else if (currentAnnotation.annotationAddMode && currentAnnotation.annotationAddMode === "UI Drawn Annotation") {
                selectedAnnotation.current.fillColor = currentAnnotation.color;
                var annotBounds = currentAnnotation.bounds;
                selectedAnnotation.current.bounds = [];
                var totalWidth_1 = 0, startX_1 = 0, startY_1 = 0;
                if ((annotBounds === null || annotBounds === void 0 ? void 0 : annotBounds.length) > 1) {
                    selectedAnnotation.current.x = annotBounds[0].left;
                    selectedAnnotation.current.y = annotBounds[0].top;
                    selectedAnnotation.current.height = annotBounds[0].height;
                    var isFirstBound_1 = true;
                    var left_1 = annotBounds[0].left, top_1 = annotBounds[0].top;
                    startX_1 = annotBounds[0].left, startY_1 = annotBounds[0].top;
                    var width_1 = annotBounds[0].width, height_1 = annotBounds[0].height;
                    annotBounds.forEach(function (element, index, array) {
                        left_1 = element.left;
                        width_1 = element.width;
                        height_1 = element.height;
                        if (top_1 !== element.top) {
                            if (isFirstBound_1) {
                                selectedAnnotation.current.width = totalWidth_1;
                                isFirstBound_1 = false;
                            }
                            selectedAnnotation.current.bounds.push({
                                id: generateUniqueId(),
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
                        selectedAnnotation.current.bounds.push({
                            id: generateUniqueId(),
                            X: startX_1,
                            Y: startY_1,
                            Width: totalWidth_1,
                            Height: annotBounds[annotBounds.length - 1].height
                        });
                        if (isFirstBound_1) {
                            selectedAnnotation.current.width = totalWidth_1;
                            isFirstBound_1 = false;
                        }
                    }
                }
                else {
                    selectedAnnotation.current.bounds = {
                        id: generateUniqueId(),
                        X: currentAnnotation.bounds[0].left,
                        Y: currentAnnotation.bounds[0].top,
                        Height: currentAnnotation.bounds[0].height,
                        Width: currentAnnotation.bounds[0].width
                    };
                    selectedAnnotation.current.width = currentAnnotation.bounds[0].width;
                    selectedAnnotation.current.height = currentAnnotation.bounds[0].height;
                    selectedAnnotation.current.x = currentAnnotation.bounds[0].left;
                    selectedAnnotation.current.y = currentAnnotation.bounds[0].top;
                }
            }
            else {
                selectedAnnotation.current.bounds = addUniqueId(currentAnnotation.bounds);
                selectedAnnotation.current.width = currentAnnotation.bounds[0].Width;
                selectedAnnotation.current.height = currentAnnotation.bounds[0].Height;
                selectedAnnotation.current.x = currentAnnotation.bounds[0].X;
                selectedAnnotation.current.y = currentAnnotation.bounds[0].Y;
            }
            selectedAnnotation.current.fillColor = currentAnnotation.color;
        }
        else if (selectedAnnotation.current.annotationType === "Line" || selectedAnnotation.current.annotationType === "Arrow" || selectedAnnotation.current.annotationType === "Distance") {
            selectedAnnotation.current.vertexX1 = currentAnnotation.vertexPoints[0].x;
            selectedAnnotation.current.vertexY1 = currentAnnotation.vertexPoints[0].y;
            selectedAnnotation.current.vertexX2 = currentAnnotation.vertexPoints[1].x;
            selectedAnnotation.current.vertexY2 = currentAnnotation.vertexPoints[1].y;
            selectedAnnotation.current.vertexPoints = [];
            if (selectedAnnotation.current.annotationType === "Distance") {
                selectedAnnotation.current.leaderLength = currentAnnotation.leaderLength;
            }
        }
        else if (selectedAnnotation.current.annotationType === "Ink") {
            selectedAnnotation.current.width = currentAnnotation.bounds.width;
            selectedAnnotation.current.height = currentAnnotation.bounds.height;
            selectedAnnotation.current.x = currentAnnotation.bounds.x;
            selectedAnnotation.current.y = currentAnnotation.bounds.y;
            selectedAnnotation.current.showInkAnnotationType = true;
        }
        else if (selectedAnnotation.current.annotationType === "FreeText") {
            selectedAnnotation.current.width = currentAnnotation.bounds.width;
            selectedAnnotation.current.height = currentAnnotation.bounds.height;
            selectedAnnotation.current.x = currentAnnotation.bounds.left;
            selectedAnnotation.current.y = currentAnnotation.bounds.top;
            selectedAnnotation.current.defaultText = currentAnnotation.dynamicText;
            selectedAnnotation.current.fontFamily = currentAnnotation.fontFamily;
            selectedAnnotation.current.alignment = currentAnnotation.textAlign;
            selectedAnnotation.current.fontSize = currentAnnotation.fontSize;
            selectedAnnotation.current.fontColor = currentAnnotation.fontColor;
            if (currentAnnotation.font) {
                if (currentAnnotation.font.isBold) {
                    selectedAnnotation.current.fontStyle = "Bold";
                }
                else if (currentAnnotation.font.isItalic) {
                    selectedAnnotation.current.fontStyle = "Italic";
                }
                else if (currentAnnotation.font.isUnderline) {
                    selectedAnnotation.current.fontStyle = "Underline";
                }
                else if (currentAnnotation.font.isStrikeout) {
                    selectedAnnotation.current.fontStyle = "Strikethrough";
                }
                else {
                    selectedAnnotation.current.fontStyle = "None";
                }
            }
            else {
                selectedAnnotation.current.fontStyle = "None";
            }
        }
        else {
            selectedAnnotation.current.width = currentAnnotation.bounds.width;
            selectedAnnotation.current.height = currentAnnotation.bounds.height;
            selectedAnnotation.current.x = currentAnnotation.bounds.left;
            selectedAnnotation.current.y = currentAnnotation.bounds.top;
        }
        if (selectedAnnotation.current.annotationType === "Polygon" || selectedAnnotation.current.annotationType === "Perimeter" ||
            selectedAnnotation.current.annotationType === "Area" || selectedAnnotation.current.annotationType === "Volume") {
            selectedAnnotation.current.vertexPoints = addUniqueId(__spreadArray([], currentAnnotation.vertexPoints, true));
        }
        if (currentAnnotation.lineHeadStartStyle && currentAnnotation.lineHeadEndStyle) {
            selectedAnnotation.current.lineHeadStartStyle = currentAnnotation.lineHeadStartStyle;
            selectedAnnotation.current.lineHeadEndStyle = currentAnnotation.lineHeadEndStyle;
        }
        else if (currentAnnotation.lineHeadStart && currentAnnotation.lineHeadEnd) {
            selectedAnnotation.current.lineHeadStartStyle = viewer.annotation.getArrowType(currentAnnotation.lineHeadStart);
            selectedAnnotation.current.lineHeadEndStyle = viewer.annotation.getArrowType(currentAnnotation.lineHeadEnd);
        }
        else {
            if (selectedAnnotation.current.annotationType === "Line") {
                selectedAnnotation.current.lineHeadStartStyle = "None";
                selectedAnnotation.current.lineHeadEndStyle = "None";
            }
            else {
                selectedAnnotation.current.lineHeadStartStyle = "Arrow";
                selectedAnnotation.current.lineHeadEndStyle = "Arrow";
            }
        }
        if (currentAnnotation.isPrint) {
            selectedAnnotation.current.isPrint = true;
        }
        else {
            selectedAnnotation.current.isPrint = false;
        }
        selectedAnnotation.current.isLocked = currentAnnotation.isLocked;
        if (selectedAnnotation.current.isLocked) {
            selectedAnnotation.current.allowedInteractions = currentAnnotation.allowedInteractions;
        }
        else {
            selectedAnnotation.current.allowedInteractions = ["None"];
        }
        selectedAnnotation.current.opacity = (currentAnnotation.opacity >= 100) ? 100 : (currentAnnotation.opacity * 100);
        selectedAnnotation.current.thickness = currentAnnotation.thickness;
        selectedAnnotation.current.strokeColor = currentAnnotation.strokeColor;
        if (currentAnnotation.note) {
            selectedAnnotation.current.comment = currentAnnotation.note;
        }
        else if (currentAnnotation.notes) {
            selectedAnnotation.current.comment = currentAnnotation.notes;
        }
        else {
            selectedAnnotation.current.comment = "";
        }
        selectedAnnotation.current.author = currentAnnotation.author;
        selectedAnnotation.current.modifiedDate = currentAnnotation.modifiedDate;
        selectedAnnotation.current.setState = currentAnnotation.state;
        selectedAnnotation.current.showStampType = false;
        selectedAnnotation.current.disableInkAnnotField = true;
        selectedAnnotation.current.showFileUploader = false;
        selectedAnnotation.current.replies = [];
        if (selectedAnnotation.current.replies.length === 0 && currentAnnotation.comments) {
            if (currentAnnotation.comments.length > 0) {
                currentAnnotation.comments.forEach(function (element) {
                    var reply = new Comment();
                    reply.id = element.annotName;
                    reply.author = element.author;
                    reply.note = element.note;
                    reply.modifiedDate = element.modifiedDate;
                    reply.state = element.state;
                    selectedAnnotation.current.replies.push(reply);
                });
            }
        }
        if (selectedAnnotation.current.replies.length === 0 && currentAnnotation.replyComment) {
            if (currentAnnotation.replyComment.length > 0) {
                currentAnnotation.replyComment.forEach(function (element) {
                    var reply = new Comment();
                    reply.id = generateUniqueId();
                    reply.author = selectedAnnotation.current.replyAuthor;
                    reply.note = element;
                    reply.modifiedDate = new Date().toDateString();
                    reply.state = 'None';
                    selectedAnnotation.current.replies.push(reply);
                });
            }
        }
        setAnnotationFieldVisibility(false);
        setPageNumberVisibility(false);
        updatePropertiesInUI();
    }
    function addUniqueId(array) {
        if (array) {
            array.forEach(function (value) {
                value.id = generateUniqueId();
            });
        }
        else {
            array = [];
        }
        return array;
    }
    function getAnnotationByID(annotationID) {
        if (viewer && viewer.annotationCollection) {
            for (var index = 0; index < viewer.annotationCollection.length; index++) {
                if (viewer.annotationCollection[index].annotationId === annotationID) {
                    return viewer.annotationCollection[index];
                }
            }
        }
        return null;
    }
    function onAnnotationMoved(annotationMoveEventArgs) {
        selectedAnnotation.current.annotationSelected = true;
        currentUpdateAnnotIdRef.current = annotationMoveEventArgs.annotationId;
        var currentAnnotation = getAnnotationByID(currentUpdateAnnotIdRef.current);
        if (!(0, ej2_base_1.isNullOrUndefined)(currentAnnotation)) {
            currentAnnotation.bounds = annotationMoveEventArgs.currentPosition;
            updateProperties(currentAnnotation);
        }
    }
    function onAnnotationResized(annotationResizeEventArgs) {
        selectedAnnotation.current.annotationSelected = true;
        currentUpdateAnnotIdRef.current = annotationResizeEventArgs.annotationId;
        var currentAnnotation = getAnnotationByID(currentUpdateAnnotIdRef.current);
        if (!(0, ej2_base_1.isNullOrUndefined)(currentAnnotation)) {
            currentAnnotation.bounds = annotationResizeEventArgs.annotationBound;
            updateProperties(currentAnnotation);
        }
    }
    function updatePropertiesInUI() {
        setAnnotationType(selectedAnnotation.current.annotationType);
        setPageNumber((selectedAnnotation.current.pageNumber));
        setWidth(selectedAnnotation.current.width);
        setHeight(selectedAnnotation.current.height);
        setX(selectedAnnotation.current.x);
        setY(selectedAnnotation.current.y);
        setX1(selectedAnnotation.current.vertexX1);
        setY1(selectedAnnotation.current.vertexY1);
        setX2(selectedAnnotation.current.vertexX2);
        setY2(selectedAnnotation.current.vertexY2);
        setOpacity(selectedAnnotation.current.opacity);
        if (IsRGBAColor(selectedAnnotation.current.fillColor)) {
            selectedAnnotation.current.fillColor = RGBAtoHex(selectedAnnotation.current.fillColor, "fill");
        }
        setFillColor(selectedAnnotation.current.fillColor);
        if (IsRGBAColor(selectedAnnotation.current.strokeColor)) {
            selectedAnnotation.current.strokeColor = RGBAtoHex(selectedAnnotation.current.strokeColor, "stroke");
        }
        setStrokeColor(selectedAnnotation.current.strokeColor);
        setStrokeThickness(selectedAnnotation.current.thickness);
        setLineHeadStartStyle(selectedAnnotation.current.lineHeadStartStyle);
        setLineHeadEndStyle(selectedAnnotation.current.lineHeadEndStyle);
        setLeaderLength(selectedAnnotation.current.leaderLength);
        setInkAnnotationType(selectedAnnotation.current.inkAnnotationType);
        setInkAnnotationTypeVisibility(selectedAnnotation.current.showInkAnnotationType);
        setDisableInkAnnotField(selectedAnnotation.current.disableInkAnnotField);
        setDefaultText(selectedAnnotation.current.defaultText);
        setFontFamily(selectedAnnotation.current.fontFamily);
        setAlignment(selectedAnnotation.current.alignment);
        setFontSize(selectedAnnotation.current.fontSize);
        setFontColor(selectedAnnotation.current.fontColor);
        setFontStyle(selectedAnnotation.current.fontStyle);
        setAuthor(selectedAnnotation.current.author);
        setComment(selectedAnnotation.current.comment);
        setCommentState(selectedAnnotation.current.setState);
        setReplyAuthor(selectedAnnotation.current.replyAuthor);
        setReplyComment(selectedAnnotation.current.replyComment);
        setReplyState(selectedAnnotation.current.replyState);
        setPrintAnnotation(selectedAnnotation.current.isPrint);
        setStampTypeVisibility(selectedAnnotation.current.showStampType);
        setFileUploaderVisibility(selectedAnnotation.current.showFileUploader);
        if (!(0, ej2_base_1.isNullOrUndefined)(selectedAnnotation.current.vertexPoints)) {
            setVertexPoints(__spreadArray([], selectedAnnotation.current.vertexPoints, true));
        }
        else {
            setVertexPoints([]);
        }
        if (!(0, ej2_base_1.isNullOrUndefined)(selectedAnnotation.current.bounds)) {
            setBounds(__spreadArray([], selectedAnnotation.current.bounds, true));
        }
        else {
            setBounds([]);
        }
        if (!(0, ej2_base_1.isNullOrUndefined)(selectedAnnotation.current.bounds) && selectedAnnotation.current.bounds.length > 1) {
            setIsDeleteBoundsDisabled(false);
        }
        if (!(0, ej2_base_1.isNullOrUndefined)(selectedAnnotation.current.vertexPoints) && selectedAnnotation.current.vertexPoints.length > 1) {
            setIsDeleteVertexDisabled(false);
        }
        if (selectedAnnotation.current.isLocked) {
            setLockAnnotations(true);
            if ((0, ej2_base_1.isNullOrUndefined)(selectedAnnotation.current.allowedInteractions) || (selectedAnnotation.current.allowedInteractions.length === 0)) {
                setAllowedInteractions(["None"]);
            }
            else {
                setAllowedInteractions(__spreadArray([], selectedAnnotation.current.allowedInteractions, true));
            }
        }
        else {
            setLockAnnotations(false);
            setAllowedInteractions(["None"]);
        }
        if (!(0, ej2_base_1.isNullOrUndefined)(selectedAnnotation.current.replies) && (selectedAnnotation.current.replies.length > 0)) {
            setReplyBoxChecked(true);
            setReplies(__spreadArray([], selectedAnnotation.current.replies, true));
        }
        else {
            setReplyBoxChecked(false);
            setReplies([]);
        }
    }
    function resetAnnotationProperties() {
        var shapeAnnotation = selectedAnnotation.current.annotationType;
        selectedAnnotation.current.x = 100;
        selectedAnnotation.current.y = 100;
        selectedAnnotation.current.fillColor = "#FFFFFF00";
        selectedAnnotation.current.strokeColor = "#FF0000FF";
        selectedAnnotation.current.showStampType = false;
        selectedAnnotation.current.showInkAnnotationType = false;
        selectedAnnotation.current.showFileUploader = false;
        // reset arrow head styles
        if (shapeAnnotation == "Arrow" || shapeAnnotation == "Distance") {
            selectedAnnotation.current.lineHeadStartStyle = "Arrow";
            selectedAnnotation.current.lineHeadEndStyle = "Arrow";
        }
        else if (shapeAnnotation == "Perimeter") {
            selectedAnnotation.current.lineHeadStartStyle = "OpenArrow";
            selectedAnnotation.current.lineHeadEndStyle = "OpenArrow";
        }
        else {
            selectedAnnotation.current.lineHeadEndStyle = "None";
            selectedAnnotation.current.lineHeadStartStyle = "None";
        }
        // reset height and width
        if (shapeAnnotation == "Rectangle" || shapeAnnotation == "Square" || shapeAnnotation == "Circle" || shapeAnnotation == "Radius") {
            selectedAnnotation.current.width = 100;
            selectedAnnotation.current.height = 100;
        }
        else if (shapeAnnotation == "Ink") {
            selectedAnnotation.current.width = 150;
            selectedAnnotation.current.height = 60;
            selectedAnnotation.current.showInkAnnotationType = true;
            selectedAnnotation.current.disableInkAnnotField = selectedAnnotation.current.annotationSelected;
        }
        else if (shapeAnnotation == "FreeText") {
            selectedAnnotation.current.width = 150;
            selectedAnnotation.current.height = 26.5;
            selectedAnnotation.current.fontFamily = "Helvetica";
            selectedAnnotation.current.fontStyle = "None";
            selectedAnnotation.current.alignment = "Left";
            selectedAnnotation.current.defaultText = "Free Text";
            selectedAnnotation.current.fontSize = 16;
            selectedAnnotation.current.fontColor = "#000000FF";
        }
        else if (shapeAnnotation == "StickyNotes") {
            selectedAnnotation.current.width = 30;
            selectedAnnotation.current.height = 30;
        }
        else if (shapeAnnotation == "Stamp") {
            if (selectedAnnotation.current.stampType === "Dynamic") {
                selectedAnnotation.current.width = 140;
                selectedAnnotation.current.height = 55;
            }
            else if (selectedAnnotation.current.stampType === "Sign Here") {
                switch (selectedAnnotation.current.stampComment) {
                    case "SignHere": {
                        selectedAnnotation.current.width = 110;
                        selectedAnnotation.current.height = 30;
                        break;
                    }
                    case "Witness": {
                        selectedAnnotation.current.width = 130;
                        selectedAnnotation.current.height = 30;
                        break;
                    }
                    case "InitialHere": {
                        selectedAnnotation.current.width = 90;
                        selectedAnnotation.current.height = 30;
                        break;
                    }
                    case "Accepted":
                    case "Rejected": {
                        selectedAnnotation.current.width = 35;
                        selectedAnnotation.current.height = 35;
                        break;
                    }
                }
            }
            else if (selectedAnnotation.current.stampType === "Standard Business") {
                selectedAnnotation.current.height = 30;
                switch (selectedAnnotation.current.stampComment) {
                    case "Final":
                    case "Draft": {
                        selectedAnnotation.current.width = 110;
                        break;
                    }
                    case "Void": {
                        selectedAnnotation.current.width = 100;
                        break;
                    }
                    default: {
                        selectedAnnotation.current.width = 130;
                        break;
                    }
                }
            }
            selectedAnnotation.current.showStampType = !selectedAnnotation.current.annotationSelected;
        }
        else if (shapeAnnotation == "CustomStamp") {
            selectedAnnotation.current.width = 100;
            selectedAnnotation.current.height = 100;
            selectedAnnotation.current.showFileUploader = !selectedAnnotation.current.annotationSelected;
        }
        else if ((shapeAnnotation == "Highlight") || (shapeAnnotation == "Underline") || (shapeAnnotation == "Strikethrough")) {
            selectedAnnotation.current.width = 100;
            selectedAnnotation.current.height = 14;
        }
        else {
            selectedAnnotation.current.width = 0;
            selectedAnnotation.current.height = 0;
        }
        if (shapeAnnotation === "Distance") {
            selectedAnnotation.current.leaderLength = 0;
        }
        if ((shapeAnnotation == "Highlight") || (shapeAnnotation == "Underline") || (shapeAnnotation == "Strikethrough") || shapeAnnotation == "FreeText") {
            selectedAnnotation.current.x = 10;
            selectedAnnotation.current.y = 10;
            if (selectedAnnotation.current.annotationType === 'Highlight') {
                selectedAnnotation.current.fillColor = "#FFDF56FF";
            }
            else if (selectedAnnotation.current.annotationType === 'Underline') {
                selectedAnnotation.current.fillColor = "#00FF00FF";
            }
            else if (selectedAnnotation.current.annotationType === 'Strikethrough') {
                selectedAnnotation.current.fillColor = "#FF0000FF";
            }
            else {
                selectedAnnotation.current.fillColor = "#FFFFFF00";
            }
            selectedAnnotation.current.strokeColor = "#FFFFFF00";
        }
        if ((shapeAnnotation === "Polygon") || (shapeAnnotation === "Perimeter") || (shapeAnnotation === "Area") || (shapeAnnotation === "Volume")) {
            selectedAnnotation.current.x = 10;
            selectedAnnotation.current.y = 10;
        }
        selectedAnnotation.current.opacity = 100;
        selectedAnnotation.current.thickness = 1;
        selectedAnnotation.current.author = "Guest";
        selectedAnnotation.current.comment = "";
        selectedAnnotation.current.setState = "None";
        selectedAnnotation.current.replyAuthor = "Guest";
        selectedAnnotation.current.replyComment = "";
        selectedAnnotation.current.replyState = "None";
        selectedAnnotation.current.vertexX1 = 100;
        selectedAnnotation.current.vertexX2 = 200;
        selectedAnnotation.current.vertexY1 = 100;
        selectedAnnotation.current.vertexY2 = 100;
        selectedAnnotation.current.vertexPoints = [];
        selectedAnnotation.current.bounds = [];
        selectedAnnotation.current.replies = [];
        selectedAnnotation.current.isLocked = false;
        selectedAnnotation.current.isPrint = true;
        selectedAnnotation.current.allowedInteractions = ["None"];
        uploaderObj.clearAll();
        updatePropertiesInUI();
    }
    function updateChangesAnnotation() {
        setUpdateAnnotVisibility(false);
        var annotationToUpdate = getAnnotationByID(currentUpdateAnnotIdRef.current);
        if (annotationToUpdate) {
            var updatedValues = annotationUpdate(annotationToUpdate);
            viewer.annotation.editAnnotation(updatedValues);
        }
    }
    function RGBAtoHex(rgba, type) {
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
    }
    ;
    function IsRGBAColor(input) {
        var rgbaPattern = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(?:\.\d+)?)\)$/;
        if (input !== null) {
            return rgbaPattern.test(input);
        }
        return false;
    }
    ;
    function updateReply() {
        var currentReplyComment = new Comment();
        currentReplyComment.id = generateUniqueId();
        currentReplyComment.author = selectedAnnotation.current.replyAuthor;
        currentReplyComment.note = selectedAnnotation.current.replyComment;
        currentReplyComment.modifiedDate = new Date().toDateString();
        currentReplyComment.state = selectedAnnotation.current.replyState;
        if ((0, ej2_base_1.isNullOrUndefined)(selectedAnnotation.current.replies)) {
            selectedAnnotation.current.replies = [];
        }
        selectedAnnotation.current.replies.push(currentReplyComment);
        setReplies(function (prevList) { return __spreadArray(__spreadArray([], prevList, true), [currentReplyComment], false); });
        selectedAnnotation.current.replyAuthor = "Guest";
        setReplyAuthor("Guest");
        selectedAnnotation.current.replyComment = "";
        setReplyComment("");
        selectedAnnotation.current.replyState = "None";
        setReplyState("None");
    }
    function generateUniqueId() {
        return (0, uuid_1.v4)();
    }
    function getCommentID(commentId) {
        currentEditCommentId.current = commentId;
    }
    function onEditButtonClick(commentId) {
        setIsEditing(true);
        var comment = selectedAnnotation.current.replies.find(function (comment) { return comment.id === commentId; });
        if (comment) {
            selectedAnnotation.current.replyAuthor = comment.author;
            selectedAnnotation.current.replyComment = comment.note;
            selectedAnnotation.current.replyState = comment.state;
        }
        setReplyAuthor(selectedAnnotation.current.replyAuthor);
        setReplyComment(selectedAnnotation.current.replyComment);
        setReplyState(selectedAnnotation.current.replyState);
    }
    function onreplycommentdelete(commentId) {
        var commentIndex = selectedAnnotation.current.replies.findIndex(function (comment) { return comment.id === commentId; });
        if (commentIndex !== -1) {
            selectedAnnotation.current.replies.splice(commentIndex, 1);
        }
        setReplies(__spreadArray([], selectedAnnotation.current.replies, true));
    }
    function updateEditReply() {
        var currentReplyComment;
        if (isEditing && currentEditCommentId.current) {
            var replyIndex = void 0;
            replyIndex = selectedAnnotation.current.replies.findIndex(function (comment) { return comment.id === currentEditCommentId.current; });
            if (replyIndex !== -1) {
                currentReplyComment = selectedAnnotation.current.replies[replyIndex];
            }
            if (currentReplyComment) {
                currentReplyComment.author = selectedAnnotation.current.replyAuthor;
                currentReplyComment.note = selectedAnnotation.current.replyComment;
                currentReplyComment.state = selectedAnnotation.current.replyState;
                currentReplyComment.modifiedDate = new Date().toDateString();
            }
            else {
                console.error("Comment with ID ".concat(currentEditCommentId.current, " not found."));
            }
            setIsEditing(false);
            setReplies(__spreadArray([], selectedAnnotation.current.replies, true));
            currentEditCommentId.current = "";
        }
    }
    function openContextMenu(event) {
        contextMenu.open(event.clientY, event.clientX);
    }
    ;
    function annotationUpdate(annotation) {
        var _a;
        var currentAnnotation = annotation;
        currentAnnotation.opacity = selectedAnnotation.current.opacity / 100;
        currentAnnotation.fillColor = selectedAnnotation.current.fillColor;
        currentAnnotation.thickness = selectedAnnotation.current.thickness;
        currentAnnotation.strokeColor = selectedAnnotation.current.strokeColor;
        currentAnnotation.color = "";
        if (selectedAnnotation.current.annotationType === "Highlight" || selectedAnnotation.current.annotationType === "Underline" || selectedAnnotation.current.annotationType === "Strikethrough") {
            currentAnnotation.bounds = [];
            currentAnnotation.color = selectedAnnotation.current.fillColor;
            if (((_a = selectedAnnotation.current.bounds) === null || _a === void 0 ? void 0 : _a.length) == 0) {
                currentAnnotation.bounds.push({
                    id: generateUniqueId(),
                    X: selectedAnnotation.current.x,
                    Y: selectedAnnotation.current.y,
                    Height: selectedAnnotation.current.height,
                    Width: selectedAnnotation.current.width,
                    Top: selectedAnnotation.current.y,
                    Left: selectedAnnotation.current.x
                });
            }
            else if (selectedAnnotation.current.bounds.length >= 1) {
                selectedAnnotation.current.bounds.forEach(function (value, index, array) {
                    currentAnnotation.bounds.push({
                        id: generateUniqueId(),
                        X: selectedAnnotation.current.bounds[index].X,
                        Y: selectedAnnotation.current.bounds[index].Y,
                        Height: selectedAnnotation.current.bounds[index].Height,
                        Width: selectedAnnotation.current.bounds[index].Width,
                        Top: selectedAnnotation.current.bounds[index].Y,
                        Left: selectedAnnotation.current.bounds[index].X
                    });
                });
            }
        }
        else if (selectedAnnotation.current.annotationType === "Ink") {
            currentAnnotation.bounds.width = selectedAnnotation.current.width;
            currentAnnotation.bounds.height = selectedAnnotation.current.height;
            currentAnnotation.bounds.x = selectedAnnotation.current.x;
            currentAnnotation.bounds.y = selectedAnnotation.current.y;
        }
        else if (selectedAnnotation.current.annotationType === "Line" || selectedAnnotation.current.annotationType === "Arrow" || selectedAnnotation.current.annotationType === "Distance") {
            currentAnnotation.vertexPoints[0] = { x: selectedAnnotation.current.vertexX1, y: selectedAnnotation.current.vertexY1 };
            currentAnnotation.vertexPoints[1] = { x: selectedAnnotation.current.vertexX2, y: selectedAnnotation.current.vertexY2 };
            currentAnnotation.lineHeadStartStyle = selectedAnnotation.current.lineHeadStartStyle;
            currentAnnotation.lineHeadEndStyle = selectedAnnotation.current.lineHeadEndStyle;
            currentAnnotation.offset = { x: currentAnnotation.vertexPoints[0].x, y: currentAnnotation.vertexPoints[0].y };
            if (selectedAnnotation.current.annotationType === "Line") {
                currentAnnotation.subType = 'Line';
            }
            else if (selectedAnnotation.current.annotationType === "Arrow") {
                currentAnnotation.subType = 'Arrow';
            }
            else if (selectedAnnotation.current.annotationType === "Distance") {
                currentAnnotation.subType = "Distance";
            }
        }
        else if (selectedAnnotation.current.annotationType === "Polygon" || selectedAnnotation.current.annotationType === "Perimeter" || selectedAnnotation.current.annotationType === "Area" || selectedAnnotation.current.annotationType === "Volume") {
            currentAnnotation.vertexPoints = selectedAnnotation.current.vertexPoints;
            currentAnnotation.bounds.width = selectedAnnotation.current.width;
            currentAnnotation.bounds.height = selectedAnnotation.current.height;
            currentAnnotation.bounds.left = selectedAnnotation.current.x;
            currentAnnotation.bounds.top = selectedAnnotation.current.y;
        }
        else if (selectedAnnotation.current.annotationType === "FreeText") {
            currentAnnotation.bounds.width = selectedAnnotation.current.width;
            currentAnnotation.bounds.height = selectedAnnotation.current.height;
            currentAnnotation.bounds.left = selectedAnnotation.current.x;
            currentAnnotation.bounds.top = selectedAnnotation.current.y;
            currentAnnotation.bounds.x = selectedAnnotation.current.x;
            currentAnnotation.bounds.y = selectedAnnotation.current.y;
            currentAnnotation.dynamicText = selectedAnnotation.current.defaultText;
            currentAnnotation.fontFamily = selectedAnnotation.current.fontFamily;
            currentAnnotation.textAlign = selectedAnnotation.current.alignment;
            currentAnnotation.fontSize = selectedAnnotation.current.fontSize;
            currentAnnotation.fontColor = selectedAnnotation.current.fontColor;
            currentAnnotation.font.isBold = false;
            currentAnnotation.font.isUnderline = false;
            currentAnnotation.font.isItalic = false;
            currentAnnotation.font.isStrikeout = false;
            switch (selectedAnnotation.current.fontStyle) {
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
            currentAnnotation.bounds.width = selectedAnnotation.current.width;
            currentAnnotation.bounds.height = selectedAnnotation.current.height;
            currentAnnotation.bounds.left = selectedAnnotation.current.x;
            currentAnnotation.bounds.top = selectedAnnotation.current.y;
            if (!(0, ej2_base_1.isNullOrUndefined)(currentAnnotation.bounds.x) && !(0, ej2_base_1.isNullOrUndefined)(currentAnnotation.bounds.y)) {
                currentAnnotation.bounds.x = selectedAnnotation.current.x;
                currentAnnotation.bounds.y = selectedAnnotation.current.y;
            }
        }
        if (selectedAnnotation.current.annotationType === "Distance") {
            currentAnnotation.leaderLength = selectedAnnotation.current.leaderLength;
        }
        else {
            currentAnnotation.leaderLength = 0;
        }
        if (selectedAnnotation.current.annotationType === "Polygon" || selectedAnnotation.current.annotationType === "Perimeter" ||
            selectedAnnotation.current.annotationType === "Area" || selectedAnnotation.current.annotationType === "Volume") {
            currentAnnotation.vertexPoints = selectedAnnotation.current.vertexPoints;
        }
        currentAnnotation.isPrint = selectedAnnotation.current.isPrint;
        if (selectedAnnotation.current.isLocked) {
            currentAnnotation.isLocked = true;
            currentAnnotation.annotationSettings.isLock = true;
            currentAnnotation.allowedInteractions = selectedAnnotation.current.allowedInteractions;
            if (currentAnnotation.allowedInteractions.length === 0) {
                currentAnnotation.allowedInteractions = ["None"];
            }
        }
        else {
            currentAnnotation.isLocked = false;
            currentAnnotation.annotationSettings.isLock = false;
            currentAnnotation.allowedInteractions = ["None"];
        }
        updateAnnotationComments(currentAnnotation);
        return currentAnnotation;
    }
    function updateAnnotationComments(currentAnnotation) {
        var _a;
        var isReplyChanged = false;
        currentAnnotation.commentType = 'add';
        if (((!(0, ej2_base_1.isNullOrUndefined)(currentAnnotation.note) && (currentAnnotation.note !== selectedAnnotation.current.comment)) || (!(0, ej2_base_1.isNullOrUndefined)(currentAnnotation.notes) && (currentAnnotation.notes !== selectedAnnotation.current.comment))) && (currentAnnotation.comments && (currentAnnotation.comments.length > 0))) {
            currentAnnotation.commentType = 'edit';
        }
        var calibrationType = (_a = currentAnnotation.indent) !== null && _a !== void 0 ? _a : "";
        if (calibrationType !== "LineDimension" && calibrationType !== "PolyLineDimension" && calibrationType !== "PolygonDimension" && calibrationType !== "PolygonRadius" && calibrationType !== "PolygonVolume") {
            if (!(0, ej2_base_1.isNullOrUndefined)(currentAnnotation.note) || (currentAnnotation.shapeAnnotationType === "Ink" && !currentAnnotation.note)) {
                currentAnnotation.note = selectedAnnotation.current.comment;
            }
            else if (!(0, ej2_base_1.isNullOrUndefined)(currentAnnotation.notes)) {
                currentAnnotation.notes = selectedAnnotation.current.comment;
            }
        }
        currentAnnotation.replyComment = [];
        if (!(0, ej2_base_1.isNullOrUndefined)(selectedAnnotation.current.replies) && (selectedAnnotation.current.replies.length > 0)) {
            if (selectedAnnotation.current.replies.length > currentAnnotation.comments.length) {
                var diff = (selectedAnnotation.current.replies.length - currentAnnotation.comments.length);
                currentAnnotation.commentType = 'add';
                for (var index = (selectedAnnotation.current.replies.length - diff); index < (selectedAnnotation.current.replies.length); index++) {
                    currentAnnotation.replyComment.push(selectedAnnotation.current.replies[index].note);
                }
            }
            else if (selectedAnnotation.current.replies.length === currentAnnotation.comments.length) {
                selectedAnnotation.current.replies.forEach(function (value, index) {
                    if (currentAnnotation.comments[index] && (value.note !== currentAnnotation.comments[index].note)) {
                        isReplyChanged = true;
                        currentAnnotation.commentType = 'edit';
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
    }
    function documentLoaded(e) {
        if (viewer) {
            setPageCount(viewer.pageCount);
        }
        if (e.documentName === 'annotations.pdf') {
            viewer.annotation.addAnnotation("Highlight", {
                bounds: [{ x: 97, y: 610, width: 350, height: 14 }],
                pageNumber: 1
            });
            viewer.annotation.addAnnotation("Underline", {
                bounds: [{ x: 97, y: 723, width: 353.5, height: 14 }],
                pageNumber: 1
            });
            viewer.annotation.addAnnotation("Strikethrough", {
                bounds: [{ x: 97, y: 836, width: 376.5, height: 14 }],
                pageNumber: 1
            });
            viewer.annotation.addAnnotation("Line", {
                offset: { x: 200, y: 230 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
            });
            viewer.annotation.addAnnotation("Arrow", {
                offset: { x: 200, y: 370 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 370 }, { x: 350, y: 370 }]
            });
            viewer.annotation.addAnnotation("Rectangle", {
                offset: { x: 200, y: 480 },
                pageNumber: 2,
                width: 150,
                height: 75
            });
            viewer.annotation.addAnnotation("Circle", {
                offset: { x: 200, y: 620 },
                pageNumber: 2,
                width: 90,
                height: 90
            });
            viewer.annotation.addAnnotation("Polygon", {
                offset: { x: 200, y: 800 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 800 }, { x: 242, y: 771 }, { x: 289, y: 799 }, { x: 278, y: 842 }, { x: 211, y: 842 }, { x: 200, y: 800 }]
            });
            viewer.annotation.addAnnotation("Distance", {
                offset: { x: 200, y: 230 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
            });
            viewer.annotation.addAnnotation("Perimeter", {
                offset: { x: 200, y: 350 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 350 }, { x: 285, y: 350 }, { x: 286, y: 412 }]
            });
            viewer.annotation.addAnnotation("Area", {
                offset: { x: 200, y: 500 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 500 }, { x: 288, y: 499 }, { x: 289, y: 553 }, { x: 200, y: 500 }]
            });
            viewer.annotation.addAnnotation("Radius", {
                offset: { x: 200, y: 630 },
                pageNumber: 3,
                width: 90,
                height: 90
            });
            viewer.annotation.addAnnotation("Volume", {
                offset: { x: 200, y: 810 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 810 }, { x: 200, y: 919 }, { x: 320, y: 919 }, { x: 320, y: 809 }, { x: 200, y: 810 }]
            });
            viewer.annotation.addAnnotation("FreeText", {
                offset: { x: 250, y: 150 },
                fontSize: 16,
                fontFamily: "Helvetica",
                pageNumber: 4,
                width: 200,
                height: 40,
                isLock: false,
                defaultText: "Syncfusion"
            });
            viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 240 },
                pageNumber: 4
            }, ej2_react_pdfviewer_1.DynamicStampItem.Approved);
            viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 350 },
                pageNumber: 4
            }, null, ej2_react_pdfviewer_1.SignStampItem.SignHere);
            viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 460 },
                pageNumber: 4
            }, null, null, ej2_react_pdfviewer_1.StandardBusinessStampItem.Confidential);
            //The customStampImageSource property contains the stamp image as a base64 string
            viewer.annotation.addAnnotation("Stamp", {
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
            viewer.annotation.addAnnotation("Ink", {
                offset: { x: 250, y: 860 },
                pageNumber: 4,
                width: 200,
                height: 60,
                path: '[{\"command\":\"M\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":250.83334350585938,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":257.5,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":926.6667175292969},{\"command\":\"L\",\"x\":259.5,\"y\":924.0000305175781},{\"command\":\"L\",\"x\":259.5,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":258.16668701171875,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.16668701171875,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":253.5,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":925.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":927.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":253.5,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":260.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":264.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":274.16668701171875,\"y\":958.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":281.5,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":285.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":967.3333435058594},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":282.8333740234375,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":266.16668701171875,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":259.5,\"y\":993.3333435058594},{\"command\":\"L\",\"x\":252.16668701171875,\"y\":994.0000305175781},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":228.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":246.16668701171875,\"y\":972.0000305175781},{\"command\":\"L\",\"x\":257.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":262.8333435058594,\"y\":976.0000305175781},{\"command\":\"L\",\"x\":269.5,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":276.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":279.5,\"y\":978.0000305175781},{\"command\":\"L\",\"x\":285.5,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":288.16668701171875,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":293.5,\"y\":966.6667175292969},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":291.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":292.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":295.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":297.5,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":298.8333740234375,\"y\":970.6667175292969},{\"command\":\"L\",\"x\":301.5,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":304.16668701171875,\"y\":968.6667175292969},{\"command\":\"L\",\"x\":305.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":308.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":310.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":311.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":312.8333740234375,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":968.0000305175781},{\"command\":\"L\",\"x\":317.5,\"y\":972.6667175292969},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":986.0000305175781},{\"command\":\"L\",\"x\":319.5,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.8333740234375,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":987.3333435058594},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":985.3333435058594},{\"command\":\"L\",\"x\":314.16668701171875,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":320.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":321.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":322.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":322.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":326.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":328.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":328.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":329.5,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.6667175292969},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":331.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":332.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":333.5,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":334.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":335.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":336.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":337.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":338.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":340.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":341.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":342.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":344.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":346.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":349.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":350.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":351.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":355.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":356.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":358.16668701171875,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":360.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":364.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":370.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":932.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":375.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":378.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":380.8333740234375,\"y\":981.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":383.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":387.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":392.8333740234375,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":385.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":382.8333740234375,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":963.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":384.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":387.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":389.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":390.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":390.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":393.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":396.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":398.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":947.3333435058594},{\"command\":\"L\",\"x\":401.5,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":402.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":403.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":404.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":406.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":407.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":410.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":412.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.0000305175781},{\"command\":\"L\",\"x\":415.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":418.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":420.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":423.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":423.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":421.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":422.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":424.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":425.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":428.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":429.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":430.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":432.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":434.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":437.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":440.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":441.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":442.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":443.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":444.16668701171875,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":447.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":450.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":453.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":452.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":450.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":448.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":447.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":445.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.8333740234375,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":454.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":456.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":459.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":460.8333740234375,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":461.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":462.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":464.16668701171875,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":465.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":466.16668701171875,\"y\":932.6667175292969},{\"command\":\"L\",\"x\":467.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":469.5,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":470.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":474.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":475.5,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":478.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":481.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":484.8333740234375,\"y\":934.0000305175781},{\"command\":\"L\",\"x\":488.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":489.5,\"y\":928.0000305175781}]'
            });
            viewer.annotation.addAnnotation("StickyNotes", {
                offset: { x: 300, y: 980 },
                pageNumber: 4,
                isLock: false
            });
        }
        selectedAnnotation.current = new AnnotationBase();
        annotationUnSelectedEvent();
    }
    function change(args) {
        if (args.checked) {
            viewer.serviceUrl = '';
        }
        else {
            viewer.serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
        }
        viewer.dataBind();
        viewer.load(viewer.documentPath, null);
    }
}
exports.default = ProgrammaticOperations;
