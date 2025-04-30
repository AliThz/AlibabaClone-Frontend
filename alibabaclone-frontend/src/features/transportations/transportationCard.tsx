import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { TransportationSearchResult } from "@/shared/models/transportation/transportationSearchResult";
import { Plane, Train, Bus } from "lucide-react";

interface TransportationCardProps {
    transportation: TransportationSearchResult;
    vehicleType?: "airplane" | "train" | "bus";
}

export default function TransportationCard({ transportation, vehicleType }: TransportationCardProps) {
    const getVehicleIcon = () => {
        switch (vehicleType) {
            case "airplane":
                return <Plane className="h-5 w-5" />;
            case "train":
                return <Train className="h-5 w-5" />;
            case "bus":
                return <Bus className="h-5 w-5" />;
            default:
                return null;
        }
    };

    return (
        <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        {getVehicleIcon()}
                        <h3 className="font-medium text-lg">
                            {transportation.fromCityTitle} → {transportation.toCityTitle}
                        </h3>
                    </div>

                    <div className="text-sm text-gray-500 space-y-1">
                        <p>From: {transportation.fromLocationTitle}</p>
                        <p>To: {transportation.toLocationTitle}</p>
                        <p>
                            Departure: {format(new Date(transportation.satrtDateTime), "PPP p")}
                        </p>
                        {transportation.endtDateTime && (
                            <p>
                                Arrival: {format(new Date(transportation.endtDateTime), "PPP p")}
                            </p>
                        )}
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-2xl font-bold">${transportation.price}</p>
                    <p className="text-sm text-gray-600">{transportation.companyTitle}</p>
                </div>
            </div>
        </Card>
    );
}