import { Component, ViewChild } from '@angular/core';
import { ProgressButton, SpinSettings, AnimationSettings } from '@syncfusion/ej2-angular-splitbuttons';

/**
 * Toolbar integration Menu Controller
 */
@Component({
    selector: '<%=dasherize(selector)%>',
    templateUrl: '<%=dasherize(name)%>.component.html',
    styleUrls: ['<%=dasherize(name)%>.component.css']
})

export class <%= classify(name) %>Component {
    @ViewChild('contractBtn')
    public contractBtn: ProgressButton;
    public spinRight: SpinSettings = { position: 'Right' };
    public spinTop: SpinSettings = { position: 'Top' };
    public spinBottom: SpinSettings = { position: 'Bottom' };
    public spinCenter: SpinSettings = { position: 'Center' };
    public zoomOut: AnimationSettings = { effect: 'ZoomOut' };
    public slideLeft: AnimationSettings = { effect: 'SlideLeft' };
    public slideRight: AnimationSettings = { effect: 'SlideRight' };
    public zoomIn: AnimationSettings = { effect: 'ZoomIn' };

    public contractBegin() {
        this.contractBtn.element.classList.add('e-round');
    }

    public contractEnd() {
        this.contractBtn.element.classList.remove('e-round');
    }
}
