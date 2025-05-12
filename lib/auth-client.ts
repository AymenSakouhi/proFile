import { createAuthClient } from 'better-auth/react'
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: 'http://localhost:3000',
})

export const { signIn, signUp, signOut, useSession } = authClient

export type Session = typeof authClient.$Infer.Session

export type User = Session['user']

export const githubSignIn = async () => {
  await signIn.social({
    provider: 'github',
  })
}
