import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core'

import Link from './Link'

const useStyles = makeStyles((theme: any) => ({

  copyrightOuter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: theme.palette.text.primary.main,
    '& p': {
      marginRight: theme.spacing(1),
    },
    marginBottom: theme.spacing(2),

    '& a': {
      color: 'inherit',
      textDecoration: 'underline',
    },
  },
}))

const CopyrightAndPrivacy: React.FC<{
  copyrightHolderName: string
  firstYear?: number
  privacyUrl?: string
  termsUrl?: string
  className?: string
}> = ({
  copyrightHolderName,
  firstYear,
  privacyUrl,
  termsUrl,
  className
}) => {
  
  const s = useStyles()

  const currentYear = new Date().getFullYear()
  const copyrightYears =  (firstYear && firstYear < currentYear) ?
    `${firstYear}-${currentYear}` : '' + currentYear

  return (
    <div className={cx(s.copyrightOuter, className ? className : '')}>
      {(privacyUrl || termsUrl) && (
        <p>
          {privacyUrl && (<Link to={privacyUrl}>Privacy Policy</Link>)}
          {(privacyUrl && termsUrl) && (<>&nbsp;/&nbsp;</>)}
          {termsUrl && (<Link to={termsUrl}>Terms of Use</Link>)}
        </p>
      )}
      <p>
        {`© ${copyrightYears} ${copyrightHolderName}. All Rights Reserved.`}
      </p>
    </div>
  )
}

export default CopyrightAndPrivacy
