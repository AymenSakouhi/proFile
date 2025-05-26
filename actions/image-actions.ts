'use server'

import { passwordSchema } from '@/utils/schemas'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const secret = 'your-secret-here'

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

    // check for password if its correct

    const hash = await bcrypt.hash(password, 10)
    console.log('hash', hash)

    return {
      error: null,
      image,
    }
  } catch (e) {
    console.error(e)
  }
}
