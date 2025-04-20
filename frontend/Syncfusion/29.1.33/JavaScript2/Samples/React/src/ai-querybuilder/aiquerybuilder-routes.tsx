import {  Route } from 'react-router-dom';
import * as React from 'react';
import { NaturalLanguageQuery } from './natural-language-query';


export const aiquerybuilderRoutes = (
    <>
         <Route  path='/:theme/ai-querybuilder/natural-language-query' Component={ NaturalLanguageQuery }/>

    </>
)

export const aiquerybuilderCategory = {"natural-language-query":{"name":"Natural Language Query","category":"Query Builder"},"defaultSample":"ai-querybuilder/natural-language-query"}