define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadStockChartTheme = void 0;
    function loadStockChartTheme(args) {
        var selectedTheme = location.hash.split('/')[1];
        var theme;
        selectedTheme = selectedTheme ? selectedTheme : 'Tailwind3';
        if (args) {
            theme = args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
        else {
            theme = (selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
        return theme.toLowerCase();
    }
    exports.loadStockChartTheme = loadStockChartTheme;
});
