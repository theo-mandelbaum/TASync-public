import {  Route } from 'react-router-dom';
import * as React from 'react';
import { ComboBoxSemanticSearch } from './semantic-searching';


export const aicomboboxRoutes = (
    <>
         <Route  path='/:theme/ai-combo-box/semantic-searching' Component={ ComboBoxSemanticSearch }/>

    </>
)

export const aicomboboxCategory = {"semantic-searching":{"name":"Semantic Searching (Embedding)","category":"ComboBox"},"defaultSample":"ai-combo-box/semantic-searching"}