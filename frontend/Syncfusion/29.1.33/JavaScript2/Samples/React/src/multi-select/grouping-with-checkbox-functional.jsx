import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MultiSelectComponent, CheckBoxSelection, Inject } from '@syncfusion/ej2-react-dropdowns';
import './grouping-with-checkbox.css';
const CheckBoxGrouping = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    //define the data with category
    const vegetables = [
        { "Vegetable": "Cabbage", "Category": "Leafy and Salad", "Id": "item1" },
        { "Vegetable": "Chickpea", "Category": "Beans", "Id": "item2" },
        { "Vegetable": "Garlic", "Category": "Bulb and Stem", "Id": "item3" },
        { "Vegetable": "Green bean", "Category": "Beans", "Id": "item4" },
        { "Vegetable": "Horse gram", "Category": "Beans", "Id": "item5" },
        { "Vegetable": "Nopal", "Category": "Bulb and Stem", "Id": "item6" },
        { "Vegetable": "Onion", "Category": "Bulb and Stem", "Id": "item7" },
        { "Vegetable": "Pumpkins", "Category": "Leafy and Salad", "Id": "item8" },
        { "Vegetable": "Spinach", "Category": "Leafy and Salad", "Id": "item9" },
        { "Vegetable": "Wheat grass", "Category": "Leafy and Salad", "Id": "item10" },
        { "Vegetable": "Yarrow", "Category": "Leafy and Salad", "Id": "item11" }
    ];
    // map the groupBy field with category column
    const checkFields = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
    // set the placeholder to the MultiSelect input
    const checkWaterMark = 'Select vegetables';
    // set enableGroupCheckBox value to the Multiselect input
    const enableGroupCheckBox = true;
    // set mode value to the multiselect input
    const mode = 'CheckBox';
    // set the placeholder to the filter bar
    const filterBarPlaceholder = 'Search Vegetables';
    return (<div id="checkboxgroup" className='control-pane'>
            <div className='control-section col-lg-12'>
                <div id="multigroup" className="control-styles">
                <label className="h4">Grouping with CheckBox</label>
                    <MultiSelectComponent id="checkbox" dataSource={vegetables} filterBarPlaceholder={filterBarPlaceholder} fields={checkFields} placeholder={checkWaterMark} mode={mode} showSelectAll={true} enableGroupCheckBox={enableGroupCheckBox} showDropDownIcon={true} enableSelectionOrder={false}>
                        <Inject services={[CheckBoxSelection]}/>
                    </MultiSelectComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the grouping functionalities of the MultiSelect in checkbox mode.
                    Clicking the checkbox in group will select all the items grouped under it. Click the MultiSelect element
                    and then type the character in the search box. It will display the filtered list items based on the typed
                    characters and then select the multiple values through the checkbox.</p>
            </div>
            <div id="description">
                <p>The MultiSelect has built-in support to select the multiple values through the checkbox, when the <code>mode</code> property
                    is set to <code>CheckBox</code>. To perform the checkbox feature in MultiSelect, the <code>CheckBoxSelection</code> module
                    should be injected in the application end.</p>
            </div>
        </div>);
};
export default CheckBoxGrouping;
