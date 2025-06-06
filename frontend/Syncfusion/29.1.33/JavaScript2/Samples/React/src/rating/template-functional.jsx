import * as React from 'react';
import { Fragment, useEffect } from "react";
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import './template.css';
const Template = () => {
    useEffect(() => {
        updateSampleSection();
        const hideTooltipOnScroll = () => {
            const tooltipElement = document.querySelector('.e-rating-tooltip');
            if (tooltipElement && Browser.isDevice) {
                tooltipElement.style.display = 'none';
            }
        };
        const rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', hideTooltipOnScroll);
        }
        return () => {
            if (rightPane) {
                rightPane.removeEventListener('scroll', hideTooltipOnScroll);
            }
        };
    }, []);
    const emptyFont = () => {
        return (<Fragment><span className='custom-font rating-icon-heart'></span></Fragment>);
    };
    const fullFont = () => {
        return (<Fragment><span className='custom-font rating-icon-heart'></span></Fragment>);
    };
    const emptyTemplate = () => {
        return (<>
            <svg width="35" height="25" className="e-rating-svg-icon">
                <rect width="35" height="25" fill="transparent" strokeWidth="2" stroke="rgb(173,181,189)"/>
            </svg>
            </>);
    };
    const fullTemplate = (props) => {
        return (<svg width="35" height="25" className="e-rating-svg-icon">
                <defs>
                    <linearGradient id={`grad${props.index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop className="start" offset="0%"/>
                        <stop className="end" offset="100%"/>
                    </linearGradient>
                </defs>
                <rect width="35" height="25" fill={`url(#grad${props.index})`} strokeWidth="2" stroke="rgb(173,181,189)"/>
            </svg>);
    };
    const template = (props) => {
        if (props.index === 0) {
            return (<><span className='angry emoji'>&#128545;</span></>);
        }
        else if (props.index === 1) {
            return (<><span className='disagree emoji'>&#128577;</span></>);
        }
        else if (props.index === 2) {
            return (<><span className='neutral emoji'>&#128528;</span></>);
        }
        else if (props.index === 3) {
            return (<><span className='agree emoji'>&#128578;</span></>);
        }
        else {
            return (<><span className='happy emoji'>&#128512;</span></>);
        }
    };
    return (<div className='control-pane'>
            <div id="template-rating-control">
                <div className="rating-content">
                    <label>Font Icon</label><br />
                    <RatingComponent id='rating1' emptyTemplate={emptyFont} fullTemplate={fullFont} value={3.0}></RatingComponent>
                </div>
                <div className="rating-content custom-svg">
                    <label>SVG Icon</label><br />
                    <RatingComponent id='rating2' emptyTemplate={emptyTemplate} fullTemplate={fullTemplate} enableAnimation={false} value={3.0}></RatingComponent>
                </div>
                <div className="rating-content">
                    <label>Emoji Icon</label><br />
                    <RatingComponent id='rating3' emptyTemplate={template} enableAnimation={false} enableSingleSelection={true} value={3.0}></RatingComponent>
                </div>
                <div className="rating-content">
                    <label>Customization</label><br />
                    <RatingComponent id='rating4' cssClass='custom-icon' enableAnimation={false} value={3.0}></RatingComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates customization of rating items using templates in the Angular Rating component.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, rating item stars are customized using <code>emptyTemplate</code>, which defines the unrated items appearance, and <code>fullTemplate</code>, which defines the rated items appearance. 
                </p>
            </div>
        </div>);
};
export default Template;
