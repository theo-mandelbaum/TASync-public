import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, Inject } from '@syncfusion/ej2-react-pivotview';
import { DropDownListComponent, MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './sorting.css';
/**
 * PivotView Member Sorting sample.
 */
/* tslint:disable */
let Pivot_Data = pivotData.data;
let dataSourceSettings = {
    dataSource: Pivot_Data,
    expandAll: false,
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    rows: [{ name: 'Country', expandAll: true }, { name: 'Products' }],
    columns: [{ name: 'Year', dataType: 'string' }, { name: 'Order_Source', caption: 'Order Source' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
};
export class DrillDown extends SampleBase {
    pivotObj;
    fieldCollections = {};
    isInitial = true;
    storeMembers = { 'Country': [], 'Year': [] };
    isRowSelect = false;
    isColumnSelect = false;
    values = [];
    index;
    fieldsddl;
    membersOrder;
    optionsdll;
    field1;
    applyBtn;
    checkBoxObj;
    fields = [
        { Field: 'Country', expandAll: false },
        { Field: 'Year', expandAll: false }
    ];
    options = [
        { value: 'allHeaders', text: 'All headers' },
        { value: 'rowHeaders', text: 'Row headers' },
        { value: 'columnHeader', text: 'Column headers' },
        { value: 'specificFields', text: 'Specific fields' },
        { value: 'specificHeaders', text: 'Specific headers' }
    ];
    onChange(e) {
        this.membersOrder.dataSource = this.fieldCollections[e.itemData['Field']];
        this.membersOrder.value = this.getSelectedMembers(e.itemData['Field']);
        this.membersOrder.dataBind();
        this.field1.dataBind();
    }
    /* jshint ignore:start */
    dataBound(args) {
        if (this.isInitial) {
            /** To fill the members for each fields into the object fieldCollections. */
            let fieldCnt = this.fields.length - 1;
            while (fieldCnt > -1) {
                let members = Object.keys(this.pivotObj.engineModule.fieldList[this.fields[fieldCnt].Field].members);
                let memberCnt = members.length;
                let membersCollection = [];
                for (let i = 0; i < memberCnt; i++) {
                    membersCollection.push({ Member: members[i], Checked: members[i] + '_' + false });
                }
                this.fieldCollections[this.fields[fieldCnt].Field] = membersCollection;
                fieldCnt--;
            }
            this.values = this.fieldCollections[this.fields[0].Field];
            this.membersOrder.dataSource = this.values;
            this.membersOrder.dataBind();
            this.fieldsddl.dataBind();
            this.isInitial = false;
        }
    }
    /* jshint ignore:end */
    onChangeOption(args) {
        document.querySelector('.field_cls').style.display = 'none';
        document.querySelector('.field_cls_1').style.display = 'none';
        document.querySelector('.members_cls').style.display = 'none';
        document.querySelector('.apply_cls').style.display = 'none';
        if (args.value == 'allHeaders') {
            this.clear();
            this.pivotObj.setProperties({ dataSourceSettings: { expandAll: true, drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.pivotObj.refreshData();
        }
        else if (args.value == 'rowHeaders') {
            this.clear();
            this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.updateRowColumn(false, true, false);
        }
        else if (args.value == 'columnHeader') {
            this.clear();
            this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.updateRowColumn(false, false, true);
        }
        else if (args.value == 'specificFields') {
            document.querySelector('.field_cls').style.display = '';
        }
        else if (args.value == 'specificHeaders') {
            document.querySelector('.field_cls_1').style.display = '';
            document.querySelector('.members_cls').style.display = '';
            document.querySelector('.apply_cls').style.display = '';
        }
    }
    onMembersSelect(args) {
        this.setMemberCheckedState(this.field1.itemData.Field, args['item'].textContent, args['item'].textContent + '_' + true);
        this.applyBtn.disabled = false;
        this.storeMembers[this.field1.itemData.Field].push(args.itemData['Member']);
    }
    onMembersRemove(args) {
        this.setMemberCheckedState(this.field1.itemData.Field, args['item'].textContent, args['item'].textContent + '_' + false);
        this.index = this.storeMembers[this.field1.itemData.Field].indexOf(args.itemData['Member']);
        if (this.storeMembers[this.field1.itemData.Field].indexOf(args.itemData['Member']) > -1) {
            this.storeMembers[this.field1.itemData.Field].splice(this.index, 1);
        }
    }
    onFieldSelect(args) {
        this.membersOrder.value = [];
        if (this.storeMembers['Country'].length > 0 || this.storeMembers['Year'].length > 0) {
            this.storeMembers = { 'Country': [], 'Year': [] };
            this.isInitial = true;
        }
        if (args.itemData['Field'] === 'Country') {
            this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.updateRowColumn(false, true, this.isColumnSelect);
            this.isRowSelect = true;
        }
        else if (args.itemData['Field'] === 'Year') {
            this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.updateRowColumn(false, this.isRowSelect, true);
            this.isColumnSelect = true;
        }
    }
    onFieldRemove(args) {
        if (args.itemData['Field'] === 'Country') {
            this.updateRowColumn(false, false, this.isColumnSelect);
            this.isRowSelect = false;
        }
        else if (args.itemData['Field'] === 'Year') {
            this.updateRowColumn(false, this.isRowSelect, false);
            this.isColumnSelect = false;
        }
    }
    open(args) {
        args.popup.element.querySelector(".e-filter-parent").style.display = 'none';
    }
    onClick() {
        this.fieldsddl.value = [];
        this.isRowSelect = false;
        this.isColumnSelect = false;
        this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: this.storeMembers['Country'] }, { name: 'Year', items: this.storeMembers['Year'] }] } }, true);
        this.updateRowColumn(false, false, false);
    }
    /** To set the checked status of the members maintained in the object fieldCollections. */
    setMemberCheckedState(field, member, checkedState) {
        let members = this.fieldCollections[field];
        let membersLength = members.length - 1;
        while (membersLength > -1) {
            if (members[membersLength].Member === member) {
                members[membersLength].Checked = checkedState;
                break;
            }
            membersLength--;
        }
    }
    /** To get the checked members/status here as string array. */
    getSelectedMembers(field) {
        let membersCollection = [];
        let members = this.fieldCollections[field];
        let membersLength = members.length - 1;
        while (membersLength > -1) {
            if (members[membersLength].Checked === members[membersLength].Member + '_' + true) {
                membersCollection.push(members[membersLength].Member.toString());
            }
            membersLength--;
        }
        return membersCollection;
    }
    updateRowColumn(isExpand, isRowExpand, isColumnExpand) {
        this.pivotObj.setProperties({
            dataSourceSettings: {
                expandAll: isExpand, rows: [
                    { name: 'Country', expandAll: this.fieldsddl.dataSource[0].expandAll = isRowExpand },
                    { name: 'Products' }
                ], columns: [
                    { name: 'Year', expandAll: this.fieldsddl.dataSource[1].expandAll = isColumnExpand },
                    { name: 'Order_Source' }
                ]
            }
        }, true);
        this.pivotObj.refreshData();
    }
    clear() {
        this.fieldsddl.value = [];
        this.isRowSelect = false;
        this.isColumnSelect = false;
        this.membersOrder.value = [];
        if (this.storeMembers['Country'].length > 0 || this.storeMembers['Year'].length > 0) {
            this.storeMembers = { 'Country': [], 'Year': [] };
            this.isInitial = true;
        }
    }
    render() {
        return (<div className='control-pane'>
            <div className='control-section' style={{ overflow: 'auto' }}>
                <div className='col-lg-8 adaptive'>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { this.pivotObj = pivotview; }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'300'} gridSettings={{ columnWidth: 140 }} dataBound={this.dataBound.bind(this)}>
                    </PivotViewComponent>
                </div>
                <div className='col-lg-4 property-section pivot-property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', height: '100%' }}>
                            <tbody>
                            <tr style={{ height: '50px' }}>
                                    <td>
                                        <div className='hdrlabel' style={{ height: '50px' }}>
                                            Drill Down:
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent enabled={true} ref={(scope) => { this.optionsdll = scope; }} type="text" tabIndex={0} change={this.onChangeOption.bind(this)} width={"98%"} id="etype" dataSource={this.options} fields={{ value: 'value', text: 'text' }} value='rowHeaders'/>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='field_cls' style={{ height: '50px', display: 'none' }}>
                                    <td>
                                        <div className='hdrlabel'>
                                            Fields:
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <MultiSelectComponent ref={(scope) => { this.fieldsddl = scope; }} select={this.onFieldSelect.bind(this)} removed={this.onFieldRemove.bind(this)} open={this.open.bind(this)} width={"98%"} placeholder="Select fields" id="etype" type='text' tabIndex={1} dataSource={this.fields} mode='CheckBox' showDropDownIcon={true} showClearButton={false} enableSelectionOrder={false} fields={{ text: 'Field' }}>
                                                <Inject services={[CheckBoxSelection]}/>
                                                </MultiSelectComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='field_cls_1' style={{ height: '50px', display: 'none' }}>
                                    <td>
                                        <div className='hdrlabel'>
                                            Fields:
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent enabled={true} ref={(scope) => { this.field1 = scope; }} placeholder="Select fields" change={this.onChange.bind(this)} width={"100%"} id="etype" type='text' tabIndex={1} dataSource={this.fields} fields={{ text: 'Field' }} value="Country"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='members_cls' style={{ height: '50px', display: 'none' }}>
                                    <td>
                                        <div className='hdrlabel'>
                                            Headers:
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <MultiSelectComponent ref={(scope) => { this.membersOrder = scope; }} select={this.onMembersSelect.bind(this)} removed={this.onMembersRemove.bind(this)} open={this.open.bind(this)} width={"98%"} placeholder="Select headers" id="etype" type='text' tabIndex={1} dataSource={this.values} mode='CheckBox' showDropDownIcon={true} showClearButton={false} enableSelectionOrder={false} fields={{ text: 'Member' }}>
                                                <Inject services={[CheckBoxSelection]}/>
                                                </MultiSelectComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='apply_cls' style={{ height: '50px', display: "none" }}>
                                    <td></td>
                                    <td>
                                        <div id="btn-control" style={{ float: 'right' }}>
                                            <ButtonComponent id='apply' ref={(scope) => { this.applyBtn = scope; }} onClick={this.onClick.bind(this)} isPrimary={true}>Apply</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                </div>
                <div id="action-description">
                <p>This sample demonstrates how to drill down on all headers, column headers only, row headers only, specific field(s), and specific member(s) within the specific field(s).</p>
                </div>
                <div id="description">
                <p>In this sample, drill down can be performed based on the option selected from the <b>Drill Down</b> dropdown list. The available options are described in detail below.</p>
                <table>
                <tr>
                    <td style={{ verticalAlign: 'top', padding: '10px 0', width: '150px' }}>
                        <code>All headers :</code>
                    </td>
                    
                    <td style={{ paddingTop: '10px' }}>Allows to expand all headers of row and column axes in the pivot table. 
                        It can be achieved by setting the <code>expandAll</code> property to <b>true</b> in the <code>dataSourceSettings</code>.</td>
                </tr>
                <tr>
                    <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                        <code>Row headers :</code>
                    </td>
                    <td style={{ paddingTop: '2px' }}>Allows to expand all row headers in the pivot table. 
                        It can be achieved by setting the <code>expandAll</code> property to <b>true</b> for row fields only.</td>
                </tr>
                <tr>
                    <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                        <code>Column headers :</code>
                    </td>
                    <td style={{ paddingTop: '2px' }}>Allows to expand all column headers in the pivot table. 
                        It can be achieved by setting the <code>expandAll</code> property to <b>true</b> for column fields only.</td>
                </tr>
                <tr>
                    <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                        <code>Specific fields :</code>
                    </td>
                    <td style={{ paddingTop: '3px' }}>Allows to expand specific field(s) in the pivot table's row or column axes. 
                        It can be achieved by setting the <code>expandAll</code> property for the relevant field(s) in the row and column axes to <b>true</b>.</td>
                </tr>
                <tr>
                    <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                        <code>Specific headers :</code>
                    </td>
                    <td style={{ paddingTop: '3px' }}>Allows to expand specific header(s) within the respective field available in the pivot table's row or column axes.
                            It can be achieved by specifying the respective field name and its member(s), aka header name(s), inside the <code>drilledMembers</code> property in the <code>dataSourceSettings</code>.</td>
                </tr>
                </table><br />
                <p>
                    More information on the drill down can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pivotview/drill-down">
                    documentation section</a>.
                </p>
            </div>
            </div>);
    }
}
