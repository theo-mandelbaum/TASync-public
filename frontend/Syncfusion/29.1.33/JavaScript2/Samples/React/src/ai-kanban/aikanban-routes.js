"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aikanbanCategory = exports.aikanbanRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var task_recommendation_1 = require("./task-recommendation");
var sentiment_analysis_1 = require("./sentiment-analysis");
exports.aikanbanRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-kanban/task-recommendation', Component: task_recommendation_1.TaskRecommendation }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-kanban/sentiment-analysis', Component: sentiment_analysis_1.SentimentAnalysis })));
exports.aikanbanCategory = { "task-recommendation": { "name": "AITask Recommendation", "category": "Kanban" }, "sentiment-analysis": { "name": "Sentiment Analysis", "category": "Kanban" }, "defaultSample": "ai-kanban/task-recommendation" };
