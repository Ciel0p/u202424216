export const BREWERY_TYPES = ['micro', 'nano', 'regional', 'brewpub', 'large', 'contract'] as const;

export type BreweryType = typeof BREWERY_TYPES[number];
