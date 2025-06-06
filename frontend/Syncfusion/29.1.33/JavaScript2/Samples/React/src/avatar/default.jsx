import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './default.css';
// tslint:disable:max-line-length
// *  Sample for CSS avatar component
export class Default extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <div className="sample_container avatar-default">

                    <div className="avatar-block">
                        <div className="e-card e-avatar-showcase">
                            <div className="e-card-content">
                                {/* <!-- xSmall Avatar--> */}
                                <div className="e-avatar e-avatar-xsmall image"></div>
                                {/* <!-- Small Avatar--> */}
                                <div className="e-avatar e-avatar-small image"></div>
                                {/* <!-- Avatar--> */}
                                <div className="e-avatar image"></div>
                                {/* <!-- Large Avatar--> */}
                                <div className="e-avatar e-avatar-large image"></div>
                                {/* <!-- xLarge Avatar--> */}
                                <div className="e-avatar e-avatar-xlarge image"></div>
                            </div>
                            <div className="e-card-content">
                                <div>Default</div>
                            </div>
                        </div>
                    </div>

                    <div className="circleAvatar avatar-block">
                        <div className="e-card e-avatar-showcase">
                            <div className="e-card-content">
                                {/* <!-- xSmall Circle Avatar--> */}
                                <div className="e-avatar e-avatar-xsmall e-avatar-circle image"></div>
                                {/* <!-- Small Circle Avatar--> */}
                                <div className="e-avatar e-avatar-small e-avatar-circle image"></div>
                                {/* <!-- Circle Avatar--> */}
                                <div className="e-avatar e-avatar-circle image"></div>
                                {/* <!-- Large Circle Avatar--> */}
                                <div className="e-avatar e-avatar-large e-avatar-circle image"></div>
                                {/* <!-- xLarge Circle Avatar--> */}
                                <div className="e-avatar e-avatar-xlarge e-avatar-circle image"></div>
                            </div>
                            <div className="e-card-content">
                                <div>Circle</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the default avatar and circle avatar in which the
        <code>.e-avatar</code> and
        <code>.e-avatar-circle</code> classes should be added, respectively to the target element.</p>
                </div>

                <div id="description">
                <p>The avatar is developed in pure CSS which is used to represents the profile picture or initials or icons in presentable way. It comes with two different shapes, they are listed below.</p>
                    <ul>
                        <li>Default avatar: To apply default avatar, add the
            <code>.e-avatar</code> class to the target element.</li>
                        <li>Circle avatar: To apply circle avatar, add the
            <code>.e-avatar-circle</code> class to the target element.</li>
                    </ul>
                    <p>The avatar comes with 5 different sizes, and are applied through modifier classes. They are:</p>
                    <ul>
                        <li>xSmall avatar: This can be applied by adding
            <code>.e-avatar-</code> class.</li>
                        <li>Small avatar: This can be applied by adding
            <code>.e-avatar-small</code> class.</li>
                        <li>Default avatar: This can be applied by adding
            <code>.e-avatar</code> class. No additional class is needed for this.</li>
                        <li>Large avatar: This can be applied by adding
            <code>.e-avatar-large</code> class.</li>
                        <li>xLarge avatar: This can be applied by adding
            <code>.e-avatar-xlarge</code> class.</li>
                    </ul>
                    <p>
                        <i>The
            <code>.e-avatar</code> is the main class, which should be included in the target element to use any of the other avatar features.</i>
                    </p>
                    <p>The images can be added in the following two different ways to the avatar:</p>
                    <ul>
                        <li>Using CSS
            <code>background</code> property on the avatar element. It doesn’t require any additional element.</li>
                        <li>Using image tag. The image tag needs to be wrapped by the avatar element.</li>
                    </ul>
                </div>
            </div>);
    }
}
