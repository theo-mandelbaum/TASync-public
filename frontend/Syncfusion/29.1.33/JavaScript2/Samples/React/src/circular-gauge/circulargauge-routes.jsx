import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functionalities-functional';
import Labels from './ticks-and-labels-functional';
import Axes from './multiple-axes-functional';
import CustomLabels from './custom-labels-functional';
import RangeColorAxis from './range-color-for-axis-functional';
import AxisBackGround from './axis-background-functional';
import Pointers from './pointer-types-functional';
import TextPointer from './text-pointer-functional';
import Image from './image-pointer-functional';
import Range from './range-customization-functional';
import MultipleRanges from './multiple-ranges-functional';
import Circle from './legend-functional';
import ArcGauge from './arc-gauge-functional';
import SemiGauge from './semi-circular-gauge-functional';
import Drag from './pointer-ranges-drag-functional';
import Tooltip from './tooltip-functional';
import Export from './print-export-functional';
import Clock from './clock-functional';
import RadialSlider from './radial-slider-functional';
import Direction from './direction-compass-functional';
import Speedometer from './speedometer-functional';
import SleepTracker from './sleep-tracker-functional';
import SampleData from './data-sample-functional';
import AppleWatchGauge from './apple-watch-rings-functional';
export const circulargaugeRoutes = (<>
         <Route path='/:theme/circular-gauge/default-functionalities' Component={Default}/>
         <Route path='/:theme/circular-gauge/ticks-and-labels' Component={Labels}/>
         <Route path='/:theme/circular-gauge/multiple-axes' Component={Axes}/>
         <Route path='/:theme/circular-gauge/custom-labels' Component={CustomLabels}/>
         <Route path='/:theme/circular-gauge/range-color-for-axis' Component={RangeColorAxis}/>
         <Route path='/:theme/circular-gauge/axis-background' Component={AxisBackGround}/>
         <Route path='/:theme/circular-gauge/pointer-types' Component={Pointers}/>
         <Route path='/:theme/circular-gauge/text-pointer' Component={TextPointer}/>
         <Route path='/:theme/circular-gauge/image-pointer' Component={Image}/>
         <Route path='/:theme/circular-gauge/range-customization' Component={Range}/>
         <Route path='/:theme/circular-gauge/multiple-ranges' Component={MultipleRanges}/>
         <Route path='/:theme/circular-gauge/legend' Component={Circle}/>
         <Route path='/:theme/circular-gauge/arc-gauge' Component={ArcGauge}/>
         <Route path='/:theme/circular-gauge/semi-circular-gauge' Component={SemiGauge}/>
         <Route path='/:theme/circular-gauge/pointer-ranges-drag' Component={Drag}/>
         <Route path='/:theme/circular-gauge/tooltip' Component={Tooltip}/>
         <Route path='/:theme/circular-gauge/print-export' Component={Export}/>
         <Route path='/:theme/circular-gauge/clock' Component={Clock}/>
         <Route path='/:theme/circular-gauge/radial-slider' Component={RadialSlider}/>
         <Route path='/:theme/circular-gauge/direction-compass' Component={Direction}/>
         <Route path='/:theme/circular-gauge/speedometer' Component={Speedometer}/>
         <Route path='/:theme/circular-gauge/sleep-tracker' Component={SleepTracker}/>
         <Route path='/:theme/circular-gauge/data-sample' Component={SampleData}/>
         <Route path='/:theme/circular-gauge/apple-watch-rings' Component={AppleWatchGauge}/>

    </>);
export const circulargaugeCategory = { "default-functionalities": { "name": "Default Functionalities", "category": "Circular Gauge" }, "ticks-and-labels": { "name": "Ticks and Labels", "category": "Axis" }, "multiple-axes": { "name": "Multiple Axes", "category": "Axis" }, "custom-labels": { "name": "Custom Labels", "category": "Axis" }, "range-color-for-axis": { "name": "Range Color for Axis", "category": "Axis" }, "axis-background": { "name": "Axis Background", "category": "Axis" }, "pointer-types": { "name": "Pointer Types", "category": "Pointer" }, "text-pointer": { "name": "Text Pointer", "category": "Pointer" }, "image-pointer": { "name": "Image Pointer", "category": "Pointer" }, "range-customization": { "name": "Range Customization", "category": "Range" }, "multiple-ranges": { "name": "Multiple Ranges", "category": "Range" }, "legend": { "name": "Legend", "category": "Range" }, "arc-gauge": { "name": "Arc Gauge", "category": "Arc Gauge" }, "semi-circular-gauge": { "name": "Semi-circular Gauge", "category": "Arc Gauge" }, "pointer-ranges-drag": { "name": "Pointer & Ranges Drag", "category": "User Interaction" }, "tooltip": { "name": "Tooltip", "category": "User Interaction" }, "print-export": { "name": "Print & Export", "category": "Print & Export" }, "clock": { "name": "Clock", "category": "Use Cases" }, "radial-slider": { "name": "Radial Slider", "category": "Use Cases" }, "direction-compass": { "name": "Direction Compass", "category": "Use Cases" }, "speedometer": { "name": "Speedometer", "category": "Use Cases" }, "sleep-tracker": { "name": "Sleep Tracker", "category": "Use Cases" }, "data-sample": { "name": "Data Sample", "category": "Use Cases" }, "apple-watch-rings": { "name": "Apple Watch Rings", "category": "Use Cases" }, "defaultSample": "circular-gauge/default-functionalities" };
