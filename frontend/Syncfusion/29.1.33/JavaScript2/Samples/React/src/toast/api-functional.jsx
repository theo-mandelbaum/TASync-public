import * as React from 'react';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './api.css';
import { updateSampleSection } from '../common/sample-base';
function Api() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, []);
    let toastInputTitleEle;
    let toastInputContentEle;
    let showDurationEle;
    let hideDurationEle;
    let timeOutEle;
    let toastInputTitleRef = (element) => {
        toastInputTitleEle = element;
    };
    let toastInputContentRef = (element) => {
        toastInputContentEle = element;
    };
    let showDurationRef = (element) => {
        showDurationEle = element;
    };
    let hideDurationRef = (element) => {
        hideDurationEle = element;
    };
    let timeOutRef = (element) => {
        timeOutEle = element;
    };
    let toastObj;
    let dropDownListShowEase;
    let dropDownListHideEase;
    let dropDownListProgressDirection;
    let dropDownListShow;
    let dropDownListHide;
    let toastBtnShow;
    let toastBtnHide;
    let position = { X: 'Right', Y: 'Bottom' };
    let prevDuplicates = false;
    let showData = [
        { Id: 'ease', Text: 'Ease' },
        { Id: 'linear', Text: 'Linear' }
    ];
    const directionData = [
        { Id: 'Rtl', Text: 'Right to Left' },
        { Id: 'Ltr', Text: 'Left to Right' }
    ];
    const animationData = [
        { Id: 'SlideBottomIn', Effect: 'Slide Bottom In' },
        { Id: 'FadeIn', Effect: 'Fade In' },
        { Id: 'FadeZoomIn', Effect: 'Fade Zoom In' },
        { Id: 'FadeZoomOut', Effect: 'Fade Zoom Out' },
        { Id: 'FlipLeftDownIn', Effect: 'Flip Left Down In' },
        { Id: 'FlipLeftDownOut', Effect: 'Flip Left Down Out' },
        { Id: 'FlipLeftUpIn', Effect: 'Flip Left Up In' },
        { Id: 'FlipLeftUpOut', Effect: 'Flip Left Up Out' },
        { Id: 'FlipRightDownIn', Effect: 'Flip Right Down In' },
        { Id: 'FlipRightDownOut', Effect: 'Flip Right Down Out' },
        { Id: 'FlipRightUpIn', Effect: 'Flip Right Up In' },
        { Id: 'FlipRightUpOut', Effect: 'Flip Right Up Out' },
        { Id: 'SlideBottomOut', Effect: 'Slide Bottom Out' },
        { Id: 'SlideLeftIn', Effect: 'Slide Left In' },
        { Id: 'SlideLeftOut', Effect: 'Slide Left Out' },
        { Id: 'SlideRightIn', Effect: 'Slide Right In' },
        { Id: 'SlideRightOut', Effect: 'Slide Right Out' },
        { Id: 'SlideTopIn', Effect: 'Slide Top In' },
        { Id: 'SlideTopOut', Effect: 'Slide Top Out' },
        { Id: 'ZoomIn', Effect: 'Zoom In' },
        { Id: 'ZoomOut', Effect: 'Zoom Out' }
    ];
    const animationData1 = [
        { Id: 'SlideBottomOut', Effect: 'Slide Bottom Out' },
        { Id: 'FadeIn', Effect: 'Fade In' },
        { Id: 'FadeZoomIn', Effect: 'Fade Zoom In' },
        { Id: 'FadeZoomOut', Effect: 'Fade Zoom Out' },
        { Id: 'FlipLeftDownIn', Effect: 'Flip Left Down In' },
        { Id: 'FlipLeftDownOut', Effect: 'Flip Left Down Out' },
        { Id: 'FlipLeftUpIn', Effect: 'Flip Left Up In' },
        { Id: 'FlipLeftUpOut', Effect: 'Flip Left Up Out' },
        { Id: 'FlipRightDownIn', Effect: 'Flip Right Down In' },
        { Id: 'FlipRightDownOut', Effect: 'Flip Right Down Out' },
        { Id: 'FlipRightUpIn', Effect: 'Flip Right Up In' },
        { Id: 'FlipRightUpOut', Effect: 'Flip Right Up Out' },
        { Id: 'SlideBottomIn', Effect: 'Slide Bottom In' },
        { Id: 'SlideLeftIn', Effect: 'Slide Left In' },
        { Id: 'SlideLeftOut', Effect: 'Slide Left Out' },
        { Id: 'SlideRightIn', Effect: 'Slide Right In' },
        { Id: 'SlideRightOut', Effect: 'Slide Right Out' },
        { Id: 'SlideTopIn', Effect: 'Slide Top In' },
        { Id: 'SlideTopOut', Effect: 'Slide Top Out' },
        { Id: 'ZoomIn', Effect: 'Zoom In' },
        { Id: 'ZoomOut', Effect: 'Zoom Out' }
    ];
    let showFields = { text: 'Text', value: 'Id' };
    let directionFields = { text: 'Text', value: 'Id' };
    let animationFields = { text: 'Effect', value: 'Id' };
    let easeValue = 'ease';
    let directionValue = 'Rtl';
    let animationValue = 'SlideBottomIn';
    let animationHideValue = 'SlideBottomOut';
    function closeOnChange(e) {
        e.checked ? toastObj.showCloseButton = true : toastObj.showCloseButton = false;
    }
    function OnProgressChange(e) {
        e.checked ? toastObj.showProgressBar = true : toastObj.showProgressBar = false;
    }
    function closeNewestOnChange(e) {
        e.checked ? toastObj.newestOnTop = true : toastObj.newestOnTop = false;
    }
    function OnPrevDubChange(e) {
        prevDuplicates = e.checked;
    }
    function OnactionBtnChange(e) {
        if (e.checked) {
            toastObj.buttons = [{ model: { content: '<div class="e-toast-btn"> Click Here </div>' }, click: onActionBtnClick }];
        }
        else {
            toastObj.buttons = [];
        }
    }
    function onActionBtnClick(e) {
        alert('Action button is clicked');
    }
    function showToast() {
        let title = toastInputTitleEle.value;
        let content = toastInputContentEle.value;
        if (title === '' && content === '') {
            content = 'You have created a Toast message';
        }
        let showDuration = parseInt(showDurationEle.value, 10);
        let hideDuration = parseInt(hideDurationEle.value, 10);
        let timeOut = parseInt(timeOutEle.value, 10);
        toastObj.show({
            title: title, content: content, timeOut: timeOut,
            animation: {
                show: { duration: showDuration },
                hide: { duration: hideDuration }
            }
        });
    }
    function onShowEase() {
        toastObj.animation.show.easing = dropDownListShowEase.value.toString();
    }
    function onProgressDirection() {
        toastObj.progressDirection = dropDownListProgressDirection.value.toString();
    }
    function showChange() {
        toastObj.animation.show.effect = dropDownListShow.value;
    }
    function hideChange() {
        toastObj.animation.hide.effect = dropDownListHide.value;
    }
    function onHideEase() {
        toastObj.animation.hide.easing = dropDownListHideEase.value.toString();
    }
    function showBtnClick() {
        showToast();
    }
    function hideBtnClick() {
        toastObj.hide('All');
    }
    function onbeforeOpen(e) {
        toastBtnHide.element.style.display = 'inline-block';
        if (prevDuplicates) {
            e.cancel = preventDuplicate(e);
        }
    }
    function onclose(e) {
        if (e.toastContainer.childElementCount === 0) {
            toastBtnHide.element.style.display = 'none';
        }
    }
    function preventDuplicate(e) {
        let toastEle = e.element;
        let toasts = e.toastObj.element.children;
        for (let i = 0; i < toasts.length; i++) {
            let toastTitle = toasts[i].querySelector('.e-toast-title');
            let toastMessage = toasts[i].querySelector('.e-toast-message');
            if (toastTitle && toastTitle.isEqualNode(toastEle.querySelector('.e-toast-title'))) {
                return true;
            }
            if (!toastTitle && toastMessage && toastMessage.isEqualNode(toastEle.querySelector('.e-toast-message'))) {
                return true;
            }
        }
        return false;
    }
    function rendereComplete() {
        document.addEventListener('click', function (e) {
            if (!isNullOrUndefined(toastObj) && e.target !== toastBtnShow.element) {
                toastObj.hide('All');
            }
        }.bind(this));
    }
    return (<div className='control-pane'>
            <div className="col-lg-12 control-section toast-api-section">
                <div className="e-sample-resize-container">
                    <ToastComponent ref={(toast) => { toastObj = toast; }} id='toastApi' position={position} close={onclose.bind(this)} beforeOpen={onbeforeOpen.bind(this)} newestOnTop={true}></ToastComponent>
                    <div className="row">
                        <div className="col-lg-6 padding">
                            <div className="input-form">
                                <div className="e-float-input">
                                    <input id="toast_input_title" ref={toastInputTitleRef} aria-label="title" className='e-input' required/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text">Enter the title</label>
                                </div>
                            </div>
                            <div className="input-form">
                                <div className="e-float-input">
                                    <textarea className='e-input' ref={toastInputContentRef} aria-label="content" id='toast_input_content' rows={3} required></textarea>
                                    <label className="e-float-text">Enter the content</label>
                                </div>
                            </div>
                            <div className="group-form e-group">
                                <CheckBoxComponent id='closeButton' label='Show Close Button' change={closeOnChange.bind(this)}></CheckBoxComponent>
                            </div>
                            <div className="group-form e-group">
                                <CheckBoxComponent id='progressBar' label='Show Progress Bar' change={OnProgressChange.bind(this)}></CheckBoxComponent>
                            </div>
                            <div className="group-form e-group">
                                <CheckBoxComponent id='newestOnTop' checked={true} label='Newest On Top' change={closeNewestOnChange.bind(this)}></CheckBoxComponent>
                            </div>
                            <div className="group-form e-group">
                                <CheckBoxComponent id='prevDuplicates' label='Prevent Duplicates' change={OnPrevDubChange.bind(this)}></CheckBoxComponent>
                            </div>
                            <div className="group-form e-group">
                                <CheckBoxComponent id='actionButtons' label='Action Buttons' change={OnactionBtnChange.bind(this)}></CheckBoxComponent>
                            </div>
                            <div className="input-form">
                                <DropDownListComponent ref={(dropdownlist) => { dropDownListProgressDirection = dropdownlist; }} id="ProgressDirection" floatLabelType="Auto" dataSource={directionData} fields={directionFields} placeholder="ProgressDirection" change={onProgressDirection.bind(this)} value={directionValue}/>
                            </div>
                            <div className="input-form">
                                <div className="e-float-input e-input-group">
                                    <input className="e-input" id="timeOut" ref={timeOutRef} name="Digits" defaultValue="5000" required/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text">TimeOut</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 padding">
                            <div className="input-form">
                                <h1 className="h4"> Show Animation</h1>
                                <div className="e-float-input">
                                    <input className="e-input" id="showDuration" ref={showDurationRef} defaultValue="400" required/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text">Duration</label>
                                </div>
                            </div>
                            <div className="input-form">
                                <DropDownListComponent ref={(dropdownlist) => { dropDownListShowEase = dropdownlist; }} id="ShowEasing" dataSource={showData} fields={showFields} placeholder="Select an Easing" change={onShowEase.bind(this)} value={easeValue}/>
                            </div>
                            <div className="input-form">
                                <DropDownListComponent ref={(dropdownlist) => { dropDownListShow = dropdownlist; }} id="ShowAnimation" dataSource={animationData} fields={animationFields} placeholder="Select an Animation" change={showChange.bind(this)} value={animationValue}/>
                            </div>
                            <div className="input-form e-group">
                                <h2 className="h4"> Hide Animation</h2>
                                <div className="e-float-input">
                                    <input className="e-input" id="hideDuration" ref={hideDurationRef} defaultValue="400" required/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text">Duration</label>
                                </div>
                            </div>
                            <div className="input-form">
                                <DropDownListComponent ref={(dropdownlist) => { dropDownListHideEase = dropdownlist; }} id="HideEasing" dataSource={showData} fields={showFields} placeholder="Select an Easing" change={onHideEase.bind(this)} value={easeValue}/>
                            </div>
                            <div className="input-form">
                                <DropDownListComponent ref={(dropdownlist) => { dropDownListHide = dropdownlist; }} id="HideAnimation" dataSource={animationData1} fields={animationFields} placeholder="Select an Animation" change={hideChange.bind(this)} value={animationHideValue}/>
                            </div>
                        </div>
                    </div>
                    <div className="row center">
                        <ButtonComponent id='toastBtnShow' ref={(btn) => { toastBtnShow = btn; }} className='e-btn e-primary' onClick={showBtnClick.bind(this)} style={{ marginRight: '15px' }}>Show Toasts</ButtonComponent>
                        <ButtonComponent id='toastBtnHide' ref={(btn) => { toastBtnHide = btn; }} className='e-btn e-primary' onClick={hideBtnClick.bind(this)} style={{ display: 'none' }}> Hide All</ButtonComponent>
                    </div>
                </div>
            </div>
            <br />
            <div id="action-description">
                <p>This sample demonstrates all the API functionalities available in <code>Toast.</code></p>
            </div>
            <div id="description">
                <p>In this sample, with help of text inputs toast header <code>title</code> and <code>content</code> text can be provided.</p>
                <ul>
                    <li><code>Action Buttons</code> – Provide support to add a button inside toast to interact with it.</li>
                    <li><code>Prevent Duplicates</code> – Disable the user to create same toast message multiple times.</li>
                    <li><code>TimeOut</code> – Allows to set time in millisecond to close toast.</li>
                    <li><code>Progress Bar</code> – Visualizes the time out of toast as an indicator.</li>
                    <li><code>Animation</code> – Enables to define the toast show and hide animation.</li>
                    <li><code>Close button</code> – Show close button to hide toast irrespective of time out.</li>
                </ul>
                <p>More information about Toast can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/toast/getting-started/">
                    documentation section</a>.</p>
            </div>
        </div>);
}
export default Api;
