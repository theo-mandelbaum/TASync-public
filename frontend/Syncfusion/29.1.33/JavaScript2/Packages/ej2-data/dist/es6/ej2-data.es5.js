import { isNullOrUndefined, getValue, merge, extend, setValue, Fetch } from '@syncfusion/ej2-base';

/* eslint-disable valid-jsdoc */
/**
 * Query class is used to build query which is used by the DataManager to communicate with datasource.
 */
var Query = /** @class */ (function () {
    /**
     * Constructor for Query class.
     *
     * @param {string|string[]} from?
     * @param from
     * @hidden
     */
    function Query(from) {
        /** @hidden */
        this.subQuery = null;
        /** @hidden */
        this.isChild = false;
        /** @hidden */
        this.distincts = [];
        this.queries = [];
        this.key = '';
        this.fKey = '';
        if (typeof from === 'string') {
            this.fromTable = from;
        }
        else if (from && from instanceof Array) {
            this.lookups = from;
        }
        this.expands = [];
        this.sortedColumns = [];
        this.groupedColumns = [];
        this.subQuery = null;
        this.isChild = false;
        this.params = [];
        this.lazyLoad = [];
        return this;
    }
    Object.defineProperty(Query.prototype, "moduleName", {
        /** @hidden */
        get: function () { return 'query'; },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the primary key.
     *
     * @param  {string} field - Defines the column field.
     */
    Query.prototype.setKey = function (field) {
        this.key = field;
        return this;
    };
    /**
     * Sets default DataManager to execute query.
     *
     * @param  {DataManager} dataManager - Defines the DataManager.
     */
    Query.prototype.using = function (dataManager) {
        this.dataManager = dataManager;
        return this;
    };
    /**
     * Executes query with the given DataManager.
     *
     * @param  {DataManager} dataManager - Defines the DataManager.
     * @param  {Function} done - Defines the success callback.
     * @param  {Function} fail - Defines the failure callback.
     * @param  {Function} always - Defines the callback which will be invoked on either success or failure.
     *
     * <pre>
     * let dataManager: DataManager = new DataManager([{ ID: '10' }, { ID: '2' }, { ID: '1' }, { ID: '20' }]);
     * let query: Query = new Query();
     * query.sortBy('ID', (x: string, y: string): number => { return parseInt(x, 10) - parseInt(y, 10) });
     * let promise: Promise< Object > = query.execute(dataManager);
     * promise.then((e: { result: Object }) => { });
     * </pre>
     */
    Query.prototype.execute = function (dataManager, done, fail, always) {
        dataManager = dataManager || this.dataManager;
        if (dataManager) {
            return dataManager.executeQuery(this, done, fail, always);
        }
        return DataUtil.throwError('Query - execute() : dataManager needs to be is set using "using" function or should be passed as argument');
    };
    /**
     * Executes query with the local datasource.
     *
     * @param  {DataManager} dataManager - Defines the DataManager.
     */
    Query.prototype.executeLocal = function (dataManager) {
        dataManager = dataManager || this.dataManager;
        if (dataManager) {
            return dataManager.executeLocal(this);
        }
        return DataUtil.throwError('Query - executeLocal() : dataManager needs to be is set using "using" function or should be passed as argument');
    };
    /**
     * Creates deep copy of the Query object.
     */
    Query.prototype.clone = function () {
        var cloned = new Query();
        cloned.queries = this.queries.slice(0);
        cloned.key = this.key;
        cloned.isChild = this.isChild;
        cloned.dataManager = this.dataManager;
        cloned.fromTable = this.fromTable;
        cloned.params = this.params.slice(0);
        cloned.expands = this.expands.slice(0);
        cloned.sortedColumns = this.sortedColumns.slice(0);
        cloned.groupedColumns = this.groupedColumns.slice(0);
        cloned.subQuerySelector = this.subQuerySelector;
        cloned.subQuery = this.subQuery;
        cloned.fKey = this.fKey;
        cloned.isCountRequired = this.isCountRequired;
        cloned.distincts = this.distincts.slice(0);
        cloned.lazyLoad = this.lazyLoad.slice(0);
        return cloned;
    };
    /**
     * Specifies the name of table to retrieve data in query execution.
     *
     * @param  {string} tableName - Defines the table name.
     */
    Query.prototype.from = function (tableName) {
        this.fromTable = tableName;
        return this;
    };
    /**
     * Adds additional parameter which will be sent along with the request which will be generated while DataManager execute.
     *
     * @param  {string} key - Defines the key of additional parameter.
     * @param  {Function|string} value - Defines the value for the key.
     */
    Query.prototype.addParams = function (key, value) {
        if (typeof value === 'function') {
            this.params.push({ key: key, fn: value });
        }
        else {
            this.params.push({ key: key, value: value });
        }
        return this;
    };
    /**
     * @param fields
     * @hidden
     */
    Query.prototype.distinct = function (fields) {
        if (typeof fields === 'string') {
            this.distincts = [].slice.call([fields], 0);
        }
        else {
            this.distincts = fields.slice(0);
        }
        return this;
    };
    /**
     * Expands the related table.
     *
     * @param  {string|Object[]} tables
     */
    Query.prototype.expand = function (tables) {
        if (typeof tables === 'string') {
            this.expands = [].slice.call([tables], 0);
        }
        else {
            this.expands = tables.slice(0);
        }
        return this;
    };
    /**
     * Filter data with given filter criteria.
     *
     * @param {string|Predicate} fieldName - Defines the column field or Predicate.
     * @param {string} operator - Defines the operator how to filter data.
     * @param {string|number|boolean} value - Defines the values to match with data.
     * @param {boolean} ignoreCase - If ignore case set to false, then filter data with exact match or else
     * filter data with case insensitive.
     * @param ignoreAccent
     * @param matchCase
     */
    Query.prototype.where = function (fieldName, operator, value, ignoreCase, ignoreAccent, matchCase) {
        operator = operator ? (operator).toLowerCase() : null;
        var predicate = null;
        if (typeof fieldName === 'string') {
            predicate = new Predicate(fieldName, operator, value, ignoreCase, ignoreAccent, matchCase);
        }
        else if (fieldName instanceof Predicate) {
            predicate = fieldName;
        }
        this.queries.push({
            fn: 'onWhere',
            e: predicate
        });
        return this;
    };
    /**
     * Search data with given search criteria.
     *
     * @param {string|number|boolean} searchKey - Defines the search key.
     * @param {string|string[]} fieldNames - Defines the collection of column fields.
     * @param {string} operator - Defines the operator how to search data.
     * @param {boolean} ignoreCase - If ignore case set to false, then filter data with exact match or else
     * filter data with case insensitive.
     * @param ignoreAccent
     */
    Query.prototype.search = function (searchKey, fieldNames, operator, ignoreCase, ignoreAccent) {
        if (typeof fieldNames === 'string') {
            fieldNames = [fieldNames];
        }
        if (!operator || operator === 'none') {
            operator = 'contains';
        }
        var comparer = DataUtil.fnOperators[operator];
        this.queries.push({
            fn: 'onSearch',
            e: {
                fieldNames: fieldNames,
                operator: operator,
                searchKey: searchKey,
                ignoreCase: ignoreCase,
                ignoreAccent: ignoreAccent,
                comparer: comparer
            }
        });
        return this;
    };
    /**
     * Sort the data with given sort criteria.
     * By default, sort direction is ascending.
     *
     * @param {string|string[]} fieldName - Defines the single or collection of column fields.
     * @param {string|Function} comparer - Defines the sort direction or custom sort comparer function.
     * @param isFromGroup
     */
    Query.prototype.sortBy = function (fieldName, comparer, isFromGroup) {
        return this.sortByForeignKey(fieldName, comparer, isFromGroup);
    };
    /**
     * Sort the data with given sort criteria.
     * By default, sort direction is ascending.
     *
     * @param {string|string[]} fieldName - Defines the single or collection of column fields.
     * @param {string|Function} comparer - Defines the sort direction or custom sort comparer function.
     * @param isFromGroup
     * @param {string} direction - Defines the sort direction .
     */
    Query.prototype.sortByForeignKey = function (fieldName, comparer, isFromGroup, direction) {
        var order = !isNullOrUndefined(direction) ? direction : 'ascending';
        var sorts;
        var temp;
        if (typeof fieldName === 'string' && DataUtil.endsWith(fieldName.toLowerCase(), ' desc')) {
            fieldName = fieldName.replace(/ desc$/i, '');
            comparer = 'descending';
        }
        if (!comparer || typeof comparer === 'string') {
            order = comparer ? comparer.toLowerCase() : 'ascending';
            comparer = DataUtil.fnSort(comparer);
        }
        if (isFromGroup) {
            sorts = Query.filterQueries(this.queries, 'onSortBy');
            for (var i = 0; i < sorts.length; i++) {
                temp = sorts[i].e.fieldName;
                if (typeof temp === 'string') {
                    if (temp === fieldName) {
                        return this;
                    }
                }
                else if (temp instanceof Array) {
                    for (var j = 0; j < temp.length; j++) {
                        if (temp[j] === fieldName || fieldName.toLowerCase() === temp[j] + ' desc') {
                            return this;
                        }
                    }
                }
            }
        }
        this.queries.push({
            fn: 'onSortBy',
            e: {
                fieldName: fieldName,
                comparer: comparer,
                direction: order
            }
        });
        return this;
    };
    /**
     * Sorts data in descending order.
     *
     * @param  {string} fieldName - Defines the column field.
     */
    Query.prototype.sortByDesc = function (fieldName) {
        return this.sortBy(fieldName, 'descending');
    };
    /**
     * Groups data with the given field name.
     *
     * @param {string} fieldName - Defines the column field.
     * @param fn
     * @param format
     */
    Query.prototype.group = function (fieldName, fn, format) {
        this.sortBy(fieldName, null, true);
        this.queries.push({
            fn: 'onGroup',
            e: {
                fieldName: fieldName,
                comparer: fn ? fn : null,
                format: format ? format : null
            }
        });
        return this;
    };
    /**
     * Gets data based on the given page index and size.
     *
     * @param  {number} pageIndex - Defines the current page index.
     * @param  {number} pageSize - Defines the no of records per page.
     */
    Query.prototype.page = function (pageIndex, pageSize) {
        this.queries.push({
            fn: 'onPage',
            e: {
                pageIndex: pageIndex,
                pageSize: pageSize
            }
        });
        return this;
    };
    /**
     * Gets data based on the given start and end index.
     *
     * @param  {number} start - Defines the start index of the datasource.
     * @param  {number} end - Defines the end index of the datasource.
     */
    Query.prototype.range = function (start, end) {
        this.queries.push({
            fn: 'onRange',
            e: {
                start: start,
                end: end
            }
        });
        return this;
    };
    /**
     * Gets data from the top of the data source based on given number of records count.
     *
     * @param  {number} nos - Defines the no of records to retrieve from datasource.
     */
    Query.prototype.take = function (nos) {
        this.queries.push({
            fn: 'onTake',
            e: {
                nos: nos
            }
        });
        return this;
    };
    /**
     * Skips data with given number of records count from the top of the data source.
     *
     * @param  {number} nos - Defines the no of records skip in the datasource.
     */
    Query.prototype.skip = function (nos) {
        this.queries.push({
            fn: 'onSkip',
            e: { nos: nos }
        });
        return this;
    };
    /**
     * Selects specified columns from the data source.
     *
     * @param  {string|string[]} fieldNames - Defines the collection of column fields.
     */
    Query.prototype.select = function (fieldNames) {
        if (typeof fieldNames === 'string') {
            fieldNames = [].slice.call([fieldNames], 0);
        }
        this.queries.push({
            fn: 'onSelect',
            e: { fieldNames: fieldNames }
        });
        return this;
    };
    /**
     * Gets the records in hierarchical relationship from two tables. It requires the foreign key to relate two tables.
     *
     * @param  {Query} query - Defines the query to relate two tables.
     * @param  {Function} selectorFn - Defines the custom function to select records.
     */
    Query.prototype.hierarchy = function (query, selectorFn) {
        this.subQuerySelector = selectorFn;
        this.subQuery = query;
        return this;
    };
    /**
     * Sets the foreign key which is used to get data from the related table.
     *
     * @param  {string} key - Defines the foreign key.
     */
    Query.prototype.foreignKey = function (key) {
        this.fKey = key;
        return this;
    };
    /**
     * It is used to get total number of records in the DataManager execution result.
     */
    Query.prototype.requiresCount = function () {
        this.isCountRequired = true;
        return this;
    };
    //type - sum, avg, min, max
    /**
     * Aggregate the data with given type and field name.
     *
     * @param  {string} type - Defines the aggregate type.
     * @param  {string} field - Defines the column field to aggregate.
     */
    Query.prototype.aggregate = function (type, field) {
        this.queries.push({
            fn: 'onAggregates',
            e: { field: field, type: type }
        });
        return this;
    };
    /**
     * Pass array of filterColumn query for performing filter operation.
     *
     * @param  {QueryOptions[]} queries
     * @param  {string} name
     * @hidden
     */
    Query.filterQueries = function (queries, name) {
        return queries.filter(function (q) {
            return q.fn === name;
        });
    };
    /**
     * To get the list of queries which is already filtered in current data source.
     *
     * @param  {Object[]} queries
     * @param  {string[]} singles
     * @hidden
     */
    Query.filterQueryLists = function (queries, singles) {
        var filtered = queries.filter(function (q) {
            return singles.indexOf(q.fn) !== -1;
        });
        var res = {};
        for (var i = 0; i < filtered.length; i++) {
            if (!res[filtered[i].fn]) {
                res[filtered[i].fn] = filtered[i].e;
            }
        }
        return res;
    };
    return Query;
}());
/**
 * Predicate class is used to generate complex filter criteria.
 * This will be used by DataManager to perform multiple filtering operation.
 */
var Predicate = /** @class */ (function () {
    /**
     * Constructor for Predicate class.
     *
     * @param {string|Predicate} field
     * @param {string} operator
     * @param {string | number | Date | boolean | Predicate | Predicate[] | (string | number | boolean | Date)[] | null} value
     * @param {boolean=false} ignoreCase
     * @param ignoreAccent
     * @param {boolean} matchCase
     * @hidden
     */
    function Predicate(field, operator, value, ignoreCase, ignoreAccent, matchCase) {
        if (ignoreCase === void 0) { ignoreCase = false; }
        /** @hidden */
        this.ignoreAccent = false;
        /** @hidden */
        this.isComplex = false;
        if (typeof field === 'string') {
            this.field = field;
            this.operator = operator.toLowerCase();
            this.value = value;
            this.matchCase = matchCase;
            this.ignoreCase = ignoreCase;
            this.ignoreAccent = ignoreAccent;
            this.isComplex = false;
            this.comparer = DataUtil.fnOperators.processOperator(this.operator);
        }
        else if (field instanceof Predicate && value instanceof Predicate || value instanceof Array) {
            this.isComplex = true;
            this.condition = operator.toLowerCase();
            this.predicates = [field];
            this.matchCase = field.matchCase;
            this.ignoreCase = field.ignoreCase;
            this.ignoreAccent = field.ignoreAccent;
            if (value instanceof Array) {
                [].push.apply(this.predicates, value);
            }
            else {
                this.predicates.push(value);
            }
        }
        return this;
    }
    /**
     * Adds n-number of new predicates on existing predicate with “and” condition.
     *
     * @param  {Object[]} args - Defines the collection of predicates.
     */
    Predicate.and = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Predicate.combinePredicates([].slice.call(args, 0), 'and');
    };
    /**
     * Adds new predicate on existing predicate with “and” condition.
     *
     * @param {string} field - Defines the column field.
     * @param {string} operator - Defines the operator how to filter data.
     * @param {string} value - Defines the values to match with data.
     * @param {boolean} ignoreCase? - If ignore case set to false, then filter data with exact match or else
     * filter data with case insensitive.
     * @param ignoreCase
     * @param ignoreAccent
     */
    Predicate.prototype.and = function (field, operator, value, ignoreCase, ignoreAccent) {
        return Predicate.combine(this, field, operator, value, 'and', ignoreCase, ignoreAccent);
    };
    /**
     * Adds n-number of new predicates on existing predicate with “or” condition.
     *
     * @param  {Object[]} args - Defines the collection of predicates.
     */
    Predicate.or = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Predicate.combinePredicates([].slice.call(args, 0), 'or');
    };
    /**
     * Adds new predicate on existing predicate with “or” condition.
     *
     * @param {string} field - Defines the column field.
     * @param {string} operator - Defines the operator how to filter data.
     * @param {string} value - Defines the values to match with data.
     * @param {boolean} ignoreCase? - If ignore case set to false, then filter data with exact match or else
     * filter data with case insensitive.
     * @param ignoreCase
     * @param ignoreAccent
     */
    Predicate.prototype.or = function (field, operator, value, ignoreCase, ignoreAccent) {
        return Predicate.combine(this, field, operator, value, 'or', ignoreCase, ignoreAccent);
    };
    /**
     * Adds n-number of new predicates on existing predicate with “and not” condition.
     *
     * @param  {Object[]} args - Defines the collection of predicates.
     */
    Predicate.ornot = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Predicate.combinePredicates([].slice.call(args, 0), 'or not');
    };
    /**
     * Adds new predicate on existing predicate with “and not” condition.
     *
     * @param {string} field - Defines the column field.
     * @param {string} operator - Defines the operator how to filter data.
     * @param {string} value - Defines the values to match with data.
     * @param {boolean} ignoreCase? - If ignore case set to false, then filter data with exact match or else
     * filter data with case insensitive.
     * @param ignoreCase
     * @param ignoreAccent
     */
    Predicate.prototype.ornot = function (field, operator, value, ignoreCase, ignoreAccent) {
        return Predicate.combine(this, field, operator, value, 'ornot', ignoreCase, ignoreAccent);
    };
    /**
     * Adds n-number of new predicates on existing predicate with “and not” condition.
     *
     * @param  {Object[]} args - Defines the collection of predicates.
     */
    Predicate.andnot = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Predicate.combinePredicates([].slice.call(args, 0), 'and not');
    };
    /**
     * Adds new predicate on existing predicate with “and not” condition.
     *
     * @param {string} field - Defines the column field.
     * @param {string} operator - Defines the operator how to filter data.
     * @param {string} value - Defines the values to match with data.
     * @param {boolean} ignoreCase? - If ignore case set to false, then filter data with exact match or else
     * filter data with case insensitive.
     * @param ignoreCase
     * @param ignoreAccent
     */
    Predicate.prototype.andnot = function (field, operator, value, ignoreCase, ignoreAccent) {
        return Predicate.combine(this, field, operator, value, 'andnot', ignoreCase, ignoreAccent);
    };
    /**
     * Converts plain JavaScript object to Predicate object.
     *
     * @param  {Predicate[]|Predicate} json - Defines single or collection of Predicate.
     */
    Predicate.fromJson = function (json) {
        if (json instanceof Array) {
            var res = [];
            for (var i = 0, len = json.length; i < len; i++) {
                res.push(this.fromJSONData(json[i]));
            }
            return res;
        }
        var pred = json;
        return this.fromJSONData(pred);
    };
    /**
     * Validate the record based on the predicates.
     *
     * @param  {Object} record - Defines the datasource record.
     */
    Predicate.prototype.validate = function (record) {
        var predicate = this.predicates ? this.predicates : [];
        var ret;
        var isAnd;
        if (!this.isComplex && this.comparer) {
            if (this.condition && this.condition.indexOf('not') !== -1) {
                this.condition = this.condition.split('not')[0] === '' ? undefined : this.condition.split('not')[0];
                return !this.comparer.call(this, DataUtil.getObject(this.field, record), this.value, this.ignoreCase, this.ignoreAccent);
            }
            else {
                return this.comparer.call(this, DataUtil.getObject(this.field, record), this.value, this.ignoreCase, this.ignoreAccent);
            }
        }
        if (this.condition && this.condition.indexOf('not') !== -1) {
            isAnd = this.condition.indexOf('and') !== -1;
        }
        else {
            isAnd = this.condition === 'and';
        }
        for (var i = 0; i < predicate.length; i++) {
            if (i > 0 && this.condition && this.condition.indexOf('not') !== -1) {
                predicate[i].condition = predicate[i].condition ? predicate[i].condition + 'not' : 'not';
            }
            ret = predicate[i].validate(record);
            if (isAnd) {
                if (!ret) {
                    return false;
                }
            }
            else {
                if (ret) {
                    return true;
                }
            }
        }
        return isAnd;
    };
    /**
     * Converts predicates to plain JavaScript.
     * This method is uses Json stringify when serializing Predicate object.
     */
    Predicate.prototype.toJson = function () {
        var predicates;
        var p;
        if (this.isComplex) {
            predicates = [];
            p = this.predicates;
            for (var i = 0; i < p.length; i++) {
                predicates.push(p[i].toJson());
            }
        }
        return {
            isComplex: this.isComplex,
            field: this.field,
            operator: this.operator,
            value: this.value,
            ignoreCase: this.ignoreCase,
            ignoreAccent: this.ignoreAccent,
            condition: this.condition,
            predicates: predicates,
            matchCase: this.matchCase
        };
    };
    Predicate.combinePredicates = function (predicates, operator) {
        if (predicates.length === 1) {
            if (!(predicates[0] instanceof Array)) {
                return predicates[0];
            }
            predicates = predicates[0];
        }
        return new Predicate(predicates[0], operator, predicates.slice(1));
    };
    Predicate.combine = function (pred, field, operator, value, condition, ignoreCase, ignoreAccent) {
        if (field instanceof Predicate) {
            return Predicate[condition](pred, field);
        }
        if (typeof field === 'string') {
            return Predicate[condition](pred, new Predicate(field, operator, value, ignoreCase, ignoreAccent));
        }
        return DataUtil.throwError('Predicate - ' + condition + ' : invalid arguments');
    };
    Predicate.fromJSONData = function (json) {
        var preds = json.predicates || [];
        var len = preds.length;
        var predicates = [];
        var result;
        for (var i = 0; i < len; i++) {
            predicates.push(this.fromJSONData(preds[i]));
        }
        if (!json.isComplex) {
            result = new Predicate(json.field, json.operator, json.value, json.ignoreCase, json.ignoreAccent);
        }
        else {
            result = new Predicate(predicates[0], json.condition, predicates.slice(1));
        }
        return result;
    };
    return Predicate;
}());

/* eslint-disable valid-jsdoc */
var consts = { GroupGuid: '{271bbba0-1ee7}' };
/**
 * Data manager common utility methods.
 *
 * @hidden
 */
