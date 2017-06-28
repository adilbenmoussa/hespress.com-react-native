// "http://www.hespress.com/json/clean_box_article_list?search_limit=20&search_before_after=1&search_sort_by=most_commented&search_search_date=1&search_order=descending&pg=1"

import { isNil } from 'lodash';
const API_ENTRY_POINT = 'http://www.hespress.com/json/clean_box_article_list';

export const queryByCategory = (category) => {
    let queryPart;

    if(isNil(category.query_params)) {
        queryPart = `search_cid=${category.id}`
    } else {
        queryPart = category.query_params
    }

    const query = `${API_ENTRY_POINT}?${queryPart}&search_sort_by=created&pg=1&search_limit=20`
    console.log('query', query);
    return query;
}