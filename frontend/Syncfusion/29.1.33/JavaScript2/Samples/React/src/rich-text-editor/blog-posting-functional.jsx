/**
 * Rich Text Editor usecase sample
 */
import * as React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, Image, Link, QuickToolbar, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-react-richtexteditor';
import { updateSampleSection } from '../common/sample-base';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import './blog-posting.css';
function Forums() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let rteObj;
    let answerSectionEle;
    let answerSectionRef = (element) => {
        answerSectionEle = element;
    };
    let answerCountEle;
    let answerCountRef = (element) => {
        answerCountEle = element;
    };
    let answerEle;
    let answerRef = (element) => {
        answerEle = element;
    };
    function resetMessage() {
        let answerElement = rteObj.contentModule.getEditPanel();
        answerElement.innerHTML = '';
        rteObj.value = '';
        rteObj.refresh();
    }
    function postMessage() {
        let empCount = 0;
        let answerElement = rteObj.contentModule.getEditPanel();
        let comment = rteObj.getHtml();
        let empList = ['emp1', 'emp2', 'emp3'];
        let nameListList = ['Anne Dodsworth', 'Janet Leverling', 'Laura Callahan'];
        if (comment !== null && comment.trim() !== '' && (answerElement.innerText.trim() !== '' ||
            !isNOU(answerElement.querySelector('img')) || !isNOU(answerElement.querySelector('table')))) {
            let answer = answerEle;
            let cloneAnswer = answer.cloneNode(true);
            let authorName = cloneAnswer.querySelector('.authorname');
            let logo = cloneAnswer.querySelector('.logos');
            logo.classList.remove('logos');
            if (empCount < 3) {
                logo.classList.add(empList[empCount]);
                logo.classList.add('blog-avatar');
                authorName.innerHTML = nameListList[empCount];
                empCount++;
            }
            else {
                logo.classList.add('logo');
                logo.classList.add('blog-avatar');
                authorName.innerHTML = 'User';
            }
            let timeZone = cloneAnswer.querySelector('.detailsAnswer');
            let day = getMonthName(new Date().getMonth()) + ' ' + new Date().getDate();
            let hr = new Date().getHours() + ':' + new Date().getMinutes();
            if (new Date().getHours() > 12) {
                hr = hr + ' PM';
            }
            else {
                hr = hr + ' AM';
            }
            timeZone.innerHTML = 'Answered on ' + day + ', ' + new Date().getFullYear() + ' ' + hr;
            let postContent = cloneAnswer.querySelector('.posting');
            postContent.innerHTML = comment;
            let postElement = answerSectionEle;
            postElement.appendChild(cloneAnswer);
            let countEle = answerCountEle;
            let count = parseInt(countEle.innerHTML, null);
            count = count + 1;
            countEle.innerHTML = count.toString() + ' Answers';
            answerElement.innerHTML = '';
            rteObj.value = '';
            rteObj.refresh();
        }
    }
    function getMonthName(index) {
        let month = [];
        month[0] = 'January';
        month[1] = 'February';
        month[2] = 'March';
        month[3] = 'April';
        month[4] = 'May';
        month[5] = 'June';
        month[6] = 'July';
        month[7] = 'August';
        month[8] = 'September';
        month[9] = 'October';
        month[10] = 'November';
        month[11] = 'December';
        return month[index];
    }
    return (<div className='control-pane'>
            <div className="control-section" id="rteUseCase">
                <div className="control-wrapper">
                    <div className='forum'>
                        <div className='questionSection'>
                            <div className='raiser'>
                                <table>
                                    <tr>
                                        <td>
                                            <div className='questionar blog-avatar'> </div>
                                        </td>
                                        <td>
                                            <div className='Questionarname'>Kimberly</div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='questionHeader'>
                                <div className='header'>
                                    How to add a custom item to the toolbar of Rich Text Editor
                                </div>
                                <div className='detailsQuestion'>Posted on May 7, 2018 6.10 PM</div>
                                <div className='explain'>
                                    I want to add a custom icon, “code-mirror” to the toolbar of Rich Text Editor and display the Rich Text Editor content in code-mirror format.
                                </div>
                                <div className='tags'>
                                    <div className='tagSection'>
                                        <table>
                                            <tr>
                                                <td>
                                                    <div className='tag'> HTML </div>
                                                </td>
                                                <td>
                                                    <div className='tag'> JavaScript </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div className='questionLikes'>
                                        <table>
                                            <tr>
                                                <td>
                                                    <span className='e-icon e-like questionSide'>
                                                        <img className='e-icon' src='./src/rich-text-editor/images/like.svg' alt='like'/>
                                                        <span>Like</span>
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className='e-icon e-dislike'>
                                                        <img className='e-icon' src='./src/rich-text-editor/images/dislike.svg' alt='dislike'/>
                                                        <span>Dislike</span>
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='answerSection' ref={answerSectionRef}>
                            <div className='answerCount' ref={answerCountRef}>1 Answer</div>
                            <div className='answer' ref={answerRef}>
                                <table>
                                    <tr>
                                        <td rowSpan={2}>
                                            <div className='logos blog-avatar'> </div>
                                        </td>
                                        <td>
                                            <div className='authorname'>Mabel Weber</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='detailsAnswer'>Answered on May 7, 2018 6.30 PM</div>
                                        </td>
                                    </tr>
                                </table>
                                <div className='posting'>
                                    To add a custom icon <b>code-mirror</b> to the toolbar, you have to use template option of the <b>toolbarSettings</b>. To know more about adding custom icons, refer to <a href='https://ej2.syncfusion.com/home/' target='_blank'>custom tool</a> sample of Rich Text Editor.
                                </div>
                                <div className='likeAnswer'>
                                    <table>
                                        <tr>
                                            <td>
                                                <span className='e-icon e-like'>
                                                    <img className='e-icon' src='./src/rich-text-editor/images/like.svg'/>
                                                    <span>Like</span>
                                                </span>
                                            </td>
                                            <td>
                                                <span className='e-icon e-dislike'>
                                                    <img className='e-icon' src='./src/rich-text-editor/images/dislike.svg'/>
                                                    <span>Dislike</span>
                                                </span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div id="createpostholder">
                            <form>
                                <RichTextEditorComponent id="blogpost" ref={(richtexteditor) => { rteObj = richtexteditor; }}>
                                    <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio]}/>
                                </RichTextEditorComponent>
                                <div id='buttonSection'>
                                    <ButtonComponent id="rteCancel" onClick={resetMessage.bind(this)} type='button'>Cancel</ButtonComponent>
                                    <ButtonComponent id="rteSubmit" onClick={postMessage.bind(this)} cssClass='e-primary' type='button'>Reply</ButtonComponent>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates how to design forum application using Rich Text Editor. You can type the content and click reply
                    button to post it. </p>
            </div>

            <div id="description">
                <p>Rich Text Editor is a WYSIWYG editing control which will reduce the effort for users while trying to express their formatting
                    word content as HTML or Markdown format. So, Rich Text Editor can easily customized to use for blog posting, forums
                    as an editor for response.</p>
                <p><b>Injecting Module</b></p>
                <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject <code>Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup</code> modules into the services.</p>
            </div>
        </div>);
}
export default Forums;
