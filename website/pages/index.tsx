import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage<{ data: string }> = (props) => {
  const { data } = props

  return (
    <div className="font-sans text-black-text flex flex-col h-screen">
      <Head>
        <title>iamng website</title>
        <meta name="description" content="hi! i'm ng!" />
      </Head>

      <main className="mt-20 px-8 sm:px-20 md:px-40">
        <div className="mt-2">hi! i'm ng</div>
        <div className="mt-2">i create different things:</div>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'/eth-merge-widget'}
        >
          <p className="text-red underline">eth merge widget</p>
        </a>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'https://degenmeter.wtf/'}
        >
          <p className="text-red underline">degen meter</p>
        </a>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'https://iamng.wtf/'}
        >
          <p className="text-red underline">project +1 (coming)</p>
        </a>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'https://iamng.wtf/'}
        >
          <p className="text-red underline">project +2 (coming)</p>
        </a>
        <div className="mt-2">i work on ⌐◨-◨ things:</div>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'https://animatenouns.wtf'}
        >
          <p className="text-red underline">animate nouns</p>
        </a>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'https://fomonouns.wtf'}
        >
          <p className="text-red underline">fomo nouns</p>
        </a>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'https://fomonouns.app'}
        >
          <p className="text-red underline">fomo nouns mobile apps</p>
        </a>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'https://mostwantednouns.wtf'}
        >
          <p className="text-red underline">most wanted nouns (stale)</p>
        </a>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'https://nounsneednames.wtf'}
        >
          <p className="text-red underline">nouns need names (discounted)</p>
        </a>
        <div className="mt-2">⌐◨-◨ iOS widgets:</div>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'/widgets/nouns'}
        >
          <p className="text-red underline">small</p>
        </a>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'/widgets/nouns-medium'}
        >
          <p className="text-red underline">medium</p>
        </a>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'/widgets/lil-nouns/medium'}
        >
          <p className="text-red underline">lil nouns medium</p>
        </a>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'/widgets/prop-house-community'}
        >
          <p className="text-red underline">prop house medium</p>
        </a>
        <a
          className="cursor-pointer"
          target="_blank"
          href={'/widgets/nouns-lock-screen'}
        >
          <p className="text-red underline">lock screen widget</p>
        </a>
        <div className="mt-8 flex flex-row gap-1 items-baseline">
          <div>twitter:</div>
          <a
            className="cursor-pointer"
            target="_blank"
            href={'https://twitter.com/iamng_eth'}
          >
            <p className="text-brand-twitter underline">@iamng_eth</p>
          </a>
        </div>
      </main>

      <footer className="flex mt-20"></footer>
    </div>
  )
}

export default Home
