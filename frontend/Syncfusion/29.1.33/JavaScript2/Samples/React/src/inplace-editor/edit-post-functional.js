"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inplace_editor_1 = require("@syncfusion/ej2-react-inplace-editor");
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./editor.component.css");
// tslint:disable:max-line-length
function UseCase() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var inplaceEditorControlEle;
    inplaceEditorControlEle = null;
    var inplaceEditorControlRef = function (element) {
        inplaceEditorControlEle = element;
    };
    var titleObj;
    var tagObj;
    var rteObj;
    var editorMode;
    var popupSettings = { model: { width: 300 } };
    var multiValue = ['TypeScript', 'JavaScript'];
    // define the array of string
    var multiData = ['Android', 'JavaScript', 'jQuery', 'TypeScript', 'Angular', 'React', 'Vue', 'Ionic'];
    var textValidationRules = { Title: { required: [true, 'Enter valid title'] } };
    var textModel = { placeholder: 'Enter your question title' };
    var rteValidationRules = { rte: { required: [true, 'Enter valid comments'] } };
    var rteModel = {
        toolbarSettings: {
            enableFloating: false,
            items: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase', '|', 'OrderedList', 'UnorderedList']
        }
    };
    var selectValidationRules = { Tag: { required: [true, 'Enter valid tags'] } };
    var selectModel = { dataSource: multiData, placeholder: 'Enter your tags', mode: 'Box', };
    // Mapping DropDownList dataSource property
    var editorData = [
        { 'value': 'Inline', 'text': 'Inline' }, { 'value': 'Popup', 'text': 'Popup' }
    ];
    // Mapping DropDownList fields property
    var dropDownFields = { text: 'text', value: 'value' };
    // Mapping DropDownList value property
    var dropDownVal = 'Inline';
    // Change event funtion for DropDownList component   
    function changeEditorMode(e) {
        var mode = editorMode.value;
        titleObj.mode = mode;
        tagObj.mode = mode;
        rteObj.mode = mode;
        titleObj.dataBind();
        tagObj.dataBind();
        rteObj.dataBind();
    }
    function selectionActionSuccess(e) {
        e.value = chipCreation(e.value.split(','));
    }
    function create() {
        rteObj.popupSettings.model.width = inplaceEditorControlEle.offsetWidth;
        chipOnCreate();
    }
    function chipOnCreate() {
        tagObj.element.querySelector('.e-editable-value').innerHTML = chipCreation(tagObj.value);
    }
    function chipCreation(data) {
        var value = '<div class="e-chip-list">';
        [].slice.call(data).forEach(function (val) {
            value += '<div class="e-chip"> <span class="e-chip-text"> ' + val + '</span></div>';
        });
        value += '</div>';
        return value;
    }
    function rendereComplete() {
        var rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', scrollRightPane);
        }
    }
    function componentWillUnmount() {
        var rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.removeEventListener('scroll', scrollRightPane);
        }
    }
    function scrollRightPane() {
        var mode = document.getElementById('editorMode');
        if (mode && mode.value === 'Inline') {
            return;
        }
        if (titleObj && titleObj.element.querySelectorAll('.e-editable-open')) {
            titleObj.enableEditMode = false;
        }
        if (tagObj && tagObj.element.querySelectorAll('.e-editable-open')) {
            tagObj.enableEditMode = false;
        }
        if (rteObj && rteObj.element.querySelectorAll('.e-editable-open')) {
            rteObj.enableEditMode = false;
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "col-lg-8 control-section inplace-editor-control-section form-layout", ref: inplaceEditorControlRef, id: 'inplace-editor-control' },
            React.createElement("div", { className: "content-wrapper", style: { marginBottom: "25px" } },
                React.createElement("div", { id: "confirmation" },
                    React.createElement("div", { id: "submitDialog" }),
                    React.createElement("form", { id: "formId", className: "form-horizontal" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", { className: "col-sm-6 control-label", style: { textAlign: "left", fontSize: "14px", fontWeight: 700 } }, "Title"),
                            React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (title) { titleObj = title; }, id: 'inplace_title_editor', "data-underline": 'false', mode: 'Inline', emptyText: 'Enter your question title', name: 'Title', value: 'Succinctly E-Book about TypeScript', validationRules: textValidationRules, model: textModel })),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", { className: "col-sm-6 control-label", style: { textAlign: "left", fontSize: "14px", fontWeight: 700 } }, "Comments"),
                            React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (rte) { rteObj = rte; }, id: 'inplace_comment_editor', "data-underline": 'false', mode: 'Inline', type: 'RTE', editableOn: 'EditIconClick', submitOnEnter: false, value: 'The extensive adoption of JavaScript for application development, and the ability to use HTML and JavaScript to create Windows Store apps, has made JavaScript a vital part of the Windows development ecosystem. Microsoft has done extensive work to make JavaScript easier to use.', emptyText: 'Enter your comment', name: 'rte', validationRules: rteValidationRules, model: rteModel, popupSettings: popupSettings },
                                React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.Rte] }))),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", { className: "col-sm-6 control-label", style: { textAlign: "left", fontSize: "14px", fontWeight: 700 } }, "Tags"),
                            React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (tag) { tagObj = tag; }, id: 'inplace_tag_editor', "data-underline": 'false', mode: 'Inline', type: 'MultiSelect', created: create.bind(this), value: multiValue, emptyText: 'Enter your tags', name: 'Tag', actionSuccess: selectionActionSuccess.bind(this), validationRules: selectValidationRules, model: selectModel },
                                React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.MultiSelect] }))))))),
        React.createElement("div", { className: 'col-lg-4 property-section', id: "editorProperty" },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null),
                            React.createElement("th", null))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Mode")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (drop) { editorMode = drop; }, id: 'editorMode', className: 'form-control', dataSource: editorData, fields: dropDownFields, value: dropDownVal, width: '90%', change: changeEditorMode.bind(this) })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The sample demonstrates In-place Editor component usage with a form element. Edit the values in place to update to the post.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This sample demonstrates the placing of following ",
                React.createElement("code", null, "In-place Editor"),
                "\u00A0controls with the default form"),
            React.createElement("p", null,
                React.createElement("ul", null,
                    React.createElement("li", null, "TextBox"),
                    React.createElement("li", null, "RichTextEditor"),
                    React.createElement("li", null, "MultiSelect"))),
            React.createElement("p", null,
                "More information on the ",
                React.createElement("code", null, "In-place Editor"),
                " instantiation can be found in the\u00A0",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/" }, "documentation section"),
                "."))));
}
exports.default = UseCase;
