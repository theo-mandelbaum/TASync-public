import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { AutoCompleteComponent, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import './highlight.css';
import * as data from './dataSource.json';
const Highlight = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const temp = 'countries';
    // define the JSON of data
    const countries = data[temp];
    // maps the appropriate column to fields property
    const fields = { value: 'Name' };
    // define the array of data
    const filterData = ['Contains', 'StartsWith', 'EndsWith'];
    const [filterType, setFilterType] = useState('Contains');
    // bind change event to modify the filter type of AutoComplete.
    const onChange = (args) => {
        setFilterType(args.itemData.value);
    };
    return (<div className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-8 control-wrappers'>
                    <div id='highlight'>
                        <AutoCompleteComponent id="country" filterType={filterType} dataSource={countries} fields={fields} placeholder="e.g. Australia" highlight={true}/>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="filter-property">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" style={{ width: "100%", marginTop: "15px" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ width: "50%" }}>FilterType :</td>
                                    <td> <DropDownListComponent id="filter-type" dataSource={filterData} change={onChange.bind(this)} placeholder="Select a type" text='Contains'/></td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the highlight functionalities of the AutoComplete. Type a character(s) in the autocomplete element and the typed characters are highlighted in the suggestion list.
                    By default, <code>Contains</code> filter type is set in this sample and provided with the options to choose different filter type in the property panel.</p>
            </div>
            <div id="description">
                <p>The AutoComplete has built-in support to highlight the searched characters on the suggested list items when <code>highlight</code> is enabled.</p>
                <p>This sample illustrates that, the searched characters on the country suggestion list items are highlighted.</p>
                <p> More information on the highlight search feature configuration can be found in the
                    <a href="http://ej2.syncfusion.com/react/documentation/auto-complete/how-to.html#custom-highlight-search" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>);
};
export default Highlight;
