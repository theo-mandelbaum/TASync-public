import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import OtpAPI from './api-functional';


export const otpinputRoutes = (
    <>
         <Route  path='/:theme/otp-input/default' Component={ Default }/>
         <Route  path='/:theme/otp-input/api' Component={ OtpAPI }/>

    </>
)

export const otpinputCategory = {"default":{"name":"Default Functionalities","category":"OTP Input"},"api":{"name":"API","category":"OTP Input"},"defaultSample":"otp-input/default"}