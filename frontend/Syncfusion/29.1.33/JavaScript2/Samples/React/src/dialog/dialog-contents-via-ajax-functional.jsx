import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Fetch } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { updateSampleSection } from '../common/sample-base';
import './dialog-contents-via-ajax.css';
const AjaxContent = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let dialogInstance = useRef(null);
    let buttons;
    let animationSettings;
    let buttonEle;
    const [display, setDisplay] = useState('none');
    const [status, setStatus] = useState(true);
    let buttonRef = (element) => {
        buttonEle = element;
    };
    animationSettings = { effect: 'None' };
    const dlgButtonClick = () => {
        if (document.querySelector('.e-footer-content .e-btn').textContent === 'More Details') {
            let fetchApi = new Fetch('./src/dialog/blog.html', 'GET');
            fetchApi.send().then();
            fetchApi.onSuccess = (data) => {
                dialogInstance.current.target = document.getElementById('target');
                dialogInstance.current.content = data;
            };
            dialogInstance.current.buttons = [
                {
                    click: dlgButtonClick,
                    buttonModel: { content: "Less Details", isPrimary: true }
                }
            ];
        }
        else {
            dialogInstance.current.content = innerContent;
            dialogInstance.current.buttons = [
                {
                    click: dlgButtonClick,
                    buttonModel: { content: "More Details", isPrimary: true }
                }
            ];
        }
    };
    buttons = [
        {
            click: dlgButtonClick,
            buttonModel: {
                content: 'More Details',
                isPrimary: true,
            },
        },
    ];
    const buttonClick = () => {
        setStatus(true);
    };
    const dialogClose = () => {
        setStatus(false);
        setDisplay('inline-block');
    };
    const dialogOpen = () => {
        setStatus(true);
        setDisplay('none');
    };
    const innerContent = `On October 17, Microsoft will release its Fall Creators Update for the Windows
    10 platform. Much like its previous counterpart, the Spring Creators Update, the release is set to deliver more 
    features to Windows 10 for both developers and users, with particular emphasis this time around on app modernization,
    mixed reality, and game development and software updates. App modernization is the term Microsoft used in its press 
    event to encompass the features that will affect most Windows 10 users and developers.`;
    return (<div className="control-pane">
        <div id="target" className="control-section ajaxcontent col-lg-12">
          <button className="e-control e-btn dlgbtn" ref={buttonRef} style={{ display: display }} onClick={buttonClick} id="dialogBtn">Open</button>
          <DialogComponent id="dialog" ref={dialogInstance} visible={status} header={'<img class="img1" src="src/dialog/images/2.png" alt="Microsoft roadmap">' + 'What’s Coming from Microsoft this Fall'} showCloseIcon={true} animationSettings={animationSettings} width={'500px'} target={'#target'} close={dialogClose} open={dialogOpen} content={innerContent} buttons={buttons}></DialogComponent>
        </div>
        <div id="action-description">
          <p>
            This example demonstrates that the content of dialog can be loaded
            from external HTML file. Click "more details" on dialog to load the
            content dynamically from external HTML file. Click “open” to show the
            dialog again, if it is closed.
          </p>
        </div>
        <div id="description">
          <p>
            The user can load dialog's content dynamically from external source
            like external file using Fetch library. The Fetch library can make the
            request and load dialog's content using its success event.
          </p>
        </div>
      </div>);
};
export default AjaxContent;
