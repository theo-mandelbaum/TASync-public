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
exports.Content = exports.checkApiTableDataSource = exports.onComponentLoad = exports.renderDescriptions = exports.intialLoadScrollTop = exports.setNavButtonState = exports.showHooks = exports.selectDefaultTab = exports.setIsFinalize = exports.initialize = exports.isFinalize = exports.isRendered = exports.srcTab = exports.sourceTab1 = exports.sourceTab = exports.sampleNameElement = void 0;
var React = require("react");
var all_routes_1 = require("./all-routes");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var index_1 = require("./index");
var samplesJSON = require("./all-routes");
var leftpane_1 = require("./leftpane");
var CodeMirror = require("codemirror");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/jsx/jsx.js");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/css/css.js");
require("codemirror/lib/codemirror.css");
require("codemirror/theme/mbo.css");
var samLength;
// Regex for hidden code removal
var reg = /.*custom code start([\S\s]*?)custom code end.*/g;
var aiControlRegex = /ai-(?!assistview\b)[a-z-]+/;
var hash;
var catRegex = /(-| )/g;
var propRegex = /-3/;
var controlName;
var sampleName;
var sourceTabItems = [];
var fnSourceTabItems = [];
var categoryName;
var apiGrid;
var propBorder = (0, ej2_base_1.createElement)('div', { className: 'sb-property-border' });
exports.sampleNameElement = (0, ej2_base_1.select)('#component-name>.sb-sample-text');
var rightPane = (0, ej2_base_1.select)('.sb-right-pane');
var mobilePropPane = (0, ej2_base_1.select)('.sb-mobile-prop-pane');
var isMobile;
var isFunctional = false;
var hasFunctional = false;
var isHookCode = true;
exports.isRendered = false;
exports.isFinalize = false;
function initialize() {
    exports.isRendered = false;
}
exports.initialize = initialize;
function setIsFinalize() {
    exports.isFinalize = true;
}
exports.setIsFinalize = setIsFinalize;
/**
 * Prevent Tab Swipe Function
 */
function preventTabSwipe(e) {
    if (e.isSwiped) {
        e.cancel = true;
    }
}
/**
 * Default Source Tab Selection
 */
function selectDefaultTab() {
    if (exports.sourceTab) {
        exports.sourceTab.selectedItem = 0;
    }
    if (exports.sourceTab1) {
        exports.sourceTab1.selectedItem = 0;
    }
}
exports.selectDefaultTab = selectDefaultTab;
window.apiList = samplesJSON.apiList;
/**
 * Description Rendering
 */
