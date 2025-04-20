import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './format-style.css';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, MultiSelectComponent, CheckBoxSelection, Inject } from '@syncfusion/ej2-react-dropdowns';
const dateValue = new Date();
const Dateformat = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const dataTypes = [
        { value: 'dd-MMM-yy' },
        { value: 'yyyy-MM-dd' },
        { value: 'dd-MMMM' },
    ];
    const inputFormatData = [
        { text: 'dd/MM/yyyy', value: 'dd/MM/yyyy' },
        { text: 'ddMMMyy', value: 'ddMMMyy' },
        { text: 'yyyyMMdd', value: 'yyyyMMdd' },
        { text: 'dd.MM.yy', value: 'dd.MM.yy' },
        { text: 'MM/dd/yyyy', value: 'MM/dd/yyyy' },
        { text: 'yyyy/MMM/dd', value: 'yyyy/MMM/dd' },
        { text: 'dd-MM-yyyy', value: 'dd-MM-yyyy' },
    ];
    const checkFields = { text: 'text', value: 'value' };
    const fields = { value: 'value' };
    const waterMark = 'Format';
    const index = 0;
    const [format, setFormat] = useState('dd-MMM-yy');
    const [inputFormats, setinputFormats] = useState(['dd/MM/yyyy', 'yyyyMMdd']);
    /*Apply selected format to the component*/
    const onChange = (args) => {
        setFormat(args.value);
    };
    const onChangeInputFormat = (args) => {
        setinputFormats(args.value);
    };
    return (<div className='control-pane'>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <div className='datepicker-control-section'>
                        <DatePickerComponent format={format} value={dateValue} inputFormats={inputFormats}></DatePickerComponent>
                    </div>
                </div>
                <div id="format" className='col-lg-4 property-section'>
                    <div className="property-panel-header">Properties</div>
                    <div>
                        <label className='example-label'>Choose a display format</label>
                        <DropDownListComponent id="dateFormats" dataSource={dataTypes} fields={fields} index={index} placeholder={waterMark} change={onChange.bind(this)}>
                        </DropDownListComponent>
                    </div>
                </div>
                <div id="format" className='col-lg-4 property-section'>
                    <div>
                        <label className="example-label" style={{ marginTop: '40px' }}>Choose input formats</label>
                        <MultiSelectComponent id="inputFormatsDatePicker" dataSource={inputFormatData} fields={checkFields} placeholder="e.g. MM/dd/yyyy" value={inputFormats} mode="CheckBox" showSelectAll={true} showDropDownIcon={true} enableSelectionOrder={false} change={onChangeInputFormat}>
                            <Inject services={[CheckBoxSelection]}/>
                        </MultiSelectComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>In this sample, the DatePicker has been configured with the <code>dd-MMM-yy</code> date format.
                    To change this current date format, go to the properties panel at the right side and select a date format from the dropdown options.
                    For mobile mode touch the icon at the right side and select a date format from the dropdown options.</p>
            </div>
            <div id='description'>
                <p>Format sample illustrates the support of custom date format in the DatePicker component by
                    using the <code>format</code> property. You can also change the date format by selecting it from the format options in the properties
                    panel.</p>
                <p> More information on the date format configuration can be found in the <a href="https://ej2.syncfusion.com/react/documentation/datepicker/date-format/" target="_blank"> documentation section</a>.</p>
            </div>
        </div>);
};
export default Dateformat;
