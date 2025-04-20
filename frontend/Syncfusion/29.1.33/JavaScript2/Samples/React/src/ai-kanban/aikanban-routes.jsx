import { Route } from 'react-router-dom';
import * as React from 'react';
import { TaskRecommendation } from './task-recommendation';
import { SentimentAnalysis } from './sentiment-analysis';
export const aikanbanRoutes = (<>
         <Route path='/:theme/ai-kanban/task-recommendation' Component={TaskRecommendation}/>
         <Route path='/:theme/ai-kanban/sentiment-analysis' Component={SentimentAnalysis}/>

    </>);
export const aikanbanCategory = { "task-recommendation": { "name": "AITask Recommendation", "category": "Kanban" }, "sentiment-analysis": { "name": "Sentiment Analysis", "category": "Kanban" }, "defaultSample": "ai-kanban/task-recommendation" };
