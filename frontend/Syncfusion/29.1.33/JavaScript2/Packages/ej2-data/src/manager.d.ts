import { Fetch } from '@syncfusion/ej2-base';
import { Aggregates } from './util';
import { Query } from './query';
import { Requests } from './adaptors';
/**
 * DataManager is used to manage and manipulate relational data.
 */
export declare class DataManager {
    /** @hidden */
    adaptor: AdaptorOptions;
    /** @hidden */
    defaultQuery: Query;
    /** @hidden */
    dataSource: DataOptions;
    /** @hidden */
    dateParse: boolean;
    /** @hidden */
    timeZoneHandling: boolean;
    /** @hidden */
    ready: Promise<Response>;
    /** @hidden */
    readonly moduleName: string;
    private isDataAvailable;
    private persistQuery;
    private isInitialLoad;
    private requests;
    private fetchDeffered;
    private fetchReqOption;
    private guidId;
    private previousCacheQuery;
    private isEnableCache;
    private cacheQuery;
    /** @hidden */
    currentViewData: ReturnOption;
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
    constructor(dataSource?: DataOptions | JSON[] | Object[], query?: Query, adaptor?: AdaptorOptions | string);
    /**
     * Get the queries maintained in the persisted state.
     * @param {string} id - The identifier of the persisted query to retrieve.
     * @returns {object} The persisted data object.
     */
    getPersistedData(id?: string): object;
    /**
    * Set the queries to be maintained in the persisted state.
    * @param {Event} e - The event parameter that triggers the setPersistData method.
    * @param {string} id - The identifier of the persisted query to set.
    * @param {object} persistData - The data to be persisted.
    * @returns {void} .
    */
    setPersistData(e: Event, id?: string, persistData?: object): void;
    private setPersistQuery;
    /**
     * Overrides DataManager's default query with given query.
     *
     * @param  {Query} query - Defines the new default query.
     */
    setDefaultQuery(query: Query): DataManager;
    /**
     * Executes the given query with local data source.
     *
     * @param  {Query} query - Defines the query to retrieve data.
     */
    executeLocal(query?: Query): Object[];
    /**
     * Executes the given query with either local or remote data source.
     * It will be executed as asynchronously and returns Promise object which will be resolved or rejected after action completed.
     *
     * @param  {Query|Function} query - Defines the query to retrieve data.
     * @param  {Function} done - Defines the callback function and triggers when the Promise is resolved.
     * @param  {Function} fail - Defines the callback function and triggers when the Promise is rejected.
     * @param  {Function} always - Defines the callback function and triggers when the Promise is resolved or rejected.
     */
    executeQuery(query: Query | Function, done?: Function, fail?: Function, always?: Function): Promise<Response>;
    protected getQueryRequest(query: Query): Requests;
    private generateKey;
    private processQuery;
    private static getDeferedArgs;
    private static nextTick;
    private extendRequest;
    private makeRequest;
    private afterReponseRequest;
    /**
     * Processes the middleware stack after receiving the response.
     * @param {Response} response - The response object.
     * @returns {Response} - The potentially modified response.
     */
    applyPostRequestMiddlewares(response: string | Object): Promise<Object>;
    /**
     * Registers a new middleware in the DataManager.
     * @param {Middleware} middleware - The middleware instance to register.
     * @returns {void}
     */
    useMiddleware(request: Object): Promise<Object>;
    /**
     * Processes the middleware stack before sending the request.
     * @param {Request} request - The request object.
     * @returns {Request} - The potentially modified request.
     */
    applyPreRequestMiddlewares(request: Object): Promise<Object>;
    private beforeSend;
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
    saveChanges(changes: Object, key?: string, tableName?: string | Query, query?: Query, original?: Object): Promise<Object> | Object;
    /**
     * Inserts new record in the given table.
     *
     * @param {Object} data - Defines the data to insert.
     * @param {string|Query} tableName - Defines the table name.
     * @param {Query} query - Sets default query for the DataManager.
     * @param position
     */
    insert(data: Object, tableName?: string | Query, query?: Query, position?: number): Object | Promise<Object>;
    /**
     * Removes data from the table with the given key.
     *
     * @param  {string} keyField - Defines the column field.
     * @param  {Object} value - Defines the value to find the data in the specified column.
     * @param  {string|Query} tableName - Defines the table name
     * @param  {Query} query - Sets default query for the DataManager.
     */
    remove(keyField: string, value: Object, tableName?: string | Query, query?: Query): Object | Promise<Object>;
    /**
     * Updates existing record in the given table.
     *
     * @param {string} keyField - Defines the column field.
     * @param {Object} value - Defines the value to find the data in the specified column.
     * @param {string|Query} tableName - Defines the table name
     * @param {Query} query - Sets default query for the DataManager.
     * @param original
     */
    update(keyField: string, value: Object, tableName?: string | Query, query?: Query, original?: Object): Object | Promise<Object>;
    private isCustomDataAdaptor;
    private isGraphQLAdaptor;
    private successFunc;
    private failureFunc;
    private dofetchRequest;
    clearPersistence(): void;
}
/**
 * Deferred is used to handle asynchronous operation.
 */
export declare class Deferred {
    /**
     * Resolve a Deferred object and call doneCallbacks with the given args.
     */
    resolve: Function;
    /**
     * Reject a Deferred object and call failCallbacks with the given args.
     */
    reject: Function;
    /**
     * Promise is an object that represents a value that may not be available yet, but will be resolved at some point in the future.
     */
    promise: Promise<Object>;
    /**
     * Defines the callback function triggers when the Deferred object is resolved.
     */
    then: Function;
    /**
     * Defines the callback function triggers when the Deferred object is rejected.
     */
    catch: Function;
}
/**
 * @hidden
 */
export interface DataOptions {
    url?: string;
    adaptor?: AdaptorOptions;
    insertUrl?: string;
    removeUrl?: string;
    updateUrl?: string;
    crudUrl?: string;
    batchUrl?: string;
    json?: Object[];
    headers?: Object[];
    accept?: boolean;
    data?: JSON;
    enableCache?: boolean;
    timeTillExpiration?: number;
    cachingPageSize?: number;
    enableCaching?: boolean;
    requestType?: string;
    key?: string;
    crossDomain?: boolean;
    jsonp?: string;
    dataType?: string;
    offline?: boolean;
    requiresFormat?: boolean;
    timeZoneHandling?: boolean;
    id?: string;
    enablePersistence?: boolean;
    ignoreOnPersist?: string[];
}
/**
 * @hidden
 */
export interface ReturnOption {
    result?: ReturnOption;
    count?: number;
    url?: string;
    aggregates?: Aggregates;
}
/**
 * @hidden
 */
export interface FetchOption {
    onSuccess?: Function;
    onFailure?: Function;
    data?: string;
}
/**
 * @hidden
 */
export interface RequestOptions {
    xhr?: Request;
    count?: number;
    result?: ReturnOption;
    request?: Fetch;
    aggregates?: Aggregates;
    actual?: Object;
    virtualSelectRecords?: Object;
    error?: string;
}
/**
 * @hidden
 */
export interface AdaptorOptions {
    processQuery?: Function;
    processResponse?: Function;
    beforeSend?: Function;
    batchRequest?: Function;
    insert?: Function;
    remove?: Function;
    update?: Function;
    key?: string;
}
