import Head from "next/head";
import Image from 'next/image';
import Header from "./UI/Header";


export const appName = "Sample App"

function Layout({ children }:any) {

    const buttonAlert = () => {
        alert('Clicked!');
    }

  return (
    <header>
        <Header />
      <main>
        { children }
      </main>
    </header>
  );
}

export default Layout;