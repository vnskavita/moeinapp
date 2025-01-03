// var socket = new WebSocket("wss://noren-trade.tradesmartonline.in/NorenWS/");
var socket = '';
var _subs = [];

class BinanceDatafeed {

    constructor(options) {
        this.debug = options.debug || false;
        this.datafeedUrl = options.datafeedUrl;
        this.chartURL = options.chartURL;
        this.lastBarSet;
        this.debug && console.log('Option', options)


        // sendMessage(socket, JSON.stringify(message_conn));
        // connectWebSocket();

    }


    binanceServerTime() {
        const url = this.datafeedUrl + 'time';
        return fetch(url).then(res => {
            return res.json()
        }).then(json => {
            return 1
        })
    }

    binanceSymbols() {
        const url = this.datafeedUrl + 'config';
        this.debug && console.log('👉 url:', url)
        return fetch(url).then(res => {
            return res.json()
        }).then(json => {
            return json.symbols
        })
    }

    binanceKlines(symbolInfo, interval, startTime, endTime, limit) {
        this.debug && console.log("symbol", symbolInfo);

        window.interval1 = interval;
        // var startTimeSecond = startTime / 1000;
        // var endTimeSecond = endTime / 1000;
        // var key = symbol + "|" + interval + "|" + startTimeSecond + "|" + endTimeSecond;

        const url = this.datafeedUrl + 'history' +
            "?symbol=" + symbolInfo.ticker +
            "&resolution=" + interval +
            "&from=" + startTime / 1000 +
            "&to=" + endTime / 1000 +
            "&uid=" + (JSON.stringify(localStorage.getItem("uid"))).toString().replace(/"/g, '') +
            "&exch=" + symbolInfo.exchange +
            "&name=" + symbolInfo.name



        this.debug && console.log('👉 url:', url)
        return fetch(url).then(res => {
            return res.json()
        }).then(json => {
            return json
        })
    }

    onReady(callback) {
        this.binanceSymbols().then((symbols) => {
            this.symbols = symbols
            callback({
                supports_marks: false,
                supports_timescale_marks: false,
                supports_time: true,
                supported_resolutions: [
                    "1", "2", "3", "4", "5", "10", "15", "30", "45", "60", "120", "180", "240", "D", "2D", "3D", "W", "3W", "M", "6M"
                ]
            })
        }).catch(err => {
            console.error(err)
        })
    }

    searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {
        userInput = userInput.toUpperCase()
        onResultReadyCallback(
            this.symbols.filter((symbol) => {
                return symbol.symbol.indexOf(userInput) >= 0
            }).map((symbol) => {
                return {
                    symbol: symbol.symbol,
                    full_name: symbol.symbol,
                    description: symbol.baseAsset + ' / ' + symbol.quoteAsset,
                    ticker: symbol.symbol,
                    //exchange: 'Binance',
                    //type: 'crypto'
                }
            })
        )
    }

    resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {

        this.debug && console.log('👉 resolveSymbol:', symbolName)

        const comps = symbolName.split(':')
        symbolName = symbolName.toUpperCase();
        var ticker = (JSON.stringify(localStorage.getItem("token1"))).toString().replace(/"/g, '');
        var exch = JSON.stringify(localStorage.getItem("exch")).toString().replace(/"/g, '');

        // var symbolInfo = symbolName.split("|");

        var resolution = '';
        if (exch == 'NSE' || exch == 'BSE') {
            // resolution = ["1", "2", "3", "4", "5", "10", "15", "30", "45", "60", "120", "180", "240", "D", "2D", "3D", "W", "3W", "M", "6M"];
            resolution = ["1", "2", "3", "4", "5", "10", "15", "30", "45", "60", "120", "180", "240", "D", "2D", "3D", "W", "3W", "M", "6M"];
        } else {
            resolution = ["1", "2", "3", "4", "5", "10", "15", "30", "45", "60", "120", "180", "240"];
        }

        var timesession = "0915-1530";
        var pricescaleNew = 10;

        if (exch == 'MCX') {
            timesession = "0900-2330"
        }
        if (exch == 'CDS') {
            pricescaleNew = 1000;
            timesession = "0900-1700"
            // BELOW NEEDS TO CHECK WITH SONU AS FEW MARKETS OF CURRENCY ARE WORKING TILL 8 PM
            // if (symbolInfo[1].search("INR") !== -1) {
            //     timesession = "0900-1700"
            // } else {
            //     timesession = "0900-2000"
            // }
        }

        if (this.debug) {
            console.log("timesession :", timesession);
            console.log("resolution :", resolution);
        }

        setTimeout(() => {
            onSymbolResolvedCallback({
                name: symbolName,
                description: symbolName,
                ticker: ticker,
                session: timesession,
                timezone: 'Asia/Kolkata',
                minmov: 1,
                pricescale: 10 * pricescaleNew,
                has_intraday: true,
                exchange: exch,
                // has_daily: true,
                intraday_multipliers: ["1", "3", "5", "10", "15", "30", "60"],
                supported_resolutions: resolution,
                // has_no_volume: false,
                volume_precision: 8,
                data_status: 'streaming'
            })
        }, 0)
        return
        onResolveErrorCallback('not found')
    }

    getBars(symbolInfo, resolution, from, onHistoryCallback, onErrorCallback, firstDataRequest) {
        let to = from.to
        from = from.from

        if (this.debug) {
            console.log('👉 getBars:', symbolInfo.name, resolution)
            console.log('First:', firstDataRequest)
            console.log('From:', from, '(' + new Date(from * 1000).toGMTString() + ')')
            console.log('To:  ', to, '(' + new Date(to * 1000).toGMTString() + ')')
        }
        const interval = {
            '1': '1m',
            '2': '2m',
            '3': '3m',
            '4': '4m',
            '5': '5m',
            '15': '15m',
            '30': '30m',
            '60': '1h',
            '120': '2h',
            '180': '3h',
            '240': '4h',
            '360': '6h',
            '480': '8h',
            '720': '12h',
            'D': '1d',
            '1D': '1d',
            '3D': '3d',
            'W': '1w',
            '1W': '1w',
            'M': '1M',
            '1M': '1M',
        }[resolution]
        if (!interval) {
            onErrorCallback('Invalid interval')
        }

        let totalKlines = []

        const finishKlines = () => {
            if (this.debug) {
                console.log('📊:', totalKlines.length)
            }

            if (totalKlines.length == 0) {
                onHistoryCallback([], { noData: true })
            } else {
                onHistoryCallback(totalKlines.map(kline => {
                    this.lastBarSet = {
                        time: kline.ssboe * 1000,
                        close: parseFloat(kline.intc),
                        open: parseFloat(kline.into),
                        high: parseFloat(kline.inth),
                        low: parseFloat(kline.intl),
                        volume: parseFloat(kline.intv)
                    };

                    return {
                        time: kline.ssboe * 1000,
                        close: parseFloat(kline.intc),
                        open: parseFloat(kline.into),
                        high: parseFloat(kline.inth),
                        low: parseFloat(kline.intl),
                        volume: parseFloat(kline.intv)
                    }
                }), {
                    noData: false
                })
            }
        }

        const getKlines = (from, to) => {
            this.binanceKlines(symbolInfo, interval, from, to, 500).then(klines => {
                totalKlines = totalKlines.concat(klines)
                finishKlines()
            }).catch(err => {
                console.error(err)
                onErrorCallback('Some problem')
            })
        }

        from *= 1000
        to *= 1000

        getKlines(from, to)
    }

    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {

        socket = new WebSocket(this.chartURL);
        const channelString = symbolInfo.exchange + "|" + symbolInfo.ticker;

        socket.onopen = function (e) {
            // socket.send("My name is John");
            console.log("Websocket Connection Done.")
            let message_conn = {
                t: 'c',
                uid: localStorage.getItem("uid"),
                actid: localStorage.getItem("uid"),
                source: 'MOB',
                susertoken: localStorage.getItem('jwt_token')
            };
            socket.send(JSON.stringify(message_conn));
        };

        socket.onmessage = function (event) {
            console.log("this is called for connection done", event);
            let eventData = JSON.parse(event.data); //this.socket.send(message_conn);
            console.log("sub", eventData)
            if (eventData.t == 'ck' && eventData.s == 'OK') {
                let message_conn = {
                    t: 't',
                    k: channelString
                };
                console.log(message_conn);
                socket.send(JSON.stringify(message_conn));
            }
            if ((eventData.lp != undefined) && (eventData.lp) != 0) {
                const volume = (eventData.v != undefined) ? eventData.v : 0;
                const data = {
                    exchange: eventData.e,
                    symbol: eventData.tk,
                    ts: parseInt(eventData.ft, 10),
                    volume: parseFloat(volume / 100),
                    price: parseFloat(eventData.lp)
                }

                const channelString = data.exchange + "|" + data.symbol;
                const sub = _subs.find(e => e.channelString === channelString)
                console.log(channelString,"channelString")
                // console.log(sub,"sub")
                console.log(_subs,"_subs")
                if (sub) {
                    console.log("in from sub")
                    console.log(sub,"sub")
                    console.log(data,"data")
                    // disregard the initial catchup snapshot of trades for already closed candles
                    if (data.ts < sub.lastBar.time / 1000) {
                        return
                    }
                    var _lastBar = updateBar(data, sub)
                    // send the most recent bar back to TV's realtimeUpdate callback
                    sub.listener(_lastBar)
                    // update our own record of lastBar
                    sub.lastBar = _lastBar
                }
            }
        };

        socket.onclose = function (event) {
            if (event.wasClean) {
                // alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                // alert('[close] Connection died');
            }
        };

        socket.onerror = function (error) {
            alert(`[error]`);
        };


        console.log("Sbscribe Bar Called", resolution);
        // let message_conn = {
        //     t: 't',
        //     k: channelString
        // };
        // console.log(message_conn);
        // // sendMessage(socket, JSON.stringify(message_conn));
        // // await waitForOpenSocket(socket);
        // socket.send(JSON.stringify(message_conn));
        var newSub = {
            channelString,
            subscriberUID,
            resolution,
            symbolInfo,
            lastBar: this.lastBarSet,
            listener: onRealtimeCallback,
        }
        _subs.push(newSub)
    }

    unsubscribeBars(subscriberUID) {
        this.debug && console.log('👉 unsubscribeBars:', subscriberUID)
        _subs = [];
        socket.close();
    }
}

function waitForOpenSocket(socket) {
    return new Promise((resolve, _reject) => {
        const maxNumberOfAttempts = 10
        const intervalTime = 200 //ms
        let currentAttempt = 0
        console.log("waitForOpenSocket")
        const interval = setInterval(() => {
            console.log("currentAttempt", currentAttempt)
            console.log("socket.readyState", socket.readyState)
            if (currentAttempt > maxNumberOfAttempts - 1) {
                clearInterval(interval)
                this.debug && console.log("connection not possible", currentAttempt)
                // reject(new Error('Maximum number of attempts exceeded'))
            } else if (socket.readyState === socket.OPEN) {
                this.debug && console.log("connection done")
                clearInterval(interval)
                resolve()
            }
            currentAttempt++
        }, intervalTime)
        // while (socket.readyState !== socket.OPEN) { /* no-op */ }
        // return resolve()
    })
}

async function sendMessage(socket, msg) {
    console.log("sending msg", msg);
    await waitForOpenSocket(socket)
    socket.send(msg)
}

function updateBar(data, sub) {
    var lastBar = sub.lastBar
    let resolution = sub.resolution;
    if (resolution.includes('D')) {
        // 1 day in minutes === 1440
        resolution = 1440
    } else if (resolution.includes('W')) {
        // 1 week in minutes === 10080
        resolution = 10080
    }
    var coeff = resolution * 60
    // console.log({coeff})
    var rounded = Math.floor(data.ts / coeff) * coeff
    var lastBarSec = lastBar.time / 1000
    var _lastBar
    var vol = (data.volume > 0) ? data.volume : lastBar.volume;

    if (rounded > lastBarSec) {
        // create a new candle, use last close as open **PERSONAL CHOICE**
        _lastBar = {
            time: rounded * 1000,
            open: lastBar.close,
            high: lastBar.close,
            low: lastBar.close,
            close: data.price,
            volume: vol
        }

    } else {
        // update lastBar candle!
        if (data.price < lastBar.low) {
            lastBar.low = data.price
        } else if (data.price > lastBar.high) {
            lastBar.high = data.price
        }
        if ((data.volume > 0)) {
            lastBar.volume = data.volume
        }
        lastBar.close = data.price
        _lastBar = lastBar
    }
    return _lastBar
}