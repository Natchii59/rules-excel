import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ScarcityColor, SortedCards } from '../../lib/types'
import React from 'react'

type keyOfScarcityColor = keyof typeof ScarcityColor

export default function Home({
  cards,
  username
}: {
  cards: SortedCards
  username: string
}) {
  return (
    <>
      <Head>
        <title>Rules Excel - {username}</title>
        <meta name='description' content={`Rules Excel - ${username}`} />
        <meta name='twitter:title' content={`Rules Excel - ${username}`} />
        <meta property='og:site_name' content={`Rules Excel - ${username}`} />
        <meta name='og:title' content={`Rules Excel - ${username}`} />
      </Head>

      <div className='flex items-start gap-6'>
        {Object.keys(cards).map((scarcity: string) => (
          <table
            key={scarcity}
            className='flex flex-col items-center gap-1 border border-zinc-300'
          >
            <thead
              className={`w-full py-1 px-2 border-b border-zinc-300 ${
                ScarcityColor[scarcity as keyOfScarcityColor]
              }`}
            >
              <tr>
                <th key={scarcity} colSpan={2}>
                  {scarcity}
                </th>
              </tr>
            </thead>

            <tbody>
              {cards[scarcity].map((card) => (
                <tr key={card.cardModel.id}>
                  <td className='pr-4'>{`${card.cardModel.artist.displayName} - S${card.cardModel.season}`}</td>
                  <td>
                    {card.serials.map<React.ReactNode>((serial, index) => (
                      <>
                        <a
                          key={serial}
                          href={`https://rules.art/card/${card.cardModel.slug}/${serial}`}
                          className='hover:underline'
                        >
                          {serial}
                        </a>
                        {card.serials.length > index + 1 ? ', ' : ''}
                      </>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as { username: string }

  const result = await fetch(
    `https://${context.req.headers.host}/api/user/${username}`
  )

  if (!result.ok) {
    return {
      notFound: true
    }
  }

  const data = await result.json()

  return {
    props: {
      ...data,
      username
    }
  }
}
