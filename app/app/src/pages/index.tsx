import Login from "@/components/Login/LoginComponent";
import { useSession } from "next-auth/react";
import Main from '@/components/ExpensesList/view/main'
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
      return true;
    }

    if(context.USER_ID && context.EMAIL){
      return true;
    }

    return false;
  }
  
  if(login){
    return (
      <>
        <Main/>
      </>
    )
  }
  else{
    return (
      <main className='w-screen bg-white' >
        <Login />
      </main>
    )
  }

}


