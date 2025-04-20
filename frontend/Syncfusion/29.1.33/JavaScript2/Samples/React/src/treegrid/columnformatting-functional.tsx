import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Column } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { DateFormatOptions } from '@syncfusion/ej2-base';
import { formatData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

const ColumnFormat = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj = useRef<TreeGridComponent>(null);
  let dropdownObj = useRef<DropDownListComponent>(null);
  let dropdownObj2 = useRef<DropDownListComponent>(null);
  const format: any = { type: "dateTime", format: "M/d/yyyy" };

  const columnNames: { [key: string]: Object }[] = [
    { id: "price", name: "Price" },
    { id: "orderDate", name: "Order Date" },
  ];

  const priceFormat: { [key: string]: Object }[] = [
    { id: "n2", format: "n2" },
    { id: "n3", format: "n3" },
    { id: "c2", format: "c2" },
    { id: "c3", format: "c3" },
    { id: "p2", format: "p2" },
    { id: "p3", format: "p3" },
  ];

  const dateFormat: { [key: string]: Object }[] = [
    { id: "M/d/yyyy", format: "Short Date" },
    { id: "dddd, MMMM dd, yyyy", format: "Long Date" },
    { id: "MMMM, yyyy", format: "Month/Year" },
    { id: "MMMM, dd", format: "Month/Day" },
  ];

  const change = (args: ChangeEventArgs): void => {
    let columnName: string = args.value.toString();
    if (columnName === "price") {
      dropdownObj2.current.dataSource = priceFormat;
      let priceColumn: Column = treegridObj.current.getColumnByField("price");
      dropdownObj2.current.value = priceColumn.format.toString();
    }
    if (columnName === "orderDate") {
      dropdownObj2.current.dataSource = dateFormat;
      let format: any =
        treegridObj.current.getColumnByField("orderDate").format;
      dropdownObj2.current.value = format.format;
    }
  };

  const change2 = (args: ChangeEventArgs): void => {
    let formatval: any = args.value;
    let columnName: string = dropdownObj.current.value.toString();
    if (columnName === "price") {
      treegridObj.current.getColumnByField(columnName).format = formatval;
    }
    if (columnName === "orderDate") {
      treegridObj.current.getColumnByField(columnName).format = {
        format: formatval,
        type: "date",
      };
    }
    treegridObj.current.refreshColumns();
  };
  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="col-lg-9">
          <TreeGridComponent
            dataSource={formatData}
            treeColumnIndex={1}
            childMapping="subtasks"
            height="350"
            allowPaging={true}
            ref={treegridObj}
            pageSettings={{ pageCount: 5 }}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="orderID"
                headerText="Order ID"
                width="110"
                textAlign="Right"
              ></ColumnDirective>
              <ColumnDirective
                field="orderName"
                headerText="Order Name"
                width="200"
              ></ColumnDirective>
              <ColumnDirective
                field="orderDate"
                headerText="Order Date"
                width="190"
                type="date"
                format={format}
                textAlign="Right"
              />
              <ColumnDirective
                field="price"
                headerText="Price"
                width="120"
                format="c2"
                textAlign="Right"
                type="number"
              />
            </ColumnsDirective>
            <Inject services={[Page]} />
          </TreeGridComponent>
        </div>
        <div className="col-lg-3 property-section" style={{paddingLeft:'5px'}}>
          <PropertyPane title="Properties">
            <table
              id="property"
              title="Properties"
              className="property-panel-table"
              style={{ width: "100%" }}
            >
              <tbody>
                <tr style={{ height: "50px" }}>
                  <td>
                    <div style={{ paddingTop: "7px" }}> Column </div>
                  </td>
                  <td style={{ width: "70%", paddingRight: "10px" }}>
                    <div>
                      <DropDownListComponent
                        width="145px"
                        id="columns"
                        change={change.bind(this)}
                        dataSource={columnNames}
                        fields={{ text: "name", value: "id" }}
                        value="price"
                        ref={dropdownObj}
                      />
                    </div>
                  </td>
                </tr>
                <tr style={{ height: "50px" }}>
                  <td>
                    <div> Format </div>
                  </td>
                  <td style={{ width: "70%", paddingRight: "10px" }}>
                    <div>
                      <DropDownListComponent
                        width="145px"
                        id="colformat"
                        change={change2.bind(this)}
                        dataSource={priceFormat}
                        fields={{ text: "format", value: "id" }}
                        value="c2"
                        ref={dropdownObj2}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates the way of displaying the content of Tree
          Grid columns based on the specified format. In this sample, format of
          columns can be changed dynamically through property panel.
        </p>
      </div>
      <div id="description">
        <p>
          Format is the process of customizing the particular column data/values
          based on specific culture. The Tree Grid uses Internalization library
          to format number and date values. The format can be specified by using{" "}
          <code>format</code> property of columns.
        </p>
        <p>
          In this demo, select the column and format from the property panel to
          format the corresponding column values.
        </p>
        <p>
          More information about Column Formatting can be found in this
          documentation section.
        </p>
      </div>
    </div>
  );
}
export default ColumnFormat;