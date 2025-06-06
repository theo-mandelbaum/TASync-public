import * as ReactDOM from 'react-dom/client';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { cardBook } from './data-source';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';
import './card.component.css';
let cardEle;
let cardObj = cardBook;
let data = [];
let multiSelectData = [];
let searchData = [];
let searchValCount = 0;
let filterCategory = [{ Name: 'Client-Side', Code: 'client' }, { Name: 'Server-Side', Code: 'server' }, { Name: 'Front-End', Code: 'ui' }];
let emptyData = true;
/* Initialize MultiSelect component */
let multiselectComp;
const cardRendering = (cardObj) => {
    let errorContent = document.querySelector('.tile_layout .row.error');
    if (cardObj.length > 0) {
        errorContent.style.display = 'none';
        cardObj.forEach((data, index) => {
            cardEle = document.getElementById('card_sample_' + (++index));
            if (cardEle) {
                const root = ReactDOM.createRoot(cardEle);
                root.render(<CardRender data={data}/>);
            }
        });
    }
    else {
        errorContent.style.display = 'flex';
    }
};
/* Funtion for Destroying Cards */
const destroyAllCard = () => {
    let cards = document.querySelectorAll('.card-control-section .e-card');
    [].slice.call(cards).forEach((el) => {
        const root = ReactDOM.createRoot(el.parentElement);
        root.unmount();
    });
};
const Tile = () => {
    useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, []);
    const rendereComplete = () => {
        multiselectComp = new MultiSelect({
            // set the local data to dataSource property
            dataSource: filterCategory,
            // map the appropriate columns to fields property
            fields: { text: 'Name', value: 'Code' },
            // set the placeholder to MultiSelect input element
            placeholder: 'Search by categories',
            select: multiSelectFun,
            removed: multiSelectRemove,
        });
        multiselectComp.appendTo('#local');
        cardRendering(cardObj);
        document.getElementById('search_Card').onkeyup = (e) => {
            if (e.code === 'Tab' || e.code === 'Escape' || e.code === 'ShiftLeft' || (e.code === 'Backspace' && emptyData)) {
                return;
            }
            let inputVal = e.target.value;
            inputVal.length === 0 ? emptyData = true : emptyData = false;
            searchFilter(inputVal);
        };
    };
    /* Remove event function for multiSelect component */
    const multiSelectRemove = (e) => {
        let cardDa = searchData.length > 0 ? searchData : (multiSelectData.length > 0 ? multiSelectData : cardObj);
        if (multiselectComp.value && multiselectComp.value.length === 0 && searchValCount === 0) {
            multiSelectData = cardDa;
            destroyAllCard();
            cardRendering(cardObj);
        }
        else if (multiselectComp.value.length === 0 && searchValCount > 0) {
            searchFilter(document.getElementById('search_Card').value);
        }
        else if (multiselectComp.value.length === 0) {
            destroyAllCard();
            multiSelectData = cardDa;
            cardRendering(cardDa);
        }
        else {
            let keywords = e.itemData.Code.split(',');
            let dublicate;
            keywords.forEach((key) => {
                dublicate = new DataManager(cardObj).executeLocal(new Query().where('cardImage.tag', 'Contains', key, true));
                dublicate.forEach((da) => {
                    if (cardDa.indexOf(da) !== -1) {
                        cardDa.splice(cardDa.indexOf(da), 1);
                    }
                });
                multiSelectData = cardDa;
            });
            destroyAllCard();
            cardRendering(multiSelectData);
        }
    };
    const multiSelectFun = (e) => {
        let keywords = e.itemData.Code.split(',');
        let dublicate;
        let cardDa = searchData.length > 0 ? searchData : cardObj;
        if (multiselectComp.value && multiselectComp.value.length === 0 && searchValCount === 0) {
            multiSelectData = [];
        }
        keywords.forEach((key) => {
            dublicate = new DataManager(cardDa).executeLocal(new Query().where('cardImage.tag', 'Contains', key, true));
            if (dublicate.length === 0) {
                multiSelectData = [];
                destroyAllCard();
                return;
            }
            dublicate.forEach((da) => {
                if (multiSelectData.indexOf(da) === -1) {
                    multiSelectData.push(da);
                }
            });
        });
        destroyAllCard();
        cardRendering(multiSelectData);
    };
    /* Function for Filtering Cards */
    const searchFilter = (key) => {
        searchValCount = key.length;
        let predicate = new Predicate('cardContent', 'Contains', key, true);
        predicate = predicate.or('cardImage.title', 'Contains', key, true).or('header_title', 'Contains', key, true).or('header_subtitle', 'Contains', key, true);
        let cardDa = (multiSelectData.length > 0 && multiselectComp.value.length > 0) ? multiSelectData : cardObj;
        searchData = data = new DataManager(cardDa).executeLocal(new Query().where(predicate));
        destroyAllCard();
        cardRendering(data);
    };
    return (<div className='control-pane'>
            <div className="control-section card-control-section tile_layout">
                <div className="row filter">
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                        <div className="e-float-input">
                            <input type="text" required id="search_Card"/>
                            <span className="e-float-line"></span>
                            <label className="e-float-text" style={{ fontSize: '14px' }}>Enter text to search</label>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 tile_search">
                        <input type="text" id="local"/>
                    </div>
                </div>
                <div className='row e-card-layout' style={{ textAlign: 'center' }}>
                    <div className="row">
                        <div className="row error" style={{ display: 'none', minHeight: '150px' }}>
                            <div className="e-error-content" style={{ margin: 'auto', height: 'inherit', fontSize: '18px', fontWeight: 500, color: 'inherit' }}>No results found. Please try a different search.</div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id='card_sample_1' className='card_sample'></div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id='card_sample_2' className='card_sample'></div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id='card_sample_3' className='card_sample'></div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id='card_sample_4' className='card_sample'></div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id='card_sample_5' className='card_sample'></div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id='card_sample_6' className='card_sample'></div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id='card_sample_7' className='card_sample'></div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id='card_sample_8' className='card_sample'></div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id='card_sample_9' className='card_sample'></div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id='card_sample_10' className='card_sample'></div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id='card_sample_11' className='card_sample'></div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div id='card_sample_12' className='card_sample'></div>
                        </div>
                    </div>
                </div>
                <div id='source_link'>Source: &nbsp;
                    <a href="https://www.syncfusion.com/ebooks/" target='_blank'>https://www.syncfusion.com/ebooks</a>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates filter and search of the <code>card</code> based on categories, and text containing the card. You can use search
                    box to search cards, and you can filter choosing categories in multi-select component.
            </p>
            </div>
            <div id="description">
                <p>
                    Card is a small container in which user can show defined content in a specific structure, and it is flexible and extensible.
                    This sample demonstrates how to render the <code>Card</code> using
                    <a target="_blank" href="https://ej2.syncfusion.com/documentation/common/template-engine/"> Template Engine</a> and it can be filtered based on
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/data/getting-started/">data Manager</a>.
                </p>
                <p>
                    More information about Card can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/card/getting-started/">documentation</a> section.
                </p>
            </div>
        </div>);
};
const CardRender = (props) => {
    const headerTitleSubCheck = props.data.header_title.length > 0 || props.data.header_subtitle.length > 0;
    const headerCheck = props.data.header_title.length > 0 || props.data.header_subtitle.length > 0 || props.data.header_img.length > 0;
    const bgimageUrl = "url(" + props.data.cardImage.url + ")";
    return (<div className={props.data.isHorizontal ? 'e-card e-card-horizontal' : 'e-card'}>
        {props.data.cardImage && <div className='e-card-image' style={{ backgroundImage: bgimageUrl }}> {props.data.cardImage.title && <div className='e-card-title'>{props.data.cardImage.title}</div>} </div>}
        {props.data.cardTitle && <div className='e-card-title'>{props.data.cardTitle}</div>}
        {headerCheck &&
            <div className='e-card-header'>
            {props.data.header_img && <div className={props.data.header_img.isRounded ? 'e-card-header-image e-card-corner' : 'e-card-header-image e-card-corner'}></div>}
            {headerTitleSubCheck &&
                    <div className='e-card-header-caption'>
                {props.data.header_title && <div className='e-card-header-title'>{props.data.header_title}</div>}
                {props.data.header_subtitle && <div className='e-card-sub-title'>{props.data.header_subtitle}</div>}
                </div>}
            </div>}
        {props.data.cardContent && <div className='e-card-content'>{props.data.cardContent}</div>}
        {props.data.card_action_btn &&
            <div className={props.data.card_action_btn.isVertical ? 'e-card-actions e-card-vertical' : 'e-card-actions'}>
                {props.data.card_action_btn.action_btns.map(function (actBtn) {
                    return actBtn.tag === "a" ? <a key={actBtn.text} href={actBtn.href} target={actBtn.target} className='e-btn e-outline e-primary'> {actBtn.text}</a> : <button key={actBtn.text} className='e-card-btn'>{actBtn.text}</button>;
                })}
            </div>}
        </div>);
};
export default Tile;
