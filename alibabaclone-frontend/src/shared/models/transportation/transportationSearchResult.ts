export interface TransportationSearchResult {
    id: string;
    companyTitle: string;
    fromLocationTitle: string;
    toLocationTitle: string;
    fromCityTitle: string;
    toCityTitle: string;
    satrtDateTime: Date | string;
    endtDateTime?: Date | string;
    price: number;
}