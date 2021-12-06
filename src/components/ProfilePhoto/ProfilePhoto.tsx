import React from 'react'

  // TODO
const DEFAULT_PROFILE_IMAGE_URL = process.env.PUBLIC_URL + '/default-profile.jpg'

import './profilePhoto.scss'

const ProfilePhoto: React.FC<{
  size: string,
  stacked: boolean,
  url?: string,
  name?: string,
}> = ({
  url,
  name,
  size,
  stacked
}) => {
  
  let photoClasses = 'account-photo rounded-circle'
  if (size) {
    photoClasses = photoClasses + ` account-photo-${size}`
  }
  if (stacked) {
    photoClasses = photoClasses + ' account-photo-stacked'
  }
  
  const photoURL = (url) ? url : DEFAULT_PROFILE_IMAGE_URL
  
  const onError = (e: any) => {
    e.target.src = DEFAULT_PROFILE_IMAGE_URL;
  }
 
  return (
    <img src={photoURL} alt={name} className={photoClasses} onError={onError} />
  )
}

export default ProfilePhoto