import React from 'react'

import { Link as RouterLink } from 'react-router-dom'
import { Link as MaterialLink } from '@material-ui/core'

import type LinkProps from './LinkProps'

const Link: React.FC<LinkProps> = ({ 
  to, 
  onClick, 
  children, 
  external,
  ...rest
}) => {

  let props: any = {}
  if (to) {
    props[(external) ? 'href' : 'to'] = to
  }
  else {
    props[(external) ? 'href' : 'to'] = '#'
  }

  // could be used as a "post process"
  if (onClick) {
    props.onClick = onClick
  }
  
  if (external) {
    return (
      <MaterialLink {...props} {...rest}>
        {children}
      </MaterialLink>
    )  
  }

  const CustomLink = React.useMemo(
    () => (
      React.forwardRef<HTMLAnchorElement>((linkProps, ref) => (
        <RouterLink ref={ref} {...linkProps} {...props}/>
      ))
    ),
    [to],
  )

  return (
    <MaterialLink component={CustomLink} {...rest} {...props}>
      {children}
    </MaterialLink>
  )
}

export default Link