import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functionalities-functional';
import Container from './container-functional';
import Track from './track-functional';
import Ticks from './ticks-functional';
import Labels from './labels-functional';
import Ranges from './range-functional';
import MarkerPointer from './marker-pointer-functional';
import BarPointer from './bar-pointer-functional';
import CustomPointer from './custom-pointer-functional';
import Tooltip from './tooltip-functional';
import Export from './print-export-functional';
import ProgressBar from './progress-bar-functional';
import StepProgressBar from './step-progress-bar-functional';
import Slider from './slider-functional';
import Thermometer from './thermometer-functional';
import StepsCounter from './steps-counter-functional';
import VolumeSettings from './volume-settings-functional';
import BatteryIndicator from './battery-indicator-functional';


export const lineargaugeRoutes = (
    <>
         <Route  path='/:theme/linear-gauge/default-functionalities' Component={ Default }/>
         <Route  path='/:theme/linear-gauge/container' Component={ Container }/>
         <Route  path='/:theme/linear-gauge/track' Component={ Track }/>
         <Route  path='/:theme/linear-gauge/ticks' Component={ Ticks }/>
         <Route  path='/:theme/linear-gauge/labels' Component={ Labels }/>
         <Route  path='/:theme/linear-gauge/range' Component={ Ranges }/>
         <Route  path='/:theme/linear-gauge/marker-pointer' Component={ MarkerPointer }/>
         <Route  path='/:theme/linear-gauge/bar-pointer' Component={ BarPointer }/>
         <Route  path='/:theme/linear-gauge/custom-pointer' Component={ CustomPointer }/>
         <Route  path='/:theme/linear-gauge/tooltip' Component={ Tooltip }/>
         <Route  path='/:theme/linear-gauge/print-export' Component={ Export }/>
         <Route  path='/:theme/linear-gauge/progress-bar' Component={ ProgressBar }/>
         <Route  path='/:theme/linear-gauge/step-progress-bar' Component={ StepProgressBar }/>
         <Route  path='/:theme/linear-gauge/slider' Component={ Slider }/>
         <Route  path='/:theme/linear-gauge/thermometer' Component={ Thermometer }/>
         <Route  path='/:theme/linear-gauge/steps-counter' Component={ StepsCounter }/>
         <Route  path='/:theme/linear-gauge/volume-settings' Component={ VolumeSettings }/>
         <Route  path='/:theme/linear-gauge/battery-indicator' Component={ BatteryIndicator }/>

    </>
)

export const lineargaugeCategory = {"default-functionalities":{"name":"Default Functionalities","category":"Linear Gauge"},"container":{"name":"Container","category":"Axis"},"track":{"name":"Track","category":"Axis"},"ticks":{"name":"Ticks","category":"Axis"},"labels":{"name":"Labels","category":"Axis"},"range":{"name":"Range","category":"Range"},"marker-pointer":{"name":"Marker Pointer","category":"Pointer"},"bar-pointer":{"name":"Bar Pointer","category":"Pointer"},"custom-pointer":{"name":"Custom Pointer","category":"Pointer"},"tooltip":{"name":"Tooltip","category":"User Interaction"},"print-export":{"name":"Print & Export","category":"Print & Export"},"progress-bar":{"name":"Progress Bar","category":"Use Cases"},"step-progress-bar":{"name":"Step Progress Bar","category":"Use Cases"},"slider":{"name":"Slider","category":"Use Cases"},"thermometer":{"name":"Thermometer","category":"Use Cases"},"steps-counter":{"name":"Steps Counter","category":"Use Cases"},"volume-settings":{"name":"Volume Settings","category":"Use Cases"},"battery-indicator":{"name":"Battery Indicator","category":"Use Cases"},"defaultSample":"linear-gauge/default-functionalities"}