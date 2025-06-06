import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './default.css';
const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    return (<div className='control-pane'>
            <div className='control-section default badge-samples'>
                <div className="sample_container badge-default">
                    <div className="e-btn-group e-custom-button">
                        <button id="update" className="e-btn">Updates
                            {/* Notification Badge */}
                            <span className="e-badge e-badge-info e-badge-notification e-badge-overlap">14</span>
                        </button>
                        <button id="task" className="e-btn">Tasks
                            {/* Notification Badge */}
                            <span className="e-badge e-badge-success e-badge-notification e-badge-overlap">48</span>
                        </button>
                        <button id="notify" className="e-btn">Notifications
                            {/* Notification Badge */}
                            <span className="e-badge e-badge-secondary e-badge-notification e-badge-overlap">99</span>
                        </button>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the badge. To apply the badge, add
                    <code>.e-badge</code> class to the target element.</p>
            </div>

            <div id="description">
                <p>
                    The Badge is a component which is developed in pure CSS and designed in
                    <code>em</code> relative units, so that badge will always be in relevant to the parent and makes the badge super easy to customize.
                </p>
                <p>For example, to increase the size of the badge, increase the font-size, width, and height.</p>
                <p>There are 6 different types of badges as follows: </p>
                <ul>
                    <li>Default badge: To get the default badge, add the
                        <code>.e-badge</code> class to the target element.
                    </li>
                    <li>Notification badge: To get the notification badge, add the
                        <code>.e-badge-notification</code> class with
                        <code>.e-badge</code> and change the wrapper element to
                        <code>position: relative</code> property.
                    </li>
                    <li>Circle badge: To get the circle badge, add the
                        <code>.e-badge-circle</code> class with
                        <code>.e-badge</code>.
                    </li>
                    <li>Pill badge: To get the pill badge, add the
                        <code>.e-badge-pill</code> class with
                        <code>.e-badge</code>.
                    </li>
                    <li>Dot badge: To get the dot badge, add the
                        <code>.e-badge-dot</code> class with
                        <code>.e-badge</code> and change the wrapper element to
                        <code>position: relative</code> property.
                    </li>
                </ul>
                <p>The badge component supports two positions, and this is applicable only to notification and dot badge.</p>
                <ul>
                    <li>Top: It is the default position, so there is no additional class needed for the top position.</li>
                    <li>Bottom: To get the bottom badge, add the
                        <code>.e-badge-bottom</code> class with
                        <code>.e-badge</code>.</li>
                </ul>
            </div>
        </div>);
};
export default Default;
