'use client'

import { useSession, signOut } from '@/lib/auth-client'

export default function Home() {
  const { data } = useSession()
  console.log(data?.session.token)
  console.log(data?.user)
  // find session if you are logged go to login
  // if not go dashboard
  // usenav
  return (
    <>
      <button
        onClick={() => {
          signOut()
        }}
      >
        sign out
      </button>
      <p>homepage</p>
    </>
  )
}
