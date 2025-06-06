import * as React from 'react';
import { QueryBuilderComponent, QueryLibrary } from '@syncfusion/ej2-react-querybuilder';
import { getComponent } from '@syncfusion/ej2-base';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './query-preview.css';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { DialogComponent, TooltipComponent } from '@syncfusion/ej2-react-popups';
import { employeeData } from './data-source';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
QueryBuilderComponent.Inject(QueryLibrary);
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
export class Template extends SampleBase {
    headertext = [
        { text: "SQL" },
        { text: "MongoDB" }
    ];
    items = [
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
    mongoQuery = '{';
    queryType = 'inline';
    qryBldrObj;
    dialogInstance;
    animationSettings;
    currentvalue = {
        value: '',
        rule: ''
    };
    dialogHeader;
    tabObj;
    currentIndex = 0;
    content;
    importRules;
    columnData;
    constructor(args) {
        super(args);
        this.columnData = [
            { field: "EmployeeID", label: "Employee ID", type: "number" },
            { field: "FirstName", label: "First Name", type: "string" },
            { field: "LastName", label: "Last Name", type: "string" },
            { field: "Age", label: "Age", type: "number" },
            { field: "IsDeveloper", label: "Is Developer", type: "boolean" },
            { field: "PrimaryFramework", label: "Primary Framework", type: "string", template: frameworkTemplate },
            { field: "HireDate", label: "Hire Date", type: "date", format: "MM/dd/yyyy" },
            { field: "Country", label: "Country", type: "string" },
        ];
        this.importRules = {
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
    }
    SQLTemplate = () => {
        const isInline = this.queryType === "inline";
        const isParameter = this.queryType === "parameter";
        const isNamedParameter = this.queryType === "namedParameter";
        return (<div className="preview-content" onClick={this.handleMouseEnter} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div className="e-preview-options">
                    <label>Format Info:</label>
                    <RadioButtonComponent cssClass="e-radio-option" change={this.change} label="Inline" checked={isInline} name="state" value="Inline"></RadioButtonComponent>
                    <RadioButtonComponent cssClass="e-radio-option" checked={isParameter} change={this.change} label="Parameter" name="state" value="Parameter"></RadioButtonComponent>
                    <RadioButtonComponent cssClass="e-radio-option" checked={isNamedParameter} change={this.change} label="Named Parameter" name="state" value="NamedParameter"></RadioButtonComponent>
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={this.copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-sql-content" style={{ display: 'none' }}/>
            </div>);
    };
    MongoDBTemplate = () => {
        return (<div className="preview-content" onClick={this.handleMouseEnter} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div className="e-preview-options">
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={this.copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-mongo-content" style={{ display: 'none' }}/>
            </div>);
    };
    tabCreated = (args) => {
        setTimeout(() => {
            this.updateSQLContentTemplate();
        }, 100);
    };
    changeTab = (args) => {
        this.currentIndex = args.selectedIndex;
        setTimeout(() => {
            this.updateContentTemplate();
        }, 100);
    };
    updateContentTemplate = () => {
        switch (this.currentIndex) {
            case 0:
                this.updateSQLContentTemplate();
                break;
            case 1:
                this.updateMongoContentTemplate();
                break;
        }
    };
    updateMongoContentTemplate = () => {
        let codeMirrorEditor;
        let validRule = this.qryBldrObj.getValidRules(this.qryBldrObj.rule);
        let mongoQuery = JSON.parse(this.qryBldrObj.getMongoQuery(validRule));
        mongoQuery = JSON.stringify(mongoQuery, null, 4);
        this.content = mongoQuery;
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-mongo-content')[0].textContent = this.content;
            document.getElementsByClassName('e-mongo-content')[0].style.display = 'block';
        }
    };
    change = (args) => {
        this.queryType = args.value.toLowerCase();
        this.updateSQLContentTemplate();
    };
    updateSQLContentTemplate = () => {
        let codeMirrorEditor;
        this.content = this.updateSQLContent();
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-sql-content')[0].textContent = this.content;
            document.getElementsByClassName('e-sql-content')[0].style.display = 'block';
        }
    };
    updateSQLContent = () => {
        let content;
        let qbrule = this.qryBldrObj.getValidRules(this.qryBldrObj.rule);
        let sqlJSON;
        switch (this.queryType) {
            case 'inline':
                content = this.qryBldrObj.getSqlFromRules(qbrule);
                ;
                break;
            case 'parameter':
                content = this.convertParameterSql(qbrule);
                break;
            default:
                content = this.convertNamedParameterSql(qbrule);
                break;
        }
        return content;
    };
    convertParameterSql = (qbrule) => {
        let content = JSON.stringify(this.qryBldrObj.getParameterizedSql(qbrule), null, 4);
        return content;
    };
    convertNamedParameterSql = (qbrule) => {
        let content = JSON.stringify(this.qryBldrObj.getParameterizedNamedSql(qbrule), null, 4);
        return content;
    };
    copyClipboard = (args) => {
        navigator.clipboard.writeText(this.content);
        setTimeout(function () {
            getComponent(args.target.closest('.e-tooltip'), 'tooltip').close();
        }, 1000);
    };
    updateRule = () => {
        this.updateContentTemplate();
    };
    // Handler used to reposition the tooltip on page scroll
    dialogContent = () => {
        return (<div>
            <textarea className="mongo-text-area" id="content-area"></textarea>
            <span id="dlgSpan" style={{ visibility: 'hidden' }}>Invalid Query</span>
        </div>);
    };
    importQuery = () => {
        try {
            let textAreacontent = document.getElementById('content-area');
            if (this.currentvalue.rule != 'sql') {
                let textAreaValue = JSON.parse(textAreacontent.value);
            }
            switch (this.currentvalue.rule) {
                case 'mongo':
                    this.qryBldrObj.setMongoQuery(textAreacontent.value);
                    break;
                case 'namedparameter':
                    this.qryBldrObj.setParameterizedNamedSql(JSON.parse(textAreacontent.value));
                    break;
                case 'parameter':
                    this.qryBldrObj.setParameterizedSql(JSON.parse(textAreacontent.value));
                    break;
                case 'sql':
                    this.qryBldrObj.setRulesFromSql(textAreacontent.value, true);
                    break;
                default:
                    break;
            }
            this.updateRule();
            this.dialogInstance.hide();
        }
        catch (error) {
            let errorElem = document.getElementById('dlgSpan');
            if (!errorElem.classList.contains("error")) {
                errorElem.style.visibility = 'visible';
                errorElem.classList.add("error");
            }
        }
    };
    buttons = [
        {
            buttonModel: {
                content: 'Cancel',
                cssClass: 'e-flat',
            },
            click: () => {
                this.dialogInstance.hide();
            },
        },
        {
            buttonModel: {
                content: 'Import',
                cssClass: 'e-flat',
                isPrimary: true,
            },
            click: () => {
                this.importQuery();
            },
        },
    ];
    dialogOpen = () => {
        let dlgContentElement = document.getElementById('content-area');
        let errorElem = document.getElementById('dlgSpan');
        if (dlgContentElement && this.currentvalue) {
            dlgContentElement.value = this.currentvalue.value;
            this.dialogInstance.header = this.dialogHeader;
            errorElem.style.visibility = 'hidden';
            if (errorElem.classList.contains("error")) {
                errorElem.classList.remove("error");
            }
        }
    };
    onSelect = (args) => {
        let validRule = this.qryBldrObj.getValidRules(this.qryBldrObj.rule);
        switch (args.item.text) {
            case 'Import Mongo Query':
                let mongoQuery = JSON.parse(this.qryBldrObj.getMongoQuery(validRule));
                mongoQuery = JSON.stringify(mongoQuery, null, 4);
                this.currentvalue.value = mongoQuery;
                this.currentvalue.rule = 'mongo';
                this.dialogHeader = "Mongo Query";
                this.dialogInstance.show();
                break;
            case 'Import Inline Sql':
                this.currentvalue.value = this.qryBldrObj.getSqlFromRules(validRule);
                this.currentvalue.rule = 'sql';
                this.dialogHeader = "SQL";
                this.dialogInstance.show();
                break;
            case 'Import Parameter Sql':
                this.currentvalue.value = JSON.stringify(this.qryBldrObj.getParameterizedSql(validRule), null, 4);
                this.currentvalue.rule = 'parameter';
                this.dialogHeader = "Parameter SQL";
                this.dialogInstance.show();
                break;
            default:
                this.currentvalue.value = JSON.stringify(this.qryBldrObj.getParameterizedNamedSql(validRule), null, 4);
                this.currentvalue.rule = 'namedparameter';
                this.dialogHeader = "NamedParameter SQL";
                this.dialogInstance.show();
                break;
        }
    };
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className="top-right-element">
                        <DropDownButtonComponent id="element" items={this.items} cssClass='e-caret-hide' select={this.onSelect}>Import</DropDownButtonComponent>
                    </div>
                    <div className='col-lg-12 control-section'>
                        <div className="App">
                            <DialogComponent id='dialog' width='700px' height='420px' isModal={true} animationSettings={this.animationSettings} header={"JSON"} visible={false} beforeOpen={this.dialogOpen} closeOnEscape={false} showCloseIcon={true} buttons={this.buttons} ref={dialog => this.dialogInstance = dialog}>
                                <div>{this.dialogContent()}</div>
                            </DialogComponent>
                        </div>
                        <QueryBuilderComponent id="querybuilder" dataSource={employeeData} columns={this.columnData} rule={this.importRules} ref={(scope) => { this.qryBldrObj = scope; }} showButtons={{ lockGroup: true }} ruleChange={this.updateRule}></QueryBuilderComponent>
                        <div className="e-query-preview">
                            <TabComponent id='defaultTab' ref={(scope) => { this.tabObj = scope; }} selected={this.changeTab} created={this.tabCreated}>
                                <TabItemsDirective>
                                    <TabItemDirective header={this.headertext[0]} content={this.SQLTemplate}/>
                                    <TabItemDirective header={this.headertext[1]} content={this.MongoDBTemplate}/>
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
                        In this demo, Query Builder features  include exporting and importing the query as an SQL query and MongoDB queries. MongoDB Query Builder is a tool that allows users to search for error logs in a MongoDB database. It provides a user-friendly interface for constructing and executing queries and allows users to filter, sort, and export the results for further analysis.
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
    }
}
