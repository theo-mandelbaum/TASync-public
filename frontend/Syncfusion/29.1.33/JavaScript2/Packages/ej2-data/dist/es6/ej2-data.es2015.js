import { isNullOrUndefined, getValue, merge, extend, setValue, Fetch } from '@syncfusion/ej2-base';

/* eslint-disable valid-jsdoc */
/**
 * Query class is used to build query which is used by the DataManager to communicate with datasource.
 */
class Query {
    /**
     * Constructor for Query class.
     *
     * @param {string|string[]} from?
     * @param from
     * @hidden
     */
    constructor(from) {
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
    /** @hidden */
    get moduleName() { return 'query'; }
    ;
    /**
     * Sets the primary key.
     *
     * @param  {string} field - Defines the column field.
     */
    setKey(field) {
        this.key = field;
        return this;
    }
    /**
     * Sets default DataManager to execute query.
     *
     * @param  {DataManager} dataManager - Defines the DataManager.
     */
    using(dataManager) {
        this.dataManager = dataManager;
        return this;
    }
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
    execute(dataManager, done, fail, always) {
        dataManager = dataManager || this.dataManager;
        if (dataManager) {
            return dataManager.executeQuery(this, done, fail, always);
        }
        return DataUtil.throwError('Query - execute() : dataManager needs to be is set using "using" function or should be passed as argument');
    }
    /**
     * Executes query with the local datasource.
     *
     * @param  {DataManager} dataManager - Defines the DataManager.
     */
    executeLocal(dataManager) {
        dataManager = dataManager || this.dataManager;
        if (dataManager) {
            return dataManager.executeLocal(this);
        }
        return DataUtil.throwError('Query - executeLocal() : dataManager needs to be is set using "using" function or should be passed as argument');
    }
    /**
     * Creates deep copy of the Query object.
     */
    clone() {
        const cloned = new Query();
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
    }
    /**
     * Specifies the name of table to retrieve data in query execution.
     *
     * @param  {string} tableName - Defines the table name.
     */
    from(tableName) {
        this.fromTable = tableName;
        return this;
    }
    /**
     * Adds additional parameter which will be sent along with the request which will be generated while DataManager execute.
     *
     * @param  {string} key - Defines the key of additional parameter.
     * @param  {Function|string} value - Defines the value for the key.
     */
    addParams(key, value) {
        if (typeof value === 'function') {
            this.params.push({ key: key, fn: value });
        }
        else {
            this.params.push({ key: key, value: value });
        }
        return this;
    }
    /**
     * @param fields
     * @hidden
     */
    distinct(fields) {
        if (typeof fields === 'string') {
            this.distincts = [].slice.call([fields], 0);
        }
        else {
            this.distincts = fields.slice(0);
        }
        return this;
    }
    /**
     * Expands the related table.
     *
     * @param  {string|Object[]} tables
     */
    expand(tables) {
        if (typeof tables === 'string') {
            this.expands = [].slice.call([tables], 0);
        }
        else {
            this.expands = tables.slice(0);
        }
        return this;
    }
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
    where(fieldName, operator, value, ignoreCase, ignoreAccent, matchCase) {
        operator = operator ? (operator).toLowerCase() : null;
        let predicate = null;
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
    }
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
    search(searchKey, fieldNames, operator, ignoreCase, ignoreAccent) {
        if (typeof fieldNames === 'string') {
            fieldNames = [fieldNames];
        }
        if (!operator || operator === 'none') {
            operator = 'contains';
        }
        const comparer = DataUtil.fnOperators[operator];
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
    }
    /**
     * Sort the data with given sort criteria.
     * By default, sort direction is ascending.
     *
     * @param {string|string[]} fieldName - Defines the single or collection of column fields.
     * @param {string|Function} comparer - Defines the sort direction or custom sort comparer function.
     * @param isFromGroup
     */
    sortBy(fieldName, comparer, isFromGroup) {
        return this.sortByForeignKey(fieldName, comparer, isFromGroup);
    }
    /**
     * Sort the data with given sort criteria.
     * By default, sort direction is ascending.
     *
     * @param {string|string[]} fieldName - Defines the single or collection of column fields.
     * @param {string|Function} comparer - Defines the sort direction or custom sort comparer function.
     * @param isFromGroup
     * @param {string} direction - Defines the sort direction .
     */
    sortByForeignKey(fieldName, comparer, isFromGroup, direction) {
        let order = !isNullOrUndefined(direction) ? direction : 'ascending';
        let sorts;
        let temp;
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
            for (let i = 0; i < sorts.length; i++) {
                temp = sorts[i].e.fieldName;
                if (typeof temp === 'string') {
                    if (temp === fieldName) {
                        return this;
                    }
                }
                else if (temp instanceof Array) {
                    for (let j = 0; j < temp.length; j++) {
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
    }
    /**
     * Sorts data in descending order.
     *
     * @param  {string} fieldName - Defines the column field.
     */
    sortByDesc(fieldName) {
        return this.sortBy(fieldName, 'descending');
    }
    /**
     * Groups data with the given field name.
     *
     * @param {string} fieldName - Defines the column field.
     * @param fn
     * @param format
     */
    group(fieldName, fn, format) {
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
    }
    /**
     * Gets data based on the given page index and size.
     *
     * @param  {number} pageIndex - Defines the current page index.
     * @param  {number} pageSize - Defines the no of records per page.
     */
    page(pageIndex, pageSize) {
        this.queries.push({
            fn: 'onPage',
            e: {
                pageIndex: pageIndex,
                pageSize: pageSize
            }
        });
        return this;
    }
    /**
     * Gets data based on the given start and end index.
     *
     * @param  {number} start - Defines the start index of the datasource.
     * @param  {number} end - Defines the end index of the datasource.
     */
    range(start, end) {
        this.queries.push({
            fn: 'onRange',
            e: {
                start: start,
                end: end
            }
        });
        return this;
    }
    /**
     * Gets data from the top of the data source based on given number of records count.
     *
     * @param  {number} nos - Defines the no of records to retrieve from datasource.
     */
    take(nos) {
        this.queries.push({
            fn: 'onTake',
            e: {
                nos: nos
            }
        });
        return this;
    }
    /**
     * Skips data with given number of records count from the top of the data source.
     *
     * @param  {number} nos - Defines the no of records skip in the datasource.
     */
    skip(nos) {
        this.queries.push({
            fn: 'onSkip',
            e: { nos: nos }
        });
        return this;
    }
    /**
     * Selects specified columns from the data source.
     *
     * @param  {string|string[]} fieldNames - Defines the collection of column fields.
     */
    select(fieldNames) {
        if (typeof fieldNames === 'string') {
            fieldNames = [].slice.call([fieldNames], 0);
        }
        this.queries.push({
            fn: 'onSelect',
            e: { fieldNames: fieldNames }
        });
        return this;
    }
    /**
     * Gets the records in hierarchical relationship from two tables. It requires the foreign key to relate two tables.
     *
     * @param  {Query} query - Defines the query to relate two tables.
     * @param  {Function} selectorFn - Defines the custom function to select records.
     */
    hierarchy(query, selectorFn) {
        this.subQuerySelector = selectorFn;
        this.subQuery = query;
        return this;
    }
    /**
     * Sets the foreign key which is used to get data from the related table.
     *
     * @param  {string} key - Defines the foreign key.
     */
    foreignKey(key) {
        this.fKey = key;
        return this;
    }
    /**
     * It is used to get total number of records in the DataManager execution result.
     */
    requiresCount() {
        this.isCountRequired = true;
        return this;
    }
    //type - sum, avg, min, max
    /**
     * Aggregate the data with given type and field name.
     *
     * @param  {string} type - Defines the aggregate type.
     * @param  {string} field - Defines the column field to aggregate.
     */
    aggregate(type, field) {
        this.queries.push({
            fn: 'onAggregates',
            e: { field: field, type: type }
        });
        return this;
    }
    /**
     * Pass array of filterColumn query for performing filter operation.
     *
     * @param  {QueryOptions[]} queries
     * @param  {string} name
     * @hidden
     */
    static filterQueries(queries, name) {
        return queries.filter((q) => {
            return q.fn === name;
        });
    }
    /**
     * To get the list of queries which is already filtered in current data source.
     *
     * @param  {Object[]} queries
     * @param  {string[]} singles
     * @hidden
     */
    static filterQueryLists(queries, singles) {
        const filtered = queries.filter((q) => {
            return singles.indexOf(q.fn) !== -1;
        });
        const res = {};
        for (let i = 0; i < filtered.length; i++) {
            if (!res[filtered[i].fn]) {
                res[filtered[i].fn] = filtered[i].e;
            }
        }
        return res;
    }
}
/**
 * Predicate class is used to generate complex filter criteria.
 * This will be used by DataManager to perform multiple filtering operation.
 */
class Predicate {
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
    constructor(field, operator, value, ignoreCase = false, ignoreAccent, matchCase) {
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
    static and(...args) {
        return Predicate.combinePredicates([].slice.call(args, 0), 'and');
    }
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
    and(field, operator, value, ignoreCase, ignoreAccent) {
        return Predicate.combine(this, field, operator, value, 'and', ignoreCase, ignoreAccent);
    }
    /**
     * Adds n-number of new predicates on existing predicate with “or” condition.
     *
     * @param  {Object[]} args - Defines the collection of predicates.
     */
    static or(...args) {
        return Predicate.combinePredicates([].slice.call(args, 0), 'or');
    }
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
    or(field, operator, value, ignoreCase, ignoreAccent) {
        return Predicate.combine(this, field, operator, value, 'or', ignoreCase, ignoreAccent);
    }
    /**
     * Adds n-number of new predicates on existing predicate with “and not” condition.
     *
     * @param  {Object[]} args - Defines the collection of predicates.
     */
    static ornot(...args) {
        return Predicate.combinePredicates([].slice.call(args, 0), 'or not');
    }
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
    ornot(field, operator, value, ignoreCase, ignoreAccent) {
        return Predicate.combine(this, field, operator, value, 'ornot', ignoreCase, ignoreAccent);
    }
    /**
     * Adds n-number of new predicates on existing predicate with “and not” condition.
     *
     * @param  {Object[]} args - Defines the collection of predicates.
     */
    static andnot(...args) {
        return Predicate.combinePredicates([].slice.call(args, 0), 'and not');
    }
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
    andnot(field, operator, value, ignoreCase, ignoreAccent) {
        return Predicate.combine(this, field, operator, value, 'andnot', ignoreCase, ignoreAccent);
    }
    /**
     * Converts plain JavaScript object to Predicate object.
     *
     * @param  {Predicate[]|Predicate} json - Defines single or collection of Predicate.
     */
    static fromJson(json) {
        if (json instanceof Array) {
            const res = [];
            for (let i = 0, len = json.length; i < len; i++) {
                res.push(this.fromJSONData(json[i]));
            }
            return res;
        }
        const pred = json;
        return this.fromJSONData(pred);
    }
    /**
     * Validate the record based on the predicates.
     *
     * @param  {Object} record - Defines the datasource record.
     */
    validate(record) {
        const predicate = this.predicates ? this.predicates : [];
        let ret;
        let isAnd;
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
        for (let i = 0; i < predicate.length; i++) {
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
    }
    /**
     * Converts predicates to plain JavaScript.
     * This method is uses Json stringify when serializing Predicate object.
     */
    toJson() {
        let predicates;
        let p;
        if (this.isComplex) {
            predicates = [];
            p = this.predicates;
            for (let i = 0; i < p.length; i++) {
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
    }
    static combinePredicates(predicates, operator) {
        if (predicates.length === 1) {
            if (!(predicates[0] instanceof Array)) {
                return predicates[0];
            }
            predicates = predicates[0];
        }
        return new Predicate(predicates[0], operator, predicates.slice(1));
    }
    static combine(pred, field, operator, value, condition, ignoreCase, ignoreAccent) {
        if (field instanceof Predicate) {
            return Predicate[condition](pred, field);
        }
        if (typeof field === 'string') {
            return Predicate[condition](pred, new Predicate(field, operator, value, ignoreCase, ignoreAccent));
        }
        return DataUtil.throwError('Predicate - ' + condition + ' : invalid arguments');
    }
    static fromJSONData(json) {
        const preds = json.predicates || [];
        const len = preds.length;
        const predicates = [];
        let result;
        for (let i = 0; i < len; i++) {
            predicates.push(this.fromJSONData(preds[i]));
        }
        if (!json.isComplex) {
            result = new Predicate(json.field, json.operator, json.value, json.ignoreCase, json.ignoreAccent);
        }
        else {
            result = new Predicate(predicates[0], json.condition, predicates.slice(1));
        }
        return result;
    }
}

/* eslint-disable valid-jsdoc */
const consts = { GroupGuid: '{271bbba0-1ee7}' };
/**
 * Data manager common utility methods.
 *
 * @hidden
 */
class DataUtil {
    /**
     * Returns the value by invoking the provided parameter function.
     * If the paramater is not of type function then it will be returned as it is.
     *
     * @param {Function|string|string[]|number} value
     * @param {Object} inst?
     * @param inst
     * @hidden
     */
    static getValue(value, inst) {
        if (typeof value === 'function') {
            return value.call(inst || {});
        }
        return value;
    }
    /**
     * Returns true if the input string ends with given string.
     *
     * @param  {string} input
     * @param  {string} substr
     */
    static endsWith(input, substr) {
        return input.slice && input.slice(-substr.length) === substr;
    }
    /**
     * Returns true if the input string not ends with given string.
     *
     * @param  {string} input
     * @param  {string} substr
     */
    static notEndsWith(input, substr) {
        return input.slice && input.slice(-substr.length) !== substr;
    }
    /**
     * Returns true if the input string starts with given string.
     *
     * @param {string} str
     * @param {string} startstr
     * @param input
     * @param start
     */
    static startsWith(input, start) {
        return input.slice(0, start.length) === start;
    }
    /**
     * Returns true if the input string not starts with given string.
     *
     * @param {string} str
     * @param {string} startstr
     * @param input
     * @param start
     */
    static notStartsWith(input, start) {
        return input.slice(0, start.length) !== start;
    }
    /**
     * Returns true if the input string pattern(wildcard) matches with given string.
     *
     * @param {string} str
     * @param {string} startstr
     * @param input
     * @param pattern
     */
    static wildCard(input, pattern) {
        let asteriskSplit;
        let optionalSplit;
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
            for (let i = 0; i < asteriskSplit.length; i++) {
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
        const regexPattern = new RegExp(pattern, 'g');
        return regexPattern.test(input);
    }
    /**
     * Returns true if the input string pattern(like) matches with given string.
     *
     * @param {string} str
     * @param {string} startstr
     * @param input
     * @param pattern
     */
    static like(input, pattern) {
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
    }
    /**
     * To return the sorting function based on the string.
     *
     * @param  {string} order
     * @hidden
     */
    static fnSort(order) {
        order = order ? DataUtil.toLowerCase(order) : 'ascending';
        if (order === 'ascending') {
            return this.fnAscending;
        }
        return this.fnDescending;
    }
    /**
     * Comparer function which is used to sort the data in ascending order.
     *
     * @param  {string|number} x
     * @param  {string|number} y
     * @returns number
     */
    static fnAscending(x, y) {
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
    }
    /**
     * Comparer function which is used to sort the data in descending order.
     *
     * @param  {string|number} x
     * @param  {string|number} y
     * @returns number
     */
    static fnDescending(x, y) {
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
    }
    static extractFields(obj, fields) {
        let newObj = {};
        for (let i = 0; i < fields.length; i++) {
            newObj = this.setValue(fields[i], this.getObject(fields[i], obj), newObj);
        }
        return newObj;
    }
    /**
     * Select objects by given fields from jsonArray.
     *
     * @param  {Object[]} jsonArray
     * @param  {string[]} fields
     */
    static select(jsonArray, fields) {
        const newData = [];
        for (let i = 0; i < jsonArray.length; i++) {
            newData.push(this.extractFields(jsonArray[i], fields));
        }
        return newData;
    }
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
    static group(jsonArray, field, aggregates, level, groupDs, format, isLazyLoad) {
        level = level || 1;
        const jsonData = jsonArray;
        const guid = 'GroupGuid';
        if (jsonData.GroupGuid === consts[guid]) {
            for (let j = 0; j < jsonData.length; j++) {
                if (!isNullOrUndefined(groupDs)) {
                    let indx = -1;
                    const temp = groupDs.filter((e) => { return e.key === jsonData[j].key; });
                    indx = groupDs.indexOf(temp[0]);
                    jsonData[j].items = this.group(jsonData[j].items, field, aggregates, jsonData.level + 1, groupDs[indx].items, format, isLazyLoad);
                    jsonData[j].count = groupDs[indx].count;
                }
                else {
                    jsonData[j].items = this.group(jsonData[j].items, field, aggregates, jsonData.level + 1, null, format, isLazyLoad);
                    jsonData[j].count = jsonData[j].items.length;
                }
            }
            jsonData.childLevels += 1;
            return jsonData;
        }
        const grouped = {};
        const groupedArray = [];
        groupedArray.GroupGuid = consts[guid];
        groupedArray.level = level;
        groupedArray.childLevels = 0;
        groupedArray.records = jsonData;
        for (let i = 0; i < jsonData.length; i++) {
            let val = this.getVal(jsonData, i, field);
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
                    const tempObj = groupDs.filter((e) => { return e.key === grouped[val].key; });
                    grouped[val].count = tempObj[0].count;
                }
            }
            grouped[val].count = !isNullOrUndefined(groupDs) ? grouped[val].count : grouped[val].count += 1;
            if (!isLazyLoad || (isLazyLoad && aggregates.length)) {
                grouped[val].items.push(jsonData[i]);
            }
        }
        if (aggregates && aggregates.length) {
            for (let i = 0; i < groupedArray.length; i++) {
                const res = {};
                let fn;
                const aggs = aggregates;
                for (let j = 0; j < aggregates.length; j++) {
                    fn = DataUtil.aggregates[aggregates[j].type];
                    if (!isNullOrUndefined(groupDs)) {
                        const temp = groupDs.filter((e) => { return e.key === groupedArray[i].key; });
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
            }
        }
        if (isLazyLoad && groupedArray.length && aggregates.length) {
            for (let i = 0; i < groupedArray.length; i++) {
                groupedArray[i].items = [];
            }
        }
        return jsonData.length && groupedArray || jsonData;
    }
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
    static buildHierarchy(fKey, from, source, lookup, pKey) {
        let i;
        const grp = {};
        let temp;
        if (lookup.result) {
            lookup = lookup.result;
        }
        if (lookup.GroupGuid) {
            this.throwError('DataManager: Do not have support Grouping in hierarchy');
        }
        for (i = 0; i < lookup.length; i++) {
            const fKeyData = this.getObject(fKey, lookup[i]);
            temp = grp[fKeyData] || (grp[fKeyData] = []);
            temp.push(lookup[i]);
        }
        for (i = 0; i < source.length; i++) {
            const fKeyData = this.getObject(pKey || fKey, source[i]);
            source[i][from] = grp[fKeyData];
        }
    }
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
    static getFieldList(obj, fields, prefix) {
        if (prefix === undefined) {
            prefix = '';
        }
        if (fields === undefined || fields === null) {
            return this.getFieldList(obj, [], prefix);
        }
        const copyObj = obj;
        const keys = Object.keys(obj);
        for (const prop of keys) {
            if (typeof copyObj[prop] === 'object' && !(copyObj[prop] instanceof Array)) {
                this.getFieldList(copyObj[prop], fields, prefix + prop + '.');
            }
            else {
                fields.push(prefix + prop);
            }
        }
        return fields;
    }
    /**
     * Gets the value of the property in the given object.
     * The complex object can be accessed by providing the field names concatenated with dot(.).
     *
     * @param  {string} nameSpace - The name of the property to be accessed.
     * @param  {Object} from - Defines the source object.
     */
    static getObject(nameSpace, from) {
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
                const lowerCaseNameSpace = nameSpace.charAt(0).toLowerCase() + nameSpace.slice(1);
                const upperCaseNameSpace = nameSpace.charAt(0).toUpperCase() + nameSpace.slice(1);
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
        let value = from;
        const splits = nameSpace.split('.');
        for (let i = 0; i < splits.length; i++) {
            if (value == null) {
                break;
            }
            value = value[splits[i]];
            if (value === undefined) {
                const casing = splits[i].charAt(0).toUpperCase() + splits[i].slice(1);
                value = from[casing] || from[casing.charAt(0).toLowerCase() + casing.slice(1)] || null;
            }
            from = value;
        }
        return value;
    }
    /**
     * To set value for the nameSpace in desired object.
     *
     * @param {string} nameSpace - String value to the get the inner object.
     * @param {Object} value - Value that you need to set.
     * @param {Object} obj - Object to get the inner object value.
     * @return { [key: string]: Object; } | Object
     * @hidden
     */
    static setValue(nameSpace, value, obj) {
        const keys = nameSpace.toString().split('.');
        const start = obj || {};
        let fromObj = start;
        let i;
        const length = keys.length;
        let key;
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
    }
    /**
     * Sort the given data based on the field and comparer.
     *
     * @param  {Object[]} dataSource - Defines the input data.
     * @param  {string} field - Defines the field to be sorted.
     * @param  {Function} comparer - Defines the comparer function used to sort the records.
     */
    static sort(dataSource, field, comparer) {
        if (dataSource.length <= 1) {
            return dataSource;
        }
        return dataSource.slice()
            .sort((a, b) => comparer(this.getVal([a], 0, field), this.getVal([b], 0, field), a, b));
    }
    static ignoreDiacritics(value) {
        if (typeof value !== 'string') {
            return value;
        }
        const result = value.split('');
        const newValue = result.map((temp) => temp in DataUtil.diacritics ? DataUtil.diacritics[temp] : temp);
        return newValue.join('');
    }
    static ignoreDiacriticsForArrays(valueArray) {
        if (!Array.isArray(valueArray)) {
            return [];
        }
        return valueArray.map(item => {
            return DataUtil.ignoreDiacritics(item);
        });
    }
    static merge(left, right, fieldName, comparer) {
        const result = [];
        let current;
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
    }
    static getVal(array, index, field) {
        return field ? this.getObject(field, array[index]) : array[index];
    }
    static toLowerCase(val) {
        if (isNullOrUndefined(val))
            return '';
        if (typeof val === 'string')
            return val.toLowerCase();
        if (val instanceof Date)
            return val.toString().toLowerCase();
        return val.toString();
    }
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
    static callAdaptorFunction(adaptor, fnName, param1, param2) {
        if (fnName in adaptor) {
            const res = adaptor[fnName](param1, param2);
            if (!isNullOrUndefined(res)) {
                param1 = res;
            }
        }
        return param1;
    }
    static getAddParams(adp, dm, query) {
        const req = {};
        DataUtil.callAdaptorFunction(adp, 'addParams', {
            dm: dm,
            query: query,
            params: query ? query.params : [],
            reqParams: req
        });
        return req;
    }
    /**
     * Checks wheather the given input is a plain object or not.
     *
     * @param  {Object|Object[]} obj
     */
    static isPlainObject(obj) {
        return (!!obj) && (obj.constructor === Object);
    }
    /**
     * Returns true when the browser cross origin request.
     */
    static isCors() {
        let xhr = null;
        const request = 'XMLHttpRequest';
        try {
            xhr = new window[request]();
        }
        catch (e) {
            // No exception handling
        }
        return !!xhr && ('withCredentials' in xhr);
    }
    /**
     * Generate random GUID value which will be prefixed with the given value.
     *
     * @param  {string} prefix
     */
    static getGuid(prefix) {
        const hexs = '0123456789abcdef';
        let rand;
        return (prefix || '') + '00000000-0000-4000-0000-000000000000'.replace(/0/g, (val, i) => {
            if ('crypto' in window && 'getRandomValues' in crypto) {
                const arr = new Uint8Array(1);
                window.crypto.getRandomValues(arr);
                rand = arr[0] % 16 | 0;
            }
            else {
                rand = Math.random() * 16 | 0;
            }
            return hexs[i === 19 ? rand & 0x3 | 0x8 : rand];
        });
    }
    /**
     * Checks wheather the given value is null or not.
     *
     * @param  {string|Object} val
     * @returns boolean
     */
    static isNull(val) {
        return val === undefined || val === null;
    }
    /**
     * To get the required items from collection of objects.
     *
     * @param  {Object[]} array
     * @param  {string} field
     * @param  {Function} comparer
     * @returns Object
     * @hidden
     */
    static getItemFromComparer(array, field, comparer) {
        let keyVal;
        let current;
        let key;
        let i = 0;
        const castRequired = typeof DataUtil.getVal(array, 0, field) === 'string';
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
    }
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
    static distinct(json, fieldName, requiresCompleteRecord) {
        requiresCompleteRecord = isNullOrUndefined(requiresCompleteRecord) ? false : requiresCompleteRecord;
        const result = [];
        let val;
        const tmp = {};
        json.forEach((data, index) => {
            val = typeof (json[index]) === 'object' ? DataUtil.getVal(json, index, fieldName) : json[index];
            if (!(val in tmp)) {
                result.push(!requiresCompleteRecord ? val : json[index]);
                tmp[val] = 1;
            }
        });
        return result;
    }
    /**
     * Process the given records based on the datamanager string.
     *
     * @param {string} datamanager
     * @param dm
     * @param {Object[]} records
     */
    static processData(dm, records) {
        const query = this.prepareQuery(dm);
        const sampledata = new DataManager(records);
        if (dm.requiresCounts) {
            query.requiresCount();
        }
        /* eslint-disable @typescript-eslint/no-explicit-any */
        // tslint:disable-next-line:no-any
        const result = sampledata.executeLocal(query);
        /* eslint-enable @typescript-eslint/no-explicit-any */
        const returnValue = {
            result: dm.requiresCounts ? result.result : result,
            count: result.count,
            aggregates: JSON.stringify(result.aggregates)
        };
        return dm.requiresCounts ? returnValue : result;
    }
    static prepareQuery(dm) {
        const query = new Query();
        if (dm.select) {
            query.select(dm.select);
        }
        if (dm.where) {
            const where = DataUtil.parse.parseJson(dm.where);
            where.filter((pred) => {
                if (isNullOrUndefined(pred.condition)) {
                    query.where(pred.field, pred.operator, pred.value, pred.ignoreCase, pred.ignoreAccent);
                }
                else {
                    let predicateList = [];
                    if (pred.field) {
                        predicateList.push(new Predicate(pred.field, pred.operator, pred.value, pred.ignoreCase, pred.ignoreAccent));
                    }
                    else {
                        predicateList = predicateList.concat(this.getPredicate(pred.predicates));
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
            const search = DataUtil.parse.parseJson(dm.search);
            // tslint:disable-next-line:no-string-literal
            search.filter((e) => query.search(e.key, e.fields, e['operator'], 
            // tslint:disable-next-line:no-string-literal
            e['ignoreCase'], e['ignoreAccent']));
        }
        if (dm.aggregates) {
            dm.aggregates.filter((e) => query.aggregate(e.type, e.field));
        }
        if (dm.sorted) {
            dm.sorted.filter((e) => query.sortBy(e.name, e.direction));
        }
        if (dm.skip) {
            query.skip(dm.skip);
        }
        if (dm.take) {
            query.take(dm.take);
        }
        if (dm.group) {
            dm.group.filter((grp) => query.group(grp));
        }
        return query;
    }
    static getPredicate(pred) {
        const mainPred = [];
        for (let i = 0; i < pred.length; i++) {
            const e = pred[i];
            if (e.field) {
                mainPred.push(new Predicate(e.field, e.operator, e.value, e.ignoreCase, e.ignoreAccent));
            }
            else {
                const childPred = [];
                // tslint:disable-next-line:typedef
                const cpre = this.getPredicate(e.predicates);
                for (const prop of Object.keys(cpre)) {
                    childPred.push(cpre[prop]);
                }
                mainPred.push(e.condition === 'or' ? Predicate.or(childPred) : Predicate.and(childPred));
            }
        }
        return mainPred;
    }
}
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
DataUtil.throwError = (error) => {
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
    sum: (ds, field) => {
        let result = 0;
        let val;
        const castRequired = typeof DataUtil.getVal(ds, 0, field) !== 'number';
        for (let i = 0; i < ds.length; i++) {
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
    average: (ds, field) => {
        return DataUtil.aggregates.sum(ds, field) / ds.length;
    },
    /**
     * Returns the min value of the data based on the field.
     *
     * @param  {Object[]} ds
     * @param  {string|Function} field
     */
    min: (ds, field) => {
        let comparer;
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
    max: (ds, field) => {
        let comparer;
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
    truecount: (ds, field) => {
        return new DataManager(ds).executeLocal(new Query().where(field, 'equal', true, true)).length;
    },
    /**
     * Returns the total number of false value present in the data based on the given boolean field name.
     *
     * @param  {Object[]} ds
     * @param  {string} field
     */
    falsecount: (ds, field) => {
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
    count: (ds, field) => {
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
    equal: (actual, expected, ignoreCase, ignoreAccent) => {
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
    notequal: (actual, expected, ignoreCase, ignoreAccent) => {
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
    lessthan: (actual, expected, ignoreCase) => {
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
    greaterthan: (actual, expected, ignoreCase) => {
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
    lessthanorequal: (actual, expected, ignoreCase) => {
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
    greaterthanorequal: (actual, expected, ignoreCase) => {
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
    contains: (actual, expected, ignoreCase, ignoreAccent) => {
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
    doesnotcontain: (actual, expected, ignoreCase, ignoreAccent) => {
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
    isnotnull: (actual) => {
        return actual !== null && actual !== undefined;
    },
    /**
     * Returns true when the given input value is null.
     *
     * @param  {string|number} actual
     * @returns boolean
     */
    isnull: (actual) => {
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
    startswith: (actual, expected, ignoreCase, ignoreAccent) => {
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
    doesnotstartwith: (actual, expected, ignoreCase, ignoreAccent) => {
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
    like: (actual, expected, ignoreCase, ignoreAccent) => {
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
    isempty: (actual) => {
        return actual === undefined || actual === '';
    },
    /**
     * Returns true when the given input value is not empty.
     *
     * @param  {string|number} actual
     * @returns boolean
     */
    isnotempty: (actual) => {
        return actual !== undefined && actual !== '';
    },
    /**
     * Returns true when the actual input pattern(wildcard) matches with the given string.
     *
     * @param  {string|Date} actual
     * @param  {string} expected
     * @param  {boolean} ignoreCase?
     */
    wildcard: (actual, expected, ignoreCase, ignoreAccent) => {
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
    endswith: (actual, expected, ignoreCase, ignoreAccent) => {
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
    doesnotendwith: (actual, expected, ignoreCase, ignoreAccent) => {
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
    processSymbols: (operator) => {
        const fnName = DataUtil.operatorSymbols[operator];
        if (fnName) {
            const fn = DataUtil.fnOperators[fnName];
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
    processOperator: (operator) => {
        const fn = DataUtil.fnOperators[operator];
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
    in: (actual, expectedArray, ignoreCase, ignoreAccent) => {
        if (ignoreAccent) {
            actual = DataUtil.ignoreDiacritics(actual);
            expectedArray = DataUtil.ignoreDiacriticsForArrays(expectedArray);
        }
        if (ignoreCase) {
            return !isNullOrUndefined(actual) && expectedArray && expectedArray.length > 0 && expectedArray
                .map(item => DataUtil.toLowerCase(item)).indexOf(DataUtil.toLowerCase(actual)) > -1;
        }
        if (actual instanceof Date) {
            return !isNullOrUndefined(actual) && expectedArray && expectedArray.length > 0 && Array.isArray(expectedArray) &&
                expectedArray.some(item => item instanceof Date && item.getTime() === actual.getTime());
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
    notin: (actual, expectedArray, ignoreCase, ignoreAccent) => {
        if (ignoreAccent) {
            actual = DataUtil.ignoreDiacritics(actual);
            expectedArray = DataUtil.ignoreDiacriticsForArrays(expectedArray);
        }
        if (ignoreCase) {
            return !isNullOrUndefined(actual) && expectedArray && expectedArray.length > 0 && expectedArray
                .map(item => DataUtil.toLowerCase(item)).indexOf(DataUtil.toLowerCase(actual)) === -1;
        }
        if (actual instanceof Date) {
            return !isNullOrUndefined(actual) && expectedArray && expectedArray.length > 0 && Array.isArray(expectedArray) &&
                expectedArray.every(item => !(item instanceof Date) || item.getTime() !== actual.getTime());
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
    parseJson: (jsonText) => {
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
    iterateAndReviveArray: (array) => {
        for (let i = 0; i < array.length; i++) {
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
    iterateAndReviveJson: (json) => {
        let value;
        const keys = Object.keys(json);
        for (const prop of keys) {
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
    jsonReviver: (field, value) => {
        if (typeof value === 'string') {
            // eslint-disable-next-line security/detect-unsafe-regex
            const ms = /^\/Date\(([+-]?[0-9]+)([+-][0-9]{4})?\)\/$/.exec(value);
            const offSet = DataUtil.timeZoneHandling ? DataUtil.serverTimezoneOffset : null;
            if (ms) {
                return DataUtil.dateParse.toTimeZone(new Date(parseInt(ms[1], 10)), offSet, true);
                // eslint-disable-next-line no-useless-escape, security/detect-unsafe-regex
            }
            else if (/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
                const isUTC = value.indexOf('Z') > -1 || value.indexOf('z') > -1;
                const arr = value.split(/[^0-9.]/);
                if (isUTC) {
                    if (arr[5].indexOf('.') > -1) {
                        const secondsMs = arr[5].split('.');
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
                    const utcFormat = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), parseInt(arr[4], 10), parseInt(arr[5] ? arr[5] : '00', 10));
                    const hrs = parseInt(arr[6], 10);
                    const mins = parseInt(arr[7], 10);
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
    isJson: (jsonData) => {
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
    isGuid: (value) => {
        // eslint-disable-next-line security/detect-unsafe-regex
        const regex = /[A-Fa-f0-9]{8}(?:-[A-Fa-f0-9]{4}){3}-[A-Fa-f0-9]{12}/i;
        const match = regex.exec(value);
        return match != null;
    },
    /**
     * The method used to replace the value based on the type.
     *
     * @param  {Object} value
     * @param  {boolean} stringify
     * @hidden
     */
    replacer: (value, stringify) => {
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
    jsonReplacer: (val, stringify) => {
        let value;
        const keys = Object.keys(val);
        for (const prop of keys) {
            value = val[prop];
            if (!(value instanceof Date)) {
                continue;
            }
            let d = value;
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
    arrayReplacer: (val) => {
        for (let i = 0; i < val.length; i++) {
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
    jsonDateReplacer: (key, value) => {
        /* eslint-enable @typescript-eslint/no-explicit-any */
        if (key === 'value' && value) {
            if (typeof value === 'string') {
                // eslint-disable-next-line security/detect-unsafe-regex
                const ms = /^\/Date\(([+-]?[0-9]+)([+-][0-9]{4})?\)\/$/.exec(value);
                if (ms) {
                    value = DataUtil.dateParse.toTimeZone(new Date(parseInt(ms[1], 10)), null, true);
                    // eslint-disable-next-line no-useless-escape, security/detect-unsafe-regex
                }
                else if (/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
                    const arr = value.split(/[^0-9]/);
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
    addSelfOffset: (input) => {
        return new Date(+input - (input.getTimezoneOffset() * 60000));
    },
    toUTC: (input) => {
        return new Date(+input + (input.getTimezoneOffset() * 60000));
    },
    toTimeZone: (input, offset, utc) => {
        if (offset === null) {
            return input;
        }
        const unix = utc ? DataUtil.dateParse.toUTC(input) : input;
        return new Date(+unix - (offset * 3600000));
    },
    toLocalTime: (input) => {
        const datefn = input;
        const timeZone = -datefn.getTimezoneOffset();
        const differenceString = timeZone >= 0 ? '+' : '-';
        const localtimefn = (num) => {
            const norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
        const val = datefn.getFullYear() + '-' + localtimefn(datefn.getMonth() + 1) + '-' + localtimefn(datefn.getDate()) +
            'T' + localtimefn(datefn.getHours()) +
            ':' + localtimefn(datefn.getMinutes()) +
            ':' + localtimefn(datefn.getSeconds()) +
            differenceString + localtimefn(timeZone / 60) +
            ':' + localtimefn(timeZone % 60);
        return val;
    }
};

const consts$1 = { GroupGuid: '{271bbba0-1ee7}' };
/**
 * Adaptors are specific data source type aware interfaces that are used by DataManager to communicate with DataSource.
 * This is the base adaptor class that other adaptors can extend.
 *
 * @hidden
 */
class Adaptor {
    /**
     * Constructor for Adaptor class
     *
     * @param {DataOptions} ds?
     * @param ds
     * @hidden
     * @returns aggregates
     */
    constructor(ds) {
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
    processResponse(data, ds, query, xhr) {
        return data;
    }
}
/**
 * JsonAdaptor is used to process JSON data. It contains methods to process the given JSON data based on the queries.
 *
 * @hidden
 */
class JsonAdaptor extends Adaptor {
    /**
     * Process the JSON data based on the provided queries.
     *
     * @param  {DataManager} dataManager
     * @param  {Query} query
     * @returns Object
     */
    processQuery(dataManager, query) {
        let result = dataManager.dataSource.json.slice(0);
        let count = result.length;
        let countFlg = true;
        let ret;
        let key;
        const lazyLoad = {};
        let keyCount = 0;
        const group = [];
        const sort = [];
        let page;
        for (let i = 0; i < query.lazyLoad.length; i++) {
            keyCount++;
            lazyLoad[query.lazyLoad[i].key] = query.lazyLoad[i].value;
        }
        const agg = {};
        let isGroupByFormat = false;
        if (query.lazyLoad.length) {
            for (let i = 0; i < query.queries.length; i++) {
                key = query.queries[i];
                if (key.fn === 'onGroup' && !isNullOrUndefined(key.e.format)) {
                    isGroupByFormat = true;
                    break;
                }
            }
        }
        for (let i = 0; i < query.queries.length; i++) {
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
            const args = {
                query: query, lazyLoad: lazyLoad, result: result, group: group, page: page, sort: sort
            };
            const lazyLoadData = this.lazyLoadGroup(args);
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
    }
    /**
     * Perform lazy load grouping in JSON array based on the given query and lazy load details.
     *
     * @param  {LazyLoadGroupArgs} args
     */
    lazyLoadGroup(args) {
        let count = 0;
        const agg = this.getAggregate(args.query);
        let result = args.result;
        if (!isNullOrUndefined(args.lazyLoad.onDemandGroupInfo)) {
            const req = args.lazyLoad.onDemandGroupInfo;
            for (let i = req.where.length - 1; i >= 0; i--) {
                result = this.onWhere(result, req.where[i]);
            }
            if (args.group.length !== req.level) {
                const field = args.group[req.level].fieldName;
                result = DataUtil.group(result, field, agg, null, null, args.group[req.level].comparer, true);
                if (args.sort.length) {
                    result = this.onSortBy(result, args.sort[parseInt(req.level.toString(), 10)], args.query, true);
                }
            }
            else {
                for (let i = args.sort.length - 1; i >= req.level; i--) {
                    result = this.onSortBy(result, args.sort[parseInt(i.toString(), 10)], args.query, false);
                }
            }
            count = result.length;
            const data = result;
            result = result.slice(req.skip);
            result = result.slice(0, req.take);
            if (args.group.length !== req.level) {
                this.formGroupResult(result, data);
            }
        }
        else {
            const field = args.group[0].fieldName;
            result = DataUtil.group(result, field, agg, null, null, args.group[0].comparer, true);
            count = result.length;
            const data = result;
            if (args.sort.length) {
                const sort = args.sort.length > 1 ?
                    args.sort.filter((x) => x.fieldName === field)[0] : args.sort[0];
                result = this.onSortBy(result, sort, args.query, true);
            }
            if (args.page) {
                result = this.onPage(result, args.page, args.query);
            }
            this.formGroupResult(result, data);
        }
        return { result: result, count: count };
    }
    formGroupResult(result, data) {
        if (result.length && data.length) {
            const uid = 'GroupGuid';
            const childLevel = 'childLevels';
            const level = 'level';
            const records = 'records';
            result[uid] = data[uid];
            result[childLevel] = data[childLevel];
            result[level] = data[level];
            result[records] = data[records];
        }
        return result;
    }
    /**
     * Separate the aggregate query from the given queries
     *
     * @param  {Query} query
     */
    getAggregate(query) {
        const aggQuery = Query.filterQueries(query.queries, 'onAggregates');
        const agg = [];
        if (aggQuery.length) {
            let tmp;
            for (let i = 0; i < aggQuery.length; i++) {
                tmp = aggQuery[i].e;
                agg.push({ type: tmp.type, field: DataUtil.getValue(tmp.field, query) });
            }
        }
        return agg;
    }
    /**
     * Performs batch update in the JSON array which add, remove and update records.
     *
     * @param  {DataManager} dm
     * @param  {CrudOptions} changes
     * @param  {RemoteArgs} e
     */
    batchRequest(dm, changes, e) {
        let i;
        const deletedRecordsLen = changes.deletedRecords.length;
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
    }
    /**
     * Performs filter operation with the given data and where query.
     *
     * @param {Object[]} ds
     * @param {{validate:Function}} e
     * @param e.validate
     */
    onWhere(ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.filter((obj) => {
            if (e) {
                return e.validate(obj);
            }
        });
    }
    /**
     * Returns aggregate function based on the aggregate type.
     *
     * @param {Object[]} ds
     * @param e
     * @param {string} } type
     * @param e.field
     * @param e.type
     */
    onAggregates(ds, e) {
        const fn = DataUtil.aggregates[e.type];
        if (!ds || !fn || ds.length === 0) {
            return null;
        }
        return fn(ds, e.field);
    }
    /**
     * Performs search operation based on the given query.
     *
     * @param  {Object[]} ds
     * @param  {QueryOptions} e
     */
    onSearch(ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        if (e.fieldNames.length === 0) {
            DataUtil.getFieldList(ds[0], e.fieldNames);
        }
        return ds.filter((obj) => {
            for (let j = 0; j < e.fieldNames.length; j++) {
                if (e.comparer.call(obj, DataUtil.getObject(e.fieldNames[j], obj), e.searchKey, e.ignoreCase, e.ignoreAccent)) {
                    return true;
                }
            }
            return false;
        });
    }
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
    onSortBy(ds, e, query, isLazyLoadGroupSort) {
        if (!ds || !ds.length) {
            return ds;
        }
        let fnCompare;
        let field = DataUtil.getValue(e.fieldName, query);
        if (!field) {
            return ds.sort(e.comparer);
        }
        if (field instanceof Array) {
            field = field.slice(0);
            for (let i = field.length - 1; i >= 0; i--) {
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
    }
    /**
     * Group the data based on the given query.
     *
     * @param  {Object[]} ds
     * @param  {QueryOptions} e
     * @param  {Query} query
     */
    onGroup(ds, e, query) {
        if (!ds || !ds.length) {
            return ds;
        }
        const agg = this.getAggregate(query);
        return DataUtil.group(ds, DataUtil.getValue(e.fieldName, query), agg, null, null, e.comparer);
    }
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
    onPage(ds, e, query) {
        const size = DataUtil.getValue(e.pageSize, query);
        const start = (DataUtil.getValue(e.pageIndex, query) - 1) * size;
        const end = start + size;
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(start, end);
    }
    /**
     * Retrieves records based on the given start and end index from query.
     *
     * @param {Object[]} ds
     * @param e
     * @param {number} } end
     * @param e.start
     * @param e.end
     */
    onRange(ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(DataUtil.getValue(e.start), DataUtil.getValue(e.end));
    }
    /**
     * Picks the given count of records from the top of the datasource.
     *
     * @param {Object[]} ds
     * @param {{nos:number}} e
     * @param e.nos
     */
    onTake(ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(0, DataUtil.getValue(e.nos));
    }
    /**
     * Skips the given count of records from the data source.
     *
     * @param {Object[]} ds
     * @param {{nos:number}} e
     * @param e.nos
     */
    onSkip(ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(DataUtil.getValue(e.nos));
    }
    /**
     * Selects specified columns from the data source.
     *
     * @param {Object[]} ds
     * @param {{fieldNames:string}} e
     * @param e.fieldNames
     */
    onSelect(ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return DataUtil.select(ds, DataUtil.getValue(e.fieldNames));
    }
    /**
     * Inserts new record in the table.
     *
     * @param {DataManager} dm
     * @param {Object} data
     * @param tableName
     * @param query
     * @param {number} position
     */
    insert(dm, data, tableName, query, position) {
        if (isNullOrUndefined(position)) {
            return dm.dataSource.json.push(data);
        }
        else {
            return dm.dataSource.json.splice(position, 0, data);
        }
    }
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
    remove(dm, keyField, value, tableName) {
        const ds = dm.dataSource.json;
        let i;
        if (typeof value === 'object' && !(value instanceof Date)) {
            value = DataUtil.getObject(keyField, value);
        }
        for (i = 0; i < ds.length; i++) {
            if (DataUtil.getObject(keyField, ds[i]) === value) {
                break;
            }
        }
        return i !== ds.length ? ds.splice(i, 1) : null;
    }
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
    update(dm, keyField, value, tableName) {
        const ds = dm.dataSource.json;
        let i;
        let key;
        if (!isNullOrUndefined(keyField)) {
            key = getValue(keyField, value);
        }
        for (i = 0; i < ds.length; i++) {
            if (!isNullOrUndefined(keyField) && (getValue(keyField, ds[i])) === key) {
                break;
            }
        }
        return i < ds.length ? merge(ds[i], value) : null;
    }
}
/**
 * URL Adaptor of DataManager can be used when you are required to use remote service to retrieve data.
 * It interacts with server-side for all DataManager Queries and CRUD operations.
 *
 * @hidden
 */
class UrlAdaptor extends Adaptor {
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
    processQuery(dm, query, hierarchyFilters) {
        const queries = this.getQueryRequest(query);
        const singles = Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
        const params = query.params;
        const url = dm.dataSource.url;
        let temp;
        let skip;
        let take = null;
        const options = this.options;
        const request = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
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
        for (let i = 0; i < queries.sorts.length; i++) {
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
        for (let i = 0; i < queries.filters.length; i++) {
            let res = DataUtil.callAdaptorFunction(this, 'onEachWhere', queries.filters[i].e.toJson(), query);
            if ((this.getModuleName &&
                this.getModuleName() === 'ODataV4Adaptor') &&
                !isNullOrUndefined(queries.filters[i].e.key) && queries.filters.length > 1) {
                res = '(' + res + ')';
            }
            request.filters.push(res);
            const keys = typeof request.filters[i] === 'object' ? Object.keys(request.filters[i]) : [];
            for (const prop of keys) {
                if (DataUtil.isNull((request)[prop])) {
                    delete request[prop];
                }
            }
        }
        // Searches
        for (let i = 0; i < queries.searches.length; i++) {
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
        for (let i = 0; i < queries.groups.length; i++) {
            request.groups.push(DataUtil.getValue(queries.groups[i].e.fieldName, query));
        }
        // aggregates
        for (let i = 0; i < queries.aggregates.length; i++) {
            temp = queries.aggregates[i].e;
            request.aggregates.push({ type: temp.type, field: DataUtil.getValue(temp.field, query) });
        }
        const req = {};
        this.getRequestQuery(options, query, singles, request, req);
        // Params
        DataUtil.callAdaptorFunction(this, 'addParams', { dm: dm, query: query, params: params, reqParams: req });
        if (query.lazyLoad.length) {
            for (let i = 0; i < query.lazyLoad.length; i++) {
                req[query.lazyLoad[i].key] = query.lazyLoad[i].value;
            }
        }
        // cleanup
        const keys = Object.keys(req);
        for (const prop of keys) {
            if (DataUtil.isNull(req[prop]) || req[prop] === '' || req[prop].length === 0) {
                delete req[prop];
            }
        }
        if (!(options.skip in req && options.take in req) && take !== null) {
            req[options.skip] = DataUtil.callAdaptorFunction(this, 'onSkip', skip, query);
            req[options.take] = DataUtil.callAdaptorFunction(this, 'onTake', take, query);
        }
        const p = this.pvt;
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
    }
    getRequestQuery(options, query, singles, request, request1) {
        const param = 'param';
        const req = request1;
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
    }
    /**
     * Convert the object from processQuery to string which can be added query string.
     *
     * @param {Object} req
     * @param request
     * @param {Query} query
     * @param {DataManager} dm
     */
    convertToQueryString(request, query, dm) {
        return '';
        // this needs to be overridden
    }
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
    processResponse(data, ds, query, xhr, request, changes) {
        if (xhr && xhr.headers.get('Content-Type') &&
            xhr.headers.get('Content-Type').indexOf('application/json') !== -1) {
            const handleTimeZone = DataUtil.timeZoneHandling;
            if (ds && !ds.timeZoneHandling) {
                DataUtil.timeZoneHandling = false;
            }
            if (!ds.enableCache) {
                data = DataUtil.parse.parseJson(data);
            }
            DataUtil.timeZoneHandling = handleTimeZone;
        }
        const requests = request;
        const pvt = requests.pvtData || {};
        const groupDs = data ? data.groupDs : [];
        if (xhr && xhr.headers.get('Content-Type') &&
            xhr.headers.get('Content-Type').indexOf('xml') !== -1) {
            return (query.isCountRequired ? { result: [], count: 0 } : []);
        }
        const d = JSON.parse(requests.data);
        if (d && d.action === 'batch' && data && data.addedRecords && !isNullOrUndefined(changes)) {
            changes.addedRecords = data.addedRecords;
            return changes;
        }
        if (data && data.d) {
            data = data.d;
        }
        const args = {};
        if (data && 'count' in data) {
            args.count = data.count;
        }
        args.result = data && data.result ? data.result : data;
        let isExpand = false;
        if (Array.isArray(data.result) && data.result.length) {
            const key = 'key';
            const val = 'value';
            const level = 'level';
            if (!isNullOrUndefined(data.result[0][key])) {
                args.result = this.formRemoteGroupedData(args.result, 1, pvt.groups.length - 1);
            }
            if (query && query.lazyLoad.length && pvt.groups.length) {
                for (let i = 0; i < query.lazyLoad.length; i++) {
                    if (query.lazyLoad[i][key] === 'onDemandGroupInfo') {
                        const value = query.lazyLoad[i][val][level];
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
    }
    formRemoteGroupedData(data, level, childLevel) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].items.length && Object.keys(data[i].items[0]).indexOf('key') > -1) {
                this.formRemoteGroupedData(data[i].items, level + 1, childLevel - 1);
            }
        }
        const uid = 'GroupGuid';
        const childLvl = 'childLevels';
        const lvl = 'level';
        const records = 'records';
        data[uid] = consts$1[uid];
        data[lvl] = level;
        data[childLvl] = childLevel;
        data[records] = data[0].items.length ? this.getGroupedRecords(data, !isNullOrUndefined(data[0].items[records])) : [];
        return data;
    }
    getGroupedRecords(data, hasRecords) {
        let childGroupedRecords = [];
        const records = 'records';
        for (let i = 0; i < data.length; i++) {
            if (!hasRecords) {
                for (let j = 0; j < data[i].items.length; j++) {
                    childGroupedRecords.push(data[i].items[j]);
                }
            }
            else {
                childGroupedRecords = childGroupedRecords.concat(data[i].items[records]);
            }
        }
        return childGroupedRecords;
    }
    /**
     * Add the group query to the adaptor`s option.
     *
     * @param  {Object[]} e
     * @returns void
     */
    onGroup(e) {
        this.pvt.groups = e;
        return e;
    }
    /**
     * Add the aggregate query to the adaptor`s option.
     *
     * @param  {Aggregates[]} e
     * @returns void
     */
    onAggregates(e) {
        this.pvt.aggregates = e;
    }
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
    batchRequest(dm, changes, e, query, original) {
        let url;
        let key;
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
    }
    /**
     * Method will trigger before send the request to server side.
     * Used to set the custom header or modify the request options.
     *
     * @param  {DataManager} dm
     * @param  {Request} request
     * @param  {Fetch} settings?
     * @returns void
     */
    beforeSend(dm, request, settings) {
        // need to extend this method
    }
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     *
     * @param {DataManager} dm
     * @param {Object} data
     * @param {string} tableName
     * @param query
     */
    insert(dm, data, tableName, query) {
        return {
            url: dm.dataSource.insertUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            data: JSON.stringify(extend({}, {
                value: data,
                table: tableName,
                action: 'insert'
            }, DataUtil.getAddParams(this, dm, query)))
        };
    }
    /**
     * Prepare and return request body which is used to remove record from the table.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {number|string} value
     * @param {string} tableName
     * @param query
     */
    remove(dm, keyField, value, tableName, query) {
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
    }
    /**
     * Prepare and return request body which is used to update record.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {Object} value
     * @param {string} tableName
     * @param query
     */
    update(dm, keyField, value, tableName, query) {
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
    }
    /**
     * To generate the predicate based on the filtered query.
     *
     * @param  {Object[]|string[]|number[]} data
     * @param  {Query} query
     * @hidden
     */
    getFiltersFrom(data, query) {
        const key = query.fKey;
        let value;
        let prop = key;
        const pKey = query.key;
        const predicats = [];
        if (typeof data[0] !== 'object') {
            prop = null;
        }
        for (let i = 0; i < data.length; i++) {
            if (typeof data[0] === 'object') {
                value = DataUtil.getObject(pKey || prop, data[i]);
            }
            else {
                value = data[i];
            }
            predicats.push(new Predicate(key, 'equal', value));
        }
        return Predicate.or(predicats);
    }
    getAggregateResult(pvt, data, args, groupDs, query) {
        let pData = data;
        if (data && data.result) {
            pData = data.result;
        }
        if (pvt && pvt.aggregates && pvt.aggregates.length) {
            const agg = pvt.aggregates;
            let fn;
            let aggregateData = pData;
            const res = {};
            if (data.aggregate) {
                aggregateData = data.aggregate;
            }
            for (let i = 0; i < agg.length; i++) {
                fn = DataUtil.aggregates[agg[i].type];
                if (fn) {
                    res[agg[i].field + ' - ' + agg[i].type] = fn(aggregateData, agg[i].field);
                }
            }
            args.aggregates = res;
        }
        const key = 'key';
        const isServerGrouping = Array.isArray(data.result) && data.result.length && !isNullOrUndefined(data.result[0][key]);
        if (pvt && pvt.groups && pvt.groups.length && !isServerGrouping) {
            const groups = pvt.groups;
            for (let i = 0; i < groups.length; i++) {
                const level = null;
                if (!isNullOrUndefined(groupDs)) {
                    groupDs = DataUtil.group(groupDs, groups[i]);
                }
                const groupQuery = Query.filterQueries(query.queries, 'onGroup')[i].e;
                pData = DataUtil.group(pData, groups[i], pvt.aggregates, level, groupDs, groupQuery.comparer);
            }
            args.result = pData;
        }
        return args;
    }
    getQueryRequest(query) {
        const req = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
        req.sorts = Query.filterQueries(query.queries, 'onSortBy');
        req.groups = Query.filterQueries(query.queries, 'onGroup');
        req.filters = Query.filterQueries(query.queries, 'onWhere');
        req.searches = Query.filterQueries(query.queries, 'onSearch');
        req.aggregates = Query.filterQueries(query.queries, 'onAggregates');
        return req;
    }
    addParams(options) {
        const req = options.reqParams;
        if (options.params.length) {
            req.params = {};
        }
        for (const tmp of options.params) {
            if (req[tmp.key]) {
                throw new Error('Query() - addParams: Custom Param is conflicting other request arguments');
            }
            req[tmp.key] = tmp.value;
            if (tmp.fn) {
                req[tmp.key] = tmp.fn.call(options.query, tmp.key, options.query, options.dm);
            }
            req.params[tmp.key] = req[tmp.key];
        }
    }
}
/**
 * OData Adaptor that is extended from URL Adaptor, is used for consuming data through OData Service.
 *
 * @hidden
 */
class ODataAdaptor extends UrlAdaptor {
    constructor(props) {
        super();
        // options replaced the default adaptor options
        this.options = extend({}, this.options, {
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
        extend(this.options, props || {});
    }
    getModuleName() {
        return 'ODataAdaptor';
    }
    /**
     * Generate request string based on the filter criteria from query.
     *
     * @param {Predicate} pred
     * @param {boolean} requiresCast?
     * @param predicate
     * @param query
     * @param requiresCast
     */
    onPredicate(predicate, query, requiresCast) {
        let returnValue = '';
        let operator;
        let guid;
        let val = predicate.value;
        const type = typeof val;
        let field = predicate.field ? ODataAdaptor.getField(predicate.field) : null;
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
                const splittedStringValue = val.split('*');
                let splittedValue;
                let count = 0;
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
                    for (let i = 1; i < splittedStringValue.length - 1; i++) {
                        if (splittedStringValue[i].indexOf('%3f') === -1 && splittedStringValue[i].indexOf('?') === -1) {
                            splittedValue = splittedStringValue[i];
                            splittedValue = '\'' + splittedValue + '\'';
                            operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === 'ODataV4Adaptor' ?
                                DataUtil.odv4UniOperator['contains'] : DataUtil.odUniOperator['contains'];
                            if (count > 0) {
                                returnValue += ' and ';
                            }
                            if (operator === 'substringof' || operator === 'not substringof') {
                                const temp = splittedValue;
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
            const temp = val;
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
    }
    addParams(options) {
        super.addParams(options);
        delete options.reqParams.params;
    }
    /**
     * Generate request string based on the multiple filter criteria from query.
     *
     * @param {Predicate} pred
     * @param {boolean} requiresCast?
     * @param predicate
     * @param query
     * @param requiresCast
     */
    onComplexPredicate(predicate, query, requiresCast) {
        const res = [];
        for (let i = 0; i < predicate.predicates.length; i++) {
            res.push('(' + this.onEachWhere(predicate.predicates[i], query, requiresCast) + ')');
        }
        return res.join(' ' + predicate.condition + ' ');
    }
    /**
     * Generate query string based on the multiple filter criteria from query.
     *
     * @param {Predicate} filter
     * @param {boolean} requiresCast?
     * @param query
     * @param requiresCast
     */
    onEachWhere(filter, query, requiresCast) {
        return filter.isComplex ? this.onComplexPredicate(filter, query, requiresCast) : this.onPredicate(filter, query, requiresCast);
    }
    /**
     * Generate query string based on the multiple filter criteria from query.
     *
     * @param  {string[]} filters
     */
    onWhere(filters) {
        if (this.pvt.search) {
            filters.push(this.onEachWhere(this.pvt.search, null, true));
        }
        return filters.join(' and ');
    }
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
    onEachSearch(e) {
        if (e.fields && e.fields.length === 0) {
            DataUtil.throwError('Query() - Search : oData search requires list of field names to search');
        }
        const filter = this.pvt.search || [];
        for (let i = 0; i < e.fields.length; i++) {
            filter.push(new Predicate(e.fields[i], e.operator, e.key, e.ignoreCase));
        }
        this.pvt.search = filter;
    }
    /**
     * Generate query string based on the search criteria from query.
     *
     * @param  {Object} e
     */
    onSearch(e) {
        this.pvt.search = Predicate.or(this.pvt.search);
        return '';
    }
    /**
     * Generate query string based on multiple sort criteria from query.
     *
     * @param  {QueryOptions} e
     */
    onEachSort(e) {
        const res = [];
        if (e.name instanceof Array) {
            for (let i = 0; i < e.name.length; i++) {
                res.push(ODataAdaptor.getField(e.name[i]) + (e.direction === 'descending' ? ' desc' : ''));
            }
        }
        else {
            res.push(ODataAdaptor.getField(e.name) + (e.direction === 'descending' ? ' desc' : ''));
        }
        return res.join(',');
    }
    /**
     * Returns sort query string.
     *
     * @param  {string[]} e
     */
    onSortBy(e) {
        return e.reverse().join(',');
    }
    /**
     * Adds the group query to the adaptor option.
     *
     * @param  {Object[]} e
     * @returns string
     */
    onGroup(e) {
        this.pvt.groups = e;
        return [];
    }
    /**
     * Returns the select query string.
     *
     * @param  {string[]} e
     */
    onSelect(e) {
        for (let i = 0; i < e.length; i++) {
            e[i] = ODataAdaptor.getField(e[i]);
        }
        return e.join(',');
    }
    /**
     * Add the aggregate query to the adaptor option.
     *
     * @param  {Object[]} e
     * @returns string
     */
    onAggregates(e) {
        this.pvt.aggregates = e;
        return '';
    }
    /**
     * Returns the query string which requests total count from the data source.
     *
     * @param  {boolean} e
     * @returns string
     */
    onCount(e) {
        return e === true ? 'allpages' : '';
    }
    /**
     * Method will trigger before send the request to server side.
     * Used to set the custom header or modify the request options.
     *
     * @param {DataManager} dm
     * @param {Request} request
     * @param {Fetch} settings?
     * @param settings
     */
    beforeSend(dm, request, settings) {
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
    }
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
    processResponse(data, ds, query, xhr, request, changes) {
        const metaCheck = 'odata.metadata';
        if ((request && request.type === 'GET') && !this.rootUrl && data[metaCheck]) {
            const dataUrls = data[metaCheck].split('/$metadata#');
            this.rootUrl = dataUrls[0];
            this.resourceTableName = dataUrls[1];
        }
        const pvtData = 'pvtData';
        if (!isNullOrUndefined(data.d)) {
            const dataCopy = ((query && query.isCountRequired) ? data.d.results : data.d);
            const metaData = '__metadata';
            if (!isNullOrUndefined(dataCopy)) {
                for (let i = 0; i < dataCopy.length; i++) {
                    if (!isNullOrUndefined(dataCopy[i][metaData])) {
                        delete dataCopy[i][metaData];
                    }
                }
            }
        }
        const pvt = request && request[pvtData];
        const emptyAndBatch = this.processBatchResponse(data, query, xhr, request, changes);
        if (emptyAndBatch) {
            return emptyAndBatch;
        }
        const versionCheck = xhr && request.fetchRequest.headers.get('DataServiceVersion');
        let count = null;
        const version = (versionCheck && parseInt(versionCheck, 10)) || 2;
        if (query && query.isCountRequired) {
            const oDataCount = '__count';
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
        const args = {};
        args.count = count;
        args.result = data;
        this.getAggregateResult(pvt, data, args, null, query);
        return DataUtil.isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    }
    /**
     * Converts the request object to query string.
     *
     * @param {Object} req
     * @param request
     * @param {Query} query
     * @param {DataManager} dm
     * @returns tableName
     */
    convertToQueryString(request, query, dm) {
        let res = [];
        const table = 'table';
        const tableName = request[table] || '';
        const format = '$format';
        delete request[table];
        if (dm.dataSource.requiresFormat) {
            request[format] = 'json';
        }
        const keys = Object.keys(request);
        for (const prop of keys) {
            res.push(prop + '=' + request[prop]);
        }
        res = res.join('&');
        if (dm.dataSource.url && dm.dataSource.url.indexOf('?') !== -1 && !tableName) {
            return res;
        }
        return res.length ? tableName + '?' + res : tableName || '';
    }
    localTimeReplacer(key, convertObj) {
        for (const prop of !isNullOrUndefined(convertObj) ? Object.keys(convertObj) : []) {
            if ((convertObj[prop] instanceof Date)) {
                convertObj[prop] = DataUtil.dateParse.toLocalTime(convertObj[prop]);
            }
        }
        return convertObj;
    }
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     *
     * @param {DataManager} dm
     * @param {Object} data
     * @param {string} tableName?
     * @param tableName
     */
    insert(dm, data, tableName) {
        return {
            url: (dm.dataSource.insertUrl || dm.dataSource.url).replace(/\/*$/, tableName ? '/' + tableName : ''),
            data: JSON.stringify(data, this.options.localTime ? this.localTimeReplacer : null)
        };
    }
    /**
     * Prepare and return request body which is used to remove record from the table.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {number} value
     * @param {string} tableName?
     * @param tableName
     */
    remove(dm, keyField, value, tableName) {
        let url;
        if (typeof value === 'string' && !DataUtil.parse.isGuid(value)) {
            url = `('${value}')`;
        }
        else {
            url = `(${value})`;
        }
        return {
            type: 'DELETE',
            url: (dm.dataSource.removeUrl || dm.dataSource.url).replace(/\/*$/, tableName ? '/' + tableName : '') + url
        };
    }
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
    update(dm, keyField, value, tableName, query, original) {
        if (this.options.updateType === 'PATCH' && !isNullOrUndefined(original)) {
            value = this.compareAndRemove(value, original, keyField);
        }
        let url;
        if (typeof value[keyField] === 'string' && !DataUtil.parse.isGuid(value[keyField])) {
            url = `('${value[keyField]}')`;
        }
        else {
            url = `(${value[keyField]})`;
        }
        return {
            type: this.options.updateType,
            url: (dm.dataSource.updateUrl || dm.dataSource.url).replace(/\/*$/, tableName ? '/' + tableName : '') + url,
            data: JSON.stringify(value, this.options.localTime ? this.localTimeReplacer : null),
            accept: this.options.accept
        };
    }
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
    batchRequest(dm, changes, e, query, original) {
        const initialGuid = e.guid = DataUtil.getGuid(this.options.batchPre);
        const url = (dm.dataSource.batchUrl || this.rootUrl) ?
            (dm.dataSource.batchUrl || this.rootUrl) + '/' + this.options.batch :
            (dm.dataSource.batchUrl || dm.dataSource.url).replace(/\/*$/, '/' + this.options.batch);
        e.url = this.resourceTableName ? this.resourceTableName : e.url;
        const args = {
            url: e.url,
            key: e.key,
            cid: 1,
            cSet: DataUtil.getGuid(this.options.changeSet)
        };
        let req = '--' + initialGuid + '\n';
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
    }
    /**
     * Generate the string content from the removed records.
     * The result will be send during batch update.
     *
     * @param {Object[]} arr
     * @param {RemoteArgs} e
     * @param dm
     * @returns this
     */
    generateDeleteRequest(arr, e, dm) {
        if (!arr) {
            return '';
        }
        let req = '';
        const stat = {
            'method': 'DELETE ',
            'url': (data, i, key) => {
                const url = DataUtil.getObject(key, data[i]);
                if (typeof url === 'number' || DataUtil.parse.isGuid(url)) {
                    return '(' + url + ')';
                }
                else if (url instanceof Date) {
                    const dateTime = data[i][key];
                    return '(' + dateTime.toJSON() + ')';
                }
                else {
                    return `('${url}')`;
                }
            },
            'data': (data, i) => ''
        };
        req = this.generateBodyContent(arr, e, stat, dm);
        return req + '\n';
    }
    /**
     * Generate the string content from the inserted records.
     * The result will be send during batch update.
     *
     * @param {Object[]} arr
     * @param {RemoteArgs} e
     * @param dm
     */
    generateInsertRequest(arr, e, dm) {
        if (!arr) {
            return '';
        }
        let req = '';
        const stat = {
            'method': 'POST ',
            'url': (data, i, key) => '',
            'data': (data, i) => JSON.stringify(data[i]) + '\n\n'
        };
        req = this.generateBodyContent(arr, e, stat, dm);
        return req;
    }
    /**
     * Generate the string content from the updated records.
     * The result will be send during batch update.
     *
     * @param {Object[]} arr
     * @param {RemoteArgs} e
     * @param dm
     * @param org
     */
    generateUpdateRequest(arr, e, dm, org) {
        if (!arr) {
            return '';
        }
        let req = '';
        arr.forEach((change) => change = this.compareAndRemove(change, org.filter((o) => DataUtil.getObject(e.key, o) === DataUtil.getObject(e.key, change))[0], e.key));
        const stat = {
            'method': this.options.updateType + ' ',
            'url': (data, i, key) => {
                if (typeof data[i][key] === 'number' || DataUtil.parse.isGuid(data[i][key])) {
                    return '(' + data[i][key] + ')';
                }
                else if (data[i][key] instanceof Date) {
                    const date = data[i][key];
                    return '(' + date.toJSON() + ')';
                }
                else {
                    return `('${data[i][key]}')`;
                }
            },
            'data': (data, i) => JSON.stringify(data[i]) + '\n\n'
        };
        req = this.generateBodyContent(arr, e, stat, dm);
        return req;
    }
    static getField(prop) {
        return prop.replace(/\./g, '/');
    }
    generateBodyContent(arr, e, stat, dm) {
        let req = '';
        for (let i = 0; i < arr.length; i++) {
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
    }
    processBatchResponse(data, query, xhr, request, changes) {
        if (xhr && xhr.headers.get('Content-Type') && xhr.headers.get('Content-Type').indexOf('xml') !== -1) {
            return (query.isCountRequired ? { result: [], count: 0 } : []);
        }
        if (request && this.options.batch && DataUtil.endsWith(request.url, this.options.batch) && request.type.toLowerCase() === 'post') {
            let guid = xhr.headers.get('Content-Type');
            let cIdx;
            let jsonObj;
            let d = data + '';
            guid = guid.substring(guid.indexOf('=batchresponse') + 1);
            d = d.split(guid);
            if (d.length < 2) {
                return {};
            }
            d = d[1];
            const exVal = /(?:\bContent-Type.+boundary=)(changesetresponse.+)/i.exec(d);
            if (exVal) {
                d.replace(exVal[0], '');
            }
            const changeGuid = exVal ? exVal[1] : '';
            d = d.split(changeGuid);
            for (let i = d.length; i > -1; i--) {
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
    }
    compareAndRemove(data, original, key) {
        if (isNullOrUndefined(original)) {
            return data;
        }
        Object.keys(data).forEach((prop) => {
            if (prop !== key && prop !== '@odata.etag') {
                if (DataUtil.isPlainObject(data[prop])) {
                    this.compareAndRemove(data[prop], original[prop]);
                    const final = Object.keys(data[prop]).filter((data) => data !== '@odata.etag');
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
    }
}
/**
 * The OData v4 is an improved version of OData protocols.
 * The DataManager uses the ODataV4Adaptor to consume OData v4 services.
 *
 * @hidden
 */
class ODataV4Adaptor extends ODataAdaptor {
    constructor(props) {
        super(props);
        // options replaced the default adaptor options
        this.options = extend({}, this.options, {
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
        extend(this.options, props || {});
    }
    /**
     * @hidden
     */
    getModuleName() {
        return 'ODataV4Adaptor';
    }
    /**
     * Returns the query string which requests total count from the data source.
     *
     * @param  {boolean} e
     * @returns string
     */
    onCount(e) {
        return e === true ? 'true' : '';
    }
    /**
     * Generate request string based on the filter criteria from query.
     *
     * @param {Predicate} pred
     * @param {boolean} requiresCast?
     * @param predicate
     * @param query
     * @param requiresCast
     */
    onPredicate(predicate, query, requiresCast) {
        let returnValue = '';
        const val = predicate.value;
        const isDate = val instanceof Date;
        if (query instanceof Query) {
            const queries = this.getQueryRequest(query);
            for (let i = 0; i < queries.filters.length; i++) {
                if (queries.filters[i].e.key === predicate.value) {
                    requiresCast = true;
                }
            }
        }
        returnValue = super.onPredicate.call(this, predicate, query, requiresCast);
        if (isDate) {
            returnValue = returnValue.replace(/datetime'(.*)'$/, '$1');
        }
        if (DataUtil.parse.isGuid(val)) {
            returnValue = returnValue.replace('guid', '').replace(/'/g, '');
        }
        return returnValue;
    }
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
    onEachSearch(e) {
        const search = this.pvt.searches || [];
        search.push(e.key);
        this.pvt.searches = search;
    }
    /**
     *  Generate query string based on the search criteria from query.
     *
     * @param  {Object} e
     */
    onSearch(e) {
        return this.pvt.searches.join(' OR ');
    }
    /**
     * Returns the expand query string.
     *
     * @param {string} e
     * @param e.selects
     * @param e.expands
     */
    onExpand(e) {
        const selected = {};
        const expanded = {};
        const expands = e.expands.slice();
        const exArr = [];
        const selects = e.selects.filter((item) => item.indexOf('.') > -1);
        selects.forEach((select) => {
            const splits = select.split('.');
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
                const sel = '$select=' + splits[splits.length - 1];
                let exp = '';
                let close = '';
                for (let i = 1; i < splits.length - 1; i++) {
                    exp = exp + '$expand=' + splits[i] + '(';
                    close = close + ')';
                }
                const combineVal = exp + sel + close;
                if (selected[splits[0]].length && Object.keys(selected).indexOf(splits[0]) !== -1 &&
                    this.expandQueryIndex(selected[splits[0]], true)) {
                    const idx = this.expandQueryIndex(selected[splits[0]]);
                    selected[splits[0]][idx] = selected[splits[0]][idx] + combineVal.replace('$expand=', ',');
                }
                else {
                    selected[splits[0]].push(combineVal);
                }
            }
        });
        //Auto expand from select query
        Object.keys(selected).forEach((expand) => {
            if ((expands.indexOf(expand) === -1)) {
                expands.push(expand);
            }
        });
        expands.forEach((expand) => {
            expanded[expand] = expand in selected ? `${expand}(${selected[expand].join(';')})` : expand;
        });
        Object.keys(expanded).forEach((ex) => exArr.push(expanded[ex]));
        return exArr.join(',');
    }
    expandQueryIndex(query, isExpand) {
        for (let i = 0; i < query.length; i++) {
            if (query[i].indexOf('$expand') !== -1) {
                return isExpand ? true : i;
            }
        }
        return isExpand ? false : 0;
    }
    /**
     * Returns the groupby query string.
     *
     * @param {string} e
     * @param distinctFields
     */
    onDistinct(distinctFields) {
        const fields = distinctFields.map((field) => ODataAdaptor.getField(field)).join(',');
        return `groupby((${fields}))`;
    }
    /**
     * Returns the select query string.
     *
     * @param  {string[]} e
     */
    onSelect(e) {
        return super.onSelect(e.filter((item) => item.indexOf('.') === -1));
    }
    /**
     * Method will trigger before send the request to server side.
     * Used to set the custom header or modify the request options.
     *
     * @param  {DataManager} dm
     * @param  {Request} request
     * @param  {Fetch} settings
     * @returns void
     */
    beforeSend(dm, request, settings) {
        if (settings.type === 'POST' || settings.type === 'PUT' || settings.type === 'PATCH') {
            request.headers.set('Prefer', 'return=representation');
        }
        request.headers.set('Accept', this.options.accept);
    }
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
    processResponse(data, ds, query, xhr, request, changes) {
        const metaName = '@odata.context';
        const metaV4Name = '@context';
        if ((request && request.type === 'GET') && !this.rootUrl && (data[metaName] || data[metaV4Name])) {
            const dataUrl = data[metaName] ? data[metaName].split('/$metadata#') : data[metaV4Name].split('/$metadata#');
            this.rootUrl = dataUrl[0];
            this.resourceTableName = dataUrl[1];
        }
        const pvtData = 'pvtData';
        const pvt = request && request[pvtData];
        const emptyAndBatch = super.processBatchResponse(data, query, xhr, request, changes);
        if (emptyAndBatch) {
            return emptyAndBatch;
        }
        let count = null;
        const dataCount = '@odata.count';
        const dataV4Count = '@count';
        if (query && query.isCountRequired) {
            if (dataCount in data) {
                count = data[dataCount];
            }
            else if (dataV4Count in data) {
                count = data[dataV4Count];
            }
        }
        data = !isNullOrUndefined(data.value) ? data.value : data;
        const args = {};
        args.count = count;
        args.result = data;
        this.getAggregateResult(pvt, data, args, null, query);
        return DataUtil.isNull(count) ? args.result : { result: args.result, count: count, aggregates: args.aggregates };
    }
}
/**
 * The Web API is a programmatic interface to define the request and response messages system that is mostly exposed in JSON or XML.
 * The DataManager uses the WebApiAdaptor to consume Web API.
 * Since this adaptor is targeted to interact with Web API created using OData endpoint, it is extended from ODataAdaptor
 *
 * @hidden
 */
class WebApiAdaptor extends ODataAdaptor {
    getModuleName() {
        return 'WebApiAdaptor';
    }
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     *
     * @param {DataManager} dm
     * @param {Object} data
     * @param {string} tableName?
     * @param tableName
     */
    insert(dm, data, tableName) {
        return {
            type: 'POST',
            url: dm.dataSource.url,
            data: JSON.stringify(data)
        };
    }
    /**
     * Prepare and return request body which is used to remove record from the table.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {number} value
     * @param {string} tableName?
     * @param tableName
     */
    remove(dm, keyField, value, tableName) {
        return {
            type: 'DELETE',
            url: dm.dataSource.url + '/' + value,
            data: JSON.stringify(value)
        };
    }
    /**
     * Prepare and return request body which is used to update record.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {Object} value
     * @param {string} tableName?
     * @param tableName
     */
    update(dm, keyField, value, tableName) {
        return {
            type: 'PUT',
            url: dm.dataSource.url,
            data: JSON.stringify(value)
        };
    }
    batchRequest(dm, changes, e) {
        const initialGuid = e.guid = DataUtil.getGuid(this.options.batchPre);
        const url = dm.dataSource.url.replace(/\/*$/, '/' + this.options.batch);
        e.url = this.resourceTableName ? this.resourceTableName : e.url;
        const req = [];
        //insertion
        for (let i = 0, x = changes.addedRecords.length; i < x; i++) {
            changes.addedRecords.forEach((j, d) => {
                const stat = {
                    'method': 'POST ',
                    'url': (data, i, key) => '',
                    'data': (data, i) => JSON.stringify(data[i]) + '\n\n'
                };
                req.push('--' + initialGuid);
                req.push('Content-Type: application/http; msgtype=request', '');
                req.push('POST ' + '/api/' + (dm.dataSource.insertUrl || dm.dataSource.crudUrl || e.url)
                    + stat.url(changes.addedRecords, i, e.key) + ' HTTP/1.1');
                req.push('Content-Type: ' + 'application/json; charset=utf-8');
                req.push('Host: ' + location.host);
                req.push('', j ? JSON.stringify(j) : '');
            });
        }
        //updation
        for (let i = 0, x = changes.changedRecords.length; i < x; i++) {
            changes.changedRecords.forEach((j, d) => {
                const stat = {
                    'method': this.options.updateType + ' ',
                    'url': (data, i, key) => '',
                    'data': (data, i) => JSON.stringify(data[i]) + '\n\n'
                };
                req.push('--' + initialGuid);
                req.push('Content-Type: application/http; msgtype=request', '');
                req.push('PUT ' + '/api/' + (dm.dataSource.updateUrl || dm.dataSource.crudUrl || e.url)
                    + stat.url(changes.changedRecords, i, e.key) + ' HTTP/1.1');
                req.push('Content-Type: ' + 'application/json; charset=utf-8');
                req.push('Host: ' + location.host);
                req.push('', j ? JSON.stringify(j) : '');
            });
        }
        //deletion
        for (let i = 0, x = changes.deletedRecords.length; i < x; i++) {
            changes.deletedRecords.forEach((j, d) => {
                const state = {
                    'mtd': 'DELETE ',
                    'url': (data, i, key) => {
                        const url = DataUtil.getObject(key, data[i]);
                        if (typeof url === 'number' || DataUtil.parse.isGuid(url)) {
                            return '/' + url;
                        }
                        else if (url instanceof Date) {
                            const datTime = data[i][key];
                            return '/' + datTime.toJSON();
                        }
                        else {
                            return `/'${url}'`;
                        }
                    },
                    'data': (data, i) => ''
                };
                req.push('--' + initialGuid);
                req.push('Content-Type: application/http; msgtype=request', '');
                req.push('DELETE ' + '/api/' + (dm.dataSource.removeUrl || dm.dataSource.crudUrl || e.url)
                    + state.url(changes.deletedRecords, i, e.key) + ' HTTP/1.1');
                req.push('Content-Type: ' + 'application/json; charset=utf-8');
                req.push('Host: ' + location.host);
                req.push('', j ? JSON.stringify(j) : '');
            });
        }
        req.push('--' + initialGuid + '--', '');
        return {
            type: 'POST',
            url: url,
            contentType: 'multipart/mixed; boundary=' + initialGuid,
            data: req.join('\r\n')
        };
    }
    /**
     * Method will trigger before send the request to server side.
     * Used to set the custom header or modify the request options.
     *
     * @param  {DataManager} dm
     * @param  {Request} request
     * @param  {Fetch} settings
     * @returns void
     */
    beforeSend(dm, request, settings) {
        request.headers.set('Accept', 'application/json, text/javascript, */*; q=0.01');
    }
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
    processResponse(data, ds, query, xhr, request, changes) {
        const pvtData = 'pvtData';
        const pvt = request && request[pvtData];
        let count = null;
        const args = {};
        if (request && request.type.toLowerCase() !== 'post') {
            const versionCheck = xhr && request.fetchRequest.headers.get('DataServiceVersion');
            const version = (versionCheck && parseInt(versionCheck, 10)) || 2;
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
    }
}
/**
 * WebMethodAdaptor can be used by DataManager to interact with web method.
 *
 * @hidden
 */
class WebMethodAdaptor extends UrlAdaptor {
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
    processQuery(dm, query, hierarchyFilters) {
        const obj = new UrlAdaptor().processQuery(dm, query, hierarchyFilters);
        const getData = 'data';
        const data = DataUtil.parse.parseJson(obj[getData]);
        const result = {};
        const value = 'value';
        if (data.param) {
            for (let i = 0; i < data.param.length; i++) {
                const param = data.param[i];
                const key = Object.keys(param)[0];
                result[key] = param[key];
            }
        }
        result[value] = data;
        const pvtData = 'pvtData';
        const url = 'url';
        return {
            data: JSON.stringify(result, DataUtil.parse.jsonDateReplacer),
            url: obj[url],
            pvtData: obj[pvtData],
            type: 'POST',
            contentType: 'application/json; charset=utf-8'
        };
    }
}
/**
 * RemoteSaveAdaptor, extended from JsonAdaptor and it is used for binding local data and performs all DataManager queries in client-side.
 * It interacts with server-side only for CRUD operations.
 *
 * @hidden
 */
class RemoteSaveAdaptor extends JsonAdaptor {
    /**
     * @hidden
     */
    constructor() {
        super();
        setValue('beforeSend', UrlAdaptor.prototype.beforeSend, this);
    }
    insert(dm, data, tableName, query, position) {
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
    }
    remove(dm, keyField, val, tableName, query) {
        super.remove(dm, keyField, val);
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
    }
    update(dm, keyField, val, tableName, query) {
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
    }
    processResponse(data, ds, query, xhr, request, changes, e) {
        let i;
        const newData = request ? JSON.parse(request.data) : data;
        data = newData.action === 'batch' ? DataUtil.parse.parseJson(data) : data;
        if (this.updateType === 'add') {
            super.insert(ds, data, null, null, this.pvt.position);
        }
        if (this.updateType === 'update') {
            super.update(ds, this.updateKey, data);
        }
        this.updateType = undefined;
        if (data.added) {
            for (i = 0; i < data.added.length; i++) {
                super.insert(ds, data.added[i]);
            }
        }
        if (data.changed) {
            for (i = 0; i < data.changed.length; i++) {
                super.update(ds, e.key, data.changed[i]);
            }
        }
        if (data.deleted) {
            for (i = 0; i < data.deleted.length; i++) {
                super.remove(ds, e.key, data.deleted[i]);
            }
        }
        return data;
    }
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
    batchRequest(dm, changes, e, query, original) {
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
    }
    addParams(options) {
        const urlParams = new UrlAdaptor();
        urlParams.addParams(options);
    }
}
/**
 * Fetch Adaptor that is extended from URL Adaptor, is used for handle data operations with user defined functions.
 *
 * @hidden
 */
class CustomDataAdaptor extends UrlAdaptor {
    constructor(props) {
        super();
        // options replaced the default adaptor options
        this.options = extend({}, this.options, {
            getData: () => { },
            addRecord: () => { },
            updateRecord: () => { },
            deleteRecord: () => { },
            batchUpdate: () => { }
        });
        extend(this.options, props || {});
    }
    getModuleName() {
        return 'CustomDataAdaptor';
    }
}
/**
 * The GraphqlAdaptor that is extended from URL Adaptor, is used for retrieving data from the Graphql server.
 * It interacts with the Graphql server with all the DataManager Queries and performs CRUD operations.
 *
 * @hidden
 */
class GraphQLAdaptor extends UrlAdaptor {
    getModuleName() {
        return 'GraphQLAdaptor';
    }
    constructor(options) {
        super();
        this.opt = options;
        this.schema = this.opt.response;
        this.query = this.opt.query;
        /* eslint-disable @typescript-eslint/no-empty-function */
        // tslint:disable-next-line:no-empty
        this.getVariables = this.opt.getVariables ? this.opt.getVariables : () => { };
        /* eslint-enable @typescript-eslint/no-empty-function */
        this.getQuery = () => this.query;
    }
    /**
     * Process the JSON data based on the provided queries.
     *
     * @param {DataManager} dm
     * @param {Query} query?
     * @param datamanager
     * @param query
     */
    processQuery(datamanager, query) {
        const urlQuery = super.processQuery.apply(this, arguments);
        const dm = JSON.parse(urlQuery.data);
        // constructing GraphQL parameters
        const keys = ['skip', 'take', 'sorted', 'table', 'select', 'where',
            'search', 'requiresCounts', 'aggregates', 'params'];
        const temp = {};
        const str = 'searchwhereparams';
        keys.filter((e) => {
            temp[e] = str.indexOf(e) > -1 ? JSON.stringify(dm[e]) : dm[e];
        });
        const vars = this.getVariables() || {};
        // tslint:disable-next-line:no-string-literal
        vars['datamanager'] = temp;
        const data = JSON.stringify({
            query: this.getQuery(),
            variables: vars
        });
        urlQuery.data = data;
        return urlQuery;
    }
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
    processResponse(resData, ds, query, xhr, request) {
        const res = resData;
        let count;
        let aggregates;
        const result = getValue(this.schema.result, res.data);
        if (this.schema.count) {
            count = getValue(this.schema.count, res.data);
        }
        if (this.schema.aggregates) {
            aggregates = getValue(this.schema.aggregates, res.data);
            aggregates = !isNullOrUndefined(aggregates) ? DataUtil.parse.parseJson(aggregates) : aggregates;
        }
        const pvt = request.pvtData || {};
        const args = { result: result, aggregates: aggregates };
        const data = args;
        if (pvt && pvt.groups && pvt.groups.length) {
            this.getAggregateResult(pvt, data, args, null, query);
        }
        return !isNullOrUndefined(count) ? { result: args.result, count: count, aggregates: aggregates } : args.result;
    }
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     */
    insert() {
        const inserted = super.insert.apply(this, arguments);
        return this.generateCrudData(inserted, 'insert');
    }
    /**
     * Prepare and returns request body which is used to update a new record in the table.
     */
    update() {
        const inserted = super.update.apply(this, arguments);
        return this.generateCrudData(inserted, 'update');
    }
    /**
     * Prepare and returns request body which is used to remove a new record in the table.
     */
    remove() {
        const inserted = super.remove.apply(this, arguments);
        return this.generateCrudData(inserted, 'remove');
    }
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
    batchRequest(dm, changes, e, query, original) {
        const batch = super.batchRequest.apply(this, arguments);
        // tslint:disable-next-line:typedef
        const bData = JSON.parse(batch.data);
        bData.key = e.key;
        batch.data = JSON.stringify(bData);
        return this.generateCrudData(batch, 'batch');
    }
    generateCrudData(crudData, action) {
        const parsed = JSON.parse(crudData.data);
        crudData.data = JSON.stringify({
            query: this.opt.getMutation(action),
            variables: parsed
        });
        return crudData;
    }
}
/**
 * Cache Adaptor is used to cache the data of the visited pages. It prevents new requests for the previously visited pages.
 * You can configure cache page size and duration of caching by using cachingPageSize and timeTillExpiration properties of the DataManager
 *
 * @hidden
 */
class CacheAdaptor extends UrlAdaptor {
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
    constructor(adaptor, timeStamp, pageSize) {
        super();
        this.isCrudAction = false;
        this.isInsertAction = false;
        if (!isNullOrUndefined(adaptor)) {
            this.cacheAdaptor = adaptor;
        }
        this.pageSize = pageSize;
        this.guidId = DataUtil.getGuid('cacheAdaptor');
        const obj = { keys: [], results: [] };
        window.localStorage.setItem(this.guidId, JSON.stringify(obj));
        const guid = this.guidId;
        if (!isNullOrUndefined(timeStamp)) {
            setInterval(() => {
                const data = DataUtil.parse.parseJson(window.localStorage.getItem(guid));
                const forDel = [];
                for (let i = 0; i < data.results.length; i++) {
                    const currentTime = +new Date();
                    const requestTime = +new Date(data.results[i].timeStamp);
                    data.results[i].timeStamp = currentTime - requestTime;
                    if (currentTime - requestTime > timeStamp) {
                        forDel.push(i);
                    }
                }
                for (let i = 0; i < forDel.length; i++) {
                    data.results.splice(forDel[i], 1);
                    data.keys.splice(forDel[i], 1);
                }
                window.localStorage.removeItem(guid);
                window.localStorage.setItem(guid, JSON.stringify(data));
            }, timeStamp);
        }
    }
    /**
     * It will generate the key based on the URL when we send a request to server.
     *
     * @param {string} url
     * @param {Query} query?
     * @param query
     * @hidden
     */
    generateKey(url, query) {
        const queries = this.getQueryRequest(query);
        const singles = Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
        let key = url;
        const page = 'onPage';
        if (page in singles) {
            key += singles[page].pageIndex;
        }
        queries.sorts.forEach((obj) => {
            key += obj.e.direction + obj.e.fieldName;
        });
        queries.groups.forEach((obj) => {
            key += obj.e.fieldName;
        });
        queries.searches.forEach((obj) => {
            key += obj.e.searchKey;
        });
        for (let filter = 0; filter < queries.filters.length; filter++) {
            const currentFilter = queries.filters[filter];
            if (currentFilter.e.isComplex) {
                const newQuery = query.clone();
                newQuery.queries = [];
                for (let i = 0; i < currentFilter.e.predicates.length; i++) {
                    newQuery.queries.push({ fn: 'onWhere', e: currentFilter.e.predicates[i], filter: query.queries.filter });
                }
                key += currentFilter.e.condition + this.generateKey(url, newQuery);
            }
            else {
                key += currentFilter.e.field + currentFilter.e.operator + currentFilter.e.value;
            }
        }
        return key;
    }
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
    processQuery(dm, query, hierarchyFilters) {
        const key = this.generateKey(dm.dataSource.url, query);
        const cachedItems = DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
        const data = cachedItems ? cachedItems.results[cachedItems.keys.indexOf(key)] : null;
        if (data != null && !this.isCrudAction && !this.isInsertAction) {
            return data;
        }
        this.isCrudAction = null;
        this.isInsertAction = null;
        /* eslint-disable prefer-spread */
        return this.cacheAdaptor.processQuery.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
        /* eslint-enable prefer-spread */
    }
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
    processResponse(data, ds, query, xhr, request, changes) {
        if (this.isInsertAction || (request && this.cacheAdaptor.options.batch &&
            DataUtil.endsWith(request.url, this.cacheAdaptor.options.batch) && request.type.toLowerCase() === 'post')) {
            return this.cacheAdaptor.processResponse(data, ds, query, xhr, request, changes);
        }
        /* eslint-disable prefer-spread */
        data = this.cacheAdaptor.processResponse.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
        /* eslint-enable prefer-spread */
        const key = query ? this.generateKey(ds.dataSource.url, query) : ds.dataSource.url;
        let obj = {};
        obj = DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
        const index = obj.keys.indexOf(key);
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
    }
    /**
     * Method will trigger before send the request to server side. Used to set the custom header or modify the request options.
     *
     * @param {DataManager} dm
     * @param {Request} request
     * @param {Fetch} settings?
     * @param settings
     */
    beforeSend(dm, request, settings) {
        if (!isNullOrUndefined(this.cacheAdaptor.options.batch) && DataUtil.endsWith(settings.url, this.cacheAdaptor.options.batch)
            && settings.type.toLowerCase() === 'post') {
            request.headers.set('Accept', this.cacheAdaptor.options.multipartAccept);
        }
        if (!dm.dataSource.crossDomain) {
            request.headers.set('Accept', this.cacheAdaptor.options.accept);
        }
    }
    /**
     * Updates existing record and saves the changes to the table.
     *
     * @param  {DataManager} dm
     * @param  {string} keyField
     * @param  {Object} value
     * @param  {string} tableName
     */
    update(dm, keyField, value, tableName) {
        this.isCrudAction = true;
        return this.cacheAdaptor.update(dm, keyField, value, tableName);
    }
    /**
     * Prepare and returns request body which is used to insert a new record in the table.
     *
     * @param {DataManager} dm
     * @param {Object} data
     * @param {string} tableName?
     * @param tableName
     */
    insert(dm, data, tableName) {
        this.isInsertAction = true;
        return this.cacheAdaptor.insert(dm, data, tableName);
    }
    /**
     * Prepare and return request body which is used to remove record from the table.
     *
     * @param {DataManager} dm
     * @param {string} keyField
     * @param {Object} value
     * @param {string} tableName?
     * @param tableName
     */
    remove(dm, keyField, value, tableName) {
        this.isCrudAction = true;
        return this.cacheAdaptor.remove(dm, keyField, value, tableName);
    }
    /**
     * Prepare the request body based on the newly added, removed and updated records.
     * The result is used by the batch request.
     *
     * @param  {DataManager} dm
     * @param  {CrudOptions} changes
     * @param  {RemoteArgs} e
     */
    batchRequest(dm, changes, e) {
        return this.cacheAdaptor.batchRequest(dm, changes, e);
    }
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * DataManager is used to manage and manipulate relational data.
 */
class DataManager {
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
    constructor(dataSource, query, adaptor) {
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
        let data;
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
            this.ready.then((e) => {
                this.dataSource.offline = true;
                this.isDataAvailable = true;
                data.json = e.result;
                this.adaptor = new JsonAdaptor();
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
            const obj = { keys: [], results: [] };
            window.localStorage.setItem(this.guidId, JSON.stringify(obj));
        }
        if (data.enableCaching) {
            this.adaptor = new CacheAdaptor(this.adaptor, data.timeTillExpiration, data.cachingPageSize);
        }
        return this;
    }
    /** @hidden */
    get moduleName() { return 'datamanager'; }
    ;
    /**
     * Get the queries maintained in the persisted state.
     * @param {string} id - The identifier of the persisted query to retrieve.
     * @returns {object} The persisted data object.
     */
    getPersistedData(id) {
        const persistedData = localStorage.getItem(id || this.dataSource.id);
        return JSON.parse(persistedData);
    }
    /**
    * Set the queries to be maintained in the persisted state.
    * @param {Event} e - The event parameter that triggers the setPersistData method.
    * @param {string} id - The identifier of the persisted query to set.
    * @param {object} persistData - The data to be persisted.
    * @returns {void} .
    */
    setPersistData(e, id, persistData) {
        localStorage.setItem(id || this.dataSource.id, JSON.stringify(persistData || this.persistQuery));
    }
    setPersistQuery(query) {
        const persistedQuery = this.getPersistedData();
        if (this.isInitialLoad && persistedQuery && Object.keys(persistedQuery).length) {
            this.persistQuery = persistedQuery;
            this.persistQuery.queries = this.persistQuery.queries.filter((query) => {
                if (this.dataSource.ignoreOnPersist && this.dataSource.ignoreOnPersist.length) {
                    if (query.fn && this.dataSource.ignoreOnPersist.some((keyword) => query.fn === keyword)) {
                        return false; // Exclude the matching query
                    }
                }
                if (query.fn === 'onWhere') {
                    const { e } = query;
                    if (e && e.isComplex && e.predicates instanceof Array) {
                        const allPredicates = e.predicates.map((predicateObj) => {
                            if (predicateObj.predicates && predicateObj.predicates instanceof Array) {
                                // Process nested predicate array
                                const nestedPredicates = predicateObj.predicates.map((nestedPredicate) => {
                                    const { field, operator, value, ignoreCase, ignoreAccent, matchCase } = nestedPredicate;
                                    return new Predicate(field, operator, value, ignoreCase, ignoreAccent, matchCase);
                                });
                                return predicateObj.condition === 'and' ? Predicate.and(nestedPredicates) : Predicate.or(nestedPredicates);
                            }
                            else {
                                // Process individual predicate
                                const { field, operator, value, ignoreCase, ignoreAccent, matchCase } = predicateObj;
                                return new Predicate(field, operator, value, ignoreCase, ignoreAccent, matchCase);
                            }
                        });
                        query.e = new Predicate(allPredicates[0], e.condition, allPredicates.slice(1));
                    }
                }
                return true; // Keep all other queries
            });
            const newQuery = extend(new Query(), this.persistQuery);
            this.isInitialLoad = false;
            return (newQuery);
        }
        else {
            this.persistQuery = query;
            this.isInitialLoad = false;
            return query;
        }
    }
    /**
     * Overrides DataManager's default query with given query.
     *
     * @param  {Query} query - Defines the new default query.
     */
    setDefaultQuery(query) {
        this.defaultQuery = query;
        return this;
    }
    /**
     * Executes the given query with local data source.
     *
     * @param  {Query} query - Defines the query to retrieve data.
     */
    executeLocal(query) {
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
        const result = this.adaptor.processQuery(this, query);
        if (query.subQuery) {
            const from = query.subQuery.fromTable;
            const lookup = query.subQuery.lookups;
            const res = query.isCountRequired ? result.result :
                result;
            if (lookup && lookup instanceof Array) {
                DataUtil.buildHierarchy(query.subQuery.fKey, from, res, lookup, query.subQuery.key);
            }
            for (let j = 0; j < res.length; j++) {
                if (res[j][from] instanceof Array) {
                    res[j] = extend({}, {}, res[j]);
                    res[j][from] = this.adaptor.processResponse(query.subQuery.using(new DataManager(res[j][from].slice(0))).executeLocal(), this, query);
                }
            }
        }
        return this.adaptor.processResponse(result, this, query);
    }
    /**
     * Executes the given query with either local or remote data source.
     * It will be executed as asynchronously and returns Promise object which will be resolved or rejected after action completed.
     *
     * @param  {Query|Function} query - Defines the query to retrieve data.
     * @param  {Function} done - Defines the callback function and triggers when the Promise is resolved.
     * @param  {Function} fail - Defines the callback function and triggers when the Promise is rejected.
     * @param  {Function} always - Defines the callback function and triggers when the Promise is resolved or rejected.
     */
    executeQuery(query, done, fail, always) {
        const makeRequest = 'makeRequest';
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
        const deffered = new Deferred();
        let args = { query: query };
        if (!this.dataSource.offline && (this.dataSource.url !== undefined && this.dataSource.url !== '')
            || (!isNullOrUndefined(this.adaptor[makeRequest])) || this.isCustomDataAdaptor(this.adaptor)) {
            const result = this.isEnableCache ? this.processQuery(query) : this.adaptor.processQuery(this, query);
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
            DataManager.nextTick(() => {
                const res = this.executeLocal(query);
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
    }
    getQueryRequest(query) {
        const req = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
        req.sorts = Query.filterQueries(query.queries, 'onSortBy');
        req.groups = Query.filterQueries(query.queries, 'onGroup');
        req.filters = Query.filterQueries(query.queries, 'onWhere');
        req.searches = Query.filterQueries(query.queries, 'onSearch');
        req.aggregates = Query.filterQueries(query.queries, 'onAggregates');
        return req;
    }
    generateKey(url, query) {
        const queries = this.getQueryRequest(query);
        const singles = Query.filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
        let key = url;
        const page = 'onPage';
        queries.sorts.forEach((obj) => {
            key += obj.e.direction + obj.e.fieldName;
        });
        queries.groups.forEach((obj) => {
            key += obj.e.fieldName;
        });
        queries.searches.forEach((obj) => {
            key += obj.e.searchKey;
        });
        for (let filter = 0; filter < queries.filters.length; filter++) {
            const currentFilter = queries.filters[filter];
            if (currentFilter.e.isComplex) {
                const newQuery = query.clone();
                newQuery.queries = [];
                for (let i = 0; i < currentFilter.e.predicates.length; i++) {
                    newQuery.queries.push({ fn: 'onWhere', e: currentFilter.e.predicates[i], filter: query.queries.filter });
                }
                key += currentFilter.e.condition + this.generateKey(url, newQuery);
            }
            else {
                key += currentFilter.e.field + currentFilter.e.operator + currentFilter.e.value;
            }
        }
        if (!isNullOrUndefined(this.previousCacheQuery) && this.previousCacheQuery !== key) {
            const obj = { keys: [], results: [] };
            window.localStorage.setItem(this.guidId, JSON.stringify(obj));
        }
        this.previousCacheQuery = key;
        if (page in singles) {
            key += singles[page].pageIndex;
        }
        return key;
    }
    processQuery(query) {
        const key = this.generateKey(this.dataSource.url, query);
        const cachedItems = JSON.parse(window.localStorage.getItem(this.guidId));
        const data = cachedItems ? cachedItems.results[cachedItems.keys.indexOf(key)] : null;
        if (data != null) {
            return DataUtil.parse.parseJson(data);
        }
        return this.adaptor.processQuery(this, query);
    }
    static getDeferedArgs(query, result, args) {
        if (query.isCountRequired) {
            args.result = result.result;
            args.count = result.count;
            args.aggregates = result.aggregates;
        }
        else {
            args.result = result;
        }
        return args;
    }
    static nextTick(fn) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        // tslint:disable-next-line:no-any
        (window.setImmediate || window.setTimeout)(fn, 0);
        /* eslint-enable @typescript-eslint/no-explicit-any */
    }
    extendRequest(url, fnSuccess, fnFail) {
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
    }
    // tslint:disable-next-line:max-func-body-length
    makeRequest(url, deffered, args, query) {
        let isSelector = !!query.subQuerySelector;
        const fnFail = (e) => {
            args.error = e;
            deffered.reject(args);
        };
        const process = (data, count, xhr, request, actual, aggregates, virtualSelectRecords) => {
            args.xhr = xhr;
            args.count = count ? parseInt(count.toString(), 10) : 0;
            args.result = data;
            args.request = request;
            args.aggregates = aggregates;
            args.actual = actual;
            args.virtualSelectRecords = virtualSelectRecords;
            deffered.resolve(args);
        };
        const fnQueryChild = (data, selector) => {
            const subDeffer = new Deferred();
            const childArgs = { parent: args };
            query.subQuery.isChild = true;
            const subUrl = this.adaptor.processQuery(this, query.subQuery, data ? this.adaptor.processResponse(data) : selector);
            const childReq = this.makeRequest(subUrl, subDeffer, childArgs, query.subQuery);
            if (!isSelector) {
                subDeffer.then((subData) => {
                    if (data) {
                        DataUtil.buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, data, subData, query.subQuery.key);
                        process(data, subData.count, subData.xhr);
                    }
                }, fnFail);
            }
            return childReq;
        };
        const fnSuccess = (data, request) => {
            if (this.isGraphQLAdaptor(this.adaptor)) {
                // tslint:disable-next-line:no-string-literal
                if (!isNullOrUndefined(data['errors'])) {
                    // tslint:disable-next-line:no-string-literal
                    return fnFail(data['errors']);
                }
            }
            if (this.isCustomDataAdaptor(this.adaptor)) {
                request = extend({}, this.fetchReqOption, request);
            }
            if (request.contentType.indexOf('xml') === -1 && this.dateParse && !this.isEnableCache) {
                data = DataUtil.parse.parseJson(data);
            }
            let result;
            let promise = this.afterReponseRequest(data);
            promise.then((data) => {
                result = this.adaptor.processResponse(data, this, query, request.fetchRequest, request);
                if (this.isEnableCache) {
                    /* eslint-enable prefer-spread */
                    const key = query ? this.generateKey(this.dataSource.url, query) : this.dataSource.url;
                    let obj = {};
                    obj = JSON.parse(window.localStorage.getItem(this.guidId));
                    const index = obj.keys.indexOf(key);
                    if (index !== -1) {
                        obj.results.splice(index, 1);
                        obj.keys.splice(index, 1);
                    }
                    obj.results[obj.keys.push(key) - 1] = { keys: key, result: result.result, timeStamp: new Date(), count: result.count };
                    window.localStorage.setItem(this.guidId, JSON.stringify(obj));
                }
                if (request.contentType.indexOf('xml') === -1 && this.dateParse && this.isEnableCache) {
                    result = DataUtil.parse.parseJson(result);
                }
                let count = 0;
                let aggregates = null;
                const virtualSelectRecords = 'virtualSelectRecords';
                const virtualRecords = data[virtualSelectRecords];
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
            }).catch((error) => fnFail(error));
        };
        let req = this.extendRequest(url, fnSuccess, fnFail);
        if (!this.isCustomDataAdaptor(this.adaptor)) {
            let promise = this.useMiddleware(req);
            let fetch;
            promise.then((response) => {
                fetch = new Fetch(req);
                fetch.beforeSend = () => {
                    this.beforeSend(fetch.fetchRequest, fetch, response);
                };
                req = fetch.send();
                req.catch((e) => true);
                this.requests.push(fetch);
            });
        }
        else {
            this.fetchReqOption = req;
            const request = req;
            this.adaptor.options.getData({
                data: request.data,
                onSuccess: request.onSuccess, onFailure: request.onFailure
            });
        }
        if (isSelector) {
            let promise;
            const res = query.subQuerySelector.call(this, { query: query.subQuery, parent: query });
            if (res && res.length) {
                promise = Promise.all([req, fnQueryChild(null, res)]);
                promise.then((...args) => {
                    const result = args[0];
                    let pResult = this.adaptor.processResponse(result[0], this, query, this.requests[0].fetchRequest, this.requests[0]);
                    let count = 0;
                    if (query.isCountRequired) {
                        count = pResult.count;
                        pResult = pResult.result;
                    }
                    let cResult = this.adaptor.processResponse(result[1], this, query.subQuery, this.requests[1].fetchRequest, this.requests[1]);
                    count = 0;
                    if (query.subQuery.isCountRequired) {
                        count = cResult.count;
                        cResult = cResult.result;
                    }
                    DataUtil.buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, pResult, cResult, query.subQuery.key);
                    isSelector = false;
                    process(pResult, count, this.requests[0].fetchRequest);
                });
            }
            else {
                isSelector = false;
            }
        }
        return req;
    }
    afterReponseRequest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const reponse = yield this.applyPostRequestMiddlewares(data);
            const deffered = new Deferred();
            deffered.resolve(reponse);
            return deffered.promise;
        });
    }
    /**
     * Processes the middleware stack after receiving the response.
     * @param {Response} response - The response object.
     * @returns {Response} - The potentially modified response.
     */
    applyPostRequestMiddlewares(response) {
        return __awaiter(this, void 0, void 0, function* () {
            return response;
        });
    }
    /**
     * Registers a new middleware in the DataManager.
     * @param {Middleware} middleware - The middleware instance to register.
     * @returns {void}
     */
    useMiddleware(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const reponse = yield this.applyPreRequestMiddlewares(request);
            const deffered = new Deferred();
            deffered.resolve(reponse);
            return deffered.promise;
        });
    }
    /**
     * Processes the middleware stack before sending the request.
     * @param {Request} request - The request object.
     * @returns {Request} - The potentially modified request.
     */
    applyPreRequestMiddlewares(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return request;
        });
    }
    beforeSend(request, settings, response) {
        this.adaptor.beforeSend(this, request, settings);
        const headers = [];
        if (this.dataSource.headers) {
            headers.push(this.dataSource.headers);
        }
        let props;
        if (response && response.headers) {
            headers.concat(response.headers);
        }
        for (let i = 0; headers && i < headers.length; i++) {
            props = [];
            const keys = Object.keys(headers[i]);
            for (const prop of keys) {
                props.push(prop);
                request.headers.set(prop, headers[i][prop]);
            }
        }
    }
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
    saveChanges(changes, key, tableName, query, original) {
        if (tableName instanceof Query) {
            query = tableName;
            tableName = null;
        }
        const args = {
            url: tableName,
            key: key || this.dataSource.key
        };
        const req = this.adaptor.batchRequest(this, changes, args, query || new Query(), original);
        const dofetchRequest = 'dofetchRequest';
        if (this.dataSource.offline) {
            return req;
        }
        if (!isNullOrUndefined(this.adaptor[dofetchRequest])) {
            return this.adaptor[dofetchRequest](req);
        }
        else if (!this.isCustomDataAdaptor(this.adaptor)) {
            const deff = new Deferred();
            const fetch = new Fetch(req);
            fetch.beforeSend = () => {
                this.beforeSend(fetch.fetchRequest, fetch);
            };
            fetch.onSuccess = (data, request) => {
                if (this.isGraphQLAdaptor(this.adaptor)) {
                    // tslint:disable-next-line:no-string-literal
                    if (!isNullOrUndefined(data['errors'])) {
                        // tslint:disable-next-line:no-string-literal
                        fetch.onFailure(JSON.stringify(data['errors']));
                    }
                }
                deff.resolve(this.adaptor.processResponse(data, this, null, request.fetchRequest, request, changes, args));
            };
            fetch.onFailure = (e) => {
                deff.reject([{ error: e }]);
            };
            fetch.send().catch((e) => true); // to handle the failure requests.
            return deff.promise;
        }
        else {
            return this.dofetchRequest(req, this.adaptor.options.batchUpdate, changes);
        }
    }
    /**
     * Inserts new record in the given table.
     *
     * @param {Object} data - Defines the data to insert.
     * @param {string|Query} tableName - Defines the table name.
     * @param {Query} query - Sets default query for the DataManager.
     * @param position
     */
    insert(data, tableName, query, position) {
        if (tableName instanceof Query) {
            query = tableName;
            tableName = null;
        }
        const req = this.adaptor.insert(this, data, tableName, query, position);
        const dofetchRequest = 'dofetchRequest';
        if (this.dataSource.offline) {
            return req;
        }
        if (!isNullOrUndefined(this.adaptor[dofetchRequest])) {
            return this.adaptor[dofetchRequest](req);
        }
        else {
            return this.dofetchRequest(req, this.adaptor.options.addRecord);
        }
    }
    /**
     * Removes data from the table with the given key.
     *
     * @param  {string} keyField - Defines the column field.
     * @param  {Object} value - Defines the value to find the data in the specified column.
     * @param  {string|Query} tableName - Defines the table name
     * @param  {Query} query - Sets default query for the DataManager.
     */
    remove(keyField, value, tableName, query) {
        if (typeof value === 'object') {
            value = DataUtil.getObject(keyField, value);
        }
        if (tableName instanceof Query) {
            query = tableName;
            tableName = null;
        }
        const res = this.adaptor.remove(this, keyField, value, tableName, query);
        const dofetchRequest = 'dofetchRequest';
        if (this.dataSource.offline) {
            return res;
        }
        if (!isNullOrUndefined(this.adaptor[dofetchRequest])) {
            return this.adaptor[dofetchRequest](res);
        }
        else {
            const remove = this.adaptor.options.deleteRecord;
            return this.dofetchRequest(res, remove);
        }
    }
    /**
     * Updates existing record in the given table.
     *
     * @param {string} keyField - Defines the column field.
     * @param {Object} value - Defines the value to find the data in the specified column.
     * @param {string|Query} tableName - Defines the table name
     * @param {Query} query - Sets default query for the DataManager.
     * @param original
     */
    update(keyField, value, tableName, query, original) {
        if (tableName instanceof Query) {
            query = tableName;
            tableName = null;
        }
        if (this.isEnableCache) {
            this.cacheQuery = this.generateKey(this.dataSource.url, query);
        }
        const res = this.adaptor.update(this, keyField, value, tableName, query, original);
        const dofetchRequest = 'dofetchRequest';
        if (this.dataSource.offline) {
            return res;
        }
        if (!isNullOrUndefined(this.adaptor[dofetchRequest])) {
            return this.adaptor[dofetchRequest](res);
        }
        else {
            const update = this.adaptor.options.updateRecord;
            return this.dofetchRequest(res, update);
        }
    }
    isCustomDataAdaptor(dataSource) {
        return this.adaptor.getModuleName &&
            this.adaptor.getModuleName() === 'CustomDataAdaptor';
    }
    isGraphQLAdaptor(dataSource) {
        return this.adaptor.getModuleName &&
            this.adaptor.getModuleName() === 'GraphQLAdaptor';
    }
    successFunc(record, request, changes) {
        if (this.isGraphQLAdaptor(this.adaptor)) {
            const data = typeof record === 'object' ? record : JSON.parse(record);
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
            const requests = JSON.parse(request.data);
            if (requests.action === 'insert' || requests.action === 'remove') {
                const obj = { keys: [], results: [] };
                window.localStorage.setItem(this.guidId, JSON.stringify(obj));
            }
            else if (requests.action === 'update') {
                const cachedItems = JSON.parse(window.localStorage.getItem(this.guidId));
                const data = cachedItems ? cachedItems.results[cachedItems.keys.indexOf(this.cacheQuery)] : null;
                if (data && data.result) {
                    let cacheData = data.result;
                    for (let i = 0; i < cacheData.length; i++) {
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
    }
    failureFunc(e) {
        if (this.isEnableCache) {
            this.cacheQuery = '';
        }
        this.fetchDeffered.reject([{ error: e }]);
    }
    dofetchRequest(res, fetchFunc, changes) {
        res = extend({}, {
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            processData: false
        }, res);
        this.fetchDeffered = new Deferred();
        if (!this.isCustomDataAdaptor(this.adaptor)) {
            const fetch = new Fetch(res);
            fetch.beforeSend = () => {
                this.beforeSend(fetch.fetchRequest, fetch);
            };
            fetch.onSuccess = this.successFunc.bind(this);
            fetch.onFailure = this.failureFunc.bind(this);
            fetch.send().catch((e) => true); // to handle the failure requests.
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
    }
    clearPersistence() {
        window.removeEventListener('unload', this.setPersistData.bind(this));
        this.dataSource.enablePersistence = false;
        this.persistQuery = {};
        window.localStorage.setItem(this.dataSource.id, '[]');
    }
}
/**
 * Deferred is used to handle asynchronous operation.
 */
class Deferred {
    constructor() {
        /**
         * Promise is an object that represents a value that may not be available yet, but will be resolved at some point in the future.
         */
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
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
}

export { Adaptor, CacheAdaptor, CustomDataAdaptor, DataManager, DataUtil, Deferred, GraphQLAdaptor, JsonAdaptor, ODataAdaptor, ODataV4Adaptor, Predicate, Query, RemoteSaveAdaptor, UrlAdaptor, WebApiAdaptor, WebMethodAdaptor };
//# sourceMappingURL=ej2-data.es2015.js.map
