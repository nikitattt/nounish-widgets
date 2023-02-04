import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
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
        <div className="max-w-sm mx-auto">
          <Image
            src="/img/nouns/medium-general/icon.png"
            width="1000"
            height="500"
            alt=""
          />
        </div>
        <h1 className="mt-8 text-center text-6xl font-black tracking-tight">
          Nounish Widgets
        </h1>
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
