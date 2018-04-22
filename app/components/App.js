import {connect} from "react-redux";
import React from 'react';
import Chart from './Chart';
import {BtfxWS} from "../services/BtfxWS";
import {parseBtfxCandle, parseCandles} from "../services/BtfxUtils";
import {makeAction} from "../utils/actionCreator";
import ActionTypes from "../actions/actionTypes";

class App extends React.Component {

    componentDidMount() {

        (new BtfxWS())
            .defineChannel('candles', '1h', 'tBTCUSD')
            .defineWSInfo((info) => {
                this.props.changeBitfinexCandles(parseCandles(info.snapshot[1]));
            })
            .defineMessage((event) => {

                const messageData = JSON.parse(event.data);

                if (messageData[1] !== "hb") {
                    this.changeCandlesOnMessage(messageData, this.props.bitfinex.candles);
                }
            })
            .subscribe();
    }

    changeCandlesOnMessage = (messageData, candles) => {

        // Update chart or add new data to chart:
        const newCandle = parseBtfxCandle(messageData[1]);
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

    };

    render() {
        if (this.props.bitfinex.candles.length === 0) {
            return <div>Loading...</div>;
        }
        return (
            <Chart type="svg" data={this.props.bitfinex.candles} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bitfinex: state.bitfinex
    };
};

const mapDispatchToProps = {
    changeBitfinexCandles: makeAction(ActionTypes.BITFINEX.CHANGE_BITFINEX_CANDLES)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
