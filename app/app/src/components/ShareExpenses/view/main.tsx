
import { useSession, signIn, signOut } from "next-auth/react"
import { useContext, useLayoutEffect, useState } from "react";
import axios from "axios";
import { Context } from "@/lib/store/context";
import { State } from "@/lib/interfaces";
import Link from 'next/link'
import { useRouter } from 'next/router'
import Card from "@/components/ExpensesList/UI/card";


type MyExpenses = {
    USER_ID:string;
    EMAIL:string;
    EXPENSES_KEY:string;
    CREATE_DATE:string;
    EXPENSES_NAME:string
}

const initExpenses = () => {
    const myExpenses:MyExpenses = {
        USER_ID:'',
        EMAIL:'',
        EXPENSES_KEY:'',
        CREATE_DATE:'',
        EXPENSES_NAME:'',
    }
    return myExpenses;  
}


export default function Login() {

    //個人家計簿リスト
    const [expenses, setExpenses ] = useState(initExpenses());

    //アカウント情報グローバル
    const { context, setContext } = useContext(Context);
    const { data: session } = useSession();

    //URLパラメータ
    const router = useRouter()
    const { expenses_key } = router.query

    //描画前処理
    useLayoutEffect(() => {
        getExpenses()
    },[]);

    //リスト表示データ取得
    //データベースSelect処理
    const getExpenses = () =>{

        if(!expenses_key){
            return
        }

        const req = {
            EXPENSES_KEY:expenses_key,
        }

        const res = axios.post('/api/getExpensesAvater',req)//取得データが同じだからアバターのAPI使う
        res.then(res_data => {
            const myExpenses:MyExpenses = initExpenses()
            if(!res_data.data){
                return;
            }

            //多分いらない
            myExpenses.USER_ID = context.USER_ID
            myExpenses.EMAIL = context.EMAIL

            //いる
            myExpenses.EXPENSES_KEY = res_data.data[0].EXPENSES_KEY
            myExpenses.EXPENSES_NAME = res_data.data[0].EXPENSES_NAME

            setExpenses(myExpenses);
        })
        .catch(err => {
            alert('予期しない不具合が発生しました。');
            console.log(err)
        })
    }

    //データベースInsert処理
    const createExpenses = () =>{
        let id = context.USER_ID;
        let email = context.EMAIL
        if(session){
            id = session.user?.name as string;
            email = session.user?.email as string
        }

        const req = {
            USER_ID:id,
            EMAIL:email,
            EXPENSES_NAME:expenses.EXPENSES_NAME,
            EXPENSES_KEY:expenses.EXPENSES_KEY,
        }
        const res = axios.post('/api/setShareExpenses',req)
        res.then(res_data => {
            router.push('/view/ExpensesList')
        })
        .catch(err => {
            alert('予期しない不具合が発生しました。もう一度実行してください。');
            console.log(err);
        })
    }


  return (
    <div className="min-h-screen w-screen bg-white text-black">

        <div className='h-12 bg-white'></div>

        <div className="flex justify-center mt-4">
            <Card expenses={expenses}/>
        </div>

        {/* 追加ボタン */}
      <div className=" flex justify-center mt-10">
        <button onClick={createExpenses} className="w-2/3 rounded-lg border bg-orange-300 text-white text-2xl items-center">追加する</button>
      </div>

            {/* 余白 */}
      <div className="h-20"></div>



    </div>

  )
}