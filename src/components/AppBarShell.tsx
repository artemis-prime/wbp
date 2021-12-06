import React, {
  useEffect,
  useLayoutEffect, 
  useRef,
  useState 
} from 'react'

import cx from 'classnames'

import {
  AppBar,
  makeStyles,
  Toolbar,
  useScrollTrigger,
} from '@material-ui/core'

import { useWindowWidth } from '@react-hook/window-size'
import { useIsMobile } from '../util'

import type { BoundingRect, ChangeHandler } from '../types'

const useStyles = makeStyles((theme) => ({

  //  NOTE: Padding is implemented in style/scss-partials/_responsivePadding.scss 
  //  ALSO: Visual styles such as color and transparency
  //  have been moved to sass for convenience with MegaMenu.
  //  see style/scss-partials/_appBarAndMenu.scss

  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '5px',

    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      paddingBottom: 0
    },
  },
}))

const AppBarShell: React.FC<{
  children:           React.ReactNode
  headerClassName:    string
  toolbarClassName?:  string  // will override default sizing responsivity of the header
  onClick?:           React.MouseEventHandler<HTMLElement>
  toolbarResizeListener?: ChangeHandler<BoundingRect>
}> = ({
  children, 
  headerClassName,
  toolbarClassName,
  onClick,
  toolbarResizeListener
}) => {

  const desktop = !useIsMobile()
  const trigger = useScrollTrigger({ threshold: 0, disableHysteresis: true })
  const s = useStyles()

  const toolbarRef = useRef<any>()
  const w = useWindowWidth()
  const [windowWidth, setWindowWidth] = useState<number>(w)

  useEffect(() => {
    setWindowWidth(w)
  }, [w])

  useLayoutEffect(() => {
    if (toolbarRef && toolbarRef.current) {
      const r = toolbarRef.current.getBoundingClientRect()
      if (toolbarResizeListener) {
        toolbarResizeListener(r)
      }
    }
  }, [windowWidth])

  const appBarClass = (desktop) ? ((trigger) ? 'appbar-desktop-scrolled' : 'appbar-desktop-top') : 'appbar-mobile'
  const appBarProps = (onClick) ? { onClick: onClick} : {}

  return (
    <AppBar className={cx('appbar-common', appBarClass, headerClassName)} {...appBarProps}>
      <Toolbar ref={toolbarRef} disableGutters className={cx(s.toolbar, (toolbarClassName) ? toolbarClassName : 'header-inner')}>
        {children}
      </Toolbar>
    </AppBar>
  )
}

export default AppBarShell