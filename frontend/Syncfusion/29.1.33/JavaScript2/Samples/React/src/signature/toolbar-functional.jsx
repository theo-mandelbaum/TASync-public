import * as React from 'react';
import { useRef, useEffect, useState } from "react";
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { SignatureComponent } from '@syncfusion/ej2-react-inputs';
import { getComponent, createElement, addClass } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import './toolbar.css';
import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { SplitButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
const Toolbar = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [bgColor, setBgColor] = useState('');
    const [strokeColor, setStrokeColor] = useState('rgb(0, 0, 0)');
    const [isSignDisabled, setIsSignDisabled] = useState(false);
    let singnatureObj = useRef(null);
    let strokeColorObj = useRef(null);
    let bgColorObj = useRef(null);
    let saveBtnObj = useRef(null);
    let toolbarObj = useRef(null);
    const change = (args) => {
        setIsSignDisabled(args.checked);
    };
    let disabledTemplate = new CheckBox({ label: 'Disabled', checked: isSignDisabled, change: change });
    const onCreated = () => {
        addClass([strokeColorObj.current.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
        addClass([bgColorObj.current.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
        clearButton();
        let toolbarlItems = toolbarObj.current.element.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
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
    };
    const onClicked = (args) => {
        if (singnatureObj.current.disabled && args.item.tooltipText != 'Disabled') {
            return;
        }
        switch (args.item.tooltipText) {
            case "Undo (Ctrl + Z)":
                if (singnatureObj.current.canUndo()) {
                    singnatureObj.current.undo();
                    updateUndoRedo();
                    updateSaveBtn();
                }
                break;
            case "Redo (Ctrl + Y)":
                if (singnatureObj.current.canRedo()) {
                    singnatureObj.current.redo();
                    updateUndoRedo();
                    updateSaveBtn();
                }
                break;
            case "Clear":
                singnatureObj.current.clear();
                if (singnatureObj.current.isEmpty()) {
                    clearButton();
                    saveBtnObj.current.disabled = true;
                }
                break;
        }
    };
    const onChange = () => {
        if (!singnatureObj.current.isEmpty()) {
            clearButton();
            saveBtnObj.current.disabled = false;
        }
        updateUndoRedo();
    };
    const saveBtnClick = () => {
        singnatureObj.current.save();
    };
    const clearButton = () => {
        let tlItems = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < tlItems.length; i++) {
            if (tlItems[i].children[0].classList.contains('e-clear')) {
                let clrBtn = getComponent(tlItems[i], 'btn');
                if (singnatureObj.current.isEmpty()) {
                    clrBtn.disabled = true;
                }
                else {
                    clrBtn.disabled = false;
                }
            }
        }
    };
    const updateSaveBtn = () => {
        if (singnatureObj.current.isEmpty()) {
            saveBtnObj.current.disabled = true;
        }
        else {
            saveBtnObj.current.disabled = false;
        }
    };
    const updateUndoRedo = () => {
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
        if (singnatureObj.current.canUndo()) {
            undoButton.disabled = false;
        }
        else {
            undoButton.disabled = true;
        }
        if (singnatureObj.current.canRedo()) {
            redoButton.disabled = false;
        }
        else {
            redoButton.disabled = true;
        }
    };
    const saveTemplate = () => {
        let items;
        items = [
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
        const onSelect = (args) => {
            singnatureObj.current.save(args.item.text, 'Signature');
        };
        return (<div>
                <SplitButtonComponent content="Save" id="save-option" ref={saveBtnObj} items={items} iconCss='e-sign-icons e-save' onClick={saveBtnClick} select={onSelect} disabled={true}/>
            </div>);
    };
    const strokeColorTemplate = () => {
        let presets;
        presets = {
            'custom': ['#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
        };
        const tileRender = (args) => {
            args.element.classList.add('e-circle-palette');
            args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
        };
        const strokeColorChanged = (args) => {
            if (singnatureObj.current.disabled) {
                return;
            }
            let selElem = strokeColorObj.current.element.nextElementSibling.querySelector('.e-selected-color');
            selElem.style.borderBottomColor = args.currentValue.rgba;
            setStrokeColor(args.currentValue.rgba);
        };
        return (<div>
                <ColorPickerComponent id="stroke-color" ref={strokeColorObj} mode='Palette' cssClass='e-stroke-color' modeSwitcher={false} showButtons={false} columns={4} presetColors={presets} beforeTileRender={tileRender} change={strokeColorChanged}></ColorPickerComponent>
            </div>);
    };
    const bgColorTemplate = () => {
        let presets;
        presets = {
            'custom': ['#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
        };
        const beforeTileRender = (args) => {
            args.element.classList.add('e-circle-palette');
            args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
        };
        const bgColorChanged = (args) => {
            if (singnatureObj.current.disabled) {
                return;
            }
            let selElem = bgColorObj.current.element.nextElementSibling.querySelector('.e-selected-color');
            setBgColor(args.currentValue.rgba);
            selElem.style.borderBottomColor = args.currentValue.rgba;
        };
        return (<div>
                <ColorPickerComponent id="bg-color" ref={bgColorObj} noColor={true} mode='Palette' cssClass='e-bg-color' modeSwitcher={false} showButtons={false} columns={4} presetColors={presets} beforeTileRender={beforeTileRender} change={bgColorChanged}></ColorPickerComponent>
            </div>);
    };
    const strokeWidthTemplate = () => {
        let data = [1, 2, 3, 4, 5];
        let value = 2;
        const strokeWidthChanged = (args) => {
            setStrokeWidth(args.value);
        };
        return (<div>
                <DropDownListComponent id="ddlelement" dataSource={data} value={strokeWidth} width="60" change={strokeWidthChanged}/>
            </div>);
    };
    return (<div className='control-pane'>
            <div className="col-lg-12 control-section">
                <div id="signature-toolbar-control">
                    <ToolbarComponent id='toolbar' ref={toolbarObj} created={onCreated} clicked={onClicked}>
                        <ItemsDirective>
                            <ItemDirective text='Undo' prefixIcon='e-icons e-undo' tooltipText='Undo (Ctrl + Z)'/>
                            <ItemDirective text='Redo' prefixIcon='e-icons e-redo' tooltipText='Redo (Ctrl + Y)'/>
                            <ItemDirective type='Separator'/>
                            <ItemDirective tooltipText='Save (Ctrl + S)' type='Button' template={saveTemplate}/>
                            <ItemDirective type='Separator'/>
                            <ItemDirective tooltipText='Stroke Color' template={strokeColorTemplate}/>
                            <ItemDirective type='Separator'/>
                            <ItemDirective tooltipText='Background Color' template={bgColorTemplate}/>
                            <ItemDirective type='Separator'/>
                            <ItemDirective tooltipText='Stroke Width' template={strokeWidthTemplate}/>
                            <ItemDirective type='Separator'/>
                            <ItemDirective text='Clear' prefixIcon='e-sign-icons e-clear' tooltipText='Clear'/>
                            <ItemDirective tooltipText='Disabled' type='Input' template={disabledTemplate} align='Right'/>
                        </ItemsDirective>
                    </ToolbarComponent>
                    <div id="signature-control">
                        <SignatureComponent maxStrokeWidth={strokeWidth} backgroundColor={bgColor} strokeColor={strokeColor} id="signature" change={onChange} ref={singnatureObj} disabled={isSignDisabled}></SignatureComponent>
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
};
export default Toolbar;
