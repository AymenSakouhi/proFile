import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Image from 'next/image'

const Library = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session?.session || !session?.user) {
    return <div>Not authenticated</div>
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      images: true,
    },
  })

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
      <p>Your images are here</p>
      <ul>
        {user?.images &&
          user.images.map((img) => (
            <li key={img.path}>
              <Image
                width={100}
                height={100}
                alt={img.id}
                src={`https://${process.env.AWS_DISTRIBUTION_URL}/${img.path}`}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Library
