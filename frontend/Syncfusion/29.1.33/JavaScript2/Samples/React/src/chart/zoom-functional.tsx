/**
 * Sample for Zooming in chart
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, SplineAreaSeries, DateTime, Legend, Zoom, ILoadedEventArgs, ChartTheme, ScrollBar, LineSeries, Crosshair, Tooltip } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
const SAMPLE_CSS = `
#control-container {
    padding: 0px !important;
}

#material-gradient-chart stop {
    stop-color: #00bdae;
}

#fabric-gradient-chart stop {
    stop-color: #4472c4;
}

#bootstrap-gradient-chart stop {
    stop-color: #a16ee5;
}

#bootstrap4-gradient-chart stop {
    stop-color: #a16ee5;
}

#fluent-gradient-chart stop {
    stop-color: #1AC9E6;
}
#fluent-dark-gradient-chart stop {
    stop-color: #1AC9E6;
}

#highcontrast-gradient-chart stop {
    stop-color: #79ECE4;
}

#tailwind-gradient-chart stop {
    stop-color: #5A61F6;
}

#tailwind3-gradient-chart stop {
    stop-color: #2F4074;
}

#bootstrap5-gradient-chart stop {
    stop-color: #FD7E14;
}

#material-dark-gradient-chart stop {
    stop-color: #9ECB08;
}

#fabric-dark-gradient-chart stop {
    stop-color: #4472c4;
}

#bootstrap-dark-gradient-chart stop {
    stop-color: #a16ee5;
}

#tailwind-dark-gradient-chart stop {
stop-color: #8B5CF6;
}

#tailwind3-dark-gradient-chart stop {
stop-color: #8029F1;
}

#bootstrap5-dark-gradient-chart stop {
    stop-color:  #FD7E14;
}
#material3-gradient-chart stop {
    stop-color: #6355C7;
}

#material3-dark-gradient-chart stop {
    stop-color: #4EAAFF;
}

#fluent2-gradient-chart stop {
    stop-color: #6200EE;
}

#fluent2-highcontrast-gradient-chart stop {
    stop-color: #9BB449;
}

#fluent2-dark-gradient-chart stop {
    stop-color: #9BB449;
}

.chart-gradient stop[offset="0"] {
    stop-opacity: 0.75;
}

.chart-gradient stop[offset="1"] {
    stop-opacity: 0;
}`
let themes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark'];
let borderColor: string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449'];
const data: number[] = [
    614.398886, 521.54577, 607.41, 528.674034, 649.02, 634.855, 548.42, 639.808083, 599.36, 643.823032, 470.58, 547.33856, 543.24, 350.4686, 453.804214, 358.51972, 127.98, 465.66413, 121.67, 276.50556, 130.28, 290.43361, 247.47, 56.006424, 56.66, 120.11538, 272.18, 330.8197, 329.2, 141.8835, 491.31, 554.09436, 340.3, 666.27214, 386.05, 675.33273, 355.49,
    479.08539, 587.95, 478.83736, 613.33, 477.08728, 665.84, 277.7215, 360.77, 582.38945, 685.93, 690.52167, 526, 400.62505, 305.46, 209.73143, 393.93, 218.58078, 454.97, 228.5354, 405.23, 238.29027, 251.37, 343.4591, 228.44, 542.32413, 403.53, 238.23318, 358.73, 233.33633, 408.9, 528.79991, 212.4, 226.28374, 535.47, 225.42172, 358.46, 225.79953, 159.09,
    226.62344, 224.74, 227.80173, 317.94, 230.89693, 182.87, 234.7583, 158.2, 238.13414, 80.91, 241.77034, 428.72, 245.7227, 138.35, 252.26382, 244.54, 262.16412, 320.02, 275.77518, 696.06, 291.17618, 189.3, 306.58655, 234.2, 321.97433, 138.79, 339.30057, 629.59, 357.09732, 461.06, 271.47717, 336.29, 384.07816, 142.83913, 734.0764, 429.46431, 325.61528, 524.30643, 623.9551, 522.99226, 420.52591, 418.719, 216.7613, 512.78256, 209.27946, 305.67441, 502.32135, 399.06017, 297.9212,
    598.5982, 299.12894, 399.64157, 200.36414, 300.14624, 495.33469, 589.29276, 683.48856, 776.89297, 869.80894, 964.78387, 562.82607, 462.48674, 763.19841, 561.952, 660.5842, 579.53, 897.30597, 1191.34, 825.4507, 768.11, 925.4583, 929.94, 743.39008, 656.77, 964.59607, 646.67, 786.89075, 1138.39, 808.98856, 921.24, 529.6918, 629.64, 550.1466, 607.59, 570.2937,
    740.76, 887.86725, 861.68, 801.6552, 973.58, 911.82684, 919.3063, 951.46, 926.03754, 903.25, 1031.8247, 942.26, 937.3344, 833.13, 941.21497, 960.47, 963.5842, 874.26, 843.5705, 706.63, 844.7061, 981.11, 848.95197, 817.1, 854.494, 879.96, 960.08954, 753.68, 864.54816, 940.14, 1068.82654, 1035.79, 1075.15265, 966.54, 1083.6054, 980.08, 993.3701, 834.99, 803.48914, 920.87, 917.0557, 930.91, 1032.7196, 1001.77, 981.94745, 996.65, 974.208, 887.35, 796.593, 958.91, 717.26483,
    880.45, 835.86, 893.28, 954.0202, 996.93, 972.2047, 925.89, 891.02405, 947.39, 915.253, 1079.09, 1099.29254, 999.52, 946.97455, 1012.11, 962.524, 876.8499, 931.4, 992.94336, 817.22, 959.316, 1029.63, 925.6157, 964.41, 1039.7686, 1009.6823,
    909.93, 957.2489, 926.28, 864.1897, 837.98, 772.2601, 1118.3536, 825.377, 733.552, 924.49683, 623.36273, 821.46194, 640.2916, 740.6307, 836.18, 629.99832, 521.4496, 612.14145, 900.74487, 790.60403, 681.58118, 671.88144, 759.91208, 549.7556, 539.2611, 629.46036, 720.13544, 765.19, 799.75995, 789.3716, 877.27222, 735.33597, 723.5327, 842.83913, 834.0764, 829.46431,
    825.61528, 824.30643, 723.9551, 722.99226, 820.52591, 1118.719, 916.7613, 912.78256, 1109.27946, 1105.67441, 1002.32135, 999.06017, 1007.9212, 1198.5982, 999.12894, 899.64157, 800.36414, 800.14624, 795.33469, 789.29276, 883.48856, 776.89297, 869.80894, 764.78387, 862.82607, 862.48674, 863.19841, 761.952, 760.5842, 757.84167, 653.33673, 752.09932, 649.18753, 844.58505, 943.40967, 1191.34, 825.4507, 968.11, 925.4583, 829.94, 743.39008, 656.77, 864.59607, 646.67, 786.89075, 938.39, 808.98856, 921.24, 1129.6918, 943.84186,
    843.55971, 846.45683, 750.92189, 754.36969, 856.98132, 956.89268, 853.06917, 647.95851, 636.3362, 622.156204, 809.84816, 795.78587, 836.74696, 814.1667, 877.60014, 733.54555, 694.506134, 876.84415, 903.879597, 955.74452, 928.912617, 835.43111, 939.953342, 997.019985, 962.650814, 936.269093, 946.043144,
    934.569065, 832.941383, 931.087645, 826.033583, 723.766449, 819.142115, 835.163087, 638.91, 737.216602, 884.18, 879.89, 783.3859, 795.7721, 847.68, 615.0879, 577.87, 628.5306, 740.7, 550.6343, 418.6, 672.2998, 756.14, 691.3354, 506.8083, 594.26, 519.4839, 561.31, 633.9938, 382.1, 649.3354, 446.36, 565.4047, 683.1387, 568.3, 301.0784, 417.28, 319.4847, 287.44, 340.0177, 395.07, 362.5557, 483.1818, 335.15, 302.4026, 538.44, 419.7825, 246.58, 436.3804, 208.61, 456.0287, 479.5289, 207.2795, 199.13, 236.8627, 347.41, 263.6412, 398, 389.2363, 404.2, 315.5424, 240.4054, 215.97, 362.2366, 435.28, 381.7034, 434.75,
    399.0667, 484.85, 215.6605, 233.482, 233.5, 353.419, 360.83, 376.3098, 450.29, 400.6027, 525.85, 424.29, 450.9236, 327.36, 378.9559, 303.5, 308.7958, 373.22, 238.2953, 251.66, 577.77, 465.5066, 587.279, 306.5266, 143., 324.337, 296.93, 204.059, 249.2, 157.504, 275.3623, 295.7478, 493.45, 255.7605, 516.52, 252.5295, 492.84, 299.2986, 428.48, 296.2834, 293.2686, 190.89, 200.2534, 474.67, 387.2385, 554.52, 251.496, 400.82, 215.7534, 230.0, 244.2686, 171.06, 258.5261, 485.09, 272.7834, 504.8, 287.04, 220.2986, 329.2, 225.556, 349.02, 229.835, 214.26, 244.07, 112.56, 382.53, 197.66, 256.76, 222.66, 274.75, 235.49, 448.64, 232.66, 332.2, 284.59, 376.78, 281.26, 526.83, 432.5, 585.44, 646.33, 592.61, 601.78, 507.34, 227.6, 235.11, 456.7, 424.33, 357.15, 249.69, 437.63, 537.64, 587.65, 146, 395.36554,
    201.9655, 208.5655, 215.16553, 321.76553, 228.36554, 434.9655, 412.56, 582.53, 697.66, 256.76, 222.66, 274.75, 235.49, 448.64, 232.66, 332.2, 284.59, 376.78, 281.26, 526.32247, 532.5972, 557.89696, 573.684204, 449.47144, 385.25869, 341.04593, 176.57612, 272.563, 526.83, 432.5, 585.44, 646.33, 592.61, 601.78, 507.34, 641.56552, 648.16553, 554.76553, 661.36554, 767.9655, 761.67386, 755.3822, 649.0905, 742.79886, 636.5072, 386.05, 475.33273, 355.49, 479.08539, 587.95, 478.83736, 613.33, 477.08728, 665.84, 577.7215, 360.77, 582.38945, 485.93, 690.52167, 526, 400.62505, 305.46, 209.73143, 393.93, 518.58078, 454.97, 428.5354, 405.23, 238.29027, 251.37, 730.2155, 723.92386, 717.6322, 611.3405, 705.04886, 798.7572, 592.4655, 886.06552, 779.66553, 673.26553, 566.86554, 660.4655, 754.06552, 548.66553, 642.26553, 734.86554, 628.4655, 922.06552, 815.66553,
    601.79053, 787.91553, 674.04053, 660.16553, 746.29053, 832.41553, 718.54053, 604.66553, 790.79053, 876.91553, 763.04053, 552.32718, 357.88896, 763.45074, 669.01254, 874.57433, 680.13611, 685.6979, 697.76326, 709.82861, 521.89395, 533.9593, 446.02466, 758.09003, 862.8863, 527.6959, 713.62497, 899.55402, 885.48308, 815.73608, 869.26488, 837.79367, 926.32247, 932.5972, 757.89696, 873.684204, 949.47144, 885.25869, 941.04593, 1076.57612, 972.563, 967.63648,
    1163.166668, 1158.69685, 1154.227036, 951.51509, 1048.80315, 1046.091206, 1063.379265, 940.667324, 937.95538, 928.466536, 818.97769, 744.488845, 949.488845, 932.7196, 1001.77, 1051.94745, 1086.65, 1074.208, 987.35, 1012, 1096.593, 958.91, 1017.26483, 980.45, 1035.86615, 1093.28, 1054.0202, 996.93, 972.2047, 925.89, 791.02405, 847.39, 915.253, 779.09, 729.29254, 899.52, 746.97455, 812.11, 762.524, 976.8499, 931.4, 892.94336, 817.22, 919.316, 929.63, 725.6157, 564.41, 639.7686, 749.6823, 609.93,
    757.2489, 826.28, 764.1897, 837.98, 772.2601, 884.18, 879.89, 883.3859, 895.7721, 747.68, 815.0879, 777.87, 728.5306, 840.7, 850.6343, 818.6, 857.2489, 926.28, 864.1897, 837.98, 718.3536, 825.377, 733.552, 924.49683, 923.36273, 821.46194, 921.23618, 822.9604, 925.36377, 826.96298, 726.03226, 827.3198, 630.28207, 734.43738, 737.6219, 640.2916, 840.6307, 736.18, 729.99832, 621.4496, 612.14145, 725.377, 533.552, 624.49683, 623.36273, 721.46194, 521.23618, 622.9604, 525.36377,
    426.96298, 226.03226, 427.3198, 430.28207, 234.43738, 437.6219, 240.2916, 440.6307, 336.18, 429.99832, 521.4496, 312.14145, 200.74487, 390.60403, 481.58118, 671.88144, 559.91208, 549.7556, 339.2611, 429.46036, 520.13544, 365.19, 299.75995, 289.3716, 277.27222, 335.33597, 523.5327, 442.83913, 334.0764, 429.46431, 325.61528,
    524.30643, 623.9551, 522.99226, 420.52591, 418.719, 216.7613, 512.78256, 209.27946, 305.67441, 302.32135, 399.06017, 297.9212, 398.5982, 299.12894, 399.64157, 300.36414, 400.14624, 495.33469, 589.29276, 683.48856, 476.89297, 269.80894, 164.78387, 262.82607, 262.48674, 163.19841, 161.952, 260.5842, 157.84167, 253.33673,
    252.09932, 249.18753, 144.58505, 243.40967, 343.84186, 243.55971, 146.45683, 250.92189, 254.36969, 356.98132, 256.89268, 153.06917, 147.95851, 136.3362, 222.156204, 209.84816, 195.78587, 136.74696, 114.1667, 177.60014, 333.54555, 394.506134, 376.84415, 303.879597, 155.74452, 428.912617, 435.43111, 239.953342,
    397.019985, 362.650814, 136.269093, 336.043144, 234.569065, 332.941383, 231.087645, 126.033583, 323.766449, 419.142115, 135.163087, 538.91, 237.216602, 614.398886, 421.54577, 367.41, 328.674034, 449.02, 134.855, 248.42, 439.808083, 199.36, 343.823032, 170.58, 47.33856, 43.24, 50.46876, 53.804214, 358.51972, 127.98, 465.66413, 121.67, 276.50556,
    130.28, 390.43361, 247.47, 56.006424, 56.66, 120.11538, 272.18, 330.8197, 329.2, 141.8835, 491.31, 554.09436, 340.3, 666.27214, 386.05, 475.33273, 355.49, 479.08539, 587.95, 478.83736, 613.33, 477.08728, 665.84, 277.7215, 360.77, 582.38945, 685.93, 690.52167, 426, 400.62505, 305.46, 209.73143, 393.93, 218.58078,
    454.97, 228.5354, 405.23, 238.29027, 251.37, 343.4591, 228.44, 442.32413, 403.53, 238.23318, 358.73, 233.33633, 408.9, 328.79991, 212.4, 226.28374, 535.47, 225.42172, 258.46, 225.79953, 159.09, 226.62344, 224.74, 227.80173, 317.94, 230.89693, 182.87, 234.7583, 158.2, 238.13414, 80.91, 241.77034, 428.72, 245.7227, 338.35,
    252.26382, 244.54, 262.16412, 320.02, 275.77518, 396.06, 291.17618, 189.3, 306.58655, 234.2, 321.97433, 138.79, 339.30057, 429.59, 357.09732, 461.06, 271.47717, 336.29, 384.07816, 142.83913, 334.0764, 429.46431, 325.61528, 524.30643, 623.9551, 421.23618, 722.9604, 325.36377, 526.96298, 426.03226, 227.3198, 430.28207, 634.43738, 437.6219
];
const Zooming = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };
    let series1: Object[] = [];
    let point1: Object;
    let i: number;
    for (i = 1; i < data.length; i++) {
        point1 = { x: new Date(1941, i + 2, i), y: data[i as number] / 1000 - 0.5 };
        series1.push(point1);
    }
    let data1: Object[] = series1;
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts'
                    style={{ textAlign: "center" }}
                    primaryXAxis={{ valueType: 'DateTime', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, scrollbarSettings: { enableZoom: false, position: 'Bottom' } }}
                    primaryYAxis={{ title: 'Temperature Anomaly (°C)', labelFormat: '{value}°C', majorTickLines: { width: 0 }, lineStyle: { width: 0 }, enableScrollbarOnZooming: false }}
                    chartArea={{ border: { width: 0 } }}
                    zoomSettings={{ enableSelectionZooming: true, enableMouseWheelZooming: true, enableDeferredZooming: false, enableScrollbar: true, enablePinchZooming: true, enableAnimation: true,  mode: 'X', showToolbar : true, toolbarPosition:{y: -60, draggable: true}}}
                    load={load.bind(this)}
                    loaded={onChartLoad.bind(this)}
                    margin = {{top: 20}}
                    tooltip={{ enable: true, showNearestTooltip: true, header: '<b>${point.x}</b>', format: 'Temperature: <b>${point.y}</b>', enableHighlight: true }}
                    title={Browser.isDevice ? 'Monthly Temperature Anomalies' : 'Global Warming: Monthly Temperature Anomalies'}
                    titleStyle= {{ textAlignment: Browser.isDevice ? 'Near' : 'Center' }}
                    width={Browser.isDevice ? '100%' : '80%'}>
                    <Inject services={[LineSeries, DateTime, Zoom, Crosshair, Tooltip, ScrollBar]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName='x' yName='y' type='Line' />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                    <p>
                        This sample demonstrates the zooming and panning features of the chart, allowing users to explore data interactively.
                    </p>
                </div>
                <div id="description">
                    <p>The chart component supports four types of zooming, which can be configured using the <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/chart/zoomSettingsModel/#enableselectionzooming" aria-label="Navigate to the enableSelectionZooming property reference for TypeScript Chart ZoomSettings">enableSelectionZooming</a>, <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/chart/zoomSettingsModel/#enablepinchzooming" aria-label="Navigate to the enablePinchZooming property reference for TypeScript Chart ZoomSettings">enablePinchZooming</a>, <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/chart/zoomSettingsModel/#enablemousewheelzooming" aria-label="Navigate to the enableMouseWheelZooming property reference for TypeScript Chart ZoomSettings">enableMouseWheelZooming</a>, and <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/chart/zoomSettingsModel/#enabledeferredzooming" aria-label="Navigate to the enableDeferredZooming property reference for TypeScript Chart ZoomSettings">enableDeferredZooming</a> properties. This sample demonstrates the following zooming and panning behaviors:
                    </p>
                    <ul>
                        <li><b>Selection Zooming</b> : Click and drag the mouse over the chart area to enable selection zooming.</li>
                        <li><b>Toolbar</b> : Hover over the toolbar at the top-right corner of the chart area to switch between zooming and panning.</li>
                        <li><b>Pinch Zooming</b> : Pinch in or pinch out on the chart area to zoom in or out on touch-enabled devices.</li>
                        <li><b>Panning</b> : Touch and drag to pan the chart.</li>
                        <li><b>Reset Zoom</b> : Double-tap to reset the zoomed chart.</li>
                    </ul>
                    <p>The chart also supports different zooming modes, which can be configured using the <a target="_blank" href="http://ej2.syncfusion.com/documentation/chart/api-zoomSettings.html#mode-zoommode" aria-label="Navigate to the mode property reference for TypeScript Chart ZoomSettings">mode</a> property.</p>
                    <ul>
                        <li><b>XY</b> - Zoom the chart with respect to both axes.</li>
                        <li><b>X</b> - Zoom the chart with respect to the horizontal axis only.</li>
                        <li><b>Y</b> - Zoom the chart with respect to the vertical axis only.</li>
                    </ul>
                    <p>The <code>toolbarPosition</code> property is used to adjust the position of the zoom toolbar. In this example, the toolbar is moved 60 pixels upward from its default position. The <code>draggable</code> property is used to drag and drop the zoom toolbar to any position within the chart area</p>
                    <p>The chart supports different scrollbar positions. By default, it appears next to the axis line, but you can adjust its placement using the <code>position</code> property of <code>scrollbarSettings</code>. This positioning allows better customization and flexibility in the chart's design.</p>
                    <p>
                        <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use zooming, we need to inject 
                        <code>Zoom</code> module using <code>Chart.Inject(Zoom)</code> method.
                    </p>
                    <p>
                        More information on the Zooming can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/zooming" aria-label="Navigate to the documentation for Zooming in TypeScript Chart control"> documentation section</a>.
                    </p> 
                </div>
            </div>
    )
}
export default Zooming;