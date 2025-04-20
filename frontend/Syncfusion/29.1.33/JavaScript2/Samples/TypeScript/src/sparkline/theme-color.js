define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadSparkLineTheme = void 0;
    function loadSparkLineTheme(args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Tailwind3';
        args.sparkline.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    }
    exports.loadSparkLineTheme = loadSparkLineTheme;
    ;
});
