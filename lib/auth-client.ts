import { createAuthClient } from 'better-auth/react'
export const { signIn, signUp, signOut, useSession } = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: 'http://localhost:3000',
})

export const githubSignIn = async () => {
  await signIn.social({
    provider: 'github',
  })
}
