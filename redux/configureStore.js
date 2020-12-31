import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { meditationstatus } from './meditationstatus';
import { promotions } from './promotions';
import { profiles } from './leaders';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            meditationstatus,
            promotions,
            profiles
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}