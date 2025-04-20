import * as React from 'react';
import { enableRipple, isNullOrUndefined } from '@syncfusion/ej2-base';
import { QueryBuilderComponent } from '@syncfusion/ej2-react-querybuilder';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { Inject, TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { ColumnDirective, ColumnsDirective, GridComponent, Page } from '@syncfusion/ej2-react-grids';
import { Query } from '@syncfusion/ej2-data';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { useEffect } from 'react';
import './nl-querying.css';
enableRipple(true);
function NLQuerying() {
    useEffect(() => {
        createSpinner({
            target: document.getElementById('grid')
        });
        document.getElementById('text-area').value = 'find all users who lives in los angeles and have over 1000 credits';
    }, []);
    let gridInstance;
    let qryBldrObj;
    let headerText = [{ text: 'Natural Language Query' }, { text: 'Query Builder UI' }];
    function generateRandomUsers(count) {
        const names = ["John", "Jane", "Bob", "Alice", "Tom", "Sally", "Jim", "Mary", "Peter", "Nancy"];
        const cities = ["Los Angeles", "San Diego", "New York", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "Dallas", "San Jose"];
        const states = ["California", "New York", "Illinois", "Texas", "Arizona", "Pennsylvania"];
        const streets = ["Elm St", "Oak St", "Maple Ave", "Pine St", "Cedar St", "Birch St"];
        const emails = ["example.com", "test.com", "demo.com"];
        const users = [];
        for (let i = 0; i < count; i++) {
            const id = i + 1;
            const name = names[Math.floor(Math.random() * names.length)];
            const email = `${name.toLowerCase()}${id}@${emails[Math.floor(Math.random() * emails.length)]}`;
            const address = `${Math.floor(Math.random() * 10000)} ${streets[Math.floor(Math.random() * streets.length)]}`;
            const city = cities[Math.floor(Math.random() * cities.length)];
            const state = states[Math.floor(Math.random() * states.length)];
            const zipcode = `${Math.floor(10000 + Math.random() * 90000)}`;
            const credits = Math.floor(Math.random() * 2001);
            users.push({ id, name, email, address, city, state, zipcode, credits });
        }
        return users;
    }
    let columnData = [
        { field: 'id', label: 'ID', type: 'number' },
        { field: 'name', label: 'Name', type: 'string' },
        { field: 'email', label: 'Email', type: 'string' },
        { field: 'address', label: 'Address', type: 'string' },
        { field: 'city', label: 'City', type: 'string' },
        { field: 'state', label: 'State', type: 'string' },
        { field: 'credits', label: 'Credits', type: 'number' }
    ];
    const users = generateRandomUsers(20);
    function clicked() {
        showSpinner(document.getElementById('grid'));
        let textArea = "write SQL query to " + document.querySelector('#text-area').value + " from the single table without changing the given values";
        let aiOutput = window.getAzureTextAIRequest(textArea);
        aiOutput.then((result) => {
            let val = result.split("```sql")[1].split("WHERE ")[1].split(";\n")[0];
            val = val.replace("\n", "");
            qryBldrObj.setRulesFromSql(val);
            let predicate = qryBldrObj.getPredicate(qryBldrObj.getValidRules());
            let query;
            if (isNullOrUndefined(predicate)) {
                query = new Query();
            }
            else {
                query = new Query().where(predicate);
            }
            gridInstance.query = query;
            gridInstance.refresh();
            hideSpinner(document.getElementById('grid'));
        });
    }
    return (<div className='control-pane'>
            <div className='control-section'>
                <div id="wrapper">
                    <TabComponent id="tab">
                        <TabItemsDirective>
                            <TabItemDirective header={headerText[0]} content={'#prompt-ui'}/>
                            <TabItemDirective header={headerText[1]} content={'#querybuilder-ui'}/>
                        </TabItemsDirective>
                    </TabComponent>
                    <div id="prompt-ui">
                        <div id="customTbarDialog">
                            <span className="e-text">Instruct AI</span>
                            <textarea id="text-area" aria-label="ai assistant query box" placeholder="find all users who lives in los angeles and have over 1000 credits"></textarea>
                        </div>
                    </div>
                    <div style={{ display: "none" }}>
                        <div id="querybuilder-ui">
                            <QueryBuilderComponent id="querybuilder" className="row" ref={querybuilder => qryBldrObj = querybuilder} dataSource={users} columns={columnData}></QueryBuilderComponent>
                        </div>
                    </div>
                    <div className="e-custom-elem">
                        <ButtonComponent id="submit" iconCss={'e-icons e-reset'} onClick={clicked} isPrimary={true}>Generate Query</ButtonComponent>
                    </div>
                    <div className="e-custom-elem">
                        <span className="e-text">Results from your AI generated Query</span>
                        <GridComponent style={{ marginTop: "10px" }} id="grid" ref={grid => gridInstance = grid} dataSource={users} allowPaging={true} pageSettings={{ pageSize: 10 }}>
                            <ColumnsDirective>
                                <ColumnDirective field='id' headerText='ID' textAlign='Right' width={120}/>
                                <ColumnDirective field='name' headerText='Name' width={120}/>
                                <ColumnDirective field='email' headerText='Email' width={150}/>
                                <ColumnDirective field='address' headerText='Address' width={120}/>
                                <ColumnDirective field='city' headerText='City' width={120}/>
                                <ColumnDirective field='state' headerText='State' width={120}/>
                                <ColumnDirective field='credits' headerText='Credits' width={120}/>
                            </ColumnsDirective>
                            <Inject services={[Page]}/>
                        </GridComponent>
                    </div>
                </div>
            </div>
        </div>);
}
export default NLQuerying;
