import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { freezePaneData } from './data';
import { SpreadsheetComponent, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Freeze pane Spreadsheet Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'freeze-pane.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SpreadsheetModule, SBDescriptionComponent]
})

export class FreezePaneComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('default')
    public spreadsheetObj: SpreadsheetComponent;
    public data: Object[] = freezePaneData();
    public styles = { fontSize: "12pt", fontWeight: "bold", textAlign: "center", verticalAlign: "middle" }
    public openUrl = 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open';
    public saveUrl = 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save';
    public freezePane: number = 2;
    created() {
        this.spreadsheetObj.wrap("C2:P2");
        this.spreadsheetObj.merge('A1:B1');
        this.spreadsheetObj.merge('C1:P1');
        this.spreadsheetObj.cellFormat({ backgroundColor: '#4e4ee6', color: '#FFFFF4', fontSize: '12pt', fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:P2');
        this.spreadsheetObj.cellFormat({ backgroundColor: '#4e4ee6', color: '#FFFFF4' }, 'A3:B26');
        this.spreadsheetObj.numberFormat('$#,##0.00', 'C2:P26');
        this.spreadsheetObj.numberFormat('$#,##0.00', 'O27:P27');
    }
}