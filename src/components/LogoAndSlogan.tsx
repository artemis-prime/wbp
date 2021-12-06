import React from 'react'

import { makeStyles } from '@material-ui/core'

import Link from './Link'

const useStyles = makeStyles((theme: any) => ({
  slogan: {
    marginBottom: theme.spacing(2),
  },
  logoLink: {
    textDecoration: 'none',
    display: 'block',
  },
}))

const LogoAndSlogan: React.FC<{
  Logo: React.ComponentType<any>
  logoLink: string
  logoProps?: any
  slogan?: string
}> = ({
  Logo,
  logoLink,
  logoProps,
  slogan
}) => {
  const s = useStyles()

  return (
    <>
    <Link to={logoLink} className={s.logoLink}>
      <Logo {...(logoProps ? logoProps : {})}/>
    </Link>
    {slogan && (
    <p className={s.slogan}>
      {slogan}
    </p>
    )}
    </>
  )
}

export default LogoAndSlogan
