"use client";

import { useState, useEffect } from "react";

interface GeoLocation {
    city: string;
    country: string;
    loading: boolean;
}

export function useGeoLocation(): GeoLocation {
    const [location, setLocation] = useState<GeoLocation>({
        city: "Houston",
        country: "US",
        loading: true,
    });

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                // Try fetching from a free geo IP service or browser timezone fallback
                const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
                let fallbackCity = "Houston";

                if (timeZone.includes("London") || timeZone.includes("Europe")) {
                    fallbackCity = "London";
                } else if (timeZone.includes("Dubai") || timeZone.includes("Asia/Dubai")) {
                    fallbackCity = "Dubai";
                } else if (timeZone.includes("New_York") || timeZone.includes("America/New_York")) {
                    fallbackCity = "New York";
                } else if (timeZone.includes("Chicago") || timeZone.includes("America/Chicago")) {
                    fallbackCity = "Chicago";
                } else if (timeZone.includes("Karachi") || timeZone.includes("Asia/Karachi")) {
                    fallbackCity = "Lahore";
                }

                setLocation({
                    city: fallbackCity,
                    country: "US",
                    loading: false,
                });
            } catch {
                setLocation({
                    city: "Houston",
                    country: "US",
                    loading: false,
                });
            }
        };

        fetchLocation();
    }, []);

    return location;
}
