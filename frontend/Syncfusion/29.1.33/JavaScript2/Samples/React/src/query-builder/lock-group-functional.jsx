import * as React from 'react';
import { useEffect, useRef } from 'react';
import { QueryBuilderComponent } from '@syncfusion/ej2-react-querybuilder';
import { updateSampleSection } from '../common/sample-base';
import './query-preview.css';
import { employeeData } from './data-source';
const LockTemplate = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let qryBldrObj = useRef(null);
    let dateOperators = [
        { value: 'equal', key: 'Equal' },
        { value: 'greaterthan', key: 'Greater Than' },
        { value: 'greaterthanorequal', key: 'Greater Than Or Equal' },
        { value: 'lessthan', key: 'Less Than' },
        { value: 'lessthanorequal', key: 'Less Than Or Equal' },
        { value: 'notequal', key: 'Not Equal' },
        { value: 'between', key: 'Between' },
        { value: 'notbetween', key: 'Not Between' }
    ];
    let boolOperators = [
        { value: 'equal', key: 'Equal' },
    ];
    let columnData = [
        { field: "EmployeeID", label: "Employee ID", type: "number" },
        { field: "FirstName", label: "First Name", type: "string" },
        { field: "LastName", label: "Last Name", type: "string" },
        { field: "Age", label: "Age", type: "number" },
        { field: "IsDeveloper", label: "Is Developer", type: "boolean", operators: boolOperators },
        { field: "PrimaryFramework", label: "Primary Framework", type: "string", operators: boolOperators },
        { field: "HireDate", label: "Hire Date", type: "date", format: "MM/dd/yyyy", operators: dateOperators },
        { field: "Country", label: "Country", type: "string" },
    ];
    let importRules = {
        condition: "and",
        rules: [
            { label: "First Name", field: "FirstName", type: "string", operator: "startswith", value: "Andre" },
            { label: "Last Name", field: "LastName", type: "string", operator: "in", value: ['Davolio', 'Buchanan'] },
            { label: "Age", field: "Age", type: "number", operator: "greaterthan", value: 29 },
            {
                condition: "or", rules: [
                    { label: "Is Developer", field: "IsDeveloper", type: "boolean", operator: "equal", value: true },
                    { label: "Primary Framework", field: "PrimaryFramework", type: "string", operator: "equal", value: "React" }
                ]
            },
            { label: "Hire Date", field: "HireDate", type: "date", operator: "between", value: ["11/22/2023", "11/30/2023"] },
        ],
    };
    return (<div className='control-pane'>
            <div className='control-section'>
                <div className='row'>
                    <div className='col-lg-12 control-section'>
                        <QueryBuilderComponent id="querybuilder" dataSource={employeeData} columns={columnData} rule={importRules} ref={qryBldrObj} showButtons={{ lockGroup: true, lockRule: true }}></QueryBuilderComponent>
                    </div>
                </div>
            </div>
            <div id='action-description'>
                <p>This sample demonstrates the lock support of the Query Builder component. Click the lock button to lock the group or rule.</p>
            </div>
            <div id='description'>
                <p>The lock options are available for rules as well as groups. When a rule is locked, the field, operator, and value will be disabled. When a group is locked, all the elements within the group will be disabled.</p>
                <p> In mobile mode it is shown in vertical mode.</p>
                <p>
                    More information about Query Builder can be found in this
                    <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/'>
                        documentation section</a>.
                </p>
            </div>
        </div>);
};
export default LockTemplate;
