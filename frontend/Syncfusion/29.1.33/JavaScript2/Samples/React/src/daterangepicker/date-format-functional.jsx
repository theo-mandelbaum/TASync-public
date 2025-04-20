import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './format-style.css';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
const startValue = new Date(new Date().setDate(1));
const endValue = new Date(new Date().setDate(20));
const Format = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const dataTypes = [
        { value: 'dd\'\/\'MMM\'\/\'yy hh:mm a', text: 'dd/MMM/yy hh:mm a' },
        { value: 'yyyy\'\/\'MM\'\/\'dd HH:mm', text: 'yyyy/MM/dd HH:mm' },
        { value: 'dd\'\/\'MMMM\'\/\'yyyy', text: 'dd/MMMM/yyyy' },
    ];
    const fields = { value: 'value', text: 'text' };
    const waterMark = 'Format';
    const floatLabelType = 'Auto';
    const index = 0;
    const [format, setFormat] = useState('dd/MMM/yy hh:mm a');
    const [separator, setSeparator] = useState('-');
    /*Apply selected format to the component*/
    const onChange = (args) => {
        setFormat(args.value);
        setSeparator(args.itemData[fields.text] === 'yyyy/MM/dd HH:mm' ? 'to' : '-');
    };
    return (<div className='control-pane'>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <div className='daterangepicker-control-section format'>
                        <DateRangePickerComponent format={format} separator={separator} startDate={startValue} endDate={endValue}></DateRangePickerComponent>
                    </div>
                </div>
                <div id="format" className='col-lg-4 property-section'>
                    <div>
                        <DropDownListComponent id="dateFormats" dataSource={dataTypes} fields={fields} floatLabelType={floatLabelType} index={index} placeholder={waterMark} change={onChange.bind(this)}>
                        </DropDownListComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>In this sample, the DateRangePicker has been configured with the <code> dd/MMM/yy hh:mm a</code> date time format. To change this current date time format, go to the properties panel at the right side and select a date format from the dropdown options. For mobile mode touch the icon at the right side and select a date time format from the dropdown options.</p>
            </div>
            <div id='description'>
                <p>Format sample illustrates the support of custom date format in the DateRangePicker component by
                    using the <code>format</code> property. You can also change the date format by selecting it from the format options in the properties
                    panel.</p>
                <p> More information on the date format configuration can be found in the <a href="https://ej2.syncfusion.com/react/documentation/daterangepicker/globalization/#date-format" target="_blank"> documentation section</a>.</p>
            </div>
        </div>);
};
export default Format;
