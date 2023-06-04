import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { SessionProvider } from "next-auth/react"
import { Context, ContextProvider } from '../lib/store/context'
import { useContext, useEffect } from 'react'
import router from 'next/router'




export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {

  const { context, setContext } = useContext(Context);

  // useEffect(() => {
  //   if (context.USER_ID == ''){
  //     router.push('/')
  //   }

  // }, [context]);


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
