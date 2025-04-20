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
var HyperlinksAndBookmarksView = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var hostUrl = "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
    var container = (0, react_1.useRef)(null);
    var titleBar;
    var onLoadDefault = function () {
        // tslint:disable
        var defaultDocument = {
            sfdt: "UEsDBAoAAAAIAEqJbVbMYSO7bAUAAMgmAAAEAAAAc2ZkdO1azW7jNhB+FYK9GllbtuWNTy3SGls0WQTb7mGx9oGSKIswRSoUFScb7Lt3KFLxH90osREHaJLD0CRnOPPx04wy8QOWhWY5+0H/ThONx1pVtINLGuPx9wcMslB4/ICLJR6HvaCDiwyPR+cw4DkMQContZORk0la4HEXpKR2kCV43A87OHUyYvV0BCfhz3R5TeYUg/25KGHiN0UiFsNnEUsOE70OpjfLWvJIx7WmXfk++wlGam+L1LgaJao0UsOxD7DGtZVqbmXkPmdW3BoBkpTWrVIL45BUOeFwPmep2xDX1lPj7i+DwSi4GEwmGOZZfXa9aqwvdO2cMaJlARseGs3yB/j/EQCAj/hKCqnvC4oupCrZLYGjtkx3jIYByeqYkVcrJfsWREr3LflXwH/NATb8CWYVZ2JRIiISFEm5yIlalKtwmlB7a6HOzOpBl2DB/0RJwsQc9Xbx38Hb+fuocTQn9jFgjweXUtEcsaKscpRILhUqmUYbeNmNJKfaM93x7Y2lgCdQU10pz6rXesIKVsaARUsFypnfnZImEIhXhVVlLpOWB2iaF7Kt+0zELGFJJXRLhcq7kZMIrgNR7wXUt0NRTuaCeCHk7KYinoUz9NVrkAqW+7wgCcoZrPl0bkGJ5G15cFOxsiUgQpaQwr2XQ++oipkmmknhxZJzksey5UE1xn63BCtZ+8vadwWsaEvhO+8saakeyxzYLFvvhkcS+OEL5ewY2ScqbcYnTr4oG00g/+SG5UykRtNceQctmEj4PbplO6kptUUrM2XBvAHsxvbp2/UfXy7//PwXmuJM66Icf/iwXC7P5lLOOT0DED9MMZpOJaxf3aMljUwCpFO8c06wKoku3TfFZlV/ZKWMCWNhR7/X7qK+X4JFpCXQXlMlCEdfv1zOzl6tQBy7GAbPLobBezF8L4bvxfC9GP7Pi+E3WaGYCKQoiTNUlUhnSlbz7JASmBPGtRyb8vprfg+oFUTcmyo4xejFFc8YPbjcGSOz04H/fuwJGP6PBE5TuP2ig2LO4sUB1J5yoDdYeuGbW0bV4a9sTb/B8nhmXK9RmDVdmAiPU8JLWsPhRra/0nP9lQtIm5FiAGFVB19aDCJiobAdJNtx6bof2BtFK3ss2rBdd2J6j52YlX0Sr7bVvZjVUtOCWZ/ZmIDQD2IPYF8HopxMndQ2TEOuruUWUKvuo511R+e9MAyH3dEo6J4PRmbeYuO4ZjtzLqKFcaQZL8XjeBk3VMI65VYt0UvbQnP9OSpSCzZ4iyH20sk0t+cVViSZzrn1PrWdPpNO3aXd64g3w5r4G0+Hs3No26/rsNmBYu2xE3ergw1zt/tUR3ClTgVBB0tufdnuPNb8Djf5jS7ZPNOPzcNgMhychxvNw3CbsiuVdbauzW5wdm3eM21br2vpah0VdJERhZ+ArtlkW4lvPtLfaUoqrtE1UWSuSJGhiXTv52L/8kZ4P7cxCI5HH8eeYB97+s/FtH8q9gRt2BPsZ8+bjPQJ9jRh9Y9KiKfSviFMfx9hgv+EsTfpj8L+BozBqQjTb0OY/n7CvMlIWxJm8OqEGewShjX/PGz33NWvV43CKQgzaEOYgY8wbzjSloQZvjphhp4M0y4/n4QcwzbkGHqzyduIqiURwlcnQvgsIqzn3ZMQIWxDhPCZRHjNqJ4gwmepaXm8P6U8txs1yS9q8uA23l5oH1sLm6hW9dj94T4M+xc9+y2MFqF+FYqWkt/SBF1RYRq/2zdWW/3YNb+trU4k53JJkzYOnw8Hk1HwtOmZQdG0lwBUbmWcW6ncxzsrWT4vXZ9F1H2Zw78I86IO1LTqdrt9162JT+rFoPFCvJIXM9NrxfQd/xPi//NfUEsBAhQACgAAAAgASoltVsxhI7tsBQAAyCYAAAQAAAAAAAAAAAAAAAAAAAAAAHNmZHRQSwUGAAAAAAEAAQAyAAAAjgUAAAAA",
        };
        // tslint:enable
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = "Hyperlinks and Bookmarks";
        container.current.documentEditorSettings.showBookmarks = true;
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
            React.createElement("p", null, "This example demonstrates hyperlinks and bookmarks support in document editor. A file, mail, webpage, or bookmark can be added as a link to the text.")),
        React.createElement("div", { id: "description" },
            React.createElement("div", null,
                React.createElement("p", null, "In this example, you can find all the link types that can be added to a text or portions of text in the document editor."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Link that refers to a webpage."),
                    React.createElement("li", null, "Link that refers to a mail."),
                    React.createElement("li", null, "Link that refers to a bookmark.")),
                React.createElement("p", { style: { display: "block" } },
                    "You can also add your own screen tip text for a hyperlink. More information about the document editor features can be found in this",
                    " ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/document-editor/bookmark/" }, "documentation section."))))));
};
exports.default = HyperlinksAndBookmarksView;
