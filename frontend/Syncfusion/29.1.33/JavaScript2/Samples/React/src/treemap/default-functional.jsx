/**
 * Default sample for treemap
 */
import * as React from "react";
import { useEffect } from "react";
import { TreeMapComponent, LevelsDirective, LevelDirective, Inject, TreeMapLegend, TreeMapTooltip } from '@syncfusion/ej2-react-treemap';
import { updateSampleSection } from '../common/sample-base';
import * as data from './treemap-data/car-sales.json';
let datasource = data;
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const load = (args) => {
    };
    /* tslint:disable:no-string-literal */
    const itemMove = (args) => {
        args.item["data"].Sales = args.item["weight"];
        args.treemap.tooltipSettings.format =
            args.item["groupIndex"] === 0
                ? "Country: ${Continent}<br>Sales: ${Sales}"
                : "Country: ${Continent}<br>Company: ${Company}<br>Sales: ${Sales}";
    };
    return (<main><div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <TreeMapComponent itemClick={itemMove.bind(this)} itemMove={itemMove.bind(this)} load={load.bind(this)} id="treemap-container" titleSettings={{
            //To config title for treemap
            text: "Car Sales by Country - 2017",
            textStyle: { size: "15px" },
        }} rangeColorValuePath="Sales" format={"n"} useGroupingSeparator={true} dataSource={datasource.car_sale} legendSettings={{
            visible: true,
            position: "Top",
            shape: "Rectangle",
        }} palette={[
            "#C33764",
            "#AB3566",
            "#993367",
            "#853169",
            "#742F6A",
            "#632D6C",
            "#532C6D",
            "#412A6F",
            "#312870",
            "#1D2671",
        ]} tooltipSettings={{ visible: true }} weightValuePath="Sales" leafItemSettings={{
            labelPath: "Company",
            border: { color: "white", width: 0.5 },
        }}>
                    <Inject services={[TreeMapLegend, TreeMapTooltip]}/>
                    <LevelsDirective>
                        <LevelDirective groupPath="Continent" border={{ color: "white", width: 0.5 }}/>
                    </LevelsDirective>
                </TreeMapComponent>
            </div>
            <div style={{ float: "right", marginRight: "10px" }}>
                Source:
                <a href="https://www.factorywarrantylist.com/car-sales-by-country.html/" target="_blank">
                    www.factorywarrantylist.com
                </a>
            </div>
        </div>
            <section id="action-description" aria-label="Description of TreeMap sample">
                <p>
                    This sample visualizes the sales of cars across various countries in
                    2017 by rendering the countries at the top level and car manufacturing
                    companies as leaf items.
                </p>
            </section>
            <section id="description" aria-label="Description of the TreeMap features demonstrated in this sample">
                <p>
                    In this example, you can see how to render a TreeMap with the provided
                    data source. The palette color is applied to the items in TreeMap. The
                    default legend is enabled in this example to represent the items at
                    the top level.
                    <br />
                    <br />
                    Tooltip is enabled in this example. To see the tooltip in action,
                    hover the mouse over an item or tap an item in touch enabled devices.
                </p>
                <br />
                <p className="description-header">Injecting Module</p>
                <p>
                    TreeMap component features are segregated into individual feature-wise
                    modules. To use a tooltip, inject the <code>Tooltip</code> module
                    using the <code>TreeMap.Inject(TreeMapTooltip)</code> method, and use
                    a legend by injecting the <code>Legend</code> module using the{" "}
                    <code>TreeMap.Inject(TreeMapLegend)</code> method.
                </p>
            </section>
        </main>);
};
export default Default;
