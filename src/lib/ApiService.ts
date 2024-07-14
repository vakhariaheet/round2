import axios, { AxiosRequestConfig } from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
export interface Response<T>{
	data: T;
	isSuccess: boolean;
	message: string;
}

const getAxiosAuthInstance = () => {
	const instance = axios.create();
	instance.interceptors.request.use(async (config) => {
		const token: string = localStorage.getItem('token') || '';		
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	});
	return instance;
};

class ApiService {
	static async get<Response>(
		url: string,
		config?: AxiosRequestConfig & { protected?: boolean },
	) {
		if (config?.protected) {
			const res = await getAxiosAuthInstance().get<Response>(
				API_URL + url,
				config,
			);
			return res;
		}
		const res = await axios.get<Response>(API_URL + url, config);
		return res;
	}
	static async post<Response>(
		url: string,
		data: any,
		config?: AxiosRequestConfig & { protected?: boolean },
	) {
		if (config?.protected) {
			const res = getAxiosAuthInstance().post<Response>(
				API_URL + url,
				data,
				config,
			);
			return res;
		}

		const res = await axios.post<Response>(API_URL + url, data, config);
		return res;
	}
	static async put<Response>(
		url: string,
		data: any,
		config?: AxiosRequestConfig & { protected?: boolean },
	) {
		if (config?.protected) {
			const res = getAxiosAuthInstance().put<Response>(
				API_URL + url,
				data,
				config,
			);
			return res;
		}

		const res = await axios.put<Response>(API_URL + url, data, config);
		return res;
	}
	static async delete<Response>(
		url: string,
		config?: AxiosRequestConfig & { protected?: boolean },
	) {
		if (config?.protected) {
			const res = getAxiosAuthInstance().delete<Response>(
				API_URL + url,
				config,
			);
			return res;
		}
		const res = await axios.delete<Response>(API_URL + url, config);
		return res;
	}
	static async patch<Response>(
		url: string,
		data: any,
		config?: AxiosRequestConfig & { protected?: boolean },
	) {
		if (config?.protected) {
			const res = getAxiosAuthInstance().patch<Response>(
				API_URL + url,
				data,
				config,
			);
			return res;
		}
		const res = await axios.patch<Response>(API_URL + url, data, config);
		return res;
	}
}

export const getSearch = (searchParams:URLSearchParams) => {
	const search = searchParams.toString();
	return search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) }) : '';
}

export default ApiService;
