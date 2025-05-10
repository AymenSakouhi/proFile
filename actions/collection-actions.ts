'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { collectionSchema } from '@/utils/schemas'

export const addCollectionAction = async (name: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.session || !session?.user) {
      redirect('/login')
    }

    const { data, error } = collectionSchema.safeParse({ name })

    if (error) {
      return {
        error: error.flatten((issue) => ({
          message: issue.message,
        })).fieldErrors,
        collection: null,
      }
    }

    const collection = await prisma.collection.create({
      data: {
        name: data?.name,
        userId: session.user.id,
      },
    })

    return {
      error,
      collection,
    }
  } catch (e) {
    console.error('Error:', e)
  }
}

export const deleteCollectionAction = async (id: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.session || !session?.user) {
      redirect('/login')
    }

    const collection = await prisma.collection.delete({
      where: {
        id,
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

    const collections = await prisma.collection.findMany({
      include: {
        images: true,
      },
    })

    return collections
  } catch (e) {
    console.error('Error:', e)
  }
}
