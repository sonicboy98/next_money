
import { Button } from 'flowbite-react';
import React, { useCallback, useEffect } from 'react'
import Doughnut from './Doughnut';
import Money from './money';
import { TableUI } from './TableUI';
import axios from "axios";
import { useState } from "react";
import { useSession } from 'next-auth/react';

type Props = {
    date:Date;
    onClick: (date:Date) => void;
    changeMonth:(key:string) => void;
};

type MonthDataTable = {
    DATE:string;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:number;
    USER_ID:string;
    USER_EMAIL:string;
}

type TableData = {
    DATE:string;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:string;
    USER_ID:string;
    USER_EMAIL:string;
}

const initMonthData = () => {
    const data:MonthDataTable[] = [];
    return data;
}


const addMonthZero = (month:number) =>{
    if(month.toString().length < 1){
        return month.toString();
    }
    else{
        return '0' + month.toString();
    }
}



// グラフのコンポーネントの関数を作成
export const Card = ({date,onClick,changeMonth}:Props) => {

    const { data: session } = useSession();

    const [CurrentMonthList,setCurrentMonthList] = useState(initMonthData());
      
    useEffect(() => {
        let monthData:MonthDataTable[] = [];
        let monthDataTable:MonthDataTable[] = [];
        const aaa = {date:`${date.getFullYear()}${addMonthZero(date.getMonth()+1)}`};
        const res = axios.post('/api/getMonthData',aaa)
        res.then(data => {
            monthData = data.data;
            console.log(monthData)
            if(monthData){
                monthData.map(data => {
                    monthDataTable.push({
                        DATE:data.DATE,
                        ITEM_NAME:data.ITEM_NAME,
                        MONEY:data.MONEY,
                        PAYMENT:data.PAYMENT,
                        USER_ID:data.USER_ID,
                        USER_EMAIL:data.USER_EMAIL
                    })
                })
            }
            //console.log(monthDataTable)
            setCurrentMonthList(monthDataTable);

        })
        .catch(err => {
            console.log(err)
        })

    },[date]);

    //入金計算
    const inMoney = () => {
        let num = 0;

        if(!CurrentMonthList){
            return num;
        }

        CurrentMonthList.map(data => {
            if(data.PAYMENT === 0){
                num += data.MONEY
            }
        })

        return num
    }

    //出金計算
    const outMoney = () => {
        let num = 0;

        if(!CurrentMonthList){
            return num;
        }

        CurrentMonthList.map(data => {
            if(data.PAYMENT !== 0){
                num += data.MONEY
            }
        })

        return num
    }

    //テーブルデータ作成
    const createTableData = () => {
        let data:TableData[] = [];

        if(!CurrentMonthList){
            return data;
        }

        CurrentMonthList.map(list => {
            data.push({
                DATE:list.DATE,
                ITEM_NAME:list.ITEM_NAME,
                MONEY:list.MONEY,
                PAYMENT:(list.PAYMENT === 0) ? '入金':'出金',
                USER_ID:list.USER_ID,
                USER_EMAIL:list.USER_EMAIL
            
            })
        })

        return data;
    }


  return (

    <div className="bg-white rounded overflow-hidden shadow-2xl p-2 mx-6 z-50">

        {/* 年月表示 */}
        <div className="text-4xl text-black text-center py-5">{date.getFullYear()}年{date.getMonth()+1}月</div>

        {/* ドーナッツグラフ表示 */}
        <Doughnut data={{
            labels: [],
            datasets: [{
                data: [outMoney(),inMoney() - outMoney()],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                  ],
            }],

        }} />


        {/* お金表示 */}
        <div className="px-3 py-2">
            <Money money1={inMoney() - outMoney()} money2={inMoney()} money3={outMoney()}  />
        </div>

        <div className='flex flex-row-reverse p-2 rounded-3xl'>
            <button onClick={() => onClick(date)} className="bg-gradient-to-r from-pink-300 to-orange-300 rounded-xl  m-2 w-full ">収支入力</button>
        </div>

        <TableUI MonthData={createTableData()}/>

        <div className=" w-12 h-12 opacity-50 absolute right-3 top-1/2 rounded-full bg-gray-400 flex justify-center">
            <button className="text-white items-center text-4xl" onClick={() => changeMonth('right')}>▶︎</button>
        </div>

        <div className=" w-12 h-12 opacity-50 absolute left-3 top-1/2 rounded-full bg-gray-400 flex justify-center">
            <button className="text-white items-center text-4xl" onClick={() => changeMonth('left')}>◀︎</button>
        </div>



    </div>
  );
}
export default Card

