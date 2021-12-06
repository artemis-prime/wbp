import React from 'react'
import classNames from 'classnames'

import { makeStyles, SwipeableDrawer } from '@material-ui/core'

  // https://material-ui.com/~/components/drawers/
const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

const useStyles = makeStyles((theme) => ({
  drawerOuter: {
    overflow: 'hidden',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  drawerContents: {
    flexGrow: 1,
    overflow: 'auto',
  },
}))

const SideDrawer: React.FC<{
  open: boolean
  setOpen: (boolean) => void
  width: number
  maxWidth: number
  anchor: "bottom" | "left" | "right" | "top",
  className?: string
}> = ({
  open,
  setOpen,
  width,
  maxWidth,
  anchor,
  className,
  children
}) => {

  const s = useStyles()
  return (
    <SwipeableDrawer 
      disableBackdropTransition={!iOS} 
      disableDiscovery={iOS} 
      disableSwipeToOpen={true}
      className={className ? className : ''}
      open={open}
      onOpen={(ignore) => setOpen(true)}
      onClose={(ignore) => setOpen(false)}
      variant="temporary"
      anchor={anchor}
      transitionDuration={0}
      SlideProps={{
        timeout: {appear: 0, enter: 100, exit: 100} 
      }}
    >
      <div className={classNames(s.drawerOuter, className)} style={{ width, maxWidth }}>
        <div className={s.drawerContents} >
          {typeof children === 'function' ? children() : children}
        </div>
      </div>
    </SwipeableDrawer>
  )
}

export default SideDrawer
