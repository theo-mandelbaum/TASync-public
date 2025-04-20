import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { updateSampleSection } from "../common/sample-base";
import { DashboardLayoutComponent, PanelsDirective, PanelDirective } from "@syncfusion/ej2-react-layouts";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, PieSeries, AccumulationTooltip, ColumnSeries, SeriesCollectionDirective, SeriesDirective, AccumulationDataLabel, ChartComponent, Legend, Category, Tooltip, DataLabel, SplineAreaSeries, DateTime } from "@syncfusion/ej2-react-charts";
import "./dynamic.css";
const DynamicWidget = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let btnobj = useRef(null);
    let dashboardObj = useRef(null);
    let lineObj = useRef(null);
    let pieObj = useRef(null);
    let splineObj = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setResizing] = useState(false);
    const [btnContent, setBtnContent] = useState('Edit');
    const [icon, setIcon] = useState('edit');
    const [display, setDisplay] = useState('none');
    const [isVisible, setIsVisible] = useState(false);
    let count = 4;
    const cellSpacing = [10, 10];
    let loc = window.location;
    const btnClick = () => {
        if (btnobj.current.element.classList.contains('e-active')) {
            setIsDragging(true);
            setResizing(true);
            setBtnContent("Save");
            setIcon("save");
            setDisplay("block");
        }
        else {
            setIsDragging(false);
            setResizing(false);
            setBtnContent("Edit");
            setIcon("edit");
            setDisplay("none");
        }
    };
    const onPanelResize = (args) => {
        if (args.element && args.element.querySelector('.e-panel-container .e-panel-content div div')) {
            let chartObj = (args.element.querySelector('.e-panel-container .e-panel-content div div')).ej2_instances[0];
            chartObj.height = '95%';
            chartObj.width = '100%';
            chartObj.refresh();
        }
    };
    const dlgClick = () => {
        setIsVisible(true);
        lineObj.current.onclick = () => {
            let countValue = count.toString();
            let panel = [{
                    'id': '_layout' + countValue, 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
                    header: '<div>Line Chart</div>', content: lineTemplate.bind(this)
                }];
            count = count + 1;
            dashboardObj.current.addPanel(panel[0]);
            setIsVisible(false);
            setTimeout(function () {
                document.getElementById("_layout" + countValue).querySelector(".e-control.e-chart").ej2_instances[0].refresh();
            }, 20);
        };
        pieObj.current.onclick = () => {
            let countValue = count.toString();
            let panel = [{
                    'id': '_layout' + countValue, 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
                    header: '<div>Pie Chart</div>', content: pieTemplate.bind(this)
                }];
            count = count + 1;
            dashboardObj.current.addPanel(panel[0]);
            setIsVisible(false);
            setTimeout(function () {
                document.getElementById("_layout" + countValue).querySelector(".e-control.e-accumulationchart").ej2_instances[0].refresh();
            }, 20);
        };
        splineObj.current.onclick = () => {
            let countValue = count.toString();
            let panel = [{
                    'id': '_layout' + countValue, 'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 0,
                    header: '<div>Spline Chart</div>', content: splineTemplate.bind(this)
                }];
            count = count + 1;
            dashboardObj.current.addPanel(panel[0]);
            setIsVisible(false);
            setTimeout(function () {
                document.getElementById("_layout" + countValue).querySelector(".e-control.e-chart").ej2_instances[0].refresh();
            }, 20);
        };
    };
    const load = (args) => {
        let selectedTheme = loc.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    const Pieload = (args) => {
        let selectedTheme = loc.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    const content = () => {
        return (<div id="dialogcontent">
                <div>
                    <div id="linetemplate" ref={lineObj}>
                        <p className="dialog-text">Linechart (1x1) </p>
                    </div>
                    <div id="pietemplate" ref={pieObj}>
                        <p className="dialog-text">Piechart (1x1) </p>
                    </div>
                    <div id="splinetemplate" ref={splineObj}>
                        <p className="dialog-text">Splinechart (2x1) </p>
                    </div>
                </div>
            </div>);
    };
    const splineTemplate = () => {
        let splineData1 = [
            { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.4 },
            { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.6 },
            { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.5 },
            { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.8 },
            { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
        ];
        let splineData2 = [
            { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.7 },
            { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
            { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
            { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.8 },
            { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
        ];
        return (<div className="template">
                <ChartComponent style={{ "height": "100%", "width": "100%", textAlign: "center" }} primaryXAxis={{ valueType: 'DateTime', labelFormat: 'MMM', majorGridLines: { width: 0 }, intervalType: 'Months', edgeLabelPlacement: 'Shift' }} primaryYAxis={{ labelFormat: '{value}%', lineStyle: { width: 0 }, maximum: 4, interval: 1, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} load={load.bind(this)} chartArea={{ border: { width: 0 } }}>
                    <Inject services={[SplineAreaSeries, DateTime, Legend]}/>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={splineData1} xName='x' yName='y' name='Jan' opacity={0.5} type='SplineArea' width={2} fill='rgb(239, 183, 202)'></SeriesDirective>
                        <SeriesDirective dataSource={splineData2} xName='x' yName='y' name='Feb' opacity={0.5} type='SplineArea' width={2} fill='rgb(0, 189, 174)'></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>);
    };
    const lineTemplate = () => {
        let data1 = [{ x: 'Jan', y: 46 }, { x: 'Feb', y: 27 }, { x: 'Mar', y: 26 }];
        let data2 = [{ x: 'Jan', y: 37 }, { x: 'Feb', y: 23 }, { x: 'Mar', y: 18 }];
        let data3 = [{ x: 'Jan', y: 38 }, { x: 'Feb', y: 17 }, { x: 'Mar', y: 26 }];
        return (<div className="template">
                <ChartComponent style={{ "height": "100%", "width": "100%" }} load={load.bind(this)} primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 } }} primaryYAxis={{ majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }}>
                    <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}/>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName='x' yName='y' name='Jan' type='Column' marker={{ dataLabel: { visible: false } }} fill='#00bdae'/>
                        <SeriesDirective dataSource={data2} xName='x' yName='y' name='Feb' type='Column' marker={{ dataLabel: { visible: false } }} fill='#e56691'/>
                        <SeriesDirective dataSource={data3} xName='x' yName='y' name='Mar' type='Column' marker={{ dataLabel: { visible: false } }} fill='#357cd2'/>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>);
    };
    const pieTemplate = () => {
        let pieData = [
            { "x": "Jan", y: 12.5, text: "January" },
            { "x": "Feb", y: 25, text: "February" },
            { "x": "Mar", y: 50, text: "March" },
        ];
        let piePalette = ["#00bdaed1", "#357cd2bf", "#e56691e8"];
        return (<div className="template">
                <AccumulationChartComponent style={{ "height": "100%", "width": "100%" }} legendSettings={{ visible: false }} enableSmartLabels={true} enableAnimation={true} center={{ x: '50%', y: '50%' }} load={Pieload.bind(this)} tooltip={{ enable: true, header: '<b>${point.x}</b>', format: 'Composition : <b>${point.y}%</b>' }}>
                    <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]}/>
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={pieData} name='Earnings' xName='x' yName='y' dataLabel={{ visible: true, position: 'Inside', name: 'value', font: { fontWeight: '600' } }} radius='100%' innerRadius="40%" palettes={['#00bdae', '#357cd2', '#e56691']}/>
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </div>);
    };
    return (<div>
            <div id='edit_target' className="control-section">
                <div>
                    <div style={{ "width": "100%", "marginBottom": "10px", "marginTop": "10px", "height": "30px" }}>
                        <ButtonComponent id="togglebtn" cssClass='e-outline e-flat e-primary' ref={btnobj} iconCss={icon} isToggle={true} onClick={btnClick.bind(this)} style={{ "float": "right", "width": "75px" }}>{btnContent}</ButtonComponent>
                    </div>
                    <div style={{ "padding": "5px", "marginBottom": "5px", "textAlign": "end" }}>
                        <div id="dialogBtn" className="add-widget-button e-control e-btn e-lib" style={{ display: display }} onClick={dlgClick.bind(this)}>Add New Widget</div>
                    </div>
                </div>
                <DashboardLayoutComponent id="edit_dashboard" columns={2} cellSpacing={cellSpacing} ref={dashboardObj} resizeStop={onPanelResize.bind(this)} allowResizing={isResizing} allowDragging={isDragging}>
                    <PanelsDirective>
                        <PanelDirective sizeX={1} sizeY={1} row={0} col={0} content={lineTemplate.bind(this)} header="<div>Line Chart</div>"></PanelDirective>
                        <PanelDirective sizeX={1} sizeY={1} row={0} col={1} content={pieTemplate.bind(this)} header="<div>Pie Chart</div>"></PanelDirective>
                        <PanelDirective sizeX={2} sizeY={1} row={1} col={0} content={splineTemplate.bind(this)} header="<div>Spline Chart</div>"></PanelDirective>
                    </PanelsDirective>
                </DashboardLayoutComponent>
            </div>
            <DialogComponent id="listdialog" width="500px" height="260px" visible={isVisible} header={"Add a widget"} showCloseIcon={true} animationSettings={{ effect: 'Zoom' }} isModal={true} target='#edit_target' content={content}/>
            <div id="action-description">
                <p>
                    The following sample demonstrates a editable dashboard layout. Initially the DashboardLayout component
                    doesn't allow to <a href="https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowdragging" target="_blank">drag</a>,
                    <a href="https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowresizing" target="_blank">resize</a> or reorder the panels.
                    After clicking the edit button, the layout becomes editable which allows to drag and reorder the panels as per the requirement and also you can
                    add new panels to the layout with predefined templates by clicking the add new button and reorder them
                    by dragging and placing in the required position. Drag and resizing of the panles are not applicable
                    in mobile resolution.
                </p>
            </div>
            <div id="description">
                <p>The following sample demonstrates about using the dashboard layout as an editable layout.</p>
            </div>
        </div>);
};
export default DynamicWidget;
