/**
 * Rich Text Editor image sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, QuickToolbar, Image, Link, IToolbarItems, QuickToolbarSettingsModel, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-react-richtexteditor';
import { updateSampleSection } from '../common/sample-base';
import { NodeSelection } from '@syncfusion/ej2-react-richtexteditor';
import './image.css';
import { PropertyPane } from '../common/property-pane';
import { ChangeArgs } from '@syncfusion/ej2-buttons';
import { DropDownListComponent, FieldSettingsModel } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
function ImageSample() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let rteObj: RichTextEditorComponent;
    let formatdrop: DropDownListComponent;
    let readonly: CheckBoxComponent;
    const value: string = "Blob";
    const fields: FieldSettingsModel = { text: "text", value: "value" };
    const formatData: { [key: string]: Object }[] = [
        { text: 'Blob', value: 'Blob' },
        { text: 'Base64', value: 'Base64' }
    ];
    const image: (string | IToolbarItems)[] = ['Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
        'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension',
        {
            tooltipText: 'Rotate Left',
            template: '<button class="e-tbar-btn e-btn" id="roatateLeft"><span class="e-btn-icon e-icons e-rotate-left"></span>'
        },
        {
            tooltipText: 'Rotate Right',
            template: '<button class="e-tbar-btn e-btn" id="roatateRight"><span class="e-btn-icon e-icons e-rotate-right"></span>'
        }];

    const quickToolbarSettings: QuickToolbarSettingsModel = {
        image: image
    }
    function onToolbarClick(e: any): void {
        let nodeObj: NodeSelection = new NodeSelection();
        let range: Range = nodeObj.getRange(rteObj.contentModule.getDocument());
        let imgEle: HTMLElement = nodeObj.getNodeCollection(range)[0] as HTMLElement;
        if (e.item.tooltipText === 'Rotate Right') {
            let transform: number = (imgEle.style.transform === '') ? 0 :
                parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
            imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
            rteObj.formatter.saveData();
            rteObj.formatter.enableUndo(rteObj);
        } else if (e.item.tooltipText === 'Rotate Left') {
            let transform: number = (imgEle.style.transform === '') ? 0 :
                Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
            imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
            rteObj.formatter.saveData();
            rteObj.formatter.enableUndo(rteObj);
        }
    }
    const onCheckChange = (args: ChangeArgs): void => {
        rteObj.enableAutoUrl = (args as any).checked;
    }
    const ondropChange = (): void => {
        if (formatdrop.value === 'Base64') {
            rteObj.insertImageSettings.saveFormat = 'Base64';
        } else {
            rteObj.insertImageSettings.saveFormat = 'Blob';
        }
    }
    return (
        <div className='control-pane'>
            <div className='col-lg-8'>
                <div className='control-section' id="rteAPI">
                    <div className='rte-control-section'>
                        <RichTextEditorComponent id="imageRTE" ref={(richtexteditor) => { rteObj = richtexteditor }}
                            toolbarClick={onToolbarClick.bind(this)} quickToolbarSettings={quickToolbarSettings}>
                            <h2>Insert Image in Rich Text Editor!<br /></h2><p>You can insert and edit images within this editor. Click inside the editor and use the <strong>image tool</strong> to add an image.</p><h5>What You Can Do</h5><li><strong>Insert Images:</strong> Upload images from local storage or provide an image URL.</li><li><strong>Resize &amp; Drag:</strong> Easily adjust image dimensions and reposition them within the content.</li><li><strong>Align Images:</strong> Set images to align <strong>left, center, or right</strong>.</li><li><strong>Caption Support:</strong> Add captions to describe your images.</li><li><strong>Replace &amp; Remove:</strong> Change or delete images as needed.</li><h5>Try It Out!</h5><p><img id="rteImageID" style={{width: '300px', height: '300px',transform: 'rotate(0deg)'}} alt="Editor Features Overview" src="https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Portrait.png" className="e-rte-image e-imginline" /></p>
                            <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar, PasteCleanup, Table, Video, Audio]} />
                        </RichTextEditorComponent>
                    </div>
                </div>
            </div>
            <div className='col-lg-4 property-section' id="rteAPIProperty">
                <PropertyPane title='Properties'>
                    <table id="property" title="Properties" style={{ width: '100%', margin: '10px' }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: '8px', width: '50%' }}><div>EnableAutoUrl</div></td>
                                <td style={{ paddingTop: '0px' }}>
                                    <div style={{ paddingLeft: '0px', paddingTop: '0px' }}>
                                        <CheckBoxComponent checked={false} ref={(scope) => { readonly = scope; }} change={onCheckChange.bind(this)} ></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px', width: '50%' }}><div>Save Format </div></td>
                                <td>
                                    <div style={{ paddingLeft: '10px', paddingTop: '0px' }}>
                                        <DropDownListComponent id="formattingOption" dataSource={formatData} ref={(dropdownlist) => { formatdrop = dropdownlist }} fields={fields} change={ondropChange.bind(this)} value={value} popupHeight="200px" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the option to insert the image to the Rich Text Editor content. Click the image button from the
                    toolbar item to insert the image.</p>
            </div>
            <div id="description">
                <p>Image tools used to insert an image to the Rich Text Editor and click on the image to easily customize the image using quick toolbar.
                    The quick toolbar has the following items</p>
                <ul>
                    <li><code>Replace</code> – can replace the image with some other image.</li>
                    <li><code>Align</code> – Align the image with left, right and justify.</li>
                    <li><code>Image captions</code> – set the captions for the image.</li>
                    <li><code>Change size</code> – modify width and height of image.</li>
                    <li><code>Delete</code> – delete the image.</li>
                    <li><code>Link</code> – provide the link to the image.</li>
                    <li><code>Display</code> - display the image as inline or with break.</li>
                    <li><code>Alternate text</code> – provide the alternative text for the image if the image is not present in the location.</li>
                    <li><code>Custom Tools</code> - "rotation" related commands are added as custom commands to the image element</li>
                    <li><code>Resize</code> – can resize the image dimension with resize options.</li>
                </ul>
                Quick commands are opened as context-menu on clicking the corresponding element.
                The commands must be passed as string collection to image, text, and link attributes of the quickToolbarSettings property.

                <p><b>Injecting Module:</b></p>
                <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use image tool, we need to inject <code>Image</code> modules into the services.</p>
            </div>
        </div>
    );
}
export default ImageSample;
