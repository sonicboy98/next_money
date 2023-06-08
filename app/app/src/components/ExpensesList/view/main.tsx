
import { useSession, signIn, signOut } from "next-auth/react"
import { useContext, useLayoutEffect, useState } from "react";
import axios from "axios";
import { Context } from "@/lib/store/context";
import { State } from "@/lib/interfaces";
import Link from 'next/link'
import Card from '../UI/card'
import router from "next/router";

type MyExpenses = {
    USER_ID:string;
    EMAIL:string;
    EXPENSES_KEY:string;
    CREATE_DATE:string;
    EXPENSES_NAME:string
}

const initExpenses = () => {
    const myExpenses:MyExpenses[] = [];
    return myExpenses;  
}


export default function Login() {

    //個人家計簿リスト
    const [expenses, setExpenses ] = useState(initExpenses());

    //アカウント情報グローバル
    const { context, setContext } = useContext(Context);

    //モーダル画面表示管理
    const [isModal, setModal] = useState(false);

    //追加する名称
    const [inStr, setStr] = useState('');

    //追加後の変更管理
    const [count, setCount] = useState(0);

    //描画前処理
    useLayoutEffect(() => {

        //リダイレクト処理
        if(!context.USER_ID){
            router.replace('/')
        }

        getExpenses();
        
    },[count]);

    //データベースInsert処理
    const createExpenses = () =>{
        const req = {
            USER_ID:context.USER_ID,
            EMAIL:context.EMAIL,
            EXPENSES_NAME:inStr,
        }
        const res = axios.post('/api/createUserExpenses',req)
        res.then(res_data => {
            setModal(false) ;
        })
        .catch(err => {
            alert('予期しない不具合が発生しました。もう一度実行してください。');
            console.log(err);
            setModal(false) ;
        })

        setCount(count + 1);
    }

    //リスト表示データ取得
    //データベースSelect処理
    const getExpenses = () =>{
        const req = {
            USER_ID:context.USER_ID,
            EMAIL:context.EMAIL
        }
        const res = axios.post('/api/getUserExpenses',req)
        res.then(res_data => {
            const myExpenses:MyExpenses[] = [];
            if(!res_data.data){
                return;
            }
            res_data.data.map((data: { USER_ID: string; EMAIL: string; EXPENSES_KEY: string; CREATE_DATE: string; EXPENSES_NAME: string; }) => {
                myExpenses.push({
                    USER_ID:data.USER_ID,
                    EMAIL:data.EMAIL,
                    EXPENSES_KEY:data.EXPENSES_KEY,
                    CREATE_DATE:data.CREATE_DATE,
                    EXPENSES_NAME:data.EXPENSES_NAME
                })
            })
            setExpenses(myExpenses);
        })
        .catch(err => {
            alert('予期しない不具合が発生しました。');
            console.log(err)
        })
    }

    //＋ボタンクリック
    const onAddButtonClick = () => {
        setModal(true);
    }

    const onCloseButtonClick = () => {
        setModal(false) ;
    }


  return (
    <div className="min-h-screen w-screen bg-white text-black">

        <div className='h-12 bg-white'></div>

        {/* リスト */}
        {expenses.map(data => 
            <div className="flex justify-center mt-4" key={data.CREATE_DATE}>
                <Card expenses={data}/>
            </div>
        )}


        {/* 追加ボタン */}
      <div className=" fixed right-4 bottom-4">
        <button onClick={onAddButtonClick} className="w-14 h-14 rounded-full border bg-orange-300 text-white text-4xl items-center">+</button>
      </div>

            {/* 余白 */}
      <div className="h-20"></div>


        {/* 入力モーダル画面 */}
        {
            (isModal) ?
            <div className="fixed z-50 bottom-0 left-0 w-full h-5/6 flex justify-center items-end shadow-2xl">
                <div className=' fixed w-full h-full bg-black opacity-60 z-10'></div>
                <div className="w-11/12 h-full overflow-scroll bg-white border border-gray-200 rounded-t-2xl p-3 z-20 animate-slide-in-bottom after:animate-slide-out-bottom">
                    
                    {/* 文字入力部分 */}
                    <div className=" w-full">
                        <div className="bg-gray-200 ">
                            <div className="p-2 text-black">
                                備考
                            </div>
                        </div>
                        <div className="flex justify-center w-full h-4/5 text-right bg-white text-gray-700 border border-gray-200">
                            {/* 入力欄 */}
                            <div className="w-full flex flex-wrap items-center right p-2">
                                <input className="w-full h-full border-transparent" type="text" value={inStr} onChange={(event) => setStr(event.target.value)}></input>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full h-1/6">
                    </div>
                    {/* OK、Cancelボタン */}
                        <div className="fixed flex justify-center bottom-0 w-11/12">
                        <div className=" w-full flex bg-white text-gray-700 gap-3 p-2 border-t border-stone-300">
                            <button onClick={onCloseButtonClick} className="w-1/2 bg-gray-300">Cancel</button>
                            <button onClick={createExpenses} className="w-1/2 bg-orange-300">OK</button>
                        </div>
                    </div>                 
                </div>

            </div>
            :
            <div className="">

            </div>
        }


    </div>

  )
}