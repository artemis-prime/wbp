import type { FacetSelections } from '..'
import type { Parser } from './Parser'
import type { Serializer } from './Serializer'

const DELIM = {
  FACETS: '_',
  FACET_TO_VALUES: '.',
  VALUES: '~'
} 

export const parse: Parser<FacetSelections[]> = (
  fullString: string
): FacetSelections[] | null => {
  if (!fullString || fullString.length === 0) return null
  const facetStringArray = fullString.split(DELIM.FACETS)
  return facetStringArray.map((facetString: string): FacetSelections => {
    let [name, values] = facetString.split(DELIM.FACET_TO_VALUES)
    return {
      name: name,
      values: values.split(DELIM.VALUES)
    }
  })
}

  // https://stackoverflow.com/questions/695438/safe-characters-for-friendly-url
export const serialize: Serializer<FacetSelections[]> = (
  facetSelectionsArray: FacetSelections[]
): string => {

  if (!facetSelectionsArray || facetSelectionsArray.length === 0) return ''
    // Desired url segment facets=studio.fox~warner~disney_genre.action~sci-fi&
  return facetSelectionsArray.map((fs: FacetSelections): string => (
    fs.name + DELIM.FACET_TO_VALUES + fs.values.join(DELIM.VALUES) 
  )).join(DELIM.FACETS)

}