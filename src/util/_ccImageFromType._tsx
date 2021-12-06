import React, { ReactElement } from 'react' 
import cx from 'classnames'

import { PaymentRounded } from '@material-ui/icons'

import visaImage from './cc-images/VisaCard.svg'
import masterCardImage from './cc-images/MasterCard.svg'
import discoverCardImage from './cc-images/DiscoverCard.svg'
import amexCardImage from './cc-images/AmexCard.svg'

export interface ImageDesc {
  url: string,
  alt: string
}

const cardMap = new Map<string, ImageDesc>([
  ['visa', { 
    url: visaImage,
    alt: 'Visa'
  }],
  ['mastercard', { 
    url: masterCardImage,
    alt: 'MasterCard'
  }],
  ['discover', { 
    url: discoverCardImage,
    alt: 'Discover Card'
  }],
  ['amex', { 
    url: amexCardImage,
    alt: 'American Express Card'
  }],
])

export const renderDefaultCCImage = (
  color?: 'inherit' | 'action' | 'disabled' | 'primary' | 'secondary' | 'error' | undefined,
  className?: string
): ReactElement => {
  
  return <PaymentRounded color={color ? color : 'primary'} className={cx('cc-default-image', (className) ? className : '' )} />
}

export default cardMap.get.bind(cardMap)