import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useEffect } from "react";
import { ColorPickerComponent, ColorPickerEventArgs } from '@syncfusion/ej2-react-inputs';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import './inline.css';

const Inline = () => {
  useEffect(() => {
    updateSampleSection();
    rendereComplete();
  }, [])
  const [color, setColor] = useState("#008000");
  const [mobile, setMobile] = useState('');
  // function to handle the ColorPicker change event
  const change = (args: ColorPickerEventArgs): void => {
    setColor(args.currentValue.hex);
  }

  const rendereComplete = (): void => {
    if (Browser.isDevice) {
      setMobile('e-mobile-control');
    }
  }

  return (
    <div className='control-pane'>
      <div className='inline control-section'>
        <div id='inline-control' className={mobile}>
          <div className='row'>
            <div id='preview' style={{ backgroundColor: color }}></div>
          </div>
          <div id='inline-content' className='row'>
            <div className='col-xs-12 col-sm-12 col-lg-6 col-md-6'>
              <h4>Inline Palette</h4>
              <ColorPickerComponent id='inline-palette' mode='Palette' modeSwitcher={false} inline={true} showButtons={false} change={change}></ColorPickerComponent>
            </div>
            <div className='col-xs-12 col-sm-12 col-lg-6 col-md-6'>
              <h4>Inline Picker</h4>
              <ColorPickerComponent id='inline-picker' mode='Picker' modeSwitcher={false} inline={true} showButtons={false} change={change}></ColorPickerComponent>
            </div>
          </div>
        </div>
      </div>
      <div id='action-description'>
        <p>This sample demonstrates the inline (flat) mode ColorPicker with different modes and predefined styles.</p>
      </div>
      <div id='description'>
        <p>
          The ColorPicker component is a user interface to select and adjust color values. This supports various color specifications
          like RGB (Red Green Blue), HSV (Hue Saturation Value), and Hex codes.
        </p>
        <p>In this sample,</p>
        <ul>
          <li>Color picker/palette is rendered inline by using the inline
            <code>
              <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/color-picker/#inline">inline</a>
            </code> property set to
            <i>true</i>.
          </li>
          <li>Using the
            <code>
              <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/color-picker/#mode">mode</a>
            </code> property, you can specify the mode
            <i>(Picker/ Palette)</i> of the ColorPicker.
          </li>
          <li>Using the
            <code>
              <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/color-picker/#showbuttons">showButtons</a>
            </code> property, you can enable or disable the control
            <i>(apply/cancel)</i> buttons.
          </li>
          <li>To render the 'Palette' / 'Picker' alone you can hide the mode switcher using <code>
            <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/color-picker/#modeswitcher">modeSwitcher</a>
            </code> property
          </li>
        </ul>
        <p>
          More information about ColorPicker can be found in this
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/color-picker/getting-started/#inline-type">
            documentation section
          </a>.
        </p>
      </div>
    </div>
  )
}
export default Inline;