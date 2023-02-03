import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

const NounsWidgetPage: NextPage<{ data: string }> = (props) => {
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
        <div className="mt-2">Nouns Widget</div>
      </main>

      <footer className="flex mt-20"></footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { widgets: {} }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { name: 'small' } }, { params: { name: 'medium' } }],
    fallback: false // can also be true or 'blocking'
  }
}

export default NounsWidgetPage
