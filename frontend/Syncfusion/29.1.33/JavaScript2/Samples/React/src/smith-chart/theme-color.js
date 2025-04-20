"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSmithChartTheme = void 0;
var loadSmithChartTheme = function (args) {
    var theme = location.hash.split('/')[1];
    theme = theme ? theme : 'Tailwind3';
    args.smithchart.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
};
exports.loadSmithChartTheme = loadSmithChartTheme;
