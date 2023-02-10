import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import widgets from '../content/widgets.json'

const WidgetLink = ({ image, slug }: { image: string; slug: string }) => {
  return (
    <Link href={`/nouns/${slug}`}>
      <div className="mt-16 max-w-sm text-center">
        <img alt="" className="rounded-xl h-40 w-auto" src={image} />
      </div>
    </Link>
  )
}

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
        <p className="mt-12 text-center text-purple font-semibold text-xl">
          Never miss important events in Nouns ecosystem
        </p>
        <h2 className="mt-20 text-center text-3xl font-bold">Nouns DAO</h2>
        <div className="grid grid-cols-2 gap-2">
          {data.nouns.map((e: any, i: number) => {
            return (
              <div key={i} className="w-max">
                <WidgetLink slug={e.slug} image={e.widgetIconImage} />
              </div>
            )
          })}
        </div>
        <h2 className="mt-20 text-center text-3xl font-bold">Lil Nouns DAO</h2>
        <h2 className="mt-20 text-center text-3xl font-bold">Prop House</h2>
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
