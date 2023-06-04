
import Main from '../../components/ShareExpenses/view/main'
import Login from "@/components/Login/LoginComponent";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { Context } from '@/lib/store/context'
import { State } from "@/lib/interfaces";

export default function ShareExpenses() {
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
        EXPENSES_KEY:'',
        EXPENSES_NAME:'',

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