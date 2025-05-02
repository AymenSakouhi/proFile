import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { Copy } from 'lucide-react'

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

  console.log(user.images)

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
      <p>Your images are here</p>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {user?.images &&
          user.images.map((img) => (
            <div
              className="group w-full h-64 relative cursor-pointer border-4 border-black rounded-md overflow-hidden bg-black/80"
              key={img.path}
            >
              <img
                src={`https://${process.env.AWS_DISTRIBUTION_URL}/${img.path}`}
                alt="Zoom on hover"
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 opacity-100 transition-opacity duration-300 group-hover:opacity-10"
              />
              <p className="absolute text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-[50%] text-3xl text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                <Copy className="size-24" />
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Library
