import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import DataBinding from './data-binding-functional';
import Templates from './templates-functional';
import PartialVisible from './partial-visible-functional';
import IndicatorType from './indicator-type-functional';
import KeyboardNavigation from './keyboard-navigation-functional';
import API from './api-functional';


export const carouselRoutes = (
    <>
         <Route  path='/:theme/carousel/default' Component={ Default }/>
         <Route  path='/:theme/carousel/data-binding' Component={ DataBinding }/>
         <Route  path='/:theme/carousel/templates' Component={ Templates }/>
         <Route  path='/:theme/carousel/partial-visible' Component={ PartialVisible }/>
         <Route  path='/:theme/carousel/indicator-type' Component={ IndicatorType }/>
         <Route  path='/:theme/carousel/keyboard-navigation' Component={ KeyboardNavigation }/>
         <Route  path='/:theme/carousel/api' Component={ API }/>

    </>
)

export const carouselCategory = {"default":{"name":"Default Functionalities","category":"Carousel"},"data-binding":{"name":"Data Binding","category":"Carousel"},"templates":{"name":"Templates","category":"Carousel"},"partial-visible":{"name":"Partial Visible","category":"Carousel"},"indicator-type":{"name":"Indicator Type","category":"Carousel"},"keyboard-navigation":{"name":"Keyboard Navigation","category":"Carousel"},"api":{"name":"API","category":"Carousel"},"defaultSample":"carousel/default"}