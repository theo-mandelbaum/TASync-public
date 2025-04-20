"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_base_1 = require("@syncfusion/ej2-base");
function SmartRedact() {
    // Replace the localhost web service url here
    var SERVICE_URL = 'Service_Url/api/pdfviewer';
    (0, react_1.useEffect)(function () {
        if (rightContainer) {
            (0, ej2_react_popups_1.createSpinner)({ target: rightContainer });
            (0, ej2_react_popups_1.hideSpinner)(rightContainer);
        }
        if (scanBtnObj) {
            scanBtnObj.addEventListener('click', scanBtnClicked);
        }
        if (rightContainerCloseBtn) {
            rightContainerCloseBtn.element.addEventListener('click', closeRightContainer);
        }
        if (redactAIBtn) {
            redactAIBtn.element.addEventListener('click', redactionApply);
        }
        if (redactCancelBtnObj) {
            redactCancelBtnObj.element.addEventListener('click', redactCancel);
        }
        if (parentContainer) {
            parentContainer.addEventListener('touchstart', checkClickedDiv);
        }
        if (downloadBtn) {
            downloadBtn.element.addEventListener('click', downloadClicked);
        }
        fileUploadBtn === null || fileUploadBtn === void 0 ? void 0 : fileUploadBtn.addEventListener('change', readFile, false);
    }, []);
    var pdfviewer;
    var toolbarObj;
    var treeObj;
    var fabButton;
    var redactAIBtn;
    var scanBtn;
    var selectedTreeViewObj;
    var smartRedactContainerOpen = false;
    var isFindMobileDevice = false;
    var isSelectedCategores = true;
    var IsSelectedOccurences = false;
    var selectedTreeObjData = [];
    var redactionCount = 0;
    var downloadBtn;
    var scanTreeObj;
    var scanBtnObj;
    var selectedTreeObj;
    ;
    var textHeaderPattern;
    var textHeaderRedact;
    var selectedBtnObj;
    var redactCancelBtnObj;
    var rightContainer;
    var rightContainerBlack;
    var fileUploadBtn;
    var zoomInBtn = document.getElementById('zoominButton');
    var zoomOutBtn = document.getElementById('zoomoutButton');
    var leftContainer = document.getElementById('e-pv-smartredact-left-container');
    var parentContainer = document.querySelector('.e-pv-viewer-container');
    var rightContainerCloseBtn;
    /* Initialize the scan objects tree view */
    var treeObjData = [
        { id: 1, name: 'Select All', hasChild: true, expanded: true, isChecked: true },
        { id: 2, pid: 1, name: 'Person Names' },
        { id: 3, pid: 1, name: 'Organization Names' },
        { id: 4, pid: 1, name: 'Email addresses' },
        { id: 5, pid: 1, name: 'Phone Numbers' },
        { id: 6, pid: 1, name: 'Addresses' },
        { id: 7, pid: 1, name: 'Dates' },
        { id: 8, pid: 1, name: 'Account Numbers' },
        { id: 9, pid: 1, name: 'Credit Card Numbers' }
    ];
    var treeObjDataChecked = [
        { id: 1, checked: true },
        { id: 2, checked: true },
        { id: 3, checked: true },
        { id: 4, checked: true },
        { id: 5, checked: true },
        { id: 6, checked: true },
        { id: 7, checked: true },
        { id: 8, checked: true },
        { id: 9, checked: true }
    ];
    /* Function for the document download */
    function downloadClicked() {
        pdfviewer.download();
    }
    /* Function for the annotation add event */
    function annotationAdded() {
        redactionCount++;
        updateRedactButton();
    }
    /* Function for the annotation remove event */
    function annotationRemove(args) {
        var subject = args.annotationBounds.parentObj.properties.subject;
        selectedTreeViewObj.uncheckAll([subject]);
        redactionCount--;
        updateRedactButton();
    }
    /* Function for the pdfviewer created event */
    function sampleCreated() {
        var appbarContainer = document.getElementById('e-pv-smartredact-appbar-container');
        if (appbarContainer) {
            appbarContainer.style.display = 'block';
        }
        pdfviewer.load('Confidential_Medical_Record.pdf', '');
    }
    /* Function for the document load event */
    function documentLoaded() {
        if (fabButton) {
            fabButton.element.style.display = 'block';
        }
        isMobileDevice();
        if (smartRedactContainerOpen) {
            openSmartReact();
        }
        selectedTreeObjData = [];
        annotationCollection = [];
        redactionCount = 0;
        isSelectedCategores = true;
        IsSelectedOccurences = false;
        updateRedactButton();
    }
    /* Function for the enable or disable the redact button */
    function updateRedactButton() {
        var toolbarRedactBtn = document.getElementById('redactButton');
        if (redactionCount > 0) {
            if (toolbarRedactBtn) {
                toolbarObj.enableItems(toolbarRedactBtn, true);
                redactAIBtn.disabled = false;
                redactAIBtn.dataBind();
            }
        }
        else {
            if (toolbarRedactBtn) {
                toolbarObj.enableItems(toolbarRedactBtn, false);
                redactAIBtn.disabled = true;
                redactAIBtn.dataBind();
            }
        }
    }
    function optionsClicked(args) {
        var selectedNodeChecked = treeObjDataChecked.findIndex(function (item) { return item.id.toString() === args.node.dataset.uid; });
        if (treeObjDataChecked[selectedNodeChecked].checked) {
            treeObj.uncheckAll([args.node.dataset.uid.toString()]);
            treeObjDataChecked[selectedNodeChecked].checked = false;
        }
        else {
            treeObj.checkAll([args.node.dataset.uid.toString()]);
            treeObjDataChecked[selectedNodeChecked].checked = true;
        }
    }
    function optionsSelect(args) {
        var result = args.data.find(function (element) { return element.text === "Select All"; });
        if (result.isChecked == "false") {
            scanBtn.disabled = true;
            scanBtn.dataBind();
        }
        else {
            scanBtn.disabled = false;
            scanBtn.dataBind();
        }
    }
    function closeRightContainer() {
        if (!smartRedactContainerOpen) {
            if (!ej2_base_1.Browser.isDevice) {
                if (leftContainer) {
                    leftContainer.style.width = '75%';
                }
                pdfviewer.updateViewerContainer();
                toolbarObj.refreshOverflow();
            }
            smartRedactContainerOpen = true;
            if (fabButton) {
                fabButton.element.style.display = 'none';
            }
        }
        else {
            if (!ej2_base_1.Browser.isDevice) {
                if (leftContainer) {
                    leftContainer.style.width = '100%';
                }
                setTimeout(function () {
                    pdfviewer.updateViewerContainer();
                }, 50);
                toolbarObj.refreshOverflow();
            }
            if (rightContainer) {
                rightContainer.style.display = 'none';
            }
            smartRedactContainerOpen = false;
            if (fabButton) {
                fabButton.element.style.display = 'block';
            }
        }
    }
    function checkClickedDiv() {
        if (ej2_base_1.Browser.isDevice && !isFindMobileDevice) {
            if (rightContainer) {
                rightContainer.style.display = 'none';
                smartRedactContainerOpen = false;
            }
        }
    }
    function isMobileDevice() {
        //Check if the device is mobile
        var isMobile = ej2_base_1.Browser.isDevice;
        var sampleContent = document.getElementById('e-pv-smart-redact-container');
        if (isMobile) {
            var sampleContentRect = sampleContent === null || sampleContent === void 0 ? void 0 : sampleContent.getBoundingClientRect();
            var sampleContentMinWidth = 450;
            if (sampleContentRect && ((sampleContentRect.width) > sampleContentMinWidth)) {
                return false;
            }
            else {
                return true;
            }
        }
        isFindMobileDevice = isMobile;
    }
    /* Filter the name from the collection */
    function getNamesByIds(ids, data) {
        return data
            .filter(function (item) { return ids.includes(item.id.toString()); }) // Convert item.id to string for comparison
            .map(function (item) { return item.name; });
    }
    /* Function for the aply rectangle annotation */
    function applyRectangle() {
        pdfviewer.rectangleSettings = {
            author: 'Redaction'
        };
        pdfviewer.annotation.setAnnotationMode('Rectangle');
    }
    var annotationCollection = [];
    /* Function for the redaction cancel button */
    function redactCancel() {
        if (rightContainer) {
            if (rightContainerBlack) {
                rightContainerBlack.style.display = 'block';
            }
            (0, ej2_react_popups_1.showSpinner)(rightContainer);
        }
        for (var i = 0; i < annotationCollection.length; i++) {
            if (annotationCollection[i].subject.includes("Details")) {
                var filteredCollection = pdfviewer.annotationCollection.filter(function (item) { return item.subject === annotationCollection[i].subject; });
                if (filteredCollection[0]) {
                    pdfviewer.annotationModule.deleteAnnotationById(filteredCollection[0].annotationId);
                }
            }
        }
        updateRedactButton();
        selectedTreeObjData = [];
        annotationCollection = [];
        if (rightContainer) {
            if (rightContainerBlack) {
                rightContainerBlack.style.display = 'none';
            }
            (0, ej2_react_popups_1.hideSpinner)(rightContainer);
        }
        if (scanTreeObj && textHeaderPattern) {
            scanTreeObj.style.display = 'block';
            textHeaderPattern.style.display = 'block';
        }
        if (scanBtnObj) {
            scanBtnObj.style.display = 'flex';
        }
        if (selectedTreeObj && textHeaderRedact) {
            selectedTreeObj.style.display = 'none';
            textHeaderRedact.style.display = 'none';
        }
        if (selectedBtnObj) {
            selectedBtnObj.style.display = 'none';
        }
    }
    /* Function for the redaction apply button */
    function redactionApply() {
        if (redactAIBtn.disabled == false) {
            pdfviewer.saveAsBlob().then(function (value) {
                if (rightContainer) {
                    if (rightContainerBlack) {
                        rightContainerBlack.style.display = 'block';
                    }
                    (0, ej2_react_popups_1.showSpinner)(rightContainer);
                }
                var data = value;
                var reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = function (e) {
                    var _a;
                    var base64String = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                    sendRedactionequest(base64String);
                    selectedTreeObjData = [];
                    annotationCollection = [];
                    redactionCount = 0;
                };
            });
        }
    }
    /* Function for the send request for the redaction apply */
    function sendRedactionequest(data) {
        var dictionary = {
            "hashId": data,
        };
        var post = JSON.stringify(dictionary);
        var url = SERVICE_URL + "/AIRedaction";
        var xhr = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var response = xhr.responseText;
                try {
                    if (rightContainer) {
                        if (rightContainerBlack) {
                            rightContainerBlack.style.display = 'none';
                        }
                        (0, ej2_react_popups_1.hideSpinner)(rightContainer);
                    }
                    if (smartRedactContainerOpen) {
                        openSmartReact();
                    }
                    pdfviewer.load(response, 'null');
                    if (scanTreeObj && textHeaderPattern) {
                        scanTreeObj.style.display = 'none';
                        textHeaderPattern.style.display = 'none';
                    }
                    if (scanBtnObj) {
                        scanBtnObj.style.display = 'none';
                    }
                    if (selectedTreeObj && textHeaderRedact) {
                        selectedTreeObj.style.display = 'none';
                        textHeaderRedact.style.display = 'none';
                    }
                    if (selectedBtnObj) {
                        selectedBtnObj.style.display = 'none';
                    }
                    isSelectedCategores = true;
                    IsSelectedOccurences = false;
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
    /* Fucntion for send request for the get details from the document */
    function scanBtnClicked() {
        if (rightContainer) {
            if (rightContainerBlack) {
                rightContainerBlack.style.display = 'block';
            }
            (0, ej2_react_popups_1.showSpinner)(rightContainer);
        }
        var data = pdfviewer.getRootElement();
        var hashId = data.ej2_instances[0].viewerBase.hashId;
        var selectedItems = treeObj.getAllCheckedNodes();
        var names = getNamesByIds(selectedItems, treeObjData);
        var dictionary = {
            "hashId": hashId
        };
        var post = JSON.stringify({
            jsonObject: dictionary,
            selectedItems: names
        });
        var url = SERVICE_URL + "/FindTextinDocument";
        var xhr = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var response = xhr.responseText;
                try {
                    var jsonResponse = JSON.parse(response);
                    var count = 1;
                    var pidNumber = void 0;
                    var obj = {
                        id: "SelectAll", name: "Select All", expanded: true, hasChild: true, isChecked: true
                    };
                    selectedTreeObjData.push(obj);
                    for (var i = 0; i < pdfviewer.viewerBase.pageCount; i++) {
                        if (jsonResponse[i].length != 0) {
                            var obj_1 = {
                                id: "Page".concat(i + 1), name: "Page ".concat(i + 1), pid: 'SelectAll', expanded: true, hasChild: true, isChecked: true
                            };
                            pidNumber = "Page".concat(i + 1);
                            selectedTreeObjData.push(obj_1);
                            for (var j = 0; j < jsonResponse[i].length; j++) {
                                var content = (jsonResponse[i])[j].SensitiveInformation;
                                var obj_2 = {
                                    id: "Details".concat(count), name: "".concat(content), pid: pidNumber
                                };
                                var annotObj = {
                                    width: (jsonResponse[i])[j].Bounds.Width,
                                    height: (jsonResponse[i])[j].Bounds.Height,
                                    x: (jsonResponse[i])[j].Bounds.X,
                                    y: (jsonResponse[i])[j].Bounds.Y,
                                    author: "Redaction",
                                    pageNumber: i + 1,
                                    subject: "Details".concat(count)
                                };
                                pdfviewer.annotation.addAnnotation("Rectangle", {
                                    width: (jsonResponse[i])[j].Bounds.Width,
                                    height: (jsonResponse[i])[j].Bounds.Height,
                                    offset: { x: (jsonResponse[i])[j].Bounds.X, y: (jsonResponse[i])[j].Bounds.Y },
                                    author: "Redaction",
                                    pageNumber: i + 1,
                                    subject: "Details".concat(count)
                                });
                                annotationCollection.push(annotObj);
                                selectedTreeObjData.push(obj_2);
                                count++;
                            }
                        }
                    }
                    selectedTreeViewObj.fields = { dataSource: selectedTreeObjData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
                    selectedTreeViewObj.showCheckBox = true;
                    selectedTreeViewObj.nodeChecked = nodeCheckedChange;
                    selectedTreeViewObj.nodeSelected = nodeSelected;
                    selectedTreeViewObj.dataBind();
                    if (rightContainer) {
                        if (rightContainerBlack) {
                            rightContainerBlack.style.display = 'none';
                        }
                        (0, ej2_react_popups_1.hideSpinner)(rightContainer);
                    }
                    if (scanTreeObj && textHeaderPattern) {
                        scanTreeObj.style.display = 'none';
                        textHeaderPattern.style.display = 'none';
                    }
                    if (scanBtnObj) {
                        scanBtnObj.style.display = 'none';
                    }
                    if (selectedTreeObj && textHeaderRedact) {
                        selectedTreeObj.style.display = 'block';
                        textHeaderRedact.style.display = 'block';
                    }
                    if (selectedBtnObj) {
                        selectedBtnObj.style.display = 'flex';
                    }
                    isSelectedCategores = false;
                    IsSelectedOccurences = true;
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
    /* Function for open the document */
    function openDocument() {
        fileUploadBtn === null || fileUploadBtn === void 0 ? void 0 : fileUploadBtn.click();
    }
    /* Function for separate the page number */
    function separateNumbersAndStrings(input) {
        var numbers = [];
        var regex = /\d+/g;
        var match;
        while ((match = regex.exec(input)) !== null) {
            numbers.push(parseInt(match[0], 10));
        }
        return numbers;
    }
    /* Function for node selected event */
    function nodeSelected(args) {
        if (args.nodeData.parentID) {
            if (args.nodeData.parentID.includes('Page')) {
                var pageNumber = separateNumbersAndStrings(args.nodeData.parentID);
                pdfviewer.navigation.goToPage(pageNumber[0]);
            }
            else {
                var pageNumber = separateNumbersAndStrings(args.nodeData.id);
                pdfviewer.navigation.goToPage(pageNumber[0]);
            }
        }
    }
    /* Function for node check event */
    function nodeCheckedChange(args) {
        if (args.action == "check") {
            for (var i = 0; i < args.data.length; i++) {
                if (args.data[i].id.includes("Details")) {
                    var filteredCollection = annotationCollection.filter(function (item) { return item.subject === args.data[i].id; });
                    if (filteredCollection[0]) {
                        pdfviewer.annotation.addAnnotation("Rectangle", {
                            width: filteredCollection[0].width,
                            height: filteredCollection[0].height,
                            offset: { x: filteredCollection[0].x, y: filteredCollection[0].y },
                            author: "Redaction",
                            pageNumber: filteredCollection[0].pageNumber,
                            subject: filteredCollection[0].subject
                        });
                    }
                }
            }
            updateRedactButton();
        }
        if (args.action == "uncheck") {
            for (var i = 0; i < args.data.length; i++) {
                if (args.data[i].id.includes("Details")) {
                    var filteredCollection = pdfviewer.annotationCollection.filter(function (item) { return item.subject === args.data[i].id; });
                    if (filteredCollection[0]) {
                        pdfviewer.annotationModule.deleteAnnotationById(filteredCollection[0].annotationId);
                    }
                }
            }
            updateRedactButton();
        }
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
    /* Open and close the right container */
    function openSmartReact() {
        if (!smartRedactContainerOpen) {
            if (!ej2_base_1.Browser.isDevice) {
                if (leftContainer) {
                    leftContainer.style.width = '75%';
                }
                pdfviewer.updateViewerContainer();
                toolbarObj.refreshOverflow();
            }
            if (rightContainer) {
                rightContainer.style.display = 'grid';
            }
            if (isSelectedCategores && !IsSelectedOccurences) {
                if (scanTreeObj && textHeaderPattern) {
                    scanTreeObj.style.display = 'block';
                    textHeaderPattern.style.display = 'block';
                }
                if (scanBtnObj) {
                    scanBtnObj.style.display = 'flex';
                }
                if (selectedTreeObj && textHeaderRedact) {
                    selectedTreeObj.style.display = 'none';
                    textHeaderRedact.style.display = 'none';
                }
                if (selectedBtnObj) {
                    selectedBtnObj.style.display = 'none';
                }
            }
            if (!isSelectedCategores && IsSelectedOccurences) {
                if (scanTreeObj && textHeaderPattern) {
                    scanTreeObj.style.display = 'none';
                    textHeaderPattern.style.display = 'none';
                }
                if (scanBtnObj) {
                    scanBtnObj.style.display = 'none';
                }
                if (selectedTreeObj && textHeaderRedact) {
                    selectedTreeObj.style.display = 'block';
                    textHeaderRedact.style.display = 'block';
                }
                if (selectedBtnObj) {
                    selectedBtnObj.style.display = 'flex';
                }
            }
            smartRedactContainerOpen = true;
            if (fabButton) {
                fabButton.element.style.display = 'none';
            }
        }
        else {
            if (!ej2_base_1.Browser.isDevice) {
                if (leftContainer) {
                    leftContainer.style.width = '100%';
                }
                setTimeout(function () {
                    pdfviewer.updateViewerContainer();
                }, 50);
                toolbarObj.refreshOverflow();
            }
            if (rightContainer) {
                rightContainer.style.display = 'none';
            }
            smartRedactContainerOpen = false;
            if (fabButton) {
                fabButton.element.style.display = 'block';
            }
        }
    }
    /* Function for the zoom in the pdfviewer */
    function zoomInClicked() {
        pdfviewer.magnification.zoomIn();
        updateZoomBtn();
    }
    /* Function for the zoom out the pdfviewer */
    function zoomOutClicked() {
        pdfviewer.magnification.zoomOut();
        updateZoomBtn();
    }
    /* Function for enable and disable zoom in adn zoom out button */
    function updateZoomBtn() {
        if (zoomInBtn && zoomOutBtn) {
            if (pdfviewer.magnificationModule.zoomFactor == 4) {
                toolbarObj.enableItems(zoomInBtn, false);
                toolbarObj.enableItems(zoomOutBtn, true);
            }
            else if (pdfviewer.magnificationModule.zoomFactor == 0.25) {
                toolbarObj.enableItems(zoomInBtn, true);
                toolbarObj.enableItems(zoomOutBtn, false);
            }
            else {
                toolbarObj.enableItems(zoomInBtn, true);
                toolbarObj.enableItems(zoomOutBtn, true);
            }
        }
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: "e-pv-smartredact-parent-container" },
            React.createElement("div", { id: "e-pv-smartredact-appbar-container", style: { display: 'none' } },
                React.createElement(ej2_react_navigations_1.AppBarComponent, { id: "e-pv-smartredact-defaultappbar", colorMode: 'Primary' },
                    React.createElement("span", { className: "e-pv-smartredact-regular" }, "Smart Redact"),
                    React.createElement("div", { className: "e-appbar-spacer" }),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "e-pv-smartredact-downloadBtn", ref: function (btn) { return (downloadBtn = btn); }, cssClass: 'e-inherit', iconCss: 'e-icons e-download e-btn-icon e-icon-left', content: 'Download' }))),
            React.createElement("div", { id: "e-pv-smart-redact-container" },
                React.createElement("div", { id: "e-pv-smartredact-left-container" },
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "e-pv-fab-btn", title: "Open AI Assist", ref: function (fab) { return (fabButton = fab); }, onClick: openSmartReact, iconCss: 'e-icons e-assistview-icon', style: { display: 'none' } }),
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "e-pv-smartredact-toolbar", style: { top: '0px' }, ref: function (toolbar) { return (toolbarObj = toolbar); } },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-folder", tooltipText: "Open", text: "Open File", id: "openButton", cssClass: "e-pv-open-container", click: openDocument }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Separator", tooltipText: "separator", align: "Left" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-circle-remove", tooltipText: "Zoom Out", text: "Zoom Out", id: "zoomoutButton", cssClass: "e-pv-zoomout-container", click: zoomOutClicked }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-circle-add", tooltipText: "Zoom In", text: "Zoom In", id: "zoominButton", cssClass: "e-pv-zoomin-container", click: zoomInClicked }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Separator", tooltipText: "separator" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-pv-smartredact-mark-redact", tooltipText: "Mark for Redaction", text: "Mark for Redaction", id: "markforRedaction", cssClass: "e-pv-mark-container", click: applyRectangle }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-icons e-redaction", tooltipText: "Redaction", text: "Redaction", id: "redactButton", cssClass: "e-pv-redact-container", click: redactionApply }))),
                    React.createElement("div", { id: "e-pv-smartredact-pdfviewer-container" },
                        React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { id: "e-pv-smartredact-pdfviewer", style: { height: '100%', width: '100%' }, serviceUrl: SERVICE_URL, ref: function (pdfviewerObj) { return (pdfviewer = pdfviewerObj); }, enableAnnotationToolbar: false, enableToolbar: false, enablePageOrganizer: false, contextMenuSettings: {
                                contextMenuAction: 'RightClick',
                                contextMenuItems: [ej2_react_pdfviewer_1.ContextMenuItem.Delete]
                            }, downloadFileName: "SmartRedaction.pdf", zoomMode: "FitToPage", annotationAdd: annotationAdded, annotationRemove: annotationRemove, documentLoad: documentLoaded, created: sampleCreated },
                            React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] })),
                        React.createElement("input", { type: "file", ref: function (file) { return (fileUploadBtn = file); }, id: "e-pv-smartredact-fileUpload", accept: ".pdf", style: { display: 'block', visibility: 'hidden', width: '0', height: '0' } }))),
                React.createElement("div", { id: "e-pv-smartredact-right-container", style: { display: 'none' }, ref: function (container) { return (rightContainer = container); } },
                    React.createElement("div", { id: "e-pv-right-container-header" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "e-pv-right-container-close-btn", ref: function (btn) { return (rightContainerCloseBtn = btn); }, iconCss: 'e-icons e-close' })),
                    React.createElement("div", { id: "e-pv-smartredact-treeviewText-pattern", style: { display: 'none' }, ref: function (text) { return (textHeaderPattern = text); } }, "Select the following sensitive patterns to get redacted"),
                    React.createElement("div", { id: "e-pv-smartredact-treeviewText-redact", style: { display: 'none' }, ref: function (text) { return (textHeaderRedact = text); } }, "Select the following sensitive information to get redacted"),
                    React.createElement("div", { id: "e-pv-smartredact-treeViewScanObj-container", style: { display: 'none' }, ref: function (tree) { return (scanTreeObj = tree); } },
                        React.createElement("div", { id: "e-pv-smartredact-treeViewScanObj" },
                            React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: "e-pv-smartredact-scantree", ref: function (tree) { return (treeObj = tree); }, fields: { dataSource: treeObjData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' }, showCheckBox: true, nodeChecked: optionsSelect, nodeClicked: optionsClicked }))),
                    React.createElement("div", { id: "e-pv-smartredact-treeViewSelectedObj-container", style: { display: 'none' }, ref: function (tree) { return (selectedTreeObj = tree); } },
                        React.createElement("div", { id: "e-pv-smartredact-treeViewSelectedObj" },
                            React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: "e-pv-smartredact-selectedTree", ref: function (tree) { return (selectedTreeViewObj = tree); } }))),
                    React.createElement("div", { id: "e-pv-right-container-footer-content", style: { display: 'none' }, ref: function (btn) { return (scanBtnObj = btn); } },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "e-pv-smartredact-redactScanBtn", ref: function (btn) { return (scanBtn = btn); }, content: 'Scan', isPrimary: true })),
                    React.createElement("div", { id: "e-pv-right-container-footer-result", style: { display: 'none' }, ref: function (btn) { return (selectedBtnObj = btn); } },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "e-pv-smartredact-redactCancelBtn", content: 'Cancel', ref: function (btn) { return (redactCancelBtnObj = btn); } }),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "e-pv-smartredact-redactApplyBtn", ref: function (btn) { return (redactAIBtn = btn); }, content: 'Redact', isPrimary: true }))),
                React.createElement("div", { id: "e-pv-smartredact-right-container-blackout", style: { display: 'none' }, ref: function (container) { return (rightContainerBlack = container); } })))));
}
exports.default = SmartRedact;
