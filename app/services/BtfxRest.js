import axios from 'axios';
import {dateToTimeStamp} from "./BtfxUtils";

class BtfxRest {

    REST_URL = 'https://api.bitfinex.com/v2/';
    MAX_CANDLES_AMOUNT = 1000;

    getCandles = (timeFrame, symbol, dateStart, dateEnd) => {

        // 1388534400000

        axios
            .get(`${this.REST_URL}candles/trade:${timeFrame}:${symbol}/hist?start=${dateToTimeStamp(dateStart)}&end=${dateToTimeStamp(dateEnd)}&limit=${this.MAX_CANDLES_AMOUNT}`)
            .then((resp) => {
                console.warn(resp);
            })
            .catch((err) => {
                console.warn(err);
            });
    }
}

export default new BtfxRest();
