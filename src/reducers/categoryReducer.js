const actionTypes = {
    SELECT_CATEGORY: 'CATEGORY/SELECT_CATEGORY'
};

export default function reducer(state = {}, action) {
    switch(action.type) {
        case actionTypes.SELECT_CATEGORY: 
            return action.payload;
        default: 
            return state;
    }   
}

export const actionCreators = {
    select: (category) => ({
        type: actionTypes.SELECT_CATEGORY,
        payload: category
    })
}