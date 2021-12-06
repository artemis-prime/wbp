import React from 'react' 

import Button, { ButtonProps } from '@material-ui/core/Button'

import { Link as RouterLink } from 'react-router-dom'
import { Link as MaterialLink } from '@material-ui/core'

import type LinkProps from './LinkProps'

  // cf: https://github.com/mui-org/material-ui/issues/7877
interface LinkButtonProps extends LinkProps {
  buttonProps?:    ButtonProps
}

const LinkButton: React.FC<LinkButtonProps> = ({
  buttonProps,
  children,
  to,
  onClick,
  external
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
      <Button component={MaterialLink} {...buttonProps}  {...props}>
        {children}
      </Button>
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
    <Button component={CustomLink} {...buttonProps}  {...props}>
      {children}
    </Button>
  )
}

export default LinkButton
