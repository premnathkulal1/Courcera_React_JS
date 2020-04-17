import { DISHES } from '../shared/dishesh';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

export const initialState = {
        dishesh: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
};

export const Reducer = (state = initialState, action) => {
    return state;
};