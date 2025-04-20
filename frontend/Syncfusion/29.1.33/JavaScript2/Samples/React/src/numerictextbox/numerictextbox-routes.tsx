import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Range from './range-validation-functional';
import Format from './custom-format-functional';
import Restrict from './restrict-decimals-functional';


export const numerictextboxRoutes = (
    <>
         <Route  path='/:theme/numerictextbox/default' Component={ Default }/>
         <Route  path='/:theme/numerictextbox/range-validation' Component={ Range }/>
         <Route  path='/:theme/numerictextbox/custom-format' Component={ Format }/>
         <Route  path='/:theme/numerictextbox/restrict-decimals' Component={ Restrict }/>

    </>
)

export const numerictextboxCategory = {"default":{"name":"Default Functionalities","category":"Numeric Textbox"},"range-validation":{"name":"Range Validation","category":"Numeric Textbox"},"custom-format":{"name":"Custom Format","category":"Numeric Textbox"},"restrict-decimals":{"name":"Restrict Decimals","category":"Numeric Textbox"},"defaultSample":"numerictextbox/default"}