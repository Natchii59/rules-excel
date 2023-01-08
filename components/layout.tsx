import type { FC, PropsWithChildren } from 'react'
import Head from 'next/head'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='Rules Excel' />
        <meta name='author' content='Nathan Caron' />
        <meta name='author' content='Natchi' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <meta name='twitter:title' content='Rules Excel' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@Natchii59' />
        <meta name='twitter:creator' content='@Natchii59' />
        <meta property='og:site_name' content='Rules Excel' />
        <meta name='og:title' content='Rules Excel' />
        <meta property='og:type' content='website' />
        <title>Rules Excel</title>
      </Head>

      {children}
    </>
  )
}

export default Layout
