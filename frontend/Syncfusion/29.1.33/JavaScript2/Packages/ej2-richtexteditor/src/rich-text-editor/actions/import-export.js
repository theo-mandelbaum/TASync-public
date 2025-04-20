import * as events from '../base/constant';
import { Uploader } from '@syncfusion/ej2-inputs';
/**
 * ImportExport module called when import and export content in RichTextEditor
 */
var ImportExport = /** @class */ (function () {
    function ImportExport(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    ImportExport.prototype.addEventListener = function () {
        this.parent.on(events.onImport, this.onImport, this);
        this.parent.on(events.onExport, this.onExport, this);
        this.parent.on(events.destroy, this.destroy, this);
    };
    ImportExport.prototype.onImport = function () {
        var _this = this;
        var actionBegin = {
            cancel: false,
            requestType: 'Import'
        };
        this.parent.trigger(events.actionBegin, actionBegin, function (actionBeginArgs) {
            if (!actionBeginArgs.cancel) {
                _this.uploaderObj = new Uploader({
                    allowedExtensions: '.doc,.docx,.rtf,.dot,.dotx,.docm,.dotm',
                    asyncSettings: {
                        saveUrl: _this.parent.importWord.serviceUrl
                    },
                    success: function (args) {
                        _this.parent.executeCommand('importWord', args.e.currentTarget.response, { undo: true });
                        _this.parent.trigger(events.actionComplete, { requestType: 'Import' });
                    }
                });
                _this.parent.setProperties({ enableXhtml: true }, true);
                var uploadParentEle = _this.parent.createElement('div', { className: 'e-import-uploadwrap e-droparea' + _this.parent.getCssClass(true) });
                var uploadEle = _this.parent.createElement('input', {
                    id: _this.rteID + '_upload', attrs: { type: 'File', name: 'UploadFiles' }, className: _this.parent.getCssClass()
                });
                uploadParentEle.appendChild(uploadEle);
                _this.uploaderObj.appendTo(uploadEle);
                _this.uploaderObj.element.click();
                _this.uploaderObj.element.closest('.e-upload').style.display = 'none';
            }
        });
    };
    ImportExport.prototype.onExport = function (args) {
        var _this = this;
        var filename;
        var serviceUrl;
        this.parent.setProperties({ enableXhtml: true }, true);
        var rteHtmlData = this.parent.getHtml();
        var html;
        if (args.member === 'ExportWord') {
            filename = this.parent.exportWord.fileName;
            serviceUrl = this.parent.exportWord.serviceUrl;
            html = "<html><head><style>" + this.parent.exportWord.stylesheet + "</style></head><body>" + rteHtmlData + "</body></html>";
        }
        else if (args.member === 'ExportPdf') {
            filename = this.parent.exportPdf.fileName;
            serviceUrl = this.parent.exportPdf.serviceUrl;
            html = "<html><head><style>" + this.parent.exportPdf.stylesheet + "</style></head><body>" + rteHtmlData + "</body></html>";
        }
        var actionBegin = {
            requestType: args.member,
            exportValue: html,
            cancel: false
        };
        this.parent.trigger(events.actionBegin, actionBegin, function (actionBeginArgs) {
            if (!actionBeginArgs.cancel) {
                fetch(serviceUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ html: actionBeginArgs.exportValue })
                })
                    .then(function (response) {
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return response.blob().then(function (blob) { return ({ blob: blob, filename: filename }); });
                })
                    .then(function (_a) {
                    var blob = _a.blob, filename = _a.filename;
                    var url = window.URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                    _this.parent.trigger(events.actionComplete, { requestType: args.member });
                })
                    .catch(function (error) {
                    console.error('Fetch error:', error);
                });
            }
        });
    };
    ImportExport.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.onImport, this.onImport);
        this.parent.off(events.onExport, this.onExport);
        this.parent.off(events.destroy, this.destroy);
        if (this.uploaderObj && !this.uploaderObj.isDestroyed) {
            this.uploaderObj.destroy();
            this.uploaderObj = null;
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    ImportExport.prototype.getModuleName = function () {
        return 'importExport';
    };
    return ImportExport;
}());
export { ImportExport };
