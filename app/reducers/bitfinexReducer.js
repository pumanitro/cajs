import ActionTypes from "../actions/actionTypes";

const bitfinex = (state =
    {
        candles: null
    }, action) => {
    switch (action.type) {
    case ActionTypes.BITFINEX.CHANGE_BITFINEX_CANDLES:
        return {...state, candles: action.payload};
    default:
        return state;
    }
};

export default bitfinex;
