import axios from 'axios';
import { queryByCategory } from '../config/api';

export const actionTypes = {
    GET_ARTICLES: 'ARTICLES/GET_ARTICLES',
    GET_ARTICLES_PENDING: 'ARTICLES/GET_ARTICLES_PENDING',
    GET_ARTICLES_FULFILLED: 'ARTICLES/GET_ARTICLES_FULFILLED',
    GET_ARTICLES_REJECTED: 'ARTICLES/GET_ARTICLES_REJECTED',
    SEARCH_ARTICLES_PENDING: 'ARTICLES/SEARCH_ARTICLES_PENDING',
    SEARCH_ARTICLES: 'ARTICLES/SEARCH_ARTICLES',
    SEARCH_ARTICLES_FULFILLED: 'ARTICLES/SEARCH_ARTICLES_FULFILLED',
    SEARCH_ARTICLES_REJECTED: 'ARTICLES/SEARCH_ARTICLES_REJECTED',
};

const initialState = {
    isPending: false,
    articles: [],
    searchedArticles: [],
    error: null
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ARTICLES_PENDING:
            return {
                ...state,
                articles: [],
                isPending: true
            }
        case actionTypes.GET_ARTICLES_FULFILLED:
            return {
                ...state,
                isPending: false,
                articles: action.payload
            }
        case actionTypes.GET_ARTICLES_REJECTED:
            return {
                ...state,
                isPending: false,
                error: action.payload
            }
        case actionTypes.SEARCH_ARTICLES_PENDING:
            return {
                ...state,
                searchedArticles: [],
                isPending: true
            }
        case actionTypes.SEARCH_ARTICLES_FULFILLED:
            return {
                ...state,
                isPending: false,
                searchedArticles: action.payload
            }
        case actionTypes.GET_ARTICLES_REJECTED:
            return {
                ...state,
                isPending: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const actionCreators = {
    getArticles: (category) => ({
        type: actionTypes.GET_ARTICLES,
        payload: axios
            .get(queryByCategory(category))
            .then((result) => result.data.articles)
    }),
    searchArticles: (searchedText) => ({
        type: actionTypes.SEARCH_ARTICLES,
        payload: searchedText
    })
};

