import { useState, useEffect } from 'react'
import { TransportationSearchRequest } from '../../shared/models/transportation/transportationSearchRequest'
import { TransportationSearchResult } from '../../shared/models/transportation/transportationSearchResult'
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Plane, Train, Bus } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import agent from '@/shared/api/agent'
import { City } from '@/shared/models/city/city'
import TransportationCard from './transportationCard'

export default function TransportationSearchBar() {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<TransportationSearchResult[]>([]);
    const [searchData, setSearchData] = useState<TransportationSearchRequest>({
        vehicleTypeId: 1,
        fromCityId: undefined,
        toCityId: undefined,
        satrtDateTime: undefined,
        endtDateTime: undefined
    });
    const [currentVehicleType, setCurrentVehicleType] = useState<"airplane" | "train" | "bus">("airplane");

    useEffect(() => {
        setLoading(true);
        agent.cities.list()
            .then(response => {
                setCities(response);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await agent.transportations.search(searchData);
            console.log('Search Results:', response);
            setSearchResults(Array.isArray(response) ? response : []);
            setLoading(false);
        } catch (error: any) {
            setError(error.message || 'An error occurred during search');
            setLoading(false);
        }
    }

    return (
        <Card className="p-6 w-full max-w-4xl mx-auto">
            <Tabs defaultValue="airplane" onValueChange={(value) => {
                setCurrentVehicleType(value as "airplane" | "train" | "bus");
                setSearchData({ ...searchData, vehicleTypeId: value === "airplane" ? 1 : value === "train" ? 2 : 3 })
            }}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="airplane" className="flex items-center gap-2">
                        <Plane className="h-4 w-4" />
                        Airplane
                    </TabsTrigger>
                    <TabsTrigger value="train" className="flex items-center gap-2">
                        <Train className="h-4 w-4" />
                        Train
                    </TabsTrigger>
                    <TabsTrigger value="bus" className="flex items-center gap-2">
                        <Bus className="h-4 w-4" />
                        Bus
                    </TabsTrigger>
                </TabsList>

                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                        <Label htmlFor="fromCityId">From</Label>
                        <Select
                            value={searchData.fromCityId}
                            onValueChange={(value) => setSearchData({ ...searchData, fromCityId: value ?? undefined })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select origin city" />
                            </SelectTrigger>
                            <SelectContent>
                                {cities.map((city) => (
                                    <SelectItem key={city.id} value={city.id}>
                                        {city.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="toCityId">To</Label>
                        <Select
                            value={searchData.toCityId}
                            onValueChange={(value) => setSearchData({ ...searchData, toCityId: value ?? undefined })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select destination city" />
                            </SelectTrigger>
                            <SelectContent>
                                {cities.map((city) => (
                                    <SelectItem key={city.id} value={city.id}>
                                        {city.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Dates</Label>
                        <div className="flex gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !searchData.satrtDateTime && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {searchData.satrtDateTime ? format(new Date(searchData.satrtDateTime), "PPP") : "Start date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={searchData.satrtDateTime ? new Date(searchData.satrtDateTime) : undefined}
                                        onSelect={(date) => setSearchData({ ...searchData, satrtDateTime: date?.toISOString() ?? undefined })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !searchData.endtDateTime && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {searchData.endtDateTime ? format(new Date(searchData.endtDateTime), "PPP") : "End date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={searchData.endtDateTime ? new Date(searchData.endtDateTime) : undefined}
                                        onSelect={(date) => setSearchData({ ...searchData, endtDateTime: date?.toISOString() ?? undefined })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>

                <Button
                    className="mt-6 w-full"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </Button>

                {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
                        {error}
                    </div>
                )}

                <div className="mt-6">
                    {loading && (
                        <div className="text-center py-4">
                            <p className="text-gray-600">Searching for transportation options...</p>
                        </div>
                    )}

                    {!loading && searchResults.length === 0 && (
                        <div className="text-center py-4">
                            <p className="text-gray-600">No transportation options found. Try different search criteria.</p>
                        </div>
                    )}

                    {!loading && searchResults.length > 0 && (
                        <>
                            <h2 className="text-lg font-semibold mb-4">Search Results</h2>
                            <div className="space-y-4">
                                {searchResults.map((result) => (
                                    <TransportationCard
                                        key={result.id}
                                        transportation={result}
                                        vehicleType={currentVehicleType}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </Tabs>
        </Card>
    )
}