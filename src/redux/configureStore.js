import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotions';
import thunk from 'redux-thunk';
import logger from  'redux-logger';
import  { createForms } from 'react-redux-form';
import { InitialFeedback } from './Forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishesh: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}