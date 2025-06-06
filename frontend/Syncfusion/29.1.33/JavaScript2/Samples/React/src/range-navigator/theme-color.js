"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRangeNavigatorTheme = exports.printBorderColor = exports.printThemes = exports.printRegionColors = exports.regionColor = exports.borderColor = exports.themes = void 0;
exports.themes = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
exports.borderColor = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
exports.regionColor = ['rgba(52, 58, 64, 0.1)', 'rgba(173, 181, 189, 0.1)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
    'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)',
    'rgba(98, 0, 238, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(47, 64, 116, 0.3)', 'rgba(128, 41, 241, 0.3)'];
exports.printRegionColors = ['rgba(255, 64, 129, 0.3)', ' rgba(0, 120, 151, 0.3)', 'rgba(66, 139, 202, 0.3)', 'rgba(255, 217, 57, 0.3)', 'rgba(255, 217, 57, 0.3)', 'rgba(253, 126, 20, 0.3)', 'rgba(79, 70, 229, 0.3)',
    'rgba(255, 64, 129, 0.3)', 'rgba(0, 120, 151, 0.3)', 'rgba(66, 139, 202, 0.3)', 'rgba(34, 211, 238, 0.3)', 'rgba(253, 126, 20, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)', 'rgba(98, 0, 238, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(47, 64, 116, 0.3)', 'rgba(128, 41, 241, 0.3)'];
exports.printThemes = ['Material', 'Fabric', 'Bootstrap', 'Bootstrap4', 'HighContrast', 'Bootstrap5', 'Tailwind', 'MaterialDark', 'FabricDark', 'BootstrapDark', 'TailwindDark', 'Bootstrap5Dark', 'Fluent', 'FluentDark', 'Material3', 'Material3Dark', 'Fluent2', 'Fluent2HighContrast', 'Fluent2Dark', 'Tailwind3', 'Tailwind3Dark'];
exports.printBorderColor = ['#FF4081', '#007897', '#5A61F6', '#8B5CF6', '#FFD939', '#FD7E14', '#4F46E5', '#FF4081', '#007897', '#428BCA', '#22D3EE', '#FD7E14', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
var loadRangeNavigatorTheme = function (args, isGradient) {
    var selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Tailwind3';
    var formattedTheme = (selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    if (args) {
        if ('chart' in args) {
            args.chart.theme = formattedTheme;
            return isGradient ? selectedTheme : args.chart.theme;
        }
        else if ('rangeNavigator' in args) {
            args.rangeNavigator.theme = formattedTheme;
            return isGradient ? selectedTheme : args.rangeNavigator.theme;
        }
    }
    if (isGradient && !args) {
        return selectedTheme;
    }
};
exports.loadRangeNavigatorTheme = loadRangeNavigatorTheme;
