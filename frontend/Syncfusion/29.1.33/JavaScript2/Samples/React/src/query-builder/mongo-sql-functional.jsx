import * as React from 'react';
import { useEffect, useRef } from 'react';
import { QueryBuilderComponent, QueryLibrary } from '@syncfusion/ej2-react-querybuilder';
import { getComponent } from '@syncfusion/ej2-base';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import './query-preview.css';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { DialogComponent, TooltipComponent } from '@syncfusion/ej2-react-popups';
import { employeeData } from './data-source';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
QueryBuilderComponent.Inject(QueryLibrary);
let headertext = [
    { text: "SQL" },
    { text: "MongoDB" }
];
let queryType = 'inline';
let currentIndex = 0;
let animationSettings;
let content;
let dialogHeader;
let currentvalue = {
    value: '',
    rule: ''
};
let items = [
    {
        text: 'Import Mongo Query'
    },
    {
        text: 'Import Inline Sql'
    },
    {
        text: 'Import Parameter Sql'
    },
    {
        text: 'Import Named Parameter Sql'
    }
];
const frameworkTemplate = (props) => {
    let ds = ["React", "Angular", "Vue", "TypeScript", "JavaScript"];
    let state = Object.assign({}, props);
    const args = state;
    const frameworkChange = (event) => {
        let qryBldrObj = getComponent(document.getElementById('querybuilder'), 'query-builder');
        let elem = document.getElementById(args.ruleID).querySelector('.e-rule-value');
        qryBldrObj.notifyChange(event.value, elem, 'value');
    };
    return (<div><DropDownListComponent dataSource={ds} value={args.rule.value} change={frameworkChange}/></div>);
};
const MongoSQlTemplate = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let qryBldrObj = useRef(null);
    let dialogInstance = useRef(null);
    let tabObj = useRef(null);
    let columnData = [
        { field: "EmployeeID", label: "Employee ID", type: "number" },
        { field: "FirstName", label: "First Name", type: "string" },
        { field: "LastName", label: "Last Name", type: "string" },
        { field: "Age", label: "Age", type: "number" },
        { field: "IsDeveloper", label: "Is Developer", type: "boolean" },
        { field: "PrimaryFramework", label: "Primary Framework", type: "string", template: frameworkTemplate },
        { field: "HireDate", label: "Hire Date", type: "date", format: "MM/dd/yyyy" },
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
    const SQLTemplate = () => {
        const isInline = queryType === "inline";
        const isParameter = queryType === "parameter";
        const isNamedParameter = queryType === "namedParameter";
        return (<div className="preview-content" onClick={handleMouseEnter} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="e-preview-options">
                    <label>Format Info:</label>
                    <RadioButtonComponent cssClass="e-radio-option" change={change} label="Inline" checked={isInline} name="state" value="Inline"></RadioButtonComponent>
                    <RadioButtonComponent cssClass="e-radio-option" checked={isParameter} change={change} label="Parameter" name="state" value="Parameter"></RadioButtonComponent>
                    <RadioButtonComponent cssClass="e-radio-option" checked={isNamedParameter} change={change} label="Named Parameter" name="state" value="NamedParameter"></RadioButtonComponent>
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-sql-content" style={{ display: 'none' }}/>
            </div>);
    };
    const handleMouseEnter = () => {
        let elem = document.getElementsByClassName("copy-tooltip");
        for (var i = 0; i < elem.length; i++) {
            if (tabObj.current.selectedItem == i) {
                elem[i].style.display = 'block';
            }
        }
    };
    const handleMouseLeave = () => {
        let elem = document.getElementsByClassName("copy-tooltip");
        for (var i = 0; i < elem.length; i++) {
            if (tabObj.current.selectedItem == i) {
                elem[i].style.display = 'none';
            }
        }
    };
    const copyClipboard = (args) => {
        navigator.clipboard.writeText(content);
        setTimeout(function () {
            getComponent(args.target.closest('.e-tooltip'), 'tooltip').close();
        }, 1000);
    };
    const MongoDBTemplate = () => {
        return (<div className="preview-content" onClick={handleMouseEnter} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="e-preview-options">
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-mongo-content" style={{ display: 'none' }}/>
            </div>);
    };
    const tabCreated = () => {
        setTimeout(function () {
            updateSQLContentTemplate();
        }, 100);
    };
    const changeTab = (args) => {
        currentIndex = args.selectedIndex;
        setTimeout(function () {
            updateContentTemplate();
        }, 100);
    };
    const updateContentTemplate = () => {
        switch (currentIndex) {
            case 0:
                updateSQLContentTemplate();
                break;
            case 1:
                updateMongoContentTemplate();
                break;
        }
    };
    const updateSQLContentTemplate = () => {
        let codeMirrorEditor;
        content = updateSQLContent();
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-sql-content')[0].textContent = content;
            document.getElementsByClassName('e-sql-content')[0].style.display = 'block';
        }
    };
    const updateMongoContentTemplate = () => {
        let codeMirrorEditor;
        let validRule = qryBldrObj.current.getValidRules(qryBldrObj.current.rule);
        let mongoQuery = JSON.parse(qryBldrObj.current.getMongoQuery(validRule));
        mongoQuery = JSON.stringify(mongoQuery, null, 4);
        content = mongoQuery;
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-mongo-content')[0].textContent = content;
            document.getElementsByClassName('e-mongo-content')[0].style.display = 'block';
        }
    };
    const change = (args) => {
        queryType = args.value.toLowerCase();
        updateSQLContentTemplate();
    };
    const updateSQLContent = () => {
        let content;
        let qbrule = qryBldrObj.current.getValidRules(qryBldrObj.current.rule);
        switch (queryType) {
            case 'inline':
                content = qryBldrObj.current.getSqlFromRules(qbrule);
                ;
                break;
            case 'parameter':
                content = convertParameterSql(qbrule);
                break;
            default:
                content = convertNamedParameterSql(qbrule);
                break;
        }
        return content;
    };
    const convertParameterSql = (qbrule) => {
        let content = JSON.stringify(qryBldrObj.current.getParameterizedSql(qbrule), null, 4);
        return content;
    };
    const convertNamedParameterSql = (qbrule) => {
        let content = JSON.stringify(qryBldrObj.current.getParameterizedNamedSql(qbrule), null, 4);
        return content;
    };
    const updateRule = () => {
        updateContentTemplate();
    };
    const dialogContent = () => {
        return (<div>
            <textarea className="mongo-text-area" id="content-area"></textarea>
            <span id="dlgSpan" style={{ visibility: 'hidden' }}>Invalid Query</span>
        </div>);
    };
    const dialogOpen = () => {
        let dlgContentElement = document.getElementById('content-area');
        let errorElem = document.getElementById('dlgSpan');
        if (dlgContentElement && currentvalue) {
            dlgContentElement.value = currentvalue.value;
            dialogInstance.header = dialogHeader;
            errorElem.style.visibility = 'hidden';
            if (errorElem.classList.contains("error")) {
                errorElem.classList.remove("error");
            }
        }
    };
    const importQuery = () => {
        try {
            let textAreacontent = document.getElementById('content-area');
            if (currentvalue.rule != 'sql') {
                let textAreaValue = JSON.parse(textAreacontent.value);
            }
            switch (currentvalue.rule) {
                case 'mongo':
                    qryBldrObj.current.setMongoQuery(textAreacontent.value);
                    break;
                case 'namedparameter':
                    qryBldrObj.current.setParameterizedNamedSql(JSON.parse(textAreacontent.value));
                    break;
                case 'parameter':
                    qryBldrObj.current.setParameterizedSql(JSON.parse(textAreacontent.value));
                    break;
                case 'sql':
                    qryBldrObj.current.setRulesFromSql(textAreacontent.value, true);
                    break;
                default:
                    break;
            }
            updateRule();
            dialogInstance.hide();
        }
        catch (error) {
            let errorElem = document.getElementById('dlgSpan');
            if (!errorElem.classList.contains("error")) {
                errorElem.style.visibility = 'visible';
                errorElem.classList.add("error");
            }
        }
    };
    const buttons = [
        {
            buttonModel: {
                content: 'Cancel',
                cssClass: 'e-flat',
            },
            click: () => {
                dialogInstance.hide();
            },
        },
        {
            buttonModel: {
                content: 'Import',
                cssClass: 'e-flat',
                isPrimary: true
            },
            click: () => {
                importQuery();
            },
        },
    ];
    const onSelect = (args) => {
        let validRule = qryBldrObj.current.getValidRules(qryBldrObj.rule);
        switch (args.item.text) {
            case 'Import Mongo Query':
                let mongoQuery = JSON.parse(qryBldrObj.current.getMongoQuery(validRule));
                mongoQuery = JSON.stringify(mongoQuery, null, 4);
                currentvalue.value = mongoQuery;
                currentvalue.rule = 'mongo';
                dialogHeader = "Mongo Query";
                dialogInstance.show();
                break;
            case 'Import Inline Sql':
                currentvalue.value = qryBldrObj.current.getSqlFromRules(validRule);
                currentvalue.rule = 'sql';
                dialogHeader = "SQL";
                dialogInstance.show();
                break;
            case 'Import Parameter Sql':
                currentvalue.value = JSON.stringify(qryBldrObj.current.getParameterizedSql(validRule), null, 4);
                currentvalue.rule = 'parameter';
                dialogHeader = "Parameter SQL";
                dialogInstance.show();
                break;
            case 'Import Named Parameter Sql':
                currentvalue.value = JSON.stringify(qryBldrObj.current.getParameterizedNamedSql(validRule), null, 4);
                currentvalue.rule = 'namedparameter';
                dialogHeader = "NamedParameter SQL";
                dialogInstance.show();
                break;
            default:
                break;
        }
    };
    return (<div className='control-pane'>
            <div className='control-section'>
                <div className="top-right-element">
                 <DropDownButtonComponent id="element" items={items} cssClass='e-caret-hide' select={onSelect}>Import</DropDownButtonComponent>
                </div>
                <div className='col-lg-12 control-section'>
                    <div className="App">
                        <DialogComponent id='dialog' width='700px' height='420px' isModal={true} animationSettings={animationSettings} header={"JSON"} visible={false} beforeOpen={dialogOpen} closeOnEscape={false} showCloseIcon={true} buttons={buttons} ref={dialog => dialogInstance = dialog}>
                            <div>{dialogContent()}</div>
                        </DialogComponent>
                    </div>
                    <QueryBuilderComponent id="querybuilder" dataSource={employeeData} columns={columnData} rule={importRules} ref={qryBldrObj} ruleChange={updateRule}></QueryBuilderComponent>
                    <div className="e-query-preview">
                        <TabComponent id='defaultTab' ref={tabObj} selected={changeTab} created={tabCreated}>
                            <TabItemsDirective>
                                <TabItemDirective header={headertext[0]} content={SQLTemplate}/>
                                <TabItemDirective header={headertext[1]} content={MongoDBTemplate}/>
                            </TabItemsDirective>
                        </TabComponent>
                    </div>
                </div>
            </div>
            <div id='action-description'>
                <p>This sample demonstrates the Query Builder component by showing different types of queries such as SQL and MongoDB . The query preview can be changed using the tab component. Queries can be imported to the Query Builder using the import dropdown button.</p>
            </div>
            <div id='description'>
                <p>
                    In this demo, Query Builder features  include exporting and importing the query as an SQL query and MongoDB queries. 
MongoDB Query Builder is a tool that allows users to search for error logs in a MongoDB database. It provides a user-friendly interface for constructing and executing queries and allows users to filter, sort, and export the results for further analysis.
                </p>
                <p>
                    The following methods were used in this sample to perform mongo and SQL query related changes.
                </p>
                <ul>
                    <li>setMongoQuery</li>
                    <li>getMongoQuery</li>
                    <li>setParameterizedSQL</li>
                    <li>getParameterizedSQL</li>
                    <li>setParameterizedNamedSQL</li>
                    <li>getParameterizedNamedSQL</li>
                </ul>
                <p>
                    More information about Query Builder can be found in this
                    <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/'>
                        documentation section</a>.
                </p>
            </div>
        </div>);
};
export default MongoSQlTemplate;
