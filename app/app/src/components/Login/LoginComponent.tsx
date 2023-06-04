import { useSession, signIn, signOut } from "next-auth/react"
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "@/lib/store/context";
import { State } from "@/lib/interfaces";
import Link from 'next/link'

export default function Login() {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  //アカウント情報グローバル
  const { context, setContext } = useContext(Context);

  type IUserTable = {
    USER_ID:string;
    PASSWORD:string;
    EMAIL:number;
    CREATE_DATE:number;
  }

    //データベースInsert処理
    const getLoginData = () =>{
      const req = {
        USER_ID:id,
        PASSWORD:password,
        EMAIL:'',
        CREATE_DATE:'',
      }
      const res = axios.post('/api/getLogin',req)
      res.then(res_data => {
        const user:State = {
          USER_ID:res_data.data[0].USER_ID,
          EMAIL:res_data.data[0].EMAIL,
          EXPENSES_KEY:'',
          EXPENSES_NAME:'',
        } 

        setContext(user);
      })
      .catch(err => {
          alert('IDもしくはパスワードが間違っています。');
          //console.log(err)
      })
  }


  return (
    <div className="h-screen text-black">

      <div className="flex justify-center">
        <div className="mt-10 text-3xl text-black">yzexpensesにログイン</div>
      </div>

      <div className="flex justify-center">
        <button disabled className="w-3/4 h-14 mt-20 border rounded-lg border-black text-black" onClick={() => signIn()}>Google Sign In</button> 
      </div>

      <div className="flex justify-center mt-5">
        <div className=" text-lg text-black">or</div>
      </div>

      {/* ID */}
      <div className="flex justify-center mt-5">
        <input className="w-3/4 h-14" type="text" placeholder="ユーザーID" value={id} onChange={(event) => setId(event.target.value)}/>
      </div>

      {/* パスワード */}
      <div className="flex justify-center mt-5">
        <input className="w-3/4 h-14" type="password" placeholder="パスワード" value={password} onChange={(event) => setPassword(event.target.value)}/>
      </div>

      {/* ログインボタン */}
      <div className="flex justify-center">
        <button onClick={getLoginData} className="w-3/4 h-14 mt-10 border rounded-lg text-xl border-gray-200 text-white bg-black">Sign In</button> 
      </div>

      {/* アカウント作成 */}
      <div className="flex justify-center mt-5">
        <Link className=" text-blue-500" href="/view/createUser">
          アカウント作成
        </Link>
      </div>


    </div>

  )
}