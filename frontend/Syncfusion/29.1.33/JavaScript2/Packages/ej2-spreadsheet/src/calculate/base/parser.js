import { FormulaError } from './index';
import { CommonErrors, FormulasErrorsStrings, isExternalFileLink } from '../common/index';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
var Parser = /** @class */ (function () {
    function Parser(parent) {
        this.emptyStr = '';
        this.storedStringText = this.emptyStr;
        this.sheetToken = '!';
        /** @hidden */
        this.tokenAdd = 'a';
        /** @hidden */
        this.tokenSubtract = 's';
        /** @hidden */
        this.tokenMultiply = 'm';
        /** @hidden */
        this.tokenDivide = 'd';
        /** @hidden */
        this.tokenLess = 'l';
        this.charEm = 'r';
        this.charEp = 'x';
        /** @hidden */
        this.tokenGreater = 'g';
        /** @hidden */
        this.tokenEqual = 'e';
        /** @hidden */
        this.tokenLessEq = 'k';
        /** @hidden */
        this.tokenGreaterEq = 'j';
        /** @hidden */
        this.tokenNotEqual = 'o';
        /** @hidden */
        this.tokenAnd = 'c';
        this.tokenEm = 'v';
        this.tokenEp = 't';
        /** @hidden */
        this.tokenOr = String.fromCharCode(126);
        this.charAnd = 'i';
        this.charLess = '<';
        this.charGreater = '>';
        this.charEqual = '=';
        this.charLessEq = 'f';
        this.charGreaterEq = 'h';
        this.charNoEqual = 'z';
        this.stringGreaterEq = '>=';
        this.stringLessEq = '<=';
        this.stringNoEqual = '<>';
        this.stringAnd = '&';
        this.stringOr = '^';
        this.charOr = 'w';
        this.charAdd = '+';
        this.charSubtract = '-';
        this.charMultiply = '*';
        this.charDivide = '/';
        this.fixedReference = '$';
        this.spaceString = ' ';
        this.ignoreBracet = false;
        /** @hidden */
        this.isError = false;
        /** @hidden */
        this.isFormulaParsed = false;
        this.findNamedRange = false;
        this.stringsColl = new Map();
        this.tokens = [
            this.tokenAdd, this.tokenSubtract, this.tokenMultiply, this.tokenDivide, this.tokenLess,
            this.tokenGreater, this.tokenEqual, this.tokenLessEq, this.tokenGreaterEq, this.tokenNotEqual, this.tokenAnd, this.tokenOr
        ];
        this.charNOTop = String.fromCharCode(167);
        this.specialSym = ['~', '@', '#', '?'];
        this.isFailureTriggered = false;
        this.parent = parent;
    }
    /**
     * @hidden
     * @param {string} text - specify the text
     * @param {string} fkey - specify the formula key
     * @returns {string} - returns parse.
     */
    Parser.prototype.parse = function (text, fkey) {
        var _this = this;
        if (this.parent.isTextEmpty(text)) {
            return text;
        }
        if (isExternalFileLink(text)) {
            return this.parent.getErrorStrings()[CommonErrors.Ref];
        }
        if (this.parent.getFormulaCharacter() !== String.fromCharCode(0) && this.parent.getFormulaCharacter() === text[0]) {
            text = text.substring(1);
        }
        if (this.parent.namedRanges.size > 0 || this.parent.storedData.size > 0) {
            text = this.checkForNamedRangeAndKeyValue(text);
            this.findNamedRange = false;
        }
        text = text.replace(/[-+*/&^]+/g, function (operators) {
            var firstOp = '';
            while (1 < operators.length) {
                switch (operators.substring(0, 2)) {
                    case '++':
                        operators = '+' + operators.substring(2);
                        break;
                    case '--':
                        operators = '+' + operators.substring(2);
                        break;
                    case '+-':
                        operators = '-' + operators.substring(2);
                        break;
                    case '-+':
                        operators = '-' + operators.substring(2);
                        break;
                    case '*+':
                        operators = '*' + operators.substring(2);
                        break;
                    case '/+':
                        operators = '/' + operators.substring(2);
                        break;
                    case '^+':
                        operators = '^' + operators.substring(2);
                        break;
                    case '&+':
                        operators = '&' + operators.substring(2);
                        break;
                    case '*-':
                    case '/-':
                    case '^-':
                    case '&-':
                        firstOp = operators.substring(0, 1);
                        operators = operators.substring(1);
                        break;
                    default:
                        throw new FormulaError(_this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidExpression], true);
                }
            }
            return firstOp + operators;
        });
        text = text.split('-' + '(' + '-').join('(');
        var formulaString = this.storeStrings(text);
        text = this.storedStringText;
        var i = 0;
        if (isNullOrUndefined(formulaString)) {
            text = text.split(' ').join('');
        }
        text = text.split('=>').join('>=');
        text = text.split('=<').join('<=');
        if (text[text.length - 1] !== this.parent.arithMarker || this.indexOfAny(text, this.tokens) !== (text.length - 2)) {
            text = text.toUpperCase();
        }
        if (text.indexOf(this.sheetToken) > -1) {
            var family = this.parent.getSheetFamilyItem(this.parent.grid);
            if (family.sheetNameToParentObject != null && family.sheetNameToParentObject.size > 0) {
                if (text[0] !== this.sheetToken.toString()) {
                    text = this.parent.setTokensForSheets(text);
                }
                var sheetToken = this.parent.getSheetToken(text.split(this.parent.tic).join(this.emptyStr));
                var scopedRange = this.checkScopedRange(text.split('"').join(this.emptyStr).split(this.sheetToken).join(''));
                if (isNullOrUndefined(sheetToken) && sheetToken !== '' && this.parent.namedRanges.size > 0 && scopedRange !== '') {
                    text = scopedRange;
                }
            }
        }
        text = this.markLibraryFormulas(text);
        try {
            text = this.formulaAutoCorrection(text);
        }
        catch (ex) {
            var args = {
                message: ex.message, exception: ex, isForceCalculable: ex.formulaCorrection,
                computeForceCalculate: false
            };
            if (!args.isForceCalculable) {
                throw this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidExpression];
            }
            if (!this.isFailureTriggered) {
                this.parent.trigger('onFailure', args);
                this.isFailureTriggered = true;
            }
            if (args.isForceCalculable && args.computeForceCalculate) {
                text = this.formulaAutoCorrection(text, args);
                this.parent.storedData.get(fkey).formulaText = '=' + text;
            }
            else {
                throw this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidExpression];
            }
        }
        if (!this.ignoreBracet) {
            i = text.indexOf(')');
            while (i > -1) {
                var k = text.substring(0, i).lastIndexOf('(');
                if (k === -1) {
                    throw new FormulaError(this.parent.formulaErrorStrings[FormulasErrorsStrings.MismatchedParentheses]);
                }
                if (k === i - 1) {
                    throw new FormulaError(this.parent.formulaErrorStrings[FormulasErrorsStrings.EmptyExpression]);
                }
                var s = this.emptyStr;
                if (this.ignoreBracet) {
                    s = this.parent.substring(text, k, i - k + 1);
                }
                else {
                    s = this.parent.substring(text, k + 1, i - k - 1);
                }
                try {
                    text = text.substring(0, k) + this.parseSimple(s) + text.substring(i + 1);
                }
                catch (ex) {
                    if (ex === this.parent.formulaErrorStrings[FormulasErrorsStrings.CircularReference]) {
                        throw ex;
                    }
                    var args = this.exceptionArgs(ex);
                    if (!this.isFailureTriggered) {
                        this.parent.trigger('onFailure', args);
                        this.isFailureTriggered = true;
                    }
                    var errorMessage = (typeof args.exception === 'string') ? args.exception : args.message;
                    return (this.parent.getErrorLine(ex) ? '' : '#' + this.parent.getErrorLine(ex) + ': ') + errorMessage;
                }
                i = text.indexOf(')');
            }
        }
        if (!this.ignoreBracet && text.indexOf('(') > -1) {
            throw new FormulaError(this.parent.formulaErrorStrings[FormulasErrorsStrings.MismatchedParentheses]);
        }
        text = this.parseSimple(text);
        if (formulaString !== null && formulaString.size > 0) {
            text = this.setStrings(text, formulaString);
        }
        return text;
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Parser.prototype.exceptionArgs = function (ex) {
        return {
            message: ex.message, exception: ex, isForceCalculable: ex.formulaCorrection,
            computeForceCalculate: false
        };
    };
    Parser.prototype.formulaAutoCorrection = function (formula, args) {
        var arithemeticArr = ['*', '+', '-', '/', '^', '&'];
        var logicalSym = ['>', '=', '<'];
        var i = 0;
        var form = '';
        var op = '';
        var firstOp = '';
        var secondprevOp = '';
        var secondnextOp = '';
        var firstDigit = '';
        var secondDigit = '';
        var countDigit = 0;
        if (this.parent.formulaErrorStrings.indexOf(formula) > -1) {
            return formula;
        }
        else {
            if (this.indexOfAny(formula, this.specialSym) > -1) {
                throw new FormulaError(this.parent.formulaErrorStrings[FormulasErrorsStrings.InvalidExpression], false);
            }
            while (i < formula.length) {
                formula = formula.split('-*').join('-').split('/*').join('/').split('*/').join('*').split('-/').join('-').
                    split('*+').join('*').split('+*').join('+');
                if ((this.parent.isDigit(formula[i]) && ((formula.length > i + 1)
                    && (this.indexOfAny(formula[i + 1], arithemeticArr) > -1)) && ((formula.length > i + 2)
                    && (!isNullOrUndefined(formula[i + 2]) && this.indexOfAny(formula[i + 2], arithemeticArr) > -1))) &&
                    (formula[i + 2] !== '-' || (formula[i + 1] !== '*' && formula[i + 1] !== '/' && formula[i + 1] !== '^' && formula[i + 1] !== '&'))) {
                    if (args && args.computeForceCalculate) {
                        if (this.parent.isDigit(formula[i])) {
                            if (countDigit < 1) {
                                firstDigit = formula[i];
                                firstOp = formula[i + 1];
                                if (isNullOrUndefined(firstOp)) {
                                    firstOp = this.emptyStr;
                                }
                                firstOp = firstOp === '&' ? '' : firstOp;
                                countDigit = countDigit + 1;
                                form = form + firstDigit + firstOp;
                            }
                            else if (countDigit < 2) {
                                secondDigit = formula[i];
                                secondprevOp = formula[i - 1];
                                secondnextOp = formula[i + 1];
                                countDigit = 0;
                                if (secondprevOp === '-') {
                                    secondnextOp = isNullOrUndefined(secondnextOp) ? this.emptyStr : secondnextOp;
                                    secondnextOp = secondnextOp === '&' ? '' : secondnextOp;
                                    form = form + secondprevOp + secondDigit + secondnextOp;
                                }
                                else {
                                    secondnextOp = isNullOrUndefined(secondnextOp) ? this.emptyStr : secondnextOp;
                                    form = form + secondDigit + secondnextOp;
                                }
                            }
                            i = i + 2;
                        }
                        else {
                            form = (formula[i] === '-') ? form + formula[i] : form;
                            i = i + 1;
                        }
                    }
                    else {
                        throw this.parent.formulaErrorStrings[FormulasErrorsStrings.ImproperFormula];
                    }
                }
                else if ((this.parent.isDigit(formula[i]) || formula[i] === this.parent.rightBracket ||
                    this.parent.storedData.has(formula[i].toUpperCase())) && (isNullOrUndefined(formula[i + 1]) ||
                    this.indexOfAny(formula[i + 1], arithemeticArr) > -1)) {
                    op = isNullOrUndefined(formula[i + 1]) ? this.emptyStr : formula[i + 1];
                    op = op === '&' && formula[i + 2] !== '-' ? '' : op; // for the cases 5&3=>53 and 5&-3=>5-3.
                    form = formula[i - 1] === '-' ? form + formula[i - 1] + formula[i] + op : form + formula[i] + op;
                    i = i + 2;
                }
                else if (this.indexOfAny(formula[i], logicalSym) > -1 && !isNullOrUndefined(formula[i - 1]) &&
                    !isNullOrUndefined(formula[i + 1])) {
                    form = form + formula[i];
                    i = i + 1;
                }
                else if (formula[i] === 'q') {
                    while (formula[i] !== this.parent.leftBracket) {
                        form = form + formula[i];
                        i = i + 1;
                    }
                }
                else if (formula[i] === this.parent.leftBracket || formula[i] === this.parent.rightBracket ||
                    formula[i] === '{' || formula[i] === '}' || formula[i] === '(' ||
                    formula[i] === ')') {
                    form = form + formula[i];
                    i = i + 1;
                }
                else if (this.parent.isUpperChar(formula[i]) || formula[i].indexOf(':') > -1 || formula[i]
                    === this.parent.getParseArgumentSeparator() || (formula[i] === '%' && this.parent.isDigit(formula[i - 1]))) {
                    form = form + formula[i];
                    i = i + 1;
                }
                else if (formula[i] === this.parent.tic || formula[i] === ' ' || formula[i] ===
                    this.parent.getParseDecimalSeparator() || formula[i] === this.sheetToken || formula[i] === '$' ||
                    formula[i] === '_') {
                    form = form + formula[i];
                    i = i + 1;
                }
                else {
                    if (this.parent.isDigit(formula[i])) {
                        form = formula[i - 1] === '-' ? form + formula[i - 1] + formula[i] : form + formula[i];
                    }
                    if (formula[i] === '-' || formula[i] === '+') {
                        form = form + formula[i];
                        form = form.split('++').join('+').split('+-').join('-').split('-+').join('-');
                    }
                    if (formula[i] === '/' || formula[i] === '*' || formula[i] === '^') {
                        form = form + formula[i];
                    }
                    i = i + 1;
                }
            }
        }
        form = form === this.emptyStr ? formula : form;
        if (this.indexOfAny(form[form.length - 1], arithemeticArr) > -1) {
            form = form.substring(0, form.length - 1);
        }
        form = form.split('--').join('-').split('-+').join('-').split('+-').join('-');
        return form;
    };
    Parser.prototype.checkScopedRange = function (text) {
        var _this = this;
        var scopedRange = this.emptyStr;
        var b = 'NaN';
        var id = this.parent.getSheetID(this.parent.grid);
        var sheet = this.parent.getSheetFamilyItem(this.parent.grid);
        if (text[0] === this.sheetToken.toString()) {
            var i = text.indexOf(this.sheetToken, 1);
            var v = parseInt(text.substr(1, i - 1), 10);
            if (i > 1 && !this.parent.isNaN(v)) {
                text = text.substring(i + 1);
                id = v;
            }
        }
        var token = '!' + id.toString();
        if (sheet === null || sheet.sheetNameToToken == null) {
            return b;
        }
        sheet.sheetNameToToken.forEach(function (value, key) {
            if (sheet.sheetNameToToken.get(key).toString() === token + '!') {
                var s_1 = _this.emptyStr;
                _this.parent.namedRanges.forEach(function (value, key) {
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    if (!isNullOrUndefined(_this.parent.parentObject)) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        s_1 = _this.parent.parentObject.getActiveSheet().name + _this.sheetToken + text.toUpperCase();
                    }
                    else {
                        s_1 = sheet.sheetNameToToken.get(key).toUpperCase();
                    }
                    if (_this.parent.getNamedRanges().has(s_1)) {
                        scopedRange = (_this.parent.getNamedRanges().get(s_1)).toUpperCase();
                        b = scopedRange;
                    }
                });
            }
        });
        return b;
    };
    Parser.prototype.storeStrings = function (tempString) {
        var i = 0;
        var j = 0;
        var id = 0;
        var key = '';
        var storedString = null;
        var condition;
        var ticLoc = tempString.indexOf(this.parent.tic);
        if (ticLoc > -1) {
            i = tempString.indexOf(this.parent.tic);
            while (i > -1 && tempString.length > 0) {
                if (storedString === null) {
                    storedString = this.stringsColl;
                }
                j = i + 1 < tempString.length ? tempString.indexOf(this.parent.tic, i + 1) : -1;
                if (j === -1) {
                    throw new FormulaError(this.parent.formulaErrorStrings[FormulasErrorsStrings.MismatchedTics]);
                }
                condition = this.parent.substring(tempString, i, j - i + 1);
                key = this.parent.tic + this.spaceString + id.toString() + this.parent.tic;
                storedString = storedString.set(key, condition);
                tempString = tempString.substring(0, i) + key + tempString.substring(j + 1);
                i = i + key.length;
                if (i <= tempString.length) {
                    i = tempString.indexOf(this.parent.tic, i);
                }
                id++;
            }
        }
        this.storedStringText = tempString;
        return storedString;
    };
    Parser.prototype.setStrings = function (text, formulaString) {
        for (var i = 0; i < formulaString.size; i++) {
            formulaString.forEach(function (value, key) {
                text = text.split(key).join(value);
            });
        }
        return text;
    };
    /**
     * @hidden
     * @param {string} formulaText - specify the formula text
     * @returns {string} - parse simple.
     */
    Parser.prototype.parseSimple = function (formulaText) {
        var needToContinue = true;
        var text = formulaText;
        if (text.length > 0 && text[0] === '+') {
            text = text.substring(1);
        }
        if (text === '#DIV/0!') {
            return '#DIV/0!';
        }
        if (text === '#NAME?') {
            return '#NAME?';
        }
        if (text === '') {
            return text;
        }
        if (this.parent.formulaErrorStrings.indexOf(text) > -1) {
            return text;
        }
        text = text.split(this.stringLessEq).join(this.charLessEq);
        text = text.split(this.stringGreaterEq).join(this.charGreaterEq);
        text = text.split(this.stringNoEqual).join(this.charNoEqual);
        text = text.split(this.stringAnd).join(this.charAnd);
        text = text.split(this.stringOr).join(this.charOr);
        text = text.split(this.fixedReference).join(this.emptyStr);
        needToContinue = true;
        var expTokenArray = [this.tokenEp, this.tokenEm];
        var mulTokenArray = [this.tokenMultiply, this.tokenDivide];
        var addTokenArray = [this.tokenAdd, this.tokenSubtract];
        var mulCharArray = [this.charMultiply, this.charDivide];
        var addCharArray = [this.charAdd, this.charSubtract];
        var compareTokenArray = [this.tokenLess, this.tokenGreater, this.tokenEqual, this.tokenLessEq,
            this.tokenGreaterEq, this.tokenNotEqual];
        var compareCharArray = [this.charLess, this.charGreater, this.charEqual, this.charLessEq,
            this.charGreaterEq, this.charNoEqual];
        var expCharArray = [this.charEp, this.charEm];
        var andTokenArray = [this.tokenAnd];
        var andCharArray = [this.charAnd];
        var orCharArray = [this.charOr];
        var orTokenArray = [this.tokenOr];
        text = this.parseSimpleOperators(text, expTokenArray, expCharArray);
        text = this.parseSimpleOperators(text, orTokenArray, orCharArray);
        if (needToContinue) {
            text = this.parseSimpleOperators(text, mulTokenArray, mulCharArray);
        }
        if (needToContinue) {
            text = this.parseSimpleOperators(text, addTokenArray, addCharArray);
        }
        if (needToContinue) {
            text = this.parseSimpleOperators(text, compareTokenArray, compareCharArray);
        }
        if (needToContinue) {
            text = this.parseSimpleOperators(text, andTokenArray, andCharArray);
        }
        return text;
    };
    /**
     * @hidden
     * @param {string} formulaText - specify the formula text
     * @param {string[]} markers -  specify the markers
     * @param {string[]} operators - specify the operators
     * @returns {string} - parse Simple Operators
     */
    Parser.prototype.parseSimpleOperators = function (formulaText, markers, operators) {
        if (this.parent.getErrorStrings().indexOf(formulaText) > -1) {
            return formulaText;
        }
        var text = formulaText;
        var i = 0;
        var op = '';
        for (var c = 0; c < operators.length; c++) {
            op = op + operators[c];
        }
        text = text.split('---').join('-').split('--').join('+').split(this.parent.getParseArgumentSeparator() + '-').join(this.parent.getParseArgumentSeparator() + 'u').split(this.parent.leftBracket + '-').join(this.parent.leftBracket + 'u').split('=-').join('=u');
        text = text.split(',+').join(',').split(this.parent.leftBracket + '+').join(this.parent.leftBracket).split('=+').join('=').split('>+').join('>').split('<+').join('<').split('/+').join('/').split('*+').join('*').split('++').join('+').split('*-').join('*u').split('/-').join('/u').split('w-').join('wu').split('i-').join('iu').toString();
        text = text.split('>-').join('>u').split('<-').join('<u').split('h-').join('hu').split('f-').join('fu').split('z-').join('zu');
        if (text.length > 0 && text[0] === '-') {
            text = text.substring(1).split('-').join(this.tokenOr);
            text = '0-' + text;
            text = this.parseSimpleOperators(text, [this.tokenSubtract], [this.charSubtract]);
            text = text.split(this.tokenOr).join('-');
        }
        else if (text.length > 0 && text[0] === '+') {
            text = text.substring(1);
        }
        else if (text.length > 0 && text[text.length - 1] === '+') {
            text = text.substring(0, text.length - 1);
        }
        try {
            if (this.indexOfAny(text, operators) > -1) {
                if (text.includes(' ')) {
                    var newText = '';
                    for (var index = 0; index < text.length; index++) {
                        var currChar = text[index];
                        if (operators.indexOf(currChar) >= 0) {
                            newText = newText.trim() + currChar;
                        }
                        else if (currChar === ' ' && operators.indexOf(newText[newText.length - 1]) >= 0) {
                            continue;
                        }
                        else {
                            newText += currChar;
                        }
                    }
                    text = newText;
                }
                i = this.indexOfAny(text, operators);
                var decimalSep = this.parent.getParseDecimalSeparator();
                while (i > -1) {
                    var left = '';
                    var right = '';
                    var leftIndex = 0;
                    var rightIndex = 0;
                    var isLeftBool = false;
                    var arithOp = ['*', '+', '-', '/', 'w', '=', '<', '>'];
                    var isNotOperator = text[i] === this.charNOTop;
                    var j = 0;
                    if (!isNotOperator) {
                        j = i - 1;
                        if (text[j] === this.parent.arithMarker) {
                            var k = this.findLeftMarker(text.substring(0, j - 1));
                            if (k < 0) {
                                throw new FormulaError(this.parent.formulaErrorStrings[FormulasErrorsStrings.CannotParse]);
                            }
                            left = this.parent.substring(text, k + 1, j - k - 1);
                            leftIndex = k + 1;
                        }
                        else if (text[j] === this.parent.rightBracket) {
                            var bracketCount = 0;
                            var k = j - 1;
                            while (k > 0 && (text[k] !== 'q' || bracketCount !== 0)) {
                                if (text[k] === 'q') {
                                    bracketCount--;
                                }
                                else if (text[k] === this.parent.rightBracket) {
                                    bracketCount++;
                                }
                                k--;
                            }
                            if (k < 0) {
                                throw new FormulaError(this.parent.formulaErrorStrings[FormulasErrorsStrings.CannotParse]);
                            }
                            left = this.parent.substring(text, k, j - k + 1);
                            leftIndex = k;
                        }
                        else if (text[j] === this.parent.tic[0]) {
                            var l = text.substring(0, j - 1).lastIndexOf(this.parent.tic);
                            if (l < 0) {
                                throw new FormulaError(this.parent.formulaErrorStrings[FormulasErrorsStrings.CannotParse]);
                            }
                            left = this.parent.substring(text, l, j - l + 1);
                            leftIndex = l;
                        }
                        else {
                            var period = false;
                            while (j > -1 && (this.parent.isDigit(text[j]) ||
                                (!period && (text[j] === decimalSep || text[j] === '%')))) {
                                if (!this.parent.isDigit(text[j]) && text[j] !== '%') {
                                    period = true;
                                }
                                j = j - 1;
                            }
                            if (j > -1 && period && text[j] === decimalSep) {
                                throw new FormulaError(this.parent.formulaErrorStrings[FormulasErrorsStrings.NumberContains2DecimalPoints]);
                            }
                            j = j + 1;
                            if (j === 0 || (j > 0 && !this.parent.isUpperChar(text[j - 1]))) {
                                left = 'n' + this.parent.substring(text, j, i - j);
                                leftIndex = j;
                            }
                            else if (j > 0 && text[j - 1] === 'E' && ((text.substring(j - 4, j) === 'TRUE' && (!isNullOrUndefined(text[j - 5]) ? arithOp.indexOf(text[j - 5]) > -1 : true)) ||
                                (text.substring(j - 5, j) === 'FALSE' && (!isNullOrUndefined(text[j - 6]) ? arithOp.indexOf(text[j - 6]) > -1 : true))) && (text.substring(j + 1, j + 5) === 'TRUE' || text.substring(j + 1, j + 6) === 'FALSE')) {
                                j = text.substring(j - 4, j) === 'TRUE' ? j - 4 : j - 5;
                                left = text.substring(j, i) === 'TRUE' ? 'n1' : (text.substring(j, i) === 'FALSE' ? 'n0' : left);
                                leftIndex = j;
                                isLeftBool = true;
                            }
                            else {
                                j = j - 1;
                                while (j > -1 && (this.parent.isUpperChar(text[j]) || // Check if character is uppercase alphabets.
                                    this.parent.isDigit(text[j]) || // Check if character is a digit.
                                    text[j] === '_')) { // Check if character is an underscore ('_'), for defined names cases.
                                    j = j - 1;
                                }
                                if (j > -1 && text[j] === this.sheetToken) {
                                    j = j - 1;
                                    while (j > -1 && text[j] !== this.sheetToken) {
                                        j = j - 1;
                                    }
                                    if (j > -1 && text[j] === this.sheetToken) {
                                        j = j - 1;
                                    }
                                }
                                if (j > -1 && text[j] === ':') {
                                    //// handle range operands
                                    j = j - 1;
                                    while (j > -1 && this.parent.isDigit(text[j])) {
                                        j = j - 1;
                                    }
                                    while (j > -1 && this.parent.isUpperChar(text[j])) {
                                        j = j - 1;
                                    }
                                    if (j > -1 && text[j] === this.sheetToken) {
                                        j--;
                                        while (j > -1 && text[j] !== this.sheetToken) {
                                            j--;
                                        }
                                        if (j > -1 && text[j] === this.sheetToken) {
                                            j--;
                                        }
                                    }
                                    j = j + 1;
                                    left = this.parent.substring(text, j, i - j);
                                    left = this.parent.getCellFrom(left);
                                }
                                else {
                                    var uFound = false;
                                    if (j > 0 && !this.parent.isUpperChar(text[j])) {
                                        uFound = text[j] === 'u' && text[j - 1] === this.parent.getParseArgumentSeparator();
                                    }
                                    if (!uFound) {
                                        j = j + 1;
                                    }
                                    left = this.parent.substring(text, j, i - j);
                                }
                                this.parent.updateDependentCell(left);
                                leftIndex = j;
                            }
                            if ((this.parent.namedRanges.size > 0 && this.parent.namedRanges.has(left.toUpperCase())) ||
                                (this.parent.storedData.has(left.toUpperCase()))) {
                                left = 'n' + this.checkForNamedRangeAndKeyValue(left);
                            }
                        }
                    }
                    else {
                        leftIndex = i;
                    }
                    if (i === text.length - 1) {
                        throw new FormulaError(this.parent.formulaErrorStrings[FormulasErrorsStrings.ExpressionCannotEndWithAnOperator]);
                    }
                    else {
                        j = i + 1;
                        var uFound = text[j] === 'u'; // for 3*-2
                        if (uFound) {
                            j = j + 1;
                        }
                        if (text[j] === this.parent.tic[0]) {
                            var k = text.substring(j + 1).indexOf(this.parent.tic);
                            if (k < 0) {
                                throw this.parent.formulaErrorStrings[FormulasErrorsStrings.CannotParse];
                            }
                            right = this.parent.substring(text, j, k + 2);
                            rightIndex = k + j + 2;
                        }
                        else if (text[j] === this.parent.arithMarker) {
                            var k = this.findRightMarker(text.substring(j + 1));
                            if (k < 0) {
                                throw new FormulaError(this.parent.formulaErrorStrings[FormulasErrorsStrings.CannotParse]);
                            }
                            right = this.parent.substring(text, j + 1, k);
                            rightIndex = k + j + 2;
                        }
                        else if (text[j] === 'q') {
                            var bracketCount = 0;
                            var k = j + 1;
                            while (k < text.length && (text[k] !== this.parent.rightBracket || bracketCount !== 0)) {
                                if (text[k] === this.parent.rightBracket) {
                                    bracketCount++;
                                }
                                else if (text[k] === 'q') {
                                    bracketCount--;
                                }
                                k++;
                            }
                            if (k === text.length) {
                                throw this.parent.formulaErrorStrings[FormulasErrorsStrings.CannotParse];
                            }
                            right = this.parent.substring(text, j, k - j + 1);
                            if (uFound) {
                                right = 'u' + right;
                            }
                            rightIndex = k + 1;
                        }
                        else if (this.parent.isDigit(text[j]) || text[j] === decimalSep) {
                            var period = (text[j] === decimalSep);
                            j = j + 1;
                            while (j < text.length && (this.parent.isDigit(text[j]) ||
                                (!period && text[j] === decimalSep))) {
                                if (text[j] === decimalSep) {
                                    period = true;
                                }
                                j = j + 1;
                            }
                            if (j < text.length && text[j] === '%') {
                                j += 1;
                            }
                            if (period && j < text.length && text[j] === decimalSep) {
                                throw this.parent.formulaErrorStrings[FormulasErrorsStrings.NumberContains2DecimalPoints];
                            }
                            right = 'n' + this.parent.substring(text, i + 1, j - i - 1);
                            rightIndex = j;
                        }
                        else if (this.parent.isUpperChar(text[j]) || text[j] === this.sheetToken ||
                            text[j] === 'u') {
                            if (text[j] === this.sheetToken) {
                                j = j + 1;
                                while (j < text.length && text[j] !== this.sheetToken) {
                                    j = j + 1;
                                }
                            }
                            j = j + 1;
                            var jTemp = 0;
                            var inbracket = false;
                            while (j < text.length && (this.parent.isUpperChar(text[j]) || text[j] === '_'
                                || text[j] === decimalSep || text[j] === '[' || text[j] === ']' ||
                                text[j] === '#' || text[j] === ' ' || text[j] === '%' || text[j] ===
                                decimalSep && inbracket)) {
                                if (j !== text.length - 1 && text[j] === '[' && text[j + 1] === '[') {
                                    inbracket = true;
                                }
                                if (j !== text.length - 1 && text[j] === ']' && text[j + 1] === ']') {
                                    inbracket = false;
                                }
                                j++;
                                jTemp++;
                            }
                            var noCellReference = (j === text.length) || !this.parent.isDigit(text[j]);
                            if (jTemp > 1) {
                                while (j < text.length && (this.parent.isUpperChar(text[j]) ||
                                    this.parent.isDigit(text[j]) || text[j] === ' ' || text[j] === '_')) {
                                    j++;
                                }
                                noCellReference = true;
                            }
                            while (j < text.length && this.parent.isDigit(text[j])) {
                                j = j + 1;
                            }
                            if (j < text.length && text[j] === ':') {
                                j = j + 1;
                                if (j < text.length && text[j] === this.sheetToken) {
                                    j++;
                                    while (j < text.length && text[j] !== this.sheetToken) {
                                        j = j + 1;
                                    }
                                    if (j < text.length && text[j] === this.sheetToken) {
                                        j++;
                                    }
                                }
                                while (j < text.length && this.parent.isUpperChar(text[j])) {
                                    j = j + 1;
                                }
                                while (j < text.length && this.parent.isDigit(text[j])) {
                                    j = j + 1;
                                }
                                j = j - 1;
                                right = this.parent.substring(text, i + 1, j - i);
                                right = this.parent.getCellFrom(right);
                            }
                            else {
                                j = j - 1;
                                right = this.parent.substring(text, i + 1, j - i);
                                uFound = text[j] === 'u';
                                if (uFound) {
                                    right = 'u' + right;
                                }
                            }
                            if (noCellReference && right.startsWith(this.sheetToken)) {
                                noCellReference = !this.parent.isCellReference(right);
                            }
                            if (!noCellReference) {
                                this.parent.updateDependentCell(right);
                            }
                            if ((this.parent.namedRanges.size > 0 && this.parent.namedRanges.has(right.toUpperCase()))
                                || (this.parent.storedData.has(right.toUpperCase()))) {
                                right = 'n' + this.checkForNamedRangeAndKeyValue(right);
                            }
                            var isPrevArithOp = ['*', '+', '-', '/', 'w'].indexOf(text[j - right.length]) > -1;
                            right = right === 'TRUE' && (isLeftBool || isPrevArithOp) ? 'n1' : (right === 'FALSE' && (isLeftBool || isPrevArithOp) ? 'n0' : right);
                            rightIndex = j + 1;
                        }
                    }
                    var p = op.indexOf(text[i]);
                    var s = this.parent.arithMarker + left + right + markers[p] + this.parent.arithMarker;
                    if (leftIndex > 0) {
                        s = text.substring(0, leftIndex) + s;
                    }
                    if (rightIndex < text.length) {
                        s = s + text.substring(rightIndex);
                    }
                    s = s.split(this.parent.arithMarker2).join(this.parent.arithMarker.toString());
                    text = s;
                    i = this.indexOfAny(text, operators);
                }
            }
            else {
                if (text.length > 0 && (this.parent.isUpperChar(text[0]) || text[0] === this.sheetToken)) {
                    var isCharacter = true;
                    var checkLetter = true;
                    var oneTokenFound = false;
                    var textLen = text.length;
                    for (var k = 0; k < textLen; ++k) {
                        if (text[k] === this.sheetToken) {
                            if (k > 0 && !oneTokenFound) {
                                throw this.parent.getErrorStrings()[CommonErrors.Ref];
                            }
                            oneTokenFound = true;
                            k++;
                            while (k < textLen && this.parent.isDigit(text[k])) {
                                k++;
                            }
                            if (k === textLen || text[k] !== this.sheetToken) {
                                isCharacter = false;
                                break;
                            }
                        }
                        else {
                            if (!checkLetter && this.parent.isChar(text[k])) {
                                isCharacter = false;
                                break;
                            }
                            if (this.parent.isChar(text[k]) || this.parent.isDigit(text[k]) || text[k] ===
                                this.sheetToken) {
                                checkLetter = this.parent.isUpperChar(text[k]);
                            }
                            else {
                                isCharacter = false;
                                break;
                            }
                        }
                    }
                    if (isCharacter) {
                        this.parent.updateDependentCell(text);
                    }
                }
            }
            return text;
        }
        catch (ex) {
            if (ex === this.parent.formulaErrorStrings[FormulasErrorsStrings.CircularReference]) {
                throw ex;
            }
            return ex;
        }
    };
    /**
     * @hidden
     * @param {string} text - specify the text
     * @param {string[]} operators - specify the operators
     * @returns {number} - returns index.
     */
    Parser.prototype.indexOfAny = function (text, operators) {
        for (var i = 0; i < text.length; i++) {
            if (operators.indexOf(text[i]) > -1) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @hidden
     * @param {string} text - specify the text
     * @returns {number} - find Left Marker.
     */
    Parser.prototype.findLeftMarker = function (text) {
        var ret = -1;
        if (text.indexOf(this.parent.arithMarker) > -1) {
            var bracketLevel = 0;
            for (var i = text.length - 1; i >= 0; --i) {
                if (text[i] === this.parent.rightBracket) {
                    bracketLevel--;
                }
                else if (text[i] === this.parent.leftBracket) {
                    bracketLevel++;
                }
                else if (text[i] === this.parent.arithMarker && bracketLevel === 0) {
                    ret = i;
                    break;
                }
            }
        }
        return ret;
    };
    /**
     * @hidden
     * @param {string} text - specify the text.
     * @returns {number} - find Right Marker.
     */
    Parser.prototype.findRightMarker = function (text) {
        var ret = -1;
        if (text.indexOf(this.parent.arithMarker) > -1) {
            var bracketLevel = 0;
            for (var j = 0; j < text.length; ++j) {
                if (text[j] === this.parent.rightBracket) {
                    bracketLevel--;
                }
                else if (text[j] === this.parent.leftBracket) {
                    bracketLevel++;
                }
                else if (text[j] === this.parent.arithMarker && bracketLevel === 0) {
                    ret = j;
                    break;
                }
            }
        }
        return ret;
    };
    /**
     * @hidden
     * @param {string} formula - specify the formula
     * @param {string} fKey - specify the formula key.
     * @returns {string} - parse formula.
     */
    Parser.prototype.parseFormula = function (formula, fKey) {
        if (formula.length > 0 && formula[0] === this.parent.getFormulaCharacter()) {
            formula = formula.substring(1);
        }
        if (formula.indexOf('#REF!') > -1) {
            return this.parent.getErrorStrings()[CommonErrors.Ref];
        }
        if (formula.length > 0 && formula[0] === '+') {
            formula = formula.substring(1);
        }
        try {
            this.isFailureTriggered = false;
            this.isError = false;
            formula = this.parse(formula.trim(), fKey);
            this.isFormulaParsed = true;
        }
        catch (ex) {
            var args = this.exceptionArgs(ex);
            if (!this.isFailureTriggered) {
                this.parent.trigger('onFailure', args);
                this.isFailureTriggered = true;
            }
            var errorMessage = (typeof args.exception === 'string') ? args.exception : args.message;
            formula = (isNullOrUndefined(this.parent.getErrorLine(ex)) ? '' : '#' + this.parent.getErrorLine(ex) + ': ') + errorMessage;
            this.isError = true;
        }
        return formula;
    };
    /**
     * @hidden
     * @param {string} formula - specify the formula
     * @returns {string} - mark library formulas.
     */
    Parser.prototype.markLibraryFormulas = function (formula) {
        var bracCount = 0;
        var rightParens = formula.indexOf(')');
        if (rightParens === -1) {
            formula = this.markNamedRanges(formula);
        }
        else {
            while (rightParens > -1) {
                var parenCount = 0;
                var leftParens = rightParens - 1;
                while (leftParens > -1 && (formula[leftParens] !== '(' || parenCount !== 0)) {
                    if (formula[leftParens] === ')') {
                        parenCount++;
                    }
                    // else if (formula[leftParens] === ')') {
                    //     parenCount--;
                    // }
                    leftParens--;
                }
                if (leftParens === -1) {
                    throw new FormulaError(this.parent.formulaErrorStrings[FormulasErrorsStrings.MismatchedParentheses]);
                }
                var i = leftParens - 1;
                while (i > -1 && (this.parent.isChar(formula[i]))) {
                    i--;
                }
                var len = leftParens - i - 1;
                var libFormula = this.parent.substring(formula, i + 1, len);
                if (len > 0 && !isNullOrUndefined(this.parent.getFunction(libFormula))) {
                    var substr = this.parent.substring(formula, leftParens, rightParens - leftParens + 1);
                    var argsSep = this.parent.getParseArgumentSeparator();
                    if (libFormula === 'AREAS') {
                        this.ignoreBracet = true;
                    }
                    else {
                        this.ignoreBracet = false;
                        if (libFormula.includes('IFS') && libFormula !== 'COUNTIFS' && substr.includes('{')) {
                            var leftBraceIdx = substr.indexOf('{');
                            var criteriaStr = this.parent.substring(substr, leftBraceIdx, substr.indexOf('}') - leftBraceIdx + 1);
                            substr = substr.split(criteriaStr).join(criteriaStr.split(argsSep).join(this.parent.tic + this.parent.tic));
                        }
                    }
                    try {
                        var args = void 0;
                        substr = substr.split('(').join('').split(')').join('');
                        substr = '(' + this.formulaAutoCorrection(substr, args) + ')';
                    }
                    catch (ex) {
                        var args = {
                            message: ex.message, exception: ex,
                            isForceCalculable: ex.formulaCorrection, computeForceCalculate: false
                        };
                        if (!args.isForceCalculable) {
                            throw this.parent.formulaErrorStrings[FormulasErrorsStrings.ImproperFormula];
                        }
                        if (!this.isFailureTriggered) {
                            this.parent.trigger('onFailure', args);
                            this.isFailureTriggered = true;
                            bracCount = bracCount + 1;
                        }
                        args.computeForceCalculate = bracCount > 0 ? true : args.computeForceCalculate;
                        if (args.isForceCalculable) {
                            if (args.computeForceCalculate) {
                                substr = substr.split('(').join('').split(')').join('');
                                substr = '(' + this.formulaAutoCorrection(substr, args) + ')';
                            }
                            else {
                                throw this.parent.formulaErrorStrings[FormulasErrorsStrings.ImproperFormula];
                            }
                        }
                        else {
                            throw this.parent.formulaErrorStrings[FormulasErrorsStrings.ImproperFormula];
                        }
                    }
                    substr = this.markNamedRanges(substr);
                    substr = this.swapInnerParens(substr);
                    substr = this.addParensToArgs(substr);
                    var id = substr.lastIndexOf(argsSep);
                    if (id === -1) {
                        if (substr.length > 2 && substr[0] === '(' && substr[substr.length - 1] === ')') {
                            if (substr[1] !== '{' && substr[1] !== '(') {
                                substr = substr.substring(0, substr.length - 1) + '}' + substr.substring(substr.length - 1);
                                substr = substr[0] + '{' + substr.substring(1);
                            }
                        }
                    }
                    formula = formula.substring(0, i + 1) + 'q' + this.parent.substring(formula, i + 1, len) +
                        (substr.split('(').join(this.parent.leftBracket))
                            .split(')').join(this.parent.rightBracket) + formula.substring(rightParens + 1);
                }
                else if (len > 0) {
                    return this.parent.getErrorStrings()[CommonErrors.Name];
                }
                else {
                    var s = this.emptyStr;
                    if (leftParens > 0) {
                        s = formula.substring(0, leftParens);
                    }
                    s = s + '{' + this.parent.substring(formula, leftParens + 1, rightParens - leftParens - 1) + '}';
                    if (rightParens < formula.length) {
                        s = s + formula.substring(rightParens + 1);
                    }
                    s = this.markNamedRanges(s);
                    formula = s;
                }
                rightParens = formula.indexOf(')');
            }
        }
        formula = (formula.split('{').join('(')).split('}').join(')');
        return formula;
    };
    /**
     * @hidden
     * @param {string} fSubstr - specify the string
     * @returns {string} - swap inner parens.
     */
    Parser.prototype.swapInnerParens = function (fSubstr) {
        if (fSubstr.length > 2) {
            fSubstr = fSubstr[0] + fSubstr.substr(1, fSubstr.length - 2).split('(').join('{').split(')').join('}') + fSubstr[fSubstr.length - 1];
        }
        return fSubstr;
    };
    /**
     * @hidden
     * @param {string} fSubstr - specify the string
     * @returns {string} - add parens to args.
     */
    Parser.prototype.addParensToArgs = function (fSubstr) {
        if (fSubstr.length === 0) {
            return this.emptyStr;
        }
        var rightSides = [];
        rightSides.push(this.parent.getParseArgumentSeparator());
        rightSides.push(this.parent.rightBracket);
        var id = fSubstr.lastIndexOf(this.parent.getParseArgumentSeparator());
        var k = 0;
        if (id === -1) {
            if (fSubstr.length > 2 && fSubstr[0] === '(' && fSubstr[fSubstr.length - 1] === ')') {
                if (fSubstr[1] !== '{' && fSubstr[1] !== '(') {
                    fSubstr = fSubstr.substring(0, fSubstr.length - 1) + '}' + fSubstr.substring(fSubstr.length - 1);
                    fSubstr = fSubstr[0] + '{' + fSubstr.substring(1);
                }
                else {
                    var marker = ['+', '-', '*', '/'];
                    id = this.lastIndexOfAny(fSubstr, marker);
                    if (k === 0 && fSubstr[fSubstr.length - 1] === ')') {
                        k = fSubstr.length - 1;
                    }
                    if (k > 0) {
                        if (fSubstr[id + 1] !== '{' && fSubstr[id - 1] === '}') {
                            fSubstr = fSubstr.substr(0, k) + '}' + fSubstr.substr(k);
                            fSubstr = fSubstr.substr(0, id + 1) + '{' + fSubstr.substr(id + 1);
                        }
                    }
                }
            }
        }
        else {
            var oneTimeOnly = true;
            while (id > -1) {
                var j = this.indexOfAny(fSubstr.substring(id + 1, fSubstr.length), rightSides);
                if (j >= 0) {
                    j = id + j + 1;
                }
                else if (j === -1 && fSubstr[fSubstr.length - 1] === ')') {
                    j = fSubstr.length - 1;
                }
                if (j > 0) {
                    if (fSubstr[id + 1] !== '{' && fSubstr[j - 1] !== '}' && fSubstr[j - 1] !== '¢') {
                        fSubstr = fSubstr.substr(0, j).trim() + '}' + fSubstr.substr(j);
                        fSubstr = fSubstr.substr(0, id + 1) + '{' + fSubstr.substr(id + 1).trim();
                    }
                }
                id = fSubstr.substr(0, id).lastIndexOf(this.parent.getParseArgumentSeparator());
                if (oneTimeOnly && id === -1 && fSubstr[0] === '(') {
                    id = 0;
                    oneTimeOnly = false;
                }
            }
        }
        fSubstr = fSubstr.split('{}').join(this.emptyStr);
        return fSubstr;
    };
    /**
     * @hidden
     * @param {string} text - specify the text
     * @param {string[]} operators - specify the operators
     * @returns {number} - returns last Index Of Any.
     */
    Parser.prototype.lastIndexOfAny = function (text, operators) {
        for (var i = text.length - 1; i > -1; i--) {
            if (operators.indexOf(text[i]) > -1) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @hidden
     * @param {string} formula - specify the formula
     * @returns {string} - mark Named Ranges.
     */
    Parser.prototype.markNamedRanges = function (formula) {
        var markers = [')', this.parent.getParseArgumentSeparator(), '}', '+', '-', '*', '/', '<', '>', '=', '&', ':'];
        var i = (formula.length > 0 && (formula[0] === '(' || formula[0] === '{')) ? 1 : 0;
        if (formula.indexOf('#N/A') > -1) {
            formula = formula.split('#N/A').join('#N~A');
        }
        if (formula.indexOf('#DIV/0!') > -1) {
            formula = formula.split('#DIV/0!').join('#DIV~0!');
        }
        var end = this.indexOfAny(formula.substring(i), markers);
        while (end > -1 && end + i < formula.length) {
            var scopedRange = this.emptyStr;
            var s = null;
            if ((this.parent.substring(formula, i, end)).indexOf('[') > -1) {
                s = this.getTableRange(this.parent.substring(formula, i, end));
            }
            else if (this.parent.storedData.has(this.parent.substring(formula, i, end))) {
                s = this.checkForNamedRangeAndKeyValue(this.parent.substring(formula, i, end));
            }
            else if (this.parent.namedRanges.has(this.parent.substring(formula, i, end))) {
                s = this.checkForNamedRangeAndKeyValue(this.parent.substring(formula, i, end));
            }
            if (isNullOrUndefined(s)) {
                scopedRange = this.checkScopedRange(this.parent.substring(formula, i, end));
                if (scopedRange !== 'NaN') {
                    this.findNamedRange = true;
                    s = scopedRange;
                }
                else if (this.parent.substring(formula, i, end).startsWith(this.sheetToken.toString())) {
                    //let formulaStr: number = this.parent.substring(formula, i, end).indexOf(this.sheetToken, 1);
                    // if (formulaStr > 1) {
                    //     s = this.parent.namedRanges.get(this.parent.substring
                    // (formula.substring(i), formulaStr + 1, end - formulaStr - 1));
                    // }
                }
                if (!isNullOrUndefined(s) && this.findNamedRange) {
                    if (s.indexOf(this.fixedReference) > -1) {
                        s = s.split(this.fixedReference).join(this.emptyStr);
                    }
                }
            }
            if (!isNullOrUndefined(s)) {
                s = s.toUpperCase();
                s = this.parent.setTokensForSheets(s);
                s = this.markLibraryFormulas(s);
            }
            if (!isNullOrUndefined(s) && s !== this.emptyStr) {
                formula = formula.substring(0, i) + s + formula.substring(i + end);
                i += s.length + 1;
            }
            else {
                i += end + 1;
                while (i < formula.length && !this.parent.isUpperChar(formula[i]) && formula[i] !== this.sheetToken) {
                    i++;
                }
            }
            end = i;
            if (i < formula.length - 1 && formula[i] === '{') {
                i = i + 1;
            }
            end = this.indexOfAny(formula.substring(i), markers);
            while (end === 0 && i < formula.length - 1) {
                i++;
                end = this.indexOfAny(formula.substring(i), markers);
            }
            if ((end === -1 || formula.substring(i).indexOf('[') > -1) && i < formula.length) {
                if (formula.substring(i).indexOf('[') > -1) {
                    s = this.getTableRange(formula.substring(i));
                }
                else {
                    if (this.parent.storedData.has(formula.substring(i))) {
                        s = this.parent.storedData.size > 0 ? this.checkForNamedRangeAndKeyValue(formula.substring(i)) : s;
                    }
                    else {
                        s = this.parent.namedRanges.size > 0 ? this.checkForNamedRangeAndKeyValue(formula.substring(i)) : s;
                    }
                }
                if (isNullOrUndefined(s)) {
                    scopedRange = this.checkScopedRange(formula.substring(i));
                    if (scopedRange !== 'NaN') {
                        s = scopedRange;
                    }
                }
                if (!isNullOrUndefined(s) && s !== this.emptyStr) {
                    s = s.toUpperCase();
                    s = this.parent.setTokensForSheets(s);
                    s = this.markLibraryFormulas(s);
                    if (s != null) {
                        var val = formula.substring(i);
                        if (val[val.length - 1] === ')') {
                            formula = formula.substring(0, i) + s + ')';
                        }
                        else {
                            formula = formula.substring(0, i) + s;
                        }
                        i += s.toString().length + 1;
                    }
                }
                end = (i < formula.length) ? this.indexOfAny(formula.substring(i), markers) : -1;
            }
        }
        if (formula.indexOf('#N~A') > -1) {
            formula = formula.split('#N~A').join('#N/A');
        }
        if (formula.indexOf('#DIV~0!') > -1) {
            formula = formula.split('#DIV~0!').join('#DIV/0!');
        }
        return formula;
    };
    /**
     * @hidden
     * @param {string} text - specify the text.
     * @returns {string} - check For Named Range And Key Value
     */
    Parser.prototype.checkForNamedRangeAndKeyValue = function (text) {
        var scopedRange = this.emptyStr;
        if (text.indexOf('[') > -1) {
            var namerangeValue = this.getTableRange(text);
            if (!isNullOrUndefined(namerangeValue)) {
                this.findNamedRange = true;
                text = namerangeValue;
            }
        }
        scopedRange = this.checkScopedRange(text);
        if (scopedRange !== 'NaN') {
            this.findNamedRange = true;
            text = scopedRange;
        }
        else {
            if (text.indexOf(this.sheetToken) > -1) {
                var sheet = this.parent.getSheetFamilyItem(this.parent.grid);
                var value = text.split('"').join(this.emptyStr);
                value = value.substr(0, value.indexOf(this.sheetToken));
                if (sheet.sheetNameToToken.has(value.toUpperCase())) {
                    /* eslint-disable */
                    var sheetIndex = parseInt(sheet.sheetNameToToken.get(value.toUpperCase()).split(this.sheetToken).join(this.emptyStr));
                    // if (!ej.isNullOrUndefined(this.parentObject) && this.parentObject.pluginName == "ejSpreadsheet") {
                    //     var name = text.replace(value, this.parentObject.model.sheets[(sheetIndex + 1)].sheetInfo.text.toUpperCase()).split("'").join(this._string_empty);
                    //     if (this.getNamedRanges().length > 0 && this.getNamedRanges().contains(name.toUpperCase())) {
                    //         text = name;
                    //     }
                    // }
                    /* tslint-enable */
                }
            }
            if (this.parent.storedData.size > 0 && this.parent.storedData.has(text)) {
                text = 'A' + this.parent.colIndex(text);
            }
            if (this.parent.namedRanges.size > 0 && this.parent.namedRanges.has(text.toUpperCase())) {
                if (!isNullOrUndefined(this.parent.parentObject)) {
                    text = this.parse(this.parent.namedRanges.get(text.toUpperCase()));
                }
                else {
                    text = this.parse(this.parent.namedRanges.get(text.toUpperCase()));
                    text = this.parent.setTokensForSheets(text);
                    if (text.indexOf(this.fixedReference) > -1) {
                        text.split(this.fixedReference).join(this.emptyStr);
                    }
                    this.findNamedRange = true;
                }
            }
            if (this.findNamedRange) {
                if (text[0] !== '!' && text[0] !== 'q' && text[0] !== 'bq') {
                    text = this.parent.setTokensForSheets(text);
                    if (text.indexOf(this.fixedReference) > -1) {
                        text = text.split(this.fixedReference).join(this.emptyStr);
                    }
                }
            }
        }
        return text;
    };
    Parser.prototype.getTableRange = function (text) {
        text = text.replace(' ', this.emptyStr).toUpperCase();
        var name = text.replace(']', this.emptyStr).replace('#DATA', this.emptyStr);
        var tableName = name;
        if (name.indexOf(this.parent.getParseArgumentSeparator()) > -1) {
            tableName = name.substring(0, name.indexOf(this.parent.getParseArgumentSeparator())).replace('[', this.emptyStr);
            name = name.replace('[', this.emptyStr).replace(this.parent.getParseArgumentSeparator(), '_');
        }
        var range = this.emptyStr;
        return name.toUpperCase();
    };
    Parser.prototype.findNextEndIndex = function (formula, loc) {
        var count = 0;
        var l = loc;
        var found = false;
        while (!found && loc < formula.length) {
            if (formula[l] === '[') {
                count++;
            }
            else if (formula[l] === ']') {
                count--;
                if (count === 0) {
                    found = true;
                }
            }
            loc++;
        }
        loc = loc - l;
        return loc;
    };
    ;
    return Parser;
}());
export { Parser };
