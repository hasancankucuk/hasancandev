import '../styles/global.css'
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import Head from 'next/head'
import Header from "../components/header"

function MyApp({ Component, pageProps }) {
  return (
    <>
     <Head>
        <title>Hasan Can Küçük</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Header></Header>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp