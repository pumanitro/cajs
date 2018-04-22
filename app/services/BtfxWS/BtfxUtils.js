export function parseBtfxCandle(candle) {
    return {
        date: new Date(candle[0]),
        open: candle[1],
        close: candle[2],
        high: candle[3],
        low: candle[4],
        volume: candle[5],
    };
}

export class Consts {

    // '1m', '5m', '15m', '30m', '1h', '3h', '6h', '12h', '1D', '7D', '14D', '1M'
    static timeFrame = {
        m1: '1m',
        m5: '5m',
        m15: '15m',
        m30: '30m',
        h1: '1h',
        h3: '3h',
        h6: '6h',
        h12: '12h',
        D1: '1D',
        D7: '7D',
        D14: '14D',
        M1: '1M'
    };

    static symbol = {
        BTCUSD: 'BTCUSD'
    }
}

export function dateToTimeStamp(date) {
    return Math.floor(date / 1000);
}

export function parseCandles(candles) {
    return candles.slice(0).reverse().map(candle => parseBtfxCandle(candle));
}
