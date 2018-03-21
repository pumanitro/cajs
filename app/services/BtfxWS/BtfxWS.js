export class BtfxWS {
  constructor() {
    this.BTFX_WS_URL = 'wss://api.bitfinex.com/ws/2';

    this.socket = null;

    // in the future one of channel (Enum):
    // temporary const values:
    this.channel = null;
    this.tameFrame = null;
    this.symbol = null;

    this.messageFunction = null;
  }

  defineChannel(channel, tameFrame, symbol) {
    this.channel = channel;
    this.tameFrame = tameFrame;
    this.symbol = symbol;

    return this;
  }

  defineMessage(messageFunction) {
    this.messageFunction = messageFunction;

    return this;
  }

  subscribe() {
    // Create WebSocket connection.
    this.socket = new WebSocket(this.BTFX_WS_URL);

    this.socket.addEventListener('open', (event) => {
      console.log("Opened connection", event);

      this.socket.send(JSON.stringify({
        event: "subscribe",
        channel: this.channel,
        key: `trade:${this.tameFrame}:${this.symbol}`,
      }));
    });

    this.socket.addEventListener('message', this.messageFunction);

    return this;
  }
}
