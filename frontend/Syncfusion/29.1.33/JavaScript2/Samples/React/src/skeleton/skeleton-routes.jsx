import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Animation from './animation-functional';
export const skeletonRoutes = (<>
         <Route path='/:theme/skeleton/default' Component={Default}/>
         <Route path='/:theme/skeleton/animation' Component={Animation}/>

    </>);
export const skeletonCategory = { "default": { "name": "Default Functionalities", "category": "Skeleton" }, "animation": { "name": "Animation", "category": "Skeleton" }, "defaultSample": "skeleton/default" };
