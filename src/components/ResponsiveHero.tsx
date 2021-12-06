import React from 'react'
import { makeStyles, useTheme, useMediaQuery } from '@material-ui/core'
import classNames from 'classnames'
import json2mq from 'json2mq'

const useStyles = makeStyles((theme) => ({
  image: {
    height: '90vh',
    [theme.breakpoints.down('sm')]: {
      height: '95vh',
    },
    minHeight: 600,
    position: 'relative',

      // https://www.w3schools.com/howto/howto_css_hero_image.asp
      // Position and center the image to scale nicely on all screens 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  },
  content: {
    
  }
}))

/**
 * imageDefs is an object keyed by breakpoint definitions (as defined in MUI theme),
 * each has an image url, and as set of styles that define how it should be positioned 
 * at that resolution.  Not that there are also 'default' styles applied to the 
 * image via the makeStyles() mechanism, so only include changes.
 * 
 * 'xs' will be used for portrait orientation at any size (w > h)
 * 
<pre>
const HERO = {
  xs: {
    img: '/images/landing/hero-portrait-600x1200.jpg',
    styles: {
      backgroundColor: '#101010',
      backgroundSize: 'cover',
    },
  },
  md: {
    img: '/images/landing/hero-full-1800x800.jpg',
    styles: {
      backgroundPosition: 'top',
      backgroundColor: '#101010',
      backgroundSize: 'contain',
    },
  },
}
</pre>
 * 
 */

interface ImageDesc {
  img: string
  styles: any  
}

interface FullHeroDef {
  xs: ImageDesc
  sm: ImageDesc
  md: ImageDesc
  lg: ImageDesc
  xl: ImageDesc
}

interface HeroDef extends Partial<FullHeroDef> {

}

const ResponsiveHero: React.FC<{
  heroDef: HeroDef
  className: string
}> = ({ 
  heroDef, 
  className, 
  children 
}) => {

  const s = useStyles()
  const theme = useTheme()

  const isPortrait = useMediaQuery(json2mq({ orientation: 'portrait' }))

    // Must call these outside of any loop or conditional at the top level
    // due to the Rules of Hooks.
    // cf: https://reactjs.org/docs/hooks-rules.html
  const thisAndUp: any = {}
  thisAndUp.xs = useMediaQuery(theme.breakpoints.up('xs'))
  thisAndUp.sm = useMediaQuery(theme.breakpoints.up('sm'))
  thisAndUp.md = useMediaQuery(theme.breakpoints.up('md'))
  thisAndUp.lg = useMediaQuery(theme.breakpoints.up('lg'))
  thisAndUp.xl = useMediaQuery(theme.breakpoints.up('xl'))

  let largestMatch = null
  if (isPortrait && ('xs' in heroDef)) {
    largestMatch = 'xs'
  }
  else {
    theme.breakpoints.keys.forEach((breakpoint) => {
      if (thisAndUp[breakpoint] && (breakpoint in heroDef)) {
        largestMatch = breakpoint
      }
    })
  }

  const elementStyles = (largestMatch) ? {
      backgroundImage: `url(${heroDef[largestMatch].img})`,
      ...heroDef[largestMatch].styles
    } : {}

  return (
    <div className={classNames(s.image, className)} style={elementStyles}>
      <div className={s.content}>
        {children}
      </div>
    </div>
  )
}

export default ResponsiveHero
