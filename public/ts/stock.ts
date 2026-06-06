import { log } from "node:console";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

const results = await yahooFinance.search("Apple");

const quote = await yahooFinance.quote('AAPL');
const { regularMarketPrice, currency } = quote;
console.log(quote);