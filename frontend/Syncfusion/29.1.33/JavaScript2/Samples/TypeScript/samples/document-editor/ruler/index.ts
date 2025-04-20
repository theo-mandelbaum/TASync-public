import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { TitleBar } from './title-bar';
import * as data from './data-default.json';


/**
 * Default document editor sample
 */

    
    let hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/';

    let container: DocumentEditorContainer = new DocumentEditorContainer({ serviceUrl:hostUrl, enableToolbar: true, height: '590px', documentEditorSettings: { showRuler: true } });
    DocumentEditorContainer.Inject(Toolbar);
    container.appendTo('#container');

    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Getting Started';
    titleBar.updateDocumentTitle();

    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };
    let checkbox: CheckBox = new CheckBox({ label: 'Show ruler', checked: true, change: (args) => { 
        container.documentEditorSettings.showRuler = args.checked;
      }});

    // Render initialized CheckBox.
    checkbox.appendTo('#checkbox');

