import * as React from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './default-style.css';
export class Default extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className='daterangepicker-control-section'>
                        <DateRangePickerComponent></DateRangePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        The following sample demonstrates the default functionalities of the DateRangePicker. Today's date is always highlighted in the popup calendar and it get focused if there's no selected date. Select a date range from the popup calendar and the selected <code>date range</code> will be displayed in the DateRangePicker element.
                    </p>    
                </div>
                <div id='description'>
                    <p>
                        <code>DateRangePicker</code> is an interactive component that allows the user to select a range from the calendar, or to set a range value.
        </p>
                    <p>More information on the DateRangePicker instantiation can be found in the
                    <a href="https://ej2.syncfusion.com/react/documentation/daterangepicker/getting-started/" target="_blank"> documentation section</a>.</p>
                </div>
            </div>);
    }
}
