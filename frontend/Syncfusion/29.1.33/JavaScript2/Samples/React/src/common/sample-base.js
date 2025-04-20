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
exports.updateAISampleSection = exports.updateSampleSection = exports.SampleBase = void 0;
var React = require("react");
var index_1 = require("./index");
var leftpane_1 = require("./leftpane");
var component_content_1 = require("./component-content");
var SampleBase = /** @class */ (function (_super) {
    __extends(SampleBase, _super);
    function SampleBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Custom Render Complete function
     */
    SampleBase.prototype.rendereComplete = function () {
    };
    SampleBase.prototype.componentDidUpdate = function () {
    };
    SampleBase.prototype.componentDidMount = function () {
        var _this = this;
        (0, component_content_1.showHooks)(false);
        finalizeContent();
        setTimeout(function () {
            finalizeTab();
            _this.rendereComplete();
        });
    };
    return SampleBase;
}(React.PureComponent));
exports.SampleBase = SampleBase;
function finalizeContent() {
    (0, component_content_1.renderDescriptions)();
    (0, index_1.setSbLink)();
    (0, component_content_1.onComponentLoad)();
    (0, component_content_1.setNavButtonState)();
    (0, component_content_1.intialLoadScrollTop)();
}
function finalizeTab() {
    (0, leftpane_1.setSelectList)();
    (0, index_1.removeOverlay)();
    (0, component_content_1.checkApiTableDataSource)();
}
function updateSampleSection() {
    if (component_content_1.isRendered) {
        return;
    }
    (0, component_content_1.showHooks)(true);
    finalizeContent();
    setTimeout(function () {
        finalizeTab();
        (0, component_content_1.setIsFinalize)();
    });
}
exports.updateSampleSection = updateSampleSection;
function updateAISampleSection() {
    if (component_content_1.isRendered) {
        return;
    }
    (0, component_content_1.showHooks)(false);
    finalizeContent();
    setTimeout(function () {
        finalizeTab();
    });
}
exports.updateAISampleSection = updateAISampleSection;
