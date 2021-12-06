import type { NounDisplay } from '../types'

export const fillNounDisplay = (
  noun: string, 
  specified: NounDisplay | undefined 
): NounDisplay => {
  
  let result: NounDisplay = (specified) ? {...specified} : {}

  if (!(specified && specified.singular)) {
    result.singular = noun
  }
  if (!(specified && specified.plural)) {
    result.plural = result.singular + 's'
  }
  if (!(specified && specified.all)) {
    result.all = result.plural
  }
  if (!(specified && specified.zero)) {
    result.zero = result.plural
  }
  return result
} 

  // display is either just the plural, or an entire NounDisplay
export const pluralize = (
  noun: string, 
  plural?: string | NounDisplay, 
  num?: number, 
): string => {

  const q = (num) ? num : 2 // asking for plural by default

  let displayToUse: NounDisplay = {}
  if (plural && typeof plural === 'string') {
    displayToUse.plural = plural
  } 
  else if (plural) {
    displayToUse = plural as NounDisplay
  }

  const fullDisplay = fillNounDisplay(noun, displayToUse)

  if (q === 0) {
    return fullDisplay.zero as string
  } 
  if ([1, -1].includes(q)) {
    return fullDisplay.singular as string
  } 
  return fullDisplay.plural as string
}
