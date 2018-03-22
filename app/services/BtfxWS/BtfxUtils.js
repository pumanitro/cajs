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

export function parseData(data) {
    return data.slice(0).reverse().map(candle => parseBtfxCandle(candle));
}
