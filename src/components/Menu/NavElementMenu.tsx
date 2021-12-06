import React from 'react'
import cx from 'classnames'

import { 
  MenuItem,
  MenuList,
  makeStyles,
} from '@material-ui/core'

import Link from '../Link'
import type {
 NavElement, 
 SimpleHandler 
} from '../../types'

import { mapNavElementHandler, toKebabCase } from '../../util'

const useStyles = makeStyles((theme) => ({
  menu: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  menuItem: {
    paddingLeft: '4px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '& > *': {
      display: 'block'
    },
    '&:hover': {
      backgroundColor: 'initial',
    }
  },
  menuItemLink: {
    color: theme.palette.text.primary,
    width: '100%',
    borderBottom: '3.5px transparent solid',
    fontSize: '0.8rem',
    '&:hover': {
      textDecoration: 'none',
      borderBottom: `3.5px ${theme.palette.primary.main} solid`,
    },
  },
  elementIcon: {
    paddingBottom: 0,
    paddingRight: '3px'
  },
  elementTitle: {
    paddingBottom: 0
  }
}))

const NavElementMenu: React.FC<{
  elements: NavElement[]
  handlers?: Map<string, SimpleHandler>
  hideIcons?: boolean
  hideTitles?: boolean
}> = ({ 
  elements,
  handlers,
  hideIcons,
  hideTitles
}) => {
  const s = useStyles()
  return (
    <MenuList className={s.menu}>
    {elements.map((item) => {
      let props: any = {}
      if ('to' in item) {
        props.to = item.to  
      }
      const handler = mapNavElementHandler(item, handlers)
      if (handler) {
        props.onClick = handler
      }
      props.external = !!item.external 
      return (
        <MenuItem key={toKebabCase(item.title)} className={s.menuItem}>
          <Link {...props} className={cx(s.menuItemLink, 'textColorPrimary')}>
            {(!!!hideIcons && item.uiElement) && <span className={s.elementIcon}>{item.uiElement}</span>}
            {(!!!hideTitles && item.title) && <span className={s.elementTitle}>{item.title}</span>}
          </Link>
        </MenuItem>
      )
    })}
    </MenuList>
  )
}

export default NavElementMenu
