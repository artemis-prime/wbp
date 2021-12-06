import React from 'react'

import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core'

import styles from './footerLayout.style.js'
const useStyles = makeStyles(styles as any)

const FooterShell: React.FC<{
  className?: string
  LogoAndByline?: React.ComponentType
  logoAndBylineProps?: any
  SocialIcons?: React.ComponentType
  socialIconsProps?: any
  FooterNav?: React.ComponentType
  footerNavProps?: any
  Copyright?: React.ComponentType
  copyrightProps?: any
}> = ({ 
  className,
  LogoAndByline,
  logoAndBylineProps,
  SocialIcons,
  socialIconsProps,
  FooterNav,
  footerNavProps,
  Copyright,
  copyrightProps,
  children
}) => {

  const s = useStyles()

  return (
    <Container component='footer' maxWidth={false} className={className ? className : ''}>
      <div className={'footer-inner'} >
        <Grid container className={s.footerGridContainer}>
          <Grid item xs={12} lg={3} className={s.logoAreaGridItem}>
            {LogoAndByline && (<LogoAndByline {...(logoAndBylineProps ? logoAndBylineProps : {})}/>)}
            {SocialIcons && (<SocialIcons {...(socialIconsProps ? socialIconsProps : {})}/>)}
          </Grid>
          <Grid item xs={12} lg={9} className={s.navGridItem}>
            {FooterNav && (<FooterNav {...(footerNavProps ? footerNavProps : {})}/>)}
            {Copyright && (<Copyright {...(copyrightProps ? copyrightProps : {})}/>)}
          </Grid>
        </Grid>
        {children && (<div className='footer-children'>
          {children}
        </div>)}
      </div>
    </Container>
  )
}

export default FooterShell
