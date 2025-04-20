import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Ticks from './ticks-functional';
import Tooltip from './tooltip-functional';
import Orientation from './orientation-functional';
import Format from './format-functional';
import Limits from './limits-functional';
import APIs from './api-functional';
import Events from './events-functional';
import Thumb from './thumb-customization-functional';
import Bar from './selection-bar-customization-functional';
import TicksCustomization from './ticks-customization-functional';
import TooltipCustomization from './tooltip-customization-functional';
import Cloudpricing from './azure-pricing-functional';


export const rangesliderRoutes = (
    <>
         <Route  path='/:theme/range-slider/default' Component={ Default }/>
         <Route  path='/:theme/range-slider/ticks' Component={ Ticks }/>
         <Route  path='/:theme/range-slider/tooltip' Component={ Tooltip }/>
         <Route  path='/:theme/range-slider/orientation' Component={ Orientation }/>
         <Route  path='/:theme/range-slider/format' Component={ Format }/>
         <Route  path='/:theme/range-slider/limits' Component={ Limits }/>
         <Route  path='/:theme/range-slider/api' Component={ APIs }/>
         <Route  path='/:theme/range-slider/events' Component={ Events }/>
         <Route  path='/:theme/range-slider/thumb-customization' Component={ Thumb }/>
         <Route  path='/:theme/range-slider/selection-bar-customization' Component={ Bar }/>
         <Route  path='/:theme/range-slider/ticks-customization' Component={ TicksCustomization }/>
         <Route  path='/:theme/range-slider/tooltip-customization' Component={ TooltipCustomization }/>
         <Route  path='/:theme/range-slider/azure-pricing' Component={ Cloudpricing }/>

    </>
)

export const rangesliderCategory = {"default":{"name":"Default Functionalities","category":"Range Slider"},"ticks":{"name":"Ticks","category":"Range Slider"},"tooltip":{"name":"Tooltip","category":"Range Slider"},"orientation":{"name":"Vertical Orientation","category":"Range Slider"},"format":{"name":"Formatting","category":"Range Slider"},"limits":{"name":"Limits","category":"Range Slider"},"api":{"name":"API","category":"Range Slider"},"events":{"name":"Events","category":"Range Slider"},"thumb-customization":{"name":"Thumb","category":"Customization"},"selection-bar-customization":{"name":"Bar","category":"Customization"},"ticks-customization":{"name":"Ticks","category":"Customization"},"tooltip-customization":{"name":"Tooltip","category":"Customization"},"azure-pricing":{"name":"Cloud Pricing","category":"Use Case"},"defaultSample":"range-slider/default"}