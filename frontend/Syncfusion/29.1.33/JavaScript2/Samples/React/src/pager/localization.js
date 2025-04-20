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
exports.Localization = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
ej2_base_1.L10n.load({
    'de-DE': {
        'pager': {
            'currentPageInfo': '{0} von {1} Seiten ',
            'totalItemsInfo': '({0} Beiträge)',
            'firstPageTooltip': 'Zur ersten Seite',
            'lastPageTooltip': 'Zur letzten Seite',
            'nextPageTooltip': 'Zur nächsten Seite',
            'previousPageTooltip': 'Zurück zur letzten Seite',
            'nextPagerTooltip': 'Zurück zur letzten Seite',
            'previousPagerTooltip': 'Zum vorherigen Pager'
        }
    },
    'es-ES': {
        'pager': {
            'currentPageInfo': '{0} de {1} páginas ',
            'totalItemsInfo': '({0} artículos)',
            'firstPageTooltip': 'Ir a la primera página',
            'lastPageTooltip': 'Ir a la última página',
            'nextPageTooltip': 'Ir a la página siguiente',
            'previousPageTooltip': 'Ir a la página anterior',
            'nextPagerTooltip': 'Ir al siguiente Pager',
            'previousPagerTooltip': 'Ir a Pager anterior'
        }
    }
});
var Localization = /** @class */ (function (_super) {
    __extends(Localization, _super);
    function Localization() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Localization.prototype.onChange = function () {
        var culture = document.getElementById('ddl').value;
        this.pagerInstance.locale = culture;
    };
    Localization.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_grids_1.PagerComponent, { pageSize: 1, totalRecordsCount: 7, pageCount: 3, ref: function (pager) { return _this.pagerInstance = pager; } })),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', style: { width: '100%', margin: '10px' } },
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Select Culture")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { padding: '10px 10px 10px 0px' } },
                                        React.createElement("select", { id: "ddl", name: "ddl", className: "form-control", style: { padding: '6px' }, onChange: this.onChange.bind(this) },
                                            React.createElement("option", { value: "en-US" }, "en-US"),
                                            React.createElement("option", { value: "de-DE" }, "de-DE"),
                                            React.createElement("option", { value: "es-ES" }, "es-ES"))))))))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Pager control was rendered with ",
                    React.createElement("code", null, "en-US"),
                    " culture. Here the Pager contents are updated based on current culture. You can also change the control culture by selecting it from the culture options in the properties panel."))));
    };
    return Localization;
}(sample_base_1.SampleBase));
exports.Localization = Localization;
