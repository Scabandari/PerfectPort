import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import axios from 'axios';
export const DAILY = "day";
export const MINUTE = "minute";
export const HOUR = "hour";

function parseData(parse) {
  return function(d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;
    //console.log("parseData d: ", d);
    return d;

  };
}

const parseDate = timeParse("%Y-%m-%d");

// This is the samle function that came with the charting library
export function getData() {
  const promiseMSFT = fetch("//rrag.github.io/react-stockcharts/data/MSFT.tsv")
    .then(response => response.text())
    .then(data => tsvParse(data, parseData(parseDate)))
  return promiseMSFT;
}

// Looking for this "%Y-%m-%d"
export function _getDateFromTimeStamp(time_stamp){
  const date = new Date(time_stamp*1000);
  const day = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();
  const date_obj = parseDate(year + '-' + month + '-' + day);
  return date_obj;
}

// This is my function that I wrote
export async function getCryptoCompare(coinToShow, time_frame) {
  //const req =
  //const req = await axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=30&aggregate=3&e=CCCAGG');
  const url = `https://min-api.cryptocompare.com/data/histo${time_frame}?fsym=${coinToShow}&tsym=USD&limit=2000`;
  const req = await axios.get(url);
  const data = req.data.Data.map(point => {
    return({
      open: point.open,
      high: point.high,
      low: point.low,
      close: point.close,
      volume: point.volumeto,
      date: _getDateFromTimeStamp(point.time),
      absoluteChange: undefined,
      dividend: "",
      percentChange: undefined,
      split: ""
    })
  });
  //console.log("data: ", data);
  console.log("req: ", req);
  return data;
}
