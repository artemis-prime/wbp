import React from 'react'

import type { CoreAuthService } from '../../types/auth'

import RequestPasswordResetForm from './RequestPasswordResetForm'
import './style.scss'

const RequestPasswordResetPage: React.FC<{
  auth: CoreAuthService
}> = ({
  auth
}) => {
  return (
    <div className='just-form-outer'>
      <RequestPasswordResetForm auth={auth}/>
    </div>
  )
}

export default RequestPasswordResetPage