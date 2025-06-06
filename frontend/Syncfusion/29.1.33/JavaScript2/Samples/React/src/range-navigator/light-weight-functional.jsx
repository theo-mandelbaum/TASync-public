/**
 * Sample for Light Weight Range Navigator
 */
import * as React from "react";
import { RangeNavigatorComponent, DateTime, Inject } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { GetDateTimeData } from './data-service';
import { updateSampleSection } from '../common/sample-base';
import { loadRangeNavigatorTheme } from './theme-color';
export let data = GetDateTimeData(new Date(2018, 0, 1), new Date(2019, 0, 1));
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
     .tableStyle{
        margin-left: auto !important;
        margin-right: auto !important;
        margin-top: 20px !important;
        font-family: Segoe UI;font-weight: 500; font-style:normal; font-size:15px;
     }
     #rangenavigator {
         transform: translate(0, 25%);
     }
     #days {
         font-family: Segoe UI;font-weight: 500; font-style:normal; font-size:15px;
     }
     #working{
         width: 150px;
     }
     #weekend{
         width: 150px;
     }
     #workingcount{
         width: 25px;
     }
     #weekendcount{
         width: 25px;
     }
     #holiday {
         padding-left: 20px;
     }
     `;
function LightWeight() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    return (<div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className="row">
                    <div id="days" style={{ textAlign: "center" }}>Calculate the Business and Weekend days in a period</div>
                    <div id="datetime"></div>
                </div>
                <div className="row">
                    <RangeNavigatorComponent id='rangenavigator' style={{ textAlign: "center" }} valueType='DateTime' intervalType='Months' labelFormat='MMM' height='52' navigatorStyleSettings={{
            thumb: {
                type: 'Rectangle'
            },
        }} load={load.bind(this)} width={Browser.isDevice ? '100%' : '80%'} value={[new Date('2018-06-01'), new Date('2018-07-01')]} dataSource={data} xName='x' yName='y' changed={changed.bind(this)}>
                        <Inject services={[DateTime]}/>
                    </RangeNavigatorComponent>
                </div>
                <div className="row">
                    <table className="tableStyle">
                        <tbody><tr>
                            <td id="working1">
                                <table>
                                    <tbody><tr>
                                        <td id="working">Total Business Days:</td>
                                        <td id="workingcount"></td>
                                    </tr>
                                    </tbody></table>
                            </td>
                            <td id="holiday">
                                <table>
                                    <tbody><tr>
                                        <td id="weekend">Total Weekend Days: </td>
                                        <td id="weekendcount"></td>
                                    </tr>
                                    </tbody></table>
                            </td>
                        </tr>
                        </tbody></table>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample represents the total number of business and weekend days in a selected period.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render a light-weight range navigator without series.
                    You can use <code>width</code>, <code>height</code>, <code>fill</code> and <code>boder</code> properties to customize the <code>thumb</code> in range navigator.
                    You can also change the type of the thumb using <code>type</code> property.
                </p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    The range navigator component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the <code>RangeNavigator.Inject(DateTime)</code> method.
                </p>
            </div>
        </div>);
    function changed(args) {
        let currentDate = new Date(+args.start);
        let workingDaysCount = 0;
        let holidaysDaysCount = 0;
        while (currentDate <= new Date(+args.end)) {
            if (currentDate.getDay() > 0 && currentDate.getDay() <= 5) {
                workingDaysCount++;
            }
            else {
                holidaysDaysCount++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        document.getElementById('workingcount').innerHTML = ' ' + workingDaysCount;
        document.getElementById('weekendcount').innerHTML = ' ' + holidaysDaysCount;
    }
    ;
    function load(args) {
        loadRangeNavigatorTheme(args);
    }
    ;
}
export default LightWeight;
