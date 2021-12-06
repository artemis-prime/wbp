import React from 'react'

import type { CoreAuthService } from '../../types/auth'

import LoginForm from './LoginForm'

const LoginPage: React.FC<{
  auth: CoreAuthService
  defaultRoute?: string
}> = ({
  auth,
  defaultRoute 
}) => (
  <div className='just-form-outer'>
    <LoginForm defaultRoute={defaultRoute} auth={auth}/>
  </div>
)

export default LoginPage
