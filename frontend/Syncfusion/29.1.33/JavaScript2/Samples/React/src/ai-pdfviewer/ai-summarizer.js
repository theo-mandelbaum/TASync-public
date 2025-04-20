"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var react_1 = require("react");
function Summarizer() {
    // Replace the localhost web service url here
    var SERVICE_URL = 'Service_Url/api/pdfviewer';
    (0, react_1.useEffect)(function () {
        document.body.setAttribute('id', 'e-pv-AI-body-container');
    }, []);
    var pdfviewer;
    var fabButton;
    var aiAssistViewInst;
    var leftContainer;
    var rightContainer;
    var assistViews = [{ iconCss: "e-icons e-assistview-icon" }];
    var initialResponse = false;
    /* Function for the document load event*/
    function documentLoad() {
        if (fabButton) {
            fabButton.element.style.display = 'block';
        }
    }
    /* Function for the document unload event*/
    function documentUnLoad() {
        if (rightContainer) {
            rightContainer.style.display = "none";
        }
        if (!ej2_base_1.Browser.isDevice) {
            if (leftContainer) {
                leftContainer.style.width = "100%";
            }
            pdfviewer.updateViewerContainer();
        }
        if (fabButton) {
            fabButton.element.style.display = 'block';
        }
        aiAssistViewInst.prompts = [];
        aiAssistViewInst.promptSuggestions = [];
        initialResponse = false;
    }
    /* Function for the show the interchat*/
    function showAI() {
        if (fabButton) {
            fabButton.element.style.display = 'none';
        }
        if (!ej2_base_1.Browser.isDevice) {
            if (leftContainer) {
                leftContainer.style.width = "70%";
            }
            pdfviewer.updateViewerContainer();
        }
        if (rightContainer) {
            rightContainer.style.display = "block";
        }
        if (!initialResponse) {
            aiAssistViewInst.executePrompt("Summarize the document");
        }
    }
    var bannerViewTemplate = function () {
        return (React.createElement("div", { className: "ai-assist-banner" },
            React.createElement("div", { className: "e-icons e-assistview-icon" }),
            React.createElement("h2", null, "AI Assistance"),
            React.createElement("div", { className: "ai-assist-banner-subtitle" }, "Your everyday AI companion")));
    };
    /* Interactive chat toolbar settings */
    var assistViewToolbarSettings = {
        itemClicked: function (args) {
            if (args.item.iconCss == 'e-icons e-close') {
                if (fabButton) {
                    fabButton.element.style.display = 'block';
                }
                if (!ej2_base_1.Browser.isDevice) {
                    if (leftContainer) {
                        leftContainer.style.width = "100%";
                    }
                }
                if (rightContainer) {
                    rightContainer.style.display = "none";
                }
                if (!ej2_base_1.Browser.isDevice) {
                    pdfviewer.updateViewerContainer();
                }
            }
            if (args.item.iconCss == 'e-icons e-refresh') {
                var lastPropmt = aiAssistViewInst.prompts[aiAssistViewInst.prompts.length - 1].prompt;
                var editedPrompts = aiAssistViewInst.prompts;
                editedPrompts.pop();
                aiAssistViewInst.prompts = editedPrompts;
                aiAssistViewInst.onPropertyChanged(aiAssistViewInst);
                aiAssistViewInst.executePrompt(lastPropmt);
            }
        },
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }, { iconCss: 'e-icons e-close', align: 'Right' }]
    };
    /*Function trigger when the prompt request is made*/
    function promptRequestToAI(args) {
        if (!initialResponse) {
            initialResponse = true;
            callAIAssist();
        }
        else {
            var post = args.prompt;
            var url = SERVICE_URL + "/GetAnswer";
            var xhr_1 = new XMLHttpRequest();
            xhr_1.open('Post', url, true);
            xhr_1.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhr_1.onload = function () {
                if (xhr_1.status >= 200 && xhr_1.status < 300) {
                    var response = xhr_1.responseText;
                    try {
                        var summarizeResponse = GetResponse(response);
                        var responseSuggestions = GetSuggestion(response);
                        var _promptSuggestions = responseSuggestions;
                        var references = extractReferences(summarizeResponse);
                        var modifiedResponse_1 = summarizeResponse;
                        var referenceToLink_1 = {};
                        references.forEach(function (ref) {
                            var pageNumber = ref.replace(/[\[\]]/g, '');
                            var linkTag = "<a href='#' id=\"page-".concat(pageNumber, "\" onclick=\"handlePageLinkClick(").concat(parseInt(pageNumber, 10), ")\">").concat(pageNumber, "</a>");
                            referenceToLink_1[ref] = linkTag;
                        });
                        Object.keys(referenceToLink_1).forEach(function (ref) {
                            var regex = new RegExp(ref, 'g');
                            modifiedResponse_1 = modifiedResponse_1.replace(regex, referenceToLink_1[ref]);
                        });
                        aiAssistViewInst.addPromptResponse(modifiedResponse_1);
                        aiAssistViewInst.promptSuggestions = _promptSuggestions;
                        aiAssistViewInst.onPropertyChanged(aiAssistViewInst);
                    }
                    catch (e) {
                        console.error('Failed to parse response as JSON:', e);
                    }
                }
                else {
                    console.error('Request failed with status:', xhr_1.status, xhr_1.statusText);
                }
            };
            xhr_1.onerror = function () {
                console.error('Network error');
            };
            xhr_1.send(JSON.stringify({ question: post }));
        }
    }
    function GetResponse(text) {
        var jsonResponse = JSON.parse(text);
        var suggestions = jsonResponse.split('\nsuggestions');
        suggestions = suggestions.filter(function (suggestion) { return suggestion.trim() !== ''; });
        var summarizeResponse = suggestions[suggestions.length - 2].trim(); /*Get the response */
        return summarizeResponse;
    }
    function GetSuggestion(text) {
        var jsonResponse = JSON.parse(text);
        var suggestions = jsonResponse.split('\nsuggestions');
        suggestions = suggestions.filter(function (suggestion) { return suggestion.trim() !== ''; });
        suggestions.shift();
        var responseSuggestions = suggestions[0].split('\n'); /*Get the suggestions */
        responseSuggestions = responseSuggestions.filter(function (suggestion) { return suggestion.trim() !== ''; });
        responseSuggestions = responseSuggestions.map(function (line) { return line.replace(/^\d+\.\s*/, ''); });
        return responseSuggestions;
    }
    /*Fucntion to separate the page number */
    function extractReferences(text) {
        var referenceRegex = /\[(.*?)\]/g;
        var matches = [];
        var match;
        while ((match = referenceRegex.exec(text)) !== null) {
            var numbers = match[1].split(',').map(function (num) { return num.trim(); });
            matches.push.apply(matches, numbers);
        }
        return matches;
    }
    /*Function fro navigate the page of the viewer*/
    window.handlePageLinkClick = function (pageNumber) {
        pdfviewer.navigation.goToPage(pageNumber);
    };
    /*Initial prompt request method*/
    function callAIAssist() {
        var data = pdfviewer.getRootElement();
        var hashId = data.ej2_instances[0].viewerBase.hashId;
        var dictionary = {
            "hashId": hashId,
        };
        var post = JSON.stringify(dictionary);
        var url = SERVICE_URL + "/SummarizePDF";
        var xhr = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var response = xhr.responseText;
                try {
                    var summarizeResponse = GetResponse(response);
                    var responseSuggestions = GetSuggestion(response);
                    var _promptSuggestions = responseSuggestions;
                    aiAssistViewInst.promptSuggestions = _promptSuggestions;
                    aiAssistViewInst.addPromptResponse(summarizeResponse);
                    aiAssistViewInst.onPropertyChanged(aiAssistViewInst);
                }
                catch (e) {
                    console.error('Failed to parse response as JSON:', e);
                }
            }
            else {
                console.error('Request failed with status:', xhr.status, xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.error('Network error');
        };
        xhr.send(post);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: "e-pv-AI-parent-container" },
            React.createElement("div", { id: "e-pv-left-container", ref: function (container) { return leftContainer = container; } },
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "e-pv-fab-btn", title: "Open AI Assist", style: { display: 'none' }, ref: function (fab) { return fabButton = fab; }, iconCss: 'e-icons e-assistview-icon', onClick: showAI }),
                React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { id: "PdfViewer", style: { height: '100%', width: '100%' }, ref: function (pdfviewerObj) { return pdfviewer = pdfviewerObj; }, documentPath: "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf", serviceUrl: SERVICE_URL, documentLoad: documentLoad, zoomMode: "FitToPage", documentUnload: documentUnLoad },
                    React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] }))),
            React.createElement("div", { id: "e-pv-right-container", style: { display: 'none' }, ref: function (container) { return rightContainer = container; } },
                React.createElement("div", { id: "container-ai-assist" },
                    React.createElement(ej2_react_interactive_chat_1.AIAssistViewComponent, { ref: function (aiAssistView) { return aiAssistViewInst = aiAssistView; }, id: "e-pv-defaultAIAssistView", promptPlaceholder: "Type your prompt for assistance...", promptSuggestionsHeader: "Suggested Prompts", responseIconCss: "e-icons e-assistview-icon", views: assistViews, toolbarSettings: assistViewToolbarSettings, width: "100%", height: "100vh", bannerTemplate: bannerViewTemplate, promptRequest: promptRequestToAI }))))));
}
exports.default = Summarizer;
