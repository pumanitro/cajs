import {connect} from "react-redux";
import React from 'react';
import Chart from './Chart';
import {BtfxWS} from "../services/BtfxWS/BtfxWS";
import {parseBtfxCandle, parseCandles} from "../services/BtfxWS/BtfxUtils";
import {makeAction} from "../utils/actionCreator";
import ActionTypes from "../actions/actionTypes";

class App extends React.Component {

    componentDidMount() {

        const {candles} = this.props.bitfinex;

        new BtfxWS()
            .defineChannel('candles', '1h', 'tBTCUSD')
            .defineMessage((event) => {

                const parsedData = JSON.parse(event.data);

                console.log('>>> GET: ', parsedData);

                if (parsedData[1] !== "hb") {

                    // Update chart or add new data to chart:

                    const newCandle = parseBtfxCandle(parsedData[1]);
                    const updatedData = [...candles];

                    if (candles[candles.length - 1].date.getTime() === newCandle.date.getTime()) {
                        updatedData[updatedData.length - 1] = newCandle;
                        this.props.changeBitfinexCandles(updatedData);
                    }
                    else if (candles[candles.length - 2].date.getTime() === newCandle.date.getTime()) {
                        updatedData[updatedData.length - 2] = newCandle;
                        this.props.changeBitfinexCandles(updatedData);
                    }
                    else {
                        this.props.changeBitfinexCandles(candles.concat([newCandle]));
                    }

                }
            })
            .defineWSInfo((info) => {
                this.props.changeBitfinexCandles(parseCandles(info.snapshot[1]));
            })
            .subscribe();
    }

    render() {
        if (this.props.bitfinex.candles == null) {
            return <div>Loading...</div>;
        }
        return (
            <Chart type="svg" data={this.props.bitfinex.candles} />
        );
    }
}

const mapStoreToProps = (store) => {
    return {
        bitfinex: store.bitfinex
    };
};

const mapDispatchToProps = {
    changeBitfinexCandles: makeAction(ActionTypes.BITFINEX.CHANGE_BITFINEX_CANDLES)
};

export default connect(mapStoreToProps, mapDispatchToProps)(App);
