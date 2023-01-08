import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query as { username: string }

  const result = await fetch(`https://api.rules.art/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        query {
          user(slug: "${username}") {
            id
          }
        }
        `
    })
  })

  const { data } = await result.json()

  if (data.user) {
    return res.status(200).end()
  } else {
    return res.status(404).end()
  }
}
