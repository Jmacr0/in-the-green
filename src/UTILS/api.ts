import axios, { AxiosResponse } from 'axios';

const ALPHA_VANTAGE_API_KEY = '42LMPINEQ95H2J57';
const BASE_QUERY = 'https://www.alphavantage.co/query?';
const BASE_KEYWORD_SEARCH = 'function=SYMBOL_SEARCH&keywords=';
const BASE_INTRADAY = 'function=TIME_SERIES_INTRADAY&symbol=';

export default {
	search: async (searchShare: string) => {
		let query = `${BASE_QUERY}${BASE_KEYWORD_SEARCH}${searchShare}&apikey=${ALPHA_VANTAGE_API_KEY}`;
		const response = await axios.get(query);
		return response.data.bestMatches;
	},
	searchBySymbol: async (symbol: string) => {
		let query = `${BASE_QUERY}${BASE_INTRADAY}${symbol}&interval=5min&apikey=${ALPHA_VANTAGE_API_KEY}`;
		const response = await axios.get(query);
		console.log(response.data)
		return response.data;
	}
}