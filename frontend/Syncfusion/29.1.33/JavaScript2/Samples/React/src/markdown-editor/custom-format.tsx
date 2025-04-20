/**
 * Rich Text Editor custom format sample
 */
import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { Image, Inject, ToolbarSettingsModel, IToolbarItems, Link, MarkdownEditor, MarkdownFormatter, RichTextEditorComponent, Toolbar, Table } from '@syncfusion/ej2-react-richtexteditor';
import * as Marked from 'marked';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';
import './custom-format.css';
import { Tooltip } from '@syncfusion/ej2-react-popups';

export class CustomFormat extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorComponent;

    // set the value to Rich Text Editor
    private template: string = `The sample is configured with customized markdown syntax using the __formatter__ property. Type the content and click the toolbar item to view customized markdown syntax. For unordered list, you need to add a plus sign before the word (e.g., + list1). Or To make a phrase bold, you need to add two underscores before and after the phrase (e.g., __this text is bold__).`;

    private placeholder: string = "Enter your text here...";
    // Rich Text Editor items list
    private items: (string | IToolbarItems)[] = ['Bold', 'Italic', 'StrikeThrough', '|',
        'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
        {
            template:
              '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code">' +
              '<span class="e-btn-icon e-icons e-md-preview"></span></button>'
        }, 'Undo', 'Redo'];

    private textArea: HTMLTextAreaElement;
    private mdsource: HTMLElement;
    private mdPreview: HTMLElement;
    private tooltipObj: Tooltip;

    //Rich Text Editor ToolbarSettings
    private toolbarSettings: ToolbarSettingsModel = {
        items: this.items
    };

    private formatter = new MarkdownFormatter({
        listTags: { 'OL': '2. ', 'UL': '+ ' },
        formatTags: {
            'Blockquote': '> '
        },
        selectionTags: { 'Bold': '__', 'Italic': '_' }
    });

    public markdownConversion(): void {
        if (this.mdsource.classList.contains('e-active')) {
            let id: string = this.rteObj.getID() + 'html-view';
            let htmlPreview: HTMLElement = this.rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked.marked((this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value);

        }
    }
    public fullPreview(): void {
        let id: string = this.rteObj.getID() + 'html-preview';
        let htmlPreview: HTMLElement = this.rteObj.element.querySelector('#' + id);
        if (this.mdsource.classList.contains('e-active')) {
            this.mdsource.classList.remove('e-active');
            this.rteObj.enableToolbarItem(this.rteObj.toolbarSettings.items as string[]);
            this.textArea.style.display = 'block';
            this.tooltipObj.content = "Preview";
            htmlPreview.style.display = 'none';
        } else {
            this.mdsource.classList.add('e-active');
            this.rteObj.disableToolbarItem(this.rteObj.toolbarSettings.items as string[]);
            if (!htmlPreview) {
                htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                this.textArea.parentNode.appendChild(htmlPreview);
            }
            this.textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            this.tooltipObj.content = "Codeview";
            htmlPreview.innerHTML = Marked.marked((this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value);

        }
    }
    public rendereComplete(): void {
        this.mdPreview = document.getElementById('MD_Preview');
        this.textArea = this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement;
        this.textArea.addEventListener('keyup', (e: KeyboardEventArgs) => {
            this.markdownConversion();
            this.rteObj.toolbarModule.baseToolbar.toolbarObj.hideItem(13, true);

        });
        this.mdsource = document.getElementById('preview-code');
        this.mdsource.addEventListener('click', (e: MouseEvent) => {
            this.fullPreview();
        });
        this.tooltipObj = new Tooltip({
            content: "Preview",  
            target: "#preview-code"  
          });
        this.tooltipObj.appendTo("#preview-code");
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section' id="rteCustomFormat">
                    <div className="content-wrapper">
                        <RichTextEditorComponent id="markdownRTE"
                            ref={(richtexteditor) => { this.rteObj = richtexteditor }}
                            height='260px' editorMode='Markdown'
                            formatter={this.formatter}
                            valueTemplate={this.template} toolbarSettings={this.toolbarSettings} >
                            <Inject services={[MarkdownEditor, Toolbar, Image, Link, Table]} />
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
            </div>
        );
    }
}
