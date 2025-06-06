/**
 * Drilldown sample for treemap
 */
import * as React from "react";
import { useEffect, useRef } from "react";
import { TreeMapComponent, LevelsDirective, LevelDirective, Inject, TreeMapTooltip } from '@syncfusion/ej2-react-treemap';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import * as data from './treemap-data/drilldown-sample.json';
let datasource = data;
const SAMPLE_CSS = `
    .drilldown-checkbox {
        padding-left: 0px !important;
    }
    .drilldownCheckbox {
        padding-left: 0px;
    }
    .e-view.fluent2-highcontrast #property .drilldownCheckbox {
        padding-left: 0px; margin-left: -8px;
    }
    .e-view.fluent2 #property .drilldown-checkbox, .e-view.fluent2-dark #property .drilldown-checkbox {
        padding-left: 0px; margin-left: -10px;
    }`;
const Drilldown = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let treemapInstance = useRef(null);
    let nameElement = useRef(null);
    let headerElement = useRef(null);
    let labelElement = useRef(null);
    let textElement;
    const drillViewChange = (args) => {
        let value = args.checked;
        treemapInstance.current.drillDownView = value;
        treemapInstance.current.refresh();
    };
    const breadCrumbChange = (args) => {
        let value = args.checked;
        treemapInstance.current.enableBreadcrumb = value;
        treemapInstance.current.refresh();
    };
    const breadCrumbTextChange = (args) => {
        let value = textElement.value;
        treemapInstance.current.breadcrumbConnector = value;
        treemapInstance.current.refresh();
    };
    const headerChange = () => {
        for (let i = 0; i < treemapInstance.current.levels.length - 1; i++) {
            treemapInstance.current.levels[i].headerAlignment = headerElement.current
                .value;
        }
        treemapInstance.current.refresh();
    };
    const labelChange = () => {
        treemapInstance.current.levels[2].headerAlignment = labelElement.current
            .value;
        treemapInstance.current.refresh();
    };
    let headerAlign = [
        { text: "Near", value: "Near" },
        { text: "Far", value: "Far" },
        { text: "Center", value: "Center" },
    ];
    let labelAlign = [
        { text: "Near", value: "Near" },
        { text: "Far", value: "Far" },
        { text: "Center", value: "Center" },
    ];
    const load = (args) => {
    };
    /* tslint:disable:no-string-literal */
    const drillStart = (args) => {
        if (args.item[Object.keys(args.item)[0]].length === 1) {
            args.treemap.levels[2].showHeader = true;
        }
        else {
            args.treemap.levels[2].showHeader = false;
        }
    };
    const tooltipRendering = (args) => {
        if (args.item["groupIndex"] !== 2) {
            args.cancel = true;
        }
    };
    return (<main><div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <div className="col-md-9">
                    <TreeMapComponent drillStart={drillStart.bind(this)} tooltipRendering={tooltipRendering.bind(this)} load={load.bind(this)} id="treemap-container" ref={treemapInstance} palette={[
            "#9999ff",
            "#CCFF99",
            "#FFFF99",
            "#FF9999",
            "#FF99FF",
            "#FFCC66",
        ]} titleSettings={{
            //To config title for treemap
            text: "List of countries by population",
            textStyle: { size: "15px" },
        }} enableDrillDown={true} format={"n"} useGroupingSeparator={true} dataSource={datasource.drilldown} weightValuePath="Population" tooltipSettings={{
            // To config tooltip for treemap
            visible: true,
            format: "${Name} : ${Population}",
        }} leafItemSettings={{
            // To config leafitem customization for treemap
            labelPath: "Name",
            showLabels: false,
            labelStyle: { size: "0px" },
            border: { color: "black", width: 0.5 },
        }}>
                        <Inject services={[TreeMapTooltip]}/>
                        <LevelsDirective>
                            <LevelDirective groupPath="Continent" fill="#336699" border={{ color: "black", width: 0.5 }}/>
                            <LevelDirective groupPath="States" fill="#336699" border={{ color: "black", width: 0.5 }}/>
                            <LevelDirective groupPath="Region" showHeader={true} fill="#336699" border={{ color: "black", width: 0.5 }}/>
                        </LevelsDirective>
                    </TreeMapComponent>
                </div>
                {/* Property Panel */}
                <div className="col-md-3 property-section">
                    <PropertyPane title="Properties">
                        <table role='none' id="property" title="Properties" className="property-panel-table" style={{ width: "100%", marginBottom: "20px" }}>
                            <tbody>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div style={{ paddingLeft: "0px" }}>Drill Down View</div>
                                </td>
                                <td>
                                    <div className="drilldown-checkbox drilldownCheckbox" style={{ paddingTop: "0px" }}>
                                        <CheckBoxComponent id="drillView" checked={false} change={drillViewChange.bind(this)}/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div style={{ paddingLeft: "0px" }}>Enable Bread Crumb</div>
                                </td>
                                <td>
                                    <div className="drilldown-checkbox drilldownCheckbox" style={{ paddingTop: "0px" }}>
                                        <CheckBoxComponent id="breadCrumb" checked={false} change={breadCrumbChange.bind(this)}/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div style={{ paddingLeft: "0px" }}>Bread Crumb Text</div>
                                </td>
                                <td>
                                    <div style={{ marginLeft: "0px" }}>
                                        <TextBoxComponent className="e-input" value=' - ' style={{ width: '100%' }} id="fileName" ref={d => textElement = d} onChange={breadCrumbTextChange.bind(this)}></TextBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div style={{ paddingLeft: "0px" }}>Header Alignment</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id="header" width="100%" index={0} dataSource={headerAlign} fields={{ text: "text", value: "value" }} change={headerChange.bind(this)} ref={headerElement}/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td>
                                    <div style={{ paddingLeft: "0px" }}>Label Alignment</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id="label" width="100%" index={0} dataSource={labelAlign} fields={{ text: "text", value: "value" }} change={labelChange.bind(this)} ref={labelElement}/>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div style={{ float: "right", marginRight: "10px" }}>
                Source:
                <a href="https://en.wikipedia.org/wiki/List_of_continents_by_population" target="_blank">
                    en.wikipedia.org
                </a>
            </div>
        </div>
            <section id="action-description" aria-label="Description of TreeMap sample">
                <p>
                    This sample demonstrates drill-down with the continents at the top
                    level followed by regions and countries. By clicking a continent, you
                    can view all the countries available in that continent clearly.
                    Customizations can be done in the treemap, by using the options in the
                    properties panel
                </p>
            </section>
            <section id="description" aria-label="Description of the TreeMap features demonstrated in this sample">
                <p>
                    In this example, you can see how to render a TreeMap with multiple
                    items and drill it further. Change the drill down view and enable the
                    breadcrumb using the options available in the properties panel.
                </p>
                <p>
                    The tooltip is enabled in this example. To see the tooltip in action,
                    hover the mouse over an item or tap an item in touch-enabled devices.
                </p>
            </section>
        </main>);
};
export default Drilldown;
