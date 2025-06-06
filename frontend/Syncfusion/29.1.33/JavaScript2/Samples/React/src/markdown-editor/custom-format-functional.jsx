/**
 * Rich Text Editor custom format sample
 */
import { createElement } from '@syncfusion/ej2-base';
import { Image, Inject, Link, MarkdownEditor, MarkdownFormatter, RichTextEditorComponent, Toolbar, Table } from '@syncfusion/ej2-react-richtexteditor';
import * as Marked from 'marked';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import './custom-format.css';
import { Tooltip } from '@syncfusion/ej2-react-popups';
function CustomFormat() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let rteObj;
    // set the value to Rich Text Editor
    const template = `The sample is configured with customized markdown syntax using the __formatter__ property. Type the content and click the toolbar item to view customized markdown syntax. For unordered list, you need to add a plus sign before the word (e.g., + list1). Or To make a phrase bold, you need to add two underscores before and after the phrase (e.g., __this text is bold__).`;
    const placeholder = "Enter your text here...";
    // Rich Text Editor items list
    const items = ['Bold', 'Italic', 'StrikeThrough', '|',
        'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
        'CreateLink', 'Image', '|',
        {
            template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code">' +
                '<span class="e-btn-icon e-icons e-md-preview"></span></button>'
        }, 'Undo', 'Redo'];
    let textArea;
    let mdsource;
    let mdPreview;
    let tooltipObj;
    //Rich Text Editor ToolbarSettings
    const toolbarSettings = {
        items: items
    };
    const formatter = new MarkdownFormatter({
        listTags: { 'OL': '2. ', 'UL': '+ ' },
        formatTags: {
            'Blockquote': '> '
        },
        selectionTags: { 'Bold': '__', 'Italic': '_' }
    });
    function markdownConversion() {
        if (mdsource.classList.contains('e-active')) {
            let id = rteObj.getID() + 'html-view';
            let htmlPreview = rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked.marked(rteObj.contentModule.getEditPanel().value);
        }
    }
    function fullPreview() {
        let id = rteObj.getID() + 'html-preview';
        let htmlPreview = rteObj.element.querySelector('#' + id);
        if (mdsource.classList.contains('e-active')) {
            mdsource.classList.remove('e-active');
            rteObj.enableToolbarItem(rteObj.toolbarSettings.items);
            textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
            tooltipObj.content = "Preview";
        }
        else {
            mdsource.classList.add('e-active');
            rteObj.disableToolbarItem(rteObj.toolbarSettings.items);
            if (!htmlPreview) {
                htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                textArea.parentNode.appendChild(htmlPreview);
            }
            textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            tooltipObj.content = "Codeview";
            htmlPreview.innerHTML = Marked.marked(rteObj.contentModule.getEditPanel().value);
        }
    }
    function rendereComplete() {
        mdPreview = document.getElementById('MD_Preview');
        textArea = rteObj.contentModule.getEditPanel();
        textArea.addEventListener('keyup', (e) => {
            markdownConversion();
        });
        mdsource = document.getElementById('preview-code');
        mdsource.addEventListener('click', (e) => {
            fullPreview();
        });
        tooltipObj = new Tooltip({
            content: "Preview",
            target: "#preview-code"
        });
        tooltipObj.appendTo("#preview-code");
    }
    return (<div className='control-pane'>
            <div className='control-section' id="rteCustomFormat">
                <div className="content-wrapper">
                    <RichTextEditorComponent id="markdownRTE" ref={(richtexteditor) => { rteObj = richtexteditor; }} height='260px' editorMode='Markdown' formatter={formatter} valueTemplate={template} created={rendereComplete} toolbarSettings={toolbarSettings}>
                        <Inject services={[MarkdownEditor, Toolbar, Image, Link, Table]}/>
                    </RichTextEditorComponent>
                </div>
            </div>
            <div id="action-description">
                <p> This sample demonstrates how to customize tags of markdown formatting. Type or edit the text and apply the format to
                    view customized markdown syntax. For example, apply “+” to Unordered list. </p>
            </div>

            <div id="description">
                The Rich Text Editor allows you to customize the markdown syntax by overriding its default syntax. Configure the customized
                markdown syntax using the <code>formatter</code>property
                <p><b>Injecting Module</b></p>
                <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject <code>Toolbar, Link, Image, MarkdownEditor</code> modules into the services.</p>
                <p>The third-party library <code>Marked</code> is used in this sample to convert markdown into HTML content.</p>
            </div>
        </div>);
}
export default CustomFormat;
