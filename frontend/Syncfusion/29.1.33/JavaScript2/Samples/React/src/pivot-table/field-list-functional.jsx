import * as React from 'react';
import { PivotViewComponent, PivotFieldListComponent, Inject, FieldList as fieldList, CalculatedField } from '@syncfusion/ej2-react-pivotview';
import { Browser, setStyleAttribute } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
/**
 * Pivot Field List default sample
 */
const SAMPLE_CSS = `
.e-pivotview {
    width: 58%;
    height: 100%;
    float: left;
}
.e-pivotfieldlist {
    width: 42%;
    height: 100%;
    float: right;
}
.e-pivotfieldlist .e-static {
    width: 100% !important;
}`;
/* tslint:disable */
let Pivot_Data = pivotData.data;
let dataSourceSettings = {
    dataSource: Pivot_Data,
    expandAll: false,
    allowLabelFilter: true,
    allowValueFilter: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true
};
function FieldList() {
    let fieldlistObj;
    let pivotObj;
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, []);
    function afterPopulate() {
        if (fieldlistObj && pivotObj) {
            fieldlistObj.updateView(pivotObj);
        }
    }
    function afterPivotPopulate() {
        if (!Browser.isDevice && fieldlistObj && pivotObj) {
            fieldlistObj.update(pivotObj);
        }
    }
    function rendereComplete() {
        fieldlistObj.updateView(pivotObj);
        fieldlistObj.update(pivotObj);
    }
    function ondataBound() {
        pivotObj.tooltip.destroy();
        if (Browser.isDevice) {
            pivotObj.element.style.width = '100%';
            pivotObj.allowCalculatedField = true;
            pivotObj.showFieldList = true;
        }
        pivotObj.refresh();
    }
    function onLoad() {
        if (Browser.isDevice) {
            this.renderMode = 'Popup';
            this.target = '.control-section';
            setStyleAttribute(document.getElementById('PivotFieldList'), {
                'width': 0,
                'height': 0,
                'float': 'left',
                'display': 'none'
            });
        }
    }
    return (<div className="control-pane">
            <style>
                {SAMPLE_CSS}
            </style>
            <div className="control-section" style={{ overflow: 'auto' }}>
                <PivotViewComponent id='PivotView' ref={d => pivotObj = d} enginePopulated={afterPivotPopulate.bind(this)} width={'99%'} height={'580'} gridSettings={{ columnWidth: 140 }}>
                <Inject services={[CalculatedField, fieldList]}/>
                </PivotViewComponent>
                <PivotFieldListComponent id='PivotFieldList' ref={(d) => fieldlistObj = d} enginePopulated={afterPopulate.bind(this)} dataSourceSettings={dataSourceSettings} renderMode={"Fixed"} allowCalculatedField={true} enableFieldSearching={true} load={onLoad} dataBound={ondataBound.bind(this)}>
                    <Inject services={[CalculatedField]}/>
                </PivotFieldListComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the Excel-like field list feature of the pivot table. The pivot fields are automatically populated from the bound data source, and they can be dragged and dropped to create and alter the report at runtime.</p>
            </div>
            <div id="description">
                <p>The pivot table provides a built-in field list very similar to Microsoft Excel. The top section of the field list
                    allows the user to add and remove fields. The bottom section of the field list allows the user to rearrange the fields
                    between different axes, including column, row, value, and filter along with filter and sort options.
                    <br />
                    <br /> To show the field list independently, create as separate component namely
                    <code> PivotFieldList</code> and assign JSON data source to its
                    <code> dataSourceSettings-&gt;dataSource</code> property. Simultaneously pivot table will be populated by passing its instance in the updateView method, inside the
                    <code> enginePopulated</code> event of field list.
                    <br />
                    <br />
                    Additionally, user interface for calculated field, label filter, and value filter features have been enabled in this demo by setting the properties
                    <code> allowCalculatedField</code>,
                    <code> dataSourceSettings-&gt;allowLabelFilter</code> and <code> dataSourceSettings-&gt;allowValueFilter</code> to true.
                </p>
                <p>
                    <strong>NOTE:</strong> To enable calculated field, inject
                    <code> CalculatedField</code>
                </p><br />
                <p>
                    More information on the field list can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pivotview/field-list">
                    documentation section</a>.
                </p>
            </div>
        </div>);
}
export default FieldList;
