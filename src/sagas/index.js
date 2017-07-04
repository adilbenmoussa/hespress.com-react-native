import {all, takeLatest } from 'redux-saga/effects';
import { actionTypes } from '../reducers/articlesReducer';
import { searchArticles } from './articlesSagas';


export default function* rootSaga() {
    yield all([
        takeLatest(actionTypes.SEARCH_ARTICLES, searchArticles)
    ]);
}