/**
 * ComboBox Remote-Data & Local-Data Samples
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'data-binding.html',
    styleUrls: ['data-binding.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ComboBoxModule, CheckBoxModule, SBDescriptionComponent]
})
export class DataBindingComboBoxComponent {
    @ViewChild('local')
    public localObj: ComboBoxComponent;
    @ViewChild('remote')
    public remoteObj: ComboBoxComponent;
    @ViewChild('checkbox')
    public checkboxObj: CheckBoxComponent;
    public sportsData: Object[] = [
        { Id: 'Game1', Game: 'American Football' },
        { Id: 'Game2', Game: 'Badminton' },
        { Id: 'Game3', Game: 'Basketball' },
        { Id: 'Game4', Game: 'Cricket' },
        { Id: 'Game5', Game: 'Football' },
        { Id: 'Game6', Game: 'Golf' },
        { Id: 'Game7', Game: 'Hockey' },
        { Id: 'Game8', Game: 'Rugby' },
        { Id: 'Game9', Game: 'Snooker' },
        { Id: 'Game10', Game: 'Tennis' }
    ];
    // maps the local data column to fields property
    public localFields: Object = { text: 'Game', value: 'Id' };
    // set the placeholder to ComboBox input element
    public localWaterMark: string = 'Select a game';
    // bind the DataManager instance to dataSource property
    public data: DataManager = new DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/Employees',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    // bind the Query instance to query property
    public query: Query = new Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount();
    // maps the remote data column to fields property
    public remoteFields: Object = { text:'FirstName',value: 'EmployeeID' };
    // set the height of the popup element.
    public height: string = '250px';
    // set the placeholder to ComboBox input element    
    public remoteWaterMark: string = 'Select a name';
    public onChange(): void {
        // enable or disable the autofill in local data ComboBox based on CheckBox checked state
        this.localObj.autofill = this.checkboxObj.checked;
        // enable or disable the autofill in remote data ComboBox based on CheckBox checked state
        this.remoteObj.autofill = this.checkboxObj.checked;
    }
}
