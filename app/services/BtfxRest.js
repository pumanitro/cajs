import axios from 'axios';
import {dateToTimeStamp, timeFrameToMS} from "./BtfcUtils/BtfxUtils";

class BtfxRest {

    REST_URL = 'https://api.bitfinex.com/v2/';
    MAX_CANDLES_AMOUNT = 1000;

    getCandles = (timeFrame, symbol, dateStart, dateEnd) => {

        // 1388534400000

        return axios
            .get(`${this.REST_URL}candles/trade:${timeFrame}:${symbol}/hist?start=${dateToTimeStamp(dateStart)}&end=${dateToTimeStamp(dateEnd)}&limit=${this.MAX_CANDLES_AMOUNT}`)
            .then((resp) => {
                return resp.data;
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    getMoreCandles = (timeFrame, symbol, lastCandle) => {

        const end = lastCandle.date;

        const start = new Date(end - (timeFrameToMS(timeFrame) * this.MAX_CANDLES_AMOUNT));

        return this.getCandles(timeFrame, symbol, start, end);

    }

}

export default new BtfxRest();
