import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { addClass } from '@syncfusion/ej2-base';
import './special-style.css';
const Special = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const dateValue = new Date('1/7/2017');
    const specialDate = (args, name) => {
        let span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.firstElementChild.setAttribute('title', name + '!');
        addClass([args.element], ['e-day', 'special', name.toLowerCase()]);
        args.element.setAttribute('data-val', name + '!');
        args.element.setAttribute('title', name + '!');
        args.element.appendChild(span);
    };
    const customDates = (args) => {
        /*Date need to be customized*/
        if (args.date.getDate() === 10) {
            specialDate(args, "Birthday");
        }
        if (args.date.getDate() === 15) {
            specialDate(args, "Farewell");
        }
        if (args.date.getDate() === 20) {
            specialDate(args, "Vacation");
        }
    };
    return (<div className='control-pane'>
            <div className='control-section'>
                <div className='datetimepicker-control-section'>
                    <DateTimePickerComponent renderDayCell={customDates.bind(this)} value={dateValue} cssClass='e-customStyle'></DateTimePickerComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    In the following sample, specific dates are <code>highlighted</code>. In desktop mode highlighted information about the date will be displayed when hovered.
                </p>
            </div>
            <div id='description'>
                <p>
                    Special Dates sample demonstrates, how to customize a specific dates in a datetimepicker by using
                    <code>renderDayCell</code> event. This event gets triggered on each day cell element creation that allows you to customize or disable the specific
                    dates in datetimepicker. Here 10, 15 and 25 date's are customized with custom styles by adding the <code>e-customStyle</code> class.
                </p>
                <p>More information on the DateTimePicker customization can be found in the <a href="https://ej2.syncfusion.com/react/documentation/datetimepicker/customization/" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>);
};
export default Special;
