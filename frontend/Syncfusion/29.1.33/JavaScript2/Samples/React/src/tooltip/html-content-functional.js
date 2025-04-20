"use strict";
/**
 * Loading HTML content sample
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./html-content.css");
var HtmlContentTooltip = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var tooltipObj = (0, react_1.useRef)(null);
    var onClick = function (args) {
        if (tooltipObj.current != null) {
            if (!args.target.classList.contains('e-control') && !args.target.classList.contains('e-btn')) {
                if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
                    tooltipObj.current.close();
                }
            }
        }
    };
    var onScroll = function () {
        if (tooltipObj.current != null) {
            if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
                tooltipObj.current.close();
            }
        }
    };
    var created = function () {
        if (document.getElementById('right-pane')) {
            document.getElementById('right-pane').addEventListener('click', onClick.bind(_this));
            document.getElementById('right-pane').addEventListener('scroll', onScroll.bind(_this));
        }
    };
    var tooltipTemplate = function () {
        return (React.createElement("div", { id: "democontent", className: "democontent" },
            React.createElement("h3", { style: { marginTop: '10px' } }, "Eastern Bluebird"),
            React.createElement("hr", { style: { marginTop: '10px 0px' } }),
            React.createElement("img", { id: "bird", src: './src/tooltip/images/bird.png', alt: "bird_image" }),
            React.createElement("p", null,
                "The ",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/Eastern_bluebird", target: "_blank" }, " Eastern Bluebird "),
                "is easily found in open fields and sparse woodland areas, including along woodland edges.")));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "htmlTemplate", className: "col-lg-12 control-section" },
                React.createElement(ej2_react_popups_1.TooltipComponent, { id: 'content', created: created.bind(_this), content: tooltipTemplate, opensOn: 'Click', cssClass: 'e-tooltip-template-css', target: "#content", ref: tooltipObj },
                    React.createElement("div", { id: "customization" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-outline', isPrimary: true, className: "text", id: "content" }, "HTML Template"))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates customizing tooltip content to display a HTML page.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Tooltip ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/tooltip/#content" }, "content"),
                " has been customized using HTML tags and CSS, i.e. the content can be loaded with HTML tags such as <img>, <a>,<b>, etc. Title can also be added to the content. Overall, the tooltip content can be customized to appear like a web page."))));
};
exports.default = HtmlContentTooltip;
