import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

export default function Login() {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter()

  type IUserTable = {
    USER_ID:string;
    PASSWORD:string;
    EMAIL:number;
    CREATE_DATE:number;
  }

    //データベースInsert処理
    const setLoginData = () =>{
      const req = {
        USER_ID:id,
        PASSWORD:password,
        EMAIL:email,
        CREATE_DATE:'',
      }
      const res = axios.post('/api/setLogin',req)
      res.then(res_data => {
        router.push('/')
          //console.log(res_data);
      })
      .catch(err => {
        const subject = err.response.data.error as string
        if (subject.indexOf('user_table.PRIMARY') !== -1) {
          alert('すでに登録されているIDです。');
        } 
          console.log(err)
      })
  }


  return (
    <div className="h-screen bg-white mt-12 text-black">

      <div className="flex justify-center">
        <div className="mt-10 text-3xl text-black">yzexpensesにログイン</div>
      </div>

      <div className="flex justify-center">
        <button className="w-3/4 h-14 mt-20 border rounded-lg border-black text-black" onClick={() => signIn()}>Google Sign In</button> 
      </div>

      <div className="flex justify-center mt-5">
        <div className=" text-lg text-black">or</div>
      </div>

      {/* ID */}
      <div className="flex justify-center mt-5">
        <input className="w-3/4 h-14" type="text" placeholder="ユーザーID" value={id} onChange={(event) => setId(event.target.value)}/>
      </div>

      {/* Email */}
      <div className="flex justify-center mt-5">
        <input className="w-3/4 h-14" type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
      </div>

      {/* パスワード */}
      <div className="flex justify-center mt-5">
        <input className="w-3/4 h-14" type="password" placeholder="パスワード" value={password} onChange={(event) => setPassword(event.target.value)}/>
      </div>

      {/* ログインボタン */}
      <div className="flex justify-center">
        <button onClick={setLoginData} className="w-3/4 h-14 mt-10 border rounded-lg text-xl border-gray-200 text-white bg-black">アカウント作成</button> 
      </div>


    </div>

  )
}