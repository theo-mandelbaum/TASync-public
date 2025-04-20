import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DropDownListComponent, DropDownListModule, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { TreeGridComponent, TreeGridModule, PageService, SortService } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'loading-animation.html',
    providers: [PageService, SortService],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule]
})
export class LoadingAnimationComponent implements OnInit {
    public data: DataManager;
    public pageSetting: Object;
    public loadingIndicator;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('dropdown')
    public dropdown: DropDownListComponent;

    public fields: object = { text: 'name', value: 'id' };
    public indicatortypes: Object[] = [
        { id: 'Shimmer', name: 'Shimmer' },
        { id: 'Spinner', name: 'Spinner' }
    ];

    ngOnInit(): void {
        this.data =  new DataManager({ url: 'https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData', adaptor: new WebApiAdaptor });
        this.pageSetting = { pageCount: 3 };
        this.loadingIndicator = {indicatorType: 'Shimmer'};
    }

    public indicatorChange(e: ChangeEventArgs): void {
        if (this.dropdown.value === 'Shimmer') {
            this.treegrid.loadingIndicator.indicatorType = 'Shimmer';
        } else {
            this.treegrid.loadingIndicator.indicatorType = 'Spinner';
        }
      this.treegrid.refresh();
    }
}
