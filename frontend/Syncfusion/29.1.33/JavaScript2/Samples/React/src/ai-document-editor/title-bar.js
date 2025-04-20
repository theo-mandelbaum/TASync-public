"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitleBar = void 0;
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_buttons_1 = require("@syncfusion/ej2-buttons");
var ej2_splitbuttons_1 = require("@syncfusion/ej2-splitbuttons");
/**
 * Represents document editor title bar.
 */
var TitleBar = /** @class */ (function () {
    function TitleBar(element, docEditor, isShareNeeded, isRtl, dialogComponent) {
        var _this = this;
        this.initializeTitleBar = function (isShareNeeded) {
            var downloadText;
            var downloadToolTip;
            var printText;
            var printToolTip;
            var closeToolTip = '';
            var openText;
            var documentTileText;
            if (!_this.isRtl) {
                downloadText = 'Download';
                downloadToolTip = 'Download this document.';
                printText = 'Print';
                printToolTip = 'Print this document (Ctrl+P).';
                closeToolTip = 'Close this document';
                openText = 'Open';
                documentTileText = 'Document Name. Click or tap to rename this document.';
            }
            else {
                downloadText = 'تحميل';
                downloadToolTip = 'تحميل هذا المستند';
                printText = 'طباعه';
                printToolTip = 'طباعه هذا المستند (Ctrl + P)';
                openText = 'فتح';
                documentTileText = 'اسم المستند. انقر أو اضغط لأعاده تسميه هذا المستند';
            }
            // tslint:disable-next-line:max-line-length
            _this.documentTitle = (0, ej2_base_1.createElement)('label', { id: 'documenteditor_title_name', styles: 'font-weight:400;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text' });
            var iconCss = 'e-de-padding-right';
            var btnFloatStyle = 'float:right;';
            var titleCss = '';
            if (_this.isRtl) {
                iconCss = 'e-de-padding-right-rtl';
                btnFloatStyle = 'float:left;';
                titleCss = 'float:right;';
            }
            // tslint:disable-next-line:max-line-length
            _this.documentTitleContentEditor = (0, ej2_base_1.createElement)('div', { id: 'documenteditor_title_contentEditor', className: 'single-line', styles: titleCss });
            _this.documentTitleContentEditor.appendChild(_this.documentTitle);
            _this.tileBarDiv.appendChild(_this.documentTitleContentEditor);
            _this.documentTitleContentEditor.setAttribute('title', documentTileText);
            var btnStyles = btnFloatStyle + 'background: transparent;box-shadow:none; font-family: inherit;border-color: transparent;'
                + 'border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;height:28px;font-weight:400;margin-top: 2px;';
            // tslint:disable-next-line:max-line-length
            _this.close = _this.addButton('e-icons e-close e-de-padding-right', "", btnStyles, 'de-close', closeToolTip, false);
            _this.print = _this.addButton('e-de-icon-Print ' + iconCss, printText, btnStyles, 'de-print', printToolTip, false);
            _this.open = _this.addButton('e-de-icon-Open ' + iconCss, openText, btnStyles, 'de-open', openText, false);
            var items = [
                { text: 'Syncfusion Document Text (*.sfdt)', id: 'sfdt' },
                { text: 'Word Document (*.docx)', id: 'word' },
                { text: 'Word Template (*.dotx)', id: 'dotx' },
                { text: 'Plain Text (*.txt)', id: 'txt' }
            ];
            // tslint:disable-next-line:max-line-length
            _this.export = _this.addButton('e-de-icon-Download ' + iconCss, downloadText, btnStyles, 'documenteditor-share', downloadToolTip, true, items);
            if (!isShareNeeded) {
                _this.export.element.style.display = 'none';
            }
            else {
                _this.open.element.style.display = 'none';
            }
            if (_this.dialogComponent == null)
                _this.close.element.style.display = 'none';
        };
        this.wireEvents = function () {
            var _a, _b, _c, _d, _e, _f;
            (_a = _this.print) === null || _a === void 0 ? void 0 : _a.element.addEventListener('click', _this.onPrint);
            (_b = _this.close) === null || _b === void 0 ? void 0 : _b.element.addEventListener('click', _this.onClose);
            (_c = _this.open) === null || _c === void 0 ? void 0 : _c.element.addEventListener('click', function (e) {
                if (e.target.id === 'de-open') {
                    var fileUpload = document.getElementById('uploadfileButton');
                    fileUpload.value = '';
                    fileUpload.click();
                }
            });
            (_d = _this.documentTitleContentEditor) === null || _d === void 0 ? void 0 : _d.addEventListener('keydown', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    if (_this.documentTitleContentEditor) {
                        _this.documentTitleContentEditor.contentEditable = 'false';
                    }
                    if (_this.documentTitleContentEditor && _this.documentTitleContentEditor.textContent === '') {
                        _this.documentTitleContentEditor.textContent = 'Document1';
                    }
                }
            });
            (_e = _this.documentTitleContentEditor) === null || _e === void 0 ? void 0 : _e.addEventListener('blur', function () {
                if (_this.documentTitleContentEditor && _this.documentTitleContentEditor.textContent === '') {
                    _this.documentTitleContentEditor.textContent = 'Document1';
                }
                if (_this.documentTitleContentEditor) {
                    _this.documentTitleContentEditor.contentEditable = 'false';
                }
                if (_this.documentEditor && _this.documentTitle) {
                    _this.documentEditor.documentName = _this.documentTitle.textContent ? _this.documentTitle.textContent : 'Getting Started';
                }
            });
            (_f = _this.documentTitleContentEditor) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function () {
                _this.updateDocumentEditorTitle();
            });
        };
        this.updateDocumentEditorTitle = function () {
            var _a, _b;
            if (_this.documentTitleContentEditor) {
                _this.documentTitleContentEditor.contentEditable = 'true';
            }
            (_a = _this.documentTitleContentEditor) === null || _a === void 0 ? void 0 : _a.focus();
            if (_this.documentTitleContentEditor) {
                (_b = window.getSelection()) === null || _b === void 0 ? void 0 : _b.selectAllChildren(_this.documentTitleContentEditor);
            }
        };
        // Updates document title.
        this.updateDocumentTitle = function () {
            if (_this.documentEditor.documentName === '') {
                _this.documentEditor.documentName = 'Untitled';
            }
            if (_this.documentTitle) {
                _this.documentTitle.textContent = _this.documentEditor.documentName;
            }
        };
        this.onPrint = function () {
            _this.documentEditor.print();
        };
        this.onClose = function () {
            var _a;
            (_a = _this.dialogComponent) === null || _a === void 0 ? void 0 : _a.hide();
        };
        this.onExportClick = function (args) {
            var value = args.item.id ? args.item.id : 'word';
            switch (value) {
                case 'word':
                    _this.save('Docx');
                    break;
                case 'sfdt':
                    _this.save('Sfdt');
                    break;
                case 'txt':
                    _this.save('Txt');
                    break;
                case 'dotx':
                    _this.save('Dotx');
                    break;
            }
        };
        this.save = function (format) {
            // tslint:disable-next-line:max-line-length
            _this.documentEditor.save(_this.documentEditor.documentName === '' ? 'sample' : _this.documentEditor.documentName, format);
        };
        //initializes title bar elements.
        this.tileBarDiv = element;
        this.documentEditor = docEditor;
        this.isRtl = isRtl ? isRtl : false;
        this.dialogComponent = dialogComponent ? dialogComponent : null;
        this.initializeTitleBar(isShareNeeded);
        this.wireEvents();
    }
    TitleBar.prototype.setTooltipForPopup = function () {
        var _a, _b, _c, _d;
        // tslint:disable-next-line:max-line-length
        (_a = document.getElementById('documenteditor-share-popup')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('li')[0].setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
        // tslint:disable-next-line:max-line-length
        (_b = document.getElementById('documenteditor-share-popup')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('li')[1].setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
        // tslint:disable-next-line:max-line-length
        (_c = document.getElementById('documenteditor-share-popup')) === null || _c === void 0 ? void 0 : _c.querySelectorAll('li')[2].setAttribute('title', 'Download a copy of this document to your computer as a DOTX file.');
        // tslint:disable-next-line:max-line-length
        (_d = document.getElementById('documenteditor-share-popup')) === null || _d === void 0 ? void 0 : _d.querySelectorAll('li')[3].setAttribute('title', 'Download a copy of this document to your computer as a TXT file.');
    };
    // tslint:disable-next-line:max-line-length
    TitleBar.prototype.addButton = function (iconClass, btnText, styles, id, tooltipText, isDropDown, items) {
        var _this = this;
        var button = (0, ej2_base_1.createElement)('button', { id: id, styles: styles });
        this.tileBarDiv.appendChild(button);
        button.setAttribute('title', tooltipText);
        if (isDropDown) {
            // tslint:disable-next-line:max-line-length
            var dropButton = new ej2_splitbuttons_1.DropDownButton({ select: this.onExportClick, items: items, iconCss: iconClass, cssClass: 'e-caret-hide', content: btnText, open: function () { _this.setTooltipForPopup(); } }, button);
            return dropButton;
        }
        else {
            var ejButton = new ej2_buttons_1.Button({ iconCss: iconClass, content: btnText }, button);
            return ejButton;
        }
    };
    return TitleBar;
}());
exports.TitleBar = TitleBar;
