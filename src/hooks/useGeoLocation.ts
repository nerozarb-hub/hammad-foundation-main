'use client';

import { useEffect, useState } from 'react';

interface LocationData {
  city: string;
  country: string;
}

export function useGeoLocation() {
  const [location, setLocation] = useState<LocationData>({
    city: 'Houston',
    country: 'America'
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch('/api/geo');
        const data = await response.json();
        
        if (data.error) throw new Error(data.error);

        const cityMap: Record<string, string> = {
          'US': 'Houston',
          'GB': 'London',
          'AE': 'Dubai',
          'SA': 'Riyadh',
          'CA': 'Toronto',
          'AU': 'Sydney',
          'DE': 'Frankfurt',
          'FR': 'Paris',
          'NL': 'Amsterdam',
          'SG': 'Singapore',
          'MY': 'Kuala Lumpur',
        };
        
        const countryMap: Record<string, string> = {
          'US': 'America',
          'GB': 'the UK',
          'AE': 'Dubai',
          'SA': 'Saudi Arabia',
          'CA': 'Canada',
          'AU': 'Australia',
          'DE': 'Germany',
          'FR': 'France',
          'NL': 'the Netherlands',
          'SG': 'Singapore',
          'MY': 'Malaysia',
        };
        
        setLocation({
          city: cityMap[data.country_code] || data.city || 'your city',
          country: countryMap[data.country_code] || 'abroad'
        });
        
      } catch (error) {
        console.log('Geo-detection failed, using defaults');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchLocation();
  }, []);
  
  return { location, isLoading };
}
