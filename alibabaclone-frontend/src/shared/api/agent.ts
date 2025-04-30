import axios, { AxiosResponse } from 'axios';
import { TransportationSearchRequest } from '../models/transportation/transportationSearchRequest';
import { TransportationSearchResult } from '../models/transportation/transportationSearchResult';
import { City } from '../models/city/city';

axios.defaults.baseURL = 'https://localhost:7028/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const cities = {
    list: () => request.get<City[]>('city'),
}

const transportations = {
    search: (transportationSearchRequest: TransportationSearchRequest) => request.post<TransportationSearchResult[]>(`/Transportation/search`, transportationSearchRequest)
    // search: (params: TransportationSearchRequest) => request.post('search', params)
}

const agent = {
    cities,
    transportations
}

export default agent;