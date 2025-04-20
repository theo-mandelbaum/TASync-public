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
exports.Overview = void 0;
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./treegrid-overview.css");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var Overview = /** @class */ (function (_super) {
    __extends(Overview, _super);
    function Overview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flagtemplate = _this.gridTemplate;
        _this.gdptemplate = _this.treegridTemplate;
        _this.ratingtemplate = _this.treeratingTemplate;
        _this.unemploymentTemplate = _this.treeunemployTemplate;
        _this.locationtemplate = _this.treelocationTemplate;
        _this.areatemplate = _this.treeareaTemplate;
        _this.timezonetemplate = _this.treezoneTemplate;
        _this.Filter = {
            type: 'Excel',
            itemTemplate: _this.flagtemplate
        };
        return _this;
    }
    Overview.prototype.gridTemplate = function (props) {
        var flagIconLocation = (props.parentItem) ? props.parentItem.name : props.name;
        return (React.createElement("div", { style: { display: 'inline' } },
            React.createElement("div", { style: { display: 'inline-block' } },
                React.createElement("img", { className: 'e-treeoverviewimage', src: "src/treegrid/images/" + flagIconLocation + ".png", alt: flagIconLocation })),
            React.createElement("div", { style: { display: 'inline-block', paddingLeft: '6px', verticalAlign: 'middle' } }, props.name)));
    };
    Overview.prototype.treegridTemplate = function (props) {
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
    Overview.prototype.treeratingTemplate = function (props) {
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.RatingComponent, { value: props.rating, cssClass: 'custom-rating', readOnly: true })));
    };
    Overview.prototype.treeunemployTemplate = function (props) {
        return (React.createElement("div", { id: "myProgress", className: "pbar" }, props.unemployment <= 4 ?
            React.createElement("div", { id: "myBar", className: "bar progressdisable", style: { width: props.unemployment * 10 + "%" } },
                React.createElement("div", { id: "pbarlabel", className: "barlabel" }, props.unemployment + "%")) :
            React.createElement("div", { id: "myBar", className: "bar", style: { width: props.unemployment * 10 + "%" } },
                React.createElement("div", { id: "pbarlabel", className: "barlabel" }, props.unemployment + "%"))));
    };
    Overview.prototype.treelocationTemplate = function (props) {
        var locationsrc = 'src/treegrid/images/Map.png';
        return (React.createElement("div", { id: "coordinates" },
            React.createElement("img", { src: locationsrc, className: 'e-treeoverviewimage', alt: props.coordinates }),
            React.createElement("a", { target: '_blank', href: 'https://www.google.com/maps/place/' }, props.coordinates)));
    };
    Overview.prototype.treeareaTemplate = function (props) {
        return (React.createElement("span", null,
            props.area,
            " km",
            React.createElement("sup", null, "2")));
    };
    Overview.prototype.treezoneTemplate = function (props) {
        var classValue = '';
        if (props.timezone.indexOf('-') !== -1) {
            classValue = 'negativeTimeZone';
        }
        return (React.createElement("div", null,
            React.createElement("img", { src: 'src/treegrid/images/__Normal.png', alt: "Normal", style: { filter: "brightness(150%)" }, className: classValue }),
            React.createElement("span", { style: { paddingLeft: '7px' } }, props.timezone),
            ")"));
    };
    Overview.prototype.populationValue = function (field, data) {
        return data[field] / 1000000;
    };
    Overview.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane', role: "control", "aria-label": "Tree Grid Control" },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.countries, childMapping: 'states', height: '400', allowReordering: true, allowFiltering: true, allowSorting: true, filterSettings: { type: 'Menu', hierarchyMode: 'Parent' } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'name', headerText: 'Province', width: '210', template: this.flagtemplate, filter: this.Filter }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'population', headerText: 'Population (Million)', allowFiltering: false, valueAccessor: this.populationValue, textAlign: 'Right', width: '200' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'gdp', headerText: 'GDP Rate %', width: '155', template: this.gdptemplate }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'rating', headerText: 'Credit Rating', width: '190', template: this.ratingtemplate }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'unemployment', headerText: 'Unemployment Rate', width: '200', allowFiltering: false, template: this.unemploymentTemplate }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'coordinates', headerText: 'Coordinates', allowSorting: false, width: '220', template: this.locationtemplate }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'area', headerText: 'Area', width: '140', template: this.areatemplate }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'timezone', headerText: 'Time Zone', width: '150', template: this.timezonetemplate })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Filter, ej2_react_treegrid_1.Sort, ej2_react_treegrid_1.Reorder] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This ",
                    React.createElement("a", { target: '_blank', href: "https://www.syncfusion.com/react-ui-components/react-tree-grid" }, " React Tree Grid"),
                    " example demonstrates the overview of basic Tree Grid features such as sorting, filtering, conditional formatting, column template and scrolling.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "The Tree Grid is used to represent the hierarchical data in a tabular format, combining the visual representation of Grid and TreeView controls. It represents the data from datasource such as an array of JSON objects, OData web services, or DataManager binding data fields to columns or self-referential datasource."),
                React.createElement("p", null,
                    "In this demo,\u00A0Tree Grid features such as ",
                    React.createElement("code", null, "sorting, filtering, conditional formatting, column template and scrolling"),
                    " are used."),
                React.createElement("p", null,
                    "More information on the Tree Grid instantiation can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/treegrid/getting-started/' }, " documentation section.")))));
    };
    return Overview;
}(sample_base_1.SampleBase));
exports.Overview = Overview;