var DataUtil = /** @class */ (function () {
    function DataUtil() {
    }
    /**
     * Returns the value by invoking the provided parameter function.
     * If the paramater is not of type function then it will be returned as it is.
     *
     * @param {Function|string|string[]|number} value
     * @param {Object} inst?
     * @param inst
     * @hidden
     */
    DataUtil.getValue = function (value, inst) {
        if (typeof value === 'function') {
            return value.call(inst || {});
        }
        return value;
    };
    /**
     * Returns true if the input string ends with given string.
     *
     * @param  {string} input
     * @param  {string} substr
     */
    DataUtil.endsWith = function (input, substr) {
        return input.slice && input.slice(-substr.length) === substr;
    };
    /**
     * Returns true if the input string not ends with given string.
     *
     * @param  {string} input
     * @param  {string} substr
     */
    DataUtil.notEndsWith = function (input, substr) {
        return input.slice && input.slice(-substr.length) !== substr;
    };
    /**
     * Returns true if the input string starts with given string.
     *
     * @param {string} str
     * @param {string} startstr
     * @param input
     * @param start
     */
    DataUtil.startsWith = function (input, start) {
        return input.slice(0, start.length) === start;
    };
    /**
     * Returns true if the input string not starts with given string.
     *
     * @param {string} str
     * @param {string} startstr
     * @param input
     * @param start
     */
    DataUtil.notStartsWith = function (input, start) {
        return input.slice(0, start.length) !== start;
    };
    /**
     * Returns true if the input string pattern(wildcard) matches with given string.
     *
     * @param {string} str
     * @param {string} startstr
     * @param input
     * @param pattern
     */
    DataUtil.wildCard = function (input, pattern) {
        var asteriskSplit;
        var optionalSplit;
        // special character allowed search
        if (pattern.indexOf('[') !== -1) {
            pattern = pattern.split('[').join('[[]');
        }
        if (pattern.indexOf('(') !== -1) {
            pattern = pattern.split('(').join('[(]');
        }
        if (pattern.indexOf(')') !== -1) {
            pattern = pattern.split(')').join('[)]');
        }
        if (pattern.indexOf('\\') !== -1) {
            pattern = pattern.split('\\').join('[\\\\]');
        }
        if (pattern.indexOf('*') !== -1) {
            if (pattern.charAt(0) !== '*') {
                pattern = '^' + pattern;
            }
            if (pattern.charAt(pattern.length - 1) !== '*') {
                pattern = pattern + '$';
            }
            asteriskSplit = pattern.split('*');
            for (var i = 0; i < asteriskSplit.length; i++) {
                if (asteriskSplit[i].indexOf('.') === -1) {
                    asteriskSplit[i] = asteriskSplit[i] + '.*';
                }
                else {
                    asteriskSplit[i] = asteriskSplit[i] + '*';
                }
            }
            pattern = asteriskSplit.join('');
        }
        if (pattern.indexOf('%3f') !== -1 || pattern.indexOf('?') !== -1) {
            optionalSplit = pattern.indexOf('%3f') !== -1 ? pattern.split('%3f') : pattern.split('?');
            pattern = optionalSplit.join('.');
        }
        // eslint-disable-next-line security/detect-non-literal-regexp
        var regexPattern = new RegExp(pattern, 'g');
        return regexPattern.test(input);
    };
    /**
     * Returns true if the input string pattern(like) matches with given string.
     *
     * @param {string} str
     * @param {string} startstr
     * @param input
     * @param pattern
     */
    DataUtil.like = function (input, pattern) {
        if (pattern.indexOf('%') !== -1) {
            if (pattern.charAt(0) === '%' && pattern.lastIndexOf('%') < 2) {
                pattern = pattern.substring(1, pattern.length);
                return DataUtil.startsWith(DataUtil.toLowerCase(input), DataUtil.toLowerCase(pattern));
            }
            else if (pattern.charAt(pattern.length - 1) === '%' && pattern.indexOf('%') > pattern.length - 3) {
                pattern = pattern.substring(0, pattern.length - 1);
                return DataUtil.endsWith(DataUtil.toLowerCase(input), DataUtil.toLowerCase(pattern));
            }
            else if (pattern.lastIndexOf('%') !== pattern.indexOf('%') && pattern.lastIndexOf('%') > pattern.indexOf('%') + 1) {
                pattern = pattern.substring(pattern.indexOf('%') + 1, pattern.lastIndexOf('%'));
                return input.indexOf(pattern) !== -1;
            }
            else {
                return input.indexOf(pattern) !== -1;
            }
        }
        else {
            return false;
        }
    };
    /**
     * To return the sorting function based on the string.
     *
     * @param  {string} order
     * @hidden
     */
    DataUtil.fnSort = function (order) {
        order = order ? DataUtil.toLowerCase(order) : 'ascending';
        if (order === 'ascending') {
            return this.fnAscending;
        }
        return this.fnDescending;
    };
    /**
     * Comparer function which is used to sort the data in ascending order.
     *
     * @param  {string|number} x
     * @param  {string|number} y
     * @returns number
     */
    DataUtil.fnAscending = function (x, y) {
        if (isNullOrUndefined(x) && isNullOrUndefined(y)) {
            return 0;
        }
        if (y === null || y === undefined) {
            return -1;
        }
        if (typeof x === 'string') {
            return x.localeCompare(y);
        }
        if (x === null || x === undefined) {
            return 1;
        }
        return x - y;
    };
    /**
     * Comparer function which is used to sort the data in descending order.
     *
     * @param  {string|number} x
     * @param  {string|number} y
     * @returns number
     */
    DataUtil.fnDescending = function (x, y) {
        if (isNullOrUndefined(x) && isNullOrUndefined(y)) {
            return 0;
        }
        if (y === null || y === undefined) {
            return 1;
        }
        if (typeof x === 'string') {
            return x.localeCompare(y) * -1;
        }
        if (x === null || x === undefined) {
            return -1;
        }
        return y - x;
    };
    DataUtil.extractFields = function (obj, fields) {
        var newObj = {};
        for (var i = 0; i < fields.length; i++) {
            newObj = this.setValue(fields[i], this.getObject(fields[i], obj), newObj);
        }
        return newObj;
    };
    /**
     * Select objects by given fields from jsonArray.
     *
     * @param  {Object[]} jsonArray
     * @param  {string[]} fields
     */
    DataUtil.select = function (jsonArray, fields) {
        var newData = [];
        for (var i = 0; i < jsonArray.length; i++) {
            newData.push(this.extractFields(jsonArray[i], fields));
        }
        return newData;
    };
    /**
     * Group the input data based on the field name.
     * It also performs aggregation of the grouped records based on the aggregates paramater.
     *
     * @param {Object[]} jsonArray
     * @param {string} field?
     * @param {Object[]} agg?
     * @param {number} level?
     * @param {Object[]} groupDs?
     * @param field
     * @param aggregates
     * @param level
     * @param groupDs
     * @param format
     * @param isLazyLoad
     */
    DataUtil.group = function (jsonArray, field, aggregates, level, groupDs, format, isLazyLoad) {
        level = level || 1;
        var jsonData = jsonArray;
        var guid = 'GroupGuid';
        if (jsonData.GroupGuid === consts[guid]) {
            var _loop_1 = function (j) {
                if (!isNullOrUndefined(groupDs)) {
                    var indx = -1;
                    var temp = groupDs.filter(function (e) { return e.key === jsonData[j].key; });
                    indx = groupDs.indexOf(temp[0]);
                    jsonData[j].items = this_1.group(jsonData[j].items, field, aggregates, jsonData.level + 1, groupDs[indx].items, format, isLazyLoad);
                    jsonData[j].count = groupDs[indx].count;
                }
                else {
                    jsonData[j].items = this_1.group(jsonData[j].items, field, aggregates, jsonData.level + 1, null, format, isLazyLoad);
                    jsonData[j].count = jsonData[j].items.length;
                }
            };
            var this_1 = this;
            for (var j = 0; j < jsonData.length; j++) {
                _loop_1(j);
            }
            jsonData.childLevels += 1;
            return jsonData;
        }
        var grouped = {};
        var groupedArray = [];
        groupedArray.GroupGuid = consts[guid];
        groupedArray.level = level;
        groupedArray.childLevels = 0;
        groupedArray.records = jsonData;
        var _loop_2 = function (i) {
            var val = this_2.getVal(jsonData, i, field);
            if (!isNullOrUndefined(format)) {
                val = format(val, field);
            }
            if (!grouped[val]) {
                grouped[val] = {
                    key: val,
                    count: 0,
                    items: [],
                    aggregates: {},
                    field: field
                };
                groupedArray.push(grouped[val]);
                if (!isNullOrUndefined(groupDs)) {
                    var tempObj = groupDs.filter(function (e) { return e.key === grouped[val].key; });
                    grouped[val].count = tempObj[0].count;
                }
            }
            grouped[val].count = !isNullOrUndefined(groupDs) ? grouped[val].count : grouped[val].count += 1;
            if (!isLazyLoad || (isLazyLoad && aggregates.length)) {
                grouped[val].items.push(jsonData[i]);
            }
        };
        var this_2 = this;
        for (var i = 0; i < jsonData.length; i++) {
            _loop_2(i);
        }
        if (aggregates && aggregates.length) {
            var _loop_3 = function (i) {
                var res = {};
                var fn = void 0;
                var aggs = aggregates;
                for (var j = 0; j < aggregates.length; j++) {
                    fn = DataUtil.aggregates[aggregates[j].type];
                    if (!isNullOrUndefined(groupDs)) {
                        var temp = groupDs.filter(function (e) { return e.key === groupedArray[i].key; });
                        if (fn) {
                            res[aggs[j].field + ' - ' + aggs[j].type] = fn(temp[0].items, aggs[j].field);
                        }
                    }
                    else {
                        if (fn) {
                            res[aggs[j].field + ' - ' + aggs[j].type] = fn(groupedArray[i].items, aggs[j].field);
                        }
                    }
                }
                groupedArray[i].aggregates = res;
            };
            for (var i = 0; i < groupedArray.length; i++) {
                _loop_3(i);
            }
        }
        if (isLazyLoad && groupedArray.length && aggregates.length) {
            for (var i = 0; i < groupedArray.length; i++) {
                groupedArray[i].items = [];
            }
        }
        return jsonData.length && groupedArray || jsonData;
    };
    /**
     * It is used to categorize the multiple items based on a specific field in jsonArray.
     * The hierarchical queries are commonly required when you use foreign key binding.
     *
     * @param {string} fKey
     * @param {string} from
     * @param {Object[]} source
     * @param {Group} lookup?
     * @param {string} pKey?
     * @param lookup
     * @param pKey
     * @hidden
     */
    DataUtil.buildHierarchy = function (fKey, from, source, lookup, pKey) {
        var i;
        var grp = {};
        var temp;
        if (lookup.result) {
            lookup = lookup.result;
        }
        if (lookup.GroupGuid) {
            this.throwError('DataManager: Do not have support Grouping in hierarchy');
        }
        for (i = 0; i < lookup.length; i++) {
            var fKeyData = this.getObject(fKey, lookup[i]);
            temp = grp[fKeyData] || (grp[fKeyData] = []);
            temp.push(lookup[i]);
        }
        for (i = 0; i < source.length; i++) {
            var fKeyData = this.getObject(pKey || fKey, source[i]);
            source[i][from] = grp[fKeyData];
        }
    };
    /**
     * The method used to get the field names which started with specified characters.
     *
     * @param {Object} obj
     * @param {string[]} fields?
     * @param {string} prefix?
     * @param fields
     * @param prefix
     * @hidden
     */
    DataUtil.getFieldList = function (obj, fields, prefix) {
        if (prefix === undefined) {
            prefix = '';
        }
        if (fields === undefined || fields === null) {
            return this.getFieldList(obj, [], prefix);
        }
        var copyObj = obj;
        var keys = Object.keys(obj);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var prop = keys_1[_i];
            if (typeof copyObj[prop] === 'object' && !(copyObj[prop] instanceof Array)) {
                this.getFieldList(copyObj[prop], fields, prefix + prop + '.');
            }
            else {
                fields.push(prefix + prop);
            }
        }
        return fields;
    };
    /**
     * Gets the value of the property in the given object.
     * The complex object can be accessed by providing the field names concatenated with dot(.).
     *
     * @param  {string} nameSpace - The name of the property to be accessed.
     * @param  {Object} from - Defines the source object.
     */
    DataUtil.getObject = function (nameSpace, from) {
        if (!nameSpace) {
            return from;
        }
        if (!from) {
            return undefined;
        }
        if (nameSpace.indexOf('.') === -1) {
            if (!isNullOrUndefined(from[nameSpace])) {
                return from[nameSpace];
            }
            else {
                var lowerCaseNameSpace = nameSpace.charAt(0).toLowerCase() + nameSpace.slice(1);
                var upperCaseNameSpace = nameSpace.charAt(0).toUpperCase() + nameSpace.slice(1);
                if (!isNullOrUndefined(from[lowerCaseNameSpace])) {
                    return from[lowerCaseNameSpace];
                }
                else if (!isNullOrUndefined(from[upperCaseNameSpace])) {
                    return from[upperCaseNameSpace];
                }
                else {
                    return null;
                }
            }
        }
        var value = from;
        var splits = nameSpace.split('.');
        for (var i = 0; i < splits.length; i++) {
            if (value == null) {
                break;
            }
            value = value[splits[i]];
            if (value === undefined) {
                var casing = splits[i].charAt(0).toUpperCase() + splits[i].slice(1);
                value = from[casing] || from[casing.charAt(0).toLowerCase() + casing.slice(1)] || null;
            }
            from = value;
        }
        return value;
    };
    /**
     * To set value for the nameSpace in desired object.
     *
     * @param {string} nameSpace - String value to the get the inner object.
     * @param {Object} value - Value that you need to set.
     * @param {Object} obj - Object to get the inner object value.
     * @return { [key: string]: Object; } | Object
     * @hidden
     */
    DataUtil.setValue = function (nameSpace, value, obj) {
        var keys = nameSpace.toString().split('.');
        var start = obj || {};
        var fromObj = start;
        var i;
        var length = keys.length;
        var key;
        for (i = 0; i < length; i++) {
            key = keys[i];
            if (i + 1 === length) {
                fromObj[key] = value === undefined ? undefined : value;
            }
            else if (isNullOrUndefined(fromObj[key])) {
                fromObj[key] = {};
            }
            fromObj = fromObj[key];
        }
        return start;
    };
    /**
     * Sort the given data based on the field and comparer.
     *
     * @param  {Object[]} dataSource - Defines the input data.
     * @param  {string} field - Defines the field to be sorted.
     * @param  {Function} comparer - Defines the comparer function used to sort the records.
     */
    DataUtil.sort = function (dataSource, field, comparer) {
        var _this = this;
        if (dataSource.length <= 1) {
            return dataSource;
        }
        return dataSource.slice()
            .sort(function (a, b) { return comparer(_this.getVal([a], 0, field), _this.getVal([b], 0, field), a, b); });
    };
    DataUtil.ignoreDiacritics = function (value) {
        if (typeof value !== 'string') {
            return value;
        }
        var result = value.split('');
        var newValue = result.map(function (temp) { return temp in DataUtil.diacritics ? DataUtil.diacritics[temp] : temp; });
        return newValue.join('');
    };
    DataUtil.ignoreDiacriticsForArrays = function (valueArray) {
        if (!Array.isArray(valueArray)) {
            return [];
        }
        return valueArray.map(function (item) {
            return DataUtil.ignoreDiacritics(item);
        });
    };
    DataUtil.merge = function (left, right, fieldName, comparer) {
        var result = [];
        var current;
        while (left.length > 0 || right.length > 0) {
            if (left.length > 0 && right.length > 0) {
                if (comparer) {
                    current = comparer(this.getVal(left, 0, fieldName), this.getVal(right, 0, fieldName), left[0], right[0]) <= 0 ? left : right;
                }
                else {
                    current = left[0][fieldName] < left[0][fieldName] ? left : right;
                }
            }
            else {
                current = left.length > 0 ? left : right;
            }
            result.push(current.shift());
        }
        return result;
    };
    DataUtil.getVal = function (array, index, field) {
        return field ? this.getObject(field, array[index]) : array[index];
    };
    DataUtil.toLowerCase = function (val) {
        if (isNullOrUndefined(val))
            return '';
        if (typeof val === 'string')
            return val.toLowerCase();
        if (val instanceof Date)
            return val.toString().toLowerCase();
        return val.toString();
    };
    /**
     * To perform the filter operation with specified adaptor and returns the result.
     *
     * @param {Object} adaptor
     * @param {string} fnName
     * @param {Object} param1?
     * @param {Object} param2?
     * @param param1
     * @param param2
     * @hidden
     */
    DataUtil.callAdaptorFunction = function (adaptor, fnName, param1, param2) {
        if (fnName in adaptor) {
            var res = adaptor[fnName](param1, param2);
            if (!isNullOrUndefined(res)) {
                param1 = res;
            }
        }
        return param1;
    };
    DataUtil.getAddParams = function (adp, dm, query) {
        var req = {};
        DataUtil.callAdaptorFunction(adp, 'addParams', {
            dm: dm,
            query: query,
            params: query ? query.params : [],
            reqParams: req
        });
        return req;
    };
    /**
     * Checks wheather the given input is a plain object or not.
     *
     * @param  {Object|Object[]} obj
     */
    DataUtil.isPlainObject = function (obj) {
        return (!!obj) && (obj.constructor === Object);
    };
    /**
     * Returns true when the browser cross origin request.
     */
    DataUtil.isCors = function () {
        var xhr = null;
        var request = 'XMLHttpRequest';
        try {
            xhr = new window[request]();
        }
        catch (e) {
            // No exception handling
        }
        return !!xhr && ('withCredentials' in xhr);
    };
    /**
     * Generate random GUID value which will be prefixed with the given value.
     *
     * @param  {string} prefix
     */
    DataUtil.getGuid = function (prefix) {
        var hexs = '0123456789abcdef';
        var rand;
        return (prefix || '') + '00000000-0000-4000-0000-000000000000'.replace(/0/g, function (val, i) {
            if ('crypto' in window && 'getRandomValues' in crypto) {
                var arr = new Uint8Array(1);
                window.crypto.getRandomValues(arr);
                rand = arr[0] % 16 | 0;
            }
            else {
                rand = Math.random() * 16 | 0;
            }
            return hexs[i === 19 ? rand & 0x3 | 0x8 : rand];
        });
    };
    /**
     * Checks wheather the given value is null or not.
     *
     * @param  {string|Object} val
     * @returns boolean
     */
    DataUtil.isNull = function (val) {
        return val === undefined || val === null;
    };
    /**
     * To get the required items from collection of objects.
     *
     * @param  {Object[]} array
     * @param  {string} field
     * @param  {Function} comparer
     * @returns Object
     * @hidden
     */
    DataUtil.getItemFromComparer = function (array, field, comparer) {
        var keyVal;
        var current;
        var key;
        var i = 0;
        var castRequired = typeof DataUtil.getVal(array, 0, field) === 'string';
        if (array.length) {
            while (isNullOrUndefined(keyVal) && i < array.length) {
                keyVal = DataUtil.getVal(array, i, field);
                key = array[i++];
            }
        }
        for (; i < array.length; i++) {
            current = DataUtil.getVal(array, i, field);
            if (isNullOrUndefined(current)) {
                continue;
            }
            if (castRequired) {
                keyVal = +keyVal;
                current = +current;
            }
            if (comparer(keyVal, current) > 0) {
                keyVal = current;
                key = array[i];
            }
        }
        return key;
    };
    /**
     * To get distinct values of Array or Array of Objects.
     *
     * @param {Object[]} json
     * @param {string} field
     * @param fieldName
     * @param {boolean} requiresCompleteRecord
     * @returns Object[]
     * * distinct array of objects is return when requiresCompleteRecord set as true.
     * @hidden
     */
    DataUtil.distinct = function (json, fieldName, requiresCompleteRecord) {
        requiresCompleteRecord = isNullOrUndefined(requiresCompleteRecord) ? false : requiresCompleteRecord;
        var result = [];
        var val;
        var tmp = {};
        json.forEach(function (data, index) {
            val = typeof (json[index]) === 'object' ? DataUtil.getVal(json, index, fieldName) : json[index];
            if (!(val in tmp)) {
                result.push(!requiresCompleteRecord ? val : json[index]);
                tmp[val] = 1;
            }
        });
        return result;
    };
    /**
     * Process the given records based on the datamanager string.
     *
     * @param {string} datamanager
     * @param dm
     * @param {Object[]} records
     */
    DataUtil.processData = function (dm, records) {
        var query = this.prepareQuery(dm);
        var sampledata = new DataManager(records);
        if (dm.requiresCounts) {
            query.requiresCount();
        }
        /* eslint-disable @typescript-eslint/no-explicit-any */
        // tslint:disable-next-line:no-any
        var result = sampledata.executeLocal(query);
        /* eslint-enable @typescript-eslint/no-explicit-any */
        var returnValue = {
            result: dm.requiresCounts ? result.result : result,
            count: result.count,
            aggregates: JSON.stringify(result.aggregates)
        };
        return dm.requiresCounts ? returnValue : result;
    };
    DataUtil.prepareQuery = function (dm) {
        var _this = this;
        var query = new Query();
        if (dm.select) {
            query.select(dm.select);
        }
        if (dm.where) {
            var where = DataUtil.parse.parseJson(dm.where);
            where.filter(function (pred) {
                if (isNullOrUndefined(pred.condition)) {
                    query.where(pred.field, pred.operator, pred.value, pred.ignoreCase, pred.ignoreAccent);
                }
                else {
                    var predicateList = [];
                    if (pred.field) {
                        predicateList.push(new Predicate(pred.field, pred.operator, pred.value, pred.ignoreCase, pred.ignoreAccent));
                    }
                    else {
                        predicateList = predicateList.concat(_this.getPredicate(pred.predicates));
                    }
                    if (pred.condition === 'or') {
                        query.where(Predicate.or(predicateList));
                    }
                    else if (pred.condition === 'and') {
                        query.where(Predicate.and(predicateList));
                    }
                }
            });
        }
        if (dm.search) {
            var search = DataUtil.parse.parseJson(dm.search);
            // tslint:disable-next-line:no-string-literal
            search.filter(function (e) { return query.search(e.key, e.fields, e['operator'], 
            // tslint:disable-next-line:no-string-literal
            e['ignoreCase'], e['ignoreAccent']); });
        }
        if (dm.aggregates) {
            dm.aggregates.filter(function (e) { return query.aggregate(e.type, e.field); });
        }
        if (dm.sorted) {
            dm.sorted.filter(function (e) { return query.sortBy(e.name, e.direction); });
        }
        if (dm.skip) {
            query.skip(dm.skip);
        }
        if (dm.take) {
            query.take(dm.take);
        }
        if (dm.group) {
            dm.group.filter(function (grp) { return query.group(grp); });
        }
        return query;
    };
    DataUtil.getPredicate = function (pred) {
        var mainPred = [];
        for (var i = 0; i < pred.length; i++) {
            var e = pred[i];
            if (e.field) {
                mainPred.push(new Predicate(e.field, e.operator, e.value, e.ignoreCase, e.ignoreAccent));
            }
            else {
                var childPred = [];
                // tslint:disable-next-line:typedef
                var cpre = this.getPredicate(e.predicates);
                for (var _i = 0, _a = Object.keys(cpre); _i < _a.length; _i++) {
                    var prop = _a[_i];
                    childPred.push(cpre[prop]);
                }
                mainPred.push(e.condition === 'or' ? Predicate.or(childPred) : Predicate.and(childPred));
            }
        }
        return mainPred;
    };
    /**
     * Specifies the value which will be used to adjust the date value to server timezone.
     *
     * @default null
     */
    DataUtil.serverTimezoneOffset = null;
    /**
     * Species whether are not to be parsed with serverTimezoneOffset value.
     *
     * @hidden
     */
    DataUtil.timeZoneHandling = true;
    /**
     * Throw error with the given string as message.
     *
     * @param {string} er
     * @param error
     */
    DataUtil.throwError = function (error) {
        try {
            throw new Error(error);
        }
        catch (e) {
            // eslint-disable-next-line no-throw-literal
            throw e.message + '\n' + e.stack;
        }
    };
    DataUtil.aggregates = {
        /**
         * Calculate sum of the given field in the data.
         *
         * @param  {Object[]} ds
         * @param  {string} field
         */
        sum: function (ds, field) {
            var result = 0;
            var val;
            var castRequired = typeof DataUtil.getVal(ds, 0, field) !== 'number';
            for (var i = 0; i < ds.length; i++) {
                val = DataUtil.getVal(ds, i, field);
                if (!isNaN(val) && val !== null) {
                    if (castRequired) {
                        val = +val;
                    }
                    result += val;
                }
            }
            return result;
        },
        /**
         * Calculate average value of the given field in the data.
         *
         * @param  {Object[]} ds
         * @param  {string} field
         */
        average: function (ds, field) {
            return DataUtil.aggregates.sum(ds, field) / ds.length;
        },
        /**
         * Returns the min value of the data based on the field.
         *
         * @param  {Object[]} ds
         * @param  {string|Function} field
         */
        min: function (ds, field) {
            var comparer;
            if (typeof field === 'function') {
                comparer = field;
                field = null;
            }
            return DataUtil.getObject(field, DataUtil.getItemFromComparer(ds, field, comparer || DataUtil.fnAscending));
        },
        /**
         * Returns the max value of the data based on the field.
         *
         * @param  {Object[]} ds
         * @param  {string} field
         * @returns number
         */
        max: function (ds, field) {
            var comparer;
            if (typeof field === 'function') {
                comparer = field;
                field = null;
            }
            return DataUtil.getObject(field, DataUtil.getItemFromComparer(ds, field, comparer || DataUtil.fnDescending));
        },
        /**
         * Returns the total number of true value present in the data based on the given boolean field name.
         *
         * @param  {Object[]} ds
         * @param  {string} field
         */
        truecount: function (ds, field) {
            return new DataManager(ds).executeLocal(new Query().where(field, 'equal', true, true)).length;
        },
        /**
         * Returns the total number of false value present in the data based on the given boolean field name.
         *
         * @param  {Object[]} ds
         * @param  {string} field
         */
        falsecount: function (ds, field) {
            return new DataManager(ds).executeLocal(new Query().where(field, 'equal', false, true)).length;
        },
        /**
         * Returns the length of the given data.
         *
         * @param {Object[]} ds
         * @param {string} field?
         * @param field
         * @returns number
         */
        count: function (ds, field) {
            return ds.length;
        }
    };
    /**
     * Specifies the Object with filter operators.
     */
    DataUtil.operatorSymbols = {
        '<': 'lessthan',
        '>': 'greaterthan',
        '<=': 'lessthanorequal',
        '>=': 'greaterthanorequal',
        '==': 'equal',
        '!=': 'notequal',
        '*=': 'contains',
        '$=': 'endswith',
        '^=': 'startswith'
    };
    /**
     * Specifies the Object with filter operators which will be used for OData filter query generation.
     * * It will be used for date/number type filter query.
     */
    DataUtil.odBiOperator = {
        '<': ' lt ',
        '>': ' gt ',
        '<=': ' le ',
        '>=': ' ge ',
        '==': ' eq ',
        '!=': ' ne ',
        'lessthan': ' lt ',
        'lessthanorequal': ' le ',
        'greaterthan': ' gt ',
        'greaterthanorequal': ' ge ',
        'equal': ' eq ',
        'notequal': ' ne '
    };
    /**
     * Specifies the Object with filter operators which will be used for OData filter query generation.
     * It will be used for string type filter query.
     */
    DataUtil.odUniOperator = {
        '$=': 'endswith',
        '^=': 'startswith',
        '*=': 'substringof',
        'endswith': 'endswith',
        'startswith': 'startswith',
        'contains': 'substringof',
        'doesnotendwith': 'not endswith',
        'doesnotstartwith': 'not startswith',
        'doesnotcontain': 'not substringof',
        'wildcard': 'wildcard',
        'like': 'like'
    };
    /**
     * Specifies the Object with filter operators which will be used for ODataV4 filter query generation.
     * It will be used for string type filter query.
     */
    DataUtil.odv4UniOperator = {
        '$=': 'endswith',
        '^=': 'startswith',
        '*=': 'contains',
        'endswith': 'endswith',
        'startswith': 'startswith',
        'contains': 'contains',
        'doesnotendwith': 'not endswith',
        'doesnotstartwith': 'not startswith',
        'doesnotcontain': 'not contains',
        'wildcard': 'wildcard',
        'like': 'like'
    };
    DataUtil.diacritics = {
        '\u24B6': 'A',
        '\uFF21': 'A',
        '\u00C0': 'A',
        '\u00C1': 'A',
        '\u00C2': 'A',
        '\u1EA6': 'A',
        '\u1EA4': 'A',
        '\u1EAA': 'A',
        '\u1EA8': 'A',
        '\u00C3': 'A',
        '\u0100': 'A',
        '\u0102': 'A',
        '\u1EB0': 'A',
        '\u1EAE': 'A',
        '\u1EB4': 'A',
        '\u1EB2': 'A',
        '\u0226': 'A',
        '\u01E0': 'A',
        '\u00C4': 'A',
        '\u01DE': 'A',
        '\u1EA2': 'A',
        '\u00C5': 'A',
        '\u01FA': 'A',
        '\u01CD': 'A',
        '\u0200': 'A',
        '\u0202': 'A',
        '\u1EA0': 'A',
        '\u1EAC': 'A',
        '\u1EB6': 'A',
        '\u1E00': 'A',
        '\u0104': 'A',
        '\u023A': 'A',
        '\u2C6F': 'A',
        '\uA732': 'AA',
        '\u00C6': 'AE',
        '\u01FC': 'AE',
        '\u01E2': 'AE',
        '\uA734': 'AO',
        '\uA736': 'AU',
        '\uA738': 'AV',
        '\uA73A': 'AV',
        '\uA73C': 'AY',
        '\u24B7': 'B',
        '\uFF22': 'B',
        '\u1E02': 'B',
        '\u1E04': 'B',
        '\u1E06': 'B',
        '\u0243': 'B',
        '\u0182': 'B',
        '\u0181': 'B',
        '\u24B8': 'C',
        '\uFF23': 'C',
        '\u0106': 'C',
        '\u0108': 'C',
        '\u010A': 'C',
        '\u010C': 'C',
        '\u00C7': 'C',
        '\u1E08': 'C',
        '\u0187': 'C',
        '\u023B': 'C',
        '\uA73E': 'C',
        '\u24B9': 'D',
        '\uFF24': 'D',
        '\u1E0A': 'D',
        '\u010E': 'D',
        '\u1E0C': 'D',
        '\u1E10': 'D',
        '\u1E12': 'D',
        '\u1E0E': 'D',
        '\u0110': 'D',
        '\u018B': 'D',
        '\u018A': 'D',
        '\u0189': 'D',
        '\uA779': 'D',
        '\u01F1': 'DZ',
        '\u01C4': 'DZ',
        '\u01F2': 'Dz',
        '\u01C5': 'Dz',
        '\u24BA': 'E',
        '\uFF25': 'E',
        '\u00C8': 'E',
        '\u00C9': 'E',
        '\u00CA': 'E',
        '\u1EC0': 'E',
        '\u1EBE': 'E',
        '\u1EC4': 'E',
        '\u1EC2': 'E',
        '\u1EBC': 'E',
        '\u0112': 'E',
        '\u1E14': 'E',
        '\u1E16': 'E',
        '\u0114': 'E',
        '\u0116': 'E',
        '\u00CB': 'E',
        '\u1EBA': 'E',
        '\u011A': 'E',
        '\u0204': 'E',
        '\u0206': 'E',
        '\u1EB8': 'E',
        '\u1EC6': 'E',
        '\u0228': 'E',
        '\u1E1C': 'E',
        '\u0118': 'E',
        '\u1E18': 'E',
        '\u1E1A': 'E',
        '\u0190': 'E',
        '\u018E': 'E',
        '\u24BB': 'F',
        '\uFF26': 'F',
        '\u1E1E': 'F',
        '\u0191': 'F',
        '\uA77B': 'F',
        '\u24BC': 'G',
        '\uFF27': 'G',
        '\u01F4': 'G',
        '\u011C': 'G',
        '\u1E20': 'G',
        '\u011E': 'G',
        '\u0120': 'G',
        '\u01E6': 'G',
        '\u0122': 'G',
        '\u01E4': 'G',
        '\u0193': 'G',
        '\uA7A0': 'G',
        '\uA77D': 'G',
        '\uA77E': 'G',
        '\u24BD': 'H',
        '\uFF28': 'H',
        '\u0124': 'H',
        '\u1E22': 'H',
        '\u1E26': 'H',
        '\u021E': 'H',
        '\u1E24': 'H',
        '\u1E28': 'H',
        '\u1E2A': 'H',
        '\u0126': 'H',
        '\u2C67': 'H',
        '\u2C75': 'H',
        '\uA78D': 'H',
        '\u24BE': 'I',
        '\uFF29': 'I',
        '\u00CC': 'I',
        '\u00CD': 'I',
        '\u00CE': 'I',
        '\u0128': 'I',
        '\u012A': 'I',
        '\u012C': 'I',
        '\u0130': 'I',
        '\u00CF': 'I',
        '\u1E2E': 'I',
        '\u1EC8': 'I',
        '\u01CF': 'I',
        '\u0208': 'I',
        '\u020A': 'I',
        '\u1ECA': 'I',
        '\u012E': 'I',
        '\u1E2C': 'I',
        '\u0197': 'I',
        '\u24BF': 'J',
        '\uFF2A': 'J',
        '\u0134': 'J',
        '\u0248': 'J',
        '\u24C0': 'K',
        '\uFF2B': 'K',
        '\u1E30': 'K',
        '\u01E8': 'K',
        '\u1E32': 'K',
        '\u0136': 'K',
        '\u1E34': 'K',
        '\u0198': 'K',
        '\u2C69': 'K',
        '\uA740': 'K',
        '\uA742': 'K',
        '\uA744': 'K',
        '\uA7A2': 'K',
        '\u24C1': 'L',
        '\uFF2C': 'L',
        '\u013F': 'L',
        '\u0139': 'L',
        '\u013D': 'L',
        '\u1E36': 'L',
        '\u1E38': 'L',
        '\u013B': 'L',
        '\u1E3C': 'L',
        '\u1E3A': 'L',
        '\u0141': 'L',
        '\u023D': 'L',
        '\u2C62': 'L',
        '\u2C60': 'L',
        '\uA748': 'L',
        '\uA746': 'L',
        '\uA780': 'L',
        '\u01C7': 'LJ',
        '\u01C8': 'Lj',
        '\u24C2': 'M',
        '\uFF2D': 'M',
        '\u1E3E': 'M',
        '\u1E40': 'M',
        '\u1E42': 'M',
        '\u2C6E': 'M',
        '\u019C': 'M',
        '\u24C3': 'N',
        '\uFF2E': 'N',
        '\u01F8': 'N',
        '\u0143': 'N',
        '\u00D1': 'N',
        '\u1E44': 'N',
        '\u0147': 'N',
        '\u1E46': 'N',
        '\u0145': 'N',
        '\u1E4A': 'N',
        '\u1E48': 'N',
        '\u0220': 'N',
        '\u019D': 'N',
        '\uA790': 'N',
        '\uA7A4': 'N',
        '\u01CA': 'NJ',
        '\u01CB': 'Nj',
        '\u24C4': 'O',
        '\uFF2F': 'O',
        '\u00D2': 'O',
        '\u00D3': 'O',
        '\u00D4': 'O',
        '\u1ED2': 'O',
        '\u1ED0': 'O',
        '\u1ED6': 'O',
        '\u1ED4': 'O',
        '\u00D5': 'O',
        '\u1E4C': 'O',
        '\u022C': 'O',
        '\u1E4E': 'O',
        '\u014C': 'O',
        '\u1E50': 'O',
        '\u1E52': 'O',
        '\u014E': 'O',
        '\u022E': 'O',
        '\u0230': 'O',
        '\u00D6': 'O',
        '\u022A': 'O',
        '\u1ECE': 'O',
        '\u0150': 'O',
        '\u01D1': 'O',
        '\u020C': 'O',
        '\u020E': 'O',
        '\u01A0': 'O',
        '\u1EDC': 'O',
        '\u1EDA': 'O',
        '\u1EE0': 'O',
        '\u1EDE': 'O',
        '\u1EE2': 'O',
        '\u1ECC': 'O',
        '\u1ED8': 'O',
        '\u01EA': 'O',
        '\u01EC': 'O',
        '\u00D8': 'O',
        '\u01FE': 'O',
        '\u0186': 'O',
        '\u019F': 'O',
        '\uA74A': 'O',
        '\uA74C': 'O',
        '\u01A2': 'OI',
        '\uA74E': 'OO',
        '\u0222': 'OU',
        '\u24C5': 'P',
        '\uFF30': 'P',
        '\u1E54': 'P',
        '\u1E56': 'P',
        '\u01A4': 'P',
        '\u2C63': 'P',
        '\uA750': 'P',
        '\uA752': 'P',
        '\uA754': 'P',
        '\u24C6': 'Q',
        '\uFF31': 'Q',
        '\uA756': 'Q',
        '\uA758': 'Q',
        '\u024A': 'Q',
        '\u24C7': 'R',
        '\uFF32': 'R',
        '\u0154': 'R',
        '\u1E58': 'R',
        '\u0158': 'R',
        '\u0210': 'R',
        '\u0212': 'R',
        '\u1E5A': 'R',
        '\u1E5C': 'R',
        '\u0156': 'R',
        '\u1E5E': 'R',
        '\u024C': 'R',
        '\u2C64': 'R',
        '\uA75A': 'R',
        '\uA7A6': 'R',
        '\uA782': 'R',
        '\u24C8': 'S',
        '\uFF33': 'S',
        '\u1E9E': 'S',
        '\u015A': 'S',
        '\u1E64': 'S',
        '\u015C': 'S',
        '\u1E60': 'S',
        '\u0160': 'S',
        '\u1E66': 'S',
        '\u1E62': 'S',
        '\u1E68': 'S',
        '\u0218': 'S',
        '\u015E': 'S',
        '\u2C7E': 'S',
        '\uA7A8': 'S',
        '\uA784': 'S',
        '\u24C9': 'T',
        '\uFF34': 'T',
        '\u1E6A': 'T',
        '\u0164': 'T',
        '\u1E6C': 'T',
        '\u021A': 'T',
        '\u0162': 'T',
        '\u1E70': 'T',
        '\u1E6E': 'T',
        '\u0166': 'T',
        '\u01AC': 'T',
        '\u01AE': 'T',
        '\u023E': 'T',
        '\uA786': 'T',
        '\uA728': 'TZ',
        '\u24CA': 'U',
        '\uFF35': 'U',
        '\u00D9': 'U',
        '\u00DA': 'U',
        '\u00DB': 'U',
        '\u0168': 'U',
        '\u1E78': 'U',
        '\u016A': 'U',
        '\u1E7A': 'U',
        '\u016C': 'U',
        '\u00DC': 'U',
        '\u01DB': 'U',
        '\u01D7': 'U',
        '\u01D5': 'U',
        '\u01D9': 'U',
        '\u1EE6': 'U',
        '\u016E': 'U',
        '\u0170': 'U',
        '\u01D3': 'U',
        '\u0214': 'U',
        '\u0216': 'U',
        '\u01AF': 'U',
        '\u1EEA': 'U',
        '\u1EE8': 'U',
        '\u1EEE': 'U',
        '\u1EEC': 'U',
        '\u1EF0': 'U',
        '\u1EE4': 'U',
        '\u1E72': 'U',
        '\u0172': 'U',
        '\u1E76': 'U',
        '\u1E74': 'U',
        '\u0244': 'U',
        '\u24CB': 'V',
        '\uFF36': 'V',
        '\u1E7C': 'V',
        '\u1E7E': 'V',
        '\u01B2': 'V',
        '\uA75E': 'V',
        '\u0245': 'V',
        '\uA760': 'VY',
        '\u24CC': 'W',
        '\uFF37': 'W',
        '\u1E80': 'W',
        '\u1E82': 'W',
        '\u0174': 'W',
        '\u1E86': 'W',
        '\u1E84': 'W',
        '\u1E88': 'W',
        '\u2C72': 'W',
        '\u24CD': 'X',
        '\uFF38': 'X',
        '\u1E8A': 'X',
        '\u1E8C': 'X',
        '\u24CE': 'Y',
        '\uFF39': 'Y',
        '\u1EF2': 'Y',
        '\u00DD': 'Y',
        '\u0176': 'Y',
        '\u1EF8': 'Y',
        '\u0232': 'Y',
        '\u1E8E': 'Y',
        '\u0178': 'Y',
        '\u1EF6': 'Y',
        '\u1EF4': 'Y',
        '\u01B3': 'Y',
        '\u024E': 'Y',
        '\u1EFE': 'Y',
        '\u24CF': 'Z',
        '\uFF3A': 'Z',
        '\u0179': 'Z',
        '\u1E90': 'Z',
        '\u017B': 'Z',
        '\u017D': 'Z',
        '\u1E92': 'Z',
        '\u1E94': 'Z',
        '\u01B5': 'Z',
        '\u0224': 'Z',
        '\u2C7F': 'Z',
        '\u2C6B': 'Z',
        '\uA762': 'Z',
        '\u24D0': 'a',
        '\uFF41': 'a',
        '\u1E9A': 'a',
        '\u00E0': 'a',
        '\u00E1': 'a',
        '\u00E2': 'a',
        '\u1EA7': 'a',
        '\u1EA5': 'a',
        '\u1EAB': 'a',
        '\u1EA9': 'a',
        '\u00E3': 'a',
        '\u0101': 'a',
        '\u0103': 'a',
        '\u1EB1': 'a',
        '\u1EAF': 'a',
        '\u1EB5': 'a',
        '\u1EB3': 'a',
        '\u0227': 'a',
        '\u01E1': 'a',
        '\u00E4': 'a',
        '\u01DF': 'a',
        '\u1EA3': 'a',
        '\u00E5': 'a',
        '\u01FB': 'a',
        '\u01CE': 'a',
        '\u0201': 'a',
        '\u0203': 'a',
        '\u1EA1': 'a',
        '\u1EAD': 'a',
        '\u1EB7': 'a',
        '\u1E01': 'a',
        '\u0105': 'a',
        '\u2C65': 'a',
        '\u0250': 'a',
        '\uA733': 'aa',
        '\u00E6': 'ae',
        '\u01FD': 'ae',
        '\u01E3': 'ae',
        '\uA735': 'ao',
        '\uA737': 'au',
        '\uA739': 'av',
        '\uA73B': 'av',
        '\uA73D': 'ay',
        '\u24D1': 'b',
        '\uFF42': 'b',
        '\u1E03': 'b',
        '\u1E05': 'b',
        '\u1E07': 'b',
        '\u0180': 'b',
        '\u0183': 'b',
        '\u0253': 'b',
        '\u24D2': 'c',
        '\uFF43': 'c',
        '\u0107': 'c',
        '\u0109': 'c',
        '\u010B': 'c',
        '\u010D': 'c',
        '\u00E7': 'c',
        '\u1E09': 'c',
        '\u0188': 'c',
        '\u023C': 'c',
        '\uA73F': 'c',
        '\u2184': 'c',
        '\u24D3': 'd',
        '\uFF44': 'd',
        '\u1E0B': 'd',
        '\u010F': 'd',
        '\u1E0D': 'd',
        '\u1E11': 'd',
        '\u1E13': 'd',
        '\u1E0F': 'd',
        '\u0111': 'd',
        '\u018C': 'd',
        '\u0256': 'd',
        '\u0257': 'd',
        '\uA77A': 'd',
        '\u01F3': 'dz',
        '\u01C6': 'dz',
        '\u24D4': 'e',
        '\uFF45': 'e',
        '\u00E8': 'e',
        '\u00E9': 'e',
        '\u00EA': 'e',
        '\u1EC1': 'e',
        '\u1EBF': 'e',
        '\u1EC5': 'e',
        '\u1EC3': 'e',
        '\u1EBD': 'e',
        '\u0113': 'e',
        '\u1E15': 'e',
        '\u1E17': 'e',
        '\u0115': 'e',
        '\u0117': 'e',
        '\u00EB': 'e',
        '\u1EBB': 'e',
        '\u011B': 'e',
        '\u0205': 'e',
        '\u0207': 'e',
        '\u1EB9': 'e',
        '\u1EC7': 'e',
        '\u0229': 'e',
        '\u1E1D': 'e',
        '\u0119': 'e',
        '\u1E19': 'e',
        '\u1E1B': 'e',
        '\u0247': 'e',
        '\u025B': 'e',
        '\u01DD': 'e',
        '\u24D5': 'f',
        '\uFF46': 'f',
        '\u1E1F': 'f',
        '\u0192': 'f',
        '\uA77C': 'f',
        '\u24D6': 'g',
        '\uFF47': 'g',
        '\u01F5': 'g',
        '\u011D': 'g',
        '\u1E21': 'g',
        '\u011F': 'g',
        '\u0121': 'g',
        '\u01E7': 'g',
        '\u0123': 'g',
        '\u01E5': 'g',
        '\u0260': 'g',
        '\uA7A1': 'g',
        '\u1D79': 'g',
        '\uA77F': 'g',
        '\u24D7': 'h',
        '\uFF48': 'h',
        '\u0125': 'h',
        '\u1E23': 'h',
        '\u1E27': 'h',
        '\u021F': 'h',
        '\u1E25': 'h',
        '\u1E29': 'h',
        '\u1E2B': 'h',
        '\u1E96': 'h',
        '\u0127': 'h',
        '\u2C68': 'h',
        '\u2C76': 'h',
        '\u0265': 'h',
        '\u0195': 'hv',
        '\u24D8': 'i',
        '\uFF49': 'i',
        '\u00EC': 'i',
        '\u00ED': 'i',
        '\u00EE': 'i',
        '\u0129': 'i',
        '\u012B': 'i',
        '\u012D': 'i',
        '\u00EF': 'i',
        '\u1E2F': 'i',
        '\u1EC9': 'i',
        '\u01D0': 'i',
        '\u0209': 'i',
        '\u020B': 'i',
        '\u1ECB': 'i',
        '\u012F': 'i',
        '\u1E2D': 'i',
        '\u0268': 'i',
        '\u0131': 'i',
        '\u24D9': 'j',
        '\uFF4A': 'j',
        '\u0135': 'j',
        '\u01F0': 'j',
        '\u0249': 'j',
        '\u24DA': 'k',
        '\uFF4B': 'k',
        '\u1E31': 'k',
        '\u01E9': 'k',
        '\u1E33': 'k',
        '\u0137': 'k',
        '\u1E35': 'k',
        '\u0199': 'k',
        '\u2C6A': 'k',
        '\uA741': 'k',
        '\uA743': 'k',
        '\uA745': 'k',
        '\uA7A3': 'k',
        '\u24DB': 'l',
        '\uFF4C': 'l',
        '\u0140': 'l',
        '\u013A': 'l',
        '\u013E': 'l',
        '\u1E37': 'l',
        '\u1E39': 'l',
        '\u013C': 'l',
        '\u1E3D': 'l',
        '\u1E3B': 'l',
        '\u017F': 'l',
        '\u0142': 'l',
        '\u019A': 'l',
        '\u026B': 'l',
        '\u2C61': 'l',
        '\uA749': 'l',
        '\uA781': 'l',
        '\uA747': 'l',
        '\u01C9': 'lj',
        '\u24DC': 'm',
        '\uFF4D': 'm',
        '\u1E3F': 'm',
        '\u1E41': 'm',
        '\u1E43': 'm',
        '\u0271': 'm',
        '\u026F': 'm',
        '\u24DD': 'n',
        '\uFF4E': 'n',
        '\u01F9': 'n',
        '\u0144': 'n',
        '\u00F1': 'n',
        '\u1E45': 'n',
        '\u0148': 'n',
        '\u1E47': 'n',
        '\u0146': 'n',
        '\u1E4B': 'n',
        '\u1E49': 'n',
        '\u019E': 'n',
        '\u0272': 'n',
        '\u0149': 'n',
        '\uA791': 'n',
        '\uA7A5': 'n',
        '\u01CC': 'nj',
        '\u24DE': 'o',
        '\uFF4F': 'o',
        '\u00F2': 'o',
        '\u00F3': 'o',
        '\u00F4': 'o',
        '\u1ED3': 'o',
        '\u1ED1': 'o',
        '\u1ED7': 'o',
        '\u1ED5': 'o',
        '\u00F5': 'o',
        '\u1E4D': 'o',
        '\u022D': 'o',
        '\u1E4F': 'o',
        '\u014D': 'o',
        '\u1E51': 'o',
        '\u1E53': 'o',
        '\u014F': 'o',
        '\u022F': 'o',
        '\u0231': 'o',
        '\u00F6': 'o',
        '\u022B': 'o',
        '\u1ECF': 'o',
        '\u0151': 'o',
        '\u01D2': 'o',
        '\u020D': 'o',
        '\u020F': 'o',
        '\u01A1': 'o',
        '\u1EDD': 'o',
        '\u1EDB': 'o',
        '\u1EE1': 'o',
        '\u1EDF': 'o',
        '\u1EE3': 'o',
        '\u1ECD': 'o',
        '\u1ED9': 'o',
        '\u01EB': 'o',
        '\u01ED': 'o',
        '\u00F8': 'o',
        '\u01FF': 'o',
        '\u0254': 'o',
        '\uA74B': 'o',
        '\uA74D': 'o',
        '\u0275': 'o',
        '\u01A3': 'oi',
        '\u0223': 'ou',
        '\uA74F': 'oo',
        '\u24DF': 'p',
        '\uFF50': 'p',
        '\u1E55': 'p',
        '\u1E57': 'p',
        '\u01A5': 'p',
        '\u1D7D': 'p',
        '\uA751': 'p',
        '\uA753': 'p',
        '\uA755': 'p',
        '\u24E0': 'q',
        '\uFF51': 'q',
        '\u024B': 'q',
        '\uA757': 'q',
        '\uA759': 'q',
        '\u24E1': 'r',
        '\uFF52': 'r',
        '\u0155': 'r',
        '\u1E59': 'r',
        '\u0159': 'r',
        '\u0211': 'r',
        '\u0213': 'r',
        '\u1E5B': 'r',
        '\u1E5D': 'r',
        '\u0157': 'r',
        '\u1E5F': 'r',
        '\u024D': 'r',
        '\u027D': 'r',
        '\uA75B': 'r',
        '\uA7A7': 'r',
        '\uA783': 'r',
        '\u24E2': 's',
        '\uFF53': 's',
        '\u00DF': 's',
        '\u015B': 's',
        '\u1E65': 's',
        '\u015D': 's',
        '\u1E61': 's',
        '\u0161': 's',
        '\u1E67': 's',
        '\u1E63': 's',
        '\u1E69': 's',
        '\u0219': 's',
        '\u015F': 's',
        '\u023F': 's',
        '\uA7A9': 's',
        '\uA785': 's',
        '\u1E9B': 's',
        '\u24E3': 't',
        '\uFF54': 't',
        '\u1E6B': 't',
        '\u1E97': 't',
        '\u0165': 't',
        '\u1E6D': 't',
        '\u021B': 't',
        '\u0163': 't',
        '\u1E71': 't',
        '\u1E6F': 't',
        '\u0167': 't',
        '\u01AD': 't',
        '\u0288': 't',
        '\u2C66': 't',
        '\uA787': 't',
        '\uA729': 'tz',
        '\u24E4': 'u',
        '\uFF55': 'u',
        '\u00F9': 'u',
        '\u00FA': 'u',
        '\u00FB': 'u',
        '\u0169': 'u',
        '\u1E79': 'u',
        '\u016B': 'u',
        '\u1E7B': 'u',
        '\u016D': 'u',
        '\u00FC': 'u',
        '\u01DC': 'u',
        '\u01D8': 'u',
        '\u01D6': 'u',
        '\u01DA': 'u',
        '\u1EE7': 'u',
        '\u016F': 'u',
        '\u0171': 'u',
        '\u01D4': 'u',
        '\u0215': 'u',
        '\u0217': 'u',
        '\u01B0': 'u',
        '\u1EEB': 'u',
        '\u1EE9': 'u',
        '\u1EEF': 'u',
        '\u1EED': 'u',
        '\u1EF1': 'u',
        '\u1EE5': 'u',
        '\u1E73': 'u',
        '\u0173': 'u',
        '\u1E77': 'u',
        '\u1E75': 'u',
        '\u0289': 'u',
        '\u24E5': 'v',
        '\uFF56': 'v',
        '\u1E7D': 'v',
        '\u1E7F': 'v',
        '\u028B': 'v',
        '\uA75F': 'v',
        '\u028C': 'v',
        '\uA761': 'vy',
        '\u24E6': 'w',
        '\uFF57': 'w',
        '\u1E81': 'w',
        '\u1E83': 'w',
        '\u0175': 'w',
        '\u1E87': 'w',
        '\u1E85': 'w',
        '\u1E98': 'w',
        '\u1E89': 'w',
        '\u2C73': 'w',
        '\u24E7': 'x',
        '\uFF58': 'x',
        '\u1E8B': 'x',
        '\u1E8D': 'x',
        '\u24E8': 'y',
        '\uFF59': 'y',
        '\u1EF3': 'y',
        '\u00FD': 'y',
        '\u0177': 'y',
        '\u1EF9': 'y',
        '\u0233': 'y',
        '\u1E8F': 'y',
        '\u00FF': 'y',
        '\u1EF7': 'y',
        '\u1E99': 'y',
        '\u1EF5': 'y',
        '\u01B4': 'y',
        '\u024F': 'y',
        '\u1EFF': 'y',
        '\u24E9': 'z',
        '\uFF5A': 'z',
        '\u017A': 'z',
        '\u1E91': 'z',
        '\u017C': 'z',
        '\u017E': 'z',
        '\u1E93': 'z',
        '\u1E95': 'z',
        '\u01B6': 'z',
        '\u0225': 'z',
        '\u0240': 'z',
        '\u2C6C': 'z',
        '\uA763': 'z',
        '\u0386': '\u0391',
        '\u0388': '\u0395',
        '\u0389': '\u0397',
        '\u038A': '\u0399',
        '\u03AA': '\u0399',
        '\u038C': '\u039F',
        '\u038E': '\u03A5',
        '\u03AB': '\u03A5',
        '\u038F': '\u03A9',
        '\u03AC': '\u03B1',
        '\u03AD': '\u03B5',
        '\u03AE': '\u03B7',
        '\u03AF': '\u03B9',
        '\u03CA': '\u03B9',
        '\u0390': '\u03B9',
        '\u03CC': '\u03BF',
        '\u03CD': '\u03C5',
        '\u03CB': '\u03C5',
        '\u03B0': '\u03C5',
        '\u03C9': '\u03C9',
        '\u03C2': '\u03C3'
    };
    DataUtil.fnOperators = {
        /**
         * Returns true when the actual input is equal to the given input.
         *
         * @param {string|number|boolean} actual
         * @param {string|number|boolean} expected
         * @param {boolean} ignoreCase?
         * @param {boolean} ignoreAccent?
         * @param ignoreCase
         * @param ignoreAccent
         */
        equal: function (actual, expected, ignoreCase, ignoreAccent) {
            if (ignoreAccent) {
                actual = DataUtil.ignoreDiacritics(actual);
                expected = DataUtil.ignoreDiacritics(expected);
            }
            if (ignoreCase) {
                return DataUtil.toLowerCase(actual) === DataUtil.toLowerCase(expected);
            }
            return actual === expected;
        },
        /**
         * Returns true when the actual input is not equal to the given input.
         *
         * @param {string|number|boolean} actual
         * @param {string|number|boolean} expected
         * @param {boolean} ignoreCase?
         * @param ignoreCase
         * @param ignoreAccent
         */
        notequal: function (actual, expected, ignoreCase, ignoreAccent) {
            if (ignoreAccent) {
                actual = DataUtil.ignoreDiacritics(actual);
                expected = DataUtil.ignoreDiacritics(expected);
            }
            return !DataUtil.fnOperators.equal(actual, expected, ignoreCase);
        },
        /**
         * Returns true when the actual input is less than to the given input.
         *
         * @param {string|number|boolean} actual
         * @param {string|number|boolean} expected
         * @param {boolean} ignoreCase?
         * @param ignoreCase
         */
        lessthan: function (actual, expected, ignoreCase) {
            if (ignoreCase) {
                return DataUtil.toLowerCase(actual) < DataUtil.toLowerCase(expected);
            }
            if (isNullOrUndefined(actual)) {
                actual = undefined;
            }
            return actual < expected;
        },
        /**
         * Returns true when the actual input is greater than to the given input.
         *
         * @param {string|number|boolean} actual
         * @param {string|number|boolean} expected
         * @param {boolean} ignoreCase?
         * @param ignoreCase
         */
        greaterthan: function (actual, expected, ignoreCase) {
            if (ignoreCase) {
                return DataUtil.toLowerCase(actual) > DataUtil.toLowerCase(expected);
            }
            return actual > expected;
        },
        /**
         * Returns true when the actual input is less than or equal to the given input.
         *
         * @param {string|number|boolean} actual
         * @param {string|number|boolean} expected
         * @param {boolean} ignoreCase?
         * @param ignoreCase
         */
        lessthanorequal: function (actual, expected, ignoreCase) {
            if (ignoreCase) {
                return DataUtil.toLowerCase(actual) <= DataUtil.toLowerCase(expected);
            }
            if (isNullOrUndefined(actual)) {
                actual = undefined;
            }
            return actual <= expected;
        },
        /**
         * Returns true when the actual input is greater than or equal to the given input.
         *
         * @param {string|number|boolean} actual
         * @param {string|number|boolean} expected
         * @param {boolean} ignoreCase?
         * @param ignoreCase
         */
        greaterthanorequal: function (actual, expected, ignoreCase) {
            if (ignoreCase) {
                return DataUtil.toLowerCase(actual) >= DataUtil.toLowerCase(expected);
            }
            return actual >= expected;
        },
        /**
         * Returns true when the actual input contains the given string.
         *
         * @param {string|number} actual
         * @param {string|number} expected
         * @param {boolean} ignoreCase?
         * @param ignoreCase
         * @param ignoreAccent
         */
        contains: function (actual, expected, ignoreCase, ignoreAccent) {
            if (ignoreAccent) {
                actual = DataUtil.ignoreDiacritics(actual);
                expected = DataUtil.ignoreDiacritics(expected);
            }
            if (ignoreCase) {
                return !isNullOrUndefined(actual) && !isNullOrUndefined(expected) &&
                    DataUtil.toLowerCase(actual).indexOf(DataUtil.toLowerCase(expected)) !== -1;
            }
            return !isNullOrUndefined(actual) && !isNullOrUndefined(expected) &&
                actual.toString().indexOf(expected) !== -1;
        },
        /**
         * Returns true when the actual input not contains the given string.
         *
         * @param  {string|number} actual
         * @param  {string|number} expected
         * @param  {boolean} ignoreCase?
         */
        doesnotcontain: function (actual, expected, ignoreCase, ignoreAccent) {
            if (ignoreAccent) {
                actual = DataUtil.ignoreDiacritics(actual);
                expected = DataUtil.ignoreDiacritics(expected);
            }
            if (ignoreCase) {
                return !isNullOrUndefined(actual) && !isNullOrUndefined(expected) &&
                    DataUtil.toLowerCase(actual).indexOf(DataUtil.toLowerCase(expected)) === -1;
            }
            return !isNullOrUndefined(actual) && !isNullOrUndefined(expected) &&
                actual.toString().indexOf(expected) === -1;
        },
        /**
         * Returns true when the given input value is not null.
         *
         * @param  {string|number} actual
         * @returns boolean
         */
        isnotnull: function (actual) {
            return actual !== null && actual !== undefined;
        },
        /**
         * Returns true when the given input value is null.
         *
         * @param  {string|number} actual
         * @returns boolean
         */
        isnull: function (actual) {
            return actual === null || actual === undefined;
        },
        /**
         * Returns true when the actual input starts with the given string
         *
         * @param {string} actual
         * @param {string} expected
         * @param {boolean} ignoreCase?
         * @param ignoreCase
         * @param ignoreAccent
         */
        startswith: function (actual, expected, ignoreCase, ignoreAccent) {
            if (ignoreAccent) {
                actual = DataUtil.ignoreDiacritics(actual);
                expected = DataUtil.ignoreDiacritics(expected);
            }
            if (ignoreCase) {
                return actual && expected && DataUtil.startsWith(DataUtil.toLowerCase(actual), DataUtil.toLowerCase(expected));
            }
            return actual && expected && DataUtil.startsWith(actual, expected);
        },
        /**
         * Returns true when the actual input not starts with the given string
         *
         * @param  {string} actual
         * @param  {string} expected
         * @param  {boolean} ignoreCase?
         */
        doesnotstartwith: function (actual, expected, ignoreCase, ignoreAccent) {
            if (ignoreAccent) {
                actual = DataUtil.ignoreDiacritics(actual);
                expected = DataUtil.ignoreDiacritics(expected);
            }
            if (ignoreCase) {
                return actual && expected && DataUtil.notStartsWith(DataUtil.toLowerCase(actual), DataUtil.toLowerCase(expected));
            }
            return actual && expected && DataUtil.notStartsWith(actual, expected);
        },
        /**
         * Returns true when the actual input like with the given string.
         *
         * @param  {string} actual
         * @param  {string} expected
         * @param  {boolean} ignoreCase?
         */
        like: function (actual, expected, ignoreCase, ignoreAccent) {
            if (ignoreAccent) {
                actual = DataUtil.ignoreDiacritics(actual);
                expected = DataUtil.ignoreDiacritics(expected);
            }
            if (ignoreCase) {
                return actual && expected && DataUtil.like(DataUtil.toLowerCase(actual), DataUtil.toLowerCase(expected));
            }
            return actual && expected && DataUtil.like(actual, expected);
        },
        /**
         * Returns true when the given input value is empty.
         *
         * @param  {string|number} actual
         * @returns boolean
         */
        isempty: function (actual) {
            return actual === undefined || actual === '';
        },
        /**
         * Returns true when the given input value is not empty.
         *
         * @param  {string|number} actual
         * @returns boolean
         */
        isnotempty: function (actual) {
            return actual !== undefined && actual !== '';
        },
        /**
         * Returns true when the actual input pattern(wildcard) matches with the given string.
         *
         * @param  {string|Date} actual
         * @param  {string} expected
         * @param  {boolean} ignoreCase?
         */
        wildcard: function (actual, expected, ignoreCase, ignoreAccent) {
            if (ignoreAccent) {
                actual = DataUtil.ignoreDiacritics(actual);
                expected = DataUtil.ignoreDiacritics(expected);
            }
            if (ignoreCase) {
                return (actual || typeof actual === 'boolean') && expected && typeof actual !== 'object' &&
                    DataUtil.wildCard(DataUtil.toLowerCase(actual), DataUtil.toLowerCase(expected));
            }
            return (actual || typeof actual === 'boolean') && expected && DataUtil.wildCard(actual, expected);
        },
        /**
         * Returns true when the actual input ends with the given string.
         *
         * @param {string} actual
         * @param {string} expected
         * @param {boolean} ignoreCase?
         * @param ignoreCase
         * @param ignoreAccent
         */
        endswith: function (actual, expected, ignoreCase, ignoreAccent) {
            if (ignoreAccent) {
                actual = DataUtil.ignoreDiacritics(actual);
                expected = DataUtil.ignoreDiacritics(expected);
            }
            if (ignoreCase) {
                return actual && expected && DataUtil.endsWith(DataUtil.toLowerCase(actual), DataUtil.toLowerCase(expected));
            }
            return actual && expected && DataUtil.endsWith(actual, expected);
        },
        /**
         * Returns true when the actual input not ends with the given string.
         *
         * @param  {string} actual
         * @param  {string} expected
         * @param  {boolean} ignoreCase?
         */
        doesnotendwith: function (actual, expected, ignoreCase, ignoreAccent) {
            if (ignoreAccent) {
                actual = DataUtil.ignoreDiacritics(actual);
                expected = DataUtil.ignoreDiacritics(expected);
            }
            if (ignoreCase) {
                return actual && expected && DataUtil.notEndsWith(DataUtil.toLowerCase(actual), DataUtil.toLowerCase(expected));
            }
            return actual && expected && DataUtil.notEndsWith(actual, expected);
        },
        /**
         * It will return the filter operator based on the filter symbol.
         *
         * @param  {string} operator
         * @hidden
         */
        processSymbols: function (operator) {
            var fnName = DataUtil.operatorSymbols[operator];
            if (fnName) {
                var fn = DataUtil.fnOperators[fnName];
                return fn;
            }
            return DataUtil.throwError('Query - Process Operator : Invalid operator');
        },
        /**
         * It will return the valid filter operator based on the specified operators.
         *
         * @param  {string} operator
         * @hidden
         */
        processOperator: function (operator) {
            var fn = DataUtil.fnOperators[operator];
            if (fn) {
                return fn;
            }
            return DataUtil.fnOperators.processSymbols(operator);
        },
        /**
         * Checks if the specified value exists in the given array, with optional case and accent insensitivity.
         *
         * @param {string | number} actual - The value to check.
         * @param {Array<string | number>} expectedArray - The array to search within.
         * @param {boolean} [ignoreCase] - Whether to perform a case-insensitive comparison.
         * @param {boolean} [ignoreAccent] - Whether to ignore accents/diacritics.
         * @returns {boolean} `true` if the value is found, otherwise `false`.
         */
        in: function (actual, expectedArray, ignoreCase, ignoreAccent) {
            if (ignoreAccent) {
                actual = DataUtil.ignoreDiacritics(actual);
                expectedArray = DataUtil.ignoreDiacriticsForArrays(expectedArray);
            }
            if (ignoreCase) {
                return !isNullOrUndefined(actual) && expectedArray && expectedArray.length > 0 && expectedArray
                    .map(function (item) { return DataUtil.toLowerCase(item); }).indexOf(DataUtil.toLowerCase(actual)) > -1;
            }
            if (actual instanceof Date) {
                return !isNullOrUndefined(actual) && expectedArray && expectedArray.length > 0 && Array.isArray(expectedArray) &&
                    expectedArray.some(function (item) { return item instanceof Date && item.getTime() === actual.getTime(); });
            }
            return !isNullOrUndefined(actual) && expectedArray && expectedArray.length > 0 && expectedArray.indexOf(actual) > -1;
        },
        /**
         * Checks if the specified value is not present in the given array, with optional case and accent insensitivity.
         *
         * @param {string | number} actual - The value to check.
         * @param {Array<string | number>} expectedArray - The array to search within.
         * @param {boolean} [ignoreCase] - Whether to perform a case-insensitive comparison.
         * @param {boolean} [ignoreAccent] - Whether to ignore accents/diacritics.
         * @returns {boolean} `true` if the value is not found, otherwise `false`.
         */
        notin: function (actual, expectedArray, ignoreCase, ignoreAccent) {
            if (ignoreAccent) {
                actual = DataUtil.ignoreDiacritics(actual);
                expectedArray = DataUtil.ignoreDiacriticsForArrays(expectedArray);
            }
            if (ignoreCase) {
                return !isNullOrUndefined(actual) && expectedArray && expectedArray.length > 0 && expectedArray
                    .map(function (item) { return DataUtil.toLowerCase(item); }).indexOf(DataUtil.toLowerCase(actual)) === -1;
            }
            if (actual instanceof Date) {
                return !isNullOrUndefined(actual) && expectedArray && expectedArray.length > 0 && Array.isArray(expectedArray) &&
                    expectedArray.every(function (item) { return !(item instanceof Date) || item.getTime() !== actual.getTime(); });
            }
            return !isNullOrUndefined(actual) && expectedArray && expectedArray.length > 0 && expectedArray.indexOf(actual) === -1;
        }
    };
    /**
     * To perform the parse operation on JSON data, like convert to string from JSON or convert to JSON from string.
     */
    DataUtil.parse = {
        /**
         * Parse the given string to the plain JavaScript object.
         *
         * @param  {string|Object|Object[]} jsonText
         */
        parseJson: function (jsonText) {
            if (typeof jsonText === 'string' && (/^[\s]*\[|^[\s]*\{(.)+:/g.test(jsonText) || jsonText.indexOf('"') === -1)) {
                jsonText = JSON.parse(jsonText, DataUtil.parse.jsonReviver);
            }
            else if (jsonText instanceof Array) {
                DataUtil.parse.iterateAndReviveArray(jsonText);
            }
            else if (typeof jsonText === 'object' && jsonText !== null) {
                DataUtil.parse.iterateAndReviveJson(jsonText);
            }
            return jsonText;
        },
        /**
         * It will perform on array of values.
         *
         * @param  {string[]|Object[]} array
         * @hidden
         */
        iterateAndReviveArray: function (array) {
            for (var i = 0; i < array.length; i++) {
                if (typeof array[i] === 'object' && array[i] !== null) {
                    DataUtil.parse.iterateAndReviveJson(array[i]);
                    // eslint-disable-next-line no-useless-escape
                }
                else if (typeof array[i] === 'string' && (!/^[\s]*\[|^[\s]*\{(.)+:|\"/g.test(array[i]) ||
                    array[i].toString().indexOf('"') === -1)) {
                    array[i] = DataUtil.parse.jsonReviver('', array[i]);
                }
                else {
                    array[i] = DataUtil.parse.parseJson(array[i]);
                }
            }
        },
        /**
         * It will perform on JSON values
         *
         * @param  {JSON} json
         * @hidden
         */
        iterateAndReviveJson: function (json) {
            var value;
            var keys = Object.keys(json);
            for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var prop = keys_2[_i];
                if (DataUtil.startsWith(prop, '__')) {
                    continue;
                }
                value = json[prop];
                if (typeof value === 'object') {
                    if (value instanceof Array) {
                        DataUtil.parse.iterateAndReviveArray(value);
                    }
                    else if (value) {
                        DataUtil.parse.iterateAndReviveJson(value);
                    }
                }
                else {
                    json[prop] = DataUtil.parse.jsonReviver(json[prop], value);
                }
            }
        },
        /**
         * It will perform on JSON values
         *
         * @param  {string} field
         * @param  {string|Date} value
         * @hidden
         */
        jsonReviver: function (field, value) {
            if (typeof value === 'string') {
                // eslint-disable-next-line security/detect-unsafe-regex
                var ms = /^\/Date\(([+-]?[0-9]+)([+-][0-9]{4})?\)\/$/.exec(value);
                var offSet = DataUtil.timeZoneHandling ? DataUtil.serverTimezoneOffset : null;
                if (ms) {
                    return DataUtil.dateParse.toTimeZone(new Date(parseInt(ms[1], 10)), offSet, true);
                    // eslint-disable-next-line no-useless-escape, security/detect-unsafe-regex
                }
                else if (/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
                    var isUTC = value.indexOf('Z') > -1 || value.indexOf('z') > -1;
                    var arr = value.split(/[^0-9.]/);
                    if (isUTC) {
                        if (arr[5].indexOf('.') > -1) {
                            var secondsMs = arr[5].split('.');
                            arr[5] = secondsMs[0];
                            arr[6] = new Date(value).getUTCMilliseconds().toString();
                        }
                        else {
                            arr[6] = '00';
                        }
                        value = DataUtil.dateParse
                            .toTimeZone(new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), parseInt(arr[4], 10), parseInt(arr[5] ? arr[5] : '00', 10), parseInt(arr[6], 10)), DataUtil.serverTimezoneOffset, false);
                    }
                    else {
                        var utcFormat = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), parseInt(arr[4], 10), parseInt(arr[5] ? arr[5] : '00', 10));
                        var hrs = parseInt(arr[6], 10);
                        var mins = parseInt(arr[7], 10);
                        if (isNaN(hrs) && isNaN(mins)) {
                            return utcFormat;
                        }
                        if (value.indexOf('+') > -1) {
                            utcFormat.setHours(utcFormat.getHours() - hrs, utcFormat.getMinutes() - mins);
                        }
                        else {
                            utcFormat.setHours(utcFormat.getHours() + hrs, utcFormat.getMinutes() + mins);
                        }
                        value = DataUtil.dateParse
                            .toTimeZone(utcFormat, DataUtil.serverTimezoneOffset, false);
                    }
                    if (DataUtil.serverTimezoneOffset == null) {
                        value = DataUtil.dateParse.addSelfOffset(value);
                    }
                }
            }
            return value;
        },
        /**
         * Check wheather the given value is JSON or not.
         *
         * @param  {Object[]} jsonData
         */
        isJson: function (jsonData) {
            if (typeof jsonData[0] === 'string') {
                return jsonData;
            }
            return DataUtil.parse.parseJson(jsonData);
        },
        /**
         * Checks wheather the given value is GUID or not.
         *
         * @param  {string} value
         */
        isGuid: function (value) {
            // eslint-disable-next-line security/detect-unsafe-regex
            var regex = /[A-Fa-f0-9]{8}(?:-[A-Fa-f0-9]{4}){3}-[A-Fa-f0-9]{12}/i;
            var match = regex.exec(value);
            return match != null;
        },
        /**
         * The method used to replace the value based on the type.
         *
         * @param  {Object} value
         * @param  {boolean} stringify
         * @hidden
         */
        replacer: function (value, stringify) {
            if (DataUtil.isPlainObject(value)) {
                return DataUtil.parse.jsonReplacer(value, stringify);
            }
            if (value instanceof Array) {
                return DataUtil.parse.arrayReplacer(value);
            }
            if (value instanceof Date) {
                return DataUtil.parse.jsonReplacer({ val: value }, stringify).val;
            }
            return value;
        },
        /**
         * It will replace the JSON value.
         *
         * @param {string} key
         * @param {Object} val
         * @param stringify
         * @hidden
         */
        jsonReplacer: function (val, stringify) {
            var value;
            var keys = Object.keys(val);
            for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
                var prop = keys_3[_i];
                value = val[prop];
                if (!(value instanceof Date)) {
                    continue;
                }
                var d = value;
                if (DataUtil.serverTimezoneOffset == null) {
                    val[prop] = DataUtil.dateParse.toTimeZone(d, null).toJSON();
                }
                else {
                    d = new Date(+d + DataUtil.serverTimezoneOffset * 3600000);
                    val[prop] = DataUtil.dateParse.toTimeZone(DataUtil.dateParse.addSelfOffset(d), null).toJSON();
                }
            }
            return val;
        },
        /**
         * It will replace the Array of value.
         *
         * @param  {string} key
         * @param  {Object[]} val
         * @hidden
         */
        arrayReplacer: function (val) {
            for (var i = 0; i < val.length; i++) {
                if (DataUtil.isPlainObject(val[i])) {
                    val[i] = DataUtil.parse.jsonReplacer(val[i]);
                }
                else if (val[i] instanceof Date) {
                    val[i] = DataUtil.parse.jsonReplacer({ date: val[i] }).date;
                }
            }
            return val;
        },
        /**
         * It will replace the Date object with respective to UTC format value.
         *
         * @param  {string} key
         * @param  {any} value
         * @hidden
         */
        /* eslint-disable @typescript-eslint/no-explicit-any */
        /* tslint:disable-next-line:no-any */
        jsonDateReplacer: function (key, value) {
            /* eslint-enable @typescript-eslint/no-explicit-any */
            if (key === 'value' && value) {
                if (typeof value === 'string') {
                    // eslint-disable-next-line security/detect-unsafe-regex
                    var ms = /^\/Date\(([+-]?[0-9]+)([+-][0-9]{4})?\)\/$/.exec(value);
                    if (ms) {
                        value = DataUtil.dateParse.toTimeZone(new Date(parseInt(ms[1], 10)), null, true);
                        // eslint-disable-next-line no-useless-escape, security/detect-unsafe-regex
                    }
                    else if (/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
                        var arr = value.split(/[^0-9]/);
                        value = DataUtil.dateParse
                            .toTimeZone(new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), parseInt(arr[4], 10), parseInt(arr[5], 10)), null, true);
                    }
                }
                if (value instanceof Date) {
                    value = DataUtil.dateParse.addSelfOffset(value);
                    if (DataUtil.serverTimezoneOffset === null) {
                        return DataUtil.dateParse.toTimeZone(DataUtil.dateParse.addSelfOffset(value), null).toJSON();
                    }
                    else {
                        value = DataUtil.dateParse.toTimeZone(value, ((value.getTimezoneOffset() / 60)
                            - DataUtil.serverTimezoneOffset), false);
                        return value.toJSON();
                    }
                }
            }
            return value;
        }
    };
    /**
     * @hidden
     */
    DataUtil.dateParse = {
        addSelfOffset: function (input) {
            return new Date(+input - (input.getTimezoneOffset() * 60000));
        },
        toUTC: function (input) {
            return new Date(+input + (input.getTimezoneOffset() * 60000));
        },
        toTimeZone: function (input, offset, utc) {
            if (offset === null) {
                return input;
            }
            var unix = utc ? DataUtil.dateParse.toUTC(input) : input;
            return new Date(+unix - (offset * 3600000));
        },
        toLocalTime: function (input) {
            var datefn = input;
            var timeZone = -datefn.getTimezoneOffset();
            var differenceString = timeZone >= 0 ? '+' : '-';
            var localtimefn = function (num) {
                var norm = Math.floor(Math.abs(num));
                return (norm < 10 ? '0' : '') + norm;
            };
            var val = datefn.getFullYear() + '-' + localtimefn(datefn.getMonth() + 1) + '-' + localtimefn(datefn.getDate()) +
                'T' + localtimefn(datefn.getHours()) +
                ':' + localtimefn(datefn.getMinutes()) +
                ':' + localtimefn(datefn.getSeconds()) +
                differenceString + localtimefn(timeZone / 60) +
                ':' + localtimefn(timeZone % 60);
            return val;
        }
    };
    return DataUtil;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var consts$1 = { GroupGuid: '{271bbba0-1ee7}' };
