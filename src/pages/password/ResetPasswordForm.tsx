import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { 
  Button,
  LinearProgress,
  Paper
} from '@material-ui/core'

import {
 Formik, 
 Field, 
 Form 
} from 'formik'

import { TextField } from 'formik-material-ui'
import * as QueryString from 'query-string'

import type { CoreAuthService } from '../../types/auth'
import { errorToString } from '../../util'
import { LinkButton } from '../../components'

interface PasswordUpdateValues {
  password: string  
  password2: string  
}

const initialValues: PasswordUpdateValues = { 
  password: '', 
  password2: '', 
}

const validate = (values) => {
  const errors: Partial<PasswordUpdateValues> = {}
  if (!values.password) {
    errors.password = 'required'
  }
  else if (values.password.length < 6) {
    errors.password = 'must be at least 6 characters'
  }
  else if (
    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#$@!%&*?]).*$/i.test(values.password)
  ) {
    errors.password = 'Must contain at least 1 uppercase letter,<br/>1 lowercase letter, 1 digit (0-9), and one special character'
  }
  else if (values.password !== values.password2) {
    errors.password2 = 'passwords must match'
  }
  return errors
}

const ResetPasswordForm: React.FC<{
  auth: CoreAuthService
  prompt: string 
}> = ({
  auth,
  prompt,
  children
}) => {

  const [errorString, setErrorString] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const location = useLocation()

  const handleSubmit = async (values) => {
    try {
      setErrorString(undefined)
      setLoading(true)
      const params = QueryString.parse(location.search)
      await auth.resetPassword(params.oobCode as string, values.password)
      setSuccess(true)
    } 
    catch (e) {
      setErrorString(errorToString(e))
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className={`form-outer signup-form ${success ? 'on-success' : ''}`}>
    {success ? (
      <Paper>
        <SuccessNotification />
      </Paper>
    ) : (
      <Paper>
        <h2 className='form-title'>{prompt}</h2>
        {!!errorString && (
          <h6 className='error-string'>{errorString}</h6>
        )}
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
        {({ submitForm, isSubmitting, touched, isValid }) => {
          const disableSubmit = isSubmitting || loading ||  !isValid || !(Object.keys(touched).length)
          return (
            <Form className='form-root' onKeyDown={(e) => {if (e.key === 'Enter' && !disableSubmit) { submitForm() }}}>
              <Field
                component={TextField}
                name="password"
                type="password"
                label="Password"
              />
              <Field
                component={TextField}
                name="password2"
                type="password"
                label="Confirm password"
              />
              {children}
              {(isSubmitting || loading) && <LinearProgress />}
              <Button
                variant="contained"
                color="primary"
                disabled={disableSubmit}
                onClick={submitForm}
                size='large'
                className='form-button'
              >
                Save Password
              </Button>
            </Form>
          )
        }}      
        </Formik>
      </Paper>
    )} 
    </div>
  )
} 

export default ResetPasswordForm

const SuccessNotification = (props) => (<>
  <h2 className='form-title'>Password successfully updated.</h2>
  <p className='prompt-message'>Please login with your new password</p>
  <div className='login-button-outer'>
    <LinkButton to="/login" buttonProps={{ size: 'large', style: {minWidth: '120px'} }}>Log In</LinkButton>
  </div>
</>)