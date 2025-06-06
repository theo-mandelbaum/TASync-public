import * as React from 'react';
import { QueryBuilderComponent } from '@syncfusion/ej2-react-querybuilder';
import { complexData } from './data-source';
import { SampleBase } from '../common/sample-base';
import './complex-databinding.css';
export class ComplexDatabinding extends SampleBase {
    fieldMode = 'DropdownTree';
    separator = '.';
    columns = [
        { field: 'Employee', label: 'Employee', columns: [
                { field: 'ID', label: 'ID', type: 'number' },
                { field: 'DOB', label: 'Date of birth', type: 'date', format: 'yMd' },
                { field: 'HireDate', label: 'Hire Date', type: 'date' },
                { field: 'Salary', label: 'Salary', type: 'number' },
                { field: 'Age', label: 'Age', type: 'number' },
                { field: 'Title', label: 'Title', type: 'string' }
            ] },
        { field: 'Name', label: 'Name', columns: [
                { field: 'FirstName', label: 'First Name', type: 'string' },
                { field: 'LastName', label: 'Last Name', type: 'string' }
            ] },
        { field: 'Country', label: 'Country', columns: [
                { field: 'State', label: 'State', columns: [
                        { field: 'City', label: 'City', type: 'string' },
                        { field: 'Zipcode', label: 'Zip Code', type: 'number' }
                    ] },
                { field: 'Region', label: 'Region', type: 'string' },
                { field: 'Name', label: 'Name', type: 'string' }
            ] }
    ];
    importRules = {
        'condition': 'and',
        'rules': [{
                'label': 'ID',
                'field': 'Employee.ID',
                'type': 'number',
                'operator': 'equal',
                'value': 1001
            },
            {
                'label': 'First Name',
                'field': 'Name.FirstName',
                'type': 'string',
                'operator': 'equal',
                'value': 'Mark'
            },
            {
                'condition': 'or',
                'rules': [{
                        'label': 'City',
                        'field': 'Country.State.City',
                        'operator': 'equal',
                        'type': 'string',
                        'value': 'Jersey City'
                    }, {
                        'label': 'Date of birth',
                        'field': 'Employee.DOB',
                        'operator': 'equal',
                        'type': 'date',
                        'value': '7/7/96'
                    }]
            }
        ]
    };
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className='col-lg-12 control-section'>
                        <QueryBuilderComponent dataSource={complexData} columns={this.columns} rule={this.importRules} fieldMode={this.fieldMode} separator={this.separator}>
                        </QueryBuilderComponent>
                    </div>
                </div>
                <div id='action-description'>
                    <p>This sample demonstrates the Complex Databinding functionalities of the Query Builder component.
                         In the <b>Complex Databinding</b>, select an item from the hierarchical structure options list.</p>
                </div>
                <div id='description'>
                <p>In <b>Query Builder</b>, the Complex Databinding input field can be change neither <b>Dropdown List</b>
                 nor <b>Dropdown Tree</b> using the <code>fieldMode</code> property.</p>
                <p>In this sample, the Complex Databinding integrated with the Dropdown Tree.</p>
                    <p>
                        More information about Query Builder can be found in this 
                <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/'>
                            documentation section</a>.
            </p>
                </div>
            </div>);
    }
}