/**
 * Adaptors are specific data source type aware interfaces that are used by DataManager to communicate with DataSource.
 * This is the base adaptor class that other adaptors can extend.
 *
 * @hidden
 */
var Adaptor = /** @class */ (function () {
    /**
     * Constructor for Adaptor class
     *
     * @param {DataOptions} ds?
     * @param ds
     * @hidden
     * @returns aggregates
     */
    function Adaptor(ds) {
        // common options for all the adaptors
        this.options = {
            from: 'table',
            requestType: 'json',
            sortBy: 'sorted',
            select: 'select',
            skip: 'skip',
            group: 'group',
            take: 'take',
            search: 'search',
            count: 'requiresCounts',
            where: 'where',
            aggregates: 'aggregates',
            expand: 'expand'
        };
        /**
         * Specifies the type of adaptor.
         *
         * @default Adaptor
         */
        this.type = Adaptor;
        this.dataSource = ds;
        this.pvt = {};
    }
    /**
     * Returns the data from the query processing.
     *
     * @param {Object} data
     * @param {DataOptions} ds?
     * @param {Query} query?
     * @param {Request} xhr?
     * @param ds
     * @param query
     * @param xhr
     * @returns Object
     */
    Adaptor.prototype.processResponse = function (data, ds, query, xhr) {
        return data;
    };
    return Adaptor;
}());
/**
 * JsonAdaptor is used to process JSON data. It contains methods to process the given JSON data based on the queries.
 *
 * @hidden
 */