function renderDescription() {
    var header;
    var description = (0, ej2_base_1.select)('#description', (0, ej2_base_1.select)('#control-content'));
    var descElement = (0, ej2_base_1.select)('.description-section');
    var iDescription = (0, ej2_base_1.select)('#description', descElement);
    if (iDescription) {
        (0, ej2_base_1.detach)(iDescription);
    }
    if (description) {
        descElement.appendChild(description);
    }
}
function changeTab(args) {
    if (args.selectedIndex === 1) {
        exports.srcTab.selectedItem = 0;
        exports.srcTab.items = isFunctional ? fnSourceTabItems : sourceTabItems;
        renderHooks('.sb-source-section', true);
        exports.srcTab.refresh();
        renderHooks('#sb-source-tab > .e-tab-header');
        rendercopycode();
        dynamicTabCreation(exports.srcTab);
    }
    if (args.selectedItem && args.selectedItem.innerText === 'DEMO') {
        var demoSection = document.getElementsByClassName('sb-demo-section')[0];
        if (demoSection) {
            var elementList = demoSection.getElementsByClassName('e-control e-lib');
            for (var i = 0; i < elementList.length; i++) {
                var instance = elementList[i].ej2_instances;
                if (instance && instance[0] && typeof instance[0].refresh === 'function' && !['Rich Text Editor', 'Chat UI', 'AI AssistView'].includes(controlName)) {
                    instance[0].refresh();
                }
                if (instance && instance[0] && instance[0].getModuleName() !== 'DashboardLayout')
                    break;
            }
        }
    }
}
function showHooks(val) {
    hasFunctional = val;
    isFunctional = val ? isHookCode : false;
    exports.isRendered = true;
    document.querySelector(isHookCode ? '#hook' : '#class').checked = true;
    (0, ej2_base_1.select)('#fn-btn').style.display = val ? "" : "none";
}
exports.showHooks = showHooks;
function renderHooks(selector, insert) {
    var target = (0, ej2_base_1.select)(selector);
    var ele = (0, ej2_base_1.select)('#fn-btn');
    if (insert) {
        target.insertBefore(ele, target.children[0]);
    }
    else {
        if (!isMobile) {
            target.appendChild(ele);
            ele.classList.remove("sb-mobile");
        }
        else {
            ele.classList.add("sb-mobile");
        }
    }
}
function onHooksChange() {
    var val = document.querySelector('input[name="hooks"]:checked').value;
    isFunctional = val == "hooks" ? true : false;
    isHookCode = isFunctional;
    var sbTabOverlay = (0, ej2_base_1.select)('.sb-tab-overlay');
    sbTabOverlay.classList.remove('sb-hide');
    exports.srcTab.items = isFunctional ? fnSourceTabItems : sourceTabItems;
    renderHooks('.sb-source-section', true);
    exports.srcTab.dataBind();
    renderHooks('#sb-source-tab > .e-tab-header');
    updatePlunker();
}
function rendercopycode() {
    var ele = (0, ej2_base_1.createElement)('div', { className: 'copy-tooltip', innerHTML: '<div class="e-icons copycode"></div>' });
    document.getElementById('sb-source-tab').appendChild(ele);
    var copiedTooltip = new ej2_react_popups_1.Tooltip({ content: 'Copied to clipboard', position: 'BottomCenter', opensOn: 'Click', closeDelay: 500 }, '.copy-tooltip');
    copiedTooltip.appendTo(ele);
    (0, ej2_base_1.select)('.copycode').addEventListener('click', copyCode);
}
function dynamicTab(e) {
    var blockEle = (0, ej2_base_1.select)('#sb-source-tab > .e-content > #e-content' + this.tabId + '_' + e.selectedIndex);
    var codeEle = blockEle.children[0];
    var sourceFile = exports.srcTab.items[e.selectedIndex];
    codeEle.innerHTML = sourceFile.data;
    codeEle.innerHTML = codeEle.innerHTML.replace(reg, '');
    highlightCode(codeEle, sourceFile.properties.content.split('.')[1]);
    setTimeout(function () {
        var sbTabOverlay = (0, ej2_base_1.select)('.sb-tab-overlay');
        sbTabOverlay.classList.add('sb-hide');
    }, 300);
}
function dynamicTabCreation(obj) {
    var blockEle = obj.element.querySelector('#e-content' + obj.tabId + '_' + obj.selectedItem).children[0];
    var sourceFile = obj.items[obj.selectedItem];
    blockEle.innerHTML = sourceFile.data;
    blockEle.innerHTML = blockEle.innerHTML.replace(reg, '');
    highlightCode(blockEle, sourceFile.properties.content.split('.')[1]);
}
function highlightCode(codeEle, fileType) {
    var types = {
        'tsx': 'text/typescript-jsx',
        'jsx': 'text/jsx',
        'css': 'text/css',
        'js': 'javascript',
        'json': 'application/json'
    };
    var parentEle = codeEle.parentNode;
    if (!parentEle.querySelector('.sb-src-code')) {
        var textELe = document.createElement('textarea');
        textELe.classList.add("sb-src-code");
        textELe.innerHTML = codeEle.innerHTML;
        parentEle.replaceChild(textELe, codeEle);
        CodeMirror.fromTextArea(document.querySelector("#".concat(parentEle.id, " .sb-src-code")), {
            mode: "".concat(types[fileType]),
            readOnly: true,
            theme: "".concat(index_1.selectedTheme.includes('-dark') || index_1.selectedTheme.includes('highcontrast') ? 'mbo' : 'default')
        });
    }
}
function renderActionDescription() {
    var aDescription = (0, ej2_base_1.select)('#action-description', (0, ej2_base_1.select)('#control-content'));
    var aDescElem = (0, ej2_base_1.select)('.sb-action-description');
    if (aDescription) {
        aDescElem.innerHTML = '';
        aDescElem.appendChild(aDescription);
        aDescElem.style.display = '';
    }
    else if (aDescElem) {
        aDescElem.style.display = 'none';
    }
}
function getStringWithOutDescription(code, descRegex) {
    var lines = code.split('\n');
    var desStartLine = null;
    var desEndLine = null;
    var desInsideDivCnt = 0;
    for (var i = 0; i < lines.length; i++) {
        var curLine = lines[i];
        if (desStartLine) {
            if (/<div/g.test(curLine)) {
                desInsideDivCnt = desInsideDivCnt + 1;
            }
            if (desInsideDivCnt && /<\/div>/g.test(curLine)) {
                desInsideDivCnt = desInsideDivCnt - 1;
            }
            else if (!desEndLine && /<\/div>/g.test(curLine)) {
                desEndLine = i + 1;
            }
        }
        if (descRegex.test(curLine)) {
            desStartLine = i;
        }
    }
    if (desEndLine && desStartLine) {
        lines.splice(desStartLine, desEndLine - desStartLine);
    }
    return lines.join('\n');
}
function trimUseEffect(code, regEx) {
    var lines = code.split('\n');
    var startLine = null;
    var endLine = null;
    for (var i = 0; i < lines.length; i++) {
        var curLine = lines[i];
        if (regEx.test(curLine)) {
            startLine = i;
        }
        if (startLine) {
            if (!endLine && /}, \[/g.test(curLine)) {
                endLine = i + 1;
                break;
            }
        }
    }
    if (endLine && startLine) {
        lines.splice(startLine, endLine - startLine);
    }
    return lines.join('\n');
}
/**
 * It trims the imported modules from the user view but they are remains on the source.
 * @param source - Specifies the source code that need to be trimmed.
 * @param curModules - Specifies the module name to be remove.
 * @returns - The remaining line after triming the module.
 */
