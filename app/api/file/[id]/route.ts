const distURl = process.env.AWS_DISTRIBUTION_URL!

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!id) {
    return new Response('Error', {
      status: 400,
    })
  }
  return Response.json({
    url: `${distURl}/${id}`,
    status: 'success',
  })
}
