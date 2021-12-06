import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedium } from '@fortawesome/free-brands-svg-icons'

const MarkerIcon: React.FC<any> = () => (
  <span style={{display: 'block', textAlign: 'left'}}>
    <FontAwesomeIcon className='fa-icon' icon={faMedium} size='2x'/>
  </span>
)

export default MarkerIcon