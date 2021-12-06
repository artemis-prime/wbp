import type React from 'react'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  onClick?: React.MouseEventHandler<HTMLElement>
  external?: boolean
  to?:  string
}

export default LinkProps

