import type { ReactNode } from 'react'
import type { SimpleHandler } from './ChangeHandler'

interface NavElement {
  title:          string
  desc?:          string      // short description of the link (for larger menus)   
  value?:         string      // for tabs
  to?:            string
  uiElement?:     ReactNode   // eg, Icon
  handler?:       SimpleHandler  // only case were href is unnecessary
  namedHandler?:  string      // named local function
  external?:      boolean
  subElements?:   NavElement[]
  loggedInOnly?:  boolean      // only visible to logged in users 
  ext?:           any         // Whatevs
}

export default NavElement