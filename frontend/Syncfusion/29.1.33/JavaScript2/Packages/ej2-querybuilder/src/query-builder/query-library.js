import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
var QueryLibrary = /** @class */ (function () {
    function QueryLibrary(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    QueryLibrary.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    QueryLibrary.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on('query-library', this.queryLibrary, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    QueryLibrary.prototype.removeEventListener = function () {
        this.parent.off('query-library', this.queryLibrary);
        this.parent.off('destroyed', this.destroy);
    };
    QueryLibrary.prototype.queryLibrary = function (args) {
        switch (args.prop) {
            case 'getMongoFromRules':
                args.value['obj']['mongoQuery'] = this.getMongoFromRules(args.value['rule'], args.value['mongoQuery']);
                break;
            case 'mongoParser':
                this.mongoParser(args.value['mongoQuery'], args.value['rule'], args.value['mongoLocale']);
                break;
            case 'getParameterSql':
                args.value['obj']['sql'] = this.getParameterSql(args.value['rule']);
                break;
            case 'getNamedParameterSql':
                args.value['obj']['sql'] = this.getNamedParameterSql(args.value['rule']);
                break;
            case 'convertParamSqlToSql':
                args.value['obj']['sql'] = this.convertParamSqlToSql(args.value['sql']);
                break;
            case 'convertNamedParamSqlToSql':
                args.value['obj']['sql'] = this.convertNamedParamSqlToSql(args.value['sql']);
                break;
        }
    };
    QueryLibrary.prototype.getMongoFromRules = function (rule, mongoQuery) {
        mongoQuery = '{';
        if (rule.condition === 'or') {
            mongoQuery += '"$or":[';
            mongoQuery = this.convertMongoQuery(rule.rules, mongoQuery) + ']';
        }
        else {
            mongoQuery += '"$and":[';
            mongoQuery = this.convertMongoQuery(rule.rules, mongoQuery) + ']';
        }
        mongoQuery += '}';
        return mongoQuery;
    };
    QueryLibrary.prototype.getOperatorFromMongoOperator = function (operator) {
        var operatorValue;
        switch (operator) {
            case '$ne':
                operatorValue = 'notequal';
                break;
            case '$gt':
                operatorValue = 'greaterthan';
                break;
            case '$gte':
                operatorValue = 'greaterthanorequal';
                break;
            case '$lt':
                operatorValue = 'lessthan';
                break;
            case '$lte':
                operatorValue = 'lessthanorequal';
                break;
            case '$nin':
                operatorValue = 'notin';
                break;
        }
        return operatorValue;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    QueryLibrary.prototype.convertMongoQuery = function (rules, mongoQuery) {
        var _this = this;
        var i = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rules.forEach(function (item) {
            i++;
            mongoQuery += '{';
            if (item.rules !== undefined) {
                if (item.condition === 'or') {
                    mongoQuery += ' "$or":[';
                    mongoQuery = _this.convertMongoQuery(item.rules, mongoQuery) + ']';
                }
                else {
                    mongoQuery += ' "$and":[';
                    mongoQuery = _this.convertMongoQuery(item.rules, mongoQuery) + ']';
                }
            }
            var itVal = item.type === 'string' && item.operator !== 'in' && item.operator !== 'notin' && item.value && item.value.trim() !== '' ? item.value.replace(/'/g, '\\') : '';
            if (item.type === 'string' && (item.operator === 'in' || item.operator === 'notin') && item.value && item.value.length === 1) {
                itVal = item.value[0].replace(/'/g, '\\');
            }
            var field = item.field ? item.field.substring(0) : '';
            switch (item.operator) {
                case 'contains':
                    mongoQuery += '"' + field + '":{"$regex":"' + itVal + '"}';
                    break;
                case 'notcontains':
                    mongoQuery += '"' + field + '":{"$not":{"$regex":"' + item.value + '"}}';
                    break;
                case 'startswith':
                    mongoQuery += '"' + field + '":{"$regex":"^' + itVal + '"}';
                    break;
                case 'notstartswith':
                    mongoQuery += '"' + field + '":{"$not":{"$regex":"^' + item.value + '"}}';
                    break;
                case 'endswith':
                    mongoQuery += '"' + field + '":{"$regex":"' + itVal + '$"}';
                    break;
                case 'notendswith':
                    mongoQuery += '"' + field + '":{"$not":{"$regex":"' + item.value + '$"}}';
                    break;
                case 'isnull':
                    mongoQuery += '"' + field + '": null';
                    break;
                case 'isnotnull':
                    mongoQuery += '"' + field + '":{"$ne": null}';
                    break;
                case 'isempty':
                    mongoQuery += '"' + field + '": ""';
                    break;
                case 'isnotempty':
                    mongoQuery += '"' + field + '":{"$ne": ""}';
                    break;
                case 'equal':
                    if (item.type === 'string') {
                        mongoQuery += '"' + field + '":"' + itVal + '"';
                    }
                    else if (item.type === 'date') {
                        mongoQuery += '"' + field + '":"' + item.value + '"';
                    }
                    else if (item.type === 'boolean') {
                        mongoQuery += '"' + field + '":' + item.value + '';
                    }
                    else {
                        mongoQuery += '"' + field + '":' + item.value + '';
                    }
                    break;
                case 'notequal':
                    if (item.type === 'string') {
                        mongoQuery += '"' + field + '":{"$ne":"' + itVal + '"}';
                    }
                    else if (item.type === 'date') {
                        mongoQuery += '"' + field + '":{"$ne":"' + item.value + '"}';
                    }
                    else {
                        mongoQuery += '"' + field + '":{"$ne":' + item.value + '}';
                    }
                    break;
                case 'in':
                    if (item.type === 'string') {
                        if (item.value.length > 1) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            var s = item.value.map(function (x, j) { return (j < item.value.length ? "\"" + x + "\"" : ''); }).toString();
                            s = s.endsWith(',') ? s.substring(0, s.length - 1) : s;
                            mongoQuery += '"' + field + '": { "$in": [' + s + ']}';
                        }
                        else {
                            mongoQuery += '"' + field + '": { "$in": ["' + itVal + '"]}';
                        }
                    }
                    else if (item.type === 'number') {
                        if (item.value.length > 1) {
                            mongoQuery += '"' + field + '": { "$in": [' + item.value.toString() + ']}';
                        }
                        else {
                            mongoQuery += '"' + field + '": { "$in": [' + item.value + ']}';
                        }
                    }
                    break;
                case 'notin':
                    if (item.type === 'string') {
                        if (item.value.length > 1) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            var s = item.value.map(function (x, j) { return (j < item.value.length ? "\"" + x + "\"" : ''); }).toString();
                            s = s.endsWith(',') ? s.substring(0, s.length - 1) : s;
                            mongoQuery += '"' + field + '": { "$nin": [' + s + ']}';
                        }
                        else {
                            mongoQuery += '"' + field + '": { "$nin": ["' + itVal + '"]}';
                        }
                    }
                    else if (item.type === 'number') {
                        if (item.value.length > 1) {
                            mongoQuery += '"' + field + '": { "$nin": [' + item.value.toString() + ']}';
                        }
                        else {
                            mongoQuery += '"' + field + '": { "$nin": [' + item.value + ']}';
                        }
                    }
                    break;
                case 'greaterthan':
                    if (item.type === 'number') {
                        mongoQuery += '"' + field + '": { "$gt": ' + item.value + '}';
                    }
                    else {
                        mongoQuery += '"' + field + '": { "$gt": "' + item.value + '"}';
                    }
                    break;
                case 'greaterthanorequal':
                    if (item.type === 'number') {
                        mongoQuery += '"' + field + '": { "$gte": ' + item.value + '}';
                    }
                    else {
                        mongoQuery += '"' + field + '": { "$gte": "' + item.value + '"}';
                    }
                    break;
                case 'between':
                    if (item.type === 'number') {
                        mongoQuery += '"' + field + '": {"$gte":' + item.value[0] + ', "$lte":' + item.value[1] + '}';
                    }
                    else {
                        mongoQuery += '"' + field + '": {"$gte": "' + item.value[0] + '", "$lte": "' + item.value[1] + '"}';
                    }
                    break;
                case 'notbetween':
                    if (item.type === 'number') {
                        mongoQuery += '"$or":[{"' + field + '": {"$lt":' + item.value[0] + '}}, {"' + field + '": {"$gt":' + item.value[1] + '}}]';
                    }
                    else {
                        mongoQuery += '"$or":[{"' + field + '": {"$lt": "' + item.value[0] + '"}}, {"' + field + '": {"$gt": "' + item.value[1] + '"}}]';
                    }
                    break;
                case 'lessthan':
                    if (item.type === 'number') {
                        mongoQuery += '"' + field + '": { "$lt": ' + item.value + '}';
                    }
                    else {
                        mongoQuery += '"' + field + '": { "$lt": "' + item.value + '"}';
                    }
                    break;
                case 'lessthanorequal':
                    if (item.type === 'number') {
                        mongoQuery += '"' + field + '": { "$lte": ' + item.value + '}';
                    }
                    else {
                        mongoQuery += '"' + field + '": { "$lte": "' + item.value + '"}';
                    }
                    break;
            }
            mongoQuery += '}';
            if (rules.length !== i) {
                mongoQuery += ',';
            }
        });
        return mongoQuery;
    };
    QueryLibrary.prototype.mongoParser = function (mongoQuery, rule, mongoLocale) {
        var mongoList;
        if (Object.keys(mongoQuery).indexOf('$and') > -1) {
            mongoList = mongoQuery['$and'];
            rule.condition = 'and';
        }
        else if (Object.keys(mongoQuery).indexOf('$or') > -1) {
            mongoList = mongoQuery['$or'];
            rule.condition = 'or';
        }
        rule.rules = [];
        this.mongoRecursion(mongoList, rule.rules, mongoLocale);
    };
    QueryLibrary.prototype.mongoRecursion = function (mongoList, rules, mongoLocale) {
        var operatorValue;
        var type;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var stringValue;
        var key;
        var betweenValue;
        var fieldType;
        var condition;
        var value;
        var subRules;
        var rule;
        var keyObj;
        var ruleValue;
        for (var i = 0, len = mongoList.length; i < len; i++) {
            var betweenOperatorArray = [];
            var inOperatorArray = [];
            condition = Object.keys(mongoList[i])[0];
            value = mongoList[i][condition];
            if (condition === '$and') {
                if (this.parent.enableNotCondition) {
                    subRules = { condition: condition.replace('$', ''), rules: [], not: false };
                }
                else {
                    subRules = { condition: condition.replace('$', ''), rules: [] };
                }
                rules.push(subRules);
                this.mongoRecursion(mongoList[i][condition], rules[rules.length - 1].rules, mongoLocale);
            }
            else if (condition === '$or') {
                var notBetween = void 0;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var innerObject = [];
                var keys = [];
                var firstKey = [];
                var secondKey = [];
                var innerKeys = [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var firstValue = [];
                var secondValue = [];
                var innerFirstValue = [];
                var innerSecondValue = [];
                if (Array.isArray(value) && value.length === 2) {
                    keys = Object.keys(value);
                    innerFirstValue = value[keys[0]];
                    innerSecondValue = value[keys[1]];
                    if (typeof innerFirstValue === 'object') {
                        innerObject = Object.keys(innerFirstValue)[0];
                        innerKeys = Object.keys(innerFirstValue[Object.keys(innerFirstValue)[0]]);
                        firstKey = innerKeys[0];
                        secondKey = Object.keys(innerSecondValue[Object.keys(innerSecondValue)[0]])[0];
                        if (firstKey === '$lt' && secondKey === '$gt') {
                            operatorValue = 'notbetween';
                            // eslint-disable-next-line security/detect-object-injection
                            firstValue = innerFirstValue[innerObject][firstKey];
                            // eslint-disable-next-line security/detect-object-injection
                            secondValue = innerSecondValue[innerObject][secondKey];
                            type = typeof firstValue === 'number' ? 'number' : 'date';
                            ruleValue = [firstValue, secondValue];
                            rule = { field: innerObject, label: innerObject, value: ruleValue, operator: operatorValue, type: type };
                            rules.push(rule);
                            notBetween = true;
                        }
                    }
                }
                if (!notBetween) {
                    if (this.parent.enableNotCondition) {
                        subRules = { condition: condition.replace('$', ''), rules: [], not: false };
                    }
                    else {
                        subRules = { condition: condition.replace('$', ''), rules: [] };
                    }
                    rules.push(subRules);
                    this.mongoRecursion(mongoList[i][condition], rules[rules.length - 1].rules, mongoLocale);
                }
            }
            else {
                value = mongoList[i][condition];
                if (value === null) { // isnull operator
                    operatorValue = 'isnull';
                }
                if (typeof value === 'boolean') { // boolean type values
                    operatorValue = 'equal';
                    type = 'boolean';
                    ruleValue = value;
                }
                if (typeof (value) === 'number') {
                    ruleValue = value;
                    type = 'number';
                    operatorValue = 'equal';
                }
                else if (typeof (value) === 'object' && value !== null) {
                    keyObj = Object.keys(value);
                    for (var i_1 = 0; i_1 < keyObj.length; i_1++) {
                        key = keyObj[i_1];
                        stringValue = (value)[keyObj[i_1]];
                        if (key === '$ne' && isNullOrUndefined(stringValue)) { // not null operator
                            operatorValue = 'isnotnull';
                            ruleValue = null;
                        }
                        if (key === '$ne' && typeof stringValue === 'boolean') { // not equal operator for boolean
                            operatorValue = 'notequal';
                            ruleValue = stringValue;
                            type = 'boolean';
                        }
                        if (keyObj.length >= 2 && keyObj[i_1]) {
                            if (typeof (stringValue) == 'object') { // between and notbetween operators
                                operatorValue = 'notbetween';
                                condition = Object.keys(stringValue)[0];
                                betweenValue = [Object.keys(stringValue[condition])[0]];
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                betweenOperatorArray.push(stringValue[condition][betweenValue]);
                                type = 'number';
                            }
                            else {
                                operatorValue = 'between';
                                betweenOperatorArray.push(stringValue);
                            }
                            if (typeof (stringValue) === 'number') {
                                type = 'number';
                            }
                        }
                        else if (typeof (stringValue) === 'object' && stringValue !== null) { // "in" and "notin" operator
                            if (key === '$not' && Object.keys(stringValue)[0] === '$regex') {
                                if (stringValue['$regex'].indexOf('^') > -1) {
                                    operatorValue = 'notstartswith';
                                    ruleValue = stringValue['$regex'].replace('^', '');
                                }
                                else if (stringValue['$regex'].indexOf('$') > -1) {
                                    operatorValue = 'notendswith';
                                    ruleValue = stringValue['$regex'].replace('$', '');
                                }
                                else {
                                    operatorValue = 'notcontains';
                                    ruleValue = stringValue['$regex'];
                                }
                            }
                            else {
                                operatorValue = key === '$in' ? 'in' : 'notin';
                                inOperatorArray = stringValue;
                                type = typeof (stringValue[0]) === 'number' ? 'number' : 'string';
                            }
                        }
                        else if (typeof (stringValue) === 'number') { // number type values
                            operatorValue = this.getOperatorFromMongoOperator(key);
                            type = 'number';
                            ruleValue = stringValue;
                        }
                        if (typeof (stringValue) === 'string') { // string type values
                            if (key === '$regex') {
                                operatorValue = 'contains';
                                ruleValue = stringValue;
                                type = 'string';
                            }
                            if (key === '$ne') { // not equal
                                if (stringValue !== null && stringValue.length > 0 && isNaN(Date.parse(stringValue))) {
                                    operatorValue = 'notequal';
                                    ruleValue = stringValue;
                                }
                                else if (isNullOrUndefined(stringValue)) { // is not null operator
                                    operatorValue = 'isnotnull';
                                    ruleValue = stringValue;
                                }
                                else if (stringValue === '') { // is not empty operator
                                    operatorValue = 'isnotempty';
                                    ruleValue = stringValue;
                                }
                                type = 'string';
                            }
                            if (stringValue.indexOf('^') > -1) {
                                operatorValue = 'startswith';
                                ruleValue = stringValue.replace('^', '');
                                type = 'string';
                            }
                            if (stringValue.indexOf('$') > -1 && key !== '$not') {
                                operatorValue = 'endswith';
                                ruleValue = stringValue.replace('$', '');
                                type = 'string';
                            }
                            for (var _i = 0, _a = this.parent.columns; _i < _a.length; _i++) {
                                var column = _a[_i];
                                if (column.field === condition) {
                                    fieldType = column.type;
                                    break;
                                }
                            }
                            if (!isNaN(Date.parse(stringValue)) || fieldType === 'date') { // Date type operators
                                operatorValue = operatorValue || this.getOperatorFromMongoOperator(key);
                                type = 'date';
                                ruleValue = stringValue;
                            }
                        }
                    }
                }
                else if (value && typeof (value) === 'string' && !isNaN(Date.parse(value))) {
                    operatorValue = 'equal';
                    ruleValue = value;
                    type = 'date';
                }
                else if (typeof (value) === 'string' && value !== '' && value !== 'true' && value !== 'false') {
                    operatorValue = 'equal';
                    ruleValue = value;
                    type = 'string';
                }
                else if (typeof (value) === 'string' && value === '') {
                    operatorValue = 'isempty';
                    ruleValue = value;
                    type = 'string';
                }
                if (betweenOperatorArray && betweenOperatorArray.length > 1) { // between opertor value
                    rule = { field: condition, label: condition, value: betweenOperatorArray, operator: operatorValue, type: type };
                }
                else if (inOperatorArray && inOperatorArray.length > 1) { // in operator value
                    rule = { field: condition, label: condition, value: inOperatorArray, operator: operatorValue, type: type };
                }
                else {
                    rule = { field: condition, label: condition, value: ruleValue, operator: operatorValue, type: type };
                }
                rules.push(rule);
                operatorValue = '';
            }
        }
    };
    QueryLibrary.prototype.convertParamSqlToSql = function (sql) {
        var paramSql = sql.sql;
        var paramValues = sql.params;
        var parts = paramSql.split('?');
        var normalSql = parts[0];
        for (var i = 0; i < paramValues.length; i++) {
            normalSql += (typeof (paramValues[i]) === 'string' ? "'" + paramValues[i] + "'" + parts[i + 1] : paramValues[i] + parts[i + 1]);
        }
        if (normalSql.length >= 2 && normalSql[0] === '(' && normalSql[normalSql.length - 1] === ')') {
            normalSql = normalSql.slice(1, -1);
        }
        normalSql = normalSql.replace(/!= ''(?! =)/g, 'IS NOT EMPTY').replace(/= ''/g, 'IS EMPTY');
        return normalSql;
    };
    QueryLibrary.prototype.convertNamedParamSqlToSql = function (sql) {
        var namedParamSql = sql.sql;
        var params = sql.params;
        var normalSql = namedParamSql;
        Object.keys(params).forEach(function (paramName) {
            var paramValue = params[paramName];
            paramName = ':' + paramName;
            normalSql = normalSql.replace(paramName, typeof (paramValue) === 'string' ? "'" + paramValue + "'" : String(paramValue));
        });
        if (normalSql.length >= 2 && normalSql[0] === '(' && normalSql[normalSql.length - 1] === ')') {
            normalSql = normalSql.slice(1, -1);
        }
        normalSql = normalSql.replace(/!= ''(?! =)/g, 'IS NOT EMPTY').replace(/= ''/g, 'IS EMPTY');
        return normalSql;
    };
    QueryLibrary.prototype.getParameterSql = function (qbrule) {
        var qbRule = extend({}, qbrule, null, true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var value = this.updateRuleValue(qbRule, false);
        return this.getParameterSQLVal(this.parent.getSqlFromRules(qbRule), value['ruleVal']);
    };
    QueryLibrary.prototype.getNamedParameterSql = function (qbrule) {
        var qbRule = extend({}, qbrule, null, true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var value = this.updateRuleValue(qbRule, true);
        return this.getNamedParameterSQLVal(this.parent.getSqlFromRules(qbRule), value['namedRuleVal']);
    };
    QueryLibrary.prototype.getParameterSQLVal = function (content, ruleValue) {
        var replacedString = content.replace(/[%']/g, '');
        return { sql: '(' + replacedString + ')', params: ruleValue };
    };
    QueryLibrary.prototype.getNamedParameterSQLVal = function (content, ruleValue) {
        var replacedString = content.replace(/[%']/g, '');
        return { sql: '(' + replacedString + ')', params: ruleValue };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    QueryLibrary.prototype.updateRuleValue = function (rule, isNamedParameter) {
        var ruleVal = [];
        var namedRuleVal = {};
        var namedParameters = [];
        return this.updateValue(rule.rules, isNamedParameter, ruleVal, namedRuleVal, namedParameters);
    };
    QueryLibrary.prototype.updateValue = function (rules, isNamedParameter, ruleVal, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    namedRuleVal, namedParameters) {
        if (isNullOrUndefined(rules)) {
            return { ruleVal: ruleVal, namedRuleVal: namedRuleVal };
        }
        for (var i = 0; i < rules.length; i++) {
            if (rules[i].rules) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var value = this.updateValue(rules[i].rules, isNamedParameter, ruleVal, namedRuleVal, namedParameters);
                ruleVal = value['ruleVal'];
                namedRuleVal = value['namedRuleVal'];
            }
            else {
                var namedField = void 0;
                if (rules[i].value instanceof Array) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    for (var j = 0; j < (rules[i].value).length; j++) {
                        if (isNamedParameter) {
                            namedField = this.getNamedParameter(rules[i].field, namedParameters);
                        }
                        if (!isNullOrUndefined(rules[i].value[j])) {
                            if (rules[i].type === 'string' || rules[i].type === 'date') {
                                if (isNamedParameter) {
                                    namedRuleVal[namedField] = rules[i].value[j];
                                }
                                else {
                                    ruleVal.push(rules[i].value[j]);
                                }
                            }
                            else {
                                if (isNamedParameter) {
                                    namedRuleVal[namedField] = rules[i].value[j];
                                }
                                else {
                                    ruleVal.push(rules[i].value[j]);
                                }
                            }
                        }
                        if (isNamedParameter) {
                            rules[i].value[j] = ':' + namedField;
                        }
                        else {
                            rules[i].value[j] = '?';
                        }
                    }
                }
                else {
                    if (isNamedParameter) {
                        namedField = this.getNamedParameter(rules[i].field, namedParameters);
                    }
                    if (rules[i].operator.indexOf('null') < 1) {
                        if (rules[i].type !== 'string' || (rules[i].type === 'string' && (rules[i].value !== '' || rules[i].value === 0))) {
                            if (rules[i].type === 'string' || rules[i].type === 'date') {
                                if (rules[i].operator.indexOf('empty') < 1) {
                                    var value = rules[i].value.toString();
                                    switch (rules[i].operator) {
                                        case 'startswith':
                                        case 'notstartswith':
                                            value = value + '%';
                                            break;
                                        case 'endswith':
                                        case 'notendswith':
                                            value = '%' + value;
                                            break;
                                        case 'contains':
                                        case 'notcontains':
                                            value = '%' + value + '%';
                                            break;
                                    }
                                    if (isNamedParameter) {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        namedRuleVal[namedField] = value;
                                    }
                                    else {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        ruleVal.push(value);
                                    }
                                }
                                else {
                                    if (isNamedParameter) {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        namedRuleVal[namedField] = '';
                                    }
                                    else {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        ruleVal.push('');
                                    }
                                    if (rules[i].operator === 'isempty') {
                                        rules[i].operator = 'equal';
                                    }
                                    else {
                                        rules[i].operator = 'notequal';
                                    }
                                }
                            }
                            else {
                                if (!isNullOrUndefined(rules[i].value)) {
                                    if (isNamedParameter) {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        namedRuleVal[namedField] = rules[i].value;
                                    }
                                    else {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        ruleVal.push(rules[i].value);
                                    }
                                }
                            }
                            if (isNamedParameter) {
                                rules[i].value = ':' + namedField;
                            }
                            else {
                                rules[i].value = '?';
                            }
                        }
                    }
                }
            }
        }
        return { ruleVal: ruleVal, namedRuleVal: namedRuleVal };
    };
    QueryLibrary.prototype.getNamedParameter = function (field, namedParameters) {
        var newField = null;
        if (namedParameters.length > 0) {
            for (var i = namedParameters.length - 1; i >= 0; i--) {
                var currField = namedParameters[i];
                if (currField.indexOf(field) > -1) {
                    var idx = parseInt(currField.split('_')[1], 10) + 1;
                    newField = field + '_' + idx;
                    namedParameters.push(newField);
                    break;
                }
            }
        }
        if (!newField) {
            newField = field + '_1';
            namedParameters.push(newField);
        }
        return newField;
    };
    QueryLibrary.prototype.getModuleName = function () {
        return 'query-library';
    };
    return QueryLibrary;
}());
export { QueryLibrary };
