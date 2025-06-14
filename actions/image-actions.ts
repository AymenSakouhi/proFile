'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { passwordSchema } from '@/utils/schemas'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const findImageAction = async (id: string) =>
  await prisma.image.findFirst({
    where: {
      id,
    },
  })

export const deleteImageAction = async (id: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.session || !session?.user) {
      redirect('/login')
    }

    const result = await prisma.image.delete({
      where: {
        id,
      },
    })

    return {
      error: null,
      deleted: !!result,
    }
  } catch (e) {
    console.error(e)
  }
  // TODO we need also to add a function for deletion from AWS
}

export const checkImagePassword = async (password: string, id: string) => {
  try {
    const { data, error } = passwordSchema.safeParse({ password })
    if (error) {
      return {
        error: error.flatten((issue) => ({
          message: issue.message,
        })).fieldErrors,
      }
    }

    const image = await prisma.image.findUnique({
      where: {
        id,
      },
    })

    if (!image) {
      return {
        errors: [
          {
            password: {
              message: 'Problem with finding an image',
            },
          },
        ],
      }
    }
    const isMatch = await bcrypt.compare(password, image?.protectionPassword)

    return {
      error: null,
      image,
    }
  } catch (e) {
    console.error(e)
    return {
      errors: [
        {
          password: {
            message: 'Problem with checking password',
          },
        },
      ],
    }
  }
}
