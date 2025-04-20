import {  Route } from 'react-router-dom';
import * as React from 'react';
import Overview from './overview-functional';
import Default from './default-functional';
import Position from './position-functional';
import Styles from './styles-functional';


export const floatingactionbuttonRoutes = (
    <>
         <Route  path='/:theme/floating-action-button/overview' Component={ Overview }/>
         <Route  path='/:theme/floating-action-button/default' Component={ Default }/>
         <Route  path='/:theme/floating-action-button/position' Component={ Position }/>
         <Route  path='/:theme/floating-action-button/styles' Component={ Styles }/>

    </>
)

export const floatingactionbuttonCategory = {"overview":{"name":"Overview","category":"Floating Action Button"},"default":{"name":"Default Functionalities","category":"Floating Action Button"},"position":{"name":"Position","category":"Floating Action Button"},"styles":{"name":"Styles","category":"Floating Action Button"},"defaultSample":"floating-action-button/overview"}