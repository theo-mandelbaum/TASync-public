import * as React from 'react';
import { useEffect } from 'react';
import { Internationalization } from '@syncfusion/ej2-base';
import { TreeGridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-treegrid';
import { textdata } from './data';
import { updateSampleSection } from '../common/sample-base';
import './row-template.css';
let instance = new Internationalization();
const RowTemplate = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const format = (value) => {
        return instance.formatDate(value, { skeleton: "yMd", type: "date" });
    };
    const treegridTemplate = (props) => {
        var src = "src/treegrid/images/" + props.FullName + ".png";
        return (<tr>
                <td className="border" style={{ paddingLeft: "18px" }}>
                    <div>{props.EmpID}</div>
                </td>
                <td className="border" style={{ padding: "10px 0px 0px 20px" }}>
                    <div style={{ fontSize: "14px" }}>
                        {props.Name}
                        <p style={{ fontSize: "9px" }}>{props.Designation}</p>
                    </div>
                </td>
                <td className="border">
                    <div>
                        <div style={{ position: "relative", display: "inline-block" }}>
                            <img className="tempimg" src={src} alt={props.FullName}/>
                        </div>
                        <div style={{ display: "inline-block" }}>
                            <div style={{ padding: "5px" }}>{props.Address}</div>
                            <div style={{ padding: "5px" }}>{props.Country}</div>
                            <div style={{ padding: "5px", fontSize: "12px" }}>
                                {props.Contact}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="border" style={{ paddingLeft: "20px" }}>
                    <div>{format(props.DOB)}</div>
                </td>
            </tr>);
    };
    const template = treegridTemplate;
    return (<div className="control-pane">
            <div className="control-section">
                <TreeGridComponent dataSource={textdata} childMapping="Children" rowTemplate={template.bind(this)} treeColumnIndex={0} rowHeight={83} height="335">
                    <ColumnsDirective>
                        <ColumnDirective headerText="Employee ID" width="180" field="EmpID"></ColumnDirective>
                        <ColumnDirective headerText="Employee Name" width="140" field="Name"></ColumnDirective>
                        <ColumnDirective headerText="Employee Details" width="390" field="Address"></ColumnDirective>
                        <ColumnDirective headerText="DOB" editType="datepicker" field="DOB" width="100"></ColumnDirective>
                    </ColumnsDirective>
                </TreeGridComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the Tree Grid component with the row template
                    feature. In this sample, we have rendered each Tree Grid row using the
                    template.
                </p>
            </div>
            <div id="description">
                <p>
                    The Tree Grid provides a way to use a custom layout for its rows using
                    template feature. The
                    <code>
                        <a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/treegrid/row/#row-template">
                            rowTemplate
                        </a>
                    </code>{" "}
                    property accepts either string or HTML elements ID value, which will
                    be used as the template for the row.
                </p>
                <p>
                    In this demo, we have presented Employee Information with Employee
                    Photo and employee details like Name, Address etc.
                </p>
            </div>
        </div>);
};
export default RowTemplate;
