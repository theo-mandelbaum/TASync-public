/**
 * Rich Text Editor Enter Key Configuration sample
 */
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-react-richtexteditor';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { createElement } from '@syncfusion/ej2-base';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import './enter-key-configuration.css';
function EnterKeyConfiguration() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let state = {
        textAreaValue: `<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`
    };
    let rteObj;
    let enterList;
    let shiftEnterList;
    const rteValue = `<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
    const popupHeight = '200px';
    const enterValue = "P";
    const shiftEnterValue = "BR";
    const enterPlaceholder = "When pressing the enter key";
    const shiftEnterPlaceholder = "When pressing the shift + enter key";
    const fields = { text: "text", value: "value" };
    const enterData = [
        { text: 'Create a new <p>', value: 'P' },
        { text: 'Create a new <div>', value: 'DIV' },
        { text: 'Create a new <br>', value: 'BR' }
    ];
    const shiftEnterData = [
        { text: 'Create a new <br>', value: 'BR' },
        { text: 'Create a new <div>', value: 'DIV' },
        { text: 'Create a new <p>', value: 'P' }
    ];
    const enterChange = () => {
        if (enterList.value === 'P') {
            rteObj.enterKey = 'P';
            rteObj.value = `<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
        }
        else if (enterList.value === 'DIV') {
            rteObj.enterKey = 'DIV';
            rteObj.value = `<div>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</div><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
        }
        else if (enterList.value === 'BR') {
            rteObj.enterKey = 'BR';
            rteObj.value = `In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:<ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
        }
        onChange();
    };
    const shiftEnterChange = () => {
        if (shiftEnterList.value === 'BR') {
            rteObj.shiftEnterKey = 'BR';
        }
        else if (shiftEnterList.value === 'DIV') {
            rteObj.shiftEnterKey = 'DIV';
        }
        else if (shiftEnterList.value === 'P') {
            rteObj.shiftEnterKey = 'P';
        }
    };
    const onCreate = () => {
        onChange();
    };
    const onChange = () => {
        let id = rteObj.getID() + 'mirror-view';
        let codeView = document.getElementById('codeView');
        let mirrorView;
        if (document.getElementById(id)) {
            mirrorView = document.getElementById(id);
            mirrorView.innerHTML = '';
        }
        else {
            mirrorView = createElement('div', { className: 'e-content codeViewContent' });
            mirrorView.id = id;
            codeView.appendChild(mirrorView);
        }
        mirrorView.style.display = 'block';
        if (rteObj.value !== null) {
            CodeMirror(mirrorView, {
                value: rteObj.value,
                mode: 'text/html',
                lineWrapping: true,
                readOnly: true
            });
        }
    };
    return (<div className='control-pane'>
            <div className='control-section enter-key' id="rte">
                <div className='rte-control-section'>
                    <table className='api'>
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <DropDownListComponent id="enterOption" dataSource={enterData} ref={(dropdownlist) => { enterList = dropdownlist; }} fields={fields} change={enterChange.bind(this)} value={enterValue} popupHeight={popupHeight} placeholder={enterPlaceholder} floatLabelType="Always"/>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id="shiftEnterOption" dataSource={shiftEnterData} ref={(dropdownlist) => { shiftEnterList = dropdownlist; }} fields={fields} change={shiftEnterChange.bind(this)} value={shiftEnterValue} popupHeight={popupHeight} placeholder={shiftEnterPlaceholder} floatLabelType="Always"/>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { rteObj = richtexteditor; }} change={onChange.bind(this)} created={onCreate.bind(this)} height={220} saveInterval={1} value={rteValue}>
                        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar, PasteCleanup, Table, Video, Audio]}/>
                    </RichTextEditorComponent>
                    <br />
                    <label>Code View </label>
                    <div id="codeView" className="codeView"></div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the API usage to customize the enter key and shift + enter key actions in the Rich Text Editor content. Code view represents the current rich text editor value when pressing typing any content or pressing enter key or shift + enter keys.</p>
            </div>

            <div id="description">
                <p>In this demo, ensure the API's behaviors by</p>
                <ul>
                    <li>Changing the value of <code>enterKey</code> dropdown to customize the enter key action when it is pressed.</li>
                    <li>Changing the value of <code>shiftEnterKey</code> dropdown to customize the shift + enter key action when it is pressed.</li>
                </ul>
            </div>
        </div>);
}
export default EnterKeyConfiguration;
