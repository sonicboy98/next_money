
import React, { useCallback, useContext, useEffect, useLayoutEffect } from 'react'
import axios from "axios";
import { useState } from "react";
import { Context } from '@/lib/store/context';
import { State } from '@/lib/interfaces';
import router from 'next/router'
import { useSession } from 'next-auth/react';

type Money = {
    in:number;
    out:number;
}
const initMoney = () => {
    const mon:Money = {
        in:0,
        out:0
    }
    return mon;
}

type MyExpenses = {
    USER_ID:string;
    EMAIL:string;
    EXPENSES_KEY:string;
    CREATE_DATE:string;
    EXPENSES_NAME:string;
}

type IAvater = {
    USER_ID:string;
}
const initAvater = () => {
    const ava:IAvater[] = []
    return ava;
}

type Props = {
    expenses:MyExpenses;
}


// グラフのコンポーネントの関数を作成
export const Card = ({expenses}:Props) => {

    //アカウント情報グローバル
    const { context, setContext } = useContext(Context);
    const { data: session } = useSession();

    //アバターデータ
    const [avater,setAvater] = useState(initAvater());

    //アバターデータ
    const [money,setMoney] = useState(initMoney());


    //描画前しょり--------------------------------------------------------
    useLayoutEffect(() => {
        getExpensesAvater();
        getExpensesMoney();
    },[expenses]);

    //DB通信処理--------------------------------------------------------

    //アバター情報取得処理
    const getExpensesAvater = () => {
        const req = {
            EXPENSES_KEY:expenses.EXPENSES_KEY,
        }
        const res = axios.post('/api/getExpensesAvater',req)
        res.then(res_data => {
            const ava:IAvater[] = [];
            if(!res_data.data){
                return;
            }
            res_data.data.map((data: { USER_ID: string; }) => {
                ava.push({
                    USER_ID:data.USER_ID.slice( 0, 1 )//頭文字のみ
                })
            })
            setAvater(ava);
        })
        .catch(err => {
            alert('予期しない不具合が発生しました。');
            console.log(err)
        })
    }

    //お金情報取得
    const getExpensesMoney = () => {
        const req = {
            EXPENSES_KEY:expenses.EXPENSES_KEY,
        }
        const res = axios.post('/api/getExpensesMoney',req)
        res.then(res_data => {
            const mon:Money = initMoney();
            if(!res_data.data){
                return;
            }
            mon.in = res_data.data[0].in ? res_data.data[0].in  : 0
            mon.out = res_data.data[0].out ? res_data.data[0].out  : 0
            setMoney(mon);
        })
        .catch(err => {
            alert('予期しない不具合が発生しました。');
            console.log(err)
        })
    }



    //画面イベント------------------------------------------------------
    //カードクリックイベント
    const onClick = async () => {

        let id = context.USER_ID;
        let email = context.EMAIL
        if(session){
            id = session.user?.name as string;
            email = session.user?.email as string
        }

        const user:State = {
            USER_ID:context.USER_ID,
            EMAIL:context.EMAIL,
            EXPENSES_KEY:expenses.EXPENSES_KEY,
            EXPENSES_NAME:expenses.EXPENSES_NAME,

        } 

        await setContext(user);
        router.push('/view/ExpensesView')

    }


  return (

    <div onClick={onClick} className="bg-white rounded-xl overflow-hidden shadow-2xl p-5 h-36 w-11/12 hover:opacity-50">
        <div className='flex h-1/2'>

            {/* アバター */}
            <div className="w-1/2 flex mb-5 -space-x-4">
                {avater.map(ava => 
                    <div key={ava.USER_ID} className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden border border-gray-400 bg-red-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300">{ava.USER_ID}</span>
                    </div>
                )}
            </div>


            {/* タイトル */}
            <div className="w-1/2 text-2xl text-black flex justify-center items-center text-center"><div>{expenses.EXPENSES_NAME}</div></div>

        </div>

        <div className='flex h-1/2 mt-3'>

            {/* 残金 */}
            <div className='w-1/3 border-r border-gray-200'>
                <div className=' text-xl flex justify-center'>{(money.in - money.out).toLocaleString()}</div>
                <div className=' text-sm flex justify-center'>残金</div>
            </div>

            {/* 入金 */}
            <div className='w-1/3 border-r border-gray-200'>
                <div className=' text-xl flex justify-center'>{(money.in).toLocaleString()}</div>
                <div className=' text-sm flex justify-center'>入金</div>
            </div>

            {/* 出金 */}
            <div className='w-1/3 '>
                <div className=' text-xl flex justify-center'>{(money.out).toLocaleString()}</div>
                <div className=' text-sm flex justify-center'>出金</div>
            </div>
        </div>


    </div>
  );
}
export default Card

