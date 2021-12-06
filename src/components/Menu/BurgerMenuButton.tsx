import React from 'react'

import { IconButton, makeStyles } from '@material-ui/core'
import { MenuRounded as BurgerIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({

  button: {
    marginRight: '-12px', // so button appears round on hover but is aligned w left margin
  },

  icon: {
    width: '32px',
    height: '32px'
  },
}))

const BurgerMenuButton: React.FC<{
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}> = ({ 
  onClick 
}) => {
  const s = useStyles()
  return (
    <IconButton onClick={onClick} className={s.button}>
      <BurgerIcon className={s.icon} />
    </IconButton>
  )
}

export default BurgerMenuButton
