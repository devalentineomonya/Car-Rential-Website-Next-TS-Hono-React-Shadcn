'use client'

import { UserProfile } from '@clerk/nextjs'

const DotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  )
}

const CustomPage = () => {
  return (
    <div>
      <h1>Custom Profile Page</h1>
      <p>This is the custom profile page</p>
    </div>
  )
}

const UserProfilePage = () => (
  <UserProfile path="/user/user-profile" routing="path">
    <UserProfile.Page label="Custom Page" labelIcon={<DotIcon />} url="custom-page">
      <CustomPage />
    </UserProfile.Page>

    <UserProfile.Page label="Terms" labelIcon={<DotIcon />} url="terms">
      <div>
        <h1>Custom Terms Page</h1>
        <p>This is the custom terms page</p>
      </div>
    </UserProfile.Page>
  </UserProfile>
)

export default UserProfilePage