import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware from 'redux-saga';
import categoryReducer from '../reducers/categoryReducer';
import articlesReducer from '../reducers/articlesReducer';
import routesReducer from '../reducers/routesReducer';
import sagas from '../sagas';

const reducers = combineReducers({
    selectedCategory: categoryReducer,
    articles: articlesReducer,
    routes: routesReducer
});

const sagaMiddleware = createSagaMiddleware();
const middleWare = applyMiddleware(logger, promiseMiddleware(), sagaMiddleware);

const store = createStore(reducers, {}, middleWare);

sagaMiddleware.run(sagas)

export default store;