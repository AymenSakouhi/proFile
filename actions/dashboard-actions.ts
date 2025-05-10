'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const getImagesAction = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.session || !session?.user) {
      redirect('/login')
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        images: true,
      },
    })

    return user?.images ? user.images : []
  } catch (e) {
    console.error('Please Log in first', e)
  }
}
