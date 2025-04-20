"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_documenteditor_1 = require("@syncfusion/ej2-react-documenteditor");
var title_bar_1 = require("./title-bar");
require("./default.component.css");
ej2_react_documenteditor_1.DocumentEditorContainerComponent.Inject(ej2_react_documenteditor_1.Toolbar);
// tslint:disable:max-line-length
var AutoShapesComponent = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var hostUrl = "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
    var container = (0, react_1.useRef)(null);
    var titleBar;
    var onLoadDefault = function () {
        // tslint:disable
        var defaultDocument = { "sfdt": "UEsDBAoAAAAIAKZgFlkcU6HwggUAAL8vAAAEAAAAc2ZkdO1aS2/jNhD+KwZ7rGvo/fAt3cTtodhdpEEv2xxoibTU6uEVaTu7gf97SQ7lV+xEWVu20EQBMhRnSM7j4yeB8iMqpzzN0+/kTxpzNOTVjPQRIxEafnlEQk4rNHxE0wUauqE7sMIwDHw/tEIvCPpomqBh4JiD0DAMy3FMx/Ast4+yXFgbfVQJaQnJtRxrmcRoaHt9RLWM6RQNRX9cEmiMUxDCC/SRLD7jCUF9RAoqxothUsrp01oSJVNaoKEpJAE5nRRMTHBV4XEaifFFVGZMacjXhZLZmEdqKGi+3C/FoiryKZVhj+OKScmFW49Cl3GQ1QTkWN8nIOZSCMl4IR0vqxxnYt1M+qkUEQXDVK1R37E0Vt7IQbflrIhJfEsijotJJsOeK6V02DbUUo5I8UIGYsj7ujGfQtLnJRqKnM6xCmxeie5f7IFjWIFlu+RnW5QtgSwnYJlgtUCyz3JRgel3uYjl9BEulTFfMC05VAoKkFRQR7iNMxC6EyyzCDIP7mHGoaQq3bLcPwkoGSNxichFpymzrpQZhQlWRtIMQWKEDYPZYQRXI/gcIpNw9AcW4FE1JCDtgQeIhMbxVeew2muKL5eFHUeZTLHOBPqLVDEusEyBCnekL9lB5ebYtKB4576gZKdnq0O6mk0l1sjXWVqRnBQcLe/F37K/A0oLQHldLoqrqioXm2iUKHwWjKHbHhgtwwnaAaPvbaFxM/MnQKPRHI17ymGfgiMESbdXF9vwrXOQxGh05eqMv5NEqyRxTVg6KQ7wg3MMP5hBiwThGKH39gjCPQVBWHaLBOGa8gXw/S3i/0MQNw8kmvG0PMQR3jEcYfktcoRnOs7b4wj/FBxhWy1yhG96wTk44uYmsG5u3jmifY64I4ynxeQAQwTHMITttcgQgRlab48hwlMwhGO2yBChZXrnYIjrX30jtN8Z4hxnERnBjGiGEP9ESODsfX/tH8UZI8pr3QJXTe3qB5yl4yoVy8xUBZgGBNQ3gaM+MUR6DYOU/+thOFrPrEJZq+pQNnu2OkQoR5UsSwt9mgmSasnB+zHTIAVsMY00iLDMVsem2v1/5ap1e1Gs2ouorvIaDJRpjzjNoBHzBZzM6uNRok9cE+EsEqEzLWkO609BxAnPwRNKwcGozKe6FN/4GHQ8yWV6KIu0kBj9RGkaSYrJ8T+UgSJT4JTaDIvHh1Dydb57f6SThCNJXtKC4FUzYkiChnIdXp4WjWZ8eS4523jylLTVke+31dyw33p3eKxIE1ileNjV1Guou95vlaDe2nj8dBY1fsO0Hr3a3LoSx0Fwix92iOAuzQnrfSSL3m2ZY5m8eisJizRWLUMe/6vjbMO26020Z6DeTPs0exXLrQSugr8mFM8y3vuMKzyp8DTpjcqCQzLMmuVq498JjsVLSM88VbJe3K8yMZsbdmD4oel5nmv4vmWEjr+9g81DFfC2+U1DvyZka+Q6oYd2KGtttE1cG/17upeb2EPqGbbOW+9Dgiu0vxJPjDYqcKkoDqBj12XrbHh4HRysQ3CwOwEHqwkcrMNwsDsKB7ujcLBf4uf9iTRHtu/Z7cPBbgIH+zAczh5FQzg4HYWD8xQO6eoF/vLs4DSBg7MPDheKoiEc3I7Cwd3DDpdHgdsEBe5eUuhi8b2OFt97VfHP9UTwmhTfe2XxL/cg8DtafP/HHgTnQoHfBAX+jz4ILgeHoKNwCA69JhoD99lU2upqHxBBE0AEh18ULxBHQ0iEHYVE+BxDdAobYRNshM+TRYdBQqrTIGT/IfDT0/2tPKuUai9qp0ZlyS/vlPZCHrRm8oOEkDgDGeUgK337ADLNJwxmkz/5fUTs7L/Zha8Wf88Mw7ARfK+ILuqFU3tRnMkL+aFGfhl4z//l8r/8D1BLAQIUAAoAAAAIAKZgFlkcU6HwggUAAL8vAAAEAAAAAAAAAAAAAAAAAAAAAABzZmR0UEsFBgAAAAABAAEAMgAAAKQFAAAAAA==" };
        // tslint:enable
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = "Auto Shapes";
        container.current.documentEditorSettings.showRuler = true;
        titleBar.updateDocumentTitle();
        container.current.documentChange = function () {
            titleBar.updateDocumentTitle();
            container.current.documentEditor.focusIn();
        };
    };
    var rendereComplete = function () {
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
        container.current.documentEditor.pageOutline = "#E0E0E0";
        container.current.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();
        titleBar = new title_bar_1.TitleBar(document.getElementById("documenteditor_titlebar"), container.current.documentEditor, true);
        onLoadDefault();
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { id: "documenteditor_titlebar", className: "e-de-ctn-title" }),
            React.createElement("div", { id: "documenteditor_container_body" },
                React.createElement(ej2_react_documenteditor_1.DocumentEditorContainerComponent, { id: "container", ref: container, style: { display: "block" }, height: "590px", serviceUrl: hostUrl, enableToolbar: true, locale: "en-US" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows auto shapes preservation in Document Editor.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "With Document Editor, you can see the auto shapes from your Word Document."),
            React.createElement("p", null, "List of shapes preserved:"),
            React.createElement("ul", null,
                React.createElement("li", null, "Lines"),
                React.createElement("li", null, "Rectangles"),
                React.createElement("li", null, "Basic shapes"),
                React.createElement("li", null, "Block arrows"),
                React.createElement("li", null, "Equation shapes"),
                React.createElement("li", null, "Flowcharts"),
                React.createElement("li", null, "Stars and banners")),
            React.createElement("p", null,
                "More information about the Document Editor features can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/document-editor/shapes" }, " documentation section.")))));
};
exports.default = AutoShapesComponent;