var JsonAdaptor = /** @class */ (function (_super) {
    __extends(JsonAdaptor, _super);
    function JsonAdaptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Process the JSON data based on the provided queries.
     *
     * @param  {DataManager} dataManager
     * @param  {Query} query
     * @returns Object
     */
    JsonAdaptor.prototype.processQuery = function (dataManager, query) {
        var result = dataManager.dataSource.json.slice(0);
        var count = result.length;
        var countFlg = true;
        var ret;
        var key;
        var lazyLoad = {};
        var keyCount = 0;
        var group = [];
        var sort = [];
        var page;
        for (var i = 0; i < query.lazyLoad.length; i++) {
            keyCount++;
            lazyLoad[query.lazyLoad[i].key] = query.lazyLoad[i].value;
        }
        var agg = {};
        var isGroupByFormat = false;
        if (query.lazyLoad.length) {
            for (var i = 0; i < query.queries.length; i++) {
                key = query.queries[i];
                if (key.fn === 'onGroup' && !isNullOrUndefined(key.e.format)) {
                    isGroupByFormat = true;
                    break;
                }
            }
        }
        for (var i = 0; i < query.queries.length; i++) {
            key = query.queries[i];
            if ((key.fn === 'onPage' || key.fn === 'onGroup' || (key.fn === 'onSortBy' && !isGroupByFormat)) && query.lazyLoad.length) {
                if (key.fn === 'onGroup') {
                    group.push(key.e);
                }
                if (key.fn === 'onPage') {
                    page = key.e;
                }
                if (key.fn === 'onSortBy') {
                    sort.unshift(key.e);
                }
                continue;
            }
            ret = this[key.fn].call(this, result, key.e, query);
            if (key.fn === 'onAggregates') {
                agg[key.e.field + ' - ' + key.e.type] = ret;
            }
            else {
                result = ret !== undefined ? ret : result;
            }
            if (key.fn === 'onPage' || key.fn === 'onSkip' || key.fn === 'onTake' || key.fn === 'onRange') {
                countFlg = false;
            }
            if (countFlg) {
                count = result.length;
            }
        }
        if (keyCount) {
            var args = {
                query: query, lazyLoad: lazyLoad, result: result, group: group, page: page, sort: sort
            };
            var lazyLoadData = this.lazyLoadGroup(args);
            result = lazyLoadData.result;
            count = lazyLoadData.count;
        }
        if (query.isCountRequired) {
            result = {
                result: result,
                count: count,
                aggregates: agg
            };
        }
        return result;
    };
    /**
     * Perform lazy load grouping in JSON array based on the given query and lazy load details.
     *
     * @param  {LazyLoadGroupArgs} args
     */
    JsonAdaptor.prototype.lazyLoadGroup = function (args) {
        var count = 0;
        var agg = this.getAggregate(args.query);
        var result = args.result;
        if (!isNullOrUndefined(args.lazyLoad.onDemandGroupInfo)) {
            var req = args.lazyLoad.onDemandGroupInfo;
            for (var i = req.where.length - 1; i >= 0; i--) {
                result = this.onWhere(result, req.where[i]);
            }
            if (args.group.length !== req.level) {
                var field = args.group[req.level].fieldName;
                result = DataUtil.group(result, field, agg, null, null, args.group[req.level].comparer, true);
                if (args.sort.length) {
                    result = this.onSortBy(result, args.sort[parseInt(req.level.toString(), 10)], args.query, true);
                }
            }
            else {
                for (var i = args.sort.length - 1; i >= req.level; i--) {
                    result = this.onSortBy(result, args.sort[parseInt(i.toString(), 10)], args.query, false);
                }
            }
            count = result.length;
            var data = result;
            result = result.slice(req.skip);
            result = result.slice(0, req.take);
            if (args.group.length !== req.level) {
                this.formGroupResult(result, data);
            }
        }
        else {
            var field_1 = args.group[0].fieldName;
            result = DataUtil.group(result, field_1, agg, null, null, args.group[0].comparer, true);
            count = result.length;
            var data = result;
            if (args.sort.length) {
                var sort = args.sort.length > 1 ?
                    args.sort.filter(function (x) { return x.fieldName === field_1; })[0] : args.sort[0];
                result = this.onSortBy(result, sort, args.query, true);
            }
            if (args.page) {
                result = this.onPage(result, args.page, args.query);
            }
            this.formGroupResult(result, data);
        }
        return { result: result, count: count };
    };
    JsonAdaptor.prototype.formGroupResult = function (result, data) {
        if (result.length && data.length) {
            var uid = 'GroupGuid';
            var childLevel = 'childLevels';
            var level = 'level';
            var records = 'records';
            result[uid] = data[uid];
            result[childLevel] = data[childLevel];
            result[level] = data[level];
            result[records] = data[records];
        }
        return result;
    };
    /**
     * Separate the aggregate query from the given queries
     *
     * @param  {Query} query
     */
    JsonAdaptor.prototype.getAggregate = function (query) {
        var aggQuery = Query.filterQueries(query.queries, 'onAggregates');
        var agg = [];
        if (aggQuery.length) {
            var tmp = void 0;
            for (var i = 0; i < aggQuery.length; i++) {
                tmp = aggQuery[i].e;
                agg.push({ type: tmp.type, field: DataUtil.getValue(tmp.field, query) });
            }
        }
        return agg;
    };
    /**
     * Performs batch update in the JSON array which add, remove and update records.
     *
     * @param  {DataManager} dm
     * @param  {CrudOptions} changes
     * @param  {RemoteArgs} e
     */
    JsonAdaptor.prototype.batchRequest = function (dm, changes, e) {
        var i;
        var deletedRecordsLen = changes.deletedRecords.length;
        for (i = 0; i < changes.addedRecords.length; i++) {
            this.insert(dm, changes.addedRecords[i]);
        }
        for (i = 0; i < changes.changedRecords.length; i++) {
            this.update(dm, e.key, changes.changedRecords[i]);
        }
        for (i = 0; i < deletedRecordsLen; i++) {
            this.remove(dm, e.key, changes.deletedRecords[i]);
        }
        return changes;
    };
    /**
     * Performs filter operation with the given data and where query.
     *
     * @param {Object[]} ds
     * @param {{validate:Function}} e
     * @param e.validate
     */
    JsonAdaptor.prototype.onWhere = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.filter(function (obj) {
            if (e) {
                return e.validate(obj);
            }
        });
    };
    /**
     * Returns aggregate function based on the aggregate type.
     *
     * @param {Object[]} ds
     * @param e
     * @param {string} } type
     * @param e.field
     * @param e.type
     */
    JsonAdaptor.prototype.onAggregates = function (ds, e) {
        var fn = DataUtil.aggregates[e.type];
        if (!ds || !fn || ds.length === 0) {
            return null;
        }
        return fn(ds, e.field);
    };
    /**
     * Performs search operation based on the given query.
     *
     * @param  {Object[]} ds
     * @param  {QueryOptions} e
     */
    JsonAdaptor.prototype.onSearch = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        if (e.fieldNames.length === 0) {
            DataUtil.getFieldList(ds[0], e.fieldNames);
        }
        return ds.filter(function (obj) {
            for (var j = 0; j < e.fieldNames.length; j++) {
                if (e.comparer.call(obj, DataUtil.getObject(e.fieldNames[j], obj), e.searchKey, e.ignoreCase, e.ignoreAccent)) {
                    return true;
                }
            }
            return false;
        });
    };
    /**
     * Sort the data with given direction and field.
     *
     * @param {Object[]} ds
     * @param e
     * @param {Object} b
     * @param e.comparer
     * @param e.fieldName
     * @param query
     * @param isLazyLoadGroupSort
     */
    JsonAdaptor.prototype.onSortBy = function (ds, e, query, isLazyLoadGroupSort) {
        if (!ds || !ds.length) {
            return ds;
        }
        var fnCompare;
        var field = DataUtil.getValue(e.fieldName, query);
        if (!field) {
            return ds.sort(e.comparer);
        }
        if (field instanceof Array) {
            field = field.slice(0);
            for (var i = field.length - 1; i >= 0; i--) {
                if (!field[i]) {
                    continue;
                }
                fnCompare = e.comparer;
                if (DataUtil.endsWith(field[i], ' desc')) {
                    fnCompare = DataUtil.fnSort('descending');
                    field[i] = field[i].replace(' desc', '');
                }
                ds = DataUtil.sort(ds, field[i], fnCompare);
            }
            return ds;
        }
        return DataUtil.sort(ds, isLazyLoadGroupSort ? 'key' : field, e.comparer);
    };
    /**
     * Group the data based on the given query.
     *
     * @param  {Object[]} ds
     * @param  {QueryOptions} e
     * @param  {Query} query
     */
    JsonAdaptor.prototype.onGroup = function (ds, e, query) {
        if (!ds || !ds.length) {
            return ds;
        }
        var agg = this.getAggregate(query);
        return DataUtil.group(ds, DataUtil.getValue(e.fieldName, query), agg, null, null, e.comparer);
    };
    /**
     * Retrieves records based on the given page index and size.
     *
     * @param {Object[]} ds
     * @param e
     * @param {number} } pageIndex
     * @param e.pageSize
     * @param {Query} query
     * @param e.pageIndex
     */
    JsonAdaptor.prototype.onPage = function (ds, e, query) {
        var size = DataUtil.getValue(e.pageSize, query);
        var start = (DataUtil.getValue(e.pageIndex, query) - 1) * size;
        var end = start + size;
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(start, end);
    };
    /**
     * Retrieves records based on the given start and end index from query.
     *
     * @param {Object[]} ds
     * @param e
     * @param {number} } end
     * @param e.start
     * @param e.end
     */
    JsonAdaptor.prototype.onRange = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(DataUtil.getValue(e.start), DataUtil.getValue(e.end));
    };
    /**
     * Picks the given count of records from the top of the datasource.
     *
     * @param {Object[]} ds
     * @param {{nos:number}} e
     * @param e.nos
     */
    JsonAdaptor.prototype.onTake = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(0, DataUtil.getValue(e.nos));
    };
    /**
     * Skips the given count of records from the data source.
     *
     * @param {Object[]} ds
     * @param {{nos:number}} e
     * @param e.nos
     */
    JsonAdaptor.prototype.onSkip = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(DataUtil.getValue(e.nos));
    };
    /**
     * Selects specified columns from the data source.
     *
     * @param {Object[]} ds
     * @param {{fieldNames:string}} e
     * @param e.fieldNames
     */
    JsonAdaptor.prototype.onSelect = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return DataUtil.select(ds, DataUtil.getValue(e.fieldNames));
    };
    /**
     * Inserts new record in the table.
     *
     * @param {DataManager} dm
     * @param {Object} data
     * @param tableName
     * @param query
     * @param {number} position
     */
    JsonAdaptor.prototype.insert = function (dm, data, tableName, query, position) {
        if (isNullOrUndefined(position)) {
            return dm.dataSource.json.push(data);
        }
        else {
            return dm.dataSource.json.splice(position, 0, data);
        }
    };
    /**
     * Remove the data from the dataSource based on the key field value.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {Object} value
     * @param {string} tableName?
     * @param tableName
     * @returns null
     */
    JsonAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
        var ds = dm.dataSource.json;
        var i;
        if (typeof value === 'object' && !(value instanceof Date)) {
            value = DataUtil.getObject(keyField, value);
        }
        for (i = 0; i < ds.length; i++) {
            if (DataUtil.getObject(keyField, ds[i]) === value) {
                break;
            }
        }
        return i !== ds.length ? ds.splice(i, 1) : null;
    };
    /**
     * Updates existing record and saves the changes to the table.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {Object} value
     * @param {string} tableName?
     * @param tableName
     * @returns null
     */
    JsonAdaptor.prototype.update = function (dm, keyField, value, tableName) {
        var ds = dm.dataSource.json;
        var i;
        var key;
        if (!isNullOrUndefined(keyField)) {
            key = getValue(keyField, value);
        }
        for (i = 0; i < ds.length; i++) {
            if (!isNullOrUndefined(keyField) && (getValue(keyField, ds[i])) === key) {
                break;
            }
        }
        return i < ds.length ? merge(ds[i], value) : null;
    };
    return JsonAdaptor;
}(Adaptor));
/**
 * URL Adaptor of DataManager can be used when you are required to use remote service to retrieve data.
 * It interacts with server-side for all DataManager Queries and CRUD operations.
 *
 * @hidden
 */
