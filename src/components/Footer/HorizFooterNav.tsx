import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core'

import { Link } from '../../components'
import { toKebabCase, mapNavElementHandler } from '../../util'
import type { NavElement, SimpleHandler } from '../../types'

const useStyles = makeStyles((theme: any) => ({

  horizFooter: {
    display: 'flex',
    flexDirection: 'row',

    '& li': {
      padding: theme.spacing(0, 2),
      display: 'block',

      '& a:hover': {
        textDecoration: 'underline !important'
      },

      '&:first-child': {
        paddingLeft: 0
      }
    }
  },

  footerNavLink: {
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  },
}))

const HorizantalFooterNav: React.FC<{
  elements: NavElement[]
  handlers?: Map<string, SimpleHandler>
  className?: string
}> = ({
  elements,
  handlers,
  className
}) => {

  const s = useStyles()

  return (
    <ul className={cx(s.horizFooter, className ? className : '')}>
      {elements.map((item) => {
        const handler = (handlers) ? mapNavElementHandler(item, handlers) : null
        let props: any = {}
        if ('to' in item) {
          props.to = item.to  
        }
        if (handler) {
          props.onClick = handler
        }
        props.external = !!item.external 
        return (
          <li key={toKebabCase(item.title!)}>
            <Link {...props} className={s.footerNavLink}>
              { /* don't display any icons, even if present */}
              {item.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default HorizantalFooterNav
