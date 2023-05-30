import Login from "@/components/Login/LoginComponent";
import { useSession } from "next-auth/react";
import Main from "@/components/Main/view/main";
import { useContext, useEffect, useState } from "react";
import { Context } from '../lib/store/context'
import { State } from "@/lib/interfaces";

export default function Home() {
  const { data: session } = useSession();
  const { context, setContext } = useContext(Context);
  const [login,setLogin] = useState(false);

  useEffect(() => {
    setLogin(setUser());
  }, [context,session]);

  //ログイン状態前処理
  const setUser = () => {

    if(session){
      const id = session.user?.name as string;
      const email = session.user?.email as string;
      const user:State = {
        USER_ID:id,
        EMAIL:email,
      } 
      setContext(user);
      return true;
    }

    if(context.USER_ID && context.EMAIL){
      return true;
    }

    return false;
  }
  
  if(login){
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


