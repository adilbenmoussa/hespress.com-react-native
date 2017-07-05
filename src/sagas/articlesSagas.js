import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { queryBySearchedText } from '../config/api';
import { actionTypes } from '../reducers/articlesReducer';

const query = async (searchedText) => {
    const response = await axios(queryBySearchedText(searchedText));
    return response.data.articles;
}

// Worker Saga
export function* searchArticles(action) {
    const searchedText = action.payload;
    try {
        yield put({
            type: actionTypes.SEARCH_ARTICLES_PENDING
        });
        const response = yield call(query, searchedText);
        yield put({
            type: actionTypes.SEARCH_ARTICLES_FULFILLED,
            payload: response || []
        })
    } catch (error) {
        yield put({
            type: actionTypes.SEARCH_ARTICLES_REJECTED,
            payload: error
        });
    }

}