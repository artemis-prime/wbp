import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core'

import type { NavElement, SimpleHandler } from '../../types'

import { toKebabCase } from '../../util'

import ButtonMenu from './ButtonMenu'
import NavElementMenu from './NavElementMenu'
import LinkButton from '../LinkButton'

import type { CoreAuthService } from '../../types/auth'

const useStyles = makeStyles((theme: any) => ({
  menuGroupOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    '.$rightMenu &': {
      justifyContent: 'flex-end',
    },
    '&:last-child': {
     // paddingLeft: theme.spacing(2)  
    },
    paddingRight: theme.ext.menuButton.paddingLeft 
  },
  menuButton: {
    ...theme.ext.menuButton
  },
  buttonText: {
    ...theme.ext.menuButtonLabel
  },
}))

const MenuButtons: React.FC<{
  auth: CoreAuthService
  navElements: NavElement[]
  handlers?: Map<string, SimpleHandler>
  groupClassName?: string
}>  = observer(({ 
  auth,
  navElements,
  handlers,
  groupClassName
}) => {

  const s = useStyles()
  /*
  const userNameRef = useRef<{
    displayName: string
    uid: string
  } | undefined>(undefined)

  useEffect(() => {
      if (auth.currentIpsumUser && (userNameRef.current?.uid !== auth.currentIpsumUser!.uid)) {
        userNameRef.current = {
          displayName: `${('' + auth.currentIpsumUser!.firstName.charAt(0)).toUpperCase()} ${auth.currentIpsumUser!.lastName}`,  
          uid: auth.currentIpsumUser.uid
        }
      }
      else {
        userNameRef.current = undefined  
      }
  }, [auth.currentIpsumUser])
  */

  return (
    <div className={cx(s.menuGroupOuter, (groupClassName) ? groupClassName : '')} >
      {navElements.map((element) => {
        const buttonVariant = 
          ((element.ext && element.ext.variant) ? element.ext.variant : 'text') as ('text' | 'outlined' | 'contained' | undefined)
        let title = (element.title === 'Account') ? ((auth.currentAuthUser) ? auth.currentAuthUser.displayName : 'Account') : element.title 

        return (
          (!element.loggedInOnly || element.loggedInOnly && !!auth.currentAuthUser) && (element.subElements ? (
            <ButtonMenu
              id={toKebabCase(title)}
              text={title}
              icon={element.uiElement}
              key={toKebabCase(title)}
            >
              <NavElementMenu elements={element.subElements as NavElement[]} handlers={handlers}/>
            </ButtonMenu>
          ) : (
            <LinkButton 
              key={toKebabCase(title)}
              buttonProps={{ 
                size: 'medium',
                variant: buttonVariant,
                className: cx(s.menuButton, 'link-button', `button-variant-${buttonVariant}`),
                classes: {label: s.buttonText}
              }} 
              to={element.to}
            >
              {title}
            </LinkButton >
          )))
      })}
    </div>
  )
}) 

export default MenuButtons
