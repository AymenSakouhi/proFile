'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const collectionSchema = z.object({
  name: z.string().min(3, {
    message: 'This should be a valid email',
  }),
})

export const addCollectionAction = async (name: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.session || !session?.user) {
      redirect('/login')
    }

    const parsedName = collectionSchema.parse({ name })

    const collection = await prisma.collection.create({
      data: {
        name: parsedName.name,
        userId: session.user.id,
      },
    })

    return collection
  } catch (e) {
    console.error('Error:', e)
  }
}

export const getCollections = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.session || !session?.user) {
      redirect('/login')
    }

    const collections = await prisma.collection.findMany()

    return collections
  } catch (e) {
    console.error('Error:', e)
  }
}
