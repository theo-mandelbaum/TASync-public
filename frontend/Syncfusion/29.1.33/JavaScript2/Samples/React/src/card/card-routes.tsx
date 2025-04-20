import {  Route } from 'react-router-dom';
import * as React from 'react';
import Basic from './basic-functional';
import Vertical from './vertical-functional';
import Horizontal from './horizontal-functional';
import Swipeable from './swipeable-functional';
import Flip from './flip-functional';
import Reveal from './reveal-functional';
import Tile from './tile-functional';


export const cardRoutes = (
    <>
         <Route  path='/:theme/card/basic' Component={ Basic }/>
         <Route  path='/:theme/card/vertical' Component={ Vertical }/>
         <Route  path='/:theme/card/horizontal' Component={ Horizontal }/>
         <Route  path='/:theme/card/swipeable' Component={ Swipeable }/>
         <Route  path='/:theme/card/flip' Component={ Flip }/>
         <Route  path='/:theme/card/reveal' Component={ Reveal }/>
         <Route  path='/:theme/card/tile' Component={ Tile }/>

    </>
)

export const cardCategory = {"basic":{"name":"Basic Card","category":"Cards"},"vertical":{"name":"Vertical Card","category":"Cards"},"horizontal":{"name":"Horizontal Card","category":"Cards"},"swipeable":{"name":"Swipeable Card","category":"Cards"},"flip":{"name":"Flip Card","category":"Cards"},"reveal":{"name":"Reveal Card","category":"Cards"},"tile":{"name":"Tile View","category":"Cards"},"defaultSample":"card/basic"}