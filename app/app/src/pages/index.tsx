import Login from "@/components/Login/LoginComponent";
import { useSession } from "next-auth/react";
import Main from "@/components/Main/view/main";

export default function Home() {
  const { data: session } = useSession()
  if(session){
    return (
      <main className='w-screen bg-gradient-to-b from-orange-300 to-white' >
        {/* <div className="fixed w-full h-1/3 top-0 left-0 bg-orange-300 z-[-1]"></div> */}
        <Main/>
      </main>
    )
  }
  else{
    return (
      <main className='w-screen mt-12 bg-white' >
        <Login />
      </main>
    )
  }

}


