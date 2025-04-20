import * as React from 'react';
import { useEffect } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-treegrid';
import { textdata, getSparkData } from './data';
import { Sparkline } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { getObject } from '@syncfusion/ej2-grids';
class GridData {
    EmployeeID;
}
const ColumnTemplate = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const load = (args) => {
        let theme = location.hash.split("/")[1];
        theme = theme ? theme : "Material";
        args.sparkline.theme = (theme.charAt(0).toUpperCase() +
            theme.slice(1));
    };
    const rowDataBound = (args) => {
        let data = getObject("EmployeeID", args.data);
        let spkline = args.row.querySelector("#spkline" + data);
        let spkarea = args.row.querySelector("#spkarea" + data);
        let spkwl = args.row.querySelector("#spkwl" + data);
        let line = new Sparkline({
            height: "50px",
            width: "150px",
            load: load,
            lineWidth: 2,
            valueType: "Numeric",
            fill: "#3C78EF",
            dataSource: getSparkData("line", +data),
        });
        line.appendTo(spkline);
        let column = new Sparkline({
            height: "50px",
            width: "150px",
            load: load,
            type: "Column",
            valueType: "Numeric",
            fill: "#3C78EF",
            negativePointColor: "#f7a816",
            dataSource: getSparkData("column", +data),
        });
        column.appendTo(spkarea);
        let winloss = new Sparkline({
            height: "50px",
            width: "150px",
            load: load,
            type: "WinLoss",
            valueType: "Numeric",
            fill: "#3C78EF",
            tiePointColor: "darkgray",
            negativePointColor: "#f7a816",
            dataSource: getSparkData("column", +data),
        });
        winloss.appendTo(spkwl);
    };
    return (<div className="control-pane">
      <div className="control-section">
        <TreeGridComponent dataSource={textdata} treeColumnIndex={0} childMapping="Children" height="410" rowDataBound={rowDataBound.bind(this)}>
          <ColumnsDirective>
            <ColumnDirective field="EmpID" headerText="Employee ID" width="180"></ColumnDirective>
            <ColumnDirective field="Name" headerText="Name" width="170"></ColumnDirective>
            <ColumnDirective field="DOB" headerText="DOB" width="110" format="yMd" textAlign="Right"/>
            <ColumnDirective headerText="Tax per annum" width="170" template={(props) => {
            return <div id={"spkline" + props.EmployeeID}></div>;
        }} textAlign="Center"/>
            <ColumnDirective headerText="One Day Index" template={(props) => {
            return <div id={"spkarea" + props.EmployeeID}></div>;
        }} textAlign="Center" width="170"/>
            <ColumnDirective headerText="Year GR" template={(props) => {
            return <div id={"spkwl" + props.EmployeeID}></div>;
        }} textAlign="Center" width="180"/>
          </ColumnsDirective>
          <Inject services={[Page]}/>
        </TreeGridComponent>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates the usage of template columns in Tree Grid.
          In this sample, we have presented the sparkline charts.
        </p>
      </div>
      <div id="description">
        <p>
          The Tree Grid provides a way to use a custom layout for each cell
          using column template feature. The <code>columns-&gt;template</code>{" "}
          property accepts either string or HTML element`s ID value, which will
          be used as the template for the cell.
        </p>
        <p>
          In this demo, using column template, we have presented sparkLine
          charts for the "Tax per annum", "One day index" and "Year GR" columns.
          In <code>columns-&gt;template</code> we have assigned with the ID of a
          SCRIPT element whose content is used as the template.
        </p>
        <p>
            More information about Column Formatting can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/columns/columns#format">documentation section</a>.
        </p>
      </div>
    </div>);
};
export default ColumnTemplate;
