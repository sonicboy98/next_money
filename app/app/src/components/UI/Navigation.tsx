import { State } from "@/lib/interfaces";
import { Context } from "@/lib/store/context";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Component, useContext } from "react";
import { FC } from "react";

type Props = {
  open: boolean;
  id: string;
};


  export const Navigation = ({open,id}:Props) => {

    const { data: session } = useSession();

    const { context, setContext } = useContext(Context);

    const logout = () => {
      const user:State = {
          USER_ID:'',
          EMAIL:'',
          EXPENSES_KEY:'',
          EXPENSES_NAME:'',
      } 
      setContext(user);

      //googleログインが有効な場合
      if(session){
        signOut()
      }    
    }


    return (
        <div>
            {open ? 
            <nav className=" fixed flex flex-col w-3/4 max-w-[300px] min-w-40 p-2 text-black items-center rounded-md top-[50px] left-2 bg-slate-100 shadow-2xl">
              <div className="m-2">MyPage</div>
              <div className="w-full border-b border-gray-300"></div>
              <Link className="m-2" href="/">ダッシュボード</Link>
              <div className="w-full border-b border-gray-300"></div>
              <div className="m-2" onClick={logout}>サインアウト</div>
            </nav>
            :
            <div></div>
            }
        </div>
      )
   };