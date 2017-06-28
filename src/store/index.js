import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import categoryReducer from '../reducers/categoryReducer';
import articlesReducer from '../reducers/articlesReducer';

const reducers = combineReducers({
    selectedCategory: categoryReducer,
    articles: articlesReducer
});


const middleWare = applyMiddleware(logger, promiseMiddleware());

const store = createStore(reducers, {}, middleWare);

export default store;