function trimImportModules(source, curModule) {
    var allLines = source.split('\n');
    var reqLine = null;
    for (var i = 0; i < allLines.length; i++) {
        var line = allLines[i];
        if (line.includes(curModule)) {
            reqLine = i;
            break;
        }
    }
    if (reqLine) {
        allLines.splice(reqLine, 1);
    }
    return allLines.join('\n');
}
function sourceFileList(node) {
    for (var _i = 0, _a = node.curViewDS; _i < _a.length; _i++) {
        var samples = _a[_i];
        if (samples.path == location.hash.split('/').slice(2).join('/')) {
            return samples.sourceFiles;
        }
    }
}
function generatepath(path) {
    var splitPath = path.split('/')[1];
    if ((aiControlRegex).test(path)) {
        path = path.split('/')[0] + '/' + 'ai-' + splitPath;
    }
    var tsx = [{ path: "src/".concat(path, ".tsx"), displayName: "".concat(splitPath, ".tsx") }, { path: "src/".concat(path, ".jsx"), displayName: "".concat(splitPath, ".jsx") }];
    return tsx;
}
function updatePlunker() {
    var path = hash.slice(2).join('/');
    if (!(aiControlRegex).test(path)) {
        var fileName = isFunctional ? 'src/' + path + '-functional-stack.json' : 'src/' + path + '-stack.json';
        var plunk = new ej2_base_1.Ajax(fileName, 'GET', false);
        var promise = plunk.send();
        promise.then(function (result) {
            if ((0, ej2_base_1.select)('#open-plnkr')) {
                (0, ej2_base_1.select)('#open-plnkr').disabled = false;
            }
            plunker(result);
        });
    }
}
function renderSourceTabContent() {
    var path = hash.slice(2).join('/');
    var desktopSettings = (0, ej2_base_1.select)('.sb-desktop-setting');
    if (!ej2_base_1.Browser.isDevice && desktopSettings) {
        desktopSettings.style.display = aiControlRegex.test(path) ? 'none' : '';
    }
    var fnSourcePromise = [];
    var sourcePromise = [];
    var fnObj = [];
    var sObj = [];
    var sampleListFile = (0, ej2_base_1.select)('#controlList').ej2_instances[0];
    var sourceFiles = sourceFileList(sampleListFile) || generatepath(path);
    for (var _i = 0, sourceFiles_1 = sourceFiles; _i < sourceFiles_1.length; _i++) {
        var sourceFile = sourceFiles_1[_i];
        sourcePromise.push((new ej2_base_1.Ajax(sourceFile.path, 'GET', false)).send());
        sObj.push({
            header: { text: sourceFile.displayName },
            data: '',
            content: sourceFile.displayName
        });
    }
    Promise.all(sourcePromise).then(function (results) {
        results.forEach(function (value, index) {
            var sampleContent = value.toString();
            sampleContent = getStringWithOutDescription(sampleContent, /(\'|\")action-description/g);
            sampleContent = getStringWithOutDescription(sampleContent, /(\'|\")description/g);
            sampleContent = sampleContent.replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            sObj[index].data = sampleContent;
        });
        sourceTabItems = sObj;
    });
    if (hasFunctional) {
        for (var _a = 0, sourceFiles_2 = sourceFiles; _a < sourceFiles_2.length; _a++) {
            var sourceFile = sourceFiles_2[_a];
            var sPath = sourceFile.path;
            var pathName = sPath.replace(".tsx", "-functional.tsx").replace(".jsx", "-functional.jsx");
            fnSourcePromise.push((new ej2_base_1.Ajax(pathName, 'GET', false)).send());
            fnObj.push({
                header: { text: sourceFile.displayName },
                data: '',
                content: sourceFile.displayName
            });
        }
        Promise.all(fnSourcePromise).then(function (results) {
            results.forEach(function (value, index) {
                var sampleContent = value.toString();
                sampleContent = getStringWithOutDescription(sampleContent, /(\'|\")action-description/g);
                sampleContent = getStringWithOutDescription(sampleContent, /(\'|\")description/g);
                sampleContent = trimUseEffect(sampleContent, /React.useEffect/g);
                sampleContent = trimUseEffect(sampleContent, /useEffect/g);
                sampleContent = trimImportModules(sampleContent, 'updateSampleSection');
                sampleContent = sampleContent.replace(/&/g, '&amp;')
                    .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                fnObj[index].data = sampleContent;
            });
            fnSourceTabItems = fnObj;
        });
    }
    updatePlunker();
    var openNew = (0, ej2_base_1.select)('#openNew');
    if (openNew) {
        openNew.href = location.href.split('#')[0] + path + '/';
    }
    if (ej2_base_1.Browser.isDevice) {
        if (window.sampleOrder.indexOf(location.hash.split('/').slice(2).join('/')) == -1) {
            var toastObj_1 = new ej2_react_notifications_1.ToastComponent({
                position: {
                    X: 'Right'
                }
            });
            var hideLocation_1 = location.hash.split('/')[2];
            toastObj_1.appendTo('#sb-home');
            setTimeout(function () {
                toastObj_1.show({
                    content: "".concat(hideLocation_1, " component not supported in mobile device")
                });
            }, 200);
            location.hash = "#/material/grid/overview";
        }
    }
}
function renderSampleHeader() {
    /**
     * Sammple Header Name
     */
    var controlElem = (0, ej2_base_1.select)('[control-name="' + hash[2].toLowerCase() + '"]');
    controlName = controlElem ? controlElem.getAttribute('name') : toInitiaUpper(hash[2]);
    exports.sampleNameElement.innerHTML = controlName;
    exports.sampleNameElement.setAttribute('title', controlName);
    /**
     * Bread Crumb
     */
    var curObj = all_routes_1.category[hash[2]][hash[3]];
    categoryName = toInitiaUpper(curObj.category);
    sampleName = curObj.name;
    var categoryFlag = new RegExp(categoryName.replace(catRegex, ''), 'i').test(controlName.replace(catRegex, ''));
    var breadCrumbComponent = document.querySelector('.sb-bread-crumb-text>.category-text');
    var breadCrumSeperator = (0, ej2_base_1.select)('.category-seperator');
    var breadCrumbSubCategory = (0, ej2_base_1.select)('.sb-bread-crumb-text>.component');
    var breadCrumbSample = (0, ej2_base_1.select)('.sb-bread-crumb-text>.crumb-sample');
    breadCrumbComponent.innerHTML = controlName;
    if (!categoryFlag) {
        breadCrumbSubCategory.innerHTML = categoryName;
        breadCrumbSubCategory.style.display = '';
        breadCrumSeperator.style.display = '';
    }
    else {
        breadCrumbSubCategory.style.display = 'none';
        breadCrumSeperator.style.display = 'none';
    }
    breadCrumbSample.innerHTML = sampleName;
    var title = document.querySelector('title');
    title.innerHTML = controlName + ' · ' + sampleName + ' · Syncfusion React UI Components';
}
function toInitiaUpper(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
function plunker(results) {
    var plnkr = JSON.parse(results);
    var prevForm = (0, ej2_base_1.select)('#stack-form');
    if (prevForm) {
        (0, ej2_base_1.detach)(prevForm);
    }
    var form = (0, ej2_base_1.createElement)('form');
    var res = 'https://stackblitz.com/run';
    form.setAttribute('action', res);
    form.setAttribute('method', 'post');
    form.setAttribute('target', '_blank');
    form.id = 'stack-form';
    form.style.display = 'none';
    document.body.appendChild(form);
    var plunks = Object.keys(plnkr);
    for (var x = 0; x < plunks.length; x++) {
        createStackInput((plunks[x] === 'dependencies' ? 'project[dependencies]' : 'project[files][' + plunks[x] + ']'), plnkr[plunks[x]], form);
    }
    createStackInput('project[template]', 'create-react-app', form);
    createStackInput('project[description]', 'Essential JS 2 Sample', form);
    createStackInput('project[settings]', '{"compile":{"clearConsole":true}}', form);
}
function createStackInput(name, value, form) {
    var input = (0, ej2_base_1.createElement)('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('value', value.replace(/{{theme}}/g, index_1.selectedTheme).replace(/{{ripple}}/, (index_1.selectedTheme === 'material') ? 'import { enableRipple } from \'@syncfusion/ej2-base\';\nenableRipple(true);\n' : ''));
    input.setAttribute('name', name);
    form.appendChild(input);
}
function onNextButtonClick() {
    selectDefaultTab();
    hash = location.hash.split('/');
    var currentIndex = window.sampleOrder.indexOf(hash.slice(2).join('/'));
    var nextList = window.sampleOrder[currentIndex + 1];
    if (currentIndex !== -1) {
        (0, index_1.sampleOverlay)();
        location.hash = '#/' + hash[1] + '/' + nextList;
        exports.isRendered = false;
    }
    (0, leftpane_1.setSelectList)();
}
function onPrevButtonClick() {
    selectDefaultTab();
    hash = location.hash.split('/');
    var currentIndex = window.sampleOrder.indexOf(hash.slice(2).join('/'));
    var prevList = window.sampleOrder[currentIndex - 1];
    if (currentIndex !== -1) {
        (0, index_1.sampleOverlay)();
        location.hash = '#/' + hash[1] + '/' + prevList;
        exports.isRendered = false;
    }
    (0, leftpane_1.setSelectList)();
}
/**
 * Sample Navigation
 */
function toggleButtonState(id, state) {
    var ele = document.getElementById(id);
    if (ele) {
        var mobileEle = document.getElementById('mobile-' + id);
        ele.disabled = state;
        mobileEle.disabled = state;
        if (state) {
            mobileEle.classList.add('e-disabled');
            ele.classList.add('e-disabled');
        }
        else {
            mobileEle.classList.remove('e-disabled');
            ele.classList.remove('e-disabled');
        }
    }
}
function setNavButtonState() {
    var curIndex = window.sampleOrder.indexOf(location.hash.split('/').slice(2).join('/'));
    samLength = window.sampleOrder.length - 1;
    if (curIndex === samLength) {
        toggleButtonState('next-sample', true);
    }
    else {
        toggleButtonState('next-sample', false);
    }
    if (curIndex === 0) {
        toggleButtonState('prev-sample', true);
    }
    else {
        toggleButtonState('prev-sample', false);
    }
}
exports.setNavButtonState = setNavButtonState;
/**
 * copy clipboard function
 */
function copyCode() {
    var copyElem = (0, ej2_base_1.select)('#sb-source-tab .e-item.e-active .sb-src-code');
    var textArea = (0, ej2_base_1.createElement)('textArea');
    textArea.textContent = copyElem.textContent.trim();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    (0, ej2_base_1.detach)(textArea);
    (0, ej2_base_1.select)('.copy-tooltip').ej2_instances[0].close();
}
function intialLoadScrollTop() {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    isMobile ? rightPane.scrollTop = 74 : rightPane.scrollTop = 0;
}
exports.intialLoadScrollTop = intialLoadScrollTop;
function renderDescriptions() {
    renderDescription();
    renderActionDescription();
}
exports.renderDescriptions = renderDescriptions;
function onComponentLoad() {
    hash = location.hash.split('/');
    renderSourceTabContent();
    renderSampleHeader();
    selectDefaultTab();
    if ((0, ej2_base_1.select)('.sb-desktop-setting'))
        (0, index_1.processDeviceDependables)();
    var propPanel = (0, ej2_base_1.select)('#control-content .property-section');
    if (propPanel) {
        if (propRegex.test(propPanel.className)) {
            propBorder.classList.add('sb-prop-md-3');
            propBorder.classList.remove('sb-prop-md-4');
        }
        else {
            propBorder.classList.add('sb-prop-md-4');
            propBorder.classList.remove('sb-prop-md-3');
        }
        propBorder.classList.remove('sb-hide');
    }
    else {
        propBorder.classList.add('sb-hide');
    }
    var mobileSetting = (0, ej2_base_1.select)('.sb-mobile-setting');
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile && mobileSetting) {
        if (propPanel) {
            mobileSetting.classList.remove('sb-hide');
        }
        else {
            (0, ej2_base_1.select)('.sb-mobile-setting').classList.add('sb-hide');
        }
    }
}
exports.onComponentLoad = onComponentLoad;
function checkApiTableDataSource() {
    if (!(0, ej2_base_1.select)('#content-tab').ej2_instances) {
        return;
    }
    var hash = location.hash.split('/');
    var data = window.apiList[hash[2] + '/' + hash[3].replace('.html', '')] || [];
    if (!data.length || isMobile) {
        (0, ej2_base_1.select)('#content-tab').ej2_instances[0].hideTab(2);
        apiGrid.dataSource = [];
    }
    else {
        (0, ej2_base_1.select)('#content-tab').ej2_instances[0].hideTab(2, false);
        apiGrid.dataSource = data;
    }
}
exports.checkApiTableDataSource = checkApiTableDataSource;
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    function Content() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Content.prototype.componentDidMount = function () {
        /**
         * Default Sample Redirection
         */
        var sampleOrder = window.sampleOrder;
        var hash = location.hash.split('/').slice(1);
        if (sampleOrder.indexOf(hash.slice(1).join('/')) === -1) {
            var path = void 0;
            for (var _i = 0, sampleOrder_1 = sampleOrder; _i < sampleOrder_1.length; _i++) {
                var sample = sampleOrder_1[_i];
                if (sample.indexOf(hash[1] + '/') !== -1) {
                    path = '/' + hash[0] + '/' + sample;
                    break;
                }
            }
            location.hash = path ? path : '#/tailwind3/grid/overview';
        }
        var radios = document.querySelectorAll('input[name="hooks"]');
        radios.forEach(function (radio) { return radio.addEventListener('change', onHooksChange); });
        (0, ej2_base_1.select)('#mobile-next-sample').addEventListener('click', onNextButtonClick);
        (0, ej2_base_1.select)('#mobile-prev-sample').addEventListener('click', onPrevButtonClick);
        /**
         * Property Panel Border
         */
        (0, ej2_base_1.select)('.sb-sample-content-area').firstChild.appendChild(propBorder);
        /**
         * Navigation Button Click events
         */
    };
    Content.prototype.tabRendered = function () {
        var hsplitter = '<div class="sb-toolbar-splitter sb-custom-item"></div>';
        var openNewTemplate = '<div class="sb-custom-item sb-open-new-wrapper"><a id="openNew" target="_blank" role="tab" aria-label="Open new window">' +
            '<div class="sb-icons sb-icon-Popout"></div></a></div>';
        var sampleNavigation = '<div class="sb-custom-item sample-navigation"><button id="prev-sample" role="tab" aria-label="Navigate to previous sample" class="sb-navigation-prev">' +
            '<span class="sb-icons sb-icon-Previous"></span></button><button  id="next-sample" role="tab" aria-label="Navigate to next sample" class="sb-navigation-next">' +
            '<span class="sb-icons sb-icon-Next"></span></button></div>';
        var plnrTemplate = '<span class="sb-icons sb-icons-plnkr"></span><span class="sb-plnkr-text">Edit in StackBlitz</span>';
        var contentToolbarTemplate = '<div class="sb-desktop-setting"><button id="open-plnkr" role="tab" aria-label="Open Edit in StackBlitz" tabindex="0" class="sb-custom-item sb-plnr-section">' +
            plnrTemplate + '</button>' + hsplitter + openNewTemplate + hsplitter + '</div>' + sampleNavigation +
            '<div class="sb-icons sb-mobile-setting sb-hide"></div>';
        this.tabContentToolbar = (0, ej2_base_1.createElement)('div', { className: 'sb-content-toolbar', innerHTML: contentToolbarTemplate });
        (0, ej2_base_1.select)('#sb-content-header').appendChild(this.tabContentToolbar);
        /**
         * code for copyToolTip
         */
        var openNew = new ej2_react_popups_1.Tooltip({
            content: 'Open in New Window'
        });
        openNew.appendTo('.sb-open-new-wrapper');
        var previous = new ej2_react_popups_1.Tooltip({
            content: 'Previous Sample'
        });
        previous.appendTo('#prev-sample');
        var next = new ej2_react_popups_1.Tooltip({
            content: 'Next Sample'
        });
        (0, ej2_base_1.select)('#right-pane').addEventListener('scroll', function (event) {
            next.close();
            openNew.close();
            previous.close();
        });
        next.appendTo('#next-sample');
        /**
      * plnkr trigger
      */
        (0, ej2_base_1.select)('#open-plnkr').addEventListener('click', function () {
            var plnkrForm = (0, ej2_base_1.select)('#stack-form');
            if (plnkrForm) {
                plnkrForm.submit();
            }
        });
        (0, ej2_base_1.select)('#next-sample').addEventListener('click', onNextButtonClick);
        (0, ej2_base_1.select)('#prev-sample').addEventListener('click', onPrevButtonClick);
        (0, ej2_base_1.select)('.sb-mobile-setting').addEventListener('click', index_1.viewMobilePropPane);
        (0, index_1.processDeviceDependables)();
        setNavButtonState();
        onComponentLoad();
        intialLoadScrollTop();
        (0, index_1.removeOverlay)();
        checkApiTableDataSource();
    };
    Content.prototype.componentDidUpdate = function () {
        /**
         * Sample Control Name change
         */
        exports.sampleNameElement.innerHTML = (0, ej2_base_1.select)('[control-name="' + location.hash.split('/')[2].toLowerCase() + '"]').getAttribute('name');
        renderDescription();
        renderActionDescription();
    };
    Content.prototype.render = function () {
        return (React.createElement(ej2_react_navigations_1.TabComponent, { id: 'content-tab', className: 'sb-content-tab', selecting: preventTabSwipe, selected: changeTab, ref: function (t) { return exports.sourceTab = t; }, created: this.tabRendered },
            React.createElement("div", { id: "sb-content", className: 'sb-content-section' },
                React.createElement("div", { id: 'sb-content-header', className: "e-tab-header sb-content-tab-header" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "sb-icons sb-icon-Demo" }),
                        " ",
                        React.createElement("span", { className: "sb-tab-title" }, " DEMO ")),
                    React.createElement("div", null,
                        React.createElement("span", { className: "sb-icons sb-icon-Code" }),
                        React.createElement("span", { className: "sb-tab-title" }, " SOURCE ")),
                    React.createElement("div", null,
                        React.createElement("span", { className: "sb-icons sb-icon-API" }),
                        React.createElement("span", { className: "sb-tab-title" }, " API "))),
                React.createElement("div", { className: "e-content sb-sample-content-area" },
                    React.createElement("div", null,
                        React.createElement("div", { className: 'sb-demo-section' },
                            React.createElement("div", { className: "control-fluid" },
                                React.createElement("div", { className: "container-fluid" },
                                    React.createElement("div", { id: "control-content" }, all_routes_1.routes))))),
                    React.createElement("div", null,
                        React.createElement("div", { className: 'sb-source-section' },
                            React.createElement("div", { className: "sb-tab-overlay sb-hide" },
                                React.createElement("div", { className: "sb-loading" },
                                    React.createElement("svg", { className: "circular", height: "40", width: "40" },
                                        React.createElement("circle", { className: "path", cx: "25", cy: "25", r: "20", fill: "none", strokeWidth: "6", strokeMiterlimit: "10" })))),
                            React.createElement("div", { id: "fn-btn", className: "e-btn-group" },
                                React.createElement("input", { type: "radio", id: "hook", name: "hooks", value: "hooks" }),
                                React.createElement("label", { className: "e-btn e-outline e-primary", htmlFor: "hook" }, "Hooks"),
                                React.createElement("input", { type: "radio", id: "class", name: "hooks", value: "classes" }),
                                React.createElement("label", { className: "e-btn e-outline e-primary", htmlFor: "class" }, "Classes")),
                            React.createElement(ej2_react_navigations_1.TabComponent, { id: 'sb-source-tab', className: "sb-source-code-section", selected: dynamicTab, ref: function (t) { return exports.srcTab = t; }, selecting: preventTabSwipe }))),
                    React.createElement("div", null,
                        React.createElement(ej2_react_grids_1.GridComponent, { id: 'api-grid', dataSource: [], ref: function (l) { return apiGrid = l; } },
                            React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'name', headerText: 'name', template: '#template', width: '180', textAlign: 'Center' }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'type', headerText: 'Type', width: '180' }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'description', headerText: 'Description', template: '#template-description', width: '200' }))))))));
    };
    return Content;
}(React.Component));
exports.Content = Content;
