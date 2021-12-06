import React from 'react'
import cx from 'classnames'

import { IconButton, makeStyles } from '@material-ui/core'

import type { NavElement } from '../types'
import { toKebabCase } from '../util'

const useStyles = makeStyles((theme: any) => ({

  socialIconRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
    },
  },

  socialIcon: {
    color: theme.palette.text.secondary,
    display: 'block',
    padding: 0,
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
  }
}))

const SocialIcons: React.FC<{
  links: NavElement[]
  className?: string
}> = ({
  links,
  className
}) => {
  
  const s = useStyles()
  return (
    <div className={cx(s.socialIconRow, className ? className : '')}>
      {links.map((navElement: NavElement) => (
        <IconButton href={navElement.to!} key={toKebabCase(navElement.title!)} className={s.socialIcon} target='_blank'>
          {navElement.uiElement!}
        </IconButton>
      ))}
    </div>
  )
}
export default SocialIcons
