import ActionTypes from "../actions/actionTypes";
import Consts from "./../services/BtfxConsts";
import {parseBtfxCandle} from "../services/BtfcUtils/BtfxUtils";

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
    case ActionTypes.BITFINEX.ADD_NEW_CANDLES_PACKAGE: {
        const newCandles = action.payload.slice(0).reverse().map(candle => parseBtfxCandle(candle));

        return {
            ...state,
            candles: [...newCandles, ...state.candles]
        };
    }
    default:
        return state;
    }
};

export default bitfinex;
