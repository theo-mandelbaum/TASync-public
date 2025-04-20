import { Route } from 'react-router-dom';
import * as React from 'react';
import { WeatherPrediction } from './weather-prediction';
export const aimapsRoutes = (<>
         <Route path='/:theme/ai-maps/weather-prediction' Component={WeatherPrediction}/>

    </>);
export const aimapsCategory = { "weather-prediction": { "name": "Weather Prediction", "category": "Maps" }, "defaultSample": "ai-maps/weather-prediction" };
