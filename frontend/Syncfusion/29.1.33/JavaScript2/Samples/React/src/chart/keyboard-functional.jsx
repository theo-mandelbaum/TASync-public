/**
 * Sample for RangeColumn series
 */
import * as React from "react";
import { useEffect, useRef } from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, StripLine, ColumnSeries, Category, Zoom, Selection, DataLabel, Tooltip, Legend } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme, keyBootstrap4Colors, keyBootstrapdarkColors, keyFabricDark, pointBootstrap5Colors, pointBootstrap5DarkColors, pointBootstrapColors, pointFabricColors, pointFluent2Colors, pointFluent2HighContrastColors, pointFluentColors, pointFluentDarkColors, pointHighContrastColors, pointMaterial3Colors, pointMaterial3DarkColors, pointMaterialColors, pointMaterialDarkColors, pointTailwind3Colors, pointTailwind3DarkColors, pointTailwindColors, pointTailwindDarkColors } from './theme-color';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const KeyboardNavigation = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let chartInstance = useRef(null);
    let data = [
        { xValue: "Jan 15", yValue: 10 },
        { xValue: "Jan 31", yValue: 15 },
        { xValue: "Feb 15", yValue: 15 },
        { xValue: "Feb 28", yValue: 20 },
        { xValue: "March 15", yValue: 20 },
        { xValue: "March 31", yValue: 25 },
        { xValue: "March", yValue: null }
    ];
    let data1 = [
        { xValue: "Apr 15", yValue: 36 },
        { xValue: "Apr 30", yValue: 48 },
        { xValue: "May 15", yValue: 43 },
        { xValue: "May 31", yValue: 59 },
        { xValue: "Jun 15", yValue: 35 },
        { xValue: "Jun 30", yValue: 50 },
        { xValue: "Jun", yValue: null }
    ];
    let data2 = [
        { xValue: "Jul 15", yValue: 30 },
        { xValue: "Jul 31", yValue: 45 },
        { xValue: "Aug 15", yValue: 30 },
        { xValue: "Aug 31", yValue: 55 },
        { xValue: "Sep 15", yValue: 57 },
        { xValue: "Sep 30", yValue: 60 },
        { xValue: "Sep", yValue: null }
    ];
    let data3 = [
        { xValue: "Oct 15", yValue: 60 },
        { xValue: "Oct 31", yValue: 70 },
        { xValue: "Nov 15", yValue: 70 },
        { xValue: "Nov 30", yValue: 70 },
        { xValue: "Dec 15", yValue: 90 },
        { xValue: "Dec 31", yValue: 100 }
    ];
    let FontColor = "#353535";
    let seriesIndex = 0;
    let Segments = [[0, 5], [7, 12], [14, 19], [21, 26]];
    const legendClick = (args) => {
        seriesIndex = 0;
        getStriplineValues(args.series.name);
    };
    const getStriplineValues = (legendClickedName) => {
        let chart = chartInstance.current;
        for (var i = 0; i < chart.series.length; i++) {
            var name = chart.series[i].name;
            var visible = name === legendClickedName ? !chart.series[i].visible : chart.series[i].visible;
            if (seriesIndex > 3) {
                seriesIndex = 0;
            }
            if (name == "Quarter 1") {
                chart.primaryYAxis.stripLines[0].visible = chart.primaryYAxis.stripLines[1].visible = visible;
                if (chart.primaryYAxis.stripLines[0].visible) {
                    chart.primaryYAxis.stripLines[0].segmentStart = chart.primaryYAxis.stripLines[1].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[0].segmentEnd = chart.primaryYAxis.stripLines[1].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else if (name == "Quarter 2") {
                chart.primaryYAxis.stripLines[2].visible = chart.primaryYAxis.stripLines[3].visible = visible;
                if (chart.primaryYAxis.stripLines[2].visible) {
                    chart.primaryYAxis.stripLines[2].segmentStart = chart.primaryYAxis.stripLines[3].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[2].segmentEnd = chart.primaryYAxis.stripLines[3].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else if (name == "Quarter 3") {
                chart.primaryYAxis.stripLines[4].visible = chart.primaryYAxis.stripLines[5].visible = visible;
                if (chart.primaryYAxis.stripLines[4].visible) {
                    chart.primaryYAxis.stripLines[4].segmentStart = chart.primaryYAxis.stripLines[5].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[4].segmentEnd = chart.primaryYAxis.stripLines[5].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else {
                chart.primaryYAxis.stripLines[6].visible = chart.primaryYAxis.stripLines[7].visible = visible;
                if (chart.primaryYAxis.stripLines[6].visible) {
                    chart.primaryYAxis.stripLines[6].segmentStart = chart.primaryYAxis.stripLines[7].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[6].segmentEnd = chart.primaryYAxis.stripLines[7].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
        }
        chart.refresh();
    };
    const loaded = (args) => {
        let chart = document.getElementById('keyboard_charts');
        chart.setAttribute('title', '');
    };
    const load = (args) => {
        loadChartTheme(args);
        FontColor = args.chart.theme.indexOf("Dark") > -1 || args.chart.theme.indexOf("HighContrast") > -1 ? "#F3F2F1" : "#353535";
        let FillColors;
        if (args.chart.theme === 'MaterialDark') {
            FillColors = pointMaterialDarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Material') {
            FillColors = pointMaterialColors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === "Fabric") {
            FillColors = pointFabricColors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === 'FabricDark') {
            FillColors = keyFabricDark;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Bootstrap5Dark') {
            FillColors = pointBootstrap5DarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Bootstrap4') {
            FillColors = keyBootstrap4Colors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === 'Bootstrap5') {
            FillColors = pointBootstrap5Colors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === "Bootstrap") {
            FillColors = pointBootstrapColors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === 'BootstrapDark') {
            FillColors = keyBootstrapdarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'TailwindDark') {
            FillColors = pointTailwindDarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Tailwind') {
            FillColors = pointTailwindColors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === "HighContrast") {
            FillColors = pointHighContrastColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Fluent') {
            FillColors = pointFluentColors;
            FontColor = '#000000';
        }
        else if (args.chart.theme === 'FluentDark') {
            FillColors = pointFluentDarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Material3') {
            FillColors = pointMaterial3Colors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === 'Material3Dark') {
            FillColors = pointMaterial3DarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Fluent2') {
            FillColors = pointFluent2Colors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === 'Fluent2HighContrast' || args.chart.theme === 'Fluent2Dark') {
            FillColors = pointFluent2HighContrastColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Tailwind3Dark') {
            FillColors = pointTailwind3DarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Tailwind3') {
            FillColors = pointTailwind3Colors;
            FontColor = "#000000";
        }
        else {
            FillColors = pointFluentColors;
            FontColor = "#FFFFFF";
        }
        args.chart.primaryYAxis.stripLines[0].color = FillColors[0 % 10];
        args.chart.primaryYAxis.stripLines[2].color = FillColors[1 % 10];
        args.chart.primaryYAxis.stripLines[4].color = FillColors[2 % 10];
        args.chart.primaryYAxis.stripLines[6].color = FillColors[3 % 10];
        args.chart.primaryYAxis.stripLines[1].textStyle.color = FontColor;
        args.chart.primaryYAxis.stripLines[3].textStyle.color = FontColor;
        args.chart.primaryYAxis.stripLines[5].textStyle.color = FontColor;
        args.chart.primaryYAxis.stripLines[7].textStyle.color = FontColor;
    };
    return (<div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='keyboard_charts' ref={chartInstance} style={{ textAlign: "center" }} selectionMode='Point' selectionPattern='DiagonalForward' enableSideBySidePlacement={false} enableAnimation={false} legendClick={legendClick.bind(this)} load={load.bind(this)} loaded={loaded.bind(this)} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, labelStyle: { size: "0px" }, majorTickLines: { width: 0 } }} primaryYAxis={{ maximum: 120, title: "Sales in Percentage", labelFormat: "{value}%", lineStyle: { width: 0 }, majorTickLines: { width: 0 }, stripLines: [{ isSegmented: true, start: 33, end: 35.5, visible: true, segmentStart: 0, segmentEnd: 5 }, { isSegmented: true, start: 39, end: 39.2, visible: true, text: "Jan - Mar", color: "transparent", segmentStart: 0, segmentEnd: 5 }, { isSegmented: true, start: 65, end: 67.5, visible: true, segmentStart: 7, segmentEnd: 12 }, { isSegmented: true, start: 70, end: 70.2, visible: true, text: "Apr - Jun", segmentStart: 7, segmentEnd: 12, color: "transparent" }, { isSegmented: true, start: 65, end: 67.5, visible: true, segmentStart: 14, segmentEnd: 19 }, { isSegmented: true, start: 70, end: 70.2, visible: true, text: "Jul - Sep", segmentStart: 14, segmentEnd: 19, color: "transparent" }, { isSegmented: true, start: 104, end: 106.5, visible: true, segmentStart: 21, segmentEnd: 26 }, { isSegmented: true, start: 109, end: 109.2, visible: true, text: "Oct - Dec", segmentStart: 21, segmentEnd: 26, color: "transparent" }] }} zoomSettings={{ enableSelectionZooming: true }} title="Quarterly Sales Chart" chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} width={Browser.isDevice ? '100%' : '75%'} tooltip={{ enable: true }}>
                    <Inject services={[ColumnSeries, Selection, StripLine, DataLabel, Tooltip, Zoom, Category, Legend]}/>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} name='Quarter 1' xName='xValue' yName='yValue' type='Column'/>
                        <SeriesDirective dataSource={data1} name='Quarter 2' xName='xValue' yName='yValue' type='Column'/>
                        <SeriesDirective dataSource={data2} name='Quarter 3' xName='xValue' yName='yValue' type='Column'/>
                        <SeriesDirective dataSource={data3} name='Quarter 4' xName='xValue' yName='yValue' type='Column'/>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>Keyboard shortcuts can be used to interact with chart functionality. In the example below, various key combinations can be used to interact with the chart.</p>
            </div>
            <div id="description">
                <i>The key combinations listed below can be used in the chart to initiate various actions.</i>
                <ul>
                    <li>
                        <b>FOCUS ELEMENTS</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Alt</kbd> + <kbd>J</kbd></span>
                                <span> - Moves the focus to the chart element.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Tab</kbd></span>
                                <span> - Moves the focus to the next element in the chart.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Shift</kbd> + <kbd>Tab</kbd></span>
                                <span> - Moves the focus to the previous element in the chart.</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>SERIES</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Down arrow</kbd></span>
                                <span> - Moves the focus to the data point left side from the selected point.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Up arrow</kbd></span>
                                <span> - Moves the focus to the data point right side from the selected point.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Left arrow</kbd></span>
                                <span> - Moves the focus to the next series in our chart.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Right arrow</kbd></span>
                                <span> - Moves the focus to the previous series in our chart.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>ESC</kbd></span>
                                <span> - Cancel the tooltip for the data point.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Enter</kbd>/<kbd>Space</kbd></span>
                                <span> - Selects the data point in the series.</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>Legend </b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Down</kbd>/<kbd>Left arrow</kbd></span>
                                <span> - Moves the focus to the legend left side from the selected legend.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Up</kbd>/<kbd>Right arrow</kbd></span>
                                <span> - Moves the focus to the legend right side from the selected legend.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Enter</kbd>/<kbd>Space</kbd></span>
                                <span> - Toggles the visibility of the corresponding series.</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>ZOOMING AND PANNING</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Ctrl</kbd> + <kbd>+</kbd></span>
                                <span> - Zoom in the chart.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Ctrl</kbd> + <kbd>-</kbd></span>
                                <span> - Zoom out the chart.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Down</kbd>/<kbd>Up arrow</kbd></span>
                                <span> - Pans the chart vertically.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Left</kbd>/<kbd>Right arrow</kbd></span>
                                <span> - Pans the chart horizontally.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>R</kbd></span>
                                <span> - Reset the zoomed chart.</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>PRINT</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Ctrl</kbd> + <kbd>P</kbd></span>
                                <span> - Prints the chart.</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>);
};
export default KeyboardNavigation;
