import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: any) => ({
  statusTag: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    fontSize: '0.7rem',
    borderRadius: theme.shape.borderRadius,
    fontWeight: 'bold',
    verticalAlign: '3px',
  },
  
  tagIcon: {
    width: '0.7rem',
    height: '0.7rem',
    marginLeft: 4
  },
}))

export interface TagBubbleDesc {
  code: string
  text: string
  Icon?: React.ComponentType<{className: string}>
  textColor?: string
  bgColor?: string
  onClick?(code: string): void
}

const TagBubble: React.FC<TagBubbleDesc> = ({ 
  code,
  text,
  Icon,
  textColor,
  bgColor,
  onClick
}) => {

  const s = useStyles()

  const styles: any = {}
  if (textColor) {
    styles.color = textColor
  }
  if (bgColor) {
    styles.backgroundColor = bgColor
  }

  const params: any = {}
  if (onClick) {
    params.onClick = onClick
  }

    return (
      <span 
        className={cx(s.statusTag, 'tag-bubble', `tag-bubble-${code}`)} 
        style={styles}
        {...params}
      >
        {text} {Icon && (<Icon className={s.tagIcon} />)}
      </span>
    )
}

export default TagBubble