import * as React from 'react';
import './format-style.css';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, MultiSelectComponent, CheckBoxSelection, Inject } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
let dateValue = new Date();
export class Dateformat extends SampleBase {
    datetimepickerInstance;
    listObj;
    inputFormatInstance;
    inputFormats = ['dd/MM/yyyy HH:mm', 'yyyyMMdd HH:mm'];
    dataTypes = [
        { value: 'dd-MMM-yy hh:mm a' },
        { value: 'yyyy-MM-dd HH:mm' },
        { value: 'dd-MMMM HH:mm' },
    ];
    inputFormatData = [
        { text: 'dd/MM/yyyy HH:mm', value: 'dd/MM/yyyy HH:mm' },
        { text: 'ddMMMyy HH:mm', value: 'ddMMMyy HH:mm' },
        { text: 'yyyyMMdd HH:mm', value: 'yyyyMMdd HH:mm' },
        { text: 'dd.MM.yy HH:mm', value: 'dd.MM.yy HH:mm' },
        { text: 'MM/dd/yyyy HH:mm', value: 'MM/dd/yyyy HH:mm' },
        { text: 'yyyy/MMM/dd HH:mm', value: 'yyyy/MMM/dd HH:mm' },
        { text: 'dd-MM-yyyy HH:mm', value: 'dd-MM-yyyy HH:mm' },
    ];
    fields = { value: 'value' };
    checkFields = { text: 'text', value: 'value' };
    waterMark = 'Format';
    index = 0;
    /*Apply selected format to the component*/
    onChange() {
        let format = this.listObj.value;
        this.datetimepickerInstance.format = format;
    }
    onChangeInputFormat(args) {
        this.datetimepickerInstance.inputFormats = args.value;
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-8'>
            <div className='datetimepicker-control-section'>
              <DateTimePickerComponent format='dd-MMM-yy hh:mm a' ref={calendar => this.datetimepickerInstance = calendar} value={dateValue} inputFormats={this.inputFormats}></DateTimePickerComponent>
            </div>
          </div>
          <div id="format" className='col-lg-4 property-section' style={{ width: '250px' }}>
            <div className="property-panel-header">Properties</div>
            <div>
              <label className='example-label'>Choose a display format</label>
              <DropDownListComponent id="dateFormats" dataSource={this.dataTypes} fields={this.fields} index={this.index} ref={(dropdownlist) => { this.listObj = dropdownlist; }} placeholder={this.waterMark} change={this.onChange.bind(this)}>
              </DropDownListComponent>
            </div>
          </div>
          <div id="format" className='col-lg-4 property-section' style={{ width: '250px' }}>
            <div>
              <label className="example-label" style={{ marginTop: '40px' }}>Choose input formats</label>
              <MultiSelectComponent id="inputFormatsDatePicker" ref={multiselect => this.inputFormatInstance = multiselect} dataSource={this.inputFormatData} fields={this.checkFields} placeholder="e.g. MM/dd/yyyy" value={this.inputFormats} mode="CheckBox" showSelectAll={true} showDropDownIcon={true} enableSelectionOrder={false} change={this.onChangeInputFormat}>
                <Inject services={[CheckBoxSelection]}/>
              </MultiSelectComponent>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>
            In this sample, the DateTimePicker has been configured with the
            <code>dd-MMM-yy hh:mm a</code> date time format.
            To change this current date time format, go to the properties panel at the right side and select a date format from the dropdown options.
            For mobile mode touch the icon at the right side and select a date time format from the dropdown options.
          </p>
        </div>
        <div id='description'>
          <p>
            Format sample illustrates the support of custom date format in the DateTimePicker component by
            using the <code>format</code> property. You can also change the datetime format by selecting it from the format options in the properties
            panel.  By using the <code>timeFormat</code> property to customize the displayed time value in a time popup list.
        </p>
        </div>
      </div>);
    }
}
