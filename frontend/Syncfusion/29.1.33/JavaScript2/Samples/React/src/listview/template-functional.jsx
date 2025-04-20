/**
 * ListView Template Sample
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { updateSampleSection } from '../common/sample-base';
import './template.css';
import { dataSource } from './listData';
const Template = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    //Customizing the elements to perform our own events
    let share;
    let comments;
    let bookmark;
    let timeStamp;
    // Set customized list template
    const listTemplate = (data) => {
        return (<div className={data.category !== undefined ? "clearfix desc e-list-wrapper e-list-multi-line e-list-avatar'" : "clearfix e-list-wrapper e-list-multi-line e-list-avatar"}>
               {data.imgSrc !== "" ? <img className='e-avatar' src={`${data.imgSrc}`} alt="image"/> : ""}
               <span className="e-list-item-header">{data.title} </span>
               <span className="e-list-content e-text-overflow" dangerouslySetInnerHTML={{ __html: data.description }}></span>
               {data.timeStamp !== "" ?
                <div>
                           <div id="list-logo">
                               <span className="bookmark"></span>
                               <span className="comments"></span>
                               <span className="share"></span>
                           </div>
                       <div className="timeStamp">{data.timeStamp}</div></div> : ""}
           </div>);
    };
    const onComplete = () => {
        let instance = document.getElementById('listview_template');
        instance = instance.ej2_instances[0];
        let listHeader = instance.element.childNodes[0];
        let header = listHeader.childNodes[0];
        if (header.style.display === 'none' || listHeader.childNodes.length === 3) {
            if (listHeader.childNodes[2] != null) {
                let childHeader = listHeader.childNodes[2];
                childHeader.remove();
            }
        }
        else {
            let headerEle = instance.element.querySelector('.e-list-header');
            let headerElement = instance.element.querySelector('#list-logo');
            let clone = headerElement.cloneNode(true);
            headerEle.appendChild(clone);
        }
        //Customizing the elements to perform our own events
        share = document.getElementsByClassName('share');
        comments = document.getElementsByClassName('comments');
        bookmark = document.getElementsByClassName('bookmark');
        timeStamp = document.getElementsByClassName('timeStamp');
        postActions();
    };
    // EventHnadler to Comments, BookMarks and Share Icons
    const postActions = () => {
        for (let i = 0; i < comments.length; i++) {
            comments[i].setAttribute('title', 'We can customize this element to perform our own action');
            comments[i].addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
        for (let i = 0; i < bookmark.length; i++) {
            bookmark[i].setAttribute('title', 'We can customize this element to perform our own action');
            bookmark[i].addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
        for (let i = 0; i < share.length; i++) {
            share[i].setAttribute('title', 'We can customize this element to perform our own action');
            share[i].addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
        for (let i = 0; i < timeStamp.length; i++) {
            timeStamp[i].addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
    };
    return (<div className='control-pane'>
           <div className='control-section'>
               {/* ListView element */}
               <ListViewComponent id='listview_template' dataSource={dataSource} headerTitle='Syncfusion Blog' showHeader={true} cssClass='e-list-template' actionComplete={onComplete.bind(this)} template={listTemplate}></ListViewComponent>
           </div>
           <div id="action-description">
               <p>
                   This sample demonstrates the template functionalities of the ListView. Click any news header or thumbnail to open
                   the complete article. To navigate back to the news list, click the back icon at the top left area.
               </p>
           </div>
           <div id="description">
               <p>The above template represents the customizability of the ListView component. Here, list data is loaded and its value is directly mapped to your ListView datasource to load the content.</p>
               <p>This sample also have the additional elements such as bookmark, comments, and share that can be customized to perform the appropriate action by adding your own events.</p>
           </div>
       </div>);
};
export default Template;
