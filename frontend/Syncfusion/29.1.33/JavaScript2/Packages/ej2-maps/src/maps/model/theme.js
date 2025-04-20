/**
 * Specifies Maps Themes
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export var Theme;
(function (Theme) {
    /** @private */
    Theme.mapsTitleFont = {
        size: '14px',
        fontWeight: null,
        color: '#424242',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    Theme.mapsSubTitleFont = {
        size: '13px',
        fontWeight: null,
        color: '#424242',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    Theme.tooltipLabelFont = {
        size: '12px',
        fontWeight: 'Regular',
        color: null,
        fontStyle: 'Regular',
        fontFamily: null
    };
    /** @private */
    Theme.legendTitleFont = {
        size: '12px',
        fontWeight: 'Medium',
        color: null,
        fontStyle: 'Medium',
        fontFamily: null
    };
    /** @private */
    Theme.legendLabelFont = {
        size: '13px',
        fontWeight: 'Medium',
        color: null,
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    Theme.dataLabelFont = {
        size: null,
        fontWeight: 'Medium',
        color: '#000000',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
})(Theme || (Theme = {}));
// eslint-disable-next-line @typescript-eslint/no-namespace
export var FabricTheme;
(function (FabricTheme) {
    /** @private */
    FabricTheme.mapsTitleFont = {
        size: '14px',
        fontWeight: 'Semibold',
        color: '#424242',
        fontStyle: 'Semibold',
        fontFamily: 'SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    FabricTheme.mapsSubTitleFont = {
        size: '13px',
        fontWeight: 'Regular',
        color: '#424242',
        fontStyle: 'Regular',
        fontFamily: 'SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    FabricTheme.tooltipLabelFont = {
        size: '12px',
        fontWeight: 'Regular',
        color: '#FFFFFF',
        fontStyle: 'Regular',
        fontFamily: 'Roboto'
    };
    /** @private */
    FabricTheme.legendTitleFont = {
        size: '14px',
        fontWeight: 'Regular',
        color: '#757575',
        fontStyle: 'Regular',
        fontFamily: 'SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    FabricTheme.legendLabelFont = {
        size: '13px',
        fontWeight: 'Medium',
        color: '#757575',
        fontStyle: 'Medium',
        fontFamily: 'SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    FabricTheme.dataLabelFont = {
        size: '12px',
        fontWeight: 'Medium',
        color: '#000000',
        fontStyle: 'Medium',
        fontFamily: 'SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif'
    };
})(FabricTheme || (FabricTheme = {}));
// eslint-disable-next-line @typescript-eslint/no-namespace
export var BootstrapTheme;
(function (BootstrapTheme) {
    /** @private */
    BootstrapTheme.mapsTitleFont = {
        size: '14px',
        fontWeight: 'Semibold',
        color: '#424242',
        fontStyle: 'Semibold',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    BootstrapTheme.mapsSubTitleFont = {
        size: '13px',
        fontWeight: 'Regular',
        color: '#424242',
        fontStyle: 'Regular',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    BootstrapTheme.tooltipLabelFont = {
        size: '12px',
        fontWeight: 'Regular',
        color: '#FFFFFF',
        fontStyle: 'Regular',
        fontFamily: 'Roboto'
    };
    /** @private */
    BootstrapTheme.legendTitleFont = {
        size: '14px',
        fontWeight: 'Regular',
        color: '#757575',
        fontStyle: 'Regular',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    BootstrapTheme.legendLabelFont = {
        size: '13px',
        fontWeight: 'Medium',
        color: '#757575',
        fontStyle: 'Medium',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    BootstrapTheme.dataLabelFont = {
        size: '12px',
        fontWeight: 'Medium',
        color: '#000000',
        fontStyle: 'Medium',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    };
})(BootstrapTheme || (BootstrapTheme = {}));
/**
 * Internal use of Method to getting colors based on themes.
 *
 * @private
 * @param {MapsTheme} theme Specifies the theme of the maps
 * @returns {string[]} Returns the shape color
 */
export function getShapeColor(theme) {
    var themePalette;
    switch (theme.toLowerCase()) {
        case 'tailwind':
            themePalette = ['#0369A1', '#14B8A6', '#15803D', '#334155', '#5A61F6',
                '#65A30D', '#8B5CF6', '#9333EA', '#F59E0B', '#F97316'];
            break;
        case 'tailwinddark':
            themePalette = ['#10B981', '#22D3EE', '#2DD4BF', '#4ADE80', '#8B5CF6',
                '#E879F9', '#F472B6', '#F87171', '#F97316', '#FCD34D'];
            break;
        case 'tailwind3':
            themePalette = ['#2F4074', '#03B4B4', '#0D72DE', '#FF5733', '#D63384', '#F39C12', '#EF291F', '#91C822'];
            break;
        case 'tailwind3dark':
            themePalette = ['#8029F1', '#1ABC9C', '#0D72DE', '#FF5733', '#D63384', '#F39C12', '#EF291F', '#91C822'];
            break;
        case 'fluent':
            themePalette = ['#614570', '#4C6FB1', '#CC6952', '#3F579A', '#4EA09B',
                '#6E7A89', '#D4515C', '#E6AF5D', '#639751', '#9D4D69'];
            break;
        case 'fluentdark':
            themePalette = ['#8AB113', '#2A72D5', '#43B786', '#584EC6', '#E85F9C',
                '#6E7A89', '#EA6266', '#EBA844', '#26BC7A', '#BC4870'];
            break;
        case 'material3':
            themePalette = ['#6200EE', '#E77A16', '#82C100', '#7107DC', '#05BB3D',
                '#D21020', '#FAD200', '#0085FF', '#9204EA', '#08EE9B'];
            break;
        case 'material3dark':
            themePalette = ['#4EAAFF', '#FA4EAB', '#FFF500', '#17EA58', '#38FFE7',
                '#FF9E45', '#B3F32F', '#B93CE4', '#FC5664', '#9B55FF'];
            break;
        case 'fluent2':
            themePalette = ['#6200EE', '#09AF74', '#0076E5', '#CB3587', '#E7910F',
                '#0364DE', '#66CD15', '#F3A93C', '#107C10', '#C19C00'];
            break;
        case 'fluent2dark':
        case 'fluent2highcontrast':
            themePalette = ['#9BB449', '#2A72D5', '#43B786', '#3F579A', '#584EC6',
                '#E85F9C', '#6E7A89', '#EA6266', '#0B6A0B', '#C19C00'];
            break;
        case 'bootstrap5':
        case 'bootstrap5dark':
            themePalette = ['#6610F2', '#6f42C1', '#D63384', '#DC3545',
                '#FD7E14', '#FFC107', '#198754', '#0DCAF0'];
            break;
        default:
            themePalette = ['#B5E485', '#7BC1E8', '#DF819C', '#EC9B79', '#78D0D3',
                '#D6D572', '#9178E3', '#A1E5B4', '#87A4B4', '#E4C16C'];
            break;
    }
    return themePalette;
}
/**
 * HighContrast Theme configuration
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export var HighContrastTheme;
(function (HighContrastTheme) {
    /** @private */
    HighContrastTheme.mapsTitleFont = {
        size: '14px',
        fontWeight: 'Medium',
        color: '#FFFFFF',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    HighContrastTheme.mapsSubTitleFont = {
        size: '13px',
        fontWeight: 'Medium',
        color: '#FFFFFF',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    HighContrastTheme.tooltipLabelFont = {
        size: '12px',
        fontWeight: 'Regular',
        color: '#000000',
        fontStyle: 'Regular',
        fontFamily: 'Roboto'
    };
    /** @private */
    HighContrastTheme.legendTitleFont = {
        size: '14px',
        fontWeight: 'Regular',
        color: '#FFFFFF',
        fontStyle: 'Regular',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    HighContrastTheme.legendLabelFont = {
        size: '13px',
        fontWeight: 'Medium',
        color: '#FFFFFF',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    HighContrastTheme.dataLabelFont = {
        size: null,
        fontWeight: 'Medium',
        color: '#000000',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
})(HighContrastTheme || (HighContrastTheme = {}));
/**
 * Dark Theme configuration
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export var DarkTheme;
(function (DarkTheme) {
    /** @private */
    DarkTheme.mapsTitleFont = {
        fontFamily: 'Roboto, Noto, Sans-serif',
        fontWeight: 'Medium',
        size: '14px',
        fontStyle: 'Medium',
        color: '#FFFFFF'
    };
    /** @private */
    DarkTheme.mapsSubTitleFont = {
        size: '13px',
        color: '#FFFFFF',
        fontWeight: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif',
        fontStyle: 'Medium'
    };
    /** @private */
    DarkTheme.tooltipLabelFont = {
        size: '12px',
        color: '#282727',
        fontWeight: 'Regular',
        fontFamily: 'Roboto',
        fontStyle: 'Regular'
    };
    /** @private */
    DarkTheme.legendTitleFont = {
        size: '14px',
        fontWeight: 'Regular',
        color: '#FFFFFF',
        fontStyle: 'Regular',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    DarkTheme.legendLabelFont = {
        size: '13px',
        fontFamily: 'Roboto, Noto, Sans-serif',
        fontWeight: 'Medium',
        color: '#DADADA',
        fontStyle: 'Medium'
    };
})(DarkTheme || (DarkTheme = {}));
/**
 * Method to get the theme style.
 *
 * @param {MapsTheme} theme - Specifies the theme.
 * @returns {IThemeStyle} - Returns the theme style.
 * @private
 */
export function getThemeStyle(theme) {
    var style;
    var color;
    switch (theme.toLowerCase()) {
        case 'materialdark':
            color = '#303030';
            break;
        case 'fabricdark':
            color = '#201F1F';
            break;
        case 'bootstrapdark':
            color = '#1A1A1A';
            break;
    }
    switch (theme.toLowerCase()) {
        case 'materialdark':
        case 'fabricdark':
        case 'bootstrapdark':
            style = {
                backgroundColor: color,
                areaBackgroundColor: color,
                titleFontColor: '#FFFFFF',
                titleFontSize: '14px',
                subTitleFontColor: '#FFFFFF',
                legendTitleFontColor: '#DADADA',
                legendTextColor: '#DADADA',
                dataLabelFontColor: '#DADADA',
                tooltipFontColor: '#FFFFFF',
                tooltipFillColor: '#363F4C',
                zoomFillColor: '#FFFFFF',
                labelFontFamily: 'Roboto, Noto, Sans-serif',
                fontFamily: 'Roboto, Noto, Sans-serif',
                fontSize: '12px',
                legendFontSize: '12px',
                fontWeight: 'Medium',
                titleFontWeight: 'Medium',
                zoomSelectionColor: '#e61576',
                shapeFill: '#A6A6A6',
                shapeBorderColor: '#000000',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: '#009900',
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent',
                zoomButtonRadius: 30
            };
            break;
        case 'highcontrast':
            style = {
                backgroundColor: '#000000',
                areaBackgroundColor: '#000000',
                titleFontColor: '#FFFFFF',
                titleFontSize: '14px',
                subTitleFontColor: '#FFFFFF',
                legendTitleFontColor: '#FFFFFF',
                legendTextColor: '#FFFFFF',
                dataLabelFontColor: '#000000',
                tooltipFontColor: '#000000',
                tooltipFillColor: '#ffffff',
                zoomFillColor: '#FFFFFF',
                fontFamily: 'Roboto, Noto, Sans-serif',
                fontSize: '12px',
                legendFontSize: '12px',
                fontWeight: 'Medium',
                labelFontFamily: 'Roboto, Noto, Sans-serif',
                titleFontWeight: 'Medium',
                zoomSelectionColor: '#e61576',
                shapeFill: '#A6A6A6',
                shapeBorderColor: '#000000',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: '#009900',
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent',
                zoomButtonRadius: 30
            };
            break;
        case 'bootstrap4':
            style = {
                backgroundColor: '#FFFFFF',
                areaBackgroundColor: '#FFFFFF',
                titleFontColor: '#212529',
                subTitleFontColor: '#212529',
                legendTitleFontColor: '#212529',
                legendTextColor: '#212529',
                dataLabelFontColor: '#212529',
                tooltipFontColor: '#FFFFFF',
                tooltipFillColor: '#000000',
                zoomFillColor: '#5B6269',
                fontFamily: 'HelveticaNeue-Medium',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontSize: '16px',
                legendFontSize: '14px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                labelFontFamily: 'HelveticaNeue-Medium',
                titleFontWeight: 'Medium',
                zoomSelectionColor: '#e61576',
                shapeFill: '#A6A6A6',
                shapeBorderColor: '#000000',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: '#009900',
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent',
                zoomButtonRadius: 30
            };
            break;
        case 'tailwind':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                areaBackgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#374151',
                subTitleFontColor: '#374151',
                legendTitleFontColor: '#374151',
                legendTextColor: '#6B7280',
                dataLabelFontColor: '#505967',
                tooltipFontColor: '#F9FAFB',
                tooltipFillColor: '#111827',
                zoomFillColor: '#6b7280',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                labelFontFamily: 'Inter',
                titleFontWeight: '500',
                zoomSelectionColor: '#374151',
                shapeFill: '#E5E7EB',
                shapeBorderColor: '#000000',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: '#009900',
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent',
                zoomButtonRadius: 30
            };
            break;
        case 'tailwinddark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                areaBackgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#D1D5DB',
                subTitleFontColor: '#D1D5DB',
                legendTitleFontColor: '#D1D5DB',
                legendTextColor: '#D1D5DB',
                dataLabelFontColor: '#D1D5DB',
                tooltipFontColor: '#1F2937',
                tooltipFillColor: '#F9FAFB',
                zoomFillColor: '#D1D5DB',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                labelFontFamily: 'Inter',
                titleFontWeight: '500',
                zoomSelectionColor: '#F3F4F6',
                shapeFill: '#374151',
                shapeBorderColor: '#000000',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: '#009900',
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent',
                zoomButtonRadius: 30
            };
            break;
        case 'tailwind3':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                areaBackgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#111827',
                subTitleFontColor: '#111827',
                legendTitleFontColor: '#111827',
                legendTextColor: '#6B7280',
                dataLabelFontColor: '#111827',
                tooltipFontColor: '#F9FAFB',
                tooltipFillColor: '#111827',
                zoomFillColor: '#374151',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: '400',
                titleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Inter',
                titleFontWeight: '500',
                zoomSelectionColor: '#6B7280',
                shapeFill: '#F3F4F6',
                shapeBorderColor: '#E5E7EB',
                rectangleZoomFillColor: '#818CF8',
                rectangleZoomFillOpacity: 0.3,
                rectangleZoomBorderColor: '#4F46E5',
                legendBorderColor: '#E5E7EB',
                legendBorderWidth: 0,
                tooltipBorderColor: '#111827',
                zoomButtonRadius: 32
            };
            break;
        case 'tailwind3dark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                areaBackgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#FFFFFF',
                subTitleFontColor: '#FFFFFF',
                legendTitleFontColor: '#FFFFFF',
                legendTextColor: '#9CA3AF',
                dataLabelFontColor: '#FFFFFF',
                tooltipFontColor: '#1F2937',
                tooltipFillColor: '#F9FAFB',
                zoomFillColor: '#D1D5DB',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: '400',
                titleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Inter',
                titleFontWeight: '600',
                zoomSelectionColor: '#9CA3AF',
                shapeFill: '#282F3C',
                shapeBorderColor: '#282F3C',
                rectangleZoomFillColor: '#3730A3',
                rectangleZoomFillOpacity: 0.3,
                rectangleZoomBorderColor: '#6366F1',
                legendBorderColor: '#282F3C',
                legendBorderWidth: 0,
                tooltipBorderColor: '#F9FAFB',
                zoomButtonRadius: 30
            };
            break;
        case 'bootstrap5':
            style = {
                backgroundColor: 'transparent',
                areaBackgroundColor: 'transparent',
                titleFontColor: '#212529',
                subTitleFontColor: '#212529',
                legendTitleFontColor: '#212529',
                legendTextColor: '#212529',
                dataLabelFontColor: '#212529',
                tooltipFontColor: '#FFFFFF',
                tooltipFillColor: '#000000',
                zoomFillColor: '#6E757D',
                fontFamily: 'Segoe UI',
                fontSize: '10px',
                fontWeight: '400',
                titleFontSize: '14px',
                subTitleFontSize: '12px',
                legendFontSize: '10px',
                tooltipFillOpacity: 0.9,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Segoe UI',
                titleFontWeight: '400',
                zoomSelectionColor: '#212529',
                zoomBorderColor: '#DEE2E6',
                shapeFill: '#E9ECEF',
                shapeBorderColor: '#DEE2E6',
                zoomButtonRadius: 32,
                rectangleZoomBorderColor: '#0D6EFD',
                rectangleZoomFillColor: '#86B7FE',
                rectangleZoomFillOpacity: 0.30,
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent'
            };
            break;
        case 'bootstrap5dark':
            style = {
                backgroundColor: 'transparent',
                areaBackgroundColor: 'transparent',
                titleFontColor: '#DEE2E6',
                subTitleFontColor: '#DEE2E6',
                legendTitleFontColor: '#DEE2E6',
                legendTextColor: '#DEE2E6',
                dataLabelFontColor: '#DEE2E6',
                tooltipFontColor: '#212529',
                tooltipFillColor: '#FFFFFF',
                zoomFillColor: '#ADB5BD',
                fontFamily: 'Segoe UI',
                fontSize: '10px',
                fontWeight: '400',
                titleFontSize: '14px',
                subTitleFontSize: '12px',
                legendFontSize: '10px',
                tooltipFillOpacity: 0.9,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Segoe UI',
                titleFontWeight: '400',
                zoomSelectionColor: '#F8F9FA',
                zoomBorderColor: '#495057',
                shapeFill: '#343A40',
                shapeBorderColor: '#495057',
                zoomButtonRadius: 32,
                rectangleZoomFillColor: '#86B7FE',
                rectangleZoomBorderColor: '#0D6EFD',
                rectangleZoomFillOpacity: 0.30,
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent'
            };
            break;
        case 'fluent':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                areaBackgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#201F1E',
                subTitleFontColor: '#201F1E',
                legendTitleFontColor: '#201F1E',
                legendTextColor: '#201F1E',
                dataLabelFontColor: '#201F1E',
                tooltipFontColor: '#323130',
                tooltipFillColor: '#FFFFFF',
                zoomFillColor: '#A19F9D',
                fontFamily: 'Segoe UI',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Segoe UI',
                titleFontWeight: '600',
                zoomSelectionColor: '#323130',
                shapeFill: '#F3F2F1',
                shapeBorderColor: '#000000',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: '#009900',
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent',
                zoomButtonRadius: 30
            };
            break;
        case 'fluentdark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                areaBackgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#F3F2F1',
                subTitleFontColor: '#F3F2F1',
                legendTitleFontColor: '#F3F2F1',
                legendTextColor: '#F3F2F1',
                dataLabelFontColor: '#F3F2F1',
                tooltipFontColor: '#F3F2F1',
                tooltipFillColor: '#252423',
                zoomFillColor: '#484644',
                fontFamily: 'Segoe UI',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Segoe UI',
                titleFontWeight: '600',
                zoomSelectionColor: '#F3F2F1',
                shapeFill: '#252423',
                shapeBorderColor: '#000000',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: '#009900',
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent',
                zoomButtonRadius: 30
            };
            break;
        case 'material3':
            style = {
                backgroundColor: 'transparent',
                areaBackgroundColor: 'transparent',
                titleFontColor: '#1C1B1F',
                subTitleFontColor: '#1C1B1F',
                legendTitleFontColor: '#1C1B1F',
                legendTextColor: '#49454E',
                dataLabelFontColor: '#1C1B1F',
                tooltipFontColor: '#F4EFF4',
                tooltipFillColor: '#313033',
                zoomFillColor: '#49454E',
                fontFamily: 'Roboto',
                fontSize: '14px',
                titleFontSize: '16px',
                subTitleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Roboto',
                titleFontWeight: '500',
                fontWeight: '400',
                zoomSelectionColor: '#49454E',
                shapeFill: '#E7E0EC',
                shapeBorderColor: '#000000',
                rectangleZoomFillColor: '#6750A4',
                rectangleZoomFillOpacity: 0.24,
                rectangleZoomBorderColor: '#6750A4',
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent',
                zoomButtonRadius: 30
            };
            break;
        case 'material3dark':
            style = {
                backgroundColor: 'transparent',
                areaBackgroundColor: 'transparent',
                titleFontColor: '#E6E1E5',
                subTitleFontColor: '#E6E1E5',
                legendTitleFontColor: '#E6E1E5',
                legendTextColor: '#CAC4D0',
                dataLabelFontColor: '#E6E1E5',
                tooltipFontColor: '#313033',
                tooltipFillColor: '#E6E1E5',
                zoomFillColor: '#E6E1E5',
                fontFamily: 'Roboto',
                fontSize: '14px',
                titleFontSize: '16px',
                subTitleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Roboto',
                titleFontWeight: '500',
                fontWeight: '400',
                zoomSelectionColor: '#E6E1E5',
                shapeFill: '#49454F',
                shapeBorderColor: '#000000',
                rectangleZoomFillColor: '#D0BCFF',
                rectangleZoomFillOpacity: 0.24,
                rectangleZoomBorderColor: '#D0BCFF',
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent',
                zoomButtonRadius: 30
            };
            break;
        case 'fluent2':
            style = {
                backgroundColor: 'transparent',
                areaBackgroundColor: 'transparent',
                titleFontColor: '#242424',
                subTitleFontColor: '#242424',
                legendTitleFontColor: '#242424',
                legendTextColor: '#242424',
                dataLabelFontColor: '#242424',
                tooltipFontColor: '#242424',
                tooltipFillColor: '#FFFFFF',
                zoomFillColor: '#D1D1D1',
                fontFamily: 'Segoe UI',
                fontSize: '10px',
                fontWeight: '400',
                titleFontSize: '14px',
                subTitleFontSize: '12px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Segoe UI',
                titleFontWeight: '600',
                zoomSelectionColor: '#242424',
                shapeFill: '#E6E6E6',
                shapeBorderColor: '#EBEBEB',
                rectangleZoomFillColor: '#B4D6FA',
                rectangleZoomFillOpacity: 0.25,
                rectangleZoomBorderColor: '#0F6CBD',
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent',
                zoomButtonRadius: 32
            };
            break;
        case 'fluent2dark':
            style = {
                backgroundColor: 'transparent',
                areaBackgroundColor: 'transparent',
                titleFontColor: '#FFFFFF',
                subTitleFontColor: '#FFFFFF',
                legendTitleFontColor: '#FFFFFF',
                legendTextColor: '#FFFFFF',
                dataLabelFontColor: '#FFFFFF',
                tooltipFontColor: '#FFFFFF',
                tooltipFillColor: '#292929',
                zoomFillColor: '#666',
                fontFamily: 'Segoe UI',
                fontSize: '10px',
                fontWeight: '400',
                titleFontSize: '14px',
                subTitleFontSize: '12px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Segoe UI',
                titleFontWeight: '600',
                zoomSelectionColor: '#FFFFFF',
                shapeFill: '#333333',
                shapeBorderColor: '#000000',
                rectangleZoomFillColor: '#0E4775',
                rectangleZoomFillOpacity: 0.25,
                rectangleZoomBorderColor: '#0E4775',
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent',
                zoomButtonRadius: 32
            };
            break;
        case 'fluent2highcontrast':
            style = {
                backgroundColor: 'transparent',
                areaBackgroundColor: 'transparent',
                titleFontColor: '#FFFFFF',
                subTitleFontColor: '#FFFFFF',
                legendTitleFontColor: '#FFFFFF',
                legendTextColor: '#FFFFFF',
                dataLabelFontColor: '#FFFFFF',
                tooltipFontColor: '#FFFFFF',
                tooltipFillColor: '#000000',
                zoomFillColor: '#3FF23F',
                fontFamily: 'Segoe UI',
                fontSize: '10px',
                fontWeight: '400',
                titleFontSize: '14px',
                subTitleFontSize: '12px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Segoe UI',
                titleFontWeight: '600',
                zoomSelectionColor: '#FFFFFF',
                zoomBorderColor: '#FFFFFF',
                shapeFill: '#FFFFFF',
                shapeBorderColor: '#FFFFFF',
                rectangleZoomFillColor: '#1AEBFF',
                rectangleZoomFillOpacity: 0.25,
                rectangleZoomBorderColor: '#1AEBFF',
                legendBorderColor: '#FFFFFF',
                legendBorderWidth: 1,
                tooltipBorderColor: '#FFF',
                zoomButtonRadius: 32
            };
            break;
        default:
            style = {
                backgroundColor: '#FFFFFF',
                areaBackgroundColor: '#FFFFFF',
                titleFontColor: '#424242',
                titleFontSize: '14px',
                subTitleFontColor: '#424242',
                legendTitleFontColor: '#757575',
                legendTextColor: '#757575',
                dataLabelFontColor: '#000000',
                tooltipFontColor: '#FFFFFF',
                tooltipFillColor: '#000000',
                zoomFillColor: '#737373',
                labelFontFamily: 'Roboto, Noto, Sans-serif',
                fontFamily: 'Roboto, Noto, Sans-serif',
                fontSize: '12px',
                legendFontSize: '12px',
                fontWeight: 'Medium',
                titleFontWeight: 'Medium',
                zoomSelectionColor: '#e61576',
                shapeFill: '#A6A6A6',
                shapeBorderColor: '#000000',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: '#009900',
                legendBorderColor: '#000000',
                legendBorderWidth: 0,
                tooltipBorderColor: 'transparent',
                zoomButtonRadius: 30
            };
            break;
    }
    return style;
}
