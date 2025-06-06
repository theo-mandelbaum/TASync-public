/**
 * Sample for MultiLevel Labels Range Navigator
 */
import * as React from "react";
import { Inject, DateTime, RangeTooltip, RangeNavigatorComponent } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadRangeNavigatorTheme } from './theme-color';
export let data = [];
export let value = 0;
export let point = {};
for (let j = 1; j < 1090; j++) {
    value += (Math.random() * 10 - 5);
    value = value < 0 ? Math.abs(value) : value;
    point = { x: new Date(2000, 0, j), y: value, z: value + 10 };
    data.push(point);
}
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px;
     }
     #days {
         font-size: 15px;
         font-style: normal;
         font-family: "Segoe UI";
         font-weight: 500;
         text-anchor: middle;
         transform: none;
         opacity: 1;
     }
     `;
function MultilevelLabels() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    return (<div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className="row" style={{ textAlign: "center" }}>
                    <div id="days">Multi Level Labels</div>
                </div>
                <div className="row">
                    <RangeNavigatorComponent id='rangenavigator' style={{ textAlign: "center" }} labelPosition='Outside' valueType='DateTime' tooltip={{ enable: true, displayMode: 'Always' }} intervalType='Quarter' enableGrouping={true} animationDuration={500} groupBy='Years' load={load.bind(this)} dataSource={data} xName='x' yName='y' value={[new Date('2001-01-01'), new Date('2002-01-01')]} width={Browser.isDevice ? '100%' : '80%'}>
                        <Inject services={[DateTime, RangeTooltip]}/>
                    </RangeNavigatorComponent>
                </div>
                <div id="action-description">
                    <p>
                        Axis labels are placed based on the values of the start and end ranges. You can add higher level of labels to the range navigator using multilevel labels.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to group the axis labels. Here the interval for the second level labels can be customized using <code>groupBy</code>.
                    </p>
                </div>
            </div>
        </div>);
    function load(args) {
        loadRangeNavigatorTheme(args);
        args.rangeNavigator.dateTimeModule = new DateTime(args.rangeNavigator);
    }
    ;
}
export default MultilevelLabels;
