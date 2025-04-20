var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable valid-jsdoc */
/* eslint-disable security/detect-object-injection */
import { Fetch } from '@syncfusion/ej2-base';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataUtil } from './util';
import { Predicate, Query } from './query';
import { ODataAdaptor, JsonAdaptor, CacheAdaptor, RemoteSaveAdaptor, CustomDataAdaptor } from './adaptors';
/**
 * DataManager is used to manage and manipulate relational data.
 */
var DataManager = /** @class */ (function () {
    /**
     * Constructor for DataManager class
     *
     * @param {DataOptions|JSON[]} dataSource?
     * @param {Query} query?
     * @param {AdaptorOptions|string} adaptor?
     * @param dataSource
     * @param query
     * @param adaptor
     * @hidden
     */
    function DataManager(dataSource, query, adaptor) {
        var _this = this;
        /** @hidden */
        this.dateParse = true;
        /** @hidden */
        this.timeZoneHandling = true;
        this.persistQuery = {};
        this.isInitialLoad = false;
        this.requests = [];
        this.isEnableCache = false;
        this.isInitialLoad = true;
        this.isEnableCache = false;
        if (!dataSource && !this.dataSource) {
            dataSource = [];
        }
        adaptor = adaptor || dataSource.adaptor;
        if (dataSource && dataSource.timeZoneHandling === false) {
            this.timeZoneHandling = dataSource.timeZoneHandling;
        }
        var data;
        if (dataSource instanceof Array) {
            data = {
                json: dataSource,
                offline: true
            };
        }
        else if (typeof dataSource === 'object') {
            if (!dataSource.json) {
                dataSource.json = [];
            }
            if (!dataSource.enablePersistence) {
                dataSource.enablePersistence = false;
            }
            if (!dataSource.id) {
                dataSource.id = '';
            }
            if (!dataSource.ignoreOnPersist) {
                dataSource.ignoreOnPersist = [];
            }
            data = {
                url: dataSource.url,
                insertUrl: dataSource.insertUrl,
                removeUrl: dataSource.removeUrl,
                updateUrl: dataSource.updateUrl,
                crudUrl: dataSource.crudUrl,
                batchUrl: dataSource.batchUrl,
                json: dataSource.json,
                headers: dataSource.headers,
                accept: dataSource.accept,
                data: dataSource.data,
                enableCache: dataSource.enableCache,
                timeTillExpiration: dataSource.timeTillExpiration,
                cachingPageSize: dataSource.cachingPageSize,
                enableCaching: dataSource.enableCaching,
                requestType: dataSource.requestType,
                key: dataSource.key,
                crossDomain: dataSource.crossDomain,
                jsonp: dataSource.jsonp,
                dataType: dataSource.dataType,
                offline: dataSource.offline !== undefined ? dataSource.offline
                    : dataSource.adaptor instanceof RemoteSaveAdaptor || dataSource.adaptor instanceof CustomDataAdaptor ?
                        false : dataSource.url ? false : true,
                requiresFormat: dataSource.requiresFormat,
                enablePersistence: dataSource.enablePersistence,
                id: dataSource.id,
                ignoreOnPersist: dataSource.ignoreOnPersist
            };
        }
        else {
            DataUtil.throwError('DataManager: Invalid arguments');
        }
        if (data.requiresFormat === undefined && !DataUtil.isCors()) {
            data.requiresFormat = isNullOrUndefined(data.crossDomain) ? true : data.crossDomain;
        }
        if (data.dataType === undefined) {
            data.dataType = 'json';
        }
        this.isEnableCache = data.enableCache;
        this.dataSource = data;
        this.defaultQuery = query;
        if (this.dataSource.enablePersistence && this.dataSource.id) {
            window.addEventListener('unload', this.setPersistData.bind(this));
        }
        if (data.url && data.offline && !data.json.length) {
            this.isDataAvailable = false;
            this.adaptor = adaptor || new ODataAdaptor();
            this.dataSource.offline = false;
            this.ready = this.executeQuery(query || new Query());
            this.ready.then(function (e) {
                _this.dataSource.offline = true;
                _this.isDataAvailable = true;
                data.json = e.result;
                _this.adaptor = new JsonAdaptor();
            });
        }
        else {
            this.adaptor = data.offline ? new JsonAdaptor() : new ODataAdaptor();
        }
        if (!data.jsonp && this.adaptor instanceof ODataAdaptor) {
            data.jsonp = 'callback';
        }
        this.adaptor = adaptor || this.adaptor;
        if (this.isEnableCache) {
            this.guidId = DataUtil.getGuid('cacheAdaptor');
            var obj = { keys: [], results: [] };
            window.localStorage.setItem(this.guidId, JSON.stringify(obj));
        }
        if (data.enableCaching) {
            this.adaptor = new CacheAdaptor(this.adaptor, data.timeTillExpiration, data.cachingPageSize);
        }
        return this;
    }
    Object.defineProperty(DataManager.prototype, "moduleName", {
        /** @hidden */
        get: function () { return 'datamanager'; },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * Get the queries maintained in the persisted state.
     * @param {string} id - The identifier of the persisted query to retrieve.
     * @returns {object} The persisted data object.
     */
    DataManager.prototype.getPersistedData = function (id) {
        var persistedData = localStorage.getItem(id || this.dataSource.id);
        return JSON.parse(persistedData);
    };
    /**
    * Set the queries to be maintained in the persisted state.
    * @param {Event} e - The event parameter that triggers the setPersistData method.
    * @param {string} id - The identifier of the persisted query to set.
    * @param {object} persistData - The data to be persisted.
    * @returns {void} .
    */
    DataManager.prototype.setPersistData = function (e, id, persistData) {
        localStorage.setItem(id || this.dataSource.id, JSON.stringify(persistData || this.persistQuery));
    };
    DataManager.prototype.setPersistQuery = function (query) {
        var _this = this;
        var persistedQuery = this.getPersistedData();
        if (this.isInitialLoad && persistedQuery && Object.keys(persistedQuery).length) {
            this.persistQuery = persistedQuery;
            this.persistQuery.queries = this.persistQuery.queries.filter(function (query) {
                if (_this.dataSource.ignoreOnPersist && _this.dataSource.ignoreOnPersist.length) {
                    if (query.fn && _this.dataSource.ignoreOnPersist.some(function (keyword) { return query.fn === keyword; })) {
                        return false; // Exclude the matching query
                    }
                }
                if (query.fn === 'onWhere') {
                    var e = query.e;
                    if (e && e.isComplex && e.predicates instanceof Array) {
                        var allPredicates = e.predicates.map(function (predicateObj) {
                            if (predicateObj.predicates && predicateObj.predicates instanceof Array) {
                                // Process nested predicate array
                                var nestedPredicates = predicateObj.predicates.map(function (nestedPredicate) {
                                    var field = nestedPredicate.field, operator = nestedPredicate.operator, value = nestedPredicate.value, ignoreCase = nestedPredicate.ignoreCase, ignoreAccent = nestedPredicate.ignoreAccent, matchCase = nestedPredicate.matchCase;
                                    return new Predicate(field, operator, value, ignoreCase, ignoreAccent, matchCase);
                                });
                                return predicateObj.condition === 'and' ? Predicate.and(nestedPredicates) : Predicate.or(nestedPredicates);
                            }
                            else {
                                // Process individual predicate
                                var field = predicateObj.field, operator = predicateObj.operator, value = predicateObj.value, ignoreCase = predicateObj.ignoreCase, ignoreAccent = predicateObj.ignoreAccent, matchCase = predicateObj.matchCase;
                                return new Predicate(field, operator, value, ignoreCase, ignoreAccent, matchCase);
                            }
                        });
                        query.e = new Predicate(allPredicates[0], e.condition, allPredicates.slice(1));
                    }
                }
                return true; // Keep all other queries
            });
            var newQuery = extend(new Query(), this.persistQuery);
            this.isInitialLoad = false;
            return (newQuery);
        }
        else {
            this.persistQuery = query;
            this.isInitialLoad = false;
            return query;
        }
    };
    /**
     * Overrides DataManager's default query with given query.
     *
     * @param  {Query} query - Defines the new default query.
     */
    DataManager.prototype.setDefaultQuery = function (query) {
        this.defaultQuery = query;
        return this;
    };
    /**
     * Executes the given query with local data source.
     *
     * @param  {Query} query - Defines the query to retrieve data.
     */
    DataManager.prototype.executeLocal = function (query) {
        if (!this.defaultQuery && !(query instanceof Query)) {
            DataUtil.throwError('DataManager - executeLocal() : A query is required to execute');
        }
        if (!this.dataSource.json) {
            DataUtil.throwError('DataManager - executeLocal() : Json data is required to execute');
        }
        if (this.dataSource.enablePersistence && this.dataSource.id) {
            query = this.setPersistQuery(query);
        }
        query = query || this.defaultQuery;
        var result = this.adaptor.processQuery(this, query);
        if (query.subQuery) {
            var from = query.subQuery.fromTable;
            var lookup = query.subQuery.lookups;
            var res = query.isCountRequired ? result.result :
                result;
            if (lookup && lookup instanceof Array) {
                DataUtil.buildHierarchy(query.subQuery.fKey, from, res, lookup, query.subQuery.key);
            }
            for (var j = 0; j < res.length; j++) {
                if (res[j][from] instanceof Array) {
                    res[j] = extend({}, {}, res[j]);
                    res[j][from] = this.adaptor.processResponse(query.subQuery.using(new DataManager(res[j][from].slice(0))).executeLocal(), this, query);
                }
            }
        }
        return this.adaptor.processResponse(result, this, query);
    };
    /**
     * Executes the given query with either local or remote data source.
     * It will be executed as asynchronously and returns Promise object which will be resolved or rejected after action completed.
     *
     * @param  {Query|Function} query - Defines the query to retrieve data.
     * @param  {Function} done - Defines the callback function and triggers when the Promise is resolved.
     * @param  {Function} fail - Defines the callback function and triggers when the Promise is rejected.
     * @param  {Function} always - Defines the callback function and triggers when the Promise is resolved or rejected.
     */
    DataManager.prototype.executeQuery = function (query, done, fail, always) {
        var _this = this;
        var makeRequest = 'makeRequest';
        if (this.dataSource.enablePersistence && this.dataSource.id) {
            query = this.setPersistQuery(query);
        }
        if (typeof query === 'function') {
            always = fail;
            fail = done;
            done = query;
            query = null;
        }
        if (!query) {
            query = this.defaultQuery;
        }
        if (!(query instanceof Query)) {
            DataUtil.throwError('DataManager - executeQuery() : A query is required to execute');
        }
        var deffered = new Deferred();
        var args = { query: query };
        if (!this.dataSource.offline && (this.dataSource.url !== undefined && this.dataSource.url !== '')
            || (!isNullOrUndefined(this.adaptor[makeRequest])) || this.isCustomDataAdaptor(this.adaptor)) {
            var result = this.isEnableCache ? this.processQuery(query) : this.adaptor.processQuery(this, query);
            if (!isNullOrUndefined(this.adaptor[makeRequest])) {
                this.adaptor[makeRequest](result, deffered, args, query);
            }
            else if (!isNullOrUndefined(result.url) || this.isCustomDataAdaptor(this.adaptor)) {
                this.requests = [];
                this.makeRequest(result, deffered, args, query);
            }
            else {
                args = DataManager.getDeferedArgs(query, result, args);
                deffered.resolve(args);
            }
        }
        else {
            DataManager.nextTick(function () {
                var res = _this.executeLocal(query);
                args = DataManager.getDeferedArgs(query, res, args);
                deffered.resolve(args);
            });
        }
        if (done || fail) {
            deffered.promise.then(done, fail);
        }
        if (always) {
            deffered.promise.then(always, always);
        }
        return deffered.promise;
    };
    DataManager.prototype.getQueryRequest = function (query) {
        var req = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
        req.sorts = Query.filterQueries(query.queries, 'onSortBy');
        req.groups = Query.filterQueries(query.queries, 'onGroup');
        req.filters = Query.filterQueries(query.queries, 'onWhere');
        req.searches = Query.filterQueries(query.queries, 'onSearch');
        req.aggregates = Query.filterQueries(query.queries, 'onAggregates');
        return req;
    };
    DataManager.prototype.generateKey = function (url, query) {
        var queries = this.getQueryRequest(query);
        var singles = Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
        var key = url;
        var page = 'onPage';
        queries.sorts.forEach(function (obj) {
            key += obj.e.direction + obj.e.fieldName;
        });
        queries.groups.forEach(function (obj) {
            key += obj.e.fieldName;
        });
        queries.searches.forEach(function (obj) {
            key += obj.e.searchKey;
        });
        for (var filter = 0; filter < queries.filters.length; filter++) {
            var currentFilter = queries.filters[filter];
            if (currentFilter.e.isComplex) {
                var newQuery = query.clone();
                newQuery.queries = [];
                for (var i = 0; i < currentFilter.e.predicates.length; i++) {
                    newQuery.queries.push({ fn: 'onWhere', e: currentFilter.e.predicates[i], filter: query.queries.filter });
                }
                key += currentFilter.e.condition + this.generateKey(url, newQuery);
            }
            else {
                key += currentFilter.e.field + currentFilter.e.operator + currentFilter.e.value;
            }
        }
        if (!isNullOrUndefined(this.previousCacheQuery) && this.previousCacheQuery !== key) {
            var obj = { keys: [], results: [] };
            window.localStorage.setItem(this.guidId, JSON.stringify(obj));
        }
        this.previousCacheQuery = key;
        if (page in singles) {
            key += singles[page].pageIndex;
        }
        return key;
    };
    DataManager.prototype.processQuery = function (query) {
        var key = this.generateKey(this.dataSource.url, query);
        var cachedItems = JSON.parse(window.localStorage.getItem(this.guidId));
        var data = cachedItems ? cachedItems.results[cachedItems.keys.indexOf(key)] : null;
        if (data != null) {
            return DataUtil.parse.parseJson(data);
        }
        return this.adaptor.processQuery(this, query);
    };
    DataManager.getDeferedArgs = function (query, result, args) {
        if (query.isCountRequired) {
            args.result = result.result;
            args.count = result.count;
            args.aggregates = result.aggregates;
        }
        else {
            args.result = result;
        }
        return args;
    };
    DataManager.nextTick = function (fn) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        // tslint:disable-next-line:no-any
        (window.setImmediate || window.setTimeout)(fn, 0);
        /* eslint-enable @typescript-eslint/no-explicit-any */
    };
    DataManager.prototype.extendRequest = function (url, fnSuccess, fnFail) {
        return extend({}, {
            type: 'GET',
            dataType: this.dataSource.dataType,
            crossDomain: this.dataSource.crossDomain,
            jsonp: this.dataSource.jsonp,
            cache: true,
            processData: false,
            onSuccess: fnSuccess,
            onFailure: fnFail
        }, url);
    };
    // tslint:disable-next-line:max-func-body-length
    DataManager.prototype.makeRequest = function (url, deffered, args, query) {
        var _this = this;
        var isSelector = !!query.subQuerySelector;
        var fnFail = function (e) {
            args.error = e;
            deffered.reject(args);
        };
        var process = function (data, count, xhr, request, actual, aggregates, virtualSelectRecords) {
            args.xhr = xhr;
            args.count = count ? parseInt(count.toString(), 10) : 0;
            args.result = data;
            args.request = request;
            args.aggregates = aggregates;
            args.actual = actual;
            args.virtualSelectRecords = virtualSelectRecords;
            deffered.resolve(args);
        };
        var fnQueryChild = function (data, selector) {
            var subDeffer = new Deferred();
            var childArgs = { parent: args };
            query.subQuery.isChild = true;
            var subUrl = _this.adaptor.processQuery(_this, query.subQuery, data ? _this.adaptor.processResponse(data) : selector);
            var childReq = _this.makeRequest(subUrl, subDeffer, childArgs, query.subQuery);
            if (!isSelector) {
                subDeffer.then(function (subData) {
                    if (data) {
                        DataUtil.buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, data, subData, query.subQuery.key);
                        process(data, subData.count, subData.xhr);
                    }
                }, fnFail);
            }
            return childReq;
        };
        var fnSuccess = function (data, request) {
            if (_this.isGraphQLAdaptor(_this.adaptor)) {
                // tslint:disable-next-line:no-string-literal
                if (!isNullOrUndefined(data['errors'])) {
                    // tslint:disable-next-line:no-string-literal
                    return fnFail(data['errors'], request);
                }
            }
            if (_this.isCustomDataAdaptor(_this.adaptor)) {
                request = extend({}, _this.fetchReqOption, request);
            }
            if (request.contentType.indexOf('xml') === -1 && _this.dateParse && !_this.isEnableCache) {
                data = DataUtil.parse.parseJson(data);
            }
            var result;
            var promise = _this.afterReponseRequest(data);
            promise.then(function (data) {
                result = _this.adaptor.processResponse(data, _this, query, request.fetchRequest, request);
                if (_this.isEnableCache) {
                    /* eslint-enable prefer-spread */
                    var key = query ? _this.generateKey(_this.dataSource.url, query) : _this.dataSource.url;
                    var obj = {};
                    obj = JSON.parse(window.localStorage.getItem(_this.guidId));
                    var index = obj.keys.indexOf(key);
                    if (index !== -1) {
                        obj.results.splice(index, 1);
                        obj.keys.splice(index, 1);
                    }
                    obj.results[obj.keys.push(key) - 1] = { keys: key, result: result.result, timeStamp: new Date(), count: result.count };
                    window.localStorage.setItem(_this.guidId, JSON.stringify(obj));
                }
                if (request.contentType.indexOf('xml') === -1 && _this.dateParse && _this.isEnableCache) {
                    result = DataUtil.parse.parseJson(result);
                }
                var count = 0;
                var aggregates = null;
                var virtualSelectRecords = 'virtualSelectRecords';
                var virtualRecords = data[virtualSelectRecords];
                if (query.isCountRequired) {
                    count = result.count;
                    aggregates = result.aggregates;
                    result = result.result;
                }
                if (!query.subQuery) {
                    process(result, count, request.fetchRequest, request.type, data, aggregates, virtualRecords);
                    return;
                }
                if (!isSelector) {
                    fnQueryChild(result, request);
                }
                ;
            }).catch(function (error) { return fnFail(error, request); });
        };
        var req = this.extendRequest(url, fnSuccess, fnFail);
        if (!this.isCustomDataAdaptor(this.adaptor)) {
            var promise = this.useMiddleware(req);
            var fetch_1;
            promise.then(function (response) {
                fetch_1 = new Fetch(req);
                fetch_1.beforeSend = function () {
                    _this.beforeSend(fetch_1.fetchRequest, fetch_1, response);
                };
                req = fetch_1.send();
                req.catch(function (e) { return true; });
                _this.requests.push(fetch_1);
            });
        }
        else {
            this.fetchReqOption = req;
            var request = req;
            this.adaptor.options.getData({
                data: request.data,
                onSuccess: request.onSuccess, onFailure: request.onFailure
            });
        }
        if (isSelector) {
            var promise = void 0;
            var res = query.subQuerySelector.call(this, { query: query.subQuery, parent: query });
            if (res && res.length) {
                promise = Promise.all([req, fnQueryChild(null, res)]);
                promise.then(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var result = args[0];
                    var pResult = _this.adaptor.processResponse(result[0], _this, query, _this.requests[0].fetchRequest, _this.requests[0]);
                    var count = 0;
                    if (query.isCountRequired) {
                        count = pResult.count;
                        pResult = pResult.result;
                    }
                    var cResult = _this.adaptor.processResponse(result[1], _this, query.subQuery, _this.requests[1].fetchRequest, _this.requests[1]);
                    count = 0;
                    if (query.subQuery.isCountRequired) {
                        count = cResult.count;
                        cResult = cResult.result;
                    }
                    DataUtil.buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, pResult, cResult, query.subQuery.key);
                    isSelector = false;
                    process(pResult, count, _this.requests[0].fetchRequest);
                });
            }
            else {
                isSelector = false;
            }
        }
        return req;
    };
    DataManager.prototype.afterReponseRequest = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var reponse, deffered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.applyPostRequestMiddlewares(data)];
                    case 1:
                        reponse = _a.sent();
                        deffered = new Deferred();
                        deffered.resolve(reponse);
                        return [2 /*return*/, deffered.promise];
                }
            });
        });
    };
    /**
     * Processes the middleware stack after receiving the response.
     * @param {Response} response - The response object.
     * @returns {Response} - The potentially modified response.
     */
    DataManager.prototype.applyPostRequestMiddlewares = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, response];
            });
        });
    };
    /**
     * Registers a new middleware in the DataManager.
     * @param {Middleware} middleware - The middleware instance to register.
     * @returns {void}
     */
    DataManager.prototype.useMiddleware = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var reponse, deffered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.applyPreRequestMiddlewares(request)];
                    case 1:
                        reponse = _a.sent();
                        deffered = new Deferred();
                        deffered.resolve(reponse);
                        return [2 /*return*/, deffered.promise];
                }
            });
        });
    };
    /**
     * Processes the middleware stack before sending the request.
     * @param {Request} request - The request object.
     * @returns {Request} - The potentially modified request.
     */
    DataManager.prototype.applyPreRequestMiddlewares = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request];
            });
        });
    };
    DataManager.prototype.beforeSend = function (request, settings, response) {
        this.adaptor.beforeSend(this, request, settings);
        var headers = [];
        if (this.dataSource.headers) {
            headers.push(this.dataSource.headers);
        }
        var props;
        if (response && response.headers) {
            headers.concat(response.headers);
        }
        for (var i = 0; headers && i < headers.length; i++) {
            props = [];
            var keys = Object.keys(headers[i]);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var prop = keys_1[_i];
                props.push(prop);
                request.headers.set(prop, headers[i][prop]);
            }
        }
    };
    /**
     * Save bulk changes to the given table name.
     * User can add a new record, edit an existing record, and delete a record at the same time.
     * If the datasource from remote, then updated in a single post.
     *
     * @param {Object} changes - Defines the CrudOptions.
     * @param {string} key - Defines the column field.
     * @param {string|Query} tableName - Defines the table name.
     * @param {Query} query - Sets default query for the DataManager.
     * @param original
     */
    DataManager.prototype.saveChanges = function (changes, key, tableName, query, original) {
        var _this = this;
        if (tableName instanceof Query) {
            query = tableName;
            tableName = null;
        }
        var args = {
            url: tableName,
            key: key || this.dataSource.key
        };
        var req = this.adaptor.batchRequest(this, changes, args, query || new Query(), original);
        var dofetchRequest = 'dofetchRequest';
        if (this.dataSource.offline) {
            return req;
        }
        if (!isNullOrUndefined(this.adaptor[dofetchRequest])) {
            return this.adaptor[dofetchRequest](req);
        }
        else if (!this.isCustomDataAdaptor(this.adaptor)) {
            var deff_1 = new Deferred();
            var fetch_2 = new Fetch(req);
            fetch_2.beforeSend = function () {
                _this.beforeSend(fetch_2.fetchRequest, fetch_2);
            };
            fetch_2.onSuccess = function (data, request) {
                if (_this.isGraphQLAdaptor(_this.adaptor)) {
                    // tslint:disable-next-line:no-string-literal
                    if (!isNullOrUndefined(data['errors'])) {
                        // tslint:disable-next-line:no-string-literal
                        fetch_2.onFailure(JSON.stringify(data['errors']));
                    }
                }
                deff_1.resolve(_this.adaptor.processResponse(data, _this, null, request.fetchRequest, request, changes, args));
            };
            fetch_2.onFailure = function (e) {
                deff_1.reject([{ error: e }]);
            };
            fetch_2.send().catch(function (e) { return true; }); // to handle the failure requests.
            return deff_1.promise;
        }
        else {
            return this.dofetchRequest(req, this.adaptor.options.batchUpdate, changes);
        }
    };
    /**
     * Inserts new record in the given table.
     *
     * @param {Object} data - Defines the data to insert.
     * @param {string|Query} tableName - Defines the table name.
     * @param {Query} query - Sets default query for the DataManager.
     * @param position
     */
    DataManager.prototype.insert = function (data, tableName, query, position) {
        if (tableName instanceof Query) {
            query = tableName;
            tableName = null;
        }
        var req = this.adaptor.insert(this, data, tableName, query, position);
        var dofetchRequest = 'dofetchRequest';
        if (this.dataSource.offline) {
            return req;
        }
        if (!isNullOrUndefined(this.adaptor[dofetchRequest])) {
            return this.adaptor[dofetchRequest](req);
        }
        else {
            return this.dofetchRequest(req, this.adaptor.options.addRecord);
        }
    };
    /**
     * Removes data from the table with the given key.
     *
     * @param  {string} keyField - Defines the column field.
     * @param  {Object} value - Defines the value to find the data in the specified column.
     * @param  {string|Query} tableName - Defines the table name
     * @param  {Query} query - Sets default query for the DataManager.
     */
    DataManager.prototype.remove = function (keyField, value, tableName, query) {
        if (typeof value === 'object') {
            value = DataUtil.getObject(keyField, value);
        }
        if (tableName instanceof Query) {
            query = tableName;
            tableName = null;
        }
        var res = this.adaptor.remove(this, keyField, value, tableName, query);
        var dofetchRequest = 'dofetchRequest';
        if (this.dataSource.offline) {
            return res;
        }
        if (!isNullOrUndefined(this.adaptor[dofetchRequest])) {
            return this.adaptor[dofetchRequest](res);
        }
        else {
            var remove = this.adaptor.options.deleteRecord;
            return this.dofetchRequest(res, remove);
        }
    };
    /**
     * Updates existing record in the given table.
     *
     * @param {string} keyField - Defines the column field.
     * @param {Object} value - Defines the value to find the data in the specified column.
     * @param {string|Query} tableName - Defines the table name
     * @param {Query} query - Sets default query for the DataManager.
     * @param original
     */
    DataManager.prototype.update = function (keyField, value, tableName, query, original) {
        if (tableName instanceof Query) {
            query = tableName;
            tableName = null;
        }
        if (this.isEnableCache) {
            this.cacheQuery = this.generateKey(this.dataSource.url, query);
        }
        var res = this.adaptor.update(this, keyField, value, tableName, query, original);
        var dofetchRequest = 'dofetchRequest';
        if (this.dataSource.offline) {
            return res;
        }
        if (!isNullOrUndefined(this.adaptor[dofetchRequest])) {
            return this.adaptor[dofetchRequest](res);
        }
        else {
            var update = this.adaptor.options.updateRecord;
            return this.dofetchRequest(res, update);
        }
    };
    DataManager.prototype.isCustomDataAdaptor = function (dataSource) {
        return this.adaptor.getModuleName &&
            this.adaptor.getModuleName() === 'CustomDataAdaptor';
    };
    DataManager.prototype.isGraphQLAdaptor = function (dataSource) {
        return this.adaptor.getModuleName &&
            this.adaptor.getModuleName() === 'GraphQLAdaptor';
    };
    DataManager.prototype.successFunc = function (record, request, changes) {
        if (this.isGraphQLAdaptor(this.adaptor)) {
            var data = typeof record === 'object' ? record : JSON.parse(record);
            // tslint:disable-next-line:no-string-literal
            if (!isNullOrUndefined(data['errors'])) {
                // tslint:disable-next-line:no-string-literal
                this.failureFunc(JSON.stringify(data['errors']));
            }
        }
        if (this.isCustomDataAdaptor(this.adaptor)) {
            request = extend({}, this.fetchReqOption, request);
        }
        try {
            DataUtil.parse.parseJson(record);
        }
        catch (e) {
            record = [];
        }
        if (this.isEnableCache) {
            var requests = JSON.parse(request.data);
            if (requests.action === 'insert' || requests.action === 'remove') {
                var obj = { keys: [], results: [] };
                window.localStorage.setItem(this.guidId, JSON.stringify(obj));
            }
            else if (requests.action === 'update') {
                var cachedItems = JSON.parse(window.localStorage.getItem(this.guidId));
                var data = cachedItems ? cachedItems.results[cachedItems.keys.indexOf(this.cacheQuery)] : null;
                if (data && data.result) {
                    var cacheData = data.result;
                    for (var i = 0; i < cacheData.length; i++) {
                        if (cacheData[i][requests.keyColumn] === requests.key) {
                            cacheData[i] = requests.value;
                            window.localStorage.setItem(this.guidId, JSON.stringify(cachedItems));
                            break;
                        }
                    }
                }
            }
        }
        record = this.adaptor.processResponse(DataUtil.parse.parseJson(record), this, null, request.fetchRequest, request, changes);
        this.fetchDeffered.resolve(record);
    };
    DataManager.prototype.failureFunc = function (e) {
        if (this.isEnableCache) {
            this.cacheQuery = '';
        }
        this.fetchDeffered.reject([{ error: e }]);
    };
    DataManager.prototype.dofetchRequest = function (res, fetchFunc, changes) {
        var _this = this;
        res = extend({}, {
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            processData: false
        }, res);
        this.fetchDeffered = new Deferred();
        if (!this.isCustomDataAdaptor(this.adaptor)) {
            var fetch_3 = new Fetch(res);
            fetch_3.beforeSend = function () {
                _this.beforeSend(fetch_3.fetchRequest, fetch_3);
            };
            fetch_3.onSuccess = this.successFunc.bind(this);
            fetch_3.onFailure = this.failureFunc.bind(this);
            fetch_3.send().catch(function (e) { return true; }); // to handle the failure requests.
        }
        else {
            this.fetchReqOption = res;
            fetchFunc.call(this, {
                data: res.data, onSuccess: this.successFunc.bind(this),
                onFailure: this.failureFunc.bind(this),
                changes: changes
            });
        }
        return this.fetchDeffered.promise;
    };
    DataManager.prototype.clearPersistence = function () {
        window.removeEventListener('unload', this.setPersistData.bind(this));
        this.dataSource.enablePersistence = false;
        this.persistQuery = {};
        window.localStorage.setItem(this.dataSource.id, '[]');
    };
    return DataManager;
}());
export { DataManager };
/**
 * Deferred is used to handle asynchronous operation.
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        /**
         * Promise is an object that represents a value that may not be available yet, but will be resolved at some point in the future.
         */
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
        /**
         * Defines the callback function triggers when the Deferred object is resolved.
         */
        this.then = this.promise.then.bind(this.promise);
        /**
         * Defines the callback function triggers when the Deferred object is rejected.
         */
        this.catch = this.promise.catch.bind(this.promise);
    }
    return Deferred;
}());
export { Deferred };
