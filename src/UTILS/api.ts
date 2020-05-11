import axios, { AxiosResponse } from 'axios';

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_QUERY = 'https://www.alphavantage.co/query?';
const BASE_KEYWORD_SEARCH = 'function=SYMBOL_SEARCH&keywords=';
const BASE_QUOTE = 'function=GLOBAL_QUOTE&symbol=';

export default {
	search: async (searchShare: string) => {
		let query = `${BASE_QUERY}${BASE_KEYWORD_SEARCH}${searchShare}&apikey=${ALPHA_VANTAGE_API_KEY}`;
		const response = await axios.get(query);
		return response.data.bestMatches;
	},
	searchBySymbol: async (symbol: string) => {
		let query = `${BASE_QUERY}${BASE_QUOTE}${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
		const response = await axios.get(query);
		console.log(response.data)
		return response.data;
	}
}