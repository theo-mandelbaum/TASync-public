import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Inject, InPlaceEditorComponent, MultiSelect, Rte } from '@syncfusion/ej2-react-inplace-editor';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import './editor.component.css';
// tslint:disable:max-line-length
function UseCase() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let inplaceEditorControlEle;
    inplaceEditorControlEle = null;
    let inplaceEditorControlRef = (element) => {
        inplaceEditorControlEle = element;
    };
    let titleObj;
    let tagObj;
    let rteObj;
    let editorMode;
    let popupSettings = { model: { width: 300 } };
    let multiValue = ['TypeScript', 'JavaScript'];
    // define the array of string
    let multiData = ['Android', 'JavaScript', 'jQuery', 'TypeScript', 'Angular', 'React', 'Vue', 'Ionic'];
    let textValidationRules = { Title: { required: [true, 'Enter valid title'] } };
    let textModel = { placeholder: 'Enter your question title' };
    let rteValidationRules = { rte: { required: [true, 'Enter valid comments'] } };
    let rteModel = {
        toolbarSettings: {
            enableFloating: false,
            items: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase', '|', 'OrderedList', 'UnorderedList']
        }
    };
    let selectValidationRules = { Tag: { required: [true, 'Enter valid tags'] } };
    let selectModel = { dataSource: multiData, placeholder: 'Enter your tags', mode: 'Box', };
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
        titleObj.mode = mode;
        tagObj.mode = mode;
        rteObj.mode = mode;
        titleObj.dataBind();
        tagObj.dataBind();
        rteObj.dataBind();
    }
    function selectionActionSuccess(e) {
        e.value = chipCreation(e.value.split(','));
    }
    function create() {
        rteObj.popupSettings.model.width = inplaceEditorControlEle.offsetWidth;
        chipOnCreate();
    }
    function chipOnCreate() {
        tagObj.element.querySelector('.e-editable-value').innerHTML = chipCreation(tagObj.value);
    }
    function chipCreation(data) {
        let value = '<div class="e-chip-list">';
        [].slice.call(data).forEach((val) => {
            value += '<div class="e-chip"> <span class="e-chip-text"> ' + val + '</span></div>';
        });
        value += '</div>';
        return value;
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
        if (titleObj && titleObj.element.querySelectorAll('.e-editable-open')) {
            titleObj.enableEditMode = false;
        }
        if (tagObj && tagObj.element.querySelectorAll('.e-editable-open')) {
            tagObj.enableEditMode = false;
        }
        if (rteObj && rteObj.element.querySelectorAll('.e-editable-open')) {
            rteObj.enableEditMode = false;
        }
    }
    return (<div className='control-pane'>
                <div className="col-lg-8 control-section inplace-editor-control-section form-layout" ref={inplaceEditorControlRef} id='inplace-editor-control'>
                    <div className="content-wrapper" style={{ marginBottom: "25px" }}>
                        <div id="confirmation">
                            <div id="submitDialog"></div>
                            <form id="formId" className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-6 control-label" style={{ textAlign: "left", fontSize: "14px", fontWeight: 700 }}>
                                        Title</label>
                                    <InPlaceEditorComponent ref={(title) => { titleObj = title; }} id='inplace_title_editor' data-underline='false' mode='Inline' emptyText='Enter your question title' name='Title' value='Succinctly E-Book about TypeScript' validationRules={textValidationRules} model={textModel}>
                                    </InPlaceEditorComponent>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-6 control-label" style={{ textAlign: "left", fontSize: "14px", fontWeight: 700 }}>
                                        Comments</label>
                                    <InPlaceEditorComponent ref={(rte) => { rteObj = rte; }} id='inplace_comment_editor' data-underline='false' mode='Inline' type='RTE' editableOn='EditIconClick' submitOnEnter={false} value='The extensive adoption of JavaScript for application development, and the ability to use HTML and JavaScript to create Windows Store apps, has made JavaScript a vital part of the Windows development ecosystem. Microsoft has done extensive work to make JavaScript easier to use.' emptyText='Enter your comment' name='rte' validationRules={rteValidationRules} model={rteModel} popupSettings={popupSettings}>
                                        <Inject services={[Rte]}/>
                                    </InPlaceEditorComponent>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-6 control-label" style={{ textAlign: "left", fontSize: "14px", fontWeight: 700 }}>
                                        Tags</label>
                                    <InPlaceEditorComponent ref={(tag) => { tagObj = tag; }} id='inplace_tag_editor' data-underline='false' mode='Inline' type='MultiSelect' created={create.bind(this)} value={multiValue} emptyText='Enter your tags' name='Tag' actionSuccess={selectionActionSuccess.bind(this)} validationRules={selectValidationRules} model={selectModel}>
                                        <Inject services={[MultiSelect]}/>
                                    </InPlaceEditorComponent>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="editorProperty">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className="property-panel-table">
                            <thead>
                                <tr>
                                <th></th>
                                <th></th>
                                </tr>
                            </thead>
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
                        The sample demonstrates In-place Editor component usage with a form element. Edit the values in place to update to the post.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates the placing of following <code>In-place Editor</code> controls with the default form
                    </p>
                    <p>
                        <ul>
                            <li>
                                TextBox
                            </li>
                            <li>
                                RichTextEditor
                            </li>
                            <li>
                                MultiSelect
                            </li>
                        </ul>
                    </p>
                    <p>
                        More information on the <code>In-place Editor</code> instantiation can be found in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/">
                            documentation section</a>.
                    </p>
                </div>
            </div>);
}
export default UseCase;
