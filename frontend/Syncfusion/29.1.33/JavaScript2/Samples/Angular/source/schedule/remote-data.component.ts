import { Component } from '@angular/core';
import { EventSettingsModel, View, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'remote-data.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class RemoteDataComponent {
  public currentView: View = 'Month';
  public readonly = true;
  private dataManager: DataManager = new DataManager({
    url: 'https://ej2services.syncfusion.com/production/web-services/api/schedule',
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });
  public eventSettings: EventSettingsModel = { dataSource: this.dataManager };

}
