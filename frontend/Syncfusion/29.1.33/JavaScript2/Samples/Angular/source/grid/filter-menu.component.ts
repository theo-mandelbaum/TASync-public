import { Component, ViewChild, OnInit } from '@angular/core';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { GridComponent, FilterService, FilterType, SortService, GridModule, PageService } from '@syncfusion/ej2-angular-grids';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { Query, DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

const SERVICE_URI: string = 'https://ej2services.syncfusion.com/production/web-services/';
@Component({
    selector: 'ej-gridfiltermenu',
    templateUrl: 'filter-menu.html',
    styleUrls: ['filter.style.css'],
    providers: [FilterService, SortService, PageService],
    standalone: true,
    imports: [DropDownListModule, CheckBoxModule, GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class FilteringMenuComponent implements OnInit {
    public data: DataManager;
    public query: Query;
    public ddldata: Object[];
    public pageSettings: Object;
    public filterSettings: Object;
    public filteringType: Object[] = [
        { Id: 'Menu', type: 'Menu' },
        { Id: 'CheckBox', type: 'Checkbox' },
        { Id: 'Excel', type: 'Excel' }
    ];
    public ddlfields: Object = { text: 'type', value: 'Id' };

    @ViewChild('grid')
    public grid: GridComponent;

    @ViewChild('checkbox')
    public checkBoxInstance: CheckBoxComponent;

    ngOnInit(): void {
        this.data = new DataManager({ url: SERVICE_URI + 'api/UrlDataSource', adaptor: new UrlAdaptor });
        this.query = new Query().addParams('dataCount', '10000');
        this.pageSettings = { pageCount: 5 };
        this.filterSettings = { type: 'Menu' };
        this.ddldata = this.filteringType;
    }
    public onChange(e: ChangeEventArgs): void {
        this.checkBoxInstance.checked = false;
        this.grid.filterSettings.enableInfiniteScrolling = false;
        this.grid.filterSettings.type = <FilterType>e.value;
        this.grid.clearFiltering();
        if (this.grid.filterSettings.type === 'Excel' || this.grid.filterSettings.type === 'CheckBox') {
            this.checkBoxInstance.disabled = false;
        } else {
            this.checkBoxInstance.disabled = true;
        }
    }
    public changeHandler(e: any): void {
        this.grid.filterSettings.enableInfiniteScrolling = e.checked;
    }
}
