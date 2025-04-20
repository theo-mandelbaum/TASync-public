import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { protectSheetData } from './data';
import { SpreadsheetComponent, CellRenderEventArgs, SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Protect sheet Spreadsheet Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'protect-sheet.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SpreadsheetModule, SBDescriptionComponent]
})

export class ProtectSheetComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('spreadsheet')
    spreadsheetObj: SpreadsheetComponent;
    data: Object[] = protectSheetData();
    public openUrl = 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open';
    public saveUrl = 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save';
    created() {
        // Applied number formatting to a range
        this.spreadsheetObj.numberFormat('$#,##0.00', 'EMI Schedule!C2:F13');
        this.spreadsheetObj.numberFormat('m/d/yyyy', 'EMI Calculator!C5:C5');
        this.spreadsheetObj.numberFormat('m/d/yyyy', 'EMI Schedule!B2:B13');
    }
    beforeCellRender(args: CellRenderEventArgs) {
        // Merged cells using custom code
        if (this.spreadsheetObj.sheets[this.spreadsheetObj.activeSheetIndex].name === 'EMI Calculator' && args.address === 'B1') {
            (args.element as HTMLTableCellElement).colSpan = 2;
        }
    }
}
