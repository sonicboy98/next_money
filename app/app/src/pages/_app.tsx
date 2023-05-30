import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { SessionProvider } from "next-auth/react"
import { ContextProvider } from '../lib/store/context'


export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    
    <SessionProvider session={session}>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </SessionProvider>
  )
}
