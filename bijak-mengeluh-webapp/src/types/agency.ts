export interface Agency {
  agency_id: string;
  name: string;
  province?: string;
  city?: string;
  type?: string;
  categories?: string[];
  keywords?: string[];
  emoji?: string;
  color?: string;
  social_media?: {
    instagram?: string;
    twitter?: string;
  };
}

export interface AgencyFilters {
  province?: string;
  city?: string;
  category?: string;
  search?: string;
}
