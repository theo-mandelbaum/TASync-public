import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import './cascading.css';
import * as data from './dataSource.json';
const Cascading = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    // state DropDownList instance
    const stateObj = useRef(null);
    // city DropDownList instance
    const cityObj = useRef(null);
    const tempCountry = 'country';
    //define the country DropDownList data
    const countryData = data[tempCountry];
    const tempState = 'state';
    //define the state DropDownList data
    const stateData = data[tempState];
    const tempCity = 'cities';
    //define the city DropDownList data
    const cityData = data[tempCity];
    // maps the country column to fields property
    const countryFields = { value: 'CountryId', text: 'CountryName' };
    // maps the state column to fields property
    const stateFields = { value: 'StateId', text: 'StateName' };
    // maps the city column to fields property
    const cityFields = { text: 'CityName', value: 'CityId' };
    const [stateEnabled, setStateEnabled] = useState(false);
    const [stateQuery, setStateQuery] = useState(null);
    const [stateText, setStateText] = useState(null);
    const [cityText, setCityText] = useState(null);
    const [cityEnabled, setCityEnabled] = useState(false);
    const [cityQuery, setCityQuery] = useState(null);
    const countryChange = (args) => {
        setStateEnabled(args.value != null);
        // query the data source based on country DropDownList selected value
        let tempQuery = new Query().where('CountryId', 'equal', args.value);
        setStateQuery(tempQuery);
        // clear the existing selection.
        setStateText(null);
        // bind the property changes to state DropDownList
        stateObj.current.dataBind();
        // clear the existing selection.
        setCityText(null);
        setCityEnabled(false);
        // bind the property changes to city DropDownList
        cityObj.current.dataBind();
    };
    const stateChange = (args) => {
        setCityEnabled(args.value != null);
        // query the data source based on state DropDownList selected value
        let tempQuery1 = new Query().where('StateId', 'equal', args.value);
        setCityQuery(tempQuery1);
        // clear the existing selection.
        setCityText(null);
    };
    return (<div className='control-pane'>
            <div className='control-section'>
                <div id='cascade'>
                    <div style={{ paddingTop: '35px' }}>
                        <DropDownListComponent id="country" dataSource={countryData} fields={countryFields} popupHeight="auto" change={countryChange.bind(this)} placeholder="Select a country"/>
                    </div>
                    <div style={{ paddingTop: '35px' }}>
                        <DropDownListComponent id="state" dataSource={stateData} ref={stateObj} fields={stateFields} popupHeight="auto" change={stateChange.bind(this)} enabled={stateEnabled} placeholder="Select a state" query={stateQuery} text={stateText}/>
                    </div>
                    <div style={{ paddingTop: '35px' }}>
                        <DropDownListComponent id="city" dataSource={cityData} ref={cityObj} fields={cityFields} enabled={cityEnabled} popupHeight="auto" placeholder="Select a city" text={cityText} query={cityQuery}/>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the cascading functionalities of the DropDownList. Choose a country from the countries DropDownList, then respective states will be loaded in the second DropDownList
                    and the same has to be done between states and cities DropDownList.</p>
            </div>
            <div id="description">
                <p>The <code>Cascading</code> DropDownList is the series of DropDownList, where the value of one DropDownList depends on
                    the another DropDownList value. This can be configured by using the <code>change</code> event of parent DropDownList.
                    Within that change event handler, you should load the data to child DropDownList based on the selected value of parent
                    DropDownList.</p>
                <p>In this sample, if a country is selected from countries DropDownList, the respective states will be loaded in the second DropDownList
                    and the same has to be done between states and cities DropDownList.</p>
                <p> More information on the Cascading feature configuration can be found in the
                    <a href="http://ej2.syncfusion.com/react/documentation/drop-down-list/how-to.html#configure-the-cascading-combobox" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>);
};
export default Cascading;
