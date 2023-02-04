import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useDownloader from 'react-use-downloader'

import widgets from '../../content/widgets.json'

const NounsWidgetPage: NextPage<{ data: any }> = (props) => {
  const { data } = props

  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader()

  return (
    <div className="font-sans text-black-text flex flex-col h-screen">
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@iamng_eth" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image" content={data.shareImage} />

        {/* Open Graph */}
        <meta property="og:url" content={data.url} />
        <meta property="og:image" content={data.shareImage} />
        <meta property="og:site_name" content="nounswidgets" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.title} />
      </Head>

      <main className="max-w-screen-md mx-auto my-20 text-center text-lg px-8">
        <div className="w-56 h-28 mx-auto mb-20 shadow-lg rounded-2xl">
          <Image alt="" src={data.widgetIconImage} height={485} width={970} />
        </div>
        <h1 className="font-black text-5xl text-red">{data.title}</h1>
        <div className="mt-4 text-2xl">{data.description}</div>
        <div className="mt-16">
          <Image
            alt=""
            className="rounded-xl"
            src={data.widgetPromoImage}
            height={800}
            width={1200}
          />
        </div>
        <div className="mt-10">The how-to👇</div>
        <div className="text-6xl font-black p-10 text-yellow">1</div>
        <div className="mt-2">
          Download the Scriptable app. It's required to create a widget.
        </div>
        <div className="flex flex-row gap-1 items-baseline justify-center">
          <div className="mt-2">Link:</div>
          <a
            className="cursor-pointer"
            target="_blank"
            href={'https://apps.apple.com/us/app/scriptable/id1405459188?uo=4'}
          >
            <p className="text-blue underline">App Store</p>
          </a>
        </div>
        <div className="mt-4">
          <Image
            alt=""
            className="rounded-xl"
            src="/img/widgets/shared/scriptable.png"
            height={793}
            width={1291}
          />
        </div>
        <div className="text-6xl font-black p-10 text-yellow">2</div>
        <div className="mt-2">Download widget code!</div>
        <div className="mt-6 flex flex-col gap-1 items-center justify-center">
          {/* <a
                        className="cursor-pointer px-12 py-5 bg-blue rounded-2xl hover:bg-white hover:border-blue border-4 text-white  hover:text-blue"
                        ref={copyCodeButtonRef}
                        data-tip='Copied!'
                        onClick={() => {
                            fetch(data.widgetCode)
                                .then((r) => r.text())
                                .then((text) => {
                                    navigator.clipboard.writeText(String(text)).then(() => {
                                        if (copyCodeButtonRef.current) {
                                            ReactTooltip.show(copyCodeButtonRef.current)
                                        }
                                    })
                                })
                        }}
                    >
                        <p className="font-bold">Copy Code</p>
                    </a> */}
          <button
            className="cursor-pointer px-12 py-5 bg-blue rounded-2xl hover:bg-white hover:border-blue border-4 text-white  hover:text-blue"
            onClick={() => {
              // if (
              //   navigator.canShare &&
              //   navigator.canShare({
              //     files: [data.script.path]
              //   })
              // ) {
              navigator.share({
                text: 'I want to share this'
                // files: [data.script.path]
              })
              // } else {
              //   window.alert('cannot share')
              // }
              // download(data.script.path, data.script.fileName)
            }}
          >
            <p className="font-bold">Download</p>
          </button>
        </div>
        {/* <div className="mt-2 flex flex-row gap-1 items-baseline justify-center text-sm">
                    <a
                        className="cursor-pointer"
                        target="_blank"
                        href={data.widgetCode}
                    >
                        <p className="text-blue underline">View Raw</p>
                    </a>
                </div> */}
      </main>

      <footer className="flex mb-20"></footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const widget = widgets.nouns.find((e) => e.slug === context.params!.slug)

  return {
    props: { data: widget }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = widgets.nouns.map((e) => {
    return { params: { slug: e.slug } }
  })

  return {
    paths: paths,
    fallback: false // can also be true or 'blocking'
  }
}

export default NounsWidgetPage
