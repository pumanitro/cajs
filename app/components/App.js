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

                    // Update chart or add new data to chart:

                    const newCandle = parseBtfxCandle(parsedData[1]);
                    const updatedData = [...self.state.data];

                    if (self.state.data[self.state.data.length - 1].date.getTime() === newCandle.date.getTime()) {
                        updatedData[updatedData.length - 1] = newCandle;
                        self.setState({ data: updatedData});
                    }
                    else if (self.state.data[self.state.data.length - 2].date.getTime() === newCandle.date.getTime()) {
                        updatedData[updatedData.length - 2] = newCandle;
                        self.setState({ data: updatedData});
                    }
                    else {
                        self.setState({ data: self.state.data.concat([newCandle])});
                    }

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
