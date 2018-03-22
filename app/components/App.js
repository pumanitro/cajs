import React from 'react';
import Chart from './Chart';
import {BtfxWS} from "../services/BtfxWS/BtfxWS";
import {parseBtfxCandle, parseData} from "../services/BtfxWS/BtfxUtils";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount() {

        const self = this;

        new BtfxWS()
            .defineChannel('candles', '1h', 'tBTCUSD')
            .defineMessage((event) => {

                const parsedData = JSON.parse(event.data);

                console.log('>>> GET: ', parsedData);

                if (parsedData[1] !== "hb") {
                    self.setState({ data: self.state.data.concat([parseBtfxCandle(parsedData[1])])});
                }
            })
            .defineWSInfo((info) => {
                self.setState({data: parseData(info.snapshot[1])});
            })
            .subscribe();
    }

    render() {
        if (this.state.data == null) {
            return <div>Loading...</div>;
        }
        return (
            <Chart type="svg" data={this.state.data} />
        );
    }
}

export default App;
