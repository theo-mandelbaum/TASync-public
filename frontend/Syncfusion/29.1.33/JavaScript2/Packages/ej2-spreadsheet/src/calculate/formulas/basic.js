import { FormulasErrorsStrings, CommonErrors, getSkeletonVal } from '../common/index';
import { getAlphalabel } from '../base/index';
import { isNullOrUndefined, getValue, Internationalization } from '@syncfusion/ej2-base';
import { DataUtil } from '@syncfusion/ej2-data';
import { checkDateFormat, dateToInt, isNumber, isCellReference, isValidCellReference, getCellIndexes, isHiddenRow, isHiddenCol } from '../../workbook/index';
/**
 * Represents the basic formulas module.
 */
var BasicFormulas = /** @class */ (function () {
    function BasicFormulas(parent) {
        this.formulas = [
            { formulaName: 'SUM', category: 'Math & Trig', description: 'Sums individual values, cell references or ranges.' },
            {
                formulaName: 'SUMIFS', category: 'Math & Trig',
                description: 'Sums the cells specified by a given set of conditionsor criteria.'
            },
            {
                formulaName: 'SUMPRODUCT', category: 'Math & Trig',
                description: 'Returns sum of the product of given ranges of arrays.'
            },
            { formulaName: 'ABS', category: 'Math & Trig', description: 'Returns the absolute value of a number.' },
            { formulaName: 'RAND', category: 'Math & Trig', description: 'Return a random number between 0 and 1.' },
            { formulaName: 'FLOOR', category: 'Math & Trig', description: 'Returns the round a number down to the nearest integer.' },
            { formulaName: 'CEILING', category: 'Math & Trig', description: 'Returns a number rounded up to a multiple of another number.' },
            {
                formulaName: 'SUMIF', category: 'Math & Trig',
                description: 'It will sum up cells that meet the given criteria.'
            },
            {
                formulaName: 'PRODUCT', category: 'Math & Trig',
                description: 'Multiplies all the numbers given as arguments and returns the product.'
            },
            {
                formulaName: 'AVERAGE', category: 'Statistical',
                description: 'The sum of the numbers divided by how many numbers are being averaged.'
            },
            {
                formulaName: 'AVERAGEIF', category: 'Statistical',
                description: 'Computes the average of the numbers in a range that meet the supplied criteria.'
            },
            {
                formulaName: 'COUNT', category: 'Statistical',
                description: 'Counts the numbers in the list of arguments, exclude text entries.'
            },
            { formulaName: 'COUNTA', category: 'Statistical', description: 'Counts the non-empty values in the list of arguments.' },
            {
                formulaName: 'COUNTIF', category: 'Statistical',
                description: 'Counts the number of cells in a range that meet a specified condition.'
            },
            {
                formulaName: 'COUNTIFS', category: 'Statistical',
                description: 'Counts the number of times each cells in all the ranges that meet the specific conditions.'
            },
            {
                formulaName: 'AVERAGEA', category: 'Statistical',
                description: 'Calculates the average of values in the list of arguments.Arguments can be numbers, names, arrays or references.'
            },
            {
                formulaName: 'AVERAGEIFS', category: 'Statistical',
                description: 'Conditionally returns the average of the contents of cells for the set of ranges.'
            },
            {
                formulaName: 'MIN', category: 'Statistical',
                description: 'Returns the smaller number in set of arguments.'
            },
            { formulaName: 'MAX', category: 'Statistical', description: 'Returns the largest number in set of arguments.' },
            { formulaName: 'DATE', category: 'Date', description: 'Returns the date, given the year, month and day of the month.' },
            { formulaName: 'DAY', category: 'Date', description: 'Returns the day of a given date.' },
            { formulaName: 'TODAY', category: 'Date', description: 'Returns the current date as date value.' },
            { formulaName: 'DAYS', category: 'Date', description: 'Returns the number of days between two dates.' },
            { formulaName: 'WEEKDAY', category: 'Date', description: 'Returns the day of the week corresponding to a date.' },
            {
                formulaName: 'IF', category: 'Logical',
                description: 'Returns one value if a logical expression is TRUE and another if it is FALSE'
            },
            {
                formulaName: 'AND', category: 'Logical',
                description: 'Returns TRUE if all the arguments are considered TRUE, and FALSE otherwise.'
            },
            {
                formulaName: 'IFS', category: 'Logical',
                description: 'Checks multiple conditions and returns a value corresponding to the first TRUE result.'
            },
            {
                formulaName: 'IFERROR', category: 'Logical',
                description: 'Returns a value you specify if a formula evaluates to an error; otherwise, it returns the result of the formula.'
            },
            {
                formulaName: 'CHOOSE', category: 'Lookup & Reference',
                description: 'Returns a value from a list, given an index number.'
            },
            {
                formulaName: 'INDEX', category: 'Lookup & Reference',
                description: 'Returns a value from a table, given a row and column number.'
            },
            { formulaName: 'FIND', category: 'Text', description: 'Returns the position of a string of text within another string.' },
            { formulaName: 'CONCATENATE', category: 'Text', description: ' Used to join two or more strings together.' },
            { formulaName: 'CONCAT', category: 'Text', description: 'Concatenates a list or range of text strings.' },
            { formulaName: 'SUBTOTAL', category: 'Lookup & Reference', description: 'Returns a subtotal in a list or database.' },
            { formulaName: 'RADIANS', category: 'Math & Trig', description: 'Converts degrees to radians.' },
            {
                formulaName: 'OR', category: 'Logical',
                description: 'Returns TRUE if any arguments considered TRUE, and all the arguments are FALSE it will return FALSE.'
            },
            { formulaName: 'NOT', category: 'Logical', description: 'Returns the inverse of a given logical expression.' },
            {
                formulaName: 'MATCH', category: 'Lookup & Reference',
                description: 'Returns the relative position of an checked item in range that matches a specified value in a specified order'
            },
            {
                formulaName: 'RANDBETWEEN', category: 'Math & Trig', description: 'Returns an integer random number in a specified range.'
            },
            {
                formulaName: 'SLOPE', category: 'Statistical',
                description: 'Returns the slope of the line from linear regression of the data points.'
            },
            {
                formulaName: 'INTERCEPT', category: 'Statistical',
                description: 'Calculates the point of the Y-intercept line via linear regression.'
            },
            {
                formulaName: 'RSQ', category: 'Statistical',
                description: 'Returns the square of the Pearson product moment correlation coefficient based on data points in known_ys and known_xs'
            },
            {
                formulaName: 'UNIQUE', category: 'Lookup & Reference',
                description: 'Returns a unique values from a range or array.'
            },
            {
                formulaName: 'ROUNDUP', category: 'Math & Trig', description: 'Rounds a number away from zero.'
            },
            {
                formulaName: 'ROUNDDOWN', category: 'Math & Trig', description: 'Rounds a number down, toward zero.'
            },
            {
                formulaName: 'INT', category: 'Math & Trig', description: 'Returns a number to the nearest integer.'
            },
            {
                formulaName: 'LN', category: 'Math & Trig', description: 'Returns the natural logarithm of a number.'
            },
            {
                formulaName: 'ISNUMBER', category: 'Information', description: 'Returns TRUE, if the argument is number and FALSE otherwise.'
            },
            {
                formulaName: 'ROUND', category: 'Math & Trig', description: 'Rounds a number to a specified number of digits.'
            },
            {
                formulaName: 'LOG', category: 'Math & Trig', description: 'Returns the logarithm of a number to the base that you specify.'
            },
            {
                formulaName: 'POWER', category: 'Math & Trig', description: 'Returns the result of a number raised to power.'
            },
            {
                formulaName: 'SQRT', category: 'Math & Trig', description: 'Returns the square root of a positive number.'
            },
            {
                formulaName: 'TRUNC', category: 'Math & Trig',
                description: 'Returns the truncated value of a number to a specified number of decimal places.'
            },
            {
                formulaName: 'EXP', category: 'Math & Trig', description: 'Returns e raised to the power of the given number.'
            },
            {
                formulaName: 'GEOMEAN', category: 'Statistical',
                description: 'Returns the geometric mean of an array or range of positive data.'
            },
            { formulaName: 'TEXT', category: 'Lookup & Reference', description: 'Converts a value to text in specified number format.' },
            { formulaName: 'SORT', category: 'Lookup & Reference', description: 'Sorts a range of an array.' },
            { formulaName: 'LOOKUP', category: 'Lookup & Reference', description: 'Looks for a value in a one-row or one-column range, then returns a value from the same position in a second one-row or one-column range.' },
            { formulaName: 'VLOOKUP', category: 'Lookup & Reference', description: 'Looks for a specific value in the first column of a lookup range and returns a corresponding value from a different column within the same row.' },
            { formulaName: 'HLOOKUP', category: 'Lookup & Reference', description: 'Looks for a value in the top row of the array of values and then returns a value in the same column from a row in the array that you specify.' },
            { formulaName: 'T', category: 'Text', description: 'Checks whether a value is text or not and returns the text.' },
            { formulaName: 'EXACT', category: 'Text', description: 'Checks whether a two text strings are exactly same and returns TRUE or FALSE.' },
            { formulaName: 'LEN', category: 'Text', description: 'Returns a number of characters in a given string.' },
            { formulaName: 'MOD', category: 'Math & Trig', description: 'Returns a remainder after a number is divided by divisor.' },
            { formulaName: 'ODD', category: 'Math & Trig', description: 'Rounds a positive number up and negative number down to the nearest odd integer.' },
            { formulaName: 'PI', category: 'Math & Trig', description: 'Returns the value of pi.' },
            { formulaName: 'COUNTBLANK', category: 'Statistical', description: 'Returns the number of empty cells in a specified range of cells.' },
            { formulaName: 'EVEN', category: 'Math & Trig', description: 'Rounds a positive number up and negative number down to the nearest even integer.' },
            { formulaName: 'FACT', category: 'Math & Trig', description: 'Returns the factorial of a number.' },
            { formulaName: 'DECIMAL', category: 'Math & Trig', description: 'Converts a text representation of a number in a given base into a decimal number.' },
            { formulaName: 'DEGREES', category: 'Math & Trig', description: 'Converts radians to degrees.' },
            { formulaName: 'ADDRESS', category: 'Lookup & Reference', description: 'Returns a cell reference as text, given specified row and column numbers.' },
            { formulaName: 'TIME', category: 'Date & Time', description: 'Converts hours, minutes, seconds to the time formatted text.' },
            { formulaName: 'CHAR', category: 'Text', description: 'Returns the character from the specified number.' },
            { formulaName: 'CODE', category: 'Text', description: 'Returns the numeric code for the first character in a given string.' },
            { formulaName: 'DOLLAR', category: 'Text', description: 'Converts the number to currency formatted text.' },
            { formulaName: 'SMALL', category: 'Statistical', description: 'Returns the k-th smallest value in a given array.' },
            { formulaName: 'LARGE', category: 'Statistical', description: 'Returns the k-th largest value in a given array.' },
            { formulaName: 'MEDIAN', category: 'Statistical', description: 'Returns the median of the given set of numbers.' },
            { formulaName: 'EDATE', category: 'Date & Time', description: 'Returns a date with given number of months before or after the specified date.' },
            { formulaName: 'EOMONTH', category: 'Date & Time', description: 'Returns the last day of the month that is a specified number of months before or after an initially supplied start date.' },
            { formulaName: 'DATEVALUE', category: 'Date & Time', description: 'Converts a date string into date value.' },
            { formulaName: 'HOUR', category: 'Date & Time', description: 'Returns the number of hours in a specified time string.' },
            { formulaName: 'MINUTE', category: 'Date & Time', description: 'Returns the number of minutes in a specified time string.' },
            { formulaName: 'SECOND', category: 'Date & Time', description: 'Returns the number of seconds in a specified time string.' },
            { formulaName: 'NOW', category: 'Date & Time', description: 'Returns the current date and time.' },
            { formulaName: 'MONTH', category: 'Date & Time', description: 'Returns the number of months in a specified date string.' },
            { formulaName: 'PROPER', category: 'Text', description: 'Converts a text to proper case; first letter to uppercase and other letters to lowercase.' }
        ];
        this.isConcat = false;
        this.parent = parent;
        this.init();
    }
    BasicFormulas.prototype.init = function () {
        var fn;
        for (var i = 0; i < this.formulas.length; i++) {
            fn = getValue('Compute' + this.formulas[i].formulaName, this).bind(this);
            this.addFormulaCollection(this.formulas[i].formulaName.toUpperCase(), fn, this.formulas[i].category, this.formulas[i].description);
        }
    };
    BasicFormulas.prototype.addFormulaCollection = function (formulaName, functionName, formulaCategory, description) {
        this.parent.libraryFormulas = {
            fName: formulaName, handler: functionName, category: formulaCategory,
            description: description
        };
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args
     * @returns {string | number} - Comput sum value
     */
    BasicFormulas.prototype.ComputeSUM = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var isSubtotalFormula = false;
        var isAggregateComputation;
        var sheet;
        if (args.length) {
            var lastArgument = args[args.length - 1];
            if (lastArgument === 'isSubtotal') {
                isSubtotalFormula = true;
                args.pop();
            }
            else if (lastArgument === 'isAggregate') {
                sheet = this.parent.parentObject.getActiveSheet();
                isAggregateComputation = true;
                args.pop();
            }
        }
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        var sum = 0;
        var val;
        var orgValue;
        var maxDecimalLength = 0;
        var indexes;
        if (!isNullOrUndefined(args)) {
            var argArr = args;
            var setMaxDecimalLength = function (val) {
                if (val.toString().indexOf('.') > -1) {
                    maxDecimalLength = Math.max(maxDecimalLength, val.split('.')[1].length);
                }
            };
            for (var i = 0; i < argArr.length; i++) {
                var argValue = argArr[i].toString();
                if (argValue.indexOf(':') > -1 && this.parent.isCellReference(argValue)) {
                    var cellCollection = this.parent.getCellCollection(argValue.split(this.parent.tic).join(''));
                    for (var j = 0; j < cellCollection.length; j++) {
                        if (isAggregateComputation) {
                            indexes = getCellIndexes(cellCollection[j]);
                            if (isHiddenRow(sheet, indexes[0]) || isHiddenCol(sheet, indexes[1])) {
                                continue;
                            }
                        }
                        val = !isSubtotalFormula ? this.parent.getValueFromArg(cellCollection[j]) :
                            this.parent.getValueFromArg(cellCollection[j], null, null, true);
                        if (isSubtotalFormula && val.includes('SUBTOTAL(')) {
                            continue;
                        }
                        if (this.parent.getErrorStrings().indexOf(val) > -1) {
                            return val;
                        }
                        if (isNullOrUndefined(val[0]) || isNaN(this.parent.parseFloat(val))) {
                            continue;
                        }
                        setMaxDecimalLength(val);
                        sum = sum + this.parent.parseFloat(val);
                    }
                }
                else {
                    if (argArr[i].indexOf(this.parent.tic) > -1) {
                        if (isNaN(this.parent.parseFloat(argArr[i].split(this.parent.tic).join(''))) ||
                            argArr[i].split(this.parent.tic).join('').trim() === '') {
                            return this.parent.getErrorStrings()[CommonErrors.Value];
                        }
                    }
                    if (argArr[i].split(this.parent.tic).join('') === this.parent.trueValue) {
                        argArr[i] = '1';
                    }
                    if (argArr[i].split(this.parent.tic).join('') === this.parent.falseValue) {
                        argArr[i] = '0';
                    }
                    orgValue = !isSubtotalFormula ? this.parent.getValueFromArg(argArr[i].split(this.parent.tic).join('')) :
                        this.parent.getValueFromArg(argArr[i].split(this.parent.tic).join(''), null, null, true);
                    if (isSubtotalFormula && orgValue.includes('SUBTOTAL(')) {
                        continue;
                    }
                    if (this.parent.getErrorStrings().indexOf(orgValue) > -1) {
                        return orgValue;
                    }
                    if (isNullOrUndefined(orgValue) || isNaN(this.parent.parseFloat(orgValue))) {
                        continue;
                    }
                    if (orgValue.length > 0) {
                        setMaxDecimalLength(orgValue);
                        sum = sum + this.parent.parseFloat(orgValue + '');
                    }
                }
            }
        }
        return sum.toString().indexOf('.') > -1 ? sum.toFixed(maxDecimalLength) : sum;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string | number} - Compute the Integer.
     */
    BasicFormulas.prototype.ComputeINT = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var argsValue;
        var errCollection = this.parent.getErrorStrings();
        if (args[0] === '' && args.length === 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        argsValue = this.parent.getValueFromArg(args[0]);
        if (errCollection.indexOf(argsValue) > -1) {
            return argsValue;
        }
        if (argsValue.toUpperCase() === this.parent.trueValue) {
            argsValue = '1';
        }
        else if (argsValue.toUpperCase() === this.parent.falseValue) {
            argsValue = '0';
        }
        if (!this.parent.isCellReference(args[0])) {
            if (args[0].indexOf(this.parent.tic + this.parent.tic) === -1) {
                argsValue = argsValue.split(this.parent.tic).join('');
            }
            if (argsValue.trim() === '') {
                return errCollection[CommonErrors.Value];
            }
        }
        if (argsValue.indexOf('%') > -1) {
            argsValue = (Number(argsValue.split('%')[0]) * 0.01).toString();
        }
        if (isNaN(this.parent.parseFloat(argsValue))) {
            return errCollection[CommonErrors.Value];
        }
        argsValue = this.parent.parseFloat(argsValue);
        argsValue = Math.floor(argsValue);
        return argsValue;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {Date | string} - Compute the Today.
     */
    BasicFormulas.prototype.ComputeTODAY = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var str;
        if (args.length !== 1 || args[0] !== '') {
            str = this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else {
            var dt = new Date(Date.now());
            if (this.parent.parentObject.getModuleName() === 'spreadsheet') {
                str = this.parent.parentObject.dateToInt(dt);
                if (this.parent.parser.storedStringText.toUpperCase().indexOf('TODAY') === 0 &&
                    this.parent.cell !== '') {
                    this.parent.parentObject.setDateFormat(this.parent.getSheetId(this.parent.grid), this.parent.rowIndex(this.parent.cell) - 1, this.parent.colIndex(this.parent.cell) - 1);
                }
            }
            else {
                str = dt.getFullYear() + '/' + this.parent.calculateDate((dt.getMonth() + 1).toString()) + '/'
                    + this.parent.calculateDate(dt.getDate().toString());
            }
        }
        return str;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {number} - Compute the day from the date.
     */
    BasicFormulas.prototype.ComputeWEEKDAY = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if ((args[0] === '' && isNullOrUndefined(args[1])) || args.length > 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        if ((args[0] === '' && args[1] === '') || args[1] === '') {
            return this.parent.getErrorStrings()[CommonErrors.Num].toString();
        }
        if (args.length === 1) {
            args.push('1');
        }
        if ((args[0].indexOf(this.parent.tic) > -1 && args[0].split(this.parent.tic).join('').trim() === '') || (args[1].split(this.parent.tic).join('').trim() === '') || (args[1].indexOf(this.parent.tic) > -1 && isNaN(this.parent.parseFloat(args[1].split(this.parent.tic).join(''))))) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        var date;
        var value;
        var day;
        if (this.parent.isCellReference(args[0])) {
            date = this.parent.getValueFromArg(args[0].split(this.parent.tic).join('')) || '0';
            if (date.indexOf(this.parent.tic) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            if ((args[0].indexOf(this.parent.tic) > -1 && isNaN(this.parent.parseFloat(args[0].split(this.parent.tic).join(''))))) {
                date = this.parent.getValueFromArg(args[0]);
            }
            else {
                date = this.parent.getValueFromArg(args[0].split(this.parent.tic).join('')) || '0';
            }
        }
        if (this.parent.isCellReference(args[1])) {
            value = this.parent.getValueFromArg(args[1].split(this.parent.tic).join('')) || '0';
        }
        else {
            value = this.parent.getValueFromArg(args[1].split(this.parent.tic).join(''));
        }
        if (this.parent.getErrorStrings().indexOf(date) > -1) {
            return date;
        }
        if (this.parent.getErrorStrings().indexOf(value) > -1) {
            return value;
        }
        date = date === this.parent.trueValue ? '1' : (date === this.parent.falseValue ? '0' : date);
        value = value === this.parent.trueValue ? '1' : (value === this.parent.falseValue ? '0' : value);
        day = this.parent.parseFloat(date);
        value = this.parent.parseFloat(value);
        if (isNaN(value) || isNaN(day)) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        if (day < 0 || day > 2958465) {
            return this.parent.getErrorStrings()[CommonErrors.Num].toString();
        }
        value = parseInt(value.toString(), 10);
        day = day < 1 ? 0 : Math.floor(day) % 7;
        switch (value) {
            case 1:
            case 17:
                day = day <= 0 ? day + 7 : day;
                break;
            case 2:
            case 11:
                day = day - 1;
                day = day <= 0 ? day + 7 : day;
                break;
            case 3:
                day = day - 2;
                day = day < 0 ? day + 7 : day;
                break;
            case 12:
                day = day + 5;
                day = day > 7 ? day - 7 : day;
                break;
            case 13:
                day = day + 4;
                day = day > 7 ? day - 7 : day;
                break;
            case 14:
                day = day + 3;
                day = day > 7 ? day - 7 : day;
                break;
            case 15:
                day = day + 2;
                day = day > 7 ? day - 7 : day;
                break;
            case 16:
                day = day + 1;
                day = day > 7 ? day - 7 : day;
                break;
            default:
                day = this.parent.getErrorStrings()[CommonErrors.Num].toString();
                break;
        }
        return day;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string} - Compute to the Proper casing.
     */
    BasicFormulas.prototype.ComputePROPER = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var str;
        var nestedFormula;
        var errCollection = this.parent.getErrorStrings();
        if (args.length && args[args.length - 1] === 'nestedFormulaTrue') {
            nestedFormula = true;
            args.pop();
        }
        if (isNullOrUndefined(args) || (args[0].trim() === '' && args.length === 1)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        str = this.parent.getValueFromArg(args[0]).trim();
        if (errCollection.indexOf(str) > -1) {
            return str;
        }
        if (args[0].indexOf(this.parent.tic) > -1) {
            if (args[0] !== str && args[0].startsWith('n')) {
                str = this.parent.removeTics(str.trim());
            }
            else {
                str = this.parent.removeTics(args[0].trim());
                if (str.indexOf(this.parent.tic + this.parent.tic) > -1) {
                    str = str.replace(/""/g, this.parent.tic);
                }
            }
        }
        else if (!args[0].startsWith('n') && str.split('%').length === 2 && this.parent.isNumber(str.split('%')[0])) {
            str = (Number(str.split('%')[0]) / 100).toString();
        }
        str = str.toLowerCase().replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        }).replace(/(\d)([a-z])/g, function (match, number, char) {
            return number + char.toUpperCase();
        });
        if (nestedFormula) {
            str = this.parent.tic + str + this.parent.tic;
        }
        return str;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string | number} - Compute the Sum product.
     */
    BasicFormulas.prototype.ComputeSUMPRODUCT = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a, _b;
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        var sum = 0;
        var count = 0;
        var index;
        var mulValues = null;
        var ranges = args;
        var len = [];
        for (var i = 0; i < ranges.length; i++) {
            len.push(this.parent.getCellCollection(ranges[i]).length);
        }
        for (var j = 0; j < len.length; j++) {
            if (len[j] && len[j + 1] && len[j] !== len[j + 1]) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        for (var k = 0; k < ranges.length; ++k) {
            var range = ranges[k];
            if (!range.startsWith(this.parent.tic) && this.parent.isCellReference(range)) {
                var i = range.indexOf(':');
                var startRow = this.parent.rowIndex(range.substr(0, i));
                var endRow = this.parent.rowIndex(range.substr(i + 1));
                if (!(startRow !== -1 || endRow === -1) === (startRow === -1 || endRow !== -1)) {
                    return this.parent.getErrorStrings()[CommonErrors.Name];
                }
                if (startRow > endRow) {
                    _a = [endRow, startRow], startRow = _a[0], endRow = _a[1];
                }
                var col1 = this.parent.colIndex(range.substr(0, i));
                var col2 = this.parent.colIndex(range.substr(i + 1));
                if (col1 > col2) {
                    _b = [col2, col1], col1 = _b[0], col2 = _b[1];
                }
                if (mulValues === null) {
                    count = (endRow - startRow + 1) * (col2 - col1 + 1);
                    mulValues = [];
                    for (i = 0; i < count; ++i) {
                        mulValues[i] = 1; //To create required index.
                    }
                }
                i = 0;
                for (var row = startRow; row <= endRow; ++row) {
                    for (var col = col1; col <= col2; ++col) {
                        var cellRef = this.getSheetReference(range) + this.parent.convertAlpha(col) + (row);
                        var result = this.parent.getValueFromArg(cellRef);
                        if (this.parent.getErrorStrings().indexOf(result) > -1) {
                            return result;
                        }
                        if (!isNaN(this.parent.parseFloat(result))) {
                            //To return #VALUE! error when array dimensions are mismatched.
                            if (isNaN(mulValues[i])) {
                                return this.parent.getErrorStrings()[CommonErrors.Name];
                            }
                            mulValues[i] = mulValues[i] * this.parent.parseFloat(result);
                        }
                        else {
                            mulValues[i] = 0;
                        }
                        i++;
                    }
                }
            }
            else {
                var s1 = this.parent.getValueFromArg(range);
                index = s1.indexOf('"');
                if (this.parent.getErrorStrings().indexOf(s1) > -1) {
                    return s1;
                }
                else if (index > -1) {
                    return 0;
                }
                else {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
            }
        }
        for (var i = 0; i < count; ++i) {
            sum += mulValues[i];
        }
        return sum;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string | number} - Compute the Roundup.
     */
    BasicFormulas.prototype.ComputeROUNDUP = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var str;
        var arg1;
        var arg2;
        var index;
        var num;
        var len = args.length;
        if (!isNullOrUndefined(args) && len > 2) {
            str = this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        if (len === 1 && args[0] !== '') {
            index = args[0].indexOf('"');
            arg1 = args[0].indexOf('"') > -1 ? args[0].replace('"', '') : args[0];
            arg1 = arg1.indexOf('"') > -1 ? arg1.replace('"', '') : arg1;
            arg1 = arg1.toUpperCase() === 'TRUE' ? '1' : (arg1 === 'FALSE' ? '0' : arg1);
            arg1 = this.parent.getValueFromArg(arg1);
            num = this.parent.parseFloat(arg1);
            if (num > 0) {
                num += .4999999999; // To round the number, we using this value.
            }
            else if (num < 0) {
                num -= .4999999999;
            }
            num = this.parent.parseFloat(num.toFixed(0));
            str = num.toString();
        }
        else if (len === 2) {
            index = args[0].indexOf('"') > -1 ? args[0].indexOf('"') : (args[1].indexOf('"') > -1 ? args[1].indexOf('"') : -1);
            if (this.parent.isCellReference(args[0])) {
                arg1 = this.parent.getValueFromArg(args[0]) || '0';
            }
            else {
                if (args[0].indexOf(this.parent.tic) > -1 && (args[0].split(this.parent.tic).join('') === this.parent.trueValue ||
                    args[0].split(this.parent.tic).join('') === this.parent.falseValue)) {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
                arg1 = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
            }
            if (this.parent.getErrorStrings().indexOf(arg1) > -1) {
                return arg1;
            }
            if (this.parent.isCellReference(args[1])) {
                arg2 = this.parent.getValueFromArg(args[1]) || '0';
            }
            else {
                if (args[1].indexOf(this.parent.tic) > -1 && (args[1].split(this.parent.tic).join('') === this.parent.trueValue ||
                    args[1].split(this.parent.tic).join('') === this.parent.falseValue)) {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
                arg2 = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('');
            }
            if (this.parent.getErrorStrings().indexOf(arg2) > -1) {
                return arg2;
            }
            arg1 = arg1.toUpperCase() === 'TRUE' ? '1' : (arg1 === 'FALSE' ? '0' : arg1);
            arg2 = arg2.toUpperCase() === 'TRUE' ? '1' : (arg2 === 'FALSE' ? '0' : arg2);
            var isInvalidNumStr = isNaN(Number(arg1)) || arg1.trim() === '';
            var isInvalidDigStr = isNaN(Number(arg2)) || arg2.trim() === '';
            if (((args[0].indexOf('"') > -1 || this.parent.isCellReference(args[0])) && isInvalidNumStr)
                || ((args[1].indexOf('"') > -1 || this.parent.isCellReference(args[1])) && isInvalidDigStr)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            var digits = Math.ceil(this.parent.parseFloat(arg2));
            num = this.parent.parseFloat(arg1);
            if (digits > 0) {
                var decimalArr = arg1.split('.');
                var decimalCount = decimalArr.length === 2 ? (decimalArr[1].length >= digits ? digits : decimalArr[1].length) : 0;
                num = this.parent.parseFloat(this.preciseRound(num, decimalCount, 'ROUNDUP'));
                str = num.toString();
                if (isNaN(num)) {
                    if (digits.toString().indexOf('"') > -1) {
                        str = this.parent.getErrorStrings()[CommonErrors.Value];
                    }
                    else {
                        str = this.parent.getErrorStrings()[CommonErrors.Name];
                    }
                }
            }
            else {
                if (num > 0) {
                    num = (num / Math.pow(10, -digits)) + .49999;
                }
                else if (num < 0) {
                    num = (num / Math.pow(10, -digits)) - .49999;
                }
                if (num > 0 && digits < -9) {
                    num = 1 * Math.pow(10, -digits);
                }
                else {
                    num = this.parent.parseFloat(num.toFixed(0)) * Math.pow(10, -digits);
                }
                str = num.toString();
                if (isNaN(num)) {
                    str = (digits.toString().indexOf('"') > -1) ? this.parent.getErrorStrings()[CommonErrors.Value] :
                        str = this.parent.getErrorStrings()[CommonErrors.Name];
                }
            }
        }
        else {
            str = index > -1 ? this.parent.getErrorStrings()[CommonErrors.Value] :
                this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        return str;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string | number} - Compute the Rounddown.
     */
    BasicFormulas.prototype.ComputeROUNDDOWN = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result;
        var arg1;
        var arg2;
        var index;
        var num;
        var len = args.length;
        if (!isNullOrUndefined(args) && len > 2) {
            result = this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        if (len === 1 && args[0] !== '') {
            index = args[0].indexOf('"');
            arg1 = args[0].indexOf('"') > -1 ? args[0].replace('"', '') : args[0];
            arg1 = arg1.indexOf('"') > -1 ? arg1.replace('"', '') : arg1;
            arg1 = arg1.toUpperCase() === 'TRUE' ? '1' : (arg1 === 'FALSE' ? '0' : arg1);
            arg1 = this.parent.getValueFromArg(arg1);
            num = this.parent.parseFloat(arg1);
            if (num > 0) {
                num -= .4999999999; // To round the number, we are using this value.
            }
            else if (num < 0) {
                num += .4999999999;
            }
            num = this.parent.parseFloat(num.toFixed(0));
            result = num.toString();
        }
        else if (len === 2) {
            index = args[0].indexOf('"') > -1 ? args[0].indexOf('"') : (args[1].indexOf('"') > -1 ? args[1].indexOf('"') : -1);
            if (this.parent.isCellReference(args[0])) {
                arg1 = this.parent.getValueFromArg(args[0]) || '0';
            }
            else {
                if (args[0].indexOf(this.parent.tic) > -1 && (args[0].split(this.parent.tic).join('') === this.parent.trueValue ||
                    args[0].split(this.parent.tic).join('') === this.parent.falseValue)) {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
                arg1 = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
            }
            if (this.parent.getErrorStrings().indexOf(arg1) > -1) {
                return arg1;
            }
            if (this.parent.isCellReference(args[1])) {
                arg2 = this.parent.getValueFromArg(args[1]) || '0';
            }
            else {
                if (args[1].indexOf(this.parent.tic) > -1 && (args[1].split(this.parent.tic).join('') === this.parent.trueValue ||
                    args[1].split(this.parent.tic).join('') === this.parent.falseValue)) {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
                arg2 = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('');
            }
            if (this.parent.getErrorStrings().indexOf(arg2) > -1) {
                return arg2;
            }
            arg1 = arg1.toUpperCase() === 'TRUE' ? '1' : (arg1 === 'FALSE' ? '0' : arg1);
            arg2 = arg2.toUpperCase() === 'TRUE' ? '1' : (arg2 === 'FALSE' ? '0' : arg2);
            var isInvalidNumStr = isNaN(Number(arg1)) || arg1.trim() === '';
            var isInvalidDigStr = isNaN(Number(arg2)) || arg2.trim() === '';
            if (((args[0].indexOf('"') > -1 || this.parent.isCellReference(args[0])) && isInvalidNumStr)
                || ((args[1].indexOf('"') > -1 || this.parent.isCellReference(args[1])) && isInvalidDigStr)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            var digits = Math.ceil(this.parent.parseFloat(arg2));
            num = this.parent.parseFloat(arg1);
            if (digits > 0) {
                var decimalIndex = arg1.indexOf('.');
                var decimalCount = 0;
                if (decimalIndex !== -1) {
                    decimalCount = arg1.length - decimalIndex - 1;
                    decimalCount = decimalCount >= digits ? digits : decimalCount;
                }
                num = this.parent.parseFloat(this.preciseRound(num, decimalCount, 'ROUNDDOWN'));
                result = num.toString();
                if (isNaN(num)) {
                    if (digits.toString().indexOf('"') > -1) {
                        result = this.parent.getErrorStrings()[CommonErrors.Value];
                    }
                    else {
                        result = this.parent.getErrorStrings()[CommonErrors.Name];
                    }
                }
            }
            else {
                if (num > 0) {
                    num = (num / Math.pow(10, -digits)) - .49999;
                }
                else if (num < 0) {
                    num = (num / Math.pow(10, -digits)) + .49999;
                }
                if (num > 0 && digits < -9) {
                    num = 1 * Math.pow(10, -digits);
                }
                else {
                    num = this.parent.parseFloat(num.toFixed(0)) * Math.pow(10, -digits);
                }
                result = num.toString();
                if (isNaN(num)) {
                    result = (digits.toString().indexOf('"') > -1) ? this.parent.getErrorStrings()[CommonErrors.Value] :
                        result = this.parent.getErrorStrings()[CommonErrors.Name];
                }
            }
        }
        else {
            result = index > -1 ? this.parent.getErrorStrings()[CommonErrors.Value] :
                this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        return result;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {number | string} - Compute the count.
     */
    BasicFormulas.prototype.ComputeCOUNT = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var isSubtotalFormula = false;
        if (args.length && args[args.length - 1] === 'isSubtotal') {
            isSubtotalFormula = true;
            args.pop();
        }
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var argArr = args;
        var argVal;
        var cellColl;
        var result = 0;
        var cellValue;
        var value;
        for (var i = 0; i < argArr.length; i++) {
            argVal = argArr[i];
            if (this.parent.isCellReference(argVal)) {
                if (argVal.indexOf(':') > -1) {
                    cellColl = this.parent.getCellCollection(argVal.split(this.parent.tic).join(''));
                    for (var j = 0; j < cellColl.length; j++) {
                        cellValue = !isSubtotalFormula ? this.parent.getValueFromArg(cellColl[j]) :
                            this.parent.getValueFromArg(cellColl[j], null, null, true);
                        if (isSubtotalFormula && cellValue.includes('SUBTOTAL(')) {
                            continue;
                        }
                        if (!isNaN(this.parent.parseFloat(cellValue))) {
                            if (argVal.length > 0 && cellValue.trim() !== '') {
                                result++;
                            }
                        }
                    }
                }
                else {
                    cellValue = !isSubtotalFormula ? this.parent.getValueFromArg(argVal) :
                        this.parent.getValueFromArg(argVal, null, null, true);
                    if (isSubtotalFormula && cellValue.includes('SUBTOTAL(')) {
                        continue;
                    }
                    if (!isNaN(this.parent.parseFloat(cellValue))) {
                        if (argVal.length > 0 && cellValue.trim() !== '') {
                            result++;
                        }
                    }
                }
            }
            else {
                value = this.parent.getValueFromArg(argVal).split(this.parent.tic).join('');
                if (argVal.length === 0 && value.trim() === '') {
                    result++;
                }
                else if (!isNaN(this.parent.parseFloat(value)) || argVal === this.parent.trueValue || argVal === this.parent.falseValue) {
                    if (argVal.length > 0 && argVal.trim() !== '' && value.trim() !== '') {
                        result++;
                    }
                }
            }
        }
        return result;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {Date | string} - Compute the Date.
     */
    BasicFormulas.prototype.ComputeDATE = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var nestedFormula;
        if (args.length && args[args.length - 1] === 'nestedFormulaTrue') {
            nestedFormula = true;
            args.pop();
        }
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        if (args.length !== 3) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var argArr = [];
        for (var i = 0; i < args.length; ++i) {
            argArr[i] = this.parent.getValueFromArg(args[i]);
        }
        argArr[0] = (argArr[0] === this.parent.trueValue) ? '1' : (argArr[0] === this.parent.falseValue) ? '0' : argArr[0];
        argArr[1] = (argArr[1] === this.parent.trueValue) ? '1' : (argArr[1] === this.parent.falseValue) ? '0' : argArr[1];
        argArr[2] = (argArr[2] === this.parent.trueValue) ? '1' : (argArr[2] === this.parent.falseValue) ? '0' : argArr[2];
        for (var idx = 0; idx < argArr.length; idx++) {
            var argsValue = argArr[idx];
            if (this.parent.getErrorStrings().indexOf(argsValue) > -1) {
                return argsValue;
            }
            else if ((argsValue === '""') || (argsValue === '"0"' && args[idx] !== '"0"') || (argsValue === '"TRUE"' || argsValue === '"FALSE"')) {
                return this.parent.getErrorStrings()[CommonErrors.Value].toString();
            }
        }
        var year = Math.floor(this.parent.parseFloat(argArr[0].split(this.parent.tic).join('')));
        var month = Math.floor(this.parent.parseFloat(argArr[1].split(this.parent.tic).join('')));
        var day = Math.floor(this.parent.parseFloat(argArr[2].split(this.parent.tic).join('')));
        var days = 0;
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            if ((year < 0 && month <= 12) || (year >= 10000 && month > 0)) {
                return this.parent.getErrorStrings()[CommonErrors.Num].toString();
            }
            while (month > 12) {
                month -= 12;
                year++;
            }
            days = this.parent.getSerialDateFromDate(year, month, day);
        }
        else {
            return this.parent.getErrorStrings()[CommonErrors.Value].toString();
        }
        if (days === 0) {
            return this.parent.getErrorStrings()[CommonErrors.Num].toString();
        }
        var date = this.parent.fromOADate(days);
        if (date.toString() !== 'Invalid Date') {
            if ((date.getFullYear() < 1900) || (10000 <= date.getFullYear())) {
                return this.parent.getErrorStrings()[CommonErrors.Num].toString();
            }
            if (!nestedFormula) {
                return new Internationalization(this.parent.parentObject.locale || 'en-US').formatDate(date, { type: 'date', skeleton: 'yMd' });
            }
        }
        return days.toString();
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {number | string} - Compute the ceiling.
     */
    BasicFormulas.prototype.ComputeFLOOR = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        var argArr = args;
        var argCount = argArr.length;
        var value;
        if (argCount !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        if ((argArr[0] === '' && argArr[1] === '') || (argArr[0] === '' && !argArr[1].includes('"'))) {
            return 0;
        }
        else if (argArr[1] === '' && !argArr[0].includes('"')) {
            argArr[1] = '0';
        }
        for (var i = 0; i < argArr.length; i++) {
            var argVal = argArr[i].split(this.parent.tic).join('').trim();
            if (argVal === '' || (argArr[i].indexOf(this.parent.tic) > -1 && isNaN(this.parent.parseFloat(argVal)))) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            if (isCellReference(argArr[i])) {
                value = this.parent.getValueFromArg(argArr[i]) || '0';
                value = (value === this.parent.trueValue) ? '1' : (value === this.parent.falseValue) ? '0' : value;
                if (value.toUpperCase().match(/[A-Z]/) || value.includes('"') || !this.parent.isNumber(value)) {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
            }
            else {
                value = this.parent.getValueFromArg(argArr[i].split(this.parent.tic).join(''));
                value = value === this.parent.trueValue ? '1' : (value === this.parent.falseValue ? '0' : value);
                if (value.toUpperCase().match(/[A-Z]/) || value.includes('"') || !this.parent.isNumber(value)) {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
            }
            argArr[i] = value;
        }
        var fnum = this.parent.parseFloat(argArr[0]);
        var significance = this.parent.parseFloat(argArr[1]);
        if (fnum > 0 && significance < 0) {
            return this.parent.getErrorStrings()[CommonErrors.Num];
        }
        if ((fnum > 0 || fnum < 0) && significance === 0) {
            return this.parent.getErrorStrings()[CommonErrors.DivZero];
        }
        if (isNaN(fnum)) {
            return this.parent.getErrorStrings()[CommonErrors.Name];
        }
        if (fnum === 0 && significance === 0) {
            return 0;
        }
        return Math.floor(fnum / significance) * significance;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {number | string} - Compute the ceiling.
     */
    BasicFormulas.prototype.ComputeCEILING = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        var argArr = args;
        var argCount = argArr.length;
        var value;
        if (argCount !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        if ((argArr[0] === '' && argArr[1] === '') || (argArr[0] === '' && !argArr[1].includes('"'))) {
            return 0;
        }
        else if (argArr[1] === '' && !argArr[0].includes('"')) {
            argArr[1] = '0';
        }
        for (var i = 0; i < argArr.length; i++) {
            var argVal = argArr[i].split(this.parent.tic).join('').trim();
            if (argVal === '' || (argArr[i].indexOf(this.parent.tic) > -1 && isNaN(this.parent.parseFloat(argVal)))) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            if (isCellReference(argArr[i])) {
                value = this.parent.getValueFromArg(argArr[i]) || '0';
                value = (value === this.parent.trueValue) ? '1' : (value === this.parent.falseValue) ? '0' : value;
                if (value.toUpperCase().match(/[A-Z]/) || value.includes('"') || !this.parent.isNumber(value)) {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
            }
            else {
                value = this.parent.getValueFromArg(argArr[i].split(this.parent.tic).join(''));
                value = (value === this.parent.trueValue) ? '1' : (value === this.parent.falseValue) ? '0' : value;
                if (value.toUpperCase().match(/[A-Z]/) || value.includes('"') || !this.parent.isNumber(value)) {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
            }
            argArr[i] = value;
        }
        var cnum = this.parent.parseFloat(argArr[0]);
        var significance = this.parent.parseFloat(argArr[1]);
        if (cnum > 0 && significance < 0) {
            return this.parent.getErrorStrings()[CommonErrors.Num];
        }
        if (isNaN(cnum)) {
            return this.parent.getErrorStrings()[CommonErrors.Name];
        }
        if ((cnum > 0 || cnum === 0) && significance === 0) {
            return 0;
        }
        return Math.ceil(cnum / significance) * significance;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the serialNumber.
     * @returns {number | string} - Compute the DAY.
     */
    BasicFormulas.prototype.ComputeDAY = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result;
        var dateVal;
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        if (args[0].startsWith(this.parent.tic)) {
            dateVal = args[0].split(this.parent.tic).join('');
            if (dateVal === '' || dateVal === this.parent.trueValue || dateVal === this.parent.falseValue) {
                return errCollection[CommonErrors.Value];
            }
        }
        else {
            dateVal = this.parent.getValueFromArg(args[0].split(this.parent.tic).join(''));
            if (this.parent.isCellReference(args[0]) && (dateVal.indexOf(this.parent.tic) > -1)) {
                return errCollection[CommonErrors.Value];
            }
        }
        if (errCollection.indexOf(dateVal) > -1) {
            return dateVal;
        }
        else if (Number(dateVal) < 0) {
            return errCollection[CommonErrors.Num];
        }
        else if (Math.floor(Number(dateVal)) === 0 || dateVal === this.parent.falseValue) {
            return 0;
        }
        else if (dateVal === this.parent.trueValue) {
            return 1;
        }
        result = this.parent.isNaN(Number(dateVal)) ? this.parent.parseDate(dateVal) : this.parent.intToDate(dateVal);
        if (Object.prototype.toString.call(result) === '[object Date]') { /* eslint-disable-next-line */
            result = ((new Date(result).getFullYear() < 1900) || (new Date(result).getFullYear()) > 9999) ? this.parent.isNumber(dateVal) ? 'Num' : 'NaN' : result.getDate();
        }
        if (result.toString() === 'NaN') {
            return errCollection[CommonErrors.Value];
        }
        else if (result.toString() === 'Num') {
            return errCollection[CommonErrors.Num];
        }
        return result;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string | number} - Compute the IF value.
     */
    BasicFormulas.prototype.ComputeIF = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var nestedFormula;
        if (args.length && args[args.length - 1] === 'nestedFormulaTrue') {
            nestedFormula = true;
            args.pop();
        }
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        if (this.parent.getErrorStrings().indexOf(args[0]) > 0) {
            return args[0];
        }
        var argArr = args;
        var skipTick;
        if (argArr.length === 4 && argArr[3] === 'nestedFormulaTrue') {
            skipTick = true;
            argArr.pop();
        }
        var condition;
        var result;
        if (argArr.length > 3 || argArr.length === 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        else if (argArr.length <= 3) {
            var cellValues = void 0;
            var cellVal = void 0;
            var val = '';
            condition = this.parent.getValueFromArg(argArr[0]);
            if (this.parent.getErrorStrings().indexOf(condition) > -1) {
                return condition;
            }
            var condUpper = condition.toUpperCase();
            var parsedVal = this.parent.parseFloat(condition);
            if (condUpper === this.parent.trueValue || (parsedVal < 0 || parsedVal > 0)) {
                if (nestedFormula && argArr[1].includes(':')) {
                    cellValues = this.parent.getCellCollection(argArr[1]);
                    for (var i = 0; i < cellValues.length; i++) {
                        cellVal = this.parent.getValueFromArg(cellValues[i]);
                        if (!isNaN(this.parent.parseFloat(cellVal))) {
                            val += cellVal + ',';
                        }
                    }
                    return val.slice(0, val.length - 1);
                }
                result = argArr[1] === '' ? '0' : this.parent.getValueFromArg(argArr[1]);
            }
            else if (condUpper === this.parent.falseValue || parsedVal === 0) {
                if (isNullOrUndefined(argArr[2])) {
                    return this.parent.falseValue;
                }
                if (nestedFormula && argArr[2].includes(':')) {
                    cellValues = this.parent.getCellCollection(argArr[2]);
                    for (var i = 0; i < cellValues.length; i++) {
                        cellVal = this.parent.getValueFromArg(cellValues[i]);
                        if (!isNaN(this.parent.parseFloat(cellVal))) {
                            val += cellVal + ',';
                        }
                    }
                    return val.slice(0, val.length - 1);
                }
                result = argArr[2] === '' ? '0' : this.parent.getValueFromArg(argArr[2]);
            }
            else {
                return this.parent.formulaErrorStrings[FormulasErrorsStrings.Requires3Args];
            }
        }
        if (!skipTick && result.indexOf(this.parent.tic) > -1) {
            return result.split(this.parent.tic).join('');
        }
        else {
            return result === '' ? '0' : result;
        }
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {number | string} - Compute the IFERROR value.
     */
    BasicFormulas.prototype.ComputeIFERROR = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        var argArr = args;
        var condition;
        if (argArr.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        if (this.parent.isCellReference(argArr[0])) {
            condition = this.parent.getValueFromArg(argArr[0]) || '0';
            if (this.parent.getErrorStrings().indexOf(condition) === -1 && condition !== 'NaN') {
                return condition;
            }
        }
        else {
            condition = this.parent.getValueFromArg(argArr[0], null, true) || '0';
            if (this.parent.getErrorStrings().indexOf(condition) === -1 && condition !== 'NaN') {
                condition = condition.split(this.parent.tic).join('').trim();
                return condition;
            }
        }
        if (this.parent.isCellReference(argArr[1])) {
            condition = this.parent.getValueFromArg(argArr[1]) || '0';
        }
        else {
            condition = this.parent.getValueFromArg(argArr[1]) || '0';
            condition = condition.split(this.parent.tic).join('').trim();
        }
        return condition;
    };
    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the PRODUCT value.
     */
    BasicFormulas.prototype.ComputePRODUCT = function () {
        var range = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            range[_i] = arguments[_i];
        }
        var isSubtotalFormula = false;
        if (range.length && range[range.length - 1] === 'isSubtotal') {
            isSubtotalFormula = true;
            range.pop();
        }
        if (isNullOrUndefined(range) || (range.length === 1 && range[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        var product = 1;
        var val;
        var orgValue;
        var argsHit = true;
        var parseVal;
        if (!isNullOrUndefined(range)) {
            var argArr = range;
            for (var i = 0; i < argArr.length; i++) {
                var rangevalue = argArr[i];
                if (rangevalue.indexOf(':') > -1 && this.parent.isCellReference(rangevalue)) {
                    var cellCollection = this.parent.getCellCollection(rangevalue);
                    for (var j = 0; j < cellCollection.length; j++) {
                        val = !isSubtotalFormula ? this.parent.getValueFromArg(cellCollection[j]) :
                            this.parent.getValueFromArg(cellCollection[j], null, null, true);
                        if (isSubtotalFormula && val.includes('SUBTOTAL(')) {
                            continue;
                        }
                        if (!isNumber(val)) {
                            continue;
                        }
                        if (this.parent.getErrorStrings().indexOf(val) > -1) {
                            return val;
                        }
                        parseVal = this.parent.parseFloat(val);
                        if (!isNaN(parseVal)) {
                            if (val.length > 0) {
                                product = product * parseVal;
                                argsHit = false;
                            }
                        }
                    }
                }
                else if (rangevalue.indexOf(':') === -1 && this.parent.isCellReference(rangevalue)) {
                    orgValue = !isSubtotalFormula ? this.parent.getValueFromArg(argArr[i]) :
                        this.parent.getValueFromArg(argArr[i], null, null, true);
                    if (isSubtotalFormula && orgValue.includes('SUBTOTAL(')) {
                        continue;
                    }
                    if (!isNumber(orgValue)) {
                        continue;
                    }
                    if (this.parent.getErrorStrings().indexOf(orgValue) > -1) {
                        return orgValue;
                    }
                }
                else {
                    orgValue = argArr[i];
                    var isEmptyStr = orgValue.indexOf(this.parent.tic) > -1 && orgValue.split(this.parent.tic).join('').trim() === '';
                    if (isEmptyStr || (argArr[i].indexOf(this.parent.tic) > -1 && isNaN(this.parent.parseFloat(orgValue.split(this.parent.tic).join(''))))) {
                        return this.parent.getErrorStrings()[CommonErrors.Value];
                    }
                    orgValue = this.parent.getValueFromArg(argArr[i].split(this.parent.tic).join(''));
                    orgValue = (orgValue === this.parent.trueValue) ? '1' : (orgValue === this.parent.falseValue) ? '0' : orgValue.split(this.parent.tic).join('');
                    if (this.parent.getErrorStrings().indexOf(orgValue) > -1) {
                        return orgValue;
                    }
                }
                parseVal = this.parent.parseFloat(orgValue);
                if (!isNaN(parseVal)) {
                    if (orgValue.length > 0) {
                        product = product * parseVal;
                        argsHit = false;
                    }
                }
            }
        }
        return argsHit ? '0' : product.toString();
    };
    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {string | number} - Compute the Choose value.
     */
    BasicFormulas.prototype.ComputeDAYS = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(args) && (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var processArgs = function (actuaValue) {
            var value = _this.parent.getValueFromArg(actuaValue).trim();
            if (value.indexOf(_this.parent.tic) > -1) {
                value = value.split(_this.parent.tic).join('').trim();
                if (value === '' || _this.parent.isCellReference(actuaValue) || value.toUpperCase() === _this.parent.trueValue ||
                    value.toUpperCase() === _this.parent.falseValue) {
                    return errCollection[CommonErrors.Value];
                }
            }
            value = value.split(_this.parent.tic).join('');
            if (value.toUpperCase() === _this.parent.trueValue) {
                value = '1';
            }
            else if (value === '' || value.toUpperCase() === _this.parent.falseValue) {
                value = '0';
            }
            else if (Number(value) < 0) {
                return errCollection[CommonErrors.Num];
            }
            var dateCheck = { value: value.toString() };
            _this.parent.parentObject.notify(checkDateFormat, dateCheck);
            if (dateCheck.isDate || dateCheck.isTime) {
                value = (_this.parent.parseDate(value).getTime() / (1000 * 3600 * 24)).toString();
            }
            return value;
        };
        var endDate = processArgs(args[0]);
        if (errCollection.indexOf(endDate) > -1) {
            return endDate;
        }
        var startDate = processArgs(args[1]);
        if (errCollection.indexOf(startDate) > -1) {
            return startDate;
        }
        var result = Math.floor(Number(endDate)) - Math.floor(Number(startDate));
        if (isNaN(result)) {
            return errCollection[CommonErrors.Value];
        }
        return result;
    };
    /**
     * @hidden
     * @param {string[]} argArr - specify the range.
     * @returns {number | string | number[] | string[]} - Compute the unique.
     */
    BasicFormulas.prototype.ComputeUNIQUE = function () {
        var _this = this;
        var argArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argArr[_i] = arguments[_i];
        }
        var result;
        var isComputeExp;
        var errCollection = this.parent.getErrorStrings();
        if (argArr[argArr.length - 1] === 'isComputeExp') {
            isComputeExp = true;
            argArr.pop();
        }
        if (isNullOrUndefined(argArr) || (argArr[0] === '' && argArr.length === 1)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (argArr.length > 3) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var processArgs = function (actualValue) {
            if (isNullOrUndefined(actualValue)) {
                return _this.parent.falseValue;
            }
            var value = _this.parent.getValueFromArg(actualValue);
            if (errCollection.indexOf(value) > -1) {
                return value;
            }
            if (Number(value) === 0) {
                return _this.parent.falseValue;
            }
            else if (Number(value) < 0 || Number(value) > 0) {
                return _this.parent.trueValue;
            }
            if (!_this.parent.isCellReference(actualValue)) {
                value = _this.parent.removeTics(value);
            }
            if (value.toUpperCase() === _this.parent.trueValue || value.toUpperCase() === _this.parent.falseValue) {
                return value.toUpperCase();
            }
            else if (value.indexOf(_this.parent.tic) > -1 || actualValue.indexOf(_this.parent.tic) > -1) {
                return errCollection[CommonErrors.Value];
            }
            else {
                return errCollection[CommonErrors.Name];
            }
        };
        var byColumn = processArgs(argArr[1]);
        if (errCollection.indexOf(byColumn) > -1) {
            return byColumn;
        }
        var exactlyOne = processArgs(argArr[2]);
        if (errCollection.indexOf(exactlyOne) > -1) {
            return exactlyOne;
        }
        var valueCollection = [];
        if (argArr[0].indexOf(':') > -1) {
            if (isNullOrUndefined(argArr[0].match(/[0-9]/))) {
                var splitArray = argArr[0].split(':');
                argArr[0] = splitArray[0] + '1' + ':' + splitArray[1] + (this.parent.spreadSheetUsedRange[0] + 1);
            }
            else if (isNullOrUndefined(argArr[0].toUpperCase().match(/[A-Z]/))) {
                var splitArray = argArr[0].split(':');
                argArr[0] = 'A' + splitArray[0] + ':' + getAlphalabel(this.parent.spreadSheetUsedRange[1] + 1) + splitArray[1];
            }
            var rangeSplit = argArr[0].split(':');
            if (this.parent.isCellReference(rangeSplit[0]) && this.parent.isCellReference(rangeSplit[1])) {
                var collection = this.parent.dependencyCollection;
                for (var i = 0; i < collection.length && !isComputeExp; i++) {
                    if (collection[i].split(':')[0] === argArr[0].split(':')[0]) {
                        this.clearDependency(collection[i]);
                    }
                }
                if (this.parent.dependencyCollection.indexOf(argArr[0]) === -1) {
                    if (!isComputeExp) {
                        this.parent.dependencyCollection.push(argArr[0]);
                    }
                }
                else {
                    this.clearDependency(argArr[0]);
                }
                var j = argArr[0].indexOf(':');
                var swap = void 0;
                var rowIdx = this.parent.rowIndex(this.parent.substring(argArr[0], 0, j));
                var colIdx = this.parent.colIndex(this.parent.substring(argArr[0], 0, j));
                var endRowIdx = this.parent.rowIndex(this.parent.substring(argArr[0], j + 1, j + argArr[0].length - j - 1));
                var endColIdx = this.parent.colIndex(this.parent.substring(argArr[0], j + 1, j + argArr[0].length - j - 1));
                if (rowIdx > endRowIdx) {
                    swap = endRowIdx;
                    endRowIdx = rowIdx;
                    rowIdx = swap;
                }
                if (colIdx > endColIdx) {
                    swap = endColIdx;
                    endColIdx = colIdx;
                    colIdx = swap;
                }
                var sheetIndex = '';
                if (argArr[0].indexOf('!') === 0) {
                    sheetIndex = argArr[0].substring(0, argArr[0].replace('!', '').indexOf('!') + 2);
                }
                argArr[0] = sheetIndex + getAlphalabel(colIdx) + rowIdx + ':' + getAlphalabel(endColIdx) + endRowIdx;
                var colDiff = endColIdx - colIdx;
                var cellValues = this.parent.getCellCollection(argArr[0]);
                var actCell = void 0;
                var uniqueActCell = void 0;
                actCell = uniqueActCell = this.parent.actCell;
                if (byColumn === this.parent.falseValue) {
                    if (colDiff === 0) {
                        for (var i = 0; i < cellValues.length; i++) {
                            var val = this.parent.getValueFromArg(cellValues[i]);
                            val = val === '' ? '0' : val;
                            valueCollection.push(val);
                        }
                    }
                    else {
                        var temp = '';
                        var diff = colDiff;
                        for (var i = 0; i < cellValues.length; i++) {
                            if (i === cellValues.length - 1) {
                                var val = this.parent.getValueFromArg(cellValues[i]);
                                val = val === '' ? '0' : val;
                                temp = temp + val + '++';
                                valueCollection.push(temp.substring(0, temp.length - 2));
                            }
                            if (i <= diff) {
                                var val = this.parent.getValueFromArg(cellValues[i]);
                                val = val === '' ? '0' : val;
                                temp = temp + val + '++';
                            }
                            else {
                                valueCollection.push(temp.substring(0, temp.length - 2));
                                diff = colDiff + i;
                                var val = this.parent.getValueFromArg(cellValues[i]);
                                val = val === '' ? '0' : val;
                                temp = val + '++';
                            }
                        }
                    }
                }
                else {
                    var temp = '';
                    var diff = colDiff + 1;
                    var rowDiff = endRowIdx - rowIdx;
                    for (var i = 0; i < diff; i++) {
                        for (var j_1 = 0; j_1 <= rowDiff; j_1++) {
                            var val = this.parent.getValueFromArg(cellValues[j_1 * diff + i]);
                            val = val === '' ? '0' : val;
                            temp = temp + val + '++';
                        }
                        valueCollection.push(temp.substring(0, temp.length - 2));
                        temp = '';
                    }
                }
                var uniqueCollection = [];
                var duplicateCollection = [];
                var tmp = [];
                var tmp2 = [];
                for (var i = 0; i < valueCollection.length; i++) {
                    if (uniqueCollection.indexOf(valueCollection[i].toLowerCase()) === -1) {
                        uniqueCollection.push(valueCollection[i].toLowerCase());
                        tmp.push(valueCollection[i]);
                    }
                    else {
                        if (duplicateCollection.indexOf(valueCollection[i].toLowerCase()) === -1) {
                            duplicateCollection.push(valueCollection[i].toLowerCase());
                        }
                        tmp2.push(valueCollection[i]);
                    }
                }
                if (exactlyOne === this.parent.trueValue) {
                    var exactOne = [];
                    for (var i = 0; i < tmp.length; i++) {
                        if (duplicateCollection.indexOf(tmp[i].toLowerCase()) === -1) {
                            exactOne.push(tmp[i]);
                        }
                    }
                    tmp = exactOne;
                    if (tmp.length === 0) {
                        return errCollection[CommonErrors.Calc];
                    }
                }
                if (isComputeExp) {
                    var computeExpResult_1;
                    if (colDiff !== 0) {
                        computeExpResult_1 = [];
                        (tmp).forEach(function (item) {
                            computeExpResult_1 = computeExpResult_1.concat(item.split('++'));
                        });
                    }
                    else {
                        computeExpResult_1 = byColumn === this.parent.falseValue ? tmp : tmp[0].split('++');
                    }
                    return computeExpResult_1;
                }
                if (actCell.indexOf('!') > -1) {
                    actCell = actCell.substring(actCell.lastIndexOf('!') + 1);
                }
                var actRowIdx = this.parent.rowIndex(actCell);
                var actColIdx = this.parent.colIndex(actCell);
                if (this.parent.dependencyLevel === 0) {
                    var isSpill = false;
                    if (byColumn === this.parent.falseValue) {
                        for (var i = actRowIdx, diff = tmp.length + actRowIdx; i < diff; i++) {
                            var splitValue = tmp[0].split('++');
                            for (var j_2 = actColIdx, diff2 = splitValue.length + actColIdx; j_2 < diff2; j_2++) {
                                if (i === diff - 1 && j_2 === diff2 - 1 &&
                                    this.parent.uniqueRange.indexOf(uniqueActCell + ':' + getAlphalabel(j_2) + i) === -1) {
                                    this.parent.uniqueRange.push(uniqueActCell + ':' + getAlphalabel(j_2) + i);
                                }
                                if (this.checkSpill(j_2, i)) {
                                    isSpill = true;
                                }
                            }
                        }
                    }
                    else {
                        for (var i = actColIdx, diff = tmp.length + actColIdx; i < diff; i++) {
                            var splitValue = tmp[0].split('++');
                            for (var j_3 = actRowIdx, diff2 = splitValue.length + actRowIdx; j_3 < diff2; j_3++) {
                                if (i === diff - 1 && j_3 === diff2 - 1 &&
                                    this.parent.uniqueRange.indexOf(this.parent.actCell + ':' + getAlphalabel(i) + j_3) === -1) {
                                    this.parent.uniqueRange.push(this.parent.actCell + ':' + getAlphalabel(i) + j_3);
                                }
                                if (this.checkSpill(i, j_3)) {
                                    isSpill = true;
                                }
                            }
                        }
                    }
                    if (isSpill) {
                        return this.parent.formulaErrorStrings[FormulasErrorsStrings.Spill];
                    }
                }
                else if (this.parent.dependencyLevel > 0 &&
                    this.parent.getValueFromArg(getAlphalabel(actColIdx) + actRowIdx, true).indexOf('#SPILL!') > -1) {
                    return this.parent.formulaErrorStrings[FormulasErrorsStrings.Spill];
                }
                if (byColumn === this.parent.falseValue) {
                    var calcFamily = this.parent.getSheetFamilyItem(this.parent.grid);
                    var token = '';
                    var cellTxt = void 0;
                    if (calcFamily.sheetNameToParentObject !== null && calcFamily.sheetNameToParentObject.size > 0) {
                        token = calcFamily.parentObjectToToken.get(this.parent.grid);
                        cellTxt = token + actCell;
                    }
                    for (var i = 0; i < tmp.length; i++) {
                        var splitValue = tmp[i].split('++');
                        if (i > 0) {
                            actRowIdx++;
                            actColIdx = this.parent.colIndex(actCell);
                        }
                        for (var j_4 = 0; j_4 < splitValue.length; j_4++) {
                            this.setValueRefresh(splitValue[j_4], actRowIdx, actColIdx);
                            if (i > 0 || j_4 > 0) {
                                this.parent.refresh(token + getAlphalabel(actColIdx) + actRowIdx.toString(), cellTxt);
                            }
                            if (splitValue[j_4 + 1]) {
                                actColIdx++;
                            }
                        }
                    }
                    result = tmp[0].split('++')[0];
                }
                else {
                    for (var i = 0; i < tmp.length; i++) {
                        var splitValue = tmp[i].split('++');
                        for (var i_1 = 0; i_1 < splitValue.length; i_1++) {
                            this.setValueRefresh(splitValue[i_1], actRowIdx, actColIdx);
                            if (splitValue[i_1 + 1]) {
                                actRowIdx++;
                            }
                            else {
                                actColIdx++;
                                actRowIdx = this.parent.rowIndex(actCell);
                            }
                        }
                    }
                    result = tmp[0].split('++')[0];
                }
            }
        }
        else if (this.parent.isCellReference(argArr[0])) {
            if (this.parent.dependencyCollection.indexOf(argArr[0]) === -1) {
                if (!isComputeExp) {
                    this.parent.dependencyCollection.push(argArr[0]);
                }
            }
            else {
                this.clearDependency(argArr[0]);
            }
            result = this.parent.getValueFromArg(argArr[0]);
        }
        else {
            result = this.parent.getValueFromArg(argArr[0].trim());
            if (errCollection.indexOf(result) > -1) {
                return result;
            }
            result = this.parent.removeTics(result);
        }
        return result;
    };
    BasicFormulas.prototype.setValueRefresh = function (splitValue, rowIdx, colIdx) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.parent.parentObject.setValueRowCol(this.parent.getSheetId(this.parent.grid), splitValue, rowIdx, colIdx);
    };
    BasicFormulas.prototype.checkSpill = function (i, j) {
        var spill = false;
        var value = this.parent.getValueFromArg(getAlphalabel(i) + j, true);
        var formulaAddress = '!' + this.parent.getSheetID(this.parent.grid) + '!' + getAlphalabel(i) + j;
        var formulaString;
        if (this.parent.getFormulaInfoTable().get(formulaAddress)) {
            formulaString = this.parent.getFormulaInfoTable().get(formulaAddress).formulaText;
        }
        if (value && (value.toUpperCase().indexOf('UNIQUE') < 0 ||
            (formulaString && !formulaString.toUpperCase().includes('UNIQUE'))) &&
            value !== this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments]) {
            spill = true;
        }
        return spill;
    };
    BasicFormulas.prototype.clearDependency = function (value) {
        var actCell = this.parent.actCell;
        var actCellSheetName = '';
        if (actCell.lastIndexOf('!') > -1) {
            var actCellAddr = actCell;
            actCell = actCellAddr.substring(actCellAddr.lastIndexOf('!') + 1);
            actCellSheetName = actCellAddr.substring(0, actCellAddr.lastIndexOf('!')) + '!';
        }
        var actRowIdx = this.parent.rowIndex(actCell);
        var actColIdx = this.parent.colIndex(actCell);
        var j = value.indexOf(':');
        var rowIndex = this.parent.rowIndex(this.parent.substring(value, 0, j));
        var colIndex = this.parent.colIndex(this.parent.substring(value, 0, j));
        var eRowIdx = this.parent.rowIndex(this.parent.substring(value, j + 1, j + value.length - j - 1));
        var eColIdx = this.parent.colIndex(this.parent.substring(value, j + 1, j + value.length - j - 1));
        var rowDiff = eRowIdx - rowIndex + actRowIdx;
        var colDiff = eColIdx - colIndex + actColIdx;
        var formulaText = this.parent.getFormulaInfoTable().get('!' + this.parent.getSheetID(this.parent.grid) + '!' + actCell) ?
            this.parent.getFormulaInfoTable().get('!' + this.parent.getSheetID(this.parent.grid) + '!' + actCell).getFormulaText() : '';
        for (var i = actRowIdx; i <= rowDiff; i++) {
            for (var j_5 = actColIdx; j_5 <= colDiff; j_5++) {
                if (this.parent.dependencyLevel > 0 || formulaText.indexOf('UNIQUE') > -1) {
                    if (this.parent.getValueFromArg('!' + this.parent.getSheetID(this.parent.grid) + '!' +
                        getAlphalabel(actColIdx) + actRowIdx, true).indexOf('#SPILL!') > -1) {
                        return;
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.parent.parentObject.setValueRowCol(this.parent.getSheetID(this.parent.grid) + 1, '', i, j_5);
                    this.parent.refresh('!' + this.parent.getSheetID(this.parent.grid) + '!' + getAlphalabel(j_5) + i, actCell);
                    this.parent.actCell = actCellSheetName + actCell;
                }
            }
        }
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string} - Compute the text or null value.
     */
    BasicFormulas.prototype.ComputeT = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value;
        var nestedFormula;
        var errCollection = this.parent.getErrorStrings();
        if (args.length && args[args.length - 1] === 'nestedFormulaTrue') {
            nestedFormula = true;
            args.pop();
        }
        if (isNullOrUndefined(args) || (args.length === 1 && args[0].trim() === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        value = this.parent.getValueFromArg(args[0]).trim();
        if (errCollection.indexOf(value) > -1) {
            return value;
        }
        if (args[0].indexOf(this.parent.tic) > -1) {
            value = this.parent.removeTics(args[0].trim());
            if (value.indexOf(this.parent.tic + this.parent.tic) > -1) {
                value = value.replace(/""/g, this.parent.tic);
            }
        }
        else {
            if (value.split('%').length === 2 && this.parent.isNumber(value.split('%')[0])) {
                value = (Number(value.split('%')[0]) / 100).toString();
            }
            if (this.parent.isNumber(value) ||
                value.toUpperCase() === this.parent.trueValue || value.toUpperCase() === this.parent.falseValue) {
                return '';
            }
        }
        if (nestedFormula) {
            value = this.parent.tic + value + this.parent.tic;
        }
        return value;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the hours.
     */
    BasicFormulas.prototype.ComputeHOUR = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length !== 1 || isNullOrUndefined(args) || args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        if (args[0].split(this.parent.tic).join('').trim() === '') {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        var cellVal;
        if (this.parent.isCellReference(args[0])) {
            cellVal = this.parent.getValueFromArg(args[0].split(this.parent.tic).join('')) || '0';
            if (cellVal.indexOf(this.parent.tic) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            if (args[0].indexOf(this.parent.tic) > -1 && (args[0].split(this.parent.tic).join('') === this.parent.trueValue || args[0].split(this.parent.tic).join('') === this.parent.falseValue)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            cellVal = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        }
        if (this.parent.getErrorStrings().indexOf(cellVal) > -1) {
            return cellVal;
        }
        cellVal = cellVal === this.parent.trueValue ? '1' : (cellVal === this.parent.falseValue ? '0' : cellVal);
        var date;
        if (this.parent.isNumber(cellVal)) {
            if (this.parent.parseFloat(cellVal) < 0 || this.parent.parseFloat(cellVal) > 2958465) {
                return this.parent.getErrorStrings()[CommonErrors.Num];
            }
            date = this.parent.intToTime(cellVal);
        }
        else {
            var dateCheck = { value: cellVal.toString() };
            this.parent.parentObject.notify(checkDateFormat, dateCheck);
            if (dateCheck.isDate || dateCheck.isTime) {
                date = dateCheck.dateObj;
            }
            else {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        if (date.toString() === 'Invalid Date') {
            date = new Date(Date.parse(cellVal));
        }
        if (date.toString() === 'Invalid Date') {
            var argVal = new Date(Date.now()).toLocaleDateString() + ' ' + cellVal;
            date = new Date(Date.parse(argVal));
        }
        if (date.toString() === 'Invalid Date') {
            date = this.parent.fromOADate(this.parent.parseFloat(cellVal));
        }
        if (date.toString() === 'Invalid Date') {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        if (date.getFullYear() < 1900 || date.getFullYear() > 9999) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        return date.getHours();
    };
    /**
     * @hidden
     * @param {string} argArr - specify the args.
     * @returns {string | boolean} - Compute the hours.
     */
    BasicFormulas.prototype.ComputeMINUTE = function () {
        var argArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argArr[_i] = arguments[_i];
        }
        if (argArr.length !== 1 || isNullOrUndefined(argArr) || argArr[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        if (argArr[0].split(this.parent.tic).join('').trim() === '') {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        var cellVal;
        if (this.parent.isCellReference(argArr[0])) {
            cellVal = this.parent.getValueFromArg(argArr[0].split(this.parent.tic).join('')) || '0';
            if (cellVal.indexOf(this.parent.tic) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            if (argArr[0].indexOf(this.parent.tic) > -1 && (argArr[0].split(this.parent.tic).join('') === this.parent.trueValue || argArr[0].split(this.parent.tic).join('') === this.parent.falseValue)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            cellVal = this.parent.getValueFromArg(argArr[0]).split(this.parent.tic).join('');
        }
        if (this.parent.getErrorStrings().indexOf(cellVal) > -1) {
            return cellVal;
        }
        cellVal = cellVal === this.parent.trueValue ? '1' : (cellVal === this.parent.falseValue ? '0' : cellVal);
        var dateVal;
        if (this.parent.isNumber(cellVal)) {
            if (this.parent.parseFloat(cellVal) < 0 || this.parent.parseFloat(cellVal) > 2958465) {
                return this.parent.getErrorStrings()[CommonErrors.Num];
            }
            dateVal = this.parent.intToTime(cellVal);
        }
        else {
            var dateCheck = { value: cellVal.toString() };
            this.parent.parentObject.notify(checkDateFormat, dateCheck);
            if (dateCheck.isDate || dateCheck.isTime) {
                dateVal = dateCheck.dateObj;
            }
            else {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        if (dateVal.toString() === 'Invalid Date') {
            dateVal = new Date(Date.parse(cellVal));
        }
        if (dateVal.toString() === 'Invalid Date') {
            var argVal = new Date(Date.now()).toLocaleDateString() + ' ' + cellVal;
            dateVal = new Date(Date.parse(argVal));
        }
        if (dateVal.toString() === 'Invalid Date') {
            dateVal = this.parent.fromOADate(this.parent.parseFloat(cellVal));
        }
        if (dateVal.toString() === 'Invalid Date') {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        if (dateVal.getFullYear() < 1900 || dateVal.getFullYear() > 9999) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        return dateVal.getMinutes();
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the hours.
     */
    BasicFormulas.prototype.ComputeSECOND = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length !== 1 || isNullOrUndefined(args) || args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        if (args[0].split(this.parent.tic).join('').trim() === '') {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        var cellVal;
        if (this.parent.isCellReference(args[0])) {
            cellVal = this.parent.getValueFromArg(args[0].split(this.parent.tic).join('')) || '0';
            if (cellVal.indexOf(this.parent.tic) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            if (args[0].indexOf(this.parent.tic) > -1 && (args[0].split(this.parent.tic).join('') === this.parent.trueValue || args[0].split(this.parent.tic).join('') === this.parent.falseValue)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            cellVal = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        }
        if (this.parent.getErrorStrings().indexOf(cellVal) > -1) {
            return cellVal;
        }
        cellVal = cellVal === this.parent.trueValue ? '1' : (cellVal === this.parent.falseValue ? '0' : cellVal);
        var dateValue;
        if (this.parent.isNumber(cellVal)) {
            if (this.parent.parseFloat(cellVal) < 0 || this.parent.parseFloat(cellVal) > 2958465) {
                return this.parent.getErrorStrings()[CommonErrors.Num];
            }
            dateValue = this.parent.intToTime(cellVal);
        }
        else {
            var dateCheck = { value: cellVal.toString() };
            this.parent.parentObject.notify(checkDateFormat, dateCheck);
            if (dateCheck.isDate || dateCheck.isTime) {
                dateValue = dateCheck.dateObj;
            }
            else {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        if (dateValue.toString() === 'Invalid Date') {
            dateValue = new Date(Date.parse(cellVal));
        }
        if (dateValue.toString() === 'Invalid Date') {
            var argVal = (new Date(Date.now())).toLocaleDateString() + ' ' + cellVal;
            dateValue = new Date(Date.parse(argVal));
        }
        if (dateValue.toString() === 'Invalid Date') {
            dateValue = this.parent.fromOADate(this.parent.parseFloat(cellVal));
        }
        if (dateValue.toString() === 'Invalid Date') {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        if (dateValue.getFullYear() < 1900 || dateValue.getFullYear() > 9999) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        return dateValue.getSeconds();
    };
    /**
     * @hidden
     * @param {string} argsVal - specify the args.
     * @returns {string | boolean} - Compute the months.
     */
    BasicFormulas.prototype.ComputeMONTH = function () {
        var argsVal = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argsVal[_i] = arguments[_i];
        }
        var errCollection = this.parent.getErrorStrings();
        if (argsVal.length === 1 && argsVal[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (argsVal.length !== 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var value = this.parent.getValueFromArg(argsVal[0]).trim();
        if (errCollection.indexOf(value) > -1) {
            return value;
        }
        if (this.parent.isCellReference(argsVal[0])) {
            if (value.indexOf(this.parent.tic) > -1) {
                return errCollection[CommonErrors.Value];
            }
            else if (value === '') {
                return 1;
            }
        }
        else {
            if (value.toUpperCase() === '"TRUE"' || value.toUpperCase() === '"FALSE"') {
                return errCollection[CommonErrors.Value];
            }
            value = value.split(this.parent.tic).join('');
        }
        if (value === '') {
            return errCollection[CommonErrors.Value];
        }
        else if (value === this.parent.trueValue || value === this.parent.falseValue ||
            (Number(value) > -1 && Number(value) < 32)) {
            return 1;
        }
        else if (Number(value) < 0) {
            return errCollection[CommonErrors.Num];
        }
        else if (value.indexOf('%') > -1) {
            value = (Number(value.split('%')[0]) * 0.01).toString();
        }
        if (this.parent.isNumber(value)) {
            value = parseInt((Math.floor(Number(value)).toString()), 10);
        }
        var date = this.parent.parseDate(value);
        if (date.toString() === 'Invalid Date') {
            if (this.parent.isNumber(value)) {
                return errCollection[CommonErrors.Num];
            }
            else {
                return errCollection[CommonErrors.Value];
            }
        }
        else if ((date.getFullYear() < 1900) || (10000 <= date.getFullYear())) {
            return errCollection[CommonErrors.Num];
        }
        return (date.getMonth() + 1).toString();
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string } - Compute the time and date value.
     */
    BasicFormulas.prototype.ComputeNOW = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length !== 1 || args[0] !== '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        var date = new Date(Date.now());
        var intl = new Internationalization();
        var dFormatter = intl.getDateFormat({ format: 'M/d/yyyy h:mm:ss a' });
        var dt = this.parent.parentObject.dateToInt(dFormatter(date), true);
        return dt.toString();
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the exact value or not.
     */
    BasicFormulas.prototype.ComputeEXACT = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = false;
        var nestedFormula = args.length && args[args.length - 1] === 'nestedFormulaTrue';
        var errCollection = this.parent.getErrorStrings();
        if (nestedFormula) {
            args.pop();
        }
        if (!args || (!args[0] && args.length === 1)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var value1;
        var value2;
        var isCellRef;
        if (args[0]) {
            value1 = this.parent.getValueFromArg(args[0]);
            if (errCollection.indexOf(value1) > -1) {
                return value1;
            }
            if (value1.indexOf(this.parent.tic) === -1 && value1.includes('%')) {
                value1 = (Number(value1.split('%')[0]) / 100).toString();
            }
            if (this.parent.isCellReference(args[0])) {
                isCellRef = true;
            }
            else {
                value1 = value1.split(this.parent.tic).join('');
            }
        }
        if (args[1]) {
            value2 = this.parent.getValueFromArg(args[1]);
            if (errCollection.indexOf(value2) > -1) {
                return value2;
            }
            if (value2.indexOf(this.parent.tic) === -1 && value2.includes('%')) {
                value2 = (Number(value2.split('%')[0]) / 100).toString();
            }
            if (this.parent.isCellReference(args[1])) {
                if (!isCellRef && ((value1.trim().length === 0) && (value2.trim().length === 0))) {
                    result = false;
                }
            }
            else {
                value2 = value2.split(this.parent.tic).join('');
                if (isCellRef && ((value1.trim().length === 0) && (value2.trim().length === 0))) {
                    result = false;
                }
            }
        }
        if (value1 === value2) {
            result = true;
            if (nestedFormula) {
                result = this.parent.tic + result + this.parent.tic;
            }
        }
        return result;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the exact value or not.
     */
    BasicFormulas.prototype.ComputeLEN = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value;
        var errorStrings = this.parent.getErrorStrings();
        if (isNullOrUndefined(args) || (args[0].trim() === '' && args.length === 1)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        value = this.parent.getValueFromArg(args[0]).trim();
        if (errorStrings.indexOf(value) > -1) {
            return value;
        }
        if (args[0].indexOf(this.parent.tic) > -1) {
            if (args[0] !== value && args[0].startsWith('n')) {
                value = this.parent.removeTics(value.trim());
            }
            else {
                value = this.parent.removeTics(args[0].trim());
                if (value.indexOf(this.parent.tic + this.parent.tic) > -1) {
                    value = value.replace(/""/g, this.parent.tic);
                }
            }
        }
        else if (!args[0].startsWith('n') && value.split('%').length === 2 && this.parent.isNumber(value.split('%')[0])) {
            value = (Number(value.split('%')[0]) / 100).toString();
        }
        return value.length;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the remainder from the given numbers.
     */
    BasicFormulas.prototype.ComputeMOD = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value;
        if (isNullOrUndefined(args) || args.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        if (args[1] === '' && !args[0].includes('"')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.Div];
        }
        else if (args[0] === '' && !args[1].includes('"')) {
            return 0;
        }
        for (var i = 0; i < args.length; i++) {
            var argVal = args[i].split(this.parent.tic).join('').trim();
            if (argVal === '' || (args[i].indexOf(this.parent.tic) > -1 && isNaN(this.parent.parseFloat(argVal)))) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            if (isCellReference(args[i])) {
                value = this.parent.getValueFromArg(args[i]) || '0';
                value = (value === this.parent.trueValue) ? '1' : (value === this.parent.falseValue) ? '0' : value;
                if (value.toUpperCase().match(/[A-Z]/) || value.includes('"') || !this.parent.isNumber(value)) {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
            }
            else {
                value = this.parent.getValueFromArg(args[i].split(this.parent.tic).join(''));
                value = (value === this.parent.trueValue) ? '1' : (value === this.parent.falseValue) ? '0' : value;
                if (this.parent.getErrorStrings().indexOf(value) > -1) {
                    return value;
                }
            }
            args[i] = value;
        }
        var value1 = args[0];
        var value2 = args[1];
        if (value2 === '0' || value2 === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.Div];
        }
        else if (value1 === '0' || value1 === '') {
            return 0;
        }
        value1 = parseFloat(value1);
        value2 = parseFloat(value2);
        var result = ((value1 % value2) + value2) % value2;
        if (isNaN(result)) {
            return this.parent.getErrorStrings()[CommonErrors.Name];
        }
        return result;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the next odd number.
     */
    BasicFormulas.prototype.ComputeODD = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isNullOrUndefined(args) || args.length !== 1 || args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        var argVal = args[0].split(this.parent.tic).join('').trim();
        if (argVal === '' || (args[0].indexOf(this.parent.tic) > -1 && isNaN(this.parent.parseFloat(argVal)))) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        var val;
        if (isCellReference(args[0])) {
            val = this.parent.getValueFromArg(args[0]);
            if (val === this.parent.trueValue) {
                val = '1';
            }
            else if (val === '' || val === this.parent.falseValue) {
                val = '0';
            }
            else if (val.toUpperCase().match(/[A-Z]/) || val.includes('"') || !this.parent.isNumber(val)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            val = this.parent.getValueFromArg(args[0].split(this.parent.tic).join(''));
            if (val === '#NAME?') {
                return this.parent.getErrorStrings()[CommonErrors.Name];
            }
            if (val === this.parent.trueValue) {
                val = '1';
            }
            else if (val === '' || val === this.parent.falseValue) {
                val = '0';
            }
            else if (val.toUpperCase().match(/[A-Z]/) || !this.parent.isNumber(val)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        var result = Math.ceil(parseInt(val, 10));
        var isOne = result === 0;
        result = result % 2 === 0 ? (result > 0 ? result + 1 : result - 1) : result;
        if (Math.ceil(parseInt(val, 10)) % 2 !== 0) {
            if (parseInt(val, 10) > 0 && parseFloat(val) > parseInt(val, 10)) {
                result = result + 2;
            }
            else if (parseInt(val, 10) < 0 && parseFloat(val) < parseInt(val, 10)) {
                result = result - 2;
            }
        }
        if (isNaN(result)) {
            return this.parent.getErrorStrings()[CommonErrors.Name];
        }
        return isOne ? 1 : result;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the next even number.
     */
    BasicFormulas.prototype.ComputeEVEN = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isNullOrUndefined(args) || args.length !== 1 || args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        var argVal = args[0].split(this.parent.tic).join('').trim();
        if (argVal === '' || (args[0].indexOf(this.parent.tic) > -1 && isNaN(this.parent.parseFloat(argVal)))) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        var value1;
        if (isCellReference(args[0])) {
            value1 = this.parent.getValueFromArg(args[0]);
            if (value1 === this.parent.trueValue) {
                value1 = '1';
            }
            else if (value1 === '' || value1 === this.parent.falseValue) {
                value1 = '0';
            }
            else if (value1.toUpperCase().match(/[A-Z]/) || value1.includes('"') || !this.parent.isNumber(value1)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            value1 = this.parent.getValueFromArg(args[0].split(this.parent.tic).join(''));
            if (value1 === '#NAME?') {
                return this.parent.getErrorStrings()[CommonErrors.Name];
            }
            if (value1 === this.parent.trueValue) {
                value1 = '1';
            }
            else if (value1 === '' || value1 === this.parent.falseValue) {
                value1 = '0';
            }
            else if (value1.toUpperCase().match(/[A-Z]/) || !this.parent.isNumber(value1)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        var result = Math.ceil(parseInt(value1, 10));
        result = result % 2 === 0 ? result : (result > 0 ? result + 1 : result - 1);
        if (Math.ceil(parseInt(value1, 10)) % 2 === 0) {
            if (parseInt(value1, 10) > 0 && parseFloat(value1) > parseInt(value1, 10)) {
                result = result + 2;
            }
            else if (parseInt(value1, 10) < 0 && parseFloat(value1) < parseInt(value1, 10)) {
                result = result - 2;
            }
        }
        if (isNaN(result)) {
            return this.parent.getErrorStrings()[CommonErrors.Name];
        }
        return result;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the value of pi.
     */
    BasicFormulas.prototype.ComputePI = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result;
        if (args && args[0] !== '') {
            result = this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else {
            result = Math.PI;
        }
        return result;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the median value.
     */
    BasicFormulas.prototype.ComputeMEDIAN = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value1;
        var num = [];
        if (isNullOrUndefined(args) || args[0] === '' && args.length === 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        for (var i = 0; i < args.length; i++) {
            if (this.parent.isCellReference(args[i])) {
                if (args[i].indexOf(':') > -1) {
                    var cellCollection = this.parent.getCellCollection(args[i]);
                    for (var a = 0; a < cellCollection.length; a++) {
                        var cellValue = this.parent.getValueFromArg(cellCollection[a]);
                        if (this.parent.getErrorStrings().indexOf(cellValue) > -1) {
                            return cellValue;
                        }
                        else if (cellValue.trim() !== '') {
                            num.push(this.parent.parseFloat(cellValue));
                        }
                    }
                }
                else {
                    var cellVal = this.parent.getValueFromArg(args[i]);
                    if (this.parent.getErrorStrings().indexOf(cellVal) > -1) {
                        return cellVal;
                    }
                    else if (cellVal.trim() !== '') {
                        num.push(this.parent.parseFloat(cellVal));
                    }
                }
            }
            else if (args[i] === '' || args[i] === this.parent.falseValue && !this.parent.isCellReference(args[i])) {
                num.push(0);
            }
            else if (args[i] === this.parent.trueValue && !this.parent.isCellReference(args[i])) {
                num.push(1);
            }
            else if (args[i].indexOf(this.parent.tic) > -1 && isNaN(parseFloat(args[i].split(this.parent.tic).join('')))) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            else {
                var cValue = this.parent.getValueFromArg(args[i]).split(this.parent.tic).join('');
                if (this.parent.getErrorStrings().indexOf(cValue) > -1) {
                    return cValue;
                }
                else {
                    num.push(this.parent.parseFloat(cValue));
                }
            }
        }
        num = num.sort(function (n1, n2) { return n1 - n2; });
        var len = num.length;
        for (var j = 0; j < len; j++) {
            if (isNaN(num[j])) {
                num.splice(j, 1);
                len = num.length;
                j--;
                if (num.length === 0) {
                    break;
                }
            }
        }
        if (num.length % 2 !== 0 && !isNaN(num[parseInt((num.length / 2).toString(), 10)])) {
            value1 = num[parseInt((num.length / 2).toString(), 10)];
        }
        else if (!isNaN(num[num.length / 2]) && !isNaN(num[num.length / 2 - 1])) {
            value1 = (num[num.length / 2] + num[num.length / 2 - 1]) / 2;
        }
        else {
            return this.parent.getErrorStrings()[CommonErrors.Num];
        }
        return value1;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the edate value.
     */
    BasicFormulas.prototype.ComputeEDATE = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length !== 2 || isNullOrUndefined(args)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        if (args[0] === '' || args[1] === '') {
            return this.parent.getErrorStrings()[CommonErrors.NA];
        }
        if (args[0].split(this.parent.tic).join('') === '' || args[1].split(this.parent.tic).join('') === ''
            || (args[1].indexOf(this.parent.tic) > -1 && isNaN(this.parent.parseFloat(args[1].split(this.parent.tic).join(''))))) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        var dValue;
        var mValue;
        if (this.parent.isCellReference(args[0])) {
            if (args[0].indexOf(':') > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            dValue = this.parent.getValueFromArg(args[0].split(this.parent.tic).join('')) || '0';
            if (dValue.indexOf(this.parent.tic) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            dValue = this.parent.getValueFromArg(args[0].split(this.parent.tic).join(''));
        }
        if (this.parent.isCellReference(args[1])) {
            if (args[1].indexOf(':') > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            mValue = this.parent.getValueFromArg(args[1].split(this.parent.tic).join('')) || '0';
        }
        else {
            mValue = this.parent.getValueFromArg(args[1].split(this.parent.tic).join(''));
        }
        if (this.parent.getErrorStrings().indexOf(mValue) > -1) {
            return mValue;
        }
        mValue = parseInt(mValue, 10);
        var date;
        if (this.parent.isNumber(dValue)) {
            dValue = parseInt(dValue, 10);
            if (dValue < 0 || dValue > 2958465) {
                return this.parent.getErrorStrings()[CommonErrors.Num];
            }
            date = this.parent.fromOADate(dValue);
        }
        else {
            date = this.parent.checkDateFormat(dValue);
        }
        if (isNaN(mValue) || isNullOrUndefined(this.parent.isDate(date)) || date.getFullYear() > 9999) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        var checkDate = date.getDate();
        date.setMonth(date.getMonth() + mValue);
        if (checkDate !== date.getDate()) {
            date.setDate(0);
            //For the date like 31st of January and mValue as 1, the setMonth returns 3rd of March, so we using setDate(0) to return 28th of February.
        }
        var result = this.parent.parentObject.dateToInt(date);
        // For 0 and 1 values we are considering the same starting date as 1/1/1900, so for 0 we are decrementing the value with 1.
        if (dValue.toString() === '0') {
            result -= 1;
        }
        if (result < 0 || result > 2958465) {
            return this.parent.getErrorStrings()[CommonErrors.Num];
        }
        return result.toString();
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the number of months value.
     */
    BasicFormulas.prototype.ComputeEOMONTH = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length !== 2 || isNullOrUndefined(args)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        if (args[0] === '' || args[1] === '') {
            return this.parent.getErrorStrings()[CommonErrors.NA];
        }
        if (args[0].split(this.parent.tic).join('') === '' || args[1].split(this.parent.tic).join('') === ''
            || (args[1].indexOf(this.parent.tic) > -1 && isNaN(this.parent.parseFloat(args[1].split(this.parent.tic).join(''))))) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        var dateValue;
        var monthValue;
        if (this.parent.isCellReference(args[0])) {
            if (args[0].indexOf(':') > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            dateValue = this.parent.getValueFromArg(args[0].split(this.parent.tic).join('')) || '0';
            if (dateValue.indexOf(this.parent.tic) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            dateValue = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        }
        if (this.parent.getErrorStrings().indexOf(dateValue) > -1) {
            return dateValue;
        }
        if (this.parent.isCellReference(args[1])) {
            if (args[1].indexOf(':') > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            monthValue = this.parent.getValueFromArg(args[1].split(this.parent.tic).join('')) || '0';
        }
        else {
            monthValue = this.parent.getValueFromArg(args[1].split(this.parent.tic).join(''));
        }
        if (this.parent.getErrorStrings().indexOf(monthValue) > -1) {
            return monthValue;
        }
        monthValue = parseInt(monthValue, 10);
        var date;
        if (this.parent.isNumber(dateValue)) {
            dateValue = parseInt(dateValue, 10);
            if (dateValue < 0 || dateValue > 2958465) {
                return this.parent.getErrorStrings()[CommonErrors.Num];
            }
            date = this.parent.fromOADate(dateValue);
        }
        else {
            date = this.parent.checkDateFormat(dateValue);
        }
        if (isNaN(monthValue) || isNullOrUndefined(this.parent.isDate(date)) || date.getFullYear() > 9999) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        date = new Date(date.getFullYear(), date.getMonth() + (monthValue + 1), 0);
        var result = this.parent.parentObject.dateToInt(date);
        if (result < 0 || result > 2958465 || date.getFullYear() < 1900) {
            return this.parent.getErrorStrings()[CommonErrors.Num];
        }
        return result.toString();
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the date value.
     */
    BasicFormulas.prototype.ComputeDATEVALUE = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var dValue;
        var errCollection = this.parent.getErrorStrings();
        if (args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        dValue = this.parent.getValueFromArg(args[0]) || '0';
        if (errCollection.indexOf(dValue) > -1) {
            return dValue;
        }
        if (this.parent.isCellReference(args[0])) {
            if ((args[0].indexOf(':') > -1) || dValue.startsWith(this.parent.tic)) {
                return errCollection[CommonErrors.Value];
            }
        }
        else {
            dValue = (args[0]).split(this.parent.tic).join('') || '0';
        }
        if (!(!(this.parent.isNumber(dValue)) && !isNullOrUndefined(this.parent.isDate(dValue)))) {
            return errCollection[CommonErrors.Value];
        }
        var date = this.parent.parseDate(dValue);
        if (errCollection.indexOf(dValue) > -1) {
            return dValue;
        }
        else if (isNullOrUndefined(date) || date.toString() === 'Invalid Date' ||
            date.getFullYear() < 1900 || date.getFullYear() > 9999) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        else {
            dValue = this.parent.toOADate(date).toString();
        }
        return parseFloat(dValue).toFixed(0).toString();
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the count blank value.
     */
    BasicFormulas.prototype.ComputeCOUNTBLANK = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = 0;
        if (args.length !== 1 || isNullOrUndefined(args) || !this.parent.isCellReference(args[0])) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args[0] === '') {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        else {
            var cellRange = this.parent.getCellCollection(args[0]);
            for (var i = 0; i < cellRange.length; i++) {
                if (this.parent.getValueFromArg(cellRange[i]) === '') {
                    result++;
                }
            }
        }
        return result;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the factorial value.
     */
    BasicFormulas.prototype.ComputeFACT = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var fact = 1;
        var errCollection = this.parent.getErrorStrings();
        if (args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length !== 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var getValue = args[0];
        if (this.parent.isCellReference(args[0]) || isNaN(Number(getValue.split(this.parent.tic).join('')))) {
            getValue = this.parent.getValueFromArg(args[0]);
            if (errCollection.indexOf(getValue) > -1) {
                return getValue;
            }
            if (getValue.startsWith(this.parent.tic) ||
                getValue.match(/^(\d*\.\d+|\d+)\s*[+\-*/]\s*(\d*\.\d+|\d+)$/)) {
                return errCollection[CommonErrors.Value];
            }
            else if (getValue === '') {
                return 1;
            }
        }
        getValue = getValue.split(this.parent.tic).join('').trim();
        if (errCollection.indexOf(getValue) > -1) {
            return getValue;
        }
        if (getValue.toUpperCase() === this.parent.trueValue || getValue.toUpperCase() === this.parent.falseValue) {
            return 1;
        }
        if (getValue.indexOf('%') > -1) {
            getValue = (Number(getValue.split('%')[0]) / 100).toString();
        }
        var value = parseInt(getValue, 10);
        if ((value < 0) || (value > 170)) {
            return errCollection[CommonErrors.Num];
        }
        else if (getValue.toUpperCase().match(/[A-Z]/) || getValue === '') {
            return errCollection[CommonErrors.Value];
        }
        else if (getValue.indexOf(':') > -1) {
            return 0;
        }
        for (var i = 1; i <= value; i++) {
            fact = fact * i;
        }
        return fact;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the decimal value.
     */
    BasicFormulas.prototype.ComputeDECIMAL = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value;
        var specialChars = /[@#$%^&*()?:{}|<>+-]/g;
        if (isNullOrUndefined(args) || args.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args[0].match(specialChars)) {
            return this.parent.getErrorStrings()[CommonErrors.Num];
        }
        else if (args[1].indexOf(this.parent.tic) > -1 && isNaN(this.parent.parseFloat(args[1].split(this.parent.tic).join('')))) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        else {
            var val = void 0;
            var val1 = void 0;
            if (this.parent.isCellReference(args[0].toString())) {
                val = this.parent.getValueFromArg(args[0]);
            }
            else {
                val = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
            }
            if (this.parent.isCellReference(args[1].toString())) {
                val1 = this.parent.getValueFromArg(args[1]);
            }
            else {
                val1 = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('');
            }
            var num = parseInt(val, 10);
            var radix = parseInt(val1, 10);
            if (this.parent.getErrorStrings().indexOf(val) > -1) {
                return val;
            }
            else if (this.parent.getErrorStrings().indexOf(val1) > -1) {
                return val1;
            }
            else if (val === '' && val1 !== '') {
                return 0;
            }
            else if (val === '' || (num < 0) || (!isNaN(num) && !Number.isInteger(parseFloat(val)))) {
                return this.parent.getErrorStrings()[CommonErrors.Num];
            }
            else if (val1 === '' || (radix < 2 || radix > 36) || isNaN(radix)) {
                return this.parent.getErrorStrings()[CommonErrors.Num];
            }
            else if (isNaN(this.parent.parseFloat(val)) && this.parent.parseFloat(val1) <= 10) {
                return this.parent.getErrorStrings()[CommonErrors.Num];
            }
            value = parseInt(val, parseInt(val1, 10));
        }
        return isNaN(value) ? this.parent.getErrorStrings()[CommonErrors.Num] : value;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the degrees value.
     */
    BasicFormulas.prototype.ComputeDEGREES = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(args) || (args[0] === '' && args.length === 1)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length !== 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var val = this.parent.getValueFromArg(args[0]).trim();
        if (errCollection.indexOf(val) > -1) {
            return val;
        }
        if (this.parent.isCellReference(args[0])) {
            if (val === '' || val.indexOf(':') > -1) {
                return 0;
            }
            else if (val.indexOf(this.parent.tic) > -1 || (isNaN(Number(val)) && !isNaN(parseInt(val, 10)))) {
                return errCollection[CommonErrors.Value];
            }
        }
        else if (val.indexOf('"TRUE"') > -1) {
            return errCollection[CommonErrors.Value];
        }
        val = val.split(this.parent.tic).join('');
        if (val.toUpperCase() === this.parent.trueValue) {
            val = '1';
        }
        else if (val.toUpperCase() === this.parent.falseValue) {
            val = '0';
        }
        else if (val.indexOf('%') > -1) {
            val = (Number(val.split('%')[0]) / 100).toString();
        }
        else if (val.toUpperCase().match(/[A-Z]/) || isNaN(parseInt(val, 10))) {
            return errCollection[CommonErrors.Value];
        }
        return parseFloat(val) * (180 / (Math.PI));
    };
    /**
     * @hidden
     * @param {string} argArr - specify the args.
     * @returns {string | boolean} - Compute the cell address.
     */
    BasicFormulas.prototype.ComputeADDRESS = function () {
        var _this = this;
        var argArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argArr[_i] = arguments[_i];
        }
        var value;
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(argArr) || (argArr.length === 1 && argArr[0].trim() === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (argArr.length < 2 || argArr.length > 5) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        else if (argArr[0].split(this.parent.tic).join('').trim() === '' || argArr[1].split(this.parent.tic).join('').trim() === '') {
            return errCollection[CommonErrors.Value];
        }
        var processArgs = function (actualValue) {
            var value = _this.parent.getValueFromArg(actualValue).trim();
            if (errCollection.indexOf(value) > 0) {
                return value;
            }
            if (value.toUpperCase() === _this.parent.trueValue) {
                value = '1';
            }
            else if (value.toUpperCase() === _this.parent.falseValue) {
                value = '0';
            }
            if (_this.parent.isCellReference(actualValue) && value.indexOf(_this.parent.tic) > -1) {
                return errCollection[CommonErrors.Value];
            }
            value = _this.parent.removeTics(value);
            if (value.split('%').length === 2 && _this.parent.isNumber(value.split('%')[0])) {
                value = (Number(value.split('%')[0]) / 100).toString();
            }
            return value;
        };
        /* For argArr[0] */
        var rowIndex = processArgs(argArr[0], 0);
        if (errCollection.indexOf(rowIndex) > 0) {
            return rowIndex;
        }
        rowIndex = Number(rowIndex);
        if (isNaN(rowIndex) || rowIndex < 1) {
            return errCollection[CommonErrors.Value];
        }
        else {
            rowIndex = rowIndex.toString();
        }
        /* For argArr[1] */
        var colIndex = processArgs(argArr[1], 1);
        if (errCollection.indexOf(colIndex) > 0) {
            return colIndex;
        }
        colIndex = Number(colIndex);
        if (isNaN(colIndex) || colIndex < 1) {
            return errCollection[CommonErrors.Value];
        }
        else {
            colIndex = colIndex.toString();
        }
        /* For argArr[2] */
        var absIndex;
        var refStyle;
        if (isNullOrUndefined(argArr[2]) || argArr[2].trim() === '') {
            absIndex = '1';
        }
        else {
            absIndex = processArgs(argArr[2], 2);
            if (errCollection.indexOf(absIndex) > 0) {
                return absIndex;
            }
            absIndex = Number(absIndex);
            if (isNaN(absIndex) || absIndex < 1 || absIndex > 4) {
                return errCollection[CommonErrors.Value];
            }
            else {
                absIndex = absIndex.toString();
            }
        }
        if (isNullOrUndefined(argArr[3]) || argArr[3].trim() === '') {
            refStyle = '1';
        }
        else {
            refStyle = processArgs(argArr[3], 3);
            if (errCollection.indexOf(refStyle) > 0) {
                return refStyle;
            }
            if (refStyle.toUpperCase() === this.parent.trueValue || Number(refStyle) > 1) {
                refStyle = '1';
            }
            else if (refStyle === '' || refStyle.toUpperCase() === this.parent.falseValue) {
                refStyle = '0';
            }
        }
        if (refStyle === '1') {
            if (absIndex === '1') {
                value = '$' + getAlphalabel(parseInt(colIndex, 10)) + '$' + parseInt(rowIndex, 10);
            }
            else if (absIndex === '2') {
                value = getAlphalabel(parseInt(colIndex, 10)) + '$' + parseInt(rowIndex, 10);
            }
            else if (absIndex === '3') {
                value = '$' + getAlphalabel(parseInt(colIndex, 10)) + parseInt(rowIndex, 10);
            }
            else if (absIndex === '4') {
                value = getAlphalabel(parseInt(colIndex, 10)) + parseInt(rowIndex, 10);
            }
        }
        else if (refStyle === '0') {
            if (absIndex === '1') {
                value = 'R' + parseInt(rowIndex, 10) + 'C' + parseInt(colIndex, 10);
            }
            else if (absIndex === '2') {
                value = 'R' + parseInt(rowIndex, 10) + 'C[' + parseInt(colIndex, 10) + ']';
            }
            else if (absIndex === '3') {
                value = 'R[' + parseInt(rowIndex, 10) + ']C' + parseInt(colIndex, 10);
            }
            else if (absIndex === '4') {
                value = 'R[' + parseInt(rowIndex, 10) + ']C[' + parseInt(colIndex, 10) + ']';
            }
        }
        else {
            return errCollection[CommonErrors.Name];
        }
        var val;
        if (!isNullOrUndefined(argArr[4]) && argArr[4] !== '') {
            val = this.parent.getValueFromArg(argArr[4]).split(this.parent.tic).join('');
            if (errCollection.indexOf(val) > 0) {
                return val;
            }
        }
        if (!isNullOrUndefined(val)) {
            value = val + '!' + value;
        }
        return value;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the time.
     */
    BasicFormulas.prototype.ComputeTIME = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result;
        if (isNullOrUndefined(args) || args.length !== 3) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        if (args[0].indexOf(this.parent.tic) > -1 && args[0].split(this.parent.tic).join('').trim() === '') {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        else if (args[1].indexOf(this.parent.tic) > -1 && args[1].split(this.parent.tic).join('').trim() === '') {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        else if (args[2].indexOf(this.parent.tic) > -1 && args[2].split(this.parent.tic).join('').trim() === '') {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        var hours;
        var minutes;
        var seconds;
        if (this.parent.isCellReference(args[0])) {
            hours = this.parent.getValueFromArg(args[0].split(this.parent.tic).join('')) || '0';
            if (hours.indexOf(this.parent.tic) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            if (args[0].indexOf(this.parent.tic) > -1 && (args[0].split(this.parent.tic).join('') === this.parent.trueValue || args[0].split(this.parent.tic).join('') === this.parent.falseValue)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            hours = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('') || '0';
        }
        if (this.parent.getErrorStrings().indexOf(hours) > -1) {
            return hours;
        }
        if (isNaN(this.parent.parseFloat(hours)) && !(hours === this.parent.trueValue || hours === this.parent.falseValue)) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        if (this.parent.isCellReference(args[1])) {
            minutes = this.parent.getValueFromArg(args[1].split(this.parent.tic).join('')) || '0';
            if (minutes.indexOf(this.parent.tic) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            if (args[1].indexOf(this.parent.tic) > -1 && (args[1].split(this.parent.tic).join('') === this.parent.trueValue || args[1].split(this.parent.tic).join('') === this.parent.falseValue)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            minutes = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('') || '0';
        }
        if (this.parent.getErrorStrings().indexOf(minutes) > -1) {
            return minutes;
        }
        if (isNaN(this.parent.parseFloat(minutes)) && !(minutes === this.parent.trueValue || minutes === this.parent.falseValue)) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        if (this.parent.isCellReference(args[2])) {
            seconds = this.parent.getValueFromArg(args[2].split(this.parent.tic).join('')) || '0';
            if (seconds.indexOf(this.parent.tic) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            if (args[2].indexOf(this.parent.tic) > -1 && (args[2].split(this.parent.tic).join('') === this.parent.trueValue || args[2].split(this.parent.tic).join('') === this.parent.falseValue)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            seconds = this.parent.getValueFromArg(args[2]).split(this.parent.tic).join('') || '0';
        }
        if (this.parent.getErrorStrings().indexOf(seconds) > -1) {
            return seconds;
        }
        if (isNaN(this.parent.parseFloat(seconds)) && !(seconds === this.parent.trueValue || seconds === this.parent.falseValue)) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        hours = hours === this.parent.trueValue ? '1' : (hours === this.parent.falseValue ? '0' : hours);
        minutes = minutes === this.parent.trueValue ? '1' : (minutes === this.parent.falseValue ? '0' : minutes);
        seconds = seconds === this.parent.trueValue ? '1' : (seconds === this.parent.falseValue ? '0' : seconds);
        hours = parseInt(this.parent.parseFloat(hours).toString(), 10);
        minutes = parseInt(this.parent.parseFloat(minutes).toString(), 10);
        seconds = parseInt(this.parent.parseFloat(seconds).toString(), 10);
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        if (hours > 32767 || minutes > 32767 || seconds > 32767) {
            return this.parent.getErrorStrings()[CommonErrors.Num];
        }
        var value = new Date(1900, 0, 1, hours, minutes, seconds);
        if (value.getFullYear() < 1900) {
            return this.parent.getErrorStrings()[CommonErrors.Num];
        }
        var hh = value.getHours();
        var m = value.getMinutes();
        var s = value.getSeconds();
        var dd = 'AM';
        var h = hh;
        if (h >= 12) {
            h = hh - 12;
            dd = 'PM';
        }
        if (h === 0) {
            h = 12;
        }
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        h = h < 10 ? '0' + h : h;
        result = h + ':' + m + ':' + s + ' ' + dd;
        var timeCheck = { value: result.toString() };
        this.parent.parentObject.notify(checkDateFormat, timeCheck);
        if (timeCheck.isTime) {
            result = timeCheck.updatedVal;
        }
        return result;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the char value.
     */
    BasicFormulas.prototype.ComputeCHAR = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value;
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(args) || args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length !== 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var val = this.parent.getValueFromArg(args[0]).trim();
        if (errCollection.indexOf(val) > -1) {
            return val;
        }
        else if (val.indexOf('"TRUE"') > -1 || (this.parent.isCellReference(args[0]) &&
            val.startsWith(this.parent.tic))) {
            return errCollection[CommonErrors.Value];
        }
        val = val.split(this.parent.tic).join('');
        if (this.parent.isNumber(val)) {
            val = Math.floor(Number(val)).toString();
        }
        else if (val.indexOf('%') > -1) {
            val = Math.floor(Number(val.split('%')[0]) / 100).toString();
        }
        else if (val === this.parent.trueValue) {
            val = '1';
        }
        if (val.toUpperCase().match(/^[0-9]+$/)) {
            var char = parseInt(val, 10);
            if (char > 255 || char <= 0) {
                return errCollection[CommonErrors.Value];
            }
            value = String.fromCharCode(char);
        }
        else {
            return errCollection[CommonErrors.Value];
        }
        return value;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the code value.
     */
    BasicFormulas.prototype.ComputeCODE = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value;
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(args) || (args.length === 1 && args[0].trim() === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        value = this.parent.getValueFromArg(args[0]).trim();
        if (errCollection.indexOf(value) > -1) {
            return value;
        }
        if (args[0].indexOf(this.parent.tic) > -1) {
            if (args[0] !== value && args[0].startsWith('n')) {
                value = this.parent.removeTics(value.trim());
            }
            else {
                value = this.parent.removeTics(args[0].trim());
            }
        }
        else if (!args[0].startsWith('n') && value.split('%').length === 2 && this.parent.isNumber(value.split('%')[0])) {
            value = (Number(value.split('%')[0]) / 100).toString();
        }
        if (value !== '') {
            value = value.charCodeAt(0);
        }
        else {
            return errCollection[CommonErrors.Value];
        }
        return value;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the currency value.
     */
    BasicFormulas.prototype.ComputeDOLLAR = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value;
        var isEmpty;
        var nestedFormula;
        if (args.length && args[args.length - 1] === 'nestedFormulaTrue') {
            nestedFormula = true;
            args.pop();
        }
        if (args.length === 1) {
            if (args[0] === '') {
                isEmpty = true;
            }
            args.push('2');
        }
        if (isNullOrUndefined(args) || args.length !== 2 || isEmpty) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        for (var i = 0; i < args.length; i++) {
            if (args[i].indexOf(this.parent.tic) > -1) {
                if (isNaN(this.parent.parseFloat(args[i]))) {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
            }
        }
        var val = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        var val2 = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('');
        val = val === '' || val === this.parent.falseValue ? '0' : val === this.parent.trueValue ? '1' : val;
        val2 = val2 === '' || val2 === this.parent.falseValue ? '0' : val2 === this.parent.trueValue ? '1' : val2;
        if (val === '#NAME?' || val2 === '#NAME?') {
            return this.parent.getErrorStrings()[CommonErrors.Name];
        }
        if (val.toUpperCase().match(/^[-]?[0-9.]+$/) && val2.toUpperCase().match(/^[-]?[0-9.]+$/)) {
            var intl = new Internationalization();
            var decimalCount = parseInt(val2, 10);
            var divisor = Math.pow(10, -1 * decimalCount);
            var decimalValue = '';
            for (var decimalIdx = 1; decimalIdx <= decimalCount; decimalIdx++) {
                decimalValue += '0';
            }
            var roundedNumber = Math.round(this.parent.parseFloat(val) / divisor) * divisor;
            if (!isNaN(roundedNumber)) {
                value = intl.formatNumber(roundedNumber, { format: '$#,##0.' + decimalValue + ';($#,##0.' + decimalValue + ');$0.' + decimalValue });
            }
            else {
                value = this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        if (nestedFormula) {
            value = this.parent.tic + value + this.parent.tic;
        }
        return value;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the k-th smallest value.
     */
    BasicFormulas.prototype.ComputeSMALL = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value;
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(args) || args.length === 1 || args[0] === '') {
            if ((args[0] === '') && (args[1] === '')) {
                return errCollection[CommonErrors.Num];
            }
            else {
                return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
            }
        }
        else if (args.length > 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var cellCollection = [];
        var valueCollection = [];
        var numArr = [];
        if (!isNullOrUndefined(args[0])) {
            var originalValue = void 0;
            if (this.parent.isCellReference(args[0])) {
                cellCollection = this.parent.getCellCollection(args[0]);
                for (var i = 0; i < cellCollection.length; i++) {
                    originalValue = this.parent.getValueFromArg(cellCollection[i]);
                    if (errCollection.indexOf(originalValue) > -1) {
                        return originalValue;
                    }
                    valueCollection.push(originalValue);
                }
            }
            else {
                originalValue = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
                if (errCollection.indexOf(originalValue) > -1) {
                    return originalValue;
                }
                valueCollection.push(originalValue);
            }
            for (var i = 0; i < valueCollection.length; i++) {
                if (valueCollection[i] !== '' && !isNaN(this.parent.parseFloat(valueCollection[i]))) {
                    numArr.push(this.parent.parseFloat(valueCollection[i]));
                }
            }
            if (numArr.length === 0) {
                if (isNullOrUndefined(valueCollection[0]) || args[0].indexOf(this.parent.tic) > -1) {
                    return errCollection[CommonErrors.Value];
                }
            }
        }
        numArr = numArr.sort(function (n1, n2) { return n1 - n2; });
        var smallIndex;
        if (!isNullOrUndefined(args[1])) {
            if (this.parent.isCellReference(args[1])) {
                smallIndex = this.parent.getValueFromArg(args[1]);
                if (smallIndex === '') {
                    return errCollection[CommonErrors.Num];
                }
                else if (smallIndex.trim() === '') {
                    return errCollection[CommonErrors.Value];
                }
                if (smallIndex.toUpperCase() === this.parent.trueValue) {
                    smallIndex = '1';
                }
                else if (smallIndex.toUpperCase() === this.parent.falseValue) {
                    smallIndex = '0';
                }
            }
            else {
                smallIndex = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('');
            }
            if (errCollection.indexOf(smallIndex) > -1) {
                return smallIndex;
            }
            else if (smallIndex.trim() === '') {
                return args[1].length > 0 ? errCollection[CommonErrors.Value] : errCollection[CommonErrors.Num];
            }
            else if (isNaN(this.parent.parseFloat(smallIndex))) {
                if (args[1].toUpperCase() === this.parent.trueValue) {
                    smallIndex = '1';
                }
                else if (args[1].toUpperCase() === this.parent.falseValue) {
                    smallIndex = '0';
                }
                else {
                    return errCollection[CommonErrors.Value];
                }
            }
        }
        var finalIndex = (Number(smallIndex) < 1 ? 0 : Math.floor(Number(smallIndex)));
        if (isNullOrUndefined(numArr[finalIndex - 1]) && !isNaN(Number(finalIndex))) {
            return errCollection[CommonErrors.Num];
        }
        else {
            value = numArr[finalIndex - 1];
        }
        return value;
    };
    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the k-th largest value.
     */
    BasicFormulas.prototype.ComputeLARGE = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value;
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(args) || args.length === 1 || args[0] === '') {
            if ((args[0] === '') && (args[1] === '')) {
                return errCollection[CommonErrors.Num];
            }
            else {
                return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
            }
        }
        else if (args.length > 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var cellCollection = [];
        var valueCollection = [];
        var numArr = [];
        if (!isNullOrUndefined(args[0])) {
            var originalValue = void 0;
            if (this.parent.isCellReference(args[0])) {
                cellCollection = this.parent.getCellCollection(args[0]);
                for (var i = 0; i < cellCollection.length; i++) {
                    originalValue = this.parent.getValueFromArg(cellCollection[i]);
                    if (errCollection.indexOf(originalValue) > -1) {
                        return originalValue;
                    }
                    valueCollection.push(originalValue);
                }
            }
            else {
                originalValue = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
                if (errCollection.indexOf(originalValue) > -1) {
                    return originalValue;
                }
                valueCollection.push(originalValue);
            }
            for (var i = 0; i < valueCollection.length; i++) {
                if (valueCollection[i] !== '' && !isNaN(this.parent.parseFloat(valueCollection[i]))) {
                    numArr.push(this.parent.parseFloat(valueCollection[i]));
                }
            }
            if (numArr.length === 0) {
                if (isNullOrUndefined(valueCollection[0]) || args[0].indexOf(this.parent.tic) > -1) {
                    return errCollection[CommonErrors.Value];
                }
            }
        }
        numArr = numArr.sort(function (n1, n2) { return n2 - n1; });
        var largeIndex;
        if (!isNullOrUndefined(args[1])) {
            if (this.parent.isCellReference(args[1])) {
                largeIndex = this.parent.getValueFromArg(args[1]);
                if (largeIndex === '') {
                    return errCollection[CommonErrors.Num];
                }
                else if (largeIndex.trim() === '') {
                    return errCollection[CommonErrors.Value];
                }
                if (largeIndex.toUpperCase() === this.parent.trueValue) {
                    largeIndex = '1';
                }
                else if (largeIndex.toUpperCase() === this.parent.falseValue) {
                    largeIndex = '0';
                }
            }
            else {
                largeIndex = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('');
            }
            if (errCollection.indexOf(largeIndex) > -1) {
                return largeIndex;
            }
            else if (largeIndex.trim() === '') {
                return args[1].length > 0 ? errCollection[CommonErrors.Value] : errCollection[CommonErrors.Num];
            }
            else if (isNaN(this.parent.parseFloat(largeIndex))) {
                if (args[1].toUpperCase() === this.parent.trueValue) {
                    largeIndex = '1';
                }
                else if (args[1].toUpperCase() === this.parent.falseValue) {
                    largeIndex = '0';
                }
                else {
                    return errCollection[CommonErrors.Value];
                }
            }
        }
        var finalIndex = (Number(largeIndex) < 1 ? 0 : Math.ceil(Number(largeIndex)));
        if (isNullOrUndefined(numArr[finalIndex - 1]) && !isNaN(Number(finalIndex))) {
            return errCollection[CommonErrors.Num];
        }
        else {
            value = numArr[finalIndex - 1];
        }
        return value;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string | number} - Compute the Choose value.
     */
    BasicFormulas.prototype.ComputeCHOOSE = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isNullOrUndefined(args) || (args[0] === '' && args.length === 1)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length < 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var errCollection = this.parent.getErrorStrings();
        var processArgs = function (actuaValue) {
            actuaValue = _this.parent.getValueFromArg(actuaValue);
            if (actuaValue.toUpperCase() === _this.parent.trueValue) {
                actuaValue = '1';
            }
            else if (actuaValue.toUpperCase() === _this.parent.falseValue) {
                actuaValue = '0';
            }
            return actuaValue;
        };
        var getIndexValue;
        getIndexValue = processArgs(args[0]);
        if (errCollection.indexOf(getIndexValue) > -1) {
            return getIndexValue;
        }
        if (this.parent.isCellReference(args[0])) {
            if (args[0].indexOf(':') > -1) {
                return errCollection[CommonErrors.Value];
            }
        }
        else {
            getIndexValue = this.parent.removeTics(getIndexValue);
            if (getIndexValue.split('%').length === 2 && this.parent.isNumber(getIndexValue.split('%')[0])) {
                getIndexValue = (Number(getIndexValue.split('%')[0]) * 0.01).toString();
            }
        }
        getIndexValue = Math.floor(this.parent.parseFloat(getIndexValue));
        if (getIndexValue < 1 || isNaN(getIndexValue) || isNullOrUndefined(args[getIndexValue])) {
            return errCollection[CommonErrors.Value];
        }
        getIndexValue = args[getIndexValue];
        if (getIndexValue === '') {
            getIndexValue = '0';
        }
        if (this.parent.isCellReference(getIndexValue)) {
            if (getIndexValue.indexOf(':') > -1) {
                return errCollection[CommonErrors.Value];
            }
            return this.parent.getValueFromArg(getIndexValue);
        }
        else {
            if (getIndexValue.indexOf(this.parent.tic) > -1 && (errCollection.indexOf(getIndexValue.split(this.parent.tic).join('')) > -1 ||
                (this.parent.removeTics(getIndexValue).match(/^(\d*\.\d+|\d+)\s*[-*/]\s*(\d*\.\d+|\d+)$/)))) {
                getIndexValue = this.parent.removeTics(getIndexValue);
            }
            getIndexValue = this.parent.removeTics(this.parent.getValueFromArg(getIndexValue));
            if (getIndexValue.indexOf(this.parent.tic + this.parent.tic) > -1) {
                return getIndexValue.replace(/""/g, this.parent.tic);
            }
            if (getIndexValue.split('%').length === 2 && this.parent.isNumber(getIndexValue.split('%')[0])) {
                getIndexValue = (Number(getIndexValue.split('%')[0]) * 0.01).toString();
            }
            return getIndexValue;
        }
    };
    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the SUMIF value.
     */
    BasicFormulas.prototype.ComputeSUMIF = function () {
        var range = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            range[_i] = arguments[_i];
        }
        var argArr = range;
        if (argArr[0].indexOf(':') < 0 && !this.parent.isCellReference(argArr[0]) ||
            (argArr[2] && argArr[2].indexOf(':') < 0 && !this.parent.isCellReference(argArr[2]))) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.ImproperFormula];
        }
        if (argArr.length > 3 || argArr.length < 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var result = this.parent.computeSumIfAndAvgIf(range, false);
        if (typeof result === 'string' && (this.parent.formulaErrorStrings.indexOf(result)
            || this.parent.getErrorStrings().indexOf(result))) {
            return result;
        }
        return result[0];
    };
    /**
     * @hidden
     * @param {string[]} absValue - specify the absValue.
     * @returns {string | number} - Compute the AVERAGE value.
     */
    BasicFormulas.prototype.ComputeABS = function () {
        var absValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            absValue[_i] = arguments[_i];
        }
        var argArr = absValue;
        var cellvalue = '';
        var absVal;
        if (absValue.length === 0 || absValue.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        if (argArr[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        var argVal = argArr[0].split(this.parent.tic).join('').trim();
        if (argVal === '' || (argArr[0].indexOf(this.parent.tic) > -1 && isNaN(this.parent.parseFloat(argVal)))) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        if (this.parent.isCellReference(argArr[0])) {
            cellvalue = this.parent.getValueFromArg(argArr[0]);
            if (this.parent.getErrorStrings().indexOf(cellvalue) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            if (cellvalue === this.parent.trueValue) {
                cellvalue = '1';
            }
            if (cellvalue === '' || cellvalue === this.parent.falseValue) {
                cellvalue = '0';
            }
            absVal = this.parent.parseFloat(cellvalue);
            if (isNaN(absVal) && !this.parent.isNumber(cellvalue)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            cellvalue = this.parent.getValueFromArg(argArr[0]).split(this.parent.tic).join();
            if (cellvalue === this.parent.trueValue) {
                cellvalue = '1';
            }
            if (cellvalue === this.parent.falseValue) {
                cellvalue = '0';
            }
            if (this.parent.getErrorStrings().indexOf(cellvalue) > -1) {
                return cellvalue;
            }
            absVal = this.parent.parseFloat(cellvalue);
            if (isNaN(absVal) && !this.parent.isNumber(cellvalue)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        return Math.abs(absVal);
    };
    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {string} - Compute the AVERAGE value.
     */
    BasicFormulas.prototype.ComputeAVERAGE = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var isSubtotalFormula = false;
        var isAggregateComputation;
        if (args.length) {
            var lastArgument = args[args.length - 1];
            if (lastArgument === 'isSubtotal') {
                isSubtotalFormula = true;
                args.pop();
            }
            else if (lastArgument === 'isAggregate') {
                isAggregateComputation = true;
                args.pop();
            }
        }
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        var argArr = args;
        for (var i = 0; i < argArr.length; i++) {
            if (argArr[i].indexOf(':') > -1) {
                if (argArr[i].indexOf(this.parent.tic) > -1) {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
            }
        }
        return this.parent.calculateAvg(argArr, isSubtotalFormula, isAggregateComputation);
    };
    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the AVERAGEIF value.
     */
    BasicFormulas.prototype.ComputeAVERAGEIF = function () {
        var range = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            range[_i] = arguments[_i];
        }
        var argList = range;
        if (argList[0].indexOf(':') < 0 && !this.parent.isCellReference(argList[0])) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.ImproperFormula];
        }
        var resultVal = this.parent.computeSumIfAndAvgIf(range, true);
        if (resultVal[1] === 0 || resultVal[0].toString() === 'NaN') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.Div];
        }
        if (typeof resultVal === 'string' && (this.parent.formulaErrorStrings.indexOf(resultVal)
            || this.parent.getErrorStrings().indexOf(resultVal))) {
            return resultVal;
        }
        return this.parent.parseFloat(resultVal[0]) / this.parent.parseFloat(resultVal[1]);
    };
    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string} - Compute the CONCATENATE value.
     */
    BasicFormulas.prototype.ComputeCONCATENATE = function () {
        var range = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            range[_i] = arguments[_i];
        }
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(range) || (range.length === 1 && range[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        var argsList = range;
        var result = '';
        var tempStr = '';
        for (var i = 0; i < argsList.length; i++) {
            var val = argsList[i];
            if (this.parent.isCellReference(val)) {
                if (val.indexOf(':') > -1) {
                    if (this.isConcat) {
                        var cells = this.parent.getCellCollection(val);
                        for (var i_2 = 0; i_2 < cells.length; i_2++) {
                            var tempString = this.parent.getValueFromArg(cells[i_2]);
                            result = result + tempString;
                        }
                    }
                    else {
                        return errCollection[CommonErrors.Value];
                    }
                }
                else {
                    if (argsList.length === 1 && argsList[0].indexOf(this.parent.tic) < 0 &&
                        !isValidCellReference(argsList[0])) {
                        return errCollection[CommonErrors.Name];
                    }
                    else {
                        tempStr = this.parent.getValueFromArg(val);
                    }
                }
                if (errCollection.indexOf(tempStr) > -1) {
                    return tempStr;
                }
            }
            else {
                if (val.startsWith(this.parent.tic) && val.endsWith(this.parent.tic) && val.indexOf('""') > -1) {
                    tempStr = val.substring(1, val.length - 1);
                    tempStr = tempStr.replace(/""/g, '"');
                }
                else {
                    tempStr = val.split(this.parent.tic).join('');
                    if (!(!(this.parent.isNumber(tempStr)) && !isNullOrUndefined(this.parent.isDate(tempStr))) || val.startsWith(' n')) {
                        tempStr = this.parent.getValueFromArg(val).split(this.parent.tic).join('');
                    }
                }
                if (errCollection.indexOf(tempStr) > -1) {
                    return tempStr;
                }
            }
            result += tempStr;
        }
        this.isConcat = false;
        return result;
    };
    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string} - Compute the CONCAT value.
     */
    BasicFormulas.prototype.ComputeCONCAT = function () {
        var range = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            range[_i] = arguments[_i];
        }
        this.isConcat = true;
        return this.ComputeCONCATENATE.apply(this, range);
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string | number} - Compute the MAX value.
     */
    BasicFormulas.prototype.ComputeMAX = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.parent.computeMinMax(args, 'max');
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string} - Compute the MIN value.
     */
    BasicFormulas.prototype.ComputeMIN = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.parent.computeMinMax(args, 'min');
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string} - Compute the RAND value.
     */
    BasicFormulas.prototype.ComputeRAND = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1 && args[0] === '') {
            args.length = 0;
        }
        if (args.length > 0) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        return Math.random().toString();
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string} - Compute the AND value.
     */
    BasicFormulas.prototype.ComputeAND = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var argArr = args;
        if (isNullOrUndefined(args) || (argArr.length === 1 && argArr[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        return this.parent.computeAndOrNot(argArr, 'and');
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string} - Compute the OR value.
     */
    BasicFormulas.prototype.ComputeOR = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var argArr = args;
        if (isNullOrUndefined(args) || (argArr.length === 1 && argArr[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        return this.parent.computeAndOrNot(argArr, 'or');
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string} - Compute the NOT value.
     */
    BasicFormulas.prototype.ComputeNOT = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var argArr = args;
        if (isNullOrUndefined(args) || (args.length > 1 || args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        return this.parent.computeAndOrNot(argArr, 'not');
    };
    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {string | number} - Compute the find value.
     */
    BasicFormulas.prototype.ComputeFIND = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(args) || args.length === 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length > 3) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var processArgs = function (actuaValue) {
            var value = _this.parent.getValueFromArg(actuaValue);
            if (errCollection.indexOf(value) > -1) {
                return value;
            }
            if (!_this.parent.isCellReference(actuaValue)) {
                if (value.split('%').length === 2 && _this.parent.isNumber(value.split('%')[0])) {
                    value = (Number(value.split('%')[0]) * 0.01).toString();
                }
                else if (actuaValue.indexOf(_this.parent.tic) > -1) {
                    if (_this.parent.removeTics(actuaValue).match(/^(\d*\.\d+|\d+)\s*[-*/]\s*(\d*\.\d+|\d+)$/)) {
                        value = _this.parent.getValueFromArg(_this.parent.removeTics(actuaValue));
                    }
                    else if (value.indexOf(_this.parent.tic + _this.parent.tic) > -1) {
                        value = value.replace(/""/g, _this.parent.tic);
                    }
                }
            }
            return value;
        };
        var findText;
        if (!isNullOrUndefined(args[0])) {
            findText = processArgs(args[0]);
            if (errCollection.indexOf(findText) > -1) {
                return findText;
            }
            else if (!this.parent.isCellReference(args[0])) {
                findText = this.parent.removeTics(findText);
            }
        }
        var withinText;
        if (!isNullOrUndefined(args[1])) {
            withinText = processArgs(args[1]);
            if (errCollection.indexOf(withinText) > -1) {
                return withinText;
            }
            else if (!this.parent.isCellReference(args[1])) {
                withinText = this.parent.removeTics(withinText);
            }
        }
        var startNum = 1;
        if (!isNullOrUndefined(args[2])) {
            startNum = processArgs(args[2]);
            if (errCollection.indexOf(startNum) > -1) {
                return startNum;
            }
            else if (startNum.toUpperCase() === this.parent.trueValue) {
                startNum = '1';
            }
            else if (startNum.toUpperCase() === this.parent.falseValue) {
                startNum = '0';
            }
            if (!this.parent.isCellReference(args[2])) {
                startNum = this.parent.removeTics(startNum);
            }
            startNum = this.parent.parseFloat(startNum);
            if (isNaN(startNum) || startNum <= 0) {
                return errCollection[CommonErrors.Value];
            }
        }
        startNum = withinText.indexOf(findText, startNum - 1);
        if (startNum < 0) {
            return errCollection[CommonErrors.Value];
        }
        return (Number(startNum) + Number(1)).toString();
    };
    /**
     * @hidden
     * @param {string[]} argArr - specify the range.
     * @returns {string | number} - Compute the index.
     */
    BasicFormulas.prototype.ComputeINDEX = function () {
        var _this = this;
        var argArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argArr[_i] = arguments[_i];
        }
        var nestedFormula;
        var value;
        var errCollection = this.parent.getErrorStrings();
        if (argArr.length && argArr[argArr.length - 1] === 'nestedFormulaTrue') {
            nestedFormula = true;
            argArr.pop();
        }
        if (isNullOrUndefined(argArr) || (argArr.length === 1 && argArr[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (argArr.length < 2 || argArr.length > 4) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        else if (argArr[0] === '') {
            return errCollection[CommonErrors.Value];
        }
        else if (argArr[0].indexOf(':') === -1) {
            return errCollection[CommonErrors.Ref];
        }
        var row;
        var col;
        var processArgs = function (actualValue) {
            if (isNullOrUndefined(actualValue) || actualValue === '') {
                return 1;
            }
            var value = _this.parent.getValueFromArg(actualValue);
            if (errCollection.indexOf(value) > -1) {
                return value;
            }
            if (value.toUpperCase() === _this.parent.trueValue) {
                value = '1';
            }
            else if (value.toUpperCase() === _this.parent.falseValue) {
                value = '0';
            }
            if (value.indexOf(_this.parent.tic) > -1) {
                value = _this.parent.removeTics(value);
                if (actualValue.indexOf(_this.parent.tic) === -1 || value.trim() === '') {
                    return errCollection[CommonErrors.Value];
                }
            }
            if (value.split('%').length === 2 && _this.parent.isNumber(value.split('%')[0])) {
                value = (Number(value.split('%')[0]) / 100).toString();
            }
            value = parseInt(Number(value).toString(), 10);
            if (isNaN(value) || value < 0) {
                return errCollection[CommonErrors.Value];
            }
            else if (value === 0) {
                value = 1;
            }
            return value;
        };
        value = argArr[0];
        row = processArgs(argArr[1]);
        if (errCollection.indexOf(row.toString()) > -1) {
            return row.toString();
        }
        col = processArgs(argArr[2]);
        if (errCollection.indexOf(col.toString()) > -1) {
            return col.toString();
        }
        var i = value.indexOf(':');
        var startRow = this.parent.rowIndex(value.substring(0, i));
        var endRow = this.parent.rowIndex(value.substring(i + 1));
        var startCol = this.parent.colIndex(value.substring(0, i));
        var endCol = this.parent.colIndex(value.substring(i + 1));
        if (row > endRow - startRow + 1 || col > endCol - startCol + 1) {
            return errCollection[CommonErrors.Ref];
        }
        row = startRow + row - 1;
        col = startCol + col - 1;
        value = this.parent.getValueFromArg(this.getSheetReference(value) + this.parent.convertAlpha(col) + row);
        if (value === '') {
            return 0;
        }
        if (nestedFormula && errCollection.indexOf(value) === -1 &&
            !this.parent.isNumber(value) && value !== this.parent.trueValue && value !== this.parent.falseValue) {
            return this.parent.tic + value + this.parent.tic;
        }
        return value;
    };
    BasicFormulas.prototype.getSheetReference = function (range) {
        return range.indexOf(this.parent.sheetToken) === 0 && range.lastIndexOf(this.parent.sheetToken) > range.indexOf(this.parent.sheetToken) ? range.substring(0, range.lastIndexOf(this.parent.sheetToken) + 1) : '';
    };
    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the if.
     */
    BasicFormulas.prototype.ComputeIFS = function () {
        var range = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            range[_i] = arguments[_i];
        }
        var argArr = range;
        if (isNullOrUndefined(range) || (argArr.length === 1 && argArr[0] === '') || argArr.length % 2 !== 0) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var condition = '';
        var result = '';
        for (var i = 0; i < argArr.length; i++) {
            condition = this.parent.getValueFromArg(argArr[i]);
            if (argArr[i] === '') {
                return this.parent.getErrorStrings()[CommonErrors.NA];
            }
            if (this.parent.getErrorStrings().indexOf(condition) > -1) {
                return condition;
            }
            if (condition !== this.parent.trueValue && condition !== this.parent.falseValue) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            if (condition === this.parent.trueValue) {
                if (this.parent.isCellReference(argArr[i + 1].split(this.parent.tic).join('')) || argArr[i + 1].includes(this.parent.arithMarker)) {
                    result = this.parent.getValueFromArg(argArr[i + 1]);
                    result = result === '' ? '0' : result;
                }
                else {
                    result = argArr[i + 1] === '' ? '0' : this.parent.getValueFromArg(argArr[i + 1]);
                    if (result.indexOf(this.parent.tic) > -1) {
                        result = result.split(this.parent.tic).join('');
                    }
                }
                i = i + 1;
                return result;
            }
            else if (condition === this.parent.falseValue) {
                i = i + 1;
            }
        }
        return this.parent.getErrorStrings()[CommonErrors.NA];
    };
    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {number | string} - Compute the count.
     */
    BasicFormulas.prototype.ComputeCOUNTA = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var isSubtotalFormula = false;
        var isAggregateComputation;
        var sheet;
        if (args.length) {
            var lastArgument = args[args.length - 1];
            if (lastArgument === 'isSubtotal') {
                isSubtotalFormula = true;
                args.pop();
            }
            else if (lastArgument === 'isAggregate') {
                sheet = this.parent.parentObject.getActiveSheet();
                isAggregateComputation = true;
                args.pop();
            }
        }
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var argArr = args;
        var cellColl;
        var result = 0;
        var cellValue;
        var value;
        var indexes;
        for (var i = 0; i < argArr.length; i++) {
            if (this.parent.isCellReference(argArr[i])) {
                if (argArr[i].indexOf(':') > -1) {
                    cellColl = this.parent.getCellCollection(argArr[i].split(this.parent.tic).join(''));
                    for (var j = 0; j < cellColl.length; j++) {
                        if (isAggregateComputation) {
                            indexes = getCellIndexes(cellColl[j]);
                            if (isHiddenRow(sheet, indexes[0]) || isHiddenCol(sheet, indexes[1])) {
                                continue;
                            }
                        }
                        cellValue = !isSubtotalFormula ? this.parent.getValueFromArg(cellColl[j]) :
                            this.parent.getValueFromArg(cellColl[j], null, null, true);
                        if (isSubtotalFormula && cellValue.includes('SUBTOTAL(')) {
                            continue;
                        }
                        if (cellValue.length > 0) {
                            result++;
                        }
                    }
                }
                else {
                    cellValue = !isSubtotalFormula ? this.parent.getValueFromArg(argArr[i]) :
                        this.parent.getValueFromArg(argArr[i], null, null, true);
                    if (isSubtotalFormula && cellValue.includes('SUBTOTAL(')) {
                        continue;
                    }
                    if (cellValue.length > 0) {
                        result++;
                    }
                }
            }
            else {
                value = this.parent.getValueFromArg(argArr[i]).split(this.parent.tic).join('');
                if (value.length > 0) {
                    result++;
                }
                else if (value.length === 0 && value.trim() === '') {
                    result++;
                }
            }
        }
        return result;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {number | string} - Compute the average.
     */
    BasicFormulas.prototype.ComputeAVERAGEA = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var argArrs = args;
        var cellCol;
        var result = 0;
        var cellValue;
        var value;
        var length = 0;
        var parseValue;
        for (var k = 0; k < argArrs.length; k++) {
            if (this.parent.isCellReference(argArrs[k])) {
                if (argArrs[k].indexOf(':') > -1) {
                    cellCol = this.parent.getCellCollection(argArrs[k].split(this.parent.tic).join(''));
                    for (var j = 0; j < cellCol.length; j++) {
                        cellValue = this.parent.getValueFromArg(cellCol[j]);
                        cellValue = this.processLogicalCellValue(cellValue);
                        if (this.parent.getErrorStrings().indexOf(cellValue) > -1) {
                            return cellValue;
                        }
                        else if (isNullOrUndefined(cellValue) || cellValue === '') {
                            continue;
                        }
                        parseValue = this.parent.parseFloat(cellValue);
                        cellValue = !isNaN(parseValue) ? parseValue : 0;
                        result += cellValue;
                        length = length + 1;
                    }
                }
                else {
                    cellValue = this.parent.getValueFromArg(argArrs[k]);
                    cellValue = this.processLogicalCellValue(cellValue);
                    if (this.parent.getErrorStrings().indexOf(cellValue) > -1) {
                        return cellValue;
                    }
                    else if (isNullOrUndefined(cellValue) || cellValue === '') {
                        continue;
                    }
                    parseValue = this.parent.parseFloat(cellValue);
                    cellValue = !isNaN(parseValue) ? parseValue : 0;
                    result += cellValue;
                    length = length + 1;
                }
            }
            else {
                if (argArrs[k].indexOf(this.parent.tic) > -1) {
                    if (isNaN(this.parent.parseFloat(argArrs[k].split(this.parent.tic).join(''))) ||
                        argArrs[k].split(this.parent.tic).join('').trim() === '') {
                        return this.parent.getErrorStrings()[CommonErrors.Value];
                    }
                }
                argArrs[k] = this.processLogicalCellValue(argArrs[k]);
                value = this.parent.getValueFromArg(argArrs[k].split(this.parent.tic).join(''));
                if (this.parent.getErrorStrings().indexOf(value) > -1) {
                    return value;
                }
                result += this.parent.parseFloat(value);
                length = length + 1;
            }
        }
        if (length === 0) {
            return this.parent.getErrorStrings()[CommonErrors.DivZero];
        }
        return result / length;
    };
    BasicFormulas.prototype.processLogicalCellValue = function (cellValue) {
        var value = cellValue;
        if (value.toUpperCase() === this.parent.trueValue) {
            value = '1';
        }
        else if (value.toUpperCase() === this.parent.falseValue) {
            value = '0';
        }
        return value;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {number | string} - Compute the count if.
     */
    BasicFormulas.prototype.ComputeSORT = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var nestedFormula;
        var isStringVal;
        if (args.length && args[args.length - 1] === 'nestedFormulaTrue') {
            nestedFormula = true;
            args.pop();
        }
        var argArr = args;
        var result;
        var values = [];
        if (isNullOrUndefined(args) || args[0] === '' || argArr.length > 4) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        argArr[1] = argArr[1] ? argArr[1] : '1';
        argArr[2] = argArr[2] ? argArr[2] : '1'; // 1 = Ascending, -1 = Descending. Default is ascending order.
        argArr[3] = argArr[3] ? argArr[3] : 'FALSE'; // Default is FALSE = sort by column or row
        argArr[0] = argArr[0].split('$').join('');
        var cellCollection;
        var valueCollection = [];
        if (argArr[0].indexOf(':') > -1) {
            var rangeSplit = argArr[0].split(':');
            if (this.parent.isCellReference(rangeSplit[0]) && this.parent.isCellReference(rangeSplit[1])) {
                var j = argArr[0].indexOf(':');
                var swap = void 0;
                var rowIdx = this.parent.rowIndex(this.parent.substring(argArr[0], 0, j));
                var colIdx = this.parent.colIndex(this.parent.substring(argArr[0], 0, j));
                var eRowIdx = this.parent.rowIndex(this.parent.substring(argArr[0], j + 1, j + argArr[0].length - j - 1));
                var eColIdx = this.parent.colIndex(this.parent.substring(argArr[0], j + 1, j + argArr[0].length - j - 1));
                if (rowIdx > eRowIdx) {
                    swap = eRowIdx;
                    eRowIdx = rowIdx;
                    rowIdx = swap;
                }
                if (colIdx > eColIdx) {
                    swap = eColIdx;
                    eColIdx = colIdx;
                    colIdx = swap;
                }
                if (this.parent.isCellReference(argArr[3])) {
                    argArr[3] = this.parent.getValueFromArg(argArr[3]).toUpperCase();
                    if (argArr[3] !== this.parent.trueValue && argArr[3] !== this.parent.falseValue) {
                        if (isNumber(argArr[3])) {
                            argArr[3] = Number(argArr[3]) === 0 ? this.parent.falseValue : this.parent.trueValue;
                        }
                        else if (argArr[3] === '') {
                            argArr[3] = this.parent.falseValue;
                        }
                        else {
                            return this.parent.getErrorStrings()[CommonErrors.Value];
                        }
                    }
                }
                else {
                    isStringVal = argArr[3].startsWith(this.parent.tic) && argArr[3].endsWith(this.parent.tic);
                    argArr[3] = this.parent.getValueFromArg(argArr[3]);
                    argArr[3] = isNumber(argArr[3]) ? (Number(argArr[3]) === 0 ? this.parent.falseValue : this.parent.trueValue) :
                        argArr[3].split(this.parent.tic).join('').toUpperCase();
                    if (argArr[3] !== this.parent.trueValue && argArr[3] !== this.parent.falseValue) {
                        return this.parent.getErrorStrings()[isStringVal ? CommonErrors.Value : CommonErrors.Name];
                    }
                }
                if (this.parent.isCellReference(argArr[2])) {
                    argArr[2] = this.parent.getValueFromArg(argArr[2]);
                    argArr[2] = argArr[2] === this.parent.trueValue ? '1' : argArr[2];
                }
                else {
                    argArr[2] = this.parent.getValueFromArg(argArr[2]);
                    argArr[2] = argArr[2] === this.parent.trueValue ? '1' : argArr[2].split(this.parent.tic).join('');
                }
                argArr[2] = isNumber(argArr[2]) ? Math.floor(Number(argArr[2])).toString() : argArr[2];
                if (argArr[2] !== '1' && argArr[2] !== '-1') {
                    return this.parent.getErrorStrings().indexOf(argArr[2]) > -1 ? this.parent.getErrorStrings()[CommonErrors.Name] :
                        this.parent.getErrorStrings()[CommonErrors.Value];
                }
                var order = argArr[2] === '1' ? 'Ascending' : 'Descending';
                if (this.parent.isCellReference(argArr[1])) {
                    argArr[1] = this.parent.getValueFromArg(argArr[1]);
                    argArr[1] = isNumber(argArr[1]) ? Math.floor(Number(argArr[1])).toString() : (argArr[1] === this.parent.trueValue ? '1'
                        : (argArr[1] === this.parent.falseValue ? '0' : argArr[1]));
                    if (!isNaN(this.parseDouble(argArr[1])) ? (this.parseDouble(argArr[1]) < 1 || (argArr[3] === this.parent.trueValue ?
                        (eRowIdx - rowIdx) + 1 < this.parseDouble(argArr[1]) : (eColIdx - colIdx) + 1 < this.parseDouble(argArr[1])))
                        : true) {
                        return this.parent.getErrorStrings()[CommonErrors.Value];
                    }
                }
                else {
                    isStringVal = argArr[1].startsWith(this.parent.tic) && argArr[1].endsWith(this.parent.tic);
                    argArr[1] = this.parent.getValueFromArg(argArr[1]);
                    argArr[1] = isNumber(argArr[1]) ? Math.floor(Number(argArr[1])).toString() : (argArr[1] === this.parent.trueValue ?
                        '1' : (argArr[1] === this.parent.falseValue ? '0' : argArr[1].split(this.parent.tic).join('')));
                    if (!isNaN(this.parseDouble(argArr[1])) ? (this.parseDouble(argArr[1]) < 1 || (argArr[3] === this.parent.trueValue ?
                        (eRowIdx - rowIdx) + 1 < this.parseDouble(argArr[1]) : (eColIdx - colIdx) + 1 < this.parseDouble(argArr[1])))
                        : isStringVal) {
                        return this.parent.getErrorStrings()[CommonErrors.Value];
                    }
                }
                var sheetIdx = '';
                if (argArr[0].indexOf('!') === 0) {
                    sheetIdx = argArr[0];
                    sheetIdx = sheetIdx.replace('!', '');
                    sheetIdx = sheetIdx.indexOf('!');
                    sheetIdx = argArr[0].substring(0, sheetIdx + 2);
                }
                argArr[0] = sheetIdx + getAlphalabel(colIdx) + rowIdx + ':' + getAlphalabel(eColIdx) + eRowIdx;
                cellCollection = this.parent.getCellCollection(argArr[0]);
                for (var i = 0; i < cellCollection.length; i++) {
                    valueCollection.push(this.parent.getValueFromArg(cellCollection[i]));
                }
                var colSort_1 = [];
                var numColl_1 = [];
                var strColl_1 = [];
                var booleanColl_1 = [];
                var emptyCellColl_1 = [];
                var totalColumn = eColIdx - colIdx + 1;
                var sortRangeValuesHandler = function (value) {
                    if (value) {
                        if (value.toUpperCase() === 'TRUE' || value.toUpperCase() === 'FALSE') {
                            booleanColl_1.push(value);
                            colSort_1.push(value);
                        }
                        else if (isNaN(_this.parseDouble(value))) {
                            strColl_1.push(value);
                            colSort_1.push(value);
                        }
                        else {
                            numColl_1.push(_this.parseDouble(value));
                            colSort_1.push(_this.parseDouble(value));
                        }
                    }
                    else if (value === '') {
                        emptyCellColl_1.push(_this.parseDouble(value).toString());
                        colSort_1.push(_this.parseDouble(value).toString());
                    }
                };
                if (argArr[3] === 'TRUE') {
                    for (var i = 0; i < totalColumn; i++) {
                        sortRangeValuesHandler(valueCollection[i + ((this.parseDouble(argArr[1]) - 1) * totalColumn)]);
                    }
                }
                if (argArr[3] === 'FALSE') {
                    for (var i = 0; i < valueCollection.length; i++) {
                        sortRangeValuesHandler(valueCollection[i * totalColumn + this.parseDouble(argArr[1]) - 1]);
                    }
                }
                var sortedNumColl = numColl_1.length > 0 ? DataUtil.sort(numColl_1, null, DataUtil.fnSort(order)) : [];
                var sortedStrColl = strColl_1.length > 0 ? DataUtil.sort(strColl_1, null, DataUtil.fnSort(order)) : [];
                var sortedBooleanColl = booleanColl_1.length > 0 ? DataUtil.sort(booleanColl_1, null, DataUtil.fnSort(order)) : [];
                var sortedVal = order === 'Ascending' ? sortedNumColl.concat(sortedStrColl, sortedBooleanColl, emptyCellColl_1) : sortedBooleanColl.concat(sortedStrColl, sortedNumColl, emptyCellColl_1);
                var id = [];
                for (var a = 0; a < sortedVal.length; a++) {
                    for (var b = 0; b < colSort_1.length; b++) {
                        if (JSON.stringify(sortedVal[a]) === JSON.stringify(colSort_1[b])) {
                            if (id.indexOf(b) === -1) {
                                id.push(b);
                            }
                        }
                    }
                }
                if (argArr[3] === 'TRUE') {
                    for (var startRow = rowIdx, rowInc = 0; startRow <= eRowIdx; startRow++, rowInc++) {
                        for (var a = 0, colInc = 0; a < id.length; a++, colInc++) {
                            var cellValue = this.parent.getValueFromArg(sheetIdx + getAlphalabel(id[a] + colIdx) + startRow);
                            if (nestedFormula && cellValue !== '') {
                                values.push(cellValue);
                                continue;
                            }
                            cellValue = cellValue === '' ? '0' : cellValue;
                            var activeCell = this.parent.actCell;
                            activeCell = activeCell.indexOf('!') > -1 ? activeCell.substring(activeCell.lastIndexOf('!') + 1) :
                                activeCell;
                            var actRowIdx = this.parent.rowIndex(activeCell);
                            var actColIdx = this.parent.colIndex(activeCell);
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            this.parent.parentObject.setValueRowCol(this.parent.getSheetID(this.parent.grid) + 1, cellValue, actRowIdx + rowInc, actColIdx + colInc);
                        }
                    }
                    result = this.parent.getValueFromArg(sheetIdx + getAlphalabel(id[0] + colIdx) + rowIdx);
                }
                if (argArr[3] === 'FALSE') {
                    for (var a = 0, rowInc = 0; a < id.length; a++, rowInc++) {
                        for (var startCol = colIdx, colInc = 0; startCol <= eColIdx; startCol++, colInc++) {
                            var value = this.parent.getValueFromArg(sheetIdx + getAlphalabel(startCol) + (id[a] + rowIdx));
                            if (nestedFormula && value !== '') {
                                values.push(value);
                                continue;
                            }
                            value = value === '' ? '0' : value;
                            var activeCell = this.parent.actCell;
                            activeCell = activeCell.indexOf('!') > -1 ? activeCell.substring(activeCell.lastIndexOf('!') + 1) :
                                activeCell;
                            var actColIdx = this.parent.colIndex(activeCell);
                            var actRowIdx = this.parent.rowIndex(activeCell);
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            this.parent.parentObject.setValueRowCol(this.parent.getSheetID(this.parent.grid) + 1, value, actRowIdx + rowInc, actColIdx + colInc);
                        }
                    }
                    result = this.parent.getValueFromArg(sheetIdx + getAlphalabel(colIdx) + (id[0] + rowIdx));
                }
            }
        }
        if (nestedFormula) {
            return values.join(',');
        }
        return result === '' ? '0' : result;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {number | string} - Compute the count if.
     */
    BasicFormulas.prototype.ComputeCOUNTIF = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var argArr = args;
        if (isNullOrUndefined(args) || args[0] === '' || argArr.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        if (argArr[0].indexOf(':') < 0 && !this.parent.isCellReference(argArr[0])) {
            return this.parent.getErrorStrings()[CommonErrors.Name];
        }
        var cellColl;
        var result = 0;
        var cellValue;
        var stack = [];
        var op = 'equal';
        if (argArr[1] === '') {
            return 0;
        }
        var isStringVal = argArr[1].startsWith(this.parent.tic) && argArr[1].endsWith(this.parent.tic);
        var condition = argArr[1].split(this.parent.tic).join('');
        var isAsterisk = condition.includes('*');
        var isAsteriskOnly = condition === '*' || condition === '<>*';
        var criteriaValue = isAsterisk && !isAsteriskOnly ? condition.replace(/\*/g, '').trim() : condition;
        var isCellReferenceValue = false;
        if (!isStringVal && this.parent.isCellReference(criteriaValue)) {
            criteriaValue = this.parent.getValueFromArg(criteriaValue);
            isCellReferenceValue = true;
        }
        if (isAsterisk && !isAsteriskOnly) {
            var asteriskIndex = condition.indexOf('*');
            if (condition[0] === '*') {
                criteriaValue = '*' + criteriaValue;
            }
            if (condition[condition.length - 1] === '*') {
                criteriaValue += '*';
            }
            if (asteriskIndex > 0 && asteriskIndex < condition.length - 1) {
                criteriaValue = condition.substring(0, asteriskIndex) + '*' + condition.substring(asteriskIndex + 1);
            }
        }
        condition = criteriaValue;
        if (condition.startsWith('<=')) {
            op = 'lessEq';
            condition = condition.substring(2);
        }
        else if (condition.startsWith('>=')) {
            op = 'greaterEq';
            condition = condition.substring(2);
        }
        else if (condition.startsWith('<>')) {
            op = 'notEq';
            condition = condition.substring(2);
        }
        else if (condition.startsWith('<')) {
            op = 'less';
            condition = condition.substring(1);
        }
        else if (condition.startsWith('>')) {
            op = 'greater';
            condition = condition.substring(1);
        }
        else if (condition.startsWith('=')) {
            op = 'equal';
            condition = condition.substring(1);
        }
        var isWildCardCondition = condition.indexOf('*') > -1 || condition.indexOf('?') > -1;
        if ((!isStringVal && this.parent.isCellReference(condition) && !isCellReferenceValue) || condition.includes(this.parent.arithMarker)
            || (condition.includes(this.parent.getParseDecimalSeparator()) && !isWildCardCondition)) {
            condition = this.parent.getValueFromArg(condition);
        }
        if (argArr[0].indexOf(':') > -1 && this.parent.isCellReference(argArr[0])) {
            cellColl = this.parent.getCellCollection(argArr[0].split(this.parent.tic).join(''));
            for (var j = 0; j < cellColl.length; j++) {
                cellValue = this.parent.getValueFromArg(cellColl[j]);
                if (isWildCardCondition) {
                    cellValue = this.parent.findWildCardValue(condition.toLowerCase(), cellValue.toLowerCase());
                }
                stack.push(cellValue);
                stack.push(condition);
                if (this.parent.processLogical(stack, op) === this.parent.trueValue) {
                    result++;
                }
            }
        }
        return result;
    };
    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the sum if.
     */
    BasicFormulas.prototype.ComputeSUMIFS = function () {
        var range = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            range[_i] = arguments[_i];
        }
        var sum = this.calculateIFS(range);
        return sum;
    };
    BasicFormulas.prototype.calculateIFS = function (ranges, isAvgIfs) {
        var _this = this;
        if (isNullOrUndefined(ranges) || ranges[0] === '' || ranges.length < 2 || ranges.length > 127) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        if (ranges.length === 3) { // SUMIFS and AVERAGEIFS OR operation will contains only 3 arguments.
            if (ranges[2].includes(this.parent.tic + this.parent.tic)) {
                var result_1 = '';
                var sumVal_1;
                var separator_1 = this.parent.getParseArgumentSeparator();
                var criterias = ranges[2].split(this.parent.tic + this.parent.tic);
                criterias.forEach(function (criteria) {
                    criteria = criteria.trim().split(_this.parent.tic).join('');
                    if (criteria) {
                        sumVal_1 = _this.parent.computeIfsFormulas([ranges[0], ranges[1], criteria], _this.parent.falseValue, isAvgIfs).toString();
                        result_1 += (result_1 ? separator_1 : '') + sumVal_1;
                    }
                });
                return result_1;
            }
        }
        return this.parent.computeIfsFormulas(ranges, this.parent.falseValue, isAvgIfs);
    };
    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {string | number} - Compute the Text.
     */
    BasicFormulas.prototype.ComputeTEXT = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var nestedFormula;
        if (args.length && args[args.length - 1] === 'nestedFormulaTrue') {
            nestedFormula = true;
            args.pop();
        }
        var argsLength = args.length;
        var firstArg = args[0];
        var secondArg = args[1];
        if (argsLength !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var s1 = firstArg;
        var s2 = secondArg;
        if (secondArg === '') {
            return this.parent.getValueFromArg(s1);
        }
        var dTime = new Date(1900, 0, 1, 0, 0, 0);
        var checkString = s1 + ',' + s2;
        var intl = new Internationalization();
        if (this.parent.getErrorStrings().indexOf(checkString) > -1) {
            return checkString;
        }
        s1 = this.parent.getValueFromArg(s1);
        if (isNumber(s1.split(this.parent.tic).join(''))) {
            s1 = s1.split(this.parent.tic).join('');
        }
        if (secondArg.startsWith('"') && secondArg.endsWith('"')) {
            s2 = s2.split(this.parent.tic).join('');
        }
        else {
            s2 = this.parent.getValueFromArg(s2);
        }
        if (s2 === '') {
            return '';
        }
        if (s1 === '' && (s2.length > 0 && (s2.toUpperCase().indexOf('M') > -1 || s2.toUpperCase().indexOf('D') > -1
            || s2.toUpperCase().indexOf('Y') > -1 || s2.toUpperCase().indexOf('S') > -1 || s2.toUpperCase().indexOf('T') > -1)
            || s2.toUpperCase().indexOf('H') > -1)) {
            s1 = dTime.toString();
        }
        var d = this.parseDouble(s1);
        if (isNaN(d) && this.parent.isDate(new Date(s1)) !== null) {
            d = this.parent.toOADate(new Date(s1));
        }
        dTime = Date.parse(s1.split(this.parent.tic).join(''));
        if (!isNaN(d) || !isNaN(dTime)) {
            if (s2.length > 0 && s2.indexOf('#') === -1 && (s2.toUpperCase().indexOf('M') > -1 || s2.toUpperCase().indexOf('D') > -1
                || s2.toUpperCase().indexOf('Y') > -1 || s2.toUpperCase().indexOf('S') > -1 || s2.toUpperCase().indexOf('T') > -1)
                || s2.toUpperCase().indexOf('H') > -1) {
                s2 = s2.split('Y').join('y').split('D').join('d').split('H').join('h');
                s2 = s2.split('S').join('s').split('m').join('M').split('AM/PM').join('tt');
                var formatChar = s2.split('');
                var isH = false;
                var isMFound = false;
                var i = 0;
                // let mcount: number = 0;
                var lastCharIndex = 0;
                var totalCharforM = 0;
                for (i = 0; i < formatChar.length;) {
                    var c = formatChar[i];
                    if (c === 's' && formatChar[lastCharIndex] === 'M') {
                        formatChar[lastCharIndex] = 'm';
                        if (formatChar[lastCharIndex - 1] === 'M') {
                            formatChar[lastCharIndex - 1] = 'm';
                        }
                    }
                    if (this.parent.isChar(c)) {
                        lastCharIndex = i;
                        if (c === 'M') {
                            // mcount++;
                            totalCharforM++;
                        }
                    }
                    else if (totalCharforM > 1) {
                        totalCharforM++;
                    }
                    if (c === 'M' && isH) {
                        formatChar[i] = 'm';
                        isMFound = true;
                    }
                    if (c === 'h') {
                        isH = true;
                    }
                    else if (this.parent.isChar(c) && c !== 'M' && c !== 'h' && !isMFound) {
                        isH = false;
                        isMFound = false;
                    }
                    i++;
                }
                s2 = String(formatChar);
                s2 = s2.split(',').join('').split('\n').join(' ');
                var dt = this.parent.fromOADate(d);
                if (d === 0) {
                    dt = dTime;
                }
                var getSkeleton = getSkeletonVal(s2);
                if (getSkeleton === '') {
                    var date = dateToInt(dt);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var dateString = this.parent.parentObject.getDisplayText({ format: s2, value: date });
                    return dateString;
                }
                var dFormatter = intl.getDateFormat({ skeleton: getSkeleton, type: 'date' });
                var formattedString = dFormatter(new Date(dt.toString()));
                s1 = formattedString;
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                s1 = this.parent.parentObject.getDisplayText({ format: s2, value: d });
            }
        }
        return nestedFormula ? this.parent.tic + s1 + this.parent.tic : s1;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {number | string} - Compute the count if.
     */
    BasicFormulas.prototype.ComputeCOUNTIFS = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var sum = this.parent.computeIfsFormulas(args, this.parent.trueValue);
        return sum;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {number | string} - Compute the Average if.
     */
    BasicFormulas.prototype.ComputeAVERAGEIFS = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var sum = this.calculateIFS(args, this.parent.trueValue);
        return sum;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {string | number} - Compute the Match.
     */
    BasicFormulas.prototype.ComputeMATCH = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var argArr = args.slice();
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(argArr) || (argArr.length === 1 && argArr[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (argArr.length < 2 || argArr.length > 3) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        // args[0] codes
        argArr[0] = this.parent.getValueFromArg(args[0]);
        var isStringValue = argArr[0].indexOf(this.parent.tic) > -1;
        argArr[0] = argArr[0].split(this.parent.tic).join('');
        if (errCollection.indexOf(argArr[0]) > -1) {
            return argArr[0];
        }
        if (argArr[0] === '') {
            return errCollection[CommonErrors.NA];
        }
        if (isNaN(Number(argArr[0]))) {
            isStringValue = true;
        }
        // args[2] codes
        var matchType;
        if (isNullOrUndefined(args[2])) {
            argArr[2] = '1';
        }
        else {
            argArr[2] = this.parent.getValueFromArg(argArr[2]);
            if ((argArr[2].indexOf(this.parent.tic) > -1) && isNaN(Number(argArr[2].split(this.parent.tic).join('')))) {
                return errCollection[CommonErrors.Value];
            }
            if (argArr[2].toUpperCase() === this.parent.trueValue) {
                argArr[2] = '1';
            }
            else if (argArr[2].toUpperCase() === this.parent.falseValue) {
                argArr[2] = '0';
            }
        }
        matchType = parseFloat(argArr[2]);
        if ([-1, 0, 1].indexOf(matchType) === -1) {
            matchType = 0;
        }
        // args[1] codes
        var valueCollection = [];
        var cellCollection;
        var isStringCollection = false;
        if (argArr[1].indexOf(':') > -1 || this.parent.isCellReference(argArr[1])) {
            cellCollection = this.parent.getCellCollection(argArr[1]);
            for (var j = 0; j < cellCollection.length; j++) {
                var cellValue = this.parent.getValueFromArg(cellCollection[j]);
                if (cellValue.indexOf(this.parent.tic) > -1 || isNaN(Number(cellValue))) {
                    isStringCollection = true;
                }
                valueCollection[j] = cellValue.split(this.parent.tic).join('');
            }
            if ((isStringValue && !isStringCollection) || (!isStringValue && isStringCollection)) {
                return errCollection[CommonErrors.NA];
            }
        }
        var index = 0;
        var indexVal = '';
        var isIndexFound = false;
        var matchValue = !isNaN(Number(argArr[0])) ? Number(argArr[0]) : argArr[0];
        for (var i = 0; i < valueCollection.length; i++) {
            if (valueCollection[i] === '') {
                if (i === (valueCollection.length - 1)) {
                    valueCollection.pop();
                }
                continue;
            }
            else if (matchType === -1 && (isStringValue || isStringCollection)) {
                break;
            }
            var matchCollectionValue = !isNaN(Number(valueCollection[i])) ?
                Number(valueCollection[i]) : valueCollection[i];
            if (matchType === 1) {
                if (matchValue === matchCollectionValue) {
                    index = i + 1;
                    isIndexFound = true;
                    if (isNaN(Number(argArr[0]))) {
                        isStringValue = false;
                    }
                }
                else if ((matchValue > matchCollectionValue) && !isStringValue && !isIndexFound) {
                    if (!indexVal || (matchCollectionValue > (!isNaN(Number(indexVal)) ? Number(indexVal) : indexVal))) {
                        index = i + 1;
                        indexVal = valueCollection[i];
                    }
                }
            }
            else if (matchType === 0) {
                if (argArr[0].indexOf('*') > -1 || argArr[0].indexOf('?') > -1) {
                    valueCollection[i] = this.parent.findWildCardValue(argArr[0], valueCollection[i]);
                }
                if (argArr[0] === valueCollection[i]) {
                    return i + 1;
                }
            }
            else if (matchType === -1) {
                if ((Number(valueCollection[i]) > Number(valueCollection[i + 1]))
                    || i === valueCollection.length - 1) {
                    if (matchValue === matchCollectionValue) {
                        index = i + 1;
                        matchValue = undefined;
                    }
                    else if (matchValue < matchCollectionValue) {
                        if (!indexVal || (matchCollectionValue < (!isNaN(Number(indexVal)) ? Number(indexVal) : indexVal))) {
                            index = i + 1;
                            indexVal = valueCollection[i];
                        }
                    }
                }
                else {
                    return errCollection[CommonErrors.NA];
                }
            }
        }
        if (isStringValue && isStringCollection && matchType === 1) {
            return valueCollection.length;
        }
        return index ? index : errCollection[CommonErrors.NA];
    };
    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the lookup value.
     */
    BasicFormulas.prototype.ComputeLOOKUP = function () {
        var range = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            range[_i] = arguments[_i];
        }
        var argArr = range;
        if (isNullOrUndefined(argArr) || (argArr.length === 1 && argArr[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        return this.parent.computeLookup(argArr);
    };
    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the vlookup value.
     */
    BasicFormulas.prototype.ComputeVLOOKUP = function () {
        var range = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            range[_i] = arguments[_i];
        }
        var argArr = range;
        return this.parent.computeVHLookup(argArr, true);
    };
    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the hlookup value.
     */
    BasicFormulas.prototype.ComputeHLOOKUP = function () {
        var range = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            range[_i] = arguments[_i];
        }
        var argArr = range;
        return this.parent.computeVHLookup(argArr);
    };
    /**
     * @hidden
     * @param {string[]} argArr - specify the range.
     * @returns {string | number} - Compute the sub total value.
     */
    BasicFormulas.prototype.ComputeSUBTOTAL = function () {
        var argArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argArr[_i] = arguments[_i];
        }
        var value;
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(argArr) || (argArr.length === 1 && argArr[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (argArr.length < 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        value = this.parent.getValueFromArg(argArr[0]).trim();
        if (errCollection.indexOf(value) > -1) {
            return value;
        }
        if (value.split(this.parent.tic).join('').trim() === '') {
            return errCollection[CommonErrors.Value];
        }
        if (!this.parent.isCellReference(argArr[0])) {
            value = this.parent.removeTics(value);
        }
        if (value.toUpperCase() === this.parent.trueValue) {
            value = '1';
        }
        else if (value.toUpperCase() === this.parent.falseValue) {
            value = '0';
        }
        else if (value.split('%').length === 2 && this.parent.isNumber(value.split('%')[0])) {
            value = (Number(value.split('%')[0]) / 100).toString();
        }
        value = this.parent.parseFloat(value);
        if (isNaN(value) || ((1 > value || value > 11) && (101 > value || value > 111))) {
            return errCollection[CommonErrors.Value];
        }
        var cellRef = argArr.slice(1, argArr.length);
        switch (value) {
            case 1:
            case 101:
                value = this.ComputeAVERAGE.apply(this, cellRef.concat(['isSubtotal']));
                break;
            case 2:
            case 102:
                value = this.ComputeCOUNT.apply(this, cellRef.concat(['isSubtotal']));
                break;
            case 3:
            case 103:
                value = this.ComputeCOUNTA.apply(this, cellRef.concat(['isSubtotal']));
                break;
            case 4:
            case 104:
                value = this.ComputeMAX.apply(this, cellRef.concat(['isSubtotal']));
                break;
            case 5:
            case 105:
                value = this.ComputeMIN.apply(this, cellRef.concat(['isSubtotal']));
                break;
            case 6:
            case 106:
                value = this.ComputePRODUCT.apply(this, cellRef.concat(['isSubtotal']));
                break;
            case 7:
            case 107:
                value = this.ComputeDAY.apply(this, cellRef);
                break;
            case 8:
            case 108:
                value = this.ComputeCONCAT.apply(this, cellRef);
                break;
            case 9:
            case 109:
                value = this.ComputeSUM.apply(this, cellRef.concat(['isSubtotal']));
                break;
            case 10:
            case 110:
                value = this.ComputeAVERAGEA.apply(this, cellRef);
                break;
            case 11:
            case 111:
                value = this.ComputeABS.apply(this, cellRef);
                break;
            default:
                value = errCollection[CommonErrors.Value];
                break;
        }
        return value;
    };
    /**
     * @hidden
     * @param {string[]} argValue - specify the range.
     * @returns {string | number} - Compute the Radians value.
     */
    BasicFormulas.prototype.ComputeRADIANS = function () {
        var argValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argValue[_i] = arguments[_i];
        }
        var value;
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(argValue) || (argValue[0] === '' && argValue.length === 1) ||
            (argValue[0].split('!').length === 2 && argValue[0].indexOf(this.parent.tic) === -1)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (argValue.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        else if (argValue[0].indexOf(':') > -1 || argValue[0].split(this.parent.tic).join('').trim() === '' ||
            argValue[0].split(this.parent.tic).join('').trim() === '!' || argValue[0].split('!').length === 2) {
            return errCollection[CommonErrors.Value];
        }
        value = this.parent.getValueFromArg(argValue[0]).trim();
        if (errCollection.indexOf(value) > -1) {
            return value;
        }
        if ((value.indexOf(this.parent.tic) > -1 && argValue[0].indexOf(this.parent.tic) === -1) ||
            value.split(this.parent.tic).length > 3) {
            return errCollection[CommonErrors.Value];
        }
        if (value.toUpperCase() === this.parent.trueValue) {
            value = '1';
        }
        else if (value.toUpperCase() === this.parent.falseValue) {
            value = '0';
        }
        else if (value.split('%').length === 2 && this.parent.isNumber(value.split('%')[0])) {
            value = (Number(value.split('%')[0]) / 100).toString();
        }
        value = this.parent.parseFloat(value.split(this.parent.tic).join(''));
        if (!isNaN(value)) {
            value = Math.PI * (value) / 180;
        }
        else {
            if (this.parent.isCellReference(argValue[0]) || argValue[0].indexOf(this.parent.tic) > -1) {
                return errCollection[CommonErrors.Value];
            }
            else {
                return errCollection[CommonErrors.Name];
            }
        }
        return value;
    };
    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {string | number} - Compute the random between value.
     */
    BasicFormulas.prototype.ComputeRANDBETWEEN = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var min;
        var max;
        if (args.length === 1 && args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (args.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var errCollection = this.parent.getErrorStrings();
        var processArgs = function (orgValue) {
            var actualValue;
            actualValue = _this.parent.getValueFromArg(orgValue);
            if (errCollection.indexOf(actualValue) > -1) {
                return actualValue;
            }
            if (_this.parent.isCellReference(orgValue)) {
                if (actualValue === '') {
                    actualValue = '0';
                }
                else if (orgValue.indexOf(':') > -1 || actualValue.match(/^(\d*\.\d+|\d+)\s*[+\-*/]\s*(\d*\.\d+|\d+)$/)) {
                    return errCollection[CommonErrors.Value];
                }
            }
            else {
                if (actualValue === '') {
                    return errCollection[CommonErrors.NA];
                }
                else if (orgValue.indexOf(_this.parent.tic) > -1 && _this.parent.removeTics(orgValue).match(/^(\d*\.\d+|\d+)\s*[+*]\s*(\d*\.\d+|\d+)$/)) {
                    return errCollection[CommonErrors.Value];
                }
                else if (actualValue.indexOf(_this.parent.tic) > -1) {
                    actualValue = _this.parent.removeTics(actualValue);
                    if (actualValue.indexOf(':') > -1) {
                        var values = actualValue.split(':');
                        if (values.length <= 3) {
                            if (!_this.parent.isNumber(values[0]) || !_this.parent.isNumber(values[1])) {
                                return errCollection[CommonErrors.Value];
                            }
                            var hours = Number(values[0]) + Number((Number(values[1]) / 60));
                            if (values.length === 3) {
                                if (!_this.parent.isNumber(values[2])) {
                                    return errCollection[CommonErrors.Value];
                                }
                                hours += Number(Number(values[2]) / 3600);
                            }
                            actualValue = (hours / 24).toString();
                        }
                        else {
                            return errCollection[CommonErrors.Value];
                        }
                    }
                }
                if (actualValue.split('%').length === 2 && _this.parent.isNumber(actualValue.split('%')[0])) {
                    actualValue = (Number(actualValue.split('%')[0]) * 0.01).toString();
                }
            }
            actualValue = parseFloat(actualValue);
            if (isNaN(actualValue)) {
                return errCollection[CommonErrors.Value];
            }
            return actualValue;
        };
        max = processArgs(args[1]);
        if (errCollection.indexOf(max) > -1) {
            return max;
        }
        min = processArgs(args[0]);
        if (errCollection.indexOf(min) > -1) {
            return min;
        }
        if (min === 0 && max === 0) {
            return '0';
        }
        else if (max < min) {
            return errCollection[CommonErrors.Num];
        }
        else {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor((Math.random() * ((max - min) + 1)) + min);
        }
    };
    /**
     * @hidden
     * @param {string[]} argValue - specify the range.
     * @returns {string | number} - Compute the slope value.
     */
    BasicFormulas.prototype.ComputeSLOPE = function () {
        var _this = this;
        var argValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argValue[_i] = arguments[_i];
        }
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(argValue) || (argValue.length === 1 && argValue[0].trim() === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (argValue.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        else if (argValue[0] === '' || argValue[1] === '') {
            return errCollection[CommonErrors.Value];
        }
        var cellCollection = function (actuaValue) {
            if (actuaValue.indexOf(_this.parent.tic) === -1) {
                actuaValue = _this.parent.getCellCollection(actuaValue.split(_this.parent.tic).join(''));
            }
            else {
                actuaValue = undefined;
            }
            return actuaValue;
        };
        var yPoints = cellCollection(argValue[0].trim());
        var xPoints = cellCollection(argValue[1].trim());
        if (isNullOrUndefined(yPoints) || isNullOrUndefined(xPoints) || (yPoints.length < 2 && xPoints.length < 2)) {
            return errCollection[CommonErrors.DivZero];
        }
        else if (yPoints.length !== xPoints.length) {
            return errCollection[CommonErrors.NA];
        }
        var dataCollection = function (actuaValue) {
            actuaValue = _this.getDataCollection(actuaValue);
            for (var b = 0; b < actuaValue.length; b++) {
                if (errCollection.indexOf(actuaValue[b]) > -1) {
                    return actuaValue[b].toString();
                }
            }
            return actuaValue;
        };
        yPoints = dataCollection(yPoints);
        if (errCollection.indexOf(yPoints.toString()) > -1) {
            return yPoints.toString();
        }
        xPoints = dataCollection(xPoints);
        if (errCollection.indexOf(xPoints.toString()) > -1) {
            return xPoints.toString();
        }
        var sumXY = 0;
        var sumX2 = 0;
        var sumX = 0;
        var sumY = 0;
        var length = 0;
        for (var i = 0, len = xPoints.length; i < len; ++i) {
            if ((xPoints[i] !== '' && Number(xPoints[i]).toString() !== 'NaN') &&
                (yPoints[i] !== '' && Number(yPoints[i]).toString() !== 'NaN')) {
                sumXY += Number(xPoints[i]) * Number(yPoints[i]);
                sumX += Number(xPoints[i]);
                sumY += Number(yPoints[i]);
                sumX2 += Number(xPoints[i]) * Number(xPoints[i]);
                length++;
            }
        }
        var value = ((sumXY - (sumX * sumY) / length) / (sumX2 - (sumX * sumX) / length)).toString();
        if (value === 'NaN') {
            return errCollection[CommonErrors.DivZero];
        }
        return value;
    };
    /**
     * @hidden
     * @param {string[]} argValue - specify the range.
     * @returns {string | number} - Compute the intercept.
     */
    BasicFormulas.prototype.ComputeINTERCEPT = function () {
        var _this = this;
        var argValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argValue[_i] = arguments[_i];
        }
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(argValue) || (argValue.length === 1 && argValue[0].trim() === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (argValue.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        else if (argValue[0] === '' || argValue[1] === '') {
            return errCollection[CommonErrors.Value];
        }
        var cellCollection = function (actuaValue) {
            if (actuaValue.indexOf(_this.parent.tic) === -1) {
                actuaValue = _this.parent.getCellCollection(actuaValue.split(_this.parent.tic).join(''));
            }
            else {
                actuaValue = undefined;
            }
            return actuaValue;
        };
        var yValues = cellCollection(argValue[0].trim());
        var xValues = cellCollection(argValue[1].trim());
        if (isNullOrUndefined(yValues) || isNullOrUndefined(xValues) || (yValues.length < 2 && xValues.length < 2)) {
            return errCollection[CommonErrors.DivZero];
        }
        else if (yValues.length !== xValues.length) {
            return errCollection[CommonErrors.NA];
        }
        var dataCollection = function (actuaValue) {
            actuaValue = _this.getDataCollection(actuaValue);
            for (var b = 0; b < actuaValue.length; b++) {
                if (errCollection.indexOf(actuaValue[b]) > -1) {
                    return actuaValue[b];
                }
            }
            return actuaValue;
        };
        yValues = dataCollection(yValues);
        if (errCollection.indexOf(yValues.toString()) > -1) {
            return yValues.toString();
        }
        xValues = dataCollection(xValues);
        if (errCollection.indexOf(xValues.toString()) > -1) {
            return xValues.toString();
        }
        var sumY = 0;
        var sumX = 0;
        var length = 0;
        var sumXY = 0;
        var sumX2 = 0;
        var diff;
        var calculation = function (isSum) {
            for (var i = 0, len = xValues.length; i < len; ++i) {
                if ((yValues[i] !== '' && Number(yValues[i]).toString() !== 'NaN') &&
                    (xValues[i] !== '' && Number(xValues[i]).toString() !== 'NaN')) {
                    if (isSum) {
                        sumY += Number(yValues[i]);
                        sumX += Number(xValues[i]);
                        length++;
                    }
                    else {
                        diff = Number(xValues[i]) - sumX;
                        sumXY += diff * (Number(yValues[i]) - sumY);
                        sumX2 += diff * diff;
                    }
                }
            }
        };
        calculation(true);
        sumY = sumY / length;
        sumX = sumX / length;
        calculation(false);
        var value = (sumY - sumXY / sumX2 * sumX).toString();
        if (value === 'NaN') {
            return errCollection[CommonErrors.DivZero];
        }
        return value;
    };
    /**
     * @hidden
     * @param {string[]} logValue - specify the log value.
     * @returns {string | number} - Compute the value.
     */
    BasicFormulas.prototype.ComputeLN = function () {
        var logValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            logValue[_i] = arguments[_i];
        }
        var cellvalue;
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(logValue) || (logValue[0] === '' && logValue.length === 1)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (logValue.length === 0 || logValue.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        cellvalue = this.parent.getValueFromArg(logValue[0]);
        if (errCollection.indexOf(cellvalue) > -1) {
            return cellvalue;
        }
        if (cellvalue.toUpperCase() === this.parent.trueValue) {
            cellvalue = '1';
        }
        else if (cellvalue.toUpperCase() === this.parent.falseValue) {
            cellvalue = '0';
        }
        if (!this.parent.isCellReference(logValue[0])) {
            cellvalue = this.parent.removeTics(cellvalue);
            if (cellvalue.trim() === '') {
                return errCollection[CommonErrors.Value];
            }
        }
        if (cellvalue.split('%').length === 2 && this.parent.isNumber(cellvalue.split('%')[0])) {
            cellvalue = (Number(cellvalue.split('%')[0]) * 0.01).toString();
        }
        cellvalue = this.parent.parseFloat(cellvalue);
        if (cellvalue <= 0) {
            return errCollection[CommonErrors.Num];
        }
        else if (isNaN(cellvalue)) {
            return errCollection[CommonErrors.Value];
        }
        return Math.log(cellvalue);
    };
    /**
     * @hidden
     * @param {string[]} logValue - specify the log value.
     * @returns {boolean | string} - Compute the Isnumber value.
     */
    BasicFormulas.prototype.ComputeISNUMBER = function () {
        var logValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            logValue[_i] = arguments[_i];
        }
        var argArr = logValue;
        if (logValue.length === 1 && logValue[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (logValue.length !== 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var orgValue = (this.parent.isCellReference(argArr[0])) ? this.parent.getValueFromArg(argArr[0]) :
            this.parent.getValueFromArg(argArr[0].split(this.parent.tic).join(''));
        if (orgValue.toString() === '' || logValue.toString().startsWith(this.parent.tic)) {
            return false;
        }
        var logVal = this.parent.parseFloat(orgValue);
        return !isNaN(logVal) ? true : false;
    };
    /**
     * @hidden
     * @param {string[]} logValue - specify the log value.
     * @returns {number | string} - Compute the round value.
     */
    BasicFormulas.prototype.ComputeROUND = function () {
        var logValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            logValue[_i] = arguments[_i];
        }
        if (!logValue.length || logValue.length === 1 || logValue.length > 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var argArr = logValue;
        if (logValue.length === 1) {
            var orgValue = (argArr[0].split(this.parent.tic).join('') === 'TRUE')
                ? '1'
                : (argArr[0].split(this.parent.tic).join('') === 'FALSE')
                    ? '0'
                    : argArr[0];
            if (isNaN(this.parent.parseFloat(orgValue))) {
                return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
            }
            return Math.round(this.parent.parseFloat(orgValue)).toString();
        }
        var numStr = this.parent.getValueFromArg(argArr[0]);
        if (this.parent.getErrorStrings().indexOf(numStr) > -1) {
            return numStr;
        }
        var digStr = this.parent.getValueFromArg(argArr[1]);
        if (this.parent.getErrorStrings().indexOf(digStr) > -1) {
            return digStr;
        }
        numStr = numStr === 'TRUE' ? '1' : numStr === 'FALSE' ? '0' : numStr;
        digStr = digStr === 'TRUE' ? '1' : digStr === 'FALSE' ? '0' : digStr;
        numStr = numStr.split(this.parent.tic).join('');
        digStr = digStr.split(this.parent.tic).join('');
        var isInvalidNumStr = isNaN(Number(numStr)) || numStr.trim() === '';
        var isInvalidDigStr = isNaN(Number(digStr)) || digStr.trim() === '';
        if (((argArr[0].indexOf('"') > -1 || this.parent.isCellReference(argArr[0])) && isInvalidNumStr)
            || ((argArr[1].indexOf('"') > -1 || this.parent.isCellReference(argArr[1])) && isInvalidDigStr)) {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        if ((numStr === '' && digStr === '') || numStr === '') {
            return 0;
        }
        var x = this.parent.parseFloat(numStr);
        var digits = this.parent.parseFloat(digStr);
        var round;
        if (!isNaN(digits) && !isNaN(x) && digits > 0) {
            round = this.parent.parseFloat(this.preciseRound(x, digits, 'ROUND'));
        }
        else {
            var mult = Math.pow(10, -digits);
            round = Math.round(x / mult) * mult;
        }
        return round.toString();
    };
    BasicFormulas.prototype.preciseRound = function (numValue, decimalValue, formula) {
        var factor = Math.pow(10, decimalValue);
        var absValue = Math.abs(numValue) * factor;
        var sign = numValue >= 0 ? 1 : -1;
        var result = formula === 'ROUND' ? Math.round(absValue) : formula === 'ROUNDDOWN' ?
            Math.floor(absValue) : Math.ceil(absValue);
        return (sign * (result / factor)).toFixed(decimalValue);
    };
    /**
     * @hidden
     * @param {string[]} argArr - specify the log value.
     * @returns {boolean | string} - Compute the power value.
     */
    BasicFormulas.prototype.ComputePOWER = function () {
        var _this = this;
        var argArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argArr[_i] = arguments[_i];
        }
        var power;
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(argArr) || (argArr.length === 1 && argArr[0].trim() === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (argArr.length > 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        else if (argArr[0].trim() === '' && argArr[1].trim() === '') {
            return errCollection[CommonErrors.Num];
        }
        var processArgs = function (actualValue) {
            var value = _this.parent.getValueFromArg(actualValue);
            if (errCollection.indexOf(value) > -1) {
                return value;
            }
            if (value.toUpperCase() === _this.parent.trueValue) {
                value = '1';
            }
            else if (value.toUpperCase() === _this.parent.falseValue) {
                value = '0';
            }
            if (value.indexOf(_this.parent.tic) > -1) {
                value = _this.parent.removeTics(value);
                if (actualValue.indexOf(_this.parent.tic) === -1 || value.trim() === '') {
                    return errCollection[CommonErrors.Value];
                }
            }
            if (value.split('%').length === 2 && _this.parent.isNumber(value.split('%')[0])) {
                value = (Number(value.split('%')[0]) / 100).toString();
            }
            else if (value.indexOf('/') > -1 && _this.parent.isNumber(value.split('/').join(''))) {
                return errCollection[CommonErrors.Num];
            }
            value = _this.parent.parseFloat(value);
            if (isNaN(value)) {
                return errCollection[CommonErrors.Value];
            }
            return value;
        };
        var numValue = processArgs(argArr[0]);
        if (errCollection.indexOf(numValue) > -1) {
            return numValue;
        }
        var powValue = processArgs(argArr[1]);
        if (errCollection.indexOf(powValue) > -1) {
            return powValue;
        }
        if (!isNaN(numValue) && !isNaN(powValue)) {
            if (numValue === 0 && powValue < 0) {
                return errCollection[CommonErrors.DivZero];
            }
            if (numValue === 0 && powValue === 0) {
                return errCollection[CommonErrors.Num];
            }
            power = Math.pow(numValue, powValue);
            if (isNaN(power) || power === Infinity) {
                return errCollection[CommonErrors.Num];
            }
        }
        else {
            return errCollection[CommonErrors.Value];
        }
        return power.toString();
    };
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {number | string} - Computes a positive square root of the given number.
     */
    BasicFormulas.prototype.ComputeSQRT = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var sqrtValue;
        var arrValue = args[0];
        if (args.length === 0 || args.length > 1 || arrValue === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        else if (arrValue.split(this.parent.tic).join('').trim() === '') {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        if (this.parent.isCellReference(arrValue)) {
            sqrtValue = this.parent.getValueFromArg(arrValue) || '0';
            if (sqrtValue.indexOf(this.parent.tic) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            if (arrValue.indexOf(this.parent.tic) > -1 && (arrValue.split(this.parent.tic).join('') === this.parent.trueValue ||
                arrValue.split(this.parent.tic).join('') === this.parent.falseValue)) {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
            sqrtValue = this.parent.getValueFromArg(arrValue).split(this.parent.tic).join('');
        }
        if (this.parent.getErrorStrings().indexOf(sqrtValue) > -1) {
            return sqrtValue;
        }
        sqrtValue = sqrtValue === this.parent.trueValue ? '1' : sqrtValue === this.parent.falseValue ? '0' : sqrtValue;
        if (this.parent.parseFloat(sqrtValue) < 0) {
            return this.parent.getErrorStrings()[CommonErrors.Num];
        }
        else if (isNaN(this.parent.parseFloat(sqrtValue))) {
            var dateTimeCheck = { value: sqrtValue };
            this.parent.parentObject.notify(checkDateFormat, dateTimeCheck);
            if (dateTimeCheck.isDate || dateTimeCheck.isTime) {
                sqrtValue = dateTimeCheck.updatedVal;
            }
            else {
                return this.parent.getErrorStrings()[CommonErrors.Value];
            }
        }
        return Math.sqrt(this.parent.parseFloat(sqrtValue));
    };
    /**
     * @hidden
     * @param {string[]} logValue - specify the log value.
     * @returns {number | string} - Compute the log value.
     */
    BasicFormulas.prototype.ComputeLOG = function () {
        var _this = this;
        var logValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            logValue[_i] = arguments[_i];
        }
        var orgNumValue;
        var orgBaseValue;
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(logValue) || (logValue.length === 1 && logValue[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (logValue.length > 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var processArgs = function (orgValue) {
            var actualValue = _this.parent.getValueFromArg(orgValue);
            if (actualValue === _this.parent.trueValue) {
                actualValue = '1';
            }
            else if (actualValue === _this.parent.falseValue) {
                actualValue = '0';
            }
            if (!_this.parent.isCellReference(orgValue) && actualValue !== '') {
                if (actualValue.indexOf(_this.parent.tic) > -1 && errCollection.indexOf(actualValue.split(_this.parent.tic).join('')) === -1) {
                    actualValue = _this.parent.removeTics(actualValue);
                    if (actualValue.trim() === '') {
                        return errCollection[CommonErrors.Value];
                    }
                    else if (actualValue.indexOf(':') > -1) {
                        var values = actualValue.split(':');
                        if (values.length <= 3) {
                            if (!_this.parent.isNumber(values[0]) || !_this.parent.isNumber(values[1])) {
                                return errCollection[CommonErrors.Value];
                            }
                            var hours = Number(values[0]) + Number((Number(values[1]) / 60));
                            if (values.length === 3) {
                                if (!_this.parent.isNumber(values[2])) {
                                    return errCollection[CommonErrors.Value];
                                }
                                hours += Number(Number(values[2]) / 3600);
                            }
                            actualValue = (hours / 24).toString();
                        }
                        else {
                            return errCollection[CommonErrors.Value];
                        }
                    }
                }
                if (actualValue.split('%').length === 2 && _this.parent.isNumber(actualValue.split('%')[0])) {
                    actualValue = (Number(actualValue.split('%')[0]) * 0.01).toString();
                }
            }
            return actualValue;
        };
        if (!isNullOrUndefined(logValue[0])) {
            orgNumValue = processArgs(logValue[0]);
            if (errCollection.indexOf(orgNumValue) > -1) {
                return orgNumValue;
            }
            orgNumValue = this.parent.parseFloat(orgNumValue);
        }
        orgBaseValue = 10;
        if (!isNullOrUndefined(logValue[1])) {
            orgBaseValue = processArgs(logValue[1]);
            if (errCollection.indexOf(orgBaseValue) > -1) {
                return orgBaseValue;
            }
            orgBaseValue = this.parent.parseFloat(orgBaseValue);
        }
        orgNumValue = Number(orgNumValue);
        if (isNaN(orgNumValue) || isNaN(orgBaseValue)) {
            return errCollection[CommonErrors.Value];
        }
        else if (orgNumValue <= 0 || orgBaseValue <= 0) {
            return errCollection[CommonErrors.Num];
        }
        else if (orgBaseValue === 1) {
            return errCollection[CommonErrors.DivZero];
        }
        return ((Math.log(orgNumValue) / Math.LN10) / (Math.log(orgBaseValue) / Math.LN10)).toString();
    };
    /**
     * @hidden
     * @param {string[]} logValue - specify the log value.
     * @returns {boolean | string} - Compute the trunc value.
     */
    BasicFormulas.prototype.ComputeTRUNC = function () {
        var _this = this;
        var logValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            logValue[_i] = arguments[_i];
        }
        var orgNumValue;
        var orgDigitValue = 0;
        var errCollection = this.parent.getErrorStrings();
        if (isNullOrUndefined(logValue) || (logValue[0] === '' && logValue.length === 1)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (logValue.length === 0 || logValue.length > 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var processArgs = function (orgValue) {
            var actualValue = _this.parent.getValueFromArg(orgValue);
            if (errCollection.indexOf(actualValue) > -1) {
                return actualValue;
            }
            if (actualValue === _this.parent.trueValue) {
                actualValue = '1';
            }
            else if (actualValue === _this.parent.falseValue) {
                actualValue = '0';
            }
            else if (!_this.parent.isCellReference(orgValue)) {
                if (orgValue.indexOf(_this.parent.tic) > -1 && _this.parent.removeTics(orgValue).match(/^(\d*\.\d+|\d+)\s*[*]\s*(\d*\.\d+|\d+)$/)) {
                    actualValue = _this.parent.getValueFromArg(_this.parent.removeTics(orgValue));
                }
                else if (actualValue.indexOf(_this.parent.tic) > -1) {
                    actualValue = _this.parent.removeTics(actualValue);
                    if (actualValue.trim() === '') {
                        return errCollection[CommonErrors.Value];
                    }
                    else if (actualValue.indexOf(':') > -1) {
                        var values = actualValue.split(':');
                        if (values.length <= 3) {
                            if (!_this.parent.isNumber(values[0]) || !_this.parent.isNumber(values[1])) {
                                return errCollection[CommonErrors.Value];
                            }
                            var hours = Number(values[0]) + Number((Number(values[1]) / 60));
                            if (values.length === 3) {
                                if (!_this.parent.isNumber(values[2])) {
                                    return errCollection[CommonErrors.Value];
                                }
                                hours += Number(Number(values[2]) / 3600);
                            }
                            actualValue = (hours / 24).toString();
                        }
                        else {
                            return errCollection[CommonErrors.Value];
                        }
                    }
                }
                if (actualValue.split('%').length === 2 && _this.parent.isNumber(actualValue.split('%')[0])) {
                    actualValue = (Number(actualValue.split('%')[0]) * 0.01).toString();
                }
            }
            return actualValue;
        };
        if (!isNullOrUndefined(logValue[0])) {
            orgNumValue = processArgs(logValue[0]);
            if (errCollection.indexOf(orgNumValue) > -1) {
                return orgNumValue;
            }
            orgNumValue = this.parent.parseFloat(orgNumValue);
            if (isNaN(orgNumValue)) {
                return errCollection[CommonErrors.Value];
            }
        }
        if (!isNullOrUndefined(logValue[1])) {
            orgDigitValue = processArgs(logValue[1]);
            if (errCollection.indexOf(orgDigitValue) > -1) {
                return orgDigitValue;
            }
            orgDigitValue = this.parent.parseFloat(orgDigitValue);
            if (isNaN(orgDigitValue)) {
                return errCollection[CommonErrors.Value];
            }
        }
        orgDigitValue = Math.pow(10, Math.floor(orgDigitValue));
        orgNumValue = Number(orgNumValue);
        return ((orgNumValue < 0 ? -1 : 1) * Math.floor(orgDigitValue * Math.abs(orgNumValue)) / orgDigitValue).toString();
    };
    /**
     * @hidden
     * @param {string[]} logValue - specify the log value.
     * @returns {boolean | string} - Compute the expression.
     */
    BasicFormulas.prototype.ComputeEXP = function () {
        var logValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            logValue[_i] = arguments[_i];
        }
        var orgNumValue;
        var errCollection = this.parent.getErrorStrings();
        if (logValue[0] === '' && logValue.length === 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidArguments];
        }
        else if (logValue.length !== 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        else if (logValue[0].split(this.parent.tic).join('').trim() === '') {
            return errCollection[CommonErrors.Value];
        }
        orgNumValue = this.parent.getValueFromArg(logValue[0]);
        if (errCollection.indexOf(orgNumValue) > -1) {
            return orgNumValue;
        }
        if (orgNumValue.indexOf(this.parent.tic) > -1 && (this.parent.isCellReference(logValue[0]) ||
            isNaN(Number(orgNumValue.split(this.parent.tic).join(''))))) {
            return errCollection[CommonErrors.Value];
        }
        orgNumValue = orgNumValue.split(this.parent.tic).join('');
        if (orgNumValue === this.parent.trueValue) {
            orgNumValue = '1';
        }
        else if ((orgNumValue === this.parent.falseValue) || (orgNumValue === '')) {
            orgNumValue = '0';
        }
        else if (orgNumValue.indexOf('%') > -1) {
            orgNumValue = (Number(orgNumValue.split('%')[0]) / 100).toString();
        }
        else if (orgNumValue.indexOf(':') > -1) {
            return '0';
        }
        var logNumValue = this.parent.parseFloat(orgNumValue);
        if (isNaN(logNumValue)) {
            return errCollection[CommonErrors.Value];
        }
        else if (logNumValue > 709) {
            return errCollection[CommonErrors.Num];
        }
        return Math.exp(logNumValue).toString();
    };
    /**
     * @hidden
     * @param {string[]} logValue - specify the log value
     * @returns {boolean | string} - compute the value.
     */
    BasicFormulas.prototype.ComputeGEOMEAN = function () {
        var logValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            logValue[_i] = arguments[_i];
        }
        var argArr = logValue;
        var sum = 1;
        var count = 0;
        var cellVal = 0;
        var cellStr = 0;
        var dev;
        var r;
        var s;
        var cell;
        if (logValue.length === 0) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        if (argArr.length === 1 && argArr[0] === '') {
            return sum.toString();
        }
        var isBoolean;
        for (r = 0; r < argArr.length; r++) {
            if (argArr[r].indexOf(':') > -1) {
                if (argArr[0] === this.parent.tic) {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
                cell = this.parent.getCellCollection(argArr[r].split(this.parent.tic).join(''));
                for (s = 0; s < cell.length; s++) {
                    cellVal = this.parent.getValueFromArg(cell[s]);
                    cellStr = cellVal.split(this.parent.tic).join('');
                    isBoolean = cellStr === this.parent.trueValue || cellStr === this.parent.falseValue;
                    dev = this.parent.parseFloat(cellVal);
                    if (dev <= 0) {
                        return this.parent.getErrorStrings()[CommonErrors.Num];
                    }
                    if (isBoolean || this.parent.getErrorStrings().indexOf(cellVal) > -1) {
                        continue;
                    }
                    else if (!isNaN(dev)) {
                        count++;
                        sum = sum * dev;
                    }
                }
            }
            else {
                cellVal = this.parent.getValueFromArg(argArr[r]);
                if (this.parent.getErrorStrings().indexOf(cellVal) > -1) {
                    return cellVal;
                }
                var cellStr_1 = cellVal.split(this.parent.tic).join('');
                if (cellVal.indexOf('"') > -1 && isNaN(this.parent.parseFloat(cellStr_1))) {
                    return this.parent.getErrorStrings()[CommonErrors.Value];
                }
                argArr[r] = argArr[r].startsWith('n') ? argArr[r].slice(1) : argArr[r];
                if ((cellVal === '' && argArr[r] === '')) {
                    return this.parent.getErrorStrings()[CommonErrors.Num];
                }
                if ((cellStr_1 === 'TRUE' || cellStr_1 === 'FALSE') && this.parent.isCellReference(argArr[r])) {
                    continue;
                }
                if (cellVal.length > 0) {
                    cellVal = cellVal.indexOf('"') > -1 ? cellStr_1 : cellVal;
                    cellVal = (cellVal.split(this.parent.tic).join('') === 'TRUE') ? '1' :
                        (cellVal.split(this.parent.tic).join('') === 'FALSE') ? '0' : cellVal;
                    if (!this.parent.isCellReference(argArr[r])) {
                        if (isNaN(this.parent.parseFloat(cellVal))) {
                            return this.parent.getErrorStrings()[CommonErrors.Value];
                        }
                    }
                    dev = this.parent.parseFloat(cellVal);
                    if (dev <= 0) {
                        return this.parent.getErrorStrings()[CommonErrors.Num];
                    }
                    else if (!isNaN(dev)) {
                        count++;
                        sum = sum * dev;
                    }
                }
            }
        }
        if (count > 0) {
            sum = Math.pow(sum, 1 / count);
        }
        return sum.toString();
    };
    /**
     * @hidden
     * @param {string[]} range - specify the args.
     * @returns {number | string} - Returns the square of the Pearson product moment correlation coefficient based on data points in known_y's and known_x's.
     */
    BasicFormulas.prototype.ComputeRSQ = function () {
        var range = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            range[_i] = arguments[_i];
        }
        var validCount = 0;
        var argArr = range;
        if (argArr.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        if (argArr[0] === '' || argArr[1] === '') {
            return this.parent.getErrorStrings()[CommonErrors.Value];
        }
        if (argArr[0].includes('"') || argArr[1].includes('"')) {
            return this.parent.getErrorStrings()[CommonErrors.NA];
        }
        if ((argArr[0].indexOf(':') === -1 && isCellReference(argArr[0])) && (argArr[1].indexOf(':') === -1 && isCellReference(argArr[1]))) {
            return this.parent.getErrorStrings()[CommonErrors.DivZero];
        }
        var yValuesRange = this.parent.getCellCollection(argArr[0]);
        var xValuesRange = this.parent.getCellCollection(argArr[1]);
        if ((yValuesRange.length !== xValuesRange.length)) {
            return this.parent.getErrorStrings()[CommonErrors.NA];
        }
        var xValues = this.getDataCollection(xValuesRange);
        for (var a = 0; a < xValues.length; a++) {
            if (this.parent.getErrorStrings().indexOf(xValues[a]) > -1) {
                return xValues[a];
            }
        }
        var yValues = this.getDataCollection(yValuesRange);
        for (var b = 0; b < yValues.length; b++) {
            if (this.parent.getErrorStrings().indexOf(yValues[b]) > -1) {
                return yValues[b];
            }
        }
        var xValue;
        var yValue;
        for (var i = 0; i < xValues.length; i++) {
            xValue = Number(xValues[i]);
            yValue = Number(yValues[i]);
            if (isNumber(xValue) && isNumber(yValue)) {
                validCount++;
            }
        }
        if (validCount <= 1) {
            return this.parent.getErrorStrings()[CommonErrors.DivZero];
        }
        if (validCount === 2) {
            return 1;
        }
        var meanArray = this.getMeanArray(xValues, yValues);
        var meanX = meanArray[0];
        var meanY = meanArray[1];
        var correlation = this.getCorrelation(xValues, yValues, meanX, meanY);
        return Math.pow(correlation, 2);
    };
    /**
     * @hidden
     * @param {string[]} xValues - specify the x values
     * @param {string[]} yValues - specify the y values
     * @param {number} meanX - specify the mean of x values
     * @param {number} meanY - specify the mean of y values
     * @returns {number} - Returns correlation value
     */
    BasicFormulas.prototype.getCorrelation = function (xValues, yValues, meanX, meanY) {
        var numerator = 0;
        var denominatorX = 0;
        var denominatorY = 0;
        var diffY;
        var diffX;
        for (var i = 0; i < xValues.length; i++) {
            if (isNumber(xValues[i]) && isNumber(yValues[i])) {
                diffX = Number(xValues[i]) - meanX;
                diffY = Number(yValues[i]) - meanY;
                numerator += diffX * diffY;
                denominatorX += Math.pow(diffX, 2);
                denominatorY += Math.pow(diffY, 2);
            }
        }
        var correlation = numerator / Math.sqrt(denominatorX * denominatorY);
        return correlation;
    };
    /**
     * @hidden
     * @param {string[]} xValues - specify the x values
     * @param {string[]} yValues - specify the y values
     * @returns {number[]} meanX - returns array of mean values of x and y values
     */
    BasicFormulas.prototype.getMeanArray = function (xValues, yValues) {
        var count = 0;
        var sumX = 0;
        var sumY = 0;
        var meanX = 0;
        var meanY = 0;
        for (var i = 0; i < xValues.length; i++) {
            if (isNumber(xValues[i]) && isNumber(yValues[i])) {
                sumX += Number(xValues[i]);
                sumY += Number(yValues[i]);
                count++;
            }
        }
        meanX = sumX / count;
        meanY = sumY / count;
        return [meanX, meanY];
    };
    BasicFormulas.prototype.getDataCollection = function (cells) {
        var cellsData = [];
        for (var i = 0, len = cells.length; i < len; i++) {
            cellsData.push(this.parent.getValueFromArg(cells[i]));
        }
        return cellsData;
    };
    /**
     * @hidden
     * @param {string} value - specify the value
     * @returns {number} - Returns parse double value.
     */
    BasicFormulas.prototype.parseDouble = function (value) {
        var val = this.parent.parseFloat(value.toString());
        return !isNaN(val) ? val : NaN;
    };
    /**
     * @hidden
     * @param {string} value - specify the value
     * @returns {string} - Returns spreadsheet display text.
     */
    BasicFormulas.prototype.spreadsheetDisplayText = function (value) {
        // eslint-disable-next-line
        if (this.parent.parentObject && this.parent.parentObject.element && this.parent.parentObject.element.classList.contains('e-spreadsheet') && this.parent.isCellReference(value)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var indexes = this.parent.parentObject.getIndexes(value);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value = this.parent.parentObject.getDisplayText(this.parent.parentObject.
                getActiveSheet().rows[indexes.startIdx].cells[indexes.endIdx]);
        }
        return value;
    };
    /**
     * @hidden
     * @param {string} value - specify the value
     * @returns {string} - Returns spreadsheet format.
     */
    BasicFormulas.prototype.spreadsheetFormat = function (value) {
        // eslint-disable-next-line
        if (this.parent.parentObject && this.parent.parentObject.element && this.parent.parentObject.element.classList.contains('e-spreadsheet') && this.parent.isCellReference(value)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var index = this.parent.parentObject.getIndexes(value);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value = this.parent.parentObject.getActiveSheet().rows[index.startIdx].cells[index.endIdx].format;
        }
        return value;
    };
    return BasicFormulas;
}());
export { BasicFormulas };
