import { TypeChooser } from "react-stockcharts/lib/helper";

import React from 'react';
import Chart from './Chart';
// import { getData } from "./utils";
import {BtfxWS} from "../services/BtfxWS/BtfxWS";

function parseData(data) {

  return data.slice(0).reverse().map((candle) => {
    return {
      date: new Date(candle[0]),
      open: candle[1],
      close: candle[2],
      high: candle[3],
      low: candle[4],
      volume: candle[5],
    };
  });

}

class App extends React.Component {

  componentDidMount() {

    new BtfxWS()
      .defineChannel('candles', '1h', 'tBTCUSD')
      .defineMessage((event) => {
        console.log('>>> GET: ', event.data);
        // this.setState({data: event.data});
      })
      .defineWSInfo((info) => {
        this.setState({data: parseData(info.snapshot[1])});
      })
      .subscribe();

  }

  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <TypeChooser>
        {type => <Chart type={type} data={this.state.data} />}
      </TypeChooser>
    );
  }
}

export default App;
