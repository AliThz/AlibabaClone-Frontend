import axios, { AxiosResponse } from 'axios';
import { TransportationSearchRequest } from '../models/transportation/transportationSearchRequest';
import { TransportationSearchResult } from '../models/transportation/transportationSearchResult';
// import { store } from '../stores/store';

axios.defaults.baseURL = 'https://localhost:7028/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// axios.interceptors.request.use(config => {
//     const token = store.commonStore.token;
//     if (token && config.headers) {
//         config.headers.Authorization = `bearer ${token}`;
//     }
//     return config;
// });

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

// const transportations = {
//     list: () => request.get<TransportationSearchRequest[]>('/activities'),
//     details: (id: string) => request.get<TransportationSearchRequest>(`/activities/${id}`),
//     create: (transportationSearchRequest: TransportationSearchRequest) => request.post<void>(`/activities`, transportationSearchRequest),
//     update: (transportationSearchRequest: TransportationSearchRequest) => request.put<void>(`/activities/`, transportationSearchRequest),
//     delete: (id: string) => request.delete<void>(`/activities/${id}`)
// }

const transportations = {
    search: (transportationSearchRequest: TransportationSearchRequest) => request.post<TransportationSearchResult[]>(`/search`, transportationSearchRequest)
}

// const Account = {
//     current: () => request.get<User>('/account'),
//     login: (user: UserFormValues) => request.post<User>('/account/login', user),
//     register: (user: UserFormValues) => request.post<User>('/account/register', user)
// }

const agent = {
    transportations
}

export default agent;