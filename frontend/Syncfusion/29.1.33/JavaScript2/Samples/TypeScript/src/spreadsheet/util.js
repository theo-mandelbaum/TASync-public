define(["require", "exports", "@syncfusion/ej2-spreadsheet"], function (require, exports, ej2_spreadsheet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.cultureSwitchActions = void 0;
    var cultureSwitchActions = function (spreadsheet) {
        var updateNumberFormats = function () {
            spreadsheet.numberFormat((0, ej2_spreadsheet_1.getFormatFromType)('Currency'), 'F2:F31');
        };
        var spreadsheetDestroyed = function () {
            spreadsheet.off('spreadsheetDestroyed', spreadsheetDestroyed);
            cultureDropdown.onchange = undefined;
            currencyDropdown.oninput = undefined;
        };
        var cultureDropdown = document.getElementById('sb-setting-culture');
        cultureDropdown.onchange = updateNumberFormats;
        var currencyDropdown = document.getElementById('currencyID');
        currencyDropdown.oninput = updateNumberFormats;
        spreadsheet.on('spreadsheetDestroyed', spreadsheetDestroyed, spreadsheet);
        if (spreadsheet.locale !== 'en-US') {
            setTimeout(function () {
                updateNumberFormats();
            });
        }
    };
    exports.cultureSwitchActions = cultureSwitchActions;
});
