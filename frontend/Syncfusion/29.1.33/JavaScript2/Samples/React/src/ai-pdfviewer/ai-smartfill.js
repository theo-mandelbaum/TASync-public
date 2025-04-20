"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var ej2_base_1 = require("@syncfusion/ej2-base");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
function SmartFill() {
    // Replace the localhost web service url here
    var SERVICE_URL = 'Service_Url/api/pdfviewer';
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d, _e, _f;
        if (rightContainerBlack) {
            (0, ej2_react_popups_1.createSpinner)({ target: rightContainerBlack });
            (0, ej2_react_popups_1.hideSpinner)(rightContainerBlack);
        }
        toolbarObj.hideItem(6, true);
        toolbarObj.hideItem(5, true);
        if (ej2_base_1.Browser.isDevice) {
            if (copyObjBtn1 && copyObjBtn2 && copyObjBtn3) {
                copyObjBtn1.element.style.display = "block";
                copyObjBtn2.element.style.display = "block";
                copyObjBtn3.element.style.display = "block";
            }
        }
        else {
            (_a = document.getElementById("e-pv-card1")) === null || _a === void 0 ? void 0 : _a.addEventListener("mouseenter", function () {
                if (copyObjBtn1) {
                    copyObjBtn1.element.style.display = "block";
                }
            });
            (_b = document.getElementById("e-pv-card1")) === null || _b === void 0 ? void 0 : _b.addEventListener("mouseleave", function () {
                if (copyObjBtn1) {
                    copyObjBtn1.element.style.display = "none";
                    copyObjBtn1.iconCss = "e-icons e-copy";
                    copyObjBtn1.disabled = false;
                    copyObjBtn1.dataBind();
                }
            });
            (_c = document.getElementById("e-pv-card2")) === null || _c === void 0 ? void 0 : _c.addEventListener("mouseenter", function () {
                if (copyObjBtn2) {
                    copyObjBtn2.element.style.display = "block";
                }
            });
            (_d = document.getElementById("e-pv-card2")) === null || _d === void 0 ? void 0 : _d.addEventListener("mouseleave", function () {
                if (copyObjBtn2) {
                    copyObjBtn2.element.style.display = "none";
                    copyObjBtn2.iconCss = "e-icons e-copy";
                    copyObjBtn2.disabled = false;
                    copyObjBtn2.dataBind();
                }
            });
            (_e = document.getElementById("e-pv-card3")) === null || _e === void 0 ? void 0 : _e.addEventListener("mouseenter", function () {
                if (copyObjBtn3) {
                    copyObjBtn3.element.style.display = "block";
                }
            });
            (_f = document.getElementById("e-pv-card3")) === null || _f === void 0 ? void 0 : _f.addEventListener("mouseleave", function () {
                if (copyObjBtn3) {
                    copyObjBtn3.element.style.display = "none";
                    copyObjBtn3.iconCss = "e-icons e-copy";
                    copyObjBtn3.disabled = false;
                    copyObjBtn3.dataBind();
                }
            });
        }
        if (copyObjBtn1) {
            copyObjBtn1.element.addEventListener('click', copyContent1);
        }
        if (copyObjBtn2) {
            copyObjBtn2.element.addEventListener('click', copyContent2);
        }
        if (copyObjBtn3) {
            copyObjBtn3.element.addEventListener('click', copyContent3);
        }
        fileUploadBtn.addEventListener('change', readFile, false);
    }, []);
    var pdfviewer;
    var toolbarObj;
    var rightContainer;
    var rightContainerBlack;
    var smartFillContainerOpen = false;
    var copyObjBtn1;
    var copyObjBtn2;
    var copyObjBtn3;
    var clipContent;
    var fileUploadBtn;
    /* Function for the document load event */
    function documentLoaded() {
        toolbarObj.hideItem(6, false);
        if (ej2_base_1.Browser.isDevice) {
            toolbarObj.hideItem(5, false);
        }
    }
    /* Function for download */
    function downloadClicked() {
        pdfviewer.download();
    }
    /* Function for print */
    function printClicked() {
        pdfviewer.print.print();
    }
    /* Function for create event */
    function sampleCreated() {
        var appbarContainer = document.getElementById('e-pv-smartfill-appbar-container');
        var appbarContainerSm = document.getElementById('e-pv-smartfill-appbar-container-sm');
        if (appbarContainer) {
            appbarContainer.style.display = 'block';
        }
        if (ej2_base_1.Browser.isDevice) {
            if (appbarContainerSm) {
                appbarContainerSm.style.display = 'block';
            }
        }
        pdfviewer.load('form_document_1.pdf', '');
    }
    function copyContent1() {
        var obj = document.getElementById("e-pv-card-content1");
        clipContent = obj === null || obj === void 0 ? void 0 : obj.innerHTML;
        copyToClipboard(clipContent);
        copyObjBtn1.iconCss = "e-icons e-check";
        copyObjBtn1.disabled = true;
        copyObjBtn1.dataBind();
        copyObjBtn2.iconCss = "e-icons e-copy";
        copyObjBtn2.dataBind();
        copyObjBtn3.iconCss = "e-icons e-copy";
        copyObjBtn3.dataBind();
        if (ej2_base_1.Browser.isDevice) {
            setTimeout(function () {
                copyObjBtn1.iconCss = "e-icons e-copy";
                copyObjBtn1.disabled = false;
                copyObjBtn1.dataBind();
            }, 2000);
        }
    }
    function copyContent2() {
        var obj = document.getElementById("e-pv-card-content2");
        clipContent = obj === null || obj === void 0 ? void 0 : obj.innerHTML;
        copyToClipboard(clipContent);
        copyObjBtn1.iconCss = "e-icons e-copy";
        copyObjBtn1.dataBind();
        copyObjBtn2.iconCss = "e-icons e-check";
        copyObjBtn2.disabled = true;
        copyObjBtn2.dataBind();
        copyObjBtn3.iconCss = "e-icons e-copy";
        copyObjBtn3.dataBind();
        if (ej2_base_1.Browser.isDevice) {
            setTimeout(function () {
                copyObjBtn2.iconCss = "e-icons e-copy";
                copyObjBtn2.disabled = false;
                copyObjBtn2.dataBind();
            }, 2000);
        }
    }
    function copyContent3() {
        var obj = document.getElementById("e-pv-card-content3");
        clipContent = obj === null || obj === void 0 ? void 0 : obj.innerHTML;
        copyToClipboard(clipContent);
        copyObjBtn1.iconCss = "e-icons e-copy";
        copyObjBtn1.dataBind();
        copyObjBtn2.iconCss = "e-icons e-copy";
        copyObjBtn2.dataBind();
        copyObjBtn3.iconCss = "e-icons e-check";
        copyObjBtn3.disabled = true;
        copyObjBtn3.dataBind();
        if (ej2_base_1.Browser.isDevice) {
            setTimeout(function () {
                copyObjBtn3.iconCss = "e-icons e-copy";
                copyObjBtn3.disabled = false;
                copyObjBtn3.dataBind();
            }, 2000);
        }
    }
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
            }).catch(function (err) {
                console.error("Failed to copy text to clipboard: ", err);
            });
        }
        else {
            // Fallback for older browsers
            var textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand("copy");
                console.log("Text copied to clipboard using fallback method!");
            }
            catch (err) {
                console.error("Failed to copy text to clipboard: ", err);
            }
            document.body.removeChild(textarea);
        }
    }
    function openSampleContent() {
        if (ej2_base_1.Browser.isDevice) {
            if (!smartFillContainerOpen) {
                if (rightContainer) {
                    rightContainer.style.display = 'block';
                }
                smartFillContainerOpen = true;
            }
            else {
                if (rightContainer) {
                    rightContainer.style.display = 'none';
                }
                smartFillContainerOpen = false;
            }
        }
    }
    /* Function for create request to get the form field data */
    function getSmartFillResult() {
        if (rightContainerBlack) {
            rightContainerBlack.style.display = 'block';
        }
        if (rightContainerBlack) {
            (0, ej2_react_popups_1.showSpinner)(rightContainerBlack);
        }
        var data = pdfviewer.getRootElement();
        var hashId = data.ej2_instances[0].viewerBase.hashId;
        var dictionary = {
            "hashId": hashId
        };
        var url = SERVICE_URL + "/SmartFillClicked";
        var xhr = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var response = xhr.responseText;
                try {
                    pdfviewer.importFormFields(response, ej2_react_pdfviewer_1.FormFieldDataFormat.Xfdf);
                    pdfviewer.dataBind();
                    if (rightContainerBlack) {
                        rightContainerBlack.style.display = 'none';
                    }
                    if (rightContainerBlack) {
                        (0, ej2_react_popups_1.hideSpinner)(rightContainerBlack);
                    }
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
        navigator.clipboard.readText().then(function (clipboardText) {
            pdfviewer.exportFormFieldsAsObject(ej2_react_pdfviewer_1.FormFieldDataFormat.Xfdf)
                .then(function (xfdfdata) {
                var post = JSON.stringify({
                    jsonObject: dictionary,
                    textareaContent: clipboardText,
                    exportFormFieldValue: xfdfdata
                });
                xhr.send(post); // Send the request with clipboard content
            })
                .catch(function (error) {
                console.error('Error getting XFDF data:', error);
            });
        }).catch(function (err) {
            console.error("Failed to read clipboard: ", err);
        });
    }
    /* Function for read the open file */
    function readFile(args) {
        var upoadedFiles = args.target.files;
        if (args.target.files[0] !== null) {
            var uploadedFile = upoadedFiles[0];
            if (uploadedFile) {
                var reader = new FileReader();
                var filename_1 = upoadedFiles[0].name;
                reader.readAsDataURL(uploadedFile);
                reader.onload = function (e) {
                    var uploadedFileUrl = e.currentTarget.result;
                    pdfviewer.documentPath = uploadedFileUrl;
                    pdfviewer.fileName = filename_1;
                };
            }
        }
    }
    /* Function for open the document */
    function openDocument() {
        fileUploadBtn === null || fileUploadBtn === void 0 ? void 0 : fileUploadBtn.click();
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: "e-pv-smartfill-parent-container" },
            React.createElement("div", { id: "e-pv-smart-fill-container" },
                React.createElement("div", { id: "e-pv-smartfill-left-container" },
                    React.createElement("div", { id: "e-pv-smartfill-appbar-container", style: { display: 'none' } },
                        React.createElement(ej2_react_navigations_1.AppBarComponent, { id: "e-pv-smartfill-defaultappbar", colorMode: 'Primary' },
                            React.createElement("span", { className: "e-pv-smartfill-regular" }, "Smart Fill"))),
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "e-pv-smartfill-toolbar", style: { top: '0px' }, ref: function (toolbar) { return toolbarObj = toolbar; } },
                        React.createElement(ej2_react_layouts_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-folder", tooltipText: "Open", text: "Open File", id: "openButton", cssClass: "e-pv-open-container", click: openDocument }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Separator", tooltipText: "separator", align: "Left" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-download", tooltipText: "Save", text: "Save", id: "saveButton", cssClass: "e-pv-save-container", click: downloadClicked }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-print", tooltipText: "Print", text: "Print", id: "printButton", cssClass: "e-pv-print-container", click: printClicked }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Separator", tooltipText: "separator" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-redaction", tooltipText: "Open Sample Content", text: "Open Content", align: "Right", id: "openSampleContentButton", cssClass: "e-pv-content-smartfill-btn-container", click: openSampleContent }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: "Smart Fill", text: "Smart Form Fill", align: "Right", id: "smartFillButton", template: function () { return (!ej2_base_1.Browser.isDevice ?
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, id: "smartfill_btn", iconCss: 'e-icons e-smart-paste', isToggle: true, content: 'Smart Form Fill' }) :
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: true, id: "smartfill_btn", iconCss: 'e-icons e-smart-paste', isToggle: true })); }, cssClass: "e-pv-smartfill-btn-container", click: getSmartFillResult }))),
                    React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { id: "e-pv-smartfill-pdfviewer", ref: function (pdfviewerObj) { return pdfviewer = pdfviewerObj; }, serviceUrl: SERVICE_URL, enableAnnotationToolbar: false, enableToolbar: false, enablePageOrganizer: false, zoomMode: "FitToPage", downloadFileName: "SmartFill.pdf", created: sampleCreated, documentLoad: documentLoaded },
                        React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.FormFields] })),
                    React.createElement("input", { type: "file", ref: function (fileUpload) { return fileUploadBtn = fileUpload; }, id: "e-pv-smartfill-fileUpload", accept: ".pdf", style: { display: 'block', visibility: 'hidden', width: '0', height: '0' } }),
                    React.createElement("div", { id: "e-pv-smartfill-right-container-blackout", style: { display: 'none' }, ref: function (container) { return rightContainerBlack = container; } })),
                React.createElement("div", { id: "e-pv-smartfill-right-container", ref: function (container) { return rightContainer = container; } },
                    React.createElement("div", { id: "e-pv-smartfill-text" },
                        React.createElement("div", { id: "e-pv-smartfill-header-text" }, "Sample content to copy")),
                    React.createElement("div", { tabIndex: 0, className: "e-card", id: "e-pv-card1" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-copy-icon', iconCss: 'e-icons e-copy', id: "e-pv-copy-card1", style: { display: 'none' }, ref: function (btn) { return copyObjBtn1 = btn; } }),
                        React.createElement("div", { className: "e-card-content", id: "e-pv-card-content1" }, "Hi, this is Alice. You can contact me at alice456@gmail.com. I am female, born on July 15, 1998. I want to unsubscribe from a newspaper and learn courses, specifically a Cloud Computing course. I am from Texas.")),
                    React.createElement("div", { tabIndex: 0, className: "e-card", id: "e-pv-card2" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-copy-icon', ref: function (btn) { return copyObjBtn2 = btn; }, iconCss: 'e-icons e-copy', id: "e-pv-copy-card2", style: { display: 'none' } }),
                        React.createElement("div", { className: "e-card-content", id: "e-pv-card-content2" }, "Hello, I'm John Paul born on March 12, 2001. I am not looking to subscribe to any newspapers or enroll in courses. I'm male and you can reach me at johnpaul2209@gmail.com. I'm from Alaska and I'm interested in a Web Development course.")),
                    React.createElement("div", { tabIndex: 0, className: "e-card", id: "e-pv-card3" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-copy-icon', ref: function (btn) { return copyObjBtn3 = btn; }, iconCss: 'e-icons e-copy', id: "e-pv-copy-card3", style: { display: 'none' } }),
                        React.createElement("div", { className: "e-card-content", id: "e-pv-card-content3" }, "Hello, my name is Peter Parker, born on Sept 22, 2002. I'm interested in subscribing to a newspaper and learning through courses. I'm male, and you can contact me at peterparker03@gmail.com. I'm from New York, and I'm interested in a Digital Marketing course.")))))));
}
exports.default = SmartFill;
