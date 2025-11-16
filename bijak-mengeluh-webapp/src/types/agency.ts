export interface AgencySocial {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
}

export interface Agency {
  // Core identification
  agency_id: string;
  name: string;
  province?: string;
  city?: string;
  level?: 'national' | 'provincial' | 'city';
  keywords?: string[];
  emoji?: string;
  
  // Description
  description?: string;
  
  // Location
  address?: string;
  google_maps_url?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  
  // Contact
  phone?: string;
  phone_alt?: string;
  email?: string;
  website?: string;
  
  // Social media
  social?: AgencySocial;
  
  // Metadata
  verified?: boolean;
  last_updated?: string;
  data_source?: string;
}
