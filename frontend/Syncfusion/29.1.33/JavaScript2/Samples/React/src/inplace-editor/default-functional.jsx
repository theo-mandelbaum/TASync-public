import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { InPlaceEditorComponent } from '@syncfusion/ej2-react-inplace-editor';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import './inplace.component.css';
// tslint:disable:max-line-length
function Default() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let textObj;
    let numericObj;
    let maskObj;
    let editableon;
    let editorMode;
    let textModel = { placeholder: 'Enter employee name' };
    let popupSettings = { title: 'Enter Employee Name' };
    let numericModel = { format: 'c2', value: 100, placeholder: 'Currency format' };
    let maskModel = { mask: '000-000-0000' };
    // Mapping DropDownList dataSource property
    let dropDownData = [
        { 'value': 'Inline', 'text': 'Inline' }, { 'value': 'popup', 'text': 'Popup' }
    ];
    // Mapping DropDownList fields property
    let dropDownFields = { text: 'text', value: 'value' };
    // Mapping DropDownList value property
    let dropDownVal = 'Inline';
    // Mapping DropDownList dataSource property
    let editableData = [
        { 'value': 'Click', 'text': 'Click' }, { 'value': 'DblClick', 'text': 'Double Click' }, { 'value': 'EditIconClick', 'text': 'Edit Icon Click' }
    ];
    // Mapping DropDownList fields property
    let editableFields = { text: 'text', value: 'value' };
    // Mapping DropDownList value property
    let editableVal = 'Click';
    // Change event funtion for DropDownList component   
    function changeEditorMode(e) {
        let mode = editorMode.value;
        textObj.mode = numericObj.mode = maskObj.mode = mode;
        textObj.dataBind();
        numericObj.dataBind();
        maskObj.dataBind();
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
        if (textObj && (textObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            textObj.enableEditMode = false;
        }
        if (numericObj && (numericObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            numericObj.enableEditMode = false;
        }
        if (maskObj && (maskObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            maskObj.enableEditMode = false;
        }
    }
    // Change event funtion for DropDownList component   
    function onEditableOn(e) {
        let editableValue = editableon.value;
        textObj.editableOn = numericObj.editableOn = maskObj.editableOn = editableValue;
        textObj.dataBind();
        numericObj.dataBind();
        maskObj.dataBind();
    }
    // Change event funtion for CheckBox component
    function onChange(e) {
        e.checked ? textObj.showButtons = numericObj.showButtons = maskObj.showButtons = true : textObj.showButtons = numericObj.showButtons = maskObj.showButtons = false;
    }
    // Change event funtion for CheckBox component
    function onChangeEnable(e) {
        e.checked ? textObj.disabled = numericObj.disabled = maskObj.disabled = true : textObj.disabled = numericObj.disabled = maskObj.disabled = false;
    }
    return (<div className='control-pane'>
                <div className="col-lg-8 control-section inplace-control-section default_layout">
                    <div className="control_wrapper">
                        <table>
                            <thead>
                                <tr>
                                <th></th>
                                <th></th>
                                </tr>
                            </thead>
                            <tr>
                                <td>
                                    <label className="control-label" style={{ textAlign: 'left', fontSize: '14px', fontWeight: 400 }}>
                                        TextBox </label>
                                </td>
                                <td>
                                    <InPlaceEditorComponent ref={(text) => { textObj = text; }} id='textboxEle' mode='Inline' type='Text' value='Andrew' model={textModel} popupSettings={popupSettings}>
                                    </InPlaceEditorComponent>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="control-label" style={{ textAlign: 'left', fontSize: '14px', fontWeight: 400 }}>
                                        NumericTextBox </label>
                                </td>
                                <td>
                                    <InPlaceEditorComponent ref={(numeric) => { numericObj = numeric; }} id='numericTextBoxEle' mode='Inline' type='Numeric' value='$100.00' model={numericModel}>
                                    </InPlaceEditorComponent>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="control-label" style={{ textAlign: 'left', fontSize: '14px', fontWeight: 400 }}>
                                        MaskedTextBox </label>
                                </td>
                                <td>
                                    <InPlaceEditorComponent ref={(mask) => { maskObj = mask; }} id='maskedTextBoxEle' mode='Inline' type='Mask' value='012-345-6789' model={maskModel}>
                                    </InPlaceEditorComponent>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='col-lg-4 property-section inplace-overview' id="defaultProperty">
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
                                            <DropDownListComponent ref={(edit) => { editorMode = edit; }} id='editorMode' className='form-control' dataSource={dropDownData} fields={dropDownFields} value={dropDownVal} width={'90%'} change={changeEditorMode.bind(this)}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Editable On</div>
                                    </td>
                                    <td>
                                        <div>
                                            {/* Render the DropDownList Component */}
                                            <DropDownListComponent ref={(edit) => { editableon = edit; }} id='editableon' className='form-control' dataSource={editableData} fields={editableFields} value={editableVal} width={'90%'} change={onEditableOn.bind(this)}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Show Buttons</div>
                                    </td>
                                    <td>
                                        <div>
                                            {/* Render the CheckBox Component */}
                                            <CheckBoxComponent id='showbuttons' checked={true} labelPosition='Before' change={onChange.bind(this)}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Disable</div>
                                    </td>
                                    <td>
                                        <div>
                                            {/* Render the CheckBox Component */}
                                            <CheckBoxComponent id='editorEnable' checked={false} labelPosition='Before' change={onChangeEnable.bind(this)}/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the default functionalities of the In-place Editor control. Click on the dotted input
                        element to
                        switch to the editable state and save or cancel it by clicking the actions buttons.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The <code>In-place Editor</code> component is used to edit values in place and update them to the server.
                    </p>
                    <p>
                        <code>In-place Editor</code> modes can be switched by selecting the appropriate values provided in a drop-down.
                        The applicable editor positions are as follows:
                    </p>
                    <p>
                        <ul>
                            <li>
                                <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/inplace-editor/#mode">
                                    Inline</a>
                            </li>
                            <li>
                                <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/inplace-editor/#mode">
                                    Pop-up</a>
                            </li>
                        </ul>
                    </p>
                    <p>
                        The edit on modes of In-place editor can be switched by selecting the appropriate values provided in a
                        drop-down. The applicable modes are as follows:
                        <ul>
                            <li>Click - Editor opens the edit input with single click of textbox.</li>
                            <li>DblClick - Editor opens the edit input with double click of textbox.</li>
                            <li>EditIconClick - Edit mode can be open with the use of edit icon only which is visible on hover of textbox.</li>
                        </ul>
                    </p>
                    <p>
                        The Save and Cancel buttons of the <code>In-place Editor</code> control can be shown or hidden by switching the Show Button check box
                        state. If the
                        action buttons are hidden, then you can save the data by clicking outside the target or by pressing the Enter
                        key.
                        You can cancel the edit request by pressing the Esc key.
                    </p>
                    <p>
                        More information on the <code>In-place Editor</code> instantiation can be found in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/">
                            documentation section</a>.
                    </p>
                </div>
            </div>);
}
export default Default;
