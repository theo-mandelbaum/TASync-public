define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-buttons", "@syncfusion/ej2-splitbuttons"], function (require, exports, ej2_base_1, ej2_buttons_1, ej2_splitbuttons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TitleBar = void 0;
    var TitleBar = (function () {
        function TitleBar(element, docEditor, isShareNeeded, isRtl, dialogComponent) {
            var _this = this;
            this.initializeTitleBar = function (isShareNeeded) {
                var downloadText;
                var downloadToolTip;
                var printText;
                var printToolTip;
                var closeToolTip;
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
                _this.documentTitle = (0, ej2_base_1.createElement)('label', { id: 'documenteditor_title_name', styles: 'font-weight:400;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text' });
                var iconCss = 'e-de-padding-right';
                var btnFloatStyle = 'float:right;';
                var titleCss = '';
                if (_this.isRtl) {
                    iconCss = 'e-de-padding-right-rtl';
                    btnFloatStyle = 'float:left;';
                    titleCss = 'float:right;';
                }
                _this.documentTitleContentEditor = (0, ej2_base_1.createElement)('div', { id: 'documenteditor_title_contentEditor', className: 'single-line', styles: titleCss });
                _this.documentTitleContentEditor.appendChild(_this.documentTitle);
                _this.tileBarDiv.appendChild(_this.documentTitleContentEditor);
                _this.documentTitleContentEditor.setAttribute('title', documentTileText);
                var btnStyles = btnFloatStyle + 'background: transparent;box-shadow:none; font-family: inherit;border-color: transparent;'
                    + 'border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;height:28px;font-weight:400;margin-top: 2px;';
                _this.close = _this.addButton('e-icons e-close e-de-padding-right', "", btnStyles, 'de-close', closeToolTip, false);
                _this.print = _this.addButton('e-de-icon-Print ' + iconCss, printText, btnStyles, 'de-print', printToolTip, false);
                _this.open = _this.addButton('e-de-icon-Open ' + iconCss, openText, btnStyles, 'de-open', openText, false);
                var items = [
                    { text: 'Syncfusion® Document Text (*.sfdt)', id: 'sfdt' },
                    { text: 'Word Document (*.docx)', id: 'word' },
                    { text: 'Word Template (*.dotx)', id: 'dotx' },
                    { text: 'Plain Text (*.txt)', id: 'txt' }
                ];
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
                _this.print.element.addEventListener('click', _this.onPrint);
                _this.close.element.addEventListener('click', _this.onClose);
                _this.open.element.addEventListener('click', function (e) {
                    if (e.target.id === 'de-open') {
                        var fileUpload = document.getElementById('uploadfileButton');
                        fileUpload.value = '';
                        fileUpload.click();
                    }
                });
                _this.documentTitleContentEditor.addEventListener('keydown', function (e) {
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        _this.documentTitleContentEditor.contentEditable = 'false';
                        if (_this.documentTitleContentEditor.textContent === '') {
                            _this.documentTitleContentEditor.textContent = 'Document1';
                        }
                    }
                });
                _this.documentTitleContentEditor.addEventListener('blur', function () {
                    if (_this.documentTitleContentEditor.textContent === '') {
                        _this.documentTitleContentEditor.textContent = 'Document1';
                    }
                    _this.documentTitleContentEditor.contentEditable = 'false';
                    _this.documentEditor.documentName = _this.documentTitle.textContent;
                });
                _this.documentTitleContentEditor.addEventListener('click', function () {
                    _this.updateDocumentEditorTitle();
                });
            };
            this.updateDocumentEditorTitle = function () {
                _this.documentTitleContentEditor.contentEditable = 'true';
                _this.documentTitleContentEditor.focus();
                window.getSelection().selectAllChildren(_this.documentTitleContentEditor);
            };
            this.updateDocumentTitle = function () {
                if (_this.documentEditor.documentName === '') {
                    _this.documentEditor.documentName = 'Untitled';
                }
                _this.documentTitle.textContent = _this.documentEditor.documentName;
            };
            this.onPrint = function () {
                _this.documentEditor.print();
            };
            this.onClose = function () {
                _this.dialogComponent.hide();
            };
            this.onExportClick = function (args) {
                var value = args.item.id;
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
                _this.documentEditor.save(_this.documentEditor.documentName === '' ? 'sample' : _this.documentEditor.documentName, format);
            };
            this.tileBarDiv = element;
            this.documentEditor = docEditor;
            this.isRtl = isRtl;
            this.dialogComponent = dialogComponent;
            this.initializeTitleBar(isShareNeeded);
            this.wireEvents();
        }
        TitleBar.prototype.setTooltipForPopup = function () {
            document.getElementById('documenteditor-share-popup').querySelectorAll('li')[0].setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
            document.getElementById('documenteditor-share-popup').querySelectorAll('li')[1].setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
            document.getElementById('documenteditor-share-popup').querySelectorAll('li')[2].setAttribute('title', 'Download a copy of this document to your computer as a DOTX file.');
            document.getElementById('documenteditor-share-popup').querySelectorAll('li')[3].setAttribute('title', 'Download a copy of this document to your computer as a TXT file.');
        };
        TitleBar.prototype.addButton = function (iconClass, btnText, styles, id, tooltipText, isDropDown, items) {
            var _this = this;
            var button = (0, ej2_base_1.createElement)('button', { id: id, styles: styles });
            this.tileBarDiv.appendChild(button);
            button.setAttribute('title', tooltipText);
            if (isDropDown) {
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
});
