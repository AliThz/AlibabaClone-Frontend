export interface TransportationSearchRequest {
    vehicleTypeId?: number;
    fromCityId?: string;
    toCityId?: string;
    satrtDateTime?: Date | string;
    endtDateTime?: Date | string;
}