import * as React from 'react';
import { QueryBuilderComponent, QueryLibrary } from '@syncfusion/ej2-react-querybuilder';
import { getComponent } from '@syncfusion/ej2-base';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './query-preview.css';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { employeeData } from './data-source';
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
export class SeparateConnector extends SampleBase {
    headertext = [
        { text: "SQL" },
        { text: "JSON" }
    ];
    queryType = 'inline';
    qryBldrObj;
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
            condition: "",
            rules: [
                { label: "First Name", field: "FirstName", type: "string", operator: "startswith", value: "Andre", condition: "and" },
                { label: "Last Name", field: "LastName", type: "string", operator: "in", value: ['Davolio', 'Buchanan'], condition: "or" },
                { label: "Age", field: "Age", type: "number", operator: "greaterthan", value: 29, condition: "and" },
                {
                    condition: "or", rules: [
                        { label: "Is Developer", field: "IsDeveloper", type: "boolean", operator: "equal", value: true, condition: "and" },
                        { label: "Primary Framework", field: "PrimaryFramework", type: "string", operator: "equal", value: "React" }
                    ]
                },
                { label: "Hire Date", field: "HireDate", type: "date", operator: "between", value: ["11/22/2023", "11/30/2023"] }
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
    JsonTemplate = () => {
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
                this.updateJsonContentTemplate();
                break;
        }
    };
    updateJsonContentTemplate = () => {
        let codeMirrorEditor;
        let validRule = this.qryBldrObj.getValidRules(this.qryBldrObj.rule);
        this.content = JSON.stringify(validRule, null, 4);
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-json-content')[0].textContent = this.content;
            document.getElementsByClassName('e-json-content')[0].style.display = 'block';
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
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className='col-lg-12 control-section'>
                        <div className="App">
                        </div>
                        <QueryBuilderComponent id="querybuilder" dataSource={employeeData} columns={this.columnData} rule={this.importRules} ref={(scope) => { this.qryBldrObj = scope; }} showButtons={{ lockGroup: true }} ruleChange={this.updateRule} enableSeparateConnector={true}></QueryBuilderComponent>
                        <div className="e-query-preview">
                            <TabComponent id='defaultTab' ref={(scope) => { this.tabObj = scope; }} selected={this.changeTab} created={this.tabCreated}>
                                <TabItemsDirective>
                                    <TabItemDirective header={this.headertext[0]} content={this.SQLTemplate}/>
                                    <TabItemDirective header={this.headertext[1]} content={this.JsonTemplate}/>
                                </TabItemsDirective>
                            </TabComponent>
                        </div>
                    </div>
                </div>
                <div id='action-description'>
                    <p>This sample demonstrates the Separate Connector support of the Query Builder component.</p>
                </div>
                <div id='description'>
                    <p>
                    In this demo, the Query Builder includes a separate connector feature that displays a combinator between each neighboring pair of rules or groups within a group's rules. You can enable or disable this feature using the 'enableSeparateConnector' property. 
                    </p>
                    <p>
                        More information about Query Builder can be found in this
                        <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/'>
                            documentation section</a>.
                    </p>
                </div>
            </div>);
    }
}
