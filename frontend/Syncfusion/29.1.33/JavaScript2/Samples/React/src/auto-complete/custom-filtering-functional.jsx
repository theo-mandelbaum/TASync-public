import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import Fuse from 'fuse.js';
import './custom-filtering.css';
import * as data from './dataSource.json';
const CustomFiltering = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const temp = 'booksData';
    const booksData = data[temp];
    // maps the appropriate column to fields property
    const fields = { value: 'BookName' };
    //Bind the filter event
    const onFiltering = (e) => {
        let options = {
            keys: ['BookName'],
            includeMatches: true,
            findAllMatches: true
        };
        // create object from Fuse constructor
        let fuse = new Fuse(booksData, options);
        // store the search result data based on typed characters
        let result = fuse.search(e.text);
        let data = [];
        for (let i = 0; i < result.length; i++) {
            data.push(result[i].item);
        }
        // pass the filter data source to updateData method.
        e.updateData(data, null);
        let popupElement = document.getElementById('books_popup');
        if (popupElement) {
            let lists = popupElement.querySelectorAll('.e-list-item');
            // For highlight the typed characters, pass the result data and list items to highlightSearch method.
            highlightSearch(lists, result);
        }
    };
    const highlightSearch = (listItems, result) => {
        if (result.length > 0) {
            for (let i = 0; i < listItems.length; i++) {
                let innerHTML = listItems[i].innerHTML;
                for (let j = result[i].matches[0].indices.length - 1; j >= 0; j--) {
                    let indexes = result[i].matches[0].indices[j];
                    innerHTML = innerHTML.substring(0, indexes[0]) + '<span class="e-highlight">' +
                        innerHTML.substring(indexes[0], (indexes[1] + 1)) + '</span>' + innerHTML.substring(indexes[1] + 1);
                    listItems[i].innerHTML = innerHTML;
                }
            }
        }
    };
    return (<div id='autocustom' className='control-pane'>
            <div className='control-section'>
                <div id='custom-filtering'>
                    <AutoCompleteComponent id="books" dataSource={booksData} filtering={onFiltering.bind(this)} fields={fields} placeholder="e.g. Node.js Succinctly"/>
                </div>
            </div>

            <div id="action-description">
                <p>This sample demonstrates the custom filtering functionalities of the AutoComplete. You can choose
                    an item from the suggestion list that filtered items based on approximate string matching technique.</p>
            </div>

            <div id="description">
                <p> The AutoComplete can be customized to showcase the suggestion list by using <code>filtering</code> event.
                    In that, you can use your own libraries to filter the data and update it to AutoComplete suggestion list via <code>updateData</code> method.</p>
                <p>In this sample, used Fuse.js library for custom filtering of books data.</p>
                <p>
                    For more information about Fuse.js can be found in this <a href="http://fusejs.io/" target="_blank"> reference link</a>.
                </p>
            </div>
        </div>);
};
export default CustomFiltering;
