import algoliasearch from 'algoliasearch'
import { NextApiRequest, NextApiResponse } from 'next'
import { Card, CardModel, SortedCards } from '../../../lib/types'

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
            username
            starknetWallet {
              address
            }
          }
        }
        `
    })
  })

  if (!result.ok) return res.status(404).end()

  const { user } = (await result.json()).data

  const client = algoliasearch(
    process.env.ALGOLIA_ID!,
    process.env.ALGOLIA_KEY!
  )
  const index = client.initIndex('cards-artist-asc')

  const searchResult = await index.search('', {
    filters: `ownerStarknetAddress:${user.starknetWallet.address}`,
    hitsPerPage: 1000
  })

  const cardsIds = searchResult.hits.map((card) => card.objectID)

  const resultCards = await fetch(`https://api.rules.art/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        query {
          cardsByIds(ids: ${JSON.stringify(cardsIds)}) {
            id
            serialNumber
            cardModel {
              id
            }
          }

          allCardModels {
            id
            season
            slug
            scarcity {
              name
            }
            artist {
              displayName
            }
          }
        }
        `
    })
  })

  const { data } = (await resultCards.json()) as {
    data: { cardsByIds: Card[]; allCardModels: CardModel[] }
  }

  const cards: SortedCards = {}

  for (let card of data.allCardModels) {
    if (!Object.keys(cards).includes(card.scarcity.name)) {
      cards[card.scarcity.name] = []
    }

    cards[card.scarcity.name].push({
      cardModel: card,
      serials: data.cardsByIds
        .filter((c) => c.cardModel.id === card.id)
        .map((c) => c.serialNumber)
    })
  }

  res.status(200).json({ cards })
}
