import React from 'react'
import cx from 'classnames'

import { 
  makeStyles,
  Switch, 
  Tooltip,  
} from '@material-ui/core'

const useStyles = makeStyles((theme: any) => ({

  rightLabel: {},
  leftLabel: {},

  outer: {
    cursor: 'pointer',
    '&.disabled': {
      cursor: 'default',
    }
  },

  label: {
    '$outer.disabled &': {
      color: 'grey' 
    }
  }  
}))

const BinarySwitch: React.FC<{
  name: string
  ariaLabel: string
  leftLabel: string
  rightLabel: string
  isRight: boolean
  setRight(b: boolean): void
  disabled?: boolean 
  muiColor?: 'primary' | 'secondary' | 'default' | undefined
  outerClass?: string
  leftClass?: string
  rightClass?: string
}> = ({
  name,
  ariaLabel,
  leftLabel,
  rightLabel,
  isRight,
  setRight,
  disabled,
  muiColor = 'primary', 
  outerClass,
  leftClass,
  rightClass
}) => {

  const s = useStyles()

  const leftClick = () => {!disabled && setRight(false)}
  const rightClick = () => {!disabled && setRight(true)}

  const Inner = React.forwardRef<HTMLDivElement>((props, ref) => (
    <div {...props} ref={ref} className={cx(s.outer, (disabled ? 'disabled' : ''), (outerClass ? outerClass : ''))} >
      <span onClick={leftClick} className={cx(s.leftLabel, s.label, (leftClass ? leftClass : ''))}>{leftLabel}</span>
      <Switch
        checked={isRight}
        onChange={() => setRight(!isRight)}
        name={name}
        disabled={disabled}
        color={muiColor}
        inputProps={{ 'aria-label': ariaLabel }}
      />
      <span onClick={rightClick} className={cx(s.rightLabel, s.label, (rightClass ? rightClass : ''))}>{rightLabel}</span>
    </div>
  ))

  return (disabled) ? (
    <Tooltip arrow title='Only Test mode is available to free accounts. Please contact us to enable production.'>
      <Inner />
    </Tooltip>
  ): (
    <Inner />
  )
}

export default BinarySwitch
