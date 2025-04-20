import * as React from 'react';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { SignatureComponent } from '@syncfusion/ej2-react-inputs';
import { getComponent, createElement, addClass } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './toolbar.css';
import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { SplitButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
export class Toolbar extends SampleBase {
    signature;
    disabledTemplate;
    constructor(props) {
        super(props);
        this.disabledTemplate = new CheckBox({ label: 'Disabled', checked: false, change: this.change });
    }
    change(args) {
        let signature = getComponent(document.getElementById('signature'), 'signature');
        signature.disabled = args.checked;
    }
    onCreated() {
        let strokeColor = getComponent(document.getElementById('stroke-color'), 'colorpicker');
        let bgColor = getComponent(document.getElementById('bg-color'), 'colorpicker');
        addClass([strokeColor.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
        addClass([bgColor.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
        document.getElementById('save-option').addEventListener('click', this.saveBtnClick);
        this.clearButton();
        let toolbarlItems = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < toolbarlItems.length; i++) {
            if (toolbarlItems[i].children[0].classList.contains('e-undo')) {
                let undoButton = getComponent(toolbarlItems[i], 'btn');
                undoButton.disabled = true;
            }
            if (toolbarlItems[i].children[0].classList.contains('e-redo')) {
                let redoButton = getComponent(toolbarlItems[i], 'btn');
                redoButton.disabled = true;
            }
        }
    }
    onClicked(args) {
        let signature = getComponent(document.getElementById('signature'), 'signature');
        let saveBtn = getComponent(document.getElementById("save-option"), 'split-btn');
        if (signature.disabled && args.item.tooltipText != 'Disabled') {
            return;
        }
        switch (args.item.tooltipText) {
            case 'Undo (Ctrl + Z)':
                if (signature.canUndo()) {
                    signature.undo();
                    this.updateUndoRedo();
                    this.updateSaveBtn();
                }
                break;
            case 'Redo (Ctrl + Y)':
                if (signature.canRedo()) {
                    signature.redo();
                    this.updateUndoRedo();
                    this.updateSaveBtn();
                }
                break;
            case 'Clear':
                signature.clear();
                if (signature.isEmpty()) {
                    this.clearButton();
                    saveBtn.disabled = true;
                }
                break;
        }
    }
    onChange() {
        let signature = getComponent(document.getElementById('signature'), 'signature');
        let saveBtn = getComponent(document.getElementById("save-option"), 'split-btn');
        if (!signature.isEmpty()) {
            this.clearButton();
            saveBtn.disabled = false;
        }
        this.updateUndoRedo();
    }
    saveBtnClick() {
        let signature = getComponent(document.getElementById("signature"), 'signature');
        signature.save();
    }
    clearButton() {
        let signature = getComponent(document.getElementById('signature'), 'signature');
        let tlItems = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < tlItems.length; i++) {
            if (tlItems[i].children[0].classList.contains('e-clear')) {
                let clrBtn = getComponent(tlItems[i], 'btn');
                if (signature.isEmpty()) {
                    clrBtn.disabled = true;
                }
                else {
                    clrBtn.disabled = false;
                }
            }
        }
    }
    updateSaveBtn() {
        let signature = getComponent(document.getElementById('signature'), 'signature');
        let saveBtn = getComponent(document.getElementById("save-option"), 'split-btn');
        if (signature.isEmpty()) {
            saveBtn.disabled = true;
        }
        else {
            saveBtn.disabled = false;
        }
    }
    updateUndoRedo() {
        let signature = getComponent(document.getElementById('signature'), 'signature');
        let undoButton;
        let redoButton;
        let tlItems = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < tlItems.length; i++) {
            if (tlItems[i].children[0].classList.contains('e-undo')) {
                undoButton = getComponent(tlItems[i], 'btn');
            }
            if (tlItems[i].children[0].classList.contains('e-redo')) {
                redoButton = getComponent(tlItems[i], 'btn');
            }
        }
        if (signature.canUndo()) {
            undoButton.disabled = false;
        }
        else {
            undoButton.disabled = true;
        }
        if (signature.canRedo()) {
            redoButton.disabled = false;
        }
        else {
            redoButton.disabled = true;
        }
    }
    saveTemplate(props) {
        return (<SaveTemplate {...props}/>);
    }
    strokeColorTemplate(props) {
        return (<StrokeColorTemplate {...props}/>);
    }
    bgColorTemplate(props) {
        return (<BgColorTemplate {...props}/>);
    }
    strokeWidthTemplate(props) {
        return (<StrokeWidthTemplate {...props}/>);
    }
    render() {
        return (<div className='control-pane'>
         <div className="col-lg-12 control-section">
            <div id="signature-toolbar-control">
              <ToolbarComponent id='toolbar' created={this.onCreated.bind(this)} clicked={this.onClicked.bind(this)}>
                <ItemsDirective>
                  <ItemDirective text='Undo' prefixIcon='e-icons e-undo' tooltipText='Undo (Ctrl + Z)'/>
                  <ItemDirective text='Redo' prefixIcon='e-icons e-redo' tooltipText='Redo (Ctrl + Y)'/>
                  <ItemDirective type='Separator'/>
                  <ItemDirective tooltipText='Save (Ctrl + S)' type='Button' template={this.saveTemplate}/>
                  <ItemDirective type='Separator'/>
                  <ItemDirective tooltipText='Stroke Color' template={this.strokeColorTemplate}/>
                  <ItemDirective type='Separator'/>
                  <ItemDirective tooltipText='Background Color' template={this.bgColorTemplate}/>
                  <ItemDirective type='Separator'/>
                  <ItemDirective tooltipText='Stroke Width' template={this.strokeWidthTemplate}/>
                  <ItemDirective type='Separator'/>
                  <ItemDirective text='Clear' prefixIcon='e-sign-icons e-clear' tooltipText='Clear'/>
                  <ItemDirective tooltipText='Disabled' type='Input' template={this.disabledTemplate} align='Right'/>
                </ItemsDirective>
              </ToolbarComponent>
              <div id="signature-control">
                <SignatureComponent maxStrokeWidth={2} id="signature" change={this.onChange.bind(this)}></SignatureComponent>
              </div>
          </div>
		    </div>
		    <div id="action-description">
          <p>This sample demonstrates the <b>Signature</b> component with toolbar items to illustrate the undo, redo, save with background, background color, stroke color, clear and disabled support of the <b>Signature</b> component.</p>
		    </div>
		    <div id="description">
          <p>The <code>Signature</code> component supports undo, redo, background color, stroke color, save, save with background, clear, and disabled functionalities.</p>
          <p>In this sample, each toolbar item illustrates the <code>Signature</code> component functionalities, which are listed below.</p>
          <ul>
            <li><p>Use <b>Undo</b> button or <b>Ctrl + Z</b> key to revert your signature.</p></li>
            <li><p>Use the <b>Redo</b> button or <b>Ctrl + Y</b> key to remake your reverted signature.</p></li>
            <li><p>Use the <b>Save</b> button or <b>Ctrl + S</b> key to store your signature as an image file.</p></li>
            <li><p><b>Stroke</b> color picker is used to apply the stroke color to the Signature component.</p></li>
            <li><p><b>Background</b> color picker is used to apply the background color to the Signature component.</p></li>
            <li><p>Use <b>Stroke Width</b> drop-down list values to change the signature stroke width.</p></li>
            <li><p>Use the <b>Clear</b> button to clear the signature.</p></li>
            <li><p>Check the <b>Disabled</b> checkbox to disable the Signature component.</p></li>
          </ul>
          <p>
              More information about Signature can be found in this
              <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/signature/getting-started"> documentation section</a>.
          </p>
		    </div>
      </div>);
    }
}
export class SaveTemplate extends React.Component {
    items;
    constructor(props) {
        super(props);
        this.items = [
            {
                text: 'Png'
            },
            {
                text: 'Jpeg'
            },
            {
                text: 'Svg'
            }
        ];
    }
    onSelect(args) {
        let signature = getComponent(document.getElementById('signature'), 'signature');
        signature.save(args.item.text, 'Signature');
    }
    render() {
        return (<div>
        <SplitButtonComponent content="Save" id="save-option" items={this.items} iconCss='e-sign-icons e-save' select={this.onSelect.bind(this)} disabled={true}/>
      </div>);
    }
}
export class StrokeColorTemplate extends React.Component {
    presets;
    constructor(props) {
        super(props);
        this.presets = {
            'custom': ['#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
        };
    }
    tileRender(args) {
        args.element.classList.add('e-circle-palette');
        args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
    }
    strokeColorChanged(args) {
        let signature = getComponent(document.getElementById('signature'), 'signature');
        let strokeColor = getComponent(document.getElementById('stroke-color'), 'colorpicker');
        if (signature.disabled) {
            return;
        }
        let selElem = strokeColor.element.nextElementSibling.querySelector('.e-selected-color');
        selElem.style.borderBottomColor = args.currentValue.rgba;
        signature.strokeColor = args.currentValue.rgba;
    }
    render() {
        return (<div>
        <ColorPickerComponent id="stroke-color" mode='Palette' cssClass='e-stroke-color' modeSwitcher={false} showButtons={false} columns={4} presetColors={this.presets} beforeTileRender={this.tileRender.bind(this)} change={this.strokeColorChanged.bind(this)}></ColorPickerComponent>
      </div>);
    }
}
export class BgColorTemplate extends React.Component {
    presets;
    constructor(props) {
        super(props);
        this.presets = {
            'custom': ['#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
        };
    }
    beforeTileRender(args) {
        args.element.classList.add('e-circle-palette');
        args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
    }
    bgColorChanged(args) {
        let signature = getComponent(document.getElementById('signature'), 'signature');
        let bgColor = getComponent(document.getElementById('bg-color'), 'colorpicker');
        if (signature.disabled) {
            return;
        }
        let selElem = bgColor.element.nextElementSibling.querySelector('.e-selected-color');
        signature.backgroundColor = args.currentValue.rgba;
        selElem.style.borderBottomColor = args.currentValue.rgba;
    }
    render() {
        return (<div>
        <ColorPickerComponent id="bg-color" noColor={true} mode='Palette' cssClass='e-bg-color' modeSwitcher={false} showButtons={false} columns={4} presetColors={this.presets} beforeTileRender={this.beforeTileRender.bind(this)} change={this.bgColorChanged.bind(this)}></ColorPickerComponent>
      </div>);
    }
}
export class StrokeWidthTemplate extends React.Component {
    data = [1, 2, 3, 4, 5];
    value = 2;
    constructor(props) {
        super(props);
    }
    strokeWidthChanged(args) {
        let signature = getComponent(document.getElementById('signature'), 'signature');
        signature.maxStrokeWidth = args.value;
    }
    render() {
        const args = this.state;
        return (<div>
        <DropDownListComponent id="ddlelement" dataSource={this.data} value={this.value} width="60" change={this.strokeWidthChanged.bind(this)}/>
      </div>);
    }
}
