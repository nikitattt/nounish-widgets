import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import widgets from '../content/widgets.json'

const Home: NextPage<{ data: any }> = (props) => {
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
        <div className="flex flex-col gap-2">
          {data.nouns.map((e: any, i: number) => {
            return (
              <Link key={i} href={`/nouns/${e.slug}`}>
                {e.title}
              </Link>
            )
          })}
        </div>
      </main>

      <footer className="flex mt-20"></footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { data: widgets }
  }
}

export default Home
