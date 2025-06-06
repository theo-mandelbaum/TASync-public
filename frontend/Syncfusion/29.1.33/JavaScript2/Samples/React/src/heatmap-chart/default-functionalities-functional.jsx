import * as React from "react";
import { useEffect } from "react";
import { HeatMapComponent, Legend, Tooltip, Inject, Adaptor } from '@syncfusion/ej2-react-heatmap';
import { updateSampleSection } from '../common/sample-base';
const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const load = (args) => {
    };
    const getDatasource = () => {
        let temp = {};
        temp.dataSource = [];
        temp.xAis = [];
        temp.yAis = [];
        for (let x = 0; x < 12; x++) {
            temp.dataSource.push([]);
            temp.xAis.push(x);
            temp.yAis.push(x);
            for (let y = 0; y < 6; y++) {
                temp.dataSource[x].push(getRndInteger(0, 100));
            }
        }
        return temp;
    };
    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    return (<main><div className='control-pane'>

            <div className='control-section'>
            <HeatMapComponent id='heatmap-container' titleSettings={{ text: 'Sales Revenue per Employee (in 1000 US$)', textStyle: { size: '15px', fontWeight: '500', fontStyle: 'Normal', fontFamily: 'inherit' } }} xAxis={{ labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert', 'Laura', 'Anne', 'Paul', 'Karin', 'Mario'], textStyle: { fontFamily: 'inherit' } }} yAxis={{ labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], textStyle: { fontFamily: 'inherit' } }} cellSettings={{ textStyle: { fontFamily: 'inherit' } }} tooltipSettings={{ textStyle: { fontFamily: 'inherit' } }} legendSettings={{ textStyle: { fontFamily: 'inherit' } }} load={load} dataSource={getDatasource().dataSource}>
                    <Inject services={[Legend, Tooltip, Adaptor]}/>
            </HeatMapComponent>
            </div>
        </div>
            <section id="action-description" aria-label="Description of HeatMap sample">
                <p>This sample visualizes the sales revenue of items sold by the employees in a week, where the revenue for the day is displayed in 1000 USD as cell data.</p>
            </section>
            <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                <p>In this example, you can see how to render a heat map with the provided data source. The palette color is applied to the items in heat map. The default legend is enabled in this example to represent the items.</p>
                <p>The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over
                        an item or tap an item on touch-enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                        Heatmap component features are separated into discrete feature-based modules. To use a tooltip and the legend, inject the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend">Legend</a> module using the <code>{'<Inject services={[Tooltip, Legend]} />'}</code> method.
                </p>
            </section>
    </main>);
};
export default Default;
