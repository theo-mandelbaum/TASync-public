define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GetNumericData = exports.getRandomInt = exports.GetDateTimeData = void 0;
    function GetDateTimeData(start, end, min, max, inc) {
        var series1 = [];
        var point = {};
        var value = 100;
        var date;
        inc = inc ? inc : 1;
        for (var i = 0; start <= end; i += inc) {
            date = start.getTime();
            if (min || max) {
                value = getRandomInt(min, max);
            }
            else {
                if (Math.random() > .5) {
                    value += Math.random();
                }
                else {
                    value -= Math.random();
                }
            }
            point = { x: new Date(date), y: value };
            new Date(start.setDate(start.getDate() + 1));
            series1.push(point);
        }
        return series1;
    }
    exports.GetDateTimeData = GetDateTimeData;
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    exports.getRandomInt = getRandomInt;
    function GetNumericData(start, end, min, max) {
        var series1 = [];
        var point = {};
        var value = 30;
        for (var i = start; i <= end; i++) {
            if (min || max) {
                value = getRandomInt(min, max);
            }
            else {
                if (Math.random() > .5) {
                    value += Math.random();
                }
                else {
                    value -= Math.random();
                }
            }
            point = { x: i, y: Math.round(value) };
            series1.push(point);
        }
        return series1;
    }
    exports.GetNumericData = GetNumericData;
});
