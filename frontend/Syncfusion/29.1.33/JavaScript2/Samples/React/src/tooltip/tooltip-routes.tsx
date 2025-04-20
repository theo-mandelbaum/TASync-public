import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import TemplateTooltip from './template-functional';
import { AjaxContentTooltip } from './ajaxcontent';
import DraggableTooltip from './smartposition-functional';
import TooltipMenu from './tooltip-menu-functional';
import HtmlContentTooltip from './html-content-functional';
import ApiTooltip from './api-functional';


export const tooltipRoutes = (
    <>
         <Route  path='/:theme/tooltip/default' Component={ Default }/>
         <Route  path='/:theme/tooltip/template' Component={ TemplateTooltip }/>
         <Route  path='/:theme/tooltip/ajaxcontent' Component={ AjaxContentTooltip }/>
         <Route  path='/:theme/tooltip/smartposition' Component={ DraggableTooltip }/>
         <Route  path='/:theme/tooltip/tooltip-menu' Component={ TooltipMenu }/>
         <Route  path='/:theme/tooltip/html-content' Component={ HtmlContentTooltip }/>
         <Route  path='/:theme/tooltip/api' Component={ ApiTooltip }/>

    </>
)

export const tooltipCategory = {"default":{"name":"Default Functionalities","category":"Tooltip"},"template":{"name":"Template","category":"Tooltip"},"ajaxcontent":{"name":"Ajax Content","category":"Tooltip"},"smartposition":{"name":"Smart Positioning","category":"Tooltip"},"tooltip-menu":{"name":"Tooltip Menu","category":"Tooltip"},"html-content":{"name":"HTML Content","category":"Tooltip"},"api":{"name":"API","category":"Tooltip"},"defaultSample":"tooltip/default"}