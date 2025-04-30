export interface TransportationSearchRequest {
    vehicleTypeId: number;
    fromCityId: string | undefined;
    toCityId: string | undefined;
    satrtDateTime: Date | string | undefined;
    endtDateTime?: Date | string | undefined;
}