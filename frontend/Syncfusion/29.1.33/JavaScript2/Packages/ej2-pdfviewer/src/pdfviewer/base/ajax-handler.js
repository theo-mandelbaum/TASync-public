import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * @hidden
 */
var AjaxHandler = /** @class */ (function () {
    /**
     * Constructor for Ajax class
     *
     * @param  {PdfViewer} pdfviewer - The pdfviewer.
     * @private
     */
    function AjaxHandler(pdfviewer) {
        /**
         * Specifies the URL to which request to be sent.
         *
         * @default 'POST'
         */
        this.type = 'POST';
        /**
         * A boolean value indicating whether the request should be sent asynchronous or not.
         *
         * @default true
         * @private
         */
        this.mode = true;
        /**
         * Specifies the ContentType to which request to be sent
         *
         * @default null
         * @private
         */
        this.contentType = 'application/json;charset=UTF-8';
        this.retryTimeout = 0;
        this.pdfViewer = pdfviewer;
        this.retryCount = pdfviewer.retryCount;
        this.retryStatusCodes = pdfviewer.retryStatusCodes;
        this.retryTimeout = 1000 * pdfviewer.retryTimeout;
    }
    /**
     * Send the request to server
     *
     * @param  {object} jsonObj - To send to service
     * @returns {void}
     * @private
     */
    AjaxHandler.prototype.send = function (jsonObj) {
        var _this = this;
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.timeout = this.retryTimeout;
        if (!this.mode) {
            setTimeout(function () {
                _this.sendRequest(jsonObj);
            });
        }
        else {
            this.sendRequest(jsonObj);
        }
        this.httpRequest.onreadystatechange = function () {
            var isSkip = false;
            var viewerBase = _this.pdfViewer.viewerBase;
            if (viewerBase && viewerBase.isPasswordAvailable && viewerBase.passwordData === '') {
                isSkip = true;
                _this.retryCount = 0;
            }
            if (_this.retryCount > 0) {
                isSkip = _this.resendRequest(_this, jsonObj, false);
            }
            if (!isSkip) {
                _this.stateChange(_this);
            }
        };
        this.httpRequest.ontimeout = function () {
            var isSkip = false;
            // tslint:disable-next-line
            var viewerBase = _this.pdfViewer.viewerBase;
            if (viewerBase && viewerBase.isPasswordAvailable && viewerBase.passwordData === '') {
                isSkip = true;
                _this.retryCount = 0;
            }
            if (_this.retryCount > 0) {
                isSkip = _this.resendRequest(_this, jsonObj, true);
            }
            if (!isSkip) {
                _this.stateChange(_this);
            }
        };
        this.httpRequest.onerror = function () {
            _this.error(_this);
        };
    };
    /**
     * Clear the http request
     *
     * @returns {void}
     * @private
     */
    AjaxHandler.prototype.clear = function () {
        if (this.httpRequest) {
            this.httpRequest.abort();
        }
        this.onSuccess = null;
        this.onFailure = null;
        this.onError = null;
    };
    AjaxHandler.prototype.resendRequest = function (proxy, jsonObj, isTimeout) {
        var isSkip = false;
        var status = proxy.httpRequest.status;
        var statusString = this.retryStatusCodes.indexOf(status) !== -1;
        if (proxy.httpRequest.readyState === 4 && status === 200) {
            var data = void 0;
            if (this.responseType !== null) {
                data = proxy.httpRequest.response;
            }
            else {
                data = proxy.httpRequest.responseText;
            }
            if (data) {
                if (typeof data !== 'object') {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (error) {
                        if (data === 'Document stream does not exist in the cache' || data === 'Document Reference pointer does not exist in the cache') {
                            isSkip = true;
                        }
                    }
                }
            }
        }
        if (statusString || isSkip || isTimeout) {
            isSkip = true;
            this.retryCount--;
            proxy.pdfViewer.fireAjaxRequestFailed(status, proxy.httpRequest.statusText, jsonObj.action, true);
            proxy.send(jsonObj);
        }
        return isSkip;
    };
    AjaxHandler.prototype.sendRequest = function (jsonObj) {
        this.httpRequest.open(this.type, this.url, this.mode);
        this.httpRequest.withCredentials = this.pdfViewer.ajaxRequestSettings.withCredentials;
        this.httpRequest.setRequestHeader('Content-Type', this.contentType);
        jsonObj = this.addExtraData(jsonObj);
        this.setCustomAjaxHeaders();
        if (this.responseType !== null) {
            this.httpRequest.responseType = this.responseType;
        }
        this.httpRequest.send(JSON.stringify(jsonObj)); // jshint ignore:line
    };
    AjaxHandler.prototype.addExtraData = function (jsonObject) {
        this.pdfViewer.viewerBase.ajaxData = '';
        this.pdfViewer.fireAjaxRequestInitiate(jsonObject);
        if (this.pdfViewer.viewerBase.ajaxData && this.pdfViewer.viewerBase.ajaxData !== '') {
            jsonObject = this.pdfViewer.viewerBase.ajaxData;
        }
        return jsonObject;
    };
    AjaxHandler.prototype.stateChange = function (proxy) {
        var status = proxy.httpRequest.status;
        var statusString = status.toString().split('')[0];
        if (proxy.httpRequest.readyState === 4 && status === 200) {
            var data = void 0;
            if (this.responseType !== null) {
                data = proxy.httpRequest.response;
            }
            else {
                data = proxy.httpRequest.responseText;
            }
            var result = {
                name: 'onSuccess',
                data: data,
                readyState: proxy.httpRequest.readyState,
                status: proxy.httpRequest.status
            };
            proxy.successHandler(result);
        }
        else if (proxy.httpRequest.readyState === 4 && (statusString === '4' || statusString === '5')) { // jshint ignore:line)
            // For handling 4xx and 5xx errors.
            var result = {
                name: 'onFailure',
                status: proxy.httpRequest.status,
                statusText: proxy.httpRequest.statusText
            };
            proxy.failureHandler(result);
        }
    };
    AjaxHandler.prototype.error = function (proxy) {
        var result = {
            name: 'onError',
            status: this.httpRequest.status,
            statusText: this.httpRequest.statusText
        };
        proxy.errorHandler(result);
    };
    AjaxHandler.prototype.successHandler = function (response) {
        if (this.onSuccess) {
            this.onSuccess(response);
        }
        return response;
    };
    AjaxHandler.prototype.failureHandler = function (response) {
        if (this.onFailure) {
            this.onFailure(response);
        }
        return response;
    };
    AjaxHandler.prototype.errorHandler = function (response) {
        if (this.onError) {
            this.onError(response);
        }
        return response;
    };
    AjaxHandler.prototype.setCustomAjaxHeaders = function () {
        if (!isNullOrUndefined(this.pdfViewer.ajaxRequestSettings) && !isNullOrUndefined(this.pdfViewer.ajaxRequestSettings.ajaxHeaders)) {
            for (var i = 0; i < this.pdfViewer.ajaxRequestSettings.ajaxHeaders.length; i++) {
                this.httpRequest.setRequestHeader(this.pdfViewer.ajaxRequestSettings.ajaxHeaders[parseInt(i.toString(), 10)].headerName, this.pdfViewer.ajaxRequestSettings.ajaxHeaders[parseInt(i.toString(), 10)].headerValue);
            }
        }
    };
    return AjaxHandler;
}());
export { AjaxHandler };
