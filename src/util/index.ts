import { useMediaQuery, useTheme } from '@material-ui/core'

import type { SimpleHandler, NavElement } from '../types'

export const useIsMobile = (): boolean => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('sm'))
}

export const mapNavElementHandler = (
  el: NavElement, 
  map?: Map<string, SimpleHandler>
): SimpleHandler | undefined => {
  if (el.handler) return el.handler
  if (el.namedHandler) {
    if (!map) {
      throw new Error('mapNavElementHandler(): NavElement contains named handler, but no Map was provided!')
    }
    const handler = (map as Map<string, SimpleHandler>).get(el.namedHandler)
    if (!handler) {
      throw new Error(`mapNavElementHandler(): NavElement contains named handler, but Map contains no function matching ${el.namedHandler}!`)
    }
    return handler
  }
  return undefined
} 

export const isValidEmail = (str: string): boolean => (
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str)
) 


  // https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-123.php
export const toKebabCase = (str: string): string => {
  const regex = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
  const arr: any = (str) ? str.match(regex) : []

  return arr.map(x => x.toLowerCase()).join('-')
}

export const toCamelCase = (str: string): string => {
  return (str.slice(0, 1).toLowerCase() + str.slice(1))
    .replace(/([-_ ]){1,}/g, ' ')
    .split(/[-_ ]/)
    .reduce((cur, acc) => {
      return cur + acc[0].toUpperCase() + acc.substring(1);
    });
}

export const toPascalCase = (str: string): string => {
  return capitalize(toCamelCase(str))
}

export const capitalize = (str: string): string => (
  str.charAt(0).toUpperCase() + str.slice(1)
)

export const splitCamelOrPascalCase = (str: string): string => {
  const camelCase = str.charAt(0).toUpperCase() + str.slice(1) 
  return camelCase.replace(/([0-9A-Z])/g, ' $&')
}
 

  // https://fettblog.eu/typescript-typing-catch-clauses/
export const errorToString = (e: any): string => {
  let result: string
  if (e instanceof Error) {
    result = e.message
  }
  else if (typeof e === 'string') {
    result = e as string
  }
  else {
    result = e.toString()
  }
  return result
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export { 
  pluralize, 
  fillNounDisplay 
} from './pluralize'

export { default as FieldRenderer } from './FieldRenderer'
export type { FieldRenderDescriptor, RenderedFieldProps } from './FieldRenderer'

//export { default as creditCardImageUrlFromType, renderDefaultCCImage } from './ccImageFromType'
//export type { ImageDesc } from './ccImageFromType' // promote this?

export { default as Bouncer} from './Bouncer'
export { default as Strings} from './Strings'

export { default as firstNWords } from './firstNWords' 

export { default as TypographyTest } from './TypographyTest'

