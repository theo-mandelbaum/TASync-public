import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Types from './types-functional';
import Badge from './badge-functional';
import Listview from './listview-functional';
import Card from './card-functional';


export const avatarRoutes = (
    <>
         <Route  path='/:theme/avatar/default' Component={ Default }/>
         <Route  path='/:theme/avatar/types' Component={ Types }/>
         <Route  path='/:theme/avatar/badge' Component={ Badge }/>
         <Route  path='/:theme/avatar/listview' Component={ Listview }/>
         <Route  path='/:theme/avatar/card' Component={ Card }/>

    </>
)

export const avatarCategory = {"default":{"name":"Default","category":"Avatar"},"types":{"name":"Types","category":"Avatar"},"badge":{"name":"Badge","category":"Integration"},"listview":{"name":"ListView","category":"Integration"},"card":{"name":"Card","category":"Integration"},"defaultSample":"avatar/default"}