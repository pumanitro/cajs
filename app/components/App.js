import { TypeChooser } from "react-stockcharts/lib/helper";

import React from 'react';
import Chart from './Chart';
// import { getData } from "./utils";
import {BtfxWS} from "../services/BtfxWS/BtfxWS";


class App extends React.Component {

  componentDidMount() {
    // getData().then((data) => {
    //   this.setState({ data });
    // });

    (new BtfxWS())
      .defineChannel('candles', '1h', 'tBTCUSD')
      .defineMessage((event) => {
        console.log('>>> GET: ', event.data);
        this.setState({data: event.data});
      })
      .defineWSInfo((info) => {
        console.log(`>>> I GOT INFO`, info);
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