var UrlAdaptor = /** @class */ (function (_super) {
    __extends(UrlAdaptor, _super);
    function UrlAdaptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Process the query to generate request body.
     *
     * @param {DataManager} dm
     * @param {Query} query
     * @param {Object[]} hierarchyFilters?
     * @param hierarchyFilters
     * @returns p
     */
    // tslint:disable-next-line:max-func-body-length
    UrlAdaptor.prototype.processQuery = function (dm, query, hierarchyFilters) {
        var queries = this.getQueryRequest(query);
        var singles = Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
        var params = query.params;
        var url = dm.dataSource.url;
        var temp;
        var skip;
        var take = null;
        var options = this.options;
        var request = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
        // calc Paging & Range
        if ('onPage' in singles) {
            temp = singles.onPage;
            skip = DataUtil.getValue(temp.pageIndex, query);
            take = DataUtil.getValue(temp.pageSize, query);
            skip = (skip - 1) * take;
        }
        else if ('onRange' in singles) {
            temp = singles.onRange;
            skip = temp.start;
            take = temp.end - temp.start;
        }
        // Sorting
        for (var i = 0; i < queries.sorts.length; i++) {
            temp = DataUtil.getValue(queries.sorts[i].e.fieldName, query);
            request.sorts.push(DataUtil.callAdaptorFunction(this, 'onEachSort', { name: temp, direction: queries.sorts[i].e.direction }, query));
        }
        // hierarchy
        if (hierarchyFilters) {
            temp = this.getFiltersFrom(hierarchyFilters, query);
            if (temp) {
                request.filters.push(DataUtil.callAdaptorFunction(this, 'onEachWhere', temp.toJson(), query));
            }
        }
        // Filters
        for (var i = 0; i < queries.filters.length; i++) {
            var res = DataUtil.callAdaptorFunction(this, 'onEachWhere', queries.filters[i].e.toJson(), query);
            if ((this.getModuleName &&
                this.getModuleName() === 'ODataV4Adaptor') &&
                !isNullOrUndefined(queries.filters[i].e.key) && queries.filters.length > 1) {
                res = '(' + res + ')';
            }
            request.filters.push(res);
            var keys_3 = typeof request.filters[i] === 'object' ? Object.keys(request.filters[i]) : [];
            for (var _i = 0, keys_1 = keys_3; _i < keys_1.length; _i++) {
                var prop = keys_1[_i];
                if (DataUtil.isNull((request)[prop])) {
                    delete request[prop];
                }
            }
        }
        // Searches
        for (var i = 0; i < queries.searches.length; i++) {
            temp = queries.searches[i].e;
            request.searches.push(DataUtil.callAdaptorFunction(this, 'onEachSearch', {
                fields: temp.fieldNames,
                operator: temp.operator,
                key: temp.searchKey,
                ignoreCase: temp.ignoreCase,
                ignoreAccent: temp.ignoreAccent
            }, query));
        }
        // Grouping
        for (var i = 0; i < queries.groups.length; i++) {
            request.groups.push(DataUtil.getValue(queries.groups[i].e.fieldName, query));
        }
        // aggregates
        for (var i = 0; i < queries.aggregates.length; i++) {
            temp = queries.aggregates[i].e;
            request.aggregates.push({ type: temp.type, field: DataUtil.getValue(temp.field, query) });
        }
        var req = {};
        this.getRequestQuery(options, query, singles, request, req);
        // Params
        DataUtil.callAdaptorFunction(this, 'addParams', { dm: dm, query: query, params: params, reqParams: req });
        if (query.lazyLoad.length) {
            for (var i = 0; i < query.lazyLoad.length; i++) {
                req[query.lazyLoad[i].key] = query.lazyLoad[i].value;
            }
        }
        // cleanup
        var keys = Object.keys(req);
        for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
            var prop = keys_2[_a];
            if (DataUtil.isNull(req[prop]) || req[prop] === '' || req[prop].length === 0) {
                delete req[prop];
            }
        }
        if (!(options.skip in req && options.take in req) && take !== null) {
            req[options.skip] = DataUtil.callAdaptorFunction(this, 'onSkip', skip, query);
            req[options.take] = DataUtil.callAdaptorFunction(this, 'onTake', take, query);
        }
        var p = this.pvt;
        this.pvt = {};
        if (this.options.requestType === 'json') {
            return {
                data: JSON.stringify(req, DataUtil.parse.jsonDateReplacer),
                url: url,
                pvtData: p,
                type: 'POST',
                contentType: 'application/json; charset=utf-8'
            };
        }
        temp = this.convertToQueryString(req, query, dm);
        temp = (dm.dataSource.url.indexOf('?') !== -1 ? '&' : '/') + temp;
        return {
            type: 'GET', url: temp.length ? url.replace(/\/*$/, temp) : url, pvtData: p
        };
    };
    UrlAdaptor.prototype.getRequestQuery = function (options, query, singles, request, request1) {
        var param = 'param';
        var req = request1;
        req[options.from] = query.fromTable;
        if (options.apply && query.distincts.length) {
            req[options.apply] = 'onDistinct' in this ? DataUtil.callAdaptorFunction(this, 'onDistinct', query.distincts) : '';
        }
        if (!query.distincts.length && options.expand) {
            req[options.expand] = 'onExpand' in this && 'onSelect' in singles ?
                DataUtil.callAdaptorFunction(this, 'onExpand', { selects: DataUtil.getValue(singles.onSelect.fieldNames, query), expands: query.expands }, query) : query.expands;
        }
        req[options.select] = 'onSelect' in singles && !query.distincts.length ?
            DataUtil.callAdaptorFunction(this, 'onSelect', DataUtil.getValue(singles.onSelect.fieldNames, query), query) : '';
        req[options.count] = query.isCountRequired ? DataUtil.callAdaptorFunction(this, 'onCount', query.isCountRequired, query) : '';
        req[options.search] = request.searches.length ? DataUtil.callAdaptorFunction(this, 'onSearch', request.searches, query) : '';
        req[options.skip] = 'onSkip' in singles ?
            DataUtil.callAdaptorFunction(this, 'onSkip', DataUtil.getValue(singles.onSkip.nos, query), query) : '';
        req[options.take] = 'onTake' in singles ?
            DataUtil.callAdaptorFunction(this, 'onTake', DataUtil.getValue(singles.onTake.nos, query), query) : '';
        req[options.where] = request.filters.length || request.searches.length ?
            DataUtil.callAdaptorFunction(this, 'onWhere', request.filters, query) : '';
        req[options.sortBy] = request.sorts.length ? DataUtil.callAdaptorFunction(this, 'onSortBy', request.sorts, query) : '';
        req[options.group] = request.groups.length ? DataUtil.callAdaptorFunction(this, 'onGroup', request.groups, query) : '';
        req[options.aggregates] = request.aggregates.length ?
            DataUtil.callAdaptorFunction(this, 'onAggregates', request.aggregates, query) : '';
        req[param] = [];
    };
    /**
     * Convert the object from processQuery to string which can be added query string.
     *
     * @param {Object} req
     * @param request
     * @param {Query} query
     * @param {DataManager} dm
     */
    UrlAdaptor.prototype.convertToQueryString = function (request, query, dm) {
        return '';
        // this needs to be overridden
    };
    /**
     * Return the data from the data manager processing.
     *
     * @param {DataResult} data
     * @param {DataOptions} ds?
     * @param {Query} query?
     * @param {Request} xhr?
     * @param {Object} request?
     * @param {CrudOptions} changes?
     * @param ds
     * @param query
     * @param xhr
     * @param request
     * @param changes
     */
    UrlAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
        if (xhr && xhr.headers.get('Content-Type') &&
            xhr.headers.get('Content-Type').indexOf('application/json') !== -1) {
            var handleTimeZone = DataUtil.timeZoneHandling;
            if (ds && !ds.timeZoneHandling) {
                DataUtil.timeZoneHandling = false;
            }
            if (!ds.enableCache) {
                data = DataUtil.parse.parseJson(data);
            }
            DataUtil.timeZoneHandling = handleTimeZone;
        }
        var requests = request;
        var pvt = requests.pvtData || {};
        var groupDs = data ? data.groupDs : [];
        if (xhr && xhr.headers.get('Content-Type') &&
            xhr.headers.get('Content-Type').indexOf('xml') !== -1) {
            return (query.isCountRequired ? { result: [], count: 0 } : []);
        }
        var d = JSON.parse(requests.data);
        if (d && d.action === 'batch' && data && data.addedRecords && !isNullOrUndefined(changes)) {
            changes.addedRecords = data.addedRecords;
            return changes;
        }
        if (data && data.d) {
            data = data.d;
        }
        var args = {};
        if (data && 'count' in data) {
            args.count = data.count;
        }
        args.result = data && data.result ? data.result : data;
        var isExpand = false;
        if (Array.isArray(data.result) && data.result.length) {
            var key = 'key';
            var val = 'value';
            var level = 'level';
            if (!isNullOrUndefined(data.result[0][key])) {
                args.result = this.formRemoteGroupedData(args.result, 1, pvt.groups.length - 1);
            }
            if (query && query.lazyLoad.length && pvt.groups.length) {
                for (var i = 0; i < query.lazyLoad.length; i++) {
                    if (query.lazyLoad[i][key] === 'onDemandGroupInfo') {
                        var value = query.lazyLoad[i][val][level];
                        if (pvt.groups.length === value) {
                            isExpand = true;
                        }
                    }
                }
            }
        }
        if (!isExpand) {
            this.getAggregateResult(pvt, data, args, groupDs, query);
        }
        return DataUtil.isNull(args.count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    };
    UrlAdaptor.prototype.formRemoteGroupedData = function (data, level, childLevel) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].items.length && Object.keys(data[i].items[0]).indexOf('key') > -1) {
                this.formRemoteGroupedData(data[i].items, level + 1, childLevel - 1);
            }
        }
        var uid = 'GroupGuid';
        var childLvl = 'childLevels';
        var lvl = 'level';
        var records = 'records';
        data[uid] = consts$1[uid];
        data[lvl] = level;
        data[childLvl] = childLevel;
        data[records] = data[0].items.length ? this.getGroupedRecords(data, !isNullOrUndefined(data[0].items[records])) : [];
        return data;
    };
    UrlAdaptor.prototype.getGroupedRecords = function (data, hasRecords) {
        var childGroupedRecords = [];
        var records = 'records';
        for (var i = 0; i < data.length; i++) {
            if (!hasRecords) {
                for (var j = 0; j < data[i].items.length; j++) {
                    childGroupedRecords.push(data[i].items[j]);
                }
            }
            else {
                childGroupedRecords = childGroupedRecords.concat(data[i].items[records]);
            }
        }
        return childGroupedRecords;
    };
    /**
     * Add the group query to the adaptor`s option.
     *
     * @param  {Object[]} e
     * @returns void
     */
    UrlAdaptor.prototype.onGroup = function (e) {
        this.pvt.groups = e;
        return e;
    };
    /**
     * Add the aggregate query to the adaptor`s option.
     *
     * @param  {Aggregates[]} e
     * @returns void
     */
    UrlAdaptor.prototype.onAggregates = function (e) {
        this.pvt.aggregates = e;
    };
    /**
     * Prepare the request body based on the newly added, removed and updated records.
     * The result is used by the batch request.
     *
     * @param {DataManager} dm
     * @param {CrudOptions} changes
     * @param {Object} e
     * @param query
     * @param original
     */
    UrlAdaptor.prototype.batchRequest = function (dm, changes, e, query, original) {
        var url;
        var key;
        return {
            type: 'POST',
            url: dm.dataSource.batchUrl || dm.dataSource.crudUrl || dm.dataSource.removeUrl || dm.dataSource.url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(extend({}, {
                changed: changes.changedRecords,
                added: changes.addedRecords,
                deleted: changes.deletedRecords,
                action: 'batch',
                table: e[url],
                key: e[key]
            }, DataUtil.getAddParams(this, dm, query)))
        };
    };
    /**
     * Method will trigger before send the request to server side.
     * Used to set the custom header or modify the request options.
     *
     * @param  {DataManager} dm
     * @param  {Request} request
     * @param  {Fetch} settings?
     * @returns void
     */
    UrlAdaptor.prototype.beforeSend = function (dm, request, settings) {
        // need to extend this method
    };
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     *
     * @param {DataManager} dm
     * @param {Object} data
     * @param {string} tableName
     * @param query
     */
    UrlAdaptor.prototype.insert = function (dm, data, tableName, query) {
        return {
            url: dm.dataSource.insertUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            data: JSON.stringify(extend({}, {
                value: data,
                table: tableName,
                action: 'insert'
            }, DataUtil.getAddParams(this, dm, query)))
        };
    };
    /**
     * Prepare and return request body which is used to remove record from the table.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {number|string} value
     * @param {string} tableName
     * @param query
     */
    UrlAdaptor.prototype.remove = function (dm, keyField, value, tableName, query) {
        return {
            type: 'POST',
            url: dm.dataSource.removeUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            data: JSON.stringify(extend({}, {
                key: value,
                keyColumn: keyField,
                table: tableName,
                action: 'remove'
            }, DataUtil.getAddParams(this, dm, query)))
        };
    };
    /**
     * Prepare and return request body which is used to update record.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {Object} value
     * @param {string} tableName
     * @param query
     */
    UrlAdaptor.prototype.update = function (dm, keyField, value, tableName, query) {
        return {
            type: 'POST',
            url: dm.dataSource.updateUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            data: JSON.stringify(extend({}, {
                value: value,
                action: 'update',
                keyColumn: keyField,
                key: DataUtil.getObject(keyField, value),
                table: tableName
            }, DataUtil.getAddParams(this, dm, query)))
        };
    };
    /**
     * To generate the predicate based on the filtered query.
     *
     * @param  {Object[]|string[]|number[]} data
     * @param  {Query} query
     * @hidden
     */
    UrlAdaptor.prototype.getFiltersFrom = function (data, query) {
        var key = query.fKey;
        var value;
        var prop = key;
        var pKey = query.key;
        var predicats = [];
        if (typeof data[0] !== 'object') {
            prop = null;
        }
        for (var i = 0; i < data.length; i++) {
            if (typeof data[0] === 'object') {
                value = DataUtil.getObject(pKey || prop, data[i]);
            }
            else {
                value = data[i];
            }
            predicats.push(new Predicate(key, 'equal', value));
        }
        return Predicate.or(predicats);
    };
    UrlAdaptor.prototype.getAggregateResult = function (pvt, data, args, groupDs, query) {
        var pData = data;
        if (data && data.result) {
            pData = data.result;
        }
        if (pvt && pvt.aggregates && pvt.aggregates.length) {
            var agg = pvt.aggregates;
            var fn = void 0;
            var aggregateData = pData;
            var res = {};
            if (data.aggregate) {
                aggregateData = data.aggregate;
            }
            for (var i = 0; i < agg.length; i++) {
                fn = DataUtil.aggregates[agg[i].type];
                if (fn) {
                    res[agg[i].field + ' - ' + agg[i].type] = fn(aggregateData, agg[i].field);
                }
            }
            args.aggregates = res;
        }
        var key = 'key';
        var isServerGrouping = Array.isArray(data.result) && data.result.length && !isNullOrUndefined(data.result[0][key]);
        if (pvt && pvt.groups && pvt.groups.length && !isServerGrouping) {
            var groups = pvt.groups;
            for (var i = 0; i < groups.length; i++) {
                var level = null;
                if (!isNullOrUndefined(groupDs)) {
                    groupDs = DataUtil.group(groupDs, groups[i]);
                }
                var groupQuery = Query.filterQueries(query.queries, 'onGroup')[i].e;
                pData = DataUtil.group(pData, groups[i], pvt.aggregates, level, groupDs, groupQuery.comparer);
            }
            args.result = pData;
        }
        return args;
    };
    UrlAdaptor.prototype.getQueryRequest = function (query) {
        var req = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
        req.sorts = Query.filterQueries(query.queries, 'onSortBy');
        req.groups = Query.filterQueries(query.queries, 'onGroup');
        req.filters = Query.filterQueries(query.queries, 'onWhere');
        req.searches = Query.filterQueries(query.queries, 'onSearch');
        req.aggregates = Query.filterQueries(query.queries, 'onAggregates');
        return req;
    };
    UrlAdaptor.prototype.addParams = function (options) {
        var req = options.reqParams;
        if (options.params.length) {
            req.params = {};
        }
        for (var _i = 0, _a = options.params; _i < _a.length; _i++) {
            var tmp = _a[_i];
            if (req[tmp.key]) {
                throw new Error('Query() - addParams: Custom Param is conflicting other request arguments');
            }
            req[tmp.key] = tmp.value;
            if (tmp.fn) {
                req[tmp.key] = tmp.fn.call(options.query, tmp.key, options.query, options.dm);
            }
            req.params[tmp.key] = req[tmp.key];
        }
    };
    return UrlAdaptor;
}(Adaptor));
/**
 * OData Adaptor that is extended from URL Adaptor, is used for consuming data through OData Service.
 *
 * @hidden
 */
