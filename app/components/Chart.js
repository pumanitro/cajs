import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';

import { ChartCanvas, Chart } from "react-stockcharts";
import {
    CandlestickSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import BtfxRest from "../services/BtfxRest";
import {makeAction} from "../utils/actionCreator";
import ActionTypes from "../actions/actionTypes";

class CandleStickStockScaleChart extends React.Component {

    takeCandlesPacket = () => {

        const {setup, candles} = this.props.bitfinex;

        BtfxRest.getMoreCandles(setup.timeFrame, setup.symbol, candles[0])
            .then((newCandlesPackage) => {
                this.props.addNewCandlesPackage(newCandlesPackage);
            });

    };

    render() {
        const { type, data: initialData, width, ratio } = this.props;

        const xScaleProvider = discontinuousTimeScaleProvider
            .inputDateAccessor(d => d.date);
        const {
            data,
            xScale,
            xAccessor,
            displayXAccessor,
        } = xScaleProvider(initialData);
        const xExtents = [
            xAccessor(last(data)),
            xAccessor(data[data.length - 100]),
        ];

        return (
            <ChartCanvas
                height={400}
                ratio={ratio}
                width={width}
                margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
                type={type}
                onLoadMore={this.takeCandlesPacket}
                seriesName="MSFT"
                data={data}
                xScale={xScale}
                xAccessor={xAccessor}
                displayXAccessor={displayXAccessor}
                xExtents={xExtents}
            >

                <Chart id={1} yExtents={d => [d.high, d.low]}>
                    <XAxis axisAt="bottom" orient="bottom" ticks={6} />
                    <YAxis axisAt="left" orient="left" ticks={5} />
                    <CandlestickSeries />
                </Chart>
            </ChartCanvas>
        );
    }
}

CandleStickStockScaleChart.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]),
};

CandleStickStockScaleChart.defaultProps = {
    type: "svg",
};

CandleStickStockScaleChart = fitWidth(CandleStickStockScaleChart);

const mapStateToProps = (state) => {
    return {
        bitfinex: state.bitfinex
    };
};

const mapDispatchToProps = {
    addNewCandlesPackage: makeAction(ActionTypes.BITFINEX.ADD_NEW_CANDLES_PACKAGE)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CandleStickStockScaleChart);

