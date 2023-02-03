import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage<{ data: string }> = (props) => {
  const { data } = props

  return (
    <div className="font-sans text-black-text flex flex-col h-screen">
      <Head>
        <title>Nouns Widgets</title>
        <meta
          name="description"
          content="Explore iOS Widgets build for nouns ecosystem"
        />
      </Head>

      <main className="mt-20 px-8 sm:px-20 md:px-40">
        <div className="mt-2">Nounish Widgets</div>
      </main>

      <footer className="flex mt-20"></footer>
    </div>
  )
}

export default Home