var ODataAdaptor = /** @class */ (function (_super) {
    __extends(ODataAdaptor, _super);
    function ODataAdaptor(props) {
        var _this = _super.call(this) || this;
        // options replaced the default adaptor options
        _this.options = extend({}, _this.options, {
            requestType: 'get',
            accept: 'application/json;odata=light;q=1,application/json;odata=verbose;q=0.5',
            multipartAccept: 'multipart/mixed',
            sortBy: '$orderby',
            select: '$select',
            skip: '$skip',
            take: '$top',
            count: '$inlinecount',
            where: '$filter',
            expand: '$expand',
            batch: '$batch',
            changeSet: '--changeset_',
            batchPre: 'batch_',
            contentId: 'Content-Id: ',
            batchContent: 'Content-Type: multipart/mixed; boundary=',
            changeSetContent: 'Content-Type: application/http\nContent-Transfer-Encoding: binary ',
            batchChangeSetContentType: 'Content-Type: application/json; charset=utf-8 ',
            updateType: 'PUT'
        });
        extend(_this.options, props || {});
        return _this;
    }
    ODataAdaptor.prototype.getModuleName = function () {
        return 'ODataAdaptor';
    };
    /**
     * Generate request string based on the filter criteria from query.
     *
     * @param {Predicate} pred
     * @param {boolean} requiresCast?
     * @param predicate
     * @param query
     * @param requiresCast
     */
    ODataAdaptor.prototype.onPredicate = function (predicate, query, requiresCast) {
        var returnValue = '';
        var operator;
        var guid;
        var val = predicate.value;
        var type = typeof val;
        var field = predicate.field ? ODataAdaptor.getField(predicate.field) : null;
        if (val instanceof Date) {
            val = 'datetime\'' + DataUtil.parse.replacer(val) + '\'';
        }
        if (type === 'string') {
            val = val.replace(/'/g, '\'\'');
            if (predicate.ignoreCase) {
                val = val.toLowerCase();
            }
            if (predicate.operator !== 'like') {
                val = encodeURIComponent(val);
            }
            if (predicate.operator !== 'wildcard' && predicate.operator !== 'like') {
                val = '\'' + val + '\'';
            }
            if (requiresCast) {
                field = 'cast(' + field + ', \'Edm.String\')';
            }
            if (DataUtil.parse.isGuid(val)) {
                guid = 'guid';
            }
            if (predicate.ignoreCase) {
                if (!guid) {
                    field = 'tolower(' + field + ')';
                }
                val = val.toLowerCase();
            }
        }
        if (predicate.operator === 'isempty' || predicate.operator === 'isnull' || predicate.operator === 'isnotempty' ||
            predicate.operator === 'isnotnull') {
            operator = predicate.operator.indexOf('isnot') !== -1 ? DataUtil.odBiOperator['notequal'] : DataUtil.odBiOperator['equal'];
            val = predicate.operator === 'isnull' || predicate.operator === 'isnotnull' ? null : '\'\'';
        }
        else {
            operator = DataUtil.odBiOperator[predicate.operator];
        }
        if (operator) {
            returnValue += field;
            returnValue += operator;
            if (guid) {
                returnValue += guid;
            }
            return returnValue + val;
        }
        if (!isNullOrUndefined(this.getModuleName) && this.getModuleName() === 'ODataV4Adaptor') {
            operator = DataUtil.odv4UniOperator[predicate.operator];
        }
        else {
            operator = DataUtil.odUniOperator[predicate.operator];
        }
        if (operator === 'like') {
            val = val;
            if (val.indexOf('%') !== -1) {
                if (val.charAt(0) === '%' && val.lastIndexOf('%') < 2) {
                    val = val.substring(1, val.length);
                    operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === 'ODataV4Adaptor' ?
                        DataUtil.odv4UniOperator['startswith'] : DataUtil.odUniOperator['startswith'];
                }
                else if (val.charAt(val.length - 1) === '%' && val.indexOf('%') > val.length - 3) {
                    val = val.substring(0, val.length - 1);
                    operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === 'ODataV4Adaptor' ?
                        DataUtil.odv4UniOperator['endswith'] : DataUtil.odUniOperator['endswith'];
                }
                else if (val.lastIndexOf('%') !== val.indexOf('%') && val.lastIndexOf('%') > val.indexOf('%') + 1) {
                    val = val.substring(val.indexOf('%') + 1, val.lastIndexOf('%'));
                    operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === 'ODataV4Adaptor' ?
                        DataUtil.odv4UniOperator['contains'] : DataUtil.odUniOperator['contains'];
                }
                else {
                    operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === 'ODataV4Adaptor' ?
                        DataUtil.odv4UniOperator['contains'] : DataUtil.odUniOperator['contains'];
                }
            }
            val = encodeURIComponent(val);
            val = '\'' + val + '\'';
        }
        else if (operator === 'wildcard') {
            val = val;
            if (val.indexOf('*') !== -1) {
                var splittedStringValue = val.split('*');
                var splittedValue = void 0;
                var count = 0;
                if (val.indexOf('*') !== 0 && splittedStringValue[0].indexOf('%3f') === -1 &&
                    splittedStringValue[0].indexOf('?') === -1) {
                    splittedValue = splittedStringValue[0];
                    splittedValue = '\'' + splittedValue + '\'';
                    operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === 'ODataV4Adaptor' ?
                        DataUtil.odv4UniOperator['startswith'] : DataUtil.odUniOperator['startswith'];
                    returnValue += operator + '(';
                    returnValue += field + ',';
                    if (guid) {
                        returnValue += guid;
                    }
                    returnValue += splittedValue + ')';
                    count++;
                }
                if (val.lastIndexOf('*') !== val.length - 1 && splittedStringValue[splittedStringValue.length - 1].indexOf('%3f') === -1 &&
                    splittedStringValue[splittedStringValue.length - 1].indexOf('?') === -1) {
                    splittedValue = splittedStringValue[splittedStringValue.length - 1];
                    splittedValue = '\'' + splittedValue + '\'';
                    operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === 'ODataV4Adaptor' ?
                        DataUtil.odv4UniOperator['endswith'] : DataUtil.odUniOperator['endswith'];
                    if (count > 0) {
                        returnValue += ' and ';
                    }
                    returnValue += operator + '(';
                    returnValue += field + ',';
                    if (guid) {
                        returnValue += guid;
                    }
                    returnValue += splittedValue + ')';
                    count++;
                }
                if (splittedStringValue.length > 2) {
                    for (var i = 1; i < splittedStringValue.length - 1; i++) {
                        if (splittedStringValue[i].indexOf('%3f') === -1 && splittedStringValue[i].indexOf('?') === -1) {
                            splittedValue = splittedStringValue[i];
                            splittedValue = '\'' + splittedValue + '\'';
                            operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === 'ODataV4Adaptor' ?
                                DataUtil.odv4UniOperator['contains'] : DataUtil.odUniOperator['contains'];
                            if (count > 0) {
                                returnValue += ' and ';
                            }
                            if (operator === 'substringof' || operator === 'not substringof') {
                                var temp = splittedValue;
                                splittedValue = field;
                                field = temp;
                            }
                            returnValue += operator + '(';
                            returnValue += field + ',';
                            if (guid) {
                                returnValue += guid;
                            }
                            returnValue += splittedValue + ')';
                            count++;
                        }
                    }
                }
                if (count === 0) {
                    operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === 'ODataV4Adaptor' ?
                        DataUtil.odv4UniOperator['contains'] : DataUtil.odUniOperator['contains'];
                    if (val.indexOf('?') !== -1 || val.indexOf('%3f') !== -1) {
                        val = val.indexOf('?') !== -1 ? val.split('?').join('') : val.split('%3f').join('');
                    }
                    val = '\'' + val + '\'';
                }
                else {
                    operator = 'wildcard';
                }
            }
            else {
                operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === 'ODataV4Adaptor' ?
                    DataUtil.odv4UniOperator['contains'] : DataUtil.odUniOperator['contains'];
                if (val.indexOf('?') !== -1 || val.indexOf('%3f') !== -1) {
                    val = val.indexOf('?') !== -1 ? val.split('?').join('') : val.split('%3f').join('');
                }
                val = '\'' + val + '\'';
            }
        }
        if (operator === 'substringof' || operator === 'not substringof') {
            var temp = val;
            val = field;
            field = temp;
        }
        if (operator !== 'wildcard') {
            returnValue += operator + '(';
            returnValue += field + ',';
            if (guid) {
                returnValue += guid;
            }
            returnValue += val + ')';
        }
        return returnValue;
    };
    ODataAdaptor.prototype.addParams = function (options) {
        _super.prototype.addParams.call(this, options);
        delete options.reqParams.params;
    };
    /**
     * Generate request string based on the multiple filter criteria from query.
     *
     * @param {Predicate} pred
     * @param {boolean} requiresCast?
     * @param predicate
     * @param query
     * @param requiresCast
     */
    ODataAdaptor.prototype.onComplexPredicate = function (predicate, query, requiresCast) {
        var res = [];
        for (var i = 0; i < predicate.predicates.length; i++) {
            res.push('(' + this.onEachWhere(predicate.predicates[i], query, requiresCast) + ')');
        }
        return res.join(' ' + predicate.condition + ' ');
    };
    /**
     * Generate query string based on the multiple filter criteria from query.
     *
     * @param {Predicate} filter
     * @param {boolean} requiresCast?
     * @param query
     * @param requiresCast
     */
    ODataAdaptor.prototype.onEachWhere = function (filter, query, requiresCast) {
        return filter.isComplex ? this.onComplexPredicate(filter, query, requiresCast) : this.onPredicate(filter, query, requiresCast);
    };
    /**
     * Generate query string based on the multiple filter criteria from query.
     *
     * @param  {string[]} filters
     */
    ODataAdaptor.prototype.onWhere = function (filters) {
        if (this.pvt.search) {
            filters.push(this.onEachWhere(this.pvt.search, null, true));
        }
        return filters.join(' and ');
    };
    /**
     * Generate query string based on the multiple search criteria from query.
     *
     * @param e
     * @param {string} operator
     * @param {string} key
     * @param {boolean} } ignoreCase
     * @param e.fields
     * @param e.operator
     * @param e.key
     * @param e.ignoreCase
     */
    ODataAdaptor.prototype.onEachSearch = function (e) {
        if (e.fields && e.fields.length === 0) {
            DataUtil.throwError('Query() - Search : oData search requires list of field names to search');
        }
        var filter = this.pvt.search || [];
        for (var i = 0; i < e.fields.length; i++) {
            filter.push(new Predicate(e.fields[i], e.operator, e.key, e.ignoreCase));
        }
        this.pvt.search = filter;
    };
    /**
     * Generate query string based on the search criteria from query.
     *
     * @param  {Object} e
     */
    ODataAdaptor.prototype.onSearch = function (e) {
        this.pvt.search = Predicate.or(this.pvt.search);
        return '';
    };
    /**
     * Generate query string based on multiple sort criteria from query.
     *
     * @param  {QueryOptions} e
     */
    ODataAdaptor.prototype.onEachSort = function (e) {
        var res = [];
        if (e.name instanceof Array) {
            for (var i = 0; i < e.name.length; i++) {
                res.push(ODataAdaptor.getField(e.name[i]) + (e.direction === 'descending' ? ' desc' : ''));
            }
        }
        else {
            res.push(ODataAdaptor.getField(e.name) + (e.direction === 'descending' ? ' desc' : ''));
        }
        return res.join(',');
    };
    /**
     * Returns sort query string.
     *
     * @param  {string[]} e
     */
    ODataAdaptor.prototype.onSortBy = function (e) {
        return e.reverse().join(',');
    };
    /**
     * Adds the group query to the adaptor option.
     *
     * @param  {Object[]} e
     * @returns string
     */
    ODataAdaptor.prototype.onGroup = function (e) {
        this.pvt.groups = e;
        return [];
    };
    /**
     * Returns the select query string.
     *
     * @param  {string[]} e
     */
    ODataAdaptor.prototype.onSelect = function (e) {
        for (var i = 0; i < e.length; i++) {
            e[i] = ODataAdaptor.getField(e[i]);
        }
        return e.join(',');
    };
    /**
     * Add the aggregate query to the adaptor option.
     *
     * @param  {Object[]} e
     * @returns string
     */
    ODataAdaptor.prototype.onAggregates = function (e) {
        this.pvt.aggregates = e;
        return '';
    };
    /**
     * Returns the query string which requests total count from the data source.
     *
     * @param  {boolean} e
     * @returns string
     */
    ODataAdaptor.prototype.onCount = function (e) {
        return e === true ? 'allpages' : '';
    };
    /**
     * Method will trigger before send the request to server side.
     * Used to set the custom header or modify the request options.
     *
     * @param {DataManager} dm
     * @param {Request} request
     * @param {Fetch} settings?
     * @param settings
     */
    ODataAdaptor.prototype.beforeSend = function (dm, request, settings) {
        if (DataUtil.endsWith(settings.url, this.options.batch) && settings.type.toLowerCase() === 'post') {
            request.headers.set('Accept', this.options.multipartAccept);
            request.headers.set('DataServiceVersion', '2.0');
            //request.overrideMimeType('text/plain; charset=x-user-defined');
        }
        else {
            request.headers.set('Accept', this.options.accept);
        }
        request.headers.set('DataServiceVersion', '2.0');
        request.headers.set('MaxDataServiceVersion', '2.0');
    };
    /**
     * Returns the data from the query processing.
     *
     * @param {DataResult} data
     * @param {DataOptions} ds?
     * @param {Query} query?
     * @param {Request} xhr?
     * @param {Fetch} request?
     * @param {CrudOptions} changes?
     * @param ds
     * @param query
     * @param xhr
     * @param request
     * @param changes
     * @returns aggregateResult
     */
    ODataAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
        var metaCheck = 'odata.metadata';
        if ((request && request.type === 'GET') && !this.rootUrl && data[metaCheck]) {
            var dataUrls = data[metaCheck].split('/$metadata#');
            this.rootUrl = dataUrls[0];
            this.resourceTableName = dataUrls[1];
        }
        var pvtData = 'pvtData';
        if (!isNullOrUndefined(data.d)) {
            var dataCopy = ((query && query.isCountRequired) ? data.d.results : data.d);
            var metaData = '__metadata';
            if (!isNullOrUndefined(dataCopy)) {
                for (var i = 0; i < dataCopy.length; i++) {
                    if (!isNullOrUndefined(dataCopy[i][metaData])) {
                        delete dataCopy[i][metaData];
                    }
                }
            }
        }
        var pvt = request && request[pvtData];
        var emptyAndBatch = this.processBatchResponse(data, query, xhr, request, changes);
        if (emptyAndBatch) {
            return emptyAndBatch;
        }
        var versionCheck = xhr && request.fetchRequest.headers.get('DataServiceVersion');
        var count = null;
        var version = (versionCheck && parseInt(versionCheck, 10)) || 2;
        if (query && query.isCountRequired) {
            var oDataCount = '__count';
            if (data[oDataCount] || data['odata.count']) {
                count = data[oDataCount] || data['odata.count'];
            }
            if (data.d) {
                data = data.d;
            }
            if (data[oDataCount] || data['odata.count']) {
                count = data[oDataCount] || data['odata.count'];
            }
        }
        if (version === 3 && data.value) {
            data = data.value;
        }
        if (data.d) {
            data = data.d;
        }
        if (version < 3 && data.results) {
            data = data.results;
        }
        var args = {};
        args.count = count;
        args.result = data;
        this.getAggregateResult(pvt, data, args, null, query);
        return DataUtil.isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    };
    /**
     * Converts the request object to query string.
     *
     * @param {Object} req
     * @param request
     * @param {Query} query
     * @param {DataManager} dm
     * @returns tableName
     */
    ODataAdaptor.prototype.convertToQueryString = function (request, query, dm) {
        var res = [];
        var table = 'table';
        var tableName = request[table] || '';
        var format = '$format';
        delete request[table];
        if (dm.dataSource.requiresFormat) {
            request[format] = 'json';
        }
        var keys = Object.keys(request);
        for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
            var prop = keys_4[_i];
            res.push(prop + '=' + request[prop]);
        }
        res = res.join('&');
        if (dm.dataSource.url && dm.dataSource.url.indexOf('?') !== -1 && !tableName) {
            return res;
        }
        return res.length ? tableName + '?' + res : tableName || '';
    };
    ODataAdaptor.prototype.localTimeReplacer = function (key, convertObj) {
        for (var _i = 0, _a = !isNullOrUndefined(convertObj) ? Object.keys(convertObj) : []; _i < _a.length; _i++) {
            var prop = _a[_i];
            if ((convertObj[prop] instanceof Date)) {
                convertObj[prop] = DataUtil.dateParse.toLocalTime(convertObj[prop]);
            }
        }
        return convertObj;
    };
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     *
     * @param {DataManager} dm
     * @param {Object} data
     * @param {string} tableName?
     * @param tableName
     */
    ODataAdaptor.prototype.insert = function (dm, data, tableName) {
        return {
            url: (dm.dataSource.insertUrl || dm.dataSource.url).replace(/\/*$/, tableName ? '/' + tableName : ''),
            data: JSON.stringify(data, this.options.localTime ? this.localTimeReplacer : null)
        };
    };
    /**
     * Prepare and return request body which is used to remove record from the table.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {number} value
     * @param {string} tableName?
     * @param tableName
     */
    ODataAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
        var url;
        if (typeof value === 'string' && !DataUtil.parse.isGuid(value)) {
            url = "('" + value + "')";
        }
        else {
            url = "(" + value + ")";
        }
        return {
            type: 'DELETE',
            url: (dm.dataSource.removeUrl || dm.dataSource.url).replace(/\/*$/, tableName ? '/' + tableName : '') + url
        };
    };
    /**
     * Updates existing record and saves the changes to the table.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {Object} value
     * @param {string} tableName?
     * @param tableName
     * @param query
     * @param original
     * @returns this
     */
    ODataAdaptor.prototype.update = function (dm, keyField, value, tableName, query, original) {
        if (this.options.updateType === 'PATCH' && !isNullOrUndefined(original)) {
            value = this.compareAndRemove(value, original, keyField);
        }
        var url;
        if (typeof value[keyField] === 'string' && !DataUtil.parse.isGuid(value[keyField])) {
            url = "('" + value[keyField] + "')";
        }
        else {
            url = "(" + value[keyField] + ")";
        }
        return {
            type: this.options.updateType,
            url: (dm.dataSource.updateUrl || dm.dataSource.url).replace(/\/*$/, tableName ? '/' + tableName : '') + url,
            data: JSON.stringify(value, this.options.localTime ? this.localTimeReplacer : null),
            accept: this.options.accept
        };
    };
    /**
     * Prepare the request body based on the newly added, removed and updated records.
     * The result is used by the batch request.
     *
     * @param {DataManager} dm
     * @param {CrudOptions} changes
     * @param {RemoteArgs} e
     * @param query
     * @param original
     * @returns {Object}
     */
    ODataAdaptor.prototype.batchRequest = function (dm, changes, e, query, original) {
        var initialGuid = e.guid = DataUtil.getGuid(this.options.batchPre);
        var url = (dm.dataSource.batchUrl || this.rootUrl) ?
            (dm.dataSource.batchUrl || this.rootUrl) + '/' + this.options.batch :
            (dm.dataSource.batchUrl || dm.dataSource.url).replace(/\/*$/, '/' + this.options.batch);
        e.url = this.resourceTableName ? this.resourceTableName : e.url;
        var args = {
            url: e.url,
            key: e.key,
            cid: 1,
            cSet: DataUtil.getGuid(this.options.changeSet)
        };
        var req = '--' + initialGuid + '\n';
        req += 'Content-Type: multipart/mixed; boundary=' + args.cSet.replace('--', '') + '\n';
        this.pvt.changeSet = 0;
        req += this.generateInsertRequest(changes.addedRecords, args, dm);
        req += this.generateUpdateRequest(changes.changedRecords, args, dm, original ? original.changedRecords : []);
        req += this.generateDeleteRequest(changes.deletedRecords, args, dm);
        req += args.cSet + '--\n';
        req += '--' + initialGuid + '--';
        return {
            type: 'POST',
            url: url,
            dataType: 'json',
            contentType: 'multipart/mixed; charset=UTF-8;boundary=' + initialGuid,
            data: req
        };
    };
    /**
     * Generate the string content from the removed records.
     * The result will be send during batch update.
     *
     * @param {Object[]} arr
     * @param {RemoteArgs} e
     * @param dm
     * @returns this
     */
    ODataAdaptor.prototype.generateDeleteRequest = function (arr, e, dm) {
        if (!arr) {
            return '';
        }
        var req = '';
        var stat = {
            'method': 'DELETE ',
            'url': function (data, i, key) {
                var url = DataUtil.getObject(key, data[i]);
                if (typeof url === 'number' || DataUtil.parse.isGuid(url)) {
                    return '(' + url + ')';
                }
                else if (url instanceof Date) {
                    var dateTime = data[i][key];
                    return '(' + dateTime.toJSON() + ')';
                }
                else {
                    return "('" + url + "')";
                }
            },
            'data': function (data, i) { return ''; }
        };
        req = this.generateBodyContent(arr, e, stat, dm);
        return req + '\n';
    };
    /**
     * Generate the string content from the inserted records.
     * The result will be send during batch update.
     *
     * @param {Object[]} arr
     * @param {RemoteArgs} e
     * @param dm
     */
    ODataAdaptor.prototype.generateInsertRequest = function (arr, e, dm) {
        if (!arr) {
            return '';
        }
        var req = '';
        var stat = {
            'method': 'POST ',
            'url': function (data, i, key) { return ''; },
            'data': function (data, i) { return JSON.stringify(data[i]) + '\n\n'; }
        };
        req = this.generateBodyContent(arr, e, stat, dm);
        return req;
    };
    /**
     * Generate the string content from the updated records.
     * The result will be send during batch update.
     *
     * @param {Object[]} arr
     * @param {RemoteArgs} e
     * @param dm
     * @param org
     */
    ODataAdaptor.prototype.generateUpdateRequest = function (arr, e, dm, org) {
        var _this = this;
        if (!arr) {
            return '';
        }
        var req = '';
        arr.forEach(function (change) { return change = _this.compareAndRemove(change, org.filter(function (o) { return DataUtil.getObject(e.key, o) === DataUtil.getObject(e.key, change); })[0], e.key); });
        var stat = {
            'method': this.options.updateType + ' ',
            'url': function (data, i, key) {
                if (typeof data[i][key] === 'number' || DataUtil.parse.isGuid(data[i][key])) {
                    return '(' + data[i][key] + ')';
                }
                else if (data[i][key] instanceof Date) {
                    var date = data[i][key];
                    return '(' + date.toJSON() + ')';
                }
                else {
                    return "('" + data[i][key] + "')";
                }
            },
            'data': function (data, i) { return JSON.stringify(data[i]) + '\n\n'; }
        };
        req = this.generateBodyContent(arr, e, stat, dm);
        return req;
    };
    ODataAdaptor.getField = function (prop) {
        return prop.replace(/\./g, '/');
    };
    ODataAdaptor.prototype.generateBodyContent = function (arr, e, stat, dm) {
        var req = '';
        for (var i = 0; i < arr.length; i++) {
            req += '\n' + e.cSet + '\n';
            req += this.options.changeSetContent + '\n\n';
            req += stat.method;
            if (stat.method === 'POST ') {
                req += (dm.dataSource.insertUrl || dm.dataSource.crudUrl || e.url) + stat.url(arr, i, e.key) + ' HTTP/1.1\n';
            }
            else if (stat.method === 'PUT ' || stat.method === 'PATCH ') {
                req += (dm.dataSource.updateUrl || dm.dataSource.crudUrl || e.url) + stat.url(arr, i, e.key) + ' HTTP/1.1\n';
            }
            else if (stat.method === 'DELETE ') {
                req += (dm.dataSource.removeUrl || dm.dataSource.crudUrl || e.url) + stat.url(arr, i, e.key) + ' HTTP/1.1\n';
            }
            req += 'Accept: ' + this.options.accept + '\n';
            req += 'Content-Id: ' + this.pvt.changeSet++ + '\n';
            req += this.options.batchChangeSetContentType + '\n';
            if (!isNullOrUndefined(arr[i]['@odata.etag'])) {
                req += 'If-Match: ' + arr[i]['@odata.etag'] + '\n\n';
                delete arr[i]['@odata.etag'];
            }
            else {
                req += '\n';
            }
            req += stat.data(arr, i);
        }
        return req;
    };
    ODataAdaptor.prototype.processBatchResponse = function (data, query, xhr, request, changes) {
        if (xhr && xhr.headers.get('Content-Type') && xhr.headers.get('Content-Type').indexOf('xml') !== -1) {
            return (query.isCountRequired ? { result: [], count: 0 } : []);
        }
        if (request && this.options.batch && DataUtil.endsWith(request.url, this.options.batch) && request.type.toLowerCase() === 'post') {
            var guid = xhr.headers.get('Content-Type');
            var cIdx = void 0;
            var jsonObj = void 0;
            var d = data + '';
            guid = guid.substring(guid.indexOf('=batchresponse') + 1);
            d = d.split(guid);
            if (d.length < 2) {
                return {};
            }
            d = d[1];
            var exVal = /(?:\bContent-Type.+boundary=)(changesetresponse.+)/i.exec(d);
            if (exVal) {
                d.replace(exVal[0], '');
            }
            var changeGuid = exVal ? exVal[1] : '';
            d = d.split(changeGuid);
            for (var i = d.length; i > -1; i--) {
                if (!/\bContent-ID:/i.test(d[i]) || !/\bHTTP.+201/.test(d[i])) {
                    continue;
                }
                cIdx = parseInt(/\bContent-ID: (\d+)/i.exec(d[i])[1], 10);
                if (changes.addedRecords[cIdx]) {
                    jsonObj = DataUtil.parse.parseJson(/^\{.+\}/m.exec(d[i])[0]);
                    extend({}, changes.addedRecords[cIdx], this.processResponse(jsonObj));
                }
            }
            return changes;
        }
        return null;
    };
    ODataAdaptor.prototype.compareAndRemove = function (data, original, key) {
        var _this = this;
        if (isNullOrUndefined(original)) {
            return data;
        }
        Object.keys(data).forEach(function (prop) {
            if (prop !== key && prop !== '@odata.etag') {
                if (DataUtil.isPlainObject(data[prop])) {
                    _this.compareAndRemove(data[prop], original[prop]);
                    var final = Object.keys(data[prop]).filter(function (data) { return data !== '@odata.etag'; });
                    if (final.length === 0) {
                        delete data[prop];
                    }
                }
                else if (data[prop] === original[prop]) {
                    delete data[prop];
                }
                else if (data[prop] && original[prop] && data[prop].valueOf() === original[prop].valueOf()) {
                    delete data[prop];
                }
            }
        });
        return data;
    };
    return ODataAdaptor;
}(UrlAdaptor));
/**
 * The OData v4 is an improved version of OData protocols.
 * The DataManager uses the ODataV4Adaptor to consume OData v4 services.
 *
 * @hidden
 */
var ODataV4Adaptor = /** @class */ (function (_super) {
    __extends(ODataV4Adaptor, _super);
    function ODataV4Adaptor(props) {
        var _this = _super.call(this, props) || this;
        // options replaced the default adaptor options
        _this.options = extend({}, _this.options, {
            requestType: 'get',
            accept: 'application/json, text/javascript, */*; q=0.01',
            multipartAccept: 'multipart/mixed',
            sortBy: '$orderby',
            select: '$select',
            skip: '$skip',
            take: '$top',
            count: '$count',
            search: '$search',
            where: '$filter',
            expand: '$expand',
            batch: '$batch',
            changeSet: '--changeset_',
            batchPre: 'batch_',
            contentId: 'Content-Id: ',
            batchContent: 'Content-Type: multipart/mixed; boundary=',
            changeSetContent: 'Content-Type: application/http\nContent-Transfer-Encoding: binary ',
            batchChangeSetContentType: 'Content-Type: application/json; charset=utf-8 ',
            updateType: 'PATCH',
            localTime: false,
            apply: '$apply'
        });
        extend(_this.options, props || {});
        return _this;
    }
    /**
     * @hidden
     */
    ODataV4Adaptor.prototype.getModuleName = function () {
        return 'ODataV4Adaptor';
    };
    /**
     * Returns the query string which requests total count from the data source.
     *
     * @param  {boolean} e
     * @returns string
     */
    ODataV4Adaptor.prototype.onCount = function (e) {
        return e === true ? 'true' : '';
    };
    /**
     * Generate request string based on the filter criteria from query.
     *
     * @param {Predicate} pred
     * @param {boolean} requiresCast?
     * @param predicate
     * @param query
     * @param requiresCast
     */
    ODataV4Adaptor.prototype.onPredicate = function (predicate, query, requiresCast) {
        var returnValue = '';
        var val = predicate.value;
        var isDate = val instanceof Date;
        if (query instanceof Query) {
            var queries = this.getQueryRequest(query);
            for (var i = 0; i < queries.filters.length; i++) {
                if (queries.filters[i].e.key === predicate.value) {
                    requiresCast = true;
                }
            }
        }
        returnValue = _super.prototype.onPredicate.call(this, predicate, query, requiresCast);
        if (isDate) {
            returnValue = returnValue.replace(/datetime'(.*)'$/, '$1');
        }
        if (DataUtil.parse.isGuid(val)) {
            returnValue = returnValue.replace('guid', '').replace(/'/g, '');
        }
        return returnValue;
    };
    /**
     * Generate query string based on the multiple search criteria from query.
     *
     * @param e
     * @param {string} operator
     * @param {string} key
     * @param {boolean} } ignoreCase
     * @param e.fields
     * @param e.operator
     * @param e.key
     * @param e.ignoreCase
     */
    ODataV4Adaptor.prototype.onEachSearch = function (e) {
        var search = this.pvt.searches || [];
        search.push(e.key);
        this.pvt.searches = search;
    };
    /**
     *  Generate query string based on the search criteria from query.
     *
     * @param  {Object} e
     */
    ODataV4Adaptor.prototype.onSearch = function (e) {
        return this.pvt.searches.join(' OR ');
    };
    /**
     * Returns the expand query string.
     *
     * @param {string} e
     * @param e.selects
     * @param e.expands
     */
    ODataV4Adaptor.prototype.onExpand = function (e) {
        var _this = this;
        var selected = {};
        var expanded = {};
        var expands = e.expands.slice();
        var exArr = [];
        var selects = e.selects.filter(function (item) { return item.indexOf('.') > -1; });
        selects.forEach(function (select) {
            var splits = select.split('.');
            if (!(splits[0] in selected)) {
                selected[splits[0]] = [];
            }
            if (splits.length === 2) {
                if (selected[splits[0]].length && Object.keys(selected).indexOf(splits[0]) !== -1) {
                    if (selected[splits[0]][0].indexOf('$expand') !== -1 && selected[splits[0]][0].indexOf(';$select=') === -1) {
                        selected[splits[0]][0] = selected[splits[0]][0] + ';' + '$select=' + splits[1];
                    }
                    else {
                        selected[splits[0]][0] = selected[splits[0]][0] + ',' + splits[1];
                    }
                }
                else {
                    selected[splits[0]].push('$select=' + splits[1]);
                }
            }
            else {
                var sel = '$select=' + splits[splits.length - 1];
                var exp = '';
                var close_1 = '';
                for (var i = 1; i < splits.length - 1; i++) {
                    exp = exp + '$expand=' + splits[i] + '(';
                    close_1 = close_1 + ')';
                }
                var combineVal = exp + sel + close_1;
                if (selected[splits[0]].length && Object.keys(selected).indexOf(splits[0]) !== -1 &&
                    _this.expandQueryIndex(selected[splits[0]], true)) {
                    var idx = _this.expandQueryIndex(selected[splits[0]]);
                    selected[splits[0]][idx] = selected[splits[0]][idx] + combineVal.replace('$expand=', ',');
                }
                else {
                    selected[splits[0]].push(combineVal);
                }
            }
        });
        //Auto expand from select query
        Object.keys(selected).forEach(function (expand) {
            if ((expands.indexOf(expand) === -1)) {
                expands.push(expand);
            }
        });
        expands.forEach(function (expand) {
            expanded[expand] = expand in selected ? expand + "(" + selected[expand].join(';') + ")" : expand;
        });
        Object.keys(expanded).forEach(function (ex) { return exArr.push(expanded[ex]); });
        return exArr.join(',');
    };
    ODataV4Adaptor.prototype.expandQueryIndex = function (query, isExpand) {
        for (var i = 0; i < query.length; i++) {
            if (query[i].indexOf('$expand') !== -1) {
                return isExpand ? true : i;
            }
        }
        return isExpand ? false : 0;
    };
    /**
     * Returns the groupby query string.
     *
     * @param {string} e
     * @param distinctFields
     */
    ODataV4Adaptor.prototype.onDistinct = function (distinctFields) {
        var fields = distinctFields.map(function (field) { return ODataAdaptor.getField(field); }).join(',');
        return "groupby((" + fields + "))";
    };
    /**
     * Returns the select query string.
     *
     * @param  {string[]} e
     */
    ODataV4Adaptor.prototype.onSelect = function (e) {
        return _super.prototype.onSelect.call(this, e.filter(function (item) { return item.indexOf('.') === -1; }));
    };
    /**
     * Method will trigger before send the request to server side.
     * Used to set the custom header or modify the request options.
     *
     * @param  {DataManager} dm
     * @param  {Request} request
     * @param  {Fetch} settings
     * @returns void
     */
    ODataV4Adaptor.prototype.beforeSend = function (dm, request, settings) {
        if (settings.type === 'POST' || settings.type === 'PUT' || settings.type === 'PATCH') {
            request.headers.set('Prefer', 'return=representation');
        }
        request.headers.set('Accept', this.options.accept);
    };
    /**
     * Returns the data from the query processing.
     *
     * @param {DataResult} data
     * @param {DataOptions} ds?
     * @param {Query} query?
     * @param {Request} xhr?
     * @param {Fetch} request?
     * @param {CrudOptions} changes?
     * @param ds
     * @param query
     * @param xhr
     * @param request
     * @param changes
     * @returns aggregateResult
     */
    ODataV4Adaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
        var metaName = '@odata.context';
        var metaV4Name = '@context';
        if ((request && request.type === 'GET') && !this.rootUrl && (data[metaName] || data[metaV4Name])) {
            var dataUrl = data[metaName] ? data[metaName].split('/$metadata#') : data[metaV4Name].split('/$metadata#');
            this.rootUrl = dataUrl[0];
            this.resourceTableName = dataUrl[1];
        }
        var pvtData = 'pvtData';
        var pvt = request && request[pvtData];
        var emptyAndBatch = _super.prototype.processBatchResponse.call(this, data, query, xhr, request, changes);
        if (emptyAndBatch) {
            return emptyAndBatch;
        }
        var count = null;
        var dataCount = '@odata.count';
        var dataV4Count = '@count';
        if (query && query.isCountRequired) {
            if (dataCount in data) {
                count = data[dataCount];
            }
            else if (dataV4Count in data) {
                count = data[dataV4Count];
            }
        }
        data = !isNullOrUndefined(data.value) ? data.value : data;
        var args = {};
        args.count = count;
        args.result = data;
        this.getAggregateResult(pvt, data, args, null, query);
        return DataUtil.isNull(count) ? args.result : { result: args.result, count: count, aggregates: args.aggregates };
    };
    return ODataV4Adaptor;
}(ODataAdaptor));
/**
 * The Web API is a programmatic interface to define the request and response messages system that is mostly exposed in JSON or XML.
 * The DataManager uses the WebApiAdaptor to consume Web API.
 * Since this adaptor is targeted to interact with Web API created using OData endpoint, it is extended from ODataAdaptor
 *
 * @hidden
 */
var WebApiAdaptor = /** @class */ (function (_super) {
    __extends(WebApiAdaptor, _super);
    function WebApiAdaptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebApiAdaptor.prototype.getModuleName = function () {
        return 'WebApiAdaptor';
    };
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     *
     * @param {DataManager} dm
     * @param {Object} data
     * @param {string} tableName?
     * @param tableName
     */
    WebApiAdaptor.prototype.insert = function (dm, data, tableName) {
        return {
            type: 'POST',
            url: dm.dataSource.url,
            data: JSON.stringify(data)
        };
    };
    /**
     * Prepare and return request body which is used to remove record from the table.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {number} value
     * @param {string} tableName?
     * @param tableName
     */
    WebApiAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
        return {
            type: 'DELETE',
            url: dm.dataSource.url + '/' + value,
            data: JSON.stringify(value)
        };
    };
    /**
     * Prepare and return request body which is used to update record.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {Object} value
     * @param {string} tableName?
     * @param tableName
     */
    WebApiAdaptor.prototype.update = function (dm, keyField, value, tableName) {
        return {
            type: 'PUT',
            url: dm.dataSource.url,
            data: JSON.stringify(value)
        };
    };
    WebApiAdaptor.prototype.batchRequest = function (dm, changes, e) {
        var _this = this;
        var initialGuid = e.guid = DataUtil.getGuid(this.options.batchPre);
        var url = dm.dataSource.url.replace(/\/*$/, '/' + this.options.batch);
        e.url = this.resourceTableName ? this.resourceTableName : e.url;
        var req = [];
        var _loop_1 = function (i, x) {
            changes.addedRecords.forEach(function (j, d) {
                var stat = {
                    'method': 'POST ',
                    'url': function (data, i, key) { return ''; },
                    'data': function (data, i) { return JSON.stringify(data[i]) + '\n\n'; }
                };
                req.push('--' + initialGuid);
                req.push('Content-Type: application/http; msgtype=request', '');
                req.push('POST ' + '/api/' + (dm.dataSource.insertUrl || dm.dataSource.crudUrl || e.url)
                    + stat.url(changes.addedRecords, i, e.key) + ' HTTP/1.1');
                req.push('Content-Type: ' + 'application/json; charset=utf-8');
                req.push('Host: ' + location.host);
                req.push('', j ? JSON.stringify(j) : '');
            });
        };
        //insertion
        for (var i = 0, x = changes.addedRecords.length; i < x; i++) {
            _loop_1(i);
        }
        var _loop_2 = function (i, x) {
            changes.changedRecords.forEach(function (j, d) {
                var stat = {
                    'method': _this.options.updateType + ' ',
                    'url': function (data, i, key) { return ''; },
                    'data': function (data, i) { return JSON.stringify(data[i]) + '\n\n'; }
                };
                req.push('--' + initialGuid);
                req.push('Content-Type: application/http; msgtype=request', '');
                req.push('PUT ' + '/api/' + (dm.dataSource.updateUrl || dm.dataSource.crudUrl || e.url)
                    + stat.url(changes.changedRecords, i, e.key) + ' HTTP/1.1');
                req.push('Content-Type: ' + 'application/json; charset=utf-8');
                req.push('Host: ' + location.host);
                req.push('', j ? JSON.stringify(j) : '');
            });
        };
        //updation
        for (var i = 0, x = changes.changedRecords.length; i < x; i++) {
            _loop_2(i);
        }
        var _loop_3 = function (i, x) {
            changes.deletedRecords.forEach(function (j, d) {
                var state = {
                    'mtd': 'DELETE ',
                    'url': function (data, i, key) {
                        var url = DataUtil.getObject(key, data[i]);
                        if (typeof url === 'number' || DataUtil.parse.isGuid(url)) {
                            return '/' + url;
                        }
                        else if (url instanceof Date) {
                            var datTime = data[i][key];
                            return '/' + datTime.toJSON();
                        }
                        else {
                            return "/'" + url + "'";
                        }
                    },
                    'data': function (data, i) { return ''; }
                };
                req.push('--' + initialGuid);
                req.push('Content-Type: application/http; msgtype=request', '');
                req.push('DELETE ' + '/api/' + (dm.dataSource.removeUrl || dm.dataSource.crudUrl || e.url)
                    + state.url(changes.deletedRecords, i, e.key) + ' HTTP/1.1');
                req.push('Content-Type: ' + 'application/json; charset=utf-8');
                req.push('Host: ' + location.host);
                req.push('', j ? JSON.stringify(j) : '');
            });
        };
        //deletion
        for (var i = 0, x = changes.deletedRecords.length; i < x; i++) {
            _loop_3(i);
        }
        req.push('--' + initialGuid + '--', '');
        return {
            type: 'POST',
            url: url,
            contentType: 'multipart/mixed; boundary=' + initialGuid,
            data: req.join('\r\n')
        };
    };
    /**
     * Method will trigger before send the request to server side.
     * Used to set the custom header or modify the request options.
     *
     * @param  {DataManager} dm
     * @param  {Request} request
     * @param  {Fetch} settings
     * @returns void
     */
    WebApiAdaptor.prototype.beforeSend = function (dm, request, settings) {
        request.headers.set('Accept', 'application/json, text/javascript, */*; q=0.01');
    };
    /**
     * Returns the data from the query processing.
     *
     * @param {DataResult} data
     * @param {DataOptions} ds?
     * @param {Query} query?
     * @param {Request} xhr?
     * @param {Fetch} request?
     * @param {CrudOptions} changes?
     * @param ds
     * @param query
     * @param xhr
     * @param request
     * @param changes
     * @returns aggregateResult
     */
    WebApiAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
        var pvtData = 'pvtData';
        var pvt = request && request[pvtData];
        var count = null;
        var args = {};
        if (request && request.type.toLowerCase() !== 'post') {
            var versionCheck = xhr && request.fetchRequest.headers.get('DataServiceVersion');
            var version = (versionCheck && parseInt(versionCheck, 10)) || 2;
            if (query && query.isCountRequired) {
                if (!DataUtil.isNull(data.Count)) {
                    count = data.Count;
                }
            }
            if (version < 3 && data.Items) {
                data = data.Items;
            }
            args.count = count;
            args.result = data;
            this.getAggregateResult(pvt, data, args, null, query);
        }
        args.result = args.result || data;
        return DataUtil.isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    };
    return WebApiAdaptor;
}(ODataAdaptor));
/**
 * WebMethodAdaptor can be used by DataManager to interact with web method.
 *
 * @hidden
 */
var WebMethodAdaptor = /** @class */ (function (_super) {
    __extends(WebMethodAdaptor, _super);
    function WebMethodAdaptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Prepare the request body based on the query.
     * The query information can be accessed at the WebMethod using variable named `value`.
     *
     * @param {DataManager} dm
     * @param {Query} query
     * @param {Object[]} hierarchyFilters?
     * @param hierarchyFilters
     * @returns application
     */
    WebMethodAdaptor.prototype.processQuery = function (dm, query, hierarchyFilters) {
        var obj = new UrlAdaptor().processQuery(dm, query, hierarchyFilters);
        var getData = 'data';
        var data = DataUtil.parse.parseJson(obj[getData]);
        var result = {};
        var value = 'value';
        if (data.param) {
            for (var i = 0; i < data.param.length; i++) {
                var param = data.param[i];
                var key = Object.keys(param)[0];
                result[key] = param[key];
            }
        }
        result[value] = data;
        var pvtData = 'pvtData';
        var url = 'url';
        return {
            data: JSON.stringify(result, DataUtil.parse.jsonDateReplacer),
            url: obj[url],
            pvtData: obj[pvtData],
            type: 'POST',
            contentType: 'application/json; charset=utf-8'
        };
    };
    return WebMethodAdaptor;
}(UrlAdaptor));
/**
 * RemoteSaveAdaptor, extended from JsonAdaptor and it is used for binding local data and performs all DataManager queries in client-side.
 * It interacts with server-side only for CRUD operations.
 *
 * @hidden
 */
var RemoteSaveAdaptor = /** @class */ (function (_super) {
    __extends(RemoteSaveAdaptor, _super);
    /**
     * @hidden
     */
    function RemoteSaveAdaptor() {
        var _this = _super.call(this) || this;
        setValue('beforeSend', UrlAdaptor.prototype.beforeSend, _this);
        return _this;
    }
    RemoteSaveAdaptor.prototype.insert = function (dm, data, tableName, query, position) {
        this.pvt.position = position;
        this.updateType = 'add';
        return {
            url: dm.dataSource.insertUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            data: JSON.stringify(extend({}, {
                value: data,
                table: tableName,
                action: 'insert'
            }, DataUtil.getAddParams(this, dm, query)))
        };
    };
    RemoteSaveAdaptor.prototype.remove = function (dm, keyField, val, tableName, query) {
        _super.prototype.remove.call(this, dm, keyField, val);
        return {
            type: 'POST',
            url: dm.dataSource.removeUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            data: JSON.stringify(extend({}, {
                key: val,
                keyColumn: keyField,
                table: tableName,
                action: 'remove'
            }, DataUtil.getAddParams(this, dm, query)))
        };
    };
    RemoteSaveAdaptor.prototype.update = function (dm, keyField, val, tableName, query) {
        this.updateType = 'update';
        this.updateKey = keyField;
        return {
            type: 'POST',
            url: dm.dataSource.updateUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            data: JSON.stringify(extend({}, {
                value: val,
                action: 'update',
                keyColumn: keyField,
                key: val[keyField],
                table: tableName
            }, DataUtil.getAddParams(this, dm, query)))
        };
    };
    RemoteSaveAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes, e) {
        var i;
        var newData = request ? JSON.parse(request.data) : data;
        data = newData.action === 'batch' ? DataUtil.parse.parseJson(data) : data;
        if (this.updateType === 'add') {
            _super.prototype.insert.call(this, ds, data, null, null, this.pvt.position);
        }
        if (this.updateType === 'update') {
            _super.prototype.update.call(this, ds, this.updateKey, data);
        }
        this.updateType = undefined;
        if (data.added) {
            for (i = 0; i < data.added.length; i++) {
                _super.prototype.insert.call(this, ds, data.added[i]);
            }
        }
        if (data.changed) {
            for (i = 0; i < data.changed.length; i++) {
                _super.prototype.update.call(this, ds, e.key, data.changed[i]);
            }
        }
        if (data.deleted) {
            for (i = 0; i < data.deleted.length; i++) {
                _super.prototype.remove.call(this, ds, e.key, data.deleted[i]);
            }
        }
        return data;
    };
    /**
     * Prepare the request body based on the newly added, removed and updated records.
     * Also perform the changes in the locally cached data to sync with the remote data.
     * The result is used by the batch request.
     *
     * @param {DataManager} dm
     * @param {CrudOptions} changes
     * @param {RemoteArgs} e
     * @param query
     * @param original
     */
    RemoteSaveAdaptor.prototype.batchRequest = function (dm, changes, e, query, original) {
        return {
            type: 'POST',
            url: dm.dataSource.batchUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(extend({}, {
                changed: changes.changedRecords,
                added: changes.addedRecords,
                deleted: changes.deletedRecords,
                action: 'batch',
                table: e.url,
                key: e.key
            }, DataUtil.getAddParams(this, dm, query)))
        };
    };
    RemoteSaveAdaptor.prototype.addParams = function (options) {
        var urlParams = new UrlAdaptor();
        urlParams.addParams(options);
    };
    return RemoteSaveAdaptor;
}(JsonAdaptor));
/**
 * Fetch Adaptor that is extended from URL Adaptor, is used for handle data operations with user defined functions.
 *
 * @hidden
 */
var CustomDataAdaptor = /** @class */ (function (_super) {
    __extends(CustomDataAdaptor, _super);
    function CustomDataAdaptor(props) {
        var _this = _super.call(this) || this;
        // options replaced the default adaptor options
        _this.options = extend({}, _this.options, {
            getData: function () { },
            addRecord: function () { },
            updateRecord: function () { },
            deleteRecord: function () { },
            batchUpdate: function () { }
        });
        extend(_this.options, props || {});
        return _this;
    }
    CustomDataAdaptor.prototype.getModuleName = function () {
        return 'CustomDataAdaptor';
    };
    return CustomDataAdaptor;
}(UrlAdaptor));
/**
 * The GraphqlAdaptor that is extended from URL Adaptor, is used for retrieving data from the Graphql server.
 * It interacts with the Graphql server with all the DataManager Queries and performs CRUD operations.
 *
 * @hidden
 */
var GraphQLAdaptor = /** @class */ (function (_super) {
    __extends(GraphQLAdaptor, _super);
    function GraphQLAdaptor(options) {
        var _this = _super.call(this) || this;
        _this.opt = options;
        _this.schema = _this.opt.response;
        _this.query = _this.opt.query;
        /* eslint-disable @typescript-eslint/no-empty-function */
        // tslint:disable-next-line:no-empty
        _this.getVariables = _this.opt.getVariables ? _this.opt.getVariables : function () { };
        /* eslint-enable @typescript-eslint/no-empty-function */
        _this.getQuery = function () { return _this.query; };
        return _this;
    }
    GraphQLAdaptor.prototype.getModuleName = function () {
        return 'GraphQLAdaptor';
    };
    /**
     * Process the JSON data based on the provided queries.
     *
     * @param {DataManager} dm
     * @param {Query} query?
     * @param datamanager
     * @param query
     */
    GraphQLAdaptor.prototype.processQuery = function (datamanager, query) {
        var urlQuery = _super.prototype.processQuery.apply(this, arguments);
        var dm = JSON.parse(urlQuery.data);
        // constructing GraphQL parameters
        var keys = ['skip', 'take', 'sorted', 'table', 'select', 'where',
            'search', 'requiresCounts', 'aggregates', 'params'];
        var temp = {};
        var str = 'searchwhereparams';
        keys.filter(function (e) {
            temp[e] = str.indexOf(e) > -1 ? JSON.stringify(dm[e]) : dm[e];
        });
        var vars = this.getVariables() || {};
        // tslint:disable-next-line:no-string-literal
        vars['datamanager'] = temp;
        var data = JSON.stringify({
            query: this.getQuery(),
            variables: vars
        });
        urlQuery.data = data;
        return urlQuery;
    };
    /**
     * Returns the data from the query processing.
     * It will also cache the data for later usage.
     *
     * @param {DataResult} data
     * @param {DataManager} ds?
     * @param {Query} query?
     * @param {Request} xhr?
     * @param {Object} request?
     * @param resData
     * @param ds
     * @param query
     * @param xhr
     * @param request
     * @returns DataResult
     */
    GraphQLAdaptor.prototype.processResponse = function (resData, ds, query, xhr, request) {
        var res = resData;
        var count;
        var aggregates;
        var result = getValue(this.schema.result, res.data);
        if (this.schema.count) {
            count = getValue(this.schema.count, res.data);
        }
        if (this.schema.aggregates) {
            aggregates = getValue(this.schema.aggregates, res.data);
            aggregates = !isNullOrUndefined(aggregates) ? DataUtil.parse.parseJson(aggregates) : aggregates;
        }
        var pvt = request.pvtData || {};
        var args = { result: result, aggregates: aggregates };
        var data = args;
        if (pvt && pvt.groups && pvt.groups.length) {
            this.getAggregateResult(pvt, data, args, null, query);
        }
        return !isNullOrUndefined(count) ? { result: args.result, count: count, aggregates: aggregates } : args.result;
    };
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     */
    GraphQLAdaptor.prototype.insert = function () {
        var inserted = _super.prototype.insert.apply(this, arguments);
        return this.generateCrudData(inserted, 'insert');
    };
    /**
     * Prepare and returns request body which is used to update a new record in the table.
     */
    GraphQLAdaptor.prototype.update = function () {
        var inserted = _super.prototype.update.apply(this, arguments);
        return this.generateCrudData(inserted, 'update');
    };
    /**
     * Prepare and returns request body which is used to remove a new record in the table.
     */
    GraphQLAdaptor.prototype.remove = function () {
        var inserted = _super.prototype.remove.apply(this, arguments);
        return this.generateCrudData(inserted, 'remove');
    };
    /**
     * Prepare the request body based on the newly added, removed and updated records.
     * The result is used by the batch request.
     *
     * @param {DataManager} dm
     * @param {CrudOptions} changes
     * @param {Object} e
     * @param e.key
     * @param {Query} query
     * @param {Object} original
     */
    GraphQLAdaptor.prototype.batchRequest = function (dm, changes, e, query, original) {
        var batch = _super.prototype.batchRequest.apply(this, arguments);
        // tslint:disable-next-line:typedef
        var bData = JSON.parse(batch.data);
        bData.key = e.key;
        batch.data = JSON.stringify(bData);
        return this.generateCrudData(batch, 'batch');
    };
    GraphQLAdaptor.prototype.generateCrudData = function (crudData, action) {
        var parsed = JSON.parse(crudData.data);
        crudData.data = JSON.stringify({
            query: this.opt.getMutation(action),
            variables: parsed
        });
        return crudData;
    };
    return GraphQLAdaptor;
}(UrlAdaptor));
/**
 * Cache Adaptor is used to cache the data of the visited pages. It prevents new requests for the previously visited pages.
 * You can configure cache page size and duration of caching by using cachingPageSize and timeTillExpiration properties of the DataManager
 *
 * @hidden
 */
var CacheAdaptor = /** @class */ (function (_super) {
    __extends(CacheAdaptor, _super);
    /**
     * Constructor for CacheAdaptor class.
     *
     * @param {CacheAdaptor} adaptor?
     * @param {number} timeStamp?
     * @param {number} pageSize?
     * @param adaptor
     * @param timeStamp
     * @param pageSize
     * @hidden
     */
    function CacheAdaptor(adaptor, timeStamp, pageSize) {
        var _this = _super.call(this) || this;
        _this.isCrudAction = false;
        _this.isInsertAction = false;
        if (!isNullOrUndefined(adaptor)) {
            _this.cacheAdaptor = adaptor;
        }
        _this.pageSize = pageSize;
        _this.guidId = DataUtil.getGuid('cacheAdaptor');
        var obj = { keys: [], results: [] };
        window.localStorage.setItem(_this.guidId, JSON.stringify(obj));
        var guid = _this.guidId;
        if (!isNullOrUndefined(timeStamp)) {
            setInterval(function () {
                var data = DataUtil.parse.parseJson(window.localStorage.getItem(guid));
                var forDel = [];
                for (var i = 0; i < data.results.length; i++) {
                    var currentTime = +new Date();
                    var requestTime = +new Date(data.results[i].timeStamp);
                    data.results[i].timeStamp = currentTime - requestTime;
                    if (currentTime - requestTime > timeStamp) {
                        forDel.push(i);
                    }
                }
                for (var i = 0; i < forDel.length; i++) {
                    data.results.splice(forDel[i], 1);
                    data.keys.splice(forDel[i], 1);
                }
                window.localStorage.removeItem(guid);
                window.localStorage.setItem(guid, JSON.stringify(data));
            }, timeStamp);
        }
        return _this;
    }
    /**
     * It will generate the key based on the URL when we send a request to server.
     *
     * @param {string} url
     * @param {Query} query?
     * @param query
     * @hidden
     */
    CacheAdaptor.prototype.generateKey = function (url, query) {
        var queries = this.getQueryRequest(query);
        var singles = Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
        var key = url;
        var page = 'onPage';
        if (page in singles) {
            key += singles[page].pageIndex;
        }
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
        return key;
    };
    /**
     * Process the query to generate request body.
     * If the data is already cached, it will return the cached data.
     *
     * @param {DataManager} dm
     * @param {Query} query?
     * @param {Object[]} hierarchyFilters?
     * @param query
     * @param hierarchyFilters
     */
    CacheAdaptor.prototype.processQuery = function (dm, query, hierarchyFilters) {
        var key = this.generateKey(dm.dataSource.url, query);
        var cachedItems = DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
        var data = cachedItems ? cachedItems.results[cachedItems.keys.indexOf(key)] : null;
        if (data != null && !this.isCrudAction && !this.isInsertAction) {
            return data;
        }
        this.isCrudAction = null;
        this.isInsertAction = null;
        /* eslint-disable prefer-spread */
        return this.cacheAdaptor.processQuery.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
        /* eslint-enable prefer-spread */
    };
    /**
     * Returns the data from the query processing.
     * It will also cache the data for later usage.
     *
     * @param {DataResult} data
     * @param {DataManager} ds?
     * @param {Query} query?
     * @param {Request} xhr?
     * @param {Fetch} request?
     * @param {CrudOptions} changes?
     * @param ds
     * @param query
     * @param xhr
     * @param request
     * @param changes
     */
    CacheAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
        if (this.isInsertAction || (request && this.cacheAdaptor.options.batch &&
            DataUtil.endsWith(request.url, this.cacheAdaptor.options.batch) && request.type.toLowerCase() === 'post')) {
            return this.cacheAdaptor.processResponse(data, ds, query, xhr, request, changes);
        }
        /* eslint-disable prefer-spread */
        data = this.cacheAdaptor.processResponse.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
        /* eslint-enable prefer-spread */
        var key = query ? this.generateKey(ds.dataSource.url, query) : ds.dataSource.url;
        var obj = {};
        obj = DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
        var index = obj.keys.indexOf(key);
        if (index !== -1) {
            obj.results.splice(index, 1);
            obj.keys.splice(index, 1);
        }
        obj.results[obj.keys.push(key) - 1] = { keys: key, result: data.result, timeStamp: new Date(), count: data.count };
        while (obj.results.length > this.pageSize) {
            obj.results.splice(0, 1);
            obj.keys.splice(0, 1);
        }
        window.localStorage.setItem(this.guidId, JSON.stringify(obj));
        return data;
    };
    /**
     * Method will trigger before send the request to server side. Used to set the custom header or modify the request options.
     *
     * @param {DataManager} dm
     * @param {Request} request
     * @param {Fetch} settings?
     * @param settings
     */
    CacheAdaptor.prototype.beforeSend = function (dm, request, settings) {
        if (!isNullOrUndefined(this.cacheAdaptor.options.batch) && DataUtil.endsWith(settings.url, this.cacheAdaptor.options.batch)
            && settings.type.toLowerCase() === 'post') {
            request.headers.set('Accept', this.cacheAdaptor.options.multipartAccept);
        }
        if (!dm.dataSource.crossDomain) {
            request.headers.set('Accept', this.cacheAdaptor.options.accept);
        }
    };
    /**
     * Updates existing record and saves the changes to the table.
     *
     * @param  {DataManager} dm
     * @param  {string} keyField
     * @param  {Object} value
     * @param  {string} tableName
     */
    CacheAdaptor.prototype.update = function (dm, keyField, value, tableName) {
        this.isCrudAction = true;
        return this.cacheAdaptor.update(dm, keyField, value, tableName);
    };
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     *
     * @param {DataManager} dm
     * @param {Object} data
     * @param {string} tableName?
     * @param tableName
     */
    CacheAdaptor.prototype.insert = function (dm, data, tableName) {
        this.isInsertAction = true;
        return this.cacheAdaptor.insert(dm, data, tableName);
    };
    /**
     * Prepare and return request body which is used to remove record from the table.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {Object} value
     * @param {string} tableName?
     * @param tableName
     */
    CacheAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
        this.isCrudAction = true;
        return this.cacheAdaptor.remove(dm, keyField, value, tableName);
    };
    /**
     * Prepare the request body based on the newly added, removed and updated records.
     * The result is used by the batch request.
     *
     * @param  {DataManager} dm
     * @param  {CrudOptions} changes
     * @param  {RemoteArgs} e
     */
    CacheAdaptor.prototype.batchRequest = function (dm, changes, e) {
        return this.cacheAdaptor.batchRequest(dm, changes, e);
    };
    return CacheAdaptor;
}(UrlAdaptor));

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
                    return fnFail(data['errors']);
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
            }).catch(function (error) { return fnFail(error); });
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

export { Adaptor, CacheAdaptor, CustomDataAdaptor, DataManager, DataUtil, Deferred, GraphQLAdaptor, JsonAdaptor, ODataAdaptor, ODataV4Adaptor, Predicate, Query, RemoteSaveAdaptor, UrlAdaptor, WebApiAdaptor, WebMethodAdaptor };
//# sourceMappingURL=ej2-data.es5.js.map
