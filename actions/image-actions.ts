'use server'

import { passwordSchema } from '@/utils/schemas'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const findImageAction = async (id: string) =>
  await prisma.image.findFirst({
    where: {
      id,
    },
  })

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
        error: [
          {
            message: 'Problem with finding an image',
          },
        ],
      }
    }
    const isMatch = await bcrypt.compare(password, image?.protectionPassword)
    console.log('hash', image?.protectionPassword)
    console.log('isMatch', isMatch)

    return {
      error: null,
      image,
    }
  } catch (e) {
    console.error(e)
  }
}
