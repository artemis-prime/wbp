import type NounDisplay from './NounDisplay'

export interface Facet {
  name:         string        // used in data: 'genres'
  ignoreCase?:  true,
  display?:     NounDisplay | string
  values:       FacetValue[]
}

export interface FacetValue {
  name:         string        // used in data: 'hip-hop' (vs 'Hip Hop')
  displayName?: string        // 'Hip Hop'
  ext?:         any           // general enclosure for state, and / or anything used to display it. eg, color, logo, etc 
}

export interface FacetValueSelectedHandler {
    // defaults to selected = true
  (facet: Facet, value: FacetValue, selected?: boolean): void 
}

export interface FacetValueSelectionProvider {
  (facet: Facet, value: FacetValue): boolean 
}

export interface FacetValuesProvider {
  (facet: Facet): FacetValue[] 
}

export interface FacetValuesCountProvider {
  (facet: Facet): number 
}

export interface FacetsManager {
  selectFacetValue: FacetValueSelectedHandler
  facetValueIsSelected: FacetValueSelectionProvider
  selectedFacetValues: FacetValuesProvider
  selectedFacetValuesCount: FacetValuesCountProvider
}

export interface FacetSelections {
  name: string,
  values: string[]
}