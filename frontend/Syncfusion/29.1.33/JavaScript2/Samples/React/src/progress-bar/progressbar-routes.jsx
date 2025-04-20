import { Route } from 'react-router-dom';
import * as React from 'react';
import ProgressBarLinear from './linear-functional';
import ProgressBarDefault from './circular-functional';
import ProgressBarSemiCircular from './semi-circular-functional';
import ProgressBarCustomContents from './custom-content-functional';
import ProgressBarLabels from './labels-functional';
import ProgressBarRadius from './radius-functional';
import ProgressBarLinearTooltip from './tool-tip-functional';
import ProgressBarStripes from './stripes-functional';
import ProgressBarProgressSegment from './progress-segment-functional';
export const progressbarRoutes = (<>
         <Route path='/:theme/progress-bar/linear' Component={ProgressBarLinear}/>
         <Route path='/:theme/progress-bar/circular' Component={ProgressBarDefault}/>
         <Route path='/:theme/progress-bar/semi-circular' Component={ProgressBarSemiCircular}/>
         <Route path='/:theme/progress-bar/custom-content' Component={ProgressBarCustomContents}/>
         <Route path='/:theme/progress-bar/labels' Component={ProgressBarLabels}/>
         <Route path='/:theme/progress-bar/radius' Component={ProgressBarRadius}/>
         <Route path='/:theme/progress-bar/tool-tip' Component={ProgressBarLinearTooltip}/>
         <Route path='/:theme/progress-bar/stripes' Component={ProgressBarStripes}/>
         <Route path='/:theme/progress-bar/progress-segment' Component={ProgressBarProgressSegment}/>

    </>);
export const progressbarCategory = { "linear": { "name": "Linear", "category": "Progress Bar" }, "circular": { "name": "Circular", "category": "Progress Bar" }, "semi-circular": { "name": "Angle", "category": "Progress Bar" }, "custom-content": { "name": "Custom Contents", "category": "Progress Bar" }, "labels": { "name": "Labels", "category": "Progress Bar" }, "radius": { "name": "Radius", "category": "Progress Bar" }, "tool-tip": { "name": "Tooltip", "category": "Progress Bar" }, "stripes": { "name": "Stripes", "category": "Progress Bar" }, "progress-segment": { "name": "Progress Segment", "category": "Progress Bar" }, "defaultSample": "progress-bar/linear" };
