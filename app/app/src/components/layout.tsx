import Header from "./UI/Header";


export const appName = "Sample App"

function Layout({ children }:any) {

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