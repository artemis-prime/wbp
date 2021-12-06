import React from 'react'
import cx from 'classnames'

import { Grid, makeStyles } from '@material-ui/core'

import { Link } from '../../components'
import { toKebabCase, mapNavElementHandler } from '../../util'
import type { NavElement, SimpleHandler } from '../../types'

const useStyles = makeStyles((theme: any) => ({

  navGridContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'stretch',
    },
  },
  navSectionGridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(3),
  },
  navSectionTitle: {
    fontSize: '1.3rem',
  },
  footerNavLink: {
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  },
  navSectionHR: {
    margin: 0,
    marginBottom: theme.spacing(3),
    display: 'block',
    width: '90%',
    borderWidth: '0 0 1px 0',
    borderColor: theme.palette.divider,
  },
}))

const FullFooterNav: React.FC<{
  sections: NavElement[]
  handlers?: Map<string, SimpleHandler>
  className?: string
}> = ({
  sections,
  handlers,
  className
}) => {

  const s = useStyles()
  return (
    <Grid container className={cx(s.navGridContainer, 'footer-nav', className ? className : '')}>
      {sections.map((section) => (
        <Grid item xs={6} md={3} key={toKebabCase(section.title)} className={s.navSectionGridItem} >
          <h6 className={s.navSectionTitle} >{section.title}</h6>
          <hr className={s.navSectionHR} />
          <ul>
          {section.subElements && section.subElements.map((item) => {
            const handler = handlers ? mapNavElementHandler(item, handlers) : null
            let props: any = {}
            if ('to' in item) {
              props.to = item.to  
            }
            if (handler) {
              props.onClick = handler
            }
            props.external = !!item.external 
            return (
              <li key={toKebabCase(item.title)}>
                <Link {...props} className={s.footerNavLink}>
                  { /* don't display any icons, even if present */}
                  {item.title}
                </Link>
              </li>
            )
          })}
          </ul>
        </Grid>
      ))}
    </Grid>
  )
}

export default FullFooterNav
