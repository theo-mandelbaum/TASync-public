import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateRangePicker, Inject, InPlaceEditorComponent, TimePicker } from '@syncfusion/ej2-react-inplace-editor';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import './pickers.component.css';
// tslint:disable:max-line-length
function Pickers() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let dateObj;
    let timeObj;
    let dateTimeObj;
    let dateRangeObj;
    let editorMode;
    let dateValue = new Date('5/23/2017');
    let dateTimeValue = new Date('5/23/2017 12:00 PM');
    let dateRangeValue = [new Date('5/23/2017'), new Date('7/5/2017')];
    let datePickerModel = { placeholder: 'Select a date' };
    let timePickerModel = { placeholder: 'Select a time', value: new Date('5/23/2017,12:00 PM') };
    let dateTimePickerModel = { placeholder: 'Select a date and time' };
    let dateRangePickerModel = { placeholder: 'Select a date range' };
    // Mapping DropDownList dataSource property
    let editorData = [
        { 'value': 'Inline', 'text': 'Inline' }, { 'value': 'Popup', 'text': 'Popup' }
    ];
    // Mapping DropDownList fields property
    let dropDownFields = { text: 'text', value: 'value' };
    // Mapping DropDownList value property
    let dropDownVal = 'Inline';
    // Change event funtion for DropDownList component   
    function changeEditorMode(e) {
        let mode = editorMode.value;
        dateObj.mode = mode;
        timeObj.mode = mode;
        dateTimeObj.mode = mode;
        dateRangeObj.mode = mode;
        dateObj.dataBind();
        timeObj.dataBind();
        dateTimeObj.dataBind();
        dateRangeObj.dataBind();
    }
    function rendereComplete() {
        let rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', scrollRightPane);
        }
    }
    function componentWillUnmount() {
        let rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.removeEventListener('scroll', scrollRightPane);
        }
    }
    function scrollRightPane() {
        let mode = document.getElementById('editorMode');
        if (mode && mode.value === 'Inline') {
            return;
        }
        if (dateObj && (dateObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            dateObj.enableEditMode = false;
        }
        if (timeObj && (timeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            timeObj.enableEditMode = false;
        }
        if (dateTimeObj && (dateTimeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            dateTimeObj.enableEditMode = false;
        }
        if (dateRangeObj && (dateRangeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            dateRangeObj.enableEditMode = false;
        }
    }
    return (<div className='control-pane'>
                <div className="col-lg-8 control-section inplace-control-section pickers-layout">
                    <div className="control_wrapper form-horizontal">
                        <table>
                            <thead>
                                <tr>
                                <th></th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <label className="control-label" style={{ textAlign: 'left', fontSize: '14px', fontWeight: 400 }}>
                                            DatePicker </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(date) => { dateObj = date; }} id='datePickerEle' mode='Inline' type='Date' value={dateValue} model={datePickerModel}>
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="control-label" style={{ textAlign: 'left', fontSize: '14px', fontWeight: 400 }}>
                                            TimePicker </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(time) => { timeObj = time; }} id='timePickerEle' mode='Inline' type='Time' value={dateValue} model={timePickerModel}>
                                            <Inject services={[TimePicker]}/>
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="control-label" style={{ textAlign: 'left', fontSize: '14px', fontWeight: 400 }}>
                                            DateTimePicker </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(dateTime) => { dateTimeObj = dateTime; }} id='dateTimePickerEle' mode='Inline' type='DateTime' value={dateTimeValue} model={dateTimePickerModel}>
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="control-label" style={{ textAlign: 'left', fontSize: '14px', fontWeight: 400 }}>
                                            DateRangePicker </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(dateRange) => { dateRangeObj = dateRange; }} id='dateRangePickerEle' mode='Inline' type='DateRange' value={dateRangeValue} model={dateRangePickerModel}>
                                            <Inject services={[DateRangePicker]}/>
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="pickerProperty">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className="property-panel-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <div>Mode</div>
                                    </td>
                                    <td>
                                        <div>
                                            {/* Render the DropDownList Component */}
                                            <DropDownListComponent ref={(drop) => { editorMode = drop; }} id='editorMode' className='form-control' dataSource={editorData} fields={dropDownFields} value={dropDownVal} width={'90%'} change={changeEditorMode.bind(this)}/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the usage of picker components such as Date, Time, DateTime, and DateRange.
                        Click on the dotted input element to switch to the editable state of the corresponding integrated component.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample illustrates the way to integrate picker components with the <code>In-place Editor</code> control. The
                        applicable types of
                        components are:
                    </p>
                    <p>
                        <ul>
                            <li>
                                <code>DatePicker</code>
                            </li>
                            <li>
                                <code>TimePicker</code>
                            </li>
                            <li>
                                <code>DateTimePicker</code>
                            </li>
                            <li>
                                <code>DateRangePicker</code>
                            </li>
                        </ul>
                    </p>
                    <p>
                        The above components and their features are editable in place and can be customized with the model
                        properties
                        of the specific component.
                    </p>
                    <p>
                        More information on the <code>In-place Editor</code> instantiation can be found in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/">
                            documentation section</a>.
                    </p>
                </div>
            </div>);
}
export default Pickers;
