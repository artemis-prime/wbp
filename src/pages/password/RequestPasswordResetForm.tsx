import React, { useState } from 'react'

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

import  { isValidEmail, errorToString } from '../../util'
import type { CoreAuthService } from '../../types/auth'

interface PasswordResetRequestParams {
  email: string
}

const initialValues: PasswordResetRequestParams = { 
  email: '' 
}

const validate = (values) => {
  const errors: Partial<PasswordResetRequestParams> = {}
  if (!values.email) {
    errors.email = 'required'
  } 
  else if (!isValidEmail(values.email)) {
    errors.email = 'invalid email address'
  }
  return errors
}

const RequestPasswordUpdateForm: React.FC<{
  auth: CoreAuthService
}> = ({
  auth,
  children
}) => {

  const [errorString, setErrorString] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [pseudoTouched, setPseudoTouched] = useState<boolean>(false)

  const handleSubmit = async (values) => {
    try {
      setErrorString(undefined)
      setLoading(true)
      const successString = await auth.requestPasswordReset(values.email)
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
    <div className={`form-outer request-password-form ${success ? 'on-success' : ''}`}>
    {success ? (
      <Paper>
        <h2 className='form-title'>Check your email</h2>
        <p className='prompt-string'>If the email corresponds to an account with us, a reset link was sent to the address you requested.<br/>Please follow the link to reset your password.</p>
      </Paper>
    ) : (
      <Paper>
        <h2 className='form-title'>Reset Password</h2>
        {(!!errorString) ? (
          <h6 className='error-string'>Error: {errorString}</h6>
        ) : (
          <p className='prompt-string'>Please enter the email associated with your account.<br/>A password update link will be sent there.</p>
        )}
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
          validateOnChange
        >
        {({ submitForm, isSubmitting, isValid, handleChange }) => {
          const disableSubmit = 
            isSubmitting || 
            loading ||  
            !isValid || 
            !pseudoTouched // Because there is only one field, we don't want the 'show error on blur (touched)' behavior

          return (
            <Form className='form-root' onKeyDown={(e) => {if (e.key === 'Enter' && !disableSubmit) { submitForm() }}}>
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
                onChange={(e) => { setPseudoTouched(e.target?.value?.length > 0); handleChange(e) }}
              />
              {children}
              {(loading || isSubmitting) && <LinearProgress />}
              <Button
                variant="contained"
                color="primary"
                disabled={disableSubmit}
                onClick={submitForm}
                size='large'
                className='form-button'
              >
                Send Link
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

export default RequestPasswordUpdateForm
