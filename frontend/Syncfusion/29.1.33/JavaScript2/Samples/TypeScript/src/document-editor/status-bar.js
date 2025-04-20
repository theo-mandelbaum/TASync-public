define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-splitbuttons"], function (require, exports, ej2_base_1, ej2_splitbuttons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StatusBar = void 0;
    var StatusBar = (function () {
        function StatusBar(parentElement, docEditor) {
            var _this = this;
            this.startPage = 1;
            this.initializeStatusBar = function () {
                var label = (0, ej2_base_1.createElement)('label', { styles: 'margin-top: 6px;margin-right: 2px' });
                label.textContent = 'Page ';
                _this.statusBarDiv.appendChild(label);
                _this.pageNumberLabel = (0, ej2_base_1.createElement)('label', { id: 'documenteditor_page_no', styles: 'text-transform:capitalize;white-space:pre;overflow:hidden;user-select:none;cursor:text;height:17px;max-width:150px' });
                _this.editablePageNumber = (0, ej2_base_1.createElement)('div', { id: 'editablePageNumber', styles: 'border: 1px solid #F1F1F1;display: inline-flex;height: 17px;padding: 0px 4px;', className: 'single-line e-de-pagenumber-text' });
                _this.editablePageNumber.appendChild(_this.pageNumberLabel);
                _this.updatePageNumber();
                _this.statusBarDiv.appendChild(_this.editablePageNumber);
                _this.editablePageNumber.setAttribute('title', 'The current page number in the document. Click or tap to navigate specific page.');
                var label1 = (0, ej2_base_1.createElement)('label', { styles: 'margin-left:2px;letter-spacing: 1.05px;' });
                label1.textContent = 'of';
                _this.statusBarDiv.appendChild(label1);
                _this.pageCount = (0, ej2_base_1.createElement)('label', { id: 'documenteditor_pagecount', styles: 'margin-left:6px;letter-spacing: 1.05px;' });
                _this.statusBarDiv.appendChild(_this.pageCount);
                _this.updatePageCount();
                var zoomBtn = (0, ej2_base_1.createElement)('button', {
                    id: 'documenteditor-zoom',
                    className: 'e-de-statusbar-zoom'
                });
                _this.statusBarDiv.appendChild(zoomBtn);
                zoomBtn.setAttribute('title', 'Zoom level. Click or tap to open the Zoom options.');
                var items = [
                    {
                        text: '200%',
                    },
                    {
                        text: '175%',
                    },
                    {
                        text: '150%',
                    },
                    {
                        text: '125%',
                    },
                    {
                        text: '100%',
                    },
                    {
                        text: '75%',
                    },
                    {
                        text: '50%',
                    },
                    {
                        text: '25%',
                    },
                    {
                        separator: true
                    },
                    {
                        text: 'Fit one page'
                    },
                    {
                        text: 'Fit page width',
                    },
                ];
                _this.zoom = new ej2_splitbuttons_1.DropDownButton({ content: '100%', items: items, select: _this.onZoom }, zoomBtn);
            };
            this.onZoom = function (args) {
                _this.setZoomValue(args.item.text);
                _this.updateZoomContent();
            };
            this.updateZoomContent = function () {
                _this.zoom.content = Math.round(_this.documentEditor.zoomFactor * 100) + '%';
            };
            this.setZoomValue = function (text) {
                if (text.match('Fit one page')) {
                    _this.documentEditor.fitPage('FitOnePage');
                }
                else if (text.match('Fit page width')) {
                    _this.documentEditor.fitPage('FitPageWidth');
                }
                else {
                    _this.documentEditor.zoomFactor = parseInt(text, 0) / 100;
                }
            };
            this.updatePageCount = function () {
                _this.pageCount.textContent = _this.editorPageCount.toString();
            };
            this.updatePageNumber = function () {
                _this.pageNumberLabel.textContent = _this.startPage.toString();
            };
            this.updatePageNumberOnViewChange = function (args) {
                if (_this.documentEditor.selection
                    && _this.documentEditor.selection.startPage >= args.startPage && _this.documentEditor.selection.startPage <= args.endPage) {
                    _this.startPage = _this.documentEditor.selection.startPage;
                }
                else {
                    _this.startPage = args.startPage;
                }
                _this.updatePageNumber();
            };
            this.wireEvents = function () {
                _this.editablePageNumber.addEventListener('keydown', function (e) {
                    if (e.which === 13) {
                        e.preventDefault();
                        var pageNumber = parseInt(_this.editablePageNumber.textContent, 0);
                        if (pageNumber > _this.editorPageCount) {
                            _this.updatePageNumber();
                        }
                        else {
                            if (_this.documentEditor.selection) {
                                _this.documentEditor.selection.goToPage(parseInt(_this.editablePageNumber.textContent, 0));
                            }
                            else {
                                _this.documentEditor.scrollToPage(parseInt(_this.editablePageNumber.textContent, 0));
                            }
                        }
                        _this.editablePageNumber.contentEditable = 'false';
                        if (_this.editablePageNumber.textContent === '') {
                            _this.updatePageNumber();
                        }
                    }
                    if (e.which > 64) {
                        e.preventDefault();
                    }
                });
                _this.editablePageNumber.addEventListener('blur', function () {
                    if (_this.editablePageNumber.textContent === '' || parseInt(_this.editablePageNumber.textContent, 0) > _this.editorPageCount) {
                        _this.updatePageNumber();
                    }
                    _this.editablePageNumber.contentEditable = 'false';
                });
                _this.editablePageNumber.addEventListener('click', function () {
                    _this.updateDocumentEditorPageNumber();
                });
            };
            this.updateDocumentEditorPageNumber = function () {
                _this.editablePageNumber.contentEditable = 'true';
                _this.editablePageNumber.focus();
                window.getSelection().selectAllChildren(_this.editablePageNumber);
            };
            this.statusBarDiv = parentElement;
            this.documentEditor = docEditor;
            this.initializeStatusBar();
            this.wireEvents();
        }
        Object.defineProperty(StatusBar.prototype, "editorPageCount", {
            get: function () {
                return this.documentEditor.pageCount;
            },
            enumerable: false,
            configurable: true
        });
        return StatusBar;
    }());
    exports.StatusBar = StatusBar;
});
