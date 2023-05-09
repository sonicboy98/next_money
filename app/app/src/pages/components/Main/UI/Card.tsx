
import { Button } from 'flowbite-react';
import React, { useCallback, useEffect } from 'react'
import Doughnut from './Doughnut';
import Money from './money';
import { TableUI } from './TableUI';
import axios from "axios";
import { useState } from "react";

type Props = {
    date:Date;
    onClick: (date:Date) => void;
};

type Moneys ={
    payment:number,
    money:number
}

type MonthData = {
    DATE:Date;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:number;
}

type MonthDataTable = {
    DATE:string;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:number;
}

type TableData = {
    DATE:string;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:string;
}

const initMonthData = () => {
    const data:MonthDataTable[] = [];
    return data;
}

const initMoney = () => {
    const data:Moneys[] = [];
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
export const Card = ({date,onClick}:Props) => {

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
                        PAYMENT:data.PAYMENT
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
            })
        })

        return data;
    }


  return (

    <div className="max-w-sm rounded overflow-hidden shadow-lg p-2 mt-2">

        {/* 年月表示 */}
        <div className="text-4xl text-black text-center py-5">{date.getFullYear()}年{date.getMonth()+1}月</div>

        {/* ドーナッツグラフ表示 */}
        <Doughnut data={{
            labels: [],
            datasets: [{
                data: [outMoney(),inMoney() - outMoney()]
            }]
        }} />


        {/* お金表示 */}
        <div className="px-3 py-4">
            <Money money1={inMoney() - outMoney()} money2={inMoney()} money3={outMoney()}  />
        </div>

        <div className='flex flex-row-reverse p-2'>
            <Button onClick={() => onClick(date)} className=" bg-orange-300 m-2 w-full">収支入力</Button>
        </div>

        <TableUI MonthData={createTableData()}/>



    </div>
  );
}
export default Card

