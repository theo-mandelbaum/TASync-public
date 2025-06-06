import * as React from 'react';
import { TimePickerComponent, Inject, MaskedDateTime } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './default-style.css';
export class MaskSupport extends SampleBase {
    render() {
        return (<div className='control-pane default'>
                <div className='control-section'>
                    <div className='timepicker-control-section'>
                        <TimePickerComponent format='h:mm a' enableMask={true}>
                    <Inject services={[MaskedDateTime]}/></TimePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        The following sample demonstrates the time masking functionality in the TimePicker. It allows you to enter a valid value for each mask pattern of the time masking.
                    </p>
                </div>
                <div id='description'>
                    <p>
                        TimePicker has an <code>enableMask</code> property that allows you to enable the built-in time masking support. The mask pattern is defined based on the provided time format to the component. If the format is not specified, the mask pattern is formed based on the default format of the current culture.
                  </p>
                </div>
            </div>);
    }
}
