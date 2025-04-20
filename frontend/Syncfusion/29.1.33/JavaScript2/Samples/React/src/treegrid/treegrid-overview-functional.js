"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
require("./treegrid-overview.css");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var Overview = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var gridTemplate = function (props) {
        var flagIconLocation = props.parentItem
            ? props.parentItem.name
            : props.name;
        return (React.createElement("div", { style: { display: "inline" } },
            React.createElement("div", { style: { display: "inline-block" } },
                React.createElement("img", { className: "e-treeoverviewimage", src: "src/treegrid/images/" + flagIconLocation + ".png", alt: flagIconLocation })),
            React.createElement("div", { style: { display: "inline-block", paddingLeft: "6px", verticalAlign: 'middle' } }, props.name)));
    };
    var treegridTemplate = function (props) {
        if (props.gdp < 2) {
            return (React.createElement("div", { className: "statustemp e-lowgdp" },
                React.createElement("span", { className: "statustxt e-lowgdp" },
                    props.gdp,
                    " %")));
        }
        else {
            return (React.createElement("div", { className: "statustemp" },
                React.createElement("span", { className: "statustxt" },
                    props.gdp,
                    " %")));
        }
    };
    var treeratingTemplate = function (props) {
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.RatingComponent, { value: props.rating, cssClass: 'custom-rating', readOnly: true })));
    };
    var treeunemployTemplate = function (props) {
        return (React.createElement("div", { id: "myProgress", className: "pbar" }, props.unemployment <= 4 ?
            React.createElement("div", { id: "myBar", className: "bar progressdisable", style: { width: props.unemployment * 10 + "%" } },
                React.createElement("div", { id: "pbarlabel", className: "barlabel" }, props.unemployment + "%")) :
            React.createElement("div", { id: "myBar", className: "bar", style: { width: props.unemployment * 10 + "%" } },
                React.createElement("div", { id: "pbarlabel", className: "barlabel" }, props.unemployment + "%"))));
    };
    var treelocationTemplate = function (props) {
        var locationsrc = "src/treegrid/images/Map.png";
        return (React.createElement("div", { id: "coordinates" },
            React.createElement("img", { src: locationsrc, className: "e-treeoverviewimage", alt: props.coordinates }),
            React.createElement("a", { target: "_blank", href: "https://www.google.com/maps/place/" }, props.coordinates)));
    };
    var treeareaTemplate = function (props) {
        return (React.createElement("span", null,
            props.area,
            " km",
            React.createElement("sup", null, "2")));
    };
    var treezoneTemplate = function (props) {
        var classValue = "";
        if (props.timezone.indexOf("-") !== -1) {
            classValue = "negativeTimeZone";
        }
        return (React.createElement("div", null,
            React.createElement("img", { src: "src/treegrid/images/__Normal.png", alt: "Normal", style: { filter: "brightness(150%)" }, className: classValue }),
            React.createElement("span", { style: { paddingLeft: "7px" } }, props.timezone),
            ")"));
    };
    var populationValue = function (field, data) {
        return data[field] / 1000000;
    };
    var flagtemplate = gridTemplate;
    var gdptemplate = treegridTemplate;
    var ratingtemplate = treeratingTemplate;
    var unemploymentTemplate = treeunemployTemplate;
    var locationtemplate = treelocationTemplate;
    var areatemplate = treeareaTemplate;
    var timezonetemplate = treezoneTemplate;
    var provinceFilter = {
        type: "Excel",
        itemTemplate: flagtemplate,
    };
    return (React.createElement("div", { className: "control-pane", role: "control", "aria-label": "Tree Grid Control" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.countries, childMapping: "states", height: "400", allowReordering: true, allowFiltering: true, allowSorting: true, filterSettings: { type: "Menu", hierarchyMode: "Parent" } },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "name", headerText: "Province", width: "210", template: flagtemplate, filter: provinceFilter }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "population", headerText: "Population (Million)", allowFiltering: false, valueAccessor: populationValue, textAlign: "Right", width: "200" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "gdp", headerText: "GDP Rate %", width: "155", template: gdptemplate }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "rating", headerText: "Credit Rating", width: "190", template: ratingtemplate }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "unemployment", headerText: "Unemployment Rate", width: "200", allowFiltering: false, template: unemploymentTemplate }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "coordinates", headerText: "Coordinates", allowSorting: false, width: "220", template: locationtemplate }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "area", headerText: "Area", width: "140", template: areatemplate }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "timezone", headerText: "Time Zone", width: "150", template: timezonetemplate })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Filter, ej2_react_treegrid_1.Sort, ej2_react_treegrid_1.Reorder] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This",
                " ",
                React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/react-ui-components/react-tree-grid" },
                    " ",
                    "React Tree Grid"),
                " ",
                "example demonstrates the overview of basic Tree Grid features such as sorting, filtering, conditional formatting, column template and scrolling.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Tree Grid is used to represent the hierarchical data in a tabular format, combining the visual representation of Grid and TreeView controls. It represents the data from datasource such as an array of JSON objects, OData web services, or DataManager binding data fields to columns or self-referential datasource."),
            React.createElement("p", null,
                "In this demo,\u00A0Tree Grid features such as",
                " ",
                React.createElement("code", null, "sorting, filtering, conditional formatting, column template and scrolling"),
                " ",
                "are used."),
            React.createElement("p", null,
                "More information on the Tree Grid instantiation can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/getting-started/" },
                    " ",
                    "documentation section.")))));
};
exports.default = Overview;
