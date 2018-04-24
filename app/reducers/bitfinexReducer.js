import ActionTypes from "../actions/actionTypes";
import Consts from "./../services/BtfxConsts";

const bitfinex = (state =
    {
        candles: [],
        setup: {
            timeFrame: Consts.timeFrame.h1,
            symbol: `t${Consts.symbol.BTCUSD}`

        }
    }, action) => {
    switch (action.type) {
    case ActionTypes.BITFINEX.CHANGE_BITFINEX_CANDLES:
        return {
            ...state,
            candles: action.payload
        };
    case ActionTypes.BITFINEX.CHANGE_BITFINEX_SETUP:
        return {
            ...state,
            setup: action.payload
        };
    default:
        return state;
    }
};

export default bitfinex;
