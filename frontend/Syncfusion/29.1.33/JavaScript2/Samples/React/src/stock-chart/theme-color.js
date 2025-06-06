"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadStockChartTheme = exports.borderColor = exports.themes = void 0;
exports.themes = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
exports.borderColor = ['#FD7E14', '#FD7E14', '#9333EA', '#8029F1', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
var loadStockChartTheme = function (args) {
    var selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Tailwind3';
    args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    return selectedTheme;
};
exports.loadStockChartTheme = loadStockChartTheme;
