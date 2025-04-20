import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import * as data from './data-track-changes.json';


/**
 * Default document editor sample
 */

    
    let hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/';

    let container: DocumentEditorContainer = new DocumentEditorContainer({
        serviceUrl:hostUrl,enableToolbar: true, height: '590px', showPropertiesPane: false,
        enableTrackChanges: true, userColor: '#b70f34',  documentEditorSettings:{ showRuler: true}
    });
    DocumentEditorContainer.Inject(Toolbar);
    container.appendTo('#container');
    container.documentEditor.currentUser = 'Nancy Davolio';
    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Track Changes';
    titleBar.updateDocumentTitle();

    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };

