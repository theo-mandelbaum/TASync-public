import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './search-events.css';
import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { GridComponent } from '@syncfusion/ej2-react-grids';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import * as dataSource from './datasource.json';
import { PropertyPane } from '../common/property-pane';
/**
 * Sample for searching appointments
 */
const SearchEvents = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [display, setDisplay] = useState('block');
    let scheduleObj = useRef(null);
    let gridElement = useRef(null);
    let formObj = useRef(null);
    const data = extend([], dataSource.scheduleData, null, true);
    const globalSearch = (args) => {
        let searchString = args.target.value;
        if (searchString !== '') {
            new DataManager(scheduleObj.current.getEvents(null, null, true)).executeQuery(new Query().search(searchString, ['Subject', 'Location', 'Description'], null, true, true)).then((e) => {
                if (e.result.length > 0) {
                    showSearchEvents('show', e.result);
                }
                else {
                    showSearchEvents('hide');
                }
            });
        }
        else {
            showSearchEvents('hide');
        }
    };
    const searchOnclick = () => {
        let searchObj = [];
        let startDate;
        let endDate;
        let formElements = [].slice.call(document.querySelectorAll('.event-search .search-field'));
        formElements.forEach((node) => {
            let fieldOperator;
            let predicateCondition;
            let fieldValue;
            let fieldInstance;
            if (node.value && node.value !== '' && !node.classList.contains('e-datepicker')) {
                fieldOperator = 'contains';
                predicateCondition = 'or';
                fieldValue = node.value;
                searchObj.push({
                    field: node.getAttribute('data-name'), operator: fieldOperator, value: fieldValue, predicate: predicateCondition,
                    matchcase: true
                });
            }
            if (node.classList.contains('e-datepicker') && node.ej2_instances[0].value) {
                fieldInstance = node.ej2_instances[0];
                fieldValue = fieldInstance.value;
                if (node.classList.contains('e-start-time')) {
                    fieldOperator = 'greaterthanorequal';
                    predicateCondition = 'and';
                    startDate = new Date(+fieldValue);
                }
                else {
                    fieldOperator = 'lessthanorequal';
                    predicateCondition = 'and';
                    let date = new Date(+fieldInstance.value);
                    fieldValue = new Date(date.setDate(date.getDate() + 1));
                    endDate = fieldValue;
                }
                searchObj.push({
                    field: node.getAttribute('data-name'), operator: fieldOperator, value: fieldValue, predicate: predicateCondition,
                    matchcase: false
                });
            }
        });
        if (searchObj.length > 0) {
            let filterCondition = searchObj[0];
            let predicate = new Predicate(filterCondition.field, filterCondition.operator, filterCondition.value, filterCondition.matchcase);
            for (let i = 1; i < searchObj.length; i++) {
                predicate = predicate.and(searchObj[i].field, searchObj[i].operator, searchObj[i].value, searchObj[i].matchcase);
            }
            let result = new DataManager(scheduleObj.current.getEvents(startDate, endDate, true)).executeLocal(new Query().where(predicate));
            showSearchEvents('show', result);
        }
        else {
            showSearchEvents('hide');
        }
    };
    const clearOnClick = () => {
        document.getElementById('schedule').style.display = 'block';
        document.getElementById('form-search').reset();
        showSearchEvents('hide');
    };
    const showSearchEvents = (type, data) => {
        if (type === 'show') {
            if (gridElement.current.classList.contains('e-grid')) {
                let gridObj = gridElement.current.ej2_instances[0];
                gridObj.dataSource = data;
                gridObj.dataBind();
            }
            else {
                let gridObj = new GridComponent({
                    dataSource: data,
                    height: 505,
                    width: 'auto',
                    columns: [
                        { field: 'Subject', headerText: 'Subject', width: 120 },
                        { field: 'Location', headerText: 'Location', width: 120 },
                        { field: 'StartTime', headerText: 'StartTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
                        { field: 'EndTime', headerText: 'EndTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
                    ]
                });
                gridObj.appendTo(gridElement.current);
                setDisplay('none');
            }
        }
        else {
            let gridObj = gridElement.current.ej2_instances;
            if (gridObj && gridObj.length > 0 && !gridObj[0].isDestroyed) {
                gridObj[0].destroy();
            }
            setDisplay('block');
        }
    };
    return (<div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <div className='col-md-12'>
            <ScheduleComponent id='schedule' style={{ display: display }} cssClass='resource' width='100%' height='650px' selectedDate={new Date(2021, 0, 10)} ref={scheduleObj} eventSettings={{ dataSource: data }}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}/>
            </ScheduleComponent>
            <div id="grid" ref={gridElement}></div>
          </div>
        </div>
      </div>
      <div className='col-lg-3 property-section property-customization'>
        <PropertyPane title='Search by all event fields'>
          <input className="e-input" type="text" placeholder="Enter the Search text" onKeyUp={globalSearch.bind(this)}/>
          <form className="event-search" id="form-search" ref={formObj}>
            <p className="property-panel-header header-customization" style={{ width: '100%', padding: '22px 0 0 0' }}>Search by specific event fields</p>
            <table id="property-specific" style={{ width: '100%' }}>
              <tbody>
                <tr className="row">
                  <td className="property-panel-content" colSpan={2}>
                    <input type="text" className="e-input search-field" id="searchEventName" data-name="Subject" placeholder="Subject"/>
                  </td>
                </tr>
                <tr className="row" style={{ height: '45px' }}>
                  <td className="property-panel-content" colSpan={2}>
                    <input type="text" className="e-input search-field" id="searchEventLocation" data-name="Location" placeholder="Location"/>
                  </td>
                </tr>
                <tr className="row" style={{ height: '45px' }}>
                  <td className="property-panel-content" colSpan={2}>
                    <DatePickerComponent className="search-field e-start-time" value={null} data-name="StartTime" showClearButton={false} placeholder="Start Time"></DatePickerComponent>
                  </td>
                </tr>
                <tr className="row" style={{ height: '45px' }}>
                  <td className="property-panel-content" colSpan={2}>
                    <DatePickerComponent className="search-field e-end-time" value={null} data-name="EndTime" showClearButton={false} placeholder="End Time"></DatePickerComponent>
                  </td>
                </tr>
                <tr className="row" style={{ height: '45px' }}>
                  <td className="e-field button-customization" style={{ width: '50%', padding: '15px' }}>
                    <ButtonComponent title='Search' type='button' onClick={searchOnclick.bind(this)}>Search</ButtonComponent>
                  </td>
                  <td className="e-field button-customization" style={{ width: '50%', padding: '15px' }}>
                    <ButtonComponent title='Clear' type='button' onClick={clearOnClick.bind(this)}>Clear</ButtonComponent>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </PropertyPane>
      </div>
      <div id="action-description">
        <p>
          This example showcases the search results of Scheduler appointments in a grid. When the user provides the
          search string on appropriate fields, the resulting event collection based on the search criteria will be
          displayed in a Grid.
        </p>
      </div>
      <div id="description">
        <p>
          In this example, the search text value is compared with the event field values of Scheduler DataSource and then 
          the filtered resultant event data collection is assigned to the DataSource of Grid.
        </p>
      </div>
    </div>);
};
export default SearchEvents;